import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  Megaphone,
  CheckCircle,
  Target,
  Sparkles,
  Heart,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
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
const FALLBACK_RESPONSIBILITIES_HEADING = "Advocacy & Outreach Opportunities";
const FALLBACK_RESPONSIBILITIES_HEADING_RU =
  "Направления адвокации и охвата";

const FALLBACK_RESPONSIBILITIES: ResponsibilityItem[] = [
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
];

const FALLBACK_COMMITMENT_DETAILS: CommitmentDetail[] = [
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
];

const FALLBACK_REQUIREMENTS: RequirementItem[] = [
  {
    label: "Excellent written and verbal communication",
    labelRu: "Отличные письменные и устные коммуникативные навыки",
  },
  {
    label: "Experience with social media marketing",
    labelRu: "Опыт работы с социальными сетями",
  },
  {
    label: "Content creation and storytelling abilities",
    labelRu: "Умение создавать контент и рассказывать истории",
  },
  {
    label: "Public speaking and presentation skills",
    labelRu: "Навыки публичных выступлений и презентаций",
  },
  {
    label: "Networking and relationship-building experience",
    labelRu: "Опыт в нетворкинге и выстраивании отношений",
  },
  {
    label: "Cultural sensitivity and awareness",
    labelRu: "Культурная чуткость и осведомлённость",
  },
];

const FALLBACK_BENEFITS: BenefitItem[] = [
  {
    label: "Advocacy and public speaking training",
    labelRu: "Тренинги по адвокации и публичным выступлениям",
  },
  {
    label: "Digital marketing workshops",
    labelRu: "Семинары по цифровому маркетингу",
  },
  {
    label: "Partnership development skills",
    labelRu: "Навыки развития партнёрств",
  },
  {
    label: "Content creation training",
    labelRu: "Обучение созданию контента",
  },
  {
    label: "Cultural competency education",
    labelRu: "Образование в области межкультурной компетентности",
  },
  {
    label: "Networking opportunities with leaders",
    labelRu: "Возможности для нетворкинга с лидерами",
  },
];

const FALLBACK_CLOSING_HEADING = "Ready to Amplify Our Mission?";
const FALLBACK_CLOSING_HEADING_RU = "Готовы усилить нашу миссию?";
const FALLBACK_CLOSING_SUBHEADING =
  "Join our advocacy team and help spread the message of economic empowerment across Central Asia.";
const FALLBACK_CLOSING_SUBHEADING_RU =
  "Присоединяйтесь к нашей команде адвокатов и помогите распространить послание об экономическом развитии по всей Центральной Азии.";

// ─── Helpers ────────────────────────────────────────────────────────────────
const lucideIconMap = LucideIcons as unknown as Record<string, LucideIcon>;
function resolveIcon(name: string | undefined, fallback: LucideIcon): LucideIcon {
  if (!name) return fallback;
  return lucideIconMap[name] ?? fallback;
}

