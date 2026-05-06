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
 *
 * useCourse projection now also pulls the landing-page editorial fields
 * (hero, what-you'll-learn, prerequisites, instructor block, outcomes,
 * related programs, bottom CTA) so the Financial Literacy / Business
 * Creation / Leadership Development landing pages can read everything from
 * Sanity with a hardcoded copy fallback.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized, getLocalizedArray } from "@/lib/localized";

export interface CourseLandingItem {
  _key?: string;
  text?: string;
  textRu?: string;
  title?: string;
  titleRu?: string;
  icon?: string;
}

export interface CourseRelatedProgramRef {
  _id: string;
  slug: string;
  title?: string;
  titleRu?: string;
  tagline?: string;
  taglineRu?: string;
}

export interface CourseInstructorImage {
  asset?: { _ref?: string };
  alt?: string;
}

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
  // Landing — Hero
  heroBadge?: string;
  heroBadgeRu?: string;
  heroDescription?: string;
  heroDescriptionRu?: string;
  // Landing — What you'll learn
  whatYoullLearnHeading?: string;
  whatYoullLearnHeadingRu?: string;
  whatYoullLearn?: CourseLandingItem[];
  // Landing — Prerequisites
  prerequisitesHeading?: string;
  prerequisitesHeadingRu?: string;
  prerequisites?: string;
  prerequisitesRu?: string;
  // Landing — Instructor
  instructorHeading?: string;
  instructorHeadingRu?: string;
  instructorName?: string;
  instructorNameRu?: string;
  instructorRole?: string;
  instructorRoleRu?: string;
  instructorBio?: string;
  instructorBioRu?: string;
  instructorImage?: CourseInstructorImage;
  // Landing — Outcomes
  outcomesHeading?: string;
  outcomesHeadingRu?: string;
  outcomes?: CourseLandingItem[];
  // Landing — Related programs
  relatedProgramsHeading?: string;
  relatedProgramsHeadingRu?: string;
  relatedPrograms?: CourseRelatedProgramRef[];
  // Landing — Bottom CTA
  bottomCtaHeading?: string;
  bottomCtaHeadingRu?: string;
  bottomCtaSubheading?: string;
  bottomCtaSubheadingRu?: string;
  bottomCtaPrimaryLabel?: string;
  bottomCtaPrimaryLabelRu?: string;
  bottomCtaPrimaryUrl?: string;
  bottomCtaSecondaryLabel?: string;
  bottomCtaSecondaryLabelRu?: string;
  bottomCtaSecondaryUrl?: string;
  // Localized accessors
  getTitle: (isCentralAsia: boolean) => string;
  getTagline: (isCentralAsia: boolean) => string;
  getDescription: (isCentralAsia: boolean) => string;
  getHeroBadge: (isCentralAsia: boolean) => string;
  getHeroDescription: (isCentralAsia: boolean) => string;
  getWhatYoullLearnHeading: (isCentralAsia: boolean) => string;
  getPrerequisitesHeading: (isCentralAsia: boolean) => string;
  getPrerequisites: (isCentralAsia: boolean) => string;
  getInstructorHeading: (isCentralAsia: boolean) => string;
  getInstructorName: (isCentralAsia: boolean) => string;
  getInstructorRole: (isCentralAsia: boolean) => string;
  getInstructorBio: (isCentralAsia: boolean) => string;
  getOutcomesHeading: (isCentralAsia: boolean) => string;
  getRelatedProgramsHeading: (isCentralAsia: boolean) => string;
  getBottomCtaHeading: (isCentralAsia: boolean) => string;
  getBottomCtaSubheading: (isCentralAsia: boolean) => string;
  getBottomCtaPrimaryLabel: (isCentralAsia: boolean) => string;
  getBottomCtaSecondaryLabel: (isCentralAsia: boolean) => string;
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
    weekCount,
    heroBadge,
    heroBadgeRu,
    heroDescription,
    heroDescriptionRu,
    whatYoullLearnHeading,
    whatYoullLearnHeadingRu,
    whatYoullLearn[]{ _key, text, textRu, icon },
    prerequisitesHeading,
    prerequisitesHeadingRu,
    prerequisites,
    prerequisitesRu,
    instructorHeading,
    instructorHeadingRu,
    instructorName,
    instructorNameRu,
    instructorRole,
    instructorRoleRu,
    instructorBio,
    instructorBioRu,
    instructorImage,
    outcomesHeading,
    outcomesHeadingRu,
    outcomes[]{ _key, text, textRu, title, titleRu, icon },
    relatedProgramsHeading,
    relatedProgramsHeadingRu,
    relatedPrograms[]->{
      _id,
      "slug": slug.current,
      title,
      titleRu,
      tagline,
      taglineRu
    },
    bottomCtaHeading,
    bottomCtaHeadingRu,
    bottomCtaSubheading,
    bottomCtaSubheadingRu,
    bottomCtaPrimaryLabel,
    bottomCtaPrimaryLabelRu,
    bottomCtaPrimaryUrl,
    bottomCtaSecondaryLabel,
    bottomCtaSecondaryLabelRu,
    bottomCtaSecondaryUrl
  }
