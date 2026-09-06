import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Briefcase,
  Clock,
  ArrowRight,
  CheckCircle2,
  Lock,
  Trophy,
  Users,
  Zap,
  Shield,
  AlertTriangle,
  Lightbulb,
  Target,
  Rocket,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { businessModules } from "@/data/business-course";
import type { BusinessWeekContent } from "@/data/business-course/types";
import { getLocalizedWeeks } from "@/data/ru";
import { useRegion } from "@/contexts/RegionContext";
import { useProgressSync } from "@/hooks/useProgressSync";
import { Breadcrumbs } from "@/components/SEO";
import { useCourse } from "@/hooks/useCourse";
import { siteConfig, generateCourseSchema, absoluteUrl } from "@/lib/seo";

interface BusinessProgress {
  currentWeek: number;
  completedWeeks: number[];
  objectivesChecked: Record<number, number[]>;
  actionItemsChecked: Record<number, number[]>;
  startedAt: string;
  lastVisited: string;
}

const PROGRESS_KEY = "bbb-business-progress";
const FL_PROGRESS_KEY = "bbb-course-progress";

// ─── Hardcoded fallback copy (mirrors original ternaries) ──────────────────
const FALLBACK = {
  heroBadgeEn: "Free Online Course",
  heroBadgeRu: "Бесплатный онлайн-курс",
  heroTitleEn: "12-Week Business Creation Course",
  heroTitleRu: "12-недельный курс создания бизнеса",
  heroDescEn:
    "Turn financial literacy into a real business. Learn Lean Startup methodology, build a business model, validate your assumptions, and create a launch-ready business plan.",
  heroDescRu:
    "Превратите финансовую грамотность в реальный бизнес. Изучите методологию Lean Startup, постройте бизнес-модель, проверьте гипотезы и создайте готовый к запуску бизнес-план.",
  curriculumHeadingEn: "Course Curriculum",
  curriculumHeadingRu: "Учебная программа курса",
  curriculumIntroEn:
    "Four modules, twelve weeks of practical business education. Complete each week to unlock the next.",
  curriculumIntroRu:
    "Четыре модуля, двенадцать недель практического бизнес-образования. Завершите каждую неделю, чтобы открыть следующую.",
  outcomesHeadingEn: "What You'll Build",
  outcomesHeadingRu: "Что вы получите",
  outcomesEn: [
    {
      title: "Business Model Canvas",
      desc: "A complete 9-block business model validated by real customer interviews.",
      icon: "Target",
    },
    {
      title: "Value Proposition",
      desc: "Deep understanding of customer needs and how your solution addresses them.",
      icon: "Users",
    },
    {
      title: "Financial Dashboard",
      desc: "Break-even analysis, CAC, LTV, and 12-month projections for your business.",
      icon: "TrendingUp",
    },
    {
      title: "Business Plan",
      desc: "A launch-ready one-page business plan with a 90-day action calendar.",
      icon: "Rocket",
    },
  ],
  outcomesRu: [
    {
      title: "Бизнес-модель Canvas",
      desc: "Полная 9-блочная бизнес-модель, проверенная реальными клиентами.",
      icon: "Target",
    },
    {
      title: "Ценностное предложение",
      desc: "Глубокое понимание потребностей клиентов и того, как вы их решаете.",
      icon: "Users",
    },
    {
      title: "Финансовая панель",
      desc: "Точка безубыточности, CAC, LTV и 12-месячные прогнозы.",
      icon: "TrendingUp",
    },
    {
      title: "Бизнес-план",
      desc: "Готовый к запуску одностраничный бизнес-план с 90-дневным календарём.",
      icon: "Rocket",
    },
  ],
  bottomHeadingEn: "Ready to Build Your Business?",
  bottomHeadingRu: "Готовы построить свой бизнес?",
  bottomSubheadingEn: "12 weeks of hands-on learning. From idea to a launch-ready business plan.",
  bottomSubheadingRu: "12 недель практического обучения. От идеи до готового бизнес-плана.",
  bottomPrimaryStartEn: "Start Week 1 Now",
  bottomPrimaryStartRu: "Начать неделю 1",
  bottomPrimaryContinueEn: "Continue the Course",
  bottomPrimaryContinueRu: "Продолжить курс",
  bottomPrimaryGatedEn: "Start Financial Literacy First",
  bottomPrimaryGatedRu: "Сначала — финансовая грамотность",
  bottomSecondaryLabelEn: "Become a Facilitator",
  bottomSecondaryLabelRu: "Стать фасилитатором",
  bottomSecondaryUrl: "/get-involved",
};

