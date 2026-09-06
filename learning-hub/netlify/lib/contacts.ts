/**
 * Shared contact-sync logic used by the `subscribe` and `clerk-webhook`
 * functions. Every destination is optional and controlled by env vars:
 *
 *   ACTIVECAMPAIGN_API_URL        e.g. https://youraccount.api-us1.com
 *   ACTIVECAMPAIGN_API_KEY        Settings → Developer → API key
 *   ACTIVECAMPAIGN_LIST_ID        (optional) numeric list id to subscribe to
 *   ACTIVECAMPAIGN_LANGUAGE_FIELD (optional) custom field id for "Preferred Language";
 *                                 auto-created as "Preferred Language" when missing
 *   GOOGLE_SHEET_WEBHOOK_URL      (optional) Apps Script web-app URL (legacy sheet)
 */

export interface ContactPayload {
  email: string;
  firstName?: string;
  lastName?: string;
  language?: string;
  country?: string;
  city?: string;
  whatsapp?: string;
  phone?: string;
  goals?: string[];
  interests?: string[];
  source?: string;
  resource?: string;
  clerkUserId?: string;
  page?: string;
  consent?: boolean;
}

export interface SyncResult {
  activecampaign?: "ok" | "skipped" | "error";
  sheet?: "ok" | "skipped" | "error";
  errors: string[];
}

const AC_URL = (process.env.ACTIVECAMPAIGN_API_URL || "").replace(/\/+$/, "");
const AC_KEY = process.env.ACTIVECAMPAIGN_API_KEY || "";
const AC_LIST = process.env.ACTIVECAMPAIGN_LIST_ID || "";
const AC_LANG_FIELD = process.env.ACTIVECAMPAIGN_LANGUAGE_FIELD || "";
const SHEET_URL = process.env.GOOGLE_SHEET_WEBHOOK_URL || "";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

async function ac<T = unknown>(path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(`${AC_URL}/api/3${path}`, {
    ...init,
    headers: { "Api-Token": AC_KEY, "Content-Type": "application/json", Accept: "application/json", ...(init.headers || {}) },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`ActiveCampaign ${init.method || "GET"} ${path} → ${res.status} ${text.slice(0, 300)}`);
  }
  return (await res.json()) as T;
}

let cachedLangField: string | null = null;
async function ensureLanguageField(): Promise<string> {
  if (AC_LANG_FIELD) return AC_LANG_FIELD;
  if (cachedLangField) return cachedLangField;
  const list = await ac<{ fields: { id: string; title: string }[] }>("/fields?limit=100");
  const found = list.fields.find((f) => f.title.toLowerCase() === "preferred language");
  if (found) return (cachedLangField = found.id);
  const created = await ac<{ field: { id: string } }>("/fields", {
    method: "POST",
    body: JSON.stringify({ field: { type: "text", title: "Preferred Language", descript: "en / ru — set by the Learning Hub", visible: 1 } }),
  });
  return (cachedLangField = created.field.id);
}

const tagCache = new Map<string, string>();
async function ensureTag(name: string): Promise<string> {
  const hit = tagCache.get(name);
  if (hit) return hit;
  const search = await ac<{ tags: { id: string; tag: string }[] }>(`/tags?search=${encodeURIComponent(name)}`);
  const exact = search.tags.find((t) => t.tag.toLowerCase() === name.toLowerCase());
  if (exact) {
    tagCache.set(name, exact.id);
    return exact.id;
  }
  const created = await ac<{ tag: { id: string } }>("/tags", {
    method: "POST",
    body: JSON.stringify({ tag: { tag: name, tagType: "contact", description: "Learning Hub" } }),
  });
  tagCache.set(name, created.tag.id);
  return created.tag.id;
}

export async function syncToActiveCampaign(c: ContactPayload): Promise<void> {
  const language = (c.language || "en").toLowerCase() === "ru" ? "ru" : "en";
  const langField = await ensureLanguageField();
  const synced = await ac<{ contact: { id: string } }>("/contact/sync", {
    method: "POST",
    body: JSON.stringify({
      contact: {
        email: normalizeEmail(c.email),
        firstName: c.firstName || "",
        lastName: c.lastName || "",
        phone: c.whatsapp || c.phone || "",
        fieldValues: [{ field: langField, value: language }],
      },
    }),
  });
  const contactId = synced.contact.id;

  const tags = [
    `lang:${language}`,
    "source:learning-hub",
    ...(c.source ? [`hub:${c.source}`] : []),
    ...(c.country ? [`country:${c.country.toLowerCase()}`] : []),
    ...(c.goals ?? []).map((g) => `goal:${g}`),
    ...(c.interests ?? []).map((g) => `interest:${g}`),
  ];
  for (const tag of tags) {
    const tagId = await ensureTag(tag);
    await ac("/contactTags", { method: "POST", body: JSON.stringify({ contactTag: { contact: contactId, tag: tagId } }) }).catch(
      (err: Error) => {
        // 422 = already tagged; ignore.
        if (!/422/.test(err.message)) throw err;
      }
    );
  }

  if (AC_LIST) {
    await ac("/contactLists", {
      method: "POST",
      body: JSON.stringify({ contactList: { list: AC_LIST, contact: contactId, status: 1 } }),
    });
  }
}

export async function syncToSheet(c: ContactPayload): Promise<void> {
  await fetch(SHEET_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      formType: c.source || "learning-hub",
      source: c.source || "learning-hub",
      email: normalizeEmail(c.email),
      firstName: c.firstName || "",
      lastName: c.lastName || "",
      language: c.language || "en",
      country: c.country || "",
      city: c.city || "",
      whatsapp: c.whatsapp || "",
      phone: c.phone || "",
      goals: (c.goals || []).join(", "),
      interests: (c.interests || []).join(", "),
      resource: c.resource || "",
      clerkUserId: c.clerkUserId || "",
      page: c.page || "",
      timestamp: new Date().toISOString(),
    }),
  });
}

export async function syncContact(c: ContactPayload): Promise<SyncResult> {
  const result: SyncResult = { errors: [] };
  if (AC_URL && AC_KEY) {
    try {
      await syncToActiveCampaign(c);
      result.activecampaign = "ok";
    } catch (err) {
      result.activecampaign = "error";
      result.errors.push((err as Error).message);
    }
  } else {
    result.activecampaign = "skipped";
  }
  if (SHEET_URL) {
    try {
      await syncToSheet(c);
      result.sheet = "ok";
    } catch (err) {
      result.sheet = "error";
      result.errors.push((err as Error).message);
    }
  } else {
    result.sheet = "skipped";
  }
  return result;
}
