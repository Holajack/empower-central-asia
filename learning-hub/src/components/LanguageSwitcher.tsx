import { useRegion } from "@/contexts/RegionContext";
import { Globe } from "lucide-react";

interface Props {
  className?: string;
}

const LanguageSwitcher = ({ className = "" }: Props) => {
  const { language, setLanguage } = useRegion();
  const next = language === "en" ? "ru" : "en";

  return (
    <button
      type="button"
      onClick={() => setLanguage(next)}
      className={`flex items-center gap-1.5 text-sm font-medium transition-colors hover:text-[#C9922A] ${className}`}
      aria-label={language === "en" ? "Переключить на русский" : "Switch to English"}
      title={language === "en" ? "Переключить на русский" : "Switch to English"}
      lang={next}
    >
      <Globe className="w-4 h-4" aria-hidden="true" />
      <span>{language === "en" ? "Русский" : "English"}</span>
    </button>
  );
};

export default LanguageSwitcher;
