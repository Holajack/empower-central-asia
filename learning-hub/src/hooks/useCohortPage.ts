/**
 * Cohort-page-specific Sanity content (singleton). Hero copy, the
 * "what is a cohort?" explainer, schedule cards, "what to expect" cards,
 * application-steps timeline, FAQ accordion, and bottom CTA — all
 * editable in Studio without touching code.
 *
 * Hardcoded fallbacks mirror the bilingual copy that `Cohort.tsx` used
 * before CMS wiring, so the page never breaks if Sanity is unreachable.
 *
 * The form-field labels (First Name, Email, Submit, success message,
 * etc.) live on `formSettings` and are NOT shaped here — this hook only
 * owns the marketing copy around the form.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";
import { siteConfig } from "@/lib/seo";

// ── Types ─────────────────────────────────────────────────────────────────────

export type CohortStatus = "open" | "waitlist" | "closed";

export interface CohortDate {
  _key?: string;
  label?: string;
  labelRu?: string;
  startDate?: string;
  endDate?: string;
  location?: string;
  locationRu?: string;
  durationLine?: string;
  durationLineRu?: string;
  groupSizeLine?: string;
  groupSizeLineRu?: string;
  topicsLine?: string;
  topicsLineRu?: string;
  icon?: string;
  applicationDeadline?: string;
  status?: CohortStatus;
}

export interface CohortWhatYouGetItem {
  _key?: string;
  label?: string;
  labelRu?: string;
  description?: string;
  descriptionRu?: string;
  icon?: string;
}

export interface CohortApplicationStep {
  _key?: string;
  stepNumber?: number;
  title?: string;
  titleRu?: string;
  description?: string;
  descriptionRu?: string;
}

export interface CohortFaq {
  _key?: string;
  question?: string;
  questionRu?: string;
  answer?: string;
  answerRu?: string;
}

export interface CohortPageData {
  heroBadge: string;
  heroBadgeRu?: string;
  heroHeading: string;
  heroHeadingRu?: string;
  heroSubheading: string;
  heroSubheadingRu?: string;

  whatIsHeading: string;
  whatIsHeadingRu?: string;
  whatIsBody: string;
  whatIsBodyRu?: string;

  scheduleHeading: string;
  scheduleHeadingRu?: string;
  cohortDates: CohortDate[];

  whatYouGetHeading: string;
  whatYouGetHeadingRu?: string;
  whatYouGet: CohortWhatYouGetItem[];

  applicationStepsHeading: string;
  applicationStepsHeadingRu?: string;
  applicationSteps: CohortApplicationStep[];

  interestFormHeading: string;
  interestFormHeadingRu?: string;
  interestFormSubheading: string;
  interestFormSubheadingRu?: string;
  interestFormSubmitLabel: string;
  interestFormSubmitLabelRu?: string;
  interestFormSubmittingLabel: string;
  interestFormSubmittingLabelRu?: string;
  interestFormDisclaimer: string;
  interestFormDisclaimerRu?: string;
  interestFormSuccessHeading: string;
  interestFormSuccessHeadingRu?: string;
  interestFormSuccessBody: string;
  interestFormSuccessBodyRu?: string;
  interestFormErrorMissing: string;
  interestFormErrorMissingRu?: string;
  interestFormErrorInvalidEmail: string;
  interestFormErrorInvalidEmailRu?: string;
  interestFormErrorGeneric: string;
  interestFormErrorGenericRu?: string;
  interestFormFirstNameLabel: string;
  interestFormFirstNameLabelRu?: string;
  interestFormFirstNamePlaceholder: string;
  interestFormFirstNamePlaceholderRu?: string;
  interestFormEmailLabel: string;
  interestFormEmailLabelRu?: string;
  interestFormEmailPlaceholder: string;
  interestFormEmailPlaceholderRu?: string;

  faqsHeading: string;
  faqsHeadingRu?: string;
  faqs: CohortFaq[];

  bottomCtaHeading: string;
  bottomCtaHeadingRu?: string;
  bottomCtaSubheading: string;
  bottomCtaSubheadingRu?: string;
  primaryLabel: string;
  primaryLabelRu?: string;
  primaryUrl: string;
  secondaryLabel: string;
  secondaryLabelRu?: string;
  secondaryUrl: string;
  ctaCardArrowLabel: string;
  ctaCardArrowLabelRu?: string;
  crosslinkInvolvedLabel: string;
  crosslinkInvolvedLabelRu?: string;
  crosslinkInvolvedUrl: string;
  crosslinkStoriesLabel: string;
  crosslinkStoriesLabelRu?: string;
  crosslinkStoriesUrl: string;
}

// ── Fallbacks (mirror schema initialValues + previously-hardcoded copy) ──────

const FALLBACK: CohortPageData = {
  heroBadge: "Group Learning",
  heroBadgeRu: "Групповое обучение",
  heroHeading: "Cohorts Are Open -- Start Now",
  heroHeadingRu: "Когорты открыты — начните сейчас",
  heroSubheading:
    "Learn alongside other participants with an experienced facilitator. Groups are forming now -- grab your free spot.",
  heroSubheadingRu:
    "Пройдите обучение вместе с другими участниками под руководством опытного фасилитатора. Группы формируются прямо сейчас.",

  whatIsHeading: "What is a Cohort?",
  whatIsHeadingRu: "Что такое когорта?",
  whatIsBody:
    "A cohort is a group of 8–15 participants who go through the course together with a trained facilitator. Each week you meet (online or in-person) for discussions, hands-on exercises, and mutual support. It's not a lecture — it's a living community where everyone can ask questions, share experiences, and get real feedback.\n\nThe facilitator isn't a teacher — they're someone who creates a safe space for learning, guides conversations, and helps each participant apply what they learn to their own life and business.",
  whatIsBodyRu:
    "Когорта — это группа из 8–15 участников, которые проходят курс одновременно под руководством обученного фасилитатора. Каждую неделю вы встречаетесь (онлайн или очно) для обсуждений, практических упражнений и взаимной поддержки. Это не лекция — это живое сообщество, где каждый может задать вопрос, поделиться опытом и получить обратную связь.\n\nФасилитатор — это не учитель. Это человек, который создаёт безопасное пространство для обучения, направляет разговор и помогает каждому участнику применять знания к собственной жизни и бизнесу.",

  scheduleHeading: "Schedule & Format",
  scheduleHeadingRu: "Расписание и формат",
  cohortDates: [
    {
      _key: "track-financial-literacy",
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

  whatYouGetHeading: "What to Expect",
  whatYouGetHeadingRu: "Чего ожидать",
  whatYouGet: [
    {
      _key: "expect-accountability",
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
      label: "Community",
      labelRu: "Сообщество",
      description:
        "Build a network of like-minded peers that continues to support you long after the course ends.",
      descriptionRu:
        "Постройте сеть единомышленников, которая продолжит поддерживать вас и после окончания курса.",
      icon: "users",
    },
  ],

  applicationStepsHeading: "How to Apply",
  applicationStepsHeadingRu: "Как подать заявку",
  applicationSteps: [
    {
      _key: "step-1",
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
      stepNumber: 3,
      title: "Show Up & Grow",
      titleRu: "Приходите и развивайтесь",
      description:
        "Join your weekly cohort sessions, complete the workbook, and ship the assignments.",
      descriptionRu:
        "Приходите на еженедельные встречи, проходите рабочую тетрадь и выполняйте задания.",
    },
  ],

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

  faqsHeading: "Frequently Asked Questions",
  faqsHeadingRu: "Часто задаваемые вопросы",
  faqs: [
    {
      _key: "faq-cost",
      question: "Is the cohort really free?",
      questionRu: "Когорта действительно бесплатная?",
      answer:
        `Yes. Every ${siteConfig.shortName} cohort is 100% free thanks to our donors. There's no hidden fee, no upsell, and no obligation.`,
      answerRu:
        `Да. Все когорты ${siteConfig.shortName} на 100% бесплатны благодаря нашим донорам. Нет скрытых платежей, апселлов и обязательств.`,
    },
    {
      _key: "faq-online",
      question: "Are sessions online or in person?",
      questionRu: "Встречи проходят онлайн или очно?",
      answer:
        "Most cohorts run online via Zoom so you can join from anywhere. Local Volusia County participants occasionally have in-person options — we'll let you know which is available when you reserve a spot.",
      answerRu:
        "Большинство когорт проходит онлайн в Zoom — присоединиться можно из любой точки. Иногда для участников из округа Волусия проводятся очные встречи. Мы сообщим, какой формат доступен после записи.",
    },
    {
      _key: "faq-language",
      question: "What language are the cohorts in?",
      questionRu: "На каком языке проходят когорты?",
      answer:
        "We run cohorts in English and Russian. When you reserve a spot, tell us which you prefer and we'll match you with the right facilitator.",
      answerRu:
        "Мы проводим когорты на английском и русском языках. При записи укажите предпочитаемый язык — мы подберём подходящего фасилитатора.",
    },
  ],

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
};

// ── GROQ query ────────────────────────────────────────────────────────────────

const COHORT_PAGE_QUERY = /* groq */ `
  *[_id == "cohortPage"][0]{
    heroBadge,
    heroBadgeRu,
    heroHeading,
    heroHeadingRu,
    heroSubheading,
    heroSubheadingRu,
    whatIsHeading,
    whatIsHeadingRu,
    whatIsBody,
    whatIsBodyRu,
    scheduleHeading,
    scheduleHeadingRu,
    cohortDates[]{
      _key,
      label,
      labelRu,
      startDate,
      endDate,
      location,
      locationRu,
      durationLine,
      durationLineRu,
      groupSizeLine,
      groupSizeLineRu,
      topicsLine,
      topicsLineRu,
      icon,
      applicationDeadline,
      status
    },
    whatYouGetHeading,
    whatYouGetHeadingRu,
    whatYouGet[]{
      _key,
      label,
      labelRu,
      description,
      descriptionRu,
      icon
    },
    applicationStepsHeading,
    applicationStepsHeadingRu,
    applicationSteps[]{
      _key,
      stepNumber,
      title,
      titleRu,
      description,
      descriptionRu
    },
    interestFormHeading,
    interestFormHeadingRu,
    interestFormSubheading,
    interestFormSubheadingRu,
    interestFormSubmitLabel,
    interestFormSubmitLabelRu,
    interestFormSubmittingLabel,
    interestFormSubmittingLabelRu,
    interestFormDisclaimer,
    interestFormDisclaimerRu,
    interestFormSuccessHeading,
    interestFormSuccessHeadingRu,
    interestFormSuccessBody,
    interestFormSuccessBodyRu,
    interestFormErrorMissing,
    interestFormErrorMissingRu,
    interestFormErrorInvalidEmail,
    interestFormErrorInvalidEmailRu,
    interestFormErrorGeneric,
    interestFormErrorGenericRu,
    interestFormFirstNameLabel,
    interestFormFirstNameLabelRu,
    interestFormFirstNamePlaceholder,
    interestFormFirstNamePlaceholderRu,
    interestFormEmailLabel,
    interestFormEmailLabelRu,
    interestFormEmailPlaceholder,
    interestFormEmailPlaceholderRu,
    faqsHeading,
    faqsHeadingRu,
    faqs[]{
      _key,
      question,
      questionRu,
      answer,
      answerRu
    },
    bottomCtaHeading,
    bottomCtaHeadingRu,
    bottomCtaSubheading,
    bottomCtaSubheadingRu,
    primaryLabel,
    primaryLabelRu,
    primaryUrl,
    secondaryLabel,
    secondaryLabelRu,
    secondaryUrl,
    ctaCardArrowLabel,
    ctaCardArrowLabelRu,
    crosslinkInvolvedLabel,
    crosslinkInvolvedLabelRu,
    crosslinkInvolvedUrl,
    crosslinkStoriesLabel,
    crosslinkStoriesLabelRu,
    crosslinkStoriesUrl
  }
`;

