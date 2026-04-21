import { defineField, defineType } from "sanity";

export default defineType({
  name: "seoFields",
  title: "SEO",
  type: "object",
  fields: [
    defineField({
      name: "metaTitle",
      title: "Meta Title",
      type: "string",
      description: "Appears in browser tab + Google results. Keep under 60 chars.",
      validation: (Rule) =>
        Rule.max(60).warning("Over 60 chars — Google will truncate"),
    }),
    defineField({
      name: "metaDescription",
      title: "Meta Description",
      type: "text",
      rows: 3,
      description: "Shown in Google results. Aim for 150-160 chars.",
      validation: (Rule) =>
        Rule.max(160).warning("Over 160 chars — Google will truncate"),
    }),
    defineField({
      name: "ogImage",
      title: "Social Share Image (Open Graph)",
      type: "image",
      description: "1200×630px recommended for Facebook, LinkedIn, Twitter.",
      options: { hotspot: true },
    }),
    defineField({
      name: "noIndex",
      title: "Hide from Search Engines",
      type: "boolean",
      description: "Tick to add <meta name='robots' content='noindex'>.",
      initialValue: false,
    }),
  ],
  options: { collapsible: true, collapsed: true },
});
