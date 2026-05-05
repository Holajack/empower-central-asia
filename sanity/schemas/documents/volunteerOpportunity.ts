import { defineArrayMember, defineField, defineType } from "sanity";

/**
 * Volunteer Opportunity — one document per role (administrative-support,
 * advocacy-outreach, business-training, community-organizer,
 * leadership-mentor). Drives the /volunteer-opportunities/<slug> detail
 * pages.
 *
 * Detail-page sections (responsibilities, commitment stats, requirements,
 * process timeline, benefits, closing CTA) are arrays of inline objects so
 * editors can reorder/add/remove rows without touching code. Each visible
 * string has an English + Russian variant.
 */
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
    // ─── Detail-page sections ─────────────────────────────────────────────
    // Responsibilities — "What You'll Do" cards
    defineField({
      name: "responsibilitiesHeading",
      title: "Responsibilities Heading (English)",
      type: "string",
      group: "details",
      description:
        "Heading shown above the responsibilities/role-card grid (e.g. 'What You'll Do as a Leadership Mentor').",
    }),
    defineField({
      name: "responsibilitiesHeadingRu",
      title: "Responsibilities Heading (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      group: "details",
      description:
        "Cards describing role responsibilities. Each card has a label, optional description, and is rendered with a checkmark or icon.",
      of: [
        defineArrayMember({
          type: "object",
          name: "responsibilityItem",
          fields: [
            defineField({
              name: "label",
              title: "Label (English)",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "labelRu",
              title: "Label (Русский)",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description (English)",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "descriptionRu",
              title: "Description (Русский)",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "description" },
          },
        }),
      ],
    }),
    // Commitment stats — hero stats grid
    defineField({
      name: "commitmentHeading",
      title: "Commitment Heading (English)",
      type: "string",
      group: "details",
      description:
        "Optional heading above the small stats grid (defaults: 'Time Commitment'). Often left blank — the stats grid sits under the hero with no heading.",
    }),
    defineField({
      name: "commitmentHeadingRu",
      title: "Commitment Heading (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "commitmentDetails",
      title: "Commitment Stats",
      type: "array",
      group: "details",
      description:
        "Small stat tiles shown under the hero (hours/week, location, schedule, etc.). Order matters — first 4 are typically used.",
      of: [
        defineArrayMember({
          type: "object",
          name: "commitmentDetail",
          fields: [
            defineField({
              name: "label",
              title: "Label (English)",
              type: "string",
              description: "e.g. 'Per Week', 'Schedule'",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "labelRu",
              title: "Label (Русский)",
              type: "string",
            }),
            defineField({
              name: "value",
              title: "Value (English)",
              type: "string",
              description: "e.g. '3-5 hrs', 'Remote', 'Flexible'",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "valueRu",
              title: "Value (Русский)",
              type: "string",
            }),
            defineField({
              name: "icon",
              title: "Icon (lucide name)",
              type: "string",
              description:
                "Lucide icon name (e.g. Clock, MapPin, Calendar, Sparkles). Optional.",
            }),
          ],
          preview: {
            select: { title: "value", subtitle: "label" },
          },
        }),
      ],
    }),
    defineField({
      name: "requirementsHeading",
      title: "Requirements Heading (English)",
      type: "string",
      group: "details",
      description:
        "Heading above the requirements/skills bullet list (e.g. 'Requirements', 'Essential Skills').",
    }),
    defineField({
      name: "requirementsHeadingRu",
      title: "Requirements Heading (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "requirements",
      title: "Requirements",
      type: "array",
      group: "details",
      description:
        "Bullet list of qualifications, skills, or qualities needed for this role.",
      of: [
        defineArrayMember({
          type: "object",
          name: "requirementItem",
          fields: [
            defineField({
              name: "label",
              title: "Requirement (English)",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "labelRu",
              title: "Requirement (Русский)",
              type: "string",
            }),
          ],
          preview: { select: { title: "label" } },
        }),
      ],
    }),
    // Legacy field — the original schema had `requirementsRu` as `string[]`.
    // Kept for backwards compatibility with any seeded docs that still use
    // it; new editing should use the structured `requirements` array above.
    defineField({
      name: "requirementsRu",
      title: "Requirements (Русский) — legacy",
      type: "array",
      group: "russian",
      hidden: true,
      of: [{ type: "string" }],
      description:
        "Legacy field. Use the new bilingual 'Requirements' array above.",
    }),
    // Process steps — application/program phases
    defineField({
      name: "processHeading",
      title: "Process Heading (English)",
      type: "string",
      group: "details",
      description:
        "Heading above the process timeline (e.g. 'Application Process', '12-Month Mentorship Program Structure').",
    }),
    defineField({
      name: "processHeadingRu",
      title: "Process Heading (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "processSteps",
      title: "Process Steps",
      type: "array",
      group: "details",
      description:
        "Numbered phases shown as a timeline (e.g. 'Phase 1: Foundation', 'Months 1-3', 'Step 1: Apply').",
      of: [
        defineArrayMember({
          type: "object",
          name: "processStep",
          fields: [
            defineField({
              name: "stepNumber",
              title: "Step Number",
              type: "number",
              validation: (R) => R.required().min(1).max(20),
            }),
            defineField({
              name: "label",
              title: "Step Label (English)",
              type: "string",
              description:
                "Short label / phase name (e.g. 'Phase 1: Foundation Building').",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "labelRu",
              title: "Step Label (Русский)",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description (English)",
              type: "text",
              rows: 3,
              validation: (R) => R.required(),
            }),
            defineField({
              name: "descriptionRu",
              title: "Description (Русский)",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: {
              stepNumber: "stepNumber",
              title: "label",
              subtitle: "description",
            },
            prepare({ stepNumber, title, subtitle }) {
              return {
                title: `${stepNumber ?? "?"}. ${title ?? "(untitled)"}`,
                subtitle,
              };
            },
          },
        }),
      ],
    }),
    // Benefits — what volunteers get out of it
    defineField({
      name: "benefitsHeading",
      title: "Benefits Heading (English)",
      type: "string",
      group: "details",
      description:
        "Heading above the benefits list (e.g. \"What You'll Gain\", 'Why Our Mentors Love What They Do').",
    }),
    defineField({
      name: "benefitsHeadingRu",
      title: "Benefits Heading (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "benefits",
      title: "Benefits",
      type: "array",
      group: "details",
      description:
        "List of professional/personal benefits volunteers get from the role.",
      of: [
        defineArrayMember({
          type: "object",
          name: "benefitItem",
          fields: [
            defineField({
              name: "label",
              title: "Label (English)",
              type: "string",
              validation: (R) => R.required(),
            }),
            defineField({
              name: "labelRu",
              title: "Label (Русский)",
              type: "string",
            }),
            defineField({
              name: "description",
              title: "Description (English)",
              type: "text",
              rows: 3,
            }),
            defineField({
              name: "descriptionRu",
              title: "Description (Русский)",
              type: "text",
              rows: 3,
            }),
          ],
          preview: {
            select: { title: "label", subtitle: "description" },
          },
        }),
      ],
    }),
    // Closing CTA — final "Ready to ___?" block above the form
    defineField({
      name: "closingCtaHeading",
      title: "Closing CTA Heading (English)",
      type: "string",
      group: "details",
      description:
        "Heading on the final CTA card / form intro (e.g. 'Ready to Become a Leadership Mentor?').",
    }),
    defineField({
      name: "closingCtaHeadingRu",
      title: "Closing CTA Heading (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "closingCtaSubheading",
      title: "Closing CTA Subheading (English)",
      type: "text",
      group: "details",
      rows: 3,
      description: "Paragraph under the closing CTA heading.",
    }),
    defineField({
      name: "closingCtaSubheadingRu",
      title: "Closing CTA Subheading (Русский)",
      type: "text",
      group: "russian",
      rows: 3,
    }),
    defineField({
      name: "closingCtaButtonLabel",
      title: "Closing CTA Button Label (English)",
      type: "string",
      group: "details",
      description: "Text on the closing button (e.g. 'Apply Now').",
    }),
    defineField({
      name: "closingCtaButtonLabelRu",
      title: "Closing CTA Button Label (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "closingCtaUrl",
      title: "Closing CTA URL",
      type: "string",
      group: "details",
      description:
        "Where the closing button links to. Defaults to '#apply-now' (jumps to the form).",
    }),
    // ─── End detail-page sections ─────────────────────────────────────────
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
