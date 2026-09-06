import type { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Lock, CheckCircle2, ArrowRight, Users, Globe, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAuthUser } from "@/lib/auth";
import { useRegion } from "@/contexts/RegionContext";

interface CourseWeekGateProps {
  courseTitle: string;
  coursePath: string;
  weekNum: number;
  weekTitle: string;
  weekSubtitle?: string;
  overview?: string;
  objectives?: string[];
  pageTitle: string;
  pageDescription: string;
  children: ReactNode;
}

/**
 * Wraps a course-week page. Signed-in learners (or "open" mode) see the full
 * lesson. Signed-out visitors see an indexable preview — week title,
 * overview, and objectives — plus a free-account call to action. This keeps
 * week pages crawlable while every learner still creates an account.
 */
export default function CourseWeekGate(props: CourseWeekGateProps) {
  const { isLoaded, isSignedIn, mode } = useAuthUser();
  const { isCentralAsia } = useRegion();
  const location = useLocation();

  if (mode === "open" || isSignedIn) return <>{props.children}</>;
  if (!isLoaded) return <div className="min-h-[60vh]" aria-busy="true" />;

  const returnTo = encodeURIComponent(location.pathname + location.search);
  const perks = isCentralAsia
    ? ["Ежедневные уроки, истории и рабочие листы", "Прогресс сохраняется на всех устройствах", "Чат курса и живые когорты", "Полностью бесплатно — навсегда"]
    : ["Daily lessons, stories, and interactive worksheets", "Progress saved across your devices", "Course chat and live cohorts", "100% free, forever"];

  return (
    <>
      <Helmet>
        <title>{props.pageTitle}</title>
        <meta name="description" content={props.pageDescription} />
      </Helmet>
      <div className="min-h-screen bg-gray-50 pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#C9922A] mb-2">
            {props.courseTitle} · {isCentralAsia ? `Неделя ${props.weekNum}` : `Week ${props.weekNum}`}
          </p>
          <h1 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-3">{props.weekTitle}</h1>
          {props.weekSubtitle && <p className="text-lg text-gray-600 mb-6">{props.weekSubtitle}</p>}
          {props.overview && <p className="text-gray-700 leading-relaxed mb-8">{props.overview}</p>}

          {props.objectives && props.objectives.length > 0 && (
            <section className="mb-10">
              <h2 className="text-xl font-bold text-[#1B2A4A] mb-3">{isCentralAsia ? "Чему вы научитесь на этой неделе" : "What you will learn this week"}</h2>
              <ul className="space-y-2">
                {props.objectives.map((o, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#C9922A] flex-shrink-0 mt-0.5" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Card className="border-[#C9922A]/40 bg-white shadow-lg">
            <CardContent className="py-8 px-6 md:px-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-[#C9922A]/10 w-11 h-11 rounded-full flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#C9922A]" />
                </div>
                <h2 className="text-2xl font-bold text-[#1B2A4A]">
                  {isCentralAsia ? "Создайте бесплатный аккаунт, чтобы начать" : "Create a free account to start this week"}
                </h2>
              </div>
              <p className="text-gray-600 mb-6">
                {isCentralAsia
                  ? "Регистрация занимает меньше минуты. Мы спросим, на каком языке вы хотите учиться, и будем присылать полезные материалы — без спама."
                  : "It takes less than a minute. We'll ask which language you prefer to learn in and send you encouragement along the way — never spam."}
              </p>
              <ul className="grid sm:grid-cols-2 gap-2 mb-8">
                {perks.map((p, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    {[<Sparkles key="a" />, <Globe key="b" />, <Users key="c" />, <CheckCircle2 key="d" />][i % 4]}
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-col sm:flex-row gap-3">
                <Link to={`/sign-up?redirect_url=${returnTo}`} className="flex-1">
                  <Button size="lg" className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold">
                    {isCentralAsia ? "Зарегистрироваться бесплатно" : "Sign up free"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to={`/sign-in?redirect_url=${returnTo}`} className="flex-1">
                  <Button size="lg" variant="outline" className="w-full border-[#1B2A4A]/30 text-[#1B2A4A]">
                    {isCentralAsia ? "У меня уже есть аккаунт" : "I already have an account"}
                  </Button>
                </Link>
              </div>
              <p className="text-xs text-gray-400 mt-4 text-center">
                <Link to={props.coursePath} className="underline hover:text-[#1B2A4A]">
                  {isCentralAsia ? "← Назад к обзору курса" : "← Back to course overview"}
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
