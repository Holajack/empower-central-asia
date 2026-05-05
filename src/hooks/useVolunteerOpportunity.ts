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

// ---------------------------------------------------------------------------
// Inline-object types — mirror the Sanity schema array members.
// ---------------------------------------------------------------------------

export interface ResponsibilityItem {
  label: string;
  labelRu?: string;
  description?: string;
  descriptionRu?: string;
}

export interface CommitmentDetail {
  label: string;
  labelRu?: string;
  value: string;
  valueRu?: string;
  icon?: string;
}

export interface RequirementItem {
  label: string;
  labelRu?: string;
}

export interface ProcessStep {
  stepNumber: number;
  label: string;
  labelRu?: string;
  description: string;
  descriptionRu?: string;
}

export interface BenefitItem {
  label: string;
  labelRu?: string;
  description?: string;
  descriptionRu?: string;
}

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

  // Detail-page sections
  responsibilitiesHeading?: string;
  responsibilitiesHeadingRu?: string;
  responsibilities: ResponsibilityItem[];

  commitmentHeading?: string;
  commitmentHeadingRu?: string;
  commitmentDetails: CommitmentDetail[];

  requirementsHeading?: string;
  requirementsHeadingRu?: string;
  requirements: RequirementItem[];

  processHeading?: string;
  processHeadingRu?: string;
  processSteps: ProcessStep[];

  benefitsHeading?: string;
  benefitsHeadingRu?: string;
  benefits: BenefitItem[];

  closingCtaHeading?: string;
  closingCtaHeadingRu?: string;
  closingCtaSubheading?: string;
  closingCtaSubheadingRu?: string;
  closingCtaButtonLabel?: string;
  closingCtaButtonLabelRu?: string;
  closingCtaUrl?: string;

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
  getRequirementsAsStrings: (isCentralAsia: boolean) => string[];
  getResponsibilitiesHeading: (isCentralAsia: boolean) => string;
  getCommitmentHeading: (isCentralAsia: boolean) => string;
  getRequirementsHeading: (isCentralAsia: boolean) => string;
  getProcessHeading: (isCentralAsia: boolean) => string;
  getBenefitsHeading: (isCentralAsia: boolean) => string;
  getClosingCtaHeading: (isCentralAsia: boolean) => string;
  getClosingCtaSubheading: (isCentralAsia: boolean) => string;
  getClosingCtaButtonLabel: (isCentralAsia: boolean) => string;
}

// ---------------------------------------------------------------------------
// Hardcoded fallbacks — one per slug.
// Values harvested from each .tsx page's Helmet title, hero subtitle, and
// stats/requirements sections. These render if Sanity is down or not seeded.
// Detail-section arrays default to empty so each page can fall back to its
// own bespoke hardcoded UI.
// ---------------------------------------------------------------------------
type FallbackData = Omit<
  VolunteerOpportunityDoc,
  | "getTitle"
  | "getTagline"
  | "getSummary"
  | "getCommitment"
  | "getRequirementsAsStrings"
  | "getResponsibilitiesHeading"
  | "getCommitmentHeading"
  | "getRequirementsHeading"
  | "getProcessHeading"
  | "getBenefitsHeading"
  | "getClosingCtaHeading"
  | "getClosingCtaSubheading"
  | "getClosingCtaButtonLabel"
>;

const EMPTY_DETAIL_SECTIONS = {
  responsibilities: [] as ResponsibilityItem[],
  commitmentDetails: [] as CommitmentDetail[],
  requirements: [] as RequirementItem[],
  processSteps: [] as ProcessStep[],
  benefits: [] as BenefitItem[],
};

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
    ...EMPTY_DETAIL_SECTIONS,
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
    ...EMPTY_DETAIL_SECTIONS,
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
    ...EMPTY_DETAIL_SECTIONS,
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
    ...EMPTY_DETAIL_SECTIONS,
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
    ...EMPTY_DETAIL_SECTIONS,
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
  responsibilitiesHeading,
  responsibilitiesHeadingRu,
  responsibilities[]{ label, labelRu, description, descriptionRu },
  commitmentHeading,
  commitmentHeadingRu,
  commitmentDetails[]{ label, labelRu, value, valueRu, icon },
  requirementsHeading,
  requirementsHeadingRu,
  requirements[]{ label, labelRu },
  requirementsRu,
  processHeading,
  processHeadingRu,
  processSteps[]{ stepNumber, label, labelRu, description, descriptionRu },
  benefitsHeading,
  benefitsHeadingRu,
  benefits[]{ label, labelRu, description, descriptionRu },
  closingCtaHeading,
  closingCtaHeadingRu,
  closingCtaSubheading,
  closingCtaSubheadingRu,
  closingCtaButtonLabel,
  closingCtaButtonLabelRu,
  closingCtaUrl,
  applyUrl,
  "image": image{..., "alt": alt},
  imageUrl,
  icon,
  active,
  "order": coalesce(order, 99)
