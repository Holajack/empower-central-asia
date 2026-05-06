/**
 * Migration — Financial Literacy course lessons (per-day) into Sanity.
 *
 *   SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-course-lessons-financial-literacy.mts
 *
 * For each of weeks 1-6, seeds one `courseLesson` doc per day:
 *   - Week 1: 7 lessons (day 0 intro + days 1-6)
 *   - Weeks 2-6: 6 lessons each (days 1-6)
 *   Total: 37 lesson docs.
 *
 * Idempotent: stable `_id = courseLesson.financial-literacy.week-<N>.day-<D>`
 * with `createOrReplace`. Re-runs update existing docs in place.
 *
 * Source data lives in src/data/course/week{1..6}Content.ts. Those files
 * stay as the runtime fallback; this migration just lifts the per-day
 * metadata into Sanity so editors can tweak titles, quotes, action items,
 * worksheet slugs, video embeds, and related blog posts without touching
 * code.
 *
 * Russian (`titleRu`, `keyQuoteRu`, `transcriptRu`, etc.) is not populated
 * here — the source data is English-only. Editors translate inside Studio.
 */
import { createClient } from "@sanity/client";
import type { WeekFullContent } from "../src/data/course/types.js";
import { week1Content } from "../src/data/course/week1Content.js";
import { week2Content } from "../src/data/course/week2Content.js";
import { week3Content } from "../src/data/course/week3Content.js";
import { week4Content } from "../src/data/course/week4Content.js";
import { week5Content } from "../src/data/course/week5Content.js";
import { week6Content } from "../src/data/course/week6Content.js";
import { financialLiteracyRelatedPosts } from "../src/data/course/relatedBlogPosts.js";

// ───────── Sanity client ─────────
const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN env var.");
  console.error(
    "Create a token at https://sanity.io/manage → BBB → API → Tokens (Editor permission), then run:\n"
  );
  console.error(
    "  SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-course-lessons-financial-literacy.mts\n"
  );
  process.exit(1);
}
const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const COURSE_SLUG = "financial-literacy";
const COURSE_REF = "course.financial-literacy";

// ───────── Helpers ─────────

/** slugify -> stable identifiers usable as Sanity _key values. */
function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Build a stable _key from a base + index. */
function makeKey(base: string, idx: number): string {
  const cleanBase = slugify(base) || "item";
  return `${cleanBase}-${idx}`.slice(0, 60);
}

/**
 * Convert a plain-text paragraph (or paragraphs separated by blank lines)
 * into Portable Text blocks. We don't need rich marks here — the source
 * paragraphs are unformatted prose.
 */
interface PTSpan {
  _type: "span";
  _key: string;
  text: string;
  marks: string[];
}
interface PTBlock {
  _type: "block";
  _key: string;
  style: "normal";
  markDefs: never[];
  children: PTSpan[];
}

function paragraphsToBlocks(
  paragraphs: string[],
  keyPrefix: string
): PTBlock[] {
  return paragraphs
    .filter((p) => p && p.trim().length > 0)
    .map((p, i) => ({
      _type: "block" as const,
      _key: `${keyPrefix}-p${i}`,
      style: "normal" as const,
      markDefs: [],
      children: [
        {
          _type: "span" as const,
          _key: `${keyPrefix}-p${i}-s0`,
          text: p,
          marks: [],
        },
      ],
    }));
}

function textToBlocks(text: string, keyPrefix: string): PTBlock[] {
  const paragraphs = text
    .split(/\n\s*\n/)
    .map((p) => p.trim())
    .filter(Boolean);
  return paragraphsToBlocks(paragraphs, keyPrefix);
}

// ───────── Per-week lesson definitions ─────────

interface DayDef {
  day: number;
  title: string;
  /** Optional override for keyQuote — defaults to week-level. */
  keyQuote?: string;
  /** Optional intro/overview text for this lesson. */
  overview: string;
  /** Long-form transcript text (paragraphs, joined with \n\n). */
  transcript: string;
  /** Bullet list of takeaways. */
  takeaways: string[];
  /** Optional override for action items — defaults to week-level. */
  actionItems?: string[];
  /** Worksheet slug (only for day 4 typically). */
  worksheetSlug?: string;
  /** Estimated duration display text. */
  duration: string;
  /** Related blog post slugs override (defaults to week-level). */
  relatedBlogPostSlugs?: string[];
}

