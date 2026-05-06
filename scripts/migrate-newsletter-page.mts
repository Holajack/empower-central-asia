/**
 * Seed the `newsletterPage` singleton with the bilingual copy that was
 * previously hardcoded in src/pages/Newsletter.tsx.
 *
 * Idempotent — uses createOrReplace with _id="newsletterPage". Safe to
 * re-run.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:newsletter-page
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error(
    "\n❌ Missing SANITY_WRITE_TOKEN. Get one at https://sanity.io/manage and run:\n" +
      "   SANITY_WRITE_TOKEN=<token> npm run migrate:newsletter-page\n"
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
  console.log("\nSeeding newsletterPage singleton...\n");

  await client.createOrReplace({
    _id: "newsletterPage",
    _type: "newsletterPage",

    // ── Hero ────────────────────────────────────────────────────────────────
    heroHeading: "Subscribe to Our Newsletter",
    heroHeadingRu: "Подписаться на новости",
    heroSubheading:
      "Get inspiring updates about entrepreneurship development in Central Asia. Stories, program updates, and ways to make a difference.",
    heroSubheadingRu:
      "Получайте вдохновляющие новости о развитии предпринимательства в Центральной Азии. Истории успеха, обновления программ и возможности для участия.",

    // ── Benefits ───────────────────────────────────────────────────────────
    benefitsHeading: "What You'll Get",
    benefitsHeadingRu: "Что вы получите",
    benefits: [
      {
        _key: "benefit-stories",
        _type: "newsletterBenefit",
        label: "Real Success Stories",
        labelRu: "Настоящие истории успеха",
        description:
          "Read about entrepreneurs in Central Asia who turned an idea into a working business this month.",
        descriptionRu:
          "Читайте об успехах предпринимателей в Центральной Азии, которые превратили идею в работающий бизнес.",
        icon: "sparkles",
      },
      {
        _key: "benefit-updates",
        _type: "newsletterBenefit",
        label: "Program Updates",
        labelRu: "Обновления программ",
        description:
          "New cohort dates, course launches, and ways to plug into our community.",
        descriptionRu:
          "Новые когорты, запуски курсов и возможности подключиться к сообществу.",
        icon: "mail",
      },
      {
        _key: "benefit-toolkits",
        _type: "newsletterBenefit",
        label: "Free Toolkits & Resources",
        labelRu: "Бесплатные инструменты и материалы",
        description:
          "Practical worksheets, templates, and guides we send to subscribers first.",
        descriptionRu:
          "Практические рабочие листы, шаблоны и руководства, которые мы первыми отправляем подписчикам.",
        icon: "download",
      },
    ],

    // ── Inline form-field copy ─────────────────────────────────────────────
    firstNameLabel: "First name",
    firstNameLabelRu: "Имя",
    firstNamePlaceholder: "First name",
    firstNamePlaceholderRu: "Имя",
    lastNameLabel: "Last name",
    lastNameLabelRu: "Фамилия",
    lastNamePlaceholder: "Last name",
    lastNamePlaceholderRu: "Фамилия",
    emailLabel: "Email",
    emailLabelRu: "Электронная почта",
    phoneLabel: "Phone number",
    phoneLabelRu: "Номер телефона",
    phonePlaceholder: "(386) 555-0123",
    phonePlaceholderRu: "+7 (700) 000-0000",
    submittingLabel: "Subscribing...",
    submittingLabelRu: "Подписываемся...",
    errorInvalidEmailTitle: "Invalid Email",
    errorInvalidEmailTitleRu: "Некорректный адрес",
    errorInvalidEmailBody: "Please enter a valid email address.",
    errorInvalidEmailBodyRu:
      "Пожалуйста, введите действующий адрес электронной почты.",
    errorMissingNameTitle: "First Name Required",
    errorMissingNameTitleRu: "Укажите имя",
    errorMissingNameBody: "Please enter your first name.",
    errorMissingNameBodyRu: "Пожалуйста, введите ваше имя.",
    errorGenericTitle: "Something went wrong",
    errorGenericTitleRu: "Что-то пошло не так",
    errorGenericBody: "Please try again.",
    errorGenericBodyRu: "Попробуйте ещё раз.",

    // ── Sample issue + archive ─────────────────────────────────────────────
    sampleIssueHeading: "See a Sample Issue",
    sampleIssueHeadingRu: "Посмотрите образец",
    sampleIssueDescription:
      "Want to see what arrives in your inbox before you subscribe? We share a recent issue with every new subscriber.",
    sampleIssueDescriptionRu:
      "Хотите посмотреть, что приходит на почту, до подписки? Мы отправляем свежий выпуск каждому новому подписчику.",
    sampleIssueLink: "",

    archiveHeading: "Newsletter Archive",
    archiveHeadingRu: "Архив рассылок",
    archiveLink: "",

    // ── Confirmation screen ────────────────────────────────────────────────
    confirmationHeading: "You're Subscribed!",
    confirmationHeadingRu: "Вы подписались!",
    confirmationBody: "",
    confirmationBodyRu: "",

    // ── Bottom CTA ─────────────────────────────────────────────────────────
    bottomCtaHeading: "",
    bottomCtaHeadingRu: "",
    bottomCtaSubheading: "We respect your privacy. Unsubscribe at any time.",
    bottomCtaSubheadingRu:
      "Мы уважаем вашу конфиденциальность. Отписаться можно в любой момент.",
    primaryLabel: "Visit our website",
    primaryLabelRu: "Перейти на сайт",
    primaryUrl: "/",
  });

  console.log(
    "Done. Visit https://bbb.sanity.studio/structure/newsletterPage to verify.\n"
  );
}

main().catch((err) => {
  console.error("\nMigration crashed:", err);
  process.exit(1);
});
