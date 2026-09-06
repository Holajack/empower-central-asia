/**
 * Authentication layer (Clerk).
 *
 * Two modes, chosen at build time:
 *   - "clerk": VITE_CLERK_PUBLISHABLE_KEY is set → real sign-in / sign-up.
 *   - "open":  no key → everything renders as if signed in (useful for local
 *              development and for the first deploy before Clerk is set up).
 *
 * All pages talk to auth through `useAuthUser()` and the small components
 * below, never through Clerk directly, so the mode switch is transparent.
 */
import { useCallback, type ReactNode } from "react";
import { ClerkProvider, Show, useUser, useClerk } from "@clerk/react";
import { enUS, ruRU } from "@clerk/localizations";
import { useRegion } from "@/contexts/RegionContext";
import { langPath } from "@/lib/locale";
import type { SupportedLanguage } from "@/lib/seo";

const publishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY as string | undefined;
export const authMode: "clerk" | "open" = publishableKey ? "clerk" : "open";
export const clerkEnabled = authMode === "clerk";

export type LearningGoal = "financial-literacy" | "business-creation" | "leadership" | "community";

/** Profile fields we store in Clerk `unsafeMetadata` (user-editable). */
export interface HubProfile {
  language?: SupportedLanguage;
  country?: string;
  city?: string;
  goals?: LearningGoal[];
  whatsapp?: string;
  onboarded?: boolean;
  onboardedAt?: string;
  source?: string;
}

export interface HubUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  fullName: string;
  imageUrl: string;
  profile: HubProfile;
}

export interface AuthState {
  mode: "clerk" | "open";
  isLoaded: boolean;
  isSignedIn: boolean;
  user: HubUser | null;
  updateProfile: (patch: Partial<HubProfile>) => Promise<void>;
  signOut: () => Promise<void>;
}

// ─── Provider ───────────────────────────────────────────────────────────────

export function AuthProvider({ children }: { children: ReactNode }) {
  const { language } = useRegion();
  if (!clerkEnabled) return <>{children}</>;
  return (
    <ClerkProvider
      publishableKey={publishableKey!}
      localization={language === "ru" ? ruRU : enUS}
      signInUrl={langPath("/sign-in", language)}
      signUpUrl={langPath("/sign-up", language)}
      signInFallbackRedirectUrl={langPath("/dashboard", language)}
      signUpFallbackRedirectUrl={langPath("/welcome", language)}
      afterSignOutUrl={langPath("/", language)}
      appearance={{
        variables: {
          colorPrimary: "#C9922A",
          borderRadius: "0.5rem",
          fontFamily: "inherit",
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}

// ─── Hooks ──────────────────────────────────────────────────────────────────

function useAuthUserClerk(): AuthState {
  const { isLoaded, isSignedIn, user } = useUser();
  const clerk = useClerk();

  const updateProfile = useCallback(
    async (patch: Partial<HubProfile>) => {
      if (!user) return;
      const current = (user.unsafeMetadata ?? {}) as HubProfile;
      await user.update({ unsafeMetadata: { ...current, ...patch } });
      await user.reload();
    },
    [user]
  );

  const signOut = useCallback(async () => {
    await clerk.signOut();
  }, [clerk]);

  const hubUser: HubUser | null =
    isSignedIn && user
      ? {
          id: user.id,
          email: user.primaryEmailAddress?.emailAddress ?? "",
          firstName: user.firstName ?? "",
          lastName: user.lastName ?? "",
          fullName: user.fullName ?? [user.firstName, user.lastName].filter(Boolean).join(" "),
          imageUrl: user.imageUrl,
          profile: (user.unsafeMetadata ?? {}) as HubProfile,
        }
      : null;

  return { mode: "clerk", isLoaded, isSignedIn: Boolean(isSignedIn), user: hubUser, updateProfile, signOut };
}

function useAuthUserOpen(): AuthState {
  const updateProfile = useCallback(async () => {}, []);
  const signOut = useCallback(async () => {}, []);
  return { mode: "open", isLoaded: true, isSignedIn: true, user: null, updateProfile, signOut };
}

/** Unified auth hook — safe to call anywhere under <AuthProvider>. */
export const useAuthUser: () => AuthState = clerkEnabled ? useAuthUserClerk : useAuthUserOpen;

// ─── Conditional rendering helpers ──────────────────────────────────────────

export function SignedIn({ children }: { children: ReactNode }) {
  if (!clerkEnabled) return <>{children}</>;
  return <Show when="signed-in">{children}</Show>;
}

export function SignedOut({ children }: { children: ReactNode }) {
  if (!clerkEnabled) return null;
  return <Show when="signed-out">{children}</Show>;
}

/** Build the sign-in URL that returns to `returnTo` after auth. */
export function signInHref(returnTo: string, language: SupportedLanguage): string {
  const base = langPath("/sign-in", language);
  return `${base}?redirect_url=${encodeURIComponent(langPath(returnTo, language))}`;
}

export function signUpHref(returnTo: string, language: SupportedLanguage): string {
  const base = langPath("/sign-up", language);
  return `${base}?redirect_url=${encodeURIComponent(langPath(returnTo, language))}`;
}
