/**
 * Phase 7 — seed testimonial docs from src/data/testimonials.ts.
 *
 *   SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-testimonials.mts
 *
 * Idempotent — _id="testimonial.<slug-of-name>".
 */
import { createClient } from "@sanity/client";
import { testimonials } from "../src/data/testimonials.js";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN.\n");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

async function main() {
  console.log(`\n🚀 Seeding ${testimonials.length} testimonials\n`);
  for (const [i, t] of testimonials.entries()) {
    const _id = `testimonial.${slugify(t.name)}`;
    console.log(`→ ${t.name}`);
    await client.createOrReplace({
      _id,
      _type: "testimonial",
      name: t.name,
      business: t.business,
      businessRu: t.businessRu,
      quote: t.quote,
      quoteRu: t.quoteRu,
      before: t.before,
      beforeRu: t.beforeRu,
      after: t.after,
      afterRu: t.afterRu,
      imageUrl: t.image,
      featured: i < 2,
      active: true,
      order: (i + 1) * 10,
    });
  }
  console.log("\n✅ Done. Visit https://bbborders.sanity.studio/structure/testimonial to verify.\n");
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
