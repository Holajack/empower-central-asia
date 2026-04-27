/**
 * Hooks for the About page content + team members from Sanity.
 *   - useAboutPage()    → singleton with hero copy, values list, optional narrative
 *   - useTeamMembers()  → list of active team member docs, ordered
 *
 * Both fall back to hardcoded values that mirror what the site shipped with.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity, imageUrl } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";

// ─── Values list (lives inside aboutPage) ─────────────────────────────

export interface ValueItem {
  title: string;
  titleRu?: string;
  description: string;
  descriptionRu?: string;
  /** Lucide icon name — mapped to component on the site. */
  icon: string;
}

const VALUES_FALLBACK: ValueItem[] = [
  {
    title: "Empowerment Over Dependency",
    titleRu: "Расширение возможностей, а не зависимость",
    description:
      "We don't give handouts -- we give tools, training, and the confidence to build something lasting.",
    descriptionRu:
      "Мы не раздаём подачки — мы даём инструменты, обучение и уверенность, необходимые для создания чего-то долговечного.",
    icon: "Target",
  },
  {
    title: "Local Roots, Global Support",
    titleRu: "Местные корни, глобальная поддержка",
    description:
      "Programs are designed for Central Asian communities with the backing of a worldwide network of volunteers and donors.",
    descriptionRu:
      "Программы разработаны для общин Центральной Азии при поддержке всемирной сети волонтёров и доноров.",
    icon: "Globe",
  },
  {
    title: "Evidence-Based Methods",
    titleRu: "Методы, основанные на доказательствах",
    description:
      "Every program is built on proven frameworks -- Lean Startup, zero-based budgeting, the 70-20-10 leadership model.",
    descriptionRu:
      "Каждая программа построена на проверенных концепциях: Lean Startup, бюджетирование с нулевой базой, лидерская модель 70-20-10.",
    icon: "TrendingUp",
  },
  {
    title: "Dignity First",
    titleRu: "Достоинство прежде всего",
    description:
      "We believe entrepreneurship restores dignity. Building something of your own changes how you see yourself and your future.",
    descriptionRu:
      "Мы верим, что предпринимательство возвращает достоинство. Когда вы создаёте что-то своё, это меняет взгляд на себя и своё будущее.",
    icon: "Heart",
  },
  {
    title: "Community Multiplication",
    titleRu: "Умножение через сообщество",
    description:
      "Every graduate is trained to teach others. One entrepreneur becomes ten. One community lifts many.",
    descriptionRu:
      "Каждый выпускник обучен обучать других. Один предприниматель становится десятью. Одно сообщество поднимает многих.",
    icon: "Users",
  },
  {
    title: "Transparency & Accountability",
    titleRu: "Прозрачность и подотчётность",
    description:
      "100% of donations fund programs. We report impact openly and hold ourselves to the highest standard.",
    descriptionRu:
      "100% пожертвований идут на финансирование программ. Мы открыто отчитываемся о результатах и придерживаемся самых высоких стандартов.",
    icon: "Lightbulb",
  },
];

// ─── About page (singleton) ───────────────────────────────────────────

export interface AboutPage {
  heroTitle: string;
  heroTitleRu?: string;
  heroSubtitle: string;
  heroSubtitleRu?: string;
  values: ValueItem[];
  getHeroTitle: (isCentralAsia: boolean) => string;
  getHeroSubtitle: (isCentralAsia: boolean) => string;
  getValuesLocalized: (isCentralAsia: boolean) => Array<{
    title: string;
    description: string;
    icon: string;
  }>;
}

const ABOUT_FALLBACK = {
  heroTitle: "About Us",
  heroTitleRu: "О нас",
  heroSubtitle:
    "Founded by Jacken Holland — abandoned at birth in Haiti, adopted, and driven to give others the same chance. Meet the team behind Businesses Beyond Borders.",
  heroSubtitleRu:
    "Джакен Холланд, брошенный при рождении на Гаити и усыновлённый американской семьёй, основал BBB, чтобы дать другим шанс.",
};

const ABOUT_QUERY = /* groq */ `
  *[_type == "aboutPage"][0]{
    heroTitle,
    heroTitleRu,
    heroSubtitle,
    heroSubtitleRu,
    values
  }
`;

interface RawAboutPage {
  heroTitle?: string;
  heroTitleRu?: string;
  heroSubtitle?: string;
  heroSubtitleRu?: string;
  values?: ValueItem[];
}

function mergeAbout(raw: RawAboutPage | null): AboutPage {
  const r = raw ?? {};
  const heroTitle = r.heroTitle || ABOUT_FALLBACK.heroTitle;
  const heroTitleRu = r.heroTitleRu || ABOUT_FALLBACK.heroTitleRu;
  const heroSubtitle = r.heroSubtitle || ABOUT_FALLBACK.heroSubtitle;
  const heroSubtitleRu = r.heroSubtitleRu || ABOUT_FALLBACK.heroSubtitleRu;
  const values = r.values && r.values.length > 0 ? r.values : VALUES_FALLBACK;

  return {
    heroTitle,
    heroTitleRu,
    heroSubtitle,
    heroSubtitleRu,
    values,
    getHeroTitle: (isCA) => getLocalized(heroTitle, heroTitleRu, isCA),
    getHeroSubtitle: (isCA) => getLocalized(heroSubtitle, heroSubtitleRu, isCA),
    getValuesLocalized: (isCA) =>
      values.map((v) => ({
        title: getLocalized(v.title, v.titleRu, isCA),
        description: getLocalized(v.description, v.descriptionRu, isCA),
        icon: v.icon,
      })),
  };
}

