/**
 * /partner-application page-specific Sanity content (singleton).
 *
 * Owns hero badge + intro paragraphs, the partnership-principles cards
 * (rendered as 'whatWeLookFor' tier cards), the ways-to-partner section,
 * the optional how-it-works steps, the 'what we ask' benefits panel,
 * the optional FAQ accordions, and the optional bottom CTA.
 *
 * Form heading + subheading, button labels, success messages, and per-field
 * labels still live on `formSettings` (Agent V wired those) — this hook
 * only owns the surrounding landing copy.
 *
 * Hardcoded fallbacks mirror the bilingual copy that `PartnerApplication.tsx`
 * used before CMS wiring, so the page never breaks if Sanity is unreachable.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized, getLocalizedArray } from "@/lib/localized";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PartnershipTier {
  _key?: string;
  name?: string;
  nameRu?: string;
  description?: string;
  descriptionRu?: string;
  idealFor?: string;
  idealForRu?: string;
  icon?: string;
  hideForCentralAsia?: boolean;
}

export interface PartnerHowItWorksStep {
  _key?: string;
  stepNumber?: number;
  title?: string;
  titleRu?: string;
  description?: string;
  descriptionRu?: string;
  icon?: string;
}

export interface PartnerBenefit {
  _key?: string;
  label?: string;
  labelRu?: string;
  description?: string;
  descriptionRu?: string;
  icon?: string;
}

export interface PartnerFaq {
  _key?: string;
  question?: string;
  questionRu?: string;
  answer?: string;
  answerRu?: string;
}

export interface PartnerApplicationPageData {
  // Hero
  heroBadge?: string;
  heroBadgeRu?: string;
  heroHeading?: string;
  heroHeadingRu?: string;
  heroSubheading?: string;
  heroSubheadingRu?: string;
  heroIntroParagraphs?: string[];
  heroIntroParagraphsRu?: string[];

  // What we look for / partnership principles / ways to partner
  whatWeLookForBadge?: string;
  whatWeLookForBadgeRu?: string;
  whatWeLookForHeading?: string;
  whatWeLookForHeadingRu?: string;
  whatWeLookForIntro?: string[];
  whatWeLookForIntroRu?: string[];
  whatWeLookFor: PartnershipTier[];

  // How it works
  howItWorksHeading?: string;
  howItWorksHeadingRu?: string;
  howItWorksIntro?: string;
  howItWorksIntroRu?: string;
  howItWorksSteps: PartnerHowItWorksStep[];

  // Benefits / what we ask
  benefitsHeading?: string;
  benefitsHeadingRu?: string;
  benefits: PartnerBenefit[];

  // FAQs
  faqsHeading?: string;
  faqsHeadingRu?: string;
  faqs: PartnerFaq[];

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

const FALLBACK: PartnerApplicationPageData = {
  // Hero
  heroBadge: "Organizational Partnerships",
  heroBadgeRu: "Организационное партнёрство",

  // What we look for / partnership principles
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
      icon: "Handshake",
      name: "Mutual Respect & Shared Ownership",
      nameRu: "Взаимное уважение и совместное владение",
      description:
        "Partnerships are co-designed. We don't impose models -- we build together based on local strengths and shared goals.",
      descriptionRu:
        "Партнёрство строится совместно. Мы не навязываем готовые модели — мы создаём их вместе, опираясь на местные сильные стороны и общие цели.",
    },
    {
      _key: "principle-local-roots",
      icon: "Globe",
      name: "Local Roots, Global Support",
      nameRu: "Местные корни, международная поддержка",
      description:
        "Programs are delivered by local leaders in local languages. Partners provide the cultural context; BBB provides the curriculum and training.",
      descriptionRu:
        "Программы реализуют местные лидеры на родных языках. Партнёры обеспечивают культурный контекст; BBB предоставляет учебные материалы и методическую поддержку.",
    },
    {
      _key: "principle-capacity-building",
      icon: "Users",
      name: "Capacity Building First",
      nameRu: "Прежде всего — развитие потенциала",
      description:
        "We transfer knowledge and resources so partners can sustain and expand programs independently. The goal is lasting impact, not dependency.",
      descriptionRu:
        "Мы передаём знания и ресурсы, чтобы партнёры могли самостоятельно поддерживать и расширять программы. Цель — устойчивое воздействие, а не зависимость.",
    },
    {
      _key: "principle-accountability",
      icon: "Target",
      name: "Accountability & Transparency",
      nameRu: "Ответственность и прозрачность",
      description:
        "We measure outcomes, report impact openly, and hold ourselves to the highest standards of nonprofit governance.",
      descriptionRu:
        "Мы измеряем результаты, открыто публикуем отчёты о достижениях и придерживаемся высочайших стандартов управления некоммерческой организацией.",
    },
  ],

  // How it works (defaults to ways-to-partner cards)
  howItWorksHeading: "How Organizations Partner With BBB",
  howItWorksHeadingRu: "Как организации сотрудничают с BBB",
  howItWorksSteps: [
    {
      _key: "way-corporate",
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

  // Benefits / what we ask
  benefitsHeading: "What We'll Ask of You",
  benefitsHeadingRu: "Что мы ожидаем от вас",
  benefits: [
    {
      _key: "ask-values",
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
      icon: "Clock",
      label: "Long-Term Thinking",
      labelRu: "Долгосрочная перспектива",
      description:
        "Sustainable change takes time. We prioritize multi-year commitments over one-off engagements. The entrepreneurs we serve deserve consistency.",
      descriptionRu:
        "Устойчивые изменения требуют времени. Мы отдаём приоритет долгосрочным обязательствам перед разовыми акциями. Предприниматели, которым мы служим, заслуживают постоянства.",
    },
  ],

  // FAQs (defaults to empty)
  faqsHeading: "Common Questions",
  faqsHeadingRu: "Частые вопросы",
  faqs: [],

  // Bottom CTA (defaults to empty)
};

// ── GROQ query ────────────────────────────────────────────────────────────────

const PARTNER_PAGE_QUERY = /* groq */ `
  *[_id == "partnerApplicationPage"][0]{
    heroBadge, heroBadgeRu,
    heroHeading, heroHeadingRu,
    heroSubheading, heroSubheadingRu,
    heroIntroParagraphs, heroIntroParagraphsRu,
    whatWeLookForBadge, whatWeLookForBadgeRu,
    whatWeLookForHeading, whatWeLookForHeadingRu,
    whatWeLookForIntro, whatWeLookForIntroRu,
    whatWeLookFor[]{
      _key,
      name, nameRu,
      description, descriptionRu,
      idealFor, idealForRu,
      icon,
      hideForCentralAsia
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

interface RawPartnerApplicationPage {
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
  whatWeLookFor?: PartnershipTier[];
  howItWorksHeading?: string;
  howItWorksHeadingRu?: string;
  howItWorksIntro?: string;
  howItWorksIntroRu?: string;
  howItWorksSteps?: PartnerHowItWorksStep[];
  benefitsHeading?: string;
  benefitsHeadingRu?: string;
  benefits?: PartnerBenefit[];
  faqsHeading?: string;
  faqsHeadingRu?: string;
  faqs?: PartnerFaq[];
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
  raw: RawPartnerApplicationPage | null,
): PartnerApplicationPageData {
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
    howItWorksSteps:
      r.howItWorksSteps && r.howItWorksSteps.length > 0
        ? r.howItWorksSteps
        : FALLBACK.howItWorksSteps,

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

export function getPartnerCopy(
  data: PartnerApplicationPageData,
  field: StringField,
  isCentralAsia: boolean,
): string {
  const ruField = `${field}Ru` as keyof PartnerApplicationPageData;
  const english = data[field] as string | undefined;
  const russian = data[ruField] as string | undefined;
  return getLocalized(english, russian, isCentralAsia);
}

/** Localize the hero intro paragraph array. */
export function getPartnerHeroIntroParagraphs(
  data: PartnerApplicationPageData,
  isCentralAsia: boolean,
): string[] {
  return getLocalizedArray(
    data.heroIntroParagraphs,
    data.heroIntroParagraphsRu,
    isCentralAsia,
  );
}

/** Localize the "what we look for" intro paragraph array. */
export function getPartnerWhatWeLookForIntro(
  data: PartnerApplicationPageData,
  isCentralAsia: boolean,
): string[] {
  return getLocalizedArray(
    data.whatWeLookForIntro,
    data.whatWeLookForIntroRu,
    isCentralAsia,
  );
}

/** Localize a partnership tier name. */
export function getPartnershipTierName(
  tier: PartnershipTier,
  isCentralAsia: boolean,
): string {
  return getLocalized(tier.name, tier.nameRu, isCentralAsia);
}

export function getPartnershipTierDescription(
  tier: PartnershipTier,
  isCentralAsia: boolean,
): string {
  return getLocalized(tier.description, tier.descriptionRu, isCentralAsia);
}

export function getPartnershipTierIdealFor(
  tier: PartnershipTier,
  isCentralAsia: boolean,
): string {
  return getLocalized(tier.idealFor, tier.idealForRu, isCentralAsia);
}

/** Localize a how-it-works step. */
export function getPartnerStepTitle(
  step: PartnerHowItWorksStep,
  isCentralAsia: boolean,
): string {
  return getLocalized(step.title, step.titleRu, isCentralAsia);
}

export function getPartnerStepDescription(
  step: PartnerHowItWorksStep,
  isCentralAsia: boolean,
): string {
  return getLocalized(step.description, step.descriptionRu, isCentralAsia);
}

/** Localize a benefit / "what we ask" card. */
export function getPartnerBenefitLabel(
  benefit: PartnerBenefit,
  isCentralAsia: boolean,
): string {
  return getLocalized(benefit.label, benefit.labelRu, isCentralAsia);
}

export function getPartnerBenefitDescription(
  benefit: PartnerBenefit,
  isCentralAsia: boolean,
): string {
  return getLocalized(
    benefit.description,
    benefit.descriptionRu,
    isCentralAsia,
  );
}

/** Localize a FAQ row. */
export function getPartnerFaqQuestion(
  faq: PartnerFaq,
  isCentralAsia: boolean,
): string {
  return getLocalized(faq.question, faq.questionRu, isCentralAsia);
}

export function getPartnerFaqAnswer(
  faq: PartnerFaq,
  isCentralAsia: boolean,
): string {
  return getLocalized(faq.answer, faq.answerRu, isCentralAsia);
}

// Re-export the fallback for callers that want it (tests, storybook, etc.).
export const FALLBACK_PARTNER_APPLICATION_PAGE: PartnerApplicationPageData =
  shape(null);

// ── Hook ──────────────────────────────────────────────────────────────────────

export function usePartnerApplicationPage(): {
  data: PartnerApplicationPageData;
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery({
    queryKey: ["partnerApplicationPage"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawPartnerApplicationPage | null>(
          PARTNER_PAGE_QUERY,
        );
      } catch (err) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("[partnerApplicationPage] Sanity fetch failed:", err);
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
