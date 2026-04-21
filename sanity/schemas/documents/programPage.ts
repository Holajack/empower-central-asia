import { defineField, defineType } from "sanity";

export default defineType({
  name: "programPage",
  title: "Program Page",
  type: "document",
  description:
    "The three programs: Business Creation, Financial Literacy, Leadership.",
  fields: [
    defineField({
      name: "title",
      title: "Program Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "One short line shown under the program title.",
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
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
      name: "description",
      title: "Program Description",
      type: "blockContent",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      description: "e.g. '6 weeks', '108 days'",
    }),
    defineField({
      name: "cta",
      title: "Primary CTA",
      type: "cta",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tagline", media: "heroImage" },
  },
});
