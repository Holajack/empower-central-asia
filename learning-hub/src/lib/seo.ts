/**
 * Site configuration + schema.org generators for the Learning Hub.
 *
 * Everything brand-specific lives here and is driven by VITE_* environment
 * variables so the same codebase can be re-branded without touching pages.
 * See .env.example for the full list.
 */

const env = import.meta.env;

function trimSlash(url: string): string {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  /** Public brand name shown in titles, footers, and structured data. */
  name: env.VITE_SITE_NAME || "Central Asia Partners",
  /** Short brand used where space is tight (e.g. "| CAP"). */
  shortName: env.VITE_SITE_SHORT_NAME || "CAP",
  /** Legal / organization name for schema.org Organization. */
  orgName: env.VITE_ORG_NAME || env.VITE_SITE_NAME || "Central Asia Partners",
  /** Canonical origin without trailing slash. */
  url: trimSlash(env.VITE_SITE_URL || "https://learn.centralasiapartners.com"),
  description:
    env.VITE_SITE_DESCRIPTION ||
    "Free financial literacy, business creation, and leadership courses in English and Russian for people in Central Asia and beyond.",
  descriptionRu:
    env.VITE_SITE_DESCRIPTION_RU ||
    "Бесплатные курсы по финансовой грамотности, созданию бизнеса и лидерству на русском и английском языках для Центральной Азии и всего мира.",
  email: env.VITE_CONTACT_EMAIL || "hello@centralasiapartners.com",
  phone: env.VITE_CONTACT_PHONE || "",
  whatsapp: env.VITE_CONTACT_WHATSAPP || "",
  address: {
    street: env.VITE_ADDRESS_STREET || "",
    city: env.VITE_ADDRESS_CITY || "Port Orange",
    state: env.VITE_ADDRESS_STATE || "FL",
    zip: env.VITE_ADDRESS_ZIP || "",
    country: env.VITE_ADDRESS_COUNTRY || "US",
  },
  social: {
    facebook: env.VITE_SOCIAL_FACEBOOK || "",
    instagram: env.VITE_SOCIAL_INSTAGRAM || "",
    linkedin: env.VITE_SOCIAL_LINKEDIN || "",
    youtube: env.VITE_SOCIAL_YOUTUBE || "",
    telegram: env.VITE_SOCIAL_TELEGRAM || "",
  },
  founder: env.VITE_FOUNDER_NAME || "Jacken Holland",
  foundingDate: env.VITE_FOUNDING_DATE || "2024",
  /** External giving page (Pure Charity / E3 Partners). Empty hides donate buttons. */
  donateUrl: env.VITE_DONATE_URL || "",
  /** Google Business review link. Empty hides the "leave a review" prompt. */
  reviewUrl: env.VITE_REVIEW_URL || "",
  logo: "/images/logo.png",
  defaultImage: "/og-image.png",
  /** Hostname without protocol, for display (e.g. "learn.example.org"). */
  get host() {
    return this.url.replace(/^https?:\/\//, "");
  },
  /** Absolute versions for schema.org / Open Graph. */
  get logoUrl() {
    return `${this.url}${this.logo}`;
  },
  get defaultImageUrl() {
    return `${this.url}${this.defaultImage}`;
  },
  languages: ["en", "ru"] as const,
};

export type SupportedLanguage = (typeof siteConfig.languages)[number];

/** Absolute URL for a site path, optionally under the /ru prefix. */
export function absoluteUrl(path: string, lang: SupportedLanguage = "en"): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  const normalized = clean === "/" ? "" : clean.replace(/\/$/, "");
  const prefix = lang === "ru" ? "/ru" : "";
  if (!normalized) return `${siteConfig.url}${prefix || "/"}`;
  return `${siteConfig.url}${prefix}${normalized}`;
}

// ─── Organization ───────────────────────────────────────────────────────────

