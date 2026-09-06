/**
 * Mirrors the signed-in Clerk user into Convex (`users` table) so chat and
 * presence can show names without exposing Clerk data client-side.
 * No-op without Convex.
 */
import { useEffect } from "react";
import { useMutation } from "convex/react";
import { api, convexEnabled } from "@/lib/convex";
import { useAuthUser } from "@/lib/auth";

function useCloudUserConvex() {
  const { isSignedIn, user } = useAuthUser();
  const upsert = useMutation(api.users.upsert);
  useEffect(() => {
    if (!isSignedIn || !user) return;
    upsert({
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      language: user.profile.language ?? "en",
      country: user.profile.country ?? "",
      goals: user.profile.goals ?? [],
    }).catch(() => {});
  }, [isSignedIn, user?.id, user?.profile.language, user?.profile.country, upsert]); // eslint-disable-line react-hooks/exhaustive-deps
}

function useCloudUserLocal() {}

export const useCloudUser: () => void = convexEnabled ? useCloudUserConvex : useCloudUserLocal;
