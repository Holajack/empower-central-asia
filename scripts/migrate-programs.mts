/**
 * Phase 3 migration: seeds the 4 programPage docs in Sanity.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-programs.mts
 *
 * Idempotent — re-runs update existing docs (matched by _id="program.<slug>").
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN env var.\n");
  console.error("Generate at sanity.io/manage → API → Tokens (Editor permissions).");
  console.error("Then run:\n  SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-programs.mts\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

const PROGRAMS = [
  {
    slug: "financial-literacy",
    title: "Financial Literacy Program",
    titleRu: "Программа финансовой грамотности",
    tagline: "Take control of your money — and your future.",
    taglineRu: "Возьмите под контроль свои деньги — и своё будущее.",
    heroDescription:
      "Free, practical financial education with our Learn-Practice-Apply method. No jargon, no fees, no catch. Just the tools and knowledge you need to build a stronger financial foundation.",
    heroDescriptionRu:
      "Бесплатное, практическое финансовое образование. Без жаргона, без платы, без уловок. Только инструменты и знания, необходимые для создания прочного финансового фундамента.",
    duration: "6 weeks (self-paced) / 10 weeks (cohort)",
    durationRu: "6 недель (самостоятельно) / 10 недель (группа)",
    primaryCtaLabel: "Start Course Free",
    primaryCtaLabelRu: "Начать курс бесплатно",
    primaryCtaUrl: "/course/financial-literacy",
    secondaryCtaLabel: "Learn More",
    secondaryCtaLabelRu: "Подробнее",
    secondaryCtaUrl: "#program-details",
    seo: {
      metaTitle: "Financial Literacy Program | BBB",
      metaDescription:
        "Free financial literacy program covering budgeting, debt elimination, saving, and more. Self-paced online course and cohort programs available.",
    },
  },
  {
    slug: "business-creation",
    title: "Business Creation Program",
    titleRu: "Программа создания бизнеса",
    tagline: "Turn your idea into a working business.",
    taglineRu: "Превратите свою идею в работающий бизнес.",
    heroDescription:
      "A step-by-step path from idea to revenue: validate your concept, build a lean plan, launch, and grow with weekly accountability and real mentorship.",
    heroDescriptionRu:
      "Пошаговый путь от идеи до дохода: проверьте концепцию, составьте план, запустите бизнес и развивайтесь с еженедельной поддержкой и наставничеством.",
    duration: "12 weeks",
    durationRu: "12 недель",
    primaryCtaLabel: "Start Course Free",
    primaryCtaLabelRu: "Начать курс бесплатно",
    primaryCtaUrl: "/course/business-creation",
    secondaryCtaLabel: "Learn More",
    secondaryCtaLabelRu: "Подробнее",
    secondaryCtaUrl: "#program-details",
    seo: {
      metaTitle: "Business Creation Program | BBB",
      metaDescription:
        "12-week business creation program. Validate, plan, launch, grow. Free for participants in Central Asia and beyond.",
    },
  },
  {
    slug: "leadership-development",
    title: "Leadership Development Program",
    titleRu: "Программа развития лидерства",
    tagline: "Lead yourself, your family, and your community.",
    taglineRu: "Веди себя, свою семью и своё сообщество.",
    heroDescription:
      "Build the character and skills to lead — at home, at work, and in the world. Twelve weeks of practical leadership training rooted in service and integrity.",
    heroDescriptionRu:
      "Развивайте характер и навыки лидера — дома, на работе и в мире. Двенадцать недель практического обучения лидерству на основе служения и честности.",
    duration: "12 weeks",
    durationRu: "12 недель",
    primaryCtaLabel: "Start Course Free",
    primaryCtaLabelRu: "Начать курс бесплатно",
    primaryCtaUrl: "/course/leadership-development",
    secondaryCtaLabel: "Learn More",
    secondaryCtaLabelRu: "Подробнее",
    secondaryCtaUrl: "#program-details",
    seo: {
      metaTitle: "Leadership Development Program | BBB",
      metaDescription:
        "12-week leadership development program for entrepreneurs and changemakers. Practical, character-rooted, free.",
    },
  },
  {
    slug: "community-collaboration",
    title: "Community Collaboration",
    titleRu: "Сообщество и сотрудничество",
    tagline: "When communities lift each other, everyone rises.",
    taglineRu: "Когда сообщества поднимают друг друга, все растут.",
    heroDescription:
      "BBB partners with churches, civic groups, and local leaders to build sustained, dignified development — work that doesn't end when the funding does.",
    heroDescriptionRu:
      "BBB сотрудничает с церквями, общественными группами и местными лидерами, чтобы строить устойчивое и достойное развитие — работу, которая не заканчивается, когда заканчивается финансирование.",
    duration: "Ongoing",
    durationRu: "Постоянно",
    primaryCtaLabel: "Get Involved",
    primaryCtaLabelRu: "Принять участие",
    primaryCtaUrl: "/get-involved",
    secondaryCtaLabel: "Learn More",
    secondaryCtaLabelRu: "Подробнее",
    secondaryCtaUrl: "#program-details",
    seo: {
      metaTitle: "Community Collaboration | BBB",
      metaDescription:
        "BBB partners with churches and civic groups for sustained, community-led development across Central Asia.",
    },
  },
];

async function seedProgram(p: (typeof PROGRAMS)[number]) {
  const _id = `program.${p.slug}`;
  console.log(`→ ${p.slug}`);
  await client.createOrReplace({
    _id,
    _type: "programPage",
    title: p.title,
    titleRu: p.titleRu,
    slug: { _type: "slug", current: p.slug },
    tagline: p.tagline,
    taglineRu: p.taglineRu,
    heroDescription: p.heroDescription,
    heroDescriptionRu: p.heroDescriptionRu,
    duration: p.duration,
    durationRu: p.durationRu,
    primaryCtaLabel: p.primaryCtaLabel,
    primaryCtaLabelRu: p.primaryCtaLabelRu,
    primaryCtaUrl: p.primaryCtaUrl,
    secondaryCtaLabel: p.secondaryCtaLabel,
    secondaryCtaLabelRu: p.secondaryCtaLabelRu,
    secondaryCtaUrl: p.secondaryCtaUrl,
    seo: p.seo,
  });
}

async function main() {
  console.log(`\n🚀 Seeding 4 program pages (project ${projectId}, dataset ${dataset})\n`);
  for (const p of PROGRAMS) {
    try {
      await seedProgram(p);
    } catch (err) {
      console.error(`    ❌ ${p.slug}:`, (err as Error).message);
    }
  }
  console.log("\n✅ Done. Visit https://bbborders.sanity.studio/structure/programPage to verify.\n");
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
