import { defineField, defineType } from "sanity";

export default defineType({
  name: "course",
  title: "Course",
  type: "document",
  description:
    "Top-level course definition (Financial Literacy, Business Creation, Leadership Development). Weeks are separate courseWeek docs that reference back to a course.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "details", title: "Details" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Course Title (English)",
      type: "string",
      group: "english",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "titleRu",
      title: "Course Title (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "details",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "tagline",
      title: "Short Tagline (English)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "taglineRu",
      title: "Short Tagline (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "description",
      title: "Description (English)",
      type: "text",
      rows: 4,
      group: "english",
    }),
    defineField({
      name: "descriptionRu",
      title: "Description (Русский)",
      type: "text",
      rows: 4,
      group: "russian",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      group: "details",
      description: "e.g. '12 weeks', '6 weeks (self-paced)'",
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
          { title: "All levels", value: "all" },
        ],
      },
      initialValue: "beginner",
    }),
    defineField({
      name: "weekCount",
      title: "Total Weeks",
      type: "number",
      group: "details",
    }),
    defineField({
      name: "active",
      title: "Active?",
      type: "boolean",
      group: "details",
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tagline" },
  },
});
