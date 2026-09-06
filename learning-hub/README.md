# Central Asia Learning Hub

A standalone, bilingual (English / Russian) learning platform with three free,
self-paced courses — **Financial Literacy** (6 weeks), **Business Creation**
(12 weeks), and **Leadership Development** (12 weeks) — plus a blog, free
toolkits, a debt-payoff calculator, live-cohort sign-up, and a learner
community (course chat + presence). Learners create a free account, choose the
language they want to learn in, and every signup lands in your email list
tagged by language.

It was split out of the Businesses Beyond Borders site so it can be owned,
hosted, and grown independently (for example under the E3 / Central Asia
Partners giving platform). Nothing here depends on the BBB deployment, CMS, or
accounts.

## What is inside

| Area | Where | Notes |
|------|-------|-------|
| Courses (engine + content) | `src/pages/course`, `src/components/course`, `src/data/{course,business-course,leadership-course}` | 30 weeks × 6 days, 30 interactive worksheets, Four Hats / case-study checkpoints |
| Russian | URL prefix `/ru/...`, `src/i18n`, `*Ru` fields, `src/data/**/*.ru.ts` | Language is part of the URL so every page is indexable in both languages |
| Accounts | `src/lib/auth.tsx`, `src/pages/auth/*` | Clerk. Without a key the site runs "open" (no accounts) |
| Email list | `netlify/functions/subscribe.ts`, `netlify/functions/clerk-webhook.ts`, `netlify/lib/contacts.ts` | ActiveCampaign (tags `lang:ru` / `lang:en`, custom field "Preferred Language") and/or a Google Sheet |
| Community | `convex/*`, `src/hooks/useCourseChat.ts`, `usePresence.ts`, `useProgressSync.ts` | Convex backend: chat per course, who-is-online, cross-device progress. Optional |
| SEO | `src/lib/seo.ts`, `src/components/seo/LocaleSEO.tsx`, `scripts/*` | schema.org (Organization, WebSite, Course, BreadcrumbList, FAQPage, BlogPosting, Event), hreflang, sitemap, robots, llms.txt, prerendered HTML for every route in both languages |
| Blog + resources | `src/data/blogPosts.ts`, `src/data/blogPostsRu_*.ts`, `src/data/resources.ts` | 40 articles (21 with Russian translations), 6 toolkits |
| Optional CMS | `sanity/`, `sanity.config.ts`, `scripts/migrate-*.mts` | Only if you want to edit copy in Sanity Studio |

## Quick start

```bash
cd learning-hub
cp .env.example .env.local      # fill in what you have; everything is optional
npm install
npm run dev                     # http://localhost:8080  (Russian: http://localhost:8080/ru)
```

Production build (what Netlify runs):

```bash
npm run build:full   # = sitemap + vite build + prerender (en + ru) + JSON-LD validation
npm run preview
```

Other scripts: `npm run typecheck`, `npm run lint`, `npm run validate:ru`
(checks Russian course files match the English structure), `npm run rss`,
`node scripts/generate-og-image.mjs` (re-renders `public/og-image.png` and
`public/images/logo.png` from the SVG sources).

## Deploy

See **SETUP.md** for the full walkthrough (Netlify → Clerk → ActiveCampaign →
Convex → Google Search Console / Analytics → optional Sanity). The short
version: import this folder into Netlify (base directory `learning-hub` if it
still lives inside the BBB repository), add the `VITE_*` and server env vars,
and deploy.

## Moving this folder into its own repository

```bash
# from the root of the empower-central-asia repository
git subtree split --prefix=learning-hub -b learning-hub-standalone
git push git@github.com:<you>/<new-repo>.git learning-hub-standalone:main
```

The folder is fully self-contained (own `package.json`, lockfile, configs), so
the new repository builds without any files from the parent.

## Content accuracy and translation

`CONTENT_ACCURACY_REPORT.md` documents the fact-check of every book, study,
statistic, and framework cited in the three courses, and what was corrected.
Russian versions of every lesson live next to the English files
(`weekNContent.ru.ts`) and are validated structurally by `npm run validate:ru`.
