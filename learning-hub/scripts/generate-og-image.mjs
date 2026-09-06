/**
 * Renders public/og-image.svg → public/og-image.png (1200×630) and
 * public/images/logo.svg → public/images/logo.png (512×512) with headless
 * Chromium, so social previews and the manifest have raster images.
 *
 *   node scripts/generate-og-image.mjs
 */
import puppeteer from "puppeteer";
import { readFileSync, writeFileSync, statSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const PUBLIC = join(__dirname, "..", "public");

function findChromium() {
  if (process.env.PUPPETEER_EXECUTABLE_PATH) return process.env.PUPPETEER_EXECUTABLE_PATH;
  for (const c of ["/opt/pw-browsers/chromium", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/usr/bin/google-chrome"]) {
    try {
      if (statSync(c).isFile()) return c;
    } catch {
      /* next */
    }
  }
  return undefined;
}

async function render(browser, svgPath, pngPath, width, height) {
  const svg = readFileSync(svgPath, "utf8");
  const page = await browser.newPage();
  await page.setViewport({ width, height, deviceScaleFactor: 1 });
  await page.setContent(`<!doctype html><html><body style="margin:0">${svg}</body></html>`);
  const buf = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width, height } });
  writeFileSync(pngPath, buf);
  await page.close();
  console.log(`${pngPath.replace(PUBLIC, "public")} (${width}×${height})`);
}

const browser = await puppeteer.launch({ headless: true, executablePath: findChromium(), args: ["--no-sandbox", "--disable-setuid-sandbox"] });
await render(browser, join(PUBLIC, "og-image.svg"), join(PUBLIC, "og-image.png"), 1200, 630);
await render(browser, join(PUBLIC, "images", "logo.svg"), join(PUBLIC, "images", "logo.png"), 512, 512);
await browser.close();
