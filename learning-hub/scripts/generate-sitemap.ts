/**
 * Generates public/sitemap.xml (with hreflang alternates for en/ru),
 * public/robots.txt, and public/llms.txt.
 *
 *   npm run sitemap
 */
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";
import { allPublicRoutes, siteUrl, siteName } from "./routes.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PUBLIC = path.join(__dirname, "..", "public");
const SITE = siteUrl();
const NAME = siteName();
const today = new Date().toISOString().split("T")[0];

function esc(s: string) {
  return s.replace(/&/g, "&amp;");
}

const routes = allPublicRoutes() as { path: string; changefreq: string; priority: number; lastmod?: string }[];

const urls = routes
  .map((r) => {
    const en = `${SITE}${r.path === "/" ? "/" : r.path}`;
    const ru = `${SITE}/ru${r.path === "/" ? "" : r.path}`;
    const alternates = `\n    <xhtml:link rel="alternate" hreflang="en" href="${esc(en)}"/>\n    <xhtml:link rel="alternate" hreflang="ru" href="${esc(ru)}"/>\n    <xhtml:link rel="alternate" hreflang="x-default" href="${esc(en)}"/>`;
    const entry = (loc: string) =>
      `  <url>\n    <loc>${esc(loc)}</loc>${alternates}\n    <lastmod>${r.lastmod || today}</lastmod>\n    <changefreq>${r.changefreq}</changefreq>\n    <priority>${r.priority.toFixed(1)}</priority>\n  </url>`;
    return [entry(en), entry(ru)].join("\n");
  })
  .join("\n");

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n<!-- Generated ${new Date().toISOString()} · ${routes.length * 2} URLs (en + ru) -->\n${urls}\n</urlset>\n`;
fs.writeFileSync(path.join(PUBLIC, "sitemap.xml"), sitemap);

const robots = `User-agent: *\nAllow: /\nDisallow: /dashboard\nDisallow: /welcome\nDisallow: /sign-in\nDisallow: /ru/dashboard\nDisallow: /ru/welcome\nDisallow: /ru/sign-in\n\nSitemap: ${SITE}/sitemap.xml\n\n# AI crawlers welcome\nUser-agent: GPTBot\nAllow: /\nUser-agent: ClaudeBot\nAllow: /\nUser-agent: PerplexityBot\nAllow: /\nUser-agent: Google-Extended\nAllow: /\n`;
fs.writeFileSync(path.join(PUBLIC, "robots.txt"), robots);

const courseLines = [
  `- [Financial Literacy Course](${SITE}/course/financial-literacy): Free 6-week course — financial snapshot, money scripts, income mapping, zero-based budgeting, debt snowball vs avalanche, emergency fund, and goal setting. Russian: ${SITE}/ru/course/financial-literacy`,
  `- [Business Creation Course](${SITE}/course/business-creation): Free 12-week lean-startup course — customer discovery, value proposition, business model canvas, assumption mapping, validation experiments, MVP, financial dashboard, traction, pitch. Russian: ${SITE}/ru/course/business-creation`,
  `- [Leadership Development Course](${SITE}/course/leadership-development): Free 12-week course — leading yourself, others, teams, organizations (Covey, Goleman, Tuckman, Lencioni, Kotter, Maxwell, Greenleaf). Russian: ${SITE}/ru/course/leadership-development`,
];
const blogLines = routes.filter((r) => r.path.startsWith("/blog/")).slice(0, 40).map((r) => `- ${SITE}${r.path}`);
const llms = `# ${NAME}\n\n> ${NAME} is a free, bilingual (English/Russian) learning platform offering self-paced courses in financial literacy, business creation, and leadership development, built for people in Central Asia (Kazakhstan, Kyrgyzstan, Uzbekistan, Tajikistan, Turkmenistan) and open to everyone. Learners create a free account, choose their language, and progress through weekly modules of daily lessons, stories, interactive worksheets, and community chat.\n\nWebsite: ${SITE}\nRussian version: ${SITE}/ru\n\n## Courses\n\n${courseLines.join("\n")}\n\n## Programs & Community\n\n- [Learning path](${SITE}/programs): Four stages — financial literacy, business creation, leadership, community\n- [Community](${SITE}/community): Course chat, live cohorts, local groups, facilitator pathway\n- [Live cohorts](${SITE}/cohort): Facilitator-led groups\n- [Free resources](${SITE}/resources): Toolkits and worksheets\n- [Debt payoff calculator](${SITE}/tools/debt-calculator): Snowball vs avalanche comparison tool\n\n## Blog\n\n- [Blog](${SITE}/blog): Articles on budgeting, debt, saving, entrepreneurship, and Central Asia\n${blogLines.join("\n")}\n\n## Optional\n\n- [Privacy Policy](${SITE}/privacy)\n- [RSS](${SITE}/rss.xml)\n`;
fs.writeFileSync(path.join(PUBLIC, "llms.txt"), llms);

const manifest = {
  name: NAME,
  short_name: NAME.length > 12 ? "Learning Hub" : NAME,
  description: "Free financial literacy, business creation, and leadership courses in English and Russian.",
  start_url: "/",
  display: "standalone",
  background_color: "#ffffff",
  theme_color: "#1B2A4A",
  lang: "en",
  icons: [{ src: "/images/logo.png", sizes: "512x512", type: "image/png", purpose: "any" }],
};
fs.writeFileSync(path.join(PUBLIC, "manifest.json"), JSON.stringify(manifest, null, 2) + "\n");

console.log(`sitemap.xml: ${routes.length * 2} URLs · robots.txt · llms.txt · manifest.json → public/`);
