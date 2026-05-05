import React from "react";
import { Helmet } from "react-helmet";
import {
  ArrowRight,
  HandHelping,
  CheckCircle2,
  Heart,
  Award,
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
  BenefitItem,
} from "@/hooks/useVolunteerOpportunity";

// ─── Hardcoded fallbacks ────────────────────────────────────────────────────
const FALLBACK_RESPONSIBILITIES_HEADING = "Support Our Proven Training Programs";
const FALLBACK_RESPONSIBILITIES_HEADING_RU =
  "Поддержите наши проверенные программы обучения";

const FALLBACK_RESPONSIBILITIES: ResponsibilityItem[] = [
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
];

const FALLBACK_COMMITMENT_DETAILS: CommitmentDetail[] = [
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
];

const FALLBACK_REQUIREMENTS: RequirementItem[] = [
  {
    label: "Business experience or educational background",
    labelRu: "Бизнес-опыт или профильное образование",
  },
  {
    label: "Financial literacy or accounting knowledge",
    labelRu: "Знания в области финансовой грамотности или бухгалтерии",
  },
  {
    label: "Teaching, training, or presentation experience",
    labelRu: "Опыт преподавания, обучения или презентаций",
  },
  {
    label: "Entrepreneurial or small business experience",
    labelRu: "Предпринимательский опыт или опыт малого бизнеса",
  },
];

const FALLBACK_BENEFITS: BenefitItem[] = [
  {
    label: "Program methodology training",
    labelRu: "Обучение методологии программы",
  },
  {
    label: "Cultural sensitivity workshop",
    labelRu: "Семинар по культурной чуткости",
  },
  {
    label: "Technology platform tutorial",
    labelRu: "Руководство по технологической платформе",
  },
  {
    label: "Practice sessions with feedback",
    labelRu: "Практические занятия с обратной связью",
  },
];

const FALLBACK_CLOSING_HEADING = "Ready to Support Our Training Programs?";
const FALLBACK_CLOSING_HEADING_RU = "Готовы поддержать наши программы обучения?";
const FALLBACK_CLOSING_SUBHEADING =
  "Join our team of business training volunteers and help entrepreneurs build successful, sustainable businesses.";
const FALLBACK_CLOSING_SUBHEADING_RU =
  "Присоединяйтесь к нашей команде волонтёров бизнес-обучения и помогайте предпринимателям строить успешные и устойчивые предприятия.";

// ─── Helpers ────────────────────────────────────────────────────────────────
const lucideIconMap = LucideIcons as unknown as Record<string, LucideIcon>;
function resolveIcon(name: string | undefined, fallback: LucideIcon): LucideIcon {
  if (!name) return fallback;
  return lucideIconMap[name] ?? fallback;
}

