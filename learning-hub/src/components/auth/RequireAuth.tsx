import type { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthUser, signInHref } from "@/lib/auth";
import { useRegion } from "@/contexts/RegionContext";

/**
 * Redirects signed-out visitors to the sign-in page (returning them here
 * afterwards). Renders children immediately in "open" mode.
 */
export default function RequireAuth({ children }: { children: ReactNode }) {
  const { isLoaded, isSignedIn, mode } = useAuthUser();
  const { language } = useRegion();
  const location = useLocation();

  if (mode === "open") return <>{children}</>;
  if (!isLoaded) return <div className="min-h-[60vh]" aria-busy="true" />;
  if (!isSignedIn) {
    const href = signInHref(location.pathname + location.search, language);
    // Strip the language prefix — Navigate is relative to the router basename.
    const rel = href.replace(/^\/ru(?=\/|$)/, "") || "/";
    return <Navigate to={rel} replace />;
  }
  return <>{children}</>;
}