// Map icon name strings to lucide-react components for outcome rendering.
const ICONS: Record<string, typeof Target> = {
  Target,
  Users,
  TrendingUp,
  Rocket,
  Shield,
  Lightbulb,
  Briefcase,
};

interface OutcomeRender {
  title: string;
  desc: string;
  icon: typeof Target;
}

function loadProgress(): BusinessProgress {
  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      return { ...parsed, actionItemsChecked: parsed.actionItemsChecked || {} };
    }
  } catch {}
  return {
    currentWeek: 1,
    completedWeeks: [],
    objectivesChecked: {},
    actionItemsChecked: {},
    startedAt: new Date().toISOString(),
    lastVisited: new Date().toISOString(),
  };
}

function checkFinancialLiteracyComplete(): boolean {
  try {
    const saved = localStorage.getItem(FL_PROGRESS_KEY);
    if (!saved) return false;
    const data = JSON.parse(saved);
    const completedWeeks: number[] = data.completedWeeks || [];
    return [1, 2, 3, 4, 5, 6].every((w) => completedWeeks.includes(w));
  } catch {
    return false;
  }
}

const moduleIconsEn = [
  { icon: Lightbulb, label: "Think Like an Entrepreneur" },
  { icon: Target, label: "Shape Your Business Model" },
  { icon: Shield, label: "Validate Your Assumptions" },
  { icon: Rocket, label: "Build Your Traction" },
];

const moduleIconsRu = [
  { icon: Lightbulb, label: "Мыслить как предприниматель" },
  { icon: Target, label: "Сформировать бизнес-модель" },
  { icon: Shield, label: "Проверить предположения" },
  { icon: Rocket, label: "Набрать обороты" },
];

