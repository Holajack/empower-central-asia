/**
 * Hook for the Programs & Impact landing page content from Sanity.
 *
 *   useProgramsAndImpactPage() → { page }
 *
 * Exposes localized helpers:
 *   getHeroHeading(isCA)        → string
 *   getHeroSubheading(isCA)     → string
 *   getDifferenceHeading(isCA)  → string
 *   getDifferenceBody(isCA)     → PortableTextBlock[]
 *   getMetricsHeading(isCA)     → string
 *   getMetricsLocalized(isCA)   → { value, suffix, label }[]
 *
 * Falls back to hardcoded values that mirror the current page copy when
 * Sanity hasn't been seeded yet or is unreachable.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";

// ─── Portable Text block type (reuse shape from useAbout) ─────────────────────

export type PortableTextBlock = {
  _type: string;
  _key?: string;
  style?: string;
  markDefs?: unknown[];
  children?: Array<{
    _type: string;
    _key?: string;
    marks?: string[];
    text?: string;
  }>;
};

// ─── Metric shape ─────────────────────────────────────────────────────────────

export interface ProgramMetric {
  value: number;
  suffix: string;
  label: string;
  labelRu?: string;
}

// ─── Hardcoded fallbacks — extracted from current ProgramsAndImpact.tsx ───────

const HERO_HEADING_EN = "Programs Designed to Build Real Lives";
const HERO_HEADING_RU = "Программы, созданные для настоящих жизней";

const HERO_SUBHEADING_EN =
  "Four stages. Every step earned. Free financial literacy training for anyone willing to show up -- and a path from there to owning a real business.";
const HERO_SUBHEADING_RU =
  "Бесплатное обучение финансовой грамотности для каждого, кто готов учиться. Путь от знаний — к собственному делу.";

const DIFFERENCE_HEADING_EN = "What Makes This Different";
const DIFFERENCE_HEADING_RU = "Чем мы отличаемся";

// Portable Text blocks: one block per paragraph from the existing page copy.
const DIFFERENCE_BODY_EN: PortableTextBlock[] = [
  {
    _type: "block",
    _key: "db1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "db1s1",
        marks: [],
        text: "Most organizations help people receive. BBB turns receivers into builders -- and builders into people who give someone else their first opportunity.",
      },
    ],
  },
  {
    _type: "block",
    _key: "db2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "db2s1",
        marks: [],
        text: "We are not competing with micro-lenders, curriculum organizations, or relief organizations. We are the next chapter of what they start. When the class ends, when the loan is repaid, when the initial help runs out -- BBB is what comes next.",
      },
    ],
  },
  {
    _type: "block",
    _key: "db3",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "db3s1",
        marks: [],
        text: "Not everyone advances through every stage. That's the point. The filter protects participants and produces real results. When someone receives startup capital from BBB, they've already proven -- through months of showing up, doing the work, and building the plan -- that they're ready. That's why it works.",
      },
    ],
  },
];

const DIFFERENCE_BODY_RU: PortableTextBlock[] = [
  {
    _type: "block",
    _key: "dbr1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "dbr1s1",
        marks: [],
        text: "Большинство организаций помогают людям получать. BBB превращает получателей в строителей — а строителей в людей, которые дают кому-то другому первый шанс.",
      },
    ],
  },
  {
    _type: "block",
    _key: "dbr2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "dbr2s1",
        marks: [],
        text: "Мы не конкурируем с микрокредитными организациями, образовательными проектами или благотворительными фондами. Мы — следующая глава того, что они начинают. Когда курс заканчивается, когда кредит погашен, когда первая помощь иссякает — BBB — это то, что приходит дальше.",
      },
    ],
  },
  {
    _type: "block",
    _key: "dbr3",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "dbr3s1",
        marks: [],
        text: "Не каждый проходит все этапы. В этом и суть. Фильтр защищает участников и даёт реальные результаты. Когда кто-то получает стартовый капитал от BBB, он уже доказал — месяцами усердной работы, присутствия и создания бизнес-плана — что он готов. Поэтому это работает.",
      },
    ],
  },
];

const METRICS_HEADING_EN = "Where We Are So Far";
const METRICS_HEADING_RU = "Наши результаты";

const METRICS_FALLBACK: ProgramMetric[] = [
  { value: 50, suffix: "+", label: "People Trained in Financial Literacy", labelRu: "Обучены финансовой грамотности" },
  { value: 6, suffix: "+", label: "Communities Reached", labelRu: "Охвачено сообществ" },
  { value: 150, suffix: "+", label: "Lives Directly Affected", labelRu: "Жизней затронуто напрямую" },
  { value: 3, suffix: "", label: "Countries Served", labelRu: "Стран обслуживается" },
];

// ─── Typed page shape returned by the hook ────────────────────────────────────

export interface ProgramsAndImpactPage {
  heroHeading: string;
  heroHeadingRu?: string;
  heroSubheading: string;
  heroSubheadingRu?: string;
  differenceHeading: string;
  differenceHeadingRu?: string;
  differenceBody: PortableTextBlock[];
  differenceBodyRu: PortableTextBlock[];
  metricsHeading: string;
  metricsHeadingRu?: string;
  metrics: ProgramMetric[];
  /** Localized hero heading — falls back to English when Russian absent. */
  getHeroHeading: (isCentralAsia: boolean) => string;
  /** Localized hero subheading. */
  getHeroSubheading: (isCentralAsia: boolean) => string;
  /** Localized "Our Difference" section heading. */
  getDifferenceHeading: (isCentralAsia: boolean) => string;
  /** Localized Portable Text body blocks for the "Our Difference" section. */
  getDifferenceBody: (isCentralAsia: boolean) => PortableTextBlock[];
  /** Localized metrics section heading. */
  getMetricsHeading: (isCentralAsia: boolean) => string;
  /** Metrics with label localized for the given region. */
  getMetricsLocalized: (isCentralAsia: boolean) => Array<{ value: number; suffix: string; label: string }>;
}