interface WeekDays {
  weekNumber: number;
  days: DayDef[];
}

/**
 * Day-title strings used when synthesizing lesson docs. Mirrors the
 * `getDayTitle()` mapping in DayContent.tsx.
 */
const DAY_HEAD: Record<number, string> = {
  0: "Welcome & Course Introduction",
  1: "Overview & Introduction",
  2: "Lesson Deep Dive",
  3: "Lesson Deep Dive",
  4: "Worksheet Walkthrough",
  5: "Application & Practice",
  6: "Week Wrap-Up",
};

/**
 * Build the per-day lessons for a week's WeekFullContent. Each week has
 * three lessonSections; we use them for days 1, 2, 3 respectively. Day 4
 * is the worksheet, day 5 is application/practice, day 6 is wrap-up.
 *
 * Day 0 (intro) is only seeded for week 1 — the intro screen is rendered
 * from CourseWeek.tsx directly.
 */
function buildWeekDays(
  weekContent: WeekFullContent,
  worksheetSlug: string
): DayDef[] {
  const lessons = weekContent.lessonSections;
  const ls0 = lessons[0];
  const ls1 = lessons[1];
  const ls2 = lessons[2];

  const days: DayDef[] = [];

  // Day 1 — Overview + Lesson Section 1
  if (ls0) {
    days.push({
      day: 1,
      title: ls0.heading || `${DAY_HEAD[1]} — ${weekContent.title}`,
      overview: weekContent.overview,
      transcript: ls0.content.join("\n\n"),
      takeaways: ls0.questionsToConsider ?? [],
      duration: "15-20 min",
    });
  }

  // Day 2 — Lesson Section 2
  if (ls1) {
    days.push({
      day: 2,
      title: ls1.heading,
      overview: weekContent.keyTopics[1]?.description ?? "",
      transcript: ls1.content.join("\n\n"),
      takeaways: ls1.questionsToConsider ?? [],
      duration: "15-20 min",
    });
  }

  // Day 3 — Lesson Section 3
  if (ls2) {
    days.push({
      day: 3,
      title: ls2.heading,
      overview: weekContent.keyTopics[2]?.description ?? "",
      transcript: ls2.content.join("\n\n"),
      takeaways: ls2.questionsToConsider ?? [],
      duration: "15-20 min",
    });
  }

  // Day 4 — Worksheet
  days.push({
    day: 4,
    title: weekContent.worksheetDef.title,
    overview: weekContent.worksheetDef.description,
    transcript:
      "Use the interactive worksheet on this page to capture the work for this week. Your data saves automatically to your device — you can come back to it any time.",
    takeaways: weekContent.objectives.slice(0, 3),
    worksheetSlug,
    duration: "20-30 min",
  });

  // Day 5 — Application / Practice
  const day5Activity = weekContent.activities[1] ?? weekContent.activities[0];
  days.push({
    day: 5,
    title: day5Activity?.title ?? "Application & Practice",
    overview:
      day5Activity?.description ??
      "Take what you learned this week and apply it in the real world before the wrap-up.",
    transcript:
      "Today is about putting the lesson into practice. Use the activity below as a starting point, but feel free to adapt it to your situation. The goal isn't perfection — it's progress. By the end of today you should have at least one tangible piece of evidence that this week's work is shifting your habits.",
    takeaways: weekContent.actionItems.slice(0, 3),
    duration: "15-25 min",
  });

  // Day 6 — Wrap-Up
  days.push({
    day: 6,
    title: `Week ${weekContent.week} Wrap-Up: ${weekContent.title}`,
    overview: weekContent.overview,
    transcript:
      "You made it. Today is about consolidating what you learned, checking off the action items that mattered most, and getting ready for next week. Look back at the lessons, the story, and the worksheet — what's the one shift you want to carry forward?",
    takeaways: weekContent.lessonSections.map((s) => s.heading),
    actionItems: weekContent.actionItems,
    duration: "10-15 min",
  });

  return days;
}

