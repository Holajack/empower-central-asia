/**
 * /get-involved page-specific Sanity content (singleton).
 *
 * Owns every editable string on the page:
 *   - Hero (heading, subheading, three CTA labels)
 *   - "For Participants" section: eyebrow, heading, intro paragraphs,
 *     four stage cards (the four-stage path), "live classes" callout
 *   - "For Volunteers" section: eyebrow, heading, intro, three feature
 *     cards (Flexible / Remote / Training), apply CTA
 *   - "For Donors" (US only): eyebrow, heading, intro paragraphs, three
 *     donor tiers, "why different" callout, donate CTA + tax note,
 *     corporate partnerships block
 *   - Section headings (Success Stories, FAQ + contact prompt)
 *   - Bottom CTA banner (heading, subheading, three CTA buttons,
 *     tagline)
 *
 * Does NOT own:
 *   - Volunteer-role preview cards (live in volunteerOpportunity docs,
 *     fetched via useVolunteerOpportunities — already wired)
 *   - FAQ items (live in faqItem docs, fetched via useFaqItems —
 *     already wired)
 *   - Testimonials (live in testimonial docs, fetched via
 *     useTestimonials — already wired)
 *   - Contact email / phone (live in siteSettings)
 *
 * Hardcoded fallbacks mirror the bilingual copy that GetInvolved.tsx
 * used before CMS wiring, so the page never breaks if Sanity is
 * unreachable or the singleton hasn't been seeded yet.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized, getLocalizedArray } from "@/lib/localized";

// ── Types ─────────────────────────────────────────────────────────────────────

/** Color choice for circle backgrounds (stages and feature cards). */
export type CircleColor = "navy" | "gold";

export interface ParticipantStage {
  stageNumber: string;
  /** Displayed for Central Asia visitors. Falls back to stageNumber. */
  stageNumberCentralAsia?: string;
  stageLabel: string;
  stageLabelRu?: string;
  circleColor: CircleColor;
  title: string;
  titleRu?: string;
  description: string;
  descriptionRu?: string;
  ctaLabel?: string;
  ctaLabelRu?: string;
  ctaUrl?: string;
  hideForCentralAsia: boolean;
}

export interface VolunteerFeature {
  icon: string;
  circleColor: CircleColor;
  title: string;
  titleRu?: string;
  description: string;
  descriptionRu?: string;
}

export interface DonorTier {
  amount: string;
  amountRu?: string;
  name: string;
  nameRu?: string;
  description: string;
  descriptionRu?: string;
}

export interface PartnerOption {
  title: string;
  titleRu?: string;
  description: string;
  descriptionRu?: string;
}

export interface GetInvolvedPageData {
  // Hero
  heroHeading: string;
  heroHeadingRu?: string;
  heroSubheading: string;
  heroSubheadingRu?: string;
  heroParticipantCtaLabel: string;
  heroParticipantCtaLabelRu?: string;
  heroDonorCtaLabel: string;
  heroDonorCtaLabelRu?: string;
  heroVolunteerCtaLabel: string;
  heroVolunteerCtaLabelRu?: string;

  // Participants
  participantsEyebrow: string;
  participantsEyebrowRu?: string;
  participantsHeading: string;
  participantsHeadingRu?: string;
  participantsIntroParagraphs: string[];
  participantsIntroParagraphsRu: string[];
  participantStages: ParticipantStage[];
  liveClassesHeading: string;
  liveClassesHeadingRu?: string;
  liveClassesBody: string;
  liveClassesBodyRu?: string;
  liveClassesCtaLabel: string;
  liveClassesCtaLabelRu?: string;
  liveClassesCtaUrl: string;

  // Volunteers
  volunteersEyebrow: string;
  volunteersEyebrowRu?: string;
  volunteersHeading: string;
  volunteersHeadingRu?: string;
  volunteersIntro: string;
  volunteersIntroRu?: string;
  volunteerFeatures: VolunteerFeature[];
  volunteerApplyCtaLabel: string;
  volunteerApplyCtaLabelRu?: string;
  volunteerApplyCtaUrl: string;

