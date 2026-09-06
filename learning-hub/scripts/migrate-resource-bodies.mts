/**
 * Migrate resource section data from src/data/resources.ts into Sanity as
 * Portable Text stored in the `body` and `bodyRu` fields on each resource doc.
 *
 * Idempotent: if a doc already has a non-empty `body`, it is skipped unless
 * the --force flag is passed.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:resource-bodies
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:resource-bodies -- --force
 *
 * Conversion rules:
 *   section.heading   → {_type:'block', style:'h2', children:[{_type:'span', text: heading}]}
 *   section.content[] → normal paragraph blocks
 *   section.items[]   → bullet list blocks (listItem:'bullet', level:1)
 *   section.table     → paragraph block with a plain-text table summary
 *                        (Sanity blockContent does not support native tables;
 *                        structured table data lives in the legacy fallback)
 */
import { createClient } from "@sanity/client";
import { resources } from "../src/data/resources.js";
import type { ResourceSection } from "../src/data/resources.js";

// ─── Config ──────────────────────────────────────────────────────────────────

const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN env var.\n");
  process.exit(1);
}

const force = process.argv.includes("--force");

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ─── Portable Text helpers ────────────────────────────────────────────────────

let _keyCounter = 0;
function key(prefix: string): string {
  return `${prefix}${++_keyCounter}`;
}

function makeSpan(text: string, spanKey?: string): object {
  return {
    _type: "span",
    _key: spanKey ?? key("s"),
    marks: [],
    text,
  };
}

function makeBlock(
  text: string,
  style = "normal",
  blockKey?: string,
): object {
  return {
    _type: "block",
    _key: blockKey ?? key("b"),
    style,
    markDefs: [],
    children: [makeSpan(text)],
  };
}

function makeBulletBlock(text: string): object {
  return {
    _type: "block",
    _key: key("bl"),
    style: "normal",
    listItem: "bullet",
    level: 1,
    markDefs: [],
    children: [makeSpan(text)],
  };
}

/**
 * Convert a ResourceSection array into a Portable Text block array.
 *
 * Tables are rendered as a plain paragraph that summarises the header row and
 * the data rows. This keeps the information accessible in the CMS without
 * requiring a custom table block type in the schema.
 */
function sectionsToPortableText(sections: ResourceSection[]): object[] {
  const blocks: object[] = [];

  for (const section of sections) {
    // Heading
    blocks.push(makeBlock(section.heading, "h2"));

    // Content paragraphs
    for (const para of section.content) {
      blocks.push(makeBlock(para));
    }

    // Bullet items
    if (section.items) {
      for (const item of section.items) {
        blocks.push(makeBulletBlock(item));
      }
    }

    // Table — flatten to a readable paragraph summary
    if (section.table) {
      const { headers, rows } = section.table;
      const headerLine = `Table — Columns: ${headers.join(" | ")}`;
      blocks.push(makeBlock(headerLine));

      for (const row of rows) {
        const rowLine = row.filter(Boolean).join(" | ");
        if (rowLine.trim()) {
          blocks.push(makeBulletBlock(rowLine));
        }
      }
    }
  }

  return blocks;
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log(
    `\n🚀 migrate-resource-bodies — migrating ${resources.length} resource(s)` +
    (force ? " (force mode: overwriting existing bodies)" : "") +
    "\n",
  );

  let patched = 0;
  let skipped = 0;
  let errors = 0;

  for (const r of resources) {
    const docId = `resource.${r.slug}`;
    console.log(`→ ${r.slug}`);

    try {
      // Check if this doc already has body content (idempotency guard)
      const existing = await client.fetch<{ body?: unknown[] } | null>(
        `*[_id == $id][0]{ body }`,
        { id: docId },
      );

      if (existing === null) {
        console.log(`   ⚠️  Doc not found in Sanity (run migrate:resources first) — skipping`);
        skipped++;
        continue;
      }

      if (!force && existing?.body && (existing.body as unknown[]).length > 0) {
        console.log(`   ✅ Already has body (${(existing.body as unknown[]).length} blocks) — skipping`);
        skipped++;
        continue;
      }

      // Reset key counter so keys are stable per-resource
      _keyCounter = 0;

      const body = sectionsToPortableText(r.sections);
      const bodyRu = sectionsToPortableText(r.sectionsRu);

      await client.patch(docId).set({ body, bodyRu }).commit();

      console.log(
        `   ✅ Patched: body=${body.length} blocks, bodyRu=${bodyRu.length} blocks`,
      );
      patched++;
    } catch (err) {
      console.error(`   ❌ Error patching ${docId}:`, err);
      errors++;
    }
  }

  console.log("\n────────────────────────────────────");
  console.log(`✅ Done.`);
  console.log(`   Patched : ${patched}`);
  console.log(`   Skipped : ${skipped}`);
  console.log(`   Errors  : ${errors}`);
  if (errors > 0) {
    process.exit(1);
  }
  console.log(
    "\n   View at: https://bbborders.sanity.studio/structure/resource\n",
  );
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err.message ?? err);
  process.exit(1);
});
