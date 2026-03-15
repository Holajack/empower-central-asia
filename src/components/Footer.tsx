
import { Link } from "react-router-dom";
import { Facebook, Linkedin, Instagram } from "lucide-react";
import NewsletterSignup from "./NewsletterSignup";
import { useRegion } from "@/contexts/RegionContext";
import { useTranslation } from "@/hooks/useTranslation";

const Footer = () => {
  const { isCentralAsia } = useRegion();
  const { t } = useTranslation();

  return (
    <footer className="bg-white py-12 mt-auto border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
              <img
                src="/images/bbb-logo.png"
                alt="Businesses Beyond Borders logo"
                width={48}
                height={48}
                loading="lazy"
                className="h-12 w-12 rounded-full"
              />
              <h3 className="text-xl font-semibold text-[#1B2A4A]">
                Businesses Beyond Borders
              </h3>
            </Link>
            <p className="text-gray-600 mb-4">
              {t("footer.tagline")}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">{t("footer.quickLinks")}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/about"
                  className="text-gray-600 hover:text-[#1B2A4A] transition-colors"
                >
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link
                  to="/programs-and-impact"
                  className="text-gray-600 hover:text-[#1B2A4A] transition-colors"
                >
                  {t("nav.programs")}
                </Link>
              </li>
              <li>
                <Link
                  to="/success-stories"
                  className="text-gray-600 hover:text-[#1B2A4A] transition-colors"
                >
                  {t("nav.successStories")}
                </Link>
              </li>
              <li>
                <Link
                  to="/blog"
                  className="text-gray-600 hover:text-[#1B2A4A] transition-colors"
                >
                  {isCentralAsia ? "Блог" : "Blog"}
                </Link>
              </li>
              <li>
                <Link
                  to="/resources"
                  className="text-gray-600 hover:text-[#1B2A4A] transition-colors"
                >
                  {isCentralAsia ? "Бесплатные ресурсы" : "Free Resources"}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-[#1B2A4A] transition-colors"
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">{t("footer.contactUs")}</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-[#1B2A4A] transition-colors"
                >
                  {t("footer.emailUs")}
                </Link>
              </li>
              {isCentralAsia ? (
                <li>
                  <a
                    href="https://wa.me/13865171527"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#1B2A4A] transition-colors"
                  >
                    WhatsApp
                  </a>
                </li>
              ) : (
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-[#1B2A4A] transition-colors"
                  >
                    {t("footer.textUs")}
                  </Link>
                </li>
              )}
            </ul>
            <div className="mt-4">
              <h5 className="text-md font-semibold mb-2 text-gray-800">{t("footer.followUs")}</h5>
              <div className="flex space-x-4">
                <a
                  href="https://www.facebook.com/Businesses.BB"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={isCentralAsia ? "Наша страница в Facebook" : "Visit our Facebook page"}
                  className="text-gray-400 hover:text-[#1B2A4A] transition-colors"
                >
                  <Facebook className="w-6 h-6" />
                </a>
                <a
                  href="https://www.linkedin.com/company/businesses-beyond-borders/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={isCentralAsia ? "Наша страница в LinkedIn" : "Visit our LinkedIn page"}
                  className="text-gray-400 hover:text-[#1B2A4A] transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://www.instagram.com/businessesbeyondborders/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={isCentralAsia ? "Наша страница в Instagram" : "Visit our Instagram page"}
                  className="text-gray-400 hover:text-[#1B2A4A] transition-colors"
                >
                  <Instagram className="w-6 h-6" />
                </a>
              </div>
            </div>
          </div>
          <div>
            <NewsletterSignup />
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} {t("footer.copyright")}
            </p>
            <div className="flex space-x-6">
              <Link
                to="/privacy"
                className="text-gray-600 hover:text-[#1B2A4A] transition-colors text-sm"
              >
                {isCentralAsia ? "Политика конфиденциальности" : "Privacy Policy"}
              </Link>
              <Link
                to="/mobile-terms"
                className="text-gray-600 hover:text-[#1B2A4A] transition-colors text-sm"
              >
                {isCentralAsia ? "Условия мобильного использования" : "Mobile Terms"}
              </Link>
              <Link
                to="/sms"
                className="text-gray-600 hover:text-[#1B2A4A] transition-colors text-sm"
              >
                {isCentralAsia ? "SMS-уведомления" : "SMS Notifications"}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
