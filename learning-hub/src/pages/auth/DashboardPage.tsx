/**
 * "My Learning" — the signed-in home. Shows progress for each course
 * (from localStorage, merged with the cloud copy when Convex is on),
 * quick links, and the learner's language/profile summary.
 */
import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight, BookOpen, Briefcase, Users, Calculator, FileText, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRegion } from "@/contexts/RegionContext";
import { useAuthUser } from "@/lib/auth";
import { useCloudUser } from "@/hooks/useCloudUser";
import { siteConfig } from "@/lib/seo";

interface StoredProgress {
  currentWeek?: number;
  completedWeeks?: number[];
  completedDays?: Record<string, number[]>;
  lastVisited?: string;
}

function readProgress(key: string): StoredProgress {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as StoredProgress) : {};
  } catch {
    return {};
  }
}

const COURSES = [
  { key: "bbb-course-progress", slug: "financial-literacy", weeks: 6, Icon: BookOpen, en: "Financial Literacy", ru: "Финансовая грамотность", descEn: "6 weeks · budgeting, debt, savings", descRu: "6 недель · бюджет, долги, сбережения" },
  { key: "bbb-business-progress", slug: "business-creation", weeks: 12, Icon: Briefcase, en: "Business Creation", ru: "Создание бизнеса", descEn: "12 weeks · from idea to first customers", descRu: "12 недель · от идеи до первых клиентов" },
  { key: "bbb-leadership-progress", slug: "leadership-development", weeks: 12, Icon: Users, en: "Leadership Development", ru: "Развитие лидерства", descEn: "12 weeks · lead yourself, others, teams", descRu: "12 недель · вести себя, других, команды" },
];

export default function DashboardPage() {
  const { isCentralAsia } = useRegion();
  const { isLoaded, user, mode } = useAuthUser();
  const navigate = useNavigate();
  useCloudUser();

  useEffect(() => {
    if (mode === "clerk" && isLoaded && user && !user.profile.onboarded) navigate("/welcome", { replace: true });
  }, [mode, isLoaded, user, navigate]);

  const progress = useMemo(() => COURSES.map((c) => ({ ...c, data: readProgress(c.key) })), []);
  const firstName = user?.firstName || (isCentralAsia ? "друг" : "friend");

  return (
    <>
      <Helmet>
        <title>{isCentralAsia ? `Моё обучение | ${siteConfig.name}` : `My Learning | ${siteConfig.name}`}</title>
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-gray-50 pt-28 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-[#C9922A] mb-1">{isCentralAsia ? "Моё обучение" : "My Learning"}</p>
              <h1 className="text-3xl font-bold text-[#1B2A4A]">{isCentralAsia ? `Здравствуйте, ${firstName}` : `Hello, ${firstName}`}</h1>
            </div>
            {user && (
              <div className="text-sm text-gray-600 flex items-center gap-2">
                <Globe className="w-4 h-4 text-[#C9922A]" />
                {isCentralAsia ? "Язык обучения:" : "Learning language:"} <strong>{user.profile.language === "ru" ? "Русский" : "English"}</strong>
                <Link to="/welcome?edit=1" className="underline text-[#1B2A4A] ml-1">
                  {isCentralAsia ? "изменить" : "change"}
                </Link>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-5 mb-10">
            {progress.map((c) => {
              const done = c.data.completedWeeks?.length ?? 0;
              const pct = Math.round((done / c.weeks) * 100);
              const current = c.data.currentWeek ?? 1;
              const started = done > 0 || Boolean(c.data.lastVisited);
              return (
                <Card key={c.slug} className="border-gray-200 hover:border-[#C9922A]/50 transition-colors">
                  <CardContent className="pt-6 flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="bg-[#C9922A]/10 w-10 h-10 rounded-full flex items-center justify-center">
                        <c.Icon className="w-5 h-5 text-[#C9922A]" />
                      </div>
                      <div>
                        <h2 className="font-bold text-[#1B2A4A] leading-tight">{isCentralAsia ? c.ru : c.en}</h2>
                        <p className="text-xs text-gray-500">{isCentralAsia ? c.descRu : c.descEn}</p>
                      </div>
                    </div>
                    <div className="mb-3">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>{isCentralAsia ? `${done} из ${c.weeks} недель` : `${done} of ${c.weeks} weeks`}</span>
                        <span>{pct}%</span>
                      </div>
                      <Progress value={pct} className="h-2" />
                    </div>
                    <div className="mt-auto">
                      <Link to={started ? `/course/${c.slug}/week-${Math.min(current, c.weeks)}` : `/course/${c.slug}`}>
                        <Button className="w-full bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 text-white">
                          {started ? (isCentralAsia ? `Продолжить неделю ${current}` : `Continue week ${current}`) : isCentralAsia ? "Начать курс" : "Start course"}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <h2 className="text-xl font-bold text-[#1B2A4A] mb-4">{isCentralAsia ? "Полезное" : "Quick links"}</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { to: "/community", Icon: Users, en: "Community & live cohorts", ru: "Сообщество и когорты" },
              { to: "/tools/debt-calculator", Icon: Calculator, en: "Debt payoff calculator", ru: "Калькулятор долгов" },
              { to: "/resources", Icon: FileText, en: "Free toolkits", ru: "Бесплатные материалы" },
              { to: "/blog", Icon: Sparkles, en: "Articles & guides", ru: "Статьи и руководства" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 hover:shadow-md transition-all flex items-center gap-3">
                <l.Icon className="w-5 h-5 text-[#C9922A]" />
                <span className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? l.ru : l.en}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
