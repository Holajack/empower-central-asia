/**
 * Migrate Business Creation course content (12 weeks × 6 days = 72 lessons)
 * from src/data/business-course/* into Sanity courseLesson docs.
 *
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:lessons-bc
 *
 * Stable doc IDs: courseLesson.business-creation.week-{N}.day-{D}
 *
 * Day mapping (matches the runtime view in BusinessCourseWeek + DayContent):
 *   - Day 1 (Overview):   keyQuote + overview + first lessonSection
 *   - Day 2 (Lesson):     lessonSections[1]
 *   - Day 3 (Lesson):     lessonSections[2]
 *   - Day 4 (Worksheet):  worksheetDef summary + worksheetSlug for runtime
 *   - Day 5 (Practice):   story + reflectionQuestions + fourHats prompts
 *   - Day 6 (Wrap-Up):    actionItems + realWorldActivity recap
 *
 * Idempotent: createOrReplace by stable _id. Safe to re-run.
 *
 * NOTE: This script is the data-only migration. The schema (courseLesson) is
 * owned by Agent P on a parallel branch — if you run this before P's schema
 * lands, validation will fail when P's branch merges. Re-run after merge.
 */
import { createClient } from "@sanity/client";
import { businessWeekContents } from "../src/data/business-course/index.js";
import type {
  BusinessWeekContent,
  FourHatsCheckpointDef,
  LessonSection,
  StorySection,
  WorksheetDef,
  ReflectionQuestion,
} from "../src/data/business-course/types.js";
import { businessCreationRelatedPosts } from "../src/data/course/relatedBlogPosts.js";

// ─── Config ──────────────────────────────────────────────────────────────────

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\nMissing SANITY_WRITE_TOKEN env var.\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const COURSE_SLUG = "business-creation";
const COURSE_REF = `course.${COURSE_SLUG}`;
const DAYS_PER_WEEK = 6;

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(input: string, maxLen = 80): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, maxLen)
    .replace(/-$/, "");
}

let _keySeed = 0;
function key(prefix: string): string {
  return `${prefix}-${++_keySeed}`;
}

function resetKeyCounter() {
  _keySeed = 0;
}

// ─── Portable Text builders ──────────────────────────────────────────────────

interface PtSpan {
  _type: "span";
  _key: string;
  marks: string[];
  text: string;
}
interface PtBlock {
  _type: "block";
  _key: string;
  style: string;
  listItem?: "bullet" | "number";
  level?: number;
  markDefs: unknown[];
  children: PtSpan[];
}

function span(text: string): PtSpan {
  return { _type: "span", _key: key("s"), marks: [], text };
}

function block(text: string, style = "normal"): PtBlock {
  return {
    _type: "block",
    _key: key("b"),
    style,
    markDefs: [],
    children: [span(text)],
  };
}

function bulletBlock(text: string): PtBlock {
  return {
    _type: "block",
    _key: key("bl"),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [span(text)],
  };
}

function paragraphsToBlocks(paragraphs: string[] | undefined): PtBlock[] {
  if (!paragraphs || paragraphs.length === 0) return [];
  return paragraphs.map((p) => block(p));
}

// ─── Day content builders ────────────────────────────────────────────────────

interface KeyedItem {
  _key: string;
  text: string;
  textRu?: string;
}

function keyedFromStrings(items: string[]): KeyedItem[] {
  return items.map((text, i) => ({
    _key: key(`it-${i}`),
    text,
  }));
}

interface DayBuild {
  dayNumber: number;
  title: string;
  titleRu?: string;
  keyQuote?: string;
  keyQuoteRu?: string;
  overviewBlocks: PtBlock[];
  overviewRuBlocks: PtBlock[];
  transcriptBlocks: PtBlock[];
  transcriptRuBlocks: PtBlock[];
  keyTakeaways: KeyedItem[];
  actionItems: KeyedItem[];
  worksheetSlug?: string;
  duration: string;
  // additive helpers (callers convert to slug etc.)
}

/**
 * Slice story paragraphs evenly across 6 days (matches DayContent.getStorySlice).
 */
