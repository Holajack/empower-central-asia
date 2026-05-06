/**
 * Phase 8 follow-up — patches the 3 existing course docs (financial-literacy,
 * business-creation, leadership-development) with the landing-page editorial
 * fields so the public course landing pages can read everything from Sanity.
 *
 * Idempotent: this script PATCHes (not createOrReplace) so it preserves all
 * pre-existing fields written by `migrate-courses.mts`. Running it twice is
 * a no-op.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:course-landings
 *
 * Captures the current hardcoded copy from each .tsx page file:
 *   - heroBadge, heroDescription
 *   - whatYoullLearnHeading + whatYoullLearn array
 *   - prerequisitesHeading + prerequisites
 *   - instructorHeading + instructorName + instructorRole + instructorBio
 *   - outcomesHeading + outcomes array
 *   - relatedProgramsHeading + relatedPrograms refs
 *   - bottomCtaHeading + bottomCtaSubheading + bottomCtaPrimary/Secondary
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN.\n");
  console.error("Generate at sanity.io/manage → API → Tokens (Editor permissions).");
  console.error("Then run:\n  SANITY_WRITE_TOKEN=<token> npm run migrate:course-landings\n");
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

interface LandingItem {
  _key: string;
  _type: "whatYoullLearnItem" | "outcomeItem";
  text?: string;
  textRu?: string;
  title?: string;
  titleRu?: string;
  icon?: string;
}

interface CourseLanding {
  slug: string;
  // Hero
  heroBadge: string;
  heroBadgeRu: string;
  heroDescription: string;
  heroDescriptionRu: string;
  // What you'll learn
  whatYoullLearnHeading: string;
  whatYoullLearnHeadingRu: string;
  whatYoullLearn: LandingItem[];
  // Prerequisites
  prerequisitesHeading: string;
  prerequisitesHeadingRu: string;
  prerequisites: string;
  prerequisitesRu: string;
  // Instructor
  instructorHeading: string;
  instructorHeadingRu: string;
  instructorName: string;
  instructorNameRu: string;
  instructorRole: string;
  instructorRoleRu: string;
  instructorBio: string;
  instructorBioRu: string;
  // Outcomes
  outcomesHeading: string;
  outcomesHeadingRu: string;
  outcomes: LandingItem[];
  // Related programs
  relatedProgramsHeading: string;
  relatedProgramsHeadingRu: string;
  relatedProgramSlugs: string[]; // resolved → references
  // Bottom CTA
  bottomCtaHeading: string;
  bottomCtaHeadingRu: string;
  bottomCtaSubheading: string;
  bottomCtaSubheadingRu: string;
  bottomCtaPrimaryLabel: string;
  bottomCtaPrimaryLabelRu: string;
  bottomCtaPrimaryUrl: string;
  bottomCtaSecondaryLabel: string;
  bottomCtaSecondaryLabelRu: string;
  bottomCtaSecondaryUrl: string;
}

const k = (prefix: string, n: number) => `${prefix}-${n}`;

// ─── Financial Literacy ─────────────────────────────────────────────────────

const FINANCIAL_LITERACY: CourseLanding = {
  slug: "financial-literacy",
  heroBadge: "Free Online Course",
  heroBadgeRu: "Бесплатный онлайн-курс",
  heroDescription:
    "Practical financial education that actually works. Learn budgeting, destroy debt, build savings, and create a plan for lasting financial freedom.",
  heroDescriptionRu:
    "Практическое финансовое образование, которое действительно работает. Научитесь составлять бюджет, избавляться от долгов, создавать накопления и строить планы для достижения финансовой свободы.",
  whatYoullLearnHeading: "What You'll Learn",
  whatYoullLearnHeadingRu: "Чему вы научитесь",
  whatYoullLearn: [
    {
      _key: k("fl-l", 1),
      _type: "whatYoullLearnItem",
      text: "Build a budget where every dollar has a job",
      textRu: "Составить бюджет, где у каждого доллара есть задача",
      icon: "Target",
    },
    {
      _key: k("fl-l", 2),
      _type: "whatYoullLearnItem",
      text: "Eliminate debt without sacrificing your sanity",
      textRu: "Избавиться от долгов без жертв",
      icon: "Shield",
    },
    {
      _key: k("fl-l", 3),
      _type: "whatYoullLearnItem",
      text: "Build a 3–6 month emergency fund",
      textRu: "Создать резервный фонд на 3–6 месяцев",
      icon: "Zap",
    },
    {
      _key: k("fl-l", 4),
      _type: "whatYoullLearnItem",
      text: "Start saving and investing for the long term",
      textRu: "Начать копить и инвестировать на долгий срок",
      icon: "TrendingUp",
    },
    {
      _key: k("fl-l", 5),
      _type: "whatYoullLearnItem",
      text: "Build a financial life that lasts",
      textRu: "Построить устойчивую финансовую жизнь",
      icon: "Trophy",
    },
  ],
  prerequisitesHeading: "Who This Course Is For",
  prerequisitesHeadingRu: "Для кого этот курс",
  prerequisites:
    "Anyone ready to take an honest look at their finances. No previous experience required — all you need is willingness to do the work and apply what you learn.",
  prerequisitesRu:
    "Для всех, кто готов честно взглянуть на свои финансы. Опыт не требуется — нужно только желание работать и применять полученные знания.",
  instructorHeading: "Your Instructor",
  instructorHeadingRu: "Ваш инструктор",
  instructorName: "Jacken Holland",
  instructorNameRu: "Джакен Холланд",
  instructorRole: "Founder, Businesses Beyond Borders",
  instructorRoleRu: "Основатель Businesses Beyond Borders",
  instructorBio:
    "Jacken founded Businesses Beyond Borders to give people the practical financial tools he wished he'd had earlier. Each lesson is grounded in lived experience and refined with the community we serve.",
  instructorBioRu:
    "Джакен основал Businesses Beyond Borders, чтобы передать людям практические финансовые инструменты, которых ему самому когда-то не хватало. Каждый урок основан на личном опыте и отшлифован вместе с сообществом.",
  outcomesHeading: "What You'll Build",
  outcomesHeadingRu: "Что вы получите",
  outcomes: [
    {
      _key: k("fl-o", 1),
      _type: "outcomeItem",
      title: "A Working Budget",
      titleRu: "Рабочий бюджет",
      text: "A zero-based monthly budget that gives every dollar a purpose.",
      textRu: "Бюджет с нулевой базой, где у каждого доллара есть цель.",
      icon: "Target",
    },
    {
      _key: k("fl-o", 2),
      _type: "outcomeItem",
      title: "A Debt-Free Plan",
      titleRu: "План выхода из долгов",
      text: "A step-by-step strategy to eliminate consumer debt for good.",
      textRu: "Пошаговая стратегия избавления от потребительских долгов.",
      icon: "Shield",
    },
    {
      _key: k("fl-o", 3),
      _type: "outcomeItem",
      title: "An Emergency Fund",
      titleRu: "Резервный фонд",
      text: "A funded 3–6 month buffer so one crisis doesn't undo your progress.",
      textRu: "Резерв на 3–6 месяцев, чтобы один кризис не разрушил прогресс.",
      icon: "Zap",
    },
    {
      _key: k("fl-o", 4),
      _type: "outcomeItem",
      title: "A Savings Habit",
      titleRu: "Привычка копить",
      text: "Automated savings and a long-term plan you can actually stick to.",
      textRu: "Автоматические накопления и долгосрочный план, который реально работает.",
      icon: "TrendingUp",
    },
  ],
  relatedProgramsHeading: "Related Programs",
  relatedProgramsHeadingRu: "Связанные программы",
  relatedProgramSlugs: ["financial-literacy"],
  bottomCtaHeading: "Ready to Take Control of Your Finances?",
  bottomCtaHeadingRu: "Готовы взять финансы под контроль?",
  bottomCtaSubheading:
    "No cost, no login, no catch. Just practical financial education you can start right now.",
  bottomCtaSubheadingRu:
    "Никаких затрат, никакой регистрации, никаких скрытых условий. Просто практическое финансовое образование, которое можно начать прямо сейчас.",
  bottomCtaPrimaryLabel: "Start Week 1 Now",
  bottomCtaPrimaryLabelRu: "Начать неделю 1",
  bottomCtaPrimaryUrl: "",
  bottomCtaSecondaryLabel: "Become a Facilitator",
  bottomCtaSecondaryLabelRu: "Стать куратором",
  bottomCtaSecondaryUrl: "/get-involved",
};

// ─── Business Creation ──────────────────────────────────────────────────────

const BUSINESS_CREATION: CourseLanding = {
  slug: "business-creation",
  heroBadge: "Free Online Course",
  heroBadgeRu: "Бесплатный онлайн-курс",
  heroDescription:
    "Turn financial literacy into a real business. Learn Lean Startup methodology, build a business model, validate your assumptions, and create a launch-ready business plan.",
  heroDescriptionRu:
    "Превратите финансовую грамотность в реальный бизнес. Изучите методологию Lean Startup, постройте бизнес-модель, проверьте гипотезы и создайте готовый к запуску бизнес-план.",
  whatYoullLearnHeading: "What You'll Learn",
  whatYoullLearnHeadingRu: "Чему вы научитесь",
  whatYoullLearn: [
    {
      _key: k("bc-l", 1),
      _type: "whatYoullLearnItem",
      text: "Think like an entrepreneur",
      textRu: "Мыслить как предприниматель",
      icon: "Lightbulb",
    },
    {
      _key: k("bc-l", 2),
      _type: "whatYoullLearnItem",
      text: "Design a Business Model Canvas",
      textRu: "Спроектировать бизнес-модель Canvas",
      icon: "Target",
    },
    {
      _key: k("bc-l", 3),
      _type: "whatYoullLearnItem",
      text: "Validate assumptions with real customers",
      textRu: "Проверить гипотезы на реальных клиентах",
      icon: "Shield",
    },
    {
      _key: k("bc-l", 4),
      _type: "whatYoullLearnItem",
      text: "Build a launch-ready business plan",
      textRu: "Построить готовый к запуску бизнес-план",
      icon: "Rocket",
    },
  ],
  prerequisitesHeading: "Prerequisites",
  prerequisitesHeadingRu: "Предварительные условия",
  prerequisites:
    "Complete the 6-Week Financial Literacy Course first. You'll need a working budget and a debt-free mindset before launching a business.",
  prerequisitesRu:
    "Сначала пройдите 6-недельный курс финансовой грамотности. Перед запуском бизнеса нужен рабочий бюджет и установка на жизнь без долгов.",
  instructorHeading: "Your Instructor",
  instructorHeadingRu: "Ваш инструктор",
  instructorName: "Jacken Holland",
  instructorNameRu: "Джакен Холланд",
  instructorRole: "Founder, Businesses Beyond Borders",
  instructorRoleRu: "Основатель Businesses Beyond Borders",
  instructorBio:
    "Jacken has built and advised small businesses across the US and Central Asia. This course distills the hard-won lessons of starting from scratch into 12 weeks of practical work.",
  instructorBioRu:
    "Джакен запускал малые бизнесы и консультировал предпринимателей в США и Центральной Азии. Этот курс — выжимка из практики, доступная за 12 недель.",
  outcomesHeading: "What You'll Build",
  outcomesHeadingRu: "Что вы получите",
  outcomes: [
    {
      _key: k("bc-o", 1),
      _type: "outcomeItem",
      title: "Business Model Canvas",
      titleRu: "Бизнес-модель Canvas",
      text: "A complete 9-block business model validated by real customer interviews.",
      textRu: "Полная 9-блочная бизнес-модель, проверенная реальными клиентами.",
      icon: "Target",
    },
    {
      _key: k("bc-o", 2),
      _type: "outcomeItem",
      title: "Value Proposition",
      titleRu: "Ценностное предложение",
      text: "Deep understanding of customer needs and how your solution addresses them.",
      textRu: "Глубокое понимание потребностей клиентов и того, как вы их решаете.",
      icon: "Users",
    },
    {
      _key: k("bc-o", 3),
      _type: "outcomeItem",
      title: "Financial Dashboard",
      titleRu: "Финансовая панель",
      text: "Break-even analysis, CAC, LTV, and 12-month projections for your business.",
      textRu: "Точка безубыточности, CAC, LTV и 12-месячные прогнозы.",
      icon: "TrendingUp",
    },
    {
      _key: k("bc-o", 4),
      _type: "outcomeItem",
      title: "Business Plan",
      titleRu: "Бизнес-план",
      text: "A launch-ready one-page business plan with a 90-day action calendar.",
      textRu: "Готовый к запуску одностраничный бизнес-план с 90-дневным календарём.",
      icon: "Rocket",
    },
  ],
  relatedProgramsHeading: "Related Programs",
  relatedProgramsHeadingRu: "Связанные программы",
  relatedProgramSlugs: ["business-creation"],
  bottomCtaHeading: "Ready to Build Your Business?",
  bottomCtaHeadingRu: "Готовы построить свой бизнес?",
  bottomCtaSubheading:
    "12 weeks of hands-on learning. From idea to a launch-ready business plan.",
  bottomCtaSubheadingRu:
    "12 недель практического обучения. От идеи до готового бизнес-плана.",
  bottomCtaPrimaryLabel: "Start Week 1 Now",
  bottomCtaPrimaryLabelRu: "Начать неделю 1",
  bottomCtaPrimaryUrl: "",
  bottomCtaSecondaryLabel: "Become a Facilitator",
  bottomCtaSecondaryLabelRu: "Стать фасилитатором",
  bottomCtaSecondaryUrl: "/get-involved",
};

// ─── Leadership Development ─────────────────────────────────────────────────

const LEADERSHIP_DEVELOPMENT: CourseLanding = {
  slug: "leadership-development",
  heroBadge: "Free Online Course",
  heroBadgeRu: "Бесплатный онлайн-курс",
  heroDescription:
    "Develop leadership skills from self-management to organizational leadership. Learn emotional intelligence, team building, strategic thinking, and change management.",
  heroDescriptionRu:
    "Развивайте навыки лидерства от самоуправления до руководства организациями. Изучите эмоциональный интеллект, построение команд, стратегическое мышление и управление изменениями.",
  whatYoullLearnHeading: "What You'll Learn",
  whatYoullLearnHeadingRu: "Чему вы научитесь",
  whatYoullLearn: [
    {
      _key: k("ld-l", 1),
      _type: "whatYoullLearnItem",
      text: "Lead yourself with emotional intelligence",
      textRu: "Управлять собой с эмоциональным интеллектом",
      icon: "Compass",
    },
    {
      _key: k("ld-l", 2),
      _type: "whatYoullLearnItem",
      text: "Communicate, coach, and influence others",
      textRu: "Коммуницировать, коучить и влиять на других",
      icon: "HeartHandshake",
    },
    {
      _key: k("ld-l", 3),
      _type: "whatYoullLearnItem",
      text: "Build and lead high-performance teams",
      textRu: "Создавать и вести высокоэффективные команды",
      icon: "Users",
    },
    {
      _key: k("ld-l", 4),
      _type: "whatYoullLearnItem",
      text: "Lead organizations through change",
      textRu: "Вести организации через изменения",
      icon: "Crown",
    },
  ],
  prerequisitesHeading: "Prerequisites",
  prerequisitesHeadingRu: "Предварительные условия",
  prerequisites:
    "Complete the 12-Week Business Creation Course first. Leadership becomes meaningful only when you have a venture or team to lead.",
  prerequisitesRu:
    "Сначала пройдите 12-недельный курс создания бизнеса. Лидерство имеет смысл, когда есть команда или дело, которым нужно руководить.",
  instructorHeading: "Your Instructor",
  instructorHeadingRu: "Ваш инструктор",
  instructorName: "Jacken Holland",
  instructorNameRu: "Джакен Холланд",
  instructorRole: "Founder, Businesses Beyond Borders",
  instructorRoleRu: "Основатель Businesses Beyond Borders",
  instructorBio:
    "Drawing on years of leadership across nonprofits and startups, Jacken built this course to compress the slow-and-painful path of leadership growth into a deliberate 12-week practice.",
  instructorBioRu:
    "Опираясь на многолетний опыт руководства в некоммерческом и предпринимательском секторе, Джакен создал курс, который сжимает медленный путь роста лидера в осознанную 12-недельную практику.",
  outcomesHeading: "What You'll Develop",
  outcomesHeadingRu: "Что вы получите",
  outcomes: [
    {
      _key: k("ld-o", 1),
      _type: "outcomeItem",
      title: "Self-Leadership",
      titleRu: "Самоуправление",
      text: "Emotional intelligence, values-based decision making, and personal accountability.",
      textRu: "Эмоциональный интеллект, принятие решений на основе ценностей и личная ответственность.",
      icon: "Compass",
    },
    {
      _key: k("ld-o", 2),
      _type: "outcomeItem",
      title: "People Skills",
      titleRu: "Навыки общения",
      text: "Effective communication, influence, coaching, and mentorship capabilities.",
      textRu: "Эффективная коммуникация, влияние, коучинг и менторство.",
      icon: "HeartHandshake",
    },
    {
      _key: k("ld-o", 3),
      _type: "outcomeItem",
      title: "Team Management",
      titleRu: "Управление командами",
      text: "Building high-performance teams, conflict resolution, and delegation mastery.",
      textRu: "Построение высокоэффективных команд, разрешение конфликтов и делегирование.",
      icon: "Users",
    },
    {
      _key: k("ld-o", 4),
      _type: "outcomeItem",
      title: "Strategic Leadership",
      titleRu: "Стратегическое лидерство",
      text: "Strategic thinking, change management, and creating lasting organizational impact.",
      textRu: "Стратегическое мышление, управление изменениями и создание наследия.",
      icon: "Crown",
    },
  ],
  relatedProgramsHeading: "Related Programs",
  relatedProgramsHeadingRu: "Связанные программы",
  relatedProgramSlugs: ["leadership-development"],
  bottomCtaHeading: "Ready to Lead?",
  bottomCtaHeadingRu: "Готовы стать лидером?",
  bottomCtaSubheading:
    "12 weeks of hands-on leadership development. From self-leadership to organizational impact.",
  bottomCtaSubheadingRu:
    "12 недель практического обучения лидерству. От самоуправления до руководства организациями.",
  bottomCtaPrimaryLabel: "Start Week 1 Now",
  bottomCtaPrimaryLabelRu: "Начать неделю 1",
  bottomCtaPrimaryUrl: "",
  bottomCtaSecondaryLabel: "Become a Facilitator",
  bottomCtaSecondaryLabelRu: "Стать фасилитатором",
  bottomCtaSecondaryUrl: "/get-involved",
};

const ALL: CourseLanding[] = [
  FINANCIAL_LITERACY,
  BUSINESS_CREATION,
  LEADERSHIP_DEVELOPMENT,
];

// ─── Patch helper ────────────────────────────────────────────────────────────

async function resolveProgramRefs(slugs: string[]): Promise<{ _key: string; _type: "reference"; _ref: string }[]> {
  if (!slugs || slugs.length === 0) return [];
  const refs: { _key: string; _type: "reference"; _ref: string }[] = [];
  for (let i = 0; i < slugs.length; i++) {
    const slug = slugs[i];
    const found = await client.fetch<{ _id: string } | null>(
      `*[_type == "programPage" && slug.current == $slug][0]{_id}`,
      { slug },
    );
    if (found?._id) {
      refs.push({
        _key: `rp-${slug}`,
        _type: "reference",
        _ref: found._id,
      });
    } else {
      console.log(`     ⚠️  programPage with slug "${slug}" not found — skipping ref`);
    }
  }
  return refs;
}

async function patchCourse(c: CourseLanding): Promise<{ ok: boolean; err?: string }> {
  const _id = `course.${c.slug}`;

  const existing = await client.fetch<{ _id: string } | null>(
    `*[_id == $id][0]{_id}`,
    { id: _id },
  );

  if (!existing) {
    return {
      ok: false,
      err: `course.${c.slug} not found — run migrate:courses first to seed the base doc.`,
    };
  }

  const relatedPrograms = await resolveProgramRefs(c.relatedProgramSlugs);

  await client
    .patch(_id)
    .set({
      heroBadge: c.heroBadge,
      heroBadgeRu: c.heroBadgeRu,
      heroDescription: c.heroDescription,
      heroDescriptionRu: c.heroDescriptionRu,
      whatYoullLearnHeading: c.whatYoullLearnHeading,
      whatYoullLearnHeadingRu: c.whatYoullLearnHeadingRu,
      whatYoullLearn: c.whatYoullLearn,
      prerequisitesHeading: c.prerequisitesHeading,
      prerequisitesHeadingRu: c.prerequisitesHeadingRu,
      prerequisites: c.prerequisites,
      prerequisitesRu: c.prerequisitesRu,
      instructorHeading: c.instructorHeading,
      instructorHeadingRu: c.instructorHeadingRu,
      instructorName: c.instructorName,
      instructorNameRu: c.instructorNameRu,
      instructorRole: c.instructorRole,
      instructorRoleRu: c.instructorRoleRu,
      instructorBio: c.instructorBio,
      instructorBioRu: c.instructorBioRu,
      outcomesHeading: c.outcomesHeading,
      outcomesHeadingRu: c.outcomesHeadingRu,
      outcomes: c.outcomes,
      relatedProgramsHeading: c.relatedProgramsHeading,
      relatedProgramsHeadingRu: c.relatedProgramsHeadingRu,
      relatedPrograms,
      bottomCtaHeading: c.bottomCtaHeading,
      bottomCtaHeadingRu: c.bottomCtaHeadingRu,
      bottomCtaSubheading: c.bottomCtaSubheading,
      bottomCtaSubheadingRu: c.bottomCtaSubheadingRu,
      bottomCtaPrimaryLabel: c.bottomCtaPrimaryLabel,
      bottomCtaPrimaryLabelRu: c.bottomCtaPrimaryLabelRu,
      bottomCtaPrimaryUrl: c.bottomCtaPrimaryUrl,
      bottomCtaSecondaryLabel: c.bottomCtaSecondaryLabel,
      bottomCtaSecondaryLabelRu: c.bottomCtaSecondaryLabelRu,
      bottomCtaSecondaryUrl: c.bottomCtaSecondaryUrl,
    })
    .commit();

  return { ok: true };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(
    `\n🚀 Patching landing-page fields on ${ALL.length} course docs\n`,
  );
  console.log(`   project=${projectId} dataset=${dataset}\n`);

  let successes = 0;
  let failures = 0;

  for (const c of ALL) {
    process.stdout.write(`→ course.${c.slug} ... `);
    try {
      const result = await patchCourse(c);
      if (result.ok) {
        successes++;
        console.log(
          `✅ patched (learn=${c.whatYoullLearn.length}, outcomes=${c.outcomes.length}, related=${c.relatedProgramSlugs.length})`,
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
    "\n✅ Done. Visit https://bbborders.sanity.studio/structure/course to verify.\n",
  );

  if (failures > 0) process.exit(1);
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
