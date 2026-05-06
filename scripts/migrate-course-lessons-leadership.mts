/**
 * Round 5 — seed courseLesson documents for the Leadership Development course.
 *
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:lessons-ld
 *
 * Why this script exists
 * ──────────────────────
 * `migrate-courses.mts` already seeded a courseWeek doc per (course, week)
 * with TOP-LEVEL editable fields (title, subtitle, key quote, overview,
 * objectives, action items, module title). This script handles the LESSON
 * BODY: the per-day lesson sections, story slices, reflection questions,
 * and worksheet/wrap-up content. Each src/data/leadership-course/weekN file
 * becomes 6 courseLesson docs — one per day — so editors can update a
 * single day's body without re-publishing an entire week.
 *
 * Idempotent — uses deterministic
 *   _id = courseLesson.<courseSlug>.week-<n>.day-<d>
 * so re-runs upsert in place.
 *
 * Stable `_key` on every array item so Sanity Studio's drag-to-reorder /
 * patch-by-key edits keep working without churn.
 *
 * Doc shape (mirrors what Agent P's courseLesson schema accepts)
 * ──────────────────────────────────────────────────────────────
 *   _type: "courseLesson"
 *   course: reference → course.<slug>
 *   week: reference → courseWeek.<slug>.<n>
 *   weekNumber: number
 *   dayNumber: number (1-6)
 *   dayTitle: string (English) — "Overview & Introduction" etc.
 *   dayTitleRu: string (Russian)
 *   lessonSection: { id, heading, content[], callout, questionsToConsider[],
 *                    deeperPerspective } — for days 1-3 only
 *   storyParagraphs: string[] — sliced from week.story.paragraphs
 *   storyParagraphsRu: string[] — sliced from week.storyCentralAsia (when present)
 *   reflectionQuestions: { question, prompt }[] — for days 1-3 (questionsToConsider
 *                          off the matching lesson section) or day 5 (overflow)
 *   isWorksheetDay: boolean (day 4)
 *   isWrapUpDay: boolean (day 6)
 *   active: boolean
 *
 * Bilingual: source data only has Russian for storyCentralAsia. Other strings
 * (lesson section content, reflection questions, day titles) are English-only
 * in source and are migrated as English fields. Editors can fill the *Ru
 * counterparts in Studio later.
 *
 * Day-to-content mapping mirrors src/components/course/DayContent.tsx exactly:
 *   Day 1: lessonSection[0] + first story slice + section[0].questionsToConsider
 *   Day 2: lessonSection[1] + story slice 2 + section[1].questionsToConsider
 *   Day 3: lessonSection[2] + story slice 3 + section[2].questionsToConsider
 *   Day 4: worksheet (story slice only — worksheet itself stays in code)
 *   Day 5: real-world / practice (story slice + reflection overflow)
 *   Day 6: wrap-up (story slice + action-items aggregation)
 */
