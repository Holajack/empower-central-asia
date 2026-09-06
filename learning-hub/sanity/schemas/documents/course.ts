import { defineField, defineType } from "sanity";

export default defineType({
  name: "course",
  title: "Course",
  type: "document",
  description:
    "Top-level course definition (Financial Literacy, Business Creation, Leadership Development). Weeks are separate courseWeek docs that reference back to a course. The fields below also cover the public marketing landing page sections (hero, what-you'll-learn, prerequisites, instructor, outcomes, related programs, bottom CTA).",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "details", title: "Details" },
    { name: "hero", title: "Landing — Hero" },
    { name: "instructor", title: "Landing — Instructor" },
    { name: "outcomes", title: "Landing — Outcomes" },
    { name: "marketing", title: "Landing — CTAs & Related" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Course Title (English)",
      type: "string",
      group: "english",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "titleRu",
      title: "Course Title (Русский)",
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
    }),
    defineField({
      name: "tagline",
      title: "Short Tagline (English)",
      type: "string",
      group: "english",
    }),
    defineField({
      name: "taglineRu",
      title: "Short Tagline (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "description",
      title: "Description (English)",
      type: "text",
      rows: 4,
      group: "english",
    }),
    defineField({
      name: "descriptionRu",
      title: "Description (Русский)",
      type: "text",
      rows: 4,
      group: "russian",
    }),
    defineField({
      name: "duration",
      title: "Duration",
      type: "string",
      group: "details",
      description: "e.g. '12 weeks', '6 weeks (self-paced)'",
    }),
    defineField({
      name: "level",
      title: "Level",
      type: "string",
      group: "details",
      options: {
        list: [
          { title: "Beginner", value: "beginner" },
          { title: "Intermediate", value: "intermediate" },
          { title: "Advanced", value: "advanced" },
          { title: "All levels", value: "all" },
        ],
      },
      initialValue: "beginner",
    }),
    defineField({
      name: "weekCount",
      title: "Total Weeks",
      type: "number",
      group: "details",
    }),
    defineField({
      name: "active",
      title: "Active?",
      type: "boolean",
      group: "details",
      initialValue: true,
    }),

    // ─── Hero (landing page) ──────────────────────────────────────────────────
    defineField({
      name: "heroBadge",
      title: "Hero Badge (English)",
      type: "string",
      group: "hero",
      description: "Small pill above the H1 — e.g. 'Free Online Course'.",
    }),
    defineField({
      name: "heroBadgeRu",
      title: "Hero Badge (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "heroDescription",
      title: "Hero Description (English)",
      type: "text",
      rows: 4,
      group: "hero",
      description:
        "Longer than the tagline — the paragraph under the H1 on the landing page.",
    }),
    defineField({
      name: "heroDescriptionRu",
      title: "Hero Description (Русский)",
      type: "text",
      rows: 4,
      group: "russian",
    }),

    // ─── What You'll Learn ────────────────────────────────────────────────────
    defineField({
      name: "whatYoullLearnHeading",
      title: "What You'll Learn — Heading (English)",
      type: "string",
      group: "outcomes",
      description: "Heading above the list of skills/topics learners will gain.",
    }),
    defineField({
      name: "whatYoullLearnHeadingRu",
      title: "What You'll Learn — Heading (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "whatYoullLearn",
      title: "What You'll Learn (items)",
      type: "array",
      group: "outcomes",
      of: [
        {
          type: "object",
          name: "whatYoullLearnItem",
          fields: [
            { name: "text", title: "Text (English)", type: "string" },
            { name: "textRu", title: "Text (Русский)", type: "string" },
            {
              name: "icon",
              title: "Icon (lucide name, optional)",
              type: "string",
              description:
                "Optional lucide icon name (Target, Lightbulb, etc).",
            },
          ],
          preview: {
            select: { title: "text", subtitle: "icon" },
          },
        },
      ],
    }),

    // ─── Prerequisites ────────────────────────────────────────────────────────
    defineField({
      name: "prerequisitesHeading",
      title: "Prerequisites — Heading (English)",
      type: "string",
      group: "details",
    }),
    defineField({
      name: "prerequisitesHeadingRu",
      title: "Prerequisites — Heading (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "prerequisites",
      title: "Prerequisites (English)",
      type: "text",
      rows: 3,
      group: "details",
    }),
    defineField({
      name: "prerequisitesRu",
      title: "Prerequisites (Русский)",
      type: "text",
      rows: 3,
      group: "russian",
    }),

    // ─── Instructor ───────────────────────────────────────────────────────────
    defineField({
      name: "instructorHeading",
      title: "Instructor — Heading (English)",
      type: "string",
      group: "instructor",
    }),
    defineField({
      name: "instructorHeadingRu",
      title: "Instructor — Heading (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "instructorName",
      title: "Instructor Name (English)",
      type: "string",
      group: "instructor",
    }),
    defineField({
      name: "instructorNameRu",
      title: "Instructor Name (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "instructorRole",
      title: "Instructor Role/Title (English)",
      type: "string",
      group: "instructor",
    }),
    defineField({
      name: "instructorRoleRu",
      title: "Instructor Role/Title (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "instructorBio",
      title: "Instructor Bio (English)",
      type: "text",
      rows: 4,
      group: "instructor",
    }),
    defineField({
      name: "instructorBioRu",
      title: "Instructor Bio (Русский)",
      type: "text",
      rows: 4,
      group: "russian",
    }),
    defineField({
      name: "instructorImage",
      title: "Instructor Image",
      type: "image",
      group: "instructor",
      options: { hotspot: true },
      fields: [{ name: "alt", title: "Alt text", type: "string" }],
    }),

    // ─── Outcomes ─────────────────────────────────────────────────────────────
    defineField({
      name: "outcomesHeading",
      title: "Outcomes — Heading (English)",
      type: "string",
      group: "outcomes",
      description:
        "Heading above the 'What you'll build / What you'll develop' grid.",
    }),
    defineField({
      name: "outcomesHeadingRu",
      title: "Outcomes — Heading (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "outcomes",
      title: "Outcomes (items)",
      type: "array",
      group: "outcomes",
      of: [
        {
          type: "object",
          name: "outcomeItem",
          fields: [
            { name: "text", title: "Text (English)", type: "string" },
            { name: "textRu", title: "Text (Русский)", type: "string" },
            {
              name: "title",
              title: "Title (English, optional)",
              type: "string",
            },
            {
              name: "titleRu",
              title: "Title (Русский, optional)",
              type: "string",
            },
            {
              name: "icon",
              title: "Icon (lucide name, optional)",
              type: "string",
            },
          ],
          preview: {
            select: { title: "title", subtitle: "text" },
            prepare({ title, subtitle }) {
              return { title: title || subtitle || "(outcome)", subtitle };
            },
          },
        },
      ],
    }),

    // ─── Related Programs ─────────────────────────────────────────────────────
    defineField({
      name: "relatedProgramsHeading",
      title: "Related Programs — Heading (English)",
      type: "string",
      group: "marketing",
    }),
    defineField({
      name: "relatedProgramsHeadingRu",
      title: "Related Programs — Heading (Русский)",
      type: "string",
      group: "russian",
    }),


    // ─── Bottom CTA ───────────────────────────────────────────────────────────
    defineField({
      name: "bottomCtaHeading",
      title: "Bottom CTA — Heading (English)",
      type: "string",
      group: "marketing",
    }),
    defineField({
      name: "bottomCtaHeadingRu",
      title: "Bottom CTA — Heading (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "bottomCtaSubheading",
      title: "Bottom CTA — Subheading (English)",
      type: "text",
      rows: 2,
      group: "marketing",
    }),
    defineField({
      name: "bottomCtaSubheadingRu",
      title: "Bottom CTA — Subheading (Русский)",
      type: "text",
      rows: 2,
      group: "russian",
    }),
    defineField({
      name: "bottomCtaPrimaryLabel",
      title: "Bottom CTA — Primary Label (English)",
      type: "string",
      group: "marketing",
    }),
    defineField({
      name: "bottomCtaPrimaryLabelRu",
      title: "Bottom CTA — Primary Label (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "bottomCtaPrimaryUrl",
      title: "Bottom CTA — Primary URL",
      type: "string",
      group: "marketing",
      description: "Optional override. Leave blank to use the default course/week URL.",
    }),
    defineField({
      name: "bottomCtaSecondaryLabel",
      title: "Bottom CTA — Secondary Label (English)",
      type: "string",
      group: "marketing",
    }),
    defineField({
      name: "bottomCtaSecondaryLabelRu",
      title: "Bottom CTA — Secondary Label (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "bottomCtaSecondaryUrl",
      title: "Bottom CTA — Secondary URL",
      type: "string",
      group: "marketing",
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "tagline" },
  },
});