export function generateOrganizationSchema() {
  const sameAs = Object.values(siteConfig.social).filter(Boolean);
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "EducationalOrganization"],
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.orgName,
    alternateName: siteConfig.name !== siteConfig.orgName ? siteConfig.name : undefined,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: siteConfig.logoUrl,
    },
    image: siteConfig.defaultImageUrl,
    description: siteConfig.description,
    email: siteConfig.email,
    ...(siteConfig.phone ? { telephone: siteConfig.phone } : {}),
    founder: { "@type": "Person", name: siteConfig.founder },
    foundingDate: siteConfig.foundingDate,
    address: {
      "@type": "PostalAddress",
      ...(siteConfig.address.street ? { streetAddress: siteConfig.address.street } : {}),
      addressLocality: siteConfig.address.city,
      addressRegion: siteConfig.address.state,
      ...(siteConfig.address.zip ? { postalCode: siteConfig.address.zip } : {}),
      addressCountry: siteConfig.address.country,
    },
    areaServed: [
      { "@type": "Country", name: "Kazakhstan" },
      { "@type": "Country", name: "Kyrgyzstan" },
      { "@type": "Country", name: "Uzbekistan" },
      { "@type": "Country", name: "Tajikistan" },
      { "@type": "Country", name: "Turkmenistan" },
      { "@type": "Country", name: "United States" },
    ],
    knowsLanguage: ["en", "ru"],
    knowsAbout: [
      "Financial Literacy",
      "Personal Budgeting",
      "Debt Management",
      "Entrepreneurship",
      "Lean Startup",
      "Business Model Design",
      "Leadership Development",
      "Community Development",
    ],
    ...(sameAs.length ? { sameAs } : {}),
  };
}

// ─── WebSite ────────────────────────────────────────────────────────────────

export function generateWebsiteSchema(lang: SupportedLanguage = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    description: lang === "ru" ? siteConfig.descriptionRu : siteConfig.description,
    inLanguage: lang === "ru" ? "ru" : "en",
    publisher: { "@id": `${siteConfig.url}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteConfig.url}/blog?search={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ─── BlogPosting ────────────────────────────────────────────────────────────

export interface BlogPostSchemaProps {
  title: string;
  description: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  image?: string;
  url: string;
  tags?: string[];
  wordCount?: number;
  lang?: SupportedLanguage;
}

export function generateBlogPostSchema(props: BlogPostSchemaProps) {
  const { title, description, datePublished, dateModified, author, image, url, tags = [], wordCount, lang = "en" } = props;
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    image: image || siteConfig.defaultImageUrl,
    datePublished,
    dateModified: dateModified || datePublished,
    author: { "@type": "Person", name: author },
    publisher: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.orgName,
      url: siteConfig.url,
      logo: { "@type": "ImageObject", url: siteConfig.logoUrl },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    ...(tags.length ? { keywords: tags.join(", ") } : {}),
    ...(wordCount ? { wordCount } : {}),
    inLanguage: lang === "ru" ? "ru" : "en",
    isAccessibleForFree: true,
  };
}

// ─── BreadcrumbList ─────────────────────────────────────────────────────────

export interface BreadcrumbItem {
  name: string;
  url: string;
}

export function generateBreadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

// ─── Course ─────────────────────────────────────────────────────────────────

export interface CourseSchemaProps {
  name: string;
  description: string;
  url: string;
  image?: string;
  /** ISO 8601 duration of total study time, e.g. "PT18H". */
  workload?: string;
  /** Number of weeks (used for CourseInstance duration). */
  weeks?: number;
  level?: "Beginner" | "Intermediate" | "Advanced";
  lang?: SupportedLanguage;
  /** Syllabus sections (week titles) for hasPart/syllabusSections. */
  syllabus?: { name: string; description?: string; url?: string }[];
  teaches?: string[];
}

export function generateCourseSchema(props: CourseSchemaProps) {
  const { name, description, url, image, workload = "PT10H", weeks, level = "Beginner", lang = "en", syllabus = [], teaches = [] } = props;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${url}#course`,
    name,
    description,
    url,
    image: image || siteConfig.defaultImageUrl,
    inLanguage: lang === "ru" ? "ru" : "en",
    availableLanguage: ["en", "ru"],
    provider: {
      "@type": "Organization",
      "@id": `${siteConfig.url}/#organization`,
      name: siteConfig.orgName,
      sameAs: siteConfig.url,
    },
    isAccessibleForFree: true,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      category: "Free",
      availability: "https://schema.org/InStock",
      url,
    },
    educationalLevel: level,
    ...(teaches.length ? { teaches } : {}),
    ...(syllabus.length
      ? {
          syllabusSections: syllabus.map((s) => ({
            "@type": "Syllabus",
            name: s.name,
            ...(s.description ? { description: s.description } : {}),
            ...(s.url ? { url: s.url } : {}),
          })),
        }
      : {}),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "Online",
      courseWorkload: workload,
      ...(weeks ? { courseSchedule: { "@type": "Schedule", repeatFrequency: "Weekly", repeatCount: weeks } } : {}),
      instructor: {
        "@type": "Person",
        name: siteConfig.founder,
      },
    },
  };
}

