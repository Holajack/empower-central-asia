import React from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, Users, Network, Clock, Calendar, CheckCircle2, Heart, Star, UserPlus, Settings, Megaphone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import GoHighLevelForm from "@/components/forms/GoHighLevelForm";
import { useRegion } from "@/contexts/RegionContext";

const CommunityOrganizer = () => {
  const { isCentralAsia } = useRegion();

  return (
    <>
      <Helmet>
        <title>Community Organizer Volunteer | BBB</title>
        <meta name="description" content="Join our founding team as a Community Organizer with Businesses Beyond Borders. Build volunteer-driven community collaboration networks connecting entrepreneurs. 2 hours/week commitment. Make global impact from anywhere." />
        <meta name="keywords" content="community organizer volunteer, volunteer coordinator opportunities, nonprofit community organizing, volunteer program coordinator, community development volunteer, nonprofit outreach volunteer opportunities, remote community organizer" />
        <link rel="canonical" href="https://businessesbeyondborders.com/volunteer-opportunities/community-organizer" />
        <meta property="og:title" content={isCentralAsia ? "Организатор сообщества | BBB" : "Community Organizer Volunteer | BBB"} />
        <meta property="og:description" content={isCentralAsia ? "Вступайте в команду-основателей как организатор сообщества в Businesses Beyond Borders. Создавайте сети взаимодействия для предпринимателей. 2 часа в неделю. Глобальное влияние из любой точки мира." : "Join our founding team as a Community Organizer with Businesses Beyond Borders. Build volunteer-driven community collaboration networks connecting entrepreneurs. 2 hours/week commitment. Make global impact from anywhere."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/volunteer-opportunities/community-organizer" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "Организатор сообщества — волонтёрские возможности | Businesses Beyond Borders" : "Community Organizer - Volunteer Opportunity | Businesses Beyond Borders"} />
        <meta name="twitter:description" content={isCentralAsia ? "Вступайте в команду-основателей как организатор сообщества в Businesses Beyond Borders. Создавайте сети взаимодействия для предпринимателей. 2 часа в неделю. Глобальное влияние из любой точки мира." : "Join our founding team as a Community Organizer with Businesses Beyond Borders. Build volunteer-driven community collaboration networks connecting entrepreneurs. 2 hours/week commitment. Make global impact from anywhere."} />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-600 to-teal-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <UserPlus className="w-4 h-4" />
                {isCentralAsia ? "ВОЗМОЖНОСТЬ ВОЙТИ В КОМАНДУ-ОСНОВАТЕЛЕЙ" : "FOUNDING TEAM OPPORTUNITY"}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {isCentralAsia ? "Организатор" : "Community"}
                <span className="text-yellow-300"> {isCentralAsia ? "сообщества" : "Organizer"}</span>
              </h1>
              <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed mb-8">
                {isCentralAsia
                  ? "Выстраивайте нашу сеть взаимодействия сообщества с нуля."
                  : "Build our volunteer-driven community collaboration network from the ground up."}
                {" "}
                <strong className="text-white">
                  {isCentralAsia
                    ? "Помогайте предпринимателям находить нужные ресурсы."
                    : "Help connect entrepreneurs with the resources they need."}
                </strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#apply-now">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                    {isCentralAsia ? "Вступить в команду-основателей" : "Join Founding Team"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Link to="/get-involved">
                  <Button size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white hover:text-green-700 font-bold px-8 py-4 text-lg">
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
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">{isCentralAsia ? "2 ч." : "2 hrs"}</div>
                <div className="text-sm text-gray-600">{isCentralAsia ? "В неделю" : "Per Week"}</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">{isCentralAsia ? "Апр. 2026" : "Apr 2026"}</div>
                <div className="text-sm text-gray-600">{isCentralAsia ? "Дата начала" : "Start Date"}</div>
              </div>
              <div className="bg-[#C9922A]/5 p-6 rounded-lg">
                <div className="text-2xl font-bold text-[#C9922A] mb-2">{isCentralAsia ? "Удалённо" : "Remote"}</div>
                <div className="text-sm text-gray-600">{isCentralAsia ? "Место работы" : "Work Location"}</div>
              </div>
              <div className="bg-[#C9922A]/5 p-6 rounded-lg">
                <div className="text-2xl font-bold text-[#C9922A] mb-2">{isCentralAsia ? "Новый" : "New"}</div>
                <div className="text-sm text-gray-600">{isCentralAsia ? "Запуск программы" : "Program Launch"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Available Roles Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                {isCentralAsia ? "Доступные роли" : "Community Organizer"}
                <span className="text-green-600"> {isCentralAsia ? "организаторов сообщества" : "Roles Available"}</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-blue-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <Settings className="w-6 h-6" />
                      {isCentralAsia ? "Координаторы программы" : "Program Coordinators"}
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full ml-2">
                        {isCentralAsia ? "2 места" : "2 needed"}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Руководите разработкой программы и координируйте повседневную работу инициатив по взаимодействию сообщества."
                        : "Lead program development and oversee day-to-day operations of community collaboration initiatives."}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Разрабатывать структуру программы и процессы" : "Develop program structure and processes"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Координировать волонтёрские команды и мероприятия" : "Coordinate volunteer teams and activities"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Отслеживать показатели и результаты программы" : "Track program metrics and outcomes"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Управлять партнёрствами и сотрудничеством" : "Manage partnerships and collaborations"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#C9922A] shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#C9922A]">
                      <Calendar className="w-6 h-6" />
                      {isCentralAsia ? "Организаторы мероприятий" : "Event Organizers"}
                      <span className="bg-[#C9922A]/10 text-[#1B2A4A] text-xs px-2 py-1 rounded-full ml-2">
                        {isCentralAsia ? "4 места" : "4 needed"}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Планируйте и проводите сетевые мероприятия, семинары и встречи сообщества — как онлайн, так и офлайн."
                        : "Plan and execute networking events, workshops, and community gatherings both virtual and in-person."}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Разрабатывать увлекательный формат мероприятий" : "Design engaging event experiences"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Управлять логистикой и координацией мероприятий" : "Manage event logistics and coordination"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Содействовать нетворкингу и установлению связей" : "Facilitate networking and connections"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Анализировать итоги мероприятий" : "Follow up on event outcomes"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#C9922A] shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#C9922A]">
                      <Megaphone className="w-6 h-6" />
                      {isCentralAsia ? "Специалисты по охвату" : "Outreach Specialists"}
                      <span className="bg-[#C9922A]/10 text-[#C9922A] text-xs px-2 py-1 rounded-full ml-2">
                        {isCentralAsia ? "6 мест" : "6 needed"}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Выстраивайте отношения с местными предприятиями, организациями и потенциальными партнёрами для расширения нашей сети."
                        : "Build relationships with local businesses, organizations, and potential partners to expand our network."}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Исследовать и выявлять потенциальных партнёров" : "Research and identify potential partners"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Создавать убедительные материалы для охвата" : "Create compelling outreach materials"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Проводить первичные встречи с партнёрами" : "Conduct initial partnership meetings"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Вести базу данных контактов" : "Maintain relationship database"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-teal-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-teal-600">
                      <Network className="w-6 h-6" />
                      {isCentralAsia ? "Административная поддержка" : "Administrative Support"}
                      <span className="bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full ml-2">
                        {isCentralAsia ? "4 места" : "4 needed"}
                      </span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Обеспечивайте операционную поддержку: коммуникации, управление данными и документирование процессов."
                        : "Provide essential operational support including communications, data management, and process documentation."}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Управлять коммуникациями сообщества" : "Manage community communications"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Вести базы данных волонтёров и партнёров" : "Maintain volunteer and partner databases"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Создавать документацию по процессам" : "Create process documentation"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Поддерживать отчётность по программе" : "Support program reporting"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Program Development Timeline */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                {isCentralAsia ? "График развития" : "Community Collaboration"}
                <span className="text-green-600"> {isCentralAsia ? "взаимодействия сообщества" : "Development Timeline"}</span>
              </h2>
              <div className="space-y-6">
                <Card className="border-l-4 border-blue-500">
                  <CardHeader>
                    <CardTitle className="text-blue-600">
                      {isCentralAsia ? "Этап 1: Закладка фундамента (месяцы 1–3) — Q2 2026" : "Phase 1: Foundation Building (Months 1-3) - Q2 2026"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Выстроить структуру программы, набрать команду-основателей и создать базовые системы."
                        : "Establish program structure, recruit founding team, and build core systems."}
                    </p>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Формирование команды" : "Team Building"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Набрать 16 волонтёров" : "Recruit 16 volunteers"}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Обучение" : "Training"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Комплексный онбординг" : "Comprehensive onboarding"}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Системы" : "Systems"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Создание операционных процессов" : "Build operational processes"}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Партнёрства" : "Partnerships"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Первичный поиск партнёров" : "Initial partner outreach"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardHeader>
                    <CardTitle className="text-green-600">
                      {isCentralAsia ? "Этап 2: Запуск программы (месяцы 4–6) — Q3 2026" : "Phase 2: Program Launch (Months 4-6) - Q3 2026"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Запустить инициативы по взаимодействию сообщества и начать работу с предпринимателями."
                        : "Launch community collaboration initiatives and begin serving entrepreneurs."}
                    </p>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Первые события" : "First Events"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Ежемесячные сетевые встречи" : "Monthly networking events"}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Партнёрства" : "Partnerships"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "10+ активных партнёров" : "10+ active partners"}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Предприниматели" : "Entrepreneurs"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Помочь первым 25 предпринимателям" : "Serve first 25 entrepreneurs"}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Обратная связь" : "Feedback"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Постоянное улучшение" : "Continuous improvement"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#C9922A]">
                  <CardHeader>
                    <CardTitle className="text-[#C9922A]">
                      {isCentralAsia ? "Этап 3: Рост и влияние (месяцы 7–12) — Q4 2026 и далее" : "Phase 3: Growth & Impact (Months 7-12) - Q4 2026 & Beyond"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Масштабировать влияние программы и создать устойчивую модель взаимодействия сообщества."
                        : "Scale program impact and establish sustainable community collaboration model."}
                    </p>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Масштаб" : "Scale"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Помочь 100+ предпринимателям" : "100+ entrepreneurs served"}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Сеть" : "Network"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "25+ партнёрских организаций" : "25+ partner organizations"}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Истории успеха" : "Success Stories"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Документировать результаты" : "Document impact"}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Расширение" : "Expansion"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Планировать рост программы" : "Plan program growth"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Ideal Candidate Section */}
          <section className="mb-16 bg-gray-50 p-8 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                {isCentralAsia ? "Вы — наш следующий" : "Are You Our Next"}
                <span className="text-green-600"> {isCentralAsia ? "организатор сообщества?" : "Community Organizer?"}</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-green-600" />
                    {isCentralAsia ? "Опыт, который мы ценим" : "Experience We Value"}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Опыт планирования мероприятий или координации проектов" : "Event planning or project coordination experience"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Организация сообщества или управление волонтёрами" : "Community organizing or volunteer management"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Деловой нетворкинг или развитие партнёрств" : "Business networking or partnership development"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Опыт работы в социальных сетях и коммуникациях" : "Social media and communications experience"}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    {isCentralAsia ? "Необходимые качества" : "Essential Qualities"}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Сильные коммуникативные и межличностные навыки" : "Strong communication and interpersonal skills"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Самомотивация и умение работать самостоятельно" : "Self-motivated and able to work independently"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Искренний интерес к развитию сообщества" : "Passionate about community building"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Нацеленность на создание ценных связей и сетей" : "Committed to building valuable networks"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16 bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                {isCentralAsia ? "Почему наши организаторы сообщества" : "Why Our Community Organizers"}
                <span className="text-green-600"> {isCentralAsia ? "любят свою роль" : "Love Their Role"}</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-500" />
                    {isCentralAsia ? "Профессиональный рост" : "Professional Growth"}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Развивайте навыки управления программами и координации" : "Build program management and coordination skills"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Расширяйте обширную профессиональную сеть" : "Develop extensive professional network"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Получайте опыт в стартапах и некоммерческом секторе" : "Gain experience in startup and nonprofit sectors"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Возможности для развития лидерских качеств" : "Leadership development opportunities"}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    {isCentralAsia ? "Влияние на сообщество" : "Community Impact"}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Создавайте долгосрочные связи между предпринимателями" : "Create lasting connections between entrepreneurs"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Выстраивайте устойчивые ресурсы для сообщества" : "Build sustainable community resources"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Войдите в историю команды-основателей" : "Be part of founding team legacy"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Создавайте измеримое влияние на сообщество" : "Make measurable community impact"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Support Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                {isCentralAsia ? "Полная поддержка для" : "Complete Support for"}
                <span className="text-green-600"> {isCentralAsia ? "команды-основателей" : "Founding Team"}</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center p-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Комплексное обучение" : "Comprehensive Training"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isCentralAsia
                      ? "Полный онбординг, охватывающий организацию сообщества, развитие партнёрств и управление программой"
                      : "Complete onboarding covering community organizing, partnership development, and program management"}
                  </p>
                </Card>
                <Card className="text-center p-6">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Network className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Командная работа" : "Team Collaboration"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isCentralAsia
                      ? "Тесное взаимодействие с другими организаторами на еженедельных встречах и совместном планировании проектов"
                      : "Work closely with other organizers in weekly team meetings and collaborative project planning"}
                  </p>
                </Card>
                <Card className="text-center p-6">
                  <div className="bg-[#C9922A]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-[#C9922A]" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Гибкая удалённая работа" : "Flexible Remote Work"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isCentralAsia
                      ? "Работайте из любой точки мира с гибким графиком в зависимости от вашей доступности и часового пояса"
                      : "Work from anywhere with flexible scheduling to accommodate your availability and time zone"}
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* Application Form Section */}
          <section id="apply-now" className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {isCentralAsia ? "Готовы вступить в нашу" : "Ready to Join Our"}
                <span className="text-green-600"> {isCentralAsia ? "команду-основателей?" : "Founding Team?"}</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {isCentralAsia
                  ? "Станьте частью чего-то нового! Подайте заявку на роль организатора сообщества и помогите нам создать долгосрочное влияние."
                  : "Be part of building something new! Apply to become a Community Organizer and help us create lasting impact."}
              </p>
            </div>
            <GoHighLevelForm
              formType="volunteer"
              title={isCentralAsia ? "Заявка организатора сообщества" : "Community Organizer Application"}
              description={isCentralAsia ? "Подайте заявку, чтобы войти в команду-основателей организаторов сообщества. Мы рассмотрим вашу заявку и свяжемся с вами в течение 48 часов." : "Apply to join our founding team of Community Organizers. We'll review your application and contact you within 48 hours."}
              submitButtonText={isCentralAsia ? "Отправить заявку организатора сообщества" : "Submit Community Organizer Application"}
              volunteerOpportunity="community-organizer"
            />
            {isCentralAsia && (
              <div className="mt-8 text-center">
                <p className="text-sm text-gray-600 mb-4">
                  Есть вопросы? Напишите нам напрямую:
                </p>
                <Button variant="outline" asChild>
                  <a href="https://wa.me/13865171527" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2">
                    Написать в WhatsApp
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </a>
                </Button>
              </div>
            )}
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
              <Link to="/volunteer-opportunities/business-training" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
                <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Бизнес-тренер" : "Business Training"}</p>
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

export default CommunityOrganizer;
