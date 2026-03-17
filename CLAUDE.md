# Empower Central Asia - Master Development Plan v2.0

> **Project**: Businesses Beyond Borders Website
> **Location**: Port Orange, Florida (Volusia County)
> **Live Site**: https://businessesbeyondborders.com
> **Mission**: Empowering entrepreneurs in Central Asia (Kazakhstan, Kyrgyzstan, Uzbekistan)

---

## CRITICAL: Agentic Development Protocol

This project follows **Anthropic's best practices for long-running agents** as documented in:
- [Effective Harnesses for Long-Running Agents](https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents)
- [Autonomous Coding Quickstart](https://github.com/anthropics/claude-quickstarts/tree/main/autonomous-coding)

### Core Principles

1. **Two-Agent Pattern**: Initializer (first session) + Coding Agent (subsequent sessions)
2. **State Persistence**: All progress tracked in `feature_list.json` and `claude-progress.txt`
3. **Git-Based Recovery**: Use git to revert bad changes rather than attempting mid-session repairs
4. **One Feature Per Session**: Prevents context exhaustion and forces clear documentation
5. **Test Before Build**: Verify existing features work before implementing new ones
6. **Visual Verification**: Use browser automation for human-like testing

---

## Table of Contents

### Part 1: Agent Architecture & Self-Correction
1. [Session Management Protocol](#1-session-management-protocol)
2. [State Tracking System](#2-state-tracking-system)
3. [Fallback & Recovery Mechanisms](#3-fallback--recovery-mechanisms)
4. [Self-Correction Patterns](#4-self-correction-patterns)
5. [Checkpoint System](#5-checkpoint-system)

### Part 2: Feature Implementation Phases
6. [Phase 1: SEO Foundation](#6-phase-1-seo-foundation)
7. [Phase 2: Blog System Enhancement](#7-phase-2-blog-system-enhancement)
8. [Phase 3: Performance & Polish](#8-phase-3-performance--polish)
9. [Phase 4: Authentication & Portals](#9-phase-4-authentication--portals)
10. [Phase 5: Event Calendar](#10-phase-5-event-calendar)
11. [Phase 6: Multi-Language Support](#11-phase-6-multi-language-support)
12. [Phase 7: Impact Dashboard](#12-phase-7-impact-dashboard)
13. [Phase 8: Course Platform](#13-phase-8-course-platform)
14. [Phase 9: Newsletter Integration](#14-phase-9-newsletter-integration)
15. [Phase 10: AI Blog Writing Portal](#15-phase-10-ai-blog-writing-portal)

### Part 3: Standards & References
16. [Blog Style Guide (Blog #11 Template)](#16-blog-style-guide)
17. [Claude Skills Integration](#17-claude-skills-integration)
18. [Database Schema](#18-database-schema)
19. [Testing Requirements](#19-testing-requirements)
20. [Security & Deployment](#20-security--deployment)

---

# PART 1: AGENT ARCHITECTURE & SELF-CORRECTION

---

## 1. Session Management Protocol

### 1.1 Session Types

#### Initializer Session (First Time Only)
Run when `feature_list.json` does not exist.

```
INITIALIZER AGENT RESPONSIBILITIES:
1. Generate comprehensive feature_list.json with ALL features (200+ items)
2. Create init.sh script for environment setup
3. Initialize git repository with baseline commit
4. Create project structure documentation
5. Mark all features as passing: false
```

#### Coding Session (All Subsequent Sessions)
Run when `feature_list.json` exists.

```
CODING AGENT WORKFLOW (10 Steps):
1. ORIENTATION - Read feature_list.json, claude-progress.txt, git log
2. SERVER SETUP - Run init.sh to start development environment
3. VERIFICATION - Test that all "passing: true" features still work
4. SELECTION - Choose highest-priority incomplete feature
5. IMPLEMENTATION - Code the feature (frontend + backend)
6. TESTING - Visual browser testing, not just API calls
7. DOCUMENTATION - Mark feature passing only after visual confirmation
8. COMMIT - Git commit with descriptive message
9. PROGRESS UPDATE - Update claude-progress.txt
10. HANDOFF - Ensure no broken features or uncommitted changes
```

### 1.2 Session Startup Sequence

**EVERY session must begin with:**

```bash
# Step 1: Check current state
cat feature_list.json | grep '"passing": false' | wc -l
cat claude-progress.txt | tail -50
git log --oneline -10

# Step 2: Run init script
./init.sh

# Step 3: Verify passing features still work
npm run test:e2e  # or visual verification

# Step 4: Only then begin new work
```

### 1.3 Session Ending Protocol

**EVERY session must end with:**

```bash
# Step 1: Commit all changes
git add -A
git commit -m "feat: [FEATURE_NAME] - [description]

- What was implemented
- What was tested
- What remains to do"

# Step 2: Update progress file
echo "
## Session: $(date)
### Completed:
- [Feature X] - fully implemented and tested
### Status:
- All passing tests verified
- No regressions introduced
### Next Session Should:
- Start with [Feature Y]
- Verify [specific functionality]
" >> claude-progress.txt

# Step 3: Update feature_list.json
# Mark completed features as passing: true
```

---

## 2. State Tracking System

### 2.1 Feature List Structure

Create `feature_list.json` in project root:

```json
{
  "project": "empower-central-asia",
  "version": "2.0",
  "last_updated": "2025-12-07",
  "total_features": 200,
  "completed": 0,
  "categories": {
    "seo": {
      "priority": 1,
      "features": [
        {
          "id": "SEO-001",
          "name": "Schema.org NonprofitOrganization markup on homepage",
          "test_steps": [
            "Navigate to homepage",
            "Open browser dev tools",
            "Check for ld+json script tag",
            "Verify NonprofitOrganization schema structure",
            "Validate with Google Rich Results Test"
          ],
          "passing": false,
          "session_completed": null,
          "notes": ""
        },
        {
          "id": "SEO-002",
          "name": "Dynamic sitemap.xml generation",
          "test_steps": [
            "Run npm run build",
            "Check /public/sitemap.xml exists",
            "Verify all routes included",
            "Check lastmod dates are current",
            "Validate XML structure"
          ],
          "passing": false,
          "session_completed": null,
          "notes": ""
        }
        // ... 200+ features total
      ]
    },
    "blog": { /* ... */ },
    "auth": { /* ... */ },
    "events": { /* ... */ },
    "i18n": { /* ... */ },
    "dashboard": { /* ... */ },
    "courses": { /* ... */ },
    "newsletter": { /* ... */ },
    "ai_blog": { /* ... */ },
    "performance": { /* ... */ }
  }
}
```

### 2.2 Progress Notes Structure

Create `claude-progress.txt` in project root:

```markdown
# Empower Central Asia - Development Progress

## Project Overview
- Total Features: 200
- Completed: 0
- Current Priority: SEO Foundation (Phase 1)

---

## Session Log

### Session 1 - [DATE]
**Agent Type:** Initializer
**Duration:** ~15 minutes

#### Actions Taken:
1. Generated feature_list.json with 200 test cases
2. Created init.sh environment script
3. Documented project structure
4. Initial git commit

#### Files Created:
- feature_list.json
- init.sh
- claude-progress.txt

#### Next Session Should:
- Begin with SEO-001 (Schema.org markup)
- Run full verification first

---

### Session 2 - [DATE]
**Agent Type:** Coding Agent
**Duration:** ~10 minutes

#### Pre-Work Verification:
- [x] Server started successfully
- [x] All passing features verified (0/0)
- [x] No regressions detected

#### Feature Worked On:
- SEO-001: Schema.org NonprofitOrganization markup

#### Implementation Details:
- Created src/lib/schema.ts
- Added generateNonprofitSchema() function
- Integrated into Index.tsx via react-helmet

#### Test Results:
- [x] Schema appears in page source
- [x] Google Rich Results Test: PASS
- [x] No console errors

#### Git Commit:
- Hash: abc1234
- Message: "feat(seo): add NonprofitOrganization schema markup"

#### Feature Status:
- SEO-001: passing: true

#### Next Session Should:
- Continue with SEO-002 (dynamic sitemap)
- Verify SEO-001 still works

---
```

### 2.3 Init Script

Create `init.sh` in project root:

```bash
#!/bin/bash

echo "🚀 Empower Central Asia - Development Environment Setup"
echo "========================================================"

# Check Node version
NODE_VERSION=$(node -v)
echo "Node version: $NODE_VERSION"

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
fi

# Check for required environment variables
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Creating from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with actual values before running tests"
fi

# Start development server in background
echo "🌐 Starting development server..."
npm run dev &
DEV_PID=$!
echo "Development server PID: $DEV_PID"

# Wait for server to be ready
echo "⏳ Waiting for server to be ready..."
sleep 5

# Check if server is running
if curl -s http://localhost:8080 > /dev/null; then
    echo "✅ Development server is running on http://localhost:8080"
else
    echo "❌ Development server failed to start"
    exit 1
fi

echo ""
echo "========================================================"
echo "✅ Environment ready for development"
echo "📝 Remember to run verification tests before new work"
echo "========================================================"
```

---

## 3. Fallback & Recovery Mechanisms

### 3.1 Git-Based Recovery Protocol

**CRITICAL RULE**: Never attempt to fix broken code mid-session. Always revert to last known good state.

```bash
# If current work breaks existing features:

# Step 1: Stash current changes
git stash

# Step 2: Verify the stashed state works
npm run dev
npm run test:e2e  # or visual verification

# Step 3: If tests pass, create recovery point
git tag recovery-point-$(date +%Y%m%d-%H%M%S)

# Step 4: Cherry-pick only working changes
git stash pop
# Manually select what to keep

# Step 5: If completely broken, hard reset
git reset --hard HEAD~1
git clean -fd
```

### 3.2 Recovery Checkpoints

Create recovery checkpoints at these milestones:

| Checkpoint | Command | Description |
|------------|---------|-------------|
| Phase Start | `git tag phase-1-start` | Before starting any phase |
| Phase End | `git tag phase-1-complete` | After all phase features pass |
| Daily | `git tag daily-$(date +%Y%m%d)` | End of each development day |
| Pre-Major | `git tag pre-[feature]` | Before complex implementations |

### 3.3 Cascade Prevention Rules

**To prevent one fix from breaking others:**

1. **Never modify existing tests** - Tests are immutable once passing
2. **Never remove features** - Only add, never subtract
3. **Isolated changes only** - One feature = one set of files
4. **Verify before commit** - All passing tests must still pass
5. **Atomic commits** - Each commit is self-contained and revertable

### 3.4 Emergency Recovery Commands

```bash
# View all recovery points
git tag -l "recovery-*" | sort -r

# Restore to specific recovery point
git checkout recovery-point-20251207-143022

# View what changed since last known good
git diff recovery-point-20251207-143022..HEAD

# Nuclear option - restore to phase start
git checkout phase-1-start
git checkout -b phase-1-restart
```

---

## 4. Self-Correction Patterns

### 4.1 Pre-Work Verification

**Before implementing ANY new feature:**

```typescript
// Verification script: scripts/verify-passing.ts
import { readFileSync } from 'fs';

interface Feature {
  id: string;
  name: string;
  passing: boolean;
  test_steps: string[];
}

async function verifyPassingFeatures(): Promise<boolean> {
  const featureList = JSON.parse(readFileSync('feature_list.json', 'utf-8'));
  const passingFeatures = Object.values(featureList.categories)
    .flatMap((cat: any) => cat.features)
    .filter((f: Feature) => f.passing);

  console.log(`🔍 Verifying ${passingFeatures.length} passing features...`);

  for (const feature of passingFeatures) {
    const result = await runFeatureTest(feature);
    if (!result.success) {
      console.error(`❌ REGRESSION: ${feature.id} - ${feature.name}`);
      console.error(`   Failing step: ${result.failingStep}`);
      return false;
    }
    console.log(`✅ ${feature.id}: Still passing`);
  }

  console.log(`\n✅ All ${passingFeatures.length} features verified`);
  return true;
}
```

### 4.2 Visual-First Testing

**CRITICAL**: Never mark a feature as passing based on code inspection alone.

```typescript
// Testing requires visual verification
async function testFeature(feature: Feature): Promise<TestResult> {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  for (const step of feature.test_steps) {
    // Take screenshot before action
    await page.screenshot({ path: `screenshots/${feature.id}-step-${i}-before.png` });

    // Perform the test step
    const result = await executeTestStep(page, step);

    // Take screenshot after action
    await page.screenshot({ path: `screenshots/${feature.id}-step-${i}-after.png` });

    if (!result.passed) {
      return {
        success: false,
        failingStep: step,
        screenshot: `screenshots/${feature.id}-step-${i}-after.png`
      };
    }
  }

  return { success: true };
}
```

### 4.3 Regression Detection

```typescript
// Run after every implementation
async function detectRegressions(): Promise<Regression[]> {
  const regressions: Regression[] = [];
  const featureList = loadFeatureList();

  for (const feature of getPassingFeatures(featureList)) {
    const result = await testFeature(feature);
    if (!result.success) {
      regressions.push({
        featureId: feature.id,
        featureName: feature.name,
        failingStep: result.failingStep,
        previouslyPassing: true
      });

      // Immediately mark as failing in feature_list.json
      await updateFeatureStatus(feature.id, false, `Regression detected: ${result.failingStep}`);
    }
  }

  if (regressions.length > 0) {
    console.error('\n🚨 REGRESSIONS DETECTED:');
    regressions.forEach(r => console.error(`  - ${r.featureId}: ${r.featureName}`));
    console.error('\nReverting to last known good state...');

    // Trigger recovery
    await executeRecovery();
  }

  return regressions;
}
```

### 4.4 Self-Healing Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    SELF-HEALING WORKFLOW                     │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Start Session  │
                    └────────┬────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │ Run Verification │
                    └────────┬────────┘
                              │
                    ┌─────────┴─────────┐
                    │                   │
                    ▼                   ▼
            ┌───────────┐       ┌───────────────┐
            │ All Pass  │       │ Regression    │
            └─────┬─────┘       └───────┬───────┘
                  │                     │
                  ▼                     ▼
         ┌────────────────┐    ┌────────────────┐
         │ Select Feature │    │ Log Regression │
         └───────┬────────┘    └───────┬────────┘
                  │                     │
                  ▼                     ▼
         ┌────────────────┐    ┌────────────────┐
         │ Implement      │    │ Git Revert     │
         └───────┬────────┘    └───────┬────────┘
                  │                     │
                  ▼                     ▼
         ┌────────────────┐    ┌────────────────┐
         │ Test Visually  │    │ Verify Fixed   │
         └───────┬────────┘    └───────┬────────┘
                  │                     │
         ┌────────┴────────┐            │
         │                 │            │
         ▼                 ▼            │
   ┌──────────┐     ┌───────────┐       │
   │  Pass    │     │  Fail     │       │
   └────┬─────┘     └─────┬─────┘       │
        │                 │             │
        ▼                 ▼             │
 ┌─────────────┐  ┌──────────────┐      │
 │ Mark Passing│  │ Revert Change│      │
 └──────┬──────┘  └──────┬───────┘      │
        │                │              │
        ▼                ▼              │
 ┌─────────────┐  ┌──────────────┐      │
 │ Git Commit  │  │ Try Different│      │
 └──────┬──────┘  │ Approach     │◄─────┘
        │         └──────────────┘
        ▼
 ┌─────────────┐
 │Update Prog. │
 └──────┬──────┘
        │
        ▼
 ┌─────────────┐
 │ End Session │
 └─────────────┘
```

---

## 5. Checkpoint System

### 5.1 Automatic Checkpoints

Create checkpoints automatically at these events:

```typescript
// scripts/checkpoint.ts
type CheckpointTrigger =
  | 'feature_complete'    // After any feature marked passing
  | 'phase_complete'      // After all features in a phase pass
  | 'session_start'       // At start of each session
  | 'session_end'         // At end of each session
  | 'pre_risky_change'    // Before database changes, auth changes, etc.
  | 'daily'               // Once per day
  | 'manual';             // Explicitly requested

async function createCheckpoint(trigger: CheckpointTrigger, description: string): Promise<void> {
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const tagName = `checkpoint-${trigger}-${timestamp}`;

  // Commit any pending changes
  await exec('git add -A');
  await exec(`git commit -m "checkpoint: ${trigger} - ${description}" --allow-empty`);

  // Create tag
  await exec(`git tag -a ${tagName} -m "${description}"`);

  // Update checkpoint log
  const checkpointLog = {
    timestamp: new Date().toISOString(),
    trigger,
    description,
    tag: tagName,
    featureList: JSON.parse(readFileSync('feature_list.json', 'utf-8')),
    gitHash: (await exec('git rev-parse HEAD')).trim()
  };

  appendFileSync('checkpoints.log', JSON.stringify(checkpointLog) + '\n');
  console.log(`✅ Checkpoint created: ${tagName}`);
}
```

### 5.2 Checkpoint Recovery

```typescript
async function restoreCheckpoint(tagName: string): Promise<void> {
  console.log(`🔄 Restoring to checkpoint: ${tagName}`);

  // Verify the tag exists
  const tags = (await exec('git tag -l')).split('\n');
  if (!tags.includes(tagName)) {
    throw new Error(`Checkpoint ${tagName} not found`);
  }

  // Create backup of current state first
  await createCheckpoint('manual', `Backup before restoring to ${tagName}`);

  // Restore to checkpoint
  await exec(`git checkout ${tagName}`);
  await exec('git checkout -b recovery-branch-' + Date.now());

  // Restore feature_list.json from checkpoint
  // (It's part of the committed files)

  console.log(`✅ Restored to checkpoint: ${tagName}`);
  console.log(`📝 You are now on a recovery branch. Review and merge when ready.`);
}
```

### 5.3 Checkpoint Listing

```bash
# List all checkpoints with details
git tag -l "checkpoint-*" --sort=-creatordate | head -20

# Show checkpoint details
git show checkpoint-feature_complete-2025-12-07T14-30-00

# Compare current state to checkpoint
git diff checkpoint-phase-1-complete..HEAD

# List checkpoints by type
git tag -l "checkpoint-feature_complete-*"
git tag -l "checkpoint-phase_complete-*"
```

---

# PART 2: FEATURE IMPLEMENTATION PHASES

---

## 6. Phase 1: SEO Foundation

**Priority**: 1 (Highest)
**Dependencies**: None
**Feature Count**: 25
**Estimated Sessions**: 3-5

### Features (SEO-001 to SEO-025)

| ID | Feature | Test Steps |
|----|---------|------------|
| SEO-001 | Schema.org NonprofitOrganization on homepage | Check ld+json, validate with Rich Results Test |
| SEO-002 | Dynamic sitemap.xml generation | Run build, verify all routes in sitemap |
| SEO-003 | Unique meta titles on all pages | Check each page has unique <title> |
| SEO-004 | Unique meta descriptions on all pages | Verify 150-160 char descriptions |
| SEO-005 | Open Graph tags on all pages | Check og:title, og:description, og:image |
| SEO-006 | Twitter Card tags on all pages | Verify twitter:card, twitter:title |
| SEO-007 | Canonical URLs on all pages | Check rel="canonical" |
| SEO-008 | Schema.org Course on program pages | Validate course schema |
| SEO-009 | Schema.org BlogPosting on blog posts | Validate article schema |
| SEO-010 | Schema.org BreadcrumbList navigation | Check breadcrumb schema |
| SEO-011 | Schema.org Event on event pages | Validate event schema |
| SEO-012 | Schema.org DonateAction on donation pages | Validate donate action |
| SEO-013 | Alt text on all images | Check every img has alt attribute |
| SEO-014 | Image width/height attributes | Verify dimensions prevent CLS |
| SEO-015 | Lazy loading for below-fold images | Check loading="lazy" |
| SEO-016 | WebP image conversion | Verify .webp versions exist |
| SEO-017 | robots.txt optimization | Verify sitemap reference |
| SEO-018 | H1 hierarchy on all pages | Check single H1 per page |
| SEO-019 | Internal linking structure | Verify relevant internal links |
| SEO-020 | 404 page with navigation | Custom 404 with links back |
| SEO-021 | Page speed > 90 mobile | Lighthouse audit |
| SEO-022 | Page speed > 90 desktop | Lighthouse audit |
| SEO-023 | Core Web Vitals passing | LCP < 2.5s, FID < 100ms, CLS < 0.1 |
| SEO-024 | Local SEO keywords natural inclusion | Check Volusia County, Port Orange mentions |
| SEO-025 | Google Search Console submission | Verify sitemap submitted |

### Implementation Order

1. SEO-001 to SEO-012: Schema markup (can be done in 1-2 sessions)
2. SEO-013 to SEO-016: Image optimization
3. SEO-017 to SEO-020: Technical SEO
4. SEO-021 to SEO-025: Performance and verification

### Rollback Triggers

- Lighthouse score drops below 80
- Any existing page returns 404
- Build fails
- Console errors appear

---

## 7. Phase 2: Blog System Enhancement

**Priority**: 2
**Dependencies**: Phase 1 (SEO-009, SEO-019)
**Feature Count**: 20
**Estimated Sessions**: 4-6

### Features (BLOG-001 to BLOG-020)

| ID | Feature | Test Steps |
|----|---------|------------|
| BLOG-001 | Markdown blog post support | Create .md file, verify renders correctly |
| BLOG-002 | Gray-matter frontmatter parsing | Check title, date, tags extracted |
| BLOG-003 | Tag-based filtering UI | Click tag, verify filtered results |
| BLOG-004 | Search functionality | Type search, verify matching posts shown |
| BLOG-005 | Related posts component | Check 3 related posts appear |
| BLOG-006 | Auto reading time calculation | Verify accurate time estimate |
| BLOG-007 | Social sharing buttons | Click share, verify correct URL |
| BLOG-008 | Author bio component | Check author info displays |
| BLOG-009 | Reading progress indicator | Scroll, verify progress bar updates |
| BLOG-010 | Table of contents for long posts | Check TOC links work |
| BLOG-011 | RSS feed generation | Validate /blog/rss.xml |
| BLOG-012 | Blog post pagination | Navigate pages, verify works |
| BLOG-013 | Featured posts section | Check featured posts highlighted |
| BLOG-014 | Blog categories | Filter by category works |
| BLOG-015 | Blog archive by date | View posts by month/year |
| BLOG-016 | Code syntax highlighting | Verify code blocks styled |
| BLOG-017 | Image zoom on click | Click image, verify lightbox |
| BLOG-018 | Print-friendly blog posts | Print preview looks good |
| BLOG-019 | Blog post comments (optional) | Comment submission works |
| BLOG-020 | Blog analytics tracking | GA4 events fire on post view |

### Rollback Triggers

- Existing blog posts stop rendering
- RSS feed validation fails
- SEO schema for blog posts breaks
- Performance drops

---

## 8. Phase 3: Performance & Polish

**Priority**: 3
**Dependencies**: Phases 1-2
**Feature Count**: 15
**Estimated Sessions**: 2-3

### Features (PERF-001 to PERF-015)

| ID | Feature |
|----|---------|
| PERF-001 | Route-based code splitting |
| PERF-002 | Dynamic imports for heavy components |
| PERF-003 | Vendor chunk optimization |
| PERF-004 | Tree shaking verification |
| PERF-005 | Service worker for caching |
| PERF-006 | Skeleton loading states |
| PERF-007 | Error boundaries on all routes |
| PERF-008 | Accessibility audit passing (90+) |
| PERF-009 | ARIA labels complete |
| PERF-010 | Keyboard navigation working |
| PERF-011 | Skip-to-content link |
| PERF-012 | Color contrast WCAG AA |
| PERF-013 | Focus indicators visible |
| PERF-014 | Screen reader testing |
| PERF-015 | Bundle size < 500KB gzipped |

---

## 9. Phase 4: Authentication & Portals

**Priority**: 4
**Dependencies**: Phase 3, Supabase setup
**Feature Count**: 35
**Estimated Sessions**: 8-10

### Supabase Setup Checklist

- [ ] Create Supabase project
- [ ] Configure auth providers (email, Google)
- [ ] Set up database schema (see Section 18)
- [ ] Enable Row Level Security
- [ ] Configure storage buckets
- [ ] Set environment variables

### Features (AUTH-001 to AUTH-035)

**Authentication Core (AUTH-001 to AUTH-010)**
| ID | Feature |
|----|---------|
| AUTH-001 | Email/password signup |
| AUTH-002 | Email/password login |
| AUTH-003 | Password reset flow |
| AUTH-004 | Email verification |
| AUTH-005 | Social login (Google) |
| AUTH-006 | Magic link login |
| AUTH-007 | Session persistence |
| AUTH-008 | Logout functionality |
| AUTH-009 | Protected route wrapper |
| AUTH-010 | Role-based access control |

**Donor Portal (AUTH-011 to AUTH-020)**
| ID | Feature |
|----|---------|
| AUTH-011 | Donor dashboard |
| AUTH-012 | Donation history view |
| AUTH-013 | Recurring donation management |
| AUTH-014 | Tax receipt downloads |
| AUTH-015 | Impact visualization |
| AUTH-016 | Profile settings |
| AUTH-017 | Notification preferences |
| AUTH-018 | Communication history |
| AUTH-019 | Payment method management |
| AUTH-020 | Donor badge display |

**Volunteer Portal (AUTH-021 to AUTH-030)**
| ID | Feature |
|----|---------|
| AUTH-021 | Volunteer dashboard |
| AUTH-022 | Hours logging |
| AUTH-023 | Hours approval workflow |
| AUTH-024 | Opportunity browsing |
| AUTH-025 | Event registration |
| AUTH-026 | Personal schedule view |
| AUTH-027 | Team directory |
| AUTH-028 | Training materials access |
| AUTH-029 | Certificate downloads |
| AUTH-030 | Volunteer stats |

**Admin (AUTH-031 to AUTH-035)**
| ID | Feature |
|----|---------|
| AUTH-031 | Admin dashboard |
| AUTH-032 | User management |
| AUTH-033 | Role assignment |
| AUTH-034 | Activity logs |
| AUTH-035 | System settings |

---

## 10. Phase 5: Event Calendar

**Priority**: 5
**Dependencies**: Phase 4 (Authentication)
**Feature Count**: 20
**Estimated Sessions**: 4-5

### Features (EVENT-001 to EVENT-020)

| ID | Feature |
|----|---------|
| EVENT-001 | Public event listing page |
| EVENT-002 | Event detail pages |
| EVENT-003 | Event registration form |
| EVENT-004 | Capacity management |
| EVENT-005 | Waitlist functionality |
| EVENT-006 | Calendar view (month/week/list) |
| EVENT-007 | Google Calendar integration |
| EVENT-008 | Outlook calendar export |
| EVENT-009 | Apple Calendar export |
| EVENT-010 | Email reminders |
| EVENT-011 | SMS reminders (GoHighLevel) |
| EVENT-012 | Check-in system |
| EVENT-013 | Recurring events |
| EVENT-014 | Virtual event support |
| EVENT-015 | Event photo galleries |
| EVENT-016 | Post-event surveys |
| EVENT-017 | Event categories/tags |
| EVENT-018 | Past events archive |
| EVENT-019 | Event search |
| EVENT-020 | Admin event management |

---

## 11. Phase 6: Multi-Language Support

**Priority**: 6
**Dependencies**: All content phases complete
**Feature Count**: 25
**Estimated Sessions**: 5-7

### Languages

| Code | Language | Script | Region |
|------|----------|--------|--------|
| en | English | Latin | Default |
| ru | Russian | Cyrillic | All regions |
| kk | Kazakh | Cyrillic | Kazakhstan |
| ky | Kyrgyz | Cyrillic | Kyrgyzstan |
| uz | Uzbek | Cyrillic/Latin | Uzbekistan |

### Features (I18N-001 to I18N-025)

| ID | Feature |
|----|---------|
| I18N-001 | i18next setup and configuration |
| I18N-002 | Language detection (browser) |
| I18N-003 | Language switcher component |
| I18N-004 | Language persistence (localStorage) |
| I18N-005 | URL-based language routing |
| I18N-006 | Navigation translations (all languages) |
| I18N-007 | Homepage translations |
| I18N-008 | About page translations |
| I18N-009 | Programs pages translations |
| I18N-010 | Get Involved translations |
| I18N-011 | Contact translations |
| I18N-012 | Form labels translations |
| I18N-013 | Error messages translations |
| I18N-014 | Success messages translations |
| I18N-015 | Footer translations |
| I18N-016 | Meta tags translations |
| I18N-017 | Date formatting localization |
| I18N-018 | Number formatting localization |
| I18N-019 | Pluralization rules |
| I18N-020 | Cyrillic font support |
| I18N-021 | RTL preparation (future) |
| I18N-022 | Translated sitemap generation |
| I18N-023 | hreflang tags |
| I18N-024 | Translated 404 page |
| I18N-025 | Blog post language tags |

---

## 12. Phase 7: Impact Dashboard

**Priority**: 7
**Dependencies**: Phase 4 (Database)
**Feature Count**: 15
**Estimated Sessions**: 3-4

### Features (IMPACT-001 to IMPACT-015)

| ID | Feature |
|----|---------|
| IMPACT-001 | Public impact metrics display |
| IMPACT-002 | Animated number counters |
| IMPACT-003 | Line charts (growth over time) |
| IMPACT-004 | Bar charts (comparisons) |
| IMPACT-005 | Pie charts (allocation) |
| IMPACT-006 | Interactive Central Asia map |
| IMPACT-007 | Real-time donation counter |
| IMPACT-008 | Volunteer hours tracker |
| IMPACT-009 | Entrepreneurs trained counter |
| IMPACT-010 | Businesses launched tracker |
| IMPACT-011 | Countries served visualization |
| IMPACT-012 | Admin metric entry |
| IMPACT-013 | Data import from spreadsheet |
| IMPACT-014 | Historical data trends |
| IMPACT-015 | Embeddable impact widget |

---

## 13. Phase 8: Course Platform

**Priority**: 8
**Dependencies**: Phase 4 (Authentication)
**Feature Count**: 25
**Estimated Sessions**: 6-8

### Features (COURSE-001 to COURSE-025)

| ID | Feature |
|----|---------|
| COURSE-001 | Course catalog page |
| COURSE-002 | Course detail pages |
| COURSE-003 | Course enrollment |
| COURSE-004 | Module structure |
| COURSE-005 | Lesson viewer |
| COURSE-006 | Video lesson support |
| COURSE-007 | Text/markdown lessons |
| COURSE-008 | Quiz functionality |
| COURSE-009 | Quiz auto-grading |
| COURSE-010 | Assignment submission |
| COURSE-011 | Progress tracking |
| COURSE-012 | Progress persistence |
| COURSE-013 | Completion certificates |
| COURSE-014 | Course discussions |
| COURSE-015 | Instructor feedback |
| COURSE-016 | Course search |
| COURSE-017 | Course categories |
| COURSE-018 | Difficulty levels |
| COURSE-019 | Multi-language courses |
| COURSE-020 | Mobile-responsive player |
| COURSE-021 | Offline access (PWA) |
| COURSE-022 | Course ratings/reviews |
| COURSE-023 | Prerequisites system |
| COURSE-024 | Learning paths |
| COURSE-025 | Admin course builder |

---

## 14. Phase 9: Newsletter Integration

**Priority**: 9
**Dependencies**: Email service setup
**Feature Count**: 15
**Estimated Sessions**: 2-3

### Features (NEWS-001 to NEWS-015)

| ID | Feature |
|----|---------|
| NEWS-001 | Email signup forms |
| NEWS-002 | Double opt-in confirmation |
| NEWS-003 | Subscriber segments |
| NEWS-004 | Welcome email sequence |
| NEWS-005 | Monthly newsletter template |
| NEWS-006 | Donation receipt emails |
| NEWS-007 | Event reminder emails |
| NEWS-008 | Blog notification emails |
| NEWS-009 | Unsubscribe management |
| NEWS-010 | Email preferences center |
| NEWS-011 | Analytics (open/click rates) |
| NEWS-012 | A/B testing support |
| NEWS-013 | Personalization tokens |
| NEWS-014 | Admin email composer |
| NEWS-015 | Scheduled sending |

---

## 15. Phase 10: AI Blog Writing Portal

**Priority**: 10
**Dependencies**: Phase 4 (Admin Auth), OpenAI API
**Feature Count**: 20
**Estimated Sessions**: 5-7

### Features (AIBLOG-001 to AIBLOG-020)

| ID | Feature |
|----|---------|
| AIBLOG-001 | Admin blog dashboard |
| AIBLOG-002 | AI topic research tool |
| AIBLOG-003 | Topic idea generation (10-20 ideas) |
| AIBLOG-004 | Keyword suggestions per topic |
| AIBLOG-005 | Topic selection interface |
| AIBLOG-006 | Batch generation (up to 10 posts) |
| AIBLOG-007 | Generation progress indicator |
| AIBLOG-008 | Blog #11 style enforcement |
| AIBLOG-009 | Local SEO keyword injection |
| AIBLOG-010 | Preview before save |
| AIBLOG-011 | Side-by-side edit view |
| AIBLOG-012 | Rich text editor (TipTap) |
| AIBLOG-013 | Image suggestion per post |
| AIBLOG-014 | Auto-generate featured image prompts |
| AIBLOG-015 | SEO score checker |
| AIBLOG-016 | Readability score |
| AIBLOG-017 | Save as draft |
| AIBLOG-018 | Schedule publishing |
| AIBLOG-019 | Bulk publish |
| AIBLOG-020 | Generation history/logs |

### AI Blog Generation Flow

```
┌─────────────────────────────────────────────────────────────┐
│                   AI BLOG GENERATION FLOW                    │
└─────────────────────────────────────────────────────────────┘

1. RESEARCH PHASE
   ├── AI analyzes:
   │   ├── Trending nonprofit topics
   │   ├── Central Asia development news
   │   ├── Financial literacy trends
   │   ├── Local Volusia County news
   │   └── Competitor blog analysis
   │
   └── Outputs: 10-20 topic ideas with:
       ├── Title options
       ├── Target keywords
       ├── Search volume estimates
       └── Content outline

2. SELECTION PHASE
   ├── Admin reviews ideas
   ├── Selects up to 10 topics
   └── Adjusts parameters per topic

3. GENERATION PHASE (Uses Claude Skills)
   ├── For each selected topic:
   │   ├── Apply Blog #11 template
   │   ├── Generate full content (2000-3500 words)
   │   ├── Include local SEO keywords
   │   ├── Add statistics and citations
   │   ├── Create section structure
   │   └── Generate meta description
   │
   └── Progress shown in real-time

4. REVIEW PHASE
   ├── Preview each generated post
   ├── Edit in rich text editor
   ├── Check SEO score
   └── Verify style compliance

5. PUBLISH PHASE
   ├── Save as draft
   ├── Schedule for later
   └── Publish immediately

6. MONITORING
   ├── Track generation history
   ├── Monitor post performance
   └── Iterate on prompts
```

---

# PART 3: STANDARDS & REFERENCES

---

## 16. Blog Style Guide

**CRITICAL**: All blog posts MUST match the exact style of Blog #11.

### 16.1 Reference: Blog #11 Structure

```markdown
# [SEO Title with Primary Keyword and Location]

*Featured [Type]: [Name] | Founded [Year] | [Location]*

[Hook paragraph - establish problem/opportunity, mention Volusia County]

[Second paragraph - introduce solution and Businesses Beyond Borders]

## [Section 1: Context with Statistics]

**[Location]** hosts over **[number]** [entities]. According to recent data:

- **[percentage]%** focus on [category 1]
- **[percentage]%** address [category 2]
- **[percentage]%** support [category 3]

## [Section 2: Local Angle - Port Orange Focus]

**Port Orange**, with its population of approximately **[number]**, [context].

### Strategic [Benefits/Advantages]
- **[Point 1]**: [explanation]
- **[Point 2]**: [explanation]

### [Resource Leverage]
The organization strategically leverages **local Volusia County resources**:
- **[Resource type 1]** provide [contribution]
- **[Resource type 2]** offer [contribution]

## [Section 3: Opportunities/Programs]

### [For Audience Type 1]
- **[Opportunity]** - [description]
- **[Opportunity]** - [description]

### [For Audience Type 2]
- **[Opportunity]** - [description]

## [Section 4: Measurable Impact]

Since founding in **Port Orange** in **[year]**:

### **[Category] Results**
- **[Metric]**: [number with context]
- **[Metric]**: [number with context]

### **[Category] Benefits**
- **[Metric]**: [number]

## [Section 5: Challenges and Solutions]

### **Challenge: [Description]**
**Solution:** [How addressed]

## [Section 6: Getting Involved]

### **Individual Opportunities**
- **[Opportunity]** ([time commitment])

### **Corporate Engagement**
- **[Option]** for [benefit]

## Conclusion

[Summary tying back to main theme]

**Ready to get involved?** Contact **Businesses Beyond Borders** at **donations@businessesbeyondborders.com** or call **(386) 517-1527** to learn how [specific action] from right here in **Port Orange, Florida**.

---

**About the Organization:** **Businesses Beyond Borders** is a **501(c)(3) nonprofit organization** headquartered in **Port Orange, Florida**. Founded in **2022**, the organization supports **entrepreneurship development** in **Kazakhstan, Kyrgyzstan, and Uzbekistan** through **financial literacy training, microfinance programs, and comprehensive business development support**.

**Keywords:** [comma-separated SEO keywords]
```

### 16.2 Formatting Rules

1. **Bold Usage** (< 2% of content):
   - Organization names: **Businesses Beyond Borders**
   - Locations: **Port Orange**, **Volusia County**
   - Key statistics: **15+ families**, **$50,000+**
   - Section lead words (sparingly)

2. **Headers**:
   - H1: Title only (once)
   - H2: Major sections (5-7 per post)
   - H3: Subsections (2-4 per H2)

3. **Lists**:
   - Bullet points for 3+ related items
   - Bold the category/lead item
   - Keep items parallel in structure

4. **Statistics**:
   - Include specific numbers
   - Use percentages for comparisons
   - Cite sources when available

5. **Local SEO Keywords** (use naturally):
   - nonprofit organizations Volusia County
   - volunteer opportunities Daytona Beach
   - charity organizations Port Orange FL
   - community service Volusia County
   - corporate volunteer programs Central Florida

6. **Length**: 2,000-3,500 words
7. **Reading Time**: 10-15 minutes
8. **Images**: 1 hero + 2-3 in-content

---

## 17. Claude Skills Integration

### 17.1 Using Claude Skills for Blog Generation

The AI blog portal should invoke Claude's built-in skills for:

1. **Research and Information Gathering**
   - Web search for current statistics
   - Fact-checking claims
   - Finding relevant citations

2. **Content Generation**
   - Following the Blog #11 template exactly
   - Maintaining consistent tone and voice
   - Natural keyword integration

3. **SEO Optimization**
   - Meta description generation
   - Title optimization
   - Heading structure

4. **Quality Assurance**
   - Grammar and spelling
   - Readability scoring
   - Style consistency checking

### 17.2 Prompt Structure for Blog Generation

```typescript
const BLOG_GENERATION_SYSTEM_PROMPT = `
You are writing a blog post for Businesses Beyond Borders, a 501(c)(3) nonprofit
based in Port Orange, Florida (Volusia County).

CRITICAL: Follow the EXACT style and structure of Blog #11 (provided below).

## Blog #11 Reference Style:
[Full Blog #11 content here as reference]

## Requirements:
1. Length: 2,000-3,500 words
2. Structure: 5-7 H2 sections with H3 subsections
3. Bold text: < 2% of content, only for emphasis
4. Local SEO: Naturally include Volusia County, Port Orange, Daytona Beach
5. Statistics: Include real data with citations where possible
6. Call to Action: End with contact info and specific next step
7. Tone: Professional but accessible, inspiring without being preachy

## Local SEO Keywords to Include:
- nonprofit organizations Volusia County
- volunteer opportunities Daytona Beach
- charity organizations Port Orange FL
- [topic-specific keywords]

## Output Format:
Return the complete blog post in Markdown format, ready for publishing.
Include a YAML frontmatter block with:
- title
- excerpt (150-160 chars)
- tags (3-5)
- readTime
`;

const TOPIC_RESEARCH_PROMPT = `
Research trending topics for a nonprofit blog that focuses on:
1. Entrepreneurship and small business development
2. Financial literacy education
3. Central Asia (Kazakhstan, Kyrgyzstan, Uzbekistan) development
4. Local community engagement in Volusia County, Florida
5. Volunteer opportunities and donor engagement

For each topic idea, provide:
- Title (SEO-optimized, 50-60 characters)
- Target keywords (3-5)
- Brief outline (5 main sections)
- Local angle (how to connect to Volusia County)
- Estimated search volume/interest

Generate 15 unique topic ideas.
`;
```

### 17.3 Quality Checks Before Publishing

```typescript
interface BlogQualityCheck {
  // Structure
  hasProperH1: boolean;
  h2Count: number; // Should be 5-7
  h3Count: number; // Should be 10-20

  // Content
  wordCount: number; // Should be 2000-3500
  boldPercentage: number; // Should be < 2%

  // SEO
  hasMetaDescription: boolean;
  metaDescriptionLength: number; // 150-160
  hasLocalKeywords: boolean;
  keywordsFound: string[];

  // Style
  hasCallToAction: boolean;
  hasContactInfo: boolean;
  hasAboutSection: boolean;

  // Calculated
  overallScore: number; // 0-100
  issues: string[];
  suggestions: string[];
}

function checkBlogQuality(content: string): BlogQualityCheck {
  // Implementation that validates against Blog #11 standards
}
```

---

## 18. Database Schema

### 18.1 Complete Supabase Schema

```sql
-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Custom types
CREATE TYPE user_role AS ENUM ('donor', 'volunteer', 'partner', 'admin', 'super_admin');
CREATE TYPE content_status AS ENUM ('draft', 'published', 'scheduled', 'archived');
CREATE TYPE event_type AS ENUM ('fundraiser', 'volunteer_day', 'workshop', 'webinar', 'training');

-- Profiles (extends auth.users)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  role user_role DEFAULT 'donor',
  phone TEXT,
  avatar_url TEXT,
  bio TEXT,
  languages TEXT[] DEFAULT ARRAY['en'],
  preferences JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author_id UUID REFERENCES profiles,
  status content_status DEFAULT 'draft',
  featured_image TEXT,
  tags TEXT[],
  read_time TEXT,
  published_at TIMESTAMPTZ,
  scheduled_for TIMESTAMPTZ,
  ai_generated BOOLEAN DEFAULT false,
  generation_prompt TEXT,
  seo_meta JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  event_type event_type NOT NULL,
  start_date TIMESTAMPTZ NOT NULL,
  end_date TIMESTAMPTZ NOT NULL,
  location JSONB,
  capacity INTEGER,
  registration_deadline TIMESTAMPTZ,
  is_public BOOLEAN DEFAULT true,
  featured_image TEXT,
  created_by UUID REFERENCES profiles,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event Registrations
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES events ON DELETE CASCADE,
  user_id UUID REFERENCES profiles ON DELETE CASCADE,
  status TEXT DEFAULT 'registered',
  checked_in_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Donations
CREATE TABLE donations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  donation_type TEXT DEFAULT 'one_time',
  campaign_id UUID,
  transaction_id TEXT,
  status TEXT DEFAULT 'pending',
  anonymous BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Volunteer Hours
CREATE TABLE volunteer_hours (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles ON DELETE CASCADE,
  event_id UUID REFERENCES events,
  hours DECIMAL(4,2) NOT NULL,
  description TEXT,
  date DATE NOT NULL,
  status TEXT DEFAULT 'pending',
  approved_by UUID REFERENCES profiles,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Courses
CREATE TABLE courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  instructor_id UUID REFERENCES profiles,
  duration TEXT,
  level TEXT,
  languages TEXT[] DEFAULT ARRAY['en'],
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Modules
CREATE TABLE modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID REFERENCES courses ON DELETE CASCADE,
  title TEXT NOT NULL,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Lessons
CREATE TABLE lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_id UUID REFERENCES modules ON DELETE CASCADE,
  title TEXT NOT NULL,
  lesson_type TEXT NOT NULL,
  content TEXT,
  video_url TEXT,
  duration INTEGER,
  order_index INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enrollments
CREATE TABLE enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles ON DELETE CASCADE,
  course_id UUID REFERENCES courses ON DELETE CASCADE,
  progress JSONB DEFAULT '{}',
  enrolled_at TIMESTAMPTZ DEFAULT NOW(),
  completed_at TIMESTAMPTZ,
  UNIQUE(user_id, course_id)
);

-- Newsletter Subscribers
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  segments TEXT[] DEFAULT ARRAY['all'],
  confirmed BOOLEAN DEFAULT false,
  subscribed_at TIMESTAMPTZ DEFAULT NOW()
);

-- Impact Metrics
CREATE TABLE impact_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  metric_name TEXT NOT NULL,
  metric_value DECIMAL(12,2) NOT NULL,
  category TEXT,
  period_start DATE,
  period_end DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- AI Blog Generation Logs
CREATE TABLE ai_blog_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  topic TEXT NOT NULL,
  prompt TEXT,
  generated_content TEXT,
  status TEXT DEFAULT 'generated',
  published_post_id UUID REFERENCES blog_posts,
  generated_by UUID REFERENCES profiles,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE donations ENABLE ROW LEVEL SECURITY;
ALTER TABLE volunteer_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;

-- Basic RLS Policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Published posts are viewable by everyone"
  ON blog_posts FOR SELECT USING (status = 'published');

CREATE POLICY "Admins can manage all posts"
  ON blog_posts FOR ALL USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('admin', 'super_admin')
    )
  );
```

---

## 19. Testing Requirements

### 19.1 Test Types Required

| Type | Tool | When |
|------|------|------|
| Unit | Vitest | On every file save |
| Integration | Vitest + Testing Library | Before commit |
| E2E | Playwright | Before merge |
| Visual | Playwright screenshots | After UI changes |
| Accessibility | axe-core | Weekly |
| Performance | Lighthouse CI | On deploy |

### 19.2 Test Commands

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Visual regression
npm run test:visual

# Accessibility audit
npm run test:a11y

# Performance audit
npm run test:perf

# Full test suite
npm run test:all
```

### 19.3 CI/CD Pipeline

```yaml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Install
        run: npm ci

      - name: Lint
        run: npm run lint

      - name: Unit Tests
        run: npm run test

      - name: Build
        run: npm run build

      - name: E2E Tests
        run: npm run test:e2e

      - name: Lighthouse CI
        run: npm run test:perf
```

---

## 20. Security & Deployment

### 20.1 Environment Variables

```env
# Supabase
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# OpenAI (for AI blog generation)
OPENAI_API_KEY=

# Email
RESEND_API_KEY=

# Analytics
VITE_GA_MEASUREMENT_ID=
```

### 20.2 Security Checklist

- [ ] Row Level Security on all tables
- [ ] Input sanitization
- [ ] HTTPS only
- [ ] CSRF protection
- [ ] Rate limiting on API endpoints
- [ ] Secure session management
- [ ] No secrets in client code

### 20.3 Deployment

```bash
# Build for production
npm run build

# Preview locally
npm run preview

# Deploy to Netlify (automatic via GitHub)
git push origin main
```

---

## Quick Reference

### Session Start Checklist
1. [ ] Read `feature_list.json` - check current status
2. [ ] Read `claude-progress.txt` - understand context
3. [ ] Run `./init.sh` - start development server
4. [ ] Run verification tests - ensure no regressions
5. [ ] Select ONE feature to work on
6. [ ] Create checkpoint before starting

### Session End Checklist
1. [ ] Feature fully implemented and tested
2. [ ] All verification tests still pass
3. [ ] Changes committed with descriptive message
4. [ ] `feature_list.json` updated (if feature complete)
5. [ ] `claude-progress.txt` updated with session summary
6. [ ] Checkpoint created

### Recovery Commands
```bash
# List checkpoints
git tag -l "checkpoint-*" | sort -r

# Restore checkpoint
git checkout checkpoint-[name]

# Create recovery branch
git checkout -b recovery-$(date +%Y%m%d)

# Compare to checkpoint
git diff checkpoint-[name]..HEAD
```

---

**Version**: 2.0
**Last Updated**: December 2025
**Based On**: Anthropic's Effective Harnesses for Long-Running Agents

---

## Appendix A: Complete Feature List (200 Items)

The full `feature_list.json` should be generated in the Initializer Session with 200+ features covering:

- SEO (25 features)
- Blog System (20 features)
- Performance (15 features)
- Authentication (35 features)
- Events (20 features)
- Multi-language (25 features)
- Impact Dashboard (15 features)
- Courses (25 features)
- Newsletter (15 features)
- AI Blog Portal (20 features)

Each feature includes:
- Unique ID
- Descriptive name
- Test steps (3-5 steps each)
- passing: false (initially)
- session_completed: null
- notes: ""