const AdvocacyOutreach = () => {
  const { isCentralAsia } = useRegion();
  const { opportunity } = useVolunteerOpportunity("advocacy-outreach");

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
    (isCentralAsia ? "Идеальные навыки и качества" : "Ideal Skills & Qualities");

  const benefits =
    opportunity.benefits.length > 0 ? opportunity.benefits : FALLBACK_BENEFITS;
  const benefitsHeading =
    opportunity.getBenefitsHeading(isCentralAsia) ||
    (isCentralAsia ? "Что мы предоставляем" : "What We Provide");

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
        <meta name="keywords" content="advocacy volunteer, nonprofit outreach, communications volunteer, mission advocacy, nonprofit advocacy opportunities, remote advocacy volunteer" />
        <link rel="canonical" href="https://businessesbeyondborders.com/volunteer-opportunities/advocacy-outreach" />
        <meta property="og:title" content={isCentralAsia ? "Адвокация и продвижение — волонтёрские возможности | Businesses Beyond Borders" : "Advocacy & Outreach Volunteer - Amplify Our Mission | Businesses Beyond Borders"} />
        <meta property="og:description" content={isCentralAsia ? "Станьте волонтёром по адвокации и охвату в Businesses Beyond Borders. Помогите усилить нашу миссию по поддержке предпринимателей Центральной Азии через коммуникации и адвокацию." : "Become an Advocacy & Outreach volunteer with Businesses Beyond Borders. Help amplify our mission to empower entrepreneurs in Central Asia through communications and advocacy."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/volunteer-opportunities/advocacy-outreach" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "Адвокация и продвижение — волонтёрские возможности | Businesses Beyond Borders" : "Advocacy & Outreach Volunteer - Amplify Our Mission | Businesses Beyond Borders"} />
        <meta name="twitter:description" content={isCentralAsia ? "Станьте волонтёром по адвокации и охвату в Businesses Beyond Borders. Помогите усилить нашу миссию по поддержке предпринимателей Центральной Азии через коммуникации и адвокацию." : "Become an Advocacy & Outreach volunteer with Businesses Beyond Borders. Help amplify our mission to empower entrepreneurs in Central Asia through communications and advocacy."} />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1B2A4A] to-[#1B2A4A]/80 text-white pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              {isCentralAsia ? "Возможности для адвокации и охвата" : "Advocacy & Outreach Opportunities"}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {opportunity.getTitle(isCentralAsia)}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {opportunity.getTagline(isCentralAsia)}
            </p>
            {commitmentDetails.length > 0 && (
              <div className="flex flex-wrap justify-center gap-4 text-sm">
                {commitmentDetails.slice(0, 4).map((c, idx) => {
                  const Icon = resolveIcon(c.icon, Sparkles);
                  return (
                    <span key={`${c.label}-${idx}`} className="flex items-center gap-2">
                      <Icon className="h-4 w-4" />
                      {isCentralAsia ? c.labelRu || c.label : c.label}
                    </span>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Mission Overview — kept as a static introduction (not data-driven) */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold mb-4">
                  {isCentralAsia ? "Ваш голос — наша миссия" : "Your Voice, Our Mission"}
                </CardTitle>
                <CardDescription className="text-lg">
                  {opportunity.getSummary(isCentralAsia)}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Opportunity Areas — driven by responsibilities array */}
      {responsibilities.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                {responsibilitiesHeading}
              </h2>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                {responsibilities.map((r, idx) => {
                  const accentTones = [
                    { iconBg: "bg-green-100", iconText: "text-green-600" },
                    { iconBg: "bg-blue-100", iconText: "text-blue-600" },
                    { iconBg: "bg-[#C9922A]/10", iconText: "text-[#C9922A]" },
                    { iconBg: "bg-[#C9922A]/10", iconText: "text-[#C9922A]" },
                  ];
                  const tone = accentTones[idx] ?? accentTones[0];
                  return (
                    <Card key={`${r.label}-${idx}`} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-center gap-3 mb-2">
                          <div className={`p-2 ${tone.iconBg} rounded-lg`}>
                            <Megaphone className={`h-6 w-6 ${tone.iconText}`} />
                          </div>
                          <CardTitle className="text-xl">
                            {isCentralAsia ? r.labelRu || r.label : r.label}
                          </CardTitle>
                        </div>
                        {(r.description || r.descriptionRu) && (
                          <CardDescription>
                            {isCentralAsia
                              ? r.descriptionRu || r.description
                              : r.description}
                          </CardDescription>
                        )}
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Requirements — Sanity-driven */}
      {requirements.length > 0 && (
        <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                {requirementsHeading}
              </h2>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    {isCentralAsia ? "Идеальные навыки" : "Ideal Skills"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {requirements.map((req, idx) => (
                      <li key={`${req.label}-${idx}`} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          {isCentralAsia ? req.labelRu || req.label : req.label}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Benefits — Sanity-driven */}
      {benefits.length > 0 && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">
                {benefitsHeading}
              </h2>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    {isCentralAsia ? "Профессиональное развитие" : "Professional Development"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {benefits.map((b, idx) => (
                      <li key={`${b.label}-${idx}`} className="flex items-start gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>
                          {isCentralAsia ? b.labelRu || b.label : b.label}
                          {(b.description || b.descriptionRu) && (
                            <span className="text-muted-foreground">
                              {" — "}
                              {isCentralAsia
                                ? b.descriptionRu || b.description
                                : b.description}
                            </span>
                          )}
                        </span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">{closingHeading}</h2>
              <p className="text-lg text-muted-foreground">{closingSubheading}</p>
            </div>

            <GoHighLevelForm
              formType="volunteer"
              title={isCentralAsia ? "Заявка на участие в адвокации и охвате" : "Advocacy & Outreach Application"}
              description={isCentralAsia ? "Расскажите нам о вашем опыте в адвокации и о том, как вы хотели бы помочь расширить наш охват и влияние." : "Tell us about your advocacy experience and how you'd like to help expand our reach and impact."}
              submitButtonText={isCentralAsia ? "Отправить заявку" : "Submit Application"}
            />

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {isCentralAsia ? "Есть вопросы о возможностях для адвокации?" : "Questions about advocacy opportunities?"}
              </p>
              <Button variant="outline" asChild>
                {isCentralAsia ? (
                  <a href="https://wa.me/13865171527" className="inline-flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                    Написать нам в WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Link to="/contact" className="inline-flex items-center gap-2">
                    Contact Our Team
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Other Opportunities */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="mt-4 border-t border-gray-200 pt-8 max-w-4xl mx-auto">
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
              <Link to="/volunteer-opportunities/administrative-support" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
                <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Административная поддержка" : "Administrative Support"}</p>
                <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Подробнее →" : "Learn more →"}</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default AdvocacyOutreach;
