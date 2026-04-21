/**
 * Fetches blog posts from Sanity and shapes them to match the existing
 * `BlogPost` interface in src/data/blogPosts.ts, so the existing UI
 * (BlogList, BlogDetail, BlogCard, TableOfContents) works unchanged.
 *
 * Strategy:
 *   - Fetch list or single post from Sanity via React Query
 *   - Convert Portable Text body back to markdown so the current `renderContent`
 *     function (which is a custom markdown parser) keeps working
 *   - Fall back to the hardcoded `blogPosts` array if Sanity returns nothing
 *     (e.g. CORS misconfigured, offline, schema drift) — the site never breaks
 *
 * Russian translations still come from src/data/blogPostsRu.ts at render time
 * (see getLocalizedPost). We don't yet support editing Russian copy in Sanity.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity, imageUrl } from "@/lib/sanity";
import { portableTextToMarkdown, type PortableTextNode } from "@/lib/portableTextToMarkdown";
import { blogPosts as hardcodedPosts, getPublishedPosts, type BlogPost } from "@/data/blogPosts";

interface RawSanityPost {
  _id: string;
  title: string;
  slug: { current: string };
  excerpt?: string;
  summary?: string;
  featuredImage?: { asset?: { _ref: string } } | null;
  "author": { name?: string } | null;
  authorBio?: string;
  publishedAt: string;
  dateModified?: string;
  tags?: string[];
  readTime?: string;
  body?: PortableTextNode[];
  audioUrl?: string;
  featured?: boolean;
}

const LIST_QUERY = /* groq */ `
  *[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    summary,
    featuredImage{asset},
    "author": author->{name},
    authorBio,
    publishedAt,
    dateModified,
    tags,
    readTime,
    audioUrl,
    featured
  }
`;

const DETAIL_QUERY = /* groq */ `
  *[_type == "blogPost" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    excerpt,
    summary,
    featuredImage{asset},
    "author": author->{name},
    authorBio,
    publishedAt,
    dateModified,
    tags,
    readTime,
    body,
    audioUrl,
    featured
  }
`;

/** Map a Sanity post document to the existing BlogPost shape. */
function sanityToBlogPost(raw: RawSanityPost, idx: number): BlogPost {
  const slug = raw.slug?.current ?? raw._id;
  const image = raw.featuredImage?.asset
    ? imageUrl(raw.featuredImage as any, 1600)
    : "";
  const publishedAt = raw.publishedAt
    ? new Date(raw.publishedAt)
    : new Date();

  return {
    // Numeric ID kept for backward-compat with existing code paths that look
    // up by id. Sanity IDs are stable strings; we surface a stable numeric
    // hash by index for routing that still accepts /blog/<number>.
    id: idx + 1000, // offset to avoid colliding with hardcoded IDs 1-100
    slug,
    title: raw.title ?? "",
    excerpt: raw.excerpt ?? "",
    summary: raw.summary,
    content: portableTextToMarkdown(raw.body),
    author: raw.author?.name ?? "Businesses Beyond Borders",
    date: publishedAt.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    readTime: raw.readTime ?? "5 min",
    imageUrl: image,
    tags: raw.tags ?? [],
    authorBio: raw.authorBio,
    publishDate: publishedAt.toISOString().split("T")[0],
    dateModified: raw.dateModified
      ? new Date(raw.dateModified).toISOString().split("T")[0]
      : undefined,
    audioUrl: raw.audioUrl,
  };
}

/** Fetch all published blog posts from Sanity, with hardcoded fallback. */
export function useBlogPosts(): { posts: BlogPost[]; isLoading: boolean; source: "sanity" | "fallback" } {
  const { data, isLoading } = useQuery({
    queryKey: ["blogPosts", "list"],
    queryFn: async () => {
      try {
        const raw = await sanity.fetch<RawSanityPost[]>(LIST_QUERY);
        if (!raw || raw.length === 0) return null;
        return raw.map((r, i) => sanityToBlogPost(r, i));
      } catch (err) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("[useBlogPosts] Sanity fetch failed:", err);
        }
        return null;
      }
    },
  });

  if (data && data.length > 0) {
    return { posts: data, isLoading, source: "sanity" };
  }
  return { posts: getPublishedPosts(), isLoading, source: "fallback" };
}

/** Fetch a single post by slug from Sanity, with hardcoded fallback. */
export function useBlogPost(slug: string | undefined): {
  post: BlogPost | null;
  isLoading: boolean;
  source: "sanity" | "fallback";
} {
  const { data, isLoading } = useQuery({
    queryKey: ["blogPosts", "detail", slug],
    enabled: !!slug,
    queryFn: async () => {
      if (!slug) return null;
      try {
        const raw = await sanity.fetch<RawSanityPost | null>(DETAIL_QUERY, {
          slug,
        });
        if (!raw) return null;
        return sanityToBlogPost(raw, 0);
      } catch (err) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("[useBlogPost] Sanity fetch failed:", err);
        }
        return null;
      }
    },
  });

  if (data) return { post: data, isLoading, source: "sanity" };

  // Fallback: look up in hardcoded array by slug OR numeric id.
  const fallback =
    hardcodedPosts.find((p) => p.slug === slug || String(p.id) === slug) ?? null;
  return { post: fallback, isLoading, source: "fallback" };
}
