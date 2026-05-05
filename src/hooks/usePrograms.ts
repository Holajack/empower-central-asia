/**
 * Hooks for fetching the 4 program pages from Sanity:
 *   - usePrograms()          → list of all program docs (for index/nav)
 *   - useProgram(slug)       → single program by slug (for detail pages)
 *
 * Each program component falls back to the hardcoded English copy when
 * Sanity is unreachable or the doc hasn't been migrated yet — the site
 * never breaks.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity, imageUrl } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";

/**
 * Bilingual bullet used in the rich `weekOverview` shape (Business Creation
 * modules and Community Collaboration phases). One entry = one bullet point
 * in the left or right column under the accordion heading.
 */
export interface ProgramWeekBullet {
  label: string;
  labelRu?: string;
}

/**
 * One row in the program-page "What You'll Learn" accordion.
 * For Business Creation these are 4 modules; for the other programs they're
 * individual weeks. Source of truth lives on programPage.weeks in Sanity;
 * pages fall back to a hardcoded constant if Sanity is empty.
 *
 * `keyTopics`/`deliverables` are optional and carry the side-by-side bullet
 * lists for Business Creation modules and Community Collaboration phases.
 * Simple-shape rows (Financial Literacy, Leadership Development) leave them
 * undefined.
 */
export interface ProgramWeek {
  weekNumber: number;
  title: string;
  titleRu?: string;
  summary?: string;
  summaryRu?: string;
  keyTopicsHeading?: string;
  keyTopicsHeadingRu?: string;
  keyTopics?: ProgramWeekBullet[];
  deliverablesHeading?: string;
  deliverablesHeadingRu?: string;
  deliverables?: ProgramWeekBullet[];
}

/** One stat card in a program-page hero (e.g. "90%" / "Launch Success Rate"). */
export interface ProgramStat {
  value: string;
  label: string;
  labelRu?: string;
}

/** One small trust badge under a program-page hero. `icon` is a lucide-react name. */
export interface ProgramTrustBadge {
  icon: string;
  label: string;
  labelRu?: string;
}

export interface ProgramHero {
  /** Sanity slug, e.g. "financial-literacy" */
  slug: string;
  title: string;
  titleRu?: string;
  tagline: string;
  taglineRu?: string;
  heroDescription: string;
  heroDescriptionRu?: string;
  heroImageUrl?: string;
  duration: string;
  durationRu?: string;
  primaryCtaLabel: string;
  primaryCtaLabelRu?: string;
  primaryCtaUrl: string;
  secondaryCtaLabel?: string;
  secondaryCtaLabelRu?: string;
  secondaryCtaUrl?: string;
  /**
   * Curriculum rows — empty array if Sanity hasn't been seeded.
   * Pages should fall back to a hardcoded const when this is empty.
   */
  weeks: ProgramWeek[];
  /** Hero stat cards — empty array if Sanity hasn't been seeded. */
  stats: ProgramStat[];
  /** Hero trust badges — empty array if Sanity hasn't been seeded. */
  trustBadges: ProgramTrustBadge[];
  /** Localized helpers — call with isCentralAsia. */
  getTitle: (isCentralAsia: boolean) => string;
  getTagline: (isCentralAsia: boolean) => string;
  getHeroDescription: (isCentralAsia: boolean) => string;
  getDuration: (isCentralAsia: boolean) => string;
  getPrimaryCtaLabel: (isCentralAsia: boolean) => string;
  getSecondaryCtaLabel: (isCentralAsia: boolean) => string;
}

type ProgramHeroData = Omit<
  ProgramHero,
  | "getTitle"
  | "getTagline"
  | "getHeroDescription"
  | "getDuration"
  | "getPrimaryCtaLabel"
  | "getSecondaryCtaLabel"
>;

