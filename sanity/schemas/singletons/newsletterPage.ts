import { defineField, defineType } from "sanity";

/**
 * The /newsletter standalone signup landing page.
 *
 * Owns the bilingual copy for the hero, the "what you'll get" benefits
 * list, the sample-issue and archive callouts, the post-signup
 * confirmation screen, and the bottom CTA.
 *
 * Form-field labels (First Name, Last Name, Email, Phone, Subscribe
 * button text, success message, etc.) live on `formSettings` and are NOT
 * duplicated here — this singleton owns the surrounding marketing copy
 * only.
 *
 * Singleton — there is only ever one /newsletter document.
 */
export default defineType({
  name: "newsletterPage",
  title: "Newsletter Page",
  type: "document",
  description:
    "All editable copy on /newsletter outside the form itself: hero, benefits list, sample-issue callout, confirmation screen, bottom CTA. Form-field labels live in Form Copy.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "hero", title: "Hero" },
    { name: "benefits", title: "Benefits" },
    { name: "form", title: "Form Copy" },
    { name: "sampleIssue", title: "Sample Issue & Archive" },
    { name: "bottomCta", title: "Bottom CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ── Hero ────────────────────────────────────────────────────────────────
    defineField({
      name: "heroHeading",
      title: "Hero Heading (English)",
      type: "string",
      group: ["english", "hero"],
      initialValue: "Subscribe to Our Newsletter",
    }),
    defineField({
      name: "heroHeadingRu",
      title: "Hero Heading (Русский)",
      type: "string",
      group: ["russian", "hero"],
      initialValue: "Подписаться на новости",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading (English)",
      type: "text",
      rows: 3,
      group: ["english", "hero"],
      initialValue:
        "Get inspiring updates about entrepreneurship development in Central Asia. Stories, program updates, and ways to make a difference.",
    }),
    defineField({
      name: "heroSubheadingRu",
      title: "Hero Subheading (Русский)",
      type: "text",
      rows: 3,
      group: ["russian", "hero"],
      initialValue:
        "Получайте вдохновляющие новости о развитии предпринимательства в Центральной Азии. Истории успеха, обновления программ и возможности для участия.",
    }),

    // ── Benefits ───────────────────────────────────────────────────────────
    defineField({
      name: "benefitsHeading",
      title: "Benefits Heading (English)",
      type: "string",
      group: ["english", "benefits"],
      initialValue: "What You'll Get",
    }),
    defineField({
      name: "benefitsHeadingRu",
      title: "Benefits Heading (Русский)",
      type: "string",
      group: ["russian", "benefits"],
      initialValue: "Что вы получите",
    }),
    defineField({
      name: "benefits",
      title: "Newsletter Benefits",
      type: "array",
      group: "benefits",
      description:
        "Bullet list of benefits subscribers get. Each entry has an English + Russian label and an optional description.",
      of: [
        {
          type: "object",
          name: "newsletterBenefit",
          fields: [
            { name: "label", type: "string", title: "Benefit Label (English)" },
            { name: "labelRu", type: "string", title: "Benefit Label (Русский)" },
            {
              name: "description",
              type: "text",
              rows: 3,
              title: "Description (English, optional)",
            },
            {
              name: "descriptionRu",
              type: "text",
              rows: 3,
              title: "Description (Русский, optional)",
            },
            {
              name: "icon",
              type: "string",
              title: "Icon",
              description:
                "Optional icon name from lucide-react (e.g. 'mail', 'sparkles'). Leave blank for the default.",
            },
          ],
          preview: { select: { title: "label", subtitle: "icon" } },
        },
      ],
    }),

    // ── Inline form-field copy ─────────────────────────────────────────────
    // NOTE: These mirror the inline labels/placeholders rendered on
    // /newsletter. If Form Copy (formSettings) ever owns these centrally,
    // these page-level overrides are still safe to keep — the page falls
    // back to the page-level value.
    defineField({
      name: "firstNameLabel",
      title: "First-Name Label (English)",
      type: "string",
      group: ["english", "form"],
      initialValue: "First name",
    }),
    defineField({
      name: "firstNameLabelRu",
      title: "First-Name Label (Русский)",
      type: "string",
      group: ["russian", "form"],
      initialValue: "Имя",
    }),
    defineField({
      name: "firstNamePlaceholder",
      title: "First-Name Placeholder (English)",
      type: "string",
      group: ["english", "form"],
      initialValue: "First name",
    }),
    defineField({
      name: "firstNamePlaceholderRu",
      title: "First-Name Placeholder (Русский)",
      type: "string",
      group: ["russian", "form"],
      initialValue: "Имя",
    }),
    defineField({
      name: "lastNameLabel",
      title: "Last-Name Label (English)",
      type: "string",
      group: ["english", "form"],
      initialValue: "Last name",
    }),
    defineField({
      name: "lastNameLabelRu",
      title: "Last-Name Label (Русский)",
      type: "string",
      group: ["russian", "form"],
      initialValue: "Фамилия",
    }),
    defineField({
      name: "lastNamePlaceholder",
      title: "Last-Name Placeholder (English)",
      type: "string",
      group: ["english", "form"],
      initialValue: "Last name",
    }),
    defineField({
      name: "lastNamePlaceholderRu",
      title: "Last-Name Placeholder (Русский)",
      type: "string",
      group: ["russian", "form"],
      initialValue: "Фамилия",
    }),
    defineField({
      name: "emailLabel",
      title: "Email Label (English)",
      type: "string",
      group: ["english", "form"],
      initialValue: "Email",
    }),
    defineField({
      name: "emailLabelRu",
      title: "Email Label (Русский)",
      type: "string",
      group: ["russian", "form"],
      initialValue: "Электронная почта",
    }),
    defineField({
      name: "phoneLabel",
      title: "Phone Label (English)",
      type: "string",
      group: ["english", "form"],
      initialValue: "Phone number",
    }),
    defineField({
      name: "phoneLabelRu",
      title: "Phone Label (Русский)",
      type: "string",
      group: ["russian", "form"],
      initialValue: "Номер телефона",
    }),
    defineField({
      name: "phonePlaceholder",
      title: "Phone Placeholder (English)",
      type: "string",
      group: ["english", "form"],
      initialValue: "(386) 555-0123",
    }),
    defineField({
      name: "phonePlaceholderRu",
      title: "Phone Placeholder (Русский)",
      type: "string",
      group: ["russian", "form"],
      initialValue: "+7 (700) 000-0000",
    }),
    defineField({
      name: "submittingLabel",
      title: "Submitting State Label (English)",
      type: "string",
      group: ["english", "form"],
      initialValue: "Subscribing...",
    }),
    defineField({
      name: "submittingLabelRu",
      title: "Submitting State Label (Русский)",
      type: "string",
      group: ["russian", "form"],
      initialValue: "Подписываемся...",
    }),
    defineField({
      name: "errorInvalidEmailTitle",
      title: "Toast: Invalid Email Title (English)",
      type: "string",
      group: ["english", "form"],
      initialValue: "Invalid Email",
    }),
    defineField({
      name: "errorInvalidEmailTitleRu",
      title: "Toast: Invalid Email Title (Русский)",
      type: "string",
      group: ["russian", "form"],
      initialValue: "Некорректный адрес",
    }),
    defineField({
      name: "errorInvalidEmailBody",
      title: "Toast: Invalid Email Body (English)",
      type: "text",
      rows: 2,
      group: ["english", "form"],
      initialValue: "Please enter a valid email address.",
    }),
    defineField({
      name: "errorInvalidEmailBodyRu",
      title: "Toast: Invalid Email Body (Русский)",
      type: "text",
      rows: 2,
      group: ["russian", "form"],
      initialValue:
        "Пожалуйста, введите действующий адрес электронной почты.",
    }),
    defineField({
      name: "errorMissingNameTitle",
      title: "Toast: Missing Name Title (English)",
      type: "string",
      group: ["english", "form"],
      initialValue: "First Name Required",
    }),
    defineField({
      name: "errorMissingNameTitleRu",
      title: "Toast: Missing Name Title (Русский)",
      type: "string",
      group: ["russian", "form"],
      initialValue: "Укажите имя",
    }),
    defineField({
      name: "errorMissingNameBody",
      title: "Toast: Missing Name Body (English)",
      type: "text",
      rows: 2,
      group: ["english", "form"],
      initialValue: "Please enter your first name.",
    }),
    defineField({
      name: "errorMissingNameBodyRu",
      title: "Toast: Missing Name Body (Русский)",
      type: "text",
      rows: 2,
      group: ["russian", "form"],
      initialValue: "Пожалуйста, введите ваше имя.",
    }),
    defineField({
      name: "errorGenericTitle",
      title: "Toast: Generic Error Title (English)",
      type: "string",
      group: ["english", "form"],
      initialValue: "Something went wrong",
    }),
    defineField({
      name: "errorGenericTitleRu",
      title: "Toast: Generic Error Title (Русский)",
      type: "string",
      group: ["russian", "form"],
      initialValue: "Что-то пошло не так",
    }),
    defineField({
      name: "errorGenericBody",
      title: "Toast: Generic Error Body (English)",
      type: "text",
      rows: 2,
      group: ["english", "form"],
      initialValue: "Please try again.",
    }),
    defineField({
      name: "errorGenericBodyRu",
      title: "Toast: Generic Error Body (Русский)",
      type: "text",
      rows: 2,
      group: ["russian", "form"],
      initialValue: "Попробуйте ещё раз.",
    }),

    // ── Sample issue + archive ─────────────────────────────────────────────
    defineField({
      name: "sampleIssueHeading",
      title: "Sample Issue Heading (English)",
      type: "string",
      group: ["english", "sampleIssue"],
      initialValue: "See a Sample Issue",
    }),
    defineField({
      name: "sampleIssueHeadingRu",
      title: "Sample Issue Heading (Русский)",
      type: "string",
      group: ["russian", "sampleIssue"],
      initialValue: "Посмотрите образец",
    }),
    defineField({
      name: "sampleIssueDescription",
      title: "Sample Issue Description (English)",
      type: "text",
      rows: 3,
      group: ["english", "sampleIssue"],
    }),
    defineField({
      name: "sampleIssueDescriptionRu",
      title: "Sample Issue Description (Русский)",
      type: "text",
      rows: 3,
      group: ["russian", "sampleIssue"],
    }),
    defineField({
      name: "sampleIssueLink",
      title: "Sample Issue Link (URL, optional)",
      type: "string",
      group: "sampleIssue",
    }),
    defineField({
      name: "archiveHeading",
      title: "Archive Heading (English)",
      type: "string",
      group: ["english", "sampleIssue"],
      initialValue: "Newsletter Archive",
    }),
    defineField({
      name: "archiveHeadingRu",
      title: "Archive Heading (Русский)",
      type: "string",
      group: ["russian", "sampleIssue"],
      initialValue: "Архив рассылок",
    }),
    defineField({
      name: "archiveLink",
      title: "Archive Link (URL, optional)",
      type: "string",
      group: "sampleIssue",
    }),

    // ── Post-signup confirmation screen ────────────────────────────────────
    defineField({
      name: "confirmationHeading",
      title: "Confirmation Heading (English)",
      type: "string",
      group: ["english", "hero"],
      description: "Shown after a successful signup.",
      initialValue: "You're Subscribed!",
    }),
    defineField({
      name: "confirmationHeadingRu",
      title: "Confirmation Heading (Русский)",
      type: "string",
      group: ["russian", "hero"],
      initialValue: "Вы подписались!",
    }),
    defineField({
      name: "confirmationBody",
      title: "Confirmation Body (English)",
      type: "text",
      rows: 4,
      group: ["english", "hero"],
      description:
        "Falls back to formSettings.newsletter.successMessage when blank. Use this only when you want a longer dedicated confirmation paragraph on the /newsletter page specifically.",
    }),
    defineField({
      name: "confirmationBodyRu",
      title: "Confirmation Body (Русский)",
      type: "text",
      rows: 4,
      group: ["russian", "hero"],
    }),

    // ── Bottom CTA ─────────────────────────────────────────────────────────
    defineField({
      name: "bottomCtaHeading",
      title: "Bottom CTA Heading (English)",
      type: "string",
      group: ["english", "bottomCta"],
      description: "Optional secondary CTA below the form (e.g. 'Visit our website').",
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
      initialValue: "We respect your privacy. Unsubscribe at any time.",
    }),
    defineField({
      name: "bottomCtaSubheadingRu",
      title: "Bottom CTA Subheading (Русский)",
      type: "text",
      rows: 3,
      group: ["russian", "bottomCta"],
      initialValue: "Мы уважаем вашу конфиденциальность. Отписаться можно в любой момент.",
    }),
    defineField({
      name: "primaryLabel",
      title: "Primary Button Label (English)",
      type: "string",
      group: ["english", "bottomCta"],
      initialValue: "Visit our website",
    }),
    defineField({
      name: "primaryLabelRu",
      title: "Primary Button Label (Русский)",
      type: "string",
      group: ["russian", "bottomCta"],
      initialValue: "Перейти на сайт",
    }),
    defineField({
      name: "primaryUrl",
      title: "Primary Button URL",
      type: "string",
      group: "bottomCta",
      initialValue: "/",
    }),

    // ── SEO ────────────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Newsletter Page" }),
  },
});
