/**
 * Builds CONTENT_ACCURACY_REPORT.md from the fact-check workflow results
 * (the JSON the workflow returned, saved to a file).
 *
 *   node scripts/build-accuracy-report.mjs <results.json> [out.md]
 */
import { readFileSync, writeFileSync } from "fs";

const [, , input, out = "CONTENT_ACCURACY_REPORT.md"] = process.argv;
if (!input) {
  console.error("usage: node scripts/build-accuracy-report.mjs <results.json> [out.md]");
  process.exit(1);
}
const data = JSON.parse(readFileSync(input, "utf8"));
const results = data.results || data;
const totals = data.totals || {};

const short = (f) => f.replace(/^.*?src\/data\//, "src/data/");
const esc = (s) => String(s ?? "").replace(/\|/g, "\\|").replace(/\n/g, " ");
const trunc = (s, n) => (String(s ?? "").length > n ? String(s).slice(0, n - 1) + "…" : String(s ?? ""));

let md = `# Content accuracy report\n\n`;
md += `Generated ${new Date().toISOString().slice(0, 10)} by an automated fact-check of every content file in the three courses (plus the shared course overview and the resource toolkits). Each file was read in full by a researcher agent that identified every verifiable claim — quote attributions, books and authors, named studies and statistics, framework descriptions, company/history facts, and Central Asia facts — and checked it against web sources. Every proposed correction was then independently reviewed by two skeptical agents (one defending the original text, one auditing the proposed replacement) and applied only when both agreed.\n\n`;
md += `| Metric | Count |\n|---|---|\n| Files checked | ${totals.files ?? results.length} |\n| Claims examined | ${totals.claims ?? "—"} |\n| Corrections proposed | ${totals.proposed ?? "—"} |\n| Corrections confirmed by both reviewers | ${totals.confirmed ?? "—"} |\n| Corrections applied | ${totals.applied ?? "—"} |\n\n`;

const verdictTotals = {};
for (const r of results) for (const c of r.claims || []) verdictTotals[c.verdict] = (verdictTotals[c.verdict] || 0) + 1;
md += `## Verdicts across all claims\n\n| Verdict | Count |\n|---|---|\n` + Object.entries(verdictTotals).sort((a, b) => b[1] - a[1]).map(([k, v]) => `| ${k} | ${v} |`).join("\n") + `\n\n`;

md += `## Corrections applied\n\n`;
let any = false;
for (const r of results) {
  const applied = new Set(r.apply?.applied || []);
  const changes = (r.changes || []).filter((c) => c.confirmed && applied.has(c.id));
  if (!changes.length) continue;
  any = true;
  md += `### ${short(r.file)}\n\n`;
  for (const c of changes) {
    md += `- **${c.location}** (${c.category}, ${c.verdict})\n  - Before: "${trunc(c.original, 220)}"\n  - After: "${trunc(c.finalText, 220)}"\n  - Why: ${trunc(c.evidence, 400)}\n` + (c.sources?.length ? `  - Sources: ${c.sources.slice(0, 4).join(" · ")}\n` : "");
  }
  md += `\n`;
}
if (!any) md += `_None._\n\n`;

md += `## Proposed but not applied\n\nThese were flagged by the researcher but at least one reviewer did not agree the change was justified (or the edit could not be located). They are listed so a human editor can decide.\n\n`;
let anyRej = false;
for (const r of results) {
  const applied = new Set(r.apply?.applied || []);
  const rejected = (r.changes || []).filter((c) => !c.confirmed || !applied.has(c.id));
  if (!rejected.length) continue;
  anyRej = true;
  md += `### ${short(r.file)}\n\n`;
  for (const c of rejected) {
    const why = c.votes?.map((v) => (v.changeJustified ? "✓" : "✗") + " " + trunc(v.reasoning, 200)).join(" / ");
    md += `- **${c.location}** (${c.verdict}): "${trunc(c.original, 160)}" → "${trunc(c.proposedText, 160)}"\n  - Reviewers: ${why || "—"}\n`;
  }
  md += `\n`;
}
if (!anyRej) md += `_None._\n\n`;

md += `## Per-file notes\n\n`;
for (const r of results) {
  const counts = {};
  for (const c of r.claims || []) counts[c.verdict] = (counts[c.verdict] || 0) + 1;
  md += `### ${short(r.file)}\n\n${r.summary || ""}\n\n_Claims: ${Object.entries(counts).map(([k, v]) => `${k} ${v}`).join(", ") || "none"}._\n\n`;
  const uncited = (r.claims || []).filter((c) => ["plausible-uncited", "unverifiable"].includes(c.verdict) && !c.proposedText);
  if (uncited.length) {
    md += `Claims that could not be verified (left unchanged):\n\n`;
    for (const c of uncited) md += `- ${c.location}: "${trunc(c.original, 140)}" — ${trunc(c.evidence, 220)}\n`;
    md += `\n`;
  }
}
writeFileSync(out, md);
console.log(`${out}: ${results.length} files, ${md.length} chars`);
