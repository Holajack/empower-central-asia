/**
 * Hooks for fetching course and course-week content from Sanity.
 *
 *   useCourse(slug)             → top-level course metadata
 *   useCourseWeek(slug, week)   → header content for one week (title, subtitle,
 *                                 key quote, overview, objectives, action items)
 *
 * The deeper lesson bodies (DayContent, worksheets, navigation) stay hardcoded
 * and are NOT touched by these hooks. Both hooks return `null` when Sanity is
 * unreachable so callers can fall back to their hardcoded defaults.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized, getLocalizedArray } from "@/lib/localized";

// ---------------------------------------------------------------------------
// CourseWeek shape
// ---------------------------------------------------------------------------

export interface CourseWeekData {
  courseSlug: string;
  weekNumber: number;

  // English
  title: string;
  subtitle?: string;
  keyQuote?: string;
  quoteAuthor?: string;
  overview?: string;
  objectives?: string[];
  actionItems?: string[];
  moduleTitle?: string;

  // Russian
  titleRu?: string;
  subtitleRu?: string;
  keyQuoteRu?: string;
  overviewRu?: string;
  objectivesRu?: string[];
  actionItemsRu?: string[];
  moduleTitleRu?: string;

  // Localised helpers — pass isCentralAsia from useRegion()
  getTitle: (isCentralAsia: boolean) => string;
  getSubtitle: (isCentralAsia: boolean) => string;
  getKeyQuote: (isCentralAsia: boolean) => string;
  getOverview: (isCentralAsia: boolean) => string;
  getObjectives: (isCentralAsia: boolean) => string[];
  getActionItems: (isCentralAsia: boolean) => string[];
  getModuleTitle: (isCentralAsia: boolean) => string;
}

// ---------------------------------------------------------------------------
// CourseData shape
// ---------------------------------------------------------------------------

export interface CourseData {
  slug: string;
  title: string;
  titleRu?: string;
  getTitle: (isCentralAsia: boolean) => string;
}

// ---------------------------------------------------------------------------
// Raw GROQ shapes
// ---------------------------------------------------------------------------

interface RawCourseWeek {
  courseSlug: string;
  weekNumber: number;
  title?: string;
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
  moduleTitle?: string;
  moduleTitleRu?: string;
}

interface RawCourse {
  slug: string;
  title?: string;
  titleRu?: string;
}

// ---------------------------------------------------------------------------
// Helper: attach localised methods to a raw week
// ---------------------------------------------------------------------------

function attachWeekHelpers(raw: RawCourseWeek): CourseWeekData {
  return {
    ...raw,
    title: raw.title ?? "",
    getTitle: (isCA) => getLocalized(raw.title, raw.titleRu, isCA),
    getSubtitle: (isCA) => getLocalized(raw.subtitle, raw.subtitleRu, isCA),
    getKeyQuote: (isCA) => getLocalized(raw.keyQuote, raw.keyQuoteRu, isCA),
    getOverview: (isCA) => getLocalized(raw.overview, raw.overviewRu, isCA),
    getObjectives: (isCA) => getLocalizedArray(raw.objectives, raw.objectivesRu, isCA),
    getActionItems: (isCA) => getLocalizedArray(raw.actionItems, raw.actionItemsRu, isCA),
    getModuleTitle: (isCA) => getLocalized(raw.moduleTitle, raw.moduleTitleRu, isCA),
  };
}

function attachCourseHelpers(raw: RawCourse): CourseData {
  return {
    ...raw,
    title: raw.title ?? "",
    getTitle: (isCA) => getLocalized(raw.title, raw.titleRu, isCA),
  };
}

// ---------------------------------------------------------------------------
// GROQ query fragments
// ---------------------------------------------------------------------------

const COURSE_WEEK_FIELDS = /* groq */ `
  "courseSlug": course->slug.current,
  weekNumber,
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
  moduleTitle,
  moduleTitleRu
`;

const COURSE_FIELDS = /* groq */ `
  "slug": slug.current,
  title,
  titleRu
`;

// ---------------------------------------------------------------------------
// useCourseWeek(courseSlug, weekNumber)
// ---------------------------------------------------------------------------

/**
 * Fetch the top-of-page header content for a single course week from Sanity.
 *
 * Returns `{ week: CourseWeekData | null, isLoading: boolean }`.
 * When `week` is null the caller MUST fall back to its hardcoded content.
 */
export function useCourseWeek(
  courseSlug: string,
  weekNumber: number
): { week: CourseWeekData | null; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["courseWeek", courseSlug, weekNumber],
    queryFn: async (): Promise<RawCourseWeek | null> => {
      try {
        return await sanity.fetch<RawCourseWeek | null>(
          `*[_type == "courseWeek" && course->slug.current == $courseSlug && weekNumber == $weekNumber][0]{${COURSE_WEEK_FIELDS}}`,
          { courseSlug, weekNumber }
        );
      } catch {
        return null;
      }
    },
    // Stale after 5 minutes — course copy rarely changes mid-session.
    staleTime: 5 * 60 * 1000,
  });

  const week = data ? attachWeekHelpers(data) : null;
  return { week, isLoading };
}

// ---------------------------------------------------------------------------
// useCourse(slug)
// ---------------------------------------------------------------------------

/**
 * Fetch top-level course metadata (title) from Sanity.
 *
 * Returns `{ course: CourseData | null, isLoading: boolean }`.
 */
export function useCourse(
  slug: string
): { course: CourseData | null; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["course", slug],
    queryFn: async (): Promise<RawCourse | null> => {
      try {
        return await sanity.fetch<RawCourse | null>(
          `*[_type == "course" && slug.current == $slug][0]{${COURSE_FIELDS}}`,
          { slug }
        );
      } catch {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  const course = data ? attachCourseHelpers(data) : null;
  return { course, isLoading };
}
