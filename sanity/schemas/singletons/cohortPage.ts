import { defineField, defineType } from "sanity";

/**
 * The /cohort landing page — application page for upcoming program cohorts.
 *
 * Owns the bilingual copy for the hero, "what is a cohort" explainer, the
 * schedule/format cards, the "what to expect" cards, the "reserve your
 * spot" interest form (the headings + supporting copy around the form,
 * NOT the form-field labels themselves which live on `formSettings`), the
 * application-steps timeline, the FAQ accordion, and the bottom CTA.
 *
 * Singleton — there is only ever one /cohort document.
 */
export default defineType({
  name: "cohortPage",
  title: "Cohort Page",
  type: "document",
  description:
    "All editable copy on /cohort: hero, what is a cohort explainer, schedule/format cards, application timeline, FAQ, bottom CTA.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "hero", title: "Hero" },
    { name: "details", title: "Schedule & Details" },
    { name: "application", title: "Application Steps" },
    { name: "interestForm", title: "Interest Form" },
    { name: "faqs", title: "FAQs" },
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
      description: "Small pill above hero title (e.g. 'Group Learning').",
      initialValue: "Group Learning",
    }),
    defineField({
      name: "heroBadgeRu",
      title: "Hero Badge (Русский)",
      type: "string",
      group: ["russian", "hero"],
      initialValue: "Групповое обучение",
    }),
    defineField({
      name: "heroHeading",
      title: "Hero Heading (English)",
      type: "string",
      group: ["english", "hero"],
      initialValue: "Cohorts Are Open -- Start Now",
    }),
    defineField({
      name: "heroHeadingRu",
      title: "Hero Heading (Русский)",
      type: "string",
      group: ["russian", "hero"],
      initialValue: "Когорты открыты — начните сейчас",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading (English)",
      type: "text",
      rows: 3,
      group: ["english", "hero"],
      initialValue:
        "Learn alongside other participants with an experienced facilitator. Groups are forming now -- grab your free spot.",
    }),
    defineField({
      name: "heroSubheadingRu",
      title: "Hero Subheading (Русский)",
      type: "text",
      rows: 3,
      group: ["russian", "hero"],
      initialValue:
        "Пройдите обучение вместе с другими участниками под руководством опытного фасилитатора. Группы формируются прямо сейчас.",
    }),

    // ── What is a cohort? ──────────────────────────────────────────────────
    defineField({
      name: "whatIsHeading",
      title: "What-Is Heading (English)",
      type: "string",
      group: ["english", "details"],
      initialValue: "What is a Cohort?",
    }),
    defineField({
      name: "whatIsHeadingRu",
      title: "What-Is Heading (Русский)",
      type: "string",
      group: ["russian", "details"],
      initialValue: "Что такое когорта?",
    }),
    defineField({
      name: "whatIsBody",
      title: "What-Is Body (English)",
      type: "text",
      rows: 8,
      group: ["english", "details"],
      description:
        "Long-form explainer paragraph(s). Separate paragraphs with blank lines.",
    }),
    defineField({
      name: "whatIsBodyRu",
      title: "What-Is Body (Русский)",
      type: "text",
      rows: 8,
      group: ["russian", "details"],
    }),

    // ── Schedule / cohort dates ────────────────────────────────────────────
    defineField({
      name: "scheduleHeading",
      title: "Schedule Heading (English)",
      type: "string",
      group: ["english", "details"],
      initialValue: "Schedule & Format",
    }),
    defineField({
      name: "scheduleHeadingRu",
      title: "Schedule Heading (Русский)",
      type: "string",
      group: ["russian", "details"],
      initialValue: "Расписание и формат",
    }),
    defineField({
      name: "cohortDates",
      title: "Cohort Schedule Cards",
      type: "array",
      group: "details",
      description:
        "Each entry is one cohort track (e.g. Financial Literacy, Business Creation). Set status='open' / 'waitlist' / 'closed'.",
      of: [
        {
          type: "object",
          name: "cohortDate",
          fields: [
            { name: "label", type: "string", title: "Track Name (English)" },
            { name: "labelRu", type: "string", title: "Track Name (Русский)" },
            {
              name: "startDate",
              type: "date",
              title: "Start Date (optional)",
            },
            {
              name: "endDate",
              type: "date",
              title: "End Date (optional)",
            },
            {
              name: "location",
              type: "string",
              title: "Location / Single-line summary (English)",
              description:
                "Optional one-line summary used as a fallback when the per-line fields below are empty.",
            },
            {
              name: "locationRu",
              type: "string",
              title: "Location / Single-line summary (Русский)",
            },
            {
              name: "durationLine",
              type: "string",
              title: "Duration Line (English)",
              description:
                "First bullet on the card, e.g. '10 weeks, 1 session per week'.",
            },
            {
              name: "durationLineRu",
              type: "string",
              title: "Duration Line (Русский)",
            },
            {
              name: "groupSizeLine",
              type: "string",
              title: "Group-Size Line (English)",
              description:
                "Second bullet on the card, e.g. 'Group of 8-15 participants'.",
            },
            {
              name: "groupSizeLineRu",
              type: "string",
              title: "Group-Size Line (Русский)",
            },
            {
              name: "topicsLine",
              type: "string",
              title: "Topics Line (English)",
              description:
                "Third bullet on the card, e.g. 'Budgeting, debt management, savings, and financial planning'.",
            },
            {
              name: "topicsLineRu",
              type: "string",
              title: "Topics Line (Русский)",
            },
            {
              name: "icon",
              type: "string",
              title: "Card Icon",
              description:
                "Optional icon name from lucide-react (e.g. 'book-open', 'trophy'). Leave blank for the default.",
            },
            {
              name: "applicationDeadline",
              type: "date",
              title: "Application Deadline (optional)",
            },
            {
              name: "status",
              type: "string",
              title: "Enrollment Status",
              options: {
                list: [
                  { title: "Open", value: "open" },
                  { title: "Waitlist", value: "waitlist" },
                  { title: "Closed", value: "closed" },
                ],
                layout: "radio",
              },
              initialValue: "open",
            },
          ],
          preview: {
            select: { title: "label", subtitle: "status" },
          },
        },
      ],
    }),

    // ── What you get / "What to Expect" ────────────────────────────────────
    defineField({
      name: "whatYouGetHeading",
      title: "What-To-Expect Heading (English)",
      type: "string",
      group: ["english", "details"],
      initialValue: "What to Expect",
    }),
    defineField({
      name: "whatYouGetHeadingRu",
      title: "What-To-Expect Heading (Русский)",
      type: "string",
      group: ["russian", "details"],
      initialValue: "Чего ожидать",
    }),
    defineField({
      name: "whatYouGet",
      title: "What-To-Expect Cards",
      type: "array",
      group: "details",
      description:
        "Cards describing what cohort participants get (Accountability, Live Discussions, Community).",
      of: [
        {
          type: "object",
          name: "whatYouGetItem",
          fields: [
            { name: "label", type: "string", title: "Card Title (English)" },
            { name: "labelRu", type: "string", title: "Card Title (Русский)" },
            {
              name: "description",
              type: "text",
              rows: 3,
              title: "Card Description (English)",
            },
            {
              name: "descriptionRu",
              type: "text",
              rows: 3,
              title: "Card Description (Русский)",
            },
            {
              name: "icon",
              type: "string",
              title: "Icon",
              description:
                "Optional icon name from lucide-react (e.g. 'target', 'message-circle', 'users'). Leave blank for the default.",
            },
          ],
          preview: { select: { title: "label", subtitle: "icon" } },
        },
      ],
    }),

    // ── Application steps timeline ─────────────────────────────────────────
    defineField({
      name: "applicationStepsHeading",
      title: "Application-Steps Heading (English)",
      type: "string",
      group: ["english", "application"],
      initialValue: "How to Apply",
    }),
    defineField({
      name: "applicationStepsHeadingRu",
      title: "Application-Steps Heading (Русский)",
      type: "string",
      group: ["russian", "application"],
      initialValue: "Как подать заявку",
    }),
    defineField({
      name: "applicationSteps",
      title: "Application Steps",
      type: "array",
      group: "application",
      description: "Numbered steps walking applicants through the process.",
      of: [
        {
          type: "object",
          name: "applicationStep",
          fields: [
            {
              name: "stepNumber",
              type: "number",
              title: "Step Number",
              validation: (Rule) => Rule.min(1).integer(),
            },
            { name: "title", type: "string", title: "Step Title (English)" },
            { name: "titleRu", type: "string", title: "Step Title (Русский)" },
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
          ],
          preview: {
            select: { title: "title", subtitle: "stepNumber" },
            prepare: ({ title, subtitle }) => ({
              title: title ?? "Untitled step",
              subtitle: subtitle ? `Step ${subtitle}` : undefined,
            }),
          },
        },
      ],
    }),

    // ── Interest form copy (cohort-only, page-specific) ────────────────────
    defineField({
      name: "interestFormHeading",
      title: "Interest-Form Heading (English)",
      type: "string",
      group: ["english", "interestForm"],
      initialValue: "Reserve Your Free Spot",
    }),
    defineField({
      name: "interestFormHeadingRu",
      title: "Interest-Form Heading (Русский)",
      type: "string",
      group: ["russian", "interestForm"],
      initialValue: "Запишитесь в когорту",
    }),
    defineField({
      name: "interestFormSubheading",
      title: "Interest-Form Subheading (English)",
      type: "text",
      rows: 3,
      group: ["english", "interestForm"],
      initialValue:
        "Drop your name and email and we'll match you with the right group.",
    }),
    defineField({
      name: "interestFormSubheadingRu",
      title: "Interest-Form Subheading (Русский)",
      type: "text",
      rows: 3,
      group: ["russian", "interestForm"],
      initialValue:
        "Оставьте имя и email — мы подберём для вас подходящую группу.",
    }),
    defineField({
      name: "interestFormSubmitLabel",
      title: "Submit Button Label (English)",
      type: "string",
      group: ["english", "interestForm"],
      initialValue: "Reserve My Spot",
    }),
    defineField({
      name: "interestFormSubmitLabelRu",
      title: "Submit Button Label (Русский)",
      type: "string",
      group: ["russian", "interestForm"],
      initialValue: "Записаться",
    }),
    defineField({
      name: "interestFormSubmittingLabel",
      title: "Submitting State Label (English)",
      type: "string",
      group: ["english", "interestForm"],
      initialValue: "Reserving...",
    }),
    defineField({
      name: "interestFormSubmittingLabelRu",
      title: "Submitting State Label (Русский)",
      type: "string",
      group: ["russian", "interestForm"],
      initialValue: "Отправка...",
    }),
    defineField({
      name: "interestFormDisclaimer",
      title: "Disclaimer Text (English)",
      type: "string",
      group: ["english", "interestForm"],
      initialValue: "100% free. No obligations. No spam.",
    }),
    defineField({
      name: "interestFormDisclaimerRu",
      title: "Disclaimer Text (Русский)",
      type: "string",
      group: ["russian", "interestForm"],
      initialValue: "Бесплатно. Без обязательств. Без спама.",
    }),
    defineField({
      name: "interestFormSuccessHeading",
      title: "Success State Heading (English)",
      type: "string",
      group: ["english", "interestForm"],
      initialValue: "You're In!",
    }),
    defineField({
      name: "interestFormSuccessHeadingRu",
      title: "Success State Heading (Русский)",
      type: "string",
      group: ["russian", "interestForm"],
      initialValue: "Вы зарегистрированы!",
    }),
    defineField({
      name: "interestFormSuccessBody",
      title: "Success State Body (English)",
      type: "text",
      rows: 3,
      group: ["english", "interestForm"],
      initialValue:
        "We'll reach out with your cohort details. In the meantime, start the self-paced course below!",
    }),
    defineField({
      name: "interestFormSuccessBodyRu",
      title: "Success State Body (Русский)",
      type: "text",
      rows: 3,
      group: ["russian", "interestForm"],
      initialValue:
        "Мы свяжемся с вами с деталями о вашей когорте. А пока начните самостоятельный курс!",
    }),
    defineField({
      name: "interestFormErrorMissing",
      title: "Validation: Missing Name/Email (English)",
      type: "string",
      group: ["english", "interestForm"],
      initialValue: "Please enter your name and email.",
    }),
    defineField({
      name: "interestFormErrorMissingRu",
      title: "Validation: Missing Name/Email (Русский)",
      type: "string",
      group: ["russian", "interestForm"],
      initialValue: "Введите имя и email.",
    }),
    defineField({
      name: "interestFormErrorInvalidEmail",
      title: "Validation: Invalid Email (English)",
      type: "string",
      group: ["english", "interestForm"],
      initialValue: "Please enter a valid email address.",
    }),
    defineField({
      name: "interestFormErrorInvalidEmailRu",
      title: "Validation: Invalid Email (Русский)",
      type: "string",
      group: ["russian", "interestForm"],
      initialValue: "Введите корректный email.",
    }),
    defineField({
      name: "interestFormErrorGeneric",
      title: "Validation: Generic Error (English)",
      type: "string",
      group: ["english", "interestForm"],
      initialValue: "Something went wrong. Please try again.",
    }),
    defineField({
      name: "interestFormErrorGenericRu",
      title: "Validation: Generic Error (Русский)",
      type: "string",
      group: ["russian", "interestForm"],
      initialValue: "Ошибка. Попробуйте снова.",
    }),
    defineField({
      name: "interestFormFirstNameLabel",
      title: "First-Name Field Label (English)",
      type: "string",
      group: ["english", "interestForm"],
      initialValue: "First Name *",
    }),
    defineField({
      name: "interestFormFirstNameLabelRu",
      title: "First-Name Field Label (Русский)",
      type: "string",
      group: ["russian", "interestForm"],
      initialValue: "Имя *",
    }),
    defineField({
      name: "interestFormFirstNamePlaceholder",
      title: "First-Name Placeholder (English)",
      type: "string",
      group: ["english", "interestForm"],
      initialValue: "Jane",
    }),
    defineField({
      name: "interestFormFirstNamePlaceholderRu",
      title: "First-Name Placeholder (Русский)",
      type: "string",
      group: ["russian", "interestForm"],
      initialValue: "Имя",
    }),
    defineField({
      name: "interestFormEmailLabel",
      title: "Email Field Label (English)",
      type: "string",
      group: ["english", "interestForm"],
      initialValue: "Email *",
    }),
    defineField({
      name: "interestFormEmailLabelRu",
      title: "Email Field Label (Русский)",
      type: "string",
      group: ["russian", "interestForm"],
      initialValue: "Email *",
    }),
    defineField({
      name: "interestFormEmailPlaceholder",
      title: "Email Placeholder (English)",
      type: "string",
      group: ["english", "interestForm"],
      initialValue: "jane@example.com",
    }),
    defineField({
      name: "interestFormEmailPlaceholderRu",
      title: "Email Placeholder (Русский)",
      type: "string",
      group: ["russian", "interestForm"],
      initialValue: "email@example.com",
    }),

    // ── FAQs ───────────────────────────────────────────────────────────────
    defineField({
      name: "faqsHeading",
      title: "FAQ Heading (English)",
      type: "string",
      group: ["english", "faqs"],
      initialValue: "Frequently Asked Questions",
    }),
    defineField({
      name: "faqsHeadingRu",
      title: "FAQ Heading (Русский)",
      type: "string",
      group: ["russian", "faqs"],
      initialValue: "Часто задаваемые вопросы",
    }),
    defineField({
      name: "faqs",
      title: "Cohort FAQs",
      type: "array",
      group: "faqs",
      of: [
        {
          type: "object",
          name: "cohortFaq",
          fields: [
            {
              name: "question",
              type: "string",
              title: "Question (English)",
            },
            {
              name: "questionRu",
              type: "string",
              title: "Question (Русский)",
            },
            {
              name: "answer",
              type: "text",
              rows: 4,
              title: "Answer (English)",
            },
            {
              name: "answerRu",
              type: "text",
              rows: 4,
              title: "Answer (Русский)",
            },
          ],
          preview: { select: { title: "question" } },
        },
      ],
    }),

    // ── Bottom CTA ─────────────────────────────────────────────────────────
    defineField({
      name: "bottomCtaHeading",
      title: "Bottom CTA Heading (English)",
      type: "string",
      group: ["english", "bottomCta"],
      initialValue: "Start Right Now -- 100% Free",
    }),
    defineField({
      name: "bottomCtaHeadingRu",
      title: "Bottom CTA Heading (Русский)",
      type: "string",
      group: ["russian", "bottomCta"],
      initialValue: "Начните прямо сейчас — бесплатно",
    }),
    defineField({
      name: "bottomCtaSubheading",
      title: "Bottom CTA Subheading (English)",
      type: "text",
      rows: 3,
      group: ["english", "bottomCta"],
      initialValue:
        "Our courses are live and available for self-paced learning today. Join a cohort anytime for group support.",
    }),
    defineField({
      name: "bottomCtaSubheadingRu",
      title: "Bottom CTA Subheading (Русский)",
      type: "text",
      rows: 3,
      group: ["russian", "bottomCta"],
      initialValue:
        "Наши курсы доступны для самостоятельного прохождения уже сегодня. Присоединяйтесь к когорте в любой момент.",
    }),
    defineField({
      name: "primaryLabel",
      title: "Primary Button Label (English)",
      type: "string",
      group: ["english", "bottomCta"],
      initialValue: "Financial Literacy Course",
    }),
    defineField({
      name: "primaryLabelRu",
      title: "Primary Button Label (Русский)",
      type: "string",
      group: ["russian", "bottomCta"],
      initialValue: "Курс финансовой грамотности",
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
      initialValue: "Business Creation Course",
    }),
    defineField({
      name: "secondaryLabelRu",
      title: "Secondary Button Label (Русский)",
      type: "string",
      group: ["russian", "bottomCta"],
      initialValue: "Курс создания бизнеса",
    }),
    defineField({
      name: "secondaryUrl",
      title: "Secondary Button URL",
      type: "string",
      group: "bottomCta",
      initialValue: "/course/business-creation",
    }),
    defineField({
      name: "ctaCardArrowLabel",
      title: "CTA Card Arrow Label (English)",
      type: "string",
      group: ["english", "bottomCta"],
      description:
        "Small action label inside the two course-CTA cards (next to the arrow icon).",
      initialValue: "Start Now",
    }),
    defineField({
      name: "ctaCardArrowLabelRu",
      title: "CTA Card Arrow Label (Русский)",
      type: "string",
      group: ["russian", "bottomCta"],
      initialValue: "Начать",
    }),
    defineField({
      name: "crosslinkInvolvedLabel",
      title: "Cross-Link 1 Label (English)",
      type: "string",
      group: ["english", "bottomCta"],
      initialValue: "Other Ways to Get Involved →",
    }),
    defineField({
      name: "crosslinkInvolvedLabelRu",
      title: "Cross-Link 1 Label (Русский)",
      type: "string",
      group: ["russian", "bottomCta"],
      initialValue: "Другие способы участия →",
    }),
    defineField({
      name: "crosslinkInvolvedUrl",
      title: "Cross-Link 1 URL",
      type: "string",
      group: "bottomCta",
      initialValue: "/get-involved",
    }),
    defineField({
      name: "crosslinkStoriesLabel",
      title: "Cross-Link 2 Label (English)",
      type: "string",
      group: ["english", "bottomCta"],
      initialValue: "Graduate Success Stories →",
    }),
    defineField({
      name: "crosslinkStoriesLabelRu",
      title: "Cross-Link 2 Label (Русский)",
      type: "string",
      group: ["russian", "bottomCta"],
      initialValue: "Истории выпускников →",
    }),
    defineField({
      name: "crosslinkStoriesUrl",
      title: "Cross-Link 2 URL",
      type: "string",
      group: "bottomCta",
      initialValue: "/success-stories",
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
    prepare: () => ({ title: "Cohort Page" }),
  },
});