function getStorySlice(
  paragraphs: string[],
  dayNum: number,
  totalDays = DAYS_PER_WEEK,
): string[] {
  if (paragraphs.length === 0) return [];
  const basePerDay = Math.floor(paragraphs.length / totalDays);
  const remainder = paragraphs.length % totalDays;
  let cursor = 0;
  for (let d = 1; d <= totalDays; d++) {
    const count = basePerDay + (d <= remainder ? 1 : 0);
    if (d === dayNum) return paragraphs.slice(cursor, cursor + count);
    cursor += count;
  }
  return [];
}

function lessonSectionToBlocks(section: LessonSection | undefined): PtBlock[] {
  if (!section) return [];
  const blocks: PtBlock[] = [];
  blocks.push(block(section.heading, "h2"));
  for (const para of section.content) blocks.push(block(para));
  if (section.callout) {
    blocks.push(
      block(
        `${section.callout.type.toUpperCase()}: ${section.callout.content}`,
        "blockquote",
      ),
    );
  }
  if (section.questionsToConsider && section.questionsToConsider.length > 0) {
    blocks.push(block("Questions to Consider", "h3"));
    for (const q of section.questionsToConsider) blocks.push(bulletBlock(q));
  }
  return blocks;
}

function worksheetDefToBlocks(def: WorksheetDef | undefined): PtBlock[] {
  if (!def) return [];
  const blocks: PtBlock[] = [];
  blocks.push(block(def.title, "h2"));
  blocks.push(block(def.description));
  for (const section of def.sections) {
    blocks.push(block(section.title, "h3"));
    if (section.description) blocks.push(block(section.description));
    for (const f of section.fields) {
      const helpText = f.helpText ? ` — ${f.helpText}` : "";
      blocks.push(bulletBlock(`${f.label}${helpText}`));
    }
  }
  return blocks;
}

function storyToBlocks(story: StorySection | undefined): PtBlock[] {
  if (!story) return [];
  const blocks: PtBlock[] = [];
  blocks.push(block(story.title, "h2"));
  for (const p of story.paragraphs) blocks.push(block(p));
  return blocks;
}

function reflectionsToBlocks(qs: ReflectionQuestion[]): PtBlock[] {
  const blocks: PtBlock[] = [];
  if (qs.length === 0) return blocks;
  blocks.push(block("Reflection Questions", "h2"));
  for (const q of qs) {
    blocks.push(block(q.question, "h3"));
    if (q.prompt) blocks.push(block(q.prompt));
  }
  return blocks;
}

function fourHatsToBlocks(fh: FourHatsCheckpointDef | undefined): PtBlock[] {
  if (!fh) return [];
  const blocks: PtBlock[] = [];
  blocks.push(block(`Four Hats Checkpoint #${fh.checkpointNumber}`, "h2"));
  blocks.push(block("Pitch Prompt", "h3"));
  blocks.push(block(fh.pitchPrompt));
  blocks.push(block("Evaluation Prompt", "h3"));
  blocks.push(block(fh.evaluationPrompt));
  blocks.push(block("White Hat (Facts & Information)", "h3"));
  blocks.push(block(fh.whiteHatPrompt));
  blocks.push(block("Black Hat (Risks & Caution)", "h3"));
  blocks.push(block(fh.blackHatPrompt));
  blocks.push(block("Yellow Hat (Optimism & Benefits)", "h3"));
  blocks.push(block(fh.yellowHatPrompt));
  blocks.push(block("Gold Hat (Vision & Transformation)", "h3"));
  blocks.push(block(fh.goldHatPrompt));
  return blocks;
}

// ─── Title generators (English only — Russian variants left blank) ──────────

const DAY_LABELS: Record<number, string> = {
  1: "Overview",
  2: "Lesson",
  3: "Lesson",
  4: "Worksheet",
  5: "Practice",
  6: "Wrap-Up",
};

function dayTitle(week: BusinessWeekContent, dayNum: number): string {
  const label = DAY_LABELS[dayNum] ?? `Day ${dayNum}`;
  // For lesson days 2-3, use the section heading directly if available
  if (dayNum === 2 && week.lessonSections[1]) {
    return week.lessonSections[1].heading;
  }
  if (dayNum === 3 && week.lessonSections[2]) {
    return week.lessonSections[2].heading;
  }
  if (dayNum === 1 && week.lessonSections[0]) {
    return week.lessonSections[0].heading;
  }
  if (dayNum === 4) return week.worksheetDef.title;
  if (dayNum === 5) return week.story.title;
  if (dayNum === 6) return `${week.title} — ${label}`;
  return `${week.title} — ${label}`;
}

