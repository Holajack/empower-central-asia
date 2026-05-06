/**
 * Hooks for fetching course + courseWeek docs from Sanity.
 *
 *   useCourse(slug)                       → course doc
 *   useCourseWeek(courseSlug, weekNumber) → single courseWeek doc
 *
 * Both fall back to undefined when Sanity is empty (callers keep the
 * existing hardcoded data file as the fallback render path — there's no
 * generic course fallback because the rich lessonSections content stays
 * hardcoded for now and merging two shapes would be lossy).
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized, getLocalizedArray } from "@/lib/localized";

export interface CourseDoc {
  _id: string;
  slug: string;
  title: string;
  titleRu?: string;
  tagline?: string;
  taglineRu?: string;
  description?: string;
  descriptionRu?: string;
  duration?: string;
  level?: string;
  weekCount?: number;
  getTitle: (isCentralAsia: boolean) => string;
  getTagline: (isCentralAsia: boolean) => string;
  getDescription: (isCentralAsia: boolean) => string;
}

export interface CourseWeekDoc {
  _id: string;
  weekNumber: number;
  moduleNumber?: number;
  moduleTitle?: string;
  moduleTitleRu?: string;
  title: string;
  titleRu?: string;
  subtitle?: string;
  subtitleRu?: string;
  keyQuote?: string;
  keyQuoteRu?: string;
  quoteAuthor?: string;
  overview?: string;
  overviewRu?: string;
  objectives?: string[];
  objectivesRu?: string[];
  actionItems?: string[];
  actionItemsRu?: string[];
  videoEmbed?: { provider?: string; videoId?: string; caption?: string };
  getTitle: (isCentralAsia: boolean) => string;
  getSubtitle: (isCentralAsia: boolean) => string;
  getKeyQuote: (isCentralAsia: boolean) => string;
  getOverview: (isCentralAsia: boolean) => string;
  getObjectives: (isCentralAsia: boolean) => string[];
  getActionItems: (isCentralAsia: boolean) => string[];
  getModuleTitle: (isCentralAsia: boolean) => string;
}

const COURSE_QUERY = /* groq */ `
  *[_type == "course" && slug.current == $slug][0]{
    _id,
    "slug": slug.current,
    title,
    titleRu,
    tagline,
    taglineRu,
    description,
    descriptionRu,
    duration,
    level,
    weekCount
  }
`;

interface RawCourse extends Omit<CourseDoc, "getTitle" | "getTagline" | "getDescription"> {}

function shapeCourse(raw: RawCourse): CourseDoc {
  return {
    ...raw,
    getTitle: (isCA) => getLocalized(raw.title, raw.titleRu, isCA),
    getTagline: (isCA) => getLocalized(raw.tagline ?? "", raw.taglineRu, isCA),
    getDescription: (isCA) => getLocalized(raw.description ?? "", raw.descriptionRu, isCA),
  };
}

export function useCourse(slug: string): { course: CourseDoc | null; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["course", slug],
    enabled: !!slug,
    queryFn: async () => {
      try {
        return await sanity.fetch<RawCourse | null>(COURSE_QUERY, { slug });
      } catch {
        return null;
      }
    },
  });
  return { course: data ? shapeCourse(data) : null, isLoading };
}

const WEEK_QUERY = /* groq */ `
  *[_type == "courseWeek" && course->slug.current == $courseSlug && weekNumber == $weekNumber][0]{
    _id,
    weekNumber,
    moduleNumber,
    moduleTitle,
    moduleTitleRu,
    title,
    titleRu,
    subtitle,
    subtitleRu,
    keyQuote,
    keyQuoteRu,
    quoteAuthor,
    overview,
    overviewRu,
    objectives,
    objectivesRu,
    actionItems,
    actionItemsRu,
    videoEmbed
  }
`;

