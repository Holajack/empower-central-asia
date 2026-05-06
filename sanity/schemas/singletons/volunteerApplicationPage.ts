import { defineField, defineType } from "sanity";

/**
 * The /volunteer-application page — all editable copy *except* the form
 * itself. The form heading + subheading and per-field labels still live
 * on `formSettings` (Agent V wired those). This singleton owns the
 * surrounding landing copy: hero badge, "what to expect" intro, the
 * three key-expectation cards, the available volunteer roles list, the
 * how-it-works steps, benefits, FAQs, and the bottom CTA.
 *
 * Singleton — do not duplicate.
 */
export default defineType({
  name: "volunteerApplicationPage",
  title: "Volunteer Application Page",
  type: "document",
  description:
    "All editable landing copy on /volunteer-application: hero, what-to-expect intro, key-expectation cards, volunteer roles, how-it-works steps, benefits, FAQ accordions, bottom CTA. Form labels/placeholders live on Form Copy.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "hero", title: "Hero" },
    { name: "sections", title: "Sections" },
    { name: "faqs", title: "FAQs" },
    { name: "bottomCta", title: "Bottom CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Hero ──────────────────────────────────────────────────────────────────
    defineField({
      name: "heroBadge",
      title: "Hero Badge (English)",
      type: "string",
      group: ["english", "hero"],
      description: "Small pill above the hero heading (e.g. 'Volunteer Opportunities').",
      initialValue: "Volunteer Opportunities",
    }),
    defineField({
      name: "heroBadgeRu",
      title: "Hero Badge (Русский)",
      type: "string",
      group: ["russian", "hero"],
      initialValue: "Возможности для волонтёров",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading (English)",
      type: "string",
      group: ["english", "hero"],
      description:
        "OPTIONAL override. If empty, the form heading from Form Copy → Volunteer Form is used.",
    }),
    defineField({
      name: "heroHeadingRu",
      title: "Hero Heading (Русский)",
      type: "string",
      group: ["russian", "hero"],
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading (English)",
      type: "text",
      rows: 3,
      group: ["english", "hero"],
      description:
        "OPTIONAL override. If empty, the form subheading from Form Copy → Volunteer Form is used.",
    }),
    defineField({
      name: "heroSubheadingRu",
      title: "Hero Subheading (Русский)",
      type: "text",
      rows: 3,
      group: ["russian", "hero"],
    }),
    defineField({
      name: "heroIntroParagraphs",
      title: "Hero Intro Paragraphs (English)",
      type: "array",
      group: ["english", "hero"],
      of: [{ type: "text", rows: 4 }],
      description:
        "Optional opening paragraphs shown immediately under the hero (rendered as separate <p> tags).",
    }),
    defineField({
      name: "heroIntroParagraphsRu",
      title: "Hero Intro Paragraphs (Русский)",
      type: "array",
      group: ["russian", "hero"],
      of: [{ type: "text", rows: 4 }],
    }),

    // ── "What we look for" — volunteer roles ─────────────────────────────────
    defineField({
      name: "whatWeLookForBadge",
      title: "Section Badge (English)",
      type: "string",
      group: ["english", "sections"],
      description: "Small uppercase label above the section heading (e.g. 'WHAT TO EXPECT').",
      initialValue: "WHAT TO EXPECT",
    }),
    defineField({
      name: "whatWeLookForBadgeRu",
      title: "Section Badge (Русский)",
      type: "string",
      group: ["russian", "sections"],
      initialValue: "ЧЕГО ОЖИДАТЬ",
    }),
    defineField({
      name: "whatWeLookForHeading",
      title: "What We Look For — Heading (English)",
      type: "string",
      group: ["english", "sections"],
      initialValue: "What Volunteering Actually Looks Like",
    }),
    defineField({
      name: "whatWeLookForHeadingRu",
      title: "What We Look For — Heading (Русский)",
      type: "string",
      group: ["russian", "sections"],
      initialValue: "Как выглядит волонтёрство на практике",
    }),
    defineField({
      name: "whatWeLookForIntro",
      title: "What We Look For — Intro Paragraphs (English)",
      type: "array",
      group: ["english", "sections"],
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "whatWeLookForIntroRu",
      title: "What We Look For — Intro Paragraphs (Русский)",
      type: "array",
      group: ["russian", "sections"],
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "whatWeLookFor",
      title: "Volunteer Roles",
      type: "array",
      group: "sections",
      description:
        "Each row is one available volunteer role. Use the lucide icon name for the badge.",
      of: [
        {
          type: "object",
          name: "volunteerRole",
          fields: [
            { name: "label", type: "string", title: "Role Title (English)" },
            { name: "labelRu", type: "string", title: "Role Title (Русский)" },
            {
              name: "description",
              type: "text",
              rows: 4,
              title: "Description (English)",
            },
            {
              name: "descriptionRu",
              type: "text",
              rows: 4,
              title: "Description (Русский)",
            },
            {
              name: "timeCommitment",
              type: "string",
              title: "Time Commitment (English)",
              description: "Shown next to the title (e.g. '2-4 hrs/week').",
            },
            {
              name: "timeCommitmentRu",
              type: "string",
              title: "Time Commitment (Русский)",
            },
            {
              name: "icon",
              type: "string",
              title: "Icon (lucide name)",
              description:
                "Lucide icon name (e.g. GraduationCap, Users, Wifi, Heart).",
              initialValue: "GraduationCap",
            },
          ],
          preview: {
            select: { title: "label", subtitle: "description" },
          },
        },
      ],
    }),

    // ── How it works ──────────────────────────────────────────────────────────
    defineField({
      name: "howItWorksHeading",
      title: "How It Works — Heading (English)",
      type: "string",
      group: ["english", "sections"],
      initialValue: "Available Volunteer Roles",
    }),
    defineField({
      name: "howItWorksHeadingRu",
      title: "How It Works — Heading (Русский)",
      type: "string",
      group: ["russian", "sections"],
      initialValue: "Доступные роли волонтёров",
    }),
    defineField({
      name: "howItWorksIntro",
      title: "How It Works — Intro (English)",
      type: "text",
      rows: 3,
      group: ["english", "sections"],
    }),
    defineField({
      name: "howItWorksIntroRu",
      title: "How It Works — Intro (Русский)",
      type: "text",
      rows: 3,
      group: ["russian", "sections"],
    }),
    defineField({
      name: "howItWorksSteps",
      title: "How It Works — Steps",
      type: "array",
      group: "sections",
      description:
        "Numbered onboarding steps (e.g. 'Apply', 'Onboarding call', 'Get matched').",
      of: [
        {
          type: "object",
          name: "howItWorksStep",
          fields: [
            { name: "stepNumber", type: "number", title: "Step Number" },
            { name: "title", type: "string", title: "Title (English)" },
            { name: "titleRu", type: "string", title: "Title (Русский)" },
            {
              name: "description",
              type: "text",
              rows: 3,
              title: "Description (English)",
            },
            {
              name: "descriptionRu",
              type: "text",
              rows: 3,
              title: "Description (Русский)",
            },
            {
              name: "icon",
              type: "string",
              title: "Icon (lucide name)",
              initialValue: "CheckCircle2",
            },
          ],
          preview: {
            select: { number: "stepNumber", title: "title" },
            prepare({ number, title }) {
              return {
                title: `${number ? `${number}. ` : ""}${title ?? ""}`,
              };
            },
          },
        },
      ],
    }),

    // ── Benefits / key expectations ───────────────────────────────────────────
    defineField({
      name: "benefitsHeading",
      title: "Benefits — Heading (English)",
      type: "string",
      group: ["english", "sections"],
      description:
        "Heading above the three 'what to expect' cards (Time Commitment, Fully Remote, Training Provided).",
    }),
    defineField({
      name: "benefitsHeadingRu",
      title: "Benefits — Heading (Русский)",
      type: "string",
      group: ["russian", "sections"],
    }),
    defineField({
      name: "benefits",
      title: "Key Expectation / Benefit Cards",
      type: "array",
      group: "sections",
      description:
        "Cards shown above the volunteer roles. Currently rendered as Time Commitment, Fully Remote, Training Provided.",
      of: [
        {
          type: "object",
          name: "volunteerBenefit",
          fields: [
            { name: "label", type: "string", title: "Title (English)" },
            { name: "labelRu", type: "string", title: "Title (Русский)" },
            {
              name: "description",
              type: "text",
              rows: 3,
              title: "Description (English)",
            },
            {
              name: "descriptionRu",
              type: "text",
              rows: 3,
              title: "Description (Русский)",
            },
            {
              name: "icon",
              type: "string",
              title: "Icon (lucide name)",
              description:
                "Lucide icon name (e.g. Clock, Wifi, GraduationCap).",
              initialValue: "Clock",
            },
          ],
          preview: {
            select: { title: "label", subtitle: "description" },
          },
        },
      ],
    }),

    // ── FAQs ──────────────────────────────────────────────────────────────────
    defineField({
      name: "faqsHeading",
      title: "FAQ Section Heading (English)",
      type: "string",
      group: ["english", "faqs"],
      initialValue: "Common Questions",
    }),
    defineField({
      name: "faqsHeadingRu",
      title: "FAQ Section Heading (Русский)",
      type: "string",
      group: ["russian", "faqs"],
      initialValue: "Частые вопросы",
    }),
    defineField({
      name: "faqs",
      title: "FAQ Items",
      type: "array",
      group: "faqs",
      of: [
        {
          type: "object",
          name: "volunteerFaq",
          fields: [
            { name: "question", type: "string", title: "Question (English)" },
            {
              name: "questionRu",
              type: "string",
              title: "Question (Русский)",
            },
            {
              name: "answer",
              type: "text",
              rows: 5,
              title: "Answer (English)",
            },
            {
              name: "answerRu",
              type: "text",
              rows: 5,
              title: "Answer (Русский)",
            },
          ],
          preview: { select: { title: "question", subtitle: "answer" } },
        },
      ],
    }),

    // ── Bottom CTA ────────────────────────────────────────────────────────────
    defineField({
      name: "bottomCtaHeading",
      title: "Bottom CTA Heading (English)",
      type: "string",
      group: ["english", "bottomCta"],
    }),
    defineField({
      name: "bottomCtaHeadingRu",
      title: "Bottom CTA Heading (Русский)",
      type: "string",
      group: ["russian", "bottomCta"],
    }),
    defineField({
      name: "bottomCtaSubheading",
      title: "Bottom CTA Subheading (English)",
      type: "text",
      rows: 3,
      group: ["english", "bottomCta"],
    }),
    defineField({
      name: "bottomCtaSubheadingRu",
      title: "Bottom CTA Subheading (Русский)",
      type: "text",
      rows: 3,
      group: ["russian", "bottomCta"],
    }),
    defineField({
      name: "bottomCtaPrimaryLabel",
      title: "Primary Button Label (English)",
      type: "string",
      group: ["english", "bottomCta"],
    }),
    defineField({
      name: "bottomCtaPrimaryLabelRu",
      title: "Primary Button Label (Русский)",
      type: "string",
      group: ["russian", "bottomCta"],
    }),
    defineField({
      name: "bottomCtaPrimaryUrl",
      title: "Primary Button URL",
      type: "string",
      group: "bottomCta",
      description: "Internal path (/contact) or full URL.",
    }),
    defineField({
      name: "bottomCtaSecondaryLabel",
      title: "Secondary Button Label (English)",
      type: "string",
      group: ["english", "bottomCta"],
    }),
    defineField({
      name: "bottomCtaSecondaryLabelRu",
      title: "Secondary Button Label (Русский)",
      type: "string",
      group: ["russian", "bottomCta"],
    }),
    defineField({
      name: "bottomCtaSecondaryUrl",
      title: "Secondary Button URL",
      type: "string",
      group: "bottomCta",
    }),

    // ── SEO ───────────────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Volunteer Application Page" }),
  },
});
