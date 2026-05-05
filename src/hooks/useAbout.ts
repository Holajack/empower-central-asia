/**
 * Hooks for the About page content + team members from Sanity.
 *   - useAboutPage()    → singleton with hero copy, values list, optional narrative
 *   - useTeamMembers()  → list of active team member docs, ordered
 *
 * Both fall back to hardcoded values that mirror what the site shipped with.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity, imageUrl } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";

// ─── Values list (lives inside aboutPage) ─────────────────────────────

export interface ValueItem {
  title: string;
  titleRu?: string;
  description: string;
  descriptionRu?: string;
  /** Lucide icon name — mapped to component on the site. */
  icon: string;
}

const VALUES_FALLBACK: ValueItem[] = [
  {
    title: "Empowerment Over Dependency",
    titleRu: "Расширение возможностей, а не зависимость",
    description:
      "We don't give handouts -- we give tools, training, and the confidence to build something lasting.",
    descriptionRu:
      "Мы не раздаём подачки — мы даём инструменты, обучение и уверенность, необходимые для создания чего-то долговечного.",
    icon: "Target",
  },
  {
    title: "Local Roots, Global Support",
    titleRu: "Местные корни, глобальная поддержка",
    description:
      "Programs are designed for Central Asian communities with the backing of a worldwide network of volunteers and donors.",
    descriptionRu:
      "Программы разработаны для общин Центральной Азии при поддержке всемирной сети волонтёров и доноров.",
    icon: "Globe",
  },
  {
    title: "Evidence-Based Methods",
    titleRu: "Методы, основанные на доказательствах",
    description:
      "Every program is built on proven frameworks -- Lean Startup, zero-based budgeting, the 70-20-10 leadership model.",
    descriptionRu:
      "Каждая программа построена на проверенных концепциях: Lean Startup, бюджетирование с нулевой базой, лидерская модель 70-20-10.",
    icon: "TrendingUp",
  },
  {
    title: "Dignity First",
    titleRu: "Достоинство прежде всего",
    description:
      "We believe entrepreneurship restores dignity. Building something of your own changes how you see yourself and your future.",
    descriptionRu:
      "Мы верим, что предпринимательство возвращает достоинство. Когда вы создаёте что-то своё, это меняет взгляд на себя и своё будущее.",
    icon: "Heart",
  },
  {
    title: "Community Multiplication",
    titleRu: "Умножение через сообщество",
    description:
      "Every graduate is trained to teach others. One entrepreneur becomes ten. One community lifts many.",
    descriptionRu:
      "Каждый выпускник обучен обучать других. Один предприниматель становится десятью. Одно сообщество поднимает многих.",
    icon: "Users",
  },
  {
    title: "Transparency & Accountability",
    titleRu: "Прозрачность и подотчётность",
    description:
      "100% of donations fund programs. We report impact openly and hold ourselves to the highest standard.",
    descriptionRu:
      "100% пожертвований идут на финансирование программ. Мы открыто отчитываемся о результатах и придерживаемся самых высоких стандартов.",
    icon: "Lightbulb",
  },
];

// ─── Portable Text block type (minimal shape for rendering) ───────────

export type PortableTextBlock = {
  _type: string;
  _key?: string;
  style?: string;
  markDefs?: unknown[];
  children?: Array<{
    _type: string;
    _key?: string;
    marks?: string[];
    text?: string;
  }>;
};

// ─── Hardcoded Portable Text fallbacks (extracted from the About page) ─

