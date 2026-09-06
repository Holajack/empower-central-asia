export type TranslationKey = keyof typeof en;

const en = {
  // Navigation
  "nav.home": "Home",
  "nav.courses": "Courses",
  "nav.community": "Community",
  "nav.resources": "Resources",
  "nav.blog": "Blog",
  "nav.signIn": "Sign in",
  "nav.join": "Join free",
  "nav.dashboard": "My Learning",
  "nav.donate": "Give",

  // Common
  "common.learnMore": "Learn More",
  "common.getStarted": "Get Started",
  "common.subscribe": "Subscribe",
  "common.submit": "Submit",
  "common.submitting": "Submitting...",
  "common.subscribing": "Subscribing...",
  "common.firstName": "First name",
  "common.lastName": "Last name",
  "common.email": "Email address",
  "common.phone": "Phone",
  "common.whatsapp": "WhatsApp number",
  "common.message": "Message",
  "common.send": "Send",
  "common.backToHome": "Back to Home",
  "common.readMore": "Read More",
  "common.viewAll": "View All",
  "common.contactUs": "Contact Us",

  // Home
  "home.badge": "Free · Self-paced · English & Russian",
  "home.heroTitle": "Learn to manage money, build a business, and lead your community.",
  "home.heroSubtitle": "Three practical courses with daily lessons, real stories, and interactive worksheets. No cost, no catch — just a free account so we can send you what you need next.",
  "home.ctaPrimary": "Start learning free",
  "home.ctaSecondary": "See the learning path",
  "home.perk1": "15–30 minutes a day",
  "home.perk2": "Progress saved to your account",
  "home.perk3": "Community and live cohorts",
  "home.pathTitle": "One path, three courses",
  "home.pathSubtitle": "Start with your money, move to your business idea, then learn to lead others. Each course stands on its own, so begin wherever you are.",
  "home.howTitle": "How it works",
  "home.how1Title": "Create a free account",
  "home.how1Desc": "Tell us your language and goal. Everything you see and receive is in the language you choose.",
  "home.how2Title": "Learn in daily steps",
  "home.how2Desc": "Each week has six short days: a lesson, a story, a worksheet, practice, and a wrap-up.",
  "home.how3Title": "Do the work",
  "home.how3Desc": "Interactive worksheets and tools — budgets, debt plans, business model canvases — save as you go.",
  "home.how4Title": "Grow together",
  "home.how4Desc": "Course chat, live cohorts, and local groups so you never learn alone.",
  "home.communityTitle": "Built for Central Asia, open to the world",
  "home.communityDesc": "The stories, examples, and worksheets reflect life in Bishkek, Almaty, Tashkent, and Dushanbe — and the principles work anywhere. Learn in Russian or English, on any device, at your own pace.",

  // Footer
  "footer.tagline": "Free financial literacy, business creation, and leadership courses in English and Russian.",
  "footer.quickLinks": "Explore",
  "footer.contactUs": "Contact Us",
  "footer.newsletter": "Newsletter",
  "footer.newsletterDesc": "Practical money and business tips, new lessons, and cohort announcements — in your language.",
  "footer.privacyNote": "We respect your privacy. Unsubscribe at any time.",
  "footer.rights": "All rights reserved.",
  "footer.privacy": "Privacy Policy",
  "footer.contact": "Contact",

  // Newsletter
  "newsletter.title": "Newsletter",
  "newsletter.popupTitle": "Stay Connected",
  "newsletter.popupDesc": "Get new lessons, practical tips, and cohort announcements.",

  // Popup (2-step newsletter)
  "popup.headline": "Get free money and business tips in your inbox",
  "popup.subtitle": "Tell us what you're here for:",
  "popup.continue": "Continue",
  "popup.dontShow": "Don't show again",
  "popup.step2Title": "Almost there! Here's what you'll get:",
  "popup.benefit1": "New lessons and practical guides",
  "popup.benefit2": "Early access to live cohorts",
  "popup.benefit3": "Real stories from learners across Central Asia",
  "popup.joinButton": "Join the community",

  // Language Switcher
  "lang.switch": "Switch Language",
  "lang.english": "English",
  "lang.russian": "Russian",
};

