/**
 * Phase 8 — seed course + courseWeek docs from src/data/courseContent.ts,
 * src/data/business-course/, src/data/leadership-course/.
 *
 *   SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-courses.mts
 *
 * Migrates TOP-LEVEL editable fields: title, subtitle, key quote, overview,
 * objectives, action items, module info. Deep lesson sections / stories /
 * worksheets stay hardcoded — they're a separate (much larger) follow-up.
 *
 * Idempotent: _id="course.<slug>" + _id="courseWeek.<courseSlug>.<n>".
 */
import { createClient } from "@sanity/client";
import { courseWeeks as financialWeeks } from "../src/data/courseContent.js";
import { businessWeekContents } from "../src/data/business-course/index.js";
import { leadershipWeekContents } from "../src/data/leadership-course/index.js";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN.\n");
  process.exit(1);
}
const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

interface CourseDef {
  slug: string;
  title: string;
  titleRu: string;
  tagline: string;
  taglineRu: string;
  description: string;
  descriptionRu: string;
  duration: string;
  level: "beginner" | "intermediate" | "advanced" | "all";
  weekCount: number;
}

const COURSES: CourseDef[] = [
  {
    slug: "financial-literacy",
    title: "Financial Literacy Course",
    titleRu: "Курс финансовой грамотности",
    tagline: "Take control of your money — and your future.",
    taglineRu: "Возьмите под контроль свои деньги — и своё будущее.",
    description:
      "Free, practical financial education with our Learn-Practice-Apply method. No jargon, no fees, no catch.",
    descriptionRu:
      "Бесплатное, практическое финансовое образование. Без жаргона, без платы, без уловок.",
    duration: "6 weeks",
    level: "beginner",
    weekCount: 6,
  },
  {
    slug: "business-creation",
    title: "Business Creation Course",
    titleRu: "Курс создания бизнеса",
    tagline: "Turn your idea into a working business.",
    taglineRu: "Превратите свою идею в работающий бизнес.",
    description:
      "A step-by-step path from idea to revenue: validate your concept, build a lean plan, launch, and grow.",
    descriptionRu:
      "Пошаговый путь от идеи до дохода: проверьте концепцию, составьте план, запустите бизнес и развивайтесь.",
    duration: "12 weeks",
    level: "intermediate",
    weekCount: 12,
  },
  {
    slug: "leadership-development",
    title: "Leadership Development Course",
    titleRu: "Курс развития лидерства",
    tagline: "Lead yourself, your family, and your community.",
    taglineRu: "Веди себя, свою семью и своё сообщество.",
    description:
      "Build the character and skills to lead — at home, at work, and in the world.",
    descriptionRu:
      "Развивайте характер и навыки лидера — дома, на работе и в мире.",
    duration: "12 weeks",
    level: "intermediate",
    weekCount: 12,
  },
];

async function seedCourse(c: CourseDef) {
  const _id = `course.${c.slug}`;
  console.log(`→ course ${c.slug}`);
  await client.createOrReplace({
    _id,
    _type: "course",
    title: c.title,
    titleRu: c.titleRu,
    slug: { _type: "slug", current: c.slug },
    tagline: c.tagline,
    taglineRu: c.taglineRu,
    description: c.description,
    descriptionRu: c.descriptionRu,
    duration: c.duration,
    level: c.level,
    weekCount: c.weekCount,
    active: true,
  });
  return _id;
}

interface AnyWeek {
  week: number;
  module?: { number?: number; title?: string };
  title?: string;
  subtitle?: string;
  keyQuote?: string;
  quoteAuthor?: string;
  overview?: string;
  objectives?: string[];
  actionItems?: string[];
}

async function seedWeek(courseSlug: string, courseId: string, w: AnyWeek) {
  const _id = `courseWeek.${courseSlug}.${w.week}`;
  console.log(`  → ${courseSlug} week ${w.week}: ${w.title ?? "(untitled)"}`);
  await client.createOrReplace({
    _id,
    _type: "courseWeek",
    course: { _type: "reference", _ref: courseId },
    weekNumber: w.week,
    moduleNumber: w.module?.number,
    moduleTitle: w.module?.title,
    title: w.title,
    subtitle: w.subtitle,
    keyQuote: w.keyQuote,
    quoteAuthor: w.quoteAuthor,
    overview: w.overview,
    objectives: w.objectives ?? [],
    actionItems: w.actionItems ?? [],
    active: true,
  });
}

async function main() {
  console.log(`\n🚀 Seeding 3 courses + their weeks (project ${projectId})\n`);

  // Step 1: courses
  const courseIds: Record<string, string> = {};
  for (const c of COURSES) {
    courseIds[c.slug] = await seedCourse(c);
  }

  // Step 2: weeks
  console.log("\n📚 Seeding course weeks:\n");

  console.log("• Financial Literacy");
  for (const w of financialWeeks) {
    await seedWeek("financial-literacy", courseIds["financial-literacy"], w as AnyWeek);
  }

  console.log("\n• Business Creation");
  for (const w of businessWeekContents) {
    await seedWeek("business-creation", courseIds["business-creation"], w as AnyWeek);
  }

  console.log("\n• Leadership Development");
  for (const w of leadershipWeekContents) {
    await seedWeek("leadership-development", courseIds["leadership-development"], w as AnyWeek);
  }

  const totalWeeks =
    financialWeeks.length + businessWeekContents.length + leadershipWeekContents.length;
  console.log(`\n✅ Done — 3 courses + ${totalWeeks} weeks seeded.`);
  console.log("Visit https://bbborders.sanity.studio/structure/course to verify.\n");
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
