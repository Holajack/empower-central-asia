import { defineField, defineType } from "sanity";

/**
 * One row in a program page's "What You'll Learn" / curriculum accordion.
 * Used as an array element on programPage.weeks.
 *
 * Two shapes share this object:
 *   1. Simple — used by Financial Literacy (per week) and Leadership Development
 *      (per module). Only `weekNumber`, `title`, and `summary` are needed.
 *   2. Rich — used by Business Creation (12-week curriculum, 4 modules) and
 *      Community Collaboration (3-phase launch roadmap). These also need two
 *      side-by-side bullet lists ("Key Topics" + "Deliverables", or similar).
 *      The `keyTopics` and `deliverables` arrays carry that detail and are
 *      OPTIONAL so the simple shape still validates.
 *
 * The detailed week content (objectives, action items, video, etc.) for the
 * Learn-Practice-Apply lesson player still lives on `courseWeek` documents.
 */
export default defineType({
  name: "weekOverview",
  title: "Week / Module Overview",
  type: "object",
  fields: [
    defineField({
      name: "weekNumber",
      title: "Week / Module Number",
      type: "number",
      validation: (R) => R.required().min(1).max(20),
    }),
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "titleRu",
      title: "Title (Русский)",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Summary (English)",
      type: "text",
      rows: 3,
      description:
        "Short paragraph shown when the row is expanded on the program page.",
    }),
    defineField({
      name: "summaryRu",
      title: "Summary (Русский)",
      type: "text",
      rows: 3,
    }),

    // ── Optional rich detail (for Business Creation modules &
    // Community Collaboration phases). Leave empty for the simple shape. ──
    defineField({
      name: "keyTopicsHeading",
      title: "Left Column Heading (English)",
      type: "string",
      description:
        'Heading above the left bullet list. Defaults to "Key Topics" if blank.',
    }),
    defineField({
      name: "keyTopicsHeadingRu",
      title: "Left Column Heading (Русский)",
      type: "string",
    }),
    defineField({
      name: "keyTopics",
      title: "Left Column Bullets",
      type: "array",
      description:
        'Bullets shown under the left heading (e.g. "Key Topics" or "Volunteer Recruitment"). Leave empty for the simple shape.',
      of: [
        {
          type: "object",
          name: "bilingualBullet",
          title: "Bullet",
          fields: [
            defineField({
              name: "label",
              title: "Label (English)",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "labelRu",
              title: "Label (Русский)",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "label" },
          },
        },
      ],
    }),
    defineField({
      name: "deliverablesHeading",
      title: "Right Column Heading (English)",
      type: "string",
      description:
        'Heading above the right bullet list. Defaults to "Deliverables" if blank.',
    }),
    defineField({
      name: "deliverablesHeadingRu",
      title: "Right Column Heading (Русский)",
      type: "string",
    }),
    defineField({
      name: "deliverables",
      title: "Right Column Bullets",
      type: "array",
      description:
        'Bullets shown under the right heading (e.g. "Deliverables" or "Infrastructure Development"). Leave empty for the simple shape.',
      of: [
        {
          type: "object",
          name: "bilingualBullet",
          title: "Bullet",
          fields: [
            defineField({
              name: "label",
              title: "Label (English)",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "labelRu",
              title: "Label (Русский)",
              type: "string",
            }),
          ],
          preview: {
            select: { title: "label" },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { weekNumber: "weekNumber", title: "title" },
    prepare({ weekNumber, title }) {
      return {
        title: `Week ${weekNumber ?? "?"}: ${title ?? "(untitled)"}`,
      };
    },
  },
});
