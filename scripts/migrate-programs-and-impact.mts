/**
 * Seeds the programsAndImpactPage singleton with the content currently
 * hardcoded in ProgramsAndImpact.tsx.
 *
 * Idempotent — uses createOrReplace, so running it again is safe.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:programs-and-impact
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN env var.\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ─── Hero ──────────────────────────────────────────────────────────────────────

const heroHeading = "Programs Designed to Build Real Lives";
const heroHeadingRu = "Программы, созданные для настоящих жизней";

const heroSubheading =
  "Four stages. Every step earned. Free financial literacy training for anyone willing to show up -- and a path from there to owning a real business.";
const heroSubheadingRu =
  "Бесплатное обучение финансовой грамотности для каждого, кто готов учиться. Путь от знаний — к собственному делу.";

// ─── "Our Difference" section ─────────────────────────────────────────────────

const differenceHeading = "What Makes This Different";
const differenceHeadingRu = "Чем мы отличаемся";

// Portable Text arrays — one block per paragraph.
const differenceBody = [
  {
    _type: "block",
    _key: "db1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "db1s1",
        marks: [],
        text: "Most organizations help people receive. BBB turns receivers into builders -- and builders into people who give someone else their first opportunity.",
      },
    ],
  },
  {
    _type: "block",
    _key: "db2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "db2s1",
        marks: [],
        text: "We are not competing with micro-lenders, curriculum organizations, or relief organizations. We are the next chapter of what they start. When the class ends, when the loan is repaid, when the initial help runs out -- BBB is what comes next.",
      },
    ],
  },
  {
    _type: "block",
    _key: "db3",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "db3s1",
        marks: [],
        text: "Not everyone advances through every stage. That's the point. The filter protects participants and produces real results. When someone receives startup capital from BBB, they've already proven -- through months of showing up, doing the work, and building the plan -- that they're ready. That's why it works.",
      },
    ],
  },
];

const differenceBodyRu = [
  {
    _type: "block",
    _key: "dbr1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "dbr1s1",
        marks: [],
        text: "Большинство организаций помогают людям получать. BBB превращает получателей в строителей — а строителей в людей, которые дают кому-то другому первый шанс.",
      },
    ],
  },
  {
    _type: "block",
    _key: "dbr2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "dbr2s1",
        marks: [],
        text: "Мы не конкурируем с микрокредитными организациями, образовательными проектами или благотворительными фондами. Мы — следующая глава того, что они начинают. Когда курс заканчивается, когда кредит погашен, когда первая помощь иссякает — BBB — это то, что приходит дальше.",
      },
    ],
  },
  {
    _type: "block",
    _key: "dbr3",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "dbr3s1",
        marks: [],
        text: "Не каждый проходит все этапы. В этом и суть. Фильтр защищает участников и даёт реальные результаты. Когда кто-то получает стартовый капитал от BBB, он уже доказал — месяцами усердной работы, присутствия и создания бизнес-плана — что он готов. Поэтому это работает.",
      },
    ],
  },
];

// ─── Metrics ──────────────────────────────────────────────────────────────────

const metricsHeading = "Where We Are So Far";
const metricsHeadingRu = "Наши результаты";

const metrics = [
  {
    _key: "m1",
    _type: "metric",
    value: 50,
    suffix: "+",
    label: "People Trained in Financial Literacy",
    labelRu: "Обучены финансовой грамотности",
  },
  {
    _key: "m2",
    _type: "metric",
    value: 6,
    suffix: "+",
    label: "Communities Reached",
    labelRu: "Охвачено сообществ",
  },
  {
    _key: "m3",
    _type: "metric",
    value: 150,
    suffix: "+",
    label: "Lives Directly Affected",
    labelRu: "Жизней затронуто напрямую",
  },
  {
    _key: "m4",
    _type: "metric",
    value: 3,
    suffix: "",
    label: "Countries Served",
    labelRu: "Стран обслуживается",
  },
];

// ─── Seed ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\nSeeding programsAndImpactPage singleton...\n");

  await client.createOrReplace({
    _id: "programsAndImpactPage",
    _type: "programsAndImpactPage",
    heroHeading,
    heroHeadingRu,
    heroSubheading,
    heroSubheadingRu,
    differenceHeading,
    differenceHeadingRu,
    differenceBody,
    differenceBodyRu,
    metricsHeading,
    metricsHeadingRu,
    metrics,
  });

  console.log("Done. Singleton written to Sanity.");
  console.log(
    "Verify at https://bbborders.sanity.studio/structure/programsAndImpactPage\n"
  );
}

main().catch((err) => {
  console.error("\nMigration crashed:", err);
  process.exit(1);
});
