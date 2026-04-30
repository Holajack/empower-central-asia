import { defineField, defineType } from "sanity";

export default defineType({
  name: "resource",
  title: "Resource / Toolkit",
  type: "document",
  description:
    "A free toolkit shown on /resources. Top-level metadata is editable here; the deep sections (worksheets, tables) currently still live in src/data/resources.ts and will move in a follow-up phase.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "meta", title: "Categorization" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      group: "english",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "titleRu",
      title: "Title (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "meta",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
    }),
    defineField({
      name: "description",
      title: "Description (English)",
      type: "text",
      group: "english",
      rows: 3,
      description: "Used for SEO + the longer description on detail pages.",
    }),
    defineField({
      name: "descriptionRu",
      title: "Description (Русский)",
      type: "text",
      group: "russian",
      rows: 3,
    }),
    defineField({
      name: "excerpt",
      title: "Card Excerpt (English)",
      type: "text",
      group: "english",
      rows: 2,
      description: "Short preview shown on the /resources listing card.",
      validation: (R) => R.max(280),
    }),
    defineField({
      name: "excerptRu",
      title: "Card Excerpt (Русский)",
      type: "text",
      group: "russian",
      rows: 2,
    }),
    defineField({
      name: "icon",
      title: "Icon (lucide name)",
      type: "string",
      group: "meta",
      description:
        "Lucide icon name — Map, Users, BarChart3, BookOpen, DollarSign, Calculator. Falls back to BookOpen if unknown.",
      initialValue: "BookOpen",
    }),
    defineField({
      name: "keywords",
      title: "SEO Keywords",
      type: "array",
      group: "meta",
      of: [{ type: "string" }],
      options: { layout: "tags" },
    }),
    defineField({
      name: "active",
      title: "Active?",
      type: "boolean",
      group: "meta",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "meta",
      initialValue: 10,
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { title: "title", subtitle: "excerpt", active: "active" },
    prepare({ title, subtitle, active }) {
      return {
        title: active === false ? `[HIDDEN] ${title}` : title,
        subtitle,
      };
    },
  },
});