// ─── FAQPage ────────────────────────────────────────────────────────────────

export interface FAQItem {
  question: string;
  answer: string;
}

export function generateFAQSchema(items: FAQItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

// ─── Event (cohorts) ────────────────────────────────────────────────────────

export interface EventSchemaProps {
  name: string;
  description: string;
  startDate: string;
  endDate?: string;
  url: string;
  image?: string;
  isOnline?: boolean;
  location?: { name: string; address?: string };
}

export function generateEventSchema(props: EventSchemaProps) {
  const { name, description, startDate, endDate, url, image, isOnline = true, location } = props;
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    startDate,
    ...(endDate ? { endDate } : {}),
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: isOnline
      ? "https://schema.org/OnlineEventAttendanceMode"
      : "https://schema.org/MixedEventAttendanceMode",
    location: isOnline
      ? { "@type": "VirtualLocation", url }
      : {
          "@type": "Place",
          name: location?.name ?? siteConfig.name,
          ...(location?.address ? { address: { "@type": "PostalAddress", streetAddress: location.address } } : {}),
        },
    image: image || siteConfig.defaultImageUrl,
    organizer: { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: siteConfig.orgName, url: siteConfig.url },
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD", availability: "https://schema.org/InStock", url },
  };
}

// ─── DonateAction ───────────────────────────────────────────────────────────

export function generateDonateActionSchema() {
  if (!siteConfig.donateUrl) return null;
  return {
    "@context": "https://schema.org",
    "@type": "DonateAction",
    recipient: { "@type": "Organization", "@id": `${siteConfig.url}/#organization`, name: siteConfig.orgName, url: siteConfig.url },
    target: {
      "@type": "EntryPoint",
      urlTemplate: siteConfig.donateUrl,
      actionPlatform: ["http://schema.org/DesktopWebPlatform", "http://schema.org/MobileWebPlatform"],
    },
  };
}

export function schemaToJsonLd(schema: object): string {
  return JSON.stringify(schema);
}

// ─── Meta helpers ───────────────────────────────────────────────────────────

export interface PageMeta {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url: string;
  type?: "website" | "article" | "blog";
}

export function generateMetaTags(meta: PageMeta) {
  const { title, description, keywords = [], image, url, type = "website" } = meta;
  return {
    title: `${title} | ${siteConfig.name}`,
    description,
    keywords: keywords.join(", "),
    canonical: url,
    og: { title, description, type, url, image: image || siteConfig.defaultImageUrl, siteName: siteConfig.name, locale: "en_US" },
    twitter: { card: "summary_large_image", title, description, image: image || siteConfig.defaultImageUrl },
  };
}
