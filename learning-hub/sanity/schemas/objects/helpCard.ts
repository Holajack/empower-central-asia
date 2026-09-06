import { defineField, defineType } from "sanity";

/**
 * Reusable card object for the homepage HowToHelp section.
 * One card = title, description, lucide icon name, link, button text.
 */
export default defineType({
  name: "helpCard",
  title: "Help Card",
  type: "object",
  fields: [
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
      name: "description",
      title: "Description (English)",
      type: "text",
      rows: 3,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "descriptionRu",
      title: "Description (Русский)",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "icon",
      title: "Icon (lucide name)",
      type: "string",
      description:
        "Lucide icon name (e.g. BookOpen, Briefcase, Calculator, Newspaper, Heart, Users2, Handshake).",
      initialValue: "BookOpen",
    }),
    defineField({
      name: "link",
      title: "Link",
      type: "string",
      description: "Internal path (/course/...) or full URL.",
    }),
    defineField({
      name: "buttonText",
      title: "Button Text (English)",
      type: "string",
    }),
    defineField({
      name: "buttonTextRu",
      title: "Button Text (Русский)",
      type: "string",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description", icon: "icon" },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
});
