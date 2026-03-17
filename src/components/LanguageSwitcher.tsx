import { useRegion } from "@/contexts/RegionContext";
import { Globe } from "lucide-react";

const LanguageSwitcher = () => {
  const { language, setLanguage } = useRegion();

  const toggle = () => {
    setLanguage(language === "en" ? "ru" : "en");
  };

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#C9922A]"
      aria-label={language === "en" ? "Switch to Russian" : "Переключить на английский"}
      title={language === "en" ? "Переключить на русский" : "Switch to English"}
    >
      <Globe className="w-4 h-4" />
      <span>{language === "en" ? "RU" : "EN"}</span>
    </button>
  );
};

export default LanguageSwitcher;