// ─── Raw Sanity shape ─────────────────────────────────────────────────────────

interface RawProgramsAndImpactPage {
  heroHeading?: string;
  heroHeadingRu?: string;
  heroSubheading?: string;
  heroSubheadingRu?: string;
  differenceHeading?: string;
  differenceHeadingRu?: string;
  differenceBody?: PortableTextBlock[];
  differenceBodyRu?: PortableTextBlock[];
  metricsHeading?: string;
  metricsHeadingRu?: string;
  metrics?: Array<{
    value?: number;
    suffix?: string;
    label?: string;
    labelRu?: string;
  }>;
}

// ─── GROQ query ───────────────────────────────────────────────────────────────

const QUERY = /* groq */ `
  *[_type == "programsAndImpactPage"][0]{
    heroHeading,
    heroHeadingRu,
    heroSubheading,
    heroSubheadingRu,
    differenceHeading,
    differenceHeadingRu,
    differenceBody,
    differenceBodyRu,
    metricsHeading,
    metricsHeadingRu,
    metrics[]{
      value,
      suffix,
      label,
      labelRu
    }
  }
`;

// ─── Merge raw Sanity data with fallbacks ─────────────────────────────────────

function mergePage(raw: RawProgramsAndImpactPage | null): ProgramsAndImpactPage {
  const r = raw ?? {};

  const heroHeading = r.heroHeading || HERO_HEADING_EN;
  const heroHeadingRu = r.heroHeadingRu || HERO_HEADING_RU;
  const heroSubheading = r.heroSubheading || HERO_SUBHEADING_EN;
  const heroSubheadingRu = r.heroSubheadingRu || HERO_SUBHEADING_RU;
  const differenceHeading = r.differenceHeading || DIFFERENCE_HEADING_EN;
  const differenceHeadingRu = r.differenceHeadingRu || DIFFERENCE_HEADING_RU;

  const differenceBody =
    r.differenceBody && r.differenceBody.length > 0
      ? r.differenceBody
      : DIFFERENCE_BODY_EN;
  const differenceBodyRu =
    r.differenceBodyRu && r.differenceBodyRu.length > 0
      ? r.differenceBodyRu
      : DIFFERENCE_BODY_RU;

  const metricsHeading = r.metricsHeading || METRICS_HEADING_EN;
  const metricsHeadingRu = r.metricsHeadingRu || METRICS_HEADING_RU;

  const metrics: ProgramMetric[] =
    r.metrics && r.metrics.length > 0
      ? r.metrics.map((m) => ({
          value: m.value ?? 0,
          suffix: m.suffix ?? "",
          label: m.label ?? "",
          labelRu: m.labelRu,
        }))
      : METRICS_FALLBACK;

  return {
    heroHeading,
    heroHeadingRu,
    heroSubheading,
    heroSubheadingRu,
    differenceHeading,
    differenceHeadingRu,
    differenceBody,
    differenceBodyRu,
    metricsHeading,
    metricsHeadingRu,
    metrics,
    getHeroHeading: (isCA) => getLocalized(heroHeading, heroHeadingRu, isCA),
    getHeroSubheading: (isCA) => getLocalized(heroSubheading, heroSubheadingRu, isCA),
    getDifferenceHeading: (isCA) => getLocalized(differenceHeading, differenceHeadingRu, isCA),
    getDifferenceBody: (isCA) =>
      isCA && differenceBodyRu.length > 0 ? differenceBodyRu : differenceBody,
    getMetricsHeading: (isCA) => getLocalized(metricsHeading, metricsHeadingRu, isCA),
    getMetricsLocalized: (isCA) =>
      metrics.map((m) => ({
        value: m.value,
        suffix: m.suffix,
        label: isCA && m.labelRu ? m.labelRu : m.label,
      })),
  };
}

// ─── Public hook ──────────────────────────────────────────────────────────────

export function useProgramsAndImpactPage(): {
  page: ProgramsAndImpactPage;
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery({
    queryKey: ["programsAndImpactPage"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawProgramsAndImpactPage | null>(QUERY);
      } catch {
        return null;
      }
    },
  });
  return { page: mergePage(data ?? null), isLoading };
}
