import { defineField, defineType } from "sanity";

export default defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  description:
    "Global settings — logo, contact info, socials, default CTA + SEO. Only ONE of these exists. Edits show up across the site within ~60 seconds.",
  // Singleton enforcement handled in sanity.config.ts
  groups: [
    { name: "identity", title: "Identity & Logo", default: true },
    { name: "contact", title: "Contact" },
    { name: "social", title: "Social Media" },
    { name: "marketing", title: "Default CTA & SEO" },
    { name: "translations", title: "Russian Translations" },
  ],
  fields: [
    defineField({
      name: "siteName",
      title: "Site Name",
      type: "string",
      group: "identity",
      initialValue: "Businesses Beyond Borders",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline (English)",
      type: "string",
      group: "identity",
      description: "Shown under logo, in footer, etc.",
    }),
    defineField({
      name: "taglineRu",
      title: "Tagline (Русский)",
      type: "string",
      group: "translations",
      description: "Shown when site is in Central Asia / Russian mode.",
    }),
    defineField({
      name: "logo",
      title: "Logo (color)",
      type: "image",
      group: "identity",
      options: { hotspot: false },
      fields: [
        { name: "alt", type: "string", title: "Alt text", validation: (R) => R.required() },
      ],
    }),
    defineField({
      name: "logoMono",
      title: "Logo (monochrome / for dark backgrounds)",
      type: "image",
      group: "identity",
      options: { hotspot: false },
      fields: [
        { name: "alt", type: "string", title: "Alt text" },
      ],
    }),
    defineField({
      name: "contactEmail",
      title: "Primary Contact Email",
      type: "string",
      group: "contact",
      initialValue: "donations@businessesbeyondborders.com",
      validation: (Rule) => Rule.required().email(),
    }),
    defineField({
      name: "contactPhone",
      title: "Primary Phone",
      type: "string",
      group: "contact",
      initialValue: "(386) 517-1527",
    }),
    defineField({
      name: "address",
      title: "Mailing Address (English)",
      type: "text",
      group: "contact",
      rows: 3,
      initialValue: "2570 Jasmine Rd.\nPort Orange, FL 32128\nUnited States",
      description: "Multi-line. Each line break renders as a new line on the contact page.",
    }),
    defineField({
      name: "addressRu",
      title: "Mailing Address (Русский)",
      type: "text",
      group: "translations",
      rows: 3,
      description: "Optional Russian translation of the mailing address.",
    }),
    defineField({
      name: "social",
      title: "Social Media Links",
      type: "object",
      group: "social",
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
      title: "Global Primary CTA (English)",
      type: "cta",
      group: "marketing",
      description: "Default CTA for hero sections that don't set their own.",
    }),
    defineField({
      name: "primaryCTALabelRu",
      title: "Primary CTA Label (Русский)",
      type: "string",
      group: "translations",
      description: "Optional Russian label for the global primary CTA.",
    }),
    defineField({
      name: "defaultSeo",
      title: "Default SEO (English)",
      type: "seoFields",
      group: "marketing",
      description:
        "Used as the fallback page meta-title and OG image whenever a page doesn't define its own.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site Settings" }),
  },
});
