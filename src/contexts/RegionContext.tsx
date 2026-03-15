import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

// Central Asian country codes
const CENTRAL_ASIA_CODES = ["KG", "UZ", "KZ", "TJ", "TM"];

export type Region = "us" | "central-asia" | "other";
export type Language = "en" | "ru";

interface RegionState {
  region: Region;
  countryCode: string | null;
  language: Language;
  isLoading: boolean;
  isCentralAsia: boolean;
  isRegionCentralAsia: boolean;
  setLanguage: (lang: Language) => void;
  setRegionOverride: (region: Region) => void;
}

const RegionContext = createContext<RegionState>({
  region: "us",
  countryCode: null,
  language: "en",
  isLoading: true,
  isCentralAsia: false,
  isRegionCentralAsia: false,
  setLanguage: () => {},
  setRegionOverride: () => {},
});

const STORAGE_KEY = "bbb-region";
const LANG_KEY = "bbb-language";

interface StoredRegion {
  region: Region;
  countryCode: string;
  detectedAt: string;
}

export const RegionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [region, setRegion] = useState<Region>("us");
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [language, setLanguageState] = useState<Language>("en");
  const [isLoading, setIsLoading] = useState(true);

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem(LANG_KEY, lang);
    document.documentElement.lang = lang;
  }, []);

  const setRegionOverride = useCallback((newRegion: Region) => {
    setRegion(newRegion);
    const isCa = newRegion === "central-asia";
    const newLang = isCa ? "ru" : "en";
    setLanguage(newLang);
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        region: newRegion,
        countryCode: "OVERRIDE",
        detectedAt: new Date().toISOString(),
      })
    );
  }, [setLanguage]);

  useEffect(() => {
    const detectRegion = async () => {
      // Check localStorage first (cache for 24 hours)
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: StoredRegion = JSON.parse(stored);
          const detectedAt = new Date(parsed.detectedAt);
          const hoursSince = (Date.now() - detectedAt.getTime()) / (1000 * 60 * 60);

          if (hoursSince < 24) {
            setRegion(parsed.region);
            setCountryCode(parsed.countryCode);

            // Restore saved language preference, or auto-set based on region
            const savedLang = localStorage.getItem(LANG_KEY) as Language | null;
            if (savedLang) {
              setLanguageState(savedLang);
              document.documentElement.lang = savedLang;
            } else if (parsed.region === "central-asia") {
              setLanguageState("ru");
              document.documentElement.lang = "ru";
            }

            setIsLoading(false);
            return;
          }
        }
      } catch {
        // Ignore parse errors
      }

      // Detect via IP geolocation (free, no API key needed)
      try {
        const response = await fetch("https://ipapi.co/json/", {
          signal: AbortSignal.timeout(5000),
        });

        if (!response.ok) throw new Error("Geolocation API failed");

        const data = await response.json();
        const code = data.country_code?.toUpperCase() || "";
        const isCa = CENTRAL_ASIA_CODES.includes(code);
        const isUs = code === "US";

        const detectedRegion: Region = isCa ? "central-asia" : isUs ? "us" : "other";

        setCountryCode(code);
        setRegion(detectedRegion);

        // Auto-set language for Central Asia
        if (isCa) {
          const savedLang = localStorage.getItem(LANG_KEY) as Language | null;
          if (!savedLang) {
            setLanguageState("ru");
            document.documentElement.lang = "ru";
          }
        }

        // Cache the result
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({
            region: detectedRegion,
            countryCode: code,
            detectedAt: new Date().toISOString(),
          } as StoredRegion)
        );
      } catch {
        // On failure, default to "other" (shows everything in English)
        setRegion("other");
      } finally {
        setIsLoading(false);
      }
    };

    detectRegion();
  }, []);

  // isCentralAsia: true when language is Russian (for content translation)
  // isRegionCentralAsia: true only when IP is actually in Central Asia (for donate button hiding)
  const isRegionCentralAsia = region === "central-asia";
  const isCentralAsia = language === "ru";

  return (
    <RegionContext.Provider
      value={{
        region,
        countryCode,
        language,
        isLoading,
        isCentralAsia,
        isRegionCentralAsia,
        setLanguage,
        setRegionOverride,
      }}
    >
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => useContext(RegionContext);
