import { Link } from "react-router-dom";
import { Facebook, Linkedin, Instagram } from "lucide-react";
import NewsletterSignup from "./NewsletterSignup";
import { useRegion } from "@/contexts/RegionContext";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { useFooterSettings } from "@/hooks/useFooterSettings";

const Footer = () => {
  const { isCentralAsia } = useRegion();
  const { settings } = useSiteSettings();
  const { footer } = useFooterSettings();

  const quickLinks = footer.getQuickLinks(isCentralAsia);
  const legalLinks = footer.getLegalLinks(isCentralAsia);

  return (
    <footer className="bg-white py-12 mt-auto border-t">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link to="/" className="flex items-center gap-3 mb-4 hover:opacity-80 transition-opacity">
              <img
                src={settings.logoUrl}
                alt={settings.logoAlt}
                width={48}
                height={48}
                loading="lazy"
                className="h-12 w-12 rounded-full"
              />
              <h3 className="text-xl font-semibold text-[#1B2A4A]">
                {settings.siteName}
              </h3>
            </Link>
            <p className="text-gray-600 mb-4">
              {settings.getTagline(isCentralAsia)}
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
              {footer.getQuickLinksHeading(isCentralAsia)}
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={`${link.label}-${link.url}`}>
                  <Link
                    to={link.url}
                    className="text-gray-600 hover:text-[#1B2A4A] transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 text-gray-800">
              {footer.getContactHeading(isCentralAsia)}
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/contact"
                  className="text-gray-600 hover:text-[#1B2A4A] transition-colors"
                >
                  {footer.getEmailUsLabel(isCentralAsia)}
                </Link>
              </li>
              {isCentralAsia ? (
                <li>
                  <a
                    href={`https://wa.me/${settings.contactPhoneTel.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-[#1B2A4A] transition-colors"
                  >
                    {footer.whatsAppLabel}
                  </a>
                </li>
              ) : (
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-[#1B2A4A] transition-colors"
                  >
                    {footer.getTextUsLabel(isCentralAsia)}
                  </Link>
                </li>
              )}
            </ul>
            <div className="mt-4">
              <h5 className="text-md font-semibold mb-2 text-gray-800">
                {footer.getFollowUsHeading(isCentralAsia)}
              </h5>
              <div className="flex space-x-4">
                {settings.social.facebook && (
                  <a
                    href={settings.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={isCentralAsia ? "Наша страница в Facebook" : "Visit our Facebook page"}
                    className="text-gray-400 hover:text-[#1B2A4A] transition-colors"
                  >
                    <Facebook className="w-6 h-6" />
                  </a>
                )}
                {settings.social.linkedin && (
                  <a
                    href={settings.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={isCentralAsia ? "Наша страница в LinkedIn" : "Visit our LinkedIn page"}
                    className="text-gray-400 hover:text-[#1B2A4A] transition-colors"
                  >
                    <Linkedin className="w-6 h-6" />
                  </a>
                )}
                {settings.social.instagram && (
                  <a
                    href={settings.social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={isCentralAsia ? "Наша страница в Instagram" : "Visit our Instagram page"}
                    className="text-gray-400 hover:text-[#1B2A4A] transition-colors"
                  >
                    <Instagram className="w-6 h-6" />
                  </a>
                )}
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
              &copy; {new Date().getFullYear()} {footer.getCopyright(isCentralAsia)}
            </p>
            <div className="flex space-x-6">
              {legalLinks.map((link) => (
                <Link
                  key={`${link.label}-${link.url}`}
                  to={link.url}
                  className="text-gray-600 hover:text-[#1B2A4A] transition-colors text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
