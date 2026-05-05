/**
 * Phase 6 migration: seeds the RICH curriculum rows (with side-by-side
 * key-topics + deliverables bullet lists) on the two program docs that need
 * them:
 *   - program.business-creation       → 4-module 12-week curriculum
 *   - program.community-collaboration → 3-phase Launch Roadmap
 *
 * The other two program docs (financial-literacy, leadership-development) use
 * the simple weekOverview shape (title + summary only) and are seeded by
 * scripts/migrate-program-deep-sections.mts. This migration intentionally
 * does NOT touch them.
 *
 * Idempotent — every row has a stable `_key`, so re-running just resets the
 * weeks array on each program. Safe to run multiple times.
 *
 * Doc-ID convention (from scripts/migrate-programs.mts):
 *   _id = `program.<slug>` for each programPage doc.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:program-curriculum-deep
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN env var.\n");
  console.error("Generate at sanity.io/manage → API → Tokens (Editor permissions).");
  console.error(
    "Then run:\n  SANITY_WRITE_TOKEN=<token> npm run migrate:program-curriculum-deep\n",
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

interface BilingualBullet {
  _key: string;
  _type: "bilingualBullet";
  label: string;
  labelRu?: string;
}

interface RichWeekOverview {
  _key: string;
  _type: "weekOverview";
  weekNumber: number;
  title: string;
  titleRu?: string;
  summary?: string;
  summaryRu?: string;
  keyTopicsHeading?: string;
  keyTopicsHeadingRu?: string;
  keyTopics: BilingualBullet[];
  deliverablesHeading?: string;
  deliverablesHeadingRu?: string;
  deliverables: BilingualBullet[];
}

interface ProgramCurriculum {
  slug: string;
  weeks: RichWeekOverview[];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 60);
}

interface BulletInput {
  label: string;
  labelRu?: string;
}

function buildBullets(rows: BulletInput[], prefix: string): BilingualBullet[] {
  const seen = new Set<string>();
  return rows.map((row, i) => {
    let key = slugify(row.label) || `bullet-${i + 1}`;
    if (seen.has(key)) {
      key = `${key}-${i + 1}`;
    }
    seen.add(key);
    return {
      _key: key,
      _type: "bilingualBullet",
      label: row.label,
      labelRu: row.labelRu,
    };
  });
}

// ─── Business Creation: 4-module 12-week curriculum ──────────────────────────

const BUSINESS_CREATION: ProgramCurriculum = {
  slug: "business-creation",
  weeks: [
    {
      _key: "module-1",
      _type: "weekOverview",
      weekNumber: 1,
      title: "Module 1: Think Like an Entrepreneur (Weeks 1-3)",
      titleRu: "Модуль 1: Думай как предприниматель (Недели 1–3)",
      summary:
        "Build entrepreneurial mindset, master Lean Startup methodology, and develop personal productivity systems for business success.",
      summaryRu:
        "Сформируйте предпринимательское мышление, освойте методологию Lean Startup и разработайте системы личной продуктивности для успеха в бизнесе.",
      keyTopicsHeading: "Key Topics:",
      keyTopicsHeadingRu: "Ключевые темы:",
      keyTopics: buildBullets(
        [
          { label: "Introduction to Entrepreneurship & Growth Mindset", labelRu: "Введение в предпринимательство и установка на рост" },
          { label: "Lean Startup Methodology & Build-Measure-Learn", labelRu: "Методология Lean Startup и цикл «Создавай-Измеряй-Учись»" },
          { label: "Personal Productivity & Time Management", labelRu: "Личная продуктивность и управление временем" },
          { label: "Identifying Business Opportunities", labelRu: "Выявление бизнес-возможностей" },
          { label: "Better World Business Models", labelRu: "Бизнес-модели для лучшего мира" },
          { label: "Market Research Fundamentals", labelRu: "Основы исследования рынка" },
        ],
        "bc-m1-key",
      ),
      deliverablesHeading: "Deliverables:",
      deliverablesHeadingRu: "Результаты:",
      deliverables: buildBullets(
        [
          { label: "Personal vision statement", labelRu: "Личное заявление о видении" },
          { label: "Productivity system implementation", labelRu: "Внедрение системы продуктивности" },
          { label: "Opportunity evaluation matrix", labelRu: "Матрица оценки возможностей" },
          { label: "Market research plan", labelRu: "План исследования рынка" },
        ],
        "bc-m1-del",
      ),
    },
    {
      _key: "module-2",
      _type: "weekOverview",
      weekNumber: 2,
      title: "Module 2: Shape Your Business Model (Weeks 4-6)",
      titleRu: "Модуль 2: Формируй бизнес-модель (Недели 4–6)",
      summary:
        "Master Business Model Canvas, design compelling value propositions, and develop customer discovery processes.",
      summaryRu:
        "Освойте Business Model Canvas, разработайте убедительные ценностные предложения и процессы выявления потребностей клиентов.",
      keyTopicsHeading: "Key Topics:",
      keyTopicsHeadingRu: "Ключевые темы:",
      keyTopics: buildBullets(
        [
          { label: "Business Model Canvas Deep Dive", labelRu: "Глубокое погружение в Business Model Canvas" },
          { label: "Value Proposition Design", labelRu: "Дизайн ценностного предложения" },
          { label: "Customer Discovery Process", labelRu: "Процесс выявления потребностей клиентов" },
          { label: "Problem-Solution Fit Validation", labelRu: "Проверка соответствия проблемы и решения" },
          { label: "Pitching and Presentation Skills", labelRu: "Навыки питча и презентации" },
          { label: "Channel Strategy & Customer Relationships", labelRu: "Стратегия каналов и отношения с клиентами" },
        ],
        "bc-m2-key",
      ),
      deliverablesHeading: "Deliverables:",
      deliverablesHeadingRu: "Результаты:",
      deliverables: buildBullets(
        [
          { label: "Complete Business Model Canvas", labelRu: "Полный Business Model Canvas" },
          { label: "Value Proposition Canvas", labelRu: "Canvas ценностного предложения" },
          { label: "Customer interview reports", labelRu: "Отчёты о клиентских интервью" },
          { label: "Problem-solution fit presentation", labelRu: "Презентация соответствия проблемы и решения" },
        ],
        "bc-m2-del",
      ),
    },
    {
      _key: "module-3",
      _type: "weekOverview",
      weekNumber: 3,
      title: "Module 3: Validate Your Assumptions (Weeks 7-9)",
      titleRu: "Модуль 3: Проверяй гипотезы (Недели 7–9)",
      summary:
        "Learn data-driven decision making, test value propositions systematically, and achieve customer validation milestones.",
      summaryRu:
        "Изучите принятие решений на основе данных, систематически тестируйте ценностные предложения и достигайте контрольных точек проверки клиентов.",
      keyTopicsHeading: "Key Topics:",
      keyTopicsHeadingRu: "Ключевые темы:",
      keyTopics: buildBullets(
        [
          { label: "Business Metrics & KPI Tracking", labelRu: "Бизнес-показатели и отслеживание KPI" },
          { label: "Value Proposition Testing Methods", labelRu: "Методы тестирования ценностного предложения" },
          { label: "Feedback System Design", labelRu: "Дизайн системы обратной связи" },
          { label: "Customer Validation Frameworks", labelRu: "Фреймворки проверки клиентов" },
          { label: "Business Model Iteration", labelRu: "Итерация бизнес-модели" },
          { label: "Competitive Analysis & Positioning", labelRu: "Конкурентный анализ и позиционирование" },
        ],
        "bc-m3-key",
      ),
      deliverablesHeading: "Deliverables:",
      deliverablesHeadingRu: "Результаты:",
      deliverables: buildBullets(
        [
          { label: "KPI dashboard and tracking system", labelRu: "Панель KPI и система отслеживания" },
          { label: "Validation experiment results", labelRu: "Результаты экспериментов по проверке" },
          { label: "Customer validation report", labelRu: "Отчёт о проверке клиентов" },
          { label: "Competitive analysis matrix", labelRu: "Матрица конкурентного анализа" },
        ],
        "bc-m3-del",
      ),
    },
    {
      _key: "module-4",
      _type: "weekOverview",
      weekNumber: 4,
      title: "Module 4: Build Traction - The First Milestone (Weeks 10-12)",
      titleRu: "Модуль 4: Набирай обороты - Первый рубеж (Недели 10–12)",
      summary:
        "Develop functional MVP, achieve product-market fit, and create investor-ready pitches for successful business launch.",
      summaryRu:
        "Разработайте функциональный MVP, достигните соответствия продукта рынку и создайте убедительный питч для успешного запуска бизнеса.",
      keyTopicsHeading: "Key Topics:",
      keyTopicsHeadingRu: "Ключевые темы:",
      keyTopics: buildBullets(
        [
          { label: "MVP Design & Development Workshop", labelRu: "Воркшоп по разработке MVP" },
          { label: "Product-Market Fit Measurement", labelRu: "Измерение соответствия продукта рынку" },
          { label: "Investment-Ready Pitch Creation", labelRu: "Создание питча для инвесторов" },
          { label: "Financial Modeling & Projections", labelRu: "Финансовое моделирование и прогнозы" },
          { label: "Launch Strategy & Go-to-Market", labelRu: "Стратегия запуска и выхода на рынок" },
          { label: "Graduation & Next Steps Planning", labelRu: "Выпуск и планирование следующих шагов" },
        ],
        "bc-m4-key",
      ),
      deliverablesHeading: "Deliverables:",
      deliverablesHeadingRu: "Результаты:",
      deliverables: buildBullets(
        [
          { label: "Functional MVP prototype", labelRu: "Функциональный прототип MVP" },
          { label: "Product-market fit analysis", labelRu: "Анализ соответствия продукта рынку" },
          { label: "Investor pitch deck", labelRu: "Питч-дек для инвесторов" },
          { label: "Financial model & projections", labelRu: "Финансовая модель и прогнозы" },
        ],
        "bc-m4-del",
      ),
    },
  ],
};

// ─── Community Collaboration: 3-phase Launch Roadmap ─────────────────────────

const COMMUNITY_COLLABORATION: ProgramCurriculum = {
  slug: "community-collaboration",
  weeks: [
    {
      _key: "phase-1",
      _type: "weekOverview",
      weekNumber: 1,
      title: "Phase 1: Foundation Building (Months 1-3) - Q2 2026",
      titleRu: "Этап 1: Закладка фундамента (месяцы 1–3) — 2-й квартал 2026",
      summary:
        "Recruit and train volunteer coordinators, establish partnerships, and create initial network infrastructure.",
      summaryRu:
        "Набор и обучение координаторов-волонтёров, создание партнёрств и разработка начальной сетевой инфраструктуры.",
      keyTopicsHeading: "Volunteer Recruitment",
      keyTopicsHeadingRu: "Набор волонтёров",
      keyTopics: buildBullets(
        [
          { label: "Recruit 15-20 volunteer coordinators", labelRu: "Набрать 15–20 координаторов-волонтёров" },
          { label: "Volunteer training and orientation program", labelRu: "Обучение и ориентация волонтёров" },
          { label: "Establish volunteer management system", labelRu: "Создать систему управления волонтёрами" },
          { label: "Create volunteer recognition program", labelRu: "Разработать программу признания волонтёров" },
        ],
        "cc-p1-l",
      ),
      deliverablesHeading: "Infrastructure Development",
      deliverablesHeadingRu: "Развитие инфраструктуры",
      deliverables: buildBullets(
        [
          { label: "Develop digital collaboration platform", labelRu: "Разработать цифровую платформу для сотрудничества" },
          { label: "Establish partnership agreements", labelRu: "Заключить партнёрские соглашения" },
          { label: "Create resource library and tools", labelRu: "Создать библиотеку ресурсов и инструменты" },
          { label: "Design program brand and materials", labelRu: "Разработать бренд и материалы программы" },
        ],
        "cc-p1-r",
      ),
    },
    {
      _key: "phase-2",
      _type: "weekOverview",
      weekNumber: 2,
      title: "Phase 2: Program Launch (Months 4-6) - Q3 2026",
      titleRu: "Этап 2: Запуск программы (месяцы 4–6) — 3-й квартал 2026",
      summary:
        "Host inaugural community forum, launch digital platform, and begin facilitating collaboration projects.",
      summaryRu:
        "Проведение первого форума сообщества, запуск цифровой платформы и начало реализации совместных проектов.",
      keyTopicsHeading: "Community Engagement",
      keyTopicsHeadingRu: "Вовлечение сообщества",
      keyTopics: buildBullets(
        [
          { label: "First Quarterly Community Forum", labelRu: "Первый ежеквартальный форум сообщества" },
          { label: "Launch outreach campaign", labelRu: "Запустить кампанию по охвату" },
          { label: "Form initial working groups", labelRu: "Сформировать первые рабочие группы" },
          { label: "Begin partnership matching", labelRu: "Начать подбор партнёров" },
        ],
        "cc-p2-l",
      ),
      deliverablesHeading: "Platform Activation",
      deliverablesHeadingRu: "Активация платформы",
      deliverables: buildBullets(
        [
          { label: "Digital platform public launch", labelRu: "Публичный запуск цифровой платформы" },
          { label: "First collaborative projects", labelRu: "Первые совместные проекты" },
          { label: "Volunteer coordination system", labelRu: "Система координации волонтёров" },
          { label: "Impact measurement baseline", labelRu: "Базовый уровень измерения результатов" },
        ],
        "cc-p2-r",
      ),
    },
    {
      _key: "phase-3",
      _type: "weekOverview",
      weekNumber: 3,
      title: "Phase 3: Growth & Impact (Months 7-12) - Q4 2026 & Beyond",
      titleRu: "Этап 3: Рост и влияние (месяцы 7–12) — 4-й квартал 2026 и далее",
      summary:
        "Scale network operations, measure impact, and establish sustainable volunteer-driven model for long-term success.",
      summaryRu:
        "Масштабирование работы сети, измерение результатов и создание устойчивой волонтёрской модели для долгосрочного успеха.",
      keyTopicsHeading: "Network Expansion",
      keyTopicsHeadingRu: "Расширение сети",
      keyTopics: buildBullets(
        [
          { label: "Scale to 200+ network members", labelRu: "Расширить до 200+ участников сети" },
          { label: "Expand to additional communities", labelRu: "Выйти в новые сообщества" },
          { label: "Launch specialized working groups", labelRu: "Запустить специализированные рабочие группы" },
          { label: "Develop leadership pipeline", labelRu: "Развить канал лидеров" },
        ],
        "cc-p3-l",
      ),
      deliverablesHeading: "Impact Measurement",
      deliverablesHeadingRu: "Измерение результатов",
      deliverables: buildBullets(
        [
          { label: "Quarterly impact reports", labelRu: "Ежеквартальные отчёты о результатах" },
          { label: "Success story documentation", labelRu: "Документирование историй успеха" },
          { label: "Volunteer recognition events", labelRu: "Мероприятия по признанию волонтёров" },
          { label: "Program sustainability planning", labelRu: "Планирование устойчивости программы" },
        ],
        "cc-p3-r",
      ),
    },
  ],
};

const ALL: ProgramCurriculum[] = [BUSINESS_CREATION, COMMUNITY_COLLABORATION];

// ─── Patch helper ────────────────────────────────────────────────────────────

async function patchProgram(
  p: ProgramCurriculum,
): Promise<{ ok: boolean; err?: string }> {
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

  await client.patch(_id).set({ weeks: p.weeks }).commit();

  return { ok: true };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(
    `\n🚀 Patching rich curriculum (weeks with keyTopics + deliverables) on ${ALL.length} program pages\n`,
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
        const totalKey = p.weeks.reduce((sum, w) => sum + w.keyTopics.length, 0);
        const totalDel = p.weeks.reduce(
          (sum, w) => sum + w.deliverables.length,
          0,
        );
        console.log(
          `✅ patched (${p.weeks.length} rows, ${totalKey} key topics, ${totalDel} deliverables)`,
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
