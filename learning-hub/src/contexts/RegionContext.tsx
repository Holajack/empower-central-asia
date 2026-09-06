import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { currentLanguage, langPath } from "@/lib/locale";
import type { SupportedLanguage } from "@/lib/seo";

// Central Asian country codes
const CENTRAL_ASIA_CODES = ["KG", "UZ", "KZ", "TJ", "TM"];

export type Region = "us" | "central-asia" | "other";
export type Language = SupportedLanguage;

interface RegionState {
  region: Region;
  countryCode: string | null;
  language: Language;
  isLoading: boolean;
  /** true when the UI language is Russian (content translation switch). */
  isCentralAsia: boolean;
  /** true only when the visitor's IP is actually in Central Asia (hides donate prompts). */
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

export const STORAGE_KEY = "hub-region";
export const LANG_KEY = "hub-language";

interface StoredRegion {
  region: Region;
  countryCode: string;
  detectedAt: string;
}

function readStoredLanguage(): Language | null {
  try {
    const v = localStorage.getItem(LANG_KEY);
    return v === "ru" || v === "en" ? v : null;
  } catch {
    return null;
  }
}

/**
 * Language is derived from the URL prefix (/ru) — that is the source of truth
 * so every page has a stable, indexable URL per language. Switching language
 * performs a full navigation to the same page under the other prefix.
 */
export const RegionProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [region, setRegion] = useState<Region>("us");
  const [countryCode, setCountryCode] = useState<string | null>(null);
  const [language] = useState<Language>(() => currentLanguage());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const setLanguage = useCallback((lang: Language) => {
    try {
      localStorage.setItem(LANG_KEY, lang);
    } catch {
      /* ignore */
    }
    if (lang === language) return;
    const target = langPath(window.location.pathname, lang) + window.location.search + window.location.hash;
    window.location.assign(target);
  }, [language]);

  const setRegionOverride = useCallback(
    (newRegion: Region) => {
      setRegion(newRegion);
      try {
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ region: newRegion, countryCode: "OVERRIDE", detectedAt: new Date().toISOString() })
        );
      } catch {
        /* ignore */
      }
      setLanguage(newRegion === "central-asia" ? "ru" : "en");
    },
    [setLanguage]
  );

  useEffect(() => {
    // Skip network detection while prerendering static HTML.
    if (typeof window !== "undefined" && (window as unknown as { __PRERENDERING?: boolean }).__PRERENDERING) {
      setIsLoading(false);
      return;
    }

    const maybeRedirectToRussian = (detected: Region) => {
      // First visit from Central Asia with no explicit language choice → Russian.
      if (detected !== "central-asia") return;
      if (readStoredLanguage()) return;
      if (language === "ru") return;
      try {
        localStorage.setItem(LANG_KEY, "ru");
      } catch {
        /* ignore */
      }
      window.location.replace(langPath(window.location.pathname, "ru") + window.location.search);
    };

    const detectRegion = async () => {
      try {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed: StoredRegion = JSON.parse(stored);
          const hoursSince = (Date.now() - new Date(parsed.detectedAt).getTime()) / (1000 * 60 * 60);
          if (hoursSince < 24) {
            setRegion(parsed.region);
            setCountryCode(parsed.countryCode);
            setIsLoading(false);
            return;
          }
        }
      } catch {
        /* ignore parse errors */
      }

      try {
        const response = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(5000) });
        if (!response.ok) throw new Error("Geolocation API failed");
        const data = await response.json();
        const code = (data.country_code || "").toUpperCase();
        const isCa = CENTRAL_ASIA_CODES.includes(code);
        const detectedRegion: Region = isCa ? "central-asia" : code === "US" ? "us" : "other";
        setCountryCode(code);
        setRegion(detectedRegion);
        localStorage.setItem(
          STORAGE_KEY,
          JSON.stringify({ region: detectedRegion, countryCode: code, detectedAt: new Date().toISOString() } as StoredRegion)
        );
        maybeRedirectToRussian(detectedRegion);
      } catch {
        setRegion("other");
      } finally {
        setIsLoading(false);
      }
    };

    detectRegion();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const isRegionCentralAsia = region === "central-asia";
  const isCentralAsia = language === "ru";

  return (
    <RegionContext.Provider
      value={{ region, countryCode, language, isLoading, isCentralAsia, isRegionCentralAsia, setLanguage, setRegionOverride }}
    >
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => useContext(RegionContext);