// Hardcoded fallbacks for the 4 programs — ensures the site renders even
// before Sanity is seeded, and during outages.
const PROGRAM_FALLBACKS: Record<string, ProgramHeroData> = {
  "financial-literacy": {
    slug: "financial-literacy",
    title: "Financial Literacy Program",
    titleRu: "Программа финансовой грамотности",
    tagline: "Take control of your money — and your future.",
    taglineRu: "Возьмите под контроль свои деньги — и своё будущее.",
    heroDescription:
      "Free, practical financial education with our Learn-Practice-Apply method. No jargon, no fees, no catch.",
    heroDescriptionRu:
      "Бесплатное, практическое финансовое образование. Без жаргона, без платы, без уловок.",
    duration: "6 weeks (self-paced) / 10 weeks (cohort)",
    durationRu: "6 недель (самостоятельно) / 10 недель (группа)",
    primaryCtaLabel: "Start Course Free",
    primaryCtaLabelRu: "Начать курс бесплатно",
    primaryCtaUrl: "/course/financial-literacy",
    secondaryCtaLabel: "Learn More",
    secondaryCtaLabelRu: "Подробнее",
    secondaryCtaUrl: "#program-details",
    weeks: [],
    stats: [],
    trustBadges: [],
  },
  "business-creation": {
    slug: "business-creation",
    title: "Business Creation Program",
    titleRu: "Программа создания бизнеса",
    tagline: "Turn your idea into a working business.",
    taglineRu: "Превратите свою идею в работающий бизнес.",
    heroDescription:
      "A step-by-step path from idea to revenue: validate your concept, build a lean plan, launch, and grow.",
    heroDescriptionRu:
      "Пошаговый путь от идеи до дохода: проверьте концепцию, составьте план, запустите бизнес и развивайтесь.",
    duration: "12 weeks",
    durationRu: "12 недель",
    primaryCtaLabel: "Start Course Free",
    primaryCtaLabelRu: "Начать курс бесплатно",
    primaryCtaUrl: "/course/business-creation",
    secondaryCtaLabel: "Learn More",
    secondaryCtaLabelRu: "Подробнее",
    secondaryCtaUrl: "#program-details",
    weeks: [],
    stats: [],
    trustBadges: [],
  },
  "leadership-development": {
    slug: "leadership-development",
    title: "Leadership Development Program",
    titleRu: "Программа развития лидерства",
    tagline: "Lead yourself, your family, and your community.",
    taglineRu: "Веди себя, свою семью и своё сообщество.",
    heroDescription:
      "Build the character and skills to lead — at home, at work, and in the world.",
    heroDescriptionRu:
      "Развивайте характер и навыки лидера — дома, на работе и в мире.",
    duration: "12 weeks",
    durationRu: "12 недель",
    primaryCtaLabel: "Start Course Free",
    primaryCtaLabelRu: "Начать курс бесплатно",
    primaryCtaUrl: "/course/leadership-development",
    secondaryCtaLabel: "Learn More",
    secondaryCtaLabelRu: "Подробнее",
    secondaryCtaUrl: "#program-details",
    weeks: [],
    stats: [],
    trustBadges: [],
  },
  "community-collaboration": {
    slug: "community-collaboration",
    title: "Community Collaboration",
    titleRu: "Сообщество и сотрудничество",
    tagline:
      "When communities lift each other, everyone rises.",
    taglineRu: "Когда сообщества поднимают друг друга, все растут.",
    heroDescription:
      "BBB partners with churches, civic groups, and local leaders to build sustained, dignified development.",
    heroDescriptionRu:
      "BBB сотрудничает с церквями, общественными группами и местными лидерами для устойчивого развития.",
    duration: "Ongoing",
    durationRu: "Постоянно",
    primaryCtaLabel: "Get Involved",
    primaryCtaLabelRu: "Принять участие",
    primaryCtaUrl: "/get-involved",
    secondaryCtaLabel: "Learn More",
    secondaryCtaLabelRu: "Подробнее",
    secondaryCtaUrl: "#program-details",
    weeks: [],
    stats: [],
    trustBadges: [],
  },
};

const PROGRAM_QUERY_FIELDS = /* groq */ `
  "slug": slug.current,
  title,
  titleRu,
  tagline,
  taglineRu,
  heroDescription,
  heroDescriptionRu,
  "heroImage": heroImage{..., "alt": alt},
  duration,
  durationRu,
  primaryCtaLabel,
  primaryCtaLabelRu,
  primaryCtaUrl,
  secondaryCtaLabel,
  secondaryCtaLabelRu,
  secondaryCtaUrl,
  weeks[]{
    weekNumber,
    title,
    titleRu,
    summary,
    summaryRu,
    keyTopicsHeading,
    keyTopicsHeadingRu,
    keyTopics[]{
      label,
      labelRu
    },
    deliverablesHeading,
    deliverablesHeadingRu,
    deliverables[]{
      label,
      labelRu
    }
  },
  stats[]{
    value,
    label,
    labelRu
  },
  trustBadges[]{
    icon,
    label,
    labelRu
  }
`;

