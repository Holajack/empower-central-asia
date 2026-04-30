import React from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, HelpCircle, Mail, Phone, Users, Heart, Clock, Laptop } from "lucide-react";
import DonateButton from "@/components/DonateButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import TestimonialCard from "@/components/success-stories/TestimonialCard";
import { testimonials, getLocalizedTestimonial } from "@/data/testimonials";
import { useRegion } from "@/contexts/RegionContext";
import { useTranslation } from "@/hooks/useTranslation";
import { useFaqItems, localizeFaqs } from "@/hooks/useFaqItems";

const GetInvolved = () => {
  const { isCentralAsia, isRegionCentralAsia } = useRegion();
  const { t } = useTranslation();
  // FAQs come from Sanity (faqItem docs) with a hardcoded fallback in the hook.
  // BBB staff add/edit/reorder via Studio → Get Involved page updates within ~60s.
  const { faqs: rawFaqs } = useFaqItems();
  const faqs = localizeFaqs(rawFaqs, isCentralAsia);

  return (
    <>
      <Helmet>
        <title>
          {isCentralAsia
            ? "Участвовать | Businesses Beyond Borders"
            : "Get Involved - Donate or Volunteer | BBB"}
        </title>
        <meta
          name="description"
          content={
            isCentralAsia
              ? "Начните бесплатный курс финансовой грамотности, станьте волонтёром или поддержите предпринимателей Центральной Азии."
              : "Start a free financial literacy course, donate to fund an entrepreneur's journey, or partner with BBB. Learn and build, or give someone else their chance."
          }
        />
        <meta name="keywords" content={isCentralAsia
          ? "участие в программе, волонтёрство, пожертвование, финансовая грамотность"
          : "volunteer opportunities Daytona Beach, nonprofit organizations Volusia County, donate to nonprofit, partner with BBB, financial literacy program Florida"} />
        <link rel="canonical" href="https://businessesbeyondborders.com/get-involved" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta property="og:title" content={isCentralAsia ? "Участвовать в программе" : "Get Involved - Participate, Donate, or Partner"} />
        <meta property="og:description" content={isCentralAsia
          ? "Начните бесплатный курс финансовой грамотности или поддержите предпринимателей в Центральной Азии."
          : "Start the free financial literacy course, donate to fund an entrepreneur's journey, or partner with BBB."} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/get-involved" />
        <meta property="og:image" content="https://businessesbeyondborders.com/images/bbb-logo.png" />
        <meta property="og:site_name" content="Businesses Beyond Borders" />
        <meta property="og:locale" content={isCentralAsia ? "ru_RU" : "en_US"} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "Участвовать в программе" : "Get Involved with Businesses Beyond Borders"} />
        <meta name="twitter:description" content={isCentralAsia
          ? "Начните бесплатный курс или поддержите предпринимателей."
          : "Start the free course, donate, or partner with BBB to empower entrepreneurs."} />
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebPage",
          name: isCentralAsia ? "Участвовать" : "Get Involved",
          description: isCentralAsia
            ? "Начните бесплатный курс финансовой грамотности."
            : "Start the free financial literacy course, donate, or partner with BBB.",
          url: "https://businessesbeyondborders.com/get-involved",
          isPartOf: { "@type": "WebSite", name: "Businesses Beyond Borders", url: "https://businessesbeyondborders.com" },
        })}</script>
        <script type="application/ld+json">{JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map(faq => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: faq.answer,
            },
          })),
        })}</script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div
          className="relative h-[60vh] md:h-[70vh] flex items-center justify-center pt-16"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
              {isCentralAsia ? "Найди свой путь" : "Find Your Way In"}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed mb-8">
              {isCentralAsia
                ? "Бесплатное обучение финансовой грамотности и создание бизнеса. Начните путь к финансовой свободе прямо сейчас."
                : "Whether you want to start building something yourself or help someone else get their chance -- there's a place for you here."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up [--animation-delay:600ms]">
              <a href="#for-participants">
                <Button
                  size="lg"
                  className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8 py-4 text-lg"
                >
                  {isCentralAsia ? "Хочу учиться" : "I Want to Learn & Build"}
                </Button>
              </a>
              {!isRegionCentralAsia && (
                <a href="#for-donors">
                  <Button
                    size="lg"
                    className="bg-white/20 backdrop-blur border border-white text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8 py-4 text-lg"
                  >
                    {isCentralAsia ? "Хочу поддержать" : "I Want to Give"}
                  </Button>
                </a>
              )}
              <a href="#for-volunteers">
                <Button
                  size="lg"
                  className={`${
                    isCentralAsia
                      ? "bg-white/20 backdrop-blur border border-white text-white hover:bg-white hover:text-[#1B2A4A]"
                      : "bg-white/10 backdrop-blur border border-white/50 text-white hover:bg-white hover:text-[#1B2A4A]"
                  } font-bold px-8 py-4 text-lg`}
                >
                  {isCentralAsia ? "Хочу быть волонтёром" : "I Want to Volunteer"}
                </Button>
              </a>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8 space-y-24">
          {/* ============================== */}
          {/* SECTION 1: FOR PARTICIPANTS    */}
          {/* ============================== */}
          <section id="for-participants" className="scroll-mt-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-sm font-bold tracking-widest text-[#C9922A] mb-4">
                {isCentralAsia ? "ДЛЯ УЧАСТНИКОВ" : "FOR PARTICIPANTS"}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {isCentralAsia
                  ? "Что предлагает BBB — и что требует"
                  : "What BBB Offers -- and What It Asks"}
              </h2>

              <div className="prose prose-lg max-w-none text-gray-600 mb-12">
                {isCentralAsia ? (
                  <>
                    <p>
                      BBB -- это не помощь, которую можно просто получить. Это четырёхэтапный путь
                      от «я не знаю, с чего начать» до «я это построил сам». Каждый этап
                      бесплатный. Каждый этап нужно заслужить.
                    </p>
                    <p>
                      Если вам говорили -- словами или обстоятельствами -- что для вас здесь
                      ничего нет, это как раз для вас. Но нужно быть готовым работать. Те, кто
                      приходит стабильно, двигаются вперёд.
                    </p>
                  </>
                ) : (
                  <>
                    <p>
                      BBB is not a handout. It's not a single class you sit through and forget.
                      It's a four-stage path from "I don't know where to start" to "I built this
                      myself." Every stage is free or funded. Every stage is earned.
                    </p>
                    <p>
                      If you're someone who has been told -- by your situation, your community,
                      or your own experience -- that there's nothing here for you, this is for you.
                      But you have to be willing to do the work. The people who show up consistently
                      are the ones who move forward.
                    </p>
                  </>
                )}
              </div>

              {/* The Stages - Participant View */}
              <div className="space-y-6 mb-12">
                {/* Stage 1: Financial Literacy - Always visible */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {isCentralAsia
                          ? "Бесплатный курс финансовой грамотности"
                          : "Start with the Free Financial Literacy Course"}
                      </h3>
                      <span className="text-sm text-[#C9922A] font-medium">
                        {isCentralAsia ? "АКТИВАЦИЯ" : "ACTIVATE"}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed ml-14">
                    {isCentralAsia
                      ? "Без заявки. Без оплаты. Научитесь составлять бюджет, копить, управлять долгами и планировать будущее. Курс доступен в форматах 6 и 10 недель. Это начало пути — и здесь вы доказываете себе, что можете идти до конца."
                      : "No application. No fee. Learn real-world budgeting, saving, debt management, and financial planning. Available in 6-week and 10-week formats. This is where everyone begins -- and where you prove to yourself that you can follow through."}
                  </p>
                  <div className="ml-14 mt-4">
                    <Link to="/programs/financial-literacy">
                      <Button className="bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 text-white">
                        {isCentralAsia ? "Начать бесплатный курс" : "Start the Free Course"}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Stage 2: Business Creation - Always visible */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C9922A] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {isCentralAsia
                          ? "Обучение созданию бизнеса"
                          : "Business Creation Training"}
                      </h3>
                      <span className="text-sm text-[#C9922A] font-medium">
                        {isCentralAsia ? "ПОДГОТОВКА" : "EQUIP"}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed ml-14">
                    {isCentralAsia
                      ? "Для тех, кто завершил курс финансовой грамотности и готов идти дальше. Двенадцать недель практического обучения: бизнес-планирование, исследование рынка и подготовка к запуску. Работа с наставником, который сам построил бизнес."
                      : "For those who complete the financial literacy course and want to go further. Twelve weeks of hands-on business planning, market research, and launch preparation. You'll work with a mentor who has built something real."}
                  </p>
                </div>

                {/* Stage 3: Startup Capital - HIDDEN for Central Asia */}
                {!isRegionCentralAsia && (
                  <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-10 h-10 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        3
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">
                          {isCentralAsia ? "Стартовый капитал" : "Startup Capital"}
                        </h3>
                        <span className="text-sm text-[#C9922A] font-medium">
                          {isCentralAsia ? "ЗАПУСК" : "EMPOWER"}
                        </span>
                      </div>
                    </div>
                    <p className="text-gray-600 leading-relaxed ml-14">
                      {isCentralAsia
                        ? "Не грант. Не благотворительность. Реальная инвестиция в человека, который прошёл обучение, построил жизнеспособный план и доказал свою готовность. Это момент, когда месяцы работы превращаются в настоящий бизнес."
                        : "Not a grant. Not charity. A real investment in someone who has completed the training, built a viable plan, and proven they're ready. This is the moment where months of work becomes a real business."}
                    </p>
                  </div>
                )}

                {/* Stage 3/4: Community Leadership - Always visible */}
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#C9922A] text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {isCentralAsia ? "3" : "4"}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {isCentralAsia
                          ? "Обучай, наставляй, веди"
                          : "Teach, Mentor, Lead"}
                      </h3>
                      <span className="text-sm text-[#C9922A] font-medium">
                        {isCentralAsia ? "УМНОЖЕНИЕ" : "MULTIPLY"}
                      </span>
                    </div>
                  </div>
                  <p className="text-gray-600 leading-relaxed ml-14">
                    {isCentralAsia
                      ? "Выпускники обучаются проводить курсы, наставлять новых участников и быть лидерами в своих сообществах. Вы перестаёте быть тем, кто получает помощь, и становитесь тем, кто её даёт. В этом весь смысл."
                      : "Graduates are trained to facilitate courses, mentor new participants, and lead in their communities. You stop being someone who received help and become someone who gives it. That's the whole point."}
                  </p>
                </div>
              </div>

              {/* Zoom Placeholder */}
              <div className="bg-[#C9922A]/10 border border-[#C9922A]/30 rounded-xl p-6 md:p-8 text-center">
                <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">
                  {isCentralAsia
                    ? "Скоро: онлайн-занятия в прямом эфире"
                    : "Live Online Classes Coming Soon"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {isCentralAsia
                    ? "Мы запускаем живые онлайн-занятия, чтобы вы могли присоединиться из любой точки. Подпишитесь, чтобы узнать первыми."
                    : "We're building live group sessions so you can join from anywhere with an internet connection. Be the first to know."}
                </p>
                <Link to="/newsletter">
                  <Button className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white">
                    {isCentralAsia
                      ? "Узнать о старте занятий"
                      : "Get Notified When Registration Opens"}
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* ============================== */}
          {/* SECTION 2: FOR VOLUNTEERS      */}
          {/* ============================== */}
          <section id="for-volunteers" className="scroll-mt-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-sm font-bold tracking-widest text-[#C9922A] mb-4">
                {isCentralAsia ? "ДЛЯ ВОЛОНТЁРОВ" : "FOR VOLUNTEERS"}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {isCentralAsia
                  ? "Поделитесь своим временем и навыками"
                  : "Give Your Time and Skills"}
              </h2>

              <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                <p>
                  {isCentralAsia
                    ? "Вы можете помочь другим пройти тот же путь. Волонтёры -- это наставники, фасилитаторы, организаторы и специалисты, которые делятся своим опытом и временем."
                    : "You don't have to write a check to make a difference. Volunteers are the people who make our programs run -- mentoring entrepreneurs, facilitating courses, organizing events, and sharing their professional skills."}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <Card className="border border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">
                      {isCentralAsia ? "Гибкий график" : "Flexible Commitment"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {isCentralAsia
                        ? "От 2 часов в неделю. Подберём роль под ваше расписание."
                        : "From 2 hours a week to project-based roles. We'll match you to what fits your schedule."}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#C9922A] text-white flex items-center justify-center mx-auto mb-4">
                      <Laptop className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">
                      {isCentralAsia ? "Удалённая работа" : "Remote-Friendly"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {isCentralAsia
                        ? "Большинство ролей доступны онлайн. Помогайте из любой точки мира."
                        : "Most roles can be done from anywhere. Mentor an entrepreneur in Kyrgyzstan from your living room."}
                    </p>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center mx-auto mb-4">
                      <Users className="w-6 h-6" />
                    </div>
                    <h3 className="font-bold text-gray-800 mb-2">
                      {isCentralAsia ? "Обучение" : "Training Provided"}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {isCentralAsia
                        ? "Мы обучим вас всему необходимому. Приходите с желанием помочь -- остальное дадим мы."
                        : "We'll equip you with everything you need. Come with willingness -- we'll provide the rest."}
                    </p>
                  </CardContent>
                </Card>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/volunteer-application">
                  <Button
                    size="lg"
                    className="bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 text-white font-bold px-8 py-4"
                  >
                    {isCentralAsia ? "Подать заявку волонтёра" : "Apply to Volunteer"}
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          {/* ============================== */}
          {/* SECTION 3: FOR DONORS (US only) */}
          {/* ============================== */}
          {!isRegionCentralAsia && (
            <section id="for-donors" className="scroll-mt-24">
              <div className="max-w-6xl mx-auto">
                <div className="text-sm font-bold tracking-widest text-[#C9922A] mb-4">
                  {isCentralAsia ? "ДЛЯ ДОНОРОВ И ПАРТНЁРОВ" : "FOR DONORS & PARTNERS"}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  {isCentralAsia ? "Куда идут ваши деньги" : "Where Your Money Actually Goes"}
                </h2>

                <div className="prose prose-lg max-w-none text-gray-600 mb-12">
                  <p>
                    {isCentralAsia
                      ? "Большинство некоммерческих организаций говорят, что ваше пожертвование «делает разницу». Вот что конкретно делает ваше."
                      : "Most nonprofit donation pages tell you your gift \"makes a difference.\" Here's what yours actually does."}
                  </p>
                  <p>
                    {isCentralAsia
                      ? "BBB работает по четырёхэтапной модели. Каждый, кто получает стартовый капитал, уже прошёл месяцы обучения и планирования. К моменту, когда ваши деньги до него дойдут, он их заслужил. Именно поэтому это работает. Именно этим мы отличаемся от «выпишите чек и надейтесь на лучшее»."
                      : "BBB operates a four-stage model. Every person who receives startup capital has already completed months of training and planning. By the time your money reaches them, they've earned it. That's why it works. That's what makes this different from writing a check and hoping for the best."}
                  </p>
                </div>

                {/* Donation Impact Tiers */}
                <div className="grid md:grid-cols-3 gap-6 mb-12">
                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-[#1B2A4A] mb-2">$150</div>
                      <div className="text-sm font-medium text-[#C9922A] mb-4">
                        {isCentralAsia ? "Операционная поддержка" : "Operations & Support"}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {isCentralAsia
                          ? "Один месяц работы программы -- поддержка систем, сопровождение семей в обучении, обеспечение непрерывности работы."
                          : "One month of program operations -- maintaining systems, supporting families in training, keeping the lights on so the work continues."}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-[#1B2A4A] mb-2">$400</div>
                      <div className="text-sm font-medium text-[#C9922A] mb-4">
                        {isCentralAsia ? "Обучение фасилитатора" : "Train a Local Facilitator"}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {isCentralAsia
                          ? "Три месяца обучения одного местного фасилитатора в Центральной Азии -- человека, который затем обучит более 20 предпринимателей."
                          : "Sponsors three months of training for one local facilitator in Central Asia -- someone who goes on to teach 20+ entrepreneurs."}
                      </p>
                    </CardContent>
                  </Card>

                  <Card className="border border-gray-200 hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-[#1B2A4A] mb-2">{isCentralAsia ? "$2 000–$5 000" : "$2,000-$5,000"}</div>
                      <div className="text-sm font-medium text-[#C9922A] mb-4">
                        {isCentralAsia ? "Запуск бизнеса" : "Launch a Business"}
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {isCentralAsia
                          ? "Стартовый капитал для одного выпускника, прошедшего весь путь. Реальная инвестиция в реального человека. С отслеживанием результатов."
                          : "Startup capital for one graduate who completed the full journey. A real investment in a real person. Tracked to real outcomes."}
                      </p>
                    </CardContent>
                  </Card>
                </div>

                {/* Why BBB is Different - Donor Perspective */}
                <div className="bg-[#1B2A4A] rounded-xl p-8 text-white mb-12">
                  <h3 className="text-2xl font-bold mb-6">
                    {isCentralAsia
                      ? "Почему это не похоже на другие организации"
                      : "Why This Isn't Like Other Places You Could Give"}
                  </h3>
                  <div className="space-y-4 text-white/85 leading-relaxed">
                    <p>
                      {isCentralAsia
                        ? "Большинство организаций финансируют всех, кто подаёт заявку. BBB финансирует тех, кто дошёл до конца. Это одно отличие меняет всё."
                        : "Most organizations fund anyone who applies. BBB funds people who finish. That one difference changes everything."}
                    </p>
                    <p>
                      {isCentralAsia
                        ? "Когда вы жертвуете в BBB, вы не надеетесь, что деньги помогут. Вы инвестируете в человека, который уже месяцами доказывал -- стабильным посещением, выполненными заданиями и проверенным бизнес-планом -- что он использует их правильно."
                        : "When you give to BBB, you're not hoping your money will help. You're investing in someone who has already spent months proving -- through consistent attendance, completed coursework, and a validated business plan -- that they will use it well."}
                    </p>
                    <p>
                      {isCentralAsia
                        ? "И каждый выпускник обучается учить других. Один человек, которого вы поддержали, становится тем, кто даёт шанс ещё десяти. Это не маркетинговый ход. Это и есть модель."
                        : "And every graduate is trained to teach others. One person you fund becomes the person who gives ten more people their first chance. That's not marketing language. That's the actual model."}
                    </p>
                  </div>
                </div>

                {/* Donate CTA */}
                <div className="text-center mb-12">
                  <DonateButton
                    size="lg"
                    className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-10 py-5 text-lg"
                  >
                    {isCentralAsia ? "Пожертвовать" : "Donate Now"}
                  </DonateButton>
                  <p className="text-sm text-gray-500 mt-3">
                    {isCentralAsia
                      ? "501(c)(3) -- пожертвования не облагаются налогом. Вы получите квитанцию."
                      : "501(c)(3) tax-deductible -- you'll receive a receipt for your records."}
                  </p>
                </div>

                {/* Corporate Partnerships */}
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {isCentralAsia ? "Партнёрство с организациями" : "Organizational Partnerships"}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6">
                    {isCentralAsia
                      ? "Если ваша компания, фонд или организация хочет сделать более крупный вклад -- спонсировать когорту, профинансировать региональное расширение или предоставить квалифицированных волонтёров -- мы хотим поговорить."
                      : "If your company, foundation, or organization wants to make a larger commitment -- sponsoring a cohort, funding a regional expansion, or providing skilled volunteers -- we'd like to talk."}
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm text-gray-600">
                    <div>
                      <div className="font-medium text-gray-800 mb-1">
                        {isCentralAsia ? "Корпоративные пожертвования" : "Corporate Giving"}
                      </div>
                      {isCentralAsia
                        ? "Совпадающие пожертвования, спонсорство программ, корпоративные благотворительные кампании."
                        : "Matching gifts, program sponsorships, employee giving campaigns."}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 mb-1">
                        {isCentralAsia ? "Профессиональное волонтёрство" : "Skills-Based Volunteering"}
                      </div>
                      {isCentralAsia
                        ? "Бизнес-экспертиза вашей команды напрямую наставляет предпринимателей."
                        : "Your team's business expertise directly mentoring entrepreneurs."}
                    </div>
                    <div>
                      <div className="font-medium text-gray-800 mb-1">
                        {isCentralAsia ? "Стратегическое партнёрство" : "Strategic Partnership"}
                      </div>
                      {isCentralAsia
                        ? "Совместные программы, обмен ресурсами, поддержка регионального расширения."
                        : "Joint programs, resource sharing, regional expansion support."}
                    </div>
                  </div>
                  <Link to="/partner-application">
                    <Button className="bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 text-white font-medium">
                      {isCentralAsia ? "Начать разговор о партнёрстве" : "Start a Partnership Conversation"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            </section>
          )}

          {/* ============================== */}
          {/* SUCCESS STORIES                */}
          {/* ============================== */}
          <section className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              {isCentralAsia ? "Люди, прошедшие этот путь" : "People Who Walked This Path"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {testimonials.map((testimonial, index) => {
                const localized = getLocalizedTestimonial(testimonial, isCentralAsia);
                return (
                  <TestimonialCard key={index} testimonial={{
                    ...testimonial,
                    quote: localized.displayQuote,
                    business: localized.displayBusiness,
                    before: localized.displayBefore,
                    after: localized.displayAfter,
                  }} />
                );
              })}
            </div>
          </section>

          {/* ============================== */}
          {/* FAQ                            */}
          {/* ============================== */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              {isCentralAsia ? "Частые вопросы" : "Common Questions"}
            </h2>
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="text-center mt-8">
              <p className="text-gray-600 mb-4">
                {isCentralAsia ? "Не нашли ответ?" : "Don't see your question?"}
              </p>
              <Link to="/contact">
                <Button variant="outline" className="border-gray-300 text-gray-700">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  {isCentralAsia ? "Связаться с нами" : "Contact Us"}
                </Button>
              </Link>
            </div>
          </section>

          {/* ============================== */}
          {/* FINAL CTA                      */}
          {/* ============================== */}
          <section className="bg-[#1B2A4A] rounded-2xl p-8 md:p-16 text-center text-white max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {isCentralAsia ? "Надежда, которая строит." : "Hope That Builds."}
            </h2>
            <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
              {isCentralAsia
                ? "Каждый человек, который начинает курс, завершает обучение и запускает бизнес, становится доказательством того, что всё возможно. А потом он показывает это другим."
                : "Every person who starts the course, completes the training, and launches a business becomes the proof that where they are is not hopeless. And then they turn around and show someone else the same thing."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Link to="/programs/financial-literacy">
                <Button
                  size="lg"
                  className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8 py-4"
                >
                  {isCentralAsia ? "Начать бесплатный курс" : "Start the Free Course"}
                </Button>
              </Link>
              {!isRegionCentralAsia && (
                <DonateButton
                  size="lg"
                  className="bg-white/20 backdrop-blur border-white text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8 py-4"
                >
                  {isCentralAsia ? "Дайте кому-то шанс" : "Give Someone Their Chance"}
                </DonateButton>
              )}
              <Link to="/volunteer-application">
                <Button
                  size="lg"
                  className="bg-white/10 backdrop-blur border border-white/50 text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8 py-4"
                >
                  {isCentralAsia ? "Стать волонтёром" : "Volunteer With Us"}
                </Button>
              </Link>
            </div>

            <div className="text-sm text-white/60 space-y-1">
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {isCentralAsia ? (
                  <a
                    href="https://wa.me/13865171527"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 hover:text-white/80"
                  >
                    WhatsApp: +1 (386) 517-1527
                  </a>
                ) : (
                  <a
                    href="tel:+13865171527"
                    className="flex items-center gap-2 hover:text-white/80"
                  >
                    <Phone className="w-4 h-4" />
                    (386) 517-1527
                  </a>
                )}
                <a
                  href="mailto:donations@businessesbeyondborders.com"
                  className="flex items-center gap-2 hover:text-white/80"
                >
                  <Mail className="w-4 h-4" />
                  donations@businessesbeyondborders.com
                </a>
              </div>
              <p>
                {isCentralAsia
                  ? "Штаб-квартира в Порт-Оранж, Флорида. Работаем в Центральной Азии."
                  : "Based in Port Orange, Florida. Working in Central Asia."}
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default GetInvolved;
