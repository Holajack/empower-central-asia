import React from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, Target, Users2, Clock, Award, CheckCircle2, Heart, Star, TrendingUp, Lightbulb, Crown, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import GoHighLevelForm from "@/components/forms/GoHighLevelForm";
import { useRegion } from "@/contexts/RegionContext";
import { useVolunteerOpportunity } from "@/hooks/useVolunteerOpportunity";

const LeadershipMentor = () => {
  const { isCentralAsia } = useRegion();
  const { opportunity } = useVolunteerOpportunity("leadership-mentor");

  return (
    <>
      <Helmet>
        <title>{`${opportunity.getTitle(isCentralAsia)} | BBB`}</title>
        <meta name="description" content={opportunity.getSummary(isCentralAsia) || opportunity.getTagline(isCentralAsia)} />
        <meta name="keywords" content="leadership mentor volunteer, business mentorship opportunities, executive coaching volunteer, leadership development mentor, mentor volunteer Central Asia, nonprofit mentorship program, volunteer business advisor opportunities, remote volunteer mentoring" />
        <link rel="canonical" href="https://businessesbeyondborders.com/volunteer-opportunities/leadership-mentor" />
        <meta property="og:title" content={isCentralAsia ? "Ментор лидерства | BBB" : "Leadership Mentor Volunteer | BBB"} />
        <meta property="og:description" content={isCentralAsia ? "Станьте наставником по развитию лидерства в Businesses Beyond Borders. Ведите начинающих лидеров через проверенную 12-месячную программу по модели 70-20-10. 4–6 часов в месяц. Глобальное влияние из любой точки мира." : "Become a Leadership Development Mentor with Businesses Beyond Borders. Guide emerging leaders through our proven 12-month program using the 70-20-10 model. 4-6 hours monthly commitment. Make global impact from anywhere."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/volunteer-opportunities/leadership-mentor" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "Ментор лидерства — волонтёрские возможности | Businesses Beyond Borders" : "Leadership Development Mentor - Volunteer Opportunity | Businesses Beyond Borders"} />
        <meta name="twitter:description" content={isCentralAsia ? "Станьте наставником по развитию лидерства в Businesses Beyond Borders. Ведите начинающих лидеров через проверенную 12-месячную программу по модели 70-20-10. 4–6 часов в месяц. Глобальное влияние из любой точки мира." : "Become a Leadership Development Mentor with Businesses Beyond Borders. Guide emerging leaders through our proven 12-month program using the 70-20-10 model. 4-6 hours monthly commitment. Make global impact from anywhere."} />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-[#1B2A4A] text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Target className="w-4 h-4" />
                {isCentralAsia ? "ПРИОРИТЕТНАЯ ВОЛОНТЁРСКАЯ ВОЗМОЖНОСТЬ" : "HIGH PRIORITY VOLUNTEER OPPORTUNITY"}
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                {opportunity.getTitle(isCentralAsia)}
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                {opportunity.getTagline(isCentralAsia)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#apply-now">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                    {isCentralAsia ? "Подать заявку наставника" : "Apply to Mentor"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Link to="/get-involved">
                  <Button size="lg" className="bg-transparent border border-white/40 text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8 py-4 text-lg">
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
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">{isCentralAsia ? "4–6 ч." : "4-6 hrs"}</div>
                <div className="text-sm text-gray-600">{isCentralAsia ? "Затраты в месяц" : "Monthly Time Commitment"}</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">{isCentralAsia ? "12 мес." : "12 mo"}</div>
                <div className="text-sm text-gray-600">{isCentralAsia ? "Длительность программы" : "Program Duration"}</div>
              </div>
              <div className="bg-[#C9922A]/5 p-6 rounded-lg">
                <div className="text-2xl font-bold text-[#C9922A] mb-2">85%</div>
                <div className="text-sm text-gray-600">{isCentralAsia ? "Карьерный рост участников" : "Career Advancement Rate"}</div>
              </div>
              <div className="bg-[#C9922A]/5 p-6 rounded-lg">
                <div className="text-2xl font-bold text-[#C9922A] mb-2">1:1</div>
                <div className="text-sm text-gray-600">{isCentralAsia ? "Формат наставничества" : "Mentorship Format"}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* What You'll Do Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                {isCentralAsia ? "Чем вы будете заниматься как" : "What You'll Do as a"}
                <span className="text-blue-600"> {isCentralAsia ? "наставник по лидерству" : "Leadership Mentor"}</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-blue-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <Compass className="w-6 h-6" />
                      {isCentralAsia ? "Направлять начинающих лидеров" : "Guide Emerging Leaders"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Работайте один на один с 2–3 начинающими лидерами в Центральной Азии, помогая им развивать ключевые лидерские навыки с помощью нашей проверенной модели развития 70-20-10."
                        : "Work one-on-one with 2-3 emerging leaders in Central Asia, helping them develop essential leadership skills through our proven 70-20-10 development model."}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Ежемесячные виртуальные сессии наставничества (60–90 минут каждая)" : "Monthly virtual mentoring sessions (60-90 minutes each)"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Постановка целей и отслеживание прогресса" : "Goal setting and progress tracking"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Разработка лидерских задач" : "Leadership challenge development"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <TrendingUp className="w-6 h-6" />
                      {isCentralAsia ? "Развивать ключевые навыки" : "Develop Core Skills"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Сосредоточьтесь на развитии эмоционального интеллекта, принципов служащего лидерства и трансформационных лидерских навыков у своих подопечных."
                        : "Focus on developing emotional intelligence, servant leadership principles, and transformational leadership skills in your mentees."}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Коучинг по эмоциональному интеллекту" : "Emotional intelligence coaching"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Коммуникация и разрешение конфликтов" : "Communication and conflict resolution"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Стратегическое мышление и принятие решений" : "Strategic thinking and decision-making"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#C9922A] shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#C9922A]">
                      <Lightbulb className="w-6 h-6" />
                      {isCentralAsia ? "Делиться реальным опытом" : "Share Real Experience"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Опирайтесь на свой профессиональный опыт, чтобы предлагать практические идеи, примеры из жизни и реальные приложения принципов лидерства."
                        : "Draw from your professional experience to provide practical insights, case studies, and real-world applications of leadership principles."}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Рассказывать о преодолённых лидерских трудностях" : "Share leadership challenges you've overcome"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Давать отраслевые инсайты" : "Provide industry-specific insights"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Знакомить подопечных со своей профессиональной сетью" : "Connect mentees with your professional network"}
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#C9922A] shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-[#C9922A]">
                      <Crown className="w-6 h-6" />
                      {isCentralAsia ? "Воспитывать будущих лидеров" : "Build Future Leaders"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Помогайте подопечным создавать собственные планы умножения лидерства, чтобы влияние продолжалось и после вашего прямого наставничества."
                        : "Help mentees create their own leadership multiplication plans, ensuring the impact continues beyond your direct mentorship."}
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Планирование лидерского наследия" : "Leadership legacy planning"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Руководство по планированию преемственности" : "Succession planning guidance"}
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        {isCentralAsia ? "Стратегии воздействия на сообщество" : "Community impact strategies"}
                      </li>
                    </ul>
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
                <span className="text-blue-600"> {isCentralAsia ? "наставник по лидерству?" : "Leadership Mentor?"}</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Users2 className="w-6 h-6 text-blue-600" />
                    {isCentralAsia ? "Идеальный опыт" : "Ideal Background"}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "5+ лет в руководящих или старших управленческих ролях" : "5+ years in executive or senior management roles"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Опыт руководства командами от 10 человек" : "Experience leading teams of 10+ people"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Подтверждённый опыт развития других лидеров" : "Track record of developing other leaders"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Предпринимательский или бизнес-опыт" : "Entrepreneurial or business development experience"}
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
                      {isCentralAsia ? "Искреннее желание развивать других" : "Passion for developing others"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Культурная чуткость и эмпатия" : "Cultural sensitivity and empathy"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Отличные коммуникативные навыки и умение слушать" : "Excellent communication and listening skills"}
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Готовность к 12-месячным отношениям наставничества" : "Commitment to 12-month mentoring relationship"}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Program Structure */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                {isCentralAsia ? "Структура 12-месячной программы" : "12-Month Mentorship"}
                <span className="text-[#C9922A]"> {isCentralAsia ? "наставничества" : "Program Structure"}</span>
              </h2>
              <div className="space-y-6">
                <Card className="border-l-4 border-blue-500">
                  <CardHeader>
                    <CardTitle className="text-blue-600">
                      {isCentralAsia ? "Месяцы 1–3: Закладка фундамента" : "Months 1-3: Foundation Building"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Установите доверие, оцените текущий лидерский потенциал и поставьте цели развития."
                        : "Establish trust, assess current leadership capacity, and set development goals."}
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Оценка" : "Assessment"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Оценка стиля лидерства" : "Leadership style evaluation"}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Постановка целей" : "Goal Setting"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "12-месячный план развития" : "12-month development plan"}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Выстраивание доверия" : "Trust Building"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Установление отношений наставничества" : "Establish mentoring relationship"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardHeader>
                    <CardTitle className="text-green-600">
                      {isCentralAsia ? "Месяцы 4–8: Развитие навыков" : "Months 4-8: Skill Development"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Сосредоточьтесь на ключевых лидерских компетенциях через реальные задачи и практику."
                        : "Focus on core leadership competencies through real-world challenges and practice."}
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Развитие EQ" : "EQ Development"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Тренинг эмоционального интеллекта" : "Emotional intelligence training"}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Коммуникация" : "Communication"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Лидерские коммуникативные навыки" : "Leadership communication skills"}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Командообразование" : "Team Building"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Стратегии развития команды" : "Team development strategies"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-[#C9922A]">
                  <CardHeader>
                    <CardTitle className="text-[#C9922A]">
                      {isCentralAsia ? "Месяцы 9–12: Мастерство и умножение" : "Months 9-12: Mastery & Multiplication"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      {isCentralAsia
                        ? "Применяйте приобретённые навыки в реальных лидерских задачах и развивайте других."
                        : "Apply learned skills in real leadership challenges and develop others."}
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Лидерский проект" : "Leadership Project"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Руководство значимой инициативой" : "Lead significant initiative"}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Наставничество других" : "Mentoring Others"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Начало наставничества молодых лидеров" : "Begin mentoring junior leaders"}</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">{isCentralAsia ? "Планирование наследия" : "Legacy Planning"}</div>
                        <p className="text-sm text-gray-600">{isCentralAsia ? "Стратегия устойчивого воздействия" : "Sustainable impact strategy"}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16 bg-gradient-to-br from-[#C9922A]/5 to-[#C9922A]/10 p-8 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                {isCentralAsia ? "Почему наши наставники" : "Why Our Mentors"}
                <span className="text-[#C9922A]"> {isCentralAsia ? "любят своё дело" : "Love What They Do"}</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-yellow-500" />
                    {isCentralAsia ? "Профессиональные преимущества" : "Professional Benefits"}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Развивайте собственные навыки наставничества и коучинга" : "Develop your own mentoring and coaching skills"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Получайте межкультурный лидерский опыт" : "Gain cross-cultural leadership experience"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Расширяйте международную профессиональную сеть" : "Expand your global professional network"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Профессиональные рекомендации и признание" : "Professional references and recognition"}
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    {isCentralAsia ? "Личное удовлетворение" : "Personal Rewards"}
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Оказывайте трансформирующее влияние на начинающих лидеров" : "Make transformational impact on emerging leaders"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Выстраивайте значимые международные отношения" : "Build meaningful international relationships"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Создавайте долгосрочное наследие в сообществах" : "Create lasting legacy in communities"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      {isCentralAsia ? "Личное удовлетворение от помощи другим" : "Personal fulfillment from giving back"}
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
                {isCentralAsia ? "Вы не будете" : "You Won't Be"}
                <span className="text-blue-600"> {isCentralAsia ? "наставником в одиночку" : "Mentoring Alone"}</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center p-6">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Комплексное обучение" : "Comprehensive Training"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isCentralAsia
                      ? "Полная программа обучения наставников, охватывающая межкультурное наставничество, нашу учебную программу и лучшие практики"
                      : "Complete mentor training program covering cross-cultural mentoring, our curriculum, and best practices"}
                  </p>
                </Card>
                <Card className="text-center p-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Сообщество наставников" : "Mentor Community"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isCentralAsia
                      ? "Ежемесячные встречи по взаимному обучению с другими наставниками для обмена опытом и лучшими практиками"
                      : "Monthly peer learning sessions with other mentors to share challenges and best practices"}
                  </p>
                </Card>
                <Card className="text-center p-6">
                  <div className="bg-[#C9922A]/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-[#C9922A]" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">
                    {isCentralAsia ? "Постоянная поддержка" : "Ongoing Support"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isCentralAsia
                      ? "Выделенный координатор программы и ресурсы для обеспечения успеха вашего наставничества"
                      : "Dedicated program coordinator and resources to ensure your mentoring success"}
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* Application Form Section */}
          <section id="apply-now" className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {isCentralAsia ? "Готовы стать" : "Ready to Become a"}
                <span className="text-blue-600"> {isCentralAsia ? "наставником по лидерству?" : "Leadership Mentor?"}</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                {isCentralAsia
                  ? "Присоединяйтесь к нашей команде наставников и помогите формировать будущее начинающих лидеров Центральной Азии."
                  : "Join our founding team of leadership mentors and help shape the future of emerging leaders in Central Asia."}
              </p>
            </div>
            <GoHighLevelForm
              formType="volunteer"
              title={isCentralAsia ? "Заявка наставника по лидерству" : "Leadership Mentor Application"}
              description={isCentralAsia ? "Подайте заявку, чтобы стать наставником по развитию лидерства. Мы рассмотрим вашу заявку и свяжемся с вами в течение 48 часов." : "Apply to become a leadership development mentor. We'll review your application and contact you within 48 hours."}
              submitButtonText={isCentralAsia ? "Отправить заявку наставника" : "Submit Mentor Application"}
              volunteerOpportunity="leadership-mentor"
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

export default LeadershipMentor;
