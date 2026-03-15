import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
  Users,
  Calendar,
  MessageCircle,
  Target,
  ArrowRight,
  CheckCircle2,
  Mail,
  BookOpen,
  Trophy,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRegion } from "@/contexts/RegionContext";
import { siteConfig } from "@/lib/seo";
import { trackConversion } from "@/lib/analytics";

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwNjCpqnF62FS46eygrXMNATbNLGTjQ5UofInsBuSrrBJ6_J8PlSr_WdCoIgfW6bEFNBw/exec";

export default function Cohort() {
  const { isCentralAsia } = useRegion();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !email.trim()) {
      setError(isCentralAsia ? "Введите имя и email." : "Please enter your name and email.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(isCentralAsia ? "Введите корректный email." : "Please enter a valid email address.");
      return;
    }

    setIsSubmitting(true);
    try {
      fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: firstName.trim(),
          email: email.trim(),
          formType: "cohort-interest",
          source: "cohort-interest",
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => {});
      trackConversion("cohort_interest", { method: "cohort_page", form_type: "cohort-interest" });
      setIsSubmitted(true);
    } catch {
      setError(isCentralAsia ? "Ошибка. Попробуйте снова." : "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const pageTitle = isCentralAsia
    ? "Бесплатные когорты — обучение | BBB"
    : "Free Cohort Programs - Now Enrolling | BBB";
  const pageDesc = isCentralAsia
    ? "Запишитесь в бесплатную когорту по финансовой грамотности или созданию бизнеса. Группы формируются сейчас — обучение с фасилитатором и сообществом."
    : "Enroll in a free financial literacy or business creation cohort. Groups forming now with facilitator-led sessions, accountability, and community support.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Event",
    name: isCentralAsia ? "Живая когорта — финансовая грамотность" : "Live Cohort — Financial Literacy & Business Creation",
    description: pageDesc,
    organizer: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    location: {
      "@type": "VirtualLocation",
      url: `${siteConfig.url}/cohort`,
    },
    eventAttendanceMode: "https://schema.org/MixedEventAttendanceMode",
    eventStatus: "https://schema.org/EventScheduled",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
      availability: "https://schema.org/InStock",
    },
  };

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta
          name="keywords"
          content="financial literacy group program, business creation cohort Florida, live cohort course, facilitated financial literacy, entrepreneurship program Volusia County"
        />
        <link rel="canonical" href={`${siteConfig.url}/cohort`} />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />

        <meta property="og:title" content={isCentralAsia ? "Когорты открыты — начните сейчас" : "Free Cohort Programs -- Now Enrolling"} />
        <meta property="og:description" content={pageDesc} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteConfig.url}/cohort`} />
        <meta property="og:image" content={siteConfig.defaultImage} />
        <meta property="og:site_name" content={siteConfig.name} />
        <meta property="og:locale" content={isCentralAsia ? "ru_RU" : "en_US"} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={isCentralAsia ? "Когорты открыты — начните сейчас" : "Free Cohort Programs -- Now Enrolling"} />
        <meta name="twitter:description" content={pageDesc} />
        <meta name="twitter:image" content={siteConfig.defaultImage} />

        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <section className="relative bg-gradient-to-br from-[#1B2A4A] to-[#1B2A4A]/90 text-white pt-28 md:pt-36 pb-16 md:pb-24">
          <div className="container mx-auto px-4 text-center max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6">
              <Users className="w-4 h-4 text-[#C9922A]" />
              <span className="text-sm font-medium text-[#C9922A]">
                {isCentralAsia ? "Групповое обучение" : "Group Learning"}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">
              {isCentralAsia ? "Когорты открыты — начните сейчас" : "Cohorts Are Open -- Start Now"}
            </h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
              {isCentralAsia
                ? "Пройдите обучение вместе с другими участниками под руководством опытного фасилитатора. Группы формируются прямо сейчас."
                : "Learn alongside other participants with an experienced facilitator. Groups are forming now -- grab your free spot."}
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          {/* What is a Cohort */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-4">
              {isCentralAsia ? "Что такое когорта?" : "What is a Cohort?"}
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              {isCentralAsia
                ? "Когорта — это группа из 8–15 участников, которые проходят курс одновременно под руководством обученного фасилитатора. Каждую неделю вы встречаетесь (онлайн или очно) для обсуждений, практических упражнений и взаимной поддержки. Это не лекция — это живое сообщество, где каждый может задать вопрос, поделиться опытом и получить обратную связь."
                : "A cohort is a group of 8–15 participants who go through the course together with a trained facilitator. Each week you meet (online or in-person) for discussions, hands-on exercises, and mutual support. It's not a lecture — it's a living community where everyone can ask questions, share experiences, and get real feedback."}
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              {isCentralAsia
                ? "Фасилитатор — это не учитель. Это человек, который создаёт безопасное пространство для обучения, направляет разговор и помогает каждому участнику применять знания к собственной жизни и бизнесу."
                : "The facilitator isn't a teacher — they're someone who creates a safe space for learning, guides conversations, and helps each participant apply what they learn to their own life and business."}
            </p>
          </section>

          {/* Schedule/Format */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-6">
              {isCentralAsia ? "Расписание и формат" : "Schedule & Format"}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-[#C9922A]/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-[#C9922A]/10 w-10 h-10 rounded-full flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-[#C9922A]" />
                    </div>
                    <h3 className="font-bold text-[#1B2A4A]">
                      {isCentralAsia ? "Финансовая грамотность" : "Financial Literacy"}
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-[#C9922A] flex-shrink-0 mt-0.5" />
                      {isCentralAsia ? "10 недель, 1 встреча в неделю" : "10 weeks, 1 session per week"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-[#C9922A] flex-shrink-0 mt-0.5" />
                      {isCentralAsia ? "Группа 8–15 участников" : "Group of 8–15 participants"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-[#C9922A] flex-shrink-0 mt-0.5" />
                      {isCentralAsia
                        ? "Бюджетирование, управление долгами, накопления и планирование"
                        : "Budgeting, debt management, savings, and financial planning"}
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-[#C9922A]/20">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-[#C9922A]/10 w-10 h-10 rounded-full flex items-center justify-center">
                      <Trophy className="w-5 h-5 text-[#C9922A]" />
                    </div>
                    <h3 className="font-bold text-[#1B2A4A]">
                      {isCentralAsia ? "Создание бизнеса" : "Business Creation"}
                    </h3>
                  </div>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <Calendar className="w-4 h-4 text-[#C9922A] flex-shrink-0 mt-0.5" />
                      {isCentralAsia ? "12 недель, 1 встреча в неделю" : "12 weeks, 1 session per week"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Users className="w-4 h-4 text-[#C9922A] flex-shrink-0 mt-0.5" />
                      {isCentralAsia ? "Группа 8–12 участников" : "Group of 8–12 participants"}
                    </li>
                    <li className="flex items-start gap-2">
                      <Target className="w-4 h-4 text-[#C9922A] flex-shrink-0 mt-0.5" />
                      {isCentralAsia
                        ? "Идея → бизнес-модель → подтверждение → запуск"
                        : "Idea → business model → validation → launch"}
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* What to Expect */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-6">
              {isCentralAsia ? "Чего ожидать" : "What to Expect"}
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="text-center border-[#1B2A4A]/10">
                <CardContent className="pt-6">
                  <Target className="w-8 h-8 text-[#C9922A] mx-auto mb-3" />
                  <h3 className="font-bold text-[#1B2A4A] mb-2">
                    {isCentralAsia ? "Подотчётность" : "Accountability"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isCentralAsia
                      ? "Еженедельные задания, проверка выполнения и поддержка группы помогают вам оставаться на пути."
                      : "Weekly assignments, check-ins, and group support keep you on track and moving forward."}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-[#1B2A4A]/10">
                <CardContent className="pt-6">
                  <MessageCircle className="w-8 h-8 text-[#C9922A] mx-auto mb-3" />
                  <h3 className="font-bold text-[#1B2A4A] mb-2">
                    {isCentralAsia ? "Живые обсуждения" : "Live Discussions"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isCentralAsia
                      ? "Задавайте вопросы, обсуждайте трудности и делитесь победами с людьми, которые понимают ваш путь."
                      : "Ask questions, discuss challenges, and celebrate wins with people who understand your journey."}
                  </p>
                </CardContent>
              </Card>

              <Card className="text-center border-[#1B2A4A]/10">
                <CardContent className="pt-6">
                  <Users className="w-8 h-8 text-[#C9922A] mx-auto mb-3" />
                  <h3 className="font-bold text-[#1B2A4A] mb-2">
                    {isCentralAsia ? "Сообщество" : "Community"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {isCentralAsia
                      ? "Постройте сеть единомышленников, которая продолжит поддерживать вас и после окончания курса."
                      : "Build a network of like-minded peers that continues to support you long after the course ends."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Interest Form */}
          <section className="mb-12 md:mb-16">
            <Card className="border-[#C9922A]/30 bg-gradient-to-br from-white to-[#C9922A]/5">
              <CardContent className="py-10">
                <div className="max-w-md mx-auto text-center">
                  <div className="bg-[#C9922A]/10 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-6 h-6 text-[#C9922A]" />
                  </div>

                  {isSubmitted ? (
                    <>
                      <CheckCircle2 className="w-10 h-10 text-green-600 mx-auto mb-3" />
                      <h3 className="text-xl font-bold text-green-800 mb-2">
                        {isCentralAsia ? "Вы зарегистрированы!" : "You're In!"}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {isCentralAsia
                          ? "Мы свяжемся с вами с деталями о вашей когорте. А пока начните самостоятельный курс!"
                          : "We'll reach out with your cohort details. In the meantime, start the self-paced course below!"}
                      </p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">
                        {isCentralAsia ? "Запишитесь в когорту" : "Reserve Your Free Spot"}
                      </h3>
                      <p className="text-sm text-gray-600 mb-6">
                        {isCentralAsia
                          ? "Оставьте имя и email — мы подберём для вас подходящую группу."
                          : "Drop your name and email and we'll match you with the right group."}
                      </p>
                      <form onSubmit={handleSubmit} className="space-y-3 text-left">
                        <div>
                          <label htmlFor="cohort-name" className="text-xs font-medium text-gray-600 mb-1 block">
                            {isCentralAsia ? "Имя *" : "First Name *"}
                          </label>
                          <Input
                            id="cohort-name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder={isCentralAsia ? "Имя" : "Jane"}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="cohort-email" className="text-xs font-medium text-gray-600 mb-1 block">
                            Email *
                          </label>
                          <Input
                            id="cohort-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={isCentralAsia ? "email@example.com" : "jane@example.com"}
                            required
                          />
                        </div>
                        {error && <p className="text-xs text-red-600">{error}</p>}
                        <Button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold"
                          size="lg"
                        >
                          {isSubmitting
                            ? isCentralAsia ? "Отправка..." : "Reserving..."
                            : isCentralAsia ? "Записаться" : "Reserve My Spot"}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <p className="text-xs text-gray-400 text-center mt-2">
                          {isCentralAsia
                            ? "Бесплатно. Без обязательств. Без спама."
                            : "100% free. No obligations. No spam."}
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* CTAs — self-paced courses + cross-links */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-4">
              {isCentralAsia ? "Начните прямо сейчас — бесплатно" : "Start Right Now -- 100% Free"}
            </h2>
            <p className="text-gray-600 mb-6">
              {isCentralAsia
                ? "Наши курсы доступны для самостоятельного прохождения уже сегодня. Присоединяйтесь к когорте в любой момент."
                : "Our courses are live and available for self-paced learning today. Join a cohort anytime for group support."}
            </p>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/course/financial-literacy">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-[#C9922A]/20 h-full">
                  <CardContent className="pt-6">
                    <BookOpen className="w-6 h-6 text-[#C9922A] mb-2" />
                    <h3 className="font-bold text-[#1B2A4A] mb-1">
                      {isCentralAsia ? "Курс финансовой грамотности" : "Financial Literacy Course"}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {isCentralAsia ? "6 недель • бесплатно" : "6 weeks • completely free"}
                    </p>
                    <span className="text-sm text-[#C9922A] font-medium inline-flex items-center gap-1">
                      {isCentralAsia ? "Начать" : "Start Now"} <ArrowRight className="w-3 h-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
              <Link to="/course/business-creation">
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-[#C9922A]/20 h-full">
                  <CardContent className="pt-6">
                    <Trophy className="w-6 h-6 text-[#C9922A] mb-2" />
                    <h3 className="font-bold text-[#1B2A4A] mb-1">
                      {isCentralAsia ? "Курс создания бизнеса" : "Business Creation Course"}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {isCentralAsia ? "12 недель • бесплатно" : "12 weeks • completely free"}
                    </p>
                    <span className="text-sm text-[#C9922A] font-medium inline-flex items-center gap-1">
                      {isCentralAsia ? "Начать" : "Start Now"} <ArrowRight className="w-3 h-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>

          {/* Additional Cross-Links */}
          <section>
            <div className="flex flex-wrap gap-3 justify-center text-sm">
              <Link to="/get-involved" className="text-[#C9922A] hover:text-[#1B2A4A] font-medium transition-colors">
                {isCentralAsia ? "Другие способы участия →" : "Other Ways to Get Involved →"}
              </Link>
              <span className="text-gray-300">|</span>
              <Link to="/success-stories" className="text-[#C9922A] hover:text-[#1B2A4A] font-medium transition-colors">
                {isCentralAsia ? "Истории выпускников →" : "Graduate Success Stories →"}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
