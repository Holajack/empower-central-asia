import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Briefcase, Users, Globe, CheckCircle2, Calculator, MessageCircle, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRegion } from "@/contexts/RegionContext";
import { useTranslation } from "@/hooks/useTranslation";
import { siteConfig, absoluteUrl, generateFAQSchema } from "@/lib/seo";
import { clerkEnabled, SignedIn, SignedOut } from "@/lib/auth";
import { courseWeeks } from "@/data/course";
import { businessCourseWeeks } from "@/data/business-course";
import { leadershipCourseWeeks } from "@/data/leadership-course";

export default function Index() {
  const { isCentralAsia, language } = useRegion();
  const { t } = useTranslation();

  const courses = [
    {
      slug: "financial-literacy",
      Icon: BookOpen,
      badge: isCentralAsia ? "Шаг 1" : "Step 1",
      title: isCentralAsia ? "Финансовая грамотность" : "Financial Literacy",
      desc: isCentralAsia
        ? "6 недель: бюджет с нуля, избавление от долгов, подушка безопасности и цели."
        : "6 weeks: zero-based budgeting, getting out of debt, an emergency fund, and goals that stick.",
      weeks: courseWeeks.length,
    },
    {
      slug: "business-creation",
      Icon: Briefcase,
      badge: isCentralAsia ? "Шаг 2" : "Step 2",
      title: isCentralAsia ? "Создание бизнеса" : "Business Creation",
      desc: isCentralAsia
        ? "12 недель: от идеи и разговоров с клиентами до бизнес-модели, проверки гипотез и первых продаж."
        : "12 weeks: from idea and customer conversations to a business model, validated assumptions, and first sales.",
      weeks: businessCourseWeeks.length,
    },
    {
      slug: "leadership-development",
      Icon: Users,
      badge: isCentralAsia ? "Шаг 3" : "Step 3",
      title: isCentralAsia ? "Развитие лидерства" : "Leadership Development",
      desc: isCentralAsia
        ? "12 недель: вести себя, других, команды и организации — чтобы умножать результат в своём сообществе."
        : "12 weeks: lead yourself, others, teams, and organizations so you can multiply impact in your community.",
      weeks: leadershipCourseWeeks.length,
    },
  ];

  const faqs = isCentralAsia
    ? [
        { question: "Это действительно бесплатно?", answer: "Да. Все курсы, рабочие листы, инструменты и сообщество полностью бесплатны. Нужен только email для регистрации." },
        { question: "На каком языке проходят курсы?", answer: "Интерфейс, задания и сообщество доступны на русском и английском. Вы выбираете язык при регистрации и можете переключить его в любой момент." },
        { question: "Сколько времени занимает обучение?", answer: "Каждая неделя разбита на 6 коротких дней по 15–30 минут: урок, история, рабочий лист, практика и итоги." },
        { question: "Нужно ли иметь бизнес, чтобы начать?", answer: "Нет. Курс финансовой грамотности подходит всем. Курс создания бизнеса помогает найти и проверить идею с нуля." },
      ]
    : [
        { question: "Is it really free?", answer: "Yes. Every course, worksheet, tool, and the community are completely free. All you need is an email address to create an account." },
        { question: "What languages are the courses in?", answer: "The interface, lessons, worksheets, and community are available in English and Russian. You pick your language when you sign up and can switch any time." },
        { question: "How much time does it take?", answer: "Each week is split into 6 short days of 15–30 minutes: a lesson, a story, a worksheet, practice, and a wrap-up." },
        { question: "Do I need a business to start?", answer: "No. The financial literacy course is for everyone. The business creation course helps you find and validate an idea from scratch." },
      ];

  const title = isCentralAsia
    ? `Бесплатные курсы: финансы, бизнес, лидерство | ${siteConfig.name}`
    : `Free Financial Literacy, Business & Leadership Courses | ${siteConfig.name}`;
  const description = isCentralAsia ? siteConfig.descriptionRu : siteConfig.description;

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl("/", language)} />
        <meta property="og:image" content={siteConfig.defaultImageUrl} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={siteConfig.defaultImageUrl} />
        <script type="application/ld+json">{JSON.stringify(generateFAQSchema(faqs))}</script>
      </Helmet>

      {/* Hero */}
      <section className="relative bg-[#1B2A4A] text-white pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#C9922A,_transparent_55%)]" />
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider bg-white/10 rounded-full px-3 py-1 mb-5">
              <Globe className="w-3.5 h-3.5" /> {t("home.badge")}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">{t("home.heroTitle")}</h1>
            <p className="text-lg md:text-xl text-white/85 mb-8 leading-relaxed">{t("home.heroSubtitle")}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              {clerkEnabled ? (
                <>
                  <SignedOut>
                    <Link to="/sign-up">
                      <Button size="lg" className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8 w-full sm:w-auto">
                        {t("home.ctaPrimary")} <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </SignedOut>
                  <SignedIn>
                    <Link to="/dashboard">
                      <Button size="lg" className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8 w-full sm:w-auto">
                        {t("nav.dashboard")} <ArrowRight className="ml-2 w-5 h-5" />
                      </Button>
                    </Link>
                  </SignedIn>
                </>
              ) : (
                <Link to="/course/financial-literacy">
                  <Button size="lg" className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8 w-full sm:w-auto">
                    {t("home.ctaPrimary")} <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              )}
              <Link to="/programs">
                <Button size="lg" variant="outline" className="border-white/40 text-white bg-transparent hover:bg-white/10 w-full sm:w-auto">
                  {t("home.ctaSecondary")}
                </Button>
              </Link>
            </div>
            <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
              {[t("home.perk1"), t("home.perk2"), t("home.perk3")].map((p) => (
                <li key={p} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#C9922A]" /> {p}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Courses */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mb-10">
            <h2 className="text-3xl font-bold text-[#1B2A4A] mb-3">{t("home.pathTitle")}</h2>
            <p className="text-gray-600">{t("home.pathSubtitle")}</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((c) => (
              <Card key={c.slug} className="border-gray-200 hover:border-[#C9922A]/60 hover:shadow-lg transition-all">
                <CardContent className="pt-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-[#C9922A]/10 w-12 h-12 rounded-full flex items-center justify-center">
                      <c.Icon className="w-6 h-6 text-[#C9922A]" />
                    </div>
                    <span className="text-xs font-semibold uppercase tracking-wide text-[#C9922A]">{c.badge}</span>
                  </div>
                  <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">{c.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-1">{c.desc}</p>
                  <p className="text-xs text-gray-500 mb-3">{isCentralAsia ? `${c.weeks} недель · ${c.weeks * 6} уроков` : `${c.weeks} weeks · ${c.weeks * 6} lessons`}</p>
                  <Link to={`/course/${c.slug}`}>
                    <Button className="w-full bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 text-white">
                      {t("common.learnMore")} <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-[#1B2A4A] mb-10 text-center">{t("home.howTitle")}</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { Icon: PlayCircle, t: t("home.how1Title"), d: t("home.how1Desc") },
              { Icon: BookOpen, t: t("home.how2Title"), d: t("home.how2Desc") },
              { Icon: Calculator, t: t("home.how3Title"), d: t("home.how3Desc") },
              { Icon: MessageCircle, t: t("home.how4Title"), d: t("home.how4Desc") },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="bg-[#1B2A4A] text-white w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                  <s.Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-[#1B2A4A] mb-2">{s.t}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community */}
      <section className="py-16 bg-[#FFFBF0] border-y border-[#C9922A]/20">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h2 className="text-3xl font-bold text-[#1B2A4A] mb-4">{t("home.communityTitle")}</h2>
            <p className="text-gray-700 leading-relaxed mb-6">{t("home.communityDesc")}</p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/community">
                <Button className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white w-full sm:w-auto">
                  {t("nav.community")} <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link to="/cohort">
                <Button variant="outline" className="border-[#1B2A4A]/30 text-[#1B2A4A] w-full sm:w-auto">
                  {isCentralAsia ? "Живые когорты" : "Live cohorts"}
                </Button>
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { n: courseWeeks.length + businessCourseWeeks.length + leadershipCourseWeeks.length, l: isCentralAsia ? "недель обучения" : "weeks of curriculum" },
              { n: (courseWeeks.length + businessCourseWeeks.length + leadershipCourseWeeks.length) * 6, l: isCentralAsia ? "ежедневных уроков" : "daily lessons" },
              { n: 30, l: isCentralAsia ? "интерактивных рабочих листов" : "interactive worksheets" },
              { n: 2, l: isCentralAsia ? "языка" : "languages" },
            ].map((s) => (
              <div key={s.l} className="bg-white rounded-xl p-5 border border-[#C9922A]/20 text-center">
                <p className="text-3xl font-bold text-[#1B2A4A]">{s.n}</p>
                <p className="text-xs text-gray-500 mt-1">{s.l}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-[#1B2A4A] mb-8 text-center">{isCentralAsia ? "Частые вопросы" : "Frequently asked questions"}</h2>
          <div className="space-y-4">
            {faqs.map((f) => (
              <details key={f.question} className="group bg-white border border-gray-200 rounded-lg p-5">
                <summary className="font-semibold text-[#1B2A4A] cursor-pointer list-none flex justify-between items-center">
                  {f.question}
                  <span className="text-[#C9922A] group-open:rotate-45 transition-transform text-xl leading-none">+</span>
                </summary>
                <p className="text-gray-600 mt-3 leading-relaxed">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
