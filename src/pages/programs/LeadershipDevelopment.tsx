import { Helmet } from "react-helmet";
import {
  ArrowRight,
  BookOpen,
  CheckCircle2,
  Users2,
  Shield,
  Heart,
  Clock,
  Zap,
  Users,
  TrendingUp,
  Crown,
  Compass,
  HeartHandshake,
  Target,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { leadershipCourseWeeks, leadershipModules } from "@/data/leadership-course";
import { useRegion } from "@/contexts/RegionContext";
import { Breadcrumbs } from "@/components/SEO";
import { generateFAQSchema } from "@/lib/seo";
import { useProgram } from "@/hooks/usePrograms";
import { useFaqItemsForProgram, localizeFaqs } from "@/hooks/useFaqItems";

const LeadershipDevelopment = () => {
  const { isCentralAsia } = useRegion();
  const { program } = useProgram("leadership-development");
  const { faqs: rawFaqs } = useFaqItemsForProgram("leadership-development");
  const faqItems = localizeFaqs(rawFaqs, isCentralAsia);

  return (
    <>
      <Helmet>
        <title>{`${program.getTitle(isCentralAsia)} | BBB`}</title>
        <meta
          name="description"
          content={program.getHeroDescription(isCentralAsia)}
        />
        <meta
          name="keywords"
          content="leadership development program, free leadership course, emotional intelligence training, team building course, strategic leadership, nonprofit leadership education"
        />
        <meta
          property="og:title"
          content={
            isCentralAsia
              ? "Развитие лидерства - Бесплатное обучение лидерству"
              : "Leadership Development Program - Free Leadership Training"
          }
        />
        <meta
          property="og:description"
          content={
            isCentralAsia
              ? "Бесплатное, практическое обучение лидерству. Без жаргона, без платы, без уловок."
              : "Free, practical leadership education. No jargon, no fees, no catch. Self-paced online course and cohort-based programs available."
          }
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://businessesbeyondborders.com/programs/leadership-development"
        />
        <meta
          property="og:image"
          content="https://images.unsplash.com/photo-1522071820081-009f0129c71c"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Leadership Development Program - Businesses Beyond Borders"
        />
        <meta
          name="twitter:description"
          content="Free, practical leadership education with our Learn-Practice-Apply method. Online course and cohort programs available."
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Businesses Beyond Borders" />
        <link
          rel="canonical"
          href="https://businessesbeyondborders.com/programs/leadership-development"
        />
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema([
            {
              question: "Is the Leadership Development Program free?",
              answer: "Yes, the 12-week self-paced online course is 100% free. A mentored cohort-based program is also available for those who prefer guided group learning with one-on-one mentorship sessions."
            },
            {
              question: "What are the prerequisites for the Leadership Development Program?",
              answer: "The Leadership Development Program is designed to follow the 12-Week Business Creation Course, which provides the entrepreneurship foundation that leadership skills build upon."
            },
            {
              question: "What leadership topics does the program cover?",
              answer: "The 12-week program covers emotional intelligence and self-leadership, communication and influence skills, team building and management, conflict resolution, strategic thinking, change management, and organizational leadership — built on research by Covey, Goleman, Kotter, and other leading experts."
            },
            {
              question: "How is the Leadership Development Program structured?",
              answer: "The program is organized into four modules over 12 weeks: self-leadership (Weeks 1-3), leading others (Weeks 4-6), team leadership (Weeks 7-9), and organizational leadership (Weeks 10-12). Each module follows a Learn-Practice-Lead framework."
            },
            {
              question: "What will I be able to do after completing the Leadership Development Program?",
              answer: "Graduates develop emotional intelligence and self-leadership mastery, communication and influence skills, the ability to build and manage high-performance teams, values-based decision-making confidence, conflict resolution abilities, and a personal leadership legacy statement."
            },
            {
              question: "Is there a cohort option for the Leadership Development Program?",
              answer: "Yes. In addition to the self-paced online course, BBB offers a mentored leadership program with facilitator guidance, group discussions, one-on-one mentorship sessions, accountability partnerships, and a certificate of completion."
            },
          ]))}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Course",
            name: "Leadership Development Program",
            description:
              "Free, practical leadership education covering emotional intelligence, team building, strategic thinking, change management, and organizational leadership.",
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
            educationalLevel: "Advanced",
            isAccessibleForFree: true,
            timeRequired: "PT12W",
            coursePrerequisites: "12-Week Business Creation Course",
            teaches: [
              "Emotional intelligence",
              "Team leadership",
              "Conflict resolution",
              "Strategic thinking",
              "Change management",
              "Organizational leadership",
            ],
            url: "https://businessesbeyondborders.com/programs/leadership-development",
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        <div className="container mx-auto px-4 pt-24">
          <Breadcrumbs
            items={[
              { name: "Home", url: "https://businessesbeyondborders.com" },
              { name: "Programs", url: "https://businessesbeyondborders.com/programs-and-impact" },
              { name: "Leadership Development", url: "https://businessesbeyondborders.com/programs/leadership-development" },
            ]}
          />
        </div>
        {/* Hero Section */}
        <div
          className="relative min-h-[70vh] flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#1B2A4A]/90 via-[#1B2A4A]/60 to-[#1B2A4A]/30" />
          <div className="relative z-10 container mx-auto px-4 text-center text-white py-20">
            <div className="inline-flex items-center gap-2 bg-white/15 backdrop-blur px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Crown className="w-4 h-4 text-[#C9922A]" />
              {isCentralAsia ? "100% бесплатное обучение лидерству" : "100% Free Leadership Education"}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {program.getTagline(isCentralAsia)}
            </h1>

            <p className="text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed mb-8">
              {program.getHeroDescription(isCentralAsia)}
            </p>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-8 text-white/70">
              {(isCentralAsia
                ? [
                    { icon: Zap, label: "100% бесплатно" },
                    { icon: Clock, label: "В своём темпе" },
                    { icon: Users, label: "12 недель" },
                    { icon: Shield, label: "Научно обоснован" },
                  ]
                : [
                    { icon: Zap, label: "100% Free" },
                    { icon: Clock, label: "Self-Paced" },
                    { icon: Users, label: "12 Weeks" },
                    { icon: Shield, label: "Evidence-Based" },
                  ]
              ).map((badge) => (
                <div key={badge.label} className="flex items-center gap-2 text-sm">
                  <badge.icon className="w-4 h-4 text-[#C9922A]" />
                  <span className="font-medium">{badge.label}</span>
                </div>
              ))}
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
              <Link to="/course/business-creation">
                <Button
                  size="lg"
                  className="bg-transparent border border-white/40 text-white hover:bg-white/10 font-medium px-8 py-4 text-lg"
                >
                  {isCentralAsia ? "Сначала — курс создания бизнеса" : "Prerequisite: Business Creation"}
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
                    <span className="text-[#C9922A]">Руководи.</span>
                  </>
                ) : (
                  <>
                    Learn. Practice.{" "}
                    <span className="text-[#C9922A]">Lead.</span>
                  </>
                )}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {isCentralAsia
                  ? "Каждый модуль следует простому трёхшаговому процессу, направленному на превращение знаний в реальные лидерские навыки."
                  : "Every module follows a simple three-step process designed to turn knowledge into real leadership capability."}
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
                    ? "Поймите принципы эффективного лидерства через исследования и реальные примеры."
                    : "Understand the principles of effective leadership through research and real-world examples."}
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
                    ? "Применяйте модели лидерства через интерактивные рабочие листы, кейс-стади и практические задания."
                    : "Apply leadership frameworks through interactive worksheets, case studies, and hands-on exercises."}
                </p>
              </div>
              <div className="text-center group">
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg transition-shadow">
                  <TrendingUp className="w-10 h-10 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">
                  {isCentralAsia ? "Руководи" : "Lead"}
                </h3>
                <p className="text-gray-600">
                  {isCentralAsia
                    ? "Действуйте с персонализированным планом лидерства, строя команды и ведя за собой организации."
                    : "Take action with a personalized leadership plan, building teams and leading organizations."}
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
            {/* 12-Week Self-Paced */}
            <Card className="border-2 border-[#C9922A]/30 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#C9922A]" />
              <div className="absolute top-4 right-4 bg-[#C9922A] text-white px-3 py-1 rounded-full text-xs font-bold">
                {isCentralAsia ? "НАЧНИТЕ КОГДА УГОДНО" : "START ANYTIME"}
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-[#1B2A4A]">
                  {isCentralAsia ? "12-недельный онлайн-курс" : "12-Week Online Course"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  {isCentralAsia
                    ? "Наш самостоятельный онлайн-курс охватывает все аспекты лидерства. Начните в любое время, двигайтесь в своём темпе, отслеживайте прогресс."
                    : "Our self-paced online course covers every aspect of leadership development. Start anytime, go at your own speed, track your progress."}
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {isCentralAsia
                      ? "Эмоциональный интеллект, коммуникация, стратегия"
                      : "Emotional intelligence, communication, strategy"}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {isCentralAsia ? "Интерактивные рабочие листы и кейс-стади" : "Interactive worksheets and case studies"}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {isCentralAsia ? "Отслеживание прогресса" : "Progress tracking"}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {isCentralAsia ? "100% бесплатно, навсегда" : "100% free, forever"}
                  </li>
                </ul>
                <Link to="/course/leadership-development">
                  <Button className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold py-3">
                    {isCentralAsia ? "Начать бесплатный курс" : "Start the Free Course"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Cohort-Based */}
            <Card className="border-2 border-[#1B2A4A]/20 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-[#1B2A4A]" />
              <div className="absolute top-4 right-4 bg-[#1B2A4A] text-white px-3 py-1 rounded-full text-xs font-bold">
                {isCentralAsia ? "ГРУППОВОЙ ФОРМАТ" : "COHORT-BASED"}
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-[#1B2A4A]">
                  {isCentralAsia ? "Углублённая программа с наставником" : "Mentored Leadership Program"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  {isCentralAsia
                    ? "Полная программа с руководством наставника, групповыми обсуждениями и более глубоким изучением лидерских тем."
                    : "Our full program with mentor guidance, group discussions, and deeper exploration of leadership topics. Perfect for those who thrive in a community setting."}
                </p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {isCentralAsia
                      ? "Всё из 12-недельного курса и многое другое"
                      : "Everything in the 12-week course, plus more"}
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    {isCentralAsia ? "Индивидуальное наставничество" : "One-on-one mentorship sessions"}
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
                <Link to="/get-involved?type=program&program=leadership-development">
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

        {/* 12-Week Curriculum Overview */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] text-center mb-4">
              {isCentralAsia ? "Чему вы научитесь" : "What You'll Learn"}
            </h2>
            <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
              {isCentralAsia
                ? "Двенадцать недель, четыре модуля — от самоуправления до руководства организациями."
                : "Twelve weeks, four modules -- from self-leadership to organizational leadership."}
            </p>

            <div className="max-w-3xl mx-auto">
              <Accordion type="single" collapsible className="w-full">
                {leadershipModules.map((mod, mi) => (
                  <AccordionItem key={mod.title} value={`module-${mi}`}>
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-3">
                        <div className="bg-[#1B2A4A] text-white w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                          {mi + 1}
                        </div>
                        <div>
                          <span className="font-semibold text-gray-800">
                            {mod.title}
                          </span>
                          <span className="text-sm text-gray-500 ml-2 hidden sm:inline">
                            -- {isCentralAsia ? `Недели ${mod.weeks[0]}-${mod.weeks[mod.weeks.length - 1]}` : `Weeks ${mod.weeks[0]}-${mod.weeks[mod.weeks.length - 1]}`}
                          </span>
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="bg-gray-50 p-4 rounded-lg mt-2 space-y-3">
                        {mod.weeks.map((weekNum) => {
                          const week = leadershipCourseWeeks.find((w) => w.week === weekNum);
                          if (!week) return null;
                          return (
                            <div key={weekNum} className="flex items-start gap-3">
                              <div className="bg-[#C9922A]/10 text-[#C9922A] w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                                {weekNum}
                              </div>
                              <div>
                                <p className="font-medium text-gray-800 text-sm">{week.title}</p>
                                <p className="text-xs text-gray-500">{week.subtitle}</p>
                              </div>
                            </div>
                          );
                        })}
                        <Link
                          to="/course/leadership-development"
                          className="text-sm text-[#C9922A] hover:text-[#1B2A4A] font-medium flex items-center gap-1 mt-2"
                        >
                          {isCentralAsia ? "Начать курс" : "Start the Course"}
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>

        {/* What You'll Achieve */}
        <div className="container mx-auto px-4 py-16">
          <div className="bg-gradient-to-br from-[#1B2A4A]/5 to-[#C9922A]/5 p-8 md:p-12 rounded-2xl max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-8 text-center">
              {isCentralAsia ? "Чего вы достигнете" : "What You'll Achieve"}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-[#1B2A4A] mb-4 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[#C9922A]" />
                  {isCentralAsia ? "Лидерские навыки" : "Leadership Skills"}
                </h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {isCentralAsia
                      ? "Эмоциональный интеллект и самоуправление"
                      : "Emotional intelligence and self-leadership mastery"}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {isCentralAsia
                      ? "Навыки коммуникации и влияния"
                      : "Communication and influence skills"}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {isCentralAsia
                      ? "Построение и управление высокоэффективными командами"
                      : "Building and managing high-performance teams"}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {isCentralAsia
                      ? "Стратегическое мышление и управление изменениями"
                      : "Strategic thinking and change management"}
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
                      ? "Уверенность в принятии решений на основе ценностей"
                      : "Confidence in values-based decision making"}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {isCentralAsia
                      ? "Навыки разрешения конфликтов и переговоров"
                      : "Conflict resolution and negotiation abilities"}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {isCentralAsia
                      ? "Способность коучить и развивать других"
                      : "The ability to coach and develop others"}
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                    {isCentralAsia
                      ? "Личное заявление о лидерском наследии"
                      : "A personal leadership legacy statement"}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial */}
        <div className="bg-white py-16">
          <div className="container mx-auto px-4">
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
                        ? "«Этот курс изменил мой подход к руководству. Я научился слушать лучше, делегировать эффективнее и строить команду, которой люди хотят принадлежать. Самое ценное — практические инструменты, которые я использую каждый день.»"
                        : "\"This course changed how I lead. I learned to listen better, delegate more effectively, and build a team people actually want to be part of. The most valuable thing was the practical tools I use every day.\""}
                    </blockquote>
                    <footer className="text-[#C9922A] font-medium">
                      {isCentralAsia
                        ? "-- Нурбек А., предприниматель из Кыргызстана"
                        : "-- Nurbek A., Entrepreneur, Kyrgyzstan"}
                    </footer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="container mx-auto px-4 py-16">
          <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] text-center mb-4">
            {isCentralAsia ? "Часто задаваемые вопросы" : "Frequently Asked Questions"}
          </h2>
          <p className="text-gray-600 text-center mb-10 max-w-2xl mx-auto">
            {isCentralAsia
              ? "Ответы на самые распространённые вопросы о программе развития лидерства."
              : "Answers to the most common questions about the Leadership Development Program."}
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

        {/* Bottom CTA */}
        <div className="bg-[#1B2A4A] py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              {isCentralAsia ? "Готовы стать лидером?" : "Ready to Lead?"}
            </h2>
            <p className="text-white/70 mb-8 max-w-xl mx-auto">
              {isCentralAsia
                ? "Начните бесплатный курс сегодня или узнайте, как стать наставником и помочь другим в вашем сообществе."
                : "Start the free course today, or explore becoming a mentor to help others in your community."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/course/leadership-development">
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
                  {isCentralAsia ? "Стать наставником" : "Become a Mentor"}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadershipDevelopment;