const BusinessTraining = () => {
  const { isCentralAsia } = useRegion();
  const { opportunity } = useVolunteerOpportunity("business-training");

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

  const benefits =
    opportunity.benefits.length > 0 ? opportunity.benefits : FALLBACK_BENEFITS;
  const benefitsHeading =
    opportunity.getBenefitsHeading(isCentralAsia) ||
    (isCentralAsia ? "Комплексная адаптация" : "Comprehensive Onboarding");

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
        <meta
          name="keywords"
          content="business training volunteer, financial literacy volunteer, entrepreneurship education volunteer, business mentor volunteer, nonprofit training volunteer, volunteer business instructor opportunities, remote business training"
        />
        <link rel="canonical" href="https://businessesbeyondborders.com/volunteer-opportunities/business-training" />
        <meta
          property="og:title"
          content={
            isCentralAsia
              ? "Волонтёр бизнес-обучения - Поддержите наши программы | Businesses Beyond Borders"
              : "Business Training Volunteer - Support Our Programs | Businesses Beyond Borders"
          }
        />
        <meta
          property="og:description"
          content={
            isCentralAsia
              ? "Поддержите наши проверенные программы финансовой грамотности и создания бизнеса как волонтёр бизнес-обучения. Гибкий удалённый график."
              : "Support our proven Financial Literacy and Business Creation programs as a Business Training Volunteer. Help entrepreneurs in Central Asia develop essential business skills. Flexible remote scheduling."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/volunteer-opportunities/business-training" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            isCentralAsia
              ? "Волонтёр бизнес-обучения - Поддержите наши программы | Businesses Beyond Borders"
              : "Business Training Volunteer - Support Our Programs | Businesses Beyond Borders"
          }
        />
        <meta
          name="twitter:description"
          content={
            isCentralAsia
              ? "Поддержите наши проверенные программы финансовой грамотности и создания бизнеса. Гибкий удалённый график."
              : "Support our proven Financial Literacy and Business Creation programs as a Business Training Volunteer. Help entrepreneurs in Central Asia develop essential business skills. Flexible remote scheduling."
          }
        />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#1B2A4A] to-[#1B2A4A]/80 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <HandHelping className="w-4 h-4" />
                {isCentralAsia
                  ? "ПОДДЕРЖКА ПРОВЕРЕННЫХ ПРОГРАММ"
                  : "PROVEN PROGRAM SUPPORT"}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {opportunity.getTitle(isCentralAsia)}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                {opportunity.getTagline(isCentralAsia)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#apply-now">
                  <Button
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg"
                  >
                    {isCentralAsia
                      ? "Подать заявку на участие в программах"
                      : "Apply to Support Programs"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Link to="/get-involved">
                  <Button
                    size="lg"
                    className="bg-transparent border border-white/40 text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8 py-4 text-lg"
                  >
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
                  { bg: "bg-[#C9922A]/5", text: "text-[#C9922A]" },
                  { bg: "bg-green-50", text: "text-green-600" },
                  { bg: "bg-blue-50", text: "text-blue-600" },
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
          {/* Volunteer Roles — Sanity-driven responsibilities */}
          {responsibilities.length > 0 && (
            <section className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                  {responsibilitiesHeading}
                </h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {responsibilities.map((r, idx) => {
                    const tones = [
                      { bg: "bg-[#C9922A]/10", text: "text-[#C9922A]" },
                      { bg: "bg-green-100", text: "text-green-600" },
                      { bg: "bg-blue-100", text: "text-blue-600" },
                    ];
                    const tone = tones[idx % tones.length];
                    return (
                      <Card key={`${r.label}-${idx}`} className="text-center p-6">
                        <div
                          className={`${tone.bg} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}
                        >
                          <Sparkles className={`w-8 h-8 ${tone.text}`} />
                        </div>
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {isCentralAsia ? r.labelRu || r.label : r.label}
                        </h3>
                        {(r.description || r.descriptionRu) && (
                          <p className="text-sm text-gray-600 mb-4">
                            {isCentralAsia
                              ? r.descriptionRu || r.description
                              : r.description}
                          </p>
                        )}
                      </Card>
                    );
                  })}
                </div>
              </div>
            </section>
          )}

          {/* Benefits — Sanity-driven */}
          {benefits.length > 0 && (
            <section className="mb-16 bg-gray-50 p-8 rounded-2xl">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                  {benefitsHeading}
                </h2>
                <Card className="border-l-4 border-[#C9922A]">
                  <CardHeader>
                    <CardTitle className="text-[#C9922A]">
                      {isCentralAsia ? "Что мы предоставляем" : "What We Provide"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-600">
                      {benefits.map((b, idx) => (
                        <li
                          key={`${b.label}-${idx}`}
                          className="flex items-start gap-2"
                        >
                          <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
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
                  </CardContent>
                </Card>
              </div>
            </section>
          )}

          {/* Requirements — Sanity-driven */}
          {requirements.length > 0 && (
            <section className="mb-16">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                  {requirementsHeading}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Award className="w-6 h-6 text-[#C9922A]" />
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
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      <Heart className="w-6 h-6 text-red-500" />
                      {isCentralAsia ? "Важные качества" : "Essential Qualities"}
                    </h3>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Стремление помогать другим добиваться успеха"
                          : "Passion for helping others succeed"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Терпеливый и воодушевляющий стиль преподавания"
                          : "Patient and encouraging teaching style"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Культурная чуткость и адаптивность"
                          : "Cultural sensitivity and adaptability"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Надёжность и приверженность успеху программы"
                          : "Reliable and committed to program success"}
                      </li>
                    </ul>
                  </div>
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
              title={
                isCentralAsia
                  ? "Заявка волонтёра бизнес-обучения"
                  : "Business Training Volunteer Application"
              }
              description={
                isCentralAsia
                  ? "Подайте заявку для поддержки наших проверенных программ финансовой грамотности и создания бизнеса. Мы рассмотрим её и свяжемся с вами в течение 48 часов."
                  : "Apply to support our proven Financial Literacy and Business Creation programs. We'll review your application and contact you within 48 hours."
              }
              submitButtonText={
                isCentralAsia
                  ? "Подать заявку волонтёра по обучению"
                  : "Submit Training Volunteer Application"
              }
              volunteerOpportunity="business-trainer"
            />
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

export default BusinessTraining;
