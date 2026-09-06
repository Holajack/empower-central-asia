/**
 * Russian course content registry.
 *
 * Every English week file (`src/data/<course>/weekNContent.ts`) may have a
 * sibling `weekNContent.ru.ts` exporting the same object shape under the
 * same export name (e.g. `week1Content`). Files are discovered at build time
 * with Vite's glob import, so a missing translation simply falls back to
 * English — the site never breaks while translations are in progress.
 *
 * `npm run validate:ru` checks that each Russian file mirrors the English
 * structure (same ids, array lengths, field types).
 */
import type { WeekFullContent } from "@/data/course/types";
import type { BusinessWeekContent } from "@/data/business-course/types";
import type { LeadershipWeekContent } from "@/data/leadership-course/types";
import { weekFullContents } from "@/data/course";
import { businessWeekContents } from "@/data/business-course";
import { leadershipWeekContents } from "@/data/leadership-course";
import type { SupportedLanguage } from "@/lib/seo";

export type CourseSlug = "financial-literacy" | "business-creation" | "leadership-development";

type AnyWeek = WeekFullContent | BusinessWeekContent | LeadershipWeekContent;

const DIRS: Record<CourseSlug, string> = {
  "financial-literacy": "course",
  "business-creation": "business-course",
  "leadership-development": "leadership-course",
};

const EN: Record<CourseSlug, AnyWeek[]> = {
  "financial-literacy": weekFullContents,
  "business-creation": businessWeekContents,
  "leadership-development": leadershipWeekContents,
};

// Eagerly bundle every *.ru.ts week file. Keys look like
// "../course/week1Content.ru.ts" → { week1Content: {...} }.
const ruModules = import.meta.glob<Record<string, AnyWeek>>(
  ["../course/week*Content.ru.ts", "../business-course/week*Content.ru.ts", "../leadership-course/week*Content.ru.ts"],
  { eager: true }
);

const RU: Record<CourseSlug, Map<number, AnyWeek>> = {
  "financial-literacy": new Map(),
  "business-creation": new Map(),
  "leadership-development": new Map(),
};

for (const [path, mod] of Object.entries(ruModules)) {
  const m = path.match(/\.\.\/([a-z-]+)\/week(\d+)Content\.ru\.ts$/);
  if (!m) continue;
  const slug = (Object.keys(DIRS) as CourseSlug[]).find((s) => DIRS[s] === m[1]);
  if (!slug) continue;
  const week = Number(m[2]);
  const content = (mod as Record<string, AnyWeek>)[`week${week}Content`] ?? Object.values(mod)[0];
  if (content && typeof content === "object" && "week" in content) RU[slug].set(week, content);
}

/** Which weeks have a Russian translation (for progress reporting / tests). */
export function translatedWeeks(course: CourseSlug): number[] {
  return Array.from(RU[course].keys()).sort((a, b) => a - b);
}

export function getLocalizedWeek<T extends AnyWeek = AnyWeek>(course: CourseSlug, weekNum: number, lang: SupportedLanguage): T | undefined {
  const en = EN[course].find((w) => w.week === weekNum) as T | undefined;
  if (lang === "ru") return (RU[course].get(weekNum) as T | undefined) ?? en;
  return en;
}

export function getLocalizedWeeks<T extends AnyWeek = AnyWeek>(course: CourseSlug, lang: SupportedLanguage): T[] {
  return EN[course].map((w) => getLocalizedWeek<T>(course, w.week, lang) as T);
}