interface RawCohortPage {
  heroBadge?: string;
  heroBadgeRu?: string;
  heroHeading?: string;
  heroHeadingRu?: string;
  heroSubheading?: string;
  heroSubheadingRu?: string;
  whatIsHeading?: string;
  whatIsHeadingRu?: string;
  whatIsBody?: string;
  whatIsBodyRu?: string;
  scheduleHeading?: string;
  scheduleHeadingRu?: string;
  cohortDates?: CohortDate[];
  whatYouGetHeading?: string;
  whatYouGetHeadingRu?: string;
  whatYouGet?: CohortWhatYouGetItem[];
  applicationStepsHeading?: string;
  applicationStepsHeadingRu?: string;
  applicationSteps?: CohortApplicationStep[];
  interestFormHeading?: string;
  interestFormHeadingRu?: string;
  interestFormSubheading?: string;
  interestFormSubheadingRu?: string;
  interestFormSubmitLabel?: string;
  interestFormSubmitLabelRu?: string;
  interestFormSubmittingLabel?: string;
  interestFormSubmittingLabelRu?: string;
  interestFormDisclaimer?: string;
  interestFormDisclaimerRu?: string;
  interestFormSuccessHeading?: string;
  interestFormSuccessHeadingRu?: string;
  interestFormSuccessBody?: string;
  interestFormSuccessBodyRu?: string;
  interestFormErrorMissing?: string;
  interestFormErrorMissingRu?: string;
  interestFormErrorInvalidEmail?: string;
  interestFormErrorInvalidEmailRu?: string;
  interestFormErrorGeneric?: string;
  interestFormErrorGenericRu?: string;
  interestFormFirstNameLabel?: string;
  interestFormFirstNameLabelRu?: string;
  interestFormFirstNamePlaceholder?: string;
  interestFormFirstNamePlaceholderRu?: string;
  interestFormEmailLabel?: string;
  interestFormEmailLabelRu?: string;
  interestFormEmailPlaceholder?: string;
  interestFormEmailPlaceholderRu?: string;
  faqsHeading?: string;
  faqsHeadingRu?: string;
  faqs?: CohortFaq[];
  bottomCtaHeading?: string;
  bottomCtaHeadingRu?: string;
  bottomCtaSubheading?: string;
  bottomCtaSubheadingRu?: string;
  primaryLabel?: string;
  primaryLabelRu?: string;
  primaryUrl?: string;
  secondaryLabel?: string;
  secondaryLabelRu?: string;
  secondaryUrl?: string;
  ctaCardArrowLabel?: string;
  ctaCardArrowLabelRu?: string;
  crosslinkInvolvedLabel?: string;
  crosslinkInvolvedLabelRu?: string;
  crosslinkInvolvedUrl?: string;
  crosslinkStoriesLabel?: string;
  crosslinkStoriesLabelRu?: string;
  crosslinkStoriesUrl?: string;
}

