import React from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, Network, FileText, Clock, Calendar, CheckCircle2, Heart, Star, Database, Mail, Headphones, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import GoHighLevelForm from "@/components/forms/GoHighLevelForm";
import { useRegion } from "@/contexts/RegionContext";
import { useVolunteerOpportunity } from "@/hooks/useVolunteerOpportunity";

const AdministrativeSupport = () => {
  const { isCentralAsia } = useRegion();
  const { opportunity } = useVolunteerOpportunity("administrative-support");

  return (
    <>
      <Helmet>
        <title>{`${opportunity.getTitle(isCentralAsia)} | BBB`}</title>
        <meta name="description" content={opportunity.getSummary(isCentralAsia) || opportunity.getTagline(isCentralAsia)} />
        <meta name="keywords" content="administrative support volunteer, nonprofit admin volunteer, virtual assistant volunteer, event coordination volunteer, communications volunteer, database management volunteer opportunities, remote nonprofit volunteer" />
        <link rel="canonical" href="https://businessesbeyondborders.com/volunteer-opportunities/administrative-support" />
        <meta property="og:title" content={isCentralAsia ? "Административная поддержка | BBB" : "Admin Support Volunteer | BBB"} />
        <meta property="og:description" content={isCentralAsia ? "Станьте волонтёром административной поддержки в Businesses Beyond Borders. Помогайте с коммуникациями, мероприятиями и координацией программ. Гибкая удалённая работа из любой точки мира." : "Support essential operations as an Administrative Support Volunteer with Businesses Beyond Borders. Help with communications, events, and program coordination. Flexible remote work from anywhere."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/volunteer-opportunities/administrative-support" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "Административная поддержка — волонтёрские возможности | Businesses Beyond Borders" : "Administrative Support Volunteer - Essential Operations | Businesses Beyond Borders"} />
        <meta name="twitter:description" content={isCentralAsia ? "Станьте волонтёром административной поддержки в Businesses Beyond Borders. Помогайте с коммуникациями, мероприятиями и координацией программ. Гибкая удалённая работа из любой точки мира." : "Support essential operations as an Administrative Support Volunteer with Businesses Beyond Borders. Help with communications, events, and program coordination. Flexible remote work from anywhere."} />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-[#C9922A] to-red-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Network className="w-4 h-4" />
                {isCentralAsia ? "ПОДДЕРЖКА ОСНОВНЫХ ОПЕРАЦИЙ" : "ESSENTIAL OPERATIONS SUPPORT"}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {opportunity.getTitle(isCentralAsia)}
              </h1>
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed mb-8">
                {opportunity.getTagline(isCentralAsia)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#apply-now">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                    {isCentralAsia ? "Подать заявку на административную поддержку" : "Apply for Admin Support"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Link to="/get-involved">
                  <Button size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white hover:text-[#C9922A]/90 font-bold px-8 py-4 text-lg">
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
                <div className="text-2xl font-bold text-[#C9922A] mb-2">{isCentralAsia ? "3–5 ч." : "3-5 hrs"}</div>
                <div className="text-sm text-gray-600">{isCentralAsia ? "В неделю" : "Per Week"}</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">{isCentralAsia ? "Удалённо" : "Remote"}</div>
                <div className="text-sm text-gray-600">{isCentralAsia ? "Место работы" : "Work Location"}</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">{isCentralAsia ? "Гибкий" : "Flexible"}</div>
                <div className="text-sm text-gray-600">{isCentralAsia ? "График" : "Schedule"}</div>
              </div>
              <div className="bg-[#C9922A]/5 p-6 rounded-lg">
                <div className="text-2xl font-bold text-[#C9922A] mb-2">{isCentralAsia ? "Ключевая" : "Essential"}</div>
                <div className="text-sm text-gray-600">{isCentralAsia ? "Поддержка миссии" : "Mission Support"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Administrative Roles Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                {isCentralAsia ? "Доступные роли" : "Administrative Support"}
                <span className="text-[#C9922A]"> {isCentralAsia ? "административной поддержки" : "Roles Available"}</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-blue-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <Mail className="w-6 h-6" />
                      {isCentralAsia ? "Координатор коммуникаций" : "Communications Coordinator"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Управляйте email-коммуникациями, обновлениями в социальных сетях, рассылками и системами связи с волонтёрами."
                        : "Manage email communications, social media updates, newsletter creation, and volunteer communication systems."}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Создавать и отправлять рассылки для волонтёров" : "Create and send volunteer newsletters"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Вести контент-план социальных сетей" : "Manage social media content calendar"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Отвечать на общие вопросы и запросы волонтёров" : "Respond to general inquiries and volunteer questions"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Координировать объявления и обновления" : "Coordinate announcements and updates"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#C9922A] shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#C9922A]">
                      <Calendar className="w-6 h-6" />
                      {isCentralAsia ? "Ассистент по координации мероприятий" : "Event Coordination Assistant"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Помогайте с планированием мероприятий, управлением регистрацией и логистической координацией семинаров, сетевых встреч и собраний волонтёров."
                        : "Support event planning, registration management, and logistical coordination for workshops, networking events, and volunteer meetings."}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Управлять регистрацией и списками участников" : "Manage event registration and attendee lists"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Координировать настройку виртуальных встреч и техническую поддержку" : "Coordinate virtual meeting setup and tech support"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Создавать материалы для мероприятий и опросы обратной связи" : "Create event materials and follow-up surveys"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Отправлять напоминания и подтверждения участия" : "Send event reminders and confirmations"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <Database className="w-6 h-6" />
                      {isCentralAsia ? "Менеджер базы данных и записей" : "Database & Records Manager"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Ведите базы данных волонтёров, обновляйте контактные данные, отслеживайте часы волонтёрства и формируйте отчёты для оценки программы."
                        : "Maintain volunteer databases, update contact information, track volunteer hours, and generate reports for program evaluation."}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Обновлять контактные базы данных волонтёров и партнёров" : "Update volunteer and partner contact databases"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Отслеживать часы волонтёрства и вклад участников" : "Track volunteer hours and contributions"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Формировать ежемесячные отчёты об активности и результатах" : "Generate monthly activity and impact reports"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Вести записи участников программы" : "Maintain program participant records"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-teal-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-teal-600">
                      <Monitor className="w-6 h-6" />
                      {isCentralAsia ? "Ассистент технической поддержки" : "Technical Support Assistant"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Оказывайте техническую поддержку во время виртуальных учебных сессий, помогайте с обновлением сайта и внедрением цифровых инструментов."
                        : "Provide technical support during virtual training sessions, help with website updates, and assist with digital tool implementation."}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Устранять технические проблемы в виртуальных встречах" : "Troubleshoot virtual meeting technical issues"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Помогать участникам с доступом к платформам" : "Help participants with platform access"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Базовые обновления контента сайта" : "Basic website content updates"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Помогать с настройкой и обучением цифровым инструментам" : "Assist with digital tool setup and training"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Daily Tasks Section */}
          <section className="mb-16 bg-gray-50 p-8 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                {isCentralAsia ? "Чем вы будете заниматься" : "What You'll Do"}
                <span className="text-[#C9922A]"> {isCentralAsia ? "в повседневной работе" : "Day-to-Day"}</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center p-6">
                  <div className="bg-[#C9922A]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-[#C9922A]" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Ежедневные коммуникации" : "Daily Communications"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {isCentralAsia
                      ? "Обрабатывайте email-переписку, обновления в социальных сетях и связь с волонтёрами, чтобы все были в курсе событий."
                      : "Handle email correspondence, social media updates, and volunteer communications to keep everyone connected and informed."}
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• {isCentralAsia ? "Управление email" : "Email management"}</li>
                    <li>• {isCentralAsia ? "Публикации в соцсетях" : "Social media posting"}</li>
                    <li>• {isCentralAsia ? "Обновления для волонтёров" : "Volunteer updates"}</li>
                  </ul>
                </Card>

                <Card className="text-center p-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Управление данными" : "Data Management"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {isCentralAsia
                      ? "Организовывайте и ведите точные записи о волонтёрах, участниках и деятельности программы для эффективной работы."
                      : "Organize and maintain accurate records of volunteers, participants, and program activities for effective operations."}
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• {isCentralAsia ? "Обновление баз данных" : "Database updates"}</li>
                    <li>• {isCentralAsia ? "Формирование отчётов" : "Report generation"}</li>
                    <li>• {isCentralAsia ? "Ведение записей" : "Record maintenance"}</li>
                  </ul>
                </Card>

                <Card className="text-center p-6">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Headphones className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Поддержка программ" : "Program Support"}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {isCentralAsia
                      ? "Обеспечивайте поддержку за кулисами во время учебных сессий, мероприятий и встреч для бесперебойной работы."
                      : "Provide behind-the-scenes support during training sessions, events, and meetings to ensure smooth operations."}
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• {isCentralAsia ? "Координация мероприятий" : "Event coordination"}</li>
                    <li>• {isCentralAsia ? "Техническая поддержка" : "Technical support"}</li>
                    <li>• {isCentralAsia ? "Управление логистикой" : "Logistics management"}</li>
                  </ul>
                </Card>
              </div>
            </div>
          </section>

          {/* Skills & Tools Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                {isCentralAsia ? "Навыки и инструменты," : "Skills & Tools"}
                <span className="text-[#C9922A]"> {isCentralAsia ? "которые вам пригодятся" : "You'll Use"}</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-[#C9922A]/50">
                  <CardHeader>
                    <CardTitle className="text-[#C9922A]">
                      {isCentralAsia ? "Необходимые навыки" : "Essential Skills"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Сильные навыки письменной коммуникации" : "Strong written communication skills"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Внимательность к деталям и точность" : "Attention to detail and accuracy"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Управление временем и организованность" : "Time management and organization"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Ориентация на качественное обслуживание" : "Customer service orientation"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Базовые навыки работы с компьютером и интернетом" : "Basic computer and internet skills"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardHeader>
                    <CardTitle className="text-blue-600">
                      {isCentralAsia ? "Инструменты и платформы" : "Tools & Platforms"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Microsoft Office или Google Workspace" : "Microsoft Office or Google Workspace"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Zoom, Teams или другие видеоплатформы" : "Zoom, Teams, or similar video platforms"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Инструменты email-маркетинга (обучение предоставляется)" : "Email marketing tools (training provided)"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Платформы социальных сетей" : "Social media platforms"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Инструменты управления базами данных (обучение предоставляется)" : "Database management tools (training provided)"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Benefits & Growth Section */}
          <section className="mb-16 bg-gradient-to-br from-yellow-50 to-[#C9922A]/5 p-8 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                {isCentralAsia ? "Возможности для" : "Professional Development"}
                <span className="text-[#C9922A]"> {isCentralAsia ? "профессионального развития" : "Opportunities"}</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-500" />
                    {isCentralAsia ? "Навыки, которые вы приобретёте" : "Skills You'll Develop"}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Операции и управление некоммерческими организациями" : "Nonprofit operations and management"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Цифровой маркетинг и коммуникации" : "Digital marketing and communications"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Планирование и координация мероприятий" : "Event planning and coordination"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Управление базами данных и аналитика" : "Database management and analytics"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Межкультурная коммуникация" : "Cross-cultural communication"}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    {isCentralAsia ? "Карьерные преимущества" : "Career Benefits"}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Пополнение портфолио опытом в некоммерческом секторе" : "Build portfolio of nonprofit experience"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Профессиональные рекомендации и отзывы" : "Professional references and recommendations"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Нетворкинг с бизнес-профессионалами" : "Network with business professionals"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Опыт в международном развитии" : "Gain international development experience"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Гибкий график для баланса работы и жизни" : "Flexible schedule for work-life balance"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Time Commitment Options */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                {isCentralAsia ? "Выберите свой" : "Choose Your"}
                <span className="text-[#C9922A]"> {isCentralAsia ? "уровень участия" : "Commitment Level"}</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center p-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Частичная занятость" : "Part-Time Support"}
                  </h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">
                    {isCentralAsia ? "2–3 ч./нед." : "2-3 hrs/week"}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {isCentralAsia
                      ? "Подходит для студентов или занятых специалистов с ограниченным временем, но желающих внести осмысленный вклад."
                      : "Perfect for students or professionals with limited availability but wanting to contribute meaningfully."}
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• {isCentralAsia ? "Управление email" : "Email management"}</li>
                    <li>• {isCentralAsia ? "Базовые обновления баз данных" : "Basic database updates"}</li>
                    <li>• {isCentralAsia ? "Публикации в соцсетях" : "Social media posting"}</li>
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
                    {isCentralAsia ? "4–6 ч./нед." : "4-6 hrs/week"}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {isCentralAsia
                      ? "Самый популярный уровень участия — комплексная административная поддержка в различных направлениях."
                      : "Most popular commitment level - comprehensive administrative support across multiple areas."}
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• {isCentralAsia ? "Полное управление коммуникациями" : "Full communications management"}</li>
                    <li>• {isCentralAsia ? "Поддержка координации мероприятий" : "Event coordination support"}</li>
                    <li>• {isCentralAsia ? "Базы данных и отчётность" : "Database and reporting"}</li>
                  </ul>
                </Card>

                <Card className="text-center p-6">
                  <div className="bg-[#C9922A]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Network className="w-8 h-8 text-[#C9922A]" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Ведущий администратор" : "Lead Administrator"}
                  </h3>
                  <p className="text-2xl font-bold text-[#C9922A] mb-2">
                    {isCentralAsia ? "8–10 ч./нед." : "8-10 hrs/week"}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    {isCentralAsia
                      ? "Руководящая роль по координации административных функций и наставничеству других администраторов-волонтёров."
                      : "Leadership role coordinating administrative functions and supervising other admin volunteers."}
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• {isCentralAsia ? "Операционная координация" : "Operations coordination"}</li>
                    <li>• {isCentralAsia ? "Командное руководство" : "Team leadership"}</li>
                    <li>• {isCentralAsia ? "Поддержка стратегического планирования" : "Strategic planning support"}</li>
                  </ul>
                </Card>
              </div>
            </div>
          </section>

          {/* Application Form Section */}
          <section id="apply-now" className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {isCentralAsia ? "Готовы поддержать наши" : "Ready to Support Our"}
                <span className="text-[#C9922A]"> {isCentralAsia ? "операции?" : "Operations?"}</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {isCentralAsia
                  ? "Вступайте в нашу административную команду и станьте опорой, которая позволяет нашим программам менять жизни людей по всему миру."
                  : "Join our administrative team and be the backbone that enables our programs to transform lives around the world."}
              </p>
            </div>
            <GoHighLevelForm
              formType="volunteer"
              title={isCentralAsia ? "Заявка волонтёра административной поддержки" : "Administrative Support Volunteer Application"}
              description={isCentralAsia ? "Подайте заявку, чтобы вступить в нашу команду административной поддержки. Мы рассмотрим вашу заявку и свяжемся с вами в течение 48 часов, чтобы обсудить наиболее подходящую роль для ваших навыков и доступности." : "Apply to join our administrative support team. We'll review your application and contact you within 48 hours to discuss the best role for your skills and availability."}
              submitButtonText={isCentralAsia ? "Отправить заявку на административную поддержку" : "Submit Admin Support Application"}
              volunteerOpportunity="admin-support"
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
              <Link to="/volunteer-opportunities/community-organizer" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
                <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Организатор сообщества" : "Community Organizer"}</p>
                <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Подробнее →" : "Learn more →"}</p>
              </Link>
              <Link to="/volunteer-opportunities/business-training" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
                <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Бизнес-тренер" : "Business Training"}</p>
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

export default AdministrativeSupport;
