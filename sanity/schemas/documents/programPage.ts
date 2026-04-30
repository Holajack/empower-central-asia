import { defineField, defineType } from "sanity";

export default defineType({
  name: "programPage",
  title: "Program Page",
  type: "document",
  description:
    "The four programs: Financial Literacy, Business Creation, Leadership Development, Community Collaboration. Edit titles, taglines, hero copy, CTAs, and SEO.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "media", title: "Media" },
    { name: "marketing", title: "CTAs & SEO" },
    { name: "deepSections", title: "Curriculum / Stats / Badges" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Program Name (English)",
      type: "string",
      group: "english",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "titleRu",
      title: "Program Name (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "english",
      options: { source: "title" },
      description:
        "Used in the page URL: /programs/<slug>. Keep this stable — changing breaks links.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline (English)",
      type: "string",
      group: "english",
      description: "One short line shown under the program title (hero subheading).",
    }),
    defineField({
      name: "taglineRu",
      title: "Tagline (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description (English)",
      type: "text",
      group: "english",
      rows: 4,
      description:
        "Longer descriptive paragraph shown in the hero section, beneath the tagline.",
    }),
    defineField({
      name: "heroDescriptionRu",
      title: "Hero Description (Русский)",
      type: "text",
      group: "russian",
      rows: 4,
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt text" },
      ],
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      group: "english",
      description: "e.g. '6 weeks', '108 days', '12 weeks'",
    }),
    defineField({
      name: "durationRu",
      title: "Duration (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "description",
      title: "Long Description (Portable Text)",
      type: "blockContent",
      group: "english",
      description:
        "Full-page descriptive content. Currently informational only — will be wired into program pages in a follow-up phase.",
    }),
    defineField({
      name: "weeks",
      title: "Curriculum Weeks / Modules",
      type: "array",
      group: "deepSections",
      description:
        "Rows in the program-page curriculum accordion ('What You'll Learn'). For Business Creation these are 4 modules; for Financial Literacy / Leadership Development they're individual weeks. Leave empty to fall through to the hardcoded list.",
      of: [{ type: "weekOverview" }],
    }),
    defineField({
      name: "stats",
      title: "Hero Stats",
      type: "array",
      group: "deepSections",
      description:
        "Stat cards shown in the program-page hero (e.g. '90% Launch Success Rate'). Leave empty to fall through to the hardcoded values.",
      of: [{ type: "programStat" }],
    }),
    defineField({
      name: "trustBadges",
      title: "Hero Trust Badges",
      type: "array",
      group: "deepSections",
      description:
        "Small badges under the hero ('100% Free', 'Self-Paced', etc.). Each has a lucide icon name + label. Leave empty to fall through to the hardcoded list.",
      of: [{ type: "trustBadge" }],
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary CTA Label (English)",
      type: "string",
      group: "marketing",
      description: "e.g. 'Start Course', 'Get Started Free'.",
    }),
    defineField({
      name: "primaryCtaLabelRu",
      title: "Primary CTA Label (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "primaryCtaUrl",
      title: "Primary CTA URL",
      type: "string",
      group: "marketing",
      description: "e.g. /course/financial-literacy",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary CTA Label (English)",
      type: "string",
      group: "marketing",
    }),
    defineField({
      name: "secondaryCtaLabelRu",
      title: "Secondary CTA Label (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "secondaryCtaUrl",
      title: "Secondary CTA URL",
      type: "string",
      group: "marketing",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
      group: "marketing",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tagline", media: "heroImage" },
  },
});
