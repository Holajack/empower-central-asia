/**
 * Fetch success-story documents from Sanity, with hardcoded fallback to
 * src/data/successStories.ts when Sanity is unreachable or empty.
 *
 * The site's existing CaseStudiesSection consumes a flat shape:
 *   { id, title, description, image, impact }
 * so the hook returns that already-shaped list. localizeStories() applies
 * the bilingual fallback for callers that want raw shaped docs.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity, imageUrl } from "@/lib/sanity";
import { getLocalized, getLocalizedArray } from "@/lib/localized";
import { successStories as fallbackStories } from "@/data/successStories";

// Portable Text — kept loose-typed; @portabletext/react accepts any[].
export type PortableTextBlock = Record<string, unknown>;

export interface StoryMetric {
  label?: string;
  labelRu?: string;
  value?: string;
  description?: string;
  descriptionRu?: string;
}

export interface StoryTimelinePhase {
  phase?: string;
  phaseRu?: string;
  duration?: string;
  durationRu?: string;
  description?: string;
  descriptionRu?: string;
}

export interface SuccessStoryDoc {
  _id: string;
  slug?: string;
  name: string;
  nameRu?: string;
  title: string;
  titleRu?: string;
  business?: string;
  location?: string;
  locationRu?: string;
  excerpt?: string;
  excerptRu?: string;
  impact?: string[];
  impactRu?: string[];
  heroImageUrl?: string;
  pullQuote?: string;
  pullQuoteRu?: string;
  year?: number;
  tags?: string[];
  featured?: boolean;
  order: number;
}

const STORIES_QUERY = /* groq */ `
  *[_type == "successStory" && (active == true || !defined(active))] | order(order asc, _createdAt desc){
    _id,
    "slug": slug.current,
    name,
    nameRu,
    title,
    titleRu,
    business,
    location,
    locationRu,
    excerpt,
    excerptRu,
    impact,
    impactRu,
    heroImageUrl,
    "photo": photo{..., "alt": alt},
    pullQuote,
    pullQuoteRu,
    year,
    tags,
    featured,
    "order": coalesce(order, 99)
  }
`;

interface RawStory {
  _id: string;
  slug?: string;
  name?: string;
  nameRu?: string;
  title?: string;
  titleRu?: string;
  business?: string;
  location?: string;
  locationRu?: string;
  excerpt?: string;
  excerptRu?: string;
  impact?: string[];
  impactRu?: string[];
  heroImageUrl?: string;
  photo?: { asset?: { _ref: string } } | null;
  pullQuote?: string;
  pullQuoteRu?: string;
  year?: number;
  tags?: string[];
  featured?: boolean;
  order?: number;
}

function shape(raw: RawStory): SuccessStoryDoc {
  // Sanity-uploaded photo takes precedence; otherwise fall back to a plain URL field.
  const photoUrl = raw.photo?.asset
    ? imageUrl(raw.photo as any, 1200)
    : raw.heroImageUrl;
  return {
    _id: raw._id,
    slug: raw.slug,
    name: raw.name ?? "",
    nameRu: raw.nameRu,
    title: raw.title ?? "",
    titleRu: raw.titleRu,
    business: raw.business,
    location: raw.location,
    locationRu: raw.locationRu,
    excerpt: raw.excerpt,
    excerptRu: raw.excerptRu,
    impact: raw.impact ?? [],
    impactRu: raw.impactRu,
    heroImageUrl: photoUrl,
    pullQuote: raw.pullQuote,
    pullQuoteRu: raw.pullQuoteRu,
    year: raw.year,
    tags: raw.tags,
    featured: raw.featured,
    order: raw.order ?? 99,
  };
}

/**
 * Map a hardcoded SuccessStory (from src/data/successStories.ts) into the same
 * doc shape so the rest of the code path is identical regardless of source.
 */
function legacyToShape(s: (typeof fallbackStories)[number]): SuccessStoryDoc {
  return {
    _id: `legacy.${s.id}`,
    slug: s.id,
    name: s.name,
    title: s.title,
    business: s.business,
    location: s.location,
    excerpt: s.excerpt,
    impact: s.impact,
    heroImageUrl: s.heroImage,
    pullQuote: s.quote,
    tags: s.tags,
    order: 99,
  };
}

export interface CaseStudyCard {
  id: string;
  title: string;
  description: string;
  image: string;
  impact: string;
}

/** Localize one story to the flat shape consumed by CaseStudiesSection. */
export function toCaseStudyCard(
  story: SuccessStoryDoc,
  isCentralAsia: boolean
): CaseStudyCard {
  const impactList = getLocalizedArray(story.impact, story.impactRu, isCentralAsia);
  return {
    id: story.slug ?? story._id,
    title: getLocalized(story.title, story.titleRu, isCentralAsia),
    description: getLocalized(story.excerpt ?? "", story.excerptRu, isCentralAsia),
    image: story.heroImageUrl ?? "",
    impact: impactList[0] ?? "",
  };
}