const FOUNDING_STORY_FALLBACK: PortableTextBlock[] = [
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

const FOUNDING_STORY_FALLBACK_RU: PortableTextBlock[] = [
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

// missionText is used for Yeva's story section (Co-Founder's Story) on the About page.
const MISSION_TEXT_FALLBACK: PortableTextBlock[] = [
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

const MISSION_TEXT_FALLBACK_RU: PortableTextBlock[] = [
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

// ─── About page (singleton) ───────────────────────────────────────────

export interface BioBullet {
  text: string;
  textRu?: string;
}

export interface WhyCard {
  title: string;
  titleRu?: string;
  body: string;
  bodyRu?: string;
}

export interface AboutPage {
  // Hero
  heroTitle: string;
  heroTitleRu?: string;
  heroSubtitle: string;
  heroSubtitleRu?: string;

  // Founder section
  founderBadge: string;
  founderBadgeRu?: string;
  founderHeading: string;
  founderHeadingRu?: string;
  founderRoleLabel: string;
  founderRoleLabelRu?: string;
  founderBio: BioBullet[];
  foundingStory: PortableTextBlock[];
  foundingStoryRu: PortableTextBlock[];

  // Co-founder section
  coFounderBadge: string;
  coFounderBadgeRu?: string;
  coFounderHeading: string;
  coFounderHeadingRu?: string;
  coFounderRoleLabel: string;
  coFounderRoleLabelRu?: string;
  coFounderBio: BioBullet[];
  missionText: PortableTextBlock[];
  missionTextRu: PortableTextBlock[];

  // Why Central Asia
  whyBadge: string;
  whyBadgeRu?: string;
  whyHeading: string;
  whyHeadingRu?: string;
  whyIntro: string;
  whyIntroRu?: string;
  whyCards: WhyCard[];

  // Approach
  approachHeading: string;
  approachHeadingRu?: string;
  approachIntro: string;
  approachIntroRu?: string;
  values: ValueItem[];

  // Team
  teamHeading: string;
  teamHeadingRu?: string;

  // Bottom CTA
  ctaHeading: string;
  ctaHeadingRu?: string;
  ctaBody: string;
  ctaBodyRu?: string;
  ctaPrimaryLabel: string;
  ctaPrimaryLabelRu?: string;
  ctaPrimaryUrl: string;
  ctaSecondaryLabel: string;
  ctaSecondaryLabelRu?: string;
  ctaSecondaryUrl: string;

  // Localized getters
  getHeroTitle: (isCentralAsia: boolean) => string;
  getHeroSubtitle: (isCentralAsia: boolean) => string;
  getFounderBadge: (isCentralAsia: boolean) => string;
  getFounderHeading: (isCentralAsia: boolean) => string;
  getFounderRoleLabel: (isCentralAsia: boolean) => string;
  getFounderBio: (isCentralAsia: boolean) => string[];
  getCoFounderBadge: (isCentralAsia: boolean) => string;
  getCoFounderHeading: (isCentralAsia: boolean) => string;
  getCoFounderRoleLabel: (isCentralAsia: boolean) => string;
  getCoFounderBio: (isCentralAsia: boolean) => string[];
  getWhyBadge: (isCentralAsia: boolean) => string;
  getWhyHeading: (isCentralAsia: boolean) => string;
  getWhyIntro: (isCentralAsia: boolean) => string;
  getWhyCards: (
    isCentralAsia: boolean,
  ) => Array<{ title: string; body: string }>;
  getApproachHeading: (isCentralAsia: boolean) => string;
  getApproachIntro: (isCentralAsia: boolean) => string;
  getValuesLocalized: (isCentralAsia: boolean) => Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  getTeamHeading: (isCentralAsia: boolean) => string;
  getCtaHeading: (isCentralAsia: boolean) => string;
  getCtaBody: (isCentralAsia: boolean) => string;
  getCtaPrimaryLabel: (isCentralAsia: boolean) => string;
  getCtaSecondaryLabel: (isCentralAsia: boolean) => string;
  getFoundingStory: (isCentralAsia: boolean) => PortableTextBlock[];
  getMissionText: (isCentralAsia: boolean) => PortableTextBlock[];
}

// ─── Hardcoded fallback values (mirror what About.tsx originally shipped) ───
const FOUNDER_BIO_FALLBACK: BioBullet[] = [
  {
    text: "Born in Haiti, abandoned at birth",
    textRu: "Родился на Гаити, брошен при рождении",
  },
  {
    text: "Survived 3.5 years in an orphanage",
    textRu: "3,5 года в приюте на выживание",
  },
  {
    text: "Adopted by American family",
    textRu: "Усыновлён американской семьёй",
  },
  {
    text: "UCF Integrated Business degree",
    textRu: "Степень по бизнесу, UCF",
  },
  {
    text: "Traveled to 9 countries",
    textRu: "Побывал в 9 странах",
  },
  {
    text: "Founded BBB at age 23",
    textRu: "Основал BBB в 23 года",
  },
  {
    text: "Based in Central Asia",
    textRu: "Живёт в Центральной Азии",
  },
];

const CO_FOUNDER_BIO_FALLBACK: BioBullet[] = [
  {
    text: "Born in Kyrgyzstan",
    textRu: "Родилась в Кыргызстане",
  },
  {
    text: "8 years at DC accounting firm",
    textRu: "8 лет в бухгалтерской фирме Вашингтона",
  },
  {
    text: "5 years building microloan programs on the ground",
    textRu: "5 лет строила программы микрокредитования на месте",
  },
  {
    text: "Bridge between two worlds",
    textRu: "Мост между двумя мирами",
  },
];

const WHY_CARDS_FALLBACK: WhyCard[] = [
  {
    title: "Post-Soviet Economic Challenges",
    titleRu: "Постсоветские экономические вызовы",
    body: "After the collapse of the Soviet Union, Central Asian economies lost their industrial base overnight. Decades later, many communities still lack the infrastructure for small business development. Young people often see emigration as their only option.",
    bodyRu:
      "После распада Советского Союза экономики Центральной Азии в одночасье лишились своей промышленной базы. Спустя десятилетия многие общины по-прежнему не имеют инфраструктуры для развития малого бизнеса. Молодёжь нередко видит эмиграцию как единственный выход.",
  },
  {
    title: "High Youth Unemployment",
    titleRu: "Высокая молодёжная безработица",
    body: "In parts of Kyrgyzstan and Uzbekistan, youth unemployment exceeds 17%. These are educated, motivated people who lack access to business training, financial literacy, and startup capital -- not ambition.",
    bodyRu:
      "В отдельных районах Кыргызстана и Узбекистана молодёжная безработица превышает 17%. Это образованные, мотивированные люди, которым не хватает доступа к бизнес-подготовке, финансовой грамотности и стартовому капиталу — но не амбиций.",
  },
  {
    title: "Entrepreneurial Spirit Exists",
    titleRu: "Предпринимательский дух существует",
    body: "Central Asia has a deep tradition of trade and commerce stretching back to the Silk Road. The entrepreneurial instinct is there -- what's missing is the modern training and support system to channel it into sustainable businesses.",
    bodyRu:
      "Центральная Азия имеет глубокую традицию торговли и коммерции, уходящую корнями в эпоху Шёлкового пути. Предпринимательский инстинкт здесь есть — не хватает современного обучения и системы поддержки, чтобы направить его на создание устойчивого бизнеса.",
  },
  {
    title: "BBB Bridges the Gap",
    titleRu: "BBB заполняет этот пробел",
    body: "We provide what's missing: evidence-based financial literacy training, hands-on business creation workshops, leadership mentorship, and micro-lending. Our programs are designed for the local context by people who understand it firsthand.",
    bodyRu:
      "Мы предоставляем то, чего не хватает: обучение финансовой грамотности на основе доказательств, практические мастер-классы по созданию бизнеса, менторство в области лидерства и микрокредитование. Наши программы разработаны для местного контекста людьми, которые знают его изнутри.",
  },
];

const ABOUT_FALLBACK = {
  heroTitle: "Who We Are",
  heroTitleRu: "Кто мы",
  heroSubtitle:
    "Two people who know what it's like to start with nothing -- building an organization so others don't have to stay there.",
  heroSubtitleRu:
    "Два человека, знающих, каково начинать с нуля, — строящих организацию, чтобы другим не пришлось оставаться там.",

  founderBadge: "Founder's Story",
  founderBadgeRu: "История основателя",
  founderHeading: "From a Haitian Orphanage to Founding a Nonprofit",
  founderHeadingRu:
    "Из гаитянского детского дома — к основанию некоммерческой организации",
  founderRoleLabel: "Founder & CEO",
  founderRoleLabelRu: "Основатель и CEO",

  coFounderBadge: "Co-Founder's Story",
  coFounderBadgeRu: "История сооснователя",
  coFounderHeading: "Bridging Two Worlds",
  coFounderHeadingRu: "Мост между двумя мирами",
  coFounderRoleLabel: "Co-Founder & COO",
  coFounderRoleLabelRu: "Сооснователь и COO",

  whyBadge: "Regional Focus",
  whyBadgeRu: "Региональный фокус",
  whyHeading: "Why Central Asia?",
  whyHeadingRu: "Почему Центральная Азия?",
  whyIntro:
    "Kazakhstan, Kyrgyzstan, and Uzbekistan are home to millions of people with entrepreneurial spirit but limited access to training, capital, and infrastructure.",
  whyIntroRu:
    "Казахстан, Кыргызстан и Узбекистан — дом для миллионов людей с предпринимательским духом, но с ограниченным доступом к обучению, капиталу и инфраструктуре.",

  approachHeading: "Our Approach",
  approachHeadingRu: "Наш подход",
  approachIntro: "Everything we do is grounded in these principles.",
  approachIntroRu: "Всё, что мы делаем, основано на этих принципах.",

  teamHeading: "Our Team",
  teamHeadingRu: "Наша команда",

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

const ABOUT_QUERY = /* groq */ `
  *[_type == "aboutPage"][0]{
    heroTitle,
    heroTitleRu,
    heroSubtitle,
    heroSubtitleRu,
    founderBadge,
    founderBadgeRu,
    founderHeading,
    founderHeadingRu,
    founderRoleLabel,
    founderRoleLabelRu,
    founderBio,
    foundingStory,
    foundingStoryRu,
    coFounderBadge,
    coFounderBadgeRu,
    coFounderHeading,
    coFounderHeadingRu,
    coFounderRoleLabel,
    coFounderRoleLabelRu,
    coFounderBio,
    missionText,
    missionTextRu,
    whyBadge,
    whyBadgeRu,
    whyHeading,
    whyHeadingRu,
    whyIntro,
    whyIntroRu,
    whyCards,
    approachHeading,
    approachHeadingRu,
    approachIntro,
    approachIntroRu,
    values,
    teamHeading,
    teamHeadingRu,
    ctaHeading,
    ctaHeadingRu,
    ctaBody,
    ctaBodyRu,
    ctaPrimaryLabel,
    ctaPrimaryLabelRu,
    ctaPrimaryUrl,
    ctaSecondaryLabel,
    ctaSecondaryLabelRu,
    ctaSecondaryUrl
  }
`;

interface RawAboutPage {
  heroTitle?: string;
  heroTitleRu?: string;
  heroSubtitle?: string;
  heroSubtitleRu?: string;

  founderBadge?: string;
  founderBadgeRu?: string;
  founderHeading?: string;
  founderHeadingRu?: string;
  founderRoleLabel?: string;
  founderRoleLabelRu?: string;
  founderBio?: BioBullet[];
  foundingStory?: PortableTextBlock[];
  foundingStoryRu?: PortableTextBlock[];

  coFounderBadge?: string;
  coFounderBadgeRu?: string;
  coFounderHeading?: string;
  coFounderHeadingRu?: string;
  coFounderRoleLabel?: string;
  coFounderRoleLabelRu?: string;
  coFounderBio?: BioBullet[];
  missionText?: PortableTextBlock[];
  missionTextRu?: PortableTextBlock[];

  whyBadge?: string;
  whyBadgeRu?: string;
  whyHeading?: string;
  whyHeadingRu?: string;
  whyIntro?: string;
  whyIntroRu?: string;
  whyCards?: WhyCard[];

  approachHeading?: string;
  approachHeadingRu?: string;
  approachIntro?: string;
  approachIntroRu?: string;
  values?: ValueItem[];

  teamHeading?: string;
  teamHeadingRu?: string;

  ctaHeading?: string;
  ctaHeadingRu?: string;
  ctaBody?: string;
  ctaBodyRu?: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryLabelRu?: string;
  ctaPrimaryUrl?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryLabelRu?: string;
  ctaSecondaryUrl?: string;
}

function pickStr(value: string | undefined, fallback: string): string {
  return value && value.trim().length > 0 ? value : fallback;
}

function mergeAbout(raw: RawAboutPage | null): AboutPage {
  const r = raw ?? {};

  const heroTitle = pickStr(r.heroTitle, ABOUT_FALLBACK.heroTitle);
  const heroTitleRu = pickStr(r.heroTitleRu, ABOUT_FALLBACK.heroTitleRu);
  const heroSubtitle = pickStr(r.heroSubtitle, ABOUT_FALLBACK.heroSubtitle);
  const heroSubtitleRu = pickStr(
    r.heroSubtitleRu,
    ABOUT_FALLBACK.heroSubtitleRu,
  );

  const founderBadge = pickStr(r.founderBadge, ABOUT_FALLBACK.founderBadge);
  const founderBadgeRu = pickStr(
    r.founderBadgeRu,
    ABOUT_FALLBACK.founderBadgeRu,
  );
  const founderHeading = pickStr(
    r.founderHeading,
    ABOUT_FALLBACK.founderHeading,
  );
  const founderHeadingRu = pickStr(
    r.founderHeadingRu,
    ABOUT_FALLBACK.founderHeadingRu,
  );
  const founderRoleLabel = pickStr(
    r.founderRoleLabel,
    ABOUT_FALLBACK.founderRoleLabel,
  );
  const founderRoleLabelRu = pickStr(
    r.founderRoleLabelRu,
    ABOUT_FALLBACK.founderRoleLabelRu,
  );
  const founderBio =
    r.founderBio && r.founderBio.length > 0
      ? r.founderBio
      : FOUNDER_BIO_FALLBACK;

  const coFounderBadge = pickStr(
    r.coFounderBadge,
    ABOUT_FALLBACK.coFounderBadge,
  );
  const coFounderBadgeRu = pickStr(
    r.coFounderBadgeRu,
    ABOUT_FALLBACK.coFounderBadgeRu,
  );
  const coFounderHeading = pickStr(
    r.coFounderHeading,
    ABOUT_FALLBACK.coFounderHeading,
  );
  const coFounderHeadingRu = pickStr(
    r.coFounderHeadingRu,
    ABOUT_FALLBACK.coFounderHeadingRu,
  );
  const coFounderRoleLabel = pickStr(
    r.coFounderRoleLabel,
    ABOUT_FALLBACK.coFounderRoleLabel,
  );
  const coFounderRoleLabelRu = pickStr(
    r.coFounderRoleLabelRu,
    ABOUT_FALLBACK.coFounderRoleLabelRu,
  );
  const coFounderBio =
    r.coFounderBio && r.coFounderBio.length > 0
      ? r.coFounderBio
      : CO_FOUNDER_BIO_FALLBACK;

  const whyBadge = pickStr(r.whyBadge, ABOUT_FALLBACK.whyBadge);
  const whyBadgeRu = pickStr(r.whyBadgeRu, ABOUT_FALLBACK.whyBadgeRu);
  const whyHeading = pickStr(r.whyHeading, ABOUT_FALLBACK.whyHeading);
  const whyHeadingRu = pickStr(r.whyHeadingRu, ABOUT_FALLBACK.whyHeadingRu);
  const whyIntro = pickStr(r.whyIntro, ABOUT_FALLBACK.whyIntro);
  const whyIntroRu = pickStr(r.whyIntroRu, ABOUT_FALLBACK.whyIntroRu);
  const whyCards =
    r.whyCards && r.whyCards.length > 0 ? r.whyCards : WHY_CARDS_FALLBACK;

  const approachHeading = pickStr(
    r.approachHeading,
    ABOUT_FALLBACK.approachHeading,
  );
  const approachHeadingRu = pickStr(
    r.approachHeadingRu,
    ABOUT_FALLBACK.approachHeadingRu,
  );
  const approachIntro = pickStr(r.approachIntro, ABOUT_FALLBACK.approachIntro);
  const approachIntroRu = pickStr(
    r.approachIntroRu,
    ABOUT_FALLBACK.approachIntroRu,
  );
  const values = r.values && r.values.length > 0 ? r.values : VALUES_FALLBACK;

  const teamHeading = pickStr(r.teamHeading, ABOUT_FALLBACK.teamHeading);
  const teamHeadingRu = pickStr(r.teamHeadingRu, ABOUT_FALLBACK.teamHeadingRu);

  const ctaHeading = pickStr(r.ctaHeading, ABOUT_FALLBACK.ctaHeading);
  const ctaHeadingRu = pickStr(r.ctaHeadingRu, ABOUT_FALLBACK.ctaHeadingRu);
  const ctaBody = pickStr(r.ctaBody, ABOUT_FALLBACK.ctaBody);
  const ctaBodyRu = pickStr(r.ctaBodyRu, ABOUT_FALLBACK.ctaBodyRu);
  const ctaPrimaryLabel = pickStr(
    r.ctaPrimaryLabel,
    ABOUT_FALLBACK.ctaPrimaryLabel,
  );
  const ctaPrimaryLabelRu = pickStr(
    r.ctaPrimaryLabelRu,
    ABOUT_FALLBACK.ctaPrimaryLabelRu,
  );
  const ctaPrimaryUrl = pickStr(
    r.ctaPrimaryUrl,
    ABOUT_FALLBACK.ctaPrimaryUrl,
  );
  const ctaSecondaryLabel = pickStr(
    r.ctaSecondaryLabel,
    ABOUT_FALLBACK.ctaSecondaryLabel,
  );
  const ctaSecondaryLabelRu = pickStr(
    r.ctaSecondaryLabelRu,
    ABOUT_FALLBACK.ctaSecondaryLabelRu,
  );
  const ctaSecondaryUrl = pickStr(
    r.ctaSecondaryUrl,
    ABOUT_FALLBACK.ctaSecondaryUrl,
  );

  const foundingStory =
    r.foundingStory && r.foundingStory.length > 0
      ? r.foundingStory
      : FOUNDING_STORY_FALLBACK;
  const foundingStoryRu =
    r.foundingStoryRu && r.foundingStoryRu.length > 0
      ? r.foundingStoryRu
      : FOUNDING_STORY_FALLBACK_RU;
  const missionText =
    r.missionText && r.missionText.length > 0
      ? r.missionText
      : MISSION_TEXT_FALLBACK;
  const missionTextRu =
    r.missionTextRu && r.missionTextRu.length > 0
      ? r.missionTextRu
      : MISSION_TEXT_FALLBACK_RU;

  return {
    heroTitle,
    heroTitleRu,
    heroSubtitle,
    heroSubtitleRu,
    founderBadge,
    founderBadgeRu,
    founderHeading,
    founderHeadingRu,
    founderRoleLabel,
    founderRoleLabelRu,
    founderBio,
    foundingStory,
    foundingStoryRu,
    coFounderBadge,
    coFounderBadgeRu,
    coFounderHeading,
    coFounderHeadingRu,
    coFounderRoleLabel,
    coFounderRoleLabelRu,
    coFounderBio,
    missionText,
    missionTextRu,
    whyBadge,
    whyBadgeRu,
    whyHeading,
    whyHeadingRu,
    whyIntro,
    whyIntroRu,
    whyCards,
    approachHeading,
    approachHeadingRu,
    approachIntro,
    approachIntroRu,
    values,
    teamHeading,
    teamHeadingRu,
    ctaHeading,
    ctaHeadingRu,
    ctaBody,
    ctaBodyRu,
    ctaPrimaryLabel,
    ctaPrimaryLabelRu,
    ctaPrimaryUrl,
    ctaSecondaryLabel,
    ctaSecondaryLabelRu,
    ctaSecondaryUrl,

    getHeroTitle: (isCA) => getLocalized(heroTitle, heroTitleRu, isCA),
    getHeroSubtitle: (isCA) => getLocalized(heroSubtitle, heroSubtitleRu, isCA),
    getFounderBadge: (isCA) => getLocalized(founderBadge, founderBadgeRu, isCA),
    getFounderHeading: (isCA) =>
      getLocalized(founderHeading, founderHeadingRu, isCA),
    getFounderRoleLabel: (isCA) =>
      getLocalized(founderRoleLabel, founderRoleLabelRu, isCA),
    getFounderBio: (isCA) =>
      founderBio.map((b) => getLocalized(b.text, b.textRu, isCA)),
    getCoFounderBadge: (isCA) =>
      getLocalized(coFounderBadge, coFounderBadgeRu, isCA),
    getCoFounderHeading: (isCA) =>
      getLocalized(coFounderHeading, coFounderHeadingRu, isCA),
    getCoFounderRoleLabel: (isCA) =>
      getLocalized(coFounderRoleLabel, coFounderRoleLabelRu, isCA),
    getCoFounderBio: (isCA) =>
      coFounderBio.map((b) => getLocalized(b.text, b.textRu, isCA)),
    getWhyBadge: (isCA) => getLocalized(whyBadge, whyBadgeRu, isCA),
    getWhyHeading: (isCA) => getLocalized(whyHeading, whyHeadingRu, isCA),
    getWhyIntro: (isCA) => getLocalized(whyIntro, whyIntroRu, isCA),
    getWhyCards: (isCA) =>
      whyCards.map((c) => ({
        title: getLocalized(c.title, c.titleRu, isCA),
        body: getLocalized(c.body, c.bodyRu, isCA),
      })),
    getApproachHeading: (isCA) =>
      getLocalized(approachHeading, approachHeadingRu, isCA),
    getApproachIntro: (isCA) =>
      getLocalized(approachIntro, approachIntroRu, isCA),
    getValuesLocalized: (isCA) =>
      values.map((v) => ({
        title: getLocalized(v.title, v.titleRu, isCA),
        description: getLocalized(v.description, v.descriptionRu, isCA),
        icon: v.icon,
      })),
    getTeamHeading: (isCA) => getLocalized(teamHeading, teamHeadingRu, isCA),
    getCtaHeading: (isCA) => getLocalized(ctaHeading, ctaHeadingRu, isCA),
    getCtaBody: (isCA) => getLocalized(ctaBody, ctaBodyRu, isCA),
    getCtaPrimaryLabel: (isCA) =>
      getLocalized(ctaPrimaryLabel, ctaPrimaryLabelRu, isCA),
    getCtaSecondaryLabel: (isCA) =>
      getLocalized(ctaSecondaryLabel, ctaSecondaryLabelRu, isCA),
    getFoundingStory: (isCA) =>
      isCA && foundingStoryRu.length > 0 ? foundingStoryRu : foundingStory,
    getMissionText: (isCA) =>
      isCA && missionTextRu.length > 0 ? missionTextRu : missionText,
  };
}

export function useAboutPage(): { about: AboutPage; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["aboutPage"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawAboutPage | null>(ABOUT_QUERY);
      } catch {
        return null;
      }
    },
  });
  return { about: mergeAbout(data ?? null), isLoading };
}

// ─── Team members ─────────────────────────────────────────────────────

export interface TeamMember {
  _id: string;
  name: string;
  nameRu?: string;
  role: string;
  roleRu?: string;
  bio: string;
  bioRu?: string;
  photoUrl?: string;
  initials: string;
  order: number;
}

const TEAM_FALLBACK: TeamMember[] = [
  {
    _id: "team.jacken-holland",
    name: "Jacken Holland",
    role: "Founder & CEO",
    roleRu: "Основатель и CEO",
    bio: "Jacken was born in Haiti and abandoned at birth. He spent three and a half years in an orphanage where survival -- not care -- was the daily reality. Adopted by an American family, he came to the United States knowing nothing of the language, culture, or world outside Haiti. He earned an Integrated Business degree from the University of Central Florida, traveled to nine countries, and saw the same gap everywhere: people with ambition but no access to financial training. At 23, he founded Businesses Beyond Borders and moved to Kyrgyzstan with a backpack to build it from the ground up.",
    bioRu:
      "Джакен родился на Гаити и был брошен при рождении. Три с половиной года он провёл в приюте, где речь шла о выживании, а не о заботе. Усыновлённый американской семьёй, он приехал в США, не зная ни языка, ни культуры, ни мира за пределами Гаити. Он получил степень в области бизнеса в Университете Центральной Флориды, побывал в девяти странах и везде видел одно и то же: люди с амбициями, но без доступа к финансовому образованию. В 23 года он основал Businesses Beyond Borders и переехал в Кыргызстан с рюкзаком, чтобы строить организацию с нуля.",
    photoUrl: "/photo-1581092795360-fd1ca04f0952",
    initials: "JH",
    order: 10,
  },
  {
    _id: "team.yeva-romanova",
    name: "Yeva Romanova",
    role: "Co-Founder & COO",
    roleRu: "Сооснователь и COO",
    bio: "Born in Kyrgyzstan. Eight years at a DC accounting firm serving nonprofits. Five years building microloan programs on the ground while working remotely across two time zones. Yeva brings the cultural roots, the financial expertise, and the on-the-ground relationships that make BBB's programs actually work.",
    bioRu:
      "Родившись в Кыргызстане, Йева Романова на собственном опыте пережила экономическую нестабильность постсоветской Центральной Азии, прежде чем эмигрировала в США. В каждую программу BBB она привносит непосредственное знание культуры, опыт работы в политических кругах Вашингтона и глубокое понимание проблем, с которыми сталкиваются общины Центральной Азии.",
    photoUrl: "/photo-1581091226825-a6a2a5aee158",
    initials: "YR",
    order: 20,
  },
];

const TEAM_QUERY = /* groq */ `
  *[_type == "teamMember" && active == true] | order(order asc){
    _id,
    name,
    nameRu,
    role,
    roleRu,
    bio,
    bioRu,
    "photo": photo{..., "alt": alt},
    initials,
    order
  }
`;

interface RawTeamMember {
  _id: string;
  name?: string;
  nameRu?: string;
  role?: string;
  roleRu?: string;
  bio?: string;
  bioRu?: string;
  photo?: { asset?: { _ref: string } } | null;
  initials?: string;
  order?: number;
}

function shapeMember(raw: RawTeamMember): TeamMember {
  return {
    _id: raw._id,
    name: raw.name || "",
    nameRu: raw.nameRu,
    role: raw.role || "",
    roleRu: raw.roleRu,
    bio: raw.bio || "",
    bioRu: raw.bioRu,
    photoUrl: raw.photo?.asset ? imageUrl(raw.photo as any, 600) : undefined,
    initials: raw.initials || "?",
    order: raw.order ?? 99,
  };
}

export function useTeamMembers(): { members: TeamMember[]; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["teamMembers"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawTeamMember[]>(TEAM_QUERY);
      } catch {
        return null;
      }
    },
  });
  if (data && data.length > 0) {
    return { members: data.map(shapeMember), isLoading };
  }
  return { members: TEAM_FALLBACK, isLoading };
}

/** Localize a list of team members for display. */
export function localizeTeam(members: TeamMember[], isCentralAsia: boolean) {
  return members.map((m) => ({
    ...m,
    name: getLocalized(m.name, m.nameRu, isCentralAsia),
    role: getLocalized(m.role, m.roleRu, isCentralAsia),
    bio: getLocalized(m.bio, m.bioRu, isCentralAsia),
  }));
}
