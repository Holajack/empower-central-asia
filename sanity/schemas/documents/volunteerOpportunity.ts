import { defineField, defineType } from "sanity";

export default defineType({
  name: "volunteerOpportunity",
  title: "Volunteer Opportunity",
  type: "document",
  description:
    "A volunteer role BBB recruits for. Each role has its own /volunteer-opportunities/<slug> page. Edit titles, summaries, commitments, requirements, and CTAs without touching code.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "details", title: "Details" },
    { name: "media", title: "Media" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Role Title (English)",
      type: "string",
      group: "english",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "titleRu",
      title: "Role Title (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "slug",
      title: "URL Slug",
      type: "slug",
      group: "details",
      options: { source: "title", maxLength: 96 },
      validation: (R) => R.required(),
      description: "Used in /volunteer-opportunities/<slug>.",
    }),
    defineField({
      name: "tagline",
      title: "Tagline (English)",
      type: "string",
      group: "english",
      description: "One-line teaser shown under the role title.",
    }),
    defineField({
      name: "taglineRu",
      title: "Tagline (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "summary",
      title: "Short Summary (English)",
      type: "text",
      group: "english",
      rows: 3,
      description: "1-2 paragraphs. Shown in the hero section + as meta description.",
    }),
    defineField({
      name: "summaryRu",
      title: "Short Summary (Русский)",
      type: "text",
      group: "russian",
      rows: 3,
    }),
    defineField({
      name: "description",
      title: "Long Description (English)",
      type: "blockContent",
      group: "english",
      description:
        "Full role description with sections (responsibilities, impact, etc.). Currently informational; deeper wiring is a future phase.",
    }),
    defineField({
      name: "descriptionRu",
      title: "Long Description (Русский)",
      type: "blockContent",
      group: "russian",
    }),
    defineField({
      name: "commitment",
      title: "Time Commitment (English)",
      type: "string",
      group: "details",
      description: "e.g. '2-4 hours / week', '5-10 hours / month'.",
    }),
    defineField({
      name: "commitmentRu",
      title: "Time Commitment (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "requirements",
      title: "Requirements (English)",
      type: "array",
      group: "english",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "requirementsRu",
      title: "Requirements (Русский)",
      type: "array",
      group: "russian",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "applyUrl",
      title: "Apply URL",
      type: "string",
      group: "details",
      description: "Where the 'Apply' button links to. Defaults to /volunteer-application.",
      initialValue: "/volunteer-application",
    }),
    defineField({
      name: "image",
      title: "Hero Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [{ name: "alt", type: "string", title: "Alt text" }],
    }),
    defineField({
      name: "imageUrl",
      title: "Hero Image URL (fallback)",
      type: "string",
      group: "media",
      description:
        "Direct URL (Unsplash, etc.). Used when 'Hero Image' isn't uploaded.",
    }),
    defineField({
      name: "icon",
      title: "Icon (lucide name)",
      type: "string",
      group: "details",
      description:
        "Lucide icon name (e.g. Users, BookOpen, Megaphone). Defaults to Users if unset.",
      initialValue: "Users",
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
    select: { title: "title", subtitle: "tagline", media: "image", active: "active" },
    prepare({ title, subtitle, media, active }) {
      return {
        title: active === false ? `[HIDDEN] ${title}` : title,
        subtitle,
        media,
      };
    },
  },
});
