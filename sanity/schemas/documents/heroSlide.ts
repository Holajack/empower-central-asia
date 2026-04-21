import { defineField, defineType } from "sanity";

export default defineType({
  name: "heroSlide",
  title: "Homepage Hero Slide",
  type: "document",
  description: "Slides shown in the homepage hero carousel / rotator.",
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      rows: 2,
      validation: (Rule) => Rule.max(240),
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
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
      name: "cta",
      title: "Call to Action",
      type: "cta",
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers show first. Use increments of 10 to allow reordering.",
      initialValue: 10,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "active",
      title: "Active?",
      type: "boolean",
      description: "Untick to hide this slide without deleting it.",
      initialValue: true,
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
    select: {
      title: "heading",
      subtitle: "subheading",
      media: "backgroundImage",
      active: "active",
    },
    prepare({ title, subtitle, media, active }) {
      return {
        title: active ? title : `[HIDDEN] ${title}`,
        subtitle,
        media,
      };
    },
  },
});
