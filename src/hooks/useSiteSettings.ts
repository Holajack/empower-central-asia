/**
 * Fetches the singleton `siteSettings` document from Sanity.
 *
 * Always returns a `settings` object — if the Sanity call fails or returns
 * nothing, the hardcoded fallbacks below are used so the site never breaks
 * when the CMS is unreachable.
 *
 * Usage:
 *   const { settings } = useSiteSettings();
 *   settings.contactEmail     // 'donations@businessesbeyondborders.com'
 *   settings.social.facebook  // 'https://www.facebook.com/Businesses.BB'
 */
import { useQuery } from "@tanstack/react-query";
import { sanity, imageUrl } from "@/lib/sanity";

export interface SanityCTA {
  label?: string;
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

export interface SiteSettings {
  siteName: string;
  tagline?: string;
  logoUrl?: string;
  logoMonoUrl?: string;
  logoAlt: string;
  contactEmail: string;
  contactPhone: string;
  contactPhoneTel: string; // E.164-ish, strip formatting
  address: string;
  social: SanitySocialLinks;
  primaryCTA?: SanityCTA;
}

// Hardcoded fallbacks — keep in sync with what's currently deployed.
// Source of truth for URLs is now Sanity; these are the last-known-good values
// used when Sanity returns nothing (first-load before CMS content, or outage).
export const FALLBACK_SETTINGS: SiteSettings = {
  siteName: "Businesses Beyond Borders",
  tagline: "Empowering entrepreneurs in Central Asia",
  logoUrl: "/images/bbb-logo.png",
  logoMonoUrl: "/images/bbb-logo.png",
  logoAlt: "Businesses Beyond Borders logo",
  contactEmail: "donations@businessesbeyondborders.com",
  contactPhone: "+1 (386) 517-1527",
  contactPhoneTel: "+13865171527",
  address: "2570 Jasmine Rd.\nPort Orange, FL 32128\nUnited States",
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
    url: "/get-involved",
    openInNewTab: false,
  },
};

// GROQ query — fetches the single siteSettings doc with logo assets dereferenced.
const SITE_SETTINGS_QUERY = /* groq */ `
  *[_type == "siteSettings"][0]{
    siteName,
    tagline,
    "logo": logo{..., "alt": alt},
    "logoMono": logoMono{..., "alt": alt},
    contactEmail,
    contactPhone,
    address,
    social,
    primaryCTA,
  }
`;

interface RawSiteSettings {
  siteName?: string;
  tagline?: string;
  logo?: { alt?: string; asset?: { _ref: string } } | null;
  logoMono?: { alt?: string; asset?: { _ref: string } } | null;
  contactEmail?: string;
  contactPhone?: string;
  address?: string;
  social?: SanitySocialLinks;
  primaryCTA?: SanityCTA;
}

/** Strip non-digit characters from a phone string for `tel:` links. */
function toTelHref(phone?: string): string {
  if (!phone) return FALLBACK_SETTINGS.contactPhoneTel;
  const digits = phone.replace(/\D/g, "");
  if (!digits) return FALLBACK_SETTINGS.contactPhoneTel;
  // Assume US if 10 digits, otherwise prefix '+'
  return digits.length === 10 ? `+1${digits}` : `+${digits}`;
}

function mergeWithFallback(raw: RawSiteSettings | null): SiteSettings {
  if (!raw) return FALLBACK_SETTINGS;

  const logoUrl = raw.logo?.asset
    ? imageUrl(raw.logo as any, 200)
    : FALLBACK_SETTINGS.logoUrl;
  const logoMonoUrl = raw.logoMono?.asset
    ? imageUrl(raw.logoMono as any, 200)
    : FALLBACK_SETTINGS.logoMonoUrl;

  return {
    siteName: raw.siteName || FALLBACK_SETTINGS.siteName,
    tagline: raw.tagline || FALLBACK_SETTINGS.tagline,
    logoUrl,
    logoMonoUrl,
    logoAlt: raw.logo?.alt || FALLBACK_SETTINGS.logoAlt,
    contactEmail: raw.contactEmail || FALLBACK_SETTINGS.contactEmail,
    contactPhone: raw.contactPhone || FALLBACK_SETTINGS.contactPhone,
    contactPhoneTel: toTelHref(raw.contactPhone),
    address: raw.address || FALLBACK_SETTINGS.address,
    social: {
      facebook: raw.social?.facebook || FALLBACK_SETTINGS.social.facebook,
      instagram: raw.social?.instagram || FALLBACK_SETTINGS.social.instagram,
      linkedin: raw.social?.linkedin || FALLBACK_SETTINGS.social.linkedin,
      twitter: raw.social?.twitter || FALLBACK_SETTINGS.social.twitter,
      youtube: raw.social?.youtube || FALLBACK_SETTINGS.social.youtube,
    },
    primaryCTA: raw.primaryCTA?.label
      ? raw.primaryCTA
      : FALLBACK_SETTINGS.primaryCTA,
  };
}

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
