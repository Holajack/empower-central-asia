/**
 * Debt-calculator-page-specific Sanity content (singleton).
 *
 * Owns every piece of bilingual copy that surrounds the interactive
 * calculator on /tools/debt-calculator: hero badge/heading/subheading,
 * how-it-works steps, methodology + footnote, next-steps cards, related
 * resources, and the bottom CTA.
 *
 * The calculator's React state (debt rows, strategy tabs, payoff
 * computation) is intentionally NOT touched by this hook — it stays
 * hardcoded in the page component.
 *
 * Hardcoded fallbacks mirror the bilingual copy that `DebtCalculator.tsx`
 * shipped with before CMS wiring, so the page never breaks if Sanity is
 * unreachable.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";
import type { PortableTextBlock } from "@/hooks/useAbout";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface HowItWorksStep {
  _key?: string;
  stepNumber?: number;
  icon?: string;
  title?: string;
  titleRu?: string;
  description?: string;
  descriptionRu?: string;
}

export interface NextStepItem {
  _key?: string;
  icon?: string;
  label?: string;
  labelRu?: string;
  description?: string;
  descriptionRu?: string;
  ctaLabel?: string;
  ctaLabelRu?: string;
  ctaUrl?: string;
}

export interface RelatedResourceCard {
  _key?: string;
  title?: string;
  titleRu?: string;
  summary?: string;
  summaryRu?: string;
  slug?: string;
}

export interface DebtCalculatorPageSeo {
  metaTitle?: string;
  metaDescription?: string;
  metaTitleRu?: string;
  metaDescriptionRu?: string;
}

export interface DebtCalculatorPageData {
  // Hero
  heroBadge: string;
  heroBadgeRu?: string;
  heroHeading: string;
  heroHeadingRu?: string;
  heroSubheading: string;
  heroSubheadingRu?: string;

  // Instructions
  instructionsHeading: string;
  instructionsHeadingRu?: string;
  instructionsBody: PortableTextBlock[];
  instructionsBodyRu: PortableTextBlock[];
  howItWorksSteps: HowItWorksStep[];

  // Methodology
  methodologyHeading: string;
  methodologyHeadingRu?: string;
  methodologyBody: PortableTextBlock[];
  methodologyBodyRu: PortableTextBlock[];
  footnote: string;
  footnoteRu?: string;

  // Next steps
  nextStepsHeading: string;
  nextStepsHeadingRu?: string;
  nextStepsIntro: string;
  nextStepsIntroRu?: string;
  nextSteps: NextStepItem[];

  // Related resources
  relatedResourcesHeading: string;
  relatedResourcesHeadingRu?: string;
  relatedResources: RelatedResourceCard[];

  // Bottom CTA
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

  // SEO
  seo?: DebtCalculatorPageSeo;
}

// ── Fallbacks (mirror initialValues + the previously-hardcoded copy) ──────────

const FALLBACK_RELATED_RESOURCES: RelatedResourceCard[] = [
  {
    _key: "rel-snowball-vs-avalanche",
    title: "Debt Snowball vs. Avalanche: Which Actually Works?",
    titleRu: "Снежный ком против лавины: что реально работает?",
    summary: "",
    summaryRu: "",
    slug: "/blog/debt-snowball-vs-avalanche-which-actually-works",
  },
  {
    _key: "rel-financial-habits",
    title: "5 Financial Habits for First-Generation Entrepreneurs",
    titleRu: "5 финансовых привычек для предпринимателей в первом поколении",
    summary: "",
    summaryRu: "",
    slug: "/blog/5-financial-habits-first-generation-entrepreneurs",
  },
];

export const FALLBACK: DebtCalculatorPageData = {
  // Hero
  heroBadge: "Free Interactive Tool",
  heroBadgeRu: "Бесплатный интерактивный инструмент",
  heroHeading: "Debt Payoff Calculator",
  heroHeadingRu: "Калькулятор погашения долгов",
  heroSubheading:
    "Compare snowball vs. avalanche strategies and see exactly when you'll be debt-free.",
  heroSubheadingRu:
    "Сравните стратегии снежного кома и лавины и узнайте, когда именно вы избавитесь от долгов.",

  // Instructions
  instructionsHeading: "How to use this calculator",
  instructionsHeadingRu: "Как пользоваться калькулятором",
  instructionsBody: [],
  instructionsBodyRu: [],
  howItWorksSteps: [],

  // Methodology
  methodologyHeading: "How the math works",
  methodologyHeadingRu: "Как считается результат",
  methodologyBody: [],
  methodologyBodyRu: [],
  footnote: "",
  footnoteRu: "",

  // Next steps
  nextStepsHeading: "What to do next",
  nextStepsHeadingRu: "Что делать дальше",
  nextStepsIntro: "",
  nextStepsIntroRu: "",
  nextSteps: [],

  // Related resources
  relatedResourcesHeading: "Learn More",
  relatedResourcesHeadingRu: "Узнать больше",
  relatedResources: FALLBACK_RELATED_RESOURCES,

  // Bottom CTA
  bottomCtaHeading: "",
  bottomCtaHeadingRu: "",
  bottomCtaSubheading: "",
  bottomCtaSubheadingRu: "",
  primaryLabel: "Start the Free Course",
  primaryLabelRu: "Начать бесплатный курс",
  primaryUrl: "/course/financial-literacy",
  secondaryLabel: "",
  secondaryLabelRu: "",
  secondaryUrl: "",
};

// ── GROQ query ────────────────────────────────────────────────────────────────

const DEBT_CALCULATOR_PAGE_QUERY = /* groq */ `
  *[_id == "debtCalculatorPage"][0]{
    heroBadge,
    heroBadgeRu,
    heroHeading,
    heroHeadingRu,
    heroSubheading,
    heroSubheadingRu,
    instructionsHeading,
    instructionsHeadingRu,
    instructionsBody,
    instructionsBodyRu,
    howItWorksSteps,
    methodologyHeading,
    methodologyHeadingRu,
    methodologyBody,
    methodologyBodyRu,
    footnote,
    footnoteRu,
    nextStepsHeading,
    nextStepsHeadingRu,
    nextStepsIntro,
    nextStepsIntroRu,
    nextSteps,
    relatedResourcesHeading,
    relatedResourcesHeadingRu,
    relatedResources,
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
    "seo": seo{
      metaTitle,
      metaDescription,
      metaTitleRu,
      metaDescriptionRu
    }
  }
`;

