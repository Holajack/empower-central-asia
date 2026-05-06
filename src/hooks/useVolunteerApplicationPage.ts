/**
 * /volunteer-application page-specific Sanity content (singleton).
 *
 * Owns hero badge + intro paragraphs, the 'what to expect' key-expectation
 * cards (rendered as benefits), the volunteer-roles list, the optional
 * how-it-works steps, the optional FAQ accordions, and the optional
 * bottom CTA.
 *
 * Form heading + subheading, button labels, success messages, and per-field
 * labels still live on `formSettings` (Agent V wired those) — this hook
 * only owns the surrounding landing copy.
 *
 * Hardcoded fallbacks mirror the bilingual copy that `VolunteerApplication.tsx`
 * used before CMS wiring, so the page never breaks if Sanity is unreachable.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized, getLocalizedArray } from "@/lib/localized";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface VolunteerRole {
  _key?: string;
  label?: string;
  labelRu?: string;
  description?: string;
  descriptionRu?: string;
  timeCommitment?: string;
  timeCommitmentRu?: string;
  icon?: string;
}

export interface VolunteerHowItWorksStep {
  _key?: string;
  stepNumber?: number;
  title?: string;
  titleRu?: string;
  description?: string;
  descriptionRu?: string;
  icon?: string;
}

export interface VolunteerBenefit {
  _key?: string;
  label?: string;
  labelRu?: string;
  description?: string;
  descriptionRu?: string;
  icon?: string;
}

export interface VolunteerFaq {
  _key?: string;
  question?: string;
  questionRu?: string;
  answer?: string;
  answerRu?: string;
}

export interface VolunteerApplicationPageData {
  // Hero
  heroBadge?: string;
  heroBadgeRu?: string;
  heroHeading?: string;
  heroHeadingRu?: string;
  heroSubheading?: string;
  heroSubheadingRu?: string;
  heroIntroParagraphs?: string[];
  heroIntroParagraphsRu?: string[];

  // What we look for / volunteer roles
  whatWeLookForBadge?: string;
  whatWeLookForBadgeRu?: string;
  whatWeLookForHeading?: string;
  whatWeLookForHeadingRu?: string;
  whatWeLookForIntro?: string[];
  whatWeLookForIntroRu?: string[];
  whatWeLookFor: VolunteerRole[];

  // How it works
  howItWorksHeading?: string;
  howItWorksHeadingRu?: string;
  howItWorksIntro?: string;
  howItWorksIntroRu?: string;
  howItWorksSteps: VolunteerHowItWorksStep[];

  // Benefits / key expectations
  benefitsHeading?: string;
  benefitsHeadingRu?: string;
  benefits: VolunteerBenefit[];

  // FAQs
  faqsHeading?: string;
  faqsHeadingRu?: string;
  faqs: VolunteerFaq[];

  // Bottom CTA
  bottomCtaHeading?: string;
  bottomCtaHeadingRu?: string;
  bottomCtaSubheading?: string;
  bottomCtaSubheadingRu?: string;
  bottomCtaPrimaryLabel?: string;
  bottomCtaPrimaryLabelRu?: string;
  bottomCtaPrimaryUrl?: string;
  bottomCtaSecondaryLabel?: string;
  bottomCtaSecondaryLabelRu?: string;
  bottomCtaSecondaryUrl?: string;
}

// ── Fallbacks (mirror the previously-hardcoded copy) ─────────────────────────

const FALLBACK: VolunteerApplicationPageData = {
  // Hero
  heroBadge: "Volunteer Opportunities",
  heroBadgeRu: "Возможности для волонтёров",

  // What we look for
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

  // How it works
  howItWorksHeading: "Available Volunteer Roles",
  howItWorksHeadingRu: "Доступные роли волонтёров",
  howItWorksSteps: [],

  // Benefits / key expectations
  benefitsHeading: "What to Expect",
  benefitsHeadingRu: "Чего ожидать",
  benefits: [
    {
      _key: "benefit-time-commitment",
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
      icon: "GraduationCap",
      label: "Training Provided",
      labelRu: "Обучение предоставляется",
      description:
        "We onboard every volunteer with orientation, materials, and ongoing support from our team.",
      descriptionRu:
        "Мы проводим ориентацию для каждого волонтёра, предоставляем материалы и постоянную поддержку.",
    },
  ],

  // FAQs (defaults to empty — page only renders the section if items exist)
  faqsHeading: "Common Questions",
  faqsHeadingRu: "Частые вопросы",
  faqs: [],

  // Bottom CTA (defaults to empty — page only renders if heading is set)
};

// ── GROQ query ────────────────────────────────────────────────────────────────

const VOLUNTEER_PAGE_QUERY = /* groq */ `
  *[_id == "volunteerApplicationPage"][0]{
    heroBadge, heroBadgeRu,
    heroHeading, heroHeadingRu,
    heroSubheading, heroSubheadingRu,
    heroIntroParagraphs, heroIntroParagraphsRu,
    whatWeLookForBadge, whatWeLookForBadgeRu,
    whatWeLookForHeading, whatWeLookForHeadingRu,
    whatWeLookForIntro, whatWeLookForIntroRu,
    whatWeLookFor[]{
      _key,
      label, labelRu,
      description, descriptionRu,
      timeCommitment, timeCommitmentRu,
      icon
    },
    howItWorksHeading, howItWorksHeadingRu,
    howItWorksIntro, howItWorksIntroRu,
    howItWorksSteps[]{
      _key, stepNumber,
      title, titleRu,
      description, descriptionRu,
      icon
    },
    benefitsHeading, benefitsHeadingRu,
    benefits[]{
      _key,
      label, labelRu,
      description, descriptionRu,
      icon
    },
    faqsHeading, faqsHeadingRu,
    faqs[]{
      _key,
      question, questionRu,
      answer, answerRu
    },
    bottomCtaHeading, bottomCtaHeadingRu,
    bottomCtaSubheading, bottomCtaSubheadingRu,
    bottomCtaPrimaryLabel, bottomCtaPrimaryLabelRu, bottomCtaPrimaryUrl,
    bottomCtaSecondaryLabel, bottomCtaSecondaryLabelRu, bottomCtaSecondaryUrl
  }
`;