// ── Builder ───────────────────────────────────────────────────────────────────

function shape(raw: RawCohortPage | null): CohortPageData {
  const r = raw ?? {};
  return {
    heroBadge: r.heroBadge || FALLBACK.heroBadge,
    heroBadgeRu: r.heroBadgeRu || FALLBACK.heroBadgeRu,
    heroHeading: r.heroHeading || FALLBACK.heroHeading,
    heroHeadingRu: r.heroHeadingRu || FALLBACK.heroHeadingRu,
    heroSubheading: r.heroSubheading || FALLBACK.heroSubheading,
    heroSubheadingRu: r.heroSubheadingRu || FALLBACK.heroSubheadingRu,

    whatIsHeading: r.whatIsHeading || FALLBACK.whatIsHeading,
    whatIsHeadingRu: r.whatIsHeadingRu || FALLBACK.whatIsHeadingRu,
    whatIsBody: r.whatIsBody || FALLBACK.whatIsBody,
    whatIsBodyRu: r.whatIsBodyRu || FALLBACK.whatIsBodyRu,

    scheduleHeading: r.scheduleHeading || FALLBACK.scheduleHeading,
    scheduleHeadingRu: r.scheduleHeadingRu || FALLBACK.scheduleHeadingRu,
    cohortDates:
      r.cohortDates && r.cohortDates.length > 0
        ? r.cohortDates
        : FALLBACK.cohortDates,

    whatYouGetHeading:
      r.whatYouGetHeading || FALLBACK.whatYouGetHeading,
    whatYouGetHeadingRu:
      r.whatYouGetHeadingRu || FALLBACK.whatYouGetHeadingRu,
    whatYouGet:
      r.whatYouGet && r.whatYouGet.length > 0
        ? r.whatYouGet
        : FALLBACK.whatYouGet,

    applicationStepsHeading:
      r.applicationStepsHeading || FALLBACK.applicationStepsHeading,
    applicationStepsHeadingRu:
      r.applicationStepsHeadingRu || FALLBACK.applicationStepsHeadingRu,
    applicationSteps:
      r.applicationSteps && r.applicationSteps.length > 0
        ? r.applicationSteps
        : FALLBACK.applicationSteps,

    interestFormHeading:
      r.interestFormHeading || FALLBACK.interestFormHeading,
    interestFormHeadingRu:
      r.interestFormHeadingRu || FALLBACK.interestFormHeadingRu,
    interestFormSubheading:
      r.interestFormSubheading || FALLBACK.interestFormSubheading,
    interestFormSubheadingRu:
      r.interestFormSubheadingRu || FALLBACK.interestFormSubheadingRu,
    interestFormSubmitLabel:
      r.interestFormSubmitLabel || FALLBACK.interestFormSubmitLabel,
    interestFormSubmitLabelRu:
      r.interestFormSubmitLabelRu || FALLBACK.interestFormSubmitLabelRu,
    interestFormSubmittingLabel:
      r.interestFormSubmittingLabel || FALLBACK.interestFormSubmittingLabel,
    interestFormSubmittingLabelRu:
      r.interestFormSubmittingLabelRu ||
      FALLBACK.interestFormSubmittingLabelRu,
    interestFormDisclaimer:
      r.interestFormDisclaimer || FALLBACK.interestFormDisclaimer,
    interestFormDisclaimerRu:
      r.interestFormDisclaimerRu || FALLBACK.interestFormDisclaimerRu,
    interestFormSuccessHeading:
      r.interestFormSuccessHeading || FALLBACK.interestFormSuccessHeading,
    interestFormSuccessHeadingRu:
      r.interestFormSuccessHeadingRu ||
      FALLBACK.interestFormSuccessHeadingRu,
    interestFormSuccessBody:
      r.interestFormSuccessBody || FALLBACK.interestFormSuccessBody,
    interestFormSuccessBodyRu:
      r.interestFormSuccessBodyRu || FALLBACK.interestFormSuccessBodyRu,
    interestFormErrorMissing:
      r.interestFormErrorMissing || FALLBACK.interestFormErrorMissing,
    interestFormErrorMissingRu:
      r.interestFormErrorMissingRu || FALLBACK.interestFormErrorMissingRu,
    interestFormErrorInvalidEmail:
      r.interestFormErrorInvalidEmail ||
      FALLBACK.interestFormErrorInvalidEmail,
    interestFormErrorInvalidEmailRu:
      r.interestFormErrorInvalidEmailRu ||
      FALLBACK.interestFormErrorInvalidEmailRu,
    interestFormErrorGeneric:
      r.interestFormErrorGeneric || FALLBACK.interestFormErrorGeneric,
    interestFormErrorGenericRu:
      r.interestFormErrorGenericRu || FALLBACK.interestFormErrorGenericRu,
    interestFormFirstNameLabel:
      r.interestFormFirstNameLabel || FALLBACK.interestFormFirstNameLabel,
    interestFormFirstNameLabelRu:
      r.interestFormFirstNameLabelRu ||
      FALLBACK.interestFormFirstNameLabelRu,
    interestFormFirstNamePlaceholder:
      r.interestFormFirstNamePlaceholder ||
      FALLBACK.interestFormFirstNamePlaceholder,
    interestFormFirstNamePlaceholderRu:
      r.interestFormFirstNamePlaceholderRu ||
      FALLBACK.interestFormFirstNamePlaceholderRu,
    interestFormEmailLabel:
      r.interestFormEmailLabel || FALLBACK.interestFormEmailLabel,
    interestFormEmailLabelRu:
      r.interestFormEmailLabelRu || FALLBACK.interestFormEmailLabelRu,
    interestFormEmailPlaceholder:
      r.interestFormEmailPlaceholder || FALLBACK.interestFormEmailPlaceholder,
    interestFormEmailPlaceholderRu:
      r.interestFormEmailPlaceholderRu ||
      FALLBACK.interestFormEmailPlaceholderRu,

    faqsHeading: r.faqsHeading || FALLBACK.faqsHeading,
    faqsHeadingRu: r.faqsHeadingRu || FALLBACK.faqsHeadingRu,
    faqs: r.faqs && r.faqs.length > 0 ? r.faqs : FALLBACK.faqs,

    bottomCtaHeading: r.bottomCtaHeading || FALLBACK.bottomCtaHeading,
    bottomCtaHeadingRu: r.bottomCtaHeadingRu || FALLBACK.bottomCtaHeadingRu,
    bottomCtaSubheading:
      r.bottomCtaSubheading || FALLBACK.bottomCtaSubheading,
    bottomCtaSubheadingRu:
      r.bottomCtaSubheadingRu || FALLBACK.bottomCtaSubheadingRu,
    primaryLabel: r.primaryLabel || FALLBACK.primaryLabel,
    primaryLabelRu: r.primaryLabelRu || FALLBACK.primaryLabelRu,
    primaryUrl: r.primaryUrl || FALLBACK.primaryUrl,
    secondaryLabel: r.secondaryLabel || FALLBACK.secondaryLabel,
    secondaryLabelRu: r.secondaryLabelRu || FALLBACK.secondaryLabelRu,
    secondaryUrl: r.secondaryUrl || FALLBACK.secondaryUrl,
    ctaCardArrowLabel: r.ctaCardArrowLabel || FALLBACK.ctaCardArrowLabel,
    ctaCardArrowLabelRu:
      r.ctaCardArrowLabelRu || FALLBACK.ctaCardArrowLabelRu,
    crosslinkInvolvedLabel:
      r.crosslinkInvolvedLabel || FALLBACK.crosslinkInvolvedLabel,
    crosslinkInvolvedLabelRu:
      r.crosslinkInvolvedLabelRu || FALLBACK.crosslinkInvolvedLabelRu,
    crosslinkInvolvedUrl:
      r.crosslinkInvolvedUrl || FALLBACK.crosslinkInvolvedUrl,
    crosslinkStoriesLabel:
      r.crosslinkStoriesLabel || FALLBACK.crosslinkStoriesLabel,
    crosslinkStoriesLabelRu:
      r.crosslinkStoriesLabelRu || FALLBACK.crosslinkStoriesLabelRu,
    crosslinkStoriesUrl:
      r.crosslinkStoriesUrl || FALLBACK.crosslinkStoriesUrl,
  };
}

