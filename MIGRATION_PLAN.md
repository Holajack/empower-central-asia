# Empower Central Asia → Vercel Migration Plan

> **Goal**: Move `empower-central-asia` off the old `holajack` Vercel account onto the new `donations-1936` account (team "Businesses Be...", Hobby plan), and keep `businessesbeyondborders.com` serving without downtime. Sanity.io CMS integration is a separate, later initiative.
>
> **Source handoff doc**: `vercel-migration-handoff.md` (captured from Min browser, Apr 17 2026)
>
> **Project state snapshot** (verified 2026-04-17):
> - Repo IS on GitHub: `github.com/Holajack/empower-central-asia` (remote `origin`)
> - Zero production env vars required (`VITE_CONVEX_URL` declared but never imported)
> - Stack: Vite + React + TypeScript + Tailwind + shadcn
> - `vercel.json` present with SPA rewrite, www→apex 301, security headers, cache-control

---

## Key corrections vs. the handoff doc

| Handoff doc says | Reality |
|---|---|
| "NOT Git-connected" | **Repo IS on GitHub**: `github.com/Holajack/empower-central-asia` |
| "Environment variables: None" | Confirmed — no `VITE_*` vars are used in production code. Clerk/Convex are in `package.json` but never imported in `src/`. |
| Implied clean local state | **Git state is split**: main checkout at `Websites/empower-central-asia` had 10 uncommitted modified files + drift from origin/main. Claude worktree `cranky-sutherland-c6a14b` had 4 newer commits. Phase 0 reconciles this. |
| No mention of `.vercel/` link | **Stale `.vercel/project.json`** linked to old `prj_4i0C16vKZzNRwnHYs1ruTj8dCVaA` — removed in Phase 0.3 to prevent CLI misfires. |

---

## Phase 0 — Pre-flight (do BEFORE touching Vercel) ⏱ ~45 min

### 0.1 Reconcile git state
- [ ] `git fetch origin`
- [ ] `git log --oneline origin/main -10` — confirm origin/main = intended production
- [ ] `git status` — review 10 modified files in main checkout
- [ ] Per-file: keep, commit, or discard
- [ ] `git pull --ff-only` (stash if needed)
- [ ] `git push origin main`

### 0.2 Build verification
- [ ] `npm ci && npm run build`
- [ ] `npm run preview` → smoke test at `http://localhost:4173`

### 0.3 Remove stale Vercel link
- [ ] `rm -rf .vercel` (already gitignored; prevents CLI pushing to old project)

### 0.4 Document current production state
- [ ] `curl -sI https://businessesbeyondborders.com` — capture baseline headers
- [ ] Screenshot: homepage, /blog, /about, /faq, /get-involved
- [ ] `dig businessesbeyondborders.com +short` + TTL check
- [ ] If TTL > 3600s, lower to 300s at GoDaddy 24h before cutover

---

## Phase 1 — GitHub access for new team ⏱ ~15 min

**Decision**: Keep repo under `Holajack` for now — don't block migration on GitHub org setup. Transfer to BBB org later as separate task.

- [ ] In new Vercel team (`donations-1936` / "Businesses Be..."): Settings → Git → connect GitHub → grant access to `Holajack/empower-central-asia`

---

## Phase 2 — Create new Vercel project ⏱ ~15 min

- [ ] Log into Vercel as `donations-1936`
- [ ] Switch to "Businesses Be..." team
- [ ] Add New → Project → Import Git Repository → `Holajack/empower-central-asia`
- [ ] Verify settings (should auto-detect):
  - Framework Preset: **Vite**
  - Build Command: `npm run build`
  - Output Directory: `dist`
  - Root Directory: `./`
  - Install Command: default
- [ ] **Skip env vars** (none required)
- [ ] Deploy → wait for green
- [ ] Note the generated `.vercel.app` URL

**If deploy fails**: likely Node version mismatch. Pin `"engines": { "node": "22.x" }` in `package.json` and redeploy.

---

## Phase 3 — Smoke test on preview URL ⏱ ~20 min

Visit the `.vercel.app` URL and verify:
- [ ] Homepage renders, hero image loads, nav works
- [ ] `/blog` lists posts; click one → markdown renders
- [ ] `/about`, `/faq`, `/get-involved`, `/contact` all load
- [ ] Course pages: `/courses/business-creation`, `/courses/financial-literacy`, `/courses/leadership`
- [ ] Newsletter form: submit test email → appears in Google Sheet
- [ ] GoHighLevel chat widget loads
- [ ] `/sitemap.xml`, `/robots.txt`, `/llms.txt` all serve
- [ ] `/google35b6f892dcf8fe9f.html` serves (Search Console)
- [ ] `/970c82c817ea4222a84a84de7190a31a.txt` serves (Bing)
- [ ] SPA fallback: non-existent route serves index.html
- [ ] Security headers: `curl -sI https://<new>.vercel.app | grep -iE "x-frame|strict-transport|x-content"`
- [ ] Browser console: no 404s, no errors

