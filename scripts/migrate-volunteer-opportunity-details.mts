/**
 * Phase L migration: seeds the deep volunteerOpportunity sections —
 *   - responsibilities       ("What You'll Do" / role cards)
 *   - commitmentDetails      (hero stats grid)
 *   - requirements           (skills / qualifications list)
 *   - processSteps           (program timeline / application phases)
 *   - benefits               (what volunteers gain)
 *   - closingCta*            (final CTA copy)
 *
 * Idempotent — re-runs `client.patch(<docId>).set({ ... }).commit()` on
 * each of the 5 volunteerOpportunity docs. Safe to run multiple times.
 *
 * Doc-ID convention (from scripts/migrate-volunteer-opportunities.mts):
 *   _id = `volunteerOpportunity.<slug>` for each volunteerOpportunity doc.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:volunteer-details
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN env var.\n");
  console.error("Generate at sanity.io/manage → API → Tokens (Editor permissions).");
  console.error(
    "Then run:\n  SANITY_WRITE_TOKEN=<token> npm run migrate:volunteer-details\n",
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

// ─── Types (mirror sanity/schemas/documents/volunteerOpportunity.ts) ─────────

interface ResponsibilityItem {
  _key: string;
  _type: "responsibilityItem";
  label: string;
  labelRu?: string;
  description?: string;
  descriptionRu?: string;
}

interface CommitmentDetail {
  _key: string;
  _type: "commitmentDetail";
  label: string;
  labelRu?: string;
  value: string;
  valueRu?: string;
  icon?: string;
}

interface RequirementItem {
  _key: string;
  _type: "requirementItem";
  label: string;
  labelRu?: string;
}

interface ProcessStep {
  _key: string;
  _type: "processStep";
  stepNumber: number;
  label: string;
  labelRu?: string;
  description: string;
  descriptionRu?: string;
}

interface BenefitItem {
  _key: string;
  _type: "benefitItem";
  label: string;
  labelRu?: string;
  description?: string;
  descriptionRu?: string;
}

interface VolunteerOpportunityDetails {
  slug: string;

  responsibilitiesHeading?: string;
  responsibilitiesHeadingRu?: string;
  responsibilities: ResponsibilityItem[];

  commitmentHeading?: string;
  commitmentHeadingRu?: string;
  commitmentDetails: CommitmentDetail[];

  requirementsHeading?: string;
  requirementsHeadingRu?: string;
  requirements: RequirementItem[];

  processHeading?: string;
  processHeadingRu?: string;
  processSteps: ProcessStep[];

  benefitsHeading?: string;
  benefitsHeadingRu?: string;
  benefits: BenefitItem[];

  closingCtaHeading?: string;
  closingCtaHeadingRu?: string;
  closingCtaSubheading?: string;
  closingCtaSubheadingRu?: string;
  closingCtaButtonLabel?: string;
  closingCtaButtonLabelRu?: string;
  closingCtaUrl?: string;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function key(prefix: string, label: string, idx: number): string {
  const base = slugify(label) || `item-${idx}`;
  return `${prefix}-${base}-${idx}`;
}

// ─── Seed data per role ──────────────────────────────────────────────────────

const ADMINISTRATIVE_SUPPORT: VolunteerOpportunityDetails = {
  slug: "administrative-support",
  responsibilitiesHeading: "What You'll Do Day-to-Day",
  responsibilitiesHeadingRu: "Чем вы будете заниматься в повседневной работе",
  responsibilities: [
    {
      label: "Daily Communications",
      labelRu: "Ежедневные коммуникации",
      description:
        "Handle email correspondence, social media updates, and volunteer communications to keep everyone connected and informed.",
      descriptionRu:
        "Обрабатывайте email-переписку, обновления в социальных сетях и связь с волонтёрами, чтобы все были в курсе событий.",
    },
    {
      label: "Data Management",
      labelRu: "Управление данными",
      description:
        "Organize and maintain accurate records of volunteers, participants, and program activities for effective operations.",
      descriptionRu:
        "Организовывайте и ведите точные записи о волонтёрах, участниках и деятельности программы для эффективной работы.",
    },
    {
      label: "Program Support",
      labelRu: "Поддержка программ",
      description:
        "Provide behind-the-scenes support during training sessions, events, and meetings to ensure smooth operations.",
      descriptionRu:
        "Обеспечивайте поддержку за кулисами во время учебных сессий, мероприятий и встреч для бесперебойной работы.",
    },
  ].map((r, idx) => ({
    _key: key("resp", r.label, idx),
    _type: "responsibilityItem",
    ...r,
  })),

  commitmentDetails: [
    {
      label: "Per Week",
      labelRu: "В неделю",
      value: "3-5 hrs",
      valueRu: "3–5 ч.",
      icon: "Clock",
    },
    {
      label: "Work Location",
      labelRu: "Место работы",
      value: "Remote",
      valueRu: "Удалённо",
      icon: "MapPin",
    },
    {
      label: "Schedule",
      labelRu: "График",
      value: "Flexible",
      valueRu: "Гибкий",
      icon: "Calendar",
    },
    {
      label: "Mission Support",
      labelRu: "Поддержка миссии",
      value: "Essential",
      valueRu: "Ключевая",
      icon: "Heart",
    },
  ].map((c, idx) => ({
    _key: key("commit", c.label, idx),
    _type: "commitmentDetail",
    ...c,
  })),

  requirementsHeading: "Essential Skills",
  requirementsHeadingRu: "Необходимые навыки",
  requirements: [
    { label: "Strong written communication skills", labelRu: "Сильные навыки письменной коммуникации" },
    { label: "Attention to detail and accuracy", labelRu: "Внимательность к деталям и точность" },
    { label: "Time management and organization", labelRu: "Управление временем и организованность" },
    { label: "Customer service orientation", labelRu: "Ориентация на качественное обслуживание" },
    { label: "Basic computer and internet skills", labelRu: "Базовые навыки работы с компьютером и интернетом" },
  ].map((r, idx) => ({
    _key: key("req", r.label, idx),
    _type: "requirementItem",
    ...r,
  })),

  processSteps: [],

  benefitsHeading: "Career Benefits",
  benefitsHeadingRu: "Карьерные преимущества",
  benefits: [
    { label: "Build portfolio of nonprofit experience", labelRu: "Пополнение портфолио опытом в некоммерческом секторе" },
    { label: "Professional references and recommendations", labelRu: "Профессиональные рекомендации и отзывы" },
    { label: "Network with business professionals", labelRu: "Нетворкинг с бизнес-профессионалами" },
    { label: "Gain international development experience", labelRu: "Опыт в международном развитии" },
    { label: "Flexible schedule for work-life balance", labelRu: "Гибкий график для баланса работы и жизни" },
  ].map((b, idx) => ({
    _key: key("benefit", b.label, idx),
    _type: "benefitItem",
    ...b,
  })),

  closingCtaHeading: "Ready to Support Our Operations?",
  closingCtaHeadingRu: "Готовы поддержать наши операции?",
  closingCtaSubheading:
    "Join our administrative team and be the backbone that enables our programs to transform lives around the world.",
  closingCtaSubheadingRu:
    "Вступайте в нашу административную команду и станьте опорой, которая позволяет нашим программам менять жизни людей по всему миру.",
  closingCtaButtonLabel: "Apply for Admin Support",
  closingCtaButtonLabelRu: "Подать заявку на административную поддержку",
  closingCtaUrl: "#apply-now",
};

const ADVOCACY_OUTREACH: VolunteerOpportunityDetails = {
  slug: "advocacy-outreach",
  responsibilitiesHeading: "Advocacy & Outreach Opportunities",
  responsibilitiesHeadingRu: "Направления адвокации и охвата",
  responsibilities: [
    {
      label: "Community Advocacy",
      labelRu: "Общественная адвокация",
      description:
        "Champion economic empowerment initiatives within your local community and beyond.",
      descriptionRu:
        "Продвигайте инициативы экономического развития в вашем местном сообществе и за его пределами.",
    },
    {
      label: "Partnership Development",
      labelRu: "Развитие партнёрств",
      description:
        "Build strategic relationships with organizations, institutions, and leaders.",
      descriptionRu:
        "Выстраивайте стратегические отношения с организациями, учреждениями и лидерами.",
    },
    {
      label: "Content Creation & Storytelling",
      labelRu: "Создание контента и сторителлинг",
      description:
        "Create compelling content that shares our mission and impact stories.",
      descriptionRu:
        "Создавайте убедительный контент, отражающий нашу миссию и истории успеха.",
    },
    {
      label: "Digital Outreach",
      labelRu: "Цифровой охват",
      description:
        "Leverage digital platforms to expand our reach and engagement.",
      descriptionRu:
        "Используйте цифровые платформы для расширения охвата и вовлечённости аудитории.",
    },
  ].map((r, idx) => ({
    _key: key("resp", r.label, idx),
    _type: "responsibilityItem",
    ...r,
  })),

  commitmentDetails: [
    {
      label: "Global Impact",
      labelRu: "Глобальное влияние",
      value: "Global",
      valueRu: "Глобально",
      icon: "Globe",
    },
    {
      label: "Strategic Communication",
      labelRu: "Стратегическая коммуникация",
      value: "Strategic",
      valueRu: "Стратегически",
      icon: "MessageSquare",
    },
    {
      label: "Community Building",
      labelRu: "Развитие сообщества",
      value: "Community",
      valueRu: "Сообщество",
      icon: "Users",
    },
  ].map((c, idx) => ({
    _key: key("commit", c.label, idx),
    _type: "commitmentDetail",
    ...c,
  })),

  requirementsHeading: "Ideal Skills & Qualities",
  requirementsHeadingRu: "Идеальные навыки и качества",
  requirements: [
    { label: "Excellent written and verbal communication", labelRu: "Отличные письменные и устные коммуникативные навыки" },
    { label: "Experience with social media marketing", labelRu: "Опыт работы с социальными сетями" },
    { label: "Content creation and storytelling abilities", labelRu: "Умение создавать контент и рассказывать истории" },
    { label: "Public speaking and presentation skills", labelRu: "Навыки публичных выступлений и презентаций" },
    { label: "Networking and relationship-building experience", labelRu: "Опыт в нетворкинге и выстраивании отношений" },
    { label: "Cultural sensitivity and awareness", labelRu: "Культурная чуткость и осведомлённость" },
  ].map((r, idx) => ({
    _key: key("req", r.label, idx),
    _type: "requirementItem",
    ...r,
  })),

  processSteps: [],

  benefitsHeading: "What We Provide",
  benefitsHeadingRu: "Что мы предоставляем",
  benefits: [
    { label: "Advocacy and public speaking training", labelRu: "Тренинги по адвокации и публичным выступлениям" },
    { label: "Digital marketing workshops", labelRu: "Семинары по цифровому маркетингу" },
    { label: "Partnership development skills", labelRu: "Навыки развития партнёрств" },
    { label: "Content creation training", labelRu: "Обучение созданию контента" },
    { label: "Cultural competency education", labelRu: "Образование в области межкультурной компетентности" },
    { label: "Networking opportunities with leaders", labelRu: "Возможности для нетворкинга с лидерами" },
  ].map((b, idx) => ({
    _key: key("benefit", b.label, idx),
    _type: "benefitItem",
    ...b,
  })),

  closingCtaHeading: "Ready to Amplify Our Mission?",
  closingCtaHeadingRu: "Готовы усилить нашу миссию?",
  closingCtaSubheading:
    "Join our advocacy team and help spread the message of economic empowerment across Central Asia.",
  closingCtaSubheadingRu:
    "Присоединяйтесь к нашей команде адвокатов и помогите распространить послание об экономическом развитии по всей Центральной Азии.",
  closingCtaButtonLabel: "Submit Application",
  closingCtaButtonLabelRu: "Отправить заявку",
  closingCtaUrl: "#apply-now",
};

const BUSINESS_TRAINING: VolunteerOpportunityDetails = {
  slug: "business-training",
  responsibilitiesHeading: "Ways to Support Our Training Programs",
  responsibilitiesHeadingRu: "Способы поддержки наших программ обучения",
  responsibilities: [
    {
      label: "Training Assistant",
      labelRu: "Ассистент тренера",
      description:
        "Help facilitate training sessions, manage breakout rooms, and provide technical support during virtual workshops.",
      descriptionRu:
        "Помогайте проводить тренинги, управлять группами и обеспечивать техническую поддержку во время виртуальных семинаров.",
    },
    {
      label: "Curriculum Developer",
      labelRu: "Разработчик учебных материалов",
      description:
        "Help create and refine training materials, worksheets, and resources for our proven programs.",
      descriptionRu:
        "Помогайте создавать и совершенствовать учебные материалы, рабочие листы и ресурсы для наших программ.",
    },
    {
      label: "Business Mentor",
      labelRu: "Бизнес-наставник",
      description:
        "Provide one-on-one mentoring to entrepreneurs going through our business creation program.",
      descriptionRu:
        "Оказывайте индивидуальное наставничество предпринимателям, проходящим нашу программу по созданию бизнеса.",
    },
  ].map((r, idx) => ({
    _key: key("resp", r.label, idx),
    _type: "responsibilityItem",
    ...r,
  })),

  commitmentDetails: [
    {
      label: "Program Success Rate",
      labelRu: "Успешность программы",
      value: "100%",
      valueRu: "100%",
      icon: "Award",
    },
    {
      label: "Core Programs",
      labelRu: "Основные программы",
      value: "2",
      valueRu: "2",
      icon: "BookOpen",
    },
    {
      label: "Schedule",
      labelRu: "График",
      value: "Flexible",
      valueRu: "Гибко",
      icon: "Clock",
    },
    {
      label: "Support Role",
      labelRu: "Роль поддержки",
      value: "Remote",
      valueRu: "Удалённо",
      icon: "MapPin",
    },
  ].map((c, idx) => ({
    _key: key("commit", c.label, idx),
    _type: "commitmentDetail",
    ...c,
  })),

  requirementsHeading: "Ideal Background",
  requirementsHeadingRu: "Идеальный опыт",
  requirements: [
    { label: "Business experience or educational background", labelRu: "Бизнес-опыт или профильное образование" },
    { label: "Financial literacy or accounting knowledge", labelRu: "Знания в области финансовой грамотности или бухгалтерии" },
    { label: "Teaching, training, or presentation experience", labelRu: "Опыт преподавания, обучения или презентаций" },
    { label: "Entrepreneurial or small business experience", labelRu: "Предпринимательский опыт или опыт малого бизнеса" },
  ].map((r, idx) => ({
    _key: key("req", r.label, idx),
    _type: "requirementItem",
    ...r,
  })),

  processSteps: [],

  benefitsHeading: "Comprehensive Onboarding",
  benefitsHeadingRu: "Комплексная адаптация",
  benefits: [
    { label: "Program methodology training", labelRu: "Обучение методологии программы" },
    { label: "Cultural sensitivity workshop", labelRu: "Семинар по культурной чуткости" },
    { label: "Technology platform tutorial", labelRu: "Руководство по технологической платформе" },
    { label: "Practice sessions with feedback", labelRu: "Практические занятия с обратной связью" },
  ].map((b, idx) => ({
    _key: key("benefit", b.label, idx),
    _type: "benefitItem",
    ...b,
  })),

  closingCtaHeading: "Ready to Support Our Training Programs?",
  closingCtaHeadingRu: "Готовы поддержать наши программы обучения?",
  closingCtaSubheading:
    "Join our team of business training volunteers and help entrepreneurs build successful, sustainable businesses.",
  closingCtaSubheadingRu:
    "Присоединяйтесь к нашей команде волонтёров бизнес-обучения и помогайте предпринимателям строить успешные и устойчивые предприятия.",
  closingCtaButtonLabel: "Apply to Support Programs",
  closingCtaButtonLabelRu: "Подать заявку на участие в программах",
  closingCtaUrl: "#apply-now",
};

const COMMUNITY_ORGANIZER: VolunteerOpportunityDetails = {
  slug: "community-organizer",
  responsibilitiesHeading: "Community Organizer Roles Available",
  responsibilitiesHeadingRu: "Доступные роли организаторов сообщества",
  responsibilities: [
    {
      label: "Program Coordinators",
      labelRu: "Координаторы программы",
      description:
        "Lead program development and oversee day-to-day operations of community collaboration initiatives.",
      descriptionRu:
        "Руководите разработкой программы и координируйте повседневную работу инициатив по взаимодействию сообщества.",
    },
    {
      label: "Event Organizers",
      labelRu: "Организаторы мероприятий",
      description:
        "Plan and execute networking events, workshops, and community gatherings both virtual and in-person.",
      descriptionRu:
        "Планируйте и проводите сетевые мероприятия, семинары и встречи сообщества — как онлайн, так и офлайн.",
    },
    {
      label: "Outreach Specialists",
      labelRu: "Специалисты по охвату",
      description:
        "Build relationships with local businesses, organizations, and potential partners to expand our network.",
      descriptionRu:
        "Выстраивайте отношения с местными предприятиями, организациями и потенциальными партнёрами для расширения нашей сети.",
    },
    {
      label: "Administrative Support",
      labelRu: "Административная поддержка",
      description:
        "Provide essential operational support including communications, data management, and process documentation.",
      descriptionRu:
        "Обеспечивайте операционную поддержку: коммуникации, управление данными и документирование процессов.",
    },
  ].map((r, idx) => ({
    _key: key("resp", r.label, idx),
    _type: "responsibilityItem",
    ...r,
  })),

  commitmentDetails: [
    {
      label: "Per Week",
      labelRu: "В неделю",
      value: "2 hrs",
      valueRu: "2 ч.",
      icon: "Clock",
    },
    {
      label: "Start Date",
      labelRu: "Дата начала",
      value: "Apr 2026",
      valueRu: "Апр. 2026",
      icon: "Calendar",
    },
    {
      label: "Work Location",
      labelRu: "Место работы",
      value: "Remote",
      valueRu: "Удалённо",
      icon: "MapPin",
    },
    {
      label: "Program Launch",
      labelRu: "Запуск программы",
      value: "New",
      valueRu: "Новый",
      icon: "Sparkles",
    },
  ].map((c, idx) => ({
    _key: key("commit", c.label, idx),
    _type: "commitmentDetail",
    ...c,
  })),

  requirementsHeading: "Experience We Value",
  requirementsHeadingRu: "Опыт, который мы ценим",
  requirements: [
    { label: "Event planning or project coordination experience", labelRu: "Опыт планирования мероприятий или координации проектов" },
    { label: "Community organizing or volunteer management", labelRu: "Организация сообщества или управление волонтёрами" },
    { label: "Business networking or partnership development", labelRu: "Деловой нетворкинг или развитие партнёрств" },
    { label: "Social media and communications experience", labelRu: "Опыт работы в социальных сетях и коммуникациях" },
  ].map((r, idx) => ({
    _key: key("req", r.label, idx),
    _type: "requirementItem",
    ...r,
  })),

  processHeading: "Community Collaboration Development Timeline",
  processHeadingRu: "График развития взаимодействия сообщества",
  processSteps: [
    {
      stepNumber: 1,
      label: "Phase 1: Foundation Building (Months 1-3) - Q2 2026",
      labelRu: "Этап 1: Закладка фундамента (месяцы 1–3) — Q2 2026",
      description:
        "Establish program structure, recruit founding team, and build core systems.",
      descriptionRu:
        "Выстроить структуру программы, набрать команду-основателей и создать базовые системы.",
    },
    {
      stepNumber: 2,
      label: "Phase 2: Program Launch (Months 4-6) - Q3 2026",
      labelRu: "Этап 2: Запуск программы (месяцы 4–6) — Q3 2026",
      description:
        "Launch community collaboration initiatives and begin serving entrepreneurs.",
      descriptionRu:
        "Запустить инициативы по взаимодействию сообщества и начать работу с предпринимателями.",
    },
    {
      stepNumber: 3,
      label: "Phase 3: Growth & Impact (Months 7-12) - Q4 2026 & Beyond",
      labelRu: "Этап 3: Рост и влияние (месяцы 7–12) — Q4 2026 и далее",
      description:
        "Scale program impact and establish sustainable community collaboration model.",
      descriptionRu:
        "Масштабировать влияние программы и создать устойчивую модель взаимодействия сообщества.",
    },
  ].map((s, idx) => ({
    _key: key("step", s.label, idx),
    _type: "processStep",
    ...s,
  })),

  benefitsHeading: "Professional Growth",
  benefitsHeadingRu: "Профессиональный рост",
  benefits: [
    { label: "Build program management and coordination skills", labelRu: "Развивайте навыки управления программами и координации" },
    { label: "Develop extensive professional network", labelRu: "Расширяйте обширную профессиональную сеть" },
    { label: "Gain experience in startup and nonprofit sectors", labelRu: "Получайте опыт в стартапах и некоммерческом секторе" },
    { label: "Leadership development opportunities", labelRu: "Возможности для развития лидерских качеств" },
  ].map((b, idx) => ({
    _key: key("benefit", b.label, idx),
    _type: "benefitItem",
    ...b,
  })),

  closingCtaHeading: "Ready to Join Our Founding Team?",
  closingCtaHeadingRu: "Готовы вступить в нашу команду-основателей?",
  closingCtaSubheading:
    "Be part of building something new! Apply to become a Community Organizer and help us create lasting impact.",
  closingCtaSubheadingRu:
    "Станьте частью чего-то нового! Подайте заявку на роль организатора сообщества и помогите нам создать долгосрочное влияние.",
  closingCtaButtonLabel: "Join Founding Team",
  closingCtaButtonLabelRu: "Вступить в команду-основателей",
  closingCtaUrl: "#apply-now",
};

const LEADERSHIP_MENTOR: VolunteerOpportunityDetails = {
  slug: "leadership-mentor",
  responsibilitiesHeading: "What You'll Do as a Leadership Mentor",
  responsibilitiesHeadingRu: "Чем вы будете заниматься как наставник по лидерству",
  responsibilities: [
    {
      label: "Guide Emerging Leaders",
      labelRu: "Направлять начинающих лидеров",
      description:
        "Work one-on-one with 2-3 emerging leaders in Central Asia, helping them develop essential leadership skills through our proven 70-20-10 development model.",
      descriptionRu:
        "Работайте один на один с 2–3 начинающими лидерами в Центральной Азии, помогая им развивать ключевые лидерские навыки с помощью нашей проверенной модели развития 70-20-10.",
    },
    {
      label: "Develop Core Skills",
      labelRu: "Развивать ключевые навыки",
      description:
        "Focus on developing emotional intelligence, servant leadership principles, and transformational leadership skills in your mentees.",
      descriptionRu:
        "Сосредоточьтесь на развитии эмоционального интеллекта, принципов служащего лидерства и трансформационных лидерских навыков у своих подопечных.",
    },
    {
      label: "Share Real Experience",
      labelRu: "Делиться реальным опытом",
      description:
        "Draw from your professional experience to provide practical insights, case studies, and real-world applications of leadership principles.",
      descriptionRu:
        "Опирайтесь на свой профессиональный опыт, чтобы предлагать практические идеи, примеры из жизни и реальные приложения принципов лидерства.",
    },
    {
      label: "Build Future Leaders",
      labelRu: "Воспитывать будущих лидеров",
      description:
        "Help mentees create their own leadership multiplication plans, ensuring the impact continues beyond your direct mentorship.",
      descriptionRu:
        "Помогайте подопечным создавать собственные планы умножения лидерства, чтобы влияние продолжалось и после вашего прямого наставничества.",
    },
  ].map((r, idx) => ({
    _key: key("resp", r.label, idx),
    _type: "responsibilityItem",
    ...r,
  })),

  commitmentDetails: [
    {
      label: "Monthly Time Commitment",
      labelRu: "Затраты в месяц",
      value: "4-6 hrs",
      valueRu: "4–6 ч.",
      icon: "Clock",
    },
    {
      label: "Program Duration",
      labelRu: "Длительность программы",
      value: "12 mo",
      valueRu: "12 мес.",
      icon: "Calendar",
    },
    {
      label: "Career Advancement Rate",
      labelRu: "Карьерный рост участников",
      value: "85%",
      valueRu: "85%",
      icon: "TrendingUp",
    },
    {
      label: "Mentorship Format",
      labelRu: "Формат наставничества",
      value: "1:1",
      valueRu: "1:1",
      icon: "Users",
    },
  ].map((c, idx) => ({
    _key: key("commit", c.label, idx),
    _type: "commitmentDetail",
    ...c,
  })),

  requirementsHeading: "Ideal Background",
  requirementsHeadingRu: "Идеальный опыт",
  requirements: [
    { label: "5+ years in executive or senior management roles", labelRu: "5+ лет в руководящих или старших управленческих ролях" },
    { label: "Experience leading teams of 10+ people", labelRu: "Опыт руководства командами от 10 человек" },
    { label: "Track record of developing other leaders", labelRu: "Подтверждённый опыт развития других лидеров" },
    { label: "Entrepreneurial or business development experience", labelRu: "Предпринимательский или бизнес-опыт" },
  ].map((r, idx) => ({
    _key: key("req", r.label, idx),
    _type: "requirementItem",
    ...r,
  })),

  processHeading: "12-Month Mentorship Program Structure",
  processHeadingRu: "Структура 12-месячной программы наставничества",
  processSteps: [
    {
      stepNumber: 1,
      label: "Months 1-3: Foundation Building",
      labelRu: "Месяцы 1–3: Закладка фундамента",
      description:
        "Establish trust, assess current leadership capacity, and set development goals.",
      descriptionRu:
        "Установите доверие, оцените текущий лидерский потенциал и поставьте цели развития.",
    },
    {
      stepNumber: 2,
      label: "Months 4-8: Skill Development",
      labelRu: "Месяцы 4–8: Развитие навыков",
      description:
        "Focus on core leadership competencies through real-world challenges and practice.",
      descriptionRu:
        "Сосредоточьтесь на ключевых лидерских компетенциях через реальные задачи и практику.",
    },
    {
      stepNumber: 3,
      label: "Months 9-12: Mastery & Multiplication",
      labelRu: "Месяцы 9–12: Мастерство и умножение",
      description:
        "Apply learned skills in real leadership challenges and develop others.",
      descriptionRu:
        "Применяйте приобретённые навыки в реальных лидерских задачах и развивайте других.",
    },
  ].map((s, idx) => ({
    _key: key("step", s.label, idx),
    _type: "processStep",
    ...s,
  })),

  benefitsHeading: "Professional Benefits",
  benefitsHeadingRu: "Профессиональные преимущества",
  benefits: [
    { label: "Develop your own mentoring and coaching skills", labelRu: "Развивайте собственные навыки наставничества и коучинга" },
    { label: "Gain cross-cultural leadership experience", labelRu: "Получайте межкультурный лидерский опыт" },
    { label: "Expand your global professional network", labelRu: "Расширяйте международную профессиональную сеть" },
    { label: "Professional references and recognition", labelRu: "Профессиональные рекомендации и признание" },
  ].map((b, idx) => ({
    _key: key("benefit", b.label, idx),
    _type: "benefitItem",
    ...b,
  })),

  closingCtaHeading: "Ready to Become a Leadership Mentor?",
  closingCtaHeadingRu: "Готовы стать наставником по лидерству?",
  closingCtaSubheading:
    "Join our founding team of leadership mentors and help shape the future of emerging leaders in Central Asia.",
  closingCtaSubheadingRu:
    "Присоединяйтесь к нашей команде наставников и помогите формировать будущее начинающих лидеров Центральной Азии.",
  closingCtaButtonLabel: "Apply to Mentor",
  closingCtaButtonLabelRu: "Подать заявку наставника",
  closingCtaUrl: "#apply-now",
};

const ALL: VolunteerOpportunityDetails[] = [
  ADMINISTRATIVE_SUPPORT,
  ADVOCACY_OUTREACH,
  BUSINESS_TRAINING,
  COMMUNITY_ORGANIZER,
  LEADERSHIP_MENTOR,
];

// ─── Patch helper ────────────────────────────────────────────────────────────

async function patchOpportunity(
  detail: VolunteerOpportunityDetails,
): Promise<{ ok: boolean; err?: string }> {
  const _id = `volunteerOpportunity.${detail.slug}`;

  // Verify the doc exists. If it doesn't, run migrate:volunteer first.
  const existing = await client.fetch<{ _id: string } | null>(
    `*[_id == $id][0]{_id}`,
    { id: _id },
  );

  if (!existing) {
    return {
      ok: false,
      err: `volunteerOpportunity.${detail.slug} not found — run migrate:volunteer first.`,
    };
  }

  await client
    .patch(_id)
    .set({
      responsibilitiesHeading: detail.responsibilitiesHeading,
      responsibilitiesHeadingRu: detail.responsibilitiesHeadingRu,
      responsibilities: detail.responsibilities,
      commitmentHeading: detail.commitmentHeading,
      commitmentHeadingRu: detail.commitmentHeadingRu,
      commitmentDetails: detail.commitmentDetails,
      requirementsHeading: detail.requirementsHeading,
      requirementsHeadingRu: detail.requirementsHeadingRu,
      requirements: detail.requirements,
      processHeading: detail.processHeading,
      processHeadingRu: detail.processHeadingRu,
      processSteps: detail.processSteps,
      benefitsHeading: detail.benefitsHeading,
      benefitsHeadingRu: detail.benefitsHeadingRu,
      benefits: detail.benefits,
      closingCtaHeading: detail.closingCtaHeading,
      closingCtaHeadingRu: detail.closingCtaHeadingRu,
      closingCtaSubheading: detail.closingCtaSubheading,
      closingCtaSubheadingRu: detail.closingCtaSubheadingRu,
      closingCtaButtonLabel: detail.closingCtaButtonLabel,
      closingCtaButtonLabelRu: detail.closingCtaButtonLabelRu,
      closingCtaUrl: detail.closingCtaUrl,
    })
    .commit();

  return { ok: true };
}

// ─── Main ────────────────────────────────────────────────────────────────────

async function main() {
  console.log(
    `\n🚀 Patching detail sections on ${ALL.length} volunteerOpportunity docs\n`,
  );
  console.log(`   project=${projectId} dataset=${dataset}\n`);

  let successes = 0;
  let failures = 0;

  for (const detail of ALL) {
    process.stdout.write(`→ volunteerOpportunity.${detail.slug} ... `);
    try {
      const result = await patchOpportunity(detail);
      if (result.ok) {
        successes++;
        console.log(
          `✅ patched (resp=${detail.responsibilities.length}, commit=${detail.commitmentDetails.length}, req=${detail.requirements.length}, steps=${detail.processSteps.length}, benefits=${detail.benefits.length})`,
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
    "\n✅ Done. Visit https://bbborders.sanity.studio/structure/volunteerOpportunity to verify.\n",
  );

  if (failures > 0) process.exit(1);
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
