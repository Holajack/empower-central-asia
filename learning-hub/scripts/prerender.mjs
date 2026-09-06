/**
 * Prerenders every public route (English AND Russian) into static HTML so
 * search engines index full content without executing JavaScript.
 *
 *   npm run build && node scripts/prerender.mjs
 *   node scripts/prerender.mjs --smoke      # render a handful of routes and report console errors
 *
 * Uses Puppeteer with the system Chromium when PUPPETEER_EXECUTABLE_PATH or
 * a Playwright browser directory is available (CI-friendly).
 */
import puppeteer from "puppeteer";
import { createServer } from "http";
import { readFileSync, writeFileSync, mkdirSync, existsSync, statSync } from "fs";
import { join, extname } from "path";
import { fileURLToPath } from "url";
import { localizedRoutes } from "./routes.mjs";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DIST_DIR = join(__dirname, "..", "dist");
const PORT = Number(process.env.PRERENDER_PORT || 4173);
const SMOKE = process.argv.includes("--smoke");
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY || 2);

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".md": "text/markdown",
};

function findChromium() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  const candidates = [
    "/opt/pw-browsers/chromium",
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
  ];
  for (const c of candidates) {
    try {
      if (statSync(c).isFile()) return c;
    } catch {
      /* next */
    }
  }
  return undefined; // fall back to puppeteer's bundled browser
}

function startServer() {
  // Serve the pristine SPA shell for every route. Reading it once up front
  // matters: as routes get prerendered, dist/index.html becomes the rendered
  // homepage, and hydrating other routes from it would throw mismatch errors.
  const shell = readFileSync(join(DIST_DIR, "index.html"));
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      const url = decodeURIComponent((req.url || "/").split("?")[0]);
      const filePath = join(DIST_DIR, url);
      if (extname(filePath) && existsSync(filePath)) {
        res.writeHead(200, { "Content-Type": MIME[extname(filePath)] || "application/octet-stream" });
        res.end(readFileSync(filePath));
        return;
      }
      res.writeHead(200, { "Content-Type": MIME[".html"] });
      res.end(shell);
    });
    server.listen(PORT, () => resolve(server));
  });
}

async function renderRoute(browser, route) {
  const page = await browser.newPage();
  const errors = [];
  page.on("pageerror", (err) => errors.push(`pageerror: ${err.message}`));
  page.on("console", (msg) => {
    if (msg.type() === "error") errors.push(`console: ${msg.text()}`);
  });
  // Block third-party network calls (geo-IP, analytics, Clerk) during prerender.
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const u = req.url();
    if (u.startsWith(`http://localhost:${PORT}`)) req.continue();
    else req.abort();
  });
  await page.evaluateOnNewDocument(() => {
    window.__PRERENDERING = true;
  });
  try {
    await page.goto(`http://localhost:${PORT}${route.url}`, { waitUntil: "networkidle0", timeout: 30000 });
    await page.waitForSelector("#root > *", { timeout: 15000 });
    await page.waitForFunction(() => document.title && document.title.length > 0, { timeout: 15000 }).catch(() => errors.push(`no <title> rendered for ${route.url}`));
    // Wait for react-helmet to write the canonical for this route.
    const expected = route.url === "/ru" ? "/ru" : route.url;
    await page
      .waitForFunction(
        (exp) => {
          const c = document.querySelector('link[rel="canonical"]');
          if (!c) return false;
          const u = new URL(c.href);
          return u.pathname.replace(/\/$/, "") === exp.replace(/\/$/, "");
        },
        { timeout: 15000 },
        expected
      )
      .catch(() => errors.push(`canonical mismatch for ${route.url}`));
    await new Promise((r) => setTimeout(r, 400));
    const html = await page.content();
    if (!SMOKE) {
      const outDir = route.url === "/" ? DIST_DIR : join(DIST_DIR, ...route.url.split("/").filter(Boolean));
      mkdirSync(outDir, { recursive: true });
      writeFileSync(join(outDir, "index.html"), html, "utf8");
    }
    return { ok: true, errors, html };
  } catch (err) {
    return { ok: false, errors: [...errors, err.message] };
  } finally {
    await page.close();
  }
}

async function main() {
  if (!existsSync(DIST_DIR)) {
    console.error('dist/ not found. Run "npm run build" first.');
    process.exit(1);
  }
  let routes = localizedRoutes();
  if (SMOKE) {
    const sample = ["/", "/ru", "/programs", "/ru/programs", "/community", "/course/financial-literacy", "/ru/course/financial-literacy", "/course/financial-literacy/week-1", "/ru/course/business-creation/week-3", "/course/leadership-development/week-12", "/blog", "/ru/blog", "/resources", "/tools/debt-calculator", "/cohort", "/sign-up", "/newsletter"];
    const blog = routes.find((r) => r.url.startsWith("/blog/"));
    const res = routes.find((r) => r.url.startsWith("/resources/"));
    routes = [...sample.map((u) => ({ url: u })), ...(blog ? [blog] : []), ...(res ? [res] : [])];
  }
  console.log(`${SMOKE ? "Smoke-testing" : "Prerendering"} ${routes.length} routes…`);
  const server = await startServer();
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: findChromium(),
    // Background-tab throttling would stall react-helmet's requestAnimationFrame updates.
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--disable-dev-shm-usage", "--disable-background-timer-throttling", "--disable-renderer-backgrounding", "--disable-backgrounding-occluded-windows"],
  });
  let ok = 0;
  let failed = 0;
  const problems = [];
  const queue = [...routes];
  const workers = Array.from({ length: CONCURRENCY }, async () => {
    while (queue.length) {
      const route = queue.shift();
      const r = await renderRoute(browser, route);
      const meaningful = r.errors.filter((e) => !/net::ERR_FAILED|ERR_BLOCKED_BY_CLIENT|Failed to load resource/.test(e));
      if (r.ok && meaningful.length === 0) ok++;
      else {
        failed++;
        problems.push({ url: route.url, errors: meaningful });
      }
      if (SMOKE && r.html) {
        const title = r.html.match(/<title[^>]*>([^<]*)<\/title>/)?.[1] ?? "(no title)";
        const ld = (r.html.match(/application\/ld\+json/g) || []).length;
        const lang = r.html.match(/<html[^>]*lang="([^"]+)"/)?.[1];
        console.log(`  ${route.url} → lang=${lang} title="${title.slice(0, 70)}" jsonld=${ld}${meaningful.length ? " ERRORS: " + meaningful.join(" | ") : ""}`);
      }
    }
  });
  await Promise.all(workers);
  await browser.close();
  server.close();
  console.log(`\nDone. ok=${ok} failed=${failed}`);
  if (problems.length) {
    console.log("Problems:");
    for (const p of problems) console.log(` - ${p.url}: ${p.errors.join(" | ")}`);
    if (SMOKE) process.exit(1);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
