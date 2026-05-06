/**
 * Newsletter-page-specific Sanity content (singleton). Hero copy, the
 * "what you'll get" benefits list, the sample-issue and archive
 * callouts, the post-signup confirmation screen copy, and the bottom
 * CTA — all editable in Studio without touching code.
 *
 * Hardcoded fallbacks mirror the bilingual copy that `Newsletter.tsx`
 * used before CMS wiring, so the page never breaks if Sanity is
 * unreachable.
 *
 * Form-field labels (First Name, Email, Subscribe button text, success
 * message body, etc.) live on `formSettings` and are NOT shaped here —
 * this hook only owns the marketing copy around the form.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface NewsletterBenefit {
  _key?: string;
  label?: string;
  labelRu?: string;
  description?: string;
  descriptionRu?: string;
  icon?: string;
}

export interface NewsletterPageData {
  heroHeading: string;
  heroHeadingRu?: string;
  heroSubheading: string;
  heroSubheadingRu?: string;

  benefitsHeading: string;
  benefitsHeadingRu?: string;
  benefits: NewsletterBenefit[];

  // Inline form-field copy
  firstNameLabel: string;
  firstNameLabelRu?: string;
  firstNamePlaceholder: string;
  firstNamePlaceholderRu?: string;
  lastNameLabel: string;
  lastNameLabelRu?: string;
  lastNamePlaceholder: string;
  lastNamePlaceholderRu?: string;
  emailLabel: string;
  emailLabelRu?: string;
  phoneLabel: string;
  phoneLabelRu?: string;
  phonePlaceholder: string;
  phonePlaceholderRu?: string;
  submittingLabel: string;
  submittingLabelRu?: string;
  errorInvalidEmailTitle: string;
  errorInvalidEmailTitleRu?: string;
  errorInvalidEmailBody: string;
  errorInvalidEmailBodyRu?: string;
  errorMissingNameTitle: string;
  errorMissingNameTitleRu?: string;
  errorMissingNameBody: string;
  errorMissingNameBodyRu?: string;
  errorGenericTitle: string;
  errorGenericTitleRu?: string;
  errorGenericBody: string;
  errorGenericBodyRu?: string;

  sampleIssueHeading: string;
  sampleIssueHeadingRu?: string;
  sampleIssueDescription: string;
  sampleIssueDescriptionRu?: string;
  sampleIssueLink?: string;

  archiveHeading: string;
  archiveHeadingRu?: string;
  archiveLink?: string;

  confirmationHeading: string;
  confirmationHeadingRu?: string;
  confirmationBody: string;
  confirmationBodyRu?: string;

  bottomCtaHeading: string;
  bottomCtaHeadingRu?: string;
  bottomCtaSubheading: string;
  bottomCtaSubheadingRu?: string;
  primaryLabel: string;
  primaryLabelRu?: string;
  primaryUrl: string;
}

// ── Fallbacks (mirror schema initialValues + previously-hardcoded copy) ──────

const FALLBACK: NewsletterPageData = {
  heroHeading: "Subscribe to Our Newsletter",
  heroHeadingRu: "Подписаться на новости",
  heroSubheading:
    "Get inspiring updates about entrepreneurship development in Central Asia. Stories, program updates, and ways to make a difference.",
  heroSubheadingRu:
    "Получайте вдохновляющие новости о развитии предпринимательства в Центральной Азии. Истории успеха, обновления программ и возможности для участия.",

  benefitsHeading: "What You'll Get",
  benefitsHeadingRu: "Что вы получите",
  benefits: [
    {
      _key: "benefit-stories",
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
      label: "Free Toolkits & Resources",
      labelRu: "Бесплатные инструменты и материалы",
      description:
        "Practical worksheets, templates, and guides we send to subscribers first.",
      descriptionRu:
        "Практические рабочие листы, шаблоны и руководства, которые мы первыми отправляем подписчикам.",
      icon: "download",
    },
  ],

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

  confirmationHeading: "You're Subscribed!",
  confirmationHeadingRu: "Вы подписались!",
  confirmationBody: "",
  confirmationBodyRu: "",

  bottomCtaHeading: "",
  bottomCtaHeadingRu: "",
  bottomCtaSubheading:
    "We respect your privacy. Unsubscribe at any time.",
  bottomCtaSubheadingRu:
    "Мы уважаем вашу конфиденциальность. Отписаться можно в любой момент.",
  primaryLabel: "Visit our website",
  primaryLabelRu: "Перейти на сайт",
  primaryUrl: "/",
};

// ── GROQ query ────────────────────────────────────────────────────────────────

const NEWSLETTER_PAGE_QUERY = /* groq */ `
  *[_id == "newsletterPage"][0]{
    heroHeading,
    heroHeadingRu,
    heroSubheading,
    heroSubheadingRu,
    benefitsHeading,
    benefitsHeadingRu,
    firstNameLabel,
    firstNameLabelRu,
    firstNamePlaceholder,
    firstNamePlaceholderRu,
    lastNameLabel,
    lastNameLabelRu,
    lastNamePlaceholder,
    lastNamePlaceholderRu,
    emailLabel,
    emailLabelRu,
    phoneLabel,
    phoneLabelRu,
    phonePlaceholder,
    phonePlaceholderRu,
    submittingLabel,
    submittingLabelRu,
    errorInvalidEmailTitle,
    errorInvalidEmailTitleRu,
    errorInvalidEmailBody,
    errorInvalidEmailBodyRu,
    errorMissingNameTitle,
    errorMissingNameTitleRu,
    errorMissingNameBody,
    errorMissingNameBodyRu,
    errorGenericTitle,
    errorGenericTitleRu,
    errorGenericBody,
    errorGenericBodyRu,
    benefits[]{
      _key,
      label,
      labelRu,
      description,
      descriptionRu,
      icon
    },
    sampleIssueHeading,
    sampleIssueHeadingRu,
    sampleIssueDescription,
    sampleIssueDescriptionRu,
    sampleIssueLink,
    archiveHeading,
    archiveHeadingRu,
    archiveLink,
    confirmationHeading,
    confirmationHeadingRu,
    confirmationBody,
    confirmationBodyRu,
    bottomCtaHeading,
    bottomCtaHeadingRu,
    bottomCtaSubheading,
    bottomCtaSubheadingRu,
    primaryLabel,
    primaryLabelRu,
    primaryUrl
  }
`;