// ─── Build a single day's lesson doc ─────────────────────────────────────────

function buildDay(week: BusinessWeekContent, dayNum: number): DayBuild {
  resetKeyCounter();

  const title = dayTitle(week, dayNum);

  let overviewBlocks: PtBlock[] = [];
  let transcriptBlocks: PtBlock[] = [];
  let keyTakeaways: KeyedItem[] = [];
  let actionItems: KeyedItem[] = [];
  let worksheetSlug: string | undefined;
  let keyQuote: string | undefined;

  if (dayNum === 1) {
    // Day 1: Overview - week-level context + first lesson section
    overviewBlocks = paragraphsToBlocks([week.overview]);
    keyQuote = week.keyQuote;
    transcriptBlocks = lessonSectionToBlocks(week.lessonSections[0]);
    keyTakeaways = keyedFromStrings(
      (week.keyTopics ?? []).slice(0, 3).map((t) => `${t.title}: ${t.description}`),
    );
    actionItems = keyedFromStrings(week.objectives.slice(0, 2));
  } else if (dayNum === 2) {
    overviewBlocks = paragraphsToBlocks([
      `${week.title} — building deeper understanding (Day 2 of 6).`,
    ]);
    transcriptBlocks = lessonSectionToBlocks(week.lessonSections[1]);
    const ks = week.lessonSections[1]?.questionsToConsider ?? [];
    keyTakeaways = keyedFromStrings(ks);
    actionItems = keyedFromStrings(week.actionItems.slice(0, 2));
  } else if (dayNum === 3) {
    overviewBlocks = paragraphsToBlocks([
      `${week.title} — applying the framework (Day 3 of 6).`,
    ]);
    transcriptBlocks = lessonSectionToBlocks(week.lessonSections[2]);
    const ks = week.lessonSections[2]?.questionsToConsider ?? [];
    keyTakeaways = keyedFromStrings(ks);
    actionItems = keyedFromStrings(week.actionItems.slice(2, 4));
  } else if (dayNum === 4) {
    // Day 4: Worksheet
    worksheetSlug = `business-${week.week}`;
    overviewBlocks = paragraphsToBlocks([
      `Today you'll work through the ${week.worksheetDef.title} worksheet — a hands-on tool for applying this week's concepts to your own business.`,
    ]);
    transcriptBlocks = worksheetDefToBlocks(week.worksheetDef);
    keyTakeaways = keyedFromStrings([
      `Complete the ${week.worksheetDef.title} worksheet`,
      "Save your worksheet — it builds toward your final business plan",
    ]);
    actionItems = keyedFromStrings([
      `Open and complete the ${week.worksheetDef.title} worksheet`,
      "Reflect on what surprised you in the exercise",
    ]);
  } else if (dayNum === 5) {
    // Day 5: Practice (story + reflections + optional four hats)
    overviewBlocks = paragraphsToBlocks([
      "Today you'll spend time with the week's story and reflection questions — translating concepts into your own life.",
    ]);
    const storyBlocks = storyToBlocks(week.story);
    const reflectionBlocks = reflectionsToBlocks(week.reflectionQuestions);
    const fourHatsBlocks = fourHatsToBlocks(week.fourHatsCheckpoint);
    transcriptBlocks = [...storyBlocks, ...reflectionBlocks, ...fourHatsBlocks];
    keyTakeaways = keyedFromStrings(
      week.reflectionQuestions.slice(0, 3).map((q) => q.question),
    );
    actionItems = keyedFromStrings([
      "Read the full story and reflection questions",
      "Write or record your responses",
      ...(week.fourHatsCheckpoint
        ? ["Complete the Four Hats checkpoint pitch + evaluation"]
        : []),
    ]);
  } else if (dayNum === 6) {
    // Day 6: Wrap-Up
    overviewBlocks = paragraphsToBlocks([
      `${week.title} — wrap-up. Review the week, complete real-world activities, and check your progress before moving on.`,
    ]);
    const wrapBlocks: PtBlock[] = [];
    wrapBlocks.push(block("Real-World Activity", "h2"));
    wrapBlocks.push(block(week.realWorldActivity.title, "h3"));
    wrapBlocks.push(block(week.realWorldActivity.description));
    wrapBlocks.push(block("Action Items", "h2"));
    for (const a of week.actionItems) wrapBlocks.push(bulletBlock(a));
    if (week.toolLink) {
      wrapBlocks.push(block("Recommended Tool", "h3"));
      wrapBlocks.push(block(`${week.toolLabel ?? "Tool"} — ${week.toolLink}`));
    }
    transcriptBlocks = wrapBlocks;
    keyTakeaways = keyedFromStrings(week.objectives.slice(-3));
    actionItems = keyedFromStrings(week.actionItems);
  }

  return {
    dayNumber: dayNum,
    title,
    keyQuote,
    overviewBlocks,
    overviewRuBlocks: [],
    transcriptBlocks,
    transcriptRuBlocks: [],
    keyTakeaways,
    actionItems,
    worksheetSlug,
    duration: dayNum === 4 || dayNum === 5 ? "30 min" : "20 min",
  };
}

