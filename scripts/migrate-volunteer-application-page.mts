/**
 * Seed the `volunteerApplicationPage` singleton with the bilingual landing
 * copy that was previously hardcoded in `src/pages/VolunteerApplication.tsx`.
 *
 * Form headings, button labels, success messages, and per-field labels all
 * live on `formSettings` (Agent V wired those) — this singleton owns the
 * surrounding landing copy: hero badge, "what to expect" intro paragraphs,
 * the three key-expectation cards (Time / Remote / Training), the four
 * available volunteer roles, and the optional FAQ + bottom-CTA blocks.
 *
 * Idempotent — uses createOrReplace with _id="volunteerApplicationPage".
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:volunteer-app-page
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error(
    "\n❌ Missing SANITY_WRITE_TOKEN. Get one at https://sanity.io/manage and run:\n" +
      "   SANITY_WRITE_TOKEN=<token> npm run migrate:volunteer-app-page\n",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function main() {
  console.log("\nSeeding volunteerApplicationPage singleton...\n");

  await client.createOrReplace({
    _id: "volunteerApplicationPage",
    _type: "volunteerApplicationPage",

    // ── Hero ────────────────────────────────────────────────────────────────
    heroBadge: "Volunteer Opportunities",
    heroBadgeRu: "Возможности для волонтёров",

    // ── What we look for / "what volunteering looks like" ───────────────────
    whatWeLookForBadge: "WHAT TO EXPECT",
    whatWeLookForBadgeRu: "ЧЕГО ОЖИДАТЬ",
    whatWeLookForHeading: "What Volunteering Actually Looks Like",
    whatWeLookForHeadingRu: "Как выглядит волонтёрство на практике",
    whatWeLookForIntro: [
      "BBB volunteers don't stuff envelopes. They mentor real people building real businesses. Every volunteer is matched with a role that uses their actual professional experience -- not just their willingness to help.",
      "Most of our volunteering happens remotely. You don't need to be in Central Asia. You need to be consistent, reliable, and willing to invest your expertise in someone else's future.",
    ],
    whatWeLookForIntroRu: [
      "Волонтёры BBB не раскладывают конверты. Они наставляют реальных людей, строящих реальный бизнес. Каждый волонтёр получает роль, соответствующую его настоящему профессиональному опыту, — а не просто желанию помочь.",
      "Большинство волонтёрских задач выполняется удалённо. Вам не нужно находиться в Центральной Азии. Вам нужна последовательность, надёжность и готовность вложить свой опыт в чьё-то будущее.",
    ],
    whatWeLookFor: [
      {
        _key: "role-business-mentor",
        _type: "volunteerRole",
        icon: "GraduationCap",
        label: "Business Training Mentor",
        labelRu: "Наставник по бизнес-обучению",
        timeCommitment: "2-4 hrs/week",
        timeCommitmentRu: "2–4 ч/нед.",
        description:
          "Guide entrepreneurs through business planning, financial projections, and market strategy. You'll be matched with someone building a real business in Central Asia.",
        descriptionRu:
          "Помогайте предпринимателям с бизнес-планированием, финансовыми прогнозами и рыночной стратегией. Вас свяжут с человеком, который строит реальный бизнес в Центральной Азии.",
      },
      {
        _key: "role-financial-facilitator",
        _type: "volunteerRole",
        icon: "Users",
        label: "Financial Literacy Facilitator",
        labelRu: "Фасилитатор финансовой грамотности",
        timeCommitment: "3-5 hrs/week during cohort",
        timeCommitmentRu: "3–5 ч/нед. во время курса",
        description:
          "Co-facilitate our 6-week or 10-week financial literacy course. You'll help participants learn budgeting, saving, debt management, and long-term planning.",
        descriptionRu:
          "Совместно проводите наш 6- или 10-недельный курс финансовой грамотности. Вы поможете участникам освоить бюджетирование, накопления, управление долгом и долгосрочное планирование.",
      },
      {
        _key: "role-skills-volunteer",
        _type: "volunteerRole",
        icon: "Wifi",
        label: "Remote Skills Volunteer",
        labelRu: "Удалённый волонтёр по навыкам",
        timeCommitment: "Flexible, project-based",
        timeCommitmentRu: "Гибко, проектная основа",
        description:
          "Contribute your professional skills from anywhere -- marketing strategy, accounting, web design, translation, or administrative support.",
        descriptionRu:
          "Применяйте свои профессиональные навыки из любой точки мира — маркетинговая стратегия, бухгалтерский учёт, веб-дизайн, перевод или административная поддержка.",
      },
      {
        _key: "role-outreach",
        _type: "volunteerRole",
        icon: "Heart",
        label: "Outreach & Community Building",
        labelRu: "Работа с аудиторией и сообществом",
        timeCommitment: "2-4 hrs/week",
        timeCommitmentRu: "2–4 ч/нед.",
        description:
          "Help spread the word about BBB through social media, events, church presentations, and community networking. Build the support network our entrepreneurs rely on.",
        descriptionRu:
          "Помогайте продвигать BBB через социальные сети, мероприятия, презентации и сетевые встречи. Формируйте сеть поддержки, на которую опираются наши предприниматели.",
      },
    ],

    // ── How it works ────────────────────────────────────────────────────────
    howItWorksHeading: "Available Volunteer Roles",
    howItWorksHeadingRu: "Доступные роли волонтёров",

    // ── Benefits / key expectations ─────────────────────────────────────────
    benefitsHeading: "What to Expect",
    benefitsHeadingRu: "Чего ожидать",
    benefits: [
      {
        _key: "benefit-time-commitment",
        _type: "volunteerBenefit",
        icon: "Clock",
        label: "Time Commitment",
        labelRu: "Временные затраты",
        description:
          "2-5 hours per week, depending on role. Flexible scheduling around your availability.",
        descriptionRu:
          "2–5 часов в неделю в зависимости от роли. Гибкий график с учётом вашей занятости.",
      },
      {
        _key: "benefit-fully-remote",
        _type: "volunteerBenefit",
        icon: "Wifi",
        label: "Fully Remote",
        labelRu: "Полностью удалённо",
        description:
          "Work from anywhere with an internet connection. Video calls, shared documents, and ongoing communication.",
        descriptionRu:
          "Работайте из любого места с интернетом. Видеозвонки, общие документы и постоянная коммуникация.",
      },
      {
        _key: "benefit-training-provided",
        _type: "volunteerBenefit",
        icon: "GraduationCap",
        label: "Training Provided",
        labelRu: "Обучение предоставляется",
        description:
          "We onboard every volunteer with orientation, materials, and ongoing support from our team.",
        descriptionRu:
          "Мы проводим ориентацию для каждого волонтёра, предоставляем материалы и постоянную поддержку.",
      },
    ],

    // ── FAQs (left empty — section only renders if items added in Studio) ──
    faqsHeading: "Common Questions",
    faqsHeadingRu: "Частые вопросы",
    faqs: [],

    // ── Bottom CTA (left empty — section only renders if heading is set) ───
  });

  console.log(
    "Done. Visit https://bbborders.sanity.studio/structure/volunteerApplicationPage to verify.\n",
  );
}

main().catch((err) => {
  console.error("\nMigration crashed:", err);
  process.exit(1);
});
