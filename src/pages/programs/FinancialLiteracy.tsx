import { Helmet } from "react-helmet";
import {
  ArrowRight,
  BookOpen,
  Calculator,
  Target,
  CheckCircle2,
  Users2,
  Shield,
  DollarSign,
  Heart,
  Clock,
  Zap,
  Users,
  TrendingUp,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { courseWeeks } from "@/data/courseContent";
import { useRegion } from "@/contexts/RegionContext";
import { Breadcrumbs } from "@/components/SEO";
import { generateFAQSchema } from "@/lib/seo";
import {
  useProgram,
  type ProgramTrustBadge,
  type ProgramWeek,
} from "@/hooks/usePrograms";
import { useFaqItemsForProgram, localizeFaqs } from "@/hooks/useFaqItems";

// Hardcoded fallbacks — used if Sanity returns empty arrays. Keep in sync with
// the migration script (scripts/migrate-program-deep-sections.mts).
const FALLBACK_BADGES: ProgramTrustBadge[] = [
  { icon: "Zap", label: "100% Free", labelRu: "100% бесплатно" },
  { icon: "Clock", label: "Self-Paced", labelRu: "В своём темпе" },
  { icon: "Users", label: "No Login Required", labelRu: "Без регистрации" },
  { icon: "Shield", label: "Evidence-Based", labelRu: "Научно обоснован" },
];

// Curriculum weeks fallback — derived from courseWeeks (the rich source still
// lives in src/data/courseContent.ts). The Sanity weeks array, when seeded,
// holds only title + short summary per week; deeper data (topics, objectives)
// is rendered from the courseWeeks lookup below.
const FALLBACK_WEEKS: ProgramWeek[] = courseWeeks.map((w) => ({
  weekNumber: w.week,
  title: w.title,
  summary: w.overview.substring(0, 200),
}));

const FinancialLiteracy = () => {
  const { isCentralAsia } = useRegion();
  const { program } = useProgram("financial-literacy");
  const { faqs: rawFaqs } = useFaqItemsForProgram("financial-literacy");
  const faqItems = localizeFaqs(rawFaqs, isCentralAsia);

  const badges = program.trustBadges.length > 0 ? program.trustBadges : FALLBACK_BADGES;
  const weeks = program.weeks.length > 0 ? program.weeks : FALLBACK_WEEKS;

  return (
    <>
      <Helmet>
        <title>{`${program.getTitle(isCentralAsia)} | BBB`}</title>
        <meta name="description" content={program.getHeroDescription(isCentralAsia)} />
        <meta
          name="keywords"
          content="financial education program, financial literacy course, free budgeting course, debt elimination program, money management education, nonprofit financial education, Central Asia financial training"
        />
        <meta
          property="og:title"
          content={
            isCentralAsia
              ? "Финансовая грамотность - Бесплатное финансовое образование"
              : "Financial Literacy Program - Free Financial Education"
          }
        />
        <meta
          property="og:description"
          content={
            isCentralAsia
              ? "Бесплатное, практическое финансовое образование. Без жаргона, без платы, без уловок."
              : "Free, practical financial education. No jargon, no fees, no catch. Self-paced online course and cohort-based programs available."
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://businessesbeyondborders.com/programs/financial-literacy"
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Financial Literacy Program - Businesses Beyond Borders"
        />
        <meta
          name="twitter:description"
          content="Free, practical financial education with our Learn-Practice-Apply method. Online course and cohort programs available."
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Businesses Beyond Borders" />
        <link
          rel="canonical"
          href="https://businessesbeyondborders.com/programs/financial-literacy"
        />
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema([
            {
              question: "Is the Financial Literacy Program really free?",
              answer: "Yes, the program is 100% free with no login required. The self-paced 6-week online course and all interactive tools are available at no cost, forever."
            },
            {
              question: "How long does the Financial Literacy Program take to complete?",
              answer: "The self-paced online course is 6 weeks long. A more comprehensive cohort-based version runs 10 weeks with facilitator-led group sessions. Both options allow you to go at your own speed."
            },
            {
              question: "What topics does the Financial Literacy Program cover?",
              answer: "The program covers zero-based budgeting, debt elimination strategies (including snowball and avalanche methods), emergency fund planning, income diversification, saving strategies, and the principles of generous giving."
            },
            {
              question: "Do I need any prior financial knowledge to join?",
              answer: "No prerequisites are required. The program is open to all backgrounds and is designed to be accessible to anyone who wants to take control of their financial future."
            },
            {
              question: "What is the difference between the 6-week course and the 10-week cohort program?",
              answer: "The 6-week self-paced online course lets you start anytime and progress at your own speed. The 10-week cohort program includes facilitator-led group sessions, accountability partnerships, and a certificate of completion — ideal for those who thrive in a community setting."
            },
            {
              question: "What interactive tools are included in the program?",
              answer: "The program includes a Debt Payoff Calculator (comparing snowball vs. avalanche strategies), guided budget worksheets for building a zero-based budget, and a Financial Snapshot self-assessment tool available in Week 1."
            },
          ]))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Financial Literacy Program",
            description:
              "Free, practical financial education covering budgeting, debt elimination, saving strategies, and more.",
            provider: {
              "@type": "NonprofitOrganization",
              name: "Businesses Beyond Borders",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Port Orange",
                addressRegion: "FL",
                addressCountry: "US",
              },
              telephone: "(386) 517-1527",
              email: "donations@businessesbeyondborders.com",
            },
            courseMode: ["online", "blended"],
            educationalLevel: "Beginner",
            isAccessibleForFree: true,
            timeRequired: ["PT6W", "PT10W"],
            coursePrerequisites:
              "None required - open to all backgrounds",
            teaches: [
              "Zero-based budgeting",
              "Debt elimination strategies",
              "Emergency fund planning",
              "Income diversification",
              "Generosity and giving",
              "Financial goal setting",
            ],
            url: "https://businessesbeyondborders.com/programs/financial-literacy",
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 pt-24">
          <Breadcrumbs
            items={[
              { name: "Home", url: "https://businessesbeyondborders.com" },
              { name: "Programs", url: "https://businessesbeyondborders.com/programs-and-impact" },
              { name: "Financial Literacy", url: "https://businessesbeyondborders.com/programs/financial-literacy" },
            ]}
          />
        </div>
        {/* Hero Section */}
        <div
          className="relative min-h-[70vh] flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/90 via-[#1B2A4A]/60 to-[#1B2A4A]/30" />
          <div className="relative z-10 container mx-auto px-4 text-center text-white py-20">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4 text-[#C9922A]" />
              {isCentralAsia ? "100% бесплатное финансовое образование" : "100% Free Financial Education"}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {program.getTagline(isCentralAsia)}
            </h1>

            <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed mb-8">
              {program.getHeroDescription(isCentralAsia)}
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 text-white/70">
              {badges.map((badge) => {
                const Icon =
                  ((LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[badge.icon]) ??
                  LucideIcons.Sparkles;
                const label = isCentralAsia ? badge.labelRu ?? badge.label : badge.label;
                return (
                  <div key={`${badge.icon}-${label}`} className="flex items-center gap-2 text-sm">
                    <Icon className="w-4 h-4 text-[#C9922A]" />
                    <span className="font-medium">{label}</span>
                  </div>
                );
              })}
            </div>

            {/* Dual CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to={program.primaryCtaUrl}>
                <Button
                  size="lg"
                  className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8 py-4 text-lg"
                >
                  {program.getPrimaryCtaLabel(isCentralAsia)}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Link to="/tools/debt-calculator">
                <Button
                  size="lg"
                  className="bg-transparent border border-white/40 text-white hover:bg-white/10 font-medium px-8 py-4 text-lg"
                >
                  <Calculator className="mr-2 w-5 h-5" />
                  {isCentralAsia ? "Попробовать калькулятор долгов" : "Try the Debt Calculator"}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Learn-Practice-Apply Method */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#1B2A4A]/5 text-[#1B2A4A] px-4 py-2 rounded-full text-sm font-medium mb-6">
                <BookOpen className="w-4 h-4 text-[#C9922A]" />
                {isCentralAsia ? "Наш подход" : "Our Approach"}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
                {isCentralAsia ? (
                  <>
                    Учись. Практикуй.{" "}
                    <span className="text-[#C9922A]">Применяй.</span>
                  </>
                ) : (
                  <>
                    Learn. Practice.{" "}
                    <span className="text-[#C9922A]">Apply.</span>
                  </>
                )}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {isCentralAsia
                  ? "Каждый модуль следует простому трёхшаговому процессу, направленному на превращение знаний в устойчивые привычки."
                  : "Every module follows a simple three-step process designed to turn knowledge into lasting habits."}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center group">
                <div className="bg-gradient-to-br from-[#1B2A4A]/5 to-[#1B2A4A]/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                  <BookOpen className="w-10 h-10 text-[#1B2A4A]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {isCentralAsia ? "Учись" : "Learn"}
                </h3>
                <p className="text-gray-600">
                  {isCentralAsia
                    ? "Поймите принципы грамотного управления деньгами через понятные, безжаргонные уроки."
                    : "Understand the principles behind smart money management through clear, jargon-free lessons."}
                </p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-[#C9922A]/10 to-[#C9922A]/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                  <Target className="w-10 h-10 text-[#C9922A]" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {isCentralAsia ? "Практикуй" : "Practice"}
                </h3>
                <p className="text-gray-600">
                  {isCentralAsia
                    ? "Используйте интерактивные инструменты и рабочие листы, чтобы применить изученное к своим финансам."
                    : "Use interactive tools and worksheets to apply what you learn to your own finances."}
                </p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                  <TrendingUp className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {isCentralAsia ? "Применяй" : "Apply"}
                </h3>
                <p className="text-gray-600">
                  {isCentralAsia
                    ? "Действуйте согласно персонализированному плану бюджета, погашения долгов и целей сбережений."
                    : "Take action with a personalized plan for your budget, debt payoff, and savings goals."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Options */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] text-center mb-4">
            {isCentralAsia ? "Выберите свой путь" : "Choose Your Path"}
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            {isCentralAsia
              ? "Предпочитаете учиться самостоятельно или в группе — у нас есть вариант для вас."
              : "Whether you prefer self-paced learning or a guided group experience, we have an option for you."}
          </p>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* 6-Week Self-Paced */}
            <Card className="border-2 border-[#C9922A]/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#C9922A]" />
              <div className="absolute top-4 right-4 bg-[#C9922A] text-white px-3 py-1 rounded-full text-xs font-bold">
                {isCentralAsia ? "НАЧНИТЕ КОГДА УГОДНО" : "START ANYTIME"}
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-[#1B2A4A]">
                  {isCentralAsia ? "6-недельный онлайн-курс" : "6-Week Online Course"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  {isCentralAsia
                    ? "Наш самостоятельный онлайн-курс охватывает всё необходимое для управления финансами. Начните в любое время, двигайтесь в своём темпе, отслеживайте прогресс."
                    : "Our self-paced online course covers everything you need to take control of your finances. Start anytime, go at your own speed, track your progress."}
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {isCentralAsia
                      ? "Бюджетирование, погашение долгов, сбережения и многое другое"
                      : "Budgeting, debt elimination, saving & more"}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {isCentralAsia ? "Интерактивные инструменты и рабочие листы" : "Interactive tools and worksheets"}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {isCentralAsia ? "Отслеживание прогресса (без входа в систему)" : "Progress tracking (no login needed)"}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {isCentralAsia ? "100% бесплатно, навсегда" : "100% free, forever"}
                  </li>
                </ul>
                <Link to="/course/financial-literacy">
                  <Button className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold py-3">
                    {isCentralAsia ? "Начать бесплатный курс" : "Start the Free Course"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* 10-Week Comprehensive */}
            <Card className="border-2 border-[#1B2A4A]/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#1B2A4A]" />
              <div className="absolute top-4 right-4 bg-[#1B2A4A] text-white px-3 py-1 rounded-full text-xs font-bold">
                {isCentralAsia ? "ГРУППОВОЙ ФОРМАТ" : "COHORT-BASED"}
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-[#1B2A4A]">
                  {isCentralAsia ? "10-недельная углублённая программа" : "10-Week Comprehensive Program"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  {isCentralAsia
                    ? "Полная программа с руководством фасилитатора, групповыми обсуждениями и более глубоким изучением финансовых тем. Идеально для тех, кто процветает в условиях сообщества."
                    : "Our full program with facilitator guidance, group discussions, and deeper exploration of financial topics. Perfect for those who thrive in a community setting."}
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {isCentralAsia
                      ? "Всё из 6-недельного курса и многое другое"
                      : "Everything in the 6-week course, plus more"}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {isCentralAsia ? "Групповые занятия с фасилитатором" : "Facilitator-led group sessions"}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {isCentralAsia ? "Партнёрство по подотчётности" : "Accountability partnerships"}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {isCentralAsia ? "Сертификат об окончании" : "Certificate of completion"}
                  </li>
                </ul>
                <Link to="/get-involved?type=program&program=financial-literacy">
                  <Button
                    variant="outline"
                    className="w-full border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white font-bold py-3"
                  >
                    {isCentralAsia ? "Узнать о следующей группе" : "Inquire About Next Cohort"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Interactive Tools Showcase */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] text-center mb-4">
              {isCentralAsia ? "Интерактивные инструменты" : "Interactive Tools"}
            </h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              {isCentralAsia
                ? "Бесплатные финансовые инструменты, которые можно использовать прямо сейчас — без регистрации."
                : "Free financial tools you can use right now -- no signup required."}
            </p>

            <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <Card className="border border-[#C9922A]/20 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="bg-[#C9922A]/10 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Calculator className="w-7 h-7 text-[#C9922A]" />
                  </div>
                  <h3 className="font-bold text-[#1B2A4A] mb-2">
                    {isCentralAsia ? "Калькулятор погашения долгов" : "Debt Payoff Calculator"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {isCentralAsia
                      ? "Сравните стратегии снежного кома и лавины и узнайте свою дату освобождения от долгов."
                      : "Compare snowball vs. avalanche strategies and see your debt-free date."}
                  </p>
                  <Link to="/tools/debt-calculator">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#C9922A] text-[#C9922A] hover:bg-[#C9922A] hover:text-white"
                    >
                      {isCentralAsia ? "Попробовать бесплатно" : "Try It Free"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border border-[#1B2A4A]/10 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="bg-[#1B2A4A]/5 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <DollarSign className="w-7 h-7 text-[#1B2A4A]" />
                  </div>
                  <h3 className="font-bold text-[#1B2A4A] mb-2">
                    {isCentralAsia ? "Рабочий лист бюджета" : "Budget Worksheet"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {isCentralAsia
                      ? "Составьте бюджет с нулевой базой на 3-й неделе бесплатного курса с помощью рабочих листов."
                      : "Build a zero-based budget in Week 3 of the free course with guided worksheets."}
                  </p>
                  <Link to="/course/financial-literacy">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-[#1B2A4A] text-[#1B2A4A] hover:bg-[#1B2A4A] hover:text-white"
                    >
                      {isCentralAsia ? "Начать курс" : "Start the Course"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>

              <Card className="border border-green-200 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6 text-center">
                  <div className="bg-green-50 w-14 h-14 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Target className="w-7 h-7 text-green-600" />
                  </div>
                  <h3 className="font-bold text-[#1B2A4A] mb-2">
                    {isCentralAsia ? "Финансовый снимок" : "Financial Snapshot"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {isCentralAsia
                      ? "Оцените своё финансовое положение с помощью самооценки 1-й недели."
                      : "Take stock of where you stand financially with our Week 1 self-assessment."}
                  </p>
                  <Link to="/course/financial-literacy/1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white"
                    >
                      {isCentralAsia ? "Начать" : "Get Started"}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* 6-Week Curriculum Overview */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] text-center mb-4">
            {isCentralAsia ? "Чему вы научитесь" : "What You'll Learn"}
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            {isCentralAsia
              ? "Шесть недель, охватывающих всё от основ бюджетирования до построения прочного финансового наследия."
              : "Six weeks covering everything from budgeting basics to building a lasting financial legacy."}
          </p>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {weeks.map((week) => {
                // Sanity-driven title/summary; courseWeeks supplies subtitle + keyTopics.
                const detail = courseWeeks.find((w) => w.week === week.weekNumber);
                const displayTitle = isCentralAsia ? week.titleRu ?? week.title : week.title;
                const displaySummary = isCentralAsia
                  ? week.summaryRu ?? week.summary ?? detail?.overview.substring(0, 200) ?? ""
                  : week.summary ?? detail?.overview.substring(0, 200) ?? "";
                return (
                  <AccordionItem key={week.weekNumber} value={`week-${week.weekNumber}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#1B2A4A] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {week.weekNumber}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">
                            {displayTitle}
                          </span>
                          {detail?.subtitle && (
                            <span className="text-sm text-gray-500 ml-2 hidden sm:inline">
                              -- {detail.subtitle}
                            </span>
                          )}
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-gray-50 p-4 rounded-lg mt-2">
                        <p className="text-gray-700 mb-3 text-sm">
                          {displaySummary}
                          {displaySummary && !displaySummary.endsWith("...") && "..."}
                        </p>
                        {detail?.keyTopics && detail.keyTopics.length > 0 && (
                          <div className="mb-3">
                            <h4 className="font-semibold text-gray-800 text-sm mb-2">
                              {isCentralAsia ? "Ключевые темы:" : "Key Topics:"}
                            </h4>
                            <ul className="text-sm text-gray-600 space-y-1">
                              {detail.keyTopics.map((topic, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C9922A] mt-0.5 flex-shrink-0" />
                                  {topic.title}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        <Link
                          to={`/course/financial-literacy/${week.weekNumber}`}
                          className="text-sm text-[#C9922A] hover:text-[#1B2A4A] font-medium flex items-center gap-1"
                        >
                          {isCentralAsia
                            ? `Перейти к неделе ${week.weekNumber}`
                            : `Go to Week ${week.weekNumber}`}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>

        {/* What You'll Achieve */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="bg-gradient-to-br from-[#1B2A4A]/5 to-[#C9922A]/5 p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-8 text-center">
                {isCentralAsia ? "Чего вы достигнете" : "What You'll Achieve"}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold text-[#1B2A4A] mb-4 flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-[#C9922A]" />
                    {isCentralAsia ? "Финансовые основы" : "Financial Foundations"}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {isCentralAsia
                        ? "Рабочий бюджет с нулевой базой, адаптированный под вашу жизнь"
                        : "A working zero-based budget customized for your life"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {isCentralAsia
                        ? "План погашения долгов с целевой датой выплаты"
                        : "A debt elimination plan with a target payoff date"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {isCentralAsia
                        ? "Стратегия резервного фонда с чёткими этапами"
                        : "An emergency fund strategy with clear milestones"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {isCentralAsia
                        ? "План щедрого пожертвования в соответствии с вашим доходом"
                        : "A plan for generous giving at your income level"}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#1B2A4A] mb-4 flex items-center gap-2">
                    <Heart className="w-5 h-5 text-[#C9922A]" />
                    {isCentralAsia ? "Личностный рост" : "Personal Growth"}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {isCentralAsia
                        ? "Уверенность в принятии финансовых решений"
                        : "Confidence in making financial decisions"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {isCentralAsia
                        ? "Здоровые денежные привычки, которые сохраняются"
                        : "Healthy money habits that stick"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {isCentralAsia
                        ? "Способность передавать знания другим"
                        : "The ability to teach others what you've learned"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                      {isCentralAsia
                        ? "90-дневный план действий для дальнейшего прогресса"
                        : "A 90-day action plan for continued progress"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] text-center mb-4">
            {isCentralAsia ? "Часто задаваемые вопросы" : "Frequently Asked Questions"}
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            {isCentralAsia
              ? "Ответы на самые распространённые вопросы о программе финансовой грамотности."
              : "Answers to the most common questions about the Financial Literacy Program."}
          </p>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left font-semibold text-gray-800">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>

        {/* Success Story */}
        <div className="container mx-auto px-4 py-16">
          <Card className="border-2 border-[#C9922A]/20 max-w-3xl mx-auto">
            <CardContent className="p-8">
              <div className="flex items-start gap-4">
                <div className="bg-[#C9922A]/10 p-3 rounded-full flex-shrink-0">
                  <Users2 className="w-6 h-6 text-[#C9922A]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-[#1B2A4A] mb-3">
                    {isCentralAsia ? "Реальные результаты" : "Real Results"}
                  </h3>
                  <blockquote className="text-lg text-gray-700 italic mb-4">
                    {isCentralAsia
                      ? "«До этой программы я тонула в долгах без всякого плана. Практические инструменты и пошаговый подход дали мне подотчётность и реальные навыки. Шесть месяцев спустя я освободилась от долгов, создала резервный фонд и теперь учу соседей тем же принципам.»"
                      : "\"Before this program, I was drowning in debt with no plan. The practical tools and step-by-step approach gave me accountability and real skills. Six months later, I'm debt-free with an emergency fund and teaching my neighbors the same principles.\""}
                  </blockquote>
                  <footer className="text-[#C9922A] font-medium">
                    {isCentralAsia
                      ? "-- Maria S., выпускница из Казахстана"
                      : "-- Maria S., Kazakhstan Graduate"}
                  </footer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom CTA */}
        <div className="bg-[#1B2A4A] py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {isCentralAsia ? "Готовы начать?" : "Ready to Get Started?"}
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              {isCentralAsia
                ? "Начните бесплатный курс сегодня или узнайте, как стать фасилитатором и помочь другим в вашем сообществе."
                : "Start the free course today, or explore becoming a facilitator to help others in your community."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/course/financial-literacy">
                <Button
                  size="lg"
                  className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8"
                >
                  {isCentralAsia ? "Начать бесплатный курс" : "Start the Free Course"}
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

export default FinancialLiteracy;
