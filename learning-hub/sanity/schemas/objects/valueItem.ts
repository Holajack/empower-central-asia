import { defineField, defineType } from "sanity";

/**
 * Reusable value/principle item — used as an array element on the About page.
 * Icon name maps to a lucide-react icon component on the site
 * (e.g. "Target", "Globe", "Heart").
 */
export default defineType({
  name: "valueItem",
  title: "Value / Principle",
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
        "Lucide icon name — e.g. Target, Globe, Heart, Users, TrendingUp, Lightbulb. Case-sensitive.",
      initialValue: "Target",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "description", icon: "icon" },
    prepare({ title, subtitle }) {
      return { title, subtitle };
    },
  },
});
