# Setup guide

Everything below is optional and independent — the site builds and runs with an
empty `.env`. Do the steps in the order you need them.

## 1. Brand and URL

Copy `.env.example` to `.env.local` (local) and add the same values in Netlify
(Site settings → Environment variables). The important ones:

| Variable | What it does |
|----------|--------------|
| `VITE_SITE_NAME`, `VITE_SITE_SHORT_NAME`, `VITE_ORG_NAME` | Name in titles, footer, schema.org |
| `VITE_SITE_URL` | Canonical origin (no trailing slash). Used for canonical/hreflang/sitemap |
| `VITE_CONTACT_EMAIL` | Shown in footer/community page and schema.org |
| `VITE_DONATE_URL` | External giving page (your Pure Charity / E3 checkout link). Empty = no donate buttons |
| `VITE_SOCIAL_*` | Social links (footer + schema.org `sameAs`) |

Replace `public/images/logo.svg`, `public/og-image.svg`, and `public/favicon.svg`
with your own artwork, then run `node scripts/generate-og-image.mjs` to
regenerate the PNGs.

## 2. Deploy on Netlify

1. Netlify → **Add new site → Import an existing project** → pick the repository.
2. If the folder is still inside the BBB repository, set **Base directory** to
   `learning-hub`. Build command and publish directory come from `netlify.toml`
   (`npm run build:full` → `dist`, functions in `netlify/functions`).
3. Add environment variables (step 1 plus anything from steps 3–6).
4. Deploy. Then **Domain management → Add domain** (e.g. `learn.yourdomain.org`)
   and follow the DNS instructions.

The build prerenders every page in English and Russian, so Google indexes full
lesson previews without running JavaScript.

## 3. Accounts (Clerk)

1. https://dashboard.clerk.com → **Create application**. Enable **Email** (and
   optionally Google). Under *Customization → Localization* you can leave
   defaults — the site switches Clerk to Russian automatically on `/ru` pages.
2. Copy the **Publishable key** → `VITE_CLERK_PUBLISHABLE_KEY`.
3. In Clerk → **Paths**, set: Sign-in `/sign-in`, Sign-up `/sign-up`,
   After sign-up `/welcome`, After sign-in `/dashboard`.
4. Deploy. Sign-up → **Welcome** page asks language, country, goals, WhatsApp
   and stores them on the user (`unsafeMetadata`). You can see every learner,
   their language, and export CSV in the Clerk dashboard.

What signing in unlocks: full week lessons (signed-out visitors see an
indexable preview with objectives), toolkit downloads, course chat, and
cross-device progress.

## 4. Email list (ActiveCampaign) — "email everyone who signs up"

Two paths feed your list; use one or both.

**A. Website forms (no Clerk needed).** Every form (newsletter, cohort interest,
course email capture, community contact, resource download) POSTs to
`/.netlify/functions/subscribe`. Add on Netlify:

| Variable | Value |
|----------|-------|
| `ACTIVECAMPAIGN_API_URL` | e.g. `https://youraccount.api-us1.com` (Settings → Developer) |
| `ACTIVECAMPAIGN_API_KEY` | API key from the same page |
| `ACTIVECAMPAIGN_LIST_ID` | (optional) list to subscribe contacts to |
| `GOOGLE_SHEET_WEBHOOK_URL` | (optional) your existing Apps Script URL, if you still want the sheet |

Each contact gets tags `lang:en` / `lang:ru`, `source:learning-hub`,
`hub:<form>` (e.g. `hub:signup`, `hub:cohort-interest`), `country:<code>`, and
`goal:<goal>`, plus a custom field **Preferred Language** (auto-created).
In ActiveCampaign you can now build a segment "tag = lang:ru" and send Russian
campaigns, and "tag = lang:en" for English.

**B. Clerk webhook (recommended with Clerk).** Clerk → **Webhooks → Add
endpoint** → `https://<your-site>/.netlify/functions/clerk-webhook`, events
`user.created` and `user.updated`. Copy the **Signing secret** →
`CLERK_WEBHOOK_SECRET` on Netlify. Every account (and every later change, e.g.
switching language) is mirrored into ActiveCampaign with the same tags.

