/**
 * Seed the `getInvolvedPage` singleton with the bilingual copy that was
 * previously hardcoded in `src/pages/GetInvolved.tsx`. Captures every
 * editable string on the page:
 *
 *   - Hero (heading, subheading, three CTA labels)
 *   - "For Participants" section: eyebrow, heading, intro, 4 stage cards,
 *     "live classes coming soon" callout
 *   - "For Volunteers" section: eyebrow, heading, intro, 3 feature cards,
 *     apply CTA
 *   - "For Donors" section: eyebrow, heading, intro, 3 donor tiers,
 *     "why different" callout, donate CTA + tax note, partnerships block
 *     (heading, body, 3 options, partner CTA)
 *   - Section headings (success stories, FAQ + contact prompt)
 *   - Bottom CTA banner (heading, subheading, three CTA buttons, tagline)
 *
 * Idempotent — uses createOrReplace with _id="getInvolvedPage". Every
 * array item gets a stable `_key`.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:get-involved
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error(
    "\n❌ Missing SANITY_WRITE_TOKEN. Get one at https://sanity.io/manage and run:\n" +
      "   SANITY_WRITE_TOKEN=<token> npm run migrate:get-involved\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function main() {
  console.log("\nSeeding getInvolvedPage singleton...\n");

  await client.createOrReplace({
    _id: "getInvolvedPage",
    _type: "getInvolvedPage",

    // ── Hero ────────────────────────────────────────────────────────────────
    heroHeading: "Find Your Way In",
    heroHeadingRu: "Найди свой путь",
    heroSubheading:
      "Whether you want to start building something yourself or help someone else get their chance -- there's a place for you here.",
    heroSubheadingRu:
      "Бесплатное обучение финансовой грамотности и создание бизнеса. Начните путь к финансовой свободе прямо сейчас.",
    heroParticipantCtaLabel: "I Want to Learn & Build",
    heroParticipantCtaLabelRu: "Хочу учиться",
    heroDonorCtaLabel: "I Want to Give",
    heroDonorCtaLabelRu: "Хочу поддержать",
    heroVolunteerCtaLabel: "I Want to Volunteer",
    heroVolunteerCtaLabelRu: "Хочу быть волонтёром",

    // ── For Participants ────────────────────────────────────────────────────
    participantsEyebrow: "FOR PARTICIPANTS",
    participantsEyebrowRu: "ДЛЯ УЧАСТНИКОВ",
    participantsHeading: "What BBB Offers -- and What It Asks",
    participantsHeadingRu: "Что предлагает BBB — и что требует",
    participantsIntroParagraphs: [
      "BBB is not a handout. It's not a single class you sit through and forget. It's a four-stage path from \"I don't know where to start\" to \"I built this myself.\" Every stage is free or funded. Every stage is earned.",
      "If you're someone who has been told -- by your situation, your community, or your own experience -- that there's nothing here for you, this is for you. But you have to be willing to do the work. The people who show up consistently are the ones who move forward.",
    ],
    participantsIntroParagraphsRu: [
      "BBB -- это не помощь, которую можно просто получить. Это четырёхэтапный путь от «я не знаю, с чего начать» до «я это построил сам». Каждый этап бесплатный. Каждый этап нужно заслужить.",
      "Если вам говорили -- словами или обстоятельствами -- что для вас здесь ничего нет, это как раз для вас. Но нужно быть готовым работать. Те, кто приходит стабильно, двигаются вперёд.",
    ],
    participantStages: [
      {
        _key: "stage-financial-literacy",
        _type: "participantStage",
        stageNumber: "1",
        stageLabel: "ACTIVATE",
        stageLabelRu: "АКТИВАЦИЯ",
        circleColor: "navy",
        title: "Start with the Free Financial Literacy Course",
        titleRu: "Бесплатный курс финансовой грамотности",
        description:
          "No application. No fee. Learn real-world budgeting, saving, debt management, and financial planning. Available in 6-week and 10-week formats. This is where everyone begins -- and where you prove to yourself that you can follow through.",
        descriptionRu:
          "Без заявки. Без оплаты. Научитесь составлять бюджет, копить, управлять долгами и планировать будущее. Курс доступен в форматах 6 и 10 недель. Это начало пути — и здесь вы доказываете себе, что можете идти до конца.",
        ctaLabel: "Start the Free Course",
        ctaLabelRu: "Начать бесплатный курс",
        ctaUrl: "/programs/financial-literacy",
        hideForCentralAsia: false,
      },
      {
        _key: "stage-business-creation",
        _type: "participantStage",
        stageNumber: "2",
        stageLabel: "EQUIP",
        stageLabelRu: "ПОДГОТОВКА",
        circleColor: "gold",
        title: "Business Creation Training",
        titleRu: "Обучение созданию бизнеса",
        description:
          "For those who complete the financial literacy course and want to go further. Twelve weeks of hands-on business planning, market research, and launch preparation. You'll work with a mentor who has built something real.",
        descriptionRu:
          "Для тех, кто завершил курс финансовой грамотности и готов идти дальше. Двенадцать недель практического обучения: бизнес-планирование, исследование рынка и подготовка к запуску. Работа с наставником, который сам построил бизнес.",
        hideForCentralAsia: false,
      },
      {
        _key: "stage-startup-capital",
        _type: "participantStage",
        stageNumber: "3",
        stageLabel: "EMPOWER",
        stageLabelRu: "ЗАПУСК",
        circleColor: "navy",
        title: "Startup Capital",
        titleRu: "Стартовый капитал",
        description:
          "Not a grant. Not charity. A real investment in someone who has completed the training, built a viable plan, and proven they're ready. This is the moment where months of work becomes a real business.",
        descriptionRu:
          "Не грант. Не благотворительность. Реальная инвестиция в человека, который прошёл обучение, построил жизнеспособный план и доказал свою готовность. Это момент, когда месяцы работы превращаются в настоящий бизнес.",
        hideForCentralAsia: true,
      },
      {
        _key: "stage-multiply",
        _type: "participantStage",
        stageNumber: "4",
        stageNumberCentralAsia: "3",
        stageLabel: "MULTIPLY",
        stageLabelRu: "УМНОЖЕНИЕ",
        circleColor: "gold",
        title: "Teach, Mentor, Lead",
        titleRu: "Обучай, наставляй, веди",
        description:
          "Graduates are trained to facilitate courses, mentor new participants, and lead in their communities. You stop being someone who received help and become someone who gives it. That's the whole point.",
        descriptionRu:
          "Выпускники обучаются проводить курсы, наставлять новых участников и быть лидерами в своих сообществах. Вы перестаёте быть тем, кто получает помощь, и становитесь тем, кто её даёт. В этом весь смысл.",
        hideForCentralAsia: false,
      },
    ],

    liveClassesHeading: "Live Online Classes Coming Soon",
    liveClassesHeadingRu: "Скоро: онлайн-занятия в прямом эфире",
    liveClassesBody:
      "We're building live group sessions so you can join from anywhere with an internet connection. Be the first to know.",
    liveClassesBodyRu:
      "Мы запускаем живые онлайн-занятия, чтобы вы могли присоединиться из любой точки. Подпишитесь, чтобы узнать первыми.",
    liveClassesCtaLabel: "Get Notified When Registration Opens",
    liveClassesCtaLabelRu: "Узнать о старте занятий",
    liveClassesCtaUrl: "/newsletter",

    // ── For Volunteers ──────────────────────────────────────────────────────
    volunteersEyebrow: "FOR VOLUNTEERS",
    volunteersEyebrowRu: "ДЛЯ ВОЛОНТЁРОВ",
    volunteersHeading: "Give Your Time and Skills",
    volunteersHeadingRu: "Поделитесь своим временем и навыками",
    volunteersIntro:
      "You don't have to write a check to make a difference. Volunteers are the people who make our programs run -- mentoring entrepreneurs, facilitating courses, organizing events, and sharing their professional skills.",
    volunteersIntroRu:
      "Вы можете помочь другим пройти тот же путь. Волонтёры -- это наставники, фасилитаторы, организаторы и специалисты, которые делятся своим опытом и временем.",
    volunteerFeatures: [
      {
        _key: "feature-flexible",
        _type: "volunteerFeature",
        icon: "Clock",
        circleColor: "navy",
        title: "Flexible Commitment",
        titleRu: "Гибкий график",
        description:
          "From 2 hours a week to project-based roles. We'll match you to what fits your schedule.",
        descriptionRu:
          "От 2 часов в неделю. Подберём роль под ваше расписание.",
      },
      {
        _key: "feature-remote",
        _type: "volunteerFeature",
        icon: "Laptop",
        circleColor: "gold",
        title: "Remote-Friendly",
        titleRu: "Удалённая работа",
        description:
          "Most roles can be done from anywhere. Mentor an entrepreneur in Kyrgyzstan from your living room.",
        descriptionRu:
          "Большинство ролей доступны онлайн. Помогайте из любой точки мира.",
      },
      {
        _key: "feature-training",
        _type: "volunteerFeature",
        icon: "Users",
        circleColor: "navy",
        title: "Training Provided",
        titleRu: "Обучение",
        description:
          "We'll equip you with everything you need. Come with willingness -- we'll provide the rest.",
        descriptionRu:
          "Мы обучим вас всему необходимому. Приходите с желанием помочь -- остальное дадим мы.",
      },
    ],
    volunteerApplyCtaLabel: "Apply to Volunteer",
    volunteerApplyCtaLabelRu: "Подать заявку волонтёра",
    volunteerApplyCtaUrl: "/volunteer-application",

    // ── For Donors ──────────────────────────────────────────────────────────
    donorsEyebrow: "FOR DONORS & PARTNERS",
    donorsEyebrowRu: "ДЛЯ ДОНОРОВ И ПАРТНЁРОВ",
    donorsHeading: "Where Your Money Actually Goes",
    donorsHeadingRu: "Куда идут ваши деньги",
    donorsIntroParagraphs: [
      "Most nonprofit donation pages tell you your gift \"makes a difference.\" Here's what yours actually does.",
      "BBB operates a four-stage model. Every person who receives startup capital has already completed months of training and planning. By the time your money reaches them, they've earned it. That's why it works. That's what makes this different from writing a check and hoping for the best.",
    ],
    donorsIntroParagraphsRu: [
      "Большинство некоммерческих организаций говорят, что ваше пожертвование «делает разницу». Вот что конкретно делает ваше.",
      "BBB работает по четырёхэтапной модели. Каждый, кто получает стартовый капитал, уже прошёл месяцы обучения и планирования. К моменту, когда ваши деньги до него дойдут, он их заслужил. Именно поэтому это работает. Именно этим мы отличаемся от «выпишите чек и надейтесь на лучшее».",
    ],
    donorTiers: [
      {
        _key: "tier-150",
        _type: "donorTier",
        amount: "$150",
        name: "Operations & Support",
        nameRu: "Операционная поддержка",
        description:
          "One month of program operations -- maintaining systems, supporting families in training, keeping the lights on so the work continues.",
        descriptionRu:
          "Один месяц работы программы -- поддержка систем, сопровождение семей в обучении, обеспечение непрерывности работы.",
      },
      {
        _key: "tier-400",
        _type: "donorTier",
        amount: "$400",
        name: "Train a Local Facilitator",
        nameRu: "Обучение фасилитатора",
        description:
          "Sponsors three months of training for one local facilitator in Central Asia -- someone who goes on to teach 20+ entrepreneurs.",
        descriptionRu:
          "Три месяца обучения одного местного фасилитатора в Центральной Азии -- человека, который затем обучит более 20 предпринимателей.",
      },
      {
        _key: "tier-2000-5000",
        _type: "donorTier",
        amount: "$2,000-$5,000",
        amountRu: "$2 000–$5 000",
        name: "Launch a Business",
        nameRu: "Запуск бизнеса",
        description:
          "Startup capital for one graduate who completed the full journey. A real investment in a real person. Tracked to real outcomes.",
        descriptionRu:
          "Стартовый капитал для одного выпускника, прошедшего весь путь. Реальная инвестиция в реального человека. С отслеживанием результатов.",
      },
    ],
    donorsDifferenceHeading:
      "Why This Isn't Like Other Places You Could Give",
    donorsDifferenceHeadingRu: "Почему это не похоже на другие организации",
    donorsDifferenceParagraphs: [
      "Most organizations fund anyone who applies. BBB funds people who finish. That one difference changes everything.",
      "When you give to BBB, you're not hoping your money will help. You're investing in someone who has already spent months proving -- through consistent attendance, completed coursework, and a validated business plan -- that they will use it well.",
      "And every graduate is trained to teach others. One person you fund becomes the person who gives ten more people their first chance. That's not marketing language. That's the actual model.",
    ],
    donorsDifferenceParagraphsRu: [
      "Большинство организаций финансируют всех, кто подаёт заявку. BBB финансирует тех, кто дошёл до конца. Это одно отличие меняет всё.",
      "Когда вы жертвуете в BBB, вы не надеетесь, что деньги помогут. Вы инвестируете в человека, который уже месяцами доказывал -- стабильным посещением, выполненными заданиями и проверенным бизнес-планом -- что он использует их правильно.",
      "И каждый выпускник обучается учить других. Один человек, которого вы поддержали, становится тем, кто даёт шанс ещё десяти. Это не маркетинговый ход. Это и есть модель.",
    ],
    donateCtaLabel: "Donate Now",
    donateCtaLabelRu: "Пожертвовать",
    donateTaxNote:
      "501(c)(3) tax-deductible -- you'll receive a receipt for your records.",
    donateTaxNoteRu:
      "501(c)(3) -- пожертвования не облагаются налогом. Вы получите квитанцию.",

    partnerHeading: "Organizational Partnerships",
    partnerHeadingRu: "Партнёрство с организациями",
    partnerBody:
      "If your company, foundation, or organization wants to make a larger commitment -- sponsoring a cohort, funding a regional expansion, or providing skilled volunteers -- we'd like to talk.",
    partnerBodyRu:
      "Если ваша компания, фонд или организация хочет сделать более крупный вклад -- спонсировать когорту, профинансировать региональное расширение или предоставить квалифицированных волонтёров -- мы хотим поговорить.",
    partnerOptions: [
      {
        _key: "partner-corporate",
        _type: "partnerOption",
        title: "Corporate Giving",
        titleRu: "Корпоративные пожертвования",
        description:
          "Matching gifts, program sponsorships, employee giving campaigns.",
        descriptionRu:
          "Совпадающие пожертвования, спонсорство программ, корпоративные благотворительные кампании.",
      },
      {
        _key: "partner-skills",
        _type: "partnerOption",
        title: "Skills-Based Volunteering",
        titleRu: "Профессиональное волонтёрство",
        description:
          "Your team's business expertise directly mentoring entrepreneurs.",
        descriptionRu:
          "Бизнес-экспертиза вашей команды напрямую наставляет предпринимателей.",
      },
      {
        _key: "partner-strategic",
        _type: "partnerOption",
        title: "Strategic Partnership",
        titleRu: "Стратегическое партнёрство",
        description:
          "Joint programs, resource sharing, regional expansion support.",
        descriptionRu:
          "Совместные программы, обмен ресурсами, поддержка регионального расширения.",
      },
    ],
    partnerCtaLabel: "Start a Partnership Conversation",
    partnerCtaLabelRu: "Начать разговор о партнёрстве",
    partnerCtaUrl: "/partner-application",

    // ── Section headings ────────────────────────────────────────────────────
    successStoriesHeading: "People Who Walked This Path",
    successStoriesHeadingRu: "Люди, прошедшие этот путь",
    faqHeading: "Common Questions",
    faqHeadingRu: "Частые вопросы",
    faqContactPrompt: "Don't see your question?",
    faqContactPromptRu: "Не нашли ответ?",
    faqContactCtaLabel: "Contact Us",
    faqContactCtaLabelRu: "Связаться с нами",

    // ── Bottom CTA ──────────────────────────────────────────────────────────
    bottomCtaHeading: "Hope That Builds.",
    bottomCtaHeadingRu: "Надежда, которая строит.",
    bottomCtaSubheading:
      "Every person who starts the course, completes the training, and launches a business becomes the proof that where they are is not hopeless. And then they turn around and show someone else the same thing.",
    bottomCtaSubheadingRu:
      "Каждый человек, который начинает курс, завершает обучение и запускает бизнес, становится доказательством того, что всё возможно. А потом он показывает это другим.",
    bottomCtaParticipantLabel: "Start the Free Course",
    bottomCtaParticipantLabelRu: "Начать бесплатный курс",
    bottomCtaParticipantUrl: "/programs/financial-literacy",
    bottomCtaDonorLabel: "Give Someone Their Chance",
    bottomCtaDonorLabelRu: "Дайте кому-то шанс",
    bottomCtaVolunteerLabel: "Volunteer With Us",
    bottomCtaVolunteerLabelRu: "Стать волонтёром",
    bottomCtaVolunteerUrl: "/volunteer-application",
    bottomCtaTagline: "Based in Port Orange, Florida. Working in Central Asia.",
    bottomCtaTaglineRu:
      "Штаб-квартира в Порт-Оранж, Флорида. Работаем в Центральной Азии.",
  });

  console.log(
    "Done. Visit https://bbborders.sanity.studio/structure/getInvolvedPage to verify.\n"
  );
}

main().catch((err) => {
  console.error("\nMigration crashed:", err);
  process.exit(1);
});
