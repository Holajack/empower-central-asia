/**
 * Hook for the homepage `HowToHelp` section. Three card groups
 * (Learn / Volunteer / Partner) — each card has a title, description,
 * lucide icon name, link, and CTA button text. All bilingual.
 *
 * Hardcoded fallbacks mirror the original component copy so the page never
 * breaks if Sanity is unreachable or the singleton hasn't been migrated yet.
 *
 * Note: the component splits cards into two visual tracks ("I want to learn"
 * / "I want to give"), where the give-track combines volunteer + partner
 * cards. The Sanity schema separates them into three groups, and the
 * component is responsible for stitching the give-track back together.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface HelpCard {
  title: string;
  titleRu?: string;
  description: string;
  descriptionRu?: string;
  /** Lucide icon component name, e.g. "BookOpen", "Heart". */
  icon: string;
  /** Internal path or full URL. Optional for cards that render a custom CTA. */
  link?: string;
  buttonText: string;
  buttonTextRu?: string;
}

export interface HomepageHowToHelpSettings {
  sectionHeading: string;
  sectionHeadingRu?: string;
  learnHeading: string;
  learnHeadingRu?: string;
  learnCards: HelpCard[];
  volunteerHeading: string;
  volunteerHeadingRu?: string;
  volunteerCards: HelpCard[];
  partnerHeading: string;
  partnerHeadingRu?: string;
  partnerCards: HelpCard[];
  /** Localized helpers — pass isCentralAsia from useRegion(). */
  getSectionHeading: (isCA: boolean) => string;
  getLearnHeading: (isCA: boolean) => string;
  getVolunteerHeading: (isCA: boolean) => string;
  getPartnerHeading: (isCA: boolean) => string;
}

// ── Fallbacks (mirror the hardcoded copy in HowToHelp.tsx) ────────────────────

const FALLBACK_LEARN_CARDS: HelpCard[] = [
  {
    title: "Free Course",
    titleRu: "Бесплатный курс",
    description:
      "Our 6-week financial literacy course covers budgeting, debt elimination, saving, and entrepreneurship basics.",
    descriptionRu:
      "Наш 6-недельный курс по финансовой грамотности охватывает составление бюджета, устранение долгов, накопления и основы предпринимательства.",
    icon: "BookOpen",
    link: "/course/financial-literacy",
    buttonText: "Start Learning",
    buttonTextRu: "Начать обучение",
  },
  {
    title: "Business Course",
    titleRu: "Курс создания бизнеса",
    description:
      "12-week intensive for financial literacy graduates: business model, market validation, and launch.",
    descriptionRu:
      "12-недельный интенсив для выпускников курса финансовой грамотности: бизнес-модель, проверка рынка, запуск.",
    icon: "Briefcase",
    link: "/course/business-creation",
    buttonText: "Start the Course",
    buttonTextRu: "Начать курс",
  },
  {
    title: "Debt Calculator",
    titleRu: "Калькулятор долгов",
    description:
      "Compare snowball vs. avalanche payoff strategies and see exactly when you'll be debt-free.",
    descriptionRu:
      "Сравните стратегии погашения «снежный ком» и «лавина» и узнайте точную дату, когда вы освободитесь от долгов.",
    icon: "Calculator",
    link: "/tools/debt-calculator",
    buttonText: "Try the Calculator",
    buttonTextRu: "Открыть калькулятор",
  },
  {
    title: "Blog & Resources",
    titleRu: "Блог и ресурсы",
    description:
      "Deep-dive articles on financial literacy, entrepreneurship, and sustainable development.",
    descriptionRu:
      "Подробные статьи по финансовой грамотности, предпринимательству и устойчивому развитию.",
    icon: "Newspaper",
    link: "/blog",
    buttonText: "Read Articles",
    buttonTextRu: "Читать статьи",
  },
];

const FALLBACK_VOLUNTEER_CARDS: HelpCard[] = [
  {
    title: "Donate",
    titleRu: "Пожертвовать",
    description:
      "100% of donations fund proven programs that train entrepreneurs and transform communities in Central Asia.",
    descriptionRu:
      "100% пожертвований финансируют проверенные программы, которые обучают предпринимателей и преобразуют сообщества Центральной Азии.",
    icon: "Heart",
    // No link — the component renders the card as <DonateButton/> when
    // `link` is missing. CMS admins can omit the URL to switch any card to
    // the donation flow.
    buttonText: "Make a Donation",
    buttonTextRu: "Сделать пожертвование",
  },
  {
    title: "Volunteer",
    titleRu: "Волонтёрство",
    description:
      "Share your expertise remotely -- mentor entrepreneurs, lead workshops, or support program operations.",
    descriptionRu:
      "Делитесь своим опытом дистанционно — наставляйте предпринимателей, проводите мастер-классы или поддерживайте работу программ.",
    icon: "Users2",
    link: "/get-involved",
    buttonText: "Become a Volunteer",
    buttonTextRu: "Стать волонтёром",
  },
];

const FALLBACK_PARTNER_CARDS: HelpCard[] = [
  {
    title: "Partner",
    titleRu: "Партнёрство",
    description:
      "Corporate and organizational partnerships that create measurable social impact and sustainable change.",
    descriptionRu:
      "Корпоративное и организационное партнёрство, создающее измеримое социальное воздействие и устойчивые изменения.",
    icon: "Handshake",
    link: "/partner-application",
    buttonText: "Partner With Us",
    buttonTextRu: "Стать партнёром",
  },
];

