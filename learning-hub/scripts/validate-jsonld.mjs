/**
 * Validates the JSON-LD embedded in prerendered pages against the fields
 * Google's rich-result documentation requires/recommends for each type.
 *
 *   node scripts/validate-jsonld.mjs            # scans dist/**\/index.html
 */
import { readdirSync, readFileSync, statSync, existsSync } from "fs";
import { join } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DIST = join(__dirname, "..", "dist");

const RULES = {
  Organization: { required: ["name", "url"], recommended: ["logo", "sameAs", "description"] },
  EducationalOrganization: { required: ["name", "url"], recommended: ["logo"] },
  WebSite: { required: ["name", "url"], recommended: ["potentialAction"] },
  Course: { required: ["name", "description", "provider"], recommended: ["hasCourseInstance", "offers", "url", "inLanguage", "educationalLevel"] },
  CourseInstance: { required: ["courseMode"], recommended: ["courseWorkload"] },
  BreadcrumbList: { required: ["itemListElement"], recommended: [] },
  FAQPage: { required: ["mainEntity"], recommended: [] },
  BlogPosting: { required: ["headline", "datePublished", "author", "image"], recommended: ["dateModified", "publisher", "description", "mainEntityOfPage"] },
  Article: { required: ["headline", "datePublished", "author", "image"], recommended: ["dateModified", "publisher"] },
  Event: { required: ["name", "startDate", "location"], recommended: ["description", "organizer", "offers", "eventStatus"] },
  ItemList: { required: ["itemListElement"], recommended: [] },
  CollectionPage: { required: ["name"], recommended: ["description", "url"] },
  DonateAction: { required: ["recipient"], recommended: ["target"] },
  WebPage: { required: ["name"], recommended: [] },
  HowTo: { required: ["name", "step"], recommended: ["description"] },
  SoftwareApplication: { required: ["name", "applicationCategory"], recommended: ["operatingSystem", "offers"] },
};

function walk(dir, out = []) {
  for (const e of readdirSync(dir)) {
    const p = join(dir, e);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (e === "index.html") out.push(p);
  }
  return out;
}

function check(node, file, issues, path = "") {
  if (!node || typeof node !== "object") return;
  if (Array.isArray(node)) return node.forEach((n, i) => check(n, file, issues, `${path}[${i}]`));
  const types = [].concat(node["@type"] || []);
  for (const t of types) {
    const rule = RULES[t];
    if (!rule) continue;
    const nested = path !== "";
    // Nested references (e.g. publisher, mainEntityOfPage) only need a name/@id.
    const required = nested ? (t === "WebPage" ? [] : rule.required.filter((k) => k === "name")) : rule.required;
    for (const k of required) if (node[k] === undefined || node[k] === "" || node[k] === null) issues.push({ file, level: "error", msg: `${t}${path}: missing required "${k}"` });
    if (!nested) for (const k of rule.recommended) if (node[k] === undefined) issues.push({ file, level: "warn", msg: `${t}${path}: missing recommended "${k}"` });
    if (t === "BreadcrumbList") {
      const items = node.itemListElement || [];
      items.forEach((it, i) => {
        if (!it.name) issues.push({ file, level: "error", msg: `BreadcrumbList item ${i}: missing name` });
        if (it.position !== i + 1) issues.push({ file, level: "error", msg: `BreadcrumbList item ${i}: position should be ${i + 1}` });
        if (i < items.length - 1 && !it.item) issues.push({ file, level: "error", msg: `BreadcrumbList item ${i}: missing item URL` });
      });
    }
    if (t === "FAQPage") {
      (node.mainEntity || []).forEach((q, i) => {
        if (!q.name || !q.acceptedAnswer?.text) issues.push({ file, level: "error", msg: `FAQPage question ${i}: needs name + acceptedAnswer.text` });
      });
    }
  }
  for (const [k, v] of Object.entries(node)) if (k !== "@type" && typeof v === "object") check(v, file, issues, `${path}.${k}`);
}

if (!existsSync(DIST)) {
  console.error("dist/ not found — run the build + prerender first.");
  process.exit(1);
}
const files = walk(DIST);
const issues = [];
let blocks = 0;
const typeCounts = {};
for (const f of files) {
  const html = readFileSync(f, "utf8");
  const scripts = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)];
  for (const m of scripts) {
    blocks++;
    let json;
    try {
      json = JSON.parse(m[1]);
    } catch (e) {
      issues.push({ file: f, level: "error", msg: `invalid JSON-LD: ${e.message}` });
      continue;
    }
    const arr = Array.isArray(json) ? json : json["@graph"] ? json["@graph"] : [json];
    for (const node of arr) {
      for (const t of [].concat(node["@type"] || [])) typeCounts[t] = (typeCounts[t] || 0) + 1;
      if (!node["@context"]) issues.push({ file: f, level: "warn", msg: `${node["@type"]}: missing @context` });
      check(node, f, issues);
    }
  }
}
const errors = issues.filter((i) => i.level === "error");
const warns = issues.filter((i) => i.level === "warn");
console.log(`Scanned ${files.length} pages, ${blocks} JSON-LD blocks.`);
console.log("Types:", Object.entries(typeCounts).map(([k, v]) => `${k}×${v}`).join(", "));
const dedupe = (list) => [...new Map(list.map((i) => [i.msg, i])).values()];
for (const w of dedupe(warns).slice(0, 40)) console.log(`  WARN  ${w.msg}  (${w.file.replace(DIST, "")})`);
for (const e of dedupe(errors)) console.log(`  ERROR ${e.msg}  (${e.file.replace(DIST, "")})`);
console.log(`\n${errors.length} errors, ${warns.length} warnings.`);
if (errors.length) process.exit(1);
