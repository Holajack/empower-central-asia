/**
 * Fetch participant testimonials from Sanity, with hardcoded fallback to
 * src/data/testimonials.ts. The legacy `Testimonial` shape used by the
 * existing TestimonialCarousel component is preserved; the hook adapts
 * Sanity docs to that shape.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity, imageUrl } from "@/lib/sanity";
import { testimonials as fallbackTestimonials, type Testimonial } from "@/data/testimonials";

const TESTIMONIALS_QUERY = /* groq */ `
  *[_type == "testimonial" && (active == true || !defined(active))] | order(order asc, _createdAt desc){
    _id,
    name,
    business,
    businessRu,
    quote,
    quoteRu,
    before,
    beforeRu,
    after,
    afterRu,
    imageUrl,
    "photo": photo{..., "alt": alt}
  }
`;

interface RawTestimonial {
  _id: string;
  name?: string;
  business?: string;
  businessRu?: string;
  quote?: string;
  quoteRu?: string;
  before?: string;
  beforeRu?: string;
  after?: string;
  afterRu?: string;
  imageUrl?: string;
  photo?: { asset?: { _ref: string } } | null;
}

function shape(raw: RawTestimonial): Testimonial {
  const image = raw.photo?.asset
    ? imageUrl(raw.photo as any, 800)
    : raw.imageUrl ?? "";
  return {
    name: raw.name ?? "",
    business: raw.business,
    businessRu: raw.businessRu,
    quote: raw.quote ?? "",
    quoteRu: raw.quoteRu,
    before: raw.before,
    beforeRu: raw.beforeRu,
    after: raw.after,
    afterRu: raw.afterRu,
    image,
  };
}

export function useTestimonials(): {
  testimonials: Testimonial[];
  isLoading: boolean;
  source: "sanity" | "fallback";
} {
  const { data, isLoading } = useQuery({
    queryKey: ["testimonials", "list"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawTestimonial[]>(TESTIMONIALS_QUERY);
      } catch {
        return null;
      }
    },
  });

  if (data && data.length > 0) {
    return { testimonials: data.map(shape), isLoading, source: "sanity" };
  }
  return {
    testimonials: fallbackTestimonials,
    isLoading,
    source: "fallback",
  };
}
