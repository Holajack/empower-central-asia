import { defineField, defineType } from "sanity";

export default defineType({
  name: "courseWeek",
  title: "Course Week",
  type: "document",
  description:
    "One week of a course. Title, key quote, overview, objectives, action items are all editable. Deep lesson sections / story content are still hardcoded in src/data — that's a future phase.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "structure", title: "Structure" },
  ],
  fields: [
    defineField({
      name: "course",
      title: "Course",
      type: "reference",
      group: "structure",
      to: [{ type: "course" }],
      validation: (R) => R.required(),
    }),
    defineField({
      name: "weekNumber",
      title: "Week Number",
      type: "number",
      group: "structure",
      validation: (R) => R.required().min(1).max(20),
    }),
    defineField({
      name: "moduleNumber",
      title: "Module Number",
      type: "number",
      group: "structure",
    }),
    defineField({
      name: "moduleTitle",
      title: "Module Title (English)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "moduleTitleRu",
      title: "Module Title (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "title",
      title: "Week Title (English)",
      type: "string",
      group: "english",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "titleRu",
      title: "Week Title (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "subtitle",
      title: "Subtitle (English)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "subtitleRu",
      title: "Subtitle (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "keyQuote",
      title: "Key Quote (English)",
      type: "text",
      rows: 2,
      group: "english",
    }),
    defineField({
      name: "keyQuoteRu",
      title: "Key Quote (Русский)",
      type: "text",
      rows: 2,
      group: "russian",
    }),
    defineField({
      name: "quoteAuthor",
      title: "Quote Author",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "overview",
      title: "Overview (English)",
      type: "text",
      rows: 8,
      group: "english",
    }),
    defineField({
      name: "overviewRu",
      title: "Overview (Русский)",
      type: "text",
      rows: 8,
      group: "russian",
    }),
    defineField({
      name: "objectives",
      title: "Learning Objectives (English)",
      type: "array",
      of: [{ type: "string" }],
      group: "english",
    }),
    defineField({
      name: "objectivesRu",
      title: "Learning Objectives (Русский)",
      type: "array",
      of: [{ type: "string" }],
      group: "russian",
    }),
    defineField({
      name: "actionItems",
      title: "Action Items (English)",
      type: "array",
      of: [{ type: "string" }],
      group: "english",
    }),
    defineField({
      name: "actionItemsRu",
      title: "Action Items (Русский)",
      type: "array",
      of: [{ type: "string" }],
      group: "russian",
    }),
    defineField({
      name: "videoEmbed",
      title: "Lesson Video",
      type: "videoEmbed",
      group: "structure",
      description:
        "YouTube or Vimeo video for this week. Optional — leave blank if not yet recorded.",
    }),
    defineField({
      name: "active",
      title: "Active?",
      type: "boolean",
      group: "structure",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Course + Week",
      name: "courseWeekAsc",
      by: [
        { field: "course._ref", direction: "asc" },
        { field: "weekNumber", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: {
      week: "weekNumber",
      title: "title",
      courseTitle: "course.title",
      active: "active",
    },
    prepare({ week, title, courseTitle, active }) {
      const head = `Week ${week ?? "?"}: ${title ?? "(untitled)"}`;
      return {
        title: active === false ? `[HIDDEN] ${head}` : head,
        subtitle: courseTitle,
      };
    },
  },
});