  // Donors (US only)
  donorsEyebrow: string;
  donorsEyebrowRu?: string;
  donorsHeading: string;
  donorsHeadingRu?: string;
  donorsIntroParagraphs: string[];
  donorsIntroParagraphsRu: string[];
  donorTiers: DonorTier[];
  donorsDifferenceHeading: string;
  donorsDifferenceHeadingRu?: string;
  donorsDifferenceParagraphs: string[];
  donorsDifferenceParagraphsRu: string[];
  donateCtaLabel: string;
  donateCtaLabelRu?: string;
  donateTaxNote: string;
  donateTaxNoteRu?: string;
  partnerHeading: string;
  partnerHeadingRu?: string;
  partnerBody: string;
  partnerBodyRu?: string;
  partnerOptions: PartnerOption[];
  partnerCtaLabel: string;
  partnerCtaLabelRu?: string;
  partnerCtaUrl: string;

  // Section headings
  successStoriesHeading: string;
  successStoriesHeadingRu?: string;
  faqHeading: string;
  faqHeadingRu?: string;
  faqContactPrompt: string;
  faqContactPromptRu?: string;
  faqContactCtaLabel: string;
  faqContactCtaLabelRu?: string;

  // Bottom CTA
  bottomCtaHeading: string;
  bottomCtaHeadingRu?: string;
  bottomCtaSubheading: string;
  bottomCtaSubheadingRu?: string;
  bottomCtaParticipantLabel: string;
  bottomCtaParticipantLabelRu?: string;
  bottomCtaParticipantUrl: string;
  bottomCtaDonorLabel: string;
  bottomCtaDonorLabelRu?: string;
  bottomCtaVolunteerLabel: string;
  bottomCtaVolunteerLabelRu?: string;
  bottomCtaVolunteerUrl: string;
  bottomCtaTagline: string;
  bottomCtaTaglineRu?: string;
}

// ── Fallbacks (mirror the previously-hardcoded copy in GetInvolved.tsx) ──────