export function useAboutPage(): { about: AboutPage; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["aboutPage"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawAboutPage | null>(ABOUT_QUERY);
      } catch {
        return null;
      }
    },
  });
  return { about: mergeAbout(data ?? null), isLoading };
}

// ─── Team members ─────────────────────────────────────────────────────

export interface TeamMember {
  _id: string;
  name: string;
  nameRu?: string;
  role: string;
  roleRu?: string;
  bio: string;
  bioRu?: string;
  photoUrl?: string;
  initials: string;
  order: number;
}

const TEAM_FALLBACK: TeamMember[] = [
  {
    _id: "team.jacken-holland",
    name: "Jacken Holland",
    role: "Founder & CEO",
    roleRu: "Основатель и CEO",
    bio: "Jacken was born in Haiti and abandoned at birth. He spent three and a half years in an orphanage where survival -- not care -- was the daily reality. Adopted by an American family, he came to the United States knowing nothing of the language, culture, or world outside Haiti. He earned an Integrated Business degree from the University of Central Florida, traveled to nine countries, and saw the same gap everywhere: people with ambition but no access to financial training. At 23, he founded Businesses Beyond Borders and moved to Kyrgyzstan with a backpack to build it from the ground up.",
    bioRu:
      "Джакен родился на Гаити и был брошен при рождении. Три с половиной года он провёл в приюте, где речь шла о выживании, а не о заботе. Усыновлённый американской семьёй, он приехал в США, не зная ни языка, ни культуры, ни мира за пределами Гаити. Он получил степень в области бизнеса в Университете Центральной Флориды, побывал в девяти странах и везде видел одно и то же: люди с амбициями, но без доступа к финансовому образованию. В 23 года он основал Businesses Beyond Borders и переехал в Кыргызстан с рюкзаком, чтобы строить организацию с нуля.",
    photoUrl: "/photo-1581092795360-fd1ca04f0952",
    initials: "JH",
    order: 10,
  },
  {
    _id: "team.yeva-romanova",
    name: "Yeva Romanova",
    role: "Co-Founder & COO",
    roleRu: "Сооснователь и COO",
    bio: "Born in Kyrgyzstan. Eight years at a DC accounting firm serving nonprofits. Five years building microloan programs on the ground while working remotely across two time zones. Yeva brings the cultural roots, the financial expertise, and the on-the-ground relationships that make BBB's programs actually work.",
    bioRu:
      "Родившись в Кыргызстане, Йева Романова на собственном опыте пережила экономическую нестабильность постсоветской Центральной Азии, прежде чем эмигрировала в США. В каждую программу BBB она привносит непосредственное знание культуры, опыт работы в политических кругах Вашингтона и глубокое понимание проблем, с которыми сталкиваются общины Центральной Азии.",
    photoUrl: "/photo-1581091226825-a6a2a5aee158",
    initials: "YR",
    order: 20,
  },
];

const TEAM_QUERY = /* groq */ `
  *[_type == "teamMember" && active == true] | order(order asc){
    _id,
    name,
    nameRu,
    role,
    roleRu,
    bio,
    bioRu,
    "photo": photo{..., "alt": alt},
    initials,
    order
  }
`;

interface RawTeamMember {
  _id: string;
  name?: string;
  nameRu?: string;
  role?: string;
  roleRu?: string;
  bio?: string;
  bioRu?: string;
  photo?: { asset?: { _ref: string } } | null;
  initials?: string;
  order?: number;
}

function shapeMember(raw: RawTeamMember): TeamMember {
  return {
    _id: raw._id,
    name: raw.name || "",
    nameRu: raw.nameRu,
    role: raw.role || "",
    roleRu: raw.roleRu,
    bio: raw.bio || "",
    bioRu: raw.bioRu,
    photoUrl: raw.photo?.asset ? imageUrl(raw.photo as any, 600) : undefined,
    initials: raw.initials || "?",
    order: raw.order ?? 99,
  };
}

export function useTeamMembers(): { members: TeamMember[]; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawTeamMember[]>(TEAM_QUERY);
      } catch {
        return null;
      }
    },
  });
  if (data && data.length > 0) {
    return { members: data.map(shapeMember), isLoading };
  }
  return { members: TEAM_FALLBACK, isLoading };
}

/** Localize a list of team members for display. */
export function localizeTeam(members: TeamMember[], isCentralAsia: boolean) {
  return members.map((m) => ({
    ...m,
    name: getLocalized(m.name, m.nameRu, isCentralAsia),
    role: getLocalized(m.role, m.roleRu, isCentralAsia),
    bio: getLocalized(m.bio, m.bioRu, isCentralAsia),
  }));
}
