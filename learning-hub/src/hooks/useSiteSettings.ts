/**
 * Fetches the singleton `siteSettings` document from Sanity.
 *
 * Always returns a `settings` object — if the Sanity call fails or returns
 * nothing, the hardcoded fallbacks below are used so the site never breaks
 * when the CMS is unreachable.
 *
 * Usage:
 *   const { settings } = useSiteSettings();
 *   settings.contactEmail              // primary email
 *   settings.social.facebook           // Facebook URL
 *   settings.getTagline(isCentralAsia) // localized tagline
 */
import { useQuery } from "@tanstack/react-query";
import { sanity, imageUrl } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";
import { siteConfig } from "@/lib/seo";

export interface SanityCTA {
  label?: string;
  labelRu?: string;
  url?: string;
  openInNewTab?: boolean;
}

export interface SanitySocialLinks {
  facebook?: string;
  instagram?: string;
  linkedin?: string;
  twitter?: string;
  youtube?: string;
}

export interface SanityDefaultSeo {
  metaTitle?: string;
  metaDescription?: string;
  ogImageUrl?: string;
}

export interface SiteSettings {
  siteName: string;
  tagline?: string;
  taglineRu?: string;
  logoUrl?: string;
  logoMonoUrl?: string;
  logoAlt: string;
  contactEmail: string;
  contactPhone: string;
  contactPhoneTel: string; // E.164-ish, strip formatting
  address: string;
  addressRu?: string;
  addressLocality: string;
  addressRegion: string;
  addressZip: string;
  addressCountry: string;
  mapEmbedUrl: string;
  social: SanitySocialLinks;
  primaryCTA?: SanityCTA;
  defaultSeo?: SanityDefaultSeo;
  /** Helpers — return the localized variant or English fallback. */
  getTagline: (isCentralAsia: boolean) => string;
  getAddress: (isCentralAsia: boolean) => string;
  getCtaLabel: (isCentralAsia: boolean) => string;
}

// Hardcoded fallbacks — keep in sync with what's currently deployed.
// Source of truth is Sanity; these are last-known-good for outages or missing fields.
const FALLBACK_RAW = {
  siteName: `${siteConfig.name}`,
  tagline: "Empowering entrepreneurs in Central Asia",
  taglineRu: "Расширяя возможности предпринимателей в Центральной Азии",
  logoUrl: "/images/logo.png",
  logoMonoUrl: "/images/logo.png",
  logoAlt: `${siteConfig.name} logo`,
  contactEmail: siteConfig.email,
  contactPhone: "+1 (386) 517-1527",
  contactPhoneTel: "+13865171527",
  address: "2570 Jasmine Rd.\nPort Orange, FL 32128\nUnited States",
  addressRu: "2570 Jasmine Rd.\nПорт Оранж, Флорида 32128\nСША",
  addressLocality: "Port Orange",
  addressRegion: "FL",
  addressZip: "32128",
  addressCountry: "US",
  mapEmbedUrl:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.8234567890123!2d-81.02345678901234!3d29.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e6c8b123456789%3A0x123456789abcdef0!2s2570%20Jasmine%20Rd%2C%20Port%20Orange%2C%20FL%2032128%2C%20USA!5e0!3m2!1sen!2sus!4v1647894687693!5m2!1sen!2sus",
  social: {
    facebook: "https://www.facebook.com/Businesses.BB",
    instagram: "https://www.instagram.com/businessesbeyondborders/",
    linkedin:
      "https://www.linkedin.com/company/businesses-beyond-borders/?viewAsMember=true",
    twitter: "https://twitter.com/businessesbeyondborders",
    youtube: "https://youtube.com/@businessesbeyondborders",
  },
  primaryCTA: {
    label: "Get Involved",
    labelRu: "Принять участие",
    url: "/get-involved",
    openInNewTab: false,
  },
  defaultSeo: {
    metaTitle:
      `${siteConfig.name} — Empowering Entrepreneurs in Central Asia`,
    metaDescription:
      "501(c)(3) nonprofit based in Port Orange, FL. Financial literacy, entrepreneurship, and leadership training for Kazakhstan, Kyrgyzstan, and Uzbekistan.",
    ogImageUrl: `${siteConfig.url}/og-image.png`,
  },
};

// GROQ query — fetches the single siteSettings doc with logo assets dereferenced.
const SITE_SETTINGS_QUERY = /* groq */ `
  *[_type == "siteSettings"][0]{
    siteName,
    tagline,
    taglineRu,
    "logo": logo{..., "alt": alt},
    "logoMono": logoMono{..., "alt": alt},
    contactEmail,
    contactPhone,
    address,
    addressRu,
    addressLocality,
    addressRegion,
    addressZip,
    addressCountry,
    mapEmbedUrl,
    social,
    primaryCTA,
    primaryCTALabelRu,
    "defaultSeo": defaultSeo{
      metaTitle,
      metaDescription,
      "ogImage": ogImage{..., "alt": alt}
    }
  }
`;

