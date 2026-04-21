import { defineField, defineType } from "sanity";

export default defineType({
  name: "successStory",
  title: "Success Story",
  type: "document",
  description:
    "Real stories from program participants. Replace fictional placeholders as real stories come in.",
  fields: [
    defineField({
      name: "name",
      title: "Participant Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
    }),
    defineField({
      name: "location",
      title: "Location",
      type: "string",
      description: "City, Country (e.g. 'Almaty, Kazakhstan')",
    }),
    defineField({
      name: "program",
      title: "Program",
      type: "reference",
      to: [{ type: "programPage" }],
      description: "Which BBB program did they go through?",
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Alt text",
          validation: (Rule) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: "story",
      title: "Story",
      type: "blockContent",
    }),
    defineField({
      name: "pullQuote",
      title: "Pull Quote",
      type: "text",
      rows: 3,
      description:
        "A single powerful line from their story — displayed large on the site.",
    }),
    defineField({
      name: "year",
      title: "Year",
      type: "number",
      validation: (Rule) => Rule.min(2020).max(2030),
    }),
    defineField({
      name: "featured",
      title: "Feature on homepage?",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "name", subtitle: "location", media: "photo" },
  },
});