const BusinessCreationCourse = () => {
  const { isCentralAsia, language } = useRegion();
  const businessCourseWeeks = getLocalizedWeeks<BusinessWeekContent>("business-creation", language);
  const { course } = useCourse("business-creation");
  const [progress, setProgress] = useState<BusinessProgress>(loadProgress);
  useProgressSync("business-creation", progress, (merged) => {
    setProgress(merged);
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(merged));
    } catch {
      /* ignore */
    }
  });
  const hasEmail = true;
  const user: { firstName?: string } | null = null;
  const flComplete = checkFinancialLiteracyComplete();

  useEffect(() => {
    const updated = { ...progress, lastVisited: new Date().toISOString() };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
  }, [progress]);

  const completionPercent = Math.round(
    (progress.completedWeeks.length / 12) * 100
  );

  function isWeekUnlocked(weekNum: number): boolean {
    if (!flComplete) return false;
    if (weekNum === 1) return true;
    return progress.completedWeeks.includes(weekNum - 1);
  }

  function isWeekCompleted(weekNum: number): boolean {
    return progress.completedWeeks.includes(weekNum);
  }

  function getWeekStatus(weekNum: number): "completed" | "available" | "locked" {
    if (isWeekCompleted(weekNum)) return "completed";
    if (isWeekUnlocked(weekNum)) return "available";
    return "locked";
  }

  // ─── Localised strings (Sanity-first) ─────────────────────────────────────
  const heroBadge =
    course?.getHeroBadge(isCentralAsia) ||
    (isCentralAsia ? FALLBACK.heroBadgeRu : FALLBACK.heroBadgeEn);
  const heroTitle =
    course?.getTitle(isCentralAsia) ||
    (isCentralAsia ? FALLBACK.heroTitleRu : FALLBACK.heroTitleEn);
  const heroDescription =
    course?.getHeroDescription(isCentralAsia) ||
    (isCentralAsia ? FALLBACK.heroDescRu : FALLBACK.heroDescEn);
  const curriculumHeading = isCentralAsia
    ? FALLBACK.curriculumHeadingRu
    : FALLBACK.curriculumHeadingEn;
  const curriculumIntro = isCentralAsia
    ? FALLBACK.curriculumIntroRu
    : FALLBACK.curriculumIntroEn;
  const outcomesHeading =
    course?.getOutcomesHeading(isCentralAsia) ||
    (isCentralAsia ? FALLBACK.outcomesHeadingRu : FALLBACK.outcomesHeadingEn);
  const bottomHeading =
    course?.getBottomCtaHeading(isCentralAsia) ||
    (isCentralAsia ? FALLBACK.bottomHeadingRu : FALLBACK.bottomHeadingEn);
  const bottomSubheading =
    course?.getBottomCtaSubheading(isCentralAsia) ||
    (isCentralAsia ? FALLBACK.bottomSubheadingRu : FALLBACK.bottomSubheadingEn);
  const bottomPrimaryStartLabel =
    course?.getBottomCtaPrimaryLabel(isCentralAsia) ||
    (isCentralAsia ? FALLBACK.bottomPrimaryStartRu : FALLBACK.bottomPrimaryStartEn);
  const bottomPrimaryContinueLabel = isCentralAsia
    ? FALLBACK.bottomPrimaryContinueRu
    : FALLBACK.bottomPrimaryContinueEn;
  const bottomPrimaryGatedLabel = isCentralAsia
    ? FALLBACK.bottomPrimaryGatedRu
    : FALLBACK.bottomPrimaryGatedEn;
  const bottomSecondaryLabel =
    course?.getBottomCtaSecondaryLabel(isCentralAsia) ||
    (isCentralAsia
      ? FALLBACK.bottomSecondaryLabelRu
      : FALLBACK.bottomSecondaryLabelEn);
  const bottomSecondaryUrl =
    course?.bottomCtaSecondaryUrl || FALLBACK.bottomSecondaryUrl;

  // Outcomes — read from Sanity if present, otherwise fallback array.
  const outcomesRaw =
    course?.outcomes && course.outcomes.length > 0 ? course.outcomes : null;
  const outcomes: OutcomeRender[] = outcomesRaw
    ? outcomesRaw.map((o) => {
        const title =
          (isCentralAsia ? o.titleRu : o.title) ||
          o.title ||
          (isCentralAsia ? o.textRu : o.text) ||
          o.text ||
          "";
        const desc =
          (isCentralAsia ? o.textRu : o.text) || o.text || "";
        return {
          title,
          desc,
          icon: ICONS[o.icon ?? "Target"] ?? Target,
        };
      })
    : (isCentralAsia ? FALLBACK.outcomesRu : FALLBACK.outcomesEn).map((o) => ({
        title: o.title,
        desc: o.desc,
        icon: ICONS[o.icon] ?? Target,
      }));

  const quickStats = [
    { icon: Clock, label: isCentralAsia ? "12 недель" : "12 Weeks" },
    { icon: Zap, label: isCentralAsia ? "В своём темпе" : "Self-Paced" },
    { icon: Users, label: isCentralAsia ? "100% бесплатно" : "100% Free" },
    { icon: TrendingUp, label: isCentralAsia ? "Бизнес-план" : "Business Plan" },
  ];

  const moduleIcons = isCentralAsia ? moduleIconsRu : moduleIconsEn;

  return (
    <>
      <Helmet>
        <title>
          {isCentralAsia
            ? `12-недельный курс создания бизнеса | ${siteConfig.name}`
            : `Free 12-Week Business Creation Course | ${siteConfig.name}`}
        </title>
        <meta
          name="description"
          content={
            isCentralAsia
              ? "Пройдите наш бесплатный 12-недельный курс создания бизнеса. Изучите бизнес-модели, проверку гипотез, финансовые метрики и создайте собственный бизнес-план."
              : "Take our free 12-week business creation course. Learn business model design, customer discovery, financial metrics, and build your own business plan."
          }
        />
        <meta name="keywords" content={isCentralAsia
          ? "курс создания бизнеса, бесплатный бизнес курс, стартап, бизнес-план"
          : "business creation course online free, free business ideation course, how to start a business course, lean startup course, business model canvas course"} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta
          property="og:title"
          content={
            isCentralAsia
              ? "12-недельный курс создания бизнеса"
              : "Free 12-Week Business Creation Course"
          }
        />
        <meta property="og:description" content={isCentralAsia
          ? "Бесплатный 12-недельный курс: бизнес-модели, проверка гипотез, финансовые метрики и бизнес-план."
          : "Free 12-week course: business model design, customer discovery, financial metrics, and build your own business plan."} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content={`${siteConfig.url}/course/business-creation`}
        />
        <meta property="og:image" content={`${siteConfig.url}/images/logo.png`} />
        <meta property="og:site_name" content={`${siteConfig.name}`} />
        <meta property="og:locale" content={isCentralAsia ? "ru_RU" : "en_US"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "12-недельный курс создания бизнеса" : `Free Business Creation Course | ${siteConfig.shortName}`} />
        <meta name="twitter:description" content={isCentralAsia
          ? "Бесплатный курс: от идеи до бизнес-плана за 12 недель."
          : "From idea to business plan in 12 weeks. Learn lean startup, customer discovery, and more. 100% free."} />
        <script type="application/ld+json">
          {JSON.stringify(
            generateCourseSchema({
              name: isCentralAsia ? "12-недельный курс создания бизнеса" : "12-Week Business Creation Course",
              description: isCentralAsia
                ? "Бесплатный курс по бережливому стартапу: интервью с клиентами, ценностное предложение, бизнес-модель, проверка гипотез, MVP, финансы и первые продажи."
                : "Free, self-paced lean-startup course: customer discovery, value proposition, business model canvas, validation experiments, MVP, finances, and first traction.",
              url: absoluteUrl("/course/business-creation", language),
              workload: "PT24H",
              weeks: 12,
              level: "Intermediate",
              lang: language,
              teaches: ["Lean startup", "Customer discovery", "Value proposition design", "Business model canvas", "Hypothesis validation", "Minimum viable product", "Business finance", "Pitching"],
              syllabus: businessCourseWeeks.map((w) => ({
                name: isCentralAsia ? `Неделя ${w.week}: ${w.title}` : `Week ${w.week}: ${w.title}`,
                description: w.subtitle,
                url: absoluteUrl(`/course/business-creation/week-${w.week}`, language),
              })),
            })
          )}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 pt-24">
          <Breadcrumbs
            items={[
              { name: "Home", url: absoluteUrl("/", language) },
              { name: "Courses", url: absoluteUrl(`/programs`, language) },
              { name: "Business Creation", url: absoluteUrl(`/course/business-creation`, language) },
            ]}
          />
        </div>
        {/* Hero */}
        <div className="bg-[#1B2A4A] text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Briefcase className="w-4 h-4 text-[#C9922A]" />
              {heroBadge}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">{heroTitle}</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
              {heroDescription}
            </p>

            {/* Quick Stats */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8">
              {quickStats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex items-center gap-2 text-white/70"
                >
                  <stat.icon className="w-4 h-4 text-[#C9922A]" />
                  <span className="text-sm font-medium">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Progress Bar */}
            {progress.completedWeeks.length > 0 && (
              <div className="max-w-md mx-auto mb-6">
                <div className="flex justify-between text-sm text-white/60 mb-2">
                  <span>{isCentralAsia ? "Ваш прогресс" : "Your Progress"}</span>
                  <span>
                    {completionPercent}%{" "}
                    {isCentralAsia ? "завершено" : "Complete"}
                  </span>
                </div>
                <Progress value={completionPercent} className="h-3 bg-white/20" />
              </div>
            )}

            {/* CTA */}
            {!flComplete ? (
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 max-w-lg mx-auto">
                <AlertTriangle className="w-8 h-8 text-[#C9922A] mx-auto mb-3" />
                <p className="text-white/90 font-medium mb-2">
                  {isCentralAsia
                    ? "Сначала завершите курс финансовой грамотности"
                    : "Complete the Financial Literacy Course First"}
                </p>
                <p className="text-white/60 text-sm mb-4">
                  {isCentralAsia
                    ? "Этот курс открывается после завершения всех 6 недель курса финансовой грамотности."
                    : "This course unlocks after completing all 6 weeks of the Financial Literacy Course."}
                </p>
                <Link to="/course/financial-literacy">
                  <Button
                    size="lg"
                    className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8"
                  >
                    {isCentralAsia
                      ? "Начать курс финансовой грамотности"
                      : "Start Financial Literacy Course"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            ) : hasEmail ? (
              <Link
                to={
                  progress.completedWeeks.length > 0
                    ? `/course/business-creation/week-${Math.min(
                        progress.completedWeeks.length + 1,
                        12
                      )}`
                    : "/course/business-creation/1"
                }
              >
                <Button
                  size="lg"
                  className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8 py-4 text-lg"
                >
                  {progress.completedWeeks.length > 0
                    ? isCentralAsia
                      ? "Продолжить обучение"
                      : "Continue Learning"
                    : isCentralAsia
                    ? "Начать неделю 1"
                    : "Start Week 1"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            ) : (
              <Button
                size="lg"
                className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8 py-4 text-lg"
                onClick={() =>
                  document
                    .getElementById("email-capture")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
              >
                {isCentralAsia ? "Начать бесплатно" : "Get Started Free"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}
          </div>
        </div>

        {/* Module Overview + Week Cards */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] text-center mb-4">
            {curriculumHeading}
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            {curriculumIntro}
          </p>

          <div className="max-w-5xl mx-auto space-y-12">
            {businessModules.map((mod, mi) => {
              const ModIcon = moduleIcons[mi].icon;
              return (
                <div key={mod.number}>
                  {/* Module Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-[#1B2A4A] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">
                      {mod.number}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <ModIcon className="w-4 h-4 text-[#C9922A]" />
                        <span className="text-xs font-medium text-[#C9922A] uppercase tracking-wide">
                          {isCentralAsia ? `Модуль ${mod.number}` : `Module ${mod.number}`}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold text-[#1B2A4A]">
                        {isCentralAsia ? moduleIcons[mi].label : mod.title}
                      </h3>
                    </div>
                  </div>

                  {/* Week Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {mod.weeks.map((weekNum) => {
                      const week = businessCourseWeeks.find((w) => w.week === weekNum);
                      if (!week) return null;
                      const status = getWeekStatus(weekNum);
                      const isGated = !flComplete;

                      return (
                        <Card
                          key={weekNum}
                          className={`relative overflow-hidden transition-all duration-300 ${
                            status === "completed"
                              ? "border-green-300 bg-green-50/50"
                              : status === "available"
                              ? "border-[#C9922A]/50 hover:shadow-lg hover:border-[#C9922A] cursor-pointer"
                              : "border-gray-200 bg-gray-50 opacity-75"
                          }`}
                        >
                          <div
                            className={`absolute top-0 left-0 right-0 h-1 ${
                              status === "completed"
                                ? "bg-green-500"
                                : status === "available"
                                ? "bg-[#C9922A]"
                                : "bg-gray-300"
                            }`}
                          />
                          <CardContent className="pt-6 pb-5">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-2">
                                <div
                                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                                    status === "completed"
                                      ? "bg-green-100 text-green-700"
                                      : status === "available"
                                      ? "bg-[#C9922A]/10 text-[#C9922A]"
                                      : "bg-gray-200 text-gray-500"
                                  }`}
                                >
                                  {status === "completed" ? (
                                    <CheckCircle2 className="w-5 h-5" />
                                  ) : (
                                    weekNum
                                  )}
                                </div>
                                <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                                  {isCentralAsia ? `Неделя ${weekNum}` : `Week ${weekNum}`}
                                </span>
                              </div>
                              {(status === "locked" || isGated) && (
                                <Lock className="w-4 h-4 text-gray-400" />
                              )}
                              {status === "completed" && (
                                <Trophy className="w-4 h-4 text-green-500" />
                              )}
                            </div>

                            <h4 className="text-base font-bold text-[#1B2A4A] mb-1">
                              {week.title}
                            </h4>
                            <p className="text-sm text-gray-600 mb-3">{week.subtitle}</p>

                            {!!week.fourHatsCheckpoint && (
                              <div className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full inline-block mb-3">
                                {isCentralAsia ? "Контрольная точка «4 шляпы»" : "Four Hats Checkpoint"}
                              </div>
                            )}

                            {isGated ? (
                              <p className="text-xs text-gray-400">
                                {isCentralAsia
                                  ? "Завершите курс финансовой грамотности"
                                  : "Complete Financial Literacy course to unlock"}
                              </p>
                            ) : status === "locked" ? (
                              <p className="text-xs text-gray-400">
                                {isCentralAsia
                                  ? `Завершите неделю ${weekNum - 1}, чтобы открыть`
                                  : `Complete Week ${weekNum - 1} to unlock`}
                              </p>
                            ) : status === "completed" ? (
                              <Link to={`/course/business-creation/week-${weekNum}`}>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full border-green-300 text-green-700 hover:bg-green-50"
                                >
                                  {isCentralAsia
                                    ? `Повторить неделю ${weekNum}`
                                    : `Review Week ${weekNum}`}
                                </Button>
                              </Link>
                            ) : hasEmail ? (
                              <Link to={`/course/business-creation/week-${weekNum}`}>
                                <Button
                                  size="sm"
                                  className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90 text-white"
                                >
                                  {weekNum === 1 && progress.completedWeeks.length === 0
                                    ? isCentralAsia
                                      ? "Начать неделю 1"
                                      : "Start Week 1"
                                    : isCentralAsia
                                    ? "Продолжить"
                                    : "Continue"}
                                  <ArrowRight className="ml-2 w-4 h-4" />
                                </Button>
                              </Link>
                            ) : (
                              <Button
                                size="sm"
                                className="w-full bg-gray-300 text-gray-500"
                                onClick={() =>
                                  document
                                    .getElementById("email-capture")
                                    ?.scrollIntoView({ behavior: "smooth" })
                                }
                              >
                                {isCentralAsia ? "Введите email для начала" : "Enter email to start"}
                              </Button>
                            )}
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Benefits / Outcomes */}
        <div className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] text-center mb-10">
              {outcomesHeading}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {outcomes.map((benefit) => (
                <Card key={benefit.title} className="border-[#C9922A]/20">
                  <CardContent className="pt-5">
                    <div className="flex items-start gap-3">
                      <div className="bg-[#C9922A]/10 p-2 rounded-lg">
                        <benefit.icon className="w-5 h-5 text-[#C9922A]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[#1B2A4A] mb-1">{benefit.title}</h3>
                        <p className="text-sm text-gray-600">{benefit.desc}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#1B2A4A] py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {bottomHeading}
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              {bottomSubheading}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={
                  course?.bottomCtaPrimaryUrl ||
                  (flComplete
                    ? progress.completedWeeks.length > 0
                      ? `/course/business-creation/week-${Math.min(
                          progress.completedWeeks.length + 1,
                          12
                        )}`
                      : "/course/business-creation/1"
                    : "/course/financial-literacy")
                }
              >
                <Button
                  size="lg"
                  className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8"
                >
                  {flComplete
                    ? progress.completedWeeks.length > 0
                      ? bottomPrimaryContinueLabel
                      : bottomPrimaryStartLabel
                    : bottomPrimaryGatedLabel}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to={bottomSecondaryUrl}>
                <Button
                  size="lg"
                  className="bg-transparent border border-white/40 text-white hover:bg-white/10"
                >
                  {bottomSecondaryLabel}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Graduate Stories */}
        <div className="container mx-auto px-4 py-12">
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-[#1B2A4A] mb-4">
              {isCentralAsia ? "Реальные истории" : "Real Stories"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/blog/from-a-haitian-orphanage-to-founding-a-nonprofit-jackens-story" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-shadow hover:shadow-md">
                <p className="text-sm font-bold text-[#1B2A4A]">{isCentralAsia ? "Из гаитянского приюта — к основанию организации" : "From a Haitian Orphanage to Founding a Nonprofit"}</p>
                <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Читать историю Джакенса →" : "Read Jacken's Story →"}</p>
              </Link>
              <Link to="/blog/what-central-asia-taught-us-about-resilience-and-business" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-shadow hover:shadow-md">
                <p className="text-sm font-bold text-[#1B2A4A]">{isCentralAsia ? "Чему Центральная Азия научила нас о стойкости и бизнесе" : "What Central Asia Taught Us About Resilience and Business"}</p>
                <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Читать статью →" : "Read the story →"}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessCreationCourse;