interface RawNewsletterPage {
  heroHeading?: string;
  heroHeadingRu?: string;
  heroSubheading?: string;
  heroSubheadingRu?: string;
  benefitsHeading?: string;
  benefitsHeadingRu?: string;
  benefits?: NewsletterBenefit[];
  firstNameLabel?: string;
  firstNameLabelRu?: string;
  firstNamePlaceholder?: string;
  firstNamePlaceholderRu?: string;
  lastNameLabel?: string;
  lastNameLabelRu?: string;
  lastNamePlaceholder?: string;
  lastNamePlaceholderRu?: string;
  emailLabel?: string;
  emailLabelRu?: string;
  phoneLabel?: string;
  phoneLabelRu?: string;
  phonePlaceholder?: string;
  phonePlaceholderRu?: string;
  submittingLabel?: string;
  submittingLabelRu?: string;
  errorInvalidEmailTitle?: string;
  errorInvalidEmailTitleRu?: string;
  errorInvalidEmailBody?: string;
  errorInvalidEmailBodyRu?: string;
  errorMissingNameTitle?: string;
  errorMissingNameTitleRu?: string;
  errorMissingNameBody?: string;
  errorMissingNameBodyRu?: string;
  errorGenericTitle?: string;
  errorGenericTitleRu?: string;
  errorGenericBody?: string;
  errorGenericBodyRu?: string;
  sampleIssueHeading?: string;
  sampleIssueHeadingRu?: string;
  sampleIssueDescription?: string;
  sampleIssueDescriptionRu?: string;
  sampleIssueLink?: string;
  archiveHeading?: string;
  archiveHeadingRu?: string;
  archiveLink?: string;
  confirmationHeading?: string;
  confirmationHeadingRu?: string;
  confirmationBody?: string;
  confirmationBodyRu?: string;
  bottomCtaHeading?: string;
  bottomCtaHeadingRu?: string;
  bottomCtaSubheading?: string;
  bottomCtaSubheadingRu?: string;
  primaryLabel?: string;
  primaryLabelRu?: string;
  primaryUrl?: string;
}