**STOP if anything fails. Do NOT proceed to Phase 4.**

---

## Phase 4 — DNS cutover ⏱ ~15 min active, 1–48h wall clock

### 4.1 On NEW Vercel project
- [ ] Settings → Domains → Add `businessesbeyondborders.com`
- [ ] Copy exact A/CNAME records Vercel shows
- [ ] Add `www.businessesbeyondborders.com` → "Redirect to businessesbeyondborders.com" (301)

### 4.2 At GoDaddy
- [ ] GoDaddy → My Products → DNS for `businessesbeyondborders.com`
- [ ] Update records exactly as Vercel instructed (typically):
  - `@` A record → `76.76.21.21` (use Vercel's actual value)
  - `www` CNAME → `cname.vercel-dns.com`
- [ ] **Delete** old A/CNAME records pointing to old Vercel project
- [ ] Leave MX, TXT, and email-related records UNTOUCHED
- [ ] Save

### 4.3 Monitor propagation
```bash
dig businessesbeyondborders.com +short
dig www.businessesbeyondborders.com +short

curl -s "https://cloudflare-dns.com/dns-query?name=businessesbeyondborders.com&type=A" \
  -H "accept: application/dns-json" | jq .
```
- [ ] New project Domains tab shows "Valid Configuration" for both
- [ ] Let's Encrypt cert issued (<5 min after DNS resolves)
- [ ] `https://businessesbeyondborders.com` loads new site
- [ ] `https://www.businessesbeyondborders.com` 301s to apex

### 4.4 Rollback (if new site breaks production)
- [ ] Revert GoDaddy DNS to old records
- [ ] Old project still serves; propagation takes minutes to hours

---

## Phase 5 — Remove domain from old project ⏱ ~5 min

**Only after new site has been stable on the live domain for ≥24h.**
- [ ] Log into old `holajack` account → `empower-central-asia` → Settings → Domains
- [ ] Remove both `businessesbeyondborders.com` entries
- [ ] Do NOT delete old project yet — keep as fallback for ≥2 weeks

---

## Phase 6 — Post-cutover verification ⏱ 24–72h observation

- [ ] Google Search Console: re-verify domain, submit new sitemap
- [ ] Monitor GSC for crawl errors (48h window)
- [ ] Traffic sanity check (small dip during DNS propagation is normal)
- [ ] End-to-end test once per day for 3 days:
  - Newsletter signup
  - Contact form
  - Course signup
  - Partner interest
  - Resource download
- [ ] Verify Google Sheet receives entries on correct tabs (`formType` routing)

---

## Phase 7 — Final cleanup (after ≥2 weeks stable) ⏱ ~10 min

- [ ] Delete old Vercel project from `holajack` account
- [ ] Update any external integrations referencing old `.vercel.app` URL
- [ ] Add billing info on new Vercel account (even on Hobby plan)

---

## Phase 8 — Nomadic Tours (BLOCKED — discovery needed)

- [ ] Locate the project (which Vercel account/team? Netlify?)
- [ ] Once located, repeat Phases 0–7

---

## Phase 9 — Sanity.io CMS integration (SEPARATE initiative, post-migration)

Do **after** migration is stable. Not a migration task.

- [ ] Create two datasets in existing Sanity project: `bbb-production`, `nomadic-production`
- [ ] Define schemas: `siteSettings`, `page`, `blogPost`, `video`, `galleryImage`
- [ ] Install `@sanity/client` in repo; replace hardcoded content with GROQ queries
- [ ] Add Vercel env vars: `VITE_SANITY_PROJECT_ID`, `VITE_SANITY_DATASET` (+ optional read token)
- [ ] Configure CORS in Sanity Manage: add production domains + `.vercel.app` URLs

Estimate: 2-4 days per site.

---

## Risk register

| Risk | Likelihood | Impact | Mitigation |
|---|---|---|---|
| Build fails on new Vercel (Node mismatch) | Low | Medium | Pin `engines.node` if needed |
| HTTPS cert delay after DNS cutover | Medium | Low (minutes) | Vercel auto-issues Let's Encrypt |
| DNS propagation briefly leaves users on old site | High | Low | Lower TTL 24h before; old site still works |
| Google Sheets Apps Script rejects new origin | Medium | Medium | Test on `.vercel.app` URL before DNS |
| Stale `.vercel/` causes CLI misfire | Medium | High | Removed in Phase 0.3 |
| Git state confusion ships wrong code | Medium | High | Phase 0.1 reconciliation is mandatory |
| SEO ranking dip from transition | Low | Low-Medium | Keep 301 www→apex; submit sitemap to GSC |
| Old project deleted too early | Low | High (irreversible) | Wait ≥2 weeks before deleting |

---

## Success criteria

Migration complete when ALL of:
- `https://businessesbeyondborders.com` serves from new Vercel project
- All pages render identically to pre-migration screenshots
- All forms submit successfully and reach Google Sheet
- Search Console shows no crawl errors 72h post-cutover
- Old project has domains removed but is alive as fallback
- No billing/access issues on new account
