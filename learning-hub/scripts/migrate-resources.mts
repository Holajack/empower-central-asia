/**
 * Phase 6 — seed top-level resource metadata from src/data/resources.ts
 * into Sanity resource docs.
 *
 *   SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-resources.mts
 *
 * Idempotent. The deep `sections` and `sectionsRu` arrays are NOT migrated
 * here — those drive the detail pages and have nested table data. They
 * stay in src/data/resources.ts until a follow-up phase migrates them
 * (likely as Portable Text + a custom table block).
 */
import { createClient } from "@sanity/client";
import { resources } from "../src/data/resources.js";

const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;
if (!token || !projectId) {
  console.error("\n❌ Set SANITY_PROJECT_ID and SANITY_WRITE_TOKEN (see SETUP.md).\n");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

async function main() {
  console.log(`\n🚀 Seeding ${resources.length} resources\n`);
  for (const [i, r] of resources.entries()) {
    const _id = `resource.${r.slug}`;
    console.log(`→ ${r.slug}`);
    await client.createOrReplace({
      _id,
      _type: "resource",
      title: r.title,
      titleRu: r.titleRu,
      slug: { _type: "slug", current: r.slug },
      description: r.description,
      descriptionRu: r.descriptionRu,
      excerpt: r.excerpt,
      excerptRu: r.excerptRu,
      icon: r.icon,
      keywords: r.keywords,
      active: true,
      order: (i + 1) * 10,
    });
  }
  console.log(`\n✅ Done. Visit https://bbborders.sanity.studio/structure/resource to verify.\n`);
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
