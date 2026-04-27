/**
 * Phase 2 migration: seeds the homepage Sanity content from the values
 * currently hardcoded in the React components.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-homepage.mts
 *
 * Idempotent — safe to re-run. Uses fixed _ids:
 *   - homepageHero        (singleton)
 *   - homepageMission     (singleton)
 *   - impactStat.1 .. .4  (four stat docs)
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN env var.\n");
  console.error("Create one at https://sanity.io/manage → BBB New Site → API → Tokens (Editor permissions)");
  console.error("Then run:\n");
  console.error("  SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-homepage.mts\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function seedHero() {
  console.log("→ homepageHero");
  await client.createOrReplace({
    _id: "homepageHero",
    _type: "homepageHero",
    heading: "Hope That Builds",
    headingRu: "Надежда, Которая Строит",
    subheading:
      "So that the hopeless can find hope -- and the hopeful can multiply it.",
    subheadingRu:
      "Чтобы потерявшие надежду могли её обрести — а обретшие надежду могли её приумножить.",
    primaryCtaLabel: "Start Learning (Free)",
    primaryCtaLabelRu: "Начать обучение (бесплатно)",
    primaryCtaUrl: "#programs-section",
    secondaryCtaLabel: "Support a Future Entrepreneur",
    secondaryCtaLabelRu: "Поддержать будущего предпринимателя",
  });
}

async function seedMission() {
  console.log("→ homepageMission");
  await client.createOrReplace({
    _id: "homepageMission",
    _type: "homepageMission",
    heading: "Our Mission",
    headingRu: "Наша миссия",
    missionStatement:
      "Businesses Beyond Borders exists to bring hope to the hopeless -- equipping diligent people to build dignified, sustainable lives through financial literacy, entrepreneurship, and opportunity.",
    missionStatementRu:
      "Businesses Beyond Borders существует, чтобы принести надежду тем, кто её потерял — вооружая трудолюбивых людей знаниями и возможностями для достойной и устойчивой жизни через финансовую грамотность, предпринимательство и реальные шансы.",
    vision:
      "Our vision: a world where people see hope right where they are, and build it for someone else.",
    visionRu:
      "Наше видение: мир, в котором люди видят надежду прямо там, где они есть, и строят её для кого-то другого.",
    valueCards: [
      {
        _key: "card-1",
        _type: "valueCard",
        title: "Poverty isn't laziness",
        titleRu: "Бедность — это не лень",
        description: "It's a lack of access to knowledge, tools, and opportunity.",
        descriptionRu: "Это нехватка доступа к знаниям, инструментам и возможностям.",
      },
      {
        _key: "card-2",
        _type: "valueCard",
        title: "Entrepreneurship is dignity",
        titleRu: "Предпринимательство — это достоинство",
        description:
          "Building something of your own transforms families and communities.",
        descriptionRu:
          "Создание своего дела преображает семьи и целые сообщества.",
      },
      {
        _key: "card-3",
        _type: "valueCard",
        title: "You can help from anywhere",
        titleRu: "Вы можете помочь отсюда",
        description: "Your time, skills, or support can change someone's trajectory.",
        descriptionRu: "Ваши знания, время и поддержка способны изменить чью-то судьбу.",
      },
    ],
    ctaLabel: "Read Our Story",
    ctaLabelRu: "Наша история",
    ctaUrl: "/about",
  });
}

async function seedStats() {
  const stats = [
    {
      _id: "impactStat.entrepreneurs",
      value: 150,
      suffix: "+",
      label: "Entrepreneurs Activated",
      labelRu: "Предпринимателей обучено",
      order: 10,
    },
    {
      _id: "impactStat.businesses",
      value: 50,
      suffix: "+",
      label: "Businesses Equipped",
      labelRu: "Бизнесов запущено",
      order: 20,
    },
    {
      _id: "impactStat.success-rate",
      value: 100,
      suffix: "%",
      label: "Program Success Rate",
      labelRu: "Успешность программы",
      order: 30,
    },
    {
      _id: "impactStat.communities",
      value: 6,
      suffix: "+",
      label: "Communities Empowered",
      labelRu: "Сообществ охвачено",
      order: 40,
    },
  ];
  for (const s of stats) {
    console.log(`→ impactStat ${s.label} (${s.value}${s.suffix})`);
    await client.createOrReplace({
      ...s,
      _type: "impactStat",
      active: true,
    });
  }
}

async function main() {
  console.log(`\n🚀 Seeding homepage content (project ${projectId}, dataset ${dataset})\n`);
  await seedHero();
  await seedMission();
  await seedStats();
  console.log("\n✅ Done. Visit https://bbborders.sanity.studio/ to verify.\n");
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
