/**
 * Sanity client for fetching content from the BBB dataset.
 * Queries are GROQ (https://www.sanity.io/docs/groq).
 *
 * Usage:
 *   import { sanity } from '@/lib/sanity';
 *   const posts = await sanity.fetch(`*[_type == "blogPost"]{title, slug}`);
 */
import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID || "55u2jb6b";
const dataset = import.meta.env.VITE_SANITY_DATASET || "production";

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  // useCdn=true serves content from Sanity's CDN (fast, ~60s cache).
  // Set to false only if you need real-time draft content.
  useCdn: true,
  // Stega encoding — embeds edit metadata into content so `@sanity/visual-editing`
  // can render click-to-edit overlays when the site is loaded inside the
  // Sanity Studio Presentation tool iframe. Invisible to normal visitors.
  stega: {
    studioUrl: "https://bbborders.sanity.studio",
  },
});

// Image URL builder — use to generate optimized image URLs with size/crop params.
const builder = imageUrlBuilder({ projectId, dataset });

export function urlForImage(source: SanityImageSource) {
  return builder.image(source);
}

/** Shorthand: pass a Sanity image object, get a fully-qualified CDN URL. */
export function imageUrl(source: SanityImageSource, width = 1200): string {
  return builder.image(source).width(width).auto("format").url();
}