## 5. Community backend (Convex) — chat, presence, progress sync

```bash
cd learning-hub
npx convex dev        # log in / create a project; writes VITE_CONVEX_URL to .env.local
```

1. Clerk → **JWT Templates → New template → Convex**. Copy the **Issuer** URL.
2. Convex dashboard → **Settings → Environment variables** →
   `CLERK_JWT_ISSUER_DOMAIN = https://<your-app>.clerk.accounts.dev`.
3. `npx convex deploy` for production and add `VITE_CONVEX_URL` on Netlify.

Without Convex the course chat is read-only-empty and progress stays in the
browser; everything else works.

## 6. Google Search Console, Analytics, Meta

| Variable | Where to get it |
|----------|-----------------|
| `VITE_GSC_VERIFICATION` | Search Console → Add property (URL prefix) → HTML tag method → the `content` value |
| `VITE_GA_MEASUREMENT_ID` | GA4 → Admin → Data streams → Measurement ID (`G-…`) |
| `VITE_GTM_ID` | (alternative to GA) Tag Manager container `GTM-…` |
| `VITE_META_PIXEL_ID` | Meta Events Manager |
| `VITE_CLARITY_ID` | Microsoft Clarity (optional heatmaps) |
| `VITE_BING_VERIFICATION` | Bing Webmaster Tools meta tag |

After the first deploy: Search Console → **Sitemaps** → submit
`https://<your-site>/sitemap.xml` (it lists every page in both languages with
`hreflang`). Test a course page in **Rich Results Test** — it carries `Course`
+ `CourseInstance` + `BreadcrumbList` data; the home and programs pages carry
`FAQPage`; blog posts carry `BlogPosting`. `npm run validate:schema` runs the
same checks locally after a build.

GA4 events fired by the site: `signup_complete`, `onboarding_complete`,
`course_signup`, `newsletter_signup`, `cohort_interest`, `resource_download`,
`donate_click`, `week_complete`.

## 7. Optional: Sanity Studio (edit copy without code)

1. https://sanity.io/manage → create a project → copy the project id.
2. `VITE_SANITY_PROJECT_ID=<id>` (and `VITE_SANITY_DATASET=production`).
3. Seed it from the bundled content:
   `SANITY_PROJECT_ID=<id> SANITY_WRITE_TOKEN=<editor token> npm run migrate:courses`
   (also `migrate:course-landings`, `migrate:lessons-fl|bc|ld`, `migrate:blog`,
   `migrate:resources`, `migrate:footer`, `migrate:forms`, `migrate:cohort-page`,
   `migrate:newsletter-page`, `migrate:debt-calculator`).
4. `npm run studio` locally or `npm run studio:deploy` for a hosted Studio.

Pages read Sanity first and fall back to the bundled data, so a half-migrated
dataset never breaks the site.

## 8. Russian

- Every route exists twice: `/…` (English) and `/ru/…` (Russian). The header
  switch keeps the learner on the same page. First-time visitors from
  Central Asia are sent to `/ru` automatically (they can switch back).
- UI strings: `src/i18n/translations.ts` and inline `isCentralAsia ? "…" : "…"`.
- Course content: `src/data/<course>/weekNContent.ru.ts` next to each English
  file. `npm run validate:ru` checks that every Russian file mirrors the English
  structure (same sections, worksheet fields, question counts).
- Blog: `src/data/blogPostsRu_batch*.ts` keyed by slug.

## 9. Checklist before launch

- [ ] `.env` values on Netlify (at least `VITE_SITE_URL`, `VITE_SITE_NAME`, `VITE_CONTACT_EMAIL`)
- [ ] Clerk key + paths (step 3)
- [ ] ActiveCampaign keys and a test signup shows up tagged `lang:…` (step 4)
- [ ] Custom domain + HTTPS
- [ ] Search Console verified, sitemap submitted
- [ ] Replace logo / OG image
- [ ] Read `CONTENT_ACCURACY_REPORT.md` and skim the Russian lessons with a native speaker
