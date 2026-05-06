import { defineField, defineType } from "sanity";

/**
 * The /partner-application page — all editable copy *except* the form
 * itself. The form heading + subheading and per-field labels still live
 * on `formSettings` (Agent V wired those). This singleton owns the
 * surrounding landing copy: hero badge, "what partnership means" intro,
 * partnership-principles cards, ways-to-partner cards, "what we ask"
 * (benefits) cards, FAQs, and the bottom CTA.
 *
 * Singleton — do not duplicate.
 */
export default defineType({
  name: "partnerApplicationPage",
  title: "Partner Application Page",
  type: "document",
  description:
    "All editable landing copy on /partner-application: hero, partnership-principles, ways-to-partner cards, what-we-ask, FAQ accordions, bottom CTA. Form labels/placeholders live on Form Copy.",
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
      description: "Small pill above the hero heading (e.g. 'Organizational Partnerships').",
      initialValue: "Organizational Partnerships",
    }),
    defineField({
      name: "heroBadgeRu",
      title: "Hero Badge (Русский)",
      type: "string",
      group: ["russian", "hero"],
      initialValue: "Организационное партнёрство",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading (English)",
      type: "string",
      group: ["english", "hero"],
      description:
        "OPTIONAL override. If empty, the form heading from Form Copy → Partner Form is used.",
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
        "OPTIONAL override. If empty, the form subheading from Form Copy → Partner Form is used.",
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

    // ── "Partnership principles" — what we look for ──────────────────────────
    defineField({
      name: "whatWeLookForBadge",
      title: "Section Badge (English)",
      type: "string",
      group: ["english", "sections"],
      description: "Small uppercase label above the section heading (e.g. 'BEFORE YOU APPLY').",
      initialValue: "BEFORE YOU APPLY",
    }),
    defineField({
      name: "whatWeLookForBadgeRu",
      title: "Section Badge (Русский)",
      type: "string",
      group: ["russian", "sections"],
      initialValue: "ПЕРЕД ПОДАЧЕЙ ЗАЯВКИ",
    }),
    defineField({
      name: "whatWeLookForHeading",
      title: "What We Look For — Heading (English)",
      type: "string",
      group: ["english", "sections"],
      initialValue: "What Partnership Actually Means",
    }),
    defineField({
      name: "whatWeLookForHeadingRu",
      title: "What We Look For — Heading (Русский)",
      type: "string",
      group: ["russian", "sections"],
      initialValue: "Что означает партнёрство на самом деле",
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
      title: "Ways to Partner",
      type: "array",
      group: "sections",
      description:
        "Partnership tier/type cards (e.g. Corporate, Church-Based, NGO). For partner page these are also rendered as the 'principles' section.",
      of: [
        {
          type: "object",
          name: "partnershipTier",
          fields: [
            { name: "name", type: "string", title: "Name (English)" },
            { name: "nameRu", type: "string", title: "Name (Русский)" },
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
              name: "idealFor",
              type: "string",
              title: "Ideal For (English)",
              description: "Short phrase shown beside the tier name (e.g. 'Best for businesses').",
            },
            {
              name: "idealForRu",
              type: "string",
              title: "Ideal For (Русский)",
            },
            {
              name: "icon",
              type: "string",
              title: "Icon (lucide name)",
              description:
                "Lucide icon name (e.g. Building2, Heart, Globe, Handshake).",
              initialValue: "Handshake",
            },
            {
              name: "hideForCentralAsia",
              type: "boolean",
              title: "Hide for Central Asia visitors",
              description:
                "Tick to hide this card for visitors detected as being in Central Asia (e.g. faith-based card hidden in CA region).",
              initialValue: false,
            },
          ],
          preview: {
            select: { title: "name", subtitle: "description" },
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
      initialValue: "How Organizations Partner With BBB",
    }),
    defineField({
      name: "howItWorksHeadingRu",
      title: "How It Works — Heading (Русский)",
      type: "string",
      group: ["russian", "sections"],
      initialValue: "Как организации сотрудничают с BBB",
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
      description: "Numbered partnership steps (e.g. 'Submit form', 'Intro call', 'Co-design').",
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

    // ── "What we offer partners" / "What we ask" benefits ────────────────────
    defineField({
      name: "benefitsHeading",
      title: "Benefits — Heading (English)",
      type: "string",
      group: ["english", "sections"],
      initialValue: "What We'll Ask of You",
    }),
    defineField({
      name: "benefitsHeadingRu",
      title: "Benefits — Heading (Русский)",
      type: "string",
      group: ["russian", "sections"],
      initialValue: "Что мы ожидаем от вас",
    }),
    defineField({
      name: "benefits",
      title: "What We Offer / Ask Cards",
      type: "array",
      group: "sections",
      description:
        "The four cards in the dark 'What We'll Ask of You' panel (Values Alignment, Active Participation, Transparency, Long-Term Thinking).",
      of: [
        {
          type: "object",
          name: "partnerBenefit",
          fields: [
            { name: "label", type: "string", title: "Title (English)" },
            { name: "labelRu", type: "string", title: "Title (Русский)" },
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
              name: "icon",
              type: "string",
              title: "Icon (lucide name)",
              initialValue: "CheckCircle2",
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
          name: "partnerFaq",
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
    prepare: () => ({ title: "Partner Application Page" }),
  },
});
