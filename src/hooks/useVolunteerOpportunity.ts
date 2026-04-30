/**
 * Hooks for fetching volunteer opportunity pages from Sanity:
 *   - useVolunteerOpportunities()   → list of all active docs (for nav/index)
 *   - useVolunteerOpportunity(slug) → single doc by slug (for detail pages)
 *
 * Each page falls back to hardcoded English/Russian copy when Sanity is
 * unreachable or the doc hasn't been seeded yet — the site never breaks.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity, imageUrl } from "@/lib/sanity";
import { getLocalized, getLocalizedArray } from "@/lib/localized";

export interface VolunteerOpportunityDoc {
  _id: string;
  slug: string;
  title: string;
  titleRu?: string;
  tagline?: string;
  taglineRu?: string;
  summary?: string;
  summaryRu?: string;
  commitment?: string;
  commitmentRu?: string;
  requirements?: string[];
  requirementsRu?: string[];
  applyUrl?: string;
  heroImageUrl?: string;
  icon?: string;
  active?: boolean;
  order: number;
  /** Localized helpers — call with isCentralAsia from RegionContext. */
  getTitle: (isCentralAsia: boolean) => string;
  getTagline: (isCentralAsia: boolean) => string;
  getSummary: (isCentralAsia: boolean) => string;
  getCommitment: (isCentralAsia: boolean) => string;
  getRequirements: (isCentralAsia: boolean) => string[];
}

// ---------------------------------------------------------------------------
// Hardcoded fallbacks — one per slug.
// Values harvested from each .tsx page's Helmet title, hero subtitle, and
// stats/requirements sections. These render if Sanity is down or not seeded.
// ---------------------------------------------------------------------------
type FallbackData = Omit<
  VolunteerOpportunityDoc,
  "getTitle" | "getTagline" | "getSummary" | "getCommitment" | "getRequirements"
>;

