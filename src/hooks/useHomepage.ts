/**
 * Hooks for the homepage Sanity content: hero, mission section, impact stats.
 *
 * Each hook follows the same pattern as useSiteSettings / useBlogPosts:
 *   - GROQ query via React Query
 *   - Hardcoded fallback if Sanity is unreachable or doc missing
 *   - Localized helpers exposed via `getX(isCentralAsia)` methods
 */
import { useQuery } from "@tanstack/react-query";
import { sanity, imageUrl } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";

// ─── Hero ──────────────────────────────────────────────────────────────

export interface HomepageHero {
  heading: string;
  headingRu: string;
  subheading: string;
  subheadingRu: string;
  backgroundImageUrl: string;
  primaryCtaLabel: string;
  primaryCtaLabelRu: string;
  primaryCtaUrl: string;
  secondaryCtaLabel: string;
  secondaryCtaLabelRu: string;
  getHeading: (isCentralAsia: boolean) => string;
  getSubheading: (isCentralAsia: boolean) => string;
  getPrimaryCtaLabel: (isCentralAsia: boolean) => string;
  getSecondaryCtaLabel: (isCentralAsia: boolean) => string;
}

const HERO_FALLBACK = {
  heading: "Hope That Builds",
  headingRu: "Надежда, Которая Строит",
  subheading: "So that the hopeless can find hope -- and the hopeful can multiply it.",
  subheadingRu:
    "Чтобы потерявшие надежду могли её обрести — а обретшие надежду могли её приумножить.",
  backgroundImageUrl: "/images/hero-bg.webp",
  primaryCtaLabel: "Start Learning (Free)",
  primaryCtaLabelRu: "Начать обучение (бесплатно)",
  primaryCtaUrl: "#programs-section",
  secondaryCtaLabel: "Support a Future Entrepreneur",
  secondaryCtaLabelRu: "Поддержать будущего предпринимателя",
};

const HERO_QUERY = /* groq */ `
  *[_type == "homepageHero"][0]{
    heading,
    headingRu,
    subheading,
    subheadingRu,
    "backgroundImage": backgroundImage{..., "alt": alt},
    primaryCtaLabel,
    primaryCtaLabelRu,
    primaryCtaUrl,
    secondaryCtaLabel,
    secondaryCtaLabelRu
  }
`;

interface RawHero {
  heading?: string;
  headingRu?: string;
  subheading?: string;
  subheadingRu?: string;
  backgroundImage?: { asset?: { _ref: string } } | null;
  primaryCtaLabel?: string;
  primaryCtaLabelRu?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaLabelRu?: string;
}

function mergeHero(raw: RawHero | null): HomepageHero {
  const r = raw ?? {};
  const heading = r.heading || HERO_FALLBACK.heading;
  const headingRu = r.headingRu || HERO_FALLBACK.headingRu;
  const subheading = r.subheading || HERO_FALLBACK.subheading;
  const subheadingRu = r.subheadingRu || HERO_FALLBACK.subheadingRu;
  const primaryCtaLabel = r.primaryCtaLabel || HERO_FALLBACK.primaryCtaLabel;
  const primaryCtaLabelRu = r.primaryCtaLabelRu || HERO_FALLBACK.primaryCtaLabelRu;
  const secondaryCtaLabel = r.secondaryCtaLabel || HERO_FALLBACK.secondaryCtaLabel;
  const secondaryCtaLabelRu =
    r.secondaryCtaLabelRu || HERO_FALLBACK.secondaryCtaLabelRu;

  return {
    heading,
    headingRu,
    subheading,
    subheadingRu,
    backgroundImageUrl: r.backgroundImage?.asset
      ? imageUrl(r.backgroundImage as any, 1920)
      : HERO_FALLBACK.backgroundImageUrl,
    primaryCtaLabel,
    primaryCtaLabelRu,
    primaryCtaUrl: r.primaryCtaUrl || HERO_FALLBACK.primaryCtaUrl,
    secondaryCtaLabel,
    secondaryCtaLabelRu,
    getHeading: (isCA) => getLocalized(heading, headingRu, isCA),
    getSubheading: (isCA) => getLocalized(subheading, subheadingRu, isCA),
    getPrimaryCtaLabel: (isCA) =>
      getLocalized(primaryCtaLabel, primaryCtaLabelRu, isCA),
    getSecondaryCtaLabel: (isCA) =>
      getLocalized(secondaryCtaLabel, secondaryCtaLabelRu, isCA),
  };
}

export function useHomepageHero(): { hero: HomepageHero; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["homepageHero"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawHero | null>(HERO_QUERY);
      } catch {
        return null;
      }
    },
  });
  return { hero: mergeHero(data ?? null), isLoading };
}

// ─── Mission section ─────────────────────────────────────────────────────

export interface ValueCard {
  title: string;
  titleRu: string;
  description: string;
  descriptionRu: string;
}

export interface HomepageMission {
  heading: string;
  headingRu: string;
  missionStatement: string;
  missionStatementRu: string;
  vision: string;
  visionRu: string;
  valueCards: ValueCard[];
  ctaLabel: string;
  ctaLabelRu: string;
  ctaUrl: string;
  getCardsLocalized: (isCentralAsia: boolean) => Array<{
    title: string;
    description: string;
  }>;
}

