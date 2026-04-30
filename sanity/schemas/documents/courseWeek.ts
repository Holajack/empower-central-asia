import { defineField, defineType } from "sanity";

export default defineType({
  name: "courseWeek",
  title: "Course Week",
  type: "document",
  description:
    "Top-of-page content for a single course week: title, subtitle, key quote, overview, objectives, action items. Does NOT store lesson body content.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "meta", title: "Meta" },
  ],
  fields: [
    defineField({
      name: "course",
      title: "Course",
      type: "reference",
      to: [{ type: "course" }],
      group: "meta",
      description: "The parent course this week belongs to.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "weekNumber",
      title: "Week Number",
      type: "number",
      group: "meta",
      description: "1-based week index within this course.",
      validation: (Rule) => Rule.required().min(1).max(52),
    }),
    // ----- English fields -----
    defineField({
      name: "title",
      title: "Week Title (English)",
      type: "string",
      group: "english",
      description: "e.g. 'Your Money, Your Story'",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "subtitle",
      title: "Week Subtitle (English)",
      type: "string",
      group: "english",
      description: "Short sub-heading shown beneath the title.",
    }),
    defineField({
      name: "keyQuote",
      title: "Key Quote (English)",
      type: "text",
      group: "english",
      rows: 3,
      description: "Pull quote shown at the top of the week overview.",
    }),
    defineField({
      name: "quoteAuthor",
      title: "Quote Author",
      type: "string",
      group: "english",
      description: "Attribution for the key quote (not localised — usually a proper name).",
    }),
    defineField({
      name: "overview",
      title: "Overview (English)",
      type: "text",
      group: "english",
      rows: 5,
      description: "One-paragraph summary of the week shown at the top of the page.",
    }),
    defineField({
      name: "objectives",
      title: "Learning Objectives (English)",
      type: "array",
      group: "english",
      of: [{ type: "string" }],
      description: "Bullet-point list of what learners will achieve.",
    }),
    defineField({
      name: "actionItems",
      title: "Action Items (English)",
      type: "array",
      group: "english",
      of: [{ type: "string" }],
      description: "Practical tasks learners should complete this week.",
    }),
    defineField({
      name: "moduleTitle",
      title: "Module Title (English)",
      type: "string",
      group: "english",
      description: "Optional module label shown as a badge (e.g. 'Module 1: Think Like an Entrepreneur').",
    }),
    // ----- Russian fields -----
    defineField({
      name: "titleRu",
      title: "Week Title (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "subtitleRu",
      title: "Week Subtitle (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "keyQuoteRu",
      title: "Key Quote (Русский)",
      type: "text",
      group: "russian",
      rows: 3,
    }),
    defineField({
      name: "overviewRu",
      title: "Overview (Русский)",
      type: "text",
      group: "russian",
      rows: 5,
    }),
    defineField({
      name: "objectivesRu",
      title: "Learning Objectives (Русский)",
      type: "array",
      group: "russian",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "actionItemsRu",
      title: "Action Items (Русский)",
      type: "array",
      group: "russian",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "moduleTitleRu",
      title: "Module Title (Русский)",
      type: "string",
      group: "russian",
    }),
  ],
  orderings: [
    {
      title: "Week Number",
      name: "weekNumberAsc",
      by: [{ field: "weekNumber", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "weekNumber",
      course: "course.slug.current",
    },
    prepare({ title, subtitle, course }) {
      return {
        title: title || "Untitled week",
        subtitle: `${course || "?"} — Week ${subtitle ?? "?"}`,
      };
    },
  },
});