const FALLBACKS: Record<string, FallbackData> = {
  "administrative-support": {
    _id: "volunteerOpportunity.administrative-support",
    slug: "administrative-support",
    title: "Administrative Support Volunteer",
    titleRu: "Волонтёр административной поддержки",
    tagline: "Be the backbone of our operations.",
    taglineRu: "Станьте опорой наших операций.",
    summary:
      "Support essential operations as an Administrative Support Volunteer with Businesses Beyond Borders. Help with communications, events, and program coordination. Flexible remote work from anywhere.",
    summaryRu:
      "Станьте волонтёром административной поддержки в Businesses Beyond Borders. Помогайте с коммуникациями, мероприятиями и координацией программ. Гибкая удалённая работа из любой точки мира.",
    commitment: "3–5 hours / week",
    commitmentRu: "3–5 ч. в неделю",
    requirements: [
      "Strong written communication skills",
      "Attention to detail and accuracy",
      "Time management and organization",
      "Basic computer and internet skills",
    ],
    requirementsRu: [
      "Сильные навыки письменной коммуникации",
      "Внимательность к деталям и точность",
      "Управление временем и организованность",
      "Базовые навыки работы с компьютером и интернетом",
    ],
    applyUrl: "/volunteer-application",
    icon: "Network",
    active: true,
    order: 10,
  },
  "advocacy-outreach": {
    _id: "volunteerOpportunity.advocacy-outreach",
    slug: "advocacy-outreach",
    title: "Advocacy & Outreach Volunteer",
    titleRu: "Волонтёр по адвокации и продвижению",
    tagline: "Amplify our mission across Central Asia.",
    taglineRu: "Усильте нашу миссию по всей Центральной Азии.",
    summary:
      "Become an Advocacy & Outreach volunteer with Businesses Beyond Borders. Help amplify our mission to empower entrepreneurs in Central Asia through communications and advocacy.",
    summaryRu:
      "Станьте волонтёром по адвокации и охвату в Businesses Beyond Borders. Помогите усилить нашу миссию по поддержке предпринимателей Центральной Азии через коммуникации и адвокацию.",
    commitment: "Flexible",
    commitmentRu: "Гибко",
    requirements: [
      "Passion for international development",
      "Strong communication skills",
      "Strategic thinking",
      "Community building experience",
    ],
    requirementsRu: [
      "Интерес к международному развитию",
      "Сильные коммуникативные навыки",
      "Стратегическое мышление",
      "Опыт построения сообщества",
    ],
    applyUrl: "/volunteer-application",
    icon: "Megaphone",
    active: true,
    order: 20,
  },
  "business-training": {
    _id: "volunteerOpportunity.business-training",
    slug: "business-training",
    title: "Business Training Volunteer",
    titleRu: "Волонтёр бизнес-обучения",
    tagline:
      "Support our proven Financial Literacy and Business Creation programs.",
    taglineRu:
      "Поддержите наши проверенные программы финансовой грамотности и создания бизнеса.",
    summary:
      "Support our proven Financial Literacy and Business Creation programs as a Business Training Volunteer. Help entrepreneurs in Central Asia develop essential business skills. Flexible remote scheduling.",
    summaryRu:
      "Поддержите наши проверенные программы финансовой грамотности и создания бизнеса как волонтёр бизнес-обучения. Помогайте предпринимателям Центральной Азии развивать ключевые навыки. Гибкий удалённый график.",
    commitment: "Flexible remote scheduling",
    commitmentRu: "Гибкий удалённый график",
    requirements: [
      "Business or finance background",
      "Teaching or coaching experience",
      "Patience and cross-cultural sensitivity",
      "Reliable internet connection",
    ],
    requirementsRu: [
      "Опыт в бизнесе или финансах",
      "Опыт преподавания или коучинга",
      "Терпение и межкультурная чуткость",
      "Стабильное интернет-соединение",
    ],
    applyUrl: "/volunteer-application",
    icon: "BookOpen",
    active: true,
    order: 30,
  },
  "community-organizer": {
    _id: "volunteerOpportunity.community-organizer",
    slug: "community-organizer",
    title: "Community Organizer Volunteer",
    titleRu: "Волонтёр-организатор сообщества",
    tagline:
      "Build our volunteer-driven community collaboration network from the ground up.",
    taglineRu:
      "Выстраивайте нашу сеть взаимодействия сообщества с нуля.",
    summary:
      "Join our founding team as a Community Organizer with Businesses Beyond Borders. Build volunteer-driven community collaboration networks connecting entrepreneurs. 2 hours/week commitment. Make global impact from anywhere.",
    summaryRu:
      "Вступайте в команду-основателей как организатор сообщества в Businesses Beyond Borders. Создавайте сети взаимодействия для предпринимателей. 2 часа в неделю. Глобальное влияние из любой точки мира.",
    commitment: "2 hours / week",
    commitmentRu: "2 ч. в неделю",
    requirements: [
      "Community organizing or coordination experience",
      "Strong interpersonal and networking skills",
      "Self-motivated and proactive",
      "Reliable internet connection",
    ],
    requirementsRu: [
      "Опыт организации сообществ или координации",
      "Сильные межличностные навыки и нетворкинг",
      "Самомотивация и инициативность",
      "Стабильное интернет-соединение",
    ],
    applyUrl: "/volunteer-application",
    icon: "Users",
    active: true,
    order: 40,
  },
  "leadership-mentor": {
    _id: "volunteerOpportunity.leadership-mentor",
    slug: "leadership-mentor",
    title: "Leadership Development Mentor",
    titleRu: "Наставник по развитию лидерства",
    tagline: "Guide emerging leaders through our proven 12-month program.",
    taglineRu:
      "Ведите начинающих лидеров через нашу проверенную 12-месячную программу.",
    summary:
      "Become a Leadership Development Mentor with Businesses Beyond Borders. Guide emerging leaders through our proven 12-month program using the 70-20-10 model. 4-6 hours monthly commitment. Make global impact from anywhere.",
    summaryRu:
      "Станьте наставником по развитию лидерства в Businesses Beyond Borders. Ведите начинающих лидеров через проверенную 12-месячную программу по модели 70-20-10. 4–6 часов в месяц. Глобальное влияние из любой точки мира.",
    commitment: "4–6 hours / month",
    commitmentRu: "4–6 ч. в месяц",
    requirements: [
      "5+ years of leadership experience",
      "Coaching or mentorship background",
      "Cross-cultural communication skills",
      "4-6 hours monthly availability",
    ],
    requirementsRu: [
      "5+ лет опыта в лидерстве",
      "Опыт коучинга или наставничества",
      "Навыки межкультурной коммуникации",
      "4–6 часов в месяц",
    ],
    applyUrl: "/volunteer-application",
    icon: "Target",
    active: true,
    order: 50,
  },
};

// ---------------------------------------------------------------------------
// GROQ query fields shared between list and single queries
// ---------------------------------------------------------------------------
const VOL_QUERY_FIELDS = /* groq */ `
  _id,
  "slug": slug.current,
  title,
  titleRu,
  tagline,
  taglineRu,
  summary,
  summaryRu,
  commitment,
  commitmentRu,
  requirements,
  requirementsRu,
  applyUrl,
  "image": image{..., "alt": alt},
  imageUrl,
  icon,
  active,
  "order": coalesce(order, 99)
`;

