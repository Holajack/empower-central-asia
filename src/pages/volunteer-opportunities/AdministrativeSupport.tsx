import React from "react";
import { Helmet } from "react-helmet";
import * as LucideIcons from "lucide-react";
import {
  ArrowRight,
  Network,
  CheckCircle2,
  Heart,
  Star,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import GoHighLevelForm from "@/components/forms/GoHighLevelForm";
import { useRegion } from "@/contexts/RegionContext";
import { useVolunteerOpportunity } from "@/hooks/useVolunteerOpportunity";
import type {
  CommitmentDetail,
  ResponsibilityItem,
  RequirementItem,
  BenefitItem,
} from "@/hooks/useVolunteerOpportunity";

// ─── Hardcoded fallbacks (used when Sanity arrays are empty) ────────────────
const FALLBACK_RESPONSIBILITIES_HEADING = "What You'll Do";
const FALLBACK_RESPONSIBILITIES_HEADING_RU = "Чем вы будете заниматься";

const FALLBACK_RESPONSIBILITIES: ResponsibilityItem[] = [
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
];

const FALLBACK_COMMITMENT_DETAILS: CommitmentDetail[] = [
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
];

const FALLBACK_REQUIREMENTS: RequirementItem[] = [
  {
    label: "Strong written communication skills",
    labelRu: "Сильные навыки письменной коммуникации",
  },
  {
    label: "Attention to detail and accuracy",
    labelRu: "Внимательность к деталям и точность",
  },
  {
    label: "Time management and organization",
    labelRu: "Управление временем и организованность",
  },
  {
    label: "Customer service orientation",
    labelRu: "Ориентация на качественное обслуживание",
  },
  {
    label: "Basic computer and internet skills",
    labelRu: "Базовые навыки работы с компьютером и интернетом",
  },
];

const FALLBACK_BENEFITS: BenefitItem[] = [
  {
    label: "Build portfolio of nonprofit experience",
    labelRu: "Пополнение портфолио опытом в некоммерческом секторе",
  },
  {
    label: "Professional references and recommendations",
    labelRu: "Профессиональные рекомендации и отзывы",
  },
  {
    label: "Network with business professionals",
    labelRu: "Нетворкинг с бизнес-профессионалами",
  },
  {
    label: "Gain international development experience",
    labelRu: "Опыт в международном развитии",
  },
  {
    label: "Flexible schedule for work-life balance",
    labelRu: "Гибкий график для баланса работы и жизни",
  },
];

const FALLBACK_CLOSING_HEADING = "Ready to Support Our Operations?";
const FALLBACK_CLOSING_HEADING_RU = "Готовы поддержать наши операции?";
const FALLBACK_CLOSING_SUBHEADING =
  "Join our administrative team and be the backbone that enables our programs to transform lives around the world.";
const FALLBACK_CLOSING_SUBHEADING_RU =
  "Вступайте в нашу административную команду и станьте опорой, которая позволяет нашим программам менять жизни людей по всему миру.";

// ─── Helpers ────────────────────────────────────────────────────────────────
const lucideIconMap = LucideIcons as unknown as Record<string, LucideIcon>;
function resolveIcon(name: string | undefined, fallback: LucideIcon): LucideIcon {
  if (!name) return fallback;
  return lucideIconMap[name] ?? fallback;
}

const AdministrativeSupport = () => {
  const { isCentralAsia } = useRegion();
  const { opportunity } = useVolunteerOpportunity("administrative-support");

  // Sanity-or-fallback content
  const responsibilitiesHeading = opportunity.getResponsibilitiesHeading(
    isCentralAsia
  ) || (isCentralAsia
    ? FALLBACK_RESPONSIBILITIES_HEADING_RU
    : FALLBACK_RESPONSIBILITIES_HEADING);

  const responsibilities =
    opportunity.responsibilities.length > 0
      ? opportunity.responsibilities
      : FALLBACK_RESPONSIBILITIES;

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
    (isCentralAsia ? "Необходимые навыки" : "Essential Skills");

  const benefits =
    opportunity.benefits.length > 0 ? opportunity.benefits : FALLBACK_BENEFITS;

  const benefitsHeading =
    opportunity.getBenefitsHeading(isCentralAsia) ||
    (isCentralAsia ? "Карьерные преимущества" : "Career Benefits");

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
        <meta name="keywords" content="administrative support volunteer, nonprofit admin volunteer, virtual assistant volunteer, event coordination volunteer, communications volunteer, database management volunteer opportunities, remote nonprofit volunteer" />
        <link rel="canonical" href="https://businessesbeyondborders.com/volunteer-opportunities/administrative-support" />
        <meta property="og:title" content={isCentralAsia ? "Административная поддержка | BBB" : "Admin Support Volunteer | BBB"} />
        <meta property="og:description" content={isCentralAsia ? "Станьте волонтёром административной поддержки в Businesses Beyond Borders. Помогайте с коммуникациями, мероприятиями и координацией программ. Гибкая удалённая работа из любой точки мира." : "Support essential operations as an Administrative Support Volunteer with Businesses Beyond Borders. Help with communications, events, and program coordination. Flexible remote work from anywhere."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/volunteer-opportunities/administrative-support" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "Административная поддержка — волонтёрские возможности | Businesses Beyond Borders" : "Administrative Support Volunteer - Essential Operations | Businesses Beyond Borders"} />
        <meta name="twitter:description" content={isCentralAsia ? "Станьте волонтёром административной поддержки в Businesses Beyond Borders. Помогайте с коммуникациями, мероприятиями и координацией программ. Гибкая удалённая работа из любой точки мира." : "Support essential operations as an Administrative Support Volunteer with Businesses Beyond Borders. Help with communications, events, and program coordination. Flexible remote work from anywhere."} />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#C9922A] to-red-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Network className="w-4 h-4" />
                {isCentralAsia ? "ПОДДЕРЖКА ОСНОВНЫХ ОПЕРАЦИЙ" : "ESSENTIAL OPERATIONS SUPPORT"}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {opportunity.getTitle(isCentralAsia)}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                {opportunity.getTagline(isCentralAsia)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#apply-now">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                    {isCentralAsia ? "Подать заявку на административную поддержку" : "Apply for Admin Support"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Link to="/get-involved">
                  <Button size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white hover:text-[#C9922A]/90 font-bold px-8 py-4 text-lg">
                    {isCentralAsia ? "Все возможности" : "View All Opportunities"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Key Stats — driven from Sanity commitmentDetails */}
        <div className="bg-white py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              {commitmentDetails.slice(0, 4).map((detail, idx) => {
                const Icon = resolveIcon(detail.icon, Sparkles);
                const tones = [
                  { bg: "bg-[#C9922A]/5", text: "text-[#C9922A]" },
                  { bg: "bg-blue-50", text: "text-blue-600" },
                  { bg: "bg-green-50", text: "text-green-600" },
                  { bg: "bg-[#C9922A]/5", text: "text-[#C9922A]" },
                ];
                const tone = tones[idx] ?? tones[0];
                return (
                  <div key={`${detail.label}-${idx}`} className={`${tone.bg} p-6 rounded-lg`}>
                    <div className={`flex items-center justify-center mb-2 ${tone.text}`}>
                      <Icon className="w-5 h-5 mr-1" />
                      <div className="text-2xl font-bold">
                        {isCentralAsia ? detail.valueRu || detail.value : detail.value}
                      </div>
                    </div>
                    <div className="text-sm text-gray-600">
                      {isCentralAsia ? detail.labelRu || detail.label : detail.label}
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
            <section className="mb-16 bg-gray-50 p-8 rounded-2xl">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                  {responsibilitiesHeading}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {responsibilities.map((r, idx) => (
                    <Card key={`${r.label}-${idx}`} className="text-center p-6">
                      <div className="bg-[#C9922A]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-8 h-8 text-[#C9922A]" />
                      </div>
                      <h3 className="font-semibold text-gray-800 mb-2">
                        {isCentralAsia ? r.labelRu || r.label : r.label}
                      </h3>
                      {(r.description || r.descriptionRu) && (
                        <p className="text-sm text-gray-600">
                          {isCentralAsia
                            ? r.descriptionRu || r.description
                            : r.description}
                        </p>
                      )}
                    </Card>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Requirements & Benefits — Sanity-driven side-by-side */}
          {(requirements.length > 0 || benefits.length > 0) && (
            <section className="mb-16 bg-gradient-to-br from-yellow-50 to-[#C9922A]/5 p-8 rounded-2xl">
              <div className="max-w-4xl mx-auto">
                <div className="grid md:grid-cols-2 gap-8">
                  {requirements.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Star className="w-6 h-6 text-yellow-500" />
                        {requirementsHeading}
                      </h3>
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
                  )}
                  {benefits.length > 0 && (
                    <div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                        <Heart className="w-6 h-6 text-red-500" />
                        {benefitsHeading}
                      </h3>
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
                  )}
                </div>
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
              title={isCentralAsia ? "Заявка волонтёра административной поддержки" : "Administrative Support Volunteer Application"}
              description={isCentralAsia ? "Подайте заявку, чтобы вступить в нашу команду административной поддержки. Мы рассмотрим вашу заявку и свяжемся с вами в течение 48 часов, чтобы обсудить наиболее подходящую роль для ваших навыков и доступности." : "Apply to join our administrative support team. We'll review your application and contact you within 48 hours to discuss the best role for your skills and availability."}
              submitButtonText={isCentralAsia ? "Отправить заявку на административную поддержку" : "Submit Admin Support Application"}
              volunteerOpportunity="admin-support"
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
              <Link to="/volunteer-opportunities/community-organizer" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
                <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Организатор сообщества" : "Community Organizer"}</p>
                <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Подробнее →" : "Learn more →"}</p>
              </Link>
              <Link to="/volunteer-opportunities/business-training" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
                <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Бизнес-тренер" : "Business Training"}</p>
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

export default AdministrativeSupport;