interface RawSiteSettings {
  siteName?: string;
  tagline?: string;
  taglineRu?: string;
  logo?: { alt?: string; asset?: { _ref: string } } | null;
  logoMono?: { alt?: string; asset?: { _ref: string } } | null;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  addressRu?: string;
  addressLocality?: string;
  addressRegion?: string;
  addressZip?: string;
  addressCountry?: string;
  mapEmbedUrl?: string;
  social?: SanitySocialLinks;
  primaryCTA?: SanityCTA;
  primaryCTALabelRu?: string;
  defaultSeo?: {
    metaTitle?: string;
    metaDescription?: string;
    ogImage?: { asset?: { _ref: string } } | null;
  };
}

/** Strip non-digit characters from a phone string for `tel:` links. */
function toTelHref(phone?: string): string {
  if (!phone) return FALLBACK_RAW.contactPhoneTel;
  const digits = phone.replace(/\D/g, "");
  if (!digits) return FALLBACK_RAW.contactPhoneTel;
  // Assume US if 10 digits, otherwise prefix '+'
  return digits.length === 10 ? `+1${digits}` : `+${digits}`;
}

function mergeWithFallback(raw: RawSiteSettings | null): SiteSettings {
  const r = raw ?? {};
  const logoUrl = r.logo?.asset ? imageUrl(r.logo as any, 200) : FALLBACK_RAW.logoUrl;
  const logoMonoUrl = r.logoMono?.asset
    ? imageUrl(r.logoMono as any, 200)
    : FALLBACK_RAW.logoMonoUrl;
  const ogImageUrl = r.defaultSeo?.ogImage?.asset
    ? imageUrl(r.defaultSeo.ogImage as any, 1200)
    : FALLBACK_RAW.defaultSeo.ogImageUrl;

  const tagline = r.tagline || FALLBACK_RAW.tagline;
  const taglineRu = r.taglineRu || FALLBACK_RAW.taglineRu;
  const address = r.address || FALLBACK_RAW.address;
  const addressRu = r.addressRu || FALLBACK_RAW.addressRu;

  const primaryCTA: SanityCTA = {
    label: r.primaryCTA?.label || FALLBACK_RAW.primaryCTA.label,
    labelRu: r.primaryCTALabelRu || FALLBACK_RAW.primaryCTA.labelRu,
    url: r.primaryCTA?.url || FALLBACK_RAW.primaryCTA.url,
    openInNewTab: r.primaryCTA?.openInNewTab ?? FALLBACK_RAW.primaryCTA.openInNewTab,
  };

  return {
    siteName: r.siteName || FALLBACK_RAW.siteName,
    tagline,
    taglineRu,
    logoUrl,
    logoMonoUrl,
    logoAlt: r.logo?.alt || FALLBACK_RAW.logoAlt,
    contactEmail: r.contactEmail || FALLBACK_RAW.contactEmail,
    contactPhone: r.contactPhone || FALLBACK_RAW.contactPhone,
    contactPhoneTel: toTelHref(r.contactPhone),
    address,
    addressRu,
    addressLocality: r.addressLocality || FALLBACK_RAW.addressLocality,
    addressRegion: r.addressRegion || FALLBACK_RAW.addressRegion,
    addressZip: r.addressZip || FALLBACK_RAW.addressZip,
    addressCountry: r.addressCountry || FALLBACK_RAW.addressCountry,
    mapEmbedUrl: r.mapEmbedUrl || FALLBACK_RAW.mapEmbedUrl,
    social: {
      facebook: r.social?.facebook || FALLBACK_RAW.social.facebook,
      instagram: r.social?.instagram || FALLBACK_RAW.social.instagram,
      linkedin: r.social?.linkedin || FALLBACK_RAW.social.linkedin,
      twitter: r.social?.twitter || FALLBACK_RAW.social.twitter,
      youtube: r.social?.youtube || FALLBACK_RAW.social.youtube,
    },
    primaryCTA,
    defaultSeo: {
      metaTitle: r.defaultSeo?.metaTitle || FALLBACK_RAW.defaultSeo.metaTitle,
      metaDescription:
        r.defaultSeo?.metaDescription || FALLBACK_RAW.defaultSeo.metaDescription,
      ogImageUrl,
    },
    getTagline: (isCentralAsia: boolean) => getLocalized(tagline, taglineRu, isCentralAsia),
    getAddress: (isCentralAsia: boolean) => getLocalized(address, addressRu, isCentralAsia),
    getCtaLabel: (isCentralAsia: boolean) =>
      getLocalized(primaryCTA.label, primaryCTA.labelRu, isCentralAsia),
  };
}

// Re-export for callers that want the raw fallback shape (e.g. tests).
export const FALLBACK_SETTINGS: SiteSettings = mergeWithFallback(null);

export function useSiteSettings(): { settings: SiteSettings; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["siteSettings"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawSiteSettings | null>(SITE_SETTINGS_QUERY);
      } catch (err) {
        // Swallow — fallback will be used.
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("[siteSettings] Sanity fetch failed:", err);
        }
        return null;
      }
    },
  });

  return {
    settings: mergeWithFallback(data ?? null),
    isLoading,
  };
}