interface RawDebtCalculatorPage {
  heroBadge?: string;
  heroBadgeRu?: string;
  heroHeading?: string;
  heroHeadingRu?: string;
  heroSubheading?: string;
  heroSubheadingRu?: string;
  instructionsHeading?: string;
  instructionsHeadingRu?: string;
  instructionsBody?: PortableTextBlock[];
  instructionsBodyRu?: PortableTextBlock[];
  howItWorksSteps?: HowItWorksStep[];
  methodologyHeading?: string;
  methodologyHeadingRu?: string;
  methodologyBody?: PortableTextBlock[];
  methodologyBodyRu?: PortableTextBlock[];
  footnote?: string;
  footnoteRu?: string;
  nextStepsHeading?: string;
  nextStepsHeadingRu?: string;
  nextStepsIntro?: string;
  nextStepsIntroRu?: string;
  nextSteps?: NextStepItem[];
  relatedResourcesHeading?: string;
  relatedResourcesHeadingRu?: string;
  relatedResources?: RelatedResourceCard[];
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
  seo?: DebtCalculatorPageSeo;
}

// ── Builder ───────────────────────────────────────────────────────────────────

function shape(raw: RawDebtCalculatorPage | null): DebtCalculatorPageData {
  const r = raw ?? {};
  return {
    // Hero
    heroBadge: r.heroBadge || FALLBACK.heroBadge,
    heroBadgeRu: r.heroBadgeRu || FALLBACK.heroBadgeRu,
    heroHeading: r.heroHeading || FALLBACK.heroHeading,
    heroHeadingRu: r.heroHeadingRu || FALLBACK.heroHeadingRu,
    heroSubheading: r.heroSubheading || FALLBACK.heroSubheading,
    heroSubheadingRu: r.heroSubheadingRu || FALLBACK.heroSubheadingRu,

    // Instructions
    instructionsHeading: r.instructionsHeading || FALLBACK.instructionsHeading,
    instructionsHeadingRu:
      r.instructionsHeadingRu || FALLBACK.instructionsHeadingRu,
    instructionsBody:
      r.instructionsBody && r.instructionsBody.length > 0
        ? r.instructionsBody
        : FALLBACK.instructionsBody,
    instructionsBodyRu:
      r.instructionsBodyRu && r.instructionsBodyRu.length > 0
        ? r.instructionsBodyRu
        : FALLBACK.instructionsBodyRu,
    howItWorksSteps:
      r.howItWorksSteps && r.howItWorksSteps.length > 0
        ? r.howItWorksSteps
        : FALLBACK.howItWorksSteps,

    // Methodology
    methodologyHeading: r.methodologyHeading || FALLBACK.methodologyHeading,
    methodologyHeadingRu:
      r.methodologyHeadingRu || FALLBACK.methodologyHeadingRu,
    methodologyBody:
      r.methodologyBody && r.methodologyBody.length > 0
        ? r.methodologyBody
        : FALLBACK.methodologyBody,
    methodologyBodyRu:
      r.methodologyBodyRu && r.methodologyBodyRu.length > 0
        ? r.methodologyBodyRu
        : FALLBACK.methodologyBodyRu,
    footnote: r.footnote ?? FALLBACK.footnote,
    footnoteRu: r.footnoteRu ?? FALLBACK.footnoteRu,

    // Next steps
    nextStepsHeading: r.nextStepsHeading || FALLBACK.nextStepsHeading,
    nextStepsHeadingRu: r.nextStepsHeadingRu || FALLBACK.nextStepsHeadingRu,
    nextStepsIntro: r.nextStepsIntro ?? FALLBACK.nextStepsIntro,
    nextStepsIntroRu: r.nextStepsIntroRu ?? FALLBACK.nextStepsIntroRu,
    nextSteps:
      r.nextSteps && r.nextSteps.length > 0
        ? r.nextSteps
        : FALLBACK.nextSteps,

    // Related resources
    relatedResourcesHeading:
      r.relatedResourcesHeading || FALLBACK.relatedResourcesHeading,
    relatedResourcesHeadingRu:
      r.relatedResourcesHeadingRu || FALLBACK.relatedResourcesHeadingRu,
    relatedResources:
      r.relatedResources && r.relatedResources.length > 0
        ? r.relatedResources
        : FALLBACK.relatedResources,

    // Bottom CTA
    bottomCtaHeading: r.bottomCtaHeading ?? FALLBACK.bottomCtaHeading,
    bottomCtaHeadingRu: r.bottomCtaHeadingRu ?? FALLBACK.bottomCtaHeadingRu,
    bottomCtaSubheading:
      r.bottomCtaSubheading ?? FALLBACK.bottomCtaSubheading,
    bottomCtaSubheadingRu:
      r.bottomCtaSubheadingRu ?? FALLBACK.bottomCtaSubheadingRu,
    primaryLabel: r.primaryLabel || FALLBACK.primaryLabel,
    primaryLabelRu: r.primaryLabelRu || FALLBACK.primaryLabelRu,
    primaryUrl: r.primaryUrl || FALLBACK.primaryUrl,
    secondaryLabel: r.secondaryLabel ?? FALLBACK.secondaryLabel,
    secondaryLabelRu: r.secondaryLabelRu ?? FALLBACK.secondaryLabelRu,
    secondaryUrl: r.secondaryUrl ?? FALLBACK.secondaryUrl,

    seo: r.seo,
  };
}

