/**
 * Seed the `cohortPage` singleton with the bilingual copy that was
 * previously hardcoded in src/pages/Cohort.tsx.
 *
 * Idempotent — uses createOrReplace with _id="cohortPage". Safe to re-run.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:cohort-page
 */
import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error(
    "\n❌ Missing SANITY_WRITE_TOKEN. Get one at https://sanity.io/manage and run:\n" +
      "   SANITY_WRITE_TOKEN=<token> npm run migrate:cohort-page\n"
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
  console.log("\nSeeding cohortPage singleton...\n");

  await client.createOrReplace({
    _id: "cohortPage",
    _type: "cohortPage",

    // ── Hero ────────────────────────────────────────────────────────────────
    heroBadge: "Group Learning",
    heroBadgeRu: "Групповое обучение",
    heroHeading: "Cohorts Are Open -- Start Now",
    heroHeadingRu: "Когорты открыты — начните сейчас",
    heroSubheading:
      "Learn alongside other participants with an experienced facilitator. Groups are forming now -- grab your free spot.",
    heroSubheadingRu:
      "Пройдите обучение вместе с другими участниками под руководством опытного фасилитатора. Группы формируются прямо сейчас.",

    // ── What is a cohort? ──────────────────────────────────────────────────
    whatIsHeading: "What is a Cohort?",
    whatIsHeadingRu: "Что такое когорта?",
    whatIsBody:
      "A cohort is a group of 8–15 participants who go through the course together with a trained facilitator. Each week you meet (online or in-person) for discussions, hands-on exercises, and mutual support. It's not a lecture — it's a living community where everyone can ask questions, share experiences, and get real feedback.\n\nThe facilitator isn't a teacher — they're someone who creates a safe space for learning, guides conversations, and helps each participant apply what they learn to their own life and business.",
    whatIsBodyRu:
      "Когорта — это группа из 8–15 участников, которые проходят курс одновременно под руководством обученного фасилитатора. Каждую неделю вы встречаетесь (онлайн или очно) для обсуждений, практических упражнений и взаимной поддержки. Это не лекция — это живое сообщество, где каждый может задать вопрос, поделиться опытом и получить обратную связь.\n\nФасилитатор — это не учитель. Это человек, который создаёт безопасное пространство для обучения, направляет разговор и помогает каждому участнику применять знания к собственной жизни и бизнесу.",

    // ── Schedule cards ─────────────────────────────────────────────────────
    scheduleHeading: "Schedule & Format",
    scheduleHeadingRu: "Расписание и формат",
    cohortDates: [
      {
        _key: "track-financial-literacy",
        _type: "cohortDate",
        label: "Financial Literacy",
        labelRu: "Финансовая грамотность",
        durationLine: "10 weeks, 1 session per week",
        durationLineRu: "10 недель, 1 встреча в неделю",
        groupSizeLine: "Group of 8–15 participants",
        groupSizeLineRu: "Группа 8–15 участников",
        topicsLine:
          "Budgeting, debt management, savings, and financial planning",
        topicsLineRu:
          "Бюджетирование, управление долгами, накопления и планирование",
        icon: "book-open",
        status: "open",
      },
      {
        _key: "track-business-creation",
        _type: "cohortDate",
        label: "Business Creation",
        labelRu: "Создание бизнеса",
        durationLine: "12 weeks, 1 session per week",
        durationLineRu: "12 недель, 1 встреча в неделю",
        groupSizeLine: "Group of 8–12 participants",
        groupSizeLineRu: "Группа 8–12 участников",
        topicsLine: "Idea → business model → validation → launch",
        topicsLineRu: "Идея → бизнес-модель → подтверждение → запуск",
        icon: "trophy",
        status: "open",
      },
    ],

    // ── What to expect ─────────────────────────────────────────────────────
    whatYouGetHeading: "What to Expect",
    whatYouGetHeadingRu: "Чего ожидать",
    whatYouGet: [
      {
        _key: "expect-accountability",
        _type: "whatYouGetItem",
        label: "Accountability",
        labelRu: "Подотчётность",
        description:
          "Weekly assignments, check-ins, and group support keep you on track and moving forward.",
        descriptionRu:
          "Еженедельные задания, проверка выполнения и поддержка группы помогают вам оставаться на пути.",
        icon: "target",
      },
      {
        _key: "expect-discussions",
        _type: "whatYouGetItem",
        label: "Live Discussions",
        labelRu: "Живые обсуждения",
        description:
          "Ask questions, discuss challenges, and celebrate wins with people who understand your journey.",
        descriptionRu:
          "Задавайте вопросы, обсуждайте трудности и делитесь победами с людьми, которые понимают ваш путь.",
        icon: "message-circle",
      },
      {
        _key: "expect-community",
        _type: "whatYouGetItem",
        label: "Community",
        labelRu: "Сообщество",
        description:
          "Build a network of like-minded peers that continues to support you long after the course ends.",
        descriptionRu:
          "Постройте сеть единомышленников, которая продолжит поддерживать вас и после окончания курса.",
        icon: "users",
      },
    ],

    // ── Application steps ──────────────────────────────────────────────────
    applicationStepsHeading: "How to Apply",
    applicationStepsHeadingRu: "Как подать заявку",
    applicationSteps: [
      {
        _key: "step-1",
        _type: "applicationStep",
        stepNumber: 1,
        title: "Reserve Your Spot",
        titleRu: "Запишитесь",
        description:
          "Drop your name and email and we'll match you with the right group.",
        descriptionRu:
          "Оставьте имя и email — мы подберём для вас подходящую группу.",
      },
      {
        _key: "step-2",
        _type: "applicationStep",
        stepNumber: 2,
        title: "Brief Onboarding Call",
        titleRu: "Короткий звонок-знакомство",
        description:
          "We'll have a quick conversation to confirm your goals and answer any questions you have.",
        descriptionRu:
          "Мы коротко поговорим, чтобы подтвердить ваши цели и ответить на вопросы.",
      },
      {
        _key: "step-3",
        _type: "applicationStep",
        stepNumber: 3,
        title: "Show Up & Grow",
        titleRu: "Приходите и развивайтесь",
        description:
          "Join your weekly cohort sessions, complete the workbook, and ship the assignments.",
        descriptionRu:
          "Приходите на еженедельные встречи, проходите рабочую тетрадь и выполняйте задания.",
      },
    ],

    // ── Interest form copy ─────────────────────────────────────────────────
    interestFormHeading: "Reserve Your Free Spot",
    interestFormHeadingRu: "Запишитесь в когорту",
    interestFormSubheading:
      "Drop your name and email and we'll match you with the right group.",
    interestFormSubheadingRu:
      "Оставьте имя и email — мы подберём для вас подходящую группу.",
    interestFormSubmitLabel: "Reserve My Spot",
    interestFormSubmitLabelRu: "Записаться",
    interestFormSubmittingLabel: "Reserving...",
    interestFormSubmittingLabelRu: "Отправка...",
    interestFormDisclaimer: "100% free. No obligations. No spam.",
    interestFormDisclaimerRu: "Бесплатно. Без обязательств. Без спама.",
    interestFormSuccessHeading: "You're In!",
    interestFormSuccessHeadingRu: "Вы зарегистрированы!",
    interestFormSuccessBody:
      "We'll reach out with your cohort details. In the meantime, start the self-paced course below!",
    interestFormSuccessBodyRu:
      "Мы свяжемся с вами с деталями о вашей когорте. А пока начните самостоятельный курс!",
    interestFormErrorMissing: "Please enter your name and email.",
    interestFormErrorMissingRu: "Введите имя и email.",
    interestFormErrorInvalidEmail: "Please enter a valid email address.",
    interestFormErrorInvalidEmailRu: "Введите корректный email.",
    interestFormErrorGeneric: "Something went wrong. Please try again.",
    interestFormErrorGenericRu: "Ошибка. Попробуйте снова.",
    interestFormFirstNameLabel: "First Name *",
    interestFormFirstNameLabelRu: "Имя *",
    interestFormFirstNamePlaceholder: "Jane",
    interestFormFirstNamePlaceholderRu: "Имя",
    interestFormEmailLabel: "Email *",
    interestFormEmailLabelRu: "Email *",
    interestFormEmailPlaceholder: "jane@example.com",
    interestFormEmailPlaceholderRu: "email@example.com",

    // ── FAQs ───────────────────────────────────────────────────────────────
    faqsHeading: "Frequently Asked Questions",
    faqsHeadingRu: "Часто задаваемые вопросы",
    faqs: [
      {
        _key: "faq-cost",
        _type: "cohortFaq",
        question: "Is the cohort really free?",
        questionRu: "Когорта действительно бесплатная?",
        answer:
          "Yes. Every BBB cohort is 100% free thanks to our donors. There's no hidden fee, no upsell, and no obligation.",
        answerRu:
          "Да. Все когорты BBB на 100% бесплатны благодаря нашим донорам. Нет скрытых платежей, апселлов и обязательств.",
      },
      {
        _key: "faq-online",
        _type: "cohortFaq",
        question: "Are sessions online or in person?",
        questionRu: "Встречи проходят онлайн или очно?",
        answer:
          "Most cohorts run online via Zoom so you can join from anywhere. Local Volusia County participants occasionally have in-person options — we'll let you know which is available when you reserve a spot.",
        answerRu:
          "Большинство когорт проходит онлайн в Zoom — присоединиться можно из любой точки. Иногда для участников из округа Волусия проводятся очные встречи. Мы сообщим, какой формат доступен после записи.",
      },
      {
        _key: "faq-language",
        _type: "cohortFaq",
        question: "What language are the cohorts in?",
        questionRu: "На каком языке проходят когорты?",
        answer:
          "We run cohorts in English and Russian. When you reserve a spot, tell us which you prefer and we'll match you with the right facilitator.",
        answerRu:
          "Мы проводим когорты на английском и русском языках. При записи укажите предпочитаемый язык — мы подберём подходящего фасилитатора.",
      },
    ],

    // ── Bottom CTA ─────────────────────────────────────────────────────────
    bottomCtaHeading: "Start Right Now -- 100% Free",
    bottomCtaHeadingRu: "Начните прямо сейчас — бесплатно",
    bottomCtaSubheading:
      "Our courses are live and available for self-paced learning today. Join a cohort anytime for group support.",
    bottomCtaSubheadingRu:
      "Наши курсы доступны для самостоятельного прохождения уже сегодня. Присоединяйтесь к когорте в любой момент.",
    primaryLabel: "Financial Literacy Course",
    primaryLabelRu: "Курс финансовой грамотности",
    primaryUrl: "/course/financial-literacy",
    secondaryLabel: "Business Creation Course",
    secondaryLabelRu: "Курс создания бизнеса",
    secondaryUrl: "/course/business-creation",
    ctaCardArrowLabel: "Start Now",
    ctaCardArrowLabelRu: "Начать",
    crosslinkInvolvedLabel: "Other Ways to Get Involved →",
    crosslinkInvolvedLabelRu: "Другие способы участия →",
    crosslinkInvolvedUrl: "/get-involved",
    crosslinkStoriesLabel: "Graduate Success Stories →",
    crosslinkStoriesLabelRu: "Истории выпускников →",
    crosslinkStoriesUrl: "/success-stories",
  });

  console.log(
    "Done. Visit https://bbb.sanity.studio/structure/cohortPage to verify.\n"
  );
}

main().catch((err) => {
  console.error("\nMigration crashed:", err);
  process.exit(1);
});