// ── Bilingual helpers ─────────────────────────────────────────────────────────

type CohortStringField =
  | "heroBadge"
  | "heroHeading"
  | "heroSubheading"
  | "whatIsHeading"
  | "whatIsBody"
  | "scheduleHeading"
  | "whatYouGetHeading"
  | "applicationStepsHeading"
  | "interestFormHeading"
  | "interestFormSubheading"
  | "interestFormSubmitLabel"
  | "interestFormSubmittingLabel"
  | "interestFormDisclaimer"
  | "interestFormSuccessHeading"
  | "interestFormSuccessBody"
  | "interestFormErrorMissing"
  | "interestFormErrorInvalidEmail"
  | "interestFormErrorGeneric"
  | "interestFormFirstNameLabel"
  | "interestFormFirstNamePlaceholder"
  | "interestFormEmailLabel"
  | "interestFormEmailPlaceholder"
  | "faqsHeading"
  | "bottomCtaHeading"
  | "bottomCtaSubheading"
  | "primaryLabel"
  | "secondaryLabel"
  | "ctaCardArrowLabel"
  | "crosslinkInvolvedLabel"
  | "crosslinkStoriesLabel";

export function getCohortCopy(
  data: CohortPageData,
  field: CohortStringField,
  isCentralAsia: boolean
): string {
  const ruField = `${field}Ru` as keyof CohortPageData;
  const english = data[field] as string | undefined;
  const russian = data[ruField] as string | undefined;
  return getLocalized(english, russian, isCentralAsia);
}

