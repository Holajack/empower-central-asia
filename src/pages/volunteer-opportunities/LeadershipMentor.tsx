import React from "react";
import { Helmet } from "react-helmet";
import {
  ArrowRight,
  Target,
  CheckCircle2,
  Heart,
  Star,
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
const FALLBACK_RESPONSIBILITIES_HEADING =
  "What You'll Do as a Leadership Mentor";
const FALLBACK_RESPONSIBILITIES_HEADING_RU =
  "Чем вы будете заниматься как наставник по лидерству";

const FALLBACK_RESPONSIBILITIES: ResponsibilityItem[] = [
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
];

const FALLBACK_COMMITMENT_DETAILS: CommitmentDetail[] = [
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
];

const FALLBACK_REQUIREMENTS: RequirementItem[] = [
  {
    label: "5+ years in executive or senior management roles",
    labelRu: "5+ лет в руководящих или старших управленческих ролях",
  },
  {
    label: "Experience leading teams of 10+ people",
    labelRu: "Опыт руководства командами от 10 человек",
  },
  {
    label: "Track record of developing other leaders",
    labelRu: "Подтверждённый опыт развития других лидеров",
  },
  {
    label: "Entrepreneurial or business development experience",
    labelRu: "Предпринимательский или бизнес-опыт",
  },
];

const FALLBACK_PROCESS_HEADING = "12-Month Mentorship Program Structure";
const FALLBACK_PROCESS_HEADING_RU = "Структура 12-месячной программы наставничества";

const FALLBACK_PROCESS_STEPS: ProcessStep[] = [
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
];

const FALLBACK_BENEFITS: BenefitItem[] = [
  {
    label: "Develop your own mentoring and coaching skills",
    labelRu: "Развивайте собственные навыки наставничества и коучинга",
  },
  {
    label: "Gain cross-cultural leadership experience",
    labelRu: "Получайте межкультурный лидерский опыт",
  },
  {
    label: "Expand your global professional network",
    labelRu: "Расширяйте международную профессиональную сеть",
  },
  {
    label: "Professional references and recognition",
    labelRu: "Профессиональные рекомендации и признание",
  },
];

const FALLBACK_CLOSING_HEADING = "Ready to Become a Leadership Mentor?";
const FALLBACK_CLOSING_HEADING_RU = "Готовы стать наставником по лидерству?";
const FALLBACK_CLOSING_SUBHEADING =
  "Join our founding team of leadership mentors and help shape the future of emerging leaders in Central Asia.";
const FALLBACK_CLOSING_SUBHEADING_RU =
  "Присоединяйтесь к нашей команде наставников и помогите формировать будущее начинающих лидеров Центральной Азии.";

// ─── Helpers ────────────────────────────────────────────────────────────────
const lucideIconMap = LucideIcons as unknown as Record<string, LucideIcon>;
function resolveIcon(name: string | undefined, fallback: LucideIcon): LucideIcon {
  if (!name) return fallback;
  return lucideIconMap[name] ?? fallback;
}

const LeadershipMentor = () => {
  const { isCentralAsia } = useRegion();
  const { opportunity } = useVolunteerOpportunity("leadership-mentor");

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
    (isCentralAsia ? "Идеальный опыт" : "Ideal Background");

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
    (isCentralAsia ? "Профессиональные преимущества" : "Professional Benefits");

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
        <meta name="keywords" content="leadership mentor volunteer, business mentorship opportunities, executive coaching volunteer, leadership development mentor, mentor volunteer Central Asia, nonprofit mentorship program, volunteer business advisor opportunities, remote volunteer mentoring" />
        <link rel="canonical" href="https://businessesbeyondborders.com/volunteer-opportunities/leadership-mentor" />
        <meta property="og:title" content={isCentralAsia ? "Ментор лидерства | BBB" : "Leadership Mentor Volunteer | BBB"} />
        <meta property="og:description" content={isCentralAsia ? "Станьте наставником по развитию лидерства в Businesses Beyond Borders. Ведите начинающих лидеров через проверенную 12-месячную программу по модели 70-20-10. 4–6 часов в месяц. Глобальное влияние из любой точки мира." : "Become a Leadership Development Mentor with Businesses Beyond Borders. Guide emerging leaders through our proven 12-month program using the 70-20-10 model. 4-6 hours monthly commitment. Make global impact from anywhere."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/volunteer-opportunities/leadership-mentor" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "Ментор лидерства — волонтёрские возможности | Businesses Beyond Borders" : "Leadership Development Mentor - Volunteer Opportunity | Businesses Beyond Borders"} />
        <meta name="twitter:description" content={isCentralAsia ? "Станьте наставником по развитию лидерства в Businesses Beyond Borders. Ведите начинающих лидеров через проверенную 12-месячную программу по модели 70-20-10. 4–6 часов в месяц. Глобальное влияние из любой точки мира." : "Become a Leadership Development Mentor with Businesses Beyond Borders. Guide emerging leaders through our proven 12-month program using the 70-20-10 model. 4-6 hours monthly commitment. Make global impact from anywhere."} />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-[#1B2A4A] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Target className="w-4 h-4" />
                {isCentralAsia ? "ПРИОРИТЕТНАЯ ВОЛОНТЁРСКАЯ ВОЗМОЖНОСТЬ" : "HIGH PRIORITY VOLUNTEER OPPORTUNITY"}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {opportunity.getTitle(isCentralAsia)}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                {opportunity.getTagline(isCentralAsia)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#apply-now">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                    {isCentralAsia ? "Подать заявку наставника" : "Apply to Mentor"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Link to="/get-involved">
                  <Button size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8 py-4 text-lg">
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
                  { bg: "bg-blue-50", text: "text-blue-600" },
                  { bg: "bg-green-50", text: "text-green-600" },
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
          {/* Responsibilities — "What You'll Do" */}
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
                      { border: "border-green-500", text: "text-green-600" },
                      { border: "border-[#C9922A]", text: "text-[#C9922A]" },
                      { border: "border-[#C9922A]", text: "text-[#C9922A]" },
                    ];
                    const tone = tones[idx % tones.length];
                    return (
                      <Card
                        key={`${r.label}-${idx}`}
                        className={`border-l-4 ${tone.border} shadow-lg`}
                      >
                        <CardHeader>
                          <CardTitle className={`flex items-center gap-2 ${tone.text}`}>
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

          {/* Requirements — Sanity-driven */}
          {requirements.length > 0 && (
            <section className="mb-16 bg-gray-50 p-8 rounded-2xl">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                  {requirementsHeading}
                </h2>
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
            </section>
          )}

          {/* Process Steps — 12-Month Program */}
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

          {/* Benefits — Sanity-driven */}
          {benefits.length > 0 && (
            <section className="mb-16 bg-gradient-to-br from-[#C9922A]/5 to-[#C9922A]/10 p-8 rounded-2xl">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800 flex items-center justify-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500" />
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
              title={isCentralAsia ? "Заявка наставника по лидерству" : "Leadership Mentor Application"}
              description={isCentralAsia ? "Подайте заявку, чтобы стать наставником по развитию лидерства. Мы рассмотрим вашу заявку и свяжемся с вами в течение 48 часов." : "Apply to become a leadership development mentor. We'll review your application and contact you within 48 hours."}
              submitButtonText={isCentralAsia ? "Отправить заявку наставника" : "Submit Mentor Application"}
              volunteerOpportunity="leadership-mentor"
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
              <Link to="/volunteer-opportunities/community-organizer" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
                <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Организатор сообщества" : "Community Organizer"}</p>
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

export default LeadershipMentor;
