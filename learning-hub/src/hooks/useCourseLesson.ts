/**
 * Hooks for fetching `courseLesson` documents from Sanity.
 *
 *   useCourseLesson({ course, weekNumber, dayNumber }) → single lesson doc
 *   useCourseWeekLessons({ course, weekNumber })       → ordered list for the week
 *
 * Mirrors the useCourseWeek / useBlogPosts shape:
 *   - React Query for caching
 *   - Returns `null` when Sanity has nothing — caller decides on fallback
 *   - Bilingual via `getLocalized()` / `getLocalizedArray()`
 *   - Strict TypeScript, no `any`
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";
import type { PortableTextNode } from "@/lib/portableTextToMarkdown";

/** Bilingual array item shape used by takeaways + actionItems. */
export interface BilingualText {
  text: string;
  textRu?: string;
}

/** Video provider tag. */
export type VideoProvider = "youtube" | "vimeo";

export interface VideoEmbed {
  provider?: VideoProvider;
  videoId?: string;
  caption?: string;
  captionRu?: string;
}

/** Shape returned by the Sanity GROQ query (raw, no helpers). */
interface RawCourseLesson {
  _id: string;
  dayNumber: number;
  order?: number;
  duration?: string;
  worksheetSlug?: string;
  relatedBlogPostSlugs?: string[];
  title: string;
  titleRu?: string;
  keyQuote?: string;
  keyQuoteRu?: string;
  overview?: PortableTextNode[];
  overviewRu?: PortableTextNode[];
  transcript?: PortableTextNode[];
  transcriptRu?: PortableTextNode[];
  keyTakeaways?: BilingualText[];
  actionItems?: BilingualText[];
  videoEmbed?: VideoEmbed;
}

/** Public shape with bilingual helpers attached. */
export interface CourseLessonDoc extends RawCourseLesson {
  getTitle: (isCentralAsia: boolean) => string;
  getKeyQuote: (isCentralAsia: boolean) => string;
  getOverview: (isCentralAsia: boolean) => PortableTextNode[];
  getTranscript: (isCentralAsia: boolean) => PortableTextNode[];
  getKeyTakeaways: (isCentralAsia: boolean) => string[];
  getActionItems: (isCentralAsia: boolean) => string[];
  getVideoCaption: (isCentralAsia: boolean) => string;
}

const LESSON_QUERY = /* groq */ `
  *[
    _type == "courseLesson"
    && course->slug.current == $courseSlug
    && week->weekNumber == $weekNumber
    && dayNumber == $dayNumber
  ][0]{
    _id,
    dayNumber,
    order,
    duration,
    worksheetSlug,
    relatedBlogPostSlugs,
    title,
    titleRu,
    keyQuote,
    keyQuoteRu,
    overview,
    overviewRu,
    transcript,
    transcriptRu,
    keyTakeaways,
    actionItems,
    videoEmbed
  }
`;

const WEEK_LESSONS_QUERY = /* groq */ `
  *[
    _type == "courseLesson"
    && course->slug.current == $courseSlug
    && week->weekNumber == $weekNumber
  ] | order(coalesce(order, dayNumber) asc, dayNumber asc) {
    _id,
    dayNumber,
    order,
    duration,
    worksheetSlug,
    relatedBlogPostSlugs,
    title,
    titleRu,
    keyQuote,
    keyQuoteRu,
    overview,
    overviewRu,
    transcript,
    transcriptRu,
    keyTakeaways,
    actionItems,
    videoEmbed
  }
`;

function shapeLesson(raw: RawCourseLesson): CourseLessonDoc {
  return {
    ...raw,
    getTitle: (isCA) => getLocalized(raw.title, raw.titleRu, isCA),
    getKeyQuote: (isCA) =>
      getLocalized(raw.keyQuote ?? "", raw.keyQuoteRu, isCA),
    getOverview: (isCA) => {
      if (isCA && raw.overviewRu && raw.overviewRu.length > 0)
        return raw.overviewRu;
      return raw.overview ?? [];
    },
    getTranscript: (isCA) => {
      if (isCA && raw.transcriptRu && raw.transcriptRu.length > 0)
        return raw.transcriptRu;
      return raw.transcript ?? [];
    },
    getKeyTakeaways: (isCA) =>
      (raw.keyTakeaways ?? []).map((t) =>
        getLocalized(t.text, t.textRu, isCA)
      ),
    getActionItems: (isCA) =>
      (raw.actionItems ?? []).map((t) =>
        getLocalized(t.text, t.textRu, isCA)
      ),
    getVideoCaption: (isCA) =>
      getLocalized(
        raw.videoEmbed?.caption ?? "",
        raw.videoEmbed?.captionRu,
        isCA
      ),
  };
}

export interface UseCourseLessonArgs {
  course: string;
  weekNumber: number;
  dayNumber: number;
}

export function useCourseLesson({
  course,
  weekNumber,
  dayNumber,
}: UseCourseLessonArgs): { lesson: CourseLessonDoc | null; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["courseLesson", course, weekNumber, dayNumber],
    enabled: !!course && weekNumber > 0 && dayNumber >= 0,
    queryFn: async (): Promise<RawCourseLesson | null> => {
      try {
        return await sanity.fetch<RawCourseLesson | null>(LESSON_QUERY, {
          courseSlug: course,
          weekNumber,
          dayNumber,
        });
      } catch (err) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("[useCourseLesson] Sanity fetch failed:", err);
        }
        return null;
      }
    },
  });
  return { lesson: data ? shapeLesson(data) : null, isLoading };
}

export interface UseCourseWeekLessonsArgs {
  course: string;
  weekNumber: number;
}

export function useCourseWeekLessons({
  course,
  weekNumber,
}: UseCourseWeekLessonsArgs): {
  lessons: CourseLessonDoc[];
  isLoading: boolean;
  source: "sanity" | "fallback";
} {
  const { data, isLoading } = useQuery({
    queryKey: ["courseWeekLessons", course, weekNumber],
    enabled: !!course && weekNumber > 0,
    queryFn: async (): Promise<RawCourseLesson[] | null> => {
      try {
        const raw = await sanity.fetch<RawCourseLesson[]>(WEEK_LESSONS_QUERY, {
          courseSlug: course,
          weekNumber,
        });
        if (!raw || raw.length === 0) return null;
        return raw;
      } catch (err) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("[useCourseWeekLessons] Sanity fetch failed:", err);
        }
        return null;
      }
    },
  });

  if (data && data.length > 0) {
    return {
      lessons: data.map(shapeLesson),
      isLoading,
      source: "sanity",
    };
  }
  return { lessons: [], isLoading, source: "fallback" };
}
