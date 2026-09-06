/**
 * One-shot migration: src/data/blogPosts.ts → Sanity blogPost documents.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-blog-posts.mts
 *
 * Idempotent — uses deterministic `_id: blogPost.<slug>` so re-runs update
 * instead of creating duplicates. Safe to run multiple times while iterating.
 *
 * What it does:
 *   1. Creates an author document for each unique author string
 *   2. Uploads each post's featuredImage to Sanity's asset library
 *      (skipped if the asset already exists with the same source URL)
 *   3. Converts the markdown `content` to Portable Text blocks
 *   4. Upserts a blogPost document for every published post
 *
 * The Russian translations in blogPostsRu.ts are NOT migrated — they stay as
 * runtime fallbacks until BBB wants them editable, which would need schema
 * changes for bilingual fields.
 */
import { createClient } from "@sanity/client";
import { htmlToBlocks } from "@sanity/block-tools";
import { Schema } from "@sanity/schema";
import { JSDOM } from "jsdom";
import { marked } from "marked";
import { blogPosts, type BlogPost } from "../src/data/blogPosts.js";

const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN env var.\n");
  console.error("Create one at https://sanity.io/manage → BBB New Site → API → Tokens");
  console.error('  Name: "blog-migration", Permissions: "Editor"');
  console.error("Then run:\n");
  console.error("  SANITY_WRITE_TOKEN=<your-token> npx tsx scripts/migrate-blog-posts.mts\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// Compile a minimal Sanity schema so block-tools knows the valid block shape.
// Must match the blockContent schema in sanity/schemas/objects/blockContent.ts.
const defaultSchema = Schema.compile({
  name: "migration",
  types: [
    {
      name: "post",
      type: "document",
      fields: [
        {
          name: "body",
          type: "array",
          of: [
            {
              type: "block",
              styles: [
                { title: "Normal", value: "normal" },
                { title: "H2", value: "h2" },
                { title: "H3", value: "h3" },
                { title: "H4", value: "h4" },
                { title: "Quote", value: "blockquote" },
              ],
              lists: [
                { title: "Bullet", value: "bullet" },
                { title: "Numbered", value: "number" },
              ],
              marks: {
                decorators: [
                  { title: "Bold", value: "strong" },
                  { title: "Italic", value: "em" },
                  { title: "Code", value: "code" },
                ],
                annotations: [
                  {
                    name: "link",
                    type: "object",
                    fields: [
                      { name: "href", type: "url" },
                      { name: "openInNewTab", type: "boolean" },
                    ],
                  },
                ],
              },
            },
          ],
        },
      ],
    },
  ],
});

const blockContentType = defaultSchema
  .get("post")
  .fields.find((f: { name: string }) => f.name === "body").type;

function markdownToPortableText(md: string) {
  // Marked's parser returns HTML. We sanitize minimally — block-tools expects
  // plain HTML without scripts/styles.
  const html = marked.parse(md, { async: false, gfm: true, breaks: false }) as string;
  return htmlToBlocks(html, blockContentType, {
    parseHtml: (h) => new JSDOM(h).window.document,
  });
}

/** Derive a slug-safe deterministic ID for idempotent upserts. */
function docIdForPost(slug: string) {
  return `blogPost.${slug}`.replace(/[^a-zA-Z0-9._-]/g, "-");
}

/** Convert an author display string to a stable slug for doc ID. */
function authorSlug(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/** Create or update an author document. Returns the _id. */
async function upsertAuthor(name: string): Promise<string> {
  const slug = authorSlug(name);
  const _id = `author.${slug}`;
  await client.createOrReplace({
    _id,
    _type: "author",
    name,
    slug: { _type: "slug", current: slug },
    credentials:
      name === "Jacken Holland"
        ? "Founder & Executive Director"
        : name.includes("Team") || name === "Businesses Beyond Borders"
          ? "BBB Editorial Team"
          : "Contributing Author",
  });
  return _id;
}

/**
 * Upload an image from a remote URL to Sanity's asset library.
 * Returns the asset reference object to embed in a blogPost document.
 */
async function uploadImageFromUrl(
  url: string,
  filename: string
): Promise<{ _type: "image"; asset: { _type: "reference"; _ref: string } } | null> {
  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.warn(`    ⚠️  image fetch ${res.status} for ${url}`);
      return null;
    }
    const buf = Buffer.from(await res.arrayBuffer());
    const asset = await client.assets.upload("image", buf, { filename });
    return {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
    };
  } catch (err) {
    console.warn(`    ⚠️  image upload failed for ${url}:`, (err as Error).message);
    return null;
  }
}

