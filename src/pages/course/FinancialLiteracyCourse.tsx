import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Clock,
  ArrowRight,
  CheckCircle2,
  Lock,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { courseWeeks, tenWeekOverview } from "@/data/course";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRegion } from "@/contexts/RegionContext";
import { Breadcrumbs } from "@/components/SEO";

interface CourseProgress {
  currentWeek: number;
  completedWeeks: number[];
  objectivesChecked: Record<number, number[]>;
  startedAt: string;
  lastVisited: string;
}

const PROGRESS_KEY = "bbb-course-progress";

function loadProgress(): CourseProgress {
  try {
    const saved = localStorage.getItem(PROGRESS_KEY);
    if (saved) return JSON.parse(saved);
  } catch {}
  return {
    currentWeek: 1,
    completedWeeks: [],
    objectivesChecked: {},
    startedAt: new Date().toISOString(),
    lastVisited: new Date().toISOString(),
  };
}

const FinancialLiteracyCourse = () => {
  const { isCentralAsia } = useRegion();
  const [progress, setProgress] = useState<CourseProgress>(loadProgress);
  const hasEmail = true;
  const user: { firstName?: string } | null = null;

  useEffect(() => {
    const updated = { ...progress, lastVisited: new Date().toISOString() };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
  }, [progress]);

  const completionPercent = Math.round(
    (progress.completedWeeks.length / courseWeeks.length) * 100
  );

  function isWeekUnlocked(weekNum: number): boolean {
    if (weekNum === 1) return true;
    return progress.completedWeeks.includes(weekNum - 1);
  }

  function isWeekCompleted(weekNum: number): boolean {
    return progress.completedWeeks.includes(weekNum);
  }

  function getWeekStatus(
    weekNum: number
  ): "completed" | "available" | "locked" {
    if (isWeekCompleted(weekNum)) return "completed";
    if (isWeekUnlocked(weekNum)) return "available";
    return "locked";
  }

  const quickStats = [
    { icon: Clock, label: isCentralAsia ? "6 недель" : "6 Weeks" },
    { icon: Zap, label: isCentralAsia ? "В своём темпе" : "Self-Paced" },
    { icon: Users, label: isCentralAsia ? "100% бесплатно" : "100% Free" },
    { icon: Lock, label: isCentralAsia ? "Без регистрации" : "No Login Required" },
  ];

  return (
    <>
      <Helmet>
        <title>
          {isCentralAsia
            ? "Бесплатный 6-недельный курс финансовой грамотности | Businesses Beyond Borders"
            : "Free 6-Week Financial Literacy Course | Businesses Beyond Borders"}
        </title>
        <meta
          name="description"
          content={
            isCentralAsia
              ? "Пройдите наш бесплатный 6-недельный курс финансовой грамотности. Изучите составление бюджета, управление долгами, стратегии накопления и многое другое."
              : "Take our free 6-week financial literacy course. Learn budgeting, debt elimination, saving strategies, and more. Self-paced, no login required."
          }
        />
        <meta name="keywords" content={isCentralAsia
          ? "бесплатный курс финансовой грамотности, бюджетирование, управление долгами, накопления"
          : "free financial literacy course Florida, financial education Volusia County, zero-based budgeting course, debt elimination course, free budgeting course online"} />
        <link
          rel="canonical"
          href="https://businessesbeyondborders.com/course/financial-literacy"
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta
          property="og:title"
          content={
            isCentralAsia
              ? "Бесплатный 6-недельный курс финансовой грамотности"
              : "Free 6-Week Financial Literacy Course"
          }
        />
        <meta
          property="og:description"
          content={
            isCentralAsia
              ? "Самостоятельное финансовое образование: бюджетирование, управление долгами, накопления. 100% бесплатно, без регистрации."
              : "Self-paced financial education covering budgeting, debt elimination, saving, and building a legacy. 100% free, no login required."
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://businessesbeyondborders.com/course/financial-literacy"
        />
        <meta property="og:image" content="https://businessesbeyondborders.com/images/bbb-logo.png" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta property="og:locale" content={isCentralAsia ? "ru_RU" : "en_US"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "Бесплатный курс финансовой грамотности" : "Free Financial Literacy Course | BBB"} />
        <meta name="twitter:description" content={isCentralAsia
          ? "Бюджетирование, управление долгами, накопления. 100% бесплатно."
          : "Learn budgeting, debt elimination, saving strategies. 100% free, self-paced."} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "6-Week Financial Literacy Course",
            description:
              "Free, self-paced financial education covering budgeting, debt elimination, saving strategies, and more.",
            provider: {
              "@type": "NonprofitOrganization",
              name: "Businesses Beyond Borders",
              url: "https://businessesbeyondborders.com",
            },
            isAccessibleForFree: true,
            courseMode: "online",
            educationalLevel: "Beginner",
            timeRequired: "PT6W",
            numberOfCredits: 0,
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "online",
              courseWorkload: "PT2H/week",
            },
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 pt-24">
          <Breadcrumbs
            items={[
              { name: "Home", url: "https://businessesbeyondborders.com" },
              { name: "Courses", url: "https://businessesbeyondborders.com/programs-and-impact" },
              { name: "Financial Literacy", url: "https://businessesbeyondborders.com/course/financial-literacy" },
            ]}
          />
        </div>
        {/* Hero */}
        <div className="bg-[#1B2A4A] text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 text-[#C9922A]" />
              {isCentralAsia ? "Бесплатный онлайн-курс" : "Free Online Course"}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {isCentralAsia
                ? "6-недельный курс финансовой грамотности"
                : "6-Week Financial Literacy Course"}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
              {isCentralAsia
                ? "Практическое финансовое образование, которое действительно работает. Научитесь составлять бюджет, избавляться от долгов, создавать накопления и строить планы для достижения финансовой свободы."
                : "Practical financial education that actually works. Learn budgeting, destroy debt, build savings, and create a plan for lasting financial freedom."}
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

            {/* Progress Bar (if started) */}
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
            {hasEmail ? (
              <Link
                to={
                  progress.completedWeeks.length > 0
                    ? `/course/financial-literacy/${Math.min(
                        progress.completedWeeks.length + 1,
                        6
                      )}`
                    : "/course/financial-literacy/1"
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
                onClick={() => document.getElementById("email-capture")?.scrollIntoView({ behavior: "smooth" })}
              >
                {isCentralAsia ? "Начать бесплатно" : "Get Started Free"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            )}
          </div>
        </div>


        {/* Course Weeks Grid */}
        <div className="container mx-auto px-4 py-12 md:py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] text-center mb-4">
            {isCentralAsia ? "Учебная программа курса" : "Course Curriculum"}
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            {isCentralAsia
              ? "Шесть недель практического финансового образования. Завершите каждую неделю, чтобы открыть следующую."
              : "Six weeks of practical, actionable financial education. Complete each week to unlock the next."}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {courseWeeks.map((week) => {
              const status = getWeekStatus(week.week);
              return (
                <Card
                  key={week.week}
                  className={`relative overflow-hidden transition-all duration-300 ${
                    status === "completed"
                      ? "border-green-300 bg-green-50/50"
                      : status === "available"
                      ? "border-[#C9922A]/50 hover:shadow-lg hover:border-[#C9922A] cursor-pointer"
                      : "border-gray-200 bg-gray-50 opacity-75"
                  }`}
                >
                  {/* Status indicator */}
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
                            week.week
                          )}
                        </div>
                        <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                          {isCentralAsia ? `Неделя ${week.week}` : `Week ${week.week}`}
                        </span>
                      </div>
                      {status === "locked" && (
                        <Lock className="w-4 h-4 text-gray-400" />
                      )}
                      {status === "completed" && (
                        <Trophy className="w-4 h-4 text-green-500" />
                      )}
                    </div>

                    <h3 className="text-lg font-bold text-[#1B2A4A] mb-1">
                      {week.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-4">
                      {week.subtitle}
                    </p>

                    {status === "locked" ? (
                      <p className="text-xs text-gray-400">
                        {isCentralAsia
                          ? `Завершите неделю ${week.week - 1}, чтобы открыть`
                          : `Complete Week ${week.week - 1} to unlock`}
                      </p>
                    ) : status === "completed" ? (
                      <Link to={`/course/financial-literacy/${week.week}`}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full border-green-300 text-green-700 hover:bg-green-50"
                        >
                          {isCentralAsia
                            ? `Повторить неделю ${week.week}`
                            : `Review Week ${week.week}`}
                        </Button>
                      </Link>
                    ) : hasEmail ? (
                      <Link to={`/course/financial-literacy/${week.week}`}>
                        <Button
                          size="sm"
                          className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90 text-white"
                        >
                          {week.week === 1 &&
                          progress.completedWeeks.length === 0
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
                        onClick={() => document.getElementById("email-capture")?.scrollIntoView({ behavior: "smooth" })}
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

        {/* 10-Week Program Overview */}
        <div className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-3xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] text-center mb-4">
              {isCentralAsia
                ? "Хотите пройти полную программу?"
                : "Want the Full Experience?"}
            </h2>
            <p className="text-gray-600 text-center mb-10">
              {isCentralAsia
                ? "Наша 10-недельная комплексная программа включает групповые обсуждения, поддержку куратора и дополнительные темы. Свяжитесь с нами, чтобы присоединиться к следующей группе."
                : "Our 10-week comprehensive program goes deeper with group discussions, facilitator guidance, and additional topics. Contact us to join the next cohort."}
            </p>

            <Accordion type="single" collapsible className="w-full">
              {tenWeekOverview.map((phase, i) => (
                <AccordionItem key={i} value={`phase-${i}`}>
                  <AccordionTrigger className="text-left">
                    <span className="font-semibold text-[#1B2A4A]">
                      {phase.phase}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-3 pt-2">
                      {phase.weeks.map((w) => (
                        <div
                          key={w.week}
                          className="bg-gray-50 p-3 rounded-lg"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="bg-[#1B2A4A] text-white w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold">
                              {w.week}
                            </span>
                            <span className="font-medium text-gray-800">
                              {w.title}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 ml-8">
                            {w.focus}
                          </p>
                        </div>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            <div className="text-center mt-8">
              <Link to="/get-involved?type=program&program=financial-literacy">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white"
                >
                  {isCentralAsia
                    ? "Узнать о 10-недельной программе"
                    : "Inquire About the 10-Week Program"}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#1B2A4A] py-12">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {isCentralAsia
                ? "Готовы взять финансы под контроль?"
                : "Ready to Take Control of Your Finances?"}
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              {isCentralAsia
                ? "Никаких затрат, никакой регистрации, никаких скрытых условий. Просто практическое финансовое образование, которое можно начать прямо сейчас."
                : "No cost, no login, no catch. Just practical financial education you can start right now."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={
                  progress.completedWeeks.length > 0
                    ? `/course/financial-literacy/${Math.min(
                        progress.completedWeeks.length + 1,
                        6
                      )}`
                    : "/course/financial-literacy/1"
                }
              >
                <Button
                  size="lg"
                  className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8"
                >
                  {progress.completedWeeks.length > 0
                    ? isCentralAsia
                      ? "Продолжить курс"
                      : "Continue the Course"
                    : isCentralAsia
                    ? "Начать неделю 1"
                    : "Start Week 1 Now"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/get-involved">
                <Button
                  size="lg"
                  className="bg-transparent border border-white/40 text-white hover:bg-white/10"
                >
                  {isCentralAsia ? "Стать куратором" : "Become a Facilitator"}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Graduate Stories */}
        <div className="container mx-auto px-4 py-12">
          <div className="mt-12 border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-[#1B2A4A] mb-4">
              {isCentralAsia ? "Истории выпускников" : "Graduate Stories"}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/success-stories/case-study-sarah" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-shadow hover:shadow-md">
                <p className="text-sm font-bold text-[#1B2A4A]">{isCentralAsia ? "От рыночного лотка — к лидеру рынка" : "From Market Stall to Market Leader"}</p>
                <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Читать историю Сары →" : "Read Sarah's Story →"}</p>
              </Link>
              <Link to="/success-stories/case-study-marcus" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-shadow hover:shadow-md">
                <p className="text-sm font-bold text-[#1B2A4A]">{isCentralAsia ? "Технологические инновации в сельской местности" : "Tech Innovation in Rural Areas"}</p>
                <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Читать историю Маркуса →" : "Read Marcus's Story →"}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FinancialLiteracyCourse;
