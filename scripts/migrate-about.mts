/**
 * Phase 4 migration: seeds aboutPage singleton + 2 teamMember docs.
 *
 *   SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-about.mts
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN env var.\n");
  process.exit(1);
}

const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

const VALUES = [
  {
    _key: "v1", _type: "valueItem", icon: "Target",
    title: "Empowerment Over Dependency",
    titleRu: "Расширение возможностей, а не зависимость",
    description:
      "We don't give handouts -- we give tools, training, and the confidence to build something lasting.",
    descriptionRu:
      "Мы не раздаём подачки — мы даём инструменты, обучение и уверенность, необходимые для создания чего-то долговечного.",
  },
  {
    _key: "v2", _type: "valueItem", icon: "Globe",
    title: "Local Roots, Global Support",
    titleRu: "Местные корни, глобальная поддержка",
    description:
      "Programs are designed for Central Asian communities with the backing of a worldwide network of volunteers and donors.",
    descriptionRu:
      "Программы разработаны для общин Центральной Азии при поддержке всемирной сети волонтёров и доноров.",
  },
  {
    _key: "v3", _type: "valueItem", icon: "TrendingUp",
    title: "Evidence-Based Methods",
    titleRu: "Методы, основанные на доказательствах",
    description:
      "Every program is built on proven frameworks -- Lean Startup, zero-based budgeting, the 70-20-10 leadership model.",
    descriptionRu:
      "Каждая программа построена на проверенных концепциях: Lean Startup, бюджетирование с нулевой базой, лидерская модель 70-20-10.",
  },
  {
    _key: "v4", _type: "valueItem", icon: "Heart",
    title: "Dignity First",
    titleRu: "Достоинство прежде всего",
    description:
      "We believe entrepreneurship restores dignity. Building something of your own changes how you see yourself and your future.",
    descriptionRu:
      "Мы верим, что предпринимательство возвращает достоинство. Когда вы создаёте что-то своё, это меняет взгляд на себя и своё будущее.",
  },
  {
    _key: "v5", _type: "valueItem", icon: "Users",
    title: "Community Multiplication",
    titleRu: "Умножение через сообщество",
    description:
      "Every graduate is trained to teach others. One entrepreneur becomes ten. One community lifts many.",
    descriptionRu:
      "Каждый выпускник обучен обучать других. Один предприниматель становится десятью. Одно сообщество поднимает многих.",
  },
  {
    _key: "v6", _type: "valueItem", icon: "Lightbulb",
    title: "Transparency & Accountability",
    titleRu: "Прозрачность и подотчётность",
    description:
      "100% of donations fund programs. We report impact openly and hold ourselves to the highest standard.",
    descriptionRu:
      "100% пожертвований идут на финансирование программ. Мы открыто отчитываемся о результатах и придерживаемся самых высоких стандартов.",
  },
];

const TEAM = [
  {
    _id: "teamMember.jacken-holland",
    name: "Jacken Holland",
    role: "Founder & CEO",
    roleRu: "Основатель и CEO",
    bio: "Jacken was born in Haiti and abandoned at birth. He spent three and a half years in an orphanage where survival -- not care -- was the daily reality. Adopted by an American family, he came to the United States knowing nothing of the language, culture, or world outside Haiti. He earned an Integrated Business degree from the University of Central Florida, traveled to nine countries, and saw the same gap everywhere: people with ambition but no access to financial training. At 23, he founded Businesses Beyond Borders and moved to Kyrgyzstan with a backpack to build it from the ground up.",
    bioRu:
      "Джакен родился на Гаити и был брошен при рождении. Три с половиной года он провёл в приюте, где речь шла о выживании, а не о заботе. Усыновлённый американской семьёй, он приехал в США, не зная ни языка, ни культуры, ни мира за пределами Гаити. Он получил степень в области бизнеса в Университете Центральной Флориды, побывал в девяти странах и везде видел одно и то же: люди с амбициями, но без доступа к финансовому образованию. В 23 года он основал Businesses Beyond Borders и переехал в Кыргызстан с рюкзаком, чтобы строить организацию с нуля.",
    initials: "JH",
    order: 10,
  },
  {
    _id: "teamMember.yeva-romanova",
    name: "Yeva Romanova",
    role: "Co-Founder & COO",
    roleRu: "Сооснователь и COO",
    bio: "Born in Kyrgyzstan. Eight years at a DC accounting firm serving nonprofits. Five years building microloan programs on the ground while working remotely across two time zones. Yeva brings the cultural roots, the financial expertise, and the on-the-ground relationships that make BBB's programs actually work.",
    bioRu:
      "Родившись в Кыргызстане, Йева Романова на собственном опыте пережила экономическую нестабильность постсоветской Центральной Азии, прежде чем эмигрировала в США. В каждую программу BBB она привносит непосредственное знание культуры, опыт работы в политических кругах Вашингтона и глубокое понимание проблем, с которыми сталкиваются общины Центральной Азии.",
    initials: "YR",
    order: 20,
  },
];

async function main() {
  console.log(`\n🚀 Seeding About page + team members\n`);

  console.log("→ aboutPage");
  await client.createOrReplace({
    _id: "aboutPage",
    _type: "aboutPage",
    heroTitle: "About Us",
    heroTitleRu: "О нас",
    heroSubtitle:
      "Founded by Jacken Holland — abandoned at birth in Haiti, adopted, and driven to give others the same chance. Meet the team behind Businesses Beyond Borders.",
    heroSubtitleRu:
      "Джакен Холланд, брошенный при рождении на Гаити и усыновлённый американской семьёй, основал BBB, чтобы дать другим шанс.",
    values: VALUES,
    seo: {
      metaTitle: "About Us — Our Story & Mission | Businesses Beyond Borders",
      metaDescription:
        "Founded by Jacken Holland — abandoned at birth in Haiti, adopted, and driven to give others the same chance. Meet the BBB team.",
    },
  });

  for (const m of TEAM) {
    console.log(`→ ${m._id}`);
    await client.createOrReplace({
      ...m,
      _type: "teamMember",
      active: true,
    });
  }

  console.log("\n✅ Done. Visit https://bbborders.sanity.studio/structure/aboutPage and /teamMember to verify.\n");
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
