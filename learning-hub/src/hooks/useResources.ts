/**
 * Fetch /resources listing and detail data from Sanity, with hardcoded fallback
 * to src/data/resources.ts. The listing page uses ResourceCard (top-level fields
 * only). The detail page uses ResourceDetail which adds optional body/bodyRu
 * Portable Text arrays so sections can be edited from the Sanity Studio.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";
import { resources as fallbackResources } from "@/data/resources";

// Portable Text block shape returned by Sanity.
// Typed loosely here to avoid pulling in the full @portabletext types as a
// hard dependency; the PortableText component accepts any[] as its value.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type PortableTextBlock = Record<string, any>;

export interface ResourceCard {
  _id: string;
  slug: string;
  title: string;
  titleRu?: string;
  description?: string;
  descriptionRu?: string;
  excerpt?: string;
  excerptRu?: string;
  icon: string;
  order: number;
}

/** Extended interface used by the detail page — includes Portable Text body. */
export interface ResourceDetail extends ResourceCard {
  body?: PortableTextBlock[];
  bodyRu?: PortableTextBlock[];
  keywords?: string[];
}

const RESOURCES_QUERY = /* groq */ `
  *[_type == "resource" && (active == true || !defined(active))] | order(order asc){
    _id,
    "slug": slug.current,
    title,
    titleRu,
    description,
    descriptionRu,
    excerpt,
    excerptRu,
    icon,
    "order": coalesce(order, 99)
  }
`;

const RESOURCE_DETAIL_QUERY = /* groq */ `
  *[_type == "resource" && slug.current == $slug && (active == true || !defined(active))][0]{
    _id,
    "slug": slug.current,
    title,
    titleRu,
    description,
    descriptionRu,
    excerpt,
    excerptRu,
    icon,
    "order": coalesce(order, 99),
    keywords,
    body,
    bodyRu
  }
`;

export function useResources(): {
  resources: ResourceCard[];
  isLoading: boolean;
  source: "sanity" | "fallback";
} {
  const { data, isLoading } = useQuery({
    queryKey: ["resources", "list"],
    queryFn: async () => {
      try {
        return await sanity.fetch<ResourceCard[]>(RESOURCES_QUERY);
      } catch {
        return null;
      }
    },
  });

  if (data && data.length > 0) {
    return { resources: data, isLoading, source: "sanity" };
  }
  // Map the legacy data shape into the card shape so the page renders
  // identically when Sanity is unreachable / empty.
  return {
    resources: fallbackResources.map((r, i) => ({
      _id: `legacy.${r.slug}`,
      slug: r.slug,
      title: r.title,
      titleRu: r.titleRu,
      description: r.description,
      descriptionRu: r.descriptionRu,
      excerpt: r.excerpt,
      excerptRu: r.excerptRu,
      icon: r.icon,
      order: (i + 1) * 10,
    })),
    isLoading,
    source: "fallback",
  };
}

export function localizeResource(card: ResourceCard, isCentralAsia: boolean) {
  return {
    ...card,
    title: getLocalized(card.title, card.titleRu, isCentralAsia),
    excerpt: getLocalized(card.excerpt ?? "", card.excerptRu, isCentralAsia),
  };
}

/**
 * Fetch a single resource by slug from Sanity, including the Portable Text
 * body fields. Falls back to the legacy src/data/resources.ts shape (with
 * empty body arrays) when Sanity is unreachable or the doc has no body yet.
 */
export function useResource(slug: string): {
  resource: ResourceDetail | null;
  isLoading: boolean;
  source: "sanity" | "fallback";
} {
  const { data, isLoading } = useQuery({
    queryKey: ["resources", "detail", slug],
    queryFn: async () => {
      try {
        return await sanity.fetch<ResourceDetail | null>(RESOURCE_DETAIL_QUERY, { slug });
      } catch {
        return null;
      }
    },
    enabled: Boolean(slug),
  });

  if (data) {
    return { resource: data, isLoading, source: "sanity" };
  }

  // Legacy fallback — map from src/data/resources.ts
  const legacy = fallbackResources.find((r) => r.slug === slug);
  if (!legacy) {
    return { resource: null, isLoading, source: "fallback" };
  }

  const card: ResourceDetail = {
    _id: `legacy.${legacy.slug}`,
    slug: legacy.slug,
    title: legacy.title,
    titleRu: legacy.titleRu,
    description: legacy.description,
    descriptionRu: legacy.descriptionRu,
    excerpt: legacy.excerpt,
    excerptRu: legacy.excerptRu,
    icon: legacy.icon,
    order: 10,
    keywords: legacy.keywords,
    body: [],
    bodyRu: [],
  };

  return { resource: card, isLoading, source: "fallback" };
}
