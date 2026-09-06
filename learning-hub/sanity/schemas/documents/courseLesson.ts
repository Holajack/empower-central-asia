import { defineField, defineType } from "sanity";

/**
 * A single lesson within a course week — typically one day's worth of
 * teaching content. Authors edit transcript bodies as Portable Text and
 * pick a video, optional worksheet slug, and related blog posts.
 *
 * Doc-id convention used by the migration script:
 *   courseLesson.<courseSlug>.week-<N>.day-<D>
 */
export default defineType({
  name: "courseLesson",
  title: "Course Lesson",
  type: "document",
  description:
    "One lesson (usually one day) inside a course week. Has bilingual transcript body, key takeaways, action items, and an optional video + worksheet reference.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "media", title: "Media" },
    { name: "details", title: "Details" },
    { name: "marketing", title: "Marketing / SEO" },
  ],
  fields: [
    // ────────── Structure / references ──────────
    defineField({
      name: "course",
      title: "Course",
      type: "reference",
      group: "details",
      to: [{ type: "course" }],
      validation: (R) => R.required(),
    }),
    defineField({
      name: "week",
      title: "Week",
      type: "reference",
      group: "details",
      to: [{ type: "courseWeek" }],
      validation: (R) => R.required(),
    }),
    defineField({
      name: "dayNumber",
      title: "Day Number",
      type: "number",
      group: "details",
      description: "Which day inside the week (0 = intro, 1-6 normal days).",
      validation: (R) => R.required().min(0).max(7),
    }),
    defineField({
      name: "order",
      title: "Order Within Week",
      type: "number",
      group: "details",
      description:
        "Used to sort lessons inside a week. Usually matches dayNumber.",
    }),
    // ────────── English ──────────
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      group: "english",
      description:
        "Lesson title. If blank, the leadership-course migration writes to dayTitle instead — both are accepted.",
    }),
    // Leadership-course migration variant — same role as `title` but kept
    // distinct so the two shapes can coexist while the canonical shape lands.
    defineField({
      name: "dayTitle",
      title: "Day Title (English) — leadership variant",
      type: "string",
      group: "english",
      description: "Alternate title field used by the Leadership Development migration.",
      hidden: ({ document }) => Boolean(document?.title),
    }),
    defineField({
      name: "dayTitleRu",
      title: "Day Title (Русский) — leadership variant",
      type: "string",
      group: "russian",
      hidden: ({ document }) => Boolean(document?.titleRu),
    }),
    // Cached weekNumber on the lesson — convenience field used by the LD
    // migration so renderers don't have to dereference the week ref.
    defineField({
      name: "weekNumber",
      title: "Week Number (cached)",
      type: "number",
      group: "details",
      description:
        "Optional convenience copy of the week number. Source of truth is the week reference.",
    }),
    // Active flag — lets editors hide a lesson without deleting.
    defineField({
      name: "active",
      title: "Active?",
      type: "boolean",
      group: "details",
      initialValue: true,
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "details",
      options: { source: "title", maxLength: 96 },
    }),
    defineField({
      name: "keyQuote",
      title: "Key Quote (English)",
      type: "text",
      rows: 2,
      group: "english",
    }),
    defineField({
      name: "overview",
      title: "Overview (English)",
      type: "blockContent",
      group: "english",
      description: "Short intro paragraph(s) that frame the lesson.",
    }),
    defineField({
      name: "transcript",
      title: "Transcript / Body (English)",
      type: "blockContent",
      group: "english",
      description: "Main lesson body. Long-form Portable Text.",
    }),
    defineField({
      name: "keyTakeaways",
      title: "Key Takeaways",
      type: "array",
      group: "english",
      description: "Short bullet points the learner should remember.",
      of: [
        {
          type: "object",
          name: "takeaway",
          fields: [
            { name: "text", title: "Takeaway (English)", type: "text", rows: 2 },
            {
              name: "textRu",
              title: "Takeaway (Русский)",
              type: "text",
              rows: 2,
            },
          ],
          preview: {
            select: { title: "text" },
          },
        },
      ],
    }),
    defineField({
      name: "actionItems",
      title: "Action Items",
      type: "array",
      group: "english",
      description: "Specific things the learner should do this lesson.",
      of: [
        {
          type: "object",
          name: "actionItem",
          fields: [
            { name: "text", title: "Action (English)", type: "text", rows: 2 },
            {
              name: "textRu",
              title: "Action (Русский)",
              type: "text",
              rows: 2,
            },
          ],
          preview: {
            select: { title: "text" },
          },
        },
      ],
    }),
    // ────────── Russian ──────────
    defineField({
      name: "titleRu",
      title: "Title (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "keyQuoteRu",
      title: "Key Quote (Русский)",
      type: "text",
      rows: 2,
      group: "russian",
    }),
    defineField({
      name: "overviewRu",
      title: "Overview (Русский)",
      type: "blockContent",
      group: "russian",
    }),
    defineField({
      name: "transcriptRu",
      title: "Transcript / Body (Русский)",
      type: "blockContent",
      group: "russian",
    }),
    // ────────── Leadership-variant structured-day fields ──────────
    // These are written by the Leadership Development migration. Optional —
    // the Financial Literacy and Business Creation migrations leave them empty
    // and use the flat transcript / keyTakeaways / actionItems shape above.
    defineField({
      name: "lessonSection",
      title: "Lesson Section (leadership variant)",
      type: "object",
      group: "english",
      description:
        "Structured per-day content used by the Leadership Development migration. Empty for FL/BC lessons.",
      fields: [
        { name: "id", type: "string", title: "Section ID" },
        { name: "heading", type: "string", title: "Heading (English)" },
        { name: "headingRu", type: "string", title: "Heading (Русский)" },
        { name: "content", type: "blockContent", title: "Content (English)" },
        { name: "contentRu", type: "blockContent", title: "Content (Русский)" },
        { name: "callout", type: "text", rows: 3, title: "Callout (English)" },
        { name: "calloutRu", type: "text", rows: 3, title: "Callout (Русский)" },
        {
          name: "questionsToConsider",
          title: "Questions To Consider",
          type: "array",
          of: [
            {
              type: "object",
              name: "questionItem",
              fields: [
                { name: "question", type: "string", title: "Question (English)" },
                { name: "questionRu", type: "string", title: "Question (Русский)" },
                { name: "prompt", type: "text", title: "Prompt (English)" },
                { name: "promptRu", type: "text", title: "Prompt (Русский)" },
              ],
            },
          ],
        },
        {
          name: "deeperPerspective",
          type: "blockContent",
          title: "Deeper Perspective (English)",
        },
        {
          name: "deeperPerspectiveRu",
          type: "blockContent",
          title: "Deeper Perspective (Русский)",
        },
      ],
      hidden: ({ document }) => !document?.lessonSection,
    }),
    defineField({
      name: "storyParagraphs",
      title: "Story Paragraphs (leadership variant, English)",
      type: "array",
      group: "english",
      of: [{ type: "text", rows: 3 }],
      description:
        "Per-day story paragraphs used by the Leadership Development migration. Empty for FL/BC lessons.",
      hidden: ({ document }) => {
        const arr = document?.storyParagraphs;
        return !Array.isArray(arr) || arr.length === 0;
      },
    }),
    defineField({
      name: "storyParagraphsRu",
      title: "Story Paragraphs (leadership variant, Русский)",
      type: "array",
      group: "russian",
      of: [{ type: "text", rows: 3 }],
      hidden: ({ document }) => {
        const arr = document?.storyParagraphsRu;
        return !Array.isArray(arr) || arr.length === 0;
      },
    }),
    defineField({
      name: "reflectionQuestions",
      title: "Reflection Questions (leadership variant)",
      type: "array",
      group: "english",
      of: [
        {
          type: "object",
          name: "reflectionQuestion",
          fields: [
            { name: "question", type: "string", title: "Question (English)" },
            { name: "questionRu", type: "string", title: "Question (Русский)" },
            { name: "prompt", type: "text", title: "Prompt (English)" },
            { name: "promptRu", type: "text", title: "Prompt (Русский)" },
          ],
        },
      ],
      hidden: ({ document }) => {
        const arr = document?.reflectionQuestions;
        return !Array.isArray(arr) || arr.length === 0;
      },
    }),
    defineField({
      name: "isWorksheetDay",
      title: "Worksheet Day?",
      type: "boolean",
      group: "details",
      initialValue: false,
      description: "Day-4 marker used by the Leadership Development variant.",
    }),
    defineField({
      name: "isWrapUpDay",
      title: "Wrap-Up Day?",
      type: "boolean",
      group: "details",
      initialValue: false,
      description: "Day-6 marker used by the Leadership Development variant.",
    }),
    // ────────── Media ──────────
    defineField({
      name: "videoEmbed",
      title: "Lesson Video",
      type: "videoEmbed",
      group: "media",
      description:
        "Optional YouTube/Vimeo for this specific lesson. Falls back to the week-level video if blank.",
    }),
    // ────────── Details ──────────
    defineField({
      name: "worksheetSlug",
      title: "Worksheet Slug",
      type: "string",
      group: "details",
      description:
        'Optional. Links to a hardcoded worksheet component (e.g. "financial-snapshot", "income-map", "zero-based-budget").',
    }),
    defineField({
      name: "relatedBlogPostSlugs",
      title: "Related Blog Posts",
      type: "array",
      group: "details",
      description:
        "Slugs of blog posts to surface as related reading on this lesson.",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "duration",
      title: "Estimated Duration",
      type: "string",
      group: "details",
      description: 'e.g. "15 min", "10-15 min".',
    }),
    // ────────── Marketing ──────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
      group: "marketing",
    }),
  ],
  orderings: [
    {
      title: "Course → Week → Day",
      name: "courseWeekDayAsc",
      by: [
        { field: "course._ref", direction: "asc" },
        { field: "week._ref", direction: "asc" },
        { field: "dayNumber", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      title: "title",
      day: "dayNumber",
      weekTitle: "week.title",
      courseTitle: "course.title",
    },
    prepare({ title, day, weekTitle, courseTitle }) {
      const head = `Day ${day ?? "?"}: ${title ?? "(untitled)"}`;
      const sub = [courseTitle, weekTitle].filter(Boolean).join(" · ");
      return { title: head, subtitle: sub || undefined };
    },
  },
});