interface RawProgram {
  slug: string;
  title?: string;
  titleRu?: string;
  tagline?: string;
  taglineRu?: string;
  heroDescription?: string;
  heroDescriptionRu?: string;
  heroImage?: { asset?: { _ref: string } } | null;
  duration?: string;
  durationRu?: string;
  primaryCtaLabel?: string;
  primaryCtaLabelRu?: string;
  primaryCtaUrl?: string;
  secondaryCtaLabel?: string;
  secondaryCtaLabelRu?: string;
  secondaryCtaUrl?: string;
  weeks?: ProgramWeek[] | null;
  stats?: ProgramStat[] | null;
  trustBadges?: ProgramTrustBadge[] | null;
}

function attachHelpers(p: ProgramHeroData): ProgramHero {
  return {
    ...p,
    getTitle: (isCA) => getLocalized(p.title, p.titleRu, isCA),
    getTagline: (isCA) => getLocalized(p.tagline, p.taglineRu, isCA),
    getHeroDescription: (isCA) =>
      getLocalized(p.heroDescription, p.heroDescriptionRu, isCA),
    getDuration: (isCA) => getLocalized(p.duration, p.durationRu, isCA),
    getPrimaryCtaLabel: (isCA) =>
      getLocalized(p.primaryCtaLabel, p.primaryCtaLabelRu, isCA),
    getSecondaryCtaLabel: (isCA) =>
      getLocalized(p.secondaryCtaLabel ?? "", p.secondaryCtaLabelRu, isCA),
  };
}

function mergeProgram(slug: string, raw: RawProgram | null): ProgramHero {
  const fallback = PROGRAM_FALLBACKS[slug] ?? PROGRAM_FALLBACKS["financial-literacy"];
  if (!raw) return attachHelpers(fallback);

  return attachHelpers({
    slug: raw.slug || fallback.slug,
    title: raw.title || fallback.title,
    titleRu: raw.titleRu || fallback.titleRu,
    tagline: raw.tagline || fallback.tagline,
    taglineRu: raw.taglineRu || fallback.taglineRu,
    heroDescription: raw.heroDescription || fallback.heroDescription,
    heroDescriptionRu: raw.heroDescriptionRu || fallback.heroDescriptionRu,
    heroImageUrl: raw.heroImage?.asset
      ? imageUrl(raw.heroImage as any, 1600)
      : fallback.heroImageUrl,
    duration: raw.duration || fallback.duration,
    durationRu: raw.durationRu || fallback.durationRu,
    primaryCtaLabel: raw.primaryCtaLabel || fallback.primaryCtaLabel,
    primaryCtaLabelRu: raw.primaryCtaLabelRu || fallback.primaryCtaLabelRu,
    primaryCtaUrl: raw.primaryCtaUrl || fallback.primaryCtaUrl,
    secondaryCtaLabel: raw.secondaryCtaLabel || fallback.secondaryCtaLabel,
    secondaryCtaLabelRu: raw.secondaryCtaLabelRu || fallback.secondaryCtaLabelRu,
    secondaryCtaUrl: raw.secondaryCtaUrl || fallback.secondaryCtaUrl,
    weeks: Array.isArray(raw.weeks) ? raw.weeks : [],
    stats: Array.isArray(raw.stats) ? raw.stats : [],
    trustBadges: Array.isArray(raw.trustBadges) ? raw.trustBadges : [],
  });
}

/** Fetch a single program by slug. */
export function useProgram(slug: string): { program: ProgramHero; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["program", slug],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawProgram | null>(
          `*[_type == "programPage" && slug.current == $slug][0]{${PROGRAM_QUERY_FIELDS}}`,
          { slug }
        );
      } catch {
        return null;
      }
    },
  });
  return { program: mergeProgram(slug, data ?? null), isLoading };
}

/** Fetch the list of programs (for nav menus, index pages). */
export function usePrograms(): { programs: ProgramHero[]; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["programs", "list"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawProgram[]>(
          `*[_type == "programPage"] | order(title asc){${PROGRAM_QUERY_FIELDS}}`
        );
      } catch {
        return null;
      }
    },
  });
  if (data && data.length > 0) {
    return { programs: data.map((p) => mergeProgram(p.slug, p)), isLoading };
  }
  // Fallback: serve all 4 hardcoded programs
  return {
    programs: Object.values(PROGRAM_FALLBACKS).map((p) => attachHelpers(p)),
    isLoading,
  };
}
