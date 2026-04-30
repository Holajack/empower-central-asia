import { defineField, defineType } from "sanity";

export default defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  description:
    "Short participant quotes shown in the testimonial carousel. Add new ones as participants share feedback; mark inactive instead of deleting.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "details", title: "Details" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Participant Name",
      type: "string",
      group: "details",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "business",
      title: "Business / Role (English)",
      type: "string",
      group: "english",
      description: "e.g. 'Handcraft Collective, Bishkek'",
    }),
    defineField({
      name: "businessRu",
      title: "Business / Role (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "quote",
      title: "Quote (English)",
      type: "text",
      group: "english",
      rows: 5,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "quoteRu",
      title: "Quote (Русский)",
      type: "text",
      group: "russian",
      rows: 5,
    }),
    defineField({
      name: "before",
      title: "Before (English)",
      type: "string",
      group: "english",
      description: "Short status before the program (e.g. 'Unemployed with mounting debt').",
    }),
    defineField({
      name: "beforeRu",
      title: "Before (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "after",
      title: "After (English)",
      type: "string",
      group: "english",
      description: "Short status after the program.",
    }),
    defineField({
      name: "afterRu",
      title: "After (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "imageUrl",
      title: "Photo URL",
      type: "string",
      group: "details",
      description:
        "Direct URL (Unsplash, etc.). For uploaded images use the 'Photo' field instead.",
    }),
    defineField({
      name: "photo",
      title: "Photo (uploaded)",
      type: "image",
      group: "details",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "featured",
      title: "Featured?",
      type: "boolean",
      group: "details",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "Active?",
      type: "boolean",
      group: "details",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "details",
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
    select: { name: "name", business: "business", media: "photo", active: "active" },
    prepare({ name, business, media, active }) {
      return {
        title: active === false ? `[HIDDEN] ${name}` : name,
        subtitle: business,
        media,
      };
    },
  },
});