// ─── Persist a single lesson doc ─────────────────────────────────────────────

async function seedLessonDoc(week: BusinessWeekContent, dayNum: number) {
  const built = buildDay(week, dayNum);
  const _id = `courseLesson.${COURSE_SLUG}.week-${week.week}.day-${dayNum}`;
  const slugCurrent = slugify(`week-${week.week}-day-${dayNum}-${built.title}`);

  const doc = {
    _id,
    _type: "courseLesson",
    course: { _type: "reference" as const, _ref: COURSE_REF },
    week: {
      _type: "reference" as const,
      _ref: `courseWeek.${COURSE_SLUG}.${week.week}`,
    },
    dayNumber: dayNum,
    title: built.title,
    titleRu: undefined as string | undefined,
    slug: { _type: "slug" as const, current: slugCurrent },
    keyQuote: built.keyQuote ?? undefined,
    keyQuoteRu: undefined as string | undefined,
    overview: built.overviewBlocks,
    overviewRu: built.overviewRuBlocks,
    transcript: built.transcriptBlocks,
    transcriptRu: built.transcriptRuBlocks,
    keyTakeaways: built.keyTakeaways,
    actionItems: built.actionItems,
    videoEmbed: undefined as undefined,
    worksheetSlug: built.worksheetSlug,
    relatedBlogPostSlugs: businessCreationRelatedPosts[week.week] ?? [],
    duration: built.duration,
    order: (week.week - 1) * DAYS_PER_WEEK + dayNum,
  };

  try {
    await client.createOrReplace(doc);
    console.log(
      `  Week ${week.week} Day ${dayNum}: ${built.title.slice(0, 60)}`,
    );
    return { ok: true };
  } catch (err) {
    console.error(
      `  FAILED Week ${week.week} Day ${dayNum}: ${(err as Error).message}`,
    );
    return { ok: false, err };
  }
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(
    `\nmigrate-course-lessons-business — seeding ${businessWeekContents.length} weeks × ${DAYS_PER_WEEK} days = ${businessWeekContents.length * DAYS_PER_WEEK} lessons (project ${projectId})\n`,
  );

  let ok = 0;
  let fail = 0;

  for (const week of businessWeekContents) {
    console.log(`Week ${week.week}: ${week.title}`);
    for (let day = 1; day <= DAYS_PER_WEEK; day++) {
      const r = await seedLessonDoc(week, day);
      if (r.ok) ok++;
      else fail++;
    }
  }

  console.log(`\n────────────────────────────────────`);
  console.log(`Seeded: ${ok}  Failed: ${fail}`);
  console.log(
    `\nView at: https://bbborders.sanity.studio/structure (filter to courseLesson)\n`,
  );

  if (fail > 0) process.exit(1);
}

main().catch((err) => {
  console.error("\nMigration crashed:", err);
  process.exit(1);
});
