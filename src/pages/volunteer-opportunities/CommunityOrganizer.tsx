import React from "react";
import { Helmet } from "react-helmet";
import {
  ArrowRight,
  CheckCircle2,
  Heart,
  UserPlus,
  Sparkles,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import GoHighLevelForm from "@/components/forms/GoHighLevelForm";
import { useRegion } from "@/contexts/RegionContext";
import { useVolunteerOpportunity } from "@/hooks/useVolunteerOpportunity";
import type {
  CommitmentDetail,
  ResponsibilityItem,
  RequirementItem,
  ProcessStep,
  BenefitItem,
} from "@/hooks/useVolunteerOpportunity";

// ─── Hardcoded fallbacks ────────────────────────────────────────────────────
const FALLBACK_RESPONSIBILITIES_HEADING = "Community Organizer Roles Available";
const FALLBACK_RESPONSIBILITIES_HEADING_RU =
  "Доступные роли организаторов сообщества";

const FALLBACK_RESPONSIBILITIES: ResponsibilityItem[] = [
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
];

const FALLBACK_COMMITMENT_DETAILS: CommitmentDetail[] = [
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
];

const FALLBACK_REQUIREMENTS: RequirementItem[] = [
  {
    label: "Event planning or project coordination experience",
    labelRu: "Опыт планирования мероприятий или координации проектов",
  },
  {
    label: "Community organizing or volunteer management",
    labelRu: "Организация сообщества или управление волонтёрами",
  },
  {
    label: "Business networking or partnership development",
    labelRu: "Деловой нетворкинг или развитие партнёрств",
  },
  {
    label: "Social media and communications experience",
    labelRu: "Опыт работы в социальных сетях и коммуникациях",
  },
];

const FALLBACK_PROCESS_HEADING =
  "Community Collaboration Development Timeline";
const FALLBACK_PROCESS_HEADING_RU =
  "График развития взаимодействия сообщества";

const FALLBACK_PROCESS_STEPS: ProcessStep[] = [
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
];

const FALLBACK_BENEFITS: BenefitItem[] = [
  {
    label: "Build program management and coordination skills",
    labelRu: "Развивайте навыки управления программами и координации",
  },
  {
    label: "Develop extensive professional network",
    labelRu: "Расширяйте обширную профессиональную сеть",
  },
  {
    label: "Gain experience in startup and nonprofit sectors",
    labelRu: "Получайте опыт в стартапах и некоммерческом секторе",
  },
  {
    label: "Leadership development opportunities",
    labelRu: "Возможности для развития лидерских качеств",
  },
];

const FALLBACK_CLOSING_HEADING = "Ready to Join Our Founding Team?";
const FALLBACK_CLOSING_HEADING_RU = "Готовы вступить в нашу команду-основателей?";
const FALLBACK_CLOSING_SUBHEADING =
  "Be part of building something new! Apply to become a Community Organizer and help us create lasting impact.";
const FALLBACK_CLOSING_SUBHEADING_RU =
  "Станьте частью чего-то нового! Подайте заявку на роль организатора сообщества и помогите нам создать долгосрочное влияние.";

// ─── Helpers ────────────────────────────────────────────────────────────────
const lucideIconMap = LucideIcons as unknown as Record<string, LucideIcon>;
function resolveIcon(name: string | undefined, fallback: LucideIcon): LucideIcon {
  if (!name) return fallback;
  return lucideIconMap[name] ?? fallback;
}

const CommunityOrganizer = () => {
  const { isCentralAsia } = useRegion();
  const { opportunity } = useVolunteerOpportunity("community-organizer");

  const responsibilities =
    opportunity.responsibilities.length > 0
      ? opportunity.responsibilities
      : FALLBACK_RESPONSIBILITIES;
  const responsibilitiesHeading =
    opportunity.getResponsibilitiesHeading(isCentralAsia) ||
    (isCentralAsia
      ? FALLBACK_RESPONSIBILITIES_HEADING_RU
      : FALLBACK_RESPONSIBILITIES_HEADING);

  const commitmentDetails =
    opportunity.commitmentDetails.length > 0
      ? opportunity.commitmentDetails
      : FALLBACK_COMMITMENT_DETAILS;

  const requirements =
    opportunity.requirements.length > 0
      ? opportunity.requirements
      : FALLBACK_REQUIREMENTS;
  const requirementsHeading =
    opportunity.getRequirementsHeading(isCentralAsia) ||
    (isCentralAsia ? "Опыт, который мы ценим" : "Experience We Value");

  const processSteps =
    opportunity.processSteps.length > 0
      ? opportunity.processSteps
      : FALLBACK_PROCESS_STEPS;
  const processHeading =
    opportunity.getProcessHeading(isCentralAsia) ||
    (isCentralAsia ? FALLBACK_PROCESS_HEADING_RU : FALLBACK_PROCESS_HEADING);

  const benefits =
    opportunity.benefits.length > 0 ? opportunity.benefits : FALLBACK_BENEFITS;
  const benefitsHeading =
    opportunity.getBenefitsHeading(isCentralAsia) ||
    (isCentralAsia ? "Профессиональный рост" : "Professional Growth");

  const closingHeading =
    opportunity.getClosingCtaHeading(isCentralAsia) ||
    (isCentralAsia ? FALLBACK_CLOSING_HEADING_RU : FALLBACK_CLOSING_HEADING);
  const closingSubheading =
    opportunity.getClosingCtaSubheading(isCentralAsia) ||
    (isCentralAsia
      ? FALLBACK_CLOSING_SUBHEADING_RU
      : FALLBACK_CLOSING_SUBHEADING);

  return (
    <>
      <Helmet>
        <title>{`${opportunity.getTitle(isCentralAsia)} | BBB`}</title>
        <meta name="description" content={opportunity.getSummary(isCentralAsia) || opportunity.getTagline(isCentralAsia)} />
        <meta name="keywords" content="community organizer volunteer, volunteer coordinator opportunities, nonprofit community organizing, volunteer program coordinator, community development volunteer, nonprofit outreach volunteer opportunities, remote community organizer" />
        <link rel="canonical" href="https://businessesbeyondborders.com/volunteer-opportunities/community-organizer" />
        <meta property="og:title" content={isCentralAsia ? "Организатор сообщества | BBB" : "Community Organizer Volunteer | BBB"} />
        <meta property="og:description" content={isCentralAsia ? "Вступайте в команду-основателей как организатор сообщества в Businesses Beyond Borders. Создавайте сети взаимодействия для предпринимателей. 2 часа в неделю. Глобальное влияние из любой точки мира." : "Join our founding team as a Community Organizer with Businesses Beyond Borders. Build volunteer-driven community collaboration networks connecting entrepreneurs. 2 hours/week commitment. Make global impact from anywhere."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/volunteer-opportunities/community-organizer" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "Организатор сообщества — волонтёрские возможности | Businesses Beyond Borders" : "Community Organizer - Volunteer Opportunity | Businesses Beyond Borders"} />
        <meta name="twitter:description" content={isCentralAsia ? "Вступайте в команду-основателей как организатор сообщества в Businesses Beyond Borders. Создавайте сети взаимодействия для предпринимателей. 2 часа в неделю. Глобальное влияние из любой точки мира." : "Join our founding team as a Community Organizer with Businesses Beyond Borders. Build volunteer-driven community collaboration networks connecting entrepreneurs. 2 hours/week commitment. Make global impact from anywhere."} />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-600 to-teal-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <UserPlus className="w-4 h-4" />
                {isCentralAsia ? "ВОЗМОЖНОСТЬ ВОЙТИ В КОМАНДУ-ОСНОВАТЕЛЕЙ" : "FOUNDING TEAM OPPORTUNITY"}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {opportunity.getTitle(isCentralAsia)}
              </h1>
              <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed mb-8">
                {opportunity.getTagline(isCentralAsia)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#apply-now">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                    {isCentralAsia ? "Вступить в команду-основателей" : "Join Founding Team"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Link to="/get-involved">
                  <Button size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white hover:text-green-700 font-bold px-8 py-4 text-lg">
                    {isCentralAsia ? "Все возможности" : "View All Opportunities"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Key Stats — Sanity-driven */}
        <div className="bg-white py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {commitmentDetails.slice(0, 4).map((c, idx) => {
                const Icon = resolveIcon(c.icon, Sparkles);
                const tones = [
                  { bg: "bg-green-50", text: "text-green-600" },
                  { bg: "bg-blue-50", text: "text-blue-600" },
                  { bg: "bg-[#C9922A]/5", text: "text-[#C9922A]" },
                  { bg: "bg-[#C9922A]/5", text: "text-[#C9922A]" },
                ];
                const tone = tones[idx] ?? tones[0];
                return (
                  <div key={`${c.label}-${idx}`} className={`${tone.bg} p-6 rounded-lg`}>
                    <div className={`flex items-center justify-center mb-2 ${tone.text}`}>
                      <Icon className="w-5 h-5 mr-1" />
                      <div className="text-2xl font-bold">
                        {isCentralAsia ? c.valueRu || c.value : c.value}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {isCentralAsia ? c.labelRu || c.label : c.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Available Roles — Sanity-driven responsibilities */}
          {responsibilities.length > 0 && (
            <section className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                  {responsibilitiesHeading}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {responsibilities.map((r, idx) => {
                    const tones = [
                      { border: "border-blue-500", text: "text-blue-600" },
                      { border: "border-[#C9922A]", text: "text-[#C9922A]" },
                      { border: "border-[#C9922A]", text: "text-[#C9922A]" },
                      { border: "border-teal-500", text: "text-teal-600" },
                    ];
                    const tone = tones[idx % tones.length];
                    return (
                      <Card
                        key={`${r.label}-${idx}`}
                        className={`border-l-4 ${tone.border} shadow-lg`}
                      >
                        <CardHeader>
                          <CardTitle
                            className={`flex items-center gap-2 ${tone.text}`}
                          >
                            <Sparkles className="w-6 h-6" />
                            {isCentralAsia ? r.labelRu || r.label : r.label}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          {(r.description || r.descriptionRu) && (
                            <p className="text-gray-600 mb-4">
                              {isCentralAsia
                                ? r.descriptionRu || r.description
                                : r.description}
                            </p>
                          )}
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Process Steps — timeline phases */}
          {processSteps.length > 0 && (
            <section className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                  {processHeading}
                </h2>
                <div className="space-y-6">
                  {processSteps.map((step, idx) => {
                    const tones = [
                      { border: "border-blue-500", text: "text-blue-600" },
                      { border: "border-green-500", text: "text-green-600" },
                      { border: "border-[#C9922A]", text: "text-[#C9922A]" },
                    ];
                    const tone = tones[idx % tones.length];
                    return (
                      <Card
                        key={`${step.stepNumber}-${idx}`}
                        className={`border-l-4 ${tone.border}`}
                      >
                        <CardHeader>
                          <CardTitle className={tone.text}>
                            {isCentralAsia ? step.labelRu || step.label : step.label}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600">
                            {isCentralAsia
                              ? step.descriptionRu || step.description
                              : step.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Requirements — Sanity-driven */}
          {requirements.length > 0 && (
            <section className="mb-16 bg-gray-50 p-8 rounded-2xl">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                  {requirementsHeading}
                </h2>
                <div className="grid md:grid-cols-1 gap-8">
                  <ul className="space-y-3 text-gray-600">
                    {requirements.map((req, idx) => (
                      <li
                        key={`${req.label}-${idx}`}
                        className="flex items-start gap-2"
                      >
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? req.labelRu || req.label : req.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Benefits — Sanity-driven */}
          {benefits.length > 0 && (
            <section className="mb-16 bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                  {benefitsHeading}
                </h2>
                <ul className="space-y-3 text-gray-600">
                  {benefits.map((b, idx) => (
                    <li
                      key={`${b.label}-${idx}`}
                      className="flex items-start gap-2"
                    >
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      <div>
                        <span>
                          {isCentralAsia ? b.labelRu || b.label : b.label}
                        </span>
                        {(b.description || b.descriptionRu) && (
                          <p className="text-sm text-gray-500 mt-1">
                            {isCentralAsia
                              ? b.descriptionRu || b.description
                              : b.description}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          )}

          {/* Application Form Section */}
          <section id="apply-now" className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {closingHeading}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {closingSubheading}
              </p>
            </div>
            <GoHighLevelForm
              formType="volunteer"
              title={isCentralAsia ? "Заявка организатора сообщества" : "Community Organizer Application"}
              description={isCentralAsia ? "Подайте заявку, чтобы войти в команду-основателей организаторов сообщества. Мы рассмотрим вашу заявку и свяжемся с вами в течение 48 часов." : "Apply to join our founding team of Community Organizers. We'll review your application and contact you within 48 hours."}
              submitButtonText={isCentralAsia ? "Отправить заявку организатора сообщества" : "Submit Community Organizer Application"}
              volunteerOpportunity="community-organizer"
            />
            {isCentralAsia && (
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Есть вопросы? Напишите нам напрямую:
                </p>
                <Button variant="outline" asChild>
                  <a href="https://wa.me/13865171527" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    Написать в WhatsApp
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            )}
          </section>

          {/* Other Opportunities */}
          <div className="mt-12 border-t border-gray-200 pt-8 max-w-4xl mx-auto">
            <h2 className="text-lg font-bold text-[#1B2A4A] mb-4">
              {isCentralAsia ? "Другие возможности" : "Other Opportunities"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Link to="/volunteer-opportunities/leadership-mentor" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
                <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Ментор лидерства" : "Leadership Mentor"}</p>
                <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Подробнее →" : "Learn more →"}</p>
              </Link>
              <Link to="/volunteer-opportunities/business-training" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
                <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Бизнес-тренер" : "Business Training"}</p>
                <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Подробнее →" : "Learn more →"}</p>
              </Link>
              <Link to="/volunteer-opportunities/administrative-support" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
                <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Административная поддержка" : "Administrative Support"}</p>
                <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Подробнее →" : "Learn more →"}</p>
              </Link>
              <Link to="/volunteer-opportunities/advocacy-outreach" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
                <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Адвокация и продвижение" : "Advocacy & Outreach"}</p>
                <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Подробнее →" : "Learn more →"}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommunityOrganizer;
