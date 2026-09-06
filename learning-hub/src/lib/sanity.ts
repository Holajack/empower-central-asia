/**
 * Optional Sanity client.
 *
 * The Learning Hub ships with ALL course, blog, and resource content as
 * TypeScript data files in `src/data`, so it works with zero backend.
 * If you later want to edit copy in Sanity Studio, create your own project,
 * set VITE_SANITY_PROJECT_ID (+ VITE_SANITY_DATASET), and every `use*` hook
 * will read from Sanity first and fall back to the bundled data.
 *
 * Without a project id, `sanity.fetch()` resolves to `null`, which every hook
 * treats as "nothing in the CMS" → render the bundled fallback content.
 */
import { createClient, type SanityClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url";

const projectId = import.meta.env.VITE_SANITY_PROJECT_ID as string | undefined;
const dataset = (import.meta.env.VITE_SANITY_DATASET as string | undefined) || "production";
const apiToken = import.meta.env.VITE_SANITY_API_TOKEN as string | undefined;

export const sanityEnabled = Boolean(projectId);

const isInStudioIframe = typeof window !== "undefined" && window.self !== window.top;

type MinimalClient = Pick<SanityClient, "fetch">;

const nullClient: MinimalClient = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  fetch: (async () => null) as any,
};

export const sanity: MinimalClient = sanityEnabled
  ? createClient({
      projectId: projectId!,
      dataset,
      apiVersion: "2024-01-01",
      useCdn: !isInStudioIframe && !apiToken,
      ...(apiToken ? { token: apiToken } : {}),
      stega: {
        enabled: isInStudioIframe,
        studioUrl: import.meta.env.VITE_SANITY_STUDIO_URL || "/studio",
      },
    })
  : nullClient;

const builder = sanityEnabled ? imageUrlBuilder({ projectId: projectId!, dataset }) : null;

export function urlForImage(source: SanityImageSource) {
  if (!builder) throw new Error("Sanity is not configured (VITE_SANITY_PROJECT_ID missing)");
  return builder.image(source);
}

/** Shorthand: pass a Sanity image object, get a fully-qualified CDN URL. */
export function imageUrl(source: SanityImageSource, width = 1200): string {
  if (!builder) return "";
  return builder.image(source).width(width).auto("format").url();
}