const MISSION_FALLBACK = {
  heading: "Our Mission",
  headingRu: "Наша миссия",
  missionStatement:
    "Businesses Beyond Borders exists to bring hope to the hopeless -- equipping diligent people to build dignified, sustainable lives through financial literacy, entrepreneurship, and opportunity.",
  missionStatementRu:
    "Businesses Beyond Borders существует, чтобы принести надежду тем, кто её потерял — вооружая трудолюбивых людей знаниями и возможностями для достойной и устойчивой жизни через финансовую грамотность, предпринимательство и реальные шансы.",
  vision:
    "Our vision: a world where people see hope right where they are, and build it for someone else.",
  visionRu:
    "Наше видение: мир, в котором люди видят надежду прямо там, где они есть, и строят её для кого-то другого.",
  valueCards: [
    {
      title: "Poverty isn't laziness",
      titleRu: "Бедность — это не лень",
      description: "It's a lack of access to knowledge, tools, and opportunity.",
      descriptionRu: "Это нехватка доступа к знаниям, инструментам и возможностям.",
    },
    {
      title: "Entrepreneurship is dignity",
      titleRu: "Предпринимательство — это достоинство",
      description: "Building something of your own transforms families and communities.",
      descriptionRu: "Создание своего дела преображает семьи и целые сообщества.",
    },
    {
      title: "You can help from anywhere",
      titleRu: "Вы можете помочь отсюда",
      description: "Your time, skills, or support can change someone's trajectory.",
      descriptionRu: "Ваши знания, время и поддержка способны изменить чью-то судьбу.",
    },
  ],
  ctaLabel: "Read Our Story",
  ctaLabelRu: "Наша история",
  ctaUrl: "/about",
};

const MISSION_QUERY = /* groq */ `
  *[_type == "homepageMission"][0]{
    heading,
    headingRu,
    missionStatement,
    missionStatementRu,
    vision,
    visionRu,
    valueCards,
    ctaLabel,
    ctaLabelRu,
    ctaUrl
  }
`;

function mergeMission(raw: Partial<HomepageMission> | null): HomepageMission {
  const r = (raw ?? {}) as Partial<HomepageMission>;
  const cards =
    r.valueCards && r.valueCards.length > 0
      ? r.valueCards
      : MISSION_FALLBACK.valueCards;

  const heading = r.heading || MISSION_FALLBACK.heading;
  const headingRu = r.headingRu || MISSION_FALLBACK.headingRu;
  const missionStatement = r.missionStatement || MISSION_FALLBACK.missionStatement;
  const missionStatementRu =
    r.missionStatementRu || MISSION_FALLBACK.missionStatementRu;
  const vision = r.vision || MISSION_FALLBACK.vision;
  const visionRu = r.visionRu || MISSION_FALLBACK.visionRu;
  const ctaLabel = r.ctaLabel || MISSION_FALLBACK.ctaLabel;
  const ctaLabelRu = r.ctaLabelRu || MISSION_FALLBACK.ctaLabelRu;

  return {
    heading,
    headingRu,
    missionStatement,
    missionStatementRu,
    vision,
    visionRu,
    valueCards: cards,
    ctaLabel,
    ctaLabelRu,
    ctaUrl: r.ctaUrl || MISSION_FALLBACK.ctaUrl,
    getCardsLocalized: (isCA) =>
      cards.map((c) => ({
        title: getLocalized(c.title, c.titleRu, isCA),
        description: getLocalized(c.description, c.descriptionRu, isCA),
      })),
  };
}

export function useHomepageMission(): { mission: HomepageMission; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["homepageMission"],
    queryFn: async () => {
      try {
        return await sanity.fetch<Partial<HomepageMission> | null>(MISSION_QUERY);
      } catch {
        return null;
      }
    },
  });
  return { mission: mergeMission(data ?? null), isLoading };
}

// ─── Impact stats ────────────────────────────────────────────────────────

export interface ImpactStat {
  _id: string;
  value: number;
  suffix: string;
  label: string;
  labelRu: string;
  order: number;
  active: boolean;
}

const STATS_FALLBACK: ImpactStat[] = [
  { _id: "stat-1", value: 150, suffix: "+", label: "Entrepreneurs Activated", labelRu: "Предпринимателей обучено", order: 10, active: true },
  { _id: "stat-2", value: 50, suffix: "+", label: "Businesses Equipped", labelRu: "Бизнесов запущено", order: 20, active: true },
  { _id: "stat-3", value: 100, suffix: "%", label: "Program Success Rate", labelRu: "Успешность программы", order: 30, active: true },
  { _id: "stat-4", value: 6, suffix: "+", label: "Communities Empowered", labelRu: "Сообществ охвачено", order: 40, active: true },
];

const STATS_QUERY = /* groq */ `
  *[_type == "impactStat" && active == true] | order(order asc){
    _id,
    value,
    suffix,
    label,
    labelRu,
    order,
    active
  }
`;

export function useImpactStats(): { stats: ImpactStat[]; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["impactStats"],
    queryFn: async () => {
      try {
        return await sanity.fetch<ImpactStat[]>(STATS_QUERY);
      } catch {
        return null;
      }
    },
  });
  const stats = data && data.length > 0 ? data : STATS_FALLBACK;
  return { stats, isLoading };
}

/** Helper: map ImpactStat[] to the localized {label, value, suffix} shape components consume. */
export function localizeStats(stats: ImpactStat[], isCentralAsia: boolean) {
  return stats.map((s) => ({
    label: getLocalized(s.label, s.labelRu, isCentralAsia),
    number: s.value,
    suffix: s.suffix ?? "",
  }));
}
