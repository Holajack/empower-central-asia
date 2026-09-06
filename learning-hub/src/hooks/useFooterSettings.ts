/**
 * Footer-specific Sanity content (singleton). Quick links, contact section
 * labels, follow-us heading, copyright, legal links — all editable in
 * Studio without touching code.
 *
 * Hardcoded fallbacks mirror what the Footer component used to render
 * via i18n keys + inline ternaries, so the page never breaks if Sanity is
 * unreachable.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";
import { siteConfig } from "@/lib/seo";

export interface FooterLink {
  label: string;
  labelRu?: string;
  url: string;
}

export interface FooterSettings {
  quickLinksHeading: string;
  quickLinksHeadingRu?: string;
  quickLinks: FooterLink[];
  contactHeading: string;
  contactHeadingRu?: string;
  emailUsLabel: string;
  emailUsLabelRu?: string;
  textUsLabel: string;
  textUsLabelRu?: string;
  whatsAppLabel: string;
  followUsHeading: string;
  followUsHeadingRu?: string;
  copyright: string;
  copyrightRu?: string;
  legalLinks: FooterLink[];
  /** Helpers — pass isCentralAsia, get localized strings. */
  getQuickLinksHeading: (isCA: boolean) => string;
  getContactHeading: (isCA: boolean) => string;
  getEmailUsLabel: (isCA: boolean) => string;
  getTextUsLabel: (isCA: boolean) => string;
  getFollowUsHeading: (isCA: boolean) => string;
  getCopyright: (isCA: boolean) => string;
  getQuickLinks: (isCA: boolean) => Array<{ label: string; url: string }>;
  getLegalLinks: (isCA: boolean) => Array<{ label: string; url: string }>;
}

const FALLBACK_FOOTER = {
  quickLinksHeading: "Quick Links",
  quickLinksHeadingRu: "Быстрые ссылки",
  quickLinks: [
    { label: "About", labelRu: "О нас", url: "/about" },
    { label: "Programs", labelRu: "Программы", url: "/programs" },
    { label: "Success Stories", labelRu: "Истории успеха", url: "/success-stories" },
    { label: "Blog", labelRu: "Блог", url: "/blog" },
    { label: "Free Resources", labelRu: "Бесплатные ресурсы", url: "/resources" },
    { label: "Contact", labelRu: "Контакты", url: "/contact" },
  ] as FooterLink[],
  contactHeading: "Contact Us",
  contactHeadingRu: "Контакты",
  emailUsLabel: "Email us",
  emailUsLabelRu: "Написать нам",
  textUsLabel: "Text us",
  textUsLabelRu: "Написать SMS",
  whatsAppLabel: "WhatsApp",
  followUsHeading: "Follow Us",
  followUsHeadingRu: "Мы в соцсетях",
  copyright: `${siteConfig.name}. All rights reserved.`,
  copyrightRu: `${siteConfig.name}. Все права защищены.`,
  legalLinks: [
    { label: "Privacy Policy", labelRu: "Политика конфиденциальности", url: "/privacy" },
    { label: "Mobile Terms", labelRu: "Условия мобильного использования", url: "/mobile-terms" },
    { label: "SMS Notifications", labelRu: "SMS-уведомления", url: "/sms" },
  ] as FooterLink[],
};

const FOOTER_QUERY = /* groq */ `
  *[_type == "footerSettings"][0]{
    quickLinksHeading,
    quickLinksHeadingRu,
    quickLinks,
    contactHeading,
    contactHeadingRu,
    emailUsLabel,
    emailUsLabelRu,
    textUsLabel,
    textUsLabelRu,
    whatsAppLabel,
    followUsHeading,
    followUsHeadingRu,
    copyright,
    copyrightRu,
    legalLinks
  }
`;