`;

// Raw item shapes coming back from GROQ (without _key/_type — GROQ
// projection above strips them).
type RawResponsibility = Partial<ResponsibilityItem>;
type RawCommitmentDetail = Partial<CommitmentDetail>;
type RawRequirement = Partial<RequirementItem> | string;
type RawProcessStep = Partial<ProcessStep>;
type RawBenefit = Partial<BenefitItem>;

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
  responsibilitiesHeading?: string;
  responsibilitiesHeadingRu?: string;
  responsibilities?: RawResponsibility[];
  commitmentHeading?: string;
  commitmentHeadingRu?: string;
  commitmentDetails?: RawCommitmentDetail[];
  requirementsHeading?: string;
  requirementsHeadingRu?: string;
  requirements?: RawRequirement[];
  /** Legacy field; old docs may still have a string[]. */
  requirementsRu?: string[];
  processHeading?: string;
  processHeadingRu?: string;
  processSteps?: RawProcessStep[];
  benefitsHeading?: string;
  benefitsHeadingRu?: string;
  benefits?: RawBenefit[];
  closingCtaHeading?: string;
  closingCtaHeadingRu?: string;
  closingCtaSubheading?: string;
  closingCtaSubheadingRu?: string;
  closingCtaButtonLabel?: string;
  closingCtaButtonLabelRu?: string;
  closingCtaUrl?: string;
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

function normalizeRequirements(
  raw: RawRequirement[] | undefined,
  legacyRu: string[] | undefined
): RequirementItem[] {
  if (!raw || raw.length === 0) return [];
  const out: RequirementItem[] = [];
  raw.forEach((item, idx) => {
    if (typeof item === "string") {
      out.push({ label: item, labelRu: legacyRu?.[idx] });
      return;
    }
    if (!item.label) return;
    out.push({ label: item.label, labelRu: item.labelRu });
  });
  return out;
}

function normalizeResponsibilities(
  raw: RawResponsibility[] | undefined
): ResponsibilityItem[] {
  if (!raw || raw.length === 0) return [];
  return raw
    .filter((r): r is ResponsibilityItem => Boolean(r.label))
    .map((r) => ({
      label: r.label as string,
      labelRu: r.labelRu,
      description: r.description,
      descriptionRu: r.descriptionRu,
    }));
}

function normalizeCommitmentDetails(
  raw: RawCommitmentDetail[] | undefined
): CommitmentDetail[] {
  if (!raw || raw.length === 0) return [];
  return raw
    .filter(
      (c): c is CommitmentDetail =>
        Boolean(c.label) && Boolean(c.value)
    )
    .map((c) => ({
      label: c.label as string,
      labelRu: c.labelRu,
      value: c.value as string,
      valueRu: c.valueRu,
      icon: c.icon,
    }));
}

function normalizeProcessSteps(
  raw: RawProcessStep[] | undefined
): ProcessStep[] {
  if (!raw || raw.length === 0) return [];
  return raw
    .filter(
      (p): p is ProcessStep =>
        typeof p.stepNumber === "number" &&
        Boolean(p.label) &&
        Boolean(p.description)
    )
    .map((p) => ({
      stepNumber: p.stepNumber as number,
      label: p.label as string,
      labelRu: p.labelRu,
      description: p.description as string,
      descriptionRu: p.descriptionRu,
    }));
}

function normalizeBenefits(raw: RawBenefit[] | undefined): BenefitItem[] {
  if (!raw || raw.length === 0) return [];
  return raw
    .filter((b): b is BenefitItem => Boolean(b.label))
    .map((b) => ({
      label: b.label as string,
      labelRu: b.labelRu,
      description: b.description,
      descriptionRu: b.descriptionRu,
    }));
}

function attachHelpers(doc: FallbackData): VolunteerOpportunityDoc {
  return {
    ...doc,
    getTitle: (isCA) => getLocalized(doc.title, doc.titleRu, isCA),
    getTagline: (isCA) =>
      getLocalized(doc.tagline ?? "", doc.taglineRu, isCA),
    getSummary: (isCA) =>
      getLocalized(doc.summary ?? "", doc.summaryRu, isCA),
    getCommitment: (isCA) =>
      getLocalized(doc.commitment ?? "", doc.commitmentRu, isCA),
    getRequirementsAsStrings: (isCA) =>
      getLocalizedArray(
        doc.requirements.map((r) => r.label),
        doc.requirements.map((r) => r.labelRu ?? ""),
        isCA
      ),
    getResponsibilitiesHeading: (isCA) =>
      getLocalized(
        doc.responsibilitiesHeading ?? "",
        doc.responsibilitiesHeadingRu,
        isCA
      ),
    getCommitmentHeading: (isCA) =>
      getLocalized(
        doc.commitmentHeading ?? "",
        doc.commitmentHeadingRu,
        isCA
      ),
    getRequirementsHeading: (isCA) =>
      getLocalized(
        doc.requirementsHeading ?? "",
        doc.requirementsHeadingRu,
        isCA
      ),
    getProcessHeading: (isCA) =>
      getLocalized(doc.processHeading ?? "", doc.processHeadingRu, isCA),
    getBenefitsHeading: (isCA) =>
      getLocalized(doc.benefitsHeading ?? "", doc.benefitsHeadingRu, isCA),
    getClosingCtaHeading: (isCA) =>
      getLocalized(
        doc.closingCtaHeading ?? "",
        doc.closingCtaHeadingRu,
        isCA
      ),
    getClosingCtaSubheading: (isCA) =>
      getLocalized(
        doc.closingCtaSubheading ?? "",
        doc.closingCtaSubheadingRu,
        isCA
      ),
    getClosingCtaButtonLabel: (isCA) =>
      getLocalized(
        doc.closingCtaButtonLabel ?? "",
        doc.closingCtaButtonLabelRu,
        isCA
      ),
  };
}

function mergeOpportunity(
  slug: string,
  raw: RawVolunteerOpportunity | null
): VolunteerOpportunityDoc {
  const fallback = FALLBACKS[slug] ?? FALLBACKS["administrative-support"];
  if (!raw) return attachHelpers(fallback);

  const responsibilities = normalizeResponsibilities(raw.responsibilities);
  const commitmentDetails = normalizeCommitmentDetails(raw.commitmentDetails);
  const requirements = normalizeRequirements(raw.requirements, raw.requirementsRu);
  const processSteps = normalizeProcessSteps(raw.processSteps);
  const benefits = normalizeBenefits(raw.benefits);

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
    responsibilitiesHeading:
      raw.responsibilitiesHeading || fallback.responsibilitiesHeading,
    responsibilitiesHeadingRu:
      raw.responsibilitiesHeadingRu || fallback.responsibilitiesHeadingRu,
    responsibilities:
      responsibilities.length > 0 ? responsibilities : fallback.responsibilities,
    commitmentHeading: raw.commitmentHeading || fallback.commitmentHeading,
    commitmentHeadingRu:
      raw.commitmentHeadingRu || fallback.commitmentHeadingRu,
    commitmentDetails:
      commitmentDetails.length > 0
        ? commitmentDetails
        : fallback.commitmentDetails,
    requirementsHeading:
      raw.requirementsHeading || fallback.requirementsHeading,
    requirementsHeadingRu:
      raw.requirementsHeadingRu || fallback.requirementsHeadingRu,
    requirements: requirements.length > 0 ? requirements : fallback.requirements,
    processHeading: raw.processHeading || fallback.processHeading,
    processHeadingRu: raw.processHeadingRu || fallback.processHeadingRu,
    processSteps: processSteps.length > 0 ? processSteps : fallback.processSteps,
    benefitsHeading: raw.benefitsHeading || fallback.benefitsHeading,
    benefitsHeadingRu: raw.benefitsHeadingRu || fallback.benefitsHeadingRu,
    benefits: benefits.length > 0 ? benefits : fallback.benefits,
    closingCtaHeading: raw.closingCtaHeading || fallback.closingCtaHeading,
    closingCtaHeadingRu:
      raw.closingCtaHeadingRu || fallback.closingCtaHeadingRu,
    closingCtaSubheading:
      raw.closingCtaSubheading || fallback.closingCtaSubheading,
    closingCtaSubheadingRu:
      raw.closingCtaSubheadingRu || fallback.closingCtaSubheadingRu,
    closingCtaButtonLabel:
      raw.closingCtaButtonLabel || fallback.closingCtaButtonLabel,
    closingCtaButtonLabelRu:
      raw.closingCtaButtonLabelRu || fallback.closingCtaButtonLabelRu,
    closingCtaUrl: raw.closingCtaUrl || fallback.closingCtaUrl,
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
