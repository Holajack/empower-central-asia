import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Crown,
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
  Compass,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { leadershipCourseWeeks, leadershipModules } from "@/data/leadership-course";
import { useRegion } from "@/contexts/RegionContext";
import { Breadcrumbs } from "@/components/SEO";

interface LeadershipProgress {
  currentWeek: number;
  completedWeeks: number[];
  objectivesChecked: Record<number, number[]>;
  actionItemsChecked: Record<number, number[]>;
  startedAt: string;
  lastVisited: string;
}

const PROGRESS_KEY = "bbb-leadership-progress";
const BC_PROGRESS_KEY = "bbb-business-progress";

function loadProgress(): LeadershipProgress {
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

function checkBusinessCreationComplete(): boolean {
  try {
    const saved = localStorage.getItem(BC_PROGRESS_KEY);
    if (!saved) return false;
    const data = JSON.parse(saved);
    const completedWeeks: number[] = data.completedWeeks || [];
    return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].every((w) => completedWeeks.includes(w));
  } catch {
    return false;
  }
}

const moduleIconsEn = [
  { icon: Compass, label: "Leading Yourself" },
  { icon: HeartHandshake, label: "Leading Others" },
  { icon: Users, label: "Leading Teams" },
  { icon: Crown, label: "Leading Organizations" },
];

const moduleIconsRu = [
  { icon: Compass, label: "Руководство собой" },
  { icon: HeartHandshake, label: "Руководство людьми" },
  { icon: Users, label: "Руководство командами" },
  { icon: Crown, label: "Руководство организациями" },
];

