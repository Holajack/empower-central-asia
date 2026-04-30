import React from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, HandHelping, BookOpen, Clock, Award, CheckCircle2, Heart, Star, TrendingUp, Lightbulb, Users, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import GoHighLevelForm from "@/components/forms/GoHighLevelForm";
import { useRegion } from "@/contexts/RegionContext";
import { useVolunteerOpportunity } from "@/hooks/useVolunteerOpportunity";

const BusinessTraining = () => {
  const { isCentralAsia } = useRegion();
  const { opportunity } = useVolunteerOpportunity("business-training");

  return (
    <>
      <Helmet>
        <title>{`${opportunity.getTitle(isCentralAsia)} | BBB`}</title>
        <meta name="description" content={opportunity.getSummary(isCentralAsia) || opportunity.getTagline(isCentralAsia)} />
        <meta
          name="keywords"
          content="business training volunteer, financial literacy volunteer, entrepreneurship education volunteer, business mentor volunteer, nonprofit training volunteer, volunteer business instructor opportunities, remote business training"
        />
        <link rel="canonical" href="https://businessesbeyondborders.com/volunteer-opportunities/business-training" />
        <meta
          property="og:title"
          content={
            isCentralAsia
              ? "Волонтёр бизнес-обучения - Поддержите наши программы | Businesses Beyond Borders"
              : "Business Training Volunteer - Support Our Programs | Businesses Beyond Borders"
          }
        />
        <meta
          property="og:description"
          content={
            isCentralAsia
              ? "Поддержите наши проверенные программы финансовой грамотности и создания бизнеса как волонтёр бизнес-обучения. Гибкий удалённый график."
              : "Support our proven Financial Literacy and Business Creation programs as a Business Training Volunteer. Help entrepreneurs in Central Asia develop essential business skills. Flexible remote scheduling."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/volunteer-opportunities/business-training" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            isCentralAsia
              ? "Волонтёр бизнес-обучения - Поддержите наши программы | Businesses Beyond Borders"
              : "Business Training Volunteer - Support Our Programs | Businesses Beyond Borders"
          }
        />
        <meta
          name="twitter:description"
          content={
            isCentralAsia
              ? "Поддержите наши проверенные программы финансовой грамотности и создания бизнеса. Гибкий удалённый график."
              : "Support our proven Financial Literacy and Business Creation programs as a Business Training Volunteer. Help entrepreneurs in Central Asia develop essential business skills. Flexible remote scheduling."
          }
        />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#1B2A4A] to-[#1B2A4A]/80 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <HandHelping className="w-4 h-4" />
                {isCentralAsia
                  ? "ПОДДЕРЖКА ПРОВЕРЕННЫХ ПРОГРАММ"
                  : "PROVEN PROGRAM SUPPORT"}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {opportunity.getTitle(isCentralAsia)}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                {opportunity.getTagline(isCentralAsia)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#apply-now">
                  <Button
                    size="lg"
                    className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg"
                  >
                    {isCentralAsia
                      ? "Подать заявку на участие в программах"
                      : "Apply to Support Programs"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Link to="/get-involved">
                  <Button
                    size="lg"
                    className="bg-transparent border border-white/40 text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8 py-4 text-lg"
                  >
                    {isCentralAsia ? "Все возможности" : "View All Opportunities"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="bg-white py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              <div className="bg-[#C9922A]/5 p-6 rounded-lg">
                <div className="text-2xl font-bold text-[#C9922A] mb-2">100%</div>
                <div className="text-sm text-gray-600">
                  {isCentralAsia ? "Успешность программы" : "Program Success Rate"}
                </div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">2</div>
                <div className="text-sm text-gray-600">
                  {isCentralAsia ? "Основные программы" : "Core Programs"}
                </div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">
                  {isCentralAsia ? "Гибко" : "Flexible"}
                </div>
                <div className="text-sm text-gray-600">
                  {isCentralAsia ? "График" : "Schedule"}
                </div>
              </div>
              <div className="bg-[#C9922A]/5 p-6 rounded-lg">
                <div className="text-2xl font-bold text-[#C9922A] mb-2">
                  {isCentralAsia ? "Удалённо" : "Remote"}
                </div>
                <div className="text-sm text-gray-600">
                  {isCentralAsia ? "Роль поддержки" : "Support Role"}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Program Support Opportunities */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                {isCentralAsia ? (
                  <>
                    Поддержите наши проверенные
                    <span className="text-[#C9922A]"> программы обучения</span>
                  </>
                ) : (
                  <>
                    Support Our Proven
                    <span className="text-[#C9922A]"> Training Programs</span>
                  </>
                )}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-green-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <Calculator className="w-6 h-6" />
                      {isCentralAsia
                        ? "Программа финансовой грамотности"
                        : "Financial Literacy Program"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Поддержите нашу комплексную программу финансовой грамотности, которая достигает 100% показателя завершения по всей Центральной Азии."
                        : "Support our comprehensive financial literacy program that has achieved 100% completion rates across Central Asia."}
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-green-800 mb-2">
                        {isCentralAsia ? "Особенности программы:" : "Program Features:"}
                      </h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• {isCentralAsia ? "Метод «Отразить–Узнать–Действовать»" : "Reflect-Learn-Act Method"}</li>
                        <li>• {isCentralAsia ? "Форматы: 10, 6 и 4 недели" : "10-week, 6-week, and 4-week formats"}</li>
                        <li>• {isCentralAsia ? "Практическое обучение управлению деньгами" : "Practical money management training"}</li>
                        <li>• {isCentralAsia ? "Основанные на фактах финансовые принципы" : "Evidence-based financial principles"}</li>
                      </ul>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Помогать с подготовкой учебных материалов"
                          : "Assist with curriculum preparation and materials"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Поддерживать виртуальные тренинги"
                          : "Support virtual training sessions"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Помогать с отслеживанием прогресса участников"
                          : "Help with participant progress tracking"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <TrendingUp className="w-6 h-6" />
                      {isCentralAsia
                        ? "Обучение по созданию бизнеса"
                        : "Business Creation Training"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Помогайте реализовывать нашу 12-недельную комплексную программу предпринимательства с использованием методологии Lean Startup и Business Model Canvas."
                        : "Help deliver our 12-week comprehensive entrepreneurship program using Lean Startup methodology and Business Model Canvas."}
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-blue-800 mb-2">
                        {isCentralAsia ? "Компоненты программы:" : "Program Components:"}
                      </h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• {isCentralAsia ? "Обучение Business Model Canvas" : "Business Model Canvas training"}</li>
                        <li>• {isCentralAsia ? "Руководство по разработке MVP" : "MVP development guidance"}</li>
                        <li>• {isCentralAsia ? "Методы валидации рынка" : "Market validation techniques"}</li>
                        <li>• {isCentralAsia ? "Финансовое планирование и бюджетирование" : "Financial planning and budgeting"}</li>
                      </ul>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Проводить секции семинаров"
                          : "Facilitate workshop breakout sessions"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Давать индивидуальную обратную связь по бизнес-плану"
                          : "Provide one-on-one business plan feedback"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Наставлять предпринимателей на протяжении ключевых этапов программы"
                          : "Mentor entrepreneurs through program milestones"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Volunteer Roles Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                {isCentralAsia ? (
                  <>
                    Способы поддержки
                    <span className="text-[#C9922A]"> наших программ обучения</span>
                  </>
                ) : (
                  <>
                    Ways to Support
                    <span className="text-[#C9922A]"> Our Training Programs</span>
                  </>
                )}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center p-6">
                  <div className="bg-[#C9922A]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-[#C9922A]" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Ассистент тренера" : "Training Assistant"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {isCentralAsia
                      ? "Помогайте проводить тренинги, управлять группами и обеспечивать техническую поддержку во время виртуальных семинаров."
                      : "Help facilitate training sessions, manage breakout rooms, and provide technical support during virtual workshops."}
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• {isCentralAsia ? "2–3 часа на сессию" : "2-3 hours per session"}</li>
                    <li>• {isCentralAsia ? "Гибкий график" : "Flexible scheduling"}</li>
                    <li>• {isCentralAsia ? "Обучение предоставляется" : "Training provided"}</li>
                  </ul>
                </Card>

                <Card className="text-center p-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Разработчик учебных материалов" : "Curriculum Developer"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {isCentralAsia
                      ? "Помогайте создавать и совершенствовать учебные материалы, рабочие листы и ресурсы для наших программ."
                      : "Help create and refine training materials, worksheets, and resources for our proven programs."}
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• {isCentralAsia ? "Проектная работа" : "Project-based work"}</li>
                    <li>• {isCentralAsia ? "Творческое сотрудничество" : "Creative collaboration"}</li>
                    <li>• {isCentralAsia ? "Развитие навыков" : "Skills development"}</li>
                  </ul>
                </Card>

                <Card className="text-center p-6">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Бизнес-наставник" : "Business Mentor"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {isCentralAsia
                      ? "Оказывайте индивидуальное наставничество предпринимателям, проходящим нашу программу по созданию бизнеса."
                      : "Provide one-on-one mentoring to entrepreneurs going through our business creation program."}
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• {isCentralAsia ? "1–2 часа в неделю" : "1-2 hours per week"}</li>
                    <li>• {isCentralAsia ? "Длительные отношения" : "Ongoing relationships"}</li>
                    <li>• {isCentralAsia ? "Высокий уровень влияния" : "High impact role"}</li>
                  </ul>
                </Card>
              </div>
            </div>
          </section>

          {/* Training & Support Section */}
          <section className="mb-16 bg-gray-50 p-8 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                {isCentralAsia ? (
                  <>
                    Полное обучение и
                    <span className="text-[#C9922A]"> поддержка</span>
                  </>
                ) : (
                  <>
                    Complete Training &
                    <span className="text-[#C9922A]"> Support Provided</span>
                  </>
                )}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-[#C9922A]">
                  <CardHeader>
                    <CardTitle className="text-[#C9922A]">
                      {isCentralAsia ? "Комплексная адаптация" : "Comprehensive Onboarding"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Обучение методологии программы"
                          : "Program methodology training"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Семинар по культурной чуткости"
                          : "Cultural sensitivity workshop"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Руководство по технологической платформе"
                          : "Technology platform tutorial"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Практические занятия с обратной связью"
                          : "Practice sessions with feedback"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardHeader>
                    <CardTitle className="text-green-600">
                      {isCentralAsia ? "Постоянная поддержка" : "Ongoing Support"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Еженедельные встречи по координации волонтёров"
                          : "Weekly volunteer coordination meetings"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Поддержка выделенного координатора программы"
                          : "Dedicated program coordinator support"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Доступ к учебным материалам и ресурсам"
                          : "Access to training materials and resources"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia
                          ? "Ежемесячные мероприятия по признанию волонтёров"
                          : "Monthly volunteer appreciation events"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Ideal Volunteer Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                {isCentralAsia ? (
                  <>
                    Вы наш следующий
                    <span className="text-[#C9922A]"> волонтёр бизнес-обучения?</span>
                  </>
                ) : (
                  <>
                    Are You Our Next
                    <span className="text-[#C9922A]"> Business Training Volunteer?</span>
                  </>
                )}
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-[#C9922A]" />
                    {isCentralAsia ? "Идеальный опыт" : "Ideal Background"}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia
                        ? "Бизнес-опыт или профильное образование"
                        : "Business experience or educational background"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia
                        ? "Знания в области финансовой грамотности или бухгалтерии"
                        : "Financial literacy or accounting knowledge"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia
                        ? "Опыт преподавания, обучения или презентаций"
                        : "Teaching, training, or presentation experience"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia
                        ? "Предпринимательский опыт или опыт малого бизнеса"
                        : "Entrepreneurial or small business experience"}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    {isCentralAsia ? "Важные качества" : "Essential Qualities"}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia
                        ? "Стремление помогать другим добиваться успеха"
                        : "Passion for helping others succeed"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia
                        ? "Терпеливый и воодушевляющий стиль преподавания"
                        : "Patient and encouraging teaching style"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia
                        ? "Культурная чуткость и адаптивность"
                        : "Cultural sensitivity and adaptability"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia
                        ? "Надёжность и приверженность успеху программы"
                        : "Reliable and committed to program success"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Time Commitment Options */}
          <section className="mb-16 bg-gradient-to-br from-blue-50 to-[#C9922A]/5 p-8 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                {isCentralAsia ? (
                  <>
                    Гибкие варианты
                    <span className="text-[#C9922A]"> временных обязательств</span>
                  </>
                ) : (
                  <>
                    Flexible Time
                    <span className="text-[#C9922A]"> Commitment Options</span>
                  </>
                )}
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center p-6">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Лёгкая поддержка" : "Light Support"}
                  </h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">
                    {isCentralAsia ? "2–3 ч/нед." : "2-3 hrs/week"}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {isCentralAsia
                      ? "Идеально для занятых специалистов, желающих оказывать значимую помощь при ограниченном времени."
                      : "Perfect for busy professionals who want to make a meaningful impact with limited time availability."}
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• {isCentralAsia ? "Разработка учебных материалов" : "Curriculum development"}</li>
                    <li>• {isCentralAsia ? "Подготовка материалов" : "Material preparation"}</li>
                    <li>• {isCentralAsia ? "Периодическая поддержка сессий" : "Occasional session support"}</li>
                  </ul>
                </Card>

                <Card className="text-center p-6 border-2 border-[#C9922A]/30">
                  <div className="bg-[#C9922A]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-[#C9922A]" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Регулярная поддержка" : "Regular Support"}
                  </h3>
                  <p className="text-2xl font-bold text-[#C9922A] mb-2">
                    {isCentralAsia ? "4–6 ч/нед." : "4-6 hrs/week"}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {isCentralAsia
                      ? "Наиболее популярный вариант — регулярное участие в тренингах и длительные отношения наставничества."
                      : "Most popular option - regular training session support with ongoing mentoring relationships."}
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• {isCentralAsia ? "Еженедельное проведение сессий" : "Weekly session facilitation"}</li>
                    <li>• {isCentralAsia ? "Индивидуальное наставничество" : "1:1 entrepreneur mentoring"}</li>
                    <li>• {isCentralAsia ? "Участие в развитии программы" : "Program development input"}</li>
                  </ul>
                </Card>

                <Card className="text-center p-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Ведущий волонтёр" : "Lead Volunteer"}
                  </h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">
                    {isCentralAsia ? "8–10 ч/нед." : "8-10 hrs/week"}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {isCentralAsia
                      ? "Руководящая роль по координации реализации программы и наставничеству над другими волонтёрами."
                      : "Leadership role coordinating program delivery and mentoring other volunteers."}
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• {isCentralAsia ? "Координация программы" : "Program coordination"}</li>
                    <li>• {isCentralAsia ? "Наставничество волонтёров" : "Volunteer mentoring"}</li>
                    <li>• {isCentralAsia ? "Участие в стратегическом планировании" : "Strategic planning input"}</li>
                  </ul>
                </Card>
              </div>
            </div>
          </section>

          {/* Application Form Section */}
          <section id="apply-now" className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {isCentralAsia ? (
                  <>
                    Готовы поддержать наши
                    <span className="text-[#C9922A]"> программы обучения?</span>
                  </>
                ) : (
                  <>
                    Ready to Support Our
                    <span className="text-[#C9922A]"> Training Programs?</span>
                  </>
                )}
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {isCentralAsia
                  ? "Присоединяйтесь к нашей команде волонтёров бизнес-обучения и помогайте предпринимателям строить успешные и устойчивые предприятия."
                  : "Join our team of business training volunteers and help entrepreneurs build successful, sustainable businesses."}
              </p>
            </div>
            <GoHighLevelForm
              formType="volunteer"
              title={
                isCentralAsia
                  ? "Заявка волонтёра бизнес-обучения"
                  : "Business Training Volunteer Application"
              }
              description={
                isCentralAsia
                  ? "Подайте заявку для поддержки наших проверенных программ финансовой грамотности и создания бизнеса. Мы рассмотрим её и свяжемся с вами в течение 48 часов."
                  : "Apply to support our proven Financial Literacy and Business Creation programs. We'll review your application and contact you within 48 hours."
              }
              submitButtonText={
                isCentralAsia
                  ? "Подать заявку волонтёра по обучению"
                  : "Submit Training Volunteer Application"
              }
              volunteerOpportunity="business-trainer"
            />
          </section>

          {/* Other Opportunities */}
          <div className="mt-12 border-t border-gray-200 pt-8 max-w-4xl mx-auto">
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
              <Link to="/volunteer-opportunities/administrative-support" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
                <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Административная поддержка" : "Administrative Support"}</p>
                <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Подробнее →" : "Learn more →"}</p>
              </Link>
              <Link to="/volunteer-opportunities/advocacy-outreach" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
                <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Адвокация и продвижение" : "Advocacy & Outreach"}</p>
                <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Подробнее →" : "Learn more →"}</p>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BusinessTraining;