// ── Bilingual helpers ─────────────────────────────────────────────────────────

/**
 * Pull the bilingual variant of any plain string field on the
 * debtCalculatorPage document.
 *
 * Convenience wrapper around `getLocalized` typed against the field names so
 * callers can write `getDebtCalcCopy(data, "heroHeading", isCentralAsia)`
 * instead of repeating `getLocalized(data.heroHeading, data.heroHeadingRu, …)`.
 */
type StringField =
  | "heroBadge"
  | "heroHeading"
  | "heroSubheading"
  | "instructionsHeading"
  | "methodologyHeading"
  | "footnote"
  | "nextStepsHeading"
  | "nextStepsIntro"
  | "relatedResourcesHeading"
  | "bottomCtaHeading"
  | "bottomCtaSubheading"
  | "primaryLabel"
  | "secondaryLabel";

export function getDebtCalcCopy(
  data: DebtCalculatorPageData,
  field: StringField,
  isCentralAsia: boolean
): string {
  const ruField = `${field}Ru` as keyof DebtCalculatorPageData;
  const english = data[field] as string | undefined;
  const russian = data[ruField] as string | undefined;
  return getLocalized(english, russian, isCentralAsia);
}

/** Localize a single how-it-works step. */
export function getStepTitle(
  step: HowItWorksStep,
  isCentralAsia: boolean
): string {
  return getLocalized(step.title, step.titleRu, isCentralAsia);
}
export function getStepDescription(
  step: HowItWorksStep,
  isCentralAsia: boolean
): string {
  return getLocalized(step.description, step.descriptionRu, isCentralAsia);
}

/** Localize a single next-step card. */
export function getNextStepLabel(
  item: NextStepItem,
  isCentralAsia: boolean
): string {
  return getLocalized(item.label, item.labelRu, isCentralAsia);
}
export function getNextStepDescription(
  item: NextStepItem,
  isCentralAsia: boolean
): string {
  return getLocalized(item.description, item.descriptionRu, isCentralAsia);
}
export function getNextStepCtaLabel(
  item: NextStepItem,
  isCentralAsia: boolean
): string {
  return getLocalized(item.ctaLabel, item.ctaLabelRu, isCentralAsia);
}

/**
 * Pick the right Portable Text body (English vs Russian). Falls back to the
 * English body when the Russian array is empty so the page never blanks out.
 */
export function getLocalizedBody(
  english: PortableTextBlock[],
  russian: PortableTextBlock[],
  isCentralAsia: boolean
): PortableTextBlock[] {
  if (isCentralAsia && russian.length > 0) return russian;
  return english;
}

/** Localize a single related-resource card. */
export function getRelatedResourceTitle(
  card: RelatedResourceCard,
  isCentralAsia: boolean
): string {
  return getLocalized(card.title, card.titleRu, isCentralAsia);
}
export function getRelatedResourceSummary(
  card: RelatedResourceCard,
  isCentralAsia: boolean
): string {
  return getLocalized(card.summary, card.summaryRu, isCentralAsia);
}

// Re-export the fallback shape for callers that want it (tests, storybook, etc.).
export const FALLBACK_DEBT_CALCULATOR_PAGE: DebtCalculatorPageData = shape(null);

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useDebtCalculatorPage(): {
  data: DebtCalculatorPageData;
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery({
    queryKey: ["debtCalculatorPage"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawDebtCalculatorPage | null>(
          DEBT_CALCULATOR_PAGE_QUERY
        );
      } catch (err) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("[debtCalculatorPage] Sanity fetch failed:", err);
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
