import { defineField, defineType } from "sanity";

/**
 * The /tools/debt-calculator page — all surrounding copy (hero, instructions,
 * methodology, footnotes, next-steps, related resources, bottom CTA).
 *
 * The interactive calculator UI itself (debt rows, strategy tabs, payoff
 * computation) is rendered hardcoded by the page component — only the
 * surrounding marketing/educational copy lives here.
 */
export default defineType({
  name: "debtCalculatorPage",
  title: "Debt Calculator Page",
  type: "document",
  description:
    "All editable copy on /tools/debt-calculator: hero, how-it-works steps, methodology + footnote, next-steps, related resources, bottom CTA, and SEO. The calculator inputs/outputs/computation logic stay hardcoded.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "hero", title: "Hero" },
    { name: "instructions", title: "How It Works" },
    { name: "methodology", title: "Methodology + Footnote" },
    { name: "nextSteps", title: "Next Steps" },
    { name: "resources", title: "Related Resources" },
    { name: "bottomCta", title: "Bottom CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Hero ────────────────────────────────────────────────────────────────
    defineField({
      name: "heroBadge",
      title: "Hero Badge (English)",
      type: "string",
      group: ["english", "hero"],
      description: "Small pill above the hero heading. e.g. 'Free Interactive Tool'.",
      initialValue: "Free Interactive Tool",
    }),
    defineField({
      name: "heroBadgeRu",
      title: "Hero Badge (Русский)",
      type: "string",
      group: ["russian", "hero"],
      initialValue: "Бесплатный интерактивный инструмент",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading (English)",
      type: "string",
      group: ["english", "hero"],
      initialValue: "Debt Payoff Calculator",
    }),
    defineField({
      name: "heroHeadingRu",
      title: "Hero Heading (Русский)",
      type: "string",
      group: ["russian", "hero"],
      initialValue: "Калькулятор погашения долгов",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading (English)",
      type: "text",
      rows: 3,
      group: ["english", "hero"],
      initialValue:
        "Compare snowball vs. avalanche strategies and see exactly when you'll be debt-free.",
    }),
    defineField({
      name: "heroSubheadingRu",
      title: "Hero Subheading (Русский)",
      type: "text",
      rows: 3,
      group: ["russian", "hero"],
      initialValue:
        "Сравните стратегии снежного кома и лавины и узнайте, когда именно вы избавитесь от долгов.",
    }),

    // ── Instructions / How it works ─────────────────────────────────────────
    defineField({
      name: "instructionsHeading",
      title: "How-It-Works Heading (English)",
      type: "string",
      group: ["english", "instructions"],
      initialValue: "How to use this calculator",
    }),
    defineField({
      name: "instructionsHeadingRu",
      title: "How-It-Works Heading (Русский)",
      type: "string",
      group: ["russian", "instructions"],
      initialValue: "Как пользоваться калькулятором",
    }),
    defineField({
      name: "instructionsBody",
      title: "How-It-Works Body (English)",
      type: "blockContent",
      group: ["english", "instructions"],
      description:
        "Multi-paragraph explanation of how to use the calculator. Rendered as Portable Text.",
    }),
    defineField({
      name: "instructionsBodyRu",
      title: "How-It-Works Body (Русский)",
      type: "blockContent",
      group: ["russian", "instructions"],
    }),
    defineField({
      name: "howItWorksSteps",
      title: "Numbered Steps",
      type: "array",
      group: "instructions",
      description: "Optional numbered steps shown above the calculator UI.",
      of: [
        {
          type: "object",
          name: "howItWorksStep",
          fields: [
            { name: "stepNumber", type: "number", title: "Step Number" },
            { name: "icon", type: "string", title: "Icon (lucide-react name)" },
            { name: "title", type: "string", title: "Title (English)" },
            { name: "titleRu", type: "string", title: "Title (Русский)" },
            {
              name: "description",
              type: "text",
              title: "Description (English)",
              rows: 2,
            },
            {
              name: "descriptionRu",
              type: "text",
              title: "Description (Русский)",
              rows: 2,
            },
          ],
          preview: {
            select: { title: "title", subtitle: "description", media: "stepNumber" },
            prepare: ({ title, subtitle, media }) => ({
              title: `${media ?? "?"}. ${title ?? "(no title)"}`,
              subtitle,
            }),
          },
        },
      ],
    }),

    // ── Methodology + footnote ──────────────────────────────────────────────
    defineField({
      name: "methodologyHeading",
      title: "Methodology Heading (English)",
      type: "string",
      group: ["english", "methodology"],
      initialValue: "How the math works",
    }),
    defineField({
      name: "methodologyHeadingRu",
      title: "Methodology Heading (Русский)",
      type: "string",
      group: ["russian", "methodology"],
      initialValue: "Как считается результат",
    }),
    defineField({
      name: "methodologyBody",
      title: "Methodology Body (English)",
      type: "blockContent",
      group: ["english", "methodology"],
      description:
        "Multi-paragraph explanation of the formula / calculation method.",
    }),
    defineField({
      name: "methodologyBodyRu",
      title: "Methodology Body (Русский)",
      type: "blockContent",
      group: ["russian", "methodology"],
    }),
    defineField({
      name: "footnote",
      title: "Footnote / Disclaimer (English)",
      type: "text",
      rows: 4,
      group: ["english", "methodology"],
      description:
        "Legal/educational disclaimer shown beneath the calculator (e.g. 'This is for educational purposes only — not financial advice').",
    }),
    defineField({
      name: "footnoteRu",
      title: "Footnote / Disclaimer (Русский)",
      type: "text",
      rows: 4,
      group: ["russian", "methodology"],
    }),

    // ── Next steps ──────────────────────────────────────────────────────────
    defineField({
      name: "nextStepsHeading",
      title: "Next Steps Heading (English)",
      type: "string",
      group: ["english", "nextSteps"],
      initialValue: "What to do next",
    }),
    defineField({
      name: "nextStepsHeadingRu",
      title: "Next Steps Heading (Русский)",
      type: "string",
      group: ["russian", "nextSteps"],
      initialValue: "Что делать дальше",
    }),
    defineField({
      name: "nextStepsIntro",
      title: "Next Steps Intro (English)",
      type: "text",
      rows: 3,
      group: ["english", "nextSteps"],
    }),
    defineField({
      name: "nextStepsIntroRu",
      title: "Next Steps Intro (Русский)",
      type: "text",
      rows: 3,
      group: ["russian", "nextSteps"],
    }),
    defineField({
      name: "nextSteps",
      title: "Next-Step Cards",
      type: "array",
      group: "nextSteps",
      of: [
        {
          type: "object",
          name: "nextStepItem",
          fields: [
            { name: "icon", type: "string", title: "Icon (lucide-react name)" },
            { name: "label", type: "string", title: "Label (English)" },
            { name: "labelRu", type: "string", title: "Label (Русский)" },
            {
              name: "description",
              type: "text",
              title: "Description (English)",
              rows: 2,
            },
            {
              name: "descriptionRu",
              type: "text",
              title: "Description (Русский)",
              rows: 2,
            },
            { name: "ctaLabel", type: "string", title: "CTA Label (English)" },
            { name: "ctaLabelRu", type: "string", title: "CTA Label (Русский)" },
            {
              name: "ctaUrl",
              type: "string",
              title: "CTA URL",
              description: "Internal path (e.g. /course/financial-literacy) or full URL.",
            },
          ],
          preview: {
            select: { title: "label", subtitle: "ctaUrl" },
          },
        },
      ],
    }),

    // ── Related resources ───────────────────────────────────────────────────
    defineField({
      name: "relatedResourcesHeading",
      title: "Related Resources Heading (English)",
      type: "string",
      group: ["english", "resources"],
      initialValue: "Learn More",
    }),
    defineField({
      name: "relatedResourcesHeadingRu",
      title: "Related Resources Heading (Русский)",
      type: "string",
      group: ["russian", "resources"],
      initialValue: "Узнать больше",
    }),
    defineField({
      name: "relatedResources",
      title: "Related Resources",
      type: "array",
      group: "resources",
      description:
        "Inline cards in the right column below the results panel. Each can link to a blog post, resource page, or any URL.",
      of: [
        {
          type: "object",
          name: "relatedResourceCard",
          fields: [
            { name: "title", type: "string", title: "Title (English)" },
            { name: "titleRu", type: "string", title: "Title (Русский)" },
            {
              name: "summary",
              type: "text",
              title: "Summary (English)",
              rows: 2,
            },
            {
              name: "summaryRu",
              type: "text",
              title: "Summary (Русский)",
              rows: 2,
            },
            {
              name: "slug",
              type: "string",
              title: "Slug or URL",
              description:
                "e.g. /blog/debt-snowball-vs-avalanche-which-actually-works",
            },
          ],
          preview: {
            select: { title: "title", subtitle: "slug" },
          },
        },
      ],
    }),

    // ── Bottom CTA ──────────────────────────────────────────────────────────
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
      name: "primaryLabel",
      title: "Primary Button Label (English)",
      type: "string",
      group: ["english", "bottomCta"],
      initialValue: "Start the Free Course",
    }),
    defineField({
      name: "primaryLabelRu",
      title: "Primary Button Label (Русский)",
      type: "string",
      group: ["russian", "bottomCta"],
      initialValue: "Начать бесплатный курс",
    }),
    defineField({
      name: "primaryUrl",
      title: "Primary Button URL",
      type: "string",
      group: "bottomCta",
      initialValue: "/course/financial-literacy",
    }),
    defineField({
      name: "secondaryLabel",
      title: "Secondary Button Label (English)",
      type: "string",
      group: ["english", "bottomCta"],
    }),
    defineField({
      name: "secondaryLabelRu",
      title: "Secondary Button Label (Русский)",
      type: "string",
      group: ["russian", "bottomCta"],
    }),
    defineField({
      name: "secondaryUrl",
      title: "Secondary Button URL",
      type: "string",
      group: "bottomCta",
    }),

    // ── SEO ─────────────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Debt Calculator Page" }),
  },
});