interface RawVolunteerApplicationPage {
  heroBadge?: string;
  heroBadgeRu?: string;
  heroHeading?: string;
  heroHeadingRu?: string;
  heroSubheading?: string;
  heroSubheadingRu?: string;
  heroIntroParagraphs?: string[];
  heroIntroParagraphsRu?: string[];
  whatWeLookForBadge?: string;
  whatWeLookForBadgeRu?: string;
  whatWeLookForHeading?: string;
  whatWeLookForHeadingRu?: string;
  whatWeLookForIntro?: string[];
  whatWeLookForIntroRu?: string[];
  whatWeLookFor?: VolunteerRole[];
  howItWorksHeading?: string;
  howItWorksHeadingRu?: string;
  howItWorksIntro?: string;
  howItWorksIntroRu?: string;
  howItWorksSteps?: VolunteerHowItWorksStep[];
  benefitsHeading?: string;
  benefitsHeadingRu?: string;
  benefits?: VolunteerBenefit[];
  faqsHeading?: string;
  faqsHeadingRu?: string;
  faqs?: VolunteerFaq[];
  bottomCtaHeading?: string;
  bottomCtaHeadingRu?: string;
  bottomCtaSubheading?: string;
  bottomCtaSubheadingRu?: string;
  bottomCtaPrimaryLabel?: string;
  bottomCtaPrimaryLabelRu?: string;
  bottomCtaPrimaryUrl?: string;
  bottomCtaSecondaryLabel?: string;
  bottomCtaSecondaryLabelRu?: string;
  bottomCtaSecondaryUrl?: string;
}

// ── Builder ───────────────────────────────────────────────────────────────────

