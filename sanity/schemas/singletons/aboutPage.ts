import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  description:
    "The /about page content — every section editable: hero, founder/co-founder cards, why-central-asia, approach, team, bottom CTA. Singleton. Team members are managed separately under People → Team Members.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "hero", title: "Hero" },
    { name: "founder", title: "Founder Story" },
    { name: "coFounder", title: "Co-Founder Story" },
    { name: "why", title: "Why Central Asia" },
    { name: "approach", title: "Approach / Values" },
    { name: "team", title: "Team Section" },
    { name: "bottomCta", title: "Bottom CTA" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ─── Hero ────────────────────────────────────────────────────────────
    defineField({
      name: "heroTitle",
      title: "Hero Title (English)",
      type: "string",
      group: ["hero", "english"],
      initialValue: "Who We Are",
    }),
    defineField({
      name: "heroTitleRu",
      title: "Hero Title (Русский)",
      type: "string",
      group: ["hero", "russian"],
      initialValue: "Кто мы",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle (English)",
      type: "text",
      group: ["hero", "english"],
      rows: 3,
      initialValue:
        "Two people who know what it's like to start with nothing -- building an organization so others don't have to stay there.",
    }),
    defineField({
      name: "heroSubtitleRu",
      title: "Hero Subtitle (Русский)",
      type: "text",
      group: ["hero", "russian"],
      rows: 3,
      initialValue:
        "Два человека, знающих, каково начинать с нуля, — строящих организацию, чтобы другим не пришлось оставаться там.",
    }),

    // ─── Founder Story (Jacken) ──────────────────────────────────────────
    defineField({
      name: "founderBadge",
      title: "Founder Badge Label (English)",
      type: "string",
      group: ["founder", "english"],
      initialValue: "Founder's Story",
    }),
    defineField({
      name: "founderBadgeRu",
      title: "Founder Badge Label (Русский)",
      type: "string",
      group: ["founder", "russian"],
      initialValue: "История основателя",
    }),
    defineField({
      name: "founderHeading",
      title: "Founder Section Heading (English)",
      type: "string",
      group: ["founder", "english"],
      initialValue: "From a Haitian Orphanage to Founding a Nonprofit",
    }),
    defineField({
      name: "founderHeadingRu",
      title: "Founder Section Heading (Русский)",
      type: "string",
      group: ["founder", "russian"],
      initialValue:
        "Из гаитянского детского дома — к основанию некоммерческой организации",
    }),
    defineField({
      name: "founderRoleLabel",
      title: "Founder Role Label (English)",
      type: "string",
      group: ["founder", "english"],
      initialValue: "Founder & CEO",
    }),
    defineField({
      name: "founderRoleLabelRu",
      title: "Founder Role Label (Русский)",
      type: "string",
      group: ["founder", "russian"],
      initialValue: "Основатель и CEO",
    }),
    defineField({
      name: "founderBio",
      title: "Founder Bio Bullets",
      type: "array",
      group: "founder",
      description:
        "Short bullets shown on the founder side card (English + Russian per bullet). Recommended: 5-8 items.",
      of: [
        {
          type: "object",
          name: "bioBullet",
          fields: [
            { name: "text", type: "string", title: "Bullet (English)" },
            { name: "textRu", type: "string", title: "Bullet (Русский)" },
          ],
          preview: {
            select: { title: "text", subtitle: "textRu" },
          },
        },
      ],
    }),
    defineField({
      name: "foundingStory",
      title: "Founding Story (English)",
      type: "blockContent",
      group: ["founder", "english"],
      description: "Long-form narrative shown next to the founder card.",
    }),
    defineField({
      name: "foundingStoryRu",
      title: "Founding Story (Русский)",
      type: "blockContent",
      group: ["founder", "russian"],
    }),

    // ─── Co-Founder Story (Yeva) ─────────────────────────────────────────
    defineField({
      name: "coFounderBadge",
      title: "Co-Founder Badge Label (English)",
      type: "string",
      group: ["coFounder", "english"],
      initialValue: "Co-Founder's Story",
    }),
    defineField({
      name: "coFounderBadgeRu",
      title: "Co-Founder Badge Label (Русский)",
      type: "string",
      group: ["coFounder", "russian"],
      initialValue: "История сооснователя",
    }),
    defineField({
      name: "coFounderHeading",
      title: "Co-Founder Section Heading (English)",
      type: "string",
      group: ["coFounder", "english"],
      initialValue: "Bridging Two Worlds",
    }),
    defineField({
      name: "coFounderHeadingRu",
      title: "Co-Founder Section Heading (Русский)",
      type: "string",
      group: ["coFounder", "russian"],
      initialValue: "Мост между двумя мирами",
    }),
    defineField({
      name: "coFounderRoleLabel",
      title: "Co-Founder Role Label (English)",
      type: "string",
      group: ["coFounder", "english"],
      initialValue: "Co-Founder & COO",
    }),
    defineField({
      name: "coFounderRoleLabelRu",
      title: "Co-Founder Role Label (Русский)",
      type: "string",
      group: ["coFounder", "russian"],
      initialValue: "Сооснователь и COO",
    }),
    defineField({
      name: "coFounderBio",
      title: "Co-Founder Bio Bullets",
      type: "array",
      group: "coFounder",
      description:
        "Short bullets shown on the co-founder side card (English + Russian per bullet). Recommended: 3-6 items.",
      of: [
        {
          type: "object",
          name: "bioBullet",
          fields: [
            { name: "text", type: "string", title: "Bullet (English)" },
            { name: "textRu", type: "string", title: "Bullet (Русский)" },
          ],
          preview: {
            select: { title: "text", subtitle: "textRu" },
          },
        },
      ],
    }),
    defineField({
      name: "missionText",
      title: "Co-Founder Narrative (English)",
      type: "blockContent",
      group: ["coFounder", "english"],
      description:
        "Long-form narrative shown next to the co-founder card. (Field name kept as `missionText` for backwards compatibility.)",
    }),
    defineField({
      name: "missionTextRu",
      title: "Co-Founder Narrative (Русский)",
      type: "blockContent",
      group: ["coFounder", "russian"],
    }),

    // ─── Why Central Asia ────────────────────────────────────────────────
    defineField({
      name: "whyBadge",
      title: "Why Section Badge (English)",
      type: "string",
      group: ["why", "english"],
      initialValue: "Regional Focus",
    }),
    defineField({
      name: "whyBadgeRu",
      title: "Why Section Badge (Русский)",
      type: "string",
      group: ["why", "russian"],
      initialValue: "Региональный фокус",
    }),
    defineField({
      name: "whyHeading",
      title: "Why Section Heading (English)",
      type: "string",
      group: ["why", "english"],
      initialValue: "Why Central Asia?",
    }),
    defineField({
      name: "whyHeadingRu",
      title: "Why Section Heading (Русский)",
      type: "string",
      group: ["why", "russian"],
      initialValue: "Почему Центральная Азия?",
    }),
    defineField({
      name: "whyIntro",
      title: "Why Section Intro (English)",
      type: "text",
      group: ["why", "english"],
      rows: 3,
      initialValue:
        "Kazakhstan, Kyrgyzstan, and Uzbekistan are home to millions of people with entrepreneurial spirit but limited access to training, capital, and infrastructure.",
    }),
    defineField({
      name: "whyIntroRu",
      title: "Why Section Intro (Русский)",
      type: "text",
      group: ["why", "russian"],
      rows: 3,
      initialValue:
        "Казахстан, Кыргызстан и Узбекистан — дом для миллионов людей с предпринимательским духом, но с ограниченным доступом к обучению, капиталу и инфраструктуре.",
    }),
    defineField({
      name: "whyCards",
      title: "Why Central Asia Cards",
      type: "array",
      group: "why",
      description:
        "Two-column grid of cards beneath the Why section. Each card has a title and a short body. Recommended: 4 cards.",
      of: [
        {
          type: "object",
          name: "whyCard",
          fields: [
            { name: "title", type: "string", title: "Title (English)" },
            { name: "titleRu", type: "string", title: "Title (Русский)" },
            { name: "body", type: "text", rows: 4, title: "Body (English)" },
            {
              name: "bodyRu",
              type: "text",
              rows: 4,
              title: "Body (Русский)",
            },
          ],
          preview: {
            select: { title: "title", subtitle: "body" },
          },
        },
      ],
    }),

    // ─── Approach / Values ───────────────────────────────────────────────
    defineField({
      name: "approachHeading",
      title: "Approach Heading (English)",
      type: "string",
      group: ["approach", "english"],
      initialValue: "Our Approach",
    }),
    defineField({
      name: "approachHeadingRu",
      title: "Approach Heading (Русский)",
      type: "string",
      group: ["approach", "russian"],
      initialValue: "Наш подход",
    }),
    defineField({
      name: "approachIntro",
      title: "Approach Intro (English)",
      type: "text",
      group: ["approach", "english"],
      rows: 2,
      initialValue: "Everything we do is grounded in these principles.",
    }),
    defineField({
      name: "approachIntroRu",
      title: "Approach Intro (Русский)",
      type: "text",
      group: ["approach", "russian"],
      rows: 2,
      initialValue: "Всё, что мы делаем, основано на этих принципах.",
    }),
    defineField({
      name: "values",
      title: "Values List",
      type: "array",
      group: "approach",
      of: [{ type: "valueItem" }],
      description:
        "Add, remove, reorder the values shown in the Approach grid. Recommended count: 4-8.",
    }),

    // ─── Team Section ────────────────────────────────────────────────────
    defineField({
      name: "teamHeading",
      title: "Team Section Heading (English)",
      type: "string",
      group: ["team", "english"],
      initialValue: "Our Team",
    }),
    defineField({
      name: "teamHeadingRu",
      title: "Team Section Heading (Русский)",
      type: "string",
      group: ["team", "russian"],
      initialValue: "Наша команда",
    }),

    // ─── Bottom CTA ──────────────────────────────────────────────────────
    defineField({
      name: "ctaHeading",
      title: "CTA Heading (English)",
      type: "string",
      group: ["bottomCta", "english"],
      initialValue: "Join the Mission",
    }),
    defineField({
      name: "ctaHeadingRu",
      title: "CTA Heading (Русский)",
      type: "string",
      group: ["bottomCta", "russian"],
      initialValue: "Присоединяйтесь к миссии",
    }),
    defineField({
      name: "ctaBody",
      title: "CTA Body (English)",
      type: "text",
      group: ["bottomCta", "english"],
      rows: 3,
      initialValue:
        "Whether you volunteer your time, donate to fund a future entrepreneur, or simply share our story -- you become part of something that lasts.",
    }),
    defineField({
      name: "ctaBodyRu",
      title: "CTA Body (Русский)",
      type: "text",
      group: ["bottomCta", "russian"],
      rows: 3,
      initialValue:
        "Посвятите своё время волонтёрству, пожертвуйте на поддержку будущего предпринимателя или просто поделитесь нашей историей — и вы станете частью чего-то долговечного.",
    }),
    defineField({
      name: "ctaPrimaryLabel",
      title: "CTA Primary Button Label (English)",
      type: "string",
      group: ["bottomCta", "english"],
      initialValue: "Get Involved",
    }),
    defineField({
      name: "ctaPrimaryLabelRu",
      title: "CTA Primary Button Label (Русский)",
      type: "string",
      group: ["bottomCta", "russian"],
      initialValue: "Принять участие",
    }),
    defineField({
      name: "ctaPrimaryUrl",
      title: "CTA Primary Button URL",
      type: "string",
      group: "bottomCta",
      initialValue: "/get-involved",
    }),
    defineField({
      name: "ctaSecondaryLabel",
      title: "CTA Secondary Button Label (English)",
      type: "string",
      group: ["bottomCta", "english"],
      initialValue: "See Our Programs",
    }),
    defineField({
      name: "ctaSecondaryLabelRu",
      title: "CTA Secondary Button Label (Русский)",
      type: "string",
      group: ["bottomCta", "russian"],
      initialValue: "Наши программы",
    }),
    defineField({
      name: "ctaSecondaryUrl",
      title: "CTA Secondary Button URL",
      type: "string",
      group: "bottomCta",
      initialValue: "/programs-and-impact",
    }),

    // ─── SEO ─────────────────────────────────────────────────────────────
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});