interface RawVolunteerOpportunity {
  _id: string;
  slug?: string;
  title?: string;
  titleRu?: string;
  tagline?: string;
  taglineRu?: string;
  summary?: string;
  summaryRu?: string;
  commitment?: string;
  commitmentRu?: string;
  requirements?: string[];
  requirementsRu?: string[];
  applyUrl?: string;
  image?: { asset?: { _ref: string } } | null;
  imageUrl?: string;
  icon?: string;
  active?: boolean;
  order?: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function resolveImageUrl(raw: RawVolunteerOpportunity): string | undefined {
  // Sanity-uploaded image takes precedence; fall back to plain URL field.
  if (raw.image?.asset) {
    return imageUrl(raw.image as Parameters<typeof imageUrl>[0], 1600);
  }
  return raw.imageUrl ?? undefined;
}

function attachHelpers(
  doc: FallbackData
): VolunteerOpportunityDoc {
  return {
    ...doc,
    getTitle: (isCA) => getLocalized(doc.title, doc.titleRu, isCA),
    getTagline: (isCA) =>
      getLocalized(doc.tagline ?? "", doc.taglineRu, isCA),
    getSummary: (isCA) =>
      getLocalized(doc.summary ?? "", doc.summaryRu, isCA),
    getCommitment: (isCA) =>
      getLocalized(doc.commitment ?? "", doc.commitmentRu, isCA),
    getRequirements: (isCA) =>
      getLocalizedArray(doc.requirements, doc.requirementsRu, isCA),
  };
}

function mergeOpportunity(
  slug: string,
  raw: RawVolunteerOpportunity | null
): VolunteerOpportunityDoc {
  const fallback = FALLBACKS[slug] ?? FALLBACKS["administrative-support"];
  if (!raw) return attachHelpers(fallback);

  const merged: FallbackData = {
    _id: raw._id || fallback._id,
    slug: raw.slug || fallback.slug,
    title: raw.title || fallback.title,
    titleRu: raw.titleRu || fallback.titleRu,
    tagline: raw.tagline || fallback.tagline,
    taglineRu: raw.taglineRu || fallback.taglineRu,
    summary: raw.summary || fallback.summary,
    summaryRu: raw.summaryRu || fallback.summaryRu,
    commitment: raw.commitment || fallback.commitment,
    commitmentRu: raw.commitmentRu || fallback.commitmentRu,
    requirements: raw.requirements?.length ? raw.requirements : fallback.requirements,
    requirementsRu: raw.requirementsRu?.length
      ? raw.requirementsRu
      : fallback.requirementsRu,
    applyUrl: raw.applyUrl || fallback.applyUrl,
    heroImageUrl: resolveImageUrl(raw) ?? fallback.heroImageUrl,
    icon: raw.icon || fallback.icon,
    active: raw.active ?? fallback.active,
    order: raw.order ?? fallback.order,
  };

  return attachHelpers(merged);
}

// ---------------------------------------------------------------------------
// Public hooks
// ---------------------------------------------------------------------------

/** Fetch a single volunteer opportunity by slug. */
export function useVolunteerOpportunity(
  slug: string
): { opportunity: VolunteerOpportunityDoc; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["volunteerOpportunity", slug],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawVolunteerOpportunity | null>(
          `*[_type == "volunteerOpportunity" && slug.current == $slug][0]{${VOL_QUERY_FIELDS}}`,
          { slug }
        );
      } catch {
        return null;
      }
    },
  });

  return {
    opportunity: mergeOpportunity(slug, data ?? null),
    isLoading,
  };
}

/** Fetch the full list of active volunteer opportunities (for index / nav). */
export function useVolunteerOpportunities(): {
  opportunities: VolunteerOpportunityDoc[];
  isLoading: boolean;
  source: "sanity" | "fallback";
} {
  const { data, isLoading } = useQuery({
    queryKey: ["volunteerOpportunities", "list"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawVolunteerOpportunity[]>(
          `*[_type == "volunteerOpportunity" && (active == true || !defined(active))] | order(order asc){${VOL_QUERY_FIELDS}}`
        );
      } catch {
        return null;
      }
    },
  });

  if (data && data.length > 0) {
    return {
      opportunities: data.map((r) => mergeOpportunity(r.slug ?? "", r)),
      isLoading,
      source: "sanity",
    };
  }

  return {
    opportunities: Object.values(FALLBACKS).map((f) => attachHelpers(f)),
    isLoading,
    source: "fallback",
  };
}
