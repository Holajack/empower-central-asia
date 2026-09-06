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
    // ── Structured address pieces (used by JSON-LD schema markup for SEO) ──
    defineField({
      name: "addressLocality",
      title: "City",
      type: "string",
      group: "contact",
      initialValue: "Port Orange",
      description: "City name only — used in structured data (SEO).",
    }),
    defineField({
      name: "addressRegion",
      title: "State / Region",
      type: "string",
      group: "contact",
      initialValue: "FL",
      description: "Two-letter state code or full region name — used in structured data.",
    }),
    defineField({
      name: "addressZip",
      title: "ZIP / Postal Code",
      type: "string",
      group: "contact",
      initialValue: "32128",
    }),
    defineField({
      name: "addressCountry",
      title: "Country Code",
      type: "string",
      group: "contact",
      initialValue: "US",
      description: "Two-letter ISO country code (e.g. US, KZ, KG, UZ).",
    }),
    defineField({
      name: "mapEmbedUrl",
      title: "Google Maps Embed URL",
      type: "url",
      group: "contact",
      description:
        "Full Google Maps iframe `src` URL for the contact page map. To get one: maps.google.com → search address → Share → Embed a map → copy the long src=\"...\" value (NOT the short link). Leave blank to fall back to the default office map.",
      validation: (Rule) =>
        Rule.uri({ scheme: ["http", "https"], allowRelative: false }),
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
