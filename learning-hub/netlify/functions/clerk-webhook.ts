/**
 * Clerk → ActiveCampaign webhook.
 *
 * In Clerk Dashboard → Webhooks add an endpoint pointing to
 *   https://<your-site>/.netlify/functions/clerk-webhook
 * subscribed to `user.created` and `user.updated`, then copy the signing
 * secret into the CLERK_WEBHOOK_SECRET env var on Netlify.
 *
 * Every new account (and every profile change, e.g. language) is mirrored
 * into your email list with a `lang:ru` / `lang:en` tag.
 */
import type { Handler } from "@netlify/functions";
import { Webhook } from "svix";
import { syncContact } from "../lib/contacts";

interface ClerkEmail {
  id: string;
  email_address: string;
}
interface ClerkUserEvent {
  type: string;
  data: {
    id: string;
    first_name?: string | null;
    last_name?: string | null;
    primary_email_address_id?: string | null;
    email_addresses?: ClerkEmail[];
    unsafe_metadata?: Record<string, unknown>;
    public_metadata?: Record<string, unknown>;
  };
}

export const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method not allowed" };
  const secret = process.env.CLERK_WEBHOOK_SECRET;
  if (!secret) return { statusCode: 500, body: "CLERK_WEBHOOK_SECRET is not configured" };

  const svixId = event.headers["svix-id"];
  const svixTimestamp = event.headers["svix-timestamp"];
  const svixSignature = event.headers["svix-signature"];
  if (!svixId || !svixTimestamp || !svixSignature) return { statusCode: 400, body: "Missing Svix headers" };

  let evt: ClerkUserEvent;
  try {
    const wh = new Webhook(secret);
    evt = wh.verify(event.body || "", {
      "svix-id": svixId,
      "svix-timestamp": svixTimestamp,
      "svix-signature": svixSignature,
    }) as unknown as ClerkUserEvent;
  } catch (err) {
    console.error("[clerk-webhook] signature verification failed", (err as Error).message);
    return { statusCode: 400, body: "Invalid signature" };
  }

  if (evt.type !== "user.created" && evt.type !== "user.updated") {
    return { statusCode: 200, body: JSON.stringify({ ignored: evt.type }) };
  }

  const d = evt.data;
  const primary = d.email_addresses?.find((e) => e.id === d.primary_email_address_id) ?? d.email_addresses?.[0];
  if (!primary?.email_address) return { statusCode: 200, body: JSON.stringify({ skipped: "no email" }) };

  const meta = (d.unsafe_metadata ?? {}) as Record<string, unknown>;
  const result = await syncContact({
    email: primary.email_address,
    firstName: d.first_name ?? "",
    lastName: d.last_name ?? "",
    language: typeof meta.language === "string" ? meta.language : "en",
    country: typeof meta.country === "string" ? meta.country : "",
    city: typeof meta.city === "string" ? meta.city : "",
    whatsapp: typeof meta.whatsapp === "string" ? meta.whatsapp : "",
    goals: Array.isArray(meta.goals) ? (meta.goals as string[]) : [],
    source: evt.type === "user.created" ? "signup" : "profile-update",
    clerkUserId: d.id,
  });
  if (result.errors.length) console.error("[clerk-webhook] sync errors", result.errors);
  return { statusCode: 200, body: JSON.stringify({ ok: true, result }) };
};
