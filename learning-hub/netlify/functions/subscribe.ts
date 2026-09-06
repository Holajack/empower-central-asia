/**
 * POST /.netlify/functions/subscribe
 * Body: { email, firstName?, lastName?, language: "en"|"ru", country?, goals?, source }
 *
 * Upserts the contact into ActiveCampaign (tagged by language) and/or the
 * legacy Google Sheet. Always returns 200 to the browser when the email is
 * valid so a backend hiccup never blocks a learner; details are in the body.
 */
import type { Handler } from "@netlify/functions";
import { isValidEmail, syncContact, type ContactPayload } from "../lib/contacts";

const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "").split(",").map((s) => s.trim()).filter(Boolean);

function corsHeaders(origin?: string) {
  const allow = ALLOWED_ORIGINS.length === 0 || (origin && ALLOWED_ORIGINS.includes(origin)) ? origin || "*" : ALLOWED_ORIGINS[0];
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };
}

export const handler: Handler = async (event) => {
  const headers = corsHeaders(event.headers.origin);
  if (event.httpMethod === "OPTIONS") return { statusCode: 204, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: JSON.stringify({ error: "Method not allowed" }) };

  let payload: ContactPayload;
  try {
    payload = JSON.parse(event.body || "{}");
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "Invalid JSON" }) };
  }
  if (!payload.email || !isValidEmail(payload.email)) {
    return { statusCode: 400, headers, body: JSON.stringify({ error: "A valid email is required" }) };
  }
  // Basic honeypot / abuse guard.
  if ((payload as unknown as Record<string, unknown>).website) return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };

  const result = await syncContact(payload);
  if (result.errors.length) console.error("[subscribe] sync errors", result.errors);
  return { statusCode: 200, headers, body: JSON.stringify({ ok: true, result }) };
};
