/**
 * Migrate every section of the About page into the `aboutPage` Sanity
 * singleton, capturing the previously-hardcoded copy from About.tsx.
 *
 * Adds (without removing existing fields):
 *   • Hero        – heroTitle, heroSubtitle (and Russian)
 *   • Founder     – founderBadge, founderHeading, founderRoleLabel, founderBio[] (and Russian)
 *   • Co-Founder  – coFounderBadge, coFounderHeading, coFounderRoleLabel, coFounderBio[] (and Russian)
 *   • Why CA      – whyBadge, whyHeading, whyIntro, whyCards[] (and Russian)
 *   • Approach    – approachHeading, approachIntro (and Russian)
 *   • Team        – teamHeading (and Russian)
 *   • Bottom CTA  – ctaHeading, ctaBody, ctaPrimary{Label,Url}, ctaSecondary{Label,Url} (and Russian)
 *
 * Idempotent: only patches fields that are currently missing on the
 * singleton. Re-running is safe and logs which fields were skipped.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:about-deep
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\n[error] Missing SANITY_WRITE_TOKEN env var.\n");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

// ─── Hero ────────────────────────────────────────────────────────────────────
const HERO = {
  heroTitle: "Who We Are",
  heroTitleRu: "Кто мы",
  heroSubtitle:
    "Two people who know what it's like to start with nothing -- building an organization so others don't have to stay there.",
  heroSubtitleRu:
    "Два человека, знающих, каково начинать с нуля, — строящих организацию, чтобы другим не пришлось оставаться там.",
};

// ─── Founder section ─────────────────────────────────────────────────────────
const FOUNDER = {
  founderBadge: "Founder's Story",
  founderBadgeRu: "История основателя",
  founderHeading: "From a Haitian Orphanage to Founding a Nonprofit",
  founderHeadingRu:
    "Из гаитянского детского дома — к основанию некоммерческой организации",
  founderRoleLabel: "Founder & CEO",
  founderRoleLabelRu: "Основатель и CEO",
  founderBio: [
    {
      _key: "fb1",
      _type: "bioBullet",
      text: "Born in Haiti, abandoned at birth",
      textRu: "Родился на Гаити, брошен при рождении",
    },
    {
      _key: "fb2",
      _type: "bioBullet",
      text: "Survived 3.5 years in an orphanage",
      textRu: "3,5 года в приюте на выживание",
    },
    {
      _key: "fb3",
      _type: "bioBullet",
      text: "Adopted by American family",
      textRu: "Усыновлён американской семьёй",
    },
    {
      _key: "fb4",
      _type: "bioBullet",
      text: "UCF Integrated Business degree",
      textRu: "Степень по бизнесу, UCF",
    },
    {
      _key: "fb5",
      _type: "bioBullet",
      text: "Traveled to 9 countries",
      textRu: "Побывал в 9 странах",
    },
    {
      _key: "fb6",
      _type: "bioBullet",
      text: "Founded BBB at age 23",
      textRu: "Основал BBB в 23 года",
    },
    {
      _key: "fb7",
      _type: "bioBullet",
      text: "Based in Central Asia",
      textRu: "Живёт в Центральной Азии",
    },
  ],
};

// ─── Co-Founder section ──────────────────────────────────────────────────────
const CO_FOUNDER = {
  coFounderBadge: "Co-Founder's Story",
  coFounderBadgeRu: "История сооснователя",
  coFounderHeading: "Bridging Two Worlds",
  coFounderHeadingRu: "Мост между двумя мирами",
  coFounderRoleLabel: "Co-Founder & COO",
  coFounderRoleLabelRu: "Сооснователь и COO",
  coFounderBio: [
    {
      _key: "cb1",
      _type: "bioBullet",
      text: "Born in Kyrgyzstan",
      textRu: "Родилась в Кыргызстане",
    },
    {
      _key: "cb2",
      _type: "bioBullet",
      text: "8 years at DC accounting firm",
      textRu: "8 лет в бухгалтерской фирме Вашингтона",
    },
    {
      _key: "cb3",
      _type: "bioBullet",
      text: "5 years building microloan programs on the ground",
      textRu: "5 лет строила программы микрокредитования на месте",
    },
    {
      _key: "cb4",
      _type: "bioBullet",
      text: "Bridge between two worlds",
      textRu: "Мост между двумя мирами",
    },
  ],
};

// ─── Why Central Asia ────────────────────────────────────────────────────────
const WHY = {
  whyBadge: "Regional Focus",
  whyBadgeRu: "Региональный фокус",
  whyHeading: "Why Central Asia?",
  whyHeadingRu: "Почему Центральная Азия?",
  whyIntro:
    "Kazakhstan, Kyrgyzstan, and Uzbekistan are home to millions of people with entrepreneurial spirit but limited access to training, capital, and infrastructure.",
  whyIntroRu:
    "Казахстан, Кыргызстан и Узбекистан — дом для миллионов людей с предпринимательским духом, но с ограниченным доступом к обучению, капиталу и инфраструктуре.",
  whyCards: [
    {
      _key: "wc1",
      _type: "whyCard",
      title: "Post-Soviet Economic Challenges",
      titleRu: "Постсоветские экономические вызовы",
      body: "After the collapse of the Soviet Union, Central Asian economies lost their industrial base overnight. Decades later, many communities still lack the infrastructure for small business development. Young people often see emigration as their only option.",
      bodyRu:
        "После распада Советского Союза экономики Центральной Азии в одночасье лишились своей промышленной базы. Спустя десятилетия многие общины по-прежнему не имеют инфраструктуры для развития малого бизнеса. Молодёжь нередко видит эмиграцию как единственный выход.",
    },
    {
      _key: "wc2",
      _type: "whyCard",
      title: "High Youth Unemployment",
      titleRu: "Высокая молодёжная безработица",
      body: "In parts of Kyrgyzstan and Uzbekistan, youth unemployment exceeds 17%. These are educated, motivated people who lack access to business training, financial literacy, and startup capital -- not ambition.",
      bodyRu:
        "В отдельных районах Кыргызстана и Узбекистана молодёжная безработица превышает 17%. Это образованные, мотивированные люди, которым не хватает доступа к бизнес-подготовке, финансовой грамотности и стартовому капиталу — но не амбиций.",
    },
    {
      _key: "wc3",
      _type: "whyCard",
      title: "Entrepreneurial Spirit Exists",
      titleRu: "Предпринимательский дух существует",
      body: "Central Asia has a deep tradition of trade and commerce stretching back to the Silk Road. The entrepreneurial instinct is there -- what's missing is the modern training and support system to channel it into sustainable businesses.",
      bodyRu:
        "Центральная Азия имеет глубокую традицию торговли и коммерции, уходящую корнями в эпоху Шёлкового пути. Предпринимательский инстинкт здесь есть — не хватает современного обучения и системы поддержки, чтобы направить его на создание устойчивого бизнеса.",
    },
    {
      _key: "wc4",
      _type: "whyCard",
      title: "BBB Bridges the Gap",
      titleRu: "BBB заполняет этот пробел",
      body: "We provide what's missing: evidence-based financial literacy training, hands-on business creation workshops, leadership mentorship, and micro-lending. Our programs are designed for the local context by people who understand it firsthand.",
      bodyRu:
        "Мы предоставляем то, чего не хватает: обучение финансовой грамотности на основе доказательств, практические мастер-классы по созданию бизнеса, менторство в области лидерства и микрокредитование. Наши программы разработаны для местного контекста людьми, которые знают его изнутри.",
    },
  ],
};

// ─── Approach / Values intro ─────────────────────────────────────────────────
const APPROACH = {
  approachHeading: "Our Approach",
  approachHeadingRu: "Наш подход",
  approachIntro: "Everything we do is grounded in these principles.",
  approachIntroRu: "Всё, что мы делаем, основано на этих принципах.",
};

// ─── Team section heading ────────────────────────────────────────────────────
const TEAM = {
  teamHeading: "Our Team",
  teamHeadingRu: "Наша команда",
};

// ─── Bottom CTA ──────────────────────────────────────────────────────────────
const CTA = {
  ctaHeading: "Join the Mission",
  ctaHeadingRu: "Присоединяйтесь к миссии",
  ctaBody:
    "Whether you volunteer your time, donate to fund a future entrepreneur, or simply share our story -- you become part of something that lasts.",
  ctaBodyRu:
    "Посвятите своё время волонтёрству, пожертвуйте на поддержку будущего предпринимателя или просто поделитесь нашей историей — и вы станете частью чего-то долговечного.",
  ctaPrimaryLabel: "Get Involved",
  ctaPrimaryLabelRu: "Принять участие",
  ctaPrimaryUrl: "/get-involved",
  ctaSecondaryLabel: "See Our Programs",
  ctaSecondaryLabelRu: "Наши программы",
  ctaSecondaryUrl: "/programs-and-impact",
};

// ─── Main ────────────────────────────────────────────────────────────────────

interface ExistingAbout {
  [field: string]: unknown;
}

async function main(): Promise<void> {
  console.log("\n[migrate] About page (deep) — patching aboutPage singleton...\n");

  const existing = (await client.fetch<ExistingAbout | null>(
    `*[_type == "aboutPage"][0]`,
  )) ?? {};

  const desired: Record<string, unknown> = {
    ...HERO,
    ...FOUNDER,
    ...CO_FOUNDER,
    ...WHY,
    ...APPROACH,
    ...TEAM,
    ...CTA,
  };

  const toSet: Record<string, unknown> = {};
  const skipped: string[] = [];

  for (const [key, value] of Object.entries(desired)) {
    const current = existing[key];
    const hasContent =
      Array.isArray(current)
        ? current.length > 0
        : typeof current === "string"
          ? current.trim().length > 0
          : current != null;
    if (hasContent) {
      skipped.push(key);
    } else {
      toSet[key] = value;
    }
  }

  if (Object.keys(toSet).length === 0) {
    console.log(
      "[ok] All targeted aboutPage fields already populated. Nothing to do.\n",
    );
    if (skipped.length > 0) {
      console.log(`     Existing fields preserved: ${skipped.join(", ")}\n`);
    }
    return;
  }

  console.log(`[patch] Setting ${Object.keys(toSet).length} field(s):`);
  for (const key of Object.keys(toSet)) {
    console.log(`        - ${key}`);
  }
  if (skipped.length > 0) {
    console.log(`\n[keep] Preserving ${skipped.length} existing field(s):`);
    for (const key of skipped) {
      console.log(`        - ${key}`);
    }
  }
  console.log();

  try {
    const result = await client.patch("aboutPage").set(toSet).commit();
    console.log(`[ok] Patched document: ${result._id}\n`);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(`[fail] Patch failed: ${message}\n`);
    process.exit(1);
  }
}

main().catch((err: unknown) => {
  const message = err instanceof Error ? err.message : String(err);
  console.error(`[fail] Migration failed: ${message}\n`);
  process.exit(1);
});