const ru: typeof en = {
  // Navigation
  "nav.home": "Главная",
  "nav.courses": "Курсы",
  "nav.community": "Сообщество",
  "nav.resources": "Материалы",
  "nav.blog": "Блог",
  "nav.signIn": "Войти",
  "nav.join": "Начать бесплатно",
  "nav.dashboard": "Моё обучение",
  "nav.donate": "Поддержать",

  // Common
  "common.learnMore": "Подробнее",
  "common.getStarted": "Начать",
  "common.subscribe": "Подписаться",
  "common.submit": "Отправить",
  "common.submitting": "Отправка...",
  "common.subscribing": "Подписка...",
  "common.firstName": "Имя",
  "common.lastName": "Фамилия",
  "common.email": "Электронная почта",
  "common.phone": "Телефон",
  "common.whatsapp": "Номер WhatsApp",
  "common.message": "Сообщение",
  "common.send": "Отправить",
  "common.backToHome": "На главную",
  "common.readMore": "Читать далее",
  "common.viewAll": "Смотреть все",
  "common.contactUs": "Связаться с нами",

  // Home
  "home.badge": "Бесплатно · В своём темпе · Русский и английский",
  "home.heroTitle": "Научитесь управлять деньгами, строить бизнес и вести за собой сообщество.",
  "home.heroSubtitle": "Три практических курса с ежедневными уроками, реальными историями и интерактивными рабочими листами. Без оплаты и скрытых условий — только бесплатный аккаунт, чтобы мы могли присылать вам следующие шаги.",
  "home.ctaPrimary": "Начать учиться бесплатно",
  "home.ctaSecondary": "Посмотреть путь обучения",
  "home.perk1": "15–30 минут в день",
  "home.perk2": "Прогресс сохраняется в аккаунте",
  "home.perk3": "Сообщество и живые когорты",
  "home.pathTitle": "Один путь, три курса",
  "home.pathSubtitle": "Начните с денег, перейдите к бизнес-идее, затем научитесь вести других. Каждый курс самостоятелен — начинайте с того, что актуально сейчас.",
  "home.howTitle": "Как это работает",
  "home.how1Title": "Создайте бесплатный аккаунт",
  "home.how1Desc": "Укажите язык и цель. Всё, что вы видите и получаете, будет на выбранном языке.",
  "home.how2Title": "Учитесь по шагам",
  "home.how2Desc": "Каждая неделя — шесть коротких дней: урок, история, рабочий лист, практика и итоги.",
  "home.how3Title": "Делайте работу",
  "home.how3Desc": "Интерактивные рабочие листы и инструменты — бюджет, план по долгам, бизнес-модель — сохраняются автоматически.",
  "home.how4Title": "Растите вместе",
  "home.how4Desc": "Чат курса, живые когорты и местные группы — чтобы никогда не учиться в одиночку.",
  "home.communityTitle": "Создано для Центральной Азии, открыто для всех",
  "home.communityDesc": "Истории, примеры и рабочие листы отражают жизнь в Бишкеке, Алматы, Ташкенте и Душанбе — а принципы работают везде. Учитесь на русском или английском, на любом устройстве, в своём темпе.",

  // Footer
  "footer.tagline": "Бесплатные курсы по финансовой грамотности, созданию бизнеса и лидерству на русском и английском.",
  "footer.quickLinks": "Разделы",
  "footer.contactUs": "Контакты",
  "footer.newsletter": "Рассылка",
  "footer.newsletterDesc": "Практические советы о деньгах и бизнесе, новые уроки и анонсы когорт — на вашем языке.",
  "footer.privacyNote": "Мы уважаем вашу конфиденциальность. Отписаться можно в любое время.",
  "footer.rights": "Все права защищены.",
  "footer.privacy": "Политика конфиденциальности",
  "footer.contact": "Контакты",

  // Newsletter
  "newsletter.title": "Рассылка",
  "newsletter.popupTitle": "Оставайтесь на связи",
  "newsletter.popupDesc": "Новые уроки, практические советы и анонсы когорт.",

  // Popup
  "popup.headline": "Бесплатные советы о деньгах и бизнесе — на вашу почту",
  "popup.subtitle": "Расскажите, зачем вы здесь:",
  "popup.continue": "Продолжить",
  "popup.dontShow": "Больше не показывать",
  "popup.step2Title": "Почти готово! Вот что вы получите:",
  "popup.benefit1": "Новые уроки и практические руководства",
  "popup.benefit2": "Ранний доступ к живым когортам",
  "popup.benefit3": "Реальные истории учеников из Центральной Азии",
  "popup.joinButton": "Присоединиться",

  // Language Switcher
  "lang.switch": "Сменить язык",
  "lang.english": "Английский",
  "lang.russian": "Русский",
};

const translations = { en, ru };

export default translations;
