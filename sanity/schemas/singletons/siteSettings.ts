import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  description: "Global settings — logo, contact info, socials. Only ONE of these exists.",
  // Singleton enforcement handled in sanity.config.ts
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      initialValue: "Businesses Beyond Borders",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
      description: "Shown under logo, in footer, etc.",
    }),
    defineField({
      name: "logo",
      title: "Logo (color)",
      type: "image",
      options: { hotspot: false },
      fields: [
        { name: "alt", type: "string", title: "Alt text", validation: (R) => R.required() },
      ],
    }),
    defineField({
      name: "logoMono",
      title: "Logo (monochrome / for dark backgrounds)",
      type: "image",
      options: { hotspot: false },
      fields: [
        { name: "alt", type: "string", title: "Alt text" },
      ],
    }),
    defineField({
      name: "contactEmail",
      title: "Primary Contact Email",
      type: "string",
      initialValue: "donations@businessesbeyondborders.com",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "contactPhone",
      title: "Primary Phone",
      type: "string",
      initialValue: "(386) 517-1527",
    }),
    defineField({
      name: "address",
      title: "Mailing Address",
      type: "text",
      rows: 3,
      initialValue: "Port Orange, Florida",
    }),
    defineField({
      name: "social",
      title: "Social Media Links",
      type: "object",
      fields: [
        { name: "facebook", type: "url", title: "Facebook" },
        { name: "instagram", type: "url", title: "Instagram" },
        { name: "linkedin", type: "url", title: "LinkedIn" },
        { name: "twitter", type: "url", title: "Twitter / X" },
        { name: "youtube", type: "url", title: "YouTube" },
      ],
    }),
    defineField({
      name: "primaryCTA",
      title: "Global Primary CTA",
      type: "cta",
      description: "Default CTA for hero sections that don't set their own.",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO",
      type: "seoFields",
      description: "Used as fallback when a page doesn't have its own SEO set.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
