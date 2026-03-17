
import React from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, Briefcase, BarChart2, Users, Globe, Download, Calendar, BookOpen, Target, Star, TrendingUp, DollarSign, Shield, Heart, CheckCircle2, Clock, Users2, Lightbulb, Rocket, PieChart, Zap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import UpcomingEvents from "@/components/programs/UpcomingEvents";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useRegion } from "@/contexts/RegionContext";
import { Breadcrumbs } from "@/components/SEO";
import { generateFAQSchema } from "@/lib/seo";

const BusinessCreation = () => {
  const { isCentralAsia } = useRegion();

  return (
    <>
      <Helmet>
        <title>{isCentralAsia ? "Создание бизнеса — обучение | BBB" : "Business Creation Training Program | BBB"}</title>
        <meta name="description" content={isCentralAsia ? "Превратите вашу бизнес-идею в реальность с нашей 12-недельной комплексной программой предпринимательства. Методология Lean Startup, Business Model Canvas, разработка MVP и практическое обучение в Центральной Азии." : "Transform your business idea into reality with our 12-week comprehensive entrepreneurship program. Lean Startup methodology, Business Model Canvas, MVP development, and hands-on training serving Central Asia. 90% launch success rate."} />
        <meta name="keywords" content="business creation training, entrepreneurship program, lean startup methodology, business model canvas training, MVP development course, startup accelerator program, business planning workshops, entrepreneur training nonprofit, business incubator, startup mentorship program, Central Asia entrepreneurship" />
        <meta property="og:title" content="Business Creation Training - Comprehensive Entrepreneurship Program" />
        <meta property="og:description" content="12-week intensive entrepreneurship program using Lean Startup methodology and Business Model Canvas. From idea to viable business with 90% success rate." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/programs/business-creation" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1542744173-8e7e53415bb0" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Business Creation Training - Entrepreneurship Program" />
        <meta name="twitter:description" content="Comprehensive 12-week program: Think Like Entrepreneur → Shape Business Model → Validate Assumptions → Build Traction. Serving entrepreneurs globally." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1542744173-8e7e53415bb0" />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Businesses Beyond Borders" />
        <link rel="canonical" href="https://businessesbeyondborders.com/programs/business-creation" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Course", "EducationalOrganization"],
            "name": "Business Creation Training Program",
            "description": "Comprehensive 12-week entrepreneurship program using Lean Startup methodology, Business Model Canvas, and hands-on MVP development for emerging market entrepreneurs",
            "provider": {
              "@type": "NonprofitOrganization",
              "name": "Businesses Beyond Borders",
              "address": { "@type": "PostalAddress", "addressLocality": "Port Orange", "addressRegion": "FL", "addressCountry": "US" },
              "telephone": "(386) 517-1527",
              "email": "donations@businessesbeyondborders.com"
            },
            "courseMode": ["online", "blended"],
            "educationalLevel": "Beginner to Intermediate",
            "timeRequired": "PT12W",
            "coursePrerequisites": "Business idea or entrepreneurial interest",
            "learningResourceType": "Course",
            "teaches": ["Lean Startup methodology", "Business Model Canvas development", "Customer discovery and validation", "MVP design and development", "Market research and analysis", "Value proposition design", "Investment pitch creation", "Financial planning and metrics"],
            "courseWorkload": "PT6H/week",
            "numberOfCredits": 0,
            "educationalCredentialAwarded": "Certificate of Completion",
            "url": "https://businessesbeyondborders.com/programs/business-creation"
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema([
            {
              question: "What is the Business Creation Training Program?",
              answer: "The Business Creation Training Program is a 12-week intensive entrepreneurship program that uses Lean Startup methodology and Business Model Canvas to take participants from a business idea to a market-ready venture. It includes 72 hours of training, 4 progressive modules, and 1:1 mentorship support."
            },
            {
              question: "What does the 12-week Business Creation curriculum cover?",
              answer: "The curriculum is divided into 4 modules: Module 1 (Weeks 1-3) covers entrepreneurial mindset and Lean Startup methodology; Module 2 (Weeks 4-6) covers Business Model Canvas and value proposition design; Module 3 (Weeks 7-9) covers customer validation and data-driven decision making; Module 4 (Weeks 10-12) covers MVP development, product-market fit, and investor pitch creation."
            },
            {
              question: "What is the success rate of the Business Creation Program?",
              answer: "90% of participants launch a viable business within 6 months of completing the program. Graduates have collectively generated over $2 million in revenue and created 100+ jobs. The program maintains an 85% completion rate."
            },
            {
              question: "How much does the Business Creation Program cost?",
              answer: "Scholarships are available to make the program accessible. Contact the BBB program team for details on current cohort costs and scholarship availability."
            },
            {
              question: "What tools and resources are included in the Business Creation Program?",
              answer: "Participants get access to professional tools including Miro/Mural for Business Model Canvas collaboration, Figma for MVP prototyping and design, Typeform for customer validation surveys, and financial modeling templates for projections."
            },
            {
              question: "When does the next Business Creation cohort start?",
              answer: "The next Business Creation cohort starts April 15, 2026. Cohorts meet Tuesday and Thursday evenings from 6-9 PM in a hybrid format (in-person and online), with 12-15 entrepreneurs per cohort. Apply through the BBB website to reserve your spot."
            },
          ]))}
        </script>
      </Helmet>
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 pt-24">
        <Breadcrumbs
          items={[
            { name: "Home", url: "https://businessesbeyondborders.com" },
            { name: "Programs", url: "https://businessesbeyondborders.com/programs-and-impact" },
            { name: "Business Creation", url: "https://businessesbeyondborders.com/programs/business-creation" },
          ]}
        />
      </div>
      {/* Hero Section */}
      <div className="relative h-[70vh] flex items-center justify-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            {isCentralAsia ? "Проверенная методология Lean Startup" : "Proven Lean Startup Methodology"}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
            {isCentralAsia ? <>От бизнес-идеи до <span className="text-yellow-400">готового к рынку предприятия</span></> : <>From Business Idea to <span className="text-yellow-400">Market-Ready Venture</span></>}
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed mb-8">
            {isCentralAsia ? <><strong className="text-yellow-300">12-недельная интенсивная программа</strong> с использованием методологии Lean Startup и Business Model Canvas: <strong className="text-yellow-300">Думай → Формируй → Проверяй → Запускай</strong> свой успешный бизнес.</> : <><strong className="text-yellow-300">12-week intensive program</strong> using Lean Startup methodology and Business Model Canvas: <strong className="text-yellow-300">Think → Shape → Validate → Launch</strong> your successful business.</>}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center mb-8">
            <div className="animate-fade-up [--animation-delay:600ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">90%</div>
              <div className="text-sm text-white/80">{isCentralAsia ? "Успешных запусков" : "Launch Success Rate"}</div>
            </div>
            <div className="animate-fade-up [--animation-delay:700ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">72</div>
              <div className="text-sm text-white/80">{isCentralAsia ? "Часов обучения" : "Hours of Training"}</div>
            </div>
            <div className="animate-fade-up [--animation-delay:800ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">4</div>
              <div className="text-sm text-white/80">{isCentralAsia ? "Последовательных модуля" : "Progressive Modules"}</div>
            </div>
            <div className="animate-fade-up [--animation-delay:900ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">1:1</div>
              <div className="text-sm text-white/80">{isCentralAsia ? "Поддержка наставника" : "Mentorship Support"}</div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up [--animation-delay:900ms]">
            <Link to="/get-involved?type=program&program=business-creation">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                {isCentralAsia ? "Присоединиться к следующей группе" : "Join Our Next Cohort"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="#curriculum-preview" className="text-white hover:text-yellow-300 font-medium flex items-center gap-2">
              <Download className="w-4 h-4" />
              {isCentralAsia ? "Скачать обзор программы" : "Download Program Overview"}
            </Link>
          </div>
          <p className="text-sm text-white/70 mt-6 animate-fade-up [--animation-delay:1000ms]">
            {isCentralAsia ? "⭐ Доверяют более 100 начинающих предпринимателей • 🌍 Работаем в Центральной Азии с 2022 года • 🚀 От идеи до питча за 12 недель" : "⭐ Trusted by 100+ aspiring entrepreneurs • 🌍 Serving Central Asia & Florida since 2022 • 🚀 From startup idea to investor-ready pitch in 12 weeks"}
          </p>
        </div>
      </div>

      {/* Four-Module Structure Overview */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Rocket className="w-4 h-4" />
              {isCentralAsia ? "Проверенная структура из 4 модулей" : "Proven 4-Module Framework"}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              {isCentralAsia ? <>Обучение предпринимательству, которое <span className="text-blue-600">создаёт реальный бизнес</span></> : <>Entrepreneurship Training That <span className="text-blue-600">Creates Real Businesses</span></>}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {isCentralAsia ? <>Наша учебная программа сочетает <strong className="text-gray-800">методологию Lean Startup</strong> с практическими навыками развития бизнеса, используя прогрессивную структуру из 4 модулей для обеспечения <strong className="text-gray-800">успешных запусков бизнеса</strong>.</> : <>Our curriculum combines <strong className="text-gray-800">Lean Startup methodology</strong> with practical business development skills using a progressive 4-module framework that ensures <strong className="text-gray-800">successful business launches</strong>.</>}
            </p>
          </div>
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-[#C9922A]/10 to-[#C9922A]/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Lightbulb className="w-10 h-10 text-[#C9922A]" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">{isCentralAsia ? "Думай как предприниматель" : "Think Like Entrepreneur"}</h3>
              <p className="text-gray-600 text-sm">{isCentralAsia ? "Сформируйте предпринимательское мышление, определяйте возможности и освойте системы продуктивности." : "Build entrepreneurial mindset, identify opportunities, and master productivity systems."}</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Settings className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">{isCentralAsia ? "Формируй бизнес-модель" : "Shape Business Model"}</h3>
              <p className="text-gray-600 text-sm">{isCentralAsia ? "Разработайте Business Model Canvas, проверьте ценностные предложения и освойте выявление потребностей клиентов." : "Design Business Model Canvas, validate value propositions, and master customer discovery."}</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <BarChart2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">{isCentralAsia ? "Проверяй гипотезы" : "Validate Assumptions"}</h3>
              <p className="text-gray-600 text-sm">{isCentralAsia ? "Тестируйте гипотезы, собирайте данные и итерируйте на основе реальных отзывов клиентов." : "Test hypotheses, collect data, and iterate based on real customer feedback."}</p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-[#C9922A]/10 to-[#C9922A]/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Rocket className="w-10 h-10 text-[#C9922A]" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">{isCentralAsia ? "Набирай обороты" : "Build Traction"}</h3>
              <p className="text-gray-600 text-sm">{isCentralAsia ? "Разработайте MVP, достигните соответствия продукта рынку и создайте убедительный питч." : "Develop MVP, achieve product-market fit, and create investor-ready pitches."}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            <section id="curriculum-preview">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{isCentralAsia ? "Структура программы" : "Program Structure"}</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="border-2 border-blue-200 relative">
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">{isCentralAsia ? "ИНТЕНСИВ" : "INTENSIVE"}</div>
                  <CardHeader><CardTitle className="text-xl text-blue-600">{isCentralAsia ? "12-недельная программа" : "12-Week Program"}</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{isCentralAsia ? "Комплексный предпринимательский буткемп с полным развитием бизнеса" : "Comprehensive entrepreneurship bootcamp with full business development"}</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "72 часа обучения" : "72 total hours training"}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "2 занятия в неделю по 3 часа" : "2 sessions per week, 3 hours each"}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Практическая разработка MVP" : "Hands-on MVP development"}</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-2 border-[#C9922A]/20">
                  <CardHeader><CardTitle className="text-xl text-[#C9922A]">{isCentralAsia ? "Выходной трек" : "Weekend Track"}</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{isCentralAsia ? "Гибкий график по выходным для работающих специалистов" : "Flexible weekend-focused schedule for working professionals"}</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Субботние воркшопы" : "Saturday workshops"}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Онлайн-поддержка в будние дни" : "Online weekday support"}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Расширенные сроки" : "Extended timeline"}</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border-2 border-green-200">
                  <CardHeader><CardTitle className="text-xl text-green-600">{isCentralAsia ? "Корпоративные инновации" : "Corporate Innovation"}</CardTitle></CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{isCentralAsia ? "Индивидуальная программа для организаций, создающих новые направления" : "Customized program for existing organizations building new ventures"}</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Фокус на интрапренёрстве" : "Intrapreneurship focus"}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Индивидуальный график" : "Custom scheduling"}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Командные проекты" : "Team-based projects"}</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="bg-gradient-to-br from-blue-50 to-[#C9922A]/5 p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{isCentralAsia ? "Чего вы достигнете" : "What You'll Achieve"}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center gap-2"><Rocket className="w-5 h-5" />{isCentralAsia ? "Запуск бизнеса" : "Business Launch"}</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{isCentralAsia ? "Проверенная бизнес-модель с подтверждённым спросом" : "Validated business model with proven demand"}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{isCentralAsia ? "Функциональный MVP, протестированный с реальными клиентами" : "Functional MVP tested with real customers"}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{isCentralAsia ? "Стратегия выхода на рынок и план запуска" : "Go-to-market strategy and launch plan"}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{isCentralAsia ? "Убедительный питч и финансовые прогнозы" : "Investor-ready pitch and financial projections"}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center gap-2"><Users2 className="w-5 h-5" />{isCentralAsia ? "Навыки и сеть" : "Skills & Network"}</h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{isCentralAsia ? "Владение Lean Startup и Customer Development" : "Lean Startup and Customer Development mastery"}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{isCentralAsia ? "Постоянные наставнические и консультационные связи" : "Ongoing mentorship and advisory relationships"}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{isCentralAsia ? "Доступ к сети выпускников и инвесторов" : "Strong alumni and investor network access"}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{isCentralAsia ? "Предпринимательская уверенность и мышление" : "Entrepreneurial confidence and mindset"}</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{isCentralAsia ? "Основные методологии" : "Core Methodologies"}</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-[#C9922A]/10 to-[#C9922A]/20 rounded-lg"><Zap className="w-6 h-6 text-[#C9922A]" /></div>
                      <CardTitle className="text-xl text-gray-800">{isCentralAsia ? "Метод Lean Startup" : "Lean Startup Method"}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{isCentralAsia ? "Освойте цикл «Создавай — Измеряй — Учись» для быстрого тестирования идей, проверки гипотез и итерации к соответствию продукта рынку." : "Master the Build-Measure-Learn cycle to rapidly test ideas, validate assumptions, and iterate toward product-market fit."}</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• {isCentralAsia ? "Разработка, основанная на гипотезах" : "Hypothesis-driven development"}</li>
                      <li>• {isCentralAsia ? "Проектирование и тестирование MVP" : "MVP design and testing"}</li>
                      <li>• {isCentralAsia ? "Решения «поворот или настойчивость»" : "Pivot vs. persevere decisions"}</li>
                      <li>• {isCentralAsia ? "Фреймворки проверенного обучения" : "Validated learning frameworks"}</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg"><PieChart className="w-6 h-6 text-blue-600" /></div>
                      <CardTitle className="text-xl text-gray-800">Business Model Canvas</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{isCentralAsia ? "Создавайте комплексные бизнес-модели с использованием структуры из 9 блоков для стратегической ясности и коммуникации." : "Create comprehensive business models using the 9-building-block framework for strategic clarity and communication."}</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• {isCentralAsia ? "Сегменты клиентов и отношения" : "Customer segments and relationships"}</li>
                      <li>• {isCentralAsia ? "Дизайн ценностного предложения" : "Value proposition design"}</li>
                      <li>• {isCentralAsia ? "Потоки доходов и структура затрат" : "Revenue streams and cost structure"}</li>
                      <li>• {isCentralAsia ? "Ключевые партнёрства и ресурсы" : "Key partnerships and resources"}</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-lg"><Users className="w-6 h-6 text-green-600" /></div>
                      <CardTitle className="text-xl text-gray-800">{isCentralAsia ? "Выявление потребностей клиентов" : "Customer Discovery"}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{isCentralAsia ? "Изучите системные подходы к пониманию потребностей клиентов, проверке проблем и тестированию решений с реальными пользователями." : "Learn systematic approaches to understanding customer needs, validating problems, and testing solutions with real users."}</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• {isCentralAsia ? "Техники интервью и выводы" : "Interview techniques and insights"}</li>
                      <li>• {isCentralAsia ? "Проверка соответствия проблемы и решения" : "Problem-solution fit validation"}</li>
                      <li>• {isCentralAsia ? "Картирование пути клиента" : "Customer journey mapping"}</li>
                      <li>• {isCentralAsia ? "Интеграция обратной связи пользователей" : "User feedback integration"}</li>
                    </ul>
                  </CardContent>
                </Card>
                <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-[#C9922A]/10 to-[#C9922A]/20 rounded-lg"><TrendingUp className="w-6 h-6 text-[#C9922A]" /></div>
                      <CardTitle className="text-xl text-gray-800">{isCentralAsia ? "Тяга и рост" : "Traction & Growth"}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{isCentralAsia ? "Создавайте устойчивые двигатели роста через маркетинг на основе показателей, оптимизацию продаж и стратегические партнёрства." : "Build sustainable growth engines through metrics-driven marketing, sales optimization, and strategic partnerships."}</p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• {isCentralAsia ? "Методы гроус-хакинга" : "Growth hacking techniques"}</li>
                      <li>• {isCentralAsia ? "Ключевые показатели и отслеживание KPI" : "Key metrics and KPI tracking"}</li>
                      <li>• {isCentralAsia ? "Оптимизация воронки продаж" : "Sales funnel optimization"}</li>
                      <li>• {isCentralAsia ? "Развитие партнёрства" : "Partnership development"}</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">{isCentralAsia ? "Программа 12 недель" : "12-Week Curriculum Breakdown"}</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="module1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#C9922A]/10 text-[#C9922A] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      {isCentralAsia ? "Модуль 1: Думай как предприниматель (Недели 1–3)" : "Module 1: Think Like an Entrepreneur (Weeks 1-3)"}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">{isCentralAsia ? "Сформируйте предпринимательское мышление, освойте методологию Lean Startup и разработайте системы личной продуктивности для успеха в бизнесе." : "Build entrepreneurial mindset, master Lean Startup methodology, and develop personal productivity systems for business success."}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">{isCentralAsia ? "Ключевые темы:" : "Key Topics:"}</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• {isCentralAsia ? "Введение в предпринимательство и установка на рост" : "Introduction to Entrepreneurship & Growth Mindset"}</li>
                            <li>• {isCentralAsia ? "Методология Lean Startup и цикл «Создавай-Измеряй-Учись»" : "Lean Startup Methodology & Build-Measure-Learn"}</li>
                            <li>• {isCentralAsia ? "Личная продуктивность и управление временем" : "Personal Productivity & Time Management"}</li>
                            <li>• {isCentralAsia ? "Выявление бизнес-возможностей" : "Identifying Business Opportunities"}</li>
                            <li>• {isCentralAsia ? "Бизнес-модели для лучшего мира" : "Better World Business Models"}</li>
                            <li>• {isCentralAsia ? "Основы исследования рынка" : "Market Research Fundamentals"}</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">{isCentralAsia ? "Результаты:" : "Deliverables:"}</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• {isCentralAsia ? "Личное заявление о видении" : "Personal vision statement"}</li>
                            <li>• {isCentralAsia ? "Внедрение системы продуктивности" : "Productivity system implementation"}</li>
                            <li>• {isCentralAsia ? "Матрица оценки возможностей" : "Opportunity evaluation matrix"}</li>
                            <li>• {isCentralAsia ? "План исследования рынка" : "Market research plan"}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="module2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      {isCentralAsia ? "Модуль 2: Формируй бизнес-модель (Недели 4–6)" : "Module 2: Shape Your Business Model (Weeks 4-6)"}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">{isCentralAsia ? "Освойте Business Model Canvas, разработайте убедительные ценностные предложения и процессы выявления потребностей клиентов." : "Master Business Model Canvas, design compelling value propositions, and develop customer discovery processes."}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">{isCentralAsia ? "Ключевые темы:" : "Key Topics:"}</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• {isCentralAsia ? "Глубокое погружение в Business Model Canvas" : "Business Model Canvas Deep Dive"}</li>
                            <li>• {isCentralAsia ? "Дизайн ценностного предложения" : "Value Proposition Design"}</li>
                            <li>• {isCentralAsia ? "Процесс выявления потребностей клиентов" : "Customer Discovery Process"}</li>
                            <li>• {isCentralAsia ? "Проверка соответствия проблемы и решения" : "Problem-Solution Fit Validation"}</li>
                            <li>• {isCentralAsia ? "Навыки питча и презентации" : "Pitching and Presentation Skills"}</li>
                            <li>• {isCentralAsia ? "Стратегия каналов и отношения с клиентами" : "Channel Strategy & Customer Relationships"}</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">{isCentralAsia ? "Результаты:" : "Deliverables:"}</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• {isCentralAsia ? "Полный Business Model Canvas" : "Complete Business Model Canvas"}</li>
                            <li>• {isCentralAsia ? "Canvas ценностного предложения" : "Value Proposition Canvas"}</li>
                            <li>• {isCentralAsia ? "Отчёты о клиентских интервью" : "Customer interview reports"}</li>
                            <li>• {isCentralAsia ? "Презентация соответствия проблемы и решения" : "Problem-solution fit presentation"}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="module3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      {isCentralAsia ? "Модуль 3: Проверяй гипотезы (Недели 7–9)" : "Module 3: Validate Your Assumptions (Weeks 7-9)"}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">{isCentralAsia ? "Изучите принятие решений на основе данных, систематически тестируйте ценностные предложения и достигайте контрольных точек проверки клиентов." : "Learn data-driven decision making, test value propositions systematically, and achieve customer validation milestones."}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">{isCentralAsia ? "Ключевые темы:" : "Key Topics:"}</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• {isCentralAsia ? "Бизнес-показатели и отслеживание KPI" : "Business Metrics & KPI Tracking"}</li>
                            <li>• {isCentralAsia ? "Методы тестирования ценностного предложения" : "Value Proposition Testing Methods"}</li>
                            <li>• {isCentralAsia ? "Дизайн системы обратной связи" : "Feedback System Design"}</li>
                            <li>• {isCentralAsia ? "Фреймворки проверки клиентов" : "Customer Validation Frameworks"}</li>
                            <li>• {isCentralAsia ? "Итерация бизнес-модели" : "Business Model Iteration"}</li>
                            <li>• {isCentralAsia ? "Конкурентный анализ и позиционирование" : "Competitive Analysis & Positioning"}</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">{isCentralAsia ? "Результаты:" : "Deliverables:"}</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• {isCentralAsia ? "Панель KPI и система отслеживания" : "KPI dashboard and tracking system"}</li>
                            <li>• {isCentralAsia ? "Результаты экспериментов по проверке" : "Validation experiment results"}</li>
                            <li>• {isCentralAsia ? "Отчёт о проверке клиентов" : "Customer validation report"}</li>
                            <li>• {isCentralAsia ? "Матрица конкурентного анализа" : "Competitive analysis matrix"}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="module4">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#C9922A]/10 text-[#C9922A] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      {isCentralAsia ? "Модуль 4: Набирай обороты - Первый рубеж (Недели 10–12)" : "Module 4: Build Traction - The First Milestone (Weeks 10-12)"}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">{isCentralAsia ? "Разработайте функциональный MVP, достигните соответствия продукта рынку и создайте убедительный питч для успешного запуска бизнеса." : "Develop functional MVP, achieve product-market fit, and create investor-ready pitches for successful business launch."}</p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">{isCentralAsia ? "Ключевые темы:" : "Key Topics:"}</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• {isCentralAsia ? "Воркшоп по разработке MVP" : "MVP Design & Development Workshop"}</li>
                            <li>• {isCentralAsia ? "Измерение соответствия продукта рынку" : "Product-Market Fit Measurement"}</li>
                            <li>• {isCentralAsia ? "Создание питча для инвесторов" : "Investment-Ready Pitch Creation"}</li>
                            <li>• {isCentralAsia ? "Финансовое моделирование и прогнозы" : "Financial Modeling & Projections"}</li>
                            <li>• {isCentralAsia ? "Стратегия запуска и выхода на рынок" : "Launch Strategy & Go-to-Market"}</li>
                            <li>• {isCentralAsia ? "Выпуск и планирование следующих шагов" : "Graduation & Next Steps Planning"}</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">{isCentralAsia ? "Результаты:" : "Deliverables:"}</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• {isCentralAsia ? "Функциональный прототип MVP" : "Functional MVP prototype"}</li>
                            <li>• {isCentralAsia ? "Анализ соответствия продукта рынку" : "Product-market fit analysis"}</li>
                            <li>• {isCentralAsia ? "Питч-дек для инвесторов" : "Investor pitch deck"}</li>
                            <li>• {isCentralAsia ? "Финансовая модель и прогнозы" : "Financial model & projections"}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            <section className="bg-white border-2 border-blue-200 p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0"><Rocket className="w-6 h-6 text-blue-600" /></div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{isCentralAsia ? "От идеи к процветающему бизнесу" : "From Idea to Thriving Business"}</h3>
                  <blockquote className="text-lg text-gray-700 italic mb-4">
                    {isCentralAsia ? "«Я пришёл в программу с идеей об устойчивом управлении отходами. Благодаря методологии Lean Startup и Business Model Canvas я подтвердил свою концепцию, нашёл первых клиентов и построил реальный бизнес. Сегодня мы обслуживаем 50+ клиентов и нанимаем 12 человек. Системный подход сэкономил мне годы проб и ошибок.»" : "\"I came to this program with just an idea about sustainable waste management. Through the Lean Startup methodology and Business Model Canvas, I validated my concept, found my first customers, and built a real business. Today we serve 50+ clients and employ 12 people. The systematic approach saved me years of trial and error.\""}
                  </blockquote>
                  <footer className="text-blue-600 font-medium">— Kameron K., {isCentralAsia ? "Основатель CleanTech Solutions" : "CleanTech Solutions Founder"}</footer>
                </div>
              </div>
            </section>

            <div className="text-center bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">{isCentralAsia ? "Готовы запустить свой бизнес?" : "Ready to Launch Your Business?"}</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">{isCentralAsia ? "Присоединяйтесь к следующей группе и превратите свою бизнес-идею в готовое к рынку предприятие. Экспертное наставничество, проверенная методология и постоянная поддержка включены." : "Join our next cohort and transform your business idea into a market-ready venture. Expert mentorship, proven methodology, and ongoing support included."}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/get-involved?type=program&program=business-creation">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-3">
                    {isCentralAsia ? "Записаться сейчас — старт: 15 апреля 2026" : "Enroll Now - Next Start: April 15, 2026"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/get-involved?type=volunteer&program=mentor">
                  <Button size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                    {isCentralAsia ? "Стать наставником" : "Become a Mentor"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <div className="text-center">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">{isCentralAsia ? "СЛЕДУЮЩАЯ ГРУППА" : "NEXT COHORT STARTING"}</div>
                  <CardTitle className="text-xl text-blue-600">{isCentralAsia ? "15 апреля 2026" : "April 15, 2026"}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-700">
                  <p className="font-medium mb-2">{isCentralAsia ? "Присоединитесь к 15 предпринимателям" : "Join 15 entrepreneurs in our intensive program"}</p>
                  <p className="text-sm text-gray-600 mb-4">
                    🚀 <strong>{isCentralAsia ? "2 занятия/нед, по 3 часа" : "2 sessions/week, 3 hours each"}</strong><br/>
                    💻 <strong>{isCentralAsia ? "Гибридный формат: очно + онлайн" : "Hybrid: In-person + online support"}</strong><br/>
                    📱 <strong>{isCentralAsia ? "Инструменты для MVP включены" : "MVP development tools included"}</strong><br/>
                    🎯 <strong>{isCentralAsia ? "Наставничество 1:1 на протяжении всего курса" : "1:1 mentorship throughout"}</strong>
                  </p>
                </div>
                <Link to="/get-involved?type=program&program=business-creation">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3">
                    {isCentralAsia ? "Подать заявку на 5-й поток" : "Apply for Cohort 5"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="#curriculum-preview">
                  <Button variant="outline" className="w-full border-blue-300 text-blue-600 hover:bg-blue-50">
                    <Download className="mr-2 w-4 h-4" />{isCentralAsia ? "Скачать руководство по программе" : "Download Program Guide"}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />{isCentralAsia ? "Детали программы" : "Program Details"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between"><span className="text-gray-600">{isCentralAsia ? "Продолжительность:" : "Duration:"}</span><span className="font-medium text-blue-600">{isCentralAsia ? "12 недель интенсива" : "12 weeks intensive"}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">{isCentralAsia ? "Расписание:" : "Schedule:"}</span><span className="font-medium">{isCentralAsia ? "Вт/Чт 18:00–21:00" : "Tue/Thu 6-9 PM"}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">{isCentralAsia ? "Всего часов:" : "Total Hours:"}</span><span className="font-medium">{isCentralAsia ? "72 часа + наставничество" : "72 hours + mentoring"}</span></div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between mb-2"><span className="text-gray-600">{isCentralAsia ? "Формат:" : "Format:"}</span><span className="font-medium">{isCentralAsia ? "Гибридный" : "Hybrid"}</span></div>
                  <div className="flex justify-between mb-2"><span className="text-gray-600">{isCentralAsia ? "Размер группы:" : "Cohort Size:"}</span><span className="font-medium">{isCentralAsia ? "12–15 предпринимателей" : "12-15 entrepreneurs"}</span></div>
                  <div className="flex justify-between"><span className="text-gray-600">{isCentralAsia ? "Стоимость:" : "Investment:"}</span><span className="font-medium text-green-600">{isCentralAsia ? "Доступны стипендии" : "Scholarships available"}</span></div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />{isCentralAsia ? "Показатели успеха" : "Program Success Metrics"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /><div><p className="font-medium text-gray-800">{isCentralAsia ? "90% запускают бизнес" : "90% Launch Rate"}</p><p className="text-sm text-gray-600">{isCentralAsia ? "Участники запускают жизнеспособный бизнес в течение 6 месяцев" : "Participants launch viable businesses within 6 months"}</p></div></div>
                <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /><div><p className="font-medium text-gray-800">{isCentralAsia ? "Выручка $2M+" : "$2M+ Revenue Generated"}</p><p className="text-sm text-gray-600">{isCentralAsia ? "Совокупная выручка бизнесов выпускников" : "Combined revenue of graduate businesses"}</p></div></div>
                <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /><div><p className="font-medium text-gray-800">{isCentralAsia ? "85% доходят до конца" : "85% Completion Rate"}</p><p className="text-sm text-gray-600">{isCentralAsia ? "Высокая вовлечённость на протяжении всей программы" : "High engagement throughout intensive program"}</p></div></div>
                <div className="flex items-start gap-3"><CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" /><div><p className="font-medium text-gray-800">{isCentralAsia ? "Создано 100+ рабочих мест" : "100+ Jobs Created"}</p><p className="text-sm text-gray-600">{isCentralAsia ? "Занятость, созданная предприятиями выпускников" : "Employment generated by graduate ventures"}</p></div></div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2"><Settings className="w-5 h-5 text-yellow-600" />{isCentralAsia ? "Инструменты и ресурсы" : "Tools & Resources"}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">{isCentralAsia ? "Получите доступ к профессиональным инструментам и платформам, используемым успешными стартапами по всему миру." : "Access professional-grade tools and platforms used by successful startups worldwide."}</p>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600"><strong>• Miro/Mural:</strong> {isCentralAsia ? "Совместная работа над Business Model Canvas" : "Business Model Canvas collaboration"}</div>
                  <div className="text-sm text-gray-600"><strong>• Figma:</strong> {isCentralAsia ? "Прототипирование и дизайн MVP" : "MVP prototyping and design"}</div>
                  <div className="text-sm text-gray-600"><strong>• Typeform:</strong> {isCentralAsia ? "Опросы для проверки клиентов" : "Customer validation surveys"}</div>
                  <div className="text-sm text-gray-600"><strong>{isCentralAsia ? "• Финансовые шаблоны:" : "• Financial Templates:"}</strong> {isCentralAsia ? "Прогнозы и моделирование" : "Projections and modeling"}</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#C9922A]/20">
              <CardHeader><CardTitle className="text-lg text-[#C9922A] text-center">{isCentralAsia ? "Экспертное наставничество" : "Expert Mentorship"}</CardTitle></CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-sm text-gray-600">{isCentralAsia ? "Общайтесь с успешными предпринимателями и отраслевыми экспертами, которые оказывают постоянную поддержку на протяжении всего вашего пути." : "Connect with successful entrepreneurs and industry experts who provide ongoing guidance throughout your journey."}</p>
                <Link to="/get-involved?type=volunteer&program=mentor">
                  <Button variant="outline" className="w-full border-[#C9922A]/30 text-[#C9922A] hover:bg-[#C9922A]/5">{isCentralAsia ? "Стать наставником" : "Become a Mentor"}</Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h4 className="font-medium text-gray-800 mb-2">{isCentralAsia ? "Вопросы о программе?" : "Questions About the Program?"}</h4>
                  <p className="text-sm text-gray-600 mb-4">{isCentralAsia ? "Свяжитесь с нашей командой через WhatsApp или по электронной почте." : "Speak with our program team about curriculum, scheduling, and enrollment."}</p>
                  <Link to="/contact">
                    <Button variant="outline" size="sm" className="w-full">
                      <Users className="mr-2 w-4 h-4" />{isCentralAsia ? "Написать команде" : "Contact Program Team"}
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="mt-16">
          <UpcomingEvents />
        </div>
      </div>
    </div>
    </>
  );
};

export default BusinessCreation;