`;

type RawCourseAccessors =
  | "getTitle"
  | "getTagline"
  | "getDescription"
  | "getHeroBadge"
  | "getHeroDescription"
  | "getWhatYoullLearnHeading"
  | "getPrerequisitesHeading"
  | "getPrerequisites"
  | "getInstructorHeading"
  | "getInstructorName"
  | "getInstructorRole"
  | "getInstructorBio"
  | "getOutcomesHeading"
  | "getRelatedProgramsHeading"
  | "getBottomCtaHeading"
  | "getBottomCtaSubheading"
  | "getBottomCtaPrimaryLabel"
  | "getBottomCtaSecondaryLabel";

type RawCourse = Omit<CourseDoc, RawCourseAccessors>;

function shapeCourse(raw: RawCourse): CourseDoc {
  return {
    ...raw,
    getTitle: (isCA) => getLocalized(raw.title, raw.titleRu, isCA),
    getTagline: (isCA) => getLocalized(raw.tagline ?? "", raw.taglineRu, isCA),
    getDescription: (isCA) =>
      getLocalized(raw.description ?? "", raw.descriptionRu, isCA),
    getHeroBadge: (isCA) =>
      getLocalized(raw.heroBadge ?? "", raw.heroBadgeRu, isCA),
    getHeroDescription: (isCA) =>
      getLocalized(raw.heroDescription ?? "", raw.heroDescriptionRu, isCA),
    getWhatYoullLearnHeading: (isCA) =>
      getLocalized(raw.whatYoullLearnHeading ?? "", raw.whatYoullLearnHeadingRu, isCA),
    getPrerequisitesHeading: (isCA) =>
      getLocalized(raw.prerequisitesHeading ?? "", raw.prerequisitesHeadingRu, isCA),
    getPrerequisites: (isCA) =>
      getLocalized(raw.prerequisites ?? "", raw.prerequisitesRu, isCA),
    getInstructorHeading: (isCA) =>
      getLocalized(raw.instructorHeading ?? "", raw.instructorHeadingRu, isCA),
    getInstructorName: (isCA) =>
      getLocalized(raw.instructorName ?? "", raw.instructorNameRu, isCA),
    getInstructorRole: (isCA) =>
      getLocalized(raw.instructorRole ?? "", raw.instructorRoleRu, isCA),
    getInstructorBio: (isCA) =>
      getLocalized(raw.instructorBio ?? "", raw.instructorBioRu, isCA),
    getOutcomesHeading: (isCA) =>
      getLocalized(raw.outcomesHeading ?? "", raw.outcomesHeadingRu, isCA),
    getRelatedProgramsHeading: (isCA) =>
      getLocalized(raw.relatedProgramsHeading ?? "", raw.relatedProgramsHeadingRu, isCA),
    getBottomCtaHeading: (isCA) =>
      getLocalized(raw.bottomCtaHeading ?? "", raw.bottomCtaHeadingRu, isCA),
    getBottomCtaSubheading: (isCA) =>
      getLocalized(raw.bottomCtaSubheading ?? "", raw.bottomCtaSubheadingRu, isCA),
    getBottomCtaPrimaryLabel: (isCA) =>
      getLocalized(raw.bottomCtaPrimaryLabel ?? "", raw.bottomCtaPrimaryLabelRu, isCA),
    getBottomCtaSecondaryLabel: (isCA) =>
      getLocalized(raw.bottomCtaSecondaryLabel ?? "", raw.bottomCtaSecondaryLabelRu, isCA),
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
