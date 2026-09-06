/**
 * Optional Convex client for community features (progress sync, course chat,
 * presence). Enabled only when VITE_CONVEX_URL is set at build time.
 *
 * Function references use `anyApi` so the app compiles before `npx convex dev`
 * has generated `convex/_generated`. Once you run Convex locally you can swap
 * to the typed `api` import if you prefer.
 */
import { ConvexReactClient } from "convex/react";
import { anyApi } from "convex/server";

export const convexUrl = import.meta.env.VITE_CONVEX_URL as string | undefined;
export const convexEnabled = Boolean(convexUrl);
export const convexClient: ConvexReactClient | null = convexEnabled ? new ConvexReactClient(convexUrl!) : null;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const api: any = anyApi;
