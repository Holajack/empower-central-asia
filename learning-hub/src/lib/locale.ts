/**
 * URL-prefix language helpers.
 *
 * English lives at `/path`, Russian at `/ru/path`. React Router is mounted
 * with `basename="/ru"` when the page loads under the Russian prefix, so all
 * internal <Link to="/course/..."> automatically stay in the same language.
 */
import type { SupportedLanguage } from "@/lib/seo";

export const LANG_PREFIX: Record<SupportedLanguage, string> = { en: "", ru: "/ru" };

export function getLangFromPath(pathname: string): SupportedLanguage {
  return pathname === "/ru" || pathname.startsWith("/ru/") ? "ru" : "en";
}

/** Remove the language prefix from a full pathname. */
export function stripLangPrefix(pathname: string): string {
  if (pathname === "/ru") return "/";
  if (pathname.startsWith("/ru/")) return pathname.slice(3) || "/";
  return pathname;
}

/** Build a full pathname (with prefix) for the given language. */
export function langPath(path: string, lang: SupportedLanguage): string {
  const clean = stripLangPrefix(path.startsWith("/") ? path : `/${path}`);
  if (lang === "ru") return clean === "/" ? "/ru" : `/ru${clean}`;
  return clean;
}

/** The basename React Router should use for the current document. */
export function currentBasename(): string {
  if (typeof window === "undefined") return "/";
  return getLangFromPath(window.location.pathname) === "ru" ? "/ru" : "/";
}

export function currentLanguage(): SupportedLanguage {
  if (typeof window === "undefined") return "en";
  return getLangFromPath(window.location.pathname);
}
