import { useCallback } from "react";
import { useRegion } from "@/contexts/RegionContext";
import translations, { TranslationKey } from "@/i18n/translations";

export const useTranslation = () => {
  const { language } = useRegion();

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[language]?.[key] || translations.en[key] || key;
    },
    [language]
  );

  return { t, language };
};