// ── Builder ───────────────────────────────────────────────────────────────────

function shape(raw: RawNewsletterPage | null): NewsletterPageData {
  const r = raw ?? {};
  return {
    heroHeading: r.heroHeading || FALLBACK.heroHeading,
    heroHeadingRu: r.heroHeadingRu || FALLBACK.heroHeadingRu,
    heroSubheading: r.heroSubheading || FALLBACK.heroSubheading,
    heroSubheadingRu: r.heroSubheadingRu || FALLBACK.heroSubheadingRu,

    benefitsHeading: r.benefitsHeading || FALLBACK.benefitsHeading,
    benefitsHeadingRu: r.benefitsHeadingRu || FALLBACK.benefitsHeadingRu,
    benefits:
      r.benefits && r.benefits.length > 0 ? r.benefits : FALLBACK.benefits,

    firstNameLabel: r.firstNameLabel || FALLBACK.firstNameLabel,
    firstNameLabelRu: r.firstNameLabelRu || FALLBACK.firstNameLabelRu,
    firstNamePlaceholder:
      r.firstNamePlaceholder || FALLBACK.firstNamePlaceholder,
    firstNamePlaceholderRu:
      r.firstNamePlaceholderRu || FALLBACK.firstNamePlaceholderRu,
    lastNameLabel: r.lastNameLabel || FALLBACK.lastNameLabel,
    lastNameLabelRu: r.lastNameLabelRu || FALLBACK.lastNameLabelRu,
    lastNamePlaceholder:
      r.lastNamePlaceholder || FALLBACK.lastNamePlaceholder,
    lastNamePlaceholderRu:
      r.lastNamePlaceholderRu || FALLBACK.lastNamePlaceholderRu,
    emailLabel: r.emailLabel || FALLBACK.emailLabel,
    emailLabelRu: r.emailLabelRu || FALLBACK.emailLabelRu,
    phoneLabel: r.phoneLabel || FALLBACK.phoneLabel,
    phoneLabelRu: r.phoneLabelRu || FALLBACK.phoneLabelRu,
    phonePlaceholder: r.phonePlaceholder || FALLBACK.phonePlaceholder,
    phonePlaceholderRu:
      r.phonePlaceholderRu || FALLBACK.phonePlaceholderRu,
    submittingLabel: r.submittingLabel || FALLBACK.submittingLabel,
    submittingLabelRu: r.submittingLabelRu || FALLBACK.submittingLabelRu,
    errorInvalidEmailTitle:
      r.errorInvalidEmailTitle || FALLBACK.errorInvalidEmailTitle,
    errorInvalidEmailTitleRu:
      r.errorInvalidEmailTitleRu || FALLBACK.errorInvalidEmailTitleRu,
    errorInvalidEmailBody:
      r.errorInvalidEmailBody || FALLBACK.errorInvalidEmailBody,
    errorInvalidEmailBodyRu:
      r.errorInvalidEmailBodyRu || FALLBACK.errorInvalidEmailBodyRu,
    errorMissingNameTitle:
      r.errorMissingNameTitle || FALLBACK.errorMissingNameTitle,
    errorMissingNameTitleRu:
      r.errorMissingNameTitleRu || FALLBACK.errorMissingNameTitleRu,
    errorMissingNameBody:
      r.errorMissingNameBody || FALLBACK.errorMissingNameBody,
    errorMissingNameBodyRu:
      r.errorMissingNameBodyRu || FALLBACK.errorMissingNameBodyRu,
    errorGenericTitle: r.errorGenericTitle || FALLBACK.errorGenericTitle,
    errorGenericTitleRu:
      r.errorGenericTitleRu || FALLBACK.errorGenericTitleRu,
    errorGenericBody: r.errorGenericBody || FALLBACK.errorGenericBody,
    errorGenericBodyRu: r.errorGenericBodyRu || FALLBACK.errorGenericBodyRu,

    sampleIssueHeading: r.sampleIssueHeading || FALLBACK.sampleIssueHeading,
    sampleIssueHeadingRu:
      r.sampleIssueHeadingRu || FALLBACK.sampleIssueHeadingRu,
    sampleIssueDescription:
      r.sampleIssueDescription || FALLBACK.sampleIssueDescription,
    sampleIssueDescriptionRu:
      r.sampleIssueDescriptionRu || FALLBACK.sampleIssueDescriptionRu,
    sampleIssueLink:
      r.sampleIssueLink ?? FALLBACK.sampleIssueLink,

    archiveHeading: r.archiveHeading || FALLBACK.archiveHeading,
    archiveHeadingRu: r.archiveHeadingRu || FALLBACK.archiveHeadingRu,
    archiveLink: r.archiveLink ?? FALLBACK.archiveLink,

    confirmationHeading: r.confirmationHeading || FALLBACK.confirmationHeading,
    confirmationHeadingRu:
      r.confirmationHeadingRu || FALLBACK.confirmationHeadingRu,
    confirmationBody: r.confirmationBody ?? FALLBACK.confirmationBody,
    confirmationBodyRu: r.confirmationBodyRu ?? FALLBACK.confirmationBodyRu,

    bottomCtaHeading: r.bottomCtaHeading ?? FALLBACK.bottomCtaHeading,
    bottomCtaHeadingRu: r.bottomCtaHeadingRu ?? FALLBACK.bottomCtaHeadingRu,
    bottomCtaSubheading:
      r.bottomCtaSubheading || FALLBACK.bottomCtaSubheading,
    bottomCtaSubheadingRu:
      r.bottomCtaSubheadingRu || FALLBACK.bottomCtaSubheadingRu,
    primaryLabel: r.primaryLabel || FALLBACK.primaryLabel,
    primaryLabelRu: r.primaryLabelRu || FALLBACK.primaryLabelRu,
    primaryUrl: r.primaryUrl || FALLBACK.primaryUrl,
  };
}

