/**
 * Phase 5 migration: src/data/successStories.ts → Sanity successStory docs.
 *
 *   SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-success-stories.mts
 *
 * Idempotent — uses _id="successStory.<slug>" so reruns update.
 *
 * The hardcoded data has rich nested fields (challenge, solution, results,
 * metrics, timeline) that the listing page doesn't use; this seeds the
 * fields the listing/card render relies on, plus the long-form story
 * fields when present. Detail-page wiring is a future phase.
 */
import { createClient } from "@sanity/client";
import { successStories } from "../src/data/successStories.js";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN env var.\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function main() {
  console.log(`\n🚀 Seeding ${successStories.length} success stories\n`);
  let success = 0;
  let failed = 0;

  for (const [i, s] of successStories.entries()) {
    const _id = `successStory.${s.id}`;
    try {
      console.log(`→ ${s.id}`);
      await client.createOrReplace({
        _id,
        _type: "successStory",
        title: s.title,
        name: s.name,
        slug: { _type: "slug", current: s.id },
        business: s.business,
        location: s.location,
        excerpt: s.excerpt,
        impact: s.impact,
        heroImageUrl: s.heroImage,
        pullQuote: s.quote,
        tags: s.tags,
        year: s.date ? Number((s.date.match(/\d{4}/) || ["2025"])[0]) : undefined,
        featured: i === 0,
        active: true,
        order: (i + 1) * 10,
      });
      success++;
    } catch (err) {
      failed++;
      console.error(`    ❌ ${s.id}:`, (err as Error).message);
    }
  }

  console.log(`\n✅ Done — ${success} succeeded, ${failed} failed.`);
  console.log("Visit https://bbborders.sanity.studio/structure/successStory to verify.\n");
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
