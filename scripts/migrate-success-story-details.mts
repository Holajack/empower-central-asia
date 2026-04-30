/**
 * Migrate the extended success-story detail fields (metrics, timeline,
 * challenge / solution / results, long-form story) for the Sarah and Marcus
 * case studies that previously lived as hardcoded React pages
 * (src/pages/success-stories/SarahCaseStudy.tsx + MarcusCaseStudy.tsx).
 *
 *   SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-success-story-details.mts
 *
 * Idempotent — looks up the doc by slug, then either patches an existing
 * doc or creates one via createIfNotExists. We never overwrite fields that
 * upstream migrations populate (excerpt, heroImageUrl, etc.) — we only set
 * the fields we own here.
 *
 * Slugs:
 *   sarah-chen    — "From Market Stall to Market Leader"
 *   marcus-williams   — "Tech Innovation in Rural Areas"
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

interface MetricSeed {
  label: string;
  labelRu: string;
  value: string;
  description: string;
  descriptionRu: string;
}

interface TimelineSeed {
  phase: string;
  phaseRu: string;
  duration: string;
  durationRu: string;
  description: string;
  descriptionRu: string;
}

interface StorySeed {
  slug: string;
  title: string;
  titleRu: string;
  name: string;
  nameRu: string;
  business: string;
  location: string;
  locationRu: string;
  excerpt: string;
  excerptRu: string;
  heroImageUrl: string;
  tags: string[];
  year: number;
  metrics: MetricSeed[];
  timeline: TimelineSeed[];
  challenge: string;
  challengeRu: string;
  solution: string;
  solutionRu: string;
  results: string;
  resultsRu: string;
  impact: string[];
  impactRu: string[];
  pullQuote: string;
  pullQuoteRu: string;
}

// --------------------------------------------------------------------------
// Sarah Chen — From Market Stall to Market Leader
// Source content: src/pages/success-stories/SarahCaseStudy.tsx
// --------------------------------------------------------------------------
const SARAH_SEED: StorySeed = {
  slug: "sarah-chen",
  title: "From Market Stall to Market Leader",
  titleRu: "От рыночного лотка — к лидеру рынка",
  name: "Sarah Chen",
  nameRu: "Сара Чен",
  business: "Chen Family Sustainable Foods",
  location: "Almaty Region, Kazakhstan",
  locationRu: "Алматинская область, Казахстан",
  excerpt:
    "How Sarah transformed her family's local produce stand into a sustainable business empire that now creates more than 50 jobs in her hometown.",
  excerptRu:
    "Как Сара превратила небольшой семейный овощной лоток в устойчивую бизнес-империю, создав более 50 рабочих мест в родном городе.",
  heroImageUrl:
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1920&q=80",
  tags: ["Sustainable Business", "Women Entrepreneurs", "Agriculture"],
  year: 2024,
  metrics: [
    {
      label: "Jobs Created",
      labelRu: "Создано рабочих мест",
      value: "50+",
      description:
        "Stable, paid roles for women in Sarah's hometown community.",
      descriptionRu:
        "Стабильные оплачиваемые рабочие места для женщин в родном городе Сары.",
    },
    {
      label: "Product Lines Launched",
      labelRu: "Запущенных товарных линеек",
      value: "12",
      description:
        "Value-added products from preserves and ferments to fresh prepared salads.",
      descriptionRu:
        "Продукты с добавленной стоимостью — от варенья и ферментированных закусок до свежих салатов.",
    },
    {
      label: "Regional Reach",
      labelRu: "Региональный охват",
      value: "5 Districts",
      description:
        "Customers now span five neighboring districts beyond the original bazaar.",
      descriptionRu:
        "Клиенты теперь живут в пяти соседних районах, далеко за пределами родного базара.",
    },
  ],
  timeline: [
    {
      phase: "Mentorship Onboarding",
      phaseRu: "Подключение к наставничеству",
      duration: "Months 1-3",
      durationRu: "Месяцы 1-3",
      description:
        "Sarah enrolled in the BBB mentorship program — workshops on market analysis, financial management, and digital marketing.",
      descriptionRu:
        "Сара поступила в программу наставничества BBB — семинары по анализу рынка, финансовому управлению и цифровому маркетингу.",
    },
    {
      phase: "Product Line Expansion",
      phaseRu: "Расширение ассортимента",
      duration: "Months 4-9",
      durationRu: "Месяцы 4-9",
      description:
        "Introduced value-added products (preserves, ferments, prepared salads) using traditional family recipes with a modern twist.",
      descriptionRu:
        "Введение продуктов с добавленной стоимостью (варенье, ферментированные закуски, готовые салаты) по традиционным семейным рецептам с современным подходом.",
    },
    {
      phase: "Brand and Digital Launch",
      phaseRu: "Запуск бренда и цифровых каналов",
      duration: "Months 10-15",
      durationRu: "Месяцы 10-15",
      description:
        "Rolled out eco-friendly packaging and a social media presence, attracting customers from neighboring districts for the first time.",
      descriptionRu:
        "Запуск экологичной упаковки и присутствия в соцсетях — впервые привлекли клиентов из соседних районов.",
    },
    {
      phase: "Hiring and Community Impact",
      phaseRu: "Найм и влияние на сообщество",
      duration: "Year 2+",
      durationRu: "Год 2+",
      description:
        "Hired women from the community, surpassed 50 jobs, and began mentoring other aspiring entrepreneurs.",
      descriptionRu:
        "Сара начала нанимать женщин из своего сообщества, преодолела отметку в 50 рабочих мест и стала наставлять других начинающих предпринимателей.",
    },
  ],
  challenge: `Sarah grew up working her family's modest produce stall — little more than a table and a few crates of vegetables in the local bazaar. She watched her parents struggle season after season with unpredictable weather, rising costs, and fierce competition.

Even though Sarah had real sewing and selling skills, she had no formal business training, no access to capital, and no relationships beyond the immediate neighborhood. Pricing, marketing, and the idea of reaching customers in nearby districts felt entirely out of reach.`,
  challengeRu: `Сара выросла, работая на скромном овощном лотке семьи — это был всего лишь стол и несколько ящиков с овощами на местном базаре. Она видела, как родители из года в год преодолевают трудности: непредсказуемая погода, растущие расходы, жёсткая конкуренция.

Несмотря на её настоящие навыки в шитье и продажах, у Сары не было ни формального бизнес-образования, ни доступа к капиталу, ни связей за пределами ближайшего района. Ценообразование, маркетинг и сама идея выйти на покупателей в соседних районах казались ей недосягаемыми.`,
  solution: `Through the Businesses Beyond Borders mentorship program, Sarah enrolled in tailored workshops covering market analysis, financial management, and digital marketing. She learned to track seasonal trends and buyer behavior, then adjusted what the stall offered to better match real customer needs.

Experienced women entrepreneurs in the BBB volunteer network pushed Sarah to think bigger — value-added products, eco-friendly packaging, and a social media presence she could run herself. The result was a structured plan to evolve from market stall to brand.`,
  solutionRu: `Через программу наставничества Businesses Beyond Borders Сара прошла специализированные семинары по анализу рынка, финансовому управлению и цифровому маркетингу. Она научилась отслеживать сезонные тенденции и поведение покупателей, а затем адаптировала ассортимент лотка под реальные потребности клиентов.

Опытные женщины-предприниматели из волонтёрской сети BBB подтолкнули Сару мыслить шире — продукты с добавленной стоимостью, экологичная упаковка и собственное присутствие в соцсетях. В результате появился структурированный план превращения рыночного лотка в полноценный бренд.`,
  results: `Sarah's company is now recognized as a model of sustainable business in her region. She champions composting, supports local growers, and has hired more than 50 women from her hometown — many in their first formal job.

Beyond financial success, she regularly mentors other aspiring entrepreneurs and represents her region at sustainability events. The market stall is now a multi-product brand sold across five neighboring districts.`,
  resultsRu: `Сегодня компания Сары признана образцом устойчивого бизнеса в её регионе. Она отстаивает компостирование, поддерживает местных производителей и наняла более 50 женщин из родного города — для многих это первая официальная работа.

Помимо финансового успеха, Сара регулярно наставляет других начинающих предпринимателей и представляет свой регион на мероприятиях, посвящённых устойчивому развитию. Рыночный лоток превратился в многопродуктовый бренд, представленный в пяти соседних районах.`,
  impact: [
    "Created 50+ jobs in the community",
    "Launched 12 sustainable product lines",
    "Expanded customer base across 5 districts",
  ],
  impactRu: [
    "Создано более 50 рабочих мест в сообществе",
    "Запущено 12 устойчивых товарных линеек",
    "Клиентская база расширена на 5 районов",
  ],
  pullQuote:
    "I could make beautiful products, but I didn't know anything about pricing, marketing, or finding customers. Now I'm teaching other women what I learned.",
  pullQuoteRu:
    "Я могла делать красивые продукты, но ничего не знала ни о ценообразовании, ни о маркетинге, ни о поиске клиентов. Теперь я сама учу этому других женщин.",
};

// --------------------------------------------------------------------------
// Marcus Williams — Tech Innovation in Rural Areas
// Source content: src/pages/success-stories/MarcusCaseStudy.tsx
// --------------------------------------------------------------------------
const MARCUS_SEED: StorySeed = {
  slug: "marcus-williams",
  title: "Tech Innovation in Rural Areas",
  titleRu: "Технологические инновации в сельской местности",
  name: "Marcus Williams",
  nameRu: "Маркус Уильямс",
  business: "RuralLink Connectivity",
  location: "Rural Kazakhstan",
  locationRu: "Сельская местность Казахстана",
  excerpt:
    "Marcus brought affordable internet solutions to underserved communities, connecting more than 1,000 rural households and sparking a new wave of online education and entrepreneurship.",
  excerptRu:
    "Маркус принёс доступные интернет-решения в малообеспеченные сообщества, подключив более 1 000 сельских домохозяйств и положив начало волне онлайн-образования и предпринимательства.",
  heroImageUrl:
    "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=1920&q=80",
  tags: ["Technology", "Rural Development", "Digital Inclusion"],
  year: 2024,
  metrics: [
    {
      label: "Households Connected",
      labelRu: "Подключённых домохозяйств",
      value: "1,000+",
      description:
        "Affordable, high-speed internet brought to homes that previously had no access.",
      descriptionRu:
        "Доступный высокоскоростной интернет в домах, которые ранее были вне сети.",
    },
    {
      label: "Internet Hubs",
      labelRu: "Интернет-узлов",
      value: "18",
      description:
        "Schools, health clinics, and cooperative centers turned into community hubs.",
      descriptionRu:
        "Школы, медицинские учреждения и кооперативные центры стали узлами сообщества.",
    },
    {
      label: "Digital Ambassadors Trained",
      labelRu: "Подготовлено цифровых послов",
      value: "24",
      description:
        "Local youth trained as the first digital ambassadors of their villages.",
      descriptionRu:
        "Местные молодые люди подготовлены как первые цифровые послы своих сёл.",
    },
  ],
  timeline: [
    {
      phase: "Community Listening",
      phaseRu: "Слушание сообщества",
      duration: "Months 1-3",
      durationRu: "Месяцы 1-3",
      description:
        "Marcus held community forums, met with local leaders, and listened carefully to skepticism about cost and complexity.",
      descriptionRu:
        "Маркус проводил общественные собрания, встречался с местными руководителями и внимательно выслушивал опасения о цене и сложности.",
    },
    {
      phase: "Partnerships and Hardware",
      phaseRu: "Партнёрства и оборудование",
      duration: "Months 4-6",
      durationRu: "Месяцы 4-6",
      description:
        "Partnered with international nonprofits and negotiated affordable routers and satellite receivers from suppliers.",
      descriptionRu:
        "Партнёрство с международными некоммерческими организациями и переговоры о доступных маршрутизаторах и спутниковых ресиверах.",
    },
    {
      phase: "Solar Relays and Hubs",
      phaseRu: "Солнечные ретрансляторы и узлы",
      duration: "Months 7-12",
      durationRu: "Месяцы 7-12",
      description:
        "Installed solar-powered relays and established internet hubs in schools, clinics, and cooperative centers.",
      descriptionRu:
        "Установлены ретрансляторы на солнечной энергии, созданы интернет-узлы в школах, медицинских учреждениях и кооперативных центрах.",
    },
    {
      phase: "Scaling Connectivity",
      phaseRu: "Масштабирование подключений",
      duration: "Year 2+",
      durationRu: "Год 2+",
      description:
        "More than 1,000 households came online; new online businesses, scholarships, and remote work followed.",
      descriptionRu:
        "Более 1 000 домохозяйств вышли в сеть; за этим последовали новые онлайн-бизнесы, стипендии и удалённая работа.",
    },
  ],
  challenge: `Marcus grew up in a sprawling rural region where internet was a luxury. Childhood evenings meant homework by dim light and long treks to the nearest town library to access slow, unreliable computers. Studying at university — far from home — he saw the gap between what was possible online and what his neighbors actually had.

When he came back, he faced a wall of skepticism: villagers had never used the internet, most assumed it was too expensive, and the terrain made cabling almost impossible. Power outages were frequent. Infrastructure was effectively zero.`,
  challengeRu: `Маркус вырос в обширном сельском регионе, где интернет был роскошью. Вечера детства — уроки при тусклом свете и долгие поездки в ближайшую городскую библиотеку ради доступа к медленным, ненадёжным компьютерам. Учась в университете — далеко от дома — он увидел разрыв между тем, что возможно в сети, и тем, что реально доступно его соседям.

Когда он вернулся, его встретила стена скептицизма: сельчане никогда не пользовались интернетом, большинство считало его слишком дорогим, а пересечённая местность делала прокладку кабеля почти невозможной. Часто отключали электричество. Инфраструктуры по сути не было.`,
  solution: `Marcus combined micro-loans, community fundraising, and government grants into a layered funding model. He partnered with international nonprofits and negotiated with hardware suppliers for affordable routers and satellite receivers.

Critically, he trained a team of local youth as the first digital ambassadors for their villages — giving them paid roles and creating a support network that didn't depend on Marcus alone.`,
  solutionRu: `Маркус объединил микрозаймы, сборы средств в сообществе и государственные гранты в многоуровневую модель финансирования. Он наладил партнёрство с международными некоммерческими организациями и договорился с поставщиками оборудования о доступных маршрутизаторах и спутниковых ресиверах.

Самое главное — он подготовил команду местной молодёжи в качестве первых цифровых послов своих сёл, дав им оплачиваемые роли и создав сеть поддержки, которая не зависит только от него самого.`,
  results: `Today Marcus's company has connected more than a thousand rural households to affordable, high-speed internet. Children attend online classes; farmers check weather and market prices; families video-call relatives abroad for the first time.

Beyond technology, his work sparked the first online businesses in the area, scholarship wins for teenagers using application-prep workshops, and a wave of remote-work opportunities that simply didn't exist before.`,
  resultsRu: `Сегодня компания Маркуса подключила к доступному высокоскоростному интернету более тысячи сельских домохозяйств. Дети посещают онлайн-занятия; фермеры проверяют погоду и рыночные цены; семьи впервые звонят по видео родственникам за границей.

Помимо технологий, его работа породила первые онлайн-бизнесы в районе, стипендиальные победы подростков благодаря мастерским по подаче заявок и волну возможностей удалённой работы, которых раньше просто не существовало.`,
  impact: [
    "Connected 1000+ households",
    "Established 18 community internet hubs",
    "Trained 24 youth as digital ambassadors",
  ],
  impactRu: [
    "Подключено более 1 000 домохозяйств",
    "Создано 18 общественных интернет-узлов",
    "Подготовлено 24 молодых цифровых посла",
  ],
  pullQuote:
    "My greatest pride isn't the technical achievements — it's seeing neighbors who once felt isolated now teaching others and launching their own ventures.",
  pullQuoteRu:
    "Моя главная гордость — не технические достижения, а то, что соседи, которые когда-то чувствовали себя изолированными, теперь сами обучают других и запускают собственные предприятия.",
};

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

interface ExistingDoc {
  _id: string;
}

async function findDocIdBySlug(slug: string): Promise<string | null> {
  const result = await client.fetch<ExistingDoc | null>(
    `*[_type == "successStory" && slug.current == $slug][0]{_id}`,
    { slug }
  );
  return result?._id ?? null;
}

async function upsertSuccessStory(seed: StorySeed): Promise<void> {
  const stableId = `successStory.${seed.slug}`;

  // Patch payload — full set of fields the seed owns. We use .set() rather
  // than createOrReplace so any sibling fields populated by other migrations
  // (photo, featured, order, etc.) are preserved.
  const payload = {
    _type: "successStory",
    title: seed.title,
    titleRu: seed.titleRu,
    name: seed.name,
    nameRu: seed.nameRu,
    slug: { _type: "slug", current: seed.slug },
    business: seed.business,
    location: seed.location,
    locationRu: seed.locationRu,
    excerpt: seed.excerpt,
    excerptRu: seed.excerptRu,
    heroImageUrl: seed.heroImageUrl,
    tags: seed.tags,
    year: seed.year,
    impact: seed.impact,
    impactRu: seed.impactRu,
    pullQuote: seed.pullQuote,
    pullQuoteRu: seed.pullQuoteRu,
    // Sanity requires a unique `_key` on every array-of-object item. Without
    // it Studio shows "Some items in the list are missing their keys" and
    // editors can't reorder. We derive a stable, human-readable key from the
    // item's primary label so re-running the migration produces the same keys.
    metrics: seed.metrics.map((m, i) => ({
      _key: `metric-${slugify(m.label) || i}`,
      _type: "metric",
      label: m.label,
      labelRu: m.labelRu,
      value: m.value,
      description: m.description,
      descriptionRu: m.descriptionRu,
    })),
    timeline: seed.timeline.map((t, i) => ({
      _key: `phase-${slugify(t.phase) || i}`,
      _type: "timelinePhase",
      phase: t.phase,
      phaseRu: t.phaseRu,
      duration: t.duration,
      durationRu: t.durationRu,
      description: t.description,
      descriptionRu: t.descriptionRu,
    })),
    challenge: seed.challenge,
    challengeRu: seed.challengeRu,
    solution: seed.solution,
    solutionRu: seed.solutionRu,
    results: seed.results,
    resultsRu: seed.resultsRu,
    active: true,
  };

  const existingId = await findDocIdBySlug(seed.slug);

  if (existingId) {
    console.log(`→ ${seed.slug} (existing id ${existingId}) — patching`);
    await client.patch(existingId).set(payload).commit();
    return;
  }

  console.log(`→ ${seed.slug} (no existing doc) — creating with id ${stableId}`);
  await client.createIfNotExists({
    _id: stableId,
    _type: "successStory",
    slug: { _type: "slug", current: seed.slug },
  });
  await client.patch(stableId).set(payload).commit();
}

async function main() {
  console.log("\n🚀 Patching success-story details (Sarah + Marcus)\n");
  const seeds = [SARAH_SEED, MARCUS_SEED];
  let success = 0;
  let failed = 0;

  for (const seed of seeds) {
    try {
      await upsertSuccessStory(seed);
      success++;
    } catch (err) {
      failed++;
      console.error(`    ❌ ${seed.slug}:`, (err as Error).message);
    }
  }

  console.log(`\n✅ Done — ${success} succeeded, ${failed} failed.`);
  console.log(
    "Visit https://bbborders.sanity.studio/structure/successStory to verify.\n"
  );
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