import { createClient } from "@sanity/client";
import { leadershipWeekContents } from "../src/data/leadership-course/index.js";
import type {
  LessonSection,
  ReflectionQuestion,
  StorySection,
} from "../src/data/leadership-course/types.js";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN env var.\n");
  console.error("Generate at sanity.io/manage → API → Tokens (Editor permissions).");
  console.error(
    "Then run:\n  SANITY_WRITE_TOKEN=<token> npm run migrate:lessons-ld\n",
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

const COURSE_SLUG = "leadership-development";
const COURSE_DOC_ID = `course.${COURSE_SLUG}`;
const DAYS_PER_WEEK = 6;

// ─── Day metadata ─────────────────────────────────────────────────────────────

interface DayMeta {
  title: string;
  titleRu: string;
}

const DAY_META: Record<number, DayMeta> = {
  1: { title: "Overview & Introduction", titleRu: "Обзор и введение" },
  2: { title: "Lesson Deep Dive", titleRu: "Глубокое погружение в урок" },
  3: { title: "Lesson Deep Dive", titleRu: "Глубокое погружение в урок" },
  4: { title: "Worksheet Walkthrough", titleRu: "Рабочий лист" },
  5: { title: "Application & Practice", titleRu: "Применение и практика" },
  6: { title: "Week Wrap-Up", titleRu: "Итоги недели" },
};

// ─── Story slice helper (mirrors getStorySlice in DayContent.tsx) ─────────────

function getStorySlice(
  paragraphs: string[],
  dayNum: number,
  totalDays: number = DAYS_PER_WEEK,
): string[] {
  const total = paragraphs.length;
  if (total === 0) return [];

  const basePerDay = Math.floor(total / totalDays);
  const remainder = total % totalDays;

  let start = 0;
  for (let d = 1; d <= totalDays; d++) {
    const count = basePerDay + (d <= remainder ? 1 : 0);
    if (d === dayNum) {
      return paragraphs.slice(start, start + count);
    }
    start += count;
  }
  return [];
}

// ─── Reflection slice helper (mirrors getReflectionsForDay) ───────────────────

function getReflectionsForDay(
  reflectionQuestions: ReflectionQuestion[],
  lessonSections: LessonSection[],
  dayNum: number,
): ReflectionQuestion[] {
  if (dayNum >= 1 && dayNum <= 3) {
    const section = lessonSections[dayNum - 1];
    if (section?.questionsToConsider?.length) {
      return section.questionsToConsider.map((q) => ({ question: q }));
    }
    const perDay = Math.ceil(reflectionQuestions.length / 3);
    const start = (dayNum - 1) * perDay;
    return reflectionQuestions.slice(start, start + perDay);
  }
  if (dayNum === 5) {
    // Carry over any reflectionQuestions not consumed by days 1-3
    const consumedByLessonSections = lessonSections
      .slice(0, 3)
      .every((s) => (s?.questionsToConsider?.length ?? 0) > 0);
    if (consumedByLessonSections) return reflectionQuestions;
    const perDay = Math.ceil(reflectionQuestions.length / 3);
    return reflectionQuestions.slice(perDay * 3);
  }
  return [];
}

// ─── _key helpers ─────────────────────────────────────────────────────────────

const k = (prefix: string, n: number) => `${prefix}-${n}`;

// ─── Lesson section → Sanity object ───────────────────────────────────────────
// Stable _keys are derived from the section.id + index so re-runs match.

function shapeLessonSection(
  section: LessonSection,
  weekNum: number,
  dayNum: number,
) {
  const baseKey = `w${weekNum}d${dayNum}`;
  return {
    _type: "lessonSection",
    _key: `${baseKey}-section`,
    sectionId: section.id,
    heading: section.heading,
    content: section.content.map((para, i) => ({
      _key: k(`${baseKey}-p`, i),
      _type: "block",
      style: "normal",
      markDefs: [],
      children: [
        {
          _key: k(`${baseKey}-span`, i),
          _type: "span",
          marks: [],
          text: para,
        },
      ],
    })),
    callout: section.callout
      ? {
          _type: "lessonCallout",
          type: section.callout.type,
          content: section.callout.content,
        }
      : undefined,
    questionsToConsider:
      section.questionsToConsider?.map((q, i) => ({
        _key: k(`${baseKey}-qtc`, i),
        question: q,
      })) ?? [],
    deeperPerspective: section.deeperPerspective
      ? {
          _type: "deeperPerspective",
          title: section.deeperPerspective.title,
          content: section.deeperPerspective.content.map((para, i) => ({
            _key: k(`${baseKey}-dp-p`, i),
            _type: "block",
            style: "normal",
            markDefs: [],
            children: [
              {
                _key: k(`${baseKey}-dp-span`, i),
                _type: "span",
                marks: [],
                text: para,
              },
            ],
          })),
          questions:
            section.deeperPerspective.questions?.map((q, i) => ({
              _key: k(`${baseKey}-dp-q`, i),
              question: q,
            })) ?? [],
        }
      : undefined,
  };
}

// ─── Per-day doc builder ──────────────────────────────────────────────────────

interface SeedResult {
  weekNumber: number;
  dayNumber: number;
  ok: boolean;
  error?: string;
}

function shapeStoryParagraphs(
  story: StorySection | undefined,
  dayNum: number,
  weekNum: number,
  prefix: string,
): { _key: string; text: string }[] {
  if (!story) return [];
  const slice = getStorySlice(story.paragraphs, dayNum);
  return slice.map((para, i) => ({
    _key: k(`w${weekNum}d${dayNum}-${prefix}-story`, i),
    text: para,
  }));
}

async function seedLesson(
  weekContent: (typeof leadershipWeekContents)[number],
  dayNum: number,
): Promise<SeedResult> {
  const weekNum = weekContent.week;
  const _id = `courseLesson.${COURSE_SLUG}.week-${weekNum}.day-${dayNum}`;
  const courseWeekId = `courseWeek.${COURSE_SLUG}.${weekNum}`;
  const meta = DAY_META[dayNum];

  const doc: Record<string, unknown> = {
    _id,
    _type: "courseLesson",
    course: { _type: "reference", _ref: COURSE_DOC_ID },
    week: { _type: "reference", _ref: courseWeekId },
    weekNumber: weekNum,
    dayNumber: dayNum,
    dayTitle: meta.title,
    dayTitleRu: meta.titleRu,
    isWorksheetDay: dayNum === 4,
    isWrapUpDay: dayNum === 6,
    active: true,
  };

  // Lesson section (days 1-3 only)
  if (dayNum >= 1 && dayNum <= 3) {
    const section = weekContent.lessonSections[dayNum - 1];
    if (section) {
      doc.lessonSection = shapeLessonSection(section, weekNum, dayNum);
    }
  }

  // Story slices — English (story) + Russian (storyCentralAsia) both bilingual
  doc.storyParagraphs = shapeStoryParagraphs(
    weekContent.story,
    dayNum,
    weekNum,
    "en",
  );
  if (weekContent.storyCentralAsia) {
    doc.storyParagraphsRu = shapeStoryParagraphs(
      weekContent.storyCentralAsia,
      dayNum,
      weekNum,
      "ru",
    );
  }

  // Reflection questions for the day
  const reflections = getReflectionsForDay(
    weekContent.reflectionQuestions,
    weekContent.lessonSections,
    dayNum,
  );
  doc.reflectionQuestions = reflections.map((rq, i) => ({
    _key: k(`w${weekNum}d${dayNum}-rq`, i),
    question: rq.question,
    prompt: rq.prompt,
  }));

  try {
    await client.createOrReplace(doc as Parameters<typeof client.createOrReplace>[0]);
    return { weekNumber: weekNum, dayNumber: dayNum, ok: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    return { weekNumber: weekNum, dayNumber: dayNum, ok: false, error: message };
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(
    `\n🚀 Seeding courseLesson docs for "${COURSE_SLUG}" (project ${projectId})\n`,
  );
  console.log(
    `   ${leadershipWeekContents.length} weeks × ${DAYS_PER_WEEK} days = ${
      leadershipWeekContents.length * DAYS_PER_WEEK
    } total lessons\n`,
  );

  const results: SeedResult[] = [];

  for (const weekContent of leadershipWeekContents) {
    const weekNum = weekContent.week;
    console.log(`• Week ${weekNum}: ${weekContent.title}`);
    for (let day = 1; day <= DAYS_PER_WEEK; day++) {
      const result = await seedLesson(weekContent, day);
      results.push(result);
      if (result.ok) {
        console.log(`  ✅ day ${day} — ${DAY_META[day].title}`);
      } else {
        console.log(`  ❌ day ${day} — ${result.error}`);
      }
    }
  }

  const ok = results.filter((r) => r.ok).length;
  const failed = results.length - ok;

  console.log(`\n📊 Summary`);
  console.log(`   ✅ Succeeded: ${ok}`);
  console.log(`   ❌ Failed:    ${failed}`);

  if (failed > 0) {
    console.log(
      "\nSee per-lesson errors above. Re-run after fixing — script is idempotent.\n",
    );
    process.exit(1);
  }

  console.log(
    "\nVisit https://bbborders.sanity.studio/structure/courseLesson to verify.\n",
  );
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