const FALLBACK_PARTICIPANT_STAGES: ParticipantStage[] = [
  {
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
];

const FALLBACK_VOLUNTEER_FEATURES: VolunteerFeature[] = [
  {
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
    icon: "Users",
    circleColor: "navy",
    title: "Training Provided",
    titleRu: "Обучение",
    description:
      "We'll equip you with everything you need. Come with willingness -- we'll provide the rest.",
    descriptionRu:
      "Мы обучим вас всему необходимому. Приходите с желанием помочь -- остальное дадим мы.",
  },
];

const FALLBACK_DONOR_TIERS: DonorTier[] = [
  {
    amount: "$150",
    name: "Operations & Support",
    nameRu: "Операционная поддержка",
    description:
      "One month of program operations -- maintaining systems, supporting families in training, keeping the lights on so the work continues.",
    descriptionRu:
      "Один месяц работы программы -- поддержка систем, сопровождение семей в обучении, обеспечение непрерывности работы.",
  },
  {
    amount: "$400",
    name: "Train a Local Facilitator",
    nameRu: "Обучение фасилитатора",
    description:
      "Sponsors three months of training for one local facilitator in Central Asia -- someone who goes on to teach 20+ entrepreneurs.",
    descriptionRu:
      "Три месяца обучения одного местного фасилитатора в Центральной Азии -- человека, который затем обучит более 20 предпринимателей.",
  },
  {
    amount: "$2,000-$5,000",
    amountRu: "$2 000–$5 000",
    name: "Launch a Business",
    nameRu: "Запуск бизнеса",
    description:
      "Startup capital for one graduate who completed the full journey. A real investment in a real person. Tracked to real outcomes.",
    descriptionRu:
      "Стартовый капитал для одного выпускника, прошедшего весь путь. Реальная инвестиция в реального человека. С отслеживанием результатов.",
  },
];

const FALLBACK_PARTNER_OPTIONS: PartnerOption[] = [
  {
    title: "Corporate Giving",
    titleRu: "Корпоративные пожертвования",
    description:
      "Matching gifts, program sponsorships, employee giving campaigns.",
    descriptionRu:
      "Совпадающие пожертвования, спонсорство программ, корпоративные благотворительные кампании.",
  },
  {
    title: "Skills-Based Volunteering",
    titleRu: "Профессиональное волонтёрство",
    description:
      "Your team's business expertise directly mentoring entrepreneurs.",
    descriptionRu:
      "Бизнес-экспертиза вашей команды напрямую наставляет предпринимателей.",
  },
  {
    title: "Strategic Partnership",
    titleRu: "Стратегическое партнёрство",
    description:
      "Joint programs, resource sharing, regional expansion support.",
    descriptionRu:
      "Совместные программы, обмен ресурсами, поддержка регионального расширения.",
  },
];

const FALLBACK: GetInvolvedPageData = {
  // Hero
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

  // Participants
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
  participantStages: FALLBACK_PARTICIPANT_STAGES,
  liveClassesHeading: "Live Online Classes Coming Soon",
  liveClassesHeadingRu: "Скоро: онлайн-занятия в прямом эфире",
  liveClassesBody:
    "We're building live group sessions so you can join from anywhere with an internet connection. Be the first to know.",
  liveClassesBodyRu:
    "Мы запускаем живые онлайн-занятия, чтобы вы могли присоединиться из любой точки. Подпишитесь, чтобы узнать первыми.",
  liveClassesCtaLabel: "Get Notified When Registration Opens",
  liveClassesCtaLabelRu: "Узнать о старте занятий",
  liveClassesCtaUrl: "/newsletter",

  // Volunteers
  volunteersEyebrow: "FOR VOLUNTEERS",
  volunteersEyebrowRu: "ДЛЯ ВОЛОНТЁРОВ",
  volunteersHeading: "Give Your Time and Skills",
  volunteersHeadingRu: "Поделитесь своим временем и навыками",
  volunteersIntro:
    "You don't have to write a check to make a difference. Volunteers are the people who make our programs run -- mentoring entrepreneurs, facilitating courses, organizing events, and sharing their professional skills.",
  volunteersIntroRu:
    "Вы можете помочь другим пройти тот же путь. Волонтёры -- это наставники, фасилитаторы, организаторы и специалисты, которые делятся своим опытом и временем.",
  volunteerFeatures: FALLBACK_VOLUNTEER_FEATURES,
  volunteerApplyCtaLabel: "Apply to Volunteer",
  volunteerApplyCtaLabelRu: "Подать заявку волонтёра",
  volunteerApplyCtaUrl: "/volunteer-application",

  // Donors
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
  donorTiers: FALLBACK_DONOR_TIERS,
  donorsDifferenceHeading: "Why This Isn't Like Other Places You Could Give",
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
  partnerOptions: FALLBACK_PARTNER_OPTIONS,
  partnerCtaLabel: "Start a Partnership Conversation",
  partnerCtaLabelRu: "Начать разговор о партнёрстве",
  partnerCtaUrl: "/partner-application",

  // Section headings
  successStoriesHeading: "People Who Walked This Path",
  successStoriesHeadingRu: "Люди, прошедшие этот путь",
  faqHeading: "Common Questions",
  faqHeadingRu: "Частые вопросы",
  faqContactPrompt: "Don't see your question?",
  faqContactPromptRu: "Не нашли ответ?",
  faqContactCtaLabel: "Contact Us",
  faqContactCtaLabelRu: "Связаться с нами",

  // Bottom CTA
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
  bottomCtaTagline:
    "Based in Port Orange, Florida. Working in Central Asia.",
  bottomCtaTaglineRu:
    "Штаб-квартира в Порт-Оранж, Флорида. Работаем в Центральной Азии.",
};

// ── GROQ ──────────────────────────────────────────────────────────────────────

const GET_INVOLVED_PAGE_QUERY = /* groq */ `
  *[_id == "getInvolvedPage"][0]{
    heroHeading,
    heroHeadingRu,
    heroSubheading,
    heroSubheadingRu,
    heroParticipantCtaLabel,
    heroParticipantCtaLabelRu,
    heroDonorCtaLabel,
    heroDonorCtaLabelRu,
    heroVolunteerCtaLabel,
    heroVolunteerCtaLabelRu,

    participantsEyebrow,
    participantsEyebrowRu,
    participantsHeading,
    participantsHeadingRu,
    participantsIntroParagraphs,
    participantsIntroParagraphsRu,
    participantStages[]{
      stageNumber,
      stageNumberCentralAsia,
      stageLabel,
      stageLabelRu,
      circleColor,
      title,
      titleRu,
      description,
      descriptionRu,
      ctaLabel,
      ctaLabelRu,
      ctaUrl,
      hideForCentralAsia
    },
    liveClassesHeading,
    liveClassesHeadingRu,
    liveClassesBody,
    liveClassesBodyRu,
    liveClassesCtaLabel,
    liveClassesCtaLabelRu,
    liveClassesCtaUrl,

    volunteersEyebrow,
    volunteersEyebrowRu,
    volunteersHeading,
    volunteersHeadingRu,
    volunteersIntro,
    volunteersIntroRu,
    volunteerFeatures[]{
      icon,
      circleColor,
      title,
      titleRu,
      description,
      descriptionRu
    },
    volunteerApplyCtaLabel,
    volunteerApplyCtaLabelRu,
    volunteerApplyCtaUrl,

    donorsEyebrow,
    donorsEyebrowRu,
    donorsHeading,
    donorsHeadingRu,
    donorsIntroParagraphs,
    donorsIntroParagraphsRu,
    donorTiers[]{
      amount,
      amountRu,
      name,
      nameRu,
      description,
      descriptionRu
    },
    donorsDifferenceHeading,
    donorsDifferenceHeadingRu,
    donorsDifferenceParagraphs,
    donorsDifferenceParagraphsRu,
    donateCtaLabel,
    donateCtaLabelRu,
    donateTaxNote,
    donateTaxNoteRu,
    partnerHeading,
    partnerHeadingRu,
    partnerBody,
    partnerBodyRu,
    partnerOptions[]{
      title,
      titleRu,
      description,
      descriptionRu
    },
    partnerCtaLabel,
    partnerCtaLabelRu,
    partnerCtaUrl,

    successStoriesHeading,
    successStoriesHeadingRu,
    faqHeading,
    faqHeadingRu,
    faqContactPrompt,
    faqContactPromptRu,
    faqContactCtaLabel,
    faqContactCtaLabelRu,

    bottomCtaHeading,
    bottomCtaHeadingRu,
    bottomCtaSubheading,
    bottomCtaSubheadingRu,
    bottomCtaParticipantLabel,
    bottomCtaParticipantLabelRu,
    bottomCtaParticipantUrl,
    bottomCtaDonorLabel,
    bottomCtaDonorLabelRu,
    bottomCtaVolunteerLabel,
    bottomCtaVolunteerLabelRu,
    bottomCtaVolunteerUrl,
    bottomCtaTagline,
    bottomCtaTaglineRu
  }
`;

interface RawParticipantStage {
  stageNumber?: string;
  stageNumberCentralAsia?: string;
  stageLabel?: string;
  stageLabelRu?: string;
  circleColor?: string;
  title?: string;
  titleRu?: string;
  description?: string;
  descriptionRu?: string;
  ctaLabel?: string;
  ctaLabelRu?: string;
  ctaUrl?: string;
  hideForCentralAsia?: boolean;
}

interface RawVolunteerFeature {
  icon?: string;
  circleColor?: string;
  title?: string;
  titleRu?: string;
  description?: string;
  descriptionRu?: string;
}

interface RawDonorTier {
  amount?: string;
  amountRu?: string;
  name?: string;
  nameRu?: string;
  description?: string;
  descriptionRu?: string;
}

interface RawPartnerOption {
  title?: string;
  titleRu?: string;
  description?: string;
  descriptionRu?: string;
}

interface RawGetInvolvedPage {
  heroHeading?: string;
  heroHeadingRu?: string;
  heroSubheading?: string;
  heroSubheadingRu?: string;
  heroParticipantCtaLabel?: string;
  heroParticipantCtaLabelRu?: string;
  heroDonorCtaLabel?: string;
  heroDonorCtaLabelRu?: string;
  heroVolunteerCtaLabel?: string;
  heroVolunteerCtaLabelRu?: string;

  participantsEyebrow?: string;
  participantsEyebrowRu?: string;
  participantsHeading?: string;
  participantsHeadingRu?: string;
  participantsIntroParagraphs?: string[];
  participantsIntroParagraphsRu?: string[];
  participantStages?: RawParticipantStage[];
  liveClassesHeading?: string;
  liveClassesHeadingRu?: string;
  liveClassesBody?: string;
  liveClassesBodyRu?: string;
  liveClassesCtaLabel?: string;
  liveClassesCtaLabelRu?: string;
  liveClassesCtaUrl?: string;

  volunteersEyebrow?: string;
  volunteersEyebrowRu?: string;
  volunteersHeading?: string;
  volunteersHeadingRu?: string;
  volunteersIntro?: string;
  volunteersIntroRu?: string;
  volunteerFeatures?: RawVolunteerFeature[];
  volunteerApplyCtaLabel?: string;
  volunteerApplyCtaLabelRu?: string;
  volunteerApplyCtaUrl?: string;

  donorsEyebrow?: string;
  donorsEyebrowRu?: string;
  donorsHeading?: string;
  donorsHeadingRu?: string;
  donorsIntroParagraphs?: string[];
  donorsIntroParagraphsRu?: string[];
  donorTiers?: RawDonorTier[];
  donorsDifferenceHeading?: string;
  donorsDifferenceHeadingRu?: string;
  donorsDifferenceParagraphs?: string[];
  donorsDifferenceParagraphsRu?: string[];
  donateCtaLabel?: string;
  donateCtaLabelRu?: string;
  donateTaxNote?: string;
  donateTaxNoteRu?: string;
  partnerHeading?: string;
  partnerHeadingRu?: string;
  partnerBody?: string;
  partnerBodyRu?: string;
  partnerOptions?: RawPartnerOption[];
  partnerCtaLabel?: string;
  partnerCtaLabelRu?: string;
  partnerCtaUrl?: string;

  successStoriesHeading?: string;
  successStoriesHeadingRu?: string;
  faqHeading?: string;
  faqHeadingRu?: string;
  faqContactPrompt?: string;
  faqContactPromptRu?: string;
  faqContactCtaLabel?: string;
  faqContactCtaLabelRu?: string;

  bottomCtaHeading?: string;
  bottomCtaHeadingRu?: string;
  bottomCtaSubheading?: string;
  bottomCtaSubheadingRu?: string;
  bottomCtaParticipantLabel?: string;
  bottomCtaParticipantLabelRu?: string;
  bottomCtaParticipantUrl?: string;
  bottomCtaDonorLabel?: string;
  bottomCtaDonorLabelRu?: string;
  bottomCtaVolunteerLabel?: string;
  bottomCtaVolunteerLabelRu?: string;
  bottomCtaVolunteerUrl?: string;
  bottomCtaTagline?: string;
  bottomCtaTaglineRu?: string;
}

// ── Builders ──────────────────────────────────────────────────────────────────

function normalizeCircleColor(value: string | undefined): CircleColor {
  return value === "gold" ? "gold" : "navy";
}

function shapeStage(raw: RawParticipantStage): ParticipantStage | null {
  // A stage with no title is unusable.
  if (!raw.title) return null;
  return {
    stageNumber: raw.stageNumber || "",
    stageNumberCentralAsia: raw.stageNumberCentralAsia,
    stageLabel: raw.stageLabel || "",
    stageLabelRu: raw.stageLabelRu,
    circleColor: normalizeCircleColor(raw.circleColor),
    title: raw.title,
    titleRu: raw.titleRu,
    description: raw.description ?? "",
    descriptionRu: raw.descriptionRu,
    ctaLabel: raw.ctaLabel,
    ctaLabelRu: raw.ctaLabelRu,
    ctaUrl: raw.ctaUrl,
    hideForCentralAsia: raw.hideForCentralAsia ?? false,
  };
}

function shapeFeature(raw: RawVolunteerFeature): VolunteerFeature | null {
  if (!raw.title) return null;
  return {
    icon: raw.icon || "Clock",
    circleColor: normalizeCircleColor(raw.circleColor),
    title: raw.title,
    titleRu: raw.titleRu,
    description: raw.description ?? "",
    descriptionRu: raw.descriptionRu,
  };
}

function shapeTier(raw: RawDonorTier): DonorTier | null {
  if (!raw.amount || !raw.name) return null;
  return {
    amount: raw.amount,
    amountRu: raw.amountRu,
    name: raw.name,
    nameRu: raw.nameRu,
    description: raw.description ?? "",
    descriptionRu: raw.descriptionRu,
  };
}

function shapeOption(raw: RawPartnerOption): PartnerOption | null {
  if (!raw.title) return null;
  return {
    title: raw.title,
    titleRu: raw.titleRu,
    description: raw.description ?? "",
    descriptionRu: raw.descriptionRu,
  };
}

function shapeArray<TRaw, TOut>(
  raw: TRaw[] | undefined,
  shaper: (r: TRaw) => TOut | null,
  fallback: TOut[]
): TOut[] {
  if (!raw || raw.length === 0) return fallback;
  const valid = raw
    .map((r) => shaper(r))
    .filter((v): v is TOut => v !== null);
  return valid.length > 0 ? valid : fallback;
}

function shape(raw: RawGetInvolvedPage | null): GetInvolvedPageData {
  const r = raw ?? {};
  return {
    // Hero
    heroHeading: r.heroHeading || FALLBACK.heroHeading,
    heroHeadingRu: r.heroHeadingRu || FALLBACK.heroHeadingRu,
    heroSubheading: r.heroSubheading || FALLBACK.heroSubheading,
    heroSubheadingRu: r.heroSubheadingRu || FALLBACK.heroSubheadingRu,
    heroParticipantCtaLabel:
      r.heroParticipantCtaLabel || FALLBACK.heroParticipantCtaLabel,
    heroParticipantCtaLabelRu:
      r.heroParticipantCtaLabelRu || FALLBACK.heroParticipantCtaLabelRu,
    heroDonorCtaLabel: r.heroDonorCtaLabel || FALLBACK.heroDonorCtaLabel,
    heroDonorCtaLabelRu:
      r.heroDonorCtaLabelRu || FALLBACK.heroDonorCtaLabelRu,
    heroVolunteerCtaLabel:
      r.heroVolunteerCtaLabel || FALLBACK.heroVolunteerCtaLabel,
    heroVolunteerCtaLabelRu:
      r.heroVolunteerCtaLabelRu || FALLBACK.heroVolunteerCtaLabelRu,

    // Participants
    participantsEyebrow:
      r.participantsEyebrow || FALLBACK.participantsEyebrow,
    participantsEyebrowRu:
      r.participantsEyebrowRu || FALLBACK.participantsEyebrowRu,
    participantsHeading:
      r.participantsHeading || FALLBACK.participantsHeading,
    participantsHeadingRu:
      r.participantsHeadingRu || FALLBACK.participantsHeadingRu,
    participantsIntroParagraphs:
      r.participantsIntroParagraphs && r.participantsIntroParagraphs.length > 0
        ? r.participantsIntroParagraphs
        : FALLBACK.participantsIntroParagraphs,
    participantsIntroParagraphsRu:
      r.participantsIntroParagraphsRu &&
      r.participantsIntroParagraphsRu.length > 0
        ? r.participantsIntroParagraphsRu
        : FALLBACK.participantsIntroParagraphsRu,
    participantStages: shapeArray(
      r.participantStages,
      shapeStage,
      FALLBACK.participantStages
    ),
    liveClassesHeading:
      r.liveClassesHeading || FALLBACK.liveClassesHeading,
    liveClassesHeadingRu:
      r.liveClassesHeadingRu || FALLBACK.liveClassesHeadingRu,
    liveClassesBody: r.liveClassesBody || FALLBACK.liveClassesBody,
    liveClassesBodyRu:
      r.liveClassesBodyRu || FALLBACK.liveClassesBodyRu,
    liveClassesCtaLabel:
      r.liveClassesCtaLabel || FALLBACK.liveClassesCtaLabel,
    liveClassesCtaLabelRu:
      r.liveClassesCtaLabelRu || FALLBACK.liveClassesCtaLabelRu,
    liveClassesCtaUrl:
      r.liveClassesCtaUrl || FALLBACK.liveClassesCtaUrl,

    // Volunteers
    volunteersEyebrow: r.volunteersEyebrow || FALLBACK.volunteersEyebrow,
    volunteersEyebrowRu:
      r.volunteersEyebrowRu || FALLBACK.volunteersEyebrowRu,
    volunteersHeading: r.volunteersHeading || FALLBACK.volunteersHeading,
    volunteersHeadingRu:
      r.volunteersHeadingRu || FALLBACK.volunteersHeadingRu,
    volunteersIntro: r.volunteersIntro || FALLBACK.volunteersIntro,
    volunteersIntroRu: r.volunteersIntroRu || FALLBACK.volunteersIntroRu,
    volunteerFeatures: shapeArray(
      r.volunteerFeatures,
      shapeFeature,
      FALLBACK.volunteerFeatures
    ),
    volunteerApplyCtaLabel:
      r.volunteerApplyCtaLabel || FALLBACK.volunteerApplyCtaLabel,
    volunteerApplyCtaLabelRu:
      r.volunteerApplyCtaLabelRu || FALLBACK.volunteerApplyCtaLabelRu,
    volunteerApplyCtaUrl:
      r.volunteerApplyCtaUrl || FALLBACK.volunteerApplyCtaUrl,

    // Donors
    donorsEyebrow: r.donorsEyebrow || FALLBACK.donorsEyebrow,
    donorsEyebrowRu: r.donorsEyebrowRu || FALLBACK.donorsEyebrowRu,
    donorsHeading: r.donorsHeading || FALLBACK.donorsHeading,
    donorsHeadingRu: r.donorsHeadingRu || FALLBACK.donorsHeadingRu,
    donorsIntroParagraphs:
      r.donorsIntroParagraphs && r.donorsIntroParagraphs.length > 0
        ? r.donorsIntroParagraphs
        : FALLBACK.donorsIntroParagraphs,
    donorsIntroParagraphsRu:
      r.donorsIntroParagraphsRu && r.donorsIntroParagraphsRu.length > 0
        ? r.donorsIntroParagraphsRu
        : FALLBACK.donorsIntroParagraphsRu,
    donorTiers: shapeArray(r.donorTiers, shapeTier, FALLBACK.donorTiers),
    donorsDifferenceHeading:
      r.donorsDifferenceHeading || FALLBACK.donorsDifferenceHeading,
    donorsDifferenceHeadingRu:
      r.donorsDifferenceHeadingRu || FALLBACK.donorsDifferenceHeadingRu,
    donorsDifferenceParagraphs:
      r.donorsDifferenceParagraphs &&
      r.donorsDifferenceParagraphs.length > 0
        ? r.donorsDifferenceParagraphs
        : FALLBACK.donorsDifferenceParagraphs,
    donorsDifferenceParagraphsRu:
      r.donorsDifferenceParagraphsRu &&
      r.donorsDifferenceParagraphsRu.length > 0
        ? r.donorsDifferenceParagraphsRu
        : FALLBACK.donorsDifferenceParagraphsRu,
    donateCtaLabel: r.donateCtaLabel || FALLBACK.donateCtaLabel,
    donateCtaLabelRu: r.donateCtaLabelRu || FALLBACK.donateCtaLabelRu,
    donateTaxNote: r.donateTaxNote || FALLBACK.donateTaxNote,
    donateTaxNoteRu: r.donateTaxNoteRu || FALLBACK.donateTaxNoteRu,
    partnerHeading: r.partnerHeading || FALLBACK.partnerHeading,
    partnerHeadingRu: r.partnerHeadingRu || FALLBACK.partnerHeadingRu,
    partnerBody: r.partnerBody || FALLBACK.partnerBody,
    partnerBodyRu: r.partnerBodyRu || FALLBACK.partnerBodyRu,
    partnerOptions: shapeArray(
      r.partnerOptions,
      shapeOption,
      FALLBACK.partnerOptions
    ),
    partnerCtaLabel: r.partnerCtaLabel || FALLBACK.partnerCtaLabel,
    partnerCtaLabelRu: r.partnerCtaLabelRu || FALLBACK.partnerCtaLabelRu,
    partnerCtaUrl: r.partnerCtaUrl || FALLBACK.partnerCtaUrl,

    // Section headings
    successStoriesHeading:
      r.successStoriesHeading || FALLBACK.successStoriesHeading,
    successStoriesHeadingRu:
      r.successStoriesHeadingRu || FALLBACK.successStoriesHeadingRu,
    faqHeading: r.faqHeading || FALLBACK.faqHeading,
    faqHeadingRu: r.faqHeadingRu || FALLBACK.faqHeadingRu,
    faqContactPrompt: r.faqContactPrompt || FALLBACK.faqContactPrompt,
    faqContactPromptRu:
      r.faqContactPromptRu || FALLBACK.faqContactPromptRu,
    faqContactCtaLabel:
      r.faqContactCtaLabel || FALLBACK.faqContactCtaLabel,
    faqContactCtaLabelRu:
      r.faqContactCtaLabelRu || FALLBACK.faqContactCtaLabelRu,

    // Bottom CTA
    bottomCtaHeading: r.bottomCtaHeading || FALLBACK.bottomCtaHeading,
    bottomCtaHeadingRu:
      r.bottomCtaHeadingRu || FALLBACK.bottomCtaHeadingRu,
    bottomCtaSubheading:
      r.bottomCtaSubheading || FALLBACK.bottomCtaSubheading,
    bottomCtaSubheadingRu:
      r.bottomCtaSubheadingRu || FALLBACK.bottomCtaSubheadingRu,
    bottomCtaParticipantLabel:
      r.bottomCtaParticipantLabel || FALLBACK.bottomCtaParticipantLabel,
    bottomCtaParticipantLabelRu:
      r.bottomCtaParticipantLabelRu || FALLBACK.bottomCtaParticipantLabelRu,
    bottomCtaParticipantUrl:
      r.bottomCtaParticipantUrl || FALLBACK.bottomCtaParticipantUrl,
    bottomCtaDonorLabel:
      r.bottomCtaDonorLabel || FALLBACK.bottomCtaDonorLabel,
    bottomCtaDonorLabelRu:
      r.bottomCtaDonorLabelRu || FALLBACK.bottomCtaDonorLabelRu,
    bottomCtaVolunteerLabel:
      r.bottomCtaVolunteerLabel || FALLBACK.bottomCtaVolunteerLabel,
    bottomCtaVolunteerLabelRu:
      r.bottomCtaVolunteerLabelRu || FALLBACK.bottomCtaVolunteerLabelRu,
    bottomCtaVolunteerUrl:
      r.bottomCtaVolunteerUrl || FALLBACK.bottomCtaVolunteerUrl,
    bottomCtaTagline: r.bottomCtaTagline || FALLBACK.bottomCtaTagline,
    bottomCtaTaglineRu:
      r.bottomCtaTaglineRu || FALLBACK.bottomCtaTaglineRu,
  };
}

// ── Bilingual helpers ─────────────────────────────────────────────────────────

/** Localize a participant stage. Returns the right strings for the current region. */
export function getStageCopy(
  stage: ParticipantStage,
  isCentralAsia: boolean
): {
  number: string;
  label: string;
  title: string;
  description: string;
  ctaLabel: string;
} {
  const number = isCentralAsia
    ? stage.stageNumberCentralAsia || stage.stageNumber
    : stage.stageNumber;
  return {
    number,
    label: getLocalized(stage.stageLabel, stage.stageLabelRu, isCentralAsia),
    title: getLocalized(stage.title, stage.titleRu, isCentralAsia),
    description: getLocalized(
      stage.description,
      stage.descriptionRu,
      isCentralAsia
    ),
    ctaLabel: getLocalized(stage.ctaLabel, stage.ctaLabelRu, isCentralAsia),
  };
}

export function getFeatureCopy(
  feature: VolunteerFeature,
  isCentralAsia: boolean
): { title: string; description: string } {
  return {
    title: getLocalized(feature.title, feature.titleRu, isCentralAsia),
    description: getLocalized(
      feature.description,
      feature.descriptionRu,
      isCentralAsia
    ),
  };
}

export function getTierCopy(
  tier: DonorTier,
  isCentralAsia: boolean
): { amount: string; name: string; description: string } {
  return {
    amount: getLocalized(tier.amount, tier.amountRu, isCentralAsia),
    name: getLocalized(tier.name, tier.nameRu, isCentralAsia),
    description: getLocalized(
      tier.description,
      tier.descriptionRu,
      isCentralAsia
    ),
  };
}

export function getOptionCopy(
  option: PartnerOption,
  isCentralAsia: boolean
): { title: string; description: string } {
  return {
    title: getLocalized(option.title, option.titleRu, isCentralAsia),
    description: getLocalized(
      option.description,
      option.descriptionRu,
      isCentralAsia
    ),
  };
}

/** Bilingual paragraph list helper — pick EN or RU paragraph array. */
export function getIntroParagraphs(
  english: string[],
  russian: string[],
  isCentralAsia: boolean
): string[] {
  return getLocalizedArray(english, russian, isCentralAsia);
}

// Re-export the resolved fallback for tests / storybook.
export const FALLBACK_GET_INVOLVED_PAGE: GetInvolvedPageData = shape(null);

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useGetInvolvedPage(): {
  data: GetInvolvedPageData;
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery({
    queryKey: ["getInvolvedPage"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawGetInvolvedPage | null>(
          GET_INVOLVED_PAGE_QUERY
        );
      } catch (err) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("[getInvolvedPage] Sanity fetch failed:", err);
        }
        return null;
      }
    },
  });

  return {
    data: shape(data ?? null),
    isLoading,
  };
}