// ───────── Build the registry ─────────

const WORKSHEET_SLUGS: Record<number, string> = {
  1: "financial-snapshot",
  2: "income-map",
  3: "zero-based-budget",
  4: "debt-inventory",
  5: "emergency-fund-plan",
  6: "progress-review",
};

const WEEK_CONTENTS: WeekFullContent[] = [
  week1Content,
  week2Content,
  week3Content,
  week4Content,
  week5Content,
  week6Content,
];

function buildAllWeekDays(): WeekDays[] {
  const list: WeekDays[] = WEEK_CONTENTS.map((wc) => ({
    weekNumber: wc.week,
    days: buildWeekDays(wc, WORKSHEET_SLUGS[wc.week] ?? `worksheet-week-${wc.week}`),
  }));

  // Week 1 also gets a Day 0 intro lesson — purely optional metadata.
  const week1 = list.find((w) => w.weekNumber === 1);
  if (week1) {
    week1.days = [
      {
        day: 0,
        title: "Welcome to the Financial Literacy Course",
        overview:
          "Before we get into Week 1, take a few minutes to understand how the course is structured, what to expect each week, and how to get the most out of it.",
        transcript:
          "We're glad you're here — whether a friend told you about us, you found us online, or you just decided it's time to take control of your money. This course was built for you.\n\nOver the next 6 weeks, you'll go through practical financial education that actually works. No jargon, no hidden fees — just clear, actionable lessons that will help you build a stronger financial foundation.\n\nEach week follows the same rhythm: Day 1 introduces the topic, Days 2–3 take you deeper into the lessons, Day 4 is a hands-on worksheet, Day 5 is real-world practice, and Day 6 is a short wrap-up before you move to the next week. You don't need financial experience. You don't need to buy anything. All you need is a willingness to be honest with yourself about where you are and a willingness to take the next step.",
        takeaways: [
          "Plan to spend 15-20 minutes per day, six days per week",
          "Use the worksheet on Day 4 — it's how the lessons stick",
          "Find one accountability partner before Week 1 begins",
        ],
        duration: "5-10 min",
      },
      ...week1.days,
    ];
  }

  return list;
}

// ───────── Sanity upserts ─────────

function lessonDocId(weekNumber: number, dayNumber: number): string {
  return `courseLesson.${COURSE_SLUG}.week-${weekNumber}.day-${dayNumber}`;
}

function weekDocId(weekNumber: number): string {
  return `courseWeek.${COURSE_SLUG}.${weekNumber}`;
}

interface LessonDoc {
  _id: string;
  _type: "courseLesson";
  course: { _type: "reference"; _ref: string };
  week: { _type: "reference"; _ref: string };
  dayNumber: number;
  order: number;
  title: string;
  slug: { _type: "slug"; current: string };
  keyQuote?: string;
  overview: PTBlock[];
  transcript: PTBlock[];
  keyTakeaways: { _type: "takeaway"; _key: string; text: string }[];
  actionItems: { _type: "actionItem"; _key: string; text: string }[];
  worksheetSlug?: string;
  relatedBlogPostSlugs: string[];
  duration: string;
}

