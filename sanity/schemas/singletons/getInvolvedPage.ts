import { defineField, defineType } from "sanity";

/**
 * The /get-involved page — every block of editable copy:
 *   - Hero (heading, subheading, three CTA buttons)
 *   - "For Participants" section: eyebrow, heading, intro body, four
 *     stage cards (the four-stage path), and a "live classes coming soon"
 *     callout
 *   - "For Volunteers" section: eyebrow, heading, intro, three feature
 *     cards (Flexible / Remote / Training), and apply CTA
 *   - "For Donors" section (US only — hidden for Central Asia visitors):
 *     eyebrow, heading, intro body, three donation tiers, "why different"
 *     callout, donate CTA + tax note, and corporate partnerships block
 *   - Section headings (success stories, FAQ)
 *   - Bottom CTA banner with three CTA buttons + contact info + tagline
 *
 * Volunteer-roles preview cards (under "For Volunteers") and FAQ items
 * are NOT part of this singleton — they come from `volunteerOpportunity`
 * documents and `faqItem` documents respectively. This singleton owns
 * only the surrounding section copy and headings.
 */
export default defineType({
  name: "getInvolvedPage",
  title: "Get Involved Page",
  type: "document",
  description:
    "All editable copy on /get-involved: hero, the three big sections (For Participants / For Volunteers / For Donors), success-stories + FAQ section headings, and the bottom CTA banner. Volunteer-role cards and FAQ items live elsewhere.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "hero", title: "Hero" },
    { name: "participants", title: "For Participants" },
    { name: "volunteers", title: "For Volunteers" },
    { name: "donors", title: "For Donors" },
    { name: "bottomCta", title: "Bottom CTA" },
  ],
  fields: [
    // ── Hero ───────────────────────────────────────────────────────────────
    defineField({
      name: "heroHeading",
      title: "Hero Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Find Your Way In",
    }),
    defineField({
      name: "heroHeadingRu",
      title: "Hero Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Найди свой путь",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading (English)",
      type: "text",
      rows: 3,
      group: "english",
    }),
    defineField({
      name: "heroSubheadingRu",
      title: "Hero Subheading (Русский)",
      type: "text",
      rows: 3,
      group: "russian",
    }),
    defineField({
      name: "heroParticipantCtaLabel",
      title: "Hero CTA — Participant (English)",
      type: "string",
      group: "hero",
      description: "Primary gold button. Links to #for-participants.",
      initialValue: "I Want to Learn & Build",
    }),
    defineField({
      name: "heroParticipantCtaLabelRu",
      title: "Hero CTA — Participant (Русский)",
      type: "string",
      group: "hero",
      initialValue: "Хочу учиться",
    }),
    defineField({
      name: "heroDonorCtaLabel",
      title: "Hero CTA — Donor (English)",
      type: "string",
      group: "hero",
      description:
        "Hidden for Central Asia visitors. Links to #for-donors.",
      initialValue: "I Want to Give",
    }),
    defineField({
      name: "heroDonorCtaLabelRu",
      title: "Hero CTA — Donor (Русский)",
      type: "string",
      group: "hero",
      initialValue: "Хочу поддержать",
    }),
    defineField({
      name: "heroVolunteerCtaLabel",
      title: "Hero CTA — Volunteer (English)",
      type: "string",
      group: "hero",
      description: "Links to #for-volunteers.",
      initialValue: "I Want to Volunteer",
    }),
    defineField({
      name: "heroVolunteerCtaLabelRu",
      title: "Hero CTA — Volunteer (Русский)",
      type: "string",
      group: "hero",
      initialValue: "Хочу быть волонтёром",
    }),

    // ── For Participants ───────────────────────────────────────────────────
    defineField({
      name: "participantsEyebrow",
      title: "Participants — Eyebrow (English)",
      type: "string",
      group: "english",
      initialValue: "FOR PARTICIPANTS",
    }),
    defineField({
      name: "participantsEyebrowRu",
      title: "Participants — Eyebrow (Русский)",
      type: "string",
      group: "russian",
      initialValue: "ДЛЯ УЧАСТНИКОВ",
    }),
    defineField({
      name: "participantsHeading",
      title: "Participants — Heading (English)",
      type: "string",
      group: "english",
      initialValue: "What BBB Offers -- and What It Asks",
    }),
    defineField({
      name: "participantsHeadingRu",
      title: "Participants — Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Что предлагает BBB — и что требует",
    }),
    defineField({
      name: "participantsIntroParagraphs",
      title: "Participants — Intro Body Paragraphs (English)",
      type: "array",
      group: "english",
      of: [{ type: "text", rows: 4 }],
      description: "Each entry renders as a separate paragraph.",
    }),
    defineField({
      name: "participantsIntroParagraphsRu",
      title: "Participants — Intro Body Paragraphs (Русский)",
      type: "array",
      group: "russian",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "participantStages",
      title: "Participant Stages",
      type: "array",
      group: "participants",
      of: [
        {
          type: "object",
          name: "participantStage",
          fields: [
            {
              name: "stageNumber",
              title: "Stage Number (Worldwide)",
              type: "string",
              description:
                "Number shown in the colored circle for English / worldwide visitors. Use 1, 2, 3, 4 etc.",
            },
            {
              name: "stageNumberCentralAsia",
              title: "Stage Number (Central Asia)",
              type: "string",
              description:
                "Number shown for Central Asia visitors. Defaults to the same as stageNumber when blank. Use this when a stage gets renumbered because another stage is hidden.",
            },
            {
              name: "stageLabel",
              title: "Stage Label (English)",
              type: "string",
              description:
                "All-caps small label under the title (ACTIVATE / EQUIP / EMPOWER / MULTIPLY).",
            },
            {
              name: "stageLabelRu",
              title: "Stage Label (Русский)",
              type: "string",
            },
            {
              name: "circleColor",
              title: "Circle Color",
              type: "string",
              options: {
                list: [
                  { title: "Navy (#1B2A4A)", value: "navy" },
                  { title: "Gold (#C9922A)", value: "gold" },
                ],
                layout: "radio",
              },
              initialValue: "navy",
            },
            {
              name: "title",
              title: "Title (English)",
              type: "string",
            },
            {
              name: "titleRu",
              title: "Title (Русский)",
              type: "string",
            },
            {
              name: "description",
              title: "Description (English)",
              type: "text",
              rows: 4,
            },
            {
              name: "descriptionRu",
              title: "Description (Русский)",
              type: "text",
              rows: 4,
            },
            {
              name: "ctaLabel",
              title: "CTA Label (English)",
              type: "string",
              description: "Optional. Leave blank for stages with no button.",
            },
            {
              name: "ctaLabelRu",
              title: "CTA Label (Русский)",
              type: "string",
            },
            {
              name: "ctaUrl",
              title: "CTA URL",
              type: "string",
              description: "Internal path like /programs/financial-literacy.",
            },
            {
              name: "hideForCentralAsia",
              title: "Hide for Central Asia visitors?",
              type: "boolean",
              description:
                "Use for stages that don't apply to Central Asia (e.g. the US-only Startup Capital stage).",
              initialValue: false,
            },
          ],
          preview: {
            select: {
              title: "title",
              subtitle: "stageLabel",
              number: "stageNumber",
            },
            prepare({ title, subtitle, number }) {
              return {
                title: number ? `${number}. ${title || "Untitled"}` : title,
                subtitle,
              };
            },
          },
        },
      ],
    }),

    // Live classes / Zoom placeholder callout
    defineField({
      name: "liveClassesHeading",
      title: "Live Classes Callout — Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Live Online Classes Coming Soon",
    }),
    defineField({
      name: "liveClassesHeadingRu",
      title: "Live Classes Callout — Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Скоро: онлайн-занятия в прямом эфире",
    }),
    defineField({
      name: "liveClassesBody",
      title: "Live Classes Callout — Body (English)",
      type: "text",
      rows: 3,
      group: "english",
    }),
    defineField({
      name: "liveClassesBodyRu",
      title: "Live Classes Callout — Body (Русский)",
      type: "text",
      rows: 3,
      group: "russian",
    }),
    defineField({
      name: "liveClassesCtaLabel",
      title: "Live Classes CTA Label (English)",
      type: "string",
      group: "english",
      initialValue: "Get Notified When Registration Opens",
    }),
    defineField({
      name: "liveClassesCtaLabelRu",
      title: "Live Classes CTA Label (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Узнать о старте занятий",
    }),
    defineField({
      name: "liveClassesCtaUrl",
      title: "Live Classes CTA URL",
      type: "string",
      group: "participants",
      initialValue: "/newsletter",
    }),

    // ── For Volunteers ─────────────────────────────────────────────────────
    defineField({
      name: "volunteersEyebrow",
      title: "Volunteers — Eyebrow (English)",
      type: "string",
      group: "english",
      initialValue: "FOR VOLUNTEERS",
    }),
    defineField({
      name: "volunteersEyebrowRu",
      title: "Volunteers — Eyebrow (Русский)",
      type: "string",
      group: "russian",
      initialValue: "ДЛЯ ВОЛОНТЁРОВ",
    }),
    defineField({
      name: "volunteersHeading",
      title: "Volunteers — Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Give Your Time and Skills",
    }),
    defineField({
      name: "volunteersHeadingRu",
      title: "Volunteers — Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Поделитесь своим временем и навыками",
    }),
    defineField({
      name: "volunteersIntro",
      title: "Volunteers — Intro Body (English)",
      type: "text",
      rows: 4,
      group: "english",
    }),
    defineField({
      name: "volunteersIntroRu",
      title: "Volunteers — Intro Body (Русский)",
      type: "text",
      rows: 4,
      group: "russian",
    }),
    defineField({
      name: "volunteerFeatures",
      title: "Volunteer Feature Cards",
      type: "array",
      group: "volunteers",
      description:
        "The three small cards under the section heading (Flexible / Remote / Training).",
      of: [
        {
          type: "object",
          name: "volunteerFeature",
          fields: [
            {
              name: "icon",
              title: "Icon",
              type: "string",
              options: {
                list: [
                  { title: "Clock", value: "Clock" },
                  { title: "Laptop", value: "Laptop" },
                  { title: "Users", value: "Users" },
                  { title: "Heart", value: "Heart" },
                  { title: "HelpCircle", value: "HelpCircle" },
                ],
              },
              initialValue: "Clock",
            },
            {
              name: "circleColor",
              title: "Circle Color",
              type: "string",
              options: {
                list: [
                  { title: "Navy (#1B2A4A)", value: "navy" },
                  { title: "Gold (#C9922A)", value: "gold" },
                ],
                layout: "radio",
              },
              initialValue: "navy",
            },
            { name: "title", title: "Title (English)", type: "string" },
            { name: "titleRu", title: "Title (Русский)", type: "string" },
            {
              name: "description",
              title: "Description (English)",
              type: "text",
              rows: 3,
            },
            {
              name: "descriptionRu",
              title: "Description (Русский)",
              type: "text",
              rows: 3,
            },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),
    defineField({
      name: "volunteerApplyCtaLabel",
      title: "Volunteer Apply CTA Label (English)",
      type: "string",
      group: "english",
      initialValue: "Apply to Volunteer",
    }),
    defineField({
      name: "volunteerApplyCtaLabelRu",
      title: "Volunteer Apply CTA Label (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Подать заявку волонтёра",
    }),
    defineField({
      name: "volunteerApplyCtaUrl",
      title: "Volunteer Apply CTA URL",
      type: "string",
      group: "volunteers",
      initialValue: "/volunteer-application",
    }),

    // ── For Donors (US only) ───────────────────────────────────────────────
    defineField({
      name: "donorsEyebrow",
      title: "Donors — Eyebrow (English)",
      type: "string",
      group: "english",
      initialValue: "FOR DONORS & PARTNERS",
    }),
    defineField({
      name: "donorsEyebrowRu",
      title: "Donors — Eyebrow (Русский)",
      type: "string",
      group: "russian",
      initialValue: "ДЛЯ ДОНОРОВ И ПАРТНЁРОВ",
    }),
    defineField({
      name: "donorsHeading",
      title: "Donors — Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Where Your Money Actually Goes",
    }),
    defineField({
      name: "donorsHeadingRu",
      title: "Donors — Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Куда идут ваши деньги",
    }),
    defineField({
      name: "donorsIntroParagraphs",
      title: "Donors — Intro Body Paragraphs (English)",
      type: "array",
      group: "english",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "donorsIntroParagraphsRu",
      title: "Donors — Intro Body Paragraphs (Русский)",
      type: "array",
      group: "russian",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "donorTiers",
      title: "Donation Tiers",
      type: "array",
      group: "donors",
      description: "The three impact-tier cards ($150 / $400 / $2k–5k).",
      of: [
        {
          type: "object",
          name: "donorTier",
          fields: [
            {
              name: "amount",
              title: "Amount Display (English)",
              type: "string",
              description: "e.g. $150, $400, $2,000-$5,000",
            },
            {
              name: "amountRu",
              title: "Amount Display (Русский)",
              type: "string",
              description: "Russian amount formatting, e.g. $2 000–$5 000",
            },
            {
              name: "name",
              title: "Tier Name (English)",
              type: "string",
            },
            {
              name: "nameRu",
              title: "Tier Name (Русский)",
              type: "string",
            },
            {
              name: "description",
              title: "Description (English)",
              type: "text",
              rows: 4,
            },
            {
              name: "descriptionRu",
              title: "Description (Русский)",
              type: "text",
              rows: 4,
            },
          ],
          preview: { select: { title: "amount", subtitle: "name" } },
        },
      ],
    }),

    // "Why this is different" callout
    defineField({
      name: "donorsDifferenceHeading",
      title: "\"Why Different\" Callout — Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Why This Isn't Like Other Places You Could Give",
    }),
    defineField({
      name: "donorsDifferenceHeadingRu",
      title: "\"Why Different\" Callout — Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Почему это не похоже на другие организации",
    }),
    defineField({
      name: "donorsDifferenceParagraphs",
      title: "\"Why Different\" Callout — Body Paragraphs (English)",
      type: "array",
      group: "english",
      of: [{ type: "text", rows: 4 }],
    }),
    defineField({
      name: "donorsDifferenceParagraphsRu",
      title: "\"Why Different\" Callout — Body Paragraphs (Русский)",
      type: "array",
      group: "russian",
      of: [{ type: "text", rows: 4 }],
    }),

    // Donate CTA + tax note
    defineField({
      name: "donateCtaLabel",
      title: "Donate CTA Label (English)",
      type: "string",
      group: "english",
      initialValue: "Donate Now",
    }),
    defineField({
      name: "donateCtaLabelRu",
      title: "Donate CTA Label (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Пожертвовать",
    }),
    defineField({
      name: "donateTaxNote",
      title: "Donate Tax Note (English)",
      type: "text",
      rows: 2,
      group: "english",
    }),
    defineField({
      name: "donateTaxNoteRu",
      title: "Donate Tax Note (Русский)",
      type: "text",
      rows: 2,
      group: "russian",
    }),

    // Corporate partnerships block
    defineField({
      name: "partnerHeading",
      title: "Partnerships — Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Organizational Partnerships",
    }),
    defineField({
      name: "partnerHeadingRu",
      title: "Partnerships — Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Партнёрство с организациями",
    }),
    defineField({
      name: "partnerBody",
      title: "Partnerships — Body (English)",
      type: "text",
      rows: 4,
      group: "english",
    }),
    defineField({
      name: "partnerBodyRu",
      title: "Partnerships — Body (Русский)",
      type: "text",
      rows: 4,
      group: "russian",
    }),
    defineField({
      name: "partnerOptions",
      title: "Partnership Options",
      type: "array",
      group: "donors",
      description:
        "Three small columns under the partnership body (Corporate Giving / Skills-Based / Strategic).",
      of: [
        {
          type: "object",
          name: "partnerOption",
          fields: [
            { name: "title", title: "Title (English)", type: "string" },
            { name: "titleRu", title: "Title (Русский)", type: "string" },
            {
              name: "description",
              title: "Description (English)",
              type: "text",
              rows: 3,
            },
            {
              name: "descriptionRu",
              title: "Description (Русский)",
              type: "text",
              rows: 3,
            },
          ],
          preview: { select: { title: "title", subtitle: "description" } },
        },
      ],
    }),
    defineField({
      name: "partnerCtaLabel",
      title: "Partnership CTA Label (English)",
      type: "string",
      group: "english",
      initialValue: "Start a Partnership Conversation",
    }),
    defineField({
      name: "partnerCtaLabelRu",
      title: "Partnership CTA Label (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Начать разговор о партнёрстве",
    }),
    defineField({
      name: "partnerCtaUrl",
      title: "Partnership CTA URL",
      type: "string",
      group: "donors",
      initialValue: "/partner-application",
    }),

    // ── Section Headings (success stories + FAQ) ──────────────────────────
    defineField({
      name: "successStoriesHeading",
      title: "Success Stories — Section Heading (English)",
      type: "string",
      group: "english",
      initialValue: "People Who Walked This Path",
    }),
    defineField({
      name: "successStoriesHeadingRu",
      title: "Success Stories — Section Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Люди, прошедшие этот путь",
    }),
    defineField({
      name: "faqHeading",
      title: "FAQ — Section Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Common Questions",
    }),
    defineField({
      name: "faqHeadingRu",
      title: "FAQ — Section Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Частые вопросы",
    }),
    defineField({
      name: "faqContactPrompt",
      title: "FAQ — Contact Prompt (English)",
      type: "string",
      group: "english",
      description: "Text above the \"Contact Us\" button below the FAQ list.",
      initialValue: "Don't see your question?",
    }),
    defineField({
      name: "faqContactPromptRu",
      title: "FAQ — Contact Prompt (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Не нашли ответ?",
    }),
    defineField({
      name: "faqContactCtaLabel",
      title: "FAQ — Contact CTA Label (English)",
      type: "string",
      group: "english",
      initialValue: "Contact Us",
    }),
    defineField({
      name: "faqContactCtaLabelRu",
      title: "FAQ — Contact CTA Label (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Связаться с нами",
    }),

    // ── Bottom CTA ─────────────────────────────────────────────────────────
    defineField({
      name: "bottomCtaHeading",
      title: "Bottom CTA — Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Hope That Builds.",
    }),
    defineField({
      name: "bottomCtaHeadingRu",
      title: "Bottom CTA — Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Надежда, которая строит.",
    }),
    defineField({
      name: "bottomCtaSubheading",
      title: "Bottom CTA — Subheading (English)",
      type: "text",
      rows: 4,
      group: "english",
    }),
    defineField({
      name: "bottomCtaSubheadingRu",
      title: "Bottom CTA — Subheading (Русский)",
      type: "text",
      rows: 4,
      group: "russian",
    }),
    defineField({
      name: "bottomCtaParticipantLabel",
      title: "Bottom CTA — Participant Button (English)",
      type: "string",
      group: "english",
      initialValue: "Start the Free Course",
    }),
    defineField({
      name: "bottomCtaParticipantLabelRu",
      title: "Bottom CTA — Participant Button (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Начать бесплатный курс",
    }),
    defineField({
      name: "bottomCtaParticipantUrl",
      title: "Bottom CTA — Participant Button URL",
      type: "string",
      group: "bottomCta",
      initialValue: "/programs/financial-literacy",
    }),
    defineField({
      name: "bottomCtaDonorLabel",
      title: "Bottom CTA — Donor Button (English)",
      type: "string",
      group: "english",
      description: "Hidden for Central Asia visitors.",
      initialValue: "Give Someone Their Chance",
    }),
    defineField({
      name: "bottomCtaDonorLabelRu",
      title: "Bottom CTA — Donor Button (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Дайте кому-то шанс",
    }),
    defineField({
      name: "bottomCtaVolunteerLabel",
      title: "Bottom CTA — Volunteer Button (English)",
      type: "string",
      group: "english",
      initialValue: "Volunteer With Us",
    }),
    defineField({
      name: "bottomCtaVolunteerLabelRu",
      title: "Bottom CTA — Volunteer Button (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Стать волонтёром",
    }),
    defineField({
      name: "bottomCtaVolunteerUrl",
      title: "Bottom CTA — Volunteer Button URL",
      type: "string",
      group: "bottomCta",
      initialValue: "/volunteer-application",
    }),
    defineField({
      name: "bottomCtaTagline",
      title: "Bottom CTA — Tagline (English)",
      type: "text",
      rows: 2,
      group: "english",
      description: "Small line under the contact info.",
      initialValue: "Based in Port Orange, Florida. Working in Central Asia.",
    }),
    defineField({
      name: "bottomCtaTaglineRu",
      title: "Bottom CTA — Tagline (Русский)",
      type: "text",
      rows: 2,
      group: "russian",
      initialValue:
        "Штаб-квартира в Порт-Оранж, Флорида. Работаем в Центральной Азии.",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Get Involved Page" }),
  },
});
