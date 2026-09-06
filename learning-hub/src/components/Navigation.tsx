import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, LogIn, LayoutDashboard } from "lucide-react";
import { UserButton } from "@clerk/react";
import DonateButton from "./DonateButton";
import LanguageSwitcher from "./LanguageSwitcher";
import { Button } from "./ui/button";
import { useRegion } from "@/contexts/RegionContext";
import { useTranslation } from "@/hooks/useTranslation";
import { siteConfig } from "@/lib/seo";
import { clerkEnabled, SignedIn, SignedOut } from "@/lib/auth";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isRegionCentralAsia } = useRegion();
  const { t } = useTranslation();
  const location = useLocation();

  // Course pages have their own layout (sidebar) — use the solid header there.
  const solid = isScrolled || !["/"].includes(location.pathname);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: t("nav.courses"), path: "/programs" },
    { name: t("nav.community"), path: "/community" },
    { name: t("nav.resources"), path: "/resources" },
    { name: t("nav.blog"), path: "/blog" },
  ];

  const textClass = solid ? "text-gray-700 hover:text-[#C9922A]" : "text-white hover:text-[#C9922A]";

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        solid ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-gradient-to-b from-black/50 to-transparent py-5"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
            <img src={siteConfig.logo} alt={`${siteConfig.name} logo`} width={40} height={40} className="h-10 w-10 rounded-full" />
            <span className={`text-lg font-semibold hidden sm:inline ${solid ? "text-[#1B2A4A]" : "text-white"}`}>{siteConfig.name}</span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link key={link.path} to={link.path} className={`${textClass} transition-colors font-medium`}>
                {link.name}
              </Link>
            ))}
            <div className={solid ? "text-gray-700" : "text-white"}>
              <LanguageSwitcher />
            </div>
            {clerkEnabled && (
              <>
                <SignedOut>
                  <Link to="/sign-in" className={`${textClass} font-medium flex items-center gap-1.5`}>
                    <LogIn className="w-4 h-4" />
                    {t("nav.signIn")}
                  </Link>
                  <Link to="/sign-up">
                    <Button className="bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 text-white">{t("nav.join")}</Button>
                  </Link>
                </SignedOut>
                <SignedIn>
                  <Link to="/dashboard" className={`${textClass} font-medium flex items-center gap-1.5`}>
                    <LayoutDashboard className="w-4 h-4" />
                    {t("nav.dashboard")}
                  </Link>
                  <UserButton />
                </SignedIn>
              </>
            )}
            {!isRegionCentralAsia && <DonateButton size="sm" />}
          </div>

          {/* Mobile toggle */}
          <button
            className={`md:hidden transition-colors ${solid ? "text-gray-700" : "text-white"} hover:text-[#C9922A]`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-md shadow-lg py-4 animate-fade-in">
            <div className="container mx-auto px-4 flex flex-col space-y-3">
              {navLinks.map((link) => (
                <Link key={link.path} to={link.path} className="text-gray-700 hover:text-[#C9922A] transition-colors py-2">
                  {link.name}
                </Link>
              ))}
              <div className="py-2 text-gray-700">
                <LanguageSwitcher />
              </div>
              {clerkEnabled && (
                <>
                  <SignedOut>
                    <Link to="/sign-in" className="text-gray-700 hover:text-[#C9922A] py-2">
                      {t("nav.signIn")}
                    </Link>
                    <Link to="/sign-up">
                      <Button className="bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 text-white w-full">{t("nav.join")}</Button>
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link to="/dashboard" className="text-gray-700 hover:text-[#C9922A] py-2">
                      {t("nav.dashboard")}
                    </Link>
                    <div className="py-2">
                      <UserButton />
                    </div>
                  </SignedIn>
                </>
              )}
              {!isRegionCentralAsia && <DonateButton className="w-full" />}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
