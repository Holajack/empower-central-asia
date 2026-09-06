/**
 * Structural validator for Russian course files.
 *
 *   npm run validate:ru                     # all courses / weeks that have a .ru.ts file
 *   npm run validate:ru -- course 3         # one file (dirs: course | business-course | leadership-course)
 *   npm run validate:ru -- --strict         # also fail when a week has no Russian file yet
 *
 * Checks that weekNContent.ru.ts exports the same shape as weekNContent.ts:
 * same keys, same array lengths, identical `id`/`type`/`week` values and
 * numbers, and that translatable strings are non-empty and actually Russian.
 */
import { existsSync } from "fs";
import { join } from "path";
import { fileURLToPath, pathToFileURL } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const DATA = join(__dirname, "..", "src", "data");
const DIRS: Record<string, number> = { course: 6, "business-course": 12, "leadership-course": 12 };
const KEEP_EQUAL = new Set(["id", "type", "week", "toolLink", "checkpointNumber", "allowDynamicRows", "fieldIds"]);
const LATIN_OK = /^[\s\d\W]*$|^[A-Z0-9 &/.\-+%$]{1,12}$|^https?:\/\//; // numbers, symbols, short acronyms, URLs

const args = process.argv.slice(2).filter((a) => !a.startsWith("--"));
const strict = process.argv.includes("--strict");

type Issue = { path: string; msg: string };

function cyrillic(s: string) {
  return /[Ѐ-ӿ]/.test(s);
}

function compare(en: unknown, ru: unknown, path: string, issues: Issue[], stats: { strings: number; russian: number }) {
  if (Array.isArray(en)) {
    if (!Array.isArray(ru)) return issues.push({ path, msg: "expected array" });
    if (en.length !== ru.length) issues.push({ path, msg: `array length ${ru.length} ≠ ${en.length} (en)` });
    const n = Math.min(en.length, ru.length);
    for (let i = 0; i < n; i++) compare(en[i], ru[i], `${path}[${i}]`, issues, stats);
    return;
  }
  if (en && typeof en === "object") {
    if (!ru || typeof ru !== "object" || Array.isArray(ru)) return issues.push({ path, msg: "expected object" });
    const enObj = en as Record<string, unknown>;
    const ruObj = ru as Record<string, unknown>;
    for (const k of Object.keys(enObj)) {
      if (!(k in ruObj)) {
        issues.push({ path: `${path}.${k}`, msg: "missing in ru" });
        continue;
      }
      compare(enObj[k], ruObj[k], `${path}.${k}`, issues, stats);
    }
    for (const k of Object.keys(ruObj)) if (!(k in enObj)) issues.push({ path: `${path}.${k}`, msg: "extra key in ru" });
    return;
  }
  const key = path.split(".").pop()?.replace(/\[\d+\]$/, "") ?? "";
  if (typeof en === "number" || typeof en === "boolean") {
    if (ru !== en) issues.push({ path, msg: `expected ${String(en)}, got ${String(ru)}` });
    return;
  }
  if (typeof en === "string") {
    if (typeof ru !== "string") return issues.push({ path, msg: "expected string" });
    if (KEEP_EQUAL.has(key)) {
      if (ru !== en) issues.push({ path, msg: `"${key}" must stay identical ("${en}")` });
      return;
    }
    if (en.trim() && !ru.trim()) return issues.push({ path, msg: "empty translation" });
    if (en.length > 3 && !LATIN_OK.test(en)) {
      stats.strings++;
      if (cyrillic(ru)) stats.russian++;
      else if (ru === en) issues.push({ path, msg: `untranslated: "${en.slice(0, 60)}"` });
    }
  }
}

async function load(dir: string, week: number, ru: boolean) {
  const file = join(DATA, dir, `week${week}Content${ru ? ".ru" : ""}.ts`);
  if (!existsSync(file)) return null;
  const mod = await import(pathToFileURL(file).href);
  return (mod[`week${week}Content`] ?? Object.values(mod)[0]) as Record<string, unknown>;
}

let failed = 0;
let checked = 0;
let missing = 0;
const targets: [string, number][] = [];
if (args.length >= 2) targets.push([args[0], Number(args[1])]);
else for (const [dir, weeks] of Object.entries(DIRS)) for (let w = 1; w <= weeks; w++) targets.push([dir, w]);

for (const [dir, week] of targets) {
  const en = await load(dir, week, false);
  const ru = await load(dir, week, true);
  if (!en) {
    console.log(`✗ ${dir}/week${week}Content.ts not found`);
    failed++;
    continue;
  }
  if (!ru) {
    missing++;
    if (strict) {
      console.log(`✗ ${dir}/week${week}Content.ru.ts missing`);
      failed++;
    }
    continue;
  }
  const issues: Issue[] = [];
  const stats = { strings: 0, russian: 0 };
  compare(en, ru, "week", issues, stats);
  const ratio = stats.strings ? stats.russian / stats.strings : 1;
  if (ratio < 0.9) issues.push({ path: "week", msg: `only ${(ratio * 100).toFixed(0)}% of translatable strings contain Cyrillic` });
  checked++;
  if (issues.length) {
    failed++;
    console.log(`✗ ${dir}/week${week}Content.ru.ts — ${issues.length} issue(s), ${(ratio * 100).toFixed(0)}% Russian`);
    for (const i of issues.slice(0, 25)) console.log(`    ${i.path}: ${i.msg}`);
    if (issues.length > 25) console.log(`    … ${issues.length - 25} more`);
  } else {
    console.log(`✓ ${dir}/week${week}Content.ru.ts (${stats.strings} strings, ${(ratio * 100).toFixed(0)}% Russian)`);
  }
}
console.log(`\nChecked ${checked} translated file(s); ${missing} week(s) without a Russian file; ${failed} failing.`);
process.exit(failed ? 1 : 0);
