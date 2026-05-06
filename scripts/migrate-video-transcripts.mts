/**
 * Phase 8 follow-up — migrates the markdown video transcripts at
 *   src/data/video-transcripts/<courseSlug>/week<n>.md
 * into Portable Text on the matching `courseLesson` doc per week.
 *
 * IMPORTANT: This script is run AFTER the agents that create courseLesson
 * docs (one per week per course). If a matching courseLesson doc does not
 * exist for a given (courseSlug, weekNumber), the script logs a warning and
 * skips — it does NOT create lesson docs of its own.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:transcripts
 *
 * Idempotent — uses `client.patch(_id).set({ transcript, transcriptText })`
 * so re-runs simply overwrite the field.
 *
 * Doc-ID convention this script looks for (in priority order):
 *   1. _id == `courseLesson.<courseSlug>.<n>`            (preferred)
 *   2. _type == "courseLesson" && courseSlug == X && weekNumber == n
 *   3. _type == "courseLesson" && course->slug.current == X && weekNumber == n
 *
 * Whichever the sibling agents (P/Q) land on, this script will find and
 * patch the right doc. If NONE of those match, we skip with a warning.
 */
import { createClient } from "@sanity/client";
import { htmlToBlocks } from "@sanity/block-tools";
import { Schema } from "@sanity/schema";
import { JSDOM } from "jsdom";
import { marked } from "marked";
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN env var.\n");
  console.error("Generate at sanity.io/manage → API → Tokens (Editor permissions).");
  console.error("Then run:\n  SANITY_WRITE_TOKEN=<token> npm run migrate:transcripts\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ─── Portable Text schema (matches blockContent schema) ─────────────────────

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
  const html = marked.parse(md, { async: false, gfm: true, breaks: false }) as string;
  return htmlToBlocks(html, blockContentType, {
    parseHtml: (h) => new JSDOM(h).window.document,
  });
}

// ─── Source files ───────────────────────────────────────────────────────────

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT = join(__dirname, "..");

interface TranscriptFile {
  courseSlug: string;
  weekNumber: number;
  filePath: string;
}

function findTranscriptFiles(): TranscriptFile[] {
  const out: TranscriptFile[] = [];
  const baseDir = join(ROOT, "src/data/video-transcripts");

  if (!existsSync(baseDir)) {
    console.error(`❌ ${baseDir} not found`);
    return out;
  }

  // Each subdirectory is a course. Skip non-course folders (docx, etc).
  const knownCourseSlugs = new Set([
    "financial-literacy",
    "business-creation",
    "leadership-development",
  ]);

  for (const entry of readdirSync(baseDir, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (!knownCourseSlugs.has(entry.name)) {
      continue;
    }
    const courseSlug = entry.name;
    const courseDir = join(baseDir, courseSlug);

    for (const file of readdirSync(courseDir)) {
      const m = file.match(/^week(\d+)\.md$/i);
      if (!m) continue;
      const weekNumber = parseInt(m[1], 10);
      out.push({
        courseSlug,
        weekNumber,
        filePath: join(courseDir, file),
      });
    }
  }

  // Sort for stable processing order
  out.sort((a, b) =>
    a.courseSlug === b.courseSlug
      ? a.weekNumber - b.weekNumber
      : a.courseSlug.localeCompare(b.courseSlug),
  );
  return out;
}

// ─── Lesson doc lookup ──────────────────────────────────────────────────────

interface LessonRef {
  _id: string;
  _type: string;
}

/**
 * Find the courseLesson doc for a given course slug + week number.
 * Tries multiple ID/field conventions to be tolerant of whichever shape the
 * sibling agents (P/Q) landed on.
 */
async function findLessonDoc(
  courseSlug: string,
  weekNumber: number,
): Promise<LessonRef | null> {
  // 1) Deterministic ID convention
  const guessedId = `courseLesson.${courseSlug}.${weekNumber}`;
  const byId = await client.fetch<LessonRef | null>(
    `*[_id == $id][0]{ _id, _type }`,
    { id: guessedId },
  );
  if (byId) return byId;

  // 2) Inline courseSlug + weekNumber field
  const byInlineSlug = await client.fetch<LessonRef | null>(
    `*[_type == "courseLesson" && courseSlug == $courseSlug && weekNumber == $weekNumber][0]{ _id, _type }`,
    { courseSlug, weekNumber },
  );
  if (byInlineSlug) return byInlineSlug;

  // 3) Course reference
  const byRef = await client.fetch<LessonRef | null>(
    `*[_type == "courseLesson" && course->slug.current == $courseSlug && weekNumber == $weekNumber][0]{ _id, _type }`,
    { courseSlug, weekNumber },
  );
  if (byRef) return byRef;

  return null;
}

// ─── Main ───────────────────────────────────────────────────────────────────

interface Result {
  patched: number;
  skipped: number;
  errors: number;
  total: number;
}

async function main(): Promise<Result> {
  const files = findTranscriptFiles();
  console.log(
    `\n🚀 migrate-video-transcripts — found ${files.length} transcript file(s)\n`,
  );

  const result: Result = {
    patched: 0,
    skipped: 0,
    errors: 0,
    total: files.length,
  };

  for (const f of files) {
    const label = `${f.courseSlug} week ${f.weekNumber}`;
    process.stdout.write(`→ ${label} ... `);

    try {
      const lesson = await findLessonDoc(f.courseSlug, f.weekNumber);
      if (!lesson) {
        console.log(
          `⚠️  no matching courseLesson doc — skipping (run agent P/Q migrations first)`,
        );
        result.skipped++;
        continue;
      }

      const md = readFileSync(f.filePath, "utf-8");
      const transcript = markdownToPortableText(md);

      // Also store a plain-text snapshot for full-text search / fallback.
      const transcriptText = md;

      await client
        .patch(lesson._id)
        .set({ transcript, transcriptText })
        .commit();

      console.log(`✅ patched (${transcript.length} blocks → ${lesson._id})`);
      result.patched++;
    } catch (err) {
      console.log(`❌ ${(err as Error).message}`);
      result.errors++;
    }
  }

  console.log("\n────────────────────────────────────");
  console.log(`✅ Done.`);
  console.log(`   Total processed : ${result.total}`);
  console.log(`   Patched         : ${result.patched}`);
  console.log(`   Skipped         : ${result.skipped}`);
  console.log(`   Errors          : ${result.errors}`);

  if (result.skipped > 0) {
    console.log(
      `\n   ℹ️  Skipped weeks need their courseLesson doc created first` +
        ` (P/Q migrations).` +
        ` Re-run after those land — the script is idempotent.`,
    );
  }

  if (result.errors > 0) {
    process.exit(1);
  }

  console.log(
    "\n   View at: https://bbborders.sanity.studio/structure/courseLesson\n",
  );

  return result;
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
