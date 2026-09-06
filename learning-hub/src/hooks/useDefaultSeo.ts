/**
 * Returns the global default SEO metadata from Site Settings.
 *
 * Pages should still set their own page-specific Helmet tags. This helper
 * exists so pages that DON'T have a meta-title or og-image can fall back to
 * the BBB-wide default — a single source of truth in Studio.
 *
 * Usage:
 *   const seo = useDefaultSeo();
 *   <Helmet>
 *     <title>{pageTitle ?? seo.metaTitle}</title>
 *     <meta property="og:image" content={pageOgImage ?? seo.ogImageUrl} />
 *   </Helmet>
 */
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { siteConfig } from "@/lib/seo";

export interface DefaultSeo {
  metaTitle: string;
  metaDescription: string;
  ogImageUrl: string;
}

export function useDefaultSeo(): DefaultSeo {
  const { settings } = useSiteSettings();
  return {
    metaTitle: settings.defaultSeo?.metaTitle ?? settings.siteName,
    metaDescription:
      settings.defaultSeo?.metaDescription ??
      `${siteConfig.name} — empowering entrepreneurs in Central Asia.`,
    ogImageUrl:
      settings.defaultSeo?.ogImageUrl ??
      `${siteConfig.url}/og-image.png`,
  };
}