function shape(
  raw: RawVolunteerApplicationPage | null,
): VolunteerApplicationPageData {
  const r = raw ?? {};
  return {
    heroBadge: r.heroBadge || FALLBACK.heroBadge,
    heroBadgeRu: r.heroBadgeRu || FALLBACK.heroBadgeRu,
    heroHeading: r.heroHeading || FALLBACK.heroHeading,
    heroHeadingRu: r.heroHeadingRu || FALLBACK.heroHeadingRu,
    heroSubheading: r.heroSubheading || FALLBACK.heroSubheading,
    heroSubheadingRu: r.heroSubheadingRu || FALLBACK.heroSubheadingRu,
    heroIntroParagraphs:
      r.heroIntroParagraphs && r.heroIntroParagraphs.length > 0
        ? r.heroIntroParagraphs
        : FALLBACK.heroIntroParagraphs,
    heroIntroParagraphsRu:
      r.heroIntroParagraphsRu && r.heroIntroParagraphsRu.length > 0
        ? r.heroIntroParagraphsRu
        : FALLBACK.heroIntroParagraphsRu,

    whatWeLookForBadge: r.whatWeLookForBadge || FALLBACK.whatWeLookForBadge,
    whatWeLookForBadgeRu:
      r.whatWeLookForBadgeRu || FALLBACK.whatWeLookForBadgeRu,
    whatWeLookForHeading:
      r.whatWeLookForHeading || FALLBACK.whatWeLookForHeading,
    whatWeLookForHeadingRu:
      r.whatWeLookForHeadingRu || FALLBACK.whatWeLookForHeadingRu,
    whatWeLookForIntro:
      r.whatWeLookForIntro && r.whatWeLookForIntro.length > 0
        ? r.whatWeLookForIntro
        : FALLBACK.whatWeLookForIntro,
    whatWeLookForIntroRu:
      r.whatWeLookForIntroRu && r.whatWeLookForIntroRu.length > 0
        ? r.whatWeLookForIntroRu
        : FALLBACK.whatWeLookForIntroRu,
    whatWeLookFor:
      r.whatWeLookFor && r.whatWeLookFor.length > 0
        ? r.whatWeLookFor
        : FALLBACK.whatWeLookFor,

    howItWorksHeading: r.howItWorksHeading || FALLBACK.howItWorksHeading,
    howItWorksHeadingRu:
      r.howItWorksHeadingRu || FALLBACK.howItWorksHeadingRu,
    howItWorksIntro: r.howItWorksIntro || FALLBACK.howItWorksIntro,
    howItWorksIntroRu: r.howItWorksIntroRu || FALLBACK.howItWorksIntroRu,
    howItWorksSteps: r.howItWorksSteps ?? FALLBACK.howItWorksSteps,

    benefitsHeading: r.benefitsHeading || FALLBACK.benefitsHeading,
    benefitsHeadingRu: r.benefitsHeadingRu || FALLBACK.benefitsHeadingRu,
    benefits:
      r.benefits && r.benefits.length > 0 ? r.benefits : FALLBACK.benefits,

    faqsHeading: r.faqsHeading || FALLBACK.faqsHeading,
    faqsHeadingRu: r.faqsHeadingRu || FALLBACK.faqsHeadingRu,
    faqs: r.faqs ?? FALLBACK.faqs,

    bottomCtaHeading: r.bottomCtaHeading || FALLBACK.bottomCtaHeading,
    bottomCtaHeadingRu: r.bottomCtaHeadingRu || FALLBACK.bottomCtaHeadingRu,
    bottomCtaSubheading:
      r.bottomCtaSubheading || FALLBACK.bottomCtaSubheading,
    bottomCtaSubheadingRu:
      r.bottomCtaSubheadingRu || FALLBACK.bottomCtaSubheadingRu,
    bottomCtaPrimaryLabel:
      r.bottomCtaPrimaryLabel || FALLBACK.bottomCtaPrimaryLabel,
    bottomCtaPrimaryLabelRu:
      r.bottomCtaPrimaryLabelRu || FALLBACK.bottomCtaPrimaryLabelRu,
    bottomCtaPrimaryUrl: r.bottomCtaPrimaryUrl || FALLBACK.bottomCtaPrimaryUrl,
    bottomCtaSecondaryLabel:
      r.bottomCtaSecondaryLabel || FALLBACK.bottomCtaSecondaryLabel,
    bottomCtaSecondaryLabelRu:
      r.bottomCtaSecondaryLabelRu || FALLBACK.bottomCtaSecondaryLabelRu,
    bottomCtaSecondaryUrl:
      r.bottomCtaSecondaryUrl || FALLBACK.bottomCtaSecondaryUrl,
  };
}

// ── Bilingual helpers ─────────────────────────────────────────────────────────

