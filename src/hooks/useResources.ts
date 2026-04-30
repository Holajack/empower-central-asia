/**
 * Fetch /resources listing data from Sanity, with hardcoded fallback to
 * src/data/resources.ts. Returns the top-level fields the listing page
 * uses (title, excerpt, icon, slug). Detail-page sections still come from
 * src/data/resources.ts for now (deep nested shape — future migration).
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";
import { resources as fallbackResources } from "@/data/resources";

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
