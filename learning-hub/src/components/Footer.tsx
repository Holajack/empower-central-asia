import { Link } from "react-router-dom";
import { Facebook, Linkedin, Instagram, Youtube, Send, Mail } from "lucide-react";
import NewsletterSignup from "./NewsletterSignup";
import { useRegion } from "@/contexts/RegionContext";
import { useTranslation } from "@/hooks/useTranslation";
import { siteConfig } from "@/lib/seo";

const Footer = () => {
  const { isCentralAsia } = useRegion();
  const { t } = useTranslation();

  const learnLinks = [
    { label: isCentralAsia ? "Финансовая грамотность" : "Financial Literacy", url: "/course/financial-literacy" },
    { label: isCentralAsia ? "Создание бизнеса" : "Business Creation", url: "/course/business-creation" },
    { label: isCentralAsia ? "Развитие лидерства" : "Leadership Development", url: "/course/leadership-development" },
    { label: isCentralAsia ? "Живые когорты" : "Live Cohorts", url: "/cohort" },
    { label: isCentralAsia ? "Калькулятор долгов" : "Debt Calculator", url: "/tools/debt-calculator" },
  ];
  const moreLinks = [
    { label: t("nav.courses"), url: "/programs" },
    { label: t("nav.community"), url: "/community" },
    { label: t("nav.resources"), url: "/resources" },
    { label: t("nav.blog"), url: "/blog" },
    { label: isCentralAsia ? "Подписаться на новости" : "Newsletter", url: "/newsletter" },
  ];

  const socials = [
    { href: siteConfig.social.facebook, Icon: Facebook, label: "Facebook" },
    { href: siteConfig.social.instagram, Icon: Instagram, label: "Instagram" },
    { href: siteConfig.social.linkedin, Icon: Linkedin, label: "LinkedIn" },
    { href: siteConfig.social.youtube, Icon: Youtube, label: "YouTube" },
    { href: siteConfig.social.telegram, Icon: Send, label: "Telegram" },
  ].filter((s) => s.href);

  return (
    <footer className="bg-white py-12 mt-auto border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
              <img src={siteConfig.logo} alt={`${siteConfig.name} logo`} width={48} height={48} loading="lazy" className="h-12 w-12 rounded-full" />
              <h3 className="text-xl font-semibold text-[#1B2A4A]">{siteConfig.name}</h3>
            </Link>
            <p className="text-gray-600 mb-4">{t("footer.tagline")}</p>
            <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-[#1B2A4A]">
              <Mail className="w-4 h-4" /> {siteConfig.email}
            </a>
            {socials.length > 0 && (
              <div className="flex space-x-4 mt-4">
                {socials.map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="text-gray-400 hover:text-[#1B2A4A] transition-colors">
                    <Icon className="w-6 h-6" />
                  </a>
                ))}
              </div>
            )}
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">{isCentralAsia ? "Учиться" : "Learn"}</h4>
            <ul className="space-y-2">
              {learnLinks.map((link) => (
                <li key={link.url}>
                  <Link to={link.url} className="text-gray-600 hover:text-[#1B2A4A] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              {moreLinks.map((link) => (
                <li key={link.url}>
                  <Link to={link.url} className="text-gray-600 hover:text-[#1B2A4A] transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <NewsletterSignup />
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-gray-600 text-sm">
              &copy; {new Date().getFullYear()} {siteConfig.orgName}. {t("footer.rights")}
            </p>
            <div className="flex space-x-6">
              <Link to="/privacy" className="text-gray-600 hover:text-[#1B2A4A] transition-colors text-sm">
                {t("footer.privacy")}
              </Link>
              <Link to="/community" className="text-gray-600 hover:text-[#1B2A4A] transition-colors text-sm">
                {t("footer.contact")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