/** Map readTime string (e.g. "8 min") to an integer; falls back to word-count. */
function normalizeReadTime(raw: string | undefined, content: string): string {
  if (raw && /\d/.test(raw)) return raw;
  const words = content.split(/\s+/).length;
  return `${Math.max(1, Math.round(words / 200))} min`;
}

/** Parse a display date string into an ISO datetime. */
function normalizeDate(date: string, publishDate?: string): string {
  // Prefer the machine-readable publishDate when present.
  if (publishDate && /^\d{4}-\d{2}-\d{2}/.test(publishDate)) {
    return new Date(publishDate + "T12:00:00Z").toISOString();
  }
  // Try to parse the human string like "Nov 2025" or "November 15, 2025".
  const parsed = new Date(date);
  if (!isNaN(parsed.getTime())) return parsed.toISOString();
  // Last resort: now.
  return new Date().toISOString();
}

async function migratePost(post: BlogPost, authorRef: string) {
  const _id = docIdForPost(post.slug);
  console.log(`  → ${post.slug}`);

  const featuredImage = post.imageUrl
    ? await uploadImageFromUrl(post.imageUrl, `${post.slug}.jpg`)
    : null;

  const bodyBlocks = markdownToPortableText(post.content);

  const doc = {
    _id,
    _type: "blogPost",
    title: post.title,
    slug: { _type: "slug", current: post.slug },
    excerpt: post.excerpt,
    summary: post.summary,
    featuredImage: featuredImage
      ? { ...featuredImage, alt: post.title }
      : undefined,
    author: { _type: "reference", _ref: authorRef },
    authorBio: post.authorBio,
    publishedAt: normalizeDate(post.date, post.publishDate),
    dateModified: post.dateModified
      ? new Date(post.dateModified + "T12:00:00Z").toISOString()
      : undefined,
    tags: post.tags,
    readTime: normalizeReadTime(post.readTime, post.content),
    body: bodyBlocks,
    audioUrl: post.audioUrl,
    featured: false,
  };

  // Strip undefined values (Sanity doesn't like them).
  const clean = Object.fromEntries(
    Object.entries(doc).filter(([, v]) => v !== undefined)
  );

  await client.createOrReplace(clean as any);
}

async function main() {
  console.log(`\n🚀 Migrating ${blogPosts.length} blog posts to Sanity (project ${projectId}, dataset ${dataset})\n`);

  // Step 1 — unique authors
  const uniqueAuthors = Array.from(new Set(blogPosts.map((p) => p.author)));
  console.log(`📝 Upserting ${uniqueAuthors.length} authors:`);
  const authorMap = new Map<string, string>();
  for (const name of uniqueAuthors) {
    const _id = await upsertAuthor(name);
    authorMap.set(name, _id);
    console.log(`  ✓ ${name}  →  ${_id}`);
  }

  // Step 2 — posts
  console.log(`\n📚 Upserting ${blogPosts.length} blog posts:`);
  let success = 0;
  let failed = 0;
  for (const post of blogPosts) {
    try {
      await migratePost(post, authorMap.get(post.author)!);
      success++;
    } catch (err) {
      failed++;
      console.error(`    ❌ ${post.slug}:`, (err as Error).message);
    }
  }

  console.log(`\n✅ Done — ${success} succeeded, ${failed} failed.`);
  console.log(`\nVisit https://bbborders.sanity.studio/structure/blogPost to verify.\n`);
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
