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
