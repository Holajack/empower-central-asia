/**
 * Seed 5 volunteerOpportunity documents from the existing hard-coded page data
 * into Sanity. Idempotent — each document uses a deterministic _id so running
 * this multiple times is safe.
 *
 *   SANITY_WRITE_TOKEN=<editor-token> npm run migrate:volunteer
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\n❌  Missing SANITY_WRITE_TOKEN.\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Seed data — values harvested from the 5 volunteer-opportunity pages
// ---------------------------------------------------------------------------
const opportunities = [
  {
    slug: "administrative-support",
    title: "Administrative Support Volunteer",
    titleRu: "Волонтёр административной поддержки",
    tagline: "Be the backbone of our operations.",
    taglineRu: "Станьте опорой наших операций.",
    summary:
      "Support essential operations as an Administrative Support Volunteer with Businesses Beyond Borders. Help with communications, events, and program coordination. Flexible remote work from anywhere.",
    summaryRu:
      "Станьте волонтёром административной поддержки в Businesses Beyond Borders. Помогайте с коммуникациями, мероприятиями и координацией программ. Гибкая удалённая работа из любой точки мира.",
    commitment: "3–5 hours / week",
    commitmentRu: "3–5 ч. в неделю",
    requirements: [
      "Strong written communication skills",
      "Attention to detail and accuracy",
      "Time management and organization",
      "Basic computer and internet skills",
    ],
    requirementsRu: [
      "Сильные навыки письменной коммуникации",
      "Внимательность к деталям и точность",
      "Управление временем и организованность",
      "Базовые навыки работы с компьютером и интернетом",
    ],
    applyUrl: "/volunteer-application",
    icon: "Network",
    order: 10,
  },
  {
    slug: "advocacy-outreach",
    title: "Advocacy & Outreach Volunteer",
    titleRu: "Волонтёр по адвокации и продвижению",
    tagline: "Amplify our mission across Central Asia.",
    taglineRu: "Усильте нашу миссию по всей Центральной Азии.",
    summary:
      "Become an Advocacy & Outreach volunteer with Businesses Beyond Borders. Help amplify our mission to empower entrepreneurs in Central Asia through communications and advocacy.",
    summaryRu:
      "Станьте волонтёром по адвокации и охвату в Businesses Beyond Borders. Помогите усилить нашу миссию по поддержке предпринимателей Центральной Азии через коммуникации и адвокацию.",
    commitment: "Flexible",
    commitmentRu: "Гибко",
    requirements: [
      "Passion for international development",
      "Strong communication skills",
      "Strategic thinking",
      "Community building experience",
    ],
    requirementsRu: [
      "Интерес к международному развитию",
      "Сильные коммуникативные навыки",
      "Стратегическое мышление",
      "Опыт построения сообщества",
    ],
    applyUrl: "/volunteer-application",
    icon: "Megaphone",
    order: 20,
  },
  {
    slug: "business-training",
    title: "Business Training Volunteer",
    titleRu: "Волонтёр бизнес-обучения",
    tagline:
      "Support our proven Financial Literacy and Business Creation programs.",
    taglineRu:
      "Поддержите наши проверенные программы финансовой грамотности и создания бизнеса.",
    summary:
      "Support our proven Financial Literacy and Business Creation programs as a Business Training Volunteer. Help entrepreneurs in Central Asia develop essential business skills. Flexible remote scheduling.",
    summaryRu:
      "Поддержите наши проверенные программы финансовой грамотности и создания бизнеса как волонтёр бизнес-обучения. Помогайте предпринимателям Центральной Азии развивать ключевые навыки. Гибкий удалённый график.",
    commitment: "Flexible remote scheduling",
    commitmentRu: "Гибкий удалённый график",
    requirements: [
      "Business or finance background",
      "Teaching or coaching experience",
      "Patience and cross-cultural sensitivity",
      "Reliable internet connection",
    ],
    requirementsRu: [
      "Опыт в бизнесе или финансах",
      "Опыт преподавания или коучинга",
      "Терпение и межкультурная чуткость",
      "Стабильное интернет-соединение",
    ],
    applyUrl: "/volunteer-application",
    icon: "BookOpen",
    order: 30,
  },
  {
    slug: "community-organizer",
    title: "Community Organizer Volunteer",
    titleRu: "Волонтёр-организатор сообщества",
    tagline:
      "Build our volunteer-driven community collaboration network from the ground up.",
    taglineRu: "Выстраивайте нашу сеть взаимодействия сообщества с нуля.",
    summary:
      "Join our founding team as a Community Organizer with Businesses Beyond Borders. Build volunteer-driven community collaboration networks connecting entrepreneurs. 2 hours/week commitment. Make global impact from anywhere.",
    summaryRu:
      "Вступайте в команду-основателей как организатор сообщества в Businesses Beyond Borders. Создавайте сети взаимодействия для предпринимателей. 2 часа в неделю. Глобальное влияние из любой точки мира.",
    commitment: "2 hours / week",
    commitmentRu: "2 ч. в неделю",
    requirements: [
      "Community organizing or coordination experience",
      "Strong interpersonal and networking skills",
      "Self-motivated and proactive",
      "Reliable internet connection",
    ],
    requirementsRu: [
      "Опыт организации сообществ или координации",
      "Сильные межличностные навыки и нетворкинг",
      "Самомотивация и инициативность",
      "Стабильное интернет-соединение",
    ],
    applyUrl: "/volunteer-application",
    icon: "Users",
    order: 40,
  },
  {
    slug: "leadership-mentor",
    title: "Leadership Development Mentor",
    titleRu: "Наставник по развитию лидерства",
    tagline: "Guide emerging leaders through our proven 12-month program.",
    taglineRu:
      "Ведите начинающих лидеров через нашу проверенную 12-месячную программу.",
    summary:
      "Become a Leadership Development Mentor with Businesses Beyond Borders. Guide emerging leaders through our proven 12-month program using the 70-20-10 model. 4-6 hours monthly commitment. Make global impact from anywhere.",
    summaryRu:
      "Станьте наставником по развитию лидерства в Businesses Beyond Borders. Ведите начинающих лидеров через проверенную 12-месячную программу по модели 70-20-10. 4–6 часов в месяц. Глобальное влияние из любой точки мира.",
    commitment: "4–6 hours / month",
    commitmentRu: "4–6 ч. в месяц",
    requirements: [
      "5+ years of leadership experience",
      "Coaching or mentorship background",
      "Cross-cultural communication skills",
      "4-6 hours monthly availability",
    ],
    requirementsRu: [
      "5+ лет опыта в лидерстве",
      "Опыт коучинга или наставничества",
      "Навыки межкультурной коммуникации",
      "4–6 часов в месяц",
    ],
    applyUrl: "/volunteer-application",
    icon: "Target",
    order: 50,
  },
];

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------
async function main() {
  console.log(`\n🚀  Seeding ${opportunities.length} volunteer opportunities\n`);
  let succeeded = 0;
  let failed = 0;

  for (const opp of opportunities) {
    const _id = `volunteerOpportunity.${opp.slug}`;
    console.log(`→  ${opp.slug}`);
    try {
      await client.createOrReplace({
        _id,
        _type: "volunteerOpportunity",
        title: opp.title,
        titleRu: opp.titleRu,
        slug: { _type: "slug", current: opp.slug },
        tagline: opp.tagline,
        taglineRu: opp.taglineRu,
        summary: opp.summary,
        summaryRu: opp.summaryRu,
        commitment: opp.commitment,
        commitmentRu: opp.commitmentRu,
        requirements: opp.requirements,
        requirementsRu: opp.requirementsRu,
        applyUrl: opp.applyUrl,
        icon: opp.icon,
        active: true,
        order: opp.order,
      });
      console.log(`   ✅  ${opp.slug}`);
      succeeded++;
    } catch (err) {
      console.error(`   ❌  ${opp.slug} — ${(err as Error).message}`);
      failed++;
    }
  }

  console.log(`\n${succeeded} succeeded, ${failed} failed\n`);
  if (failed > 0) process.exit(1);
  console.log(
    "Visit https://bbborders.sanity.studio/structure/volunteerOpportunity to verify.\n"
  );
}

main().catch((err) => {
  console.error("\n❌  Migration crashed:", err);
  process.exit(1);
});