export function getCohortDateLabel(date: CohortDate, isCentralAsia: boolean): string {
  return getLocalized(date.label, date.labelRu, isCentralAsia);
}

export function getCohortDateLocation(date: CohortDate, isCentralAsia: boolean): string {
  return getLocalized(date.location, date.locationRu, isCentralAsia);
}

export function getCohortDateDurationLine(
  date: CohortDate,
  isCentralAsia: boolean
): string {
  return getLocalized(date.durationLine, date.durationLineRu, isCentralAsia);
}

export function getCohortDateGroupSizeLine(
  date: CohortDate,
  isCentralAsia: boolean
): string {
  return getLocalized(date.groupSizeLine, date.groupSizeLineRu, isCentralAsia);
}

export function getCohortDateTopicsLine(
  date: CohortDate,
  isCentralAsia: boolean
): string {
  return getLocalized(date.topicsLine, date.topicsLineRu, isCentralAsia);
}

export function getCohortItemLabel(
  item: { label?: string; labelRu?: string },
  isCentralAsia: boolean
): string {
  return getLocalized(item.label, item.labelRu, isCentralAsia);
}

export function getCohortItemDescription(
  item: { description?: string; descriptionRu?: string },
  isCentralAsia: boolean
): string {
  return getLocalized(item.description, item.descriptionRu, isCentralAsia);
}

export function getCohortStepTitle(
  step: CohortApplicationStep,
  isCentralAsia: boolean
): string {
  return getLocalized(step.title, step.titleRu, isCentralAsia);
}

export function getCohortStepDescription(
  step: CohortApplicationStep,
  isCentralAsia: boolean
): string {
  return getLocalized(step.description, step.descriptionRu, isCentralAsia);
}

export function getCohortFaqQuestion(faq: CohortFaq, isCentralAsia: boolean): string {
  return getLocalized(faq.question, faq.questionRu, isCentralAsia);
}

export function getCohortFaqAnswer(faq: CohortFaq, isCentralAsia: boolean): string {
  return getLocalized(faq.answer, faq.answerRu, isCentralAsia);
}

// Re-export the fallback for callers (tests, storybook, etc.).
export const FALLBACK_COHORT_PAGE: CohortPageData = shape(null);

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useCohortPage(): {
  data: CohortPageData;
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery({
    queryKey: ["cohortPage"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawCohortPage | null>(COHORT_PAGE_QUERY);
      } catch (err) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("[cohortPage] Sanity fetch failed:", err);
        }
        return null;
      }
    },
  });

  return {
    data: shape(data ?? null),
    isLoading,
  };
}