interface RawFooter {
  quickLinksHeading?: string;
  quickLinksHeadingRu?: string;
  quickLinks?: FooterLink[];
  contactHeading?: string;
  contactHeadingRu?: string;
  emailUsLabel?: string;
  emailUsLabelRu?: string;
  textUsLabel?: string;
  textUsLabelRu?: string;
  whatsAppLabel?: string;
  followUsHeading?: string;
  followUsHeadingRu?: string;
  copyright?: string;
  copyrightRu?: string;
  legalLinks?: FooterLink[];
}

function localizeLinkList(links: FooterLink[], isCA: boolean) {
  return links.map((l) => ({
    label: getLocalized(l.label, l.labelRu, isCA),
    url: l.url,
  }));
}

function shape(raw: RawFooter | null): FooterSettings {
  const r = raw ?? {};
  const quickLinks =
    r.quickLinks && r.quickLinks.length > 0 ? r.quickLinks : FALLBACK_FOOTER.quickLinks;
  const legalLinks =
    r.legalLinks && r.legalLinks.length > 0 ? r.legalLinks : FALLBACK_FOOTER.legalLinks;

  const quickLinksHeading = r.quickLinksHeading || FALLBACK_FOOTER.quickLinksHeading;
  const quickLinksHeadingRu = r.quickLinksHeadingRu || FALLBACK_FOOTER.quickLinksHeadingRu;
  const contactHeading = r.contactHeading || FALLBACK_FOOTER.contactHeading;
  const contactHeadingRu = r.contactHeadingRu || FALLBACK_FOOTER.contactHeadingRu;
  const emailUsLabel = r.emailUsLabel || FALLBACK_FOOTER.emailUsLabel;
  const emailUsLabelRu = r.emailUsLabelRu || FALLBACK_FOOTER.emailUsLabelRu;
  const textUsLabel = r.textUsLabel || FALLBACK_FOOTER.textUsLabel;
  const textUsLabelRu = r.textUsLabelRu || FALLBACK_FOOTER.textUsLabelRu;
  const whatsAppLabel = r.whatsAppLabel || FALLBACK_FOOTER.whatsAppLabel;
  const followUsHeading = r.followUsHeading || FALLBACK_FOOTER.followUsHeading;
  const followUsHeadingRu = r.followUsHeadingRu || FALLBACK_FOOTER.followUsHeadingRu;
  const copyright = r.copyright || FALLBACK_FOOTER.copyright;
  const copyrightRu = r.copyrightRu || FALLBACK_FOOTER.copyrightRu;

  return {
    quickLinksHeading,
    quickLinksHeadingRu,
    quickLinks,
    contactHeading,
    contactHeadingRu,
    emailUsLabel,
    emailUsLabelRu,
    textUsLabel,
    textUsLabelRu,
    whatsAppLabel,
    followUsHeading,
    followUsHeadingRu,
    copyright,
    copyrightRu,
    legalLinks,
    getQuickLinksHeading: (isCA) => getLocalized(quickLinksHeading, quickLinksHeadingRu, isCA),
    getContactHeading: (isCA) => getLocalized(contactHeading, contactHeadingRu, isCA),
    getEmailUsLabel: (isCA) => getLocalized(emailUsLabel, emailUsLabelRu, isCA),
    getTextUsLabel: (isCA) => getLocalized(textUsLabel, textUsLabelRu, isCA),
    getFollowUsHeading: (isCA) => getLocalized(followUsHeading, followUsHeadingRu, isCA),
    getCopyright: (isCA) => getLocalized(copyright, copyrightRu, isCA),
    getQuickLinks: (isCA) => localizeLinkList(quickLinks, isCA),
    getLegalLinks: (isCA) => localizeLinkList(legalLinks, isCA),
  };
}

export function useFooterSettings(): { footer: FooterSettings; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["footerSettings"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawFooter | null>(FOOTER_QUERY);
      } catch {
        return null;
      }
    },
  });
  return { footer: shape(data ?? null), isLoading };
}
