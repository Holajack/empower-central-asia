import { defineField, defineType } from "sanity";

export default defineType({
  name: "course",
  title: "Course",
  type: "document",
  description:
    "Top-level course documents: Financial Literacy, Business Creation, Leadership Development.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
  ],
  fields: [
    defineField({
      name: "slug",
      title: "Course Slug",
      type: "slug",
      group: "english",
      description: "Matches the URL path: financial-literacy, business-creation, leadership-development.",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "title",
      title: "Course Title (English)",
      type: "string",
      group: "english",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleRu",
      title: "Course Title (Русский)",
      type: "string",
      group: "russian",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
