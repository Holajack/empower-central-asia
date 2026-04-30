/**
 * Migrate About page narrative fields to Sanity.
 *
 * Patches the existing `aboutPage` singleton with:
 *   - foundingStory   (English Portable Text — Jacken's origin story)
 *   - foundingStoryRu (Russian Portable Text)
 *   - missionText     (English Portable Text — Yeva's story / co-founder narrative)
 *   - missionTextRu   (Russian Portable Text)
 *
 * Idempotent: safe to run multiple times — only sets these four fields,
 * other singleton fields (heroTitle, values, seo, etc.) are preserved.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:about-narrative
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

// ─── Founding story (Jacken's story) — English ───────────────────────────────

const FOUNDING_STORY_EN = [
  {
    _type: "block",
    _key: "fs1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "fs1s1",
        marks: [],
        text: "Jacken Holland was born in Haiti and abandoned at birth. He was found in one of the most dangerous villages in the country -- a place where foreigners were routinely kidnapped for ransom. A woman who ran an orphanage three hours away traveled to that village for reasons she still can't explain. She found him sick and alone and did two things she had never done for any child: she got him medicine, and she went to the police -- both acts that put her own operation at risk.",
      },
    ],
  },
  {
    _type: "block",
    _key: "fs2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "fs2s1",
        marks: [],
        text: 'The orphanage was survival, not care. Children were fed every few days. They drank from a stagnant river where animals bathed. There were no shoes, no beds, no clean water. The village\'s name, when translated, means "less than nothing." Jacken spent three and a half years there.',
      },
    ],
  },
  {
    _type: "block",
    _key: "fs3",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "fs3s1",
        marks: [],
        text: 'An American couple arrived on a humanitarian trip. The father -- a master electrician -- walked into the orphanage and saw a crowd of children. Off to the side sat one angry, resistant boy, alone. He walked straight past every other child, knelt down, and picked him up. For the first time in his life, Jacken felt safe. He fell asleep in the stranger\'s arms. The man turned to his wife with tears in his eyes and said, "This is our child." They were in their mid-40s with grown daughters, heading toward retirement. They chose to start over.',
      },
    ],
  },
  {
    _type: "block",
    _key: "fs4",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "fs4s1",
        marks: [],
        text: "The adoption took two years through political upheaval. When Jacken arrived in America, everything was new: language, culture, electricity, his first plane ride. But the adjustment was brutal -- years of anger, loss, and grief. His adoptive parents never forced gratitude. They met him where he was and let him grieve as long as he needed. He studied business at the University of Central Florida. He traveled to nine countries and found the same gap in every one: people with drive but no access to financial education or business training.",
      },
    ],
  },
  {
    _type: "block",
    _key: "fs5",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "fs5s1",
        marks: [],
        text: "At 23, he founded Businesses Beyond Borders. People called him crazy -- a kid with no money starting a nonprofit while leaving the country. He moved to Kyrgyzstan with a hiking backpack and started over, again. In Central Asia, he saw his own story everywhere: families torn apart because parents couldn't find work, children growing up without fathers or mothers. BBB exists because Jacken knows what it's like to be given a real chance -- and what happens when you are.",
      },
    ],
  },
  {
    _type: "block",
    _key: "fs6",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "fs6s1",
        marks: ["strong"],
        text: '"I know what it\'s like to have nothing and to be told you are nothing. I also know what happens when one person decides you\'re worth starting over for. That\'s what BBB is. We show up, and we give people a real chance."',
      },
    ],
  },
];

// ─── Founding story — Russian ────────────────────────────────────────────────

const FOUNDING_STORY_RU = [
  {
    _type: "block",
    _key: "fsr1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "fsr1s1",
        marks: [],
        text: "Джакен Холланд родился на Гаити и был брошен при рождении. Его нашли в одной из самых опасных деревень страны — месте, где иностранцев похищали ради выкупа. Женщина, владевшая приютом в трёх часах езды, приехала в эту деревню по причинам, которые она до сих пор не может объяснить. Она нашла его больным и одиноким и сделала две вещи, которых никогда не делала ни для одного ребёнка: достала лекарства и обратилась в полицию — оба поступка, ставившие под угрозу её собственное дело.",
      },
    ],
  },
  {
    _type: "block",
    _key: "fsr2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "fsr2s1",
        marks: [],
        text: "Приют означал выживание, а не заботу. Детей кормили раз в несколько дней. Они пили из стоячей реки, где купали животных. Не было обуви, кроватей, чистой воды. Название деревни в переводе означает «меньше, чем ничто». Джакен провёл там три с половиной года.",
      },
    ],
  },
  {
    _type: "block",
    _key: "fsr3",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "fsr3s1",
        marks: [],
        text: "Американская пара приехала в гуманитарную поездку. Отец — мастер-электрик — зашёл в приют и увидел толпу детей. В стороне сидел злой, замкнутый мальчик. Он прошёл мимо всех остальных, опустился на колени и взял его на руки. Впервые в жизни Джакен почувствовал себя в безопасности. Он уснул на руках незнакомца. Мужчина повернулся к жене со слезами: «Это наш ребёнок». Им было за сорок, дочери выросли, впереди была пенсия. Они решили начать всё сначала.",
      },
    ],
  },
  {
    _type: "block",
    _key: "fsr4",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "fsr4s1",
        marks: [],
        text: "Усыновление заняло два года на фоне политических потрясений. Когда Джакен прибыл в Америку, всё было новым: язык, культура, электричество, первый полёт. Но адаптация была тяжёлой — годы гнева, боли и горя. Приёмные родители никогда не требовали благодарности. Они встречали его там, где он был, и давали горевать столько, сколько нужно. Он поступил в Университет Центральной Флориды и получил степень в области бизнеса. Побывал в девяти странах и в каждой видел одно: люди с амбициями, но без доступа к финансовому образованию.",
      },
    ],
  },
  {
    _type: "block",
    _key: "fsr5",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "fsr5s1",
        marks: [],
        text: "В 23 года он основал Businesses Beyond Borders. Люди называли его сумасшедшим — молодой парень без денег создаёт организацию, собираясь уехать из страны. Он переехал в Кыргызстан с походным рюкзаком и начал сначала — снова. В Центральной Азии он увидел свою историю повсюду: семьи, разлучённые потому, что родители не могли найти работу, дети без отцов и матерей. BBB существует потому, что Джакен знает, каково это — получить настоящий шанс. И что происходит, когда ты его получаешь.",
      },
    ],
  },
  {
    _type: "block",
    _key: "fsr6",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "fsr6s1",
        marks: ["strong"],
        text: "«Я знаю, каково это — не иметь ничего и слышать, что ты — ничто. Но я также знаю, что происходит, когда один человек решает, что ты стоишь того, чтобы начать всё сначала. Это и есть BBB. Мы приходим и даём людям настоящий шанс.»",
      },
    ],
  },
];

// ─── Mission text (Yeva's co-founder story) — English ────────────────────────

const MISSION_TEXT_EN = [
  {
    _type: "block",
    _key: "mt1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "mt1s1",
        marks: [],
        text: 'Yeva grew up in Kyrgyzstan and built an eight-year career at a prestigious DC accounting firm, specializing in serving nonprofits. In 2016, she made a decision that made no practical sense: she asked to work remotely from Central Asia. Every manager opposed it. Then the firm contacted all five of her clients expecting pushback. Every single one said: "We want Yeva. However she can work."',
      },
    ],
  },
  {
    _type: "block",
    _key: "mt2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "mt2s1",
        marks: [],
        text: "For five years she lived between two worlds -- serving DC clients remotely while building microloan programs on the ground in Kyrgyzstan. Sixteen-hour days. Two time zones. Two lives. She did it because she understood something most development organizations miss: lasting change in Central Asia doesn't come from outside programs. It comes from people inside the community becoming the ones with resources, skills, and standing.",
      },
    ],
  },
  {
    _type: "block",
    _key: "mt3",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "mt3s1",
        marks: [],
        text: "A $2,000 loan for materials becomes $4,000 in revenue within six months. A father stays instead of leaving for Russia. Children stay in school. A family stays whole. Yeva has seen it happen -- and she has the accounting expertise, the cultural roots, and the on-the-ground relationships to make it keep happening.",
      },
    ],
  },
];

// ─── Mission text — Russian ──────────────────────────────────────────────────

const MISSION_TEXT_RU = [
  {
    _type: "block",
    _key: "mtr1",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "mtr1s1",
        marks: [],
        text: "Йева выросла в Кыргызстане и построила восьмилетнюю карьеру в престижной бухгалтерской фирме в Вашингтоне, специализируясь на обслуживании некоммерческих организаций. В 2016 году она приняла решение, лишённое всякой практической логики: попросила работать удалённо из Центральной Азии. Каждый руководитель был против. Тогда фирма обратилась ко всем пяти её клиентам, ожидая возражений. Каждый из них ответил: «Нам нужна Йева. Как угодно.»",
      },
    ],
  },
  {
    _type: "block",
    _key: "mtr2",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "mtr2s1",
        marks: [],
        text: "Пять лет она жила между двумя мирами — обслуживая клиентов из Вашингтона удалённо, одновременно строя программы микрокредитования на месте в Кыргызстане. Шестнадцатичасовые дни. Два часовых пояса. Две жизни. Она делала это, потому что понимала то, что упускают большинство организаций по развитию: устойчивые перемены в Центральной Азии приходят не от внешних программ. Они приходят от людей внутри сообщества, которые становятся теми, у кого есть ресурсы, навыки и авторитет.",
      },
    ],
  },
  {
    _type: "block",
    _key: "mtr3",
    style: "normal",
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: "mtr3s1",
        marks: [],
        text: "Заём в $2,000 на материалы превращается в $4,000 дохода за шесть месяцев. Отец остаётся вместо того, чтобы уехать в Россию. Дети остаются в школе. Семья остаётся целой. Йева видела это своими глазами — и у неё есть бухгалтерский опыт, культурные корни и связи на месте, чтобы это продолжало работать.",
      },
    ],
  },
];

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log("\n📄 migrate-about-narrative: patching aboutPage singleton...\n");

  // Check if the singleton already has these fields populated (idempotency check).
  const existing = await client.fetch(
    `*[_type == "aboutPage"][0]{ foundingStory, missionText }`,
  );

  if (
    existing?.foundingStory?.length > 0 &&
    existing?.missionText?.length > 0
  ) {
    console.log(
      "✅ aboutPage already has foundingStory and missionText. Nothing to do.\n",
    );
    return;
  }

  const result = await client
    .patch("aboutPage")
    .set({
      foundingStory: FOUNDING_STORY_EN,
      foundingStoryRu: FOUNDING_STORY_RU,
      missionText: MISSION_TEXT_EN,
      missionTextRu: MISSION_TEXT_RU,
    })
    .commit();

  console.log(`✅ Patched document: ${result._id}\n`);
  console.log("   Fields updated:");
  console.log("   - foundingStory    (EN, 6 blocks)");
  console.log("   - foundingStoryRu  (RU, 6 blocks)");
  console.log("   - missionText      (EN, 3 blocks)");
  console.log("   - missionTextRu    (RU, 3 blocks)\n");
}

main().catch((err) => {
  console.error("❌ Migration failed:", err.message ?? err);
  process.exit(1);
});
