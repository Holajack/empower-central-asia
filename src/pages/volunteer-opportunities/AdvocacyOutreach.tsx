import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Users, Megaphone, FileText, Calendar, MapPin, Clock, CheckCircle, Target, Globe, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import GoHighLevelForm from "@/components/forms/GoHighLevelForm";
import { useRegion } from "@/contexts/RegionContext";

const AdvocacyOutreach = () => {
  const { isCentralAsia } = useRegion();

  return (
    <>
      <Helmet>
        <title>Advocacy & Outreach Volunteer | BBB</title>
        <meta name="description" content="Become an Advocacy & Outreach volunteer with Businesses Beyond Borders. Help amplify our mission to empower entrepreneurs in Central Asia through communications and advocacy." />
        <meta name="keywords" content="advocacy volunteer, nonprofit outreach, communications volunteer, mission advocacy, nonprofit advocacy opportunities, remote advocacy volunteer" />
        <link rel="canonical" href="https://businessesbeyondborders.com/volunteer-opportunities/advocacy-outreach" />
        <meta property="og:title" content={isCentralAsia ? "Адвокация и продвижение — волонтёрские возможности | Businesses Beyond Borders" : "Advocacy & Outreach Volunteer - Amplify Our Mission | Businesses Beyond Borders"} />
        <meta property="og:description" content={isCentralAsia ? "Станьте волонтёром по адвокации и охвату в Businesses Beyond Borders. Помогите усилить нашу миссию по поддержке предпринимателей Центральной Азии через коммуникации и адвокацию." : "Become an Advocacy & Outreach volunteer with Businesses Beyond Borders. Help amplify our mission to empower entrepreneurs in Central Asia through communications and advocacy."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/volunteer-opportunities/advocacy-outreach" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "Адвокация и продвижение — волонтёрские возможности | Businesses Beyond Borders" : "Advocacy & Outreach Volunteer - Amplify Our Mission | Businesses Beyond Borders"} />
        <meta name="twitter:description" content={isCentralAsia ? "Станьте волонтёром по адвокации и охвату в Businesses Beyond Borders. Помогите усилить нашу миссию по поддержке предпринимателей Центральной Азии через коммуникации и адвокацию." : "Become an Advocacy & Outreach volunteer with Businesses Beyond Borders. Help amplify our mission to empower entrepreneurs in Central Asia through communications and advocacy."} />
      </Helmet>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-[#1B2A4A] to-[#1B2A4A]/80 text-white pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              {isCentralAsia ? "Возможности для адвокации и охвата" : "Advocacy & Outreach Opportunities"}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {isCentralAsia ? "Усильте нашу миссию" : "Amplify Our Mission"}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              {isCentralAsia
                ? "Помогите нам распространять информацию, выстраивать партнёрства и отстаивать экономическое развитие по всей Центральной Азии"
                : "Help us spread awareness, build partnerships, and advocate for economic empowerment across Central Asia"}
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                {isCentralAsia ? "Глобальное влияние" : "Global Impact"}
              </span>
              <span className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                {isCentralAsia ? "Стратегическая коммуникация" : "Strategic Communication"}
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                {isCentralAsia ? "Развитие сообщества" : "Community Building"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold mb-4">
                  {isCentralAsia ? "Ваш голос — наша миссия" : "Your Voice, Our Mission"}
                </CardTitle>
                <CardDescription className="text-lg">
                  {isCentralAsia
                    ? "Как волонтёр по адвокации и охвату, вы будете играть ключевую роль в расширении нашего влияния, построении стратегических партнёрств и доведении нашего послания до сообществ и заинтересованных сторон, которые способны оказать наибольшее воздействие на жизнь людей в Центральной Азии."
                    : "As an Advocacy & Outreach volunteer, you'll be instrumental in expanding our reach, building strategic partnerships, and ensuring our message resonates with the communities and stakeholders who can make the biggest difference in Central Asia."}
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Opportunity Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {isCentralAsia ? "Направления адвокации и охвата" : "Advocacy & Outreach Opportunities"}
            </h2>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Community Advocacy */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Megaphone className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">
                      {isCentralAsia ? "Общественная адвокация" : "Community Advocacy"}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {isCentralAsia
                      ? "Продвигайте инициативы экономического развития в вашем местном сообществе и за его пределами"
                      : "Champion economic empowerment initiatives within your local community and beyond"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{isCentralAsia ? "Организовывать информационные мероприятия и презентации" : "Organize awareness events and presentations"}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{isCentralAsia ? "Налаживать связи с местными организациями и общественными группами" : "Connect with local organizations and community groups"}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{isCentralAsia ? "Рассказывать истории успеха и делиться отзывами о результатах" : "Share success stories and impact testimonials"}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{isCentralAsia ? "Выступать за принятие политических решений, поддерживающих предпринимательство" : "Advocate for policy changes supporting entrepreneurship"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Partnership Development */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">
                      {isCentralAsia ? "Развитие партнёрств" : "Partnership Development"}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {isCentralAsia
                      ? "Выстраивайте стратегические отношения с организациями, учреждениями и лидерами"
                      : "Build strategic relationships with organizations, institutions, and leaders"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{isCentralAsia ? "Исследовать и выявлять потенциальные партнёрские организации" : "Research and identify potential partner organizations"}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{isCentralAsia ? "Разрабатывать партнёрские предложения и презентации" : "Develop partnership proposals and presentations"}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{isCentralAsia ? "Организовывать встречи и совместные инициативы" : "Facilitate collaboration meetings and initiatives"}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{isCentralAsia ? "Поддерживать отношения с действующими партнёрами" : "Maintain relationships with existing partners"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content Creation & Storytelling */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#C9922A]/10 rounded-lg">
                      <FileText className="h-6 w-6 text-[#C9922A]" />
                    </div>
                    <CardTitle className="text-xl">
                      {isCentralAsia ? "Создание контента и сторителлинг" : "Content Creation & Storytelling"}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {isCentralAsia
                      ? "Создавайте убедительный контент, отражающий нашу миссию и истории успеха"
                      : "Create compelling content that shares our mission and impact stories"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{isCentralAsia ? "Писать статьи, посты в блоге и контент для социальных сетей" : "Write articles, blog posts, and social media content"}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{isCentralAsia ? "Создавать визуальный контент и инфографику" : "Create visual content and infographics"}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{isCentralAsia ? "Документировать истории успеха и результаты программ" : "Document success stories and program impact"}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{isCentralAsia ? "Разрабатывать маркетинговые материалы и кампании" : "Develop marketing materials and campaigns"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Digital Outreach */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-[#C9922A]/10 rounded-lg">
                      <Globe className="h-6 w-6 text-[#C9922A]" />
                    </div>
                    <CardTitle className="text-xl">
                      {isCentralAsia ? "Цифровой охват" : "Digital Outreach"}
                    </CardTitle>
                  </div>
                  <CardDescription>
                    {isCentralAsia
                      ? "Используйте цифровые платформы для расширения охвата и вовлечённости аудитории"
                      : "Leverage digital platforms to expand our reach and engagement"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{isCentralAsia ? "Управлять кампаниями в социальных сетях и взаимодействием с аудиторией" : "Manage social media campaigns and engagement"}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{isCentralAsia ? "Разрабатывать email-кампании" : "Develop email marketing campaigns"}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{isCentralAsia ? "Создавать и оптимизировать онлайн-кампании по сбору средств" : "Create and optimize online fundraising campaigns"}</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>{isCentralAsia ? "Взаимодействовать с онлайн-сообществами и форумами" : "Engage with online communities and forums"}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills and Qualifications */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {isCentralAsia ? "Идеальные навыки и качества" : "Ideal Skills & Qualities"}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    {isCentralAsia ? "Предпочтительные навыки" : "Preferred Skills"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• {isCentralAsia ? "Отличные письменные и устные коммуникативные навыки" : "Excellent written and verbal communication"}</li>
                    <li>• {isCentralAsia ? "Опыт работы с социальными сетями" : "Experience with social media marketing"}</li>
                    <li>• {isCentralAsia ? "Умение создавать контент и рассказывать истории" : "Content creation and storytelling abilities"}</li>
                    <li>• {isCentralAsia ? "Навыки публичных выступлений и презентаций" : "Public speaking and presentation skills"}</li>
                    <li>• {isCentralAsia ? "Опыт в нетворкинге и выстраивании отношений" : "Networking and relationship-building experience"}</li>
                    <li>• {isCentralAsia ? "Понимание работы некоммерческих организаций или сферы развития" : "Understanding of nonprofit or development work"}</li>
                    <li>• {isCentralAsia ? "Культурная чуткость и осведомлённость" : "Cultural sensitivity and awareness"}</li>
                    <li>• {isCentralAsia ? "Творческий подход к решению задач" : "Creative problem-solving skills"}</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    {isCentralAsia ? "Личные качества" : "Personal Qualities"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• {isCentralAsia ? "Искренняя заинтересованность в экономическом развитии" : "Passionate about economic empowerment"}</li>
                    <li>• {isCentralAsia ? "Убеждённость в важности развития сообщества" : "Strong belief in community development"}</li>
                    <li>• {isCentralAsia ? "Самомотивация и инициативность" : "Self-motivated and proactive"}</li>
                    <li>• {isCentralAsia ? "Командный игрок, ориентированный на сотрудничество" : "Collaborative and team-oriented"}</li>
                    <li>• {isCentralAsia ? "Умение адаптироваться к разным аудиториям" : "Adaptable to different audiences"}</li>
                    <li>• {isCentralAsia ? "Настойчивость и ориентация на результат" : "Persistent and results-driven"}</li>
                    <li>• {isCentralAsia ? "Культурная чуткость и уважение" : "Culturally sensitive and respectful"}</li>
                    <li>• {isCentralAsia ? "Приверженность этичным методам адвокации" : "Committed to ethical advocacy practices"}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Levels */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {isCentralAsia ? "Гибкие варианты участия" : "Flexible Commitment Options"}
            </h2>

            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-green-200 hover:border-green-300 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto p-3 bg-green-100 rounded-full w-fit mb-3">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">
                    {isCentralAsia ? "Гибкая поддержка" : "Flexible Support"}
                  </CardTitle>
                  <CardDescription>
                    {isCentralAsia ? "2–5 часов в месяц" : "2-5 hours/month"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    {isCentralAsia
                      ? "Подходит для занятых специалистов, которые хотят вносить вклад через стратегические усилия по адвокации"
                      : "Perfect for busy professionals who want to contribute through strategic advocacy efforts"}
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• {isCentralAsia ? "Репосты в социальных сетях" : "Social media sharing"}</li>
                    <li>• {isCentralAsia ? "Знакомства в сети" : "Network introductions"}</li>
                    <li>• {isCentralAsia ? "Участие в мероприятиях" : "Event participation"}</li>
                    <li>• {isCentralAsia ? "Проверка контента" : "Content review"}</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto p-3 bg-blue-100 rounded-full w-fit mb-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">
                    {isCentralAsia ? "Постоянный адвокат" : "Regular Advocate"}
                  </CardTitle>
                  <CardDescription>
                    {isCentralAsia ? "5–10 часов в месяц" : "5-10 hours/month"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    {isCentralAsia
                      ? "Подходит для тех, кто может регулярно уделять время выстраиванию партнёрств и созданию контента"
                      : "Ideal for those who can dedicate regular time to building partnerships and creating content"}
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• {isCentralAsia ? "Развитие партнёрств" : "Partnership development"}</li>
                    <li>• {isCentralAsia ? "Создание контента" : "Content creation"}</li>
                    <li>• {isCentralAsia ? "Организация мероприятий" : "Event organization"}</li>
                    <li>• {isCentralAsia ? "Координация кампаний" : "Campaign coordination"}</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-[#C9922A]/20 hover:border-[#C9922A]/30 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto p-3 bg-[#C9922A]/10 rounded-full w-fit mb-3">
                    <Target className="h-6 w-6 text-[#C9922A]" />
                  </div>
                  <CardTitle className="text-lg">
                    {isCentralAsia ? "Ведущий адвокат" : "Lead Advocate"}
                  </CardTitle>
                  <CardDescription>
                    {isCentralAsia ? "От 10 часов в месяц" : "10+ hours/month"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    {isCentralAsia
                      ? "Для преданных адвокатов, готовых возглавить крупные инициативы по охвату и стратегические партнёрства"
                      : "For dedicated advocates ready to lead major outreach initiatives and strategic partnerships"}
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• {isCentralAsia ? "Стратегическое планирование" : "Strategic planning"}</li>
                    <li>• {isCentralAsia ? "Крупные партнёрские соглашения" : "Major partnership deals"}</li>
                    <li>• {isCentralAsia ? "Руководство кампаниями" : "Campaign leadership"}</li>
                    <li>• {isCentralAsia ? "Координация команды" : "Team coordination"}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Support & Benefits */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">
              {isCentralAsia ? "Что мы предоставляем" : "What We Provide"}
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {isCentralAsia ? "Профессиональное развитие" : "Professional Development"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• {isCentralAsia ? "Тренинги по адвокации и публичным выступлениям" : "Advocacy and public speaking training"}</li>
                    <li>• {isCentralAsia ? "Семинары по цифровому маркетингу" : "Digital marketing workshops"}</li>
                    <li>• {isCentralAsia ? "Навыки развития партнёрств" : "Partnership development skills"}</li>
                    <li>• {isCentralAsia ? "Обучение созданию контента" : "Content creation training"}</li>
                    <li>• {isCentralAsia ? "Образование в области межкультурной компетентности" : "Cultural competency education"}</li>
                    <li>• {isCentralAsia ? "Возможности для нетворкинга с лидерами" : "Networking opportunities with leaders"}</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {isCentralAsia ? "Поддержка и ресурсы" : "Support & Resources"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• {isCentralAsia ? "Маркетинговые материалы и шаблоны" : "Marketing materials and templates"}</li>
                    <li>• {isCentralAsia ? "Доступ к данным и статистике о результатах" : "Access to impact data and statistics"}</li>
                    <li>• {isCentralAsia ? "Ресурсы и руководства по сторителлингу" : "Storytelling resources and guidelines"}</li>
                    <li>• {isCentralAsia ? "Инструментарий для развития партнёрств" : "Partnership development toolkit"}</li>
                    <li>• {isCentralAsia ? "Регулярные стратегические встречи" : "Regular strategy meetings"}</li>
                    <li>• {isCentralAsia ? "Мероприятия по признанию и поощрению волонтёров" : "Recognition and appreciation events"}</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">
                {isCentralAsia ? "Готовы усилить нашу миссию?" : "Ready to Amplify Our Mission?"}
              </h2>
              <p className="text-lg text-muted-foreground">
                {isCentralAsia
                  ? "Присоединяйтесь к нашей команде адвокатов и помогите распространить послание об экономическом развитии по всей Центральной Азии"
                  : "Join our advocacy team and help spread the message of economic empowerment across Central Asia"}
              </p>
            </div>

            <GoHighLevelForm
              formType="volunteer"
              title={isCentralAsia ? "Заявка на участие в адвокации и охвате" : "Advocacy & Outreach Application"}
              description={isCentralAsia ? "Расскажите нам о вашем опыте в адвокации и о том, как вы хотели бы помочь расширить наш охват и влияние." : "Tell us about your advocacy experience and how you'd like to help expand our reach and impact."}
              submitButtonText={isCentralAsia ? "Отправить заявку" : "Submit Application"}
            />

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                {isCentralAsia ? "Есть вопросы о возможностях для адвокации?" : "Questions about advocacy opportunities?"}
              </p>
              <Button variant="outline" asChild>
                {isCentralAsia ? (
                  <a href="https://wa.me/13865171527" className="inline-flex items-center gap-2" target="_blank" rel="noopener noreferrer">
                    Написать нам в WhatsApp
                    <ArrowRight className="h-4 w-4" />
                  </a>
                ) : (
                  <Link to="/contact" className="inline-flex items-center gap-2">
                    Contact Our Team
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                )}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Other Opportunities */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-4">
          <div className="mt-4 border-t border-gray-200 pt-8 max-w-4xl mx-auto">
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
              <Link to="/volunteer-opportunities/administrative-support" className="block p-4 bg-white rounded-lg border border-gray-200 hover:border-[#C9922A]/50 transition-colors">
                <p className="text-sm font-medium text-[#1B2A4A]">{isCentralAsia ? "Административная поддержка" : "Administrative Support"}</p>
                <p className="text-xs text-gray-500 mt-1">{isCentralAsia ? "Подробнее →" : "Learn more →"}</p>
              </Link>
            </div>
          </div>
        </div>
      </section>
      </div>
    </>
  );
};

export default AdvocacyOutreach;