export function useSuccessStories(): {
  stories: SuccessStoryDoc[];
  isLoading: boolean;
  source: "sanity" | "fallback";
} {
  const { data, isLoading } = useQuery({
    queryKey: ["successStories", "list"],
    queryFn: async () => {
      try {
        const raw = await sanity.fetch<RawStory[]>(STORIES_QUERY);
        if (!raw || raw.length === 0) return null;
        return raw.map(shape);
      } catch {
        return null;
      }
    },
  });

  if (data && data.length > 0) {
    return { stories: data, isLoading, source: "sanity" };
  }
  return {
    stories: fallbackStories.map(legacyToShape),
    isLoading,
    source: "fallback",
  };
}

// ---------------------------------------------------------------------------
// Single-story detail hook — used by SuccessStoryDetail.tsx
// Includes the new long-form fields (metrics, timeline, challenge, solution,
// results, story Portable Text) added in the round-3 schema extension.
// ---------------------------------------------------------------------------

export interface SuccessStoryDetailDoc extends SuccessStoryDoc {
  story?: PortableTextBlock[];
  storyRu?: PortableTextBlock[];
  metrics?: StoryMetric[];
  timeline?: StoryTimelinePhase[];
  challenge?: string;
  challengeRu?: string;
  solution?: string;
  solutionRu?: string;
  results?: string;
  resultsRu?: string;
}

interface RawStoryDetail extends RawStory {
  story?: PortableTextBlock[];
  storyRu?: PortableTextBlock[];
  metrics?: StoryMetric[];
  timeline?: StoryTimelinePhase[];
  challenge?: string;
  challengeRu?: string;
  solution?: string;
  solutionRu?: string;
  results?: string;
  resultsRu?: string;
}

const STORY_DETAIL_QUERY = /* groq */ `
  *[_type == "successStory" && slug.current == $slug && (active == true || !defined(active))][0]{
    _id,
    "slug": slug.current,
    name,
    nameRu,
    title,
    titleRu,
    business,
    location,
    locationRu,
    excerpt,
    excerptRu,
    impact,
    impactRu,
    heroImageUrl,
    "photo": photo{..., "alt": alt},
    pullQuote,
    pullQuoteRu,
    year,
    tags,
    featured,
    "order": coalesce(order, 99),
    story,
    storyRu,
    metrics,
    timeline,
    challenge,
    challengeRu,
    solution,
    solutionRu,
    results,
    resultsRu
  }
`;

function shapeDetail(raw: RawStoryDetail): SuccessStoryDetailDoc {
  return {
    ...shape(raw),
    story: raw.story,
    storyRu: raw.storyRu,
    metrics: raw.metrics,
    timeline: raw.timeline,
    challenge: raw.challenge,
    challengeRu: raw.challengeRu,
    solution: raw.solution,
    solutionRu: raw.solutionRu,
    results: raw.results,
    resultsRu: raw.resultsRu,
  };
}

/**
 * Fetch a single success-story document by slug, including the extended
 * detail fields (metrics, timeline, challenge / solution / results, story).
 * Falls back to legacy hardcoded data in src/data/successStories.ts when
 * Sanity is unreachable or has no doc with that slug.
 */
export function useSuccessStory(slug: string | undefined): {
  story: SuccessStoryDetailDoc | null;
  isLoading: boolean;
  source: "sanity" | "fallback";
} {
  const { data, isLoading } = useQuery({
    queryKey: ["successStories", "detail", slug],
    queryFn: async () => {
      if (!slug) return null;
      try {
        const raw = await sanity.fetch<RawStoryDetail | null>(
          STORY_DETAIL_QUERY,
          { slug }
        );
        return raw ? shapeDetail(raw) : null;
      } catch {
        return null;
      }
    },
    enabled: Boolean(slug),
  });

  if (data) {
    return { story: data, isLoading, source: "sanity" };
  }

  // Legacy fallback — only the listing-level fields exist here, not the
  // extended ones. Those simply render as empty (graceful skip).
  if (!slug) {
    return { story: null, isLoading, source: "fallback" };
  }

  const legacy = fallbackStories.find((s) => s.id === slug);
  if (!legacy) {
    return { story: null, isLoading, source: "fallback" };
  }

  const base = legacyToShape(legacy);
  const detail: SuccessStoryDetailDoc = {
    ...base,
    metrics: legacy.metrics?.map((m) => ({
      label: m.label,
      value: m.value,
      description: m.description,
    })),
    timeline: legacy.timeline?.map((t) => ({
      phase: t.phase,
      duration: t.duration,
      description: t.description,
    })),
    challenge: legacy.challenge,
    solution: legacy.solution,
    results: legacy.results,
  };
  return { story: detail, isLoading, source: "fallback" };
}