type StringField =
  | "heroBadge"
  | "heroHeading"
  | "heroSubheading"
  | "whatWeLookForBadge"
  | "whatWeLookForHeading"
  | "howItWorksHeading"
  | "howItWorksIntro"
  | "benefitsHeading"
  | "faqsHeading"
  | "bottomCtaHeading"
  | "bottomCtaSubheading"
  | "bottomCtaPrimaryLabel"
  | "bottomCtaSecondaryLabel";

export function getVolunteerCopy(
  data: VolunteerApplicationPageData,
  field: StringField,
  isCentralAsia: boolean,
): string {
  const ruField = `${field}Ru` as keyof VolunteerApplicationPageData;
  const english = data[field] as string | undefined;
  const russian = data[ruField] as string | undefined;
  return getLocalized(english, russian, isCentralAsia);
}

/** Localize the hero intro paragraph array. */
export function getVolunteerHeroIntroParagraphs(
  data: VolunteerApplicationPageData,
  isCentralAsia: boolean,
): string[] {
  return getLocalizedArray(
    data.heroIntroParagraphs,
    data.heroIntroParagraphsRu,
    isCentralAsia,
  );
}

/** Localize the "what we look for" intro paragraph array. */
export function getVolunteerWhatWeLookForIntro(
  data: VolunteerApplicationPageData,
  isCentralAsia: boolean,
): string[] {
  return getLocalizedArray(
    data.whatWeLookForIntro,
    data.whatWeLookForIntroRu,
    isCentralAsia,
  );
}

/** Localize a single role label. */
export function getVolunteerRoleLabel(
  role: VolunteerRole,
  isCentralAsia: boolean,
): string {
  return getLocalized(role.label, role.labelRu, isCentralAsia);
}

/** Localize a single role description. */
export function getVolunteerRoleDescription(
  role: VolunteerRole,
  isCentralAsia: boolean,
): string {
  return getLocalized(role.description, role.descriptionRu, isCentralAsia);
}

/** Localize a single role's time-commitment label. */
export function getVolunteerRoleTimeCommitment(
  role: VolunteerRole,
  isCentralAsia: boolean,
): string {
  return getLocalized(
    role.timeCommitment,
    role.timeCommitmentRu,
    isCentralAsia,
  );
}

/** Localize a benefit / key-expectation card label. */
export function getVolunteerBenefitLabel(
  benefit: VolunteerBenefit,
  isCentralAsia: boolean,
): string {
  return getLocalized(benefit.label, benefit.labelRu, isCentralAsia);
}

export function getVolunteerBenefitDescription(
  benefit: VolunteerBenefit,
  isCentralAsia: boolean,
): string {
  return getLocalized(
    benefit.description,
    benefit.descriptionRu,
    isCentralAsia,
  );
}

/** Localize a how-it-works step. */
export function getVolunteerStepTitle(
  step: VolunteerHowItWorksStep,
  isCentralAsia: boolean,
): string {
  return getLocalized(step.title, step.titleRu, isCentralAsia);
}

export function getVolunteerStepDescription(
  step: VolunteerHowItWorksStep,
  isCentralAsia: boolean,
): string {
  return getLocalized(step.description, step.descriptionRu, isCentralAsia);
}

/** Localize a FAQ row. */
export function getVolunteerFaqQuestion(
  faq: VolunteerFaq,
  isCentralAsia: boolean,
): string {
  return getLocalized(faq.question, faq.questionRu, isCentralAsia);
}

export function getVolunteerFaqAnswer(
  faq: VolunteerFaq,
  isCentralAsia: boolean,
): string {
  return getLocalized(faq.answer, faq.answerRu, isCentralAsia);
}

// Re-export the fallback for callers that want it (tests, storybook, etc.).
export const FALLBACK_VOLUNTEER_APPLICATION_PAGE: VolunteerApplicationPageData =
  shape(null);

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useVolunteerApplicationPage(): {
  data: VolunteerApplicationPageData;
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery({
    queryKey: ["volunteerApplicationPage"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawVolunteerApplicationPage | null>(
          VOLUNTEER_PAGE_QUERY,
        );
      } catch (err) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("[volunteerApplicationPage] Sanity fetch failed:", err);
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
