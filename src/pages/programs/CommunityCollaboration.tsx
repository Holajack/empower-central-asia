
import React from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, Users, Building, Handshake, Heart, Star, CheckCircle2, Calendar, Download, UserPlus, Network, Target, TrendingUp, Award, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import UpcomingEvents from "@/components/programs/UpcomingEvents";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useRegion } from "@/contexts/RegionContext";
import { Breadcrumbs } from "@/components/SEO";
import { generateFAQSchema } from "@/lib/seo";
import { useProgram } from "@/hooks/usePrograms";

const CommunityCollaboration = () => {
  const { isCentralAsia } = useRegion();
  const { program } = useProgram("community-collaboration");
  return (
    <>
      <Helmet>
        <title>{`${program.getTitle(isCentralAsia)} | BBB`}</title>
        <meta name="description" content={program.getHeroDescription(isCentralAsia)} />
        <meta name="keywords" content="community collaboration network, volunteer opportunities, nonprofit partnerships, community development, volunteer coordinator positions, business networking, social enterprise collaboration, community organizing volunteers, nonprofit community partnerships, volunteer management programs, Central Asia partnerships" />

        <meta
          property="og:title"
          content={
            isCentralAsia
              ? "Сеть сотрудничества в сообществе — партнёрства на основе волонтёрства"
              : "Community Collaboration Network - Volunteer-Driven Partnerships"
          }
        />
        <meta
          property="og:description"
          content={
            isCentralAsia
              ? "Создание партнёрств на основе волонтёрства для соединения предпринимателей, бизнеса и организаций ради устойчивого местного воздействия. Нужны волонтёры."
              : "Building volunteer-driven community partnerships to connect entrepreneurs, businesses, and organizations for sustainable local impact. Volunteers needed to help launch this initiative."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/programs/community-collaboration" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1559827260-dc66d52bef19" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content={
            isCentralAsia
              ? "Сеть сотрудничества в сообществе — нужны волонтёры"
              : "Community Collaboration Network - Volunteers Needed"
          }
        />
        <meta
          name="twitter:description"
          content={
            isCentralAsia
              ? "Помогите создать партнёрства в сообществе, соединяющие предпринимателей с ресурсами и возможностями. Нужны координаторы, организаторы и специалисты."
              : "Help us build community partnerships connecting entrepreneurs with resources and opportunities. Volunteer coordinators, organizers, and business professionals needed."
          }
        />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1559827260-dc66d52bef19" />

        <meta name="robots" content="index, follow" />
        <meta name="author" content="Businesses Beyond Borders" />
        <link rel="canonical" href="https://businessesbeyondborders.com/programs/community-collaboration" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["VolunteerAction", "Organization"],
            "name": "Community Collaboration Network",
            "description": "Volunteer-driven community partnerships connecting entrepreneurs, businesses, and organizations for sustainable impact in Central Asia and beyond",
            "organizer": {
              "@type": "NonprofitOrganization",
              "name": "Businesses Beyond Borders",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Port Orange",
                "addressRegion": "FL",
                "addressCountry": "US"
              },
              "telephone": "(386) 517-1527",
              "email": "donations@businessesbeyondborders.com"
            },
            "volunteerType": ["Community Organizer", "Partnership Coordinator", "Business Professional", "Event Facilitator"],
            "timeRequired": "PT2H/week",
            "skills": [
              "Community organizing",
              "Partnership development",
              "Event planning",
              "Business networking",
              "Project coordination",
              "Communication skills"
            ],
            "location": {
              "@type": "Place",
              "name": "Remote - United States",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "FL",
                "addressCountry": "US"
              }
            },
            "url": "https://businessesbeyondborders.com/programs/community-collaboration"
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify(generateFAQSchema([
            {
              question: "What is the Community Collaboration Network?",
              answer: "The Community Collaboration Network is a volunteer-driven initiative by Businesses Beyond Borders that connects entrepreneurs, businesses, and organizations to build sustainable local partnerships for economic development and social impact in Central Asia and beyond."
            },
            {
              question: "How can I volunteer with the Community Collaboration Network?",
              answer: "Volunteers are needed in several roles including community coordinators, partnership facilitators, business professionals, and event organizers. The program is designed to be run by volunteers with approximately 2 hours per week of commitment. Apply through the BBB website to get involved."
            },
            {
              question: "When will the Community Collaboration Network launch?",
              answer: "The program launches in three phases: Phase 1 (Foundation Building, Q2 2026) focuses on recruiting 15-20 volunteer coordinators and building infrastructure; Phase 2 (Program Launch, Q3 2026) includes the inaugural community forum and digital platform launch; Phase 3 (Growth and Impact, Q4 2026 onward) scales the network to 200+ members."
            },
            {
              question: "What skills do I need to volunteer with the Community Collaboration Network?",
              answer: "Useful skills include community organizing, partnership development, event planning, business networking, project coordination, and communication. The program welcomes volunteers from all professional backgrounds who share a passion for entrepreneurship and community development."
            },
            {
              question: "Is the Community Collaboration Network only for Central Asia?",
              answer: "While the network has a strong focus on Central Asia, it connects entrepreneurs, businesses, and organizations worldwide. The digital collaboration platform will enable global participation and partnership-building across geographic boundaries."
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
            { name: "Community Collaboration", url: "https://businessesbeyondborders.com/programs/community-collaboration" },
          ]}
        />
      </div>
      {/* Hero Section */}
      <div
        className="relative h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            {isCentralAsia ? "Нужны волонтёры для запуска" : "Volunteers Needed to Launch"}
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
            {isCentralAsia ? (
              <>Создавайте партнёрства<span className="text-yellow-400"> в сообществе, которые имеют значение</span></>
            ) : (
              <>Build Community<span className="text-yellow-400"> Partnerships That Matter</span></>
            )}
          </h1>

          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed mb-8">
            {isCentralAsia ? (
              <><strong className="text-yellow-300">Помогите нам запустить</strong> сеть на основе волонтёрства, соединяющую предпринимателей, бизнес и организации для <strong className="text-yellow-300"> устойчивого влияния на сообщество</strong> в Центральной Азии и за её пределами.</>
            ) : (
              <><strong className="text-yellow-300">Help us launch</strong> a volunteer-driven network connecting entrepreneurs, businesses, and organizations for <strong className="text-yellow-300"> sustainable community impact</strong> across Central Asia and beyond.</>
            )}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center mb-8">
            <div className="animate-fade-up [--animation-delay:600ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">{isCentralAsia ? "НОВОЕ" : "NEW"}</div>
              <div className="text-sm text-white/80">{isCentralAsia ? "Запуск программы" : "Program Launch"}</div>
            </div>
            <div className="animate-fade-up [--animation-delay:700ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">2{isCentralAsia ? "ч" : "hrs"}</div>
              <div className="text-sm text-white/80">{isCentralAsia ? "Еженедельная нагрузка" : "Weekly Commitment"}</div>
            </div>
            <div className="animate-fade-up [--animation-delay:800ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">$31.80</div>
              <div className="text-sm text-white/80">{isCentralAsia ? "Ценность часа волонтёра" : "Volunteer Hour Value"}</div>
            </div>
            <div className="animate-fade-up [--animation-delay:900ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">10+</div>
              <div className="text-sm text-white/80">{isCentralAsia ? "Волонтёрских ролей" : "Volunteer Roles"}</div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up [--animation-delay:900ms]">
            <Link to="/get-involved?type=volunteer&program=community-collaboration">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                {isCentralAsia ? "Стать волонтёром для развития сообщества" : "Volunteer to Build Community"}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="#volunteer-opportunities" className="text-white hover:text-yellow-300 font-medium flex items-center gap-2">
              <Download className="w-4 h-4" />
              {isCentralAsia ? "Посмотреть возможности для волонтёров" : "See Volunteer Opportunities"}
            </Link>
          </div>

          <p className="text-sm text-white/70 mt-6 animate-fade-up [--animation-delay:1000ms]">
            {isCentralAsia
              ? "⭐ Присоединяйтесь к первопроходцам-волонтёрам, создающим нашу сеть сотрудничества • 🌍 Соединяем местные инициативы с глобальными изменениями • 🤝 Будьте частью чего-то трансформационного с первого дня"
              : <>⭐ Join <strong className="text-white">pioneering volunteers</strong> building our comprehensive community collaboration network • 🌍 Connecting local impact to global change • 🤝 Be part of something transformational from day one</>
            }
          </p>
        </div>
      </div>

      {/* Program Status - New Launch */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#C9922A]/10 text-[#C9922A]/90 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <UserPlus className="w-4 h-4" />
              {isCentralAsia ? "Запуск новой программы" : "Launching New Program"}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              {isCentralAsia ? (
                <>Помогите нам создать что-то <span className="text-[#C9922A]">исключительное вместе</span></>
              ) : (
                <>Help Us Build Something <span className="text-[#C9922A]">Extraordinary Together</span></>
              )}
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {isCentralAsia ? (
                <>На основе глубокого изучения <strong className="text-gray-800">лучших практик сотрудничества в сообществе</strong> мы запускаем сеть на основе волонтёрства, которая <strong className="text-gray-800">изменит то, как предприниматели взаимодействуют</strong> в нашем сообществе.</>
              ) : (
                <>Based on extensive research into <strong className="text-gray-800">community collaboration best practices</strong>, we're launching a volunteer-driven network that will <strong className="text-gray-800">transform how entrepreneurs connect</strong> in our community.</>
              )}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Network className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {isCentralAsia ? "Связывать" : "Connect"}
              </h3>
              <p className="text-gray-600">
                {isCentralAsia
                  ? "Создавайте значимые связи между предпринимателями, бизнесом и организациями сообщества."
                  : "Build meaningful relationships between entrepreneurs, businesses, and community organizations."}
              </p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Handshake className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {isCentralAsia ? "Сотрудничать" : "Collaborate"}
              </h3>
              <p className="text-gray-600">
                {isCentralAsia
                  ? "Содействуйте партнёрствам, использующим коллективные сильные стороны для решения задач сообщества."
                  : "Facilitate partnerships that leverage collective strengths to address community challenges."}
              </p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-[#C9922A]/10 to-[#C9922A]/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Heart className="w-10 h-10 text-[#C9922A]" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">
                {isCentralAsia ? "Создавать влияние" : "Create Impact"}
              </h3>
              <p className="text-gray-600">
                {isCentralAsia
                  ? "Создавайте устойчивые социальные, экономические и экологические блага для наших сообществ."
                  : "Generate sustainable social, economic, and environmental benefits for our communities."}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">

            {/* Volunteer Opportunities */}
            <section id="volunteer-opportunities">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                {isCentralAsia ? "Доступные волонтёрские возможности" : "Volunteer Opportunities Available"}
              </h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">

                <Card className="border-2 border-blue-200 relative">
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {isCentralAsia ? "ЛИДЕРСТВО" : "LEADERSHIP"}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      {isCentralAsia ? "Координаторы программ" : "Program Coordinators"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Руководите разработкой и реализацией инициатив сотрудничества"
                        : "Lead the development and implementation of collaboration initiatives"}
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Координатор по развитию партнёрств" : "Partnership Development Coordinator"}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Координатор по планированию мероприятий" : "Event Planning Coordinator"}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Координатор сети ресурсов" : "Resource Network Coordinator"}</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-green-200">
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    {isCentralAsia ? "СООБЩЕСТВО" : "COMMUNITY"}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      {isCentralAsia ? "Организаторы сообщества" : "Community Organizers"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Связывайтесь с местными предпринимателями и содействуйте сетевым мероприятиям"
                        : "Connect with local entrepreneurs and facilitate networking activities"}
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Специалисты по охвату" : "Outreach Specialists"}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Фасилитаторы форумов" : "Forum Facilitators"}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Руководители рабочих групп" : "Working Group Leaders"}</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#C9922A]/20">
                  <div className="absolute top-4 right-4 bg-[#C9922A] text-white px-3 py-1 rounded-full text-xs font-bold">
                    {isCentralAsia ? "ЭКСПЕРТИЗА" : "EXPERTISE"}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-[#C9922A] flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      {isCentralAsia ? "Бизнес-специалисты" : "Business Professionals"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Делитесь опытом и наставляйте совместные бизнес-инициативы"
                        : "Share expertise and mentor collaborative business initiatives"}
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Бизнес-наставники" : "Business Mentors"}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Отраслевые специалисты" : "Industry Specialists"}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Стратегические советники" : "Strategic Advisors"}</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-2 border-[#C9922A]/20">
                  <div className="absolute top-4 right-4 bg-[#C9922A] text-white px-3 py-1 rounded-full text-xs font-bold">
                    {isCentralAsia ? "ПОДДЕРЖКА" : "SUPPORT"}
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-[#C9922A] flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      {isCentralAsia ? "Специалисты поддержки" : "Support Specialists"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Обеспечивайте административную и техническую поддержку работы сети"
                        : "Provide administrative and technical support for network operations"}
                    </p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Административные помощники" : "Administrative Assistants"}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Техническая поддержка" : "Technology Support"}</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" />{isCentralAsia ? "Команда по коммуникациям" : "Communications Team"}</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Program Components */}
            <section className="bg-gradient-to-br from-[#C9922A]/5 to-yellow-50 p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                {isCentralAsia ? "Что мы создаём вместе" : "What We're Building Together"}
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-[#C9922A] mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    {isCentralAsia ? "Ежеквартальные форумы сообщества" : "Quarterly Community Forums"}
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{isCentralAsia ? "Сетевые мероприятия для 100+ предпринимателей" : "Networking events bringing together 100+ entrepreneurs"}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{isCentralAsia ? "Организованные дискуссии по задачам сообщества" : "Facilitated discussions on community challenges"}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{isCentralAsia ? "Подбор партнёров и обмен ресурсами" : "Partnership matching and resource sharing"}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{isCentralAsia ? "Презентация совместных проектов и планирование" : "Collaborative project showcase and planning"}</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#C9922A] mb-3 flex items-center gap-2">
                    <Network className="w-5 h-5" />
                    {isCentralAsia ? "Цифровая платформа для сотрудничества" : "Digital Collaboration Platform"}
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{isCentralAsia ? "Онлайн-каталог местных предпринимателей и ресурсов" : "Online directory of local entrepreneurs and resources"}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{isCentralAsia ? "Инструменты для совместных проектов и коммуникации" : "Project collaboration tools and communication"}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{isCentralAsia ? "Система координации и расписания волонтёров" : "Volunteer coordination and scheduling system"}</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" />{isCentralAsia ? "Отслеживание результатов и обмен историями успеха" : "Impact tracking and success story sharing"}</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Implementation Timeline */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                {isCentralAsia ? "Сроки запуска и ключевые этапы" : "Launch Timeline & Milestones"}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="phase1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      {isCentralAsia
                        ? "Этап 1: Закладка фундамента (месяцы 1–3) — 2-й квартал 2026"
                        : "Phase 1: Foundation Building (Months 1-3) - Q2 2026"}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        {isCentralAsia
                          ? "Набор и обучение координаторов-волонтёров, создание партнёрств и разработка начальной сетевой инфраструктуры."
                          : "Recruit and train volunteer coordinators, establish partnerships, and create initial network infrastructure."}
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {isCentralAsia ? "Набор волонтёров" : "Volunteer Recruitment"}
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• {isCentralAsia ? "Набрать 15–20 координаторов-волонтёров" : "Recruit 15-20 volunteer coordinators"}</li>
                            <li>• {isCentralAsia ? "Обучение и ориентация волонтёров" : "Volunteer training and orientation program"}</li>
                            <li>• {isCentralAsia ? "Создать систему управления волонтёрами" : "Establish volunteer management system"}</li>
                            <li>• {isCentralAsia ? "Разработать программу признания волонтёров" : "Create volunteer recognition program"}</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {isCentralAsia ? "Развитие инфраструктуры" : "Infrastructure Development"}
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• {isCentralAsia ? "Разработать цифровую платформу для сотрудничества" : "Develop digital collaboration platform"}</li>
                            <li>• {isCentralAsia ? "Заключить партнёрские соглашения" : "Establish partnership agreements"}</li>
                            <li>• {isCentralAsia ? "Создать библиотеку ресурсов и инструменты" : "Create resource library and tools"}</li>
                            <li>• {isCentralAsia ? "Разработать бренд и материалы программы" : "Design program brand and materials"}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="phase2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      {isCentralAsia
                        ? "Этап 2: Запуск программы (месяцы 4–6) — 3-й квартал 2026"
                        : "Phase 2: Program Launch (Months 4-6) - Q3 2026"}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        {isCentralAsia
                          ? "Проведение первого форума сообщества, запуск цифровой платформы и начало реализации совместных проектов."
                          : "Host inaugural community forum, launch digital platform, and begin facilitating collaboration projects."}
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {isCentralAsia ? "Вовлечение сообщества" : "Community Engagement"}
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• {isCentralAsia ? "Первый ежеквартальный форум сообщества" : "First Quarterly Community Forum"}</li>
                            <li>• {isCentralAsia ? "Запустить кампанию по охвату" : "Launch outreach campaign"}</li>
                            <li>• {isCentralAsia ? "Сформировать первые рабочие группы" : "Form initial working groups"}</li>
                            <li>• {isCentralAsia ? "Начать подбор партнёров" : "Begin partnership matching"}</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {isCentralAsia ? "Активация платформы" : "Platform Activation"}
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• {isCentralAsia ? "Публичный запуск цифровой платформы" : "Digital platform public launch"}</li>
                            <li>• {isCentralAsia ? "Первые совместные проекты" : "First collaborative projects"}</li>
                            <li>• {isCentralAsia ? "Система координации волонтёров" : "Volunteer coordination system"}</li>
                            <li>• {isCentralAsia ? "Базовый уровень измерения результатов" : "Impact measurement baseline"}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="phase3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-[#C9922A]/10 text-[#C9922A] w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      {isCentralAsia
                        ? "Этап 3: Рост и влияние (месяцы 7–12) — 4-й квартал 2026 и далее"
                        : "Phase 3: Growth & Impact (Months 7-12) - Q4 2026 & Beyond"}
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        {isCentralAsia
                          ? "Масштабирование работы сети, измерение результатов и создание устойчивой волонтёрской модели для долгосрочного успеха."
                          : "Scale network operations, measure impact, and establish sustainable volunteer-driven model for long-term success."}
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {isCentralAsia ? "Расширение сети" : "Network Expansion"}
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• {isCentralAsia ? "Расширить до 200+ участников сети" : "Scale to 200+ network members"}</li>
                            <li>• {isCentralAsia ? "Выйти в новые сообщества" : "Expand to additional communities"}</li>
                            <li>• {isCentralAsia ? "Запустить специализированные рабочие группы" : "Launch specialized working groups"}</li>
                            <li>• {isCentralAsia ? "Развить канал лидеров" : "Develop leadership pipeline"}</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">
                            {isCentralAsia ? "Измерение результатов" : "Impact Measurement"}
                          </h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• {isCentralAsia ? "Ежеквартальные отчёты о результатах" : "Quarterly impact reports"}</li>
                            <li>• {isCentralAsia ? "Документирование историй успеха" : "Success story documentation"}</li>
                            <li>• {isCentralAsia ? "Мероприятия по признанию волонтёров" : "Volunteer recognition events"}</li>
                            <li>• {isCentralAsia ? "Планирование устойчивости программы" : "Program sustainability planning"}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Volunteer Benefits */}
            <section className="bg-white border-2 border-[#C9922A]/20 p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="bg-[#C9922A]/10 p-3 rounded-full flex-shrink-0">
                  <Heart className="w-6 h-6 text-[#C9922A]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {isCentralAsia ? "Почему стоит стать волонтёром?" : "Why Volunteer With Us?"}
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {isCentralAsia ? "Личные преимущества" : "Personal Benefits"}
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• {isCentralAsia ? "Приобретайте ценные лидерские и сетевые навыки" : "Build valuable leadership and networking skills"}</li>
                        <li>• {isCentralAsia ? "Получайте опыт в управлении некоммерческой организацией" : "Gain experience in nonprofit management"}</li>
                        <li>• {isCentralAsia ? "Знакомьтесь с единомышленниками-профессионалами" : "Connect with like-minded professionals"}</li>
                        <li>• {isCentralAsia ? "Развивайте навыки управления проектами" : "Develop project management expertise"}</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">
                        {isCentralAsia ? "Влияние на сообщество" : "Community Impact"}
                      </h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• {isCentralAsia ? "Стимулируйте экономическое развитие в Центральной Азии" : "Drive economic development in Central Asia"}</li>
                        <li>• {isCentralAsia ? "Создавайте долгосрочные партнёрства и сотрудничество" : "Create lasting partnerships and collaborations"}</li>
                        <li>• {isCentralAsia ? "Поддерживайте начинающих предпринимателей и бизнес" : "Support emerging entrepreneurs and businesses"}</li>
                        <li>• {isCentralAsia ? "Стройте более сильное и сплочённое сообщество" : "Build a stronger, more connected community"}</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <div className="text-center bg-gradient-to-br from-[#C9922A] to-[#C9922A]/90 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">
                {isCentralAsia ? "Готовы помочь создать что-то удивительное?" : "Ready to Help Build Something Amazing?"}
              </h3>
              <p className="text-[#C9922A]/10 mb-6 max-w-2xl mx-auto">
                {isCentralAsia
                  ? "Присоединяйтесь к нашей основной команде волонтёров и помогите создать нашу ведущую сеть сотрудничества в сообществе. Ваше время и навыки могут обеспечить трансформационные изменения."
                  : "Join our founding volunteer team and help create our premier community collaboration network. Your time and skills can drive transformational change in our community."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/get-involved?type=volunteer&program=community-collaboration">
                  <Button size="lg" className="bg-white text-[#C9922A] hover:bg-[#C9922A]/5 font-bold px-8 py-3">
                    {isCentralAsia ? "Стать волонтёром сегодня — помогите нам запустить" : "Volunteer Today - Help Us Launch"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white hover:text-[#C9922A] px-8 py-3">
                    {isCentralAsia ? "Узнать больше о волонтёрстве" : "Learn More About Volunteering"}
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">

            <Card className="border-2 border-[#C9922A]/20 bg-gradient-to-br from-[#C9922A]/5 to-[#C9922A]/10">
              <CardHeader>
                <div className="text-center">
                  <div className="bg-[#C9922A] text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">
                    {isCentralAsia ? "НУЖНЫ ВОЛОНТЁРЫ СЕЙЧАС" : "VOLUNTEERS NEEDED NOW"}
                  </div>
                  <CardTitle className="text-xl text-[#C9922A]">
                    {isCentralAsia ? "Присоединяйтесь к команде запуска" : "Join Our Launch Team"}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-700">
                  <p className="font-medium mb-2">
                    {isCentralAsia ? "Помогите нам набрать основных волонтёров" : "Help us recruit founding volunteers"}
                  </p>
                  <p className="text-sm text-gray-600 mb-4">
                    🚀 <strong>{isCentralAsia ? "Станьте частью основной команды" : "Be part of the founding team"}</strong><br/>
                    ⏰ <strong>{isCentralAsia ? "Гибкая нагрузка — 2 часа в неделю" : "Flexible 2-hour weekly commitment"}</strong><br/>
                    🤝 <strong>{isCentralAsia ? "Стройте ценные связи и навыки" : "Build valuable networks & skills"}</strong><br/>
                    🏆 <strong>{isCentralAsia ? "Признание и возможности для лидерства" : "Recognition and leadership opportunities"}</strong>
                  </p>
                </div>
                <Link to="/get-involved?type=volunteer&program=community-collaboration">
                  <Button className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold py-3">
                    {isCentralAsia ? "Записаться волонтёром" : "Sign Up to Volunteer"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="w-full border-[#C9922A]/30 text-[#C9922A] hover:bg-[#C9922A]/5">
                    <Download className="mr-2 w-4 h-4" />
                    {isCentralAsia ? "Получить пакет информации для волонтёра" : "Get Volunteer Info Packet"}
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-[#C9922A]" />
                  {isCentralAsia ? "Срочные потребности в волонтёрах" : "Immediate Volunteer Needs"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{isCentralAsia ? "Координатор программы:" : "Program Coordinator:"}</span>
                    <span className="font-medium text-[#C9922A]">{isCentralAsia ? "нужны 2" : "2 needed"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{isCentralAsia ? "Организаторы мероприятий:" : "Event Organizers:"}</span>
                    <span className="font-medium">{isCentralAsia ? "нужны 4" : "4 needed"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{isCentralAsia ? "Специалисты по охвату:" : "Outreach Specialists:"}</span>
                    <span className="font-medium">{isCentralAsia ? "нужны 6" : "6 needed"}</span>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{isCentralAsia ? "Нагрузка:" : "Time Commitment:"}</span>
                    <span className="font-medium">{isCentralAsia ? "2 часа/неделя" : "2 hours/week"}</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{isCentralAsia ? "Дата начала:" : "Start Date:"}</span>
                    <span className="font-medium">{isCentralAsia ? "1 апреля 2026" : "April 1, 2026"}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{isCentralAsia ? "Обучение:" : "Training Provided:"}</span>
                    <span className="font-medium text-green-600">{isCentralAsia ? "Да — полная поддержка" : "Yes - Full Support"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  {isCentralAsia ? "Ожидаемые результаты" : "Expected Impact"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">{isCentralAsia ? "200+ связанных предпринимателей" : "200+ Entrepreneurs Connected"}</p>
                    <p className="text-sm text-gray-600">{isCentralAsia ? "Цель роста сети за первый год" : "First year network growth target"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">{isCentralAsia ? "50+ созданных партнёрств" : "50+ Partnerships Formed"}</p>
                    <p className="text-sm text-gray-600">{isCentralAsia ? "Межсекторальное сотрудничество" : "Cross-sector collaborations facilitated"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">{isCentralAsia ? "Экономический эффект $1M+" : "$1M+ Economic Impact"}</p>
                    <p className="text-sm text-gray-600">{isCentralAsia ? "Расчётная экономическая польза для сообщества" : "Estimated community economic benefit"}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">{isCentralAsia ? "25+ созданных рабочих мест" : "25+ Jobs Created"}</p>
                    <p className="text-sm text-gray-600">{isCentralAsia ? "Через совместные бизнес-проекты" : "Through collaborative business ventures"}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  {isCentralAsia ? "Преимущества волонтёра" : "Volunteer Benefits"}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">
                  {isCentralAsia
                    ? "Присоединяйтесь к нашей волонтёрской команде, получайте ценный опыт и оказывайте долгосрочное влияние на сообщество."
                    : "Join our volunteer team and gain valuable experience while making a lasting impact on your community."}
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <strong>{isCentralAsia ? "• Лидерские навыки:" : "• Leadership Skills:"}</strong>{" "}
                    {isCentralAsia ? "Управление проектами и командой" : "Project and team management"}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>{isCentralAsia ? "• Профессиональная сеть:" : "• Professional Network:"}</strong>{" "}
                    {isCentralAsia ? "Связи с бизнес-лидерами" : "Connect with business leaders"}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>{isCentralAsia ? "• Признание:" : "• Recognition:"}</strong>{" "}
                    {isCentralAsia ? "Награды и рекомендательные письма" : "Awards and reference letters"}
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>{isCentralAsia ? "• Обучение:" : "• Training:"}</strong>{" "}
                    {isCentralAsia ? "Сертификат по управлению НКО" : "Nonprofit management certification"}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h4 className="font-medium text-gray-800 mb-2">
                    {isCentralAsia ? "Вопросы о волонтёрстве?" : "Questions About Volunteering?"}
                  </h4>
                  <p className="text-sm text-gray-600 mb-4">
                    {isCentralAsia ? (
                      <>Свяжитесь с нашей <strong>командой программы</strong> по вопросам волонтёрства и обучения.</>
                    ) : (
                      <>Speak with our <strong>program team</strong> about volunteer opportunities and training.</>
                    )}
                  </p>
                  {isCentralAsia ? (
                    <a href="https://wa.me/13865171527" target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" size="sm" className="w-full">
                        <Users className="mr-2 w-4 h-4" />
                        WhatsApp: +1 (386) 517-1527
                      </Button>
                    </a>
                  ) : (
                    <Link to="/contact">
                      <Button variant="outline" size="sm" className="w-full">
                        <Users className="mr-2 w-4 h-4" />
                        Contact Volunteer Coordinator
                      </Button>
                    </Link>
                  )}
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

export default CommunityCollaboration;
