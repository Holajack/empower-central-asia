
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import DonateButton from "./DonateButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { useRegion } from "@/contexts/RegionContext";
import { useTranslation } from "@/hooks/useTranslation";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isCentralAsia, isRegionCentralAsia } = useRegion();
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: t("nav.home"), path: "/" },
    { name: t("nav.about"), path: "/about" },
    { name: t("nav.programs"), path: "/programs-and-impact" },
    { name: t("nav.getInvolved"), path: "/get-involved" },
    { name: t("nav.contact"), path: "/contact" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-4"
          : "bg-gradient-to-b from-black/50 to-transparent py-6"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 transition-opacity hover:opacity-80"
          >
            <img
              src="/images/bbb-logo.png"
              alt="Businesses Beyond Borders logo"
              width={40}
              height={40}
              className="h-10 w-10 rounded-full"
            />
            <span className={`text-xl font-semibold transition-colors hidden sm:inline ${
              isScrolled
                ? "text-[#1B2A4A]"
                : "text-white"
            }`}>
              Businesses Beyond Borders
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`${
                  isScrolled
                    ? "text-gray-600 hover:text-[#C9922A]"
                    : "text-white hover:text-[#C9922A]"
                } transition-colors font-medium`}
              >
                {link.name}
              </Link>
            ))}
            <div className={`${isScrolled ? "text-gray-600" : "text-white"}`}>
              <LanguageSwitcher />
            </div>
            {!isRegionCentralAsia && (
              <DonateButton className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white" />
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors ${
              isScrolled ? "text-gray-600" : "text-white"
            } hover:text-[#C9922A]`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg py-4 animate-fade-in">
            <div className="container mx-auto px-4 flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="text-gray-600 hover:text-[#C9922A] transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="py-2">
                <LanguageSwitcher />
              </div>
              {!isRegionCentralAsia && (
                <DonateButton className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white w-full" />
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