const LeadershipCourse = () => {
  const { isCentralAsia } = useRegion();
  const [progress, setProgress] = useState<LeadershipProgress>(loadProgress);
  const hasEmail = false;
  const user: { firstName?: string } | null = null;
  const bcComplete = checkBusinessCreationComplete();

  useEffect(() => {
    const updated = { ...progress, lastVisited: new Date().toISOString() };
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(updated));
  }, [progress]);

  const completionPercent = Math.round(
    (progress.completedWeeks.length / 12) * 100
  );

  function isWeekUnlocked(weekNum: number): boolean {
    if (!bcComplete) return false;
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

  const quickStats = [
    { icon: Clock, label: isCentralAsia ? "12 недель" : "12 Weeks" },
    { icon: Zap, label: isCentralAsia ? "В своём темпе" : "Self-Paced" },
    { icon: Users, label: isCentralAsia ? "100% бесплатно" : "100% Free" },
    { icon: Crown, label: isCentralAsia ? "Лидерство" : "Leadership" },
  ];

  const moduleIcons = isCentralAsia ? moduleIconsRu : moduleIconsEn;

  return (
    <>
      <Helmet>
        <title>
          {isCentralAsia
            ? "12-недельный курс развития лидерства | Businesses Beyond Borders"
            : "Free 12-Week Leadership Development Course | Businesses Beyond Borders"}
        </title>
        <meta
          name="description"
          content={
            isCentralAsia
              ? "Пройдите наш бесплатный 12-недельный курс развития лидерства. Изучите эмоциональный интеллект, управление командами, стратегическое мышление и лидерство в организациях."
              : "Take our free 12-week leadership development course. Learn emotional intelligence, team building, strategic thinking, and organizational leadership."
          }
        />
        <meta name="keywords" content={isCentralAsia
          ? "курс лидерства, развитие лидерства, эмоциональный интеллект, управление командами"
          : "leadership development course free, emotional intelligence course, team leadership training, strategic leadership course"} />
        <link
          rel="canonical"
          href="https://businessesbeyondborders.com/course/leadership-development"
        />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta
          property="og:title"
          content={
            isCentralAsia
              ? "12-недельный курс развития лидерства"
              : "Free 12-Week Leadership Development Course"
          }
        />
        <meta property="og:description" content={isCentralAsia
          ? "Бесплатный 12-недельный курс: эмоциональный интеллект, управление командами и стратегическое лидерство."
          : "Free 12-week course: emotional intelligence, team building, and strategic leadership."} />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://businessesbeyondborders.com/course/leadership-development"
        />
        <meta property="og:image" content="https://businessesbeyondborders.com/images/bbb-logo.png" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta property="og:locale" content={isCentralAsia ? "ru_RU" : "en_US"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "12-недельный курс развития лидерства" : "Free Leadership Development Course | BBB"} />
        <meta name="twitter:description" content={isCentralAsia
          ? "Бесплатный курс: от самоуправления до стратегического лидерства за 12 недель."
          : "From self-leadership to strategic leadership in 12 weeks. 100% free."} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "12-Week Leadership Development Course",
            description:
              "Free, self-paced leadership development course covering emotional intelligence, team building, conflict resolution, strategic thinking, and organizational leadership.",
            provider: {
              "@type": "NonprofitOrganization",
              name: "Businesses Beyond Borders",
              url: "https://businessesbeyondborders.com",
            },
            isAccessibleForFree: true,
            courseMode: "online",
            educationalLevel: "Advanced",
            timeRequired: "PT12W",
            coursePrerequisites: "12-Week Business Creation Course",
            hasCourseInstance: {
              "@type": "CourseInstance",
              courseMode: "online",
              courseWorkload: "PT3H/week",
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
              { name: "Leadership Development", url: "https://businessesbeyondborders.com/course/leadership-development" },
            ]}
          />
        </div>
        {/* Hero */}
        <div className="bg-[#1B2A4A] text-white py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Crown className="w-4 h-4 text-[#C9922A]" />
              {isCentralAsia ? "Бесплатный онлайн-курс" : "Free Online Course"}
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              {isCentralAsia
                ? "12-недельный курс развития лидерства"
                : "12-Week Leadership Development Course"}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-8">
              {isCentralAsia
                ? "Развивайте навыки лидерства от самоуправления до руководства организациями. Изучите эмоциональный интеллект, построение команд, стратегическое мышление и управление изменениями."
                : "Develop leadership skills from self-management to organizational leadership. Learn emotional intelligence, team building, strategic thinking, and change management."}
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
            {!bcComplete ? (
              <div className="bg-white/10 backdrop-blur rounded-xl p-6 max-w-lg mx-auto">
                <AlertTriangle className="w-8 h-8 text-[#C9922A] mx-auto mb-3" />
                <p className="text-white/90 font-medium mb-2">
                  {isCentralAsia
                    ? "Сначала завершите курс создания бизнеса"
                    : "Complete the Business Creation Course First"}
                </p>
                <p className="text-white/60 text-sm mb-4">
                  {isCentralAsia
                    ? "Этот курс открывается после завершения всех 12 недель курса создания бизнеса."
                    : "This course unlocks after completing all 12 weeks of the Business Creation Course."}
                </p>
                <Link to="/course/business-creation">
                  <Button
                    size="lg"
                    className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8"
                  >
                    {isCentralAsia
                      ? "Начать курс создания бизнеса"
                      : "Start Business Creation Course"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </div>
            ) : hasEmail ? (
              <Link
                to={
                  progress.completedWeeks.length > 0
                    ? `/course/leadership-development/${Math.min(
                        progress.completedWeeks.length + 1,
                        12
                      )}`
                    : "/course/leadership-development/1"
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
            {isCentralAsia ? "Учебная программа курса" : "Course Curriculum"}
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            {isCentralAsia
              ? "Четыре модуля, двенадцать недель практического обучения лидерству. Завершите каждую неделю, чтобы открыть следующую."
              : "Four modules, twelve weeks of practical leadership education. Complete each week to unlock the next."}
          </p>

          <div className="max-w-5xl mx-auto space-y-12">
            {leadershipModules.map((mod, mi) => {
              const ModIcon = moduleIcons[mi].icon;
              return (
                <div key={mod.title}>
                  {/* Module Header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-[#1B2A4A] text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm">
                      {mi + 1}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <ModIcon className="w-4 h-4 text-[#C9922A]" />
                        <span className="text-xs font-medium text-[#C9922A] uppercase tracking-wide">
                          {isCentralAsia ? `Модуль ${mi + 1}` : `Module ${mi + 1}`}
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
                      const week = leadershipCourseWeeks.find((w) => w.week === weekNum);
                      if (!week) return null;
                      const status = getWeekStatus(weekNum);
                      const isGated = !bcComplete;

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

                            {week.hasCaseStudy && (
                              <div className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full inline-block mb-3">
                                {isCentralAsia ? "Кейс-стади" : "Case Study Checkpoint"}
                              </div>
                            )}

                            {isGated ? (
                              <p className="text-xs text-gray-400">
                                {isCentralAsia
                                  ? "Завершите курс создания бизнеса"
                                  : "Complete Business Creation course to unlock"}
                              </p>
                            ) : status === "locked" ? (
                              <p className="text-xs text-gray-400">
                                {isCentralAsia
                                  ? `Завершите неделю ${weekNum - 1}, чтобы открыть`
                                  : `Complete Week ${weekNum - 1} to unlock`}
                              </p>
                            ) : status === "completed" ? (
                              <Link to={`/course/leadership-development/${weekNum}`}>
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
                              <Link to={`/course/leadership-development/${weekNum}`}>
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

        {/* Benefits */}
        <div className="bg-white py-12 md:py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] text-center mb-10">
              {isCentralAsia ? "Что вы получите" : "What You'll Develop"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(isCentralAsia
                ? [
                    { icon: Compass, title: "Самоуправление", desc: "Эмоциональный интеллект, принятие решений на основе ценностей и личная ответственность." },
                    { icon: HeartHandshake, title: "Навыки общения", desc: "Эффективная коммуникация, влияние, коучинг и менторство." },
                    { icon: Users, title: "Управление командами", desc: "Построение высокоэффективных команд, разрешение конфликтов и делегирование." },
                    { icon: Crown, title: "Стратегическое лидерство", desc: "Стратегическое мышление, управление изменениями и создание наследия." },
                  ]
                : [
                    { icon: Compass, title: "Self-Leadership", desc: "Emotional intelligence, values-based decision making, and personal accountability." },
                    { icon: HeartHandshake, title: "People Skills", desc: "Effective communication, influence, coaching, and mentorship capabilities." },
                    { icon: Users, title: "Team Management", desc: "Building high-performance teams, conflict resolution, and delegation mastery." },
                    { icon: Crown, title: "Strategic Leadership", desc: "Strategic thinking, change management, and creating lasting organizational impact." },
                  ]
              ).map((benefit) => (
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
              {isCentralAsia
                ? "Готовы стать лидером?"
                : "Ready to Lead?"}
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              {isCentralAsia
                ? "12 недель практического обучения лидерству. От самоуправления до руководства организациями."
                : "12 weeks of hands-on leadership development. From self-leadership to organizational impact."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to={
                  bcComplete
                    ? progress.completedWeeks.length > 0
                      ? `/course/leadership-development/${Math.min(
                          progress.completedWeeks.length + 1,
                          12
                        )}`
                      : "/course/leadership-development/1"
                    : "/course/business-creation"
                }
              >
                <Button
                  size="lg"
                  className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8"
                >
                  {bcComplete
                    ? progress.completedWeeks.length > 0
                      ? isCentralAsia
                        ? "Продолжить курс"
                        : "Continue the Course"
                      : isCentralAsia
                      ? "Начать неделю 1"
                      : "Start Week 1 Now"
                    : isCentralAsia
                    ? "Сначала — создание бизнеса"
                    : "Start Business Creation First"}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/get-involved">
                <Button
                  size="lg"
                  className="bg-transparent border border-white/40 text-white hover:bg-white/10"
                >
                  {isCentralAsia ? "Стать фасилитатором" : "Become a Facilitator"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadershipCourse;
