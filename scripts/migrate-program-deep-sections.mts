/**
 * Phase 5 migration: seeds the deep program-page sections
 *   - weeks       (curriculum accordion rows)
 *   - stats       (hero stats grid)
 *   - trustBadges (small badges under the hero)
 *
 * Idempotent — re-runs `client.patch(<programId>).set({ ... }).commit()` on
 * each of the 4 program docs. Safe to run multiple times.
 *
 * Doc-ID convention (from scripts/migrate-programs.mts):
 *   _id = `program.<slug>` for each programPage doc.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:program-deep-sections
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN env var.\n");
  console.error("Generate at sanity.io/manage → API → Tokens (Editor permissions).");
  console.error(
    "Then run:\n  SANITY_WRITE_TOKEN=<token> npm run migrate:program-deep-sections\n",
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ─── Types ───────────────────────────────────────────────────────────────────

interface WeekOverview {
  _key: string;
  _type: "weekOverview";
  weekNumber: number;
  title: string;
  titleRu?: string;
  summary?: string;
  summaryRu?: string;
}

interface ProgramStat {
  _key: string;
  _type: "programStat";
  value: string;
  label: string;
  labelRu?: string;
}

interface TrustBadge {
  _key: string;
  _type: "trustBadge";
  icon: string;
  label: string;
  labelRu?: string;
}

interface ProgramDeepSections {
  slug: string;
  weeks: WeekOverview[];
  stats: ProgramStat[];
  trustBadges: TrustBadge[];
}

const k = (prefix: string, n: number) => `${prefix}-${n}`;

// ─── Financial Literacy ──────────────────────────────────────────────────────
// Curriculum mirrors src/data/courseContent.ts (financial-literacy 6-week course)
// — title + short summary per week. Topics still come from courseContent.ts.

const FINANCIAL_LITERACY: ProgramDeepSections = {
  slug: "financial-literacy",
  weeks: [
    {
      _key: k("fl-w", 1),
      _type: "weekOverview",
      weekNumber: 1,
      title: "Foundation: Mindset & Money Snapshot",
      titleRu: "Основы: мышление и финансовый снимок",
      summary:
        "Set the foundation: take stock of where you stand financially, identify your money mindset, and define what financial freedom means for you.",
      summaryRu:
        "Заложите фундамент: оцените своё финансовое положение, определите своё отношение к деньгам и сформулируйте, что для вас значит финансовая свобода.",
    },
    {
      _key: k("fl-w", 2),
      _type: "weekOverview",
      weekNumber: 2,
      title: "Goal Setting & Vision",
      titleRu: "Постановка целей и видение",
      summary:
        "Translate values into concrete short-, medium-, and long-term financial goals — and the systems that make them achievable.",
      summaryRu:
        "Переведите ценности в конкретные краткосрочные, среднесрочные и долгосрочные финансовые цели — и в системы, которые делают их достижимыми.",
    },
    {
      _key: k("fl-w", 3),
      _type: "weekOverview",
      weekNumber: 3,
      title: "Budgeting: The Zero-Based Approach",
      titleRu: "Бюджетирование: метод нулевого базиса",
      summary:
        "Build a working zero-based budget that gives every dollar a job, with categories tailored to your real life.",
      summaryRu:
        "Составьте рабочий бюджет с нулевой базой, где каждый доллар имеет назначение, с категориями под вашу реальную жизнь.",
    },
    {
      _key: k("fl-w", 4),
      _type: "weekOverview",
      weekNumber: 4,
      title: "Debt Elimination: Snowball & Avalanche",
      titleRu: "Погашение долгов: «снежный ком» и «лавина»",
      summary:
        "Compare the snowball and avalanche payoff strategies, build a debt-free date, and create the discipline to keep going.",
      summaryRu:
        "Сравните стратегии «снежный ком» и «лавина», определите дату освобождения от долгов и выработайте дисциплину.",
    },
    {
      _key: k("fl-w", 5),
      _type: "weekOverview",
      weekNumber: 5,
      title: "Saving & Emergency Funds",
      titleRu: "Сбережения и резервный фонд",
      summary:
        "Build the emergency fund first, then layer in short-term savings and the right place to keep each kind of money.",
      summaryRu:
        "Сначала создайте резервный фонд, затем добавьте краткосрочные сбережения и правильно разместите каждую часть денег.",
    },
    {
      _key: k("fl-w", 6),
      _type: "weekOverview",
      weekNumber: 6,
      title: "Generosity, Legacy & Next Steps",
      titleRu: "Щедрость, наследие и следующие шаги",
      summary:
        "Plan generosity at your income level, write a 90-day action plan, and prepare to teach what you've learned.",
      summaryRu:
        "Спланируйте щедрость на уровне вашего дохода, напишите 90-дневный план действий и подготовьтесь учить других.",
    },
  ],
  // Financial Literacy hero has no stats grid in current design — leave empty.
  stats: [],
  trustBadges: [
    {
      _key: k("fl-b", 1),
      _type: "trustBadge",
      icon: "Zap",
      label: "100% Free",
      labelRu: "100% бесплатно",
    },
    {
      _key: k("fl-b", 2),
      _type: "trustBadge",
      icon: "Clock",
      label: "Self-Paced",
      labelRu: "В своём темпе",
    },
    {
      _key: k("fl-b", 3),
      _type: "trustBadge",
      icon: "Users",
      label: "No Login Required",
      labelRu: "Без регистрации",
    },
    {
      _key: k("fl-b", 4),
      _type: "trustBadge",
      icon: "Shield",
      label: "Evidence-Based",
      labelRu: "Научно обоснован",
    },
  ],
};

// ─── Business Creation ───────────────────────────────────────────────────────
// 12-week program structured as 4 modules. weeks[] holds module-level rows;
// the rich topic+deliverable detail still lives inline in BusinessCreation.tsx
// because the simple weekOverview schema can't represent both lists.

const BUSINESS_CREATION: ProgramDeepSections = {
  slug: "business-creation",
  weeks: [
    {
      _key: k("bc-w", 1),
      _type: "weekOverview",
      weekNumber: 1,
      title: "Module 1: Think Like an Entrepreneur (Weeks 1–3)",
      titleRu: "Модуль 1: Думай как предприниматель (Недели 1–3)",
      summary:
        "Build entrepreneurial mindset, master Lean Startup methodology, and develop personal productivity systems for business success.",
      summaryRu:
        "Сформируйте предпринимательское мышление, освойте методологию Lean Startup и разработайте системы личной продуктивности для успеха в бизнесе.",
    },
    {
      _key: k("bc-w", 2),
      _type: "weekOverview",
      weekNumber: 2,
      title: "Module 2: Shape Your Business Model (Weeks 4–6)",
      titleRu: "Модуль 2: Формируй бизнес-модель (Недели 4–6)",
      summary:
        "Master Business Model Canvas, design compelling value propositions, and develop customer discovery processes.",
      summaryRu:
        "Освойте Business Model Canvas, разработайте убедительные ценностные предложения и процессы выявления потребностей клиентов.",
    },
    {
      _key: k("bc-w", 3),
      _type: "weekOverview",
      weekNumber: 3,
      title: "Module 3: Validate Your Assumptions (Weeks 7–9)",
      titleRu: "Модуль 3: Проверяй гипотезы (Недели 7–9)",
      summary:
        "Learn data-driven decision making, test value propositions systematically, and achieve customer validation milestones.",
      summaryRu:
        "Изучите принятие решений на основе данных, систематически тестируйте ценностные предложения и достигайте контрольных точек проверки клиентов.",
    },
    {
      _key: k("bc-w", 4),
      _type: "weekOverview",
      weekNumber: 4,
      title: "Module 4: Build Traction (Weeks 10–12)",
      titleRu: "Модуль 4: Набирай обороты (Недели 10–12)",
      summary:
        "Develop functional MVP, achieve product-market fit, and create investor-ready pitches for successful business launch.",
      summaryRu:
        "Разработайте функциональный MVP, достигните соответствия продукта рынку и создайте убедительный питч для успешного запуска бизнеса.",
    },
  ],
  stats: [
    {
      _key: k("bc-s", 1),
      _type: "programStat",
      value: "90%",
      label: "Launch Success Rate",
      labelRu: "Успешных запусков",
    },
    {
      _key: k("bc-s", 2),
      _type: "programStat",
      value: "72",
      label: "Hours of Training",
      labelRu: "Часов обучения",
    },
    {
      _key: k("bc-s", 3),
      _type: "programStat",
      value: "4",
      label: "Progressive Modules",
      labelRu: "Последовательных модуля",
    },
    {
      _key: k("bc-s", 4),
      _type: "programStat",
      value: "1:1",
      label: "Mentorship Support",
      labelRu: "Поддержка наставника",
    },
  ],
  trustBadges: [
    {
      _key: k("bc-b", 1),
      _type: "trustBadge",
      icon: "Star",
      label: "Proven Lean Startup Methodology",
      labelRu: "Проверенная методология Lean Startup",
    },
  ],
};

// ─── Leadership Development ──────────────────────────────────────────────────
// 12-week program structured as 4 modules of 3 weeks each. weeks[] holds the
// module rows; per-week detail still comes from leadershipCourseWeeks.

const LEADERSHIP_DEVELOPMENT: ProgramDeepSections = {
  slug: "leadership-development",
  weeks: [
    {
      _key: k("ld-w", 1),
      _type: "weekOverview",
      weekNumber: 1,
      title: "Leading Yourself",
      titleRu: "Веди себя",
      summary: "Weeks 1-3",
      summaryRu: "Недели 1-3",
    },
    {
      _key: k("ld-w", 2),
      _type: "weekOverview",
      weekNumber: 2,
      title: "Leading Others",
      titleRu: "Веди других",
      summary: "Weeks 4-6",
      summaryRu: "Недели 4-6",
    },
    {
      _key: k("ld-w", 3),
      _type: "weekOverview",
      weekNumber: 3,
      title: "Leading Teams",
      titleRu: "Веди команды",
      summary: "Weeks 7-9",
      summaryRu: "Недели 7-9",
    },
    {
      _key: k("ld-w", 4),
      _type: "weekOverview",
      weekNumber: 4,
      title: "Leading Organizations",
      titleRu: "Веди организации",
      summary: "Weeks 10-12",
      summaryRu: "Недели 10-12",
    },
  ],
  // Leadership Development hero has no stats grid in current design — leave empty.
  stats: [],
  trustBadges: [
    {
      _key: k("ld-b", 1),
      _type: "trustBadge",
      icon: "Zap",
      label: "100% Free",
      labelRu: "100% бесплатно",
    },
    {
      _key: k("ld-b", 2),
      _type: "trustBadge",
      icon: "Clock",
      label: "Self-Paced",
      labelRu: "В своём темпе",
    },
    {
      _key: k("ld-b", 3),
      _type: "trustBadge",
      icon: "Users",
      label: "12 Weeks",
      labelRu: "12 недель",
    },
    {
      _key: k("ld-b", 4),
      _type: "trustBadge",
      icon: "Shield",
      label: "Evidence-Based",
      labelRu: "Научно обоснован",
    },
  ],
};

// ─── Community Collaboration ─────────────────────────────────────────────────

const COMMUNITY_COLLABORATION: ProgramDeepSections = {
  slug: "community-collaboration",
  // Community Collaboration's "weeks" are launch phases — not currently rendered
  // through the weeks accordion (the page has its own bespoke phase accordion).
  // Leave empty for now; future phase can wire phases through this array.
  weeks: [],
  stats: [
    {
      _key: k("cc-s", 1),
      _type: "programStat",
      value: "NEW",
      label: "Program Launch",
      labelRu: "Запуск программы",
    },
    {
      _key: k("cc-s", 2),
      _type: "programStat",
      value: "2hrs",
      label: "Weekly Commitment",
      labelRu: "Еженедельная нагрузка",
    },
    {
      _key: k("cc-s", 3),
      _type: "programStat",
      value: "$31.80",
      label: "Volunteer Hour Value",
      labelRu: "Ценность часа волонтёра",
    },
    {
      _key: k("cc-s", 4),
      _type: "programStat",
      value: "10+",
      label: "Volunteer Roles",
      labelRu: "Волонтёрских ролей",
    },
  ],
  trustBadges: [
    {
      _key: k("cc-b", 1),
      _type: "trustBadge",
      icon: "Star",
      label: "Volunteers Needed to Launch",
      labelRu: "Нужны волонтёры для запуска",
    },
  ],
};

const ALL: ProgramDeepSections[] = [
  FINANCIAL_LITERACY,
  BUSINESS_CREATION,
  LEADERSHIP_DEVELOPMENT,
  COMMUNITY_COLLABORATION,
];

// ─── Patch helper ────────────────────────────────────────────────────────────

async function patchProgram(p: ProgramDeepSections): Promise<{ ok: boolean; err?: string }> {
  const _id = `program.${p.slug}`;

  // Verify the doc exists. If it doesn't, we don't want to create one here —
  // that's the job of migrate-programs. Just report and skip.
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_id == $id][0]{_id}`,
    { id: _id },
  );

  if (!existing) {
    return {
      ok: false,
      err: `program.${p.slug} not found — run migrate:programs first to seed the base doc.`,
    };
  }

  await client
    .patch(_id)
    .set({
      weeks: p.weeks,
      stats: p.stats,
      trustBadges: p.trustBadges,
    })
    .commit();

  return { ok: true };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(
    `\n🚀 Patching deep sections (weeks, stats, trustBadges) on ${ALL.length} program pages\n`,
  );
  console.log(`   project=${projectId} dataset=${dataset}\n`);

  let successes = 0;
  let failures = 0;

  for (const p of ALL) {
    process.stdout.write(`→ program.${p.slug} ... `);
    try {
      const result = await patchProgram(p);
      if (result.ok) {
        successes++;
        console.log(
          `✅ patched (weeks=${p.weeks.length}, stats=${p.stats.length}, badges=${p.trustBadges.length})`,
        );
      } else {
        failures++;
        console.log(`⚠️  skipped — ${result.err}`);
      }
    } catch (err) {
      failures++;
      console.log(`❌ ${(err as Error).message}`);
    }
  }

  console.log(`\n   ${successes} patched, ${failures} failed/skipped`);
  console.log(
    "\n✅ Done. Visit https://bbborders.sanity.studio/structure/programPage to verify.\n",
  );

  if (failures > 0) process.exit(1);
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