async function seedLesson(
  weekNumber: number,
  weekTitle: string,
  weekKeyQuote: string,
  weekActionItems: string[],
  day: DayDef
): Promise<string> {
  const _id = lessonDocId(weekNumber, day.day);
  const slug = slugify(`${COURSE_SLUG}-week-${weekNumber}-day-${day.day}-${day.title}`);

  const overviewBlocks = textToBlocks(
    day.overview,
    `${slug}-ov`
  );
  const transcriptBlocks = textToBlocks(day.transcript, `${slug}-tr`);

  const takeaways = (day.takeaways ?? []).map((text, i) => ({
    _type: "takeaway" as const,
    _key: makeKey(`tk-${text}`, i),
    text,
  }));

  const actionList = day.actionItems ?? weekActionItems;
  const actionItems = actionList.map((text, i) => ({
    _type: "actionItem" as const,
    _key: makeKey(`ai-${text}`, i),
    text,
  }));

  const relatedSlugs =
    day.relatedBlogPostSlugs ?? financialLiteracyRelatedPosts[weekNumber] ?? [];

  const doc: LessonDoc = {
    _id,
    _type: "courseLesson",
    course: { _type: "reference", _ref: COURSE_REF },
    week: { _type: "reference", _ref: weekDocId(weekNumber) },
    dayNumber: day.day,
    order: day.day,
    title: day.title,
    slug: { _type: "slug", current: slug },
    keyQuote: day.keyQuote ?? weekKeyQuote,
    overview: overviewBlocks,
    transcript: transcriptBlocks,
    keyTakeaways: takeaways,
    actionItems,
    worksheetSlug: day.worksheetSlug,
    relatedBlogPostSlugs: relatedSlugs,
    duration: day.duration,
  };

  // Strip undefined values
  const clean = Object.fromEntries(
    Object.entries(doc).filter(([, v]) => v !== undefined)
  ) as Record<string, unknown>;

  await client.createOrReplace(clean as unknown as LessonDoc);
  return _id;
}

async function attachLessonsToWeek(
  weekNumber: number,
  lessonIds: string[]
): Promise<void> {
  const _id = weekDocId(weekNumber);
  const refs = lessonIds.map((ref, i) => ({
    _type: "reference" as const,
    _key: `lesson-ref-${i}`,
    _ref: ref,
  }));
  await client.patch(_id).set({ lessons: refs }).commit();
}

// ───────── Main ─────────

async function main(): Promise<void> {
  console.log(
    `\n🚀 Seeding Financial Literacy course lessons (project ${projectId}, dataset ${dataset})\n`
  );

  const weeksDays = buildAllWeekDays();
  const total = weeksDays.reduce((acc, w) => acc + w.days.length, 0);
  console.log(`📚 Plan: ${weeksDays.length} weeks · ${total} lesson docs total`);
  weeksDays.forEach((w) => {
    console.log(`   • Week ${w.weekNumber}: ${w.days.length} lessons`);
  });
  console.log("");

  let success = 0;
  let failed = 0;

  for (const w of weeksDays) {
    const wc = WEEK_CONTENTS.find((c) => c.week === w.weekNumber)!;
    console.log(`📖 Week ${w.weekNumber}: ${wc.title}`);
    const lessonIds: string[] = [];

    for (const day of w.days) {
      try {
        const id = await seedLesson(
          w.weekNumber,
          wc.title,
          wc.keyQuote,
          wc.actionItems,
          day
        );
        lessonIds.push(id);
        console.log(`   ✓ Day ${day.day}: ${day.title.slice(0, 60)}`);
        success++;
      } catch (err) {
        failed++;
        console.error(
          `   ❌ Day ${day.day}: ${day.title.slice(0, 60)} —`,
          (err as Error).message
        );
      }
    }

    // Attach lessons array on the courseWeek doc — best effort. If the week
    // doc doesn't exist yet (i.e. migrate-courses hasn't been run), warn but
    // continue. The lessons themselves still exist as standalone docs and
    // the site renders by querying them directly.
    try {
      await attachLessonsToWeek(w.weekNumber, lessonIds);
      console.log(`   ↳ attached ${lessonIds.length} lessons to courseWeek doc`);
    } catch (err) {
      console.warn(
        `   ⚠️  could not attach lessons to courseWeek week ${w.weekNumber}:`,
        (err as Error).message
      );
      console.warn(`      (run npm run migrate:courses first if you haven't)`);
    }
  }

  console.log(`\n✅ Done — ${success} lessons seeded, ${failed} failed.`);
  console.log(
    `\nVisit https://bbborders.sanity.studio/structure/courseLesson to verify.\n`
  );
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
