/**
 * Single source of truth for every indexable route, used by the sitemap
 * generator, the prerender script, llms.txt, and the JSON-LD validator.
 * Keep in sync with src/App.tsx.
 */
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { join } from "path";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const ROOT = join(__dirname, "..");

export const COURSES = [
  { slug: "financial-literacy", weeks: 6 },
  { slug: "business-creation", weeks: 12 },
  { slug: "leadership-development", weeks: 12 },
];

export const STATIC_ROUTES = [
  { path: "/", changefreq: "weekly", priority: 1.0 },
  { path: "/programs", changefreq: "monthly", priority: 0.9 },
  { path: "/community", changefreq: "monthly", priority: 0.8 },
  { path: "/cohort", changefreq: "monthly", priority: 0.7 },
  { path: "/resources", changefreq: "monthly", priority: 0.7 },
  { path: "/tools/debt-calculator", changefreq: "monthly", priority: 0.7 },
  { path: "/blog", changefreq: "weekly", priority: 0.8 },
  { path: "/newsletter", changefreq: "yearly", priority: 0.3 },
  { path: "/privacy", changefreq: "yearly", priority: 0.2 },
  { path: "/sign-up", changefreq: "yearly", priority: 0.4 },
];

/** Routes that must never be prerendered or listed (account-only). */
export const PRIVATE_ROUTES = ["/sign-in", "/welcome", "/dashboard"];

export function courseRoutes() {
  const out = [];
  for (const c of COURSES) {
    out.push({ path: `/course/${c.slug}`, changefreq: "monthly", priority: 0.9 });
    for (let w = 1; w <= c.weeks; w++) out.push({ path: `/course/${c.slug}/week-${w}`, changefreq: "monthly", priority: 0.6 });
  }
  return out;
}

/** Parse blog slugs (skips future-dated posts) from src/data/blogPosts.ts. */
export function blogRoutes() {
  const today = new Date().toISOString().split("T")[0];
  try {
    const content = readFileSync(join(ROOT, "src", "data", "blogPosts.ts"), "utf8");
    const blocks = content.split(/(?=\n\s{2}\{\s*\n\s+id:\s*\d+)/);
    const routes = [];
    for (const block of blocks) {
      const slug = block.match(/\bslug:\s*"([^"]+)"/)?.[1];
      const id = block.match(/^\s*id:\s*(\d+)/m)?.[1];
      const publishDate = block.match(/publishDate:\s*"([^"]+)"/)?.[1];
      const dateModified = block.match(/dateModified:\s*"([^"]+)"/)?.[1];
      if (!slug || !id) continue;
      if (publishDate && publishDate > today) continue;
      routes.push({ path: `/blog/${slug}`, changefreq: "monthly", priority: 0.6, lastmod: dateModified || publishDate });
    }
    return routes;
  } catch {
    return [];
  }
}

/** Parse resource slugs from src/data/resources.ts. */
export function resourceRoutes() {
  try {
    const content = readFileSync(join(ROOT, "src", "data", "resources.ts"), "utf8");
    return [...content.matchAll(/^\s{4}slug:\s*"([^"]+)"/gm)].map((m) => ({ path: `/resources/${m[1]}`, changefreq: "monthly", priority: 0.6 }));
  } catch {
    return [];
  }
}

export function allPublicRoutes() {
  return [...STATIC_ROUTES, ...courseRoutes(), ...resourceRoutes(), ...blogRoutes()];
}

/** English + Russian URL for every public route. */
export function localizedRoutes() {
  const out = [];
  for (const r of allPublicRoutes()) {
    out.push({ ...r, lang: "en", url: r.path });
    out.push({ ...r, lang: "ru", url: r.path === "/" ? "/ru" : `/ru${r.path}` });
  }
  return out;
}

export function siteUrl() {
  const fromEnv = process.env.VITE_SITE_URL || readEnvFile("VITE_SITE_URL");
  return (fromEnv || "https://learn.centralasiapartners.com").replace(/\/+$/, "");
}

export function siteName() {
  return process.env.VITE_SITE_NAME || readEnvFile("VITE_SITE_NAME") || "Central Asia Partners";
}

function readEnvFile(key) {
  for (const file of [".env.production", ".env.local", ".env"]) {
    try {
      const txt = readFileSync(join(ROOT, file), "utf8");
      const m = txt.match(new RegExp(`^${key}=["']?([^"'\\n]+)["']?`, "m"));
      if (m) return m[1].trim();
    } catch {
      /* next */
    }
  }
  return "";
}
