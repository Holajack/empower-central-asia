/**
 * Seed the `partnerApplicationPage` singleton with the bilingual landing
 * copy that was previously hardcoded in `src/pages/PartnerApplication.tsx`.
 *
 * Form headings, button labels, success messages, and per-field labels all
 * live on `formSettings` (Agent V wired those) — this singleton owns the
 * surrounding landing copy: hero badge, "what partnership means" intro,
 * partnership-principle cards, ways-to-partner cards (corporate / faith /
 * NGO), the four "what we ask of you" cards, and the optional FAQ +
 * bottom-CTA blocks.
 *
 * Idempotent — uses createOrReplace with _id="partnerApplicationPage".
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:partner-app-page
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error(
    "\n❌ Missing SANITY_WRITE_TOKEN. Get one at https://sanity.io/manage and run:\n" +
      "   SANITY_WRITE_TOKEN=<token> npm run migrate:partner-app-page\n",
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
  console.log("\nSeeding partnerApplicationPage singleton...\n");

  await client.createOrReplace({
    _id: "partnerApplicationPage",
    _type: "partnerApplicationPage",

    // ── Hero ────────────────────────────────────────────────────────────────
    heroBadge: "Organizational Partnerships",
    heroBadgeRu: "Организационное партнёрство",

    // ── What we look for / partnership principles ───────────────────────────
    whatWeLookForBadge: "BEFORE YOU APPLY",
    whatWeLookForBadgeRu: "ПЕРЕД ПОДАЧЕЙ ЗАЯВКИ",
    whatWeLookForHeading: "What Partnership Actually Means",
    whatWeLookForHeadingRu: "Что означает партнёрство на самом деле",
    whatWeLookForIntro: [
      "A partnership with Businesses Beyond Borders is not a logo on a brochure. It's a commitment to walk alongside entrepreneurs in Central Asia as they build businesses that transform their families and communities.",
      "We partner with organizations, churches, businesses, and institutions that share our values: human dignity, sustainability, integrity, and a belief that economic empowerment is one of the most effective ways to break cycles of poverty.",
      "Before you fill out the form below, we want you to understand what you're stepping into -- and what we'll ask of each other.",
    ],
    whatWeLookForIntroRu: [
      "Партнёрство с Businesses Beyond Borders — это не логотип на брошюре. Это обязательство идти рядом с предпринимателями Центральной Азии, пока они строят бизнес, меняющий жизнь их семей и местных сообществ.",
      "Мы работаем с организациями, компаниями и учреждениями, разделяющими наши ценности: достоинство человека, устойчивость, честность и убеждённость в том, что экономическое развитие — один из самых действенных способов разорвать цикл бедности.",
      "Прежде чем заполнить форму ниже, мы хотим, чтобы вы понимали, во что ввязываетесь — и что мы будем ожидать друг от друга.",
    ],
    whatWeLookFor: [
      {
        _key: "principle-mutual-respect",
        _type: "partnershipTier",
        icon: "Handshake",
        name: "Mutual Respect & Shared Ownership",
        nameRu: "Взаимное уважение и совместное владение",
        description:
          "Partnerships are co-designed. We don't impose models -- we build together based on local strengths and shared goals.",
        descriptionRu:
          "Партнёрство строится совместно. Мы не навязываем готовые модели — мы создаём их вместе, опираясь на местные сильные стороны и общие цели.",
        hideForCentralAsia: false,
      },
      {
        _key: "principle-local-roots",
        _type: "partnershipTier",
        icon: "Globe",
        name: "Local Roots, Global Support",
        nameRu: "Местные корни, международная поддержка",
        description:
          "Programs are delivered by local leaders in local languages. Partners provide the cultural context; BBB provides the curriculum and training.",
        descriptionRu:
          "Программы реализуют местные лидеры на родных языках. Партнёры обеспечивают культурный контекст; BBB предоставляет учебные материалы и методическую поддержку.",
        hideForCentralAsia: false,
      },
      {
        _key: "principle-capacity-building",
        _type: "partnershipTier",
        icon: "Users",
        name: "Capacity Building First",
        nameRu: "Прежде всего — развитие потенциала",
        description:
          "We transfer knowledge and resources so partners can sustain and expand programs independently. The goal is lasting impact, not dependency.",
        descriptionRu:
          "Мы передаём знания и ресурсы, чтобы партнёры могли самостоятельно поддерживать и расширять программы. Цель — устойчивое воздействие, а не зависимость.",
        hideForCentralAsia: false,
      },
      {
        _key: "principle-accountability",
        _type: "partnershipTier",
        icon: "Target",
        name: "Accountability & Transparency",
        nameRu: "Ответственность и прозрачность",
        description:
          "We measure outcomes, report impact openly, and hold ourselves to the highest standards of nonprofit governance.",
        descriptionRu:
          "Мы измеряем результаты, открыто публикуем отчёты о достижениях и придерживаемся высочайших стандартов управления некоммерческой организацией.",
        hideForCentralAsia: false,
      },
    ],

    // ── How it works / ways to partner ──────────────────────────────────────
    howItWorksHeading: "How Organizations Partner With BBB",
    howItWorksHeadingRu: "Как организации сотрудничают с BBB",
    howItWorksSteps: [
      {
        _key: "way-corporate",
        _type: "howItWorksStep",
        stepNumber: 1,
        icon: "Building2",
        title: "Corporate & Business Partners",
        titleRu: "Корпоративные и бизнес-партнёры",
        description:
          "Employee volunteer programs, matching gift campaigns, CSR collaborations, and skills-based volunteering. Your team's business expertise directly mentors entrepreneurs in Central Asia.",
        descriptionRu:
          "Волонтёрские программы для сотрудников, наставничество и консультирование в области бизнеса. Экспертиза вашей команды напрямую помогает предпринимателям Центральной Азии.",
      },
      {
        _key: "way-faith",
        _type: "howItWorksStep",
        stepNumber: 2,
        icon: "Heart",
        title: "Church & Faith-Based Partners",
        titleRu: "Церковные и религиозные партнёры",
        description:
          "Stewardship partnerships, congregational giving programs, service team coordination, and co-facilitation of financial literacy courses. We partner with churches that want to tangibly serve their communities and the world.",
        descriptionRu:
          "Партнёрство в области распоряжения ресурсами, программы пожертвований общин и координация служения. Мы работаем с церквями, которые хотят реально служить своим сообществам.",
      },
      {
        _key: "way-ngo",
        _type: "howItWorksStep",
        stepNumber: 3,
        icon: "Globe",
        title: "NGO & Institutional Partners",
        titleRu: "НКО и институциональные партнёры",
        description:
          "Joint programs, resource sharing, and regional expansion. We collaborate with organizations in Central Asia and worldwide -- community-based organizations, educational institutions, microfinance providers, and government agencies.",
        descriptionRu:
          "Совместные программы, обмен ресурсами и региональное расширение. Мы сотрудничаем с организациями в Центральной Азии и по всему миру: НКО, образовательными учреждениями, микрофинансовыми организациями и государственными структурами.",
      },
    ],

    // ── Benefits / what we ask ──────────────────────────────────────────────
    benefitsHeading: "What We'll Ask of You",
    benefitsHeadingRu: "Что мы ожидаем от вас",
    benefits: [
      {
        _key: "ask-values",
        _type: "partnerBenefit",
        icon: "Target",
        label: "Values Alignment",
        labelRu: "Общие ценности",
        description:
          "We partner with organizations committed to human dignity, integrity, and sustainability. We don't accept partnerships that conflict with our mission or our commitment to the communities we serve.",
        descriptionRu:
          "Мы работаем с организациями, приверженными достоинству человека, честности и устойчивому развитию. Мы не принимаем партнёрства, противоречащие нашей миссии или интересам сообществ, которым мы служим.",
      },
      {
        _key: "ask-participation",
        _type: "partnerBenefit",
        icon: "Users",
        label: "Active Participation",
        labelRu: "Активное участие",
        description:
          "Partnership means showing up -- not just writing a check. Whether it's providing volunteers, co-facilitating training, or engaging your team, we ask for meaningful involvement.",
        descriptionRu:
          "Партнёрство — это не просто финансовый взнос. Будь то волонтёрская работа, совместное проведение тренингов или вовлечение вашей команды — мы ждём реального участия.",
      },
      {
        _key: "ask-transparency",
        _type: "partnerBenefit",
        icon: "CheckCircle2",
        label: "Transparency",
        labelRu: "Прозрачность",
        description:
          "We report impact openly. We expect the same from our partners. Regular communication, honest feedback, and shared accountability make partnerships work.",
        descriptionRu:
          "Мы открыто публикуем отчёты о результатах. Мы ожидаем того же от наших партнёров. Регулярное общение, честная обратная связь и взаимная ответственность — основа успешного партнёрства.",
      },
      {
        _key: "ask-long-term",
        _type: "partnerBenefit",
        icon: "Clock",
        label: "Long-Term Thinking",
        labelRu: "Долгосрочная перспектива",
        description:
          "Sustainable change takes time. We prioritize multi-year commitments over one-off engagements. The entrepreneurs we serve deserve consistency.",
        descriptionRu:
          "Устойчивые изменения требуют времени. Мы отдаём приоритет долгосрочным обязательствам перед разовыми акциями. Предприниматели, которым мы служим, заслуживают постоянства.",
      },
    ],

    // ── FAQs (left empty — section only renders if items added in Studio) ──
    faqsHeading: "Common Questions",
    faqsHeadingRu: "Частые вопросы",
    faqs: [],

    // ── Bottom CTA (left empty — section only renders if heading is set) ───
  });

  console.log(
    "Done. Visit https://bbborders.sanity.studio/structure/partnerApplicationPage to verify.\n",
  );
}

main().catch((err) => {
  console.error("\nMigration crashed:", err);
  process.exit(1);
});