const FALLBACK_RAW = {
  sectionHeading: "How You Can Help",
  sectionHeadingRu: "Как вы можете помочь",
  learnHeading: "I want to learn",
  learnHeadingRu: "Хочу учиться",
  learnCards: FALLBACK_LEARN_CARDS,
  volunteerHeading: "I want to give",
  volunteerHeadingRu: "Хочу помочь",
  volunteerCards: FALLBACK_VOLUNTEER_CARDS,
  partnerHeading: "Partner",
  partnerHeadingRu: "Партнёрство",
  partnerCards: FALLBACK_PARTNER_CARDS,
};

// ── GROQ ──────────────────────────────────────────────────────────────────────

const HOW_TO_HELP_QUERY = /* groq */ `
  *[_id == "homepageHowToHelp"][0]{
    sectionHeading,
    sectionHeadingRu,
    learnHeading,
    learnHeadingRu,
    learnCards[]{
      title,
      titleRu,
      description,
      descriptionRu,
      icon,
      link,
      buttonText,
      buttonTextRu
    },
    volunteerHeading,
    volunteerHeadingRu,
    volunteerCards[]{
      title,
      titleRu,
      description,
      descriptionRu,
      icon,
      link,
      buttonText,
      buttonTextRu
    },
    partnerHeading,
    partnerHeadingRu,
    partnerCards[]{
      title,
      titleRu,
      description,
      descriptionRu,
      icon,
      link,
      buttonText,
      buttonTextRu
    }
  }
`;

interface RawCard {
  title?: string;
  titleRu?: string;
  description?: string;
  descriptionRu?: string;
  icon?: string;
  link?: string;
  buttonText?: string;
  buttonTextRu?: string;
}

interface RawHowToHelp {
  sectionHeading?: string;
  sectionHeadingRu?: string;
  learnHeading?: string;
  learnHeadingRu?: string;
  learnCards?: RawCard[];
  volunteerHeading?: string;
  volunteerHeadingRu?: string;
  volunteerCards?: RawCard[];
  partnerHeading?: string;
  partnerHeadingRu?: string;
  partnerCards?: RawCard[];
}

// ── Builder ───────────────────────────────────────────────────────────────────

function shapeCard(raw: RawCard): HelpCard | null {
  // A card without a title or button text is unusable — drop it so the
  // grid never renders empty cells.
  if (!raw.title || !raw.buttonText) return null;
  return {
    title: raw.title,
    titleRu: raw.titleRu,
    description: raw.description ?? "",
    descriptionRu: raw.descriptionRu,
    icon: raw.icon || "Sparkles",
    link: raw.link,
    buttonText: raw.buttonText,
    buttonTextRu: raw.buttonTextRu,
  };
}

function shapeCards(raw: RawCard[] | undefined, fallback: HelpCard[]): HelpCard[] {
  if (!raw || raw.length === 0) return fallback;
  const valid = raw.map(shapeCard).filter((c): c is HelpCard => c !== null);
  return valid.length > 0 ? valid : fallback;
}

function shape(raw: RawHowToHelp | null): HomepageHowToHelpSettings {
  const r = raw ?? {};
  const sectionHeading = r.sectionHeading || FALLBACK_RAW.sectionHeading;
  const sectionHeadingRu = r.sectionHeadingRu || FALLBACK_RAW.sectionHeadingRu;
  const learnHeading = r.learnHeading || FALLBACK_RAW.learnHeading;
  const learnHeadingRu = r.learnHeadingRu || FALLBACK_RAW.learnHeadingRu;
  const volunteerHeading = r.volunteerHeading || FALLBACK_RAW.volunteerHeading;
  const volunteerHeadingRu = r.volunteerHeadingRu || FALLBACK_RAW.volunteerHeadingRu;
  const partnerHeading = r.partnerHeading || FALLBACK_RAW.partnerHeading;
  const partnerHeadingRu = r.partnerHeadingRu || FALLBACK_RAW.partnerHeadingRu;

  return {
    sectionHeading,
    sectionHeadingRu,
    learnHeading,
    learnHeadingRu,
    learnCards: shapeCards(r.learnCards, FALLBACK_RAW.learnCards),
    volunteerHeading,
    volunteerHeadingRu,
    volunteerCards: shapeCards(r.volunteerCards, FALLBACK_RAW.volunteerCards),
    partnerHeading,
    partnerHeadingRu,
    partnerCards: shapeCards(r.partnerCards, FALLBACK_RAW.partnerCards),
    getSectionHeading: (isCA) => getLocalized(sectionHeading, sectionHeadingRu, isCA),
    getLearnHeading: (isCA) => getLocalized(learnHeading, learnHeadingRu, isCA),
    getVolunteerHeading: (isCA) => getLocalized(volunteerHeading, volunteerHeadingRu, isCA),
    getPartnerHeading: (isCA) => getLocalized(partnerHeading, partnerHeadingRu, isCA),
  };
}

// Re-export the fallback shape so callers (e.g. tests) can read the defaults.
export const FALLBACK_HOMEPAGE_HOW_TO_HELP: HomepageHowToHelpSettings = shape(null);

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useHomepageHowToHelp(): {
  howToHelp: HomepageHowToHelpSettings;
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery({
    queryKey: ["homepageHowToHelp"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawHowToHelp | null>(HOW_TO_HELP_QUERY);
      } catch (err) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("[homepageHowToHelp] Sanity fetch failed:", err);
        }
        return null;
      }
    },
  });

  return {
    howToHelp: shape(data ?? null),
    isLoading,
  };
}
