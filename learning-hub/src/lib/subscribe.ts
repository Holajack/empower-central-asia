/**
 * Sends a learner / subscriber record to the email backend.
 *
 * Order of preference (all optional, all env-driven):
 *   1. VITE_SUBSCRIBE_ENDPOINT — Netlify function `/.netlify/functions/subscribe`
 *      (default) which upserts into ActiveCampaign with a language tag.
 *   2. VITE_GOOGLE_SHEET_URL — legacy Google Apps Script webhook (fire & forget).
 *
 * Never throws: email capture must not block the learner.
 */
export interface SubscribePayload {
  email: string;
  firstName?: string;
  lastName?: string;
  language: "en" | "ru";
  country?: string;
  city?: string;
  whatsapp?: string;
  phone?: string;
  goals?: string[];
  interests?: string[];
  /** e.g. "signup", "newsletter", "cohort-interest", "resource-download" */
  source: string;
  resource?: string;
  clerkUserId?: string;
  consent?: boolean;
}

const endpoint = (import.meta.env.VITE_SUBSCRIBE_ENDPOINT as string | undefined) ?? "/.netlify/functions/subscribe";
const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL as string | undefined;

export async function subscribe(payload: SubscribePayload): Promise<{ ok: boolean; via: string }> {
  const body = JSON.stringify({ ...payload, page: typeof window !== "undefined" ? window.location.href : undefined, timestamp: new Date().toISOString() });
  let via = "none";
  let ok = false;

  if (endpoint) {
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body });
      ok = res.ok;
      via = "function";
    } catch {
      ok = false;
    }
  }

  if (sheetUrl) {
    // Legacy Google Sheet pipeline (opaque no-cors response → assume success).
    fetch(sheetUrl, { method: "POST", mode: "no-cors", headers: { "Content-Type": "application/json" }, body }).catch(() => {});
    if (!ok) {
      ok = true;
      via = "sheet";
    }
  }

  return { ok, via };
}
