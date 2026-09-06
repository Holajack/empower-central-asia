/**
 * Global, route-aware SEO tags: canonical, hreflang alternates (en / ru /
 * x-default), og:locale, and site-wide Organization + WebSite JSON-LD.
 *
 * Pages still set their own <title>, description, and page-level schema via
 * react-helmet; this component provides the parts every page needs and that
 * depend on the current language prefix.
 */
import { Helmet } from "react-helmet";
import { useLocation } from "react-router-dom";
import { useRegion } from "@/contexts/RegionContext";
import { absoluteUrl, generateOrganizationSchema, generateWebsiteSchema, siteConfig } from "@/lib/seo";
import { stripLangPrefix } from "@/lib/locale";

export default function LocaleSEO() {
  const { pathname } = useLocation();
  const { language } = useRegion();
  // React Router already strips the basename, but be defensive.
  const path = stripLangPrefix(pathname);
  const enUrl = absoluteUrl(path, "en");
  const ruUrl = absoluteUrl(path, "ru");
  const canonical = language === "ru" ? ruUrl : enUrl;

  return (
    <Helmet>
      <html lang={language} />
      <link rel="canonical" href={canonical} />
      <link rel="alternate" hrefLang="en" href={enUrl} />
      <link rel="alternate" hrefLang="ru" href={ruUrl} />
      <link rel="alternate" hrefLang="x-default" href={enUrl} />
      <meta property="og:locale" content={language === "ru" ? "ru_RU" : "en_US"} />
      <meta property="og:locale:alternate" content={language === "ru" ? "en_US" : "ru_RU"} />
      <meta property="og:site_name" content={siteConfig.name} />
      <script type="application/ld+json">{JSON.stringify(generateOrganizationSchema())}</script>
      <script type="application/ld+json">{JSON.stringify(generateWebsiteSchema(language))}</script>
    </Helmet>
  );
}
