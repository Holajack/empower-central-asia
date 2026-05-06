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
      validation: (R) => R.required(),
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