interface RawCourseWeek
  extends Omit<
    CourseWeekDoc,
    | "getTitle"
    | "getSubtitle"
    | "getKeyQuote"
    | "getOverview"
    | "getObjectives"
    | "getActionItems"
    | "getModuleTitle"
  > {}

function shapeWeek(raw: RawCourseWeek): CourseWeekDoc {
  return {
    ...raw,
    getTitle: (isCA) => getLocalized(raw.title, raw.titleRu, isCA),
    getSubtitle: (isCA) => getLocalized(raw.subtitle ?? "", raw.subtitleRu, isCA),
    getKeyQuote: (isCA) => getLocalized(raw.keyQuote ?? "", raw.keyQuoteRu, isCA),
    getOverview: (isCA) => getLocalized(raw.overview ?? "", raw.overviewRu, isCA),
    getObjectives: (isCA) => getLocalizedArray(raw.objectives, raw.objectivesRu, isCA),
    getActionItems: (isCA) => getLocalizedArray(raw.actionItems, raw.actionItemsRu, isCA),
    getModuleTitle: (isCA) =>
      getLocalized(raw.moduleTitle ?? "", raw.moduleTitleRu, isCA),
  };
}

export function useCourseWeek(
  courseSlug: string,
  weekNumber: number
): { week: CourseWeekDoc | null; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["courseWeek", courseSlug, weekNumber],
    enabled: !!courseSlug && weekNumber > 0,
    queryFn: async () => {
      try {
        return await sanity.fetch<RawCourseWeek | null>(WEEK_QUERY, {
          courseSlug,
          weekNumber,
        });
      } catch {
        return null;
      }
    },
  });
  return { week: data ? shapeWeek(data) : null, isLoading };
}

/**
 * Round 5 — courseLesson per-day docs. One doc per (course, week, day),
 * `dayNumber` 1..6. The page consumer slices per current day.
 *
 * Returns `lessons: []` (empty array) when Sanity has no docs yet so the
 * caller can use `lessons.length > 0` as the "use Sanity" gate and fall
 * back to the hardcoded src/data/<course>/weekN.ts content otherwise.
 *
 * Final shape of the doc is owned by Agent P (schema). This hook reads
 * whatever fields the schema exposes — when Agent P lands the schema, the
 * GROQ projection here may need to grow to match.
 */
export interface CourseLessonDoc {
  _id: string;
  weekNumber: number;
  dayNumber: number;
  dayTitle?: string;
  dayTitleRu?: string;
  storyParagraphs?: { _key: string; text: string }[];
  storyParagraphsRu?: { _key: string; text: string }[];
  reflectionQuestions?: {
    _key: string;
    question: string;
    prompt?: string;
  }[];
  isWorksheetDay?: boolean;
  isWrapUpDay?: boolean;
  // lessonSection block content is opaque to this hook — page renders it
  // via PortableText if/when callers want to.
  lessonSection?: unknown;
}

const LESSONS_QUERY = /* groq */ `
  *[_type == "courseLesson" && course->slug.current == $courseSlug && weekNumber == $weekNumber] | order(dayNumber asc){
    _id,
    weekNumber,
    dayNumber,
    dayTitle,
    dayTitleRu,
    storyParagraphs,
    storyParagraphsRu,
    reflectionQuestions,
    isWorksheetDay,
    isWrapUpDay,
    lessonSection
  }
`;

export function useCourseWeekLessons(args: {
  course: string;
  weekNumber: number;
}): { lessons: CourseLessonDoc[]; isLoading: boolean } {
  const { course, weekNumber } = args;
  const { data, isLoading } = useQuery({
    queryKey: ["courseLessons", course, weekNumber],
    enabled: !!course && weekNumber > 0,
    queryFn: async () => {
      try {
        return (
          (await sanity.fetch<CourseLessonDoc[]>(LESSONS_QUERY, {
            courseSlug: course,
            weekNumber,
          })) ?? []
        );
      } catch {
        return [];
      }
    },
  });
  return { lessons: data ?? [], isLoading };
}