// ── Bilingual helpers ─────────────────────────────────────────────────────────

type NewsletterStringField =
  | "heroHeading"
  | "heroSubheading"
  | "benefitsHeading"
  | "firstNameLabel"
  | "firstNamePlaceholder"
  | "lastNameLabel"
  | "lastNamePlaceholder"
  | "emailLabel"
  | "phoneLabel"
  | "phonePlaceholder"
  | "submittingLabel"
  | "errorInvalidEmailTitle"
  | "errorInvalidEmailBody"
  | "errorMissingNameTitle"
  | "errorMissingNameBody"
  | "errorGenericTitle"
  | "errorGenericBody"
  | "sampleIssueHeading"
  | "sampleIssueDescription"
  | "archiveHeading"
  | "confirmationHeading"
  | "confirmationBody"
  | "bottomCtaHeading"
  | "bottomCtaSubheading"
  | "primaryLabel";

export function getNewsletterCopy(
  data: NewsletterPageData,
  field: NewsletterStringField,
  isCentralAsia: boolean
): string {
  const ruField = `${field}Ru` as keyof NewsletterPageData;
  const english = data[field] as string | undefined;
  const russian = data[ruField] as string | undefined;
  return getLocalized(english, russian, isCentralAsia);
}

export function getNewsletterBenefitLabel(
  benefit: NewsletterBenefit,
  isCentralAsia: boolean
): string {
  return getLocalized(benefit.label, benefit.labelRu, isCentralAsia);
}

export function getNewsletterBenefitDescription(
  benefit: NewsletterBenefit,
  isCentralAsia: boolean
): string {
  return getLocalized(benefit.description, benefit.descriptionRu, isCentralAsia);
}

// Re-export the fallback for callers (tests, storybook, etc.).
export const FALLBACK_NEWSLETTER_PAGE: NewsletterPageData = shape(null);

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useNewsletterPage(): {
  data: NewsletterPageData;
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery({
    queryKey: ["newsletterPage"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawNewsletterPage | null>(
          NEWSLETTER_PAGE_QUERY
        );
      } catch (err) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("[newsletterPage] Sanity fetch failed:", err);
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
