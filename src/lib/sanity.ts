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

/**
 * Optional read token. Sanity's Growth-tier dataset ACL gates anonymous
 * reads on most doc types (singletons like siteSettings work, but blog
 * posts / programs / team members do not). Adding a Viewer-only token here
 * bypasses that restriction.
 *
 * The token is shipped to the browser in this client bundle — that's
 * acceptable ONLY for VIEWER permission tokens (read-only). Never put an
 * Editor or Admin token in this env var, or anyone viewing the site can
 * write to your dataset.
 *
 * Set in Vercel: Project → Settings → Environment Variables →
 *   VITE_SANITY_API_TOKEN = <viewer token from sanity.io/manage>
 */
const apiToken = import.meta.env.VITE_SANITY_API_TOKEN;

/**
 * Detect whether the site is loaded inside Sanity Studio's Presentation
 * iframe. If so, skip the CDN cache so edits appear instantly when admins
 * publish in Studio. Public visitors keep the fast (~60s cached) CDN path.
 *
 * SSR-safe: `window` undefined during build → false → CDN on.
 */
const isInStudioIframe =
  typeof window !== "undefined" && window.self !== window.top;

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion: "2024-01-01",
  // CDN: fast + cached for public visitors. Disabled for Studio iframe so
  // every fetch is fresh and edits appear within ~1s instead of 60s.
  // Note: useCdn must be false when a token is supplied (the CDN strips auth
  // headers). With a token set, all requests hit the live API.
  useCdn: !isInStudioIframe && !apiToken,
  ...(apiToken ? { token: apiToken } : {}),
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
