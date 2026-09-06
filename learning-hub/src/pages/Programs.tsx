import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Briefcase, Users, Handshake, CheckCircle2, Clock, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Breadcrumbs } from "@/components/SEO";
import { useRegion } from "@/contexts/RegionContext";
import { siteConfig, absoluteUrl, generateFAQSchema } from "@/lib/seo";
import { businessModules } from "@/data/business-course";
import { leadershipModules } from "@/data/leadership-course";
import { getLocalizedWeeks } from "@/data/ru";

/**
 * /programs — the learning path overview. Four stages:
 *   1. Financial Literacy → 2. Business Creation → 3. Leadership → 4. Community
 */
export default function Programs() {
  const { isCentralAsia, language } = useRegion();
  const courseWeeks = getLocalizedWeeks("financial-literacy", language);
  const businessCourseWeeks = getLocalizedWeeks("business-creation", language);
  const leadershipCourseWeeks = getLocalizedWeeks("leadership-development", language);

  const stages = [
    {
      Icon: BookOpen,
      to: "/course/financial-literacy",
      stage: isCentralAsia ? "Этап 1 · Основа" : "Stage 1 · Foundation",
      title: isCentralAsia ? "Финансовая грамотность" : "Financial Literacy",
      duration: isCentralAsia ? "6 недель · 36 уроков" : "6 weeks · 36 lessons",
      desc: isCentralAsia
        ? "Узнайте, куда уходят деньги, составьте бюджет с нуля, выберите стратегию погашения долгов и создайте подушку безопасности. Открыт для всех — без предварительных требований."
        : "See where your money goes, build a zero-based budget, choose a debt payoff strategy, and start an emergency fund. Open to everyone — no prerequisites.",
      weeks: courseWeeks.map((w) => ({ n: w.week, title: w.title })),
    },
    {
      Icon: Briefcase,
      to: "/course/business-creation",
      stage: isCentralAsia ? "Этап 2 · Развитие бизнеса" : "Stage 2 · Business Development",
      title: isCentralAsia ? "Создание бизнеса" : "Business Creation",
      duration: isCentralAsia ? "12 недель · 72 урока" : "12 weeks · 72 lessons",
      desc: isCentralAsia
        ? "Методология бережливого стартапа для реальных условий: интервью с клиентами, ценностное предложение, бизнес-модель, проверка гипотез, MVP, финансы и первые продажи."
        : "Lean-startup methodology for real-world conditions: customer interviews, value proposition, business model canvas, assumption testing, MVP, finances, and first traction.",
      weeks: businessCourseWeeks.map((w) => ({ n: w.week, title: w.title })),
      modules: businessModules.map((m) => ({ title: m.title, weeks: m.weeks })),
    },
    {
      Icon: Users,
      to: "/course/leadership-development",
      stage: isCentralAsia ? "Этап 3 · Умножение" : "Stage 3 · Multiply",
      title: isCentralAsia ? "Развитие лидерства" : "Leadership Development",
      duration: isCentralAsia ? "12 недель · 72 урока" : "12 weeks · 72 lessons",
      desc: isCentralAsia
        ? "Лидерство собой, другими, командами и организациями — на основе проверенных моделей (Кови, Гоулман, Такман, Коттер, Ленсиони, Максвелл) с кейсами из Центральной Азии."
        : "Lead yourself, others, teams, and organizations using proven frameworks (Covey, Goleman, Tuckman, Kotter, Lencioni, Maxwell) with Central Asian case studies.",
      weeks: leadershipCourseWeeks.map((w) => ({ n: w.week, title: w.title })),
      modules: leadershipModules.map((m) => ({ title: m.title, weeks: m.weeks })),
    },
    {
      Icon: Handshake,
      to: "/community",
      stage: isCentralAsia ? "Этап 4 · Сообщество" : "Stage 4 · Community",
      title: isCentralAsia ? "Сообщество и когорты" : "Community & Cohorts",
      duration: isCentralAsia ? "Постоянно" : "Ongoing",
      desc: isCentralAsia
        ? "Чат курса, живые группы с фасилитатором, местные встречи и путь к роли фасилитатора, чтобы учить других в своём городе."
        : "Course chat, facilitator-led live groups, local meetups, and a facilitator pathway so you can teach others in your own city.",
      weeks: [],
    },
  ];

  const faqs = isCentralAsia
    ? [
        { question: "В каком порядке проходить курсы?", answer: "Мы рекомендуем начать с финансовой грамотности, затем создание бизнеса и лидерство. Но каждый курс самостоятелен — можно начать с любого." },
        { question: "Как устроена неделя?", answer: "Каждая неделя состоит из 6 дней: обзор и цели, два дня глубокого урока, интерактивный рабочий лист, практика в реальной жизни и итоги недели. Неделя открывается после завершения предыдущей." },
        { question: "Есть ли сертификат?", answer: "После завершения курса вы получаете итоговый документ в своём аккаунте (рабочие листы и план действий), который можно распечатать." },
        { question: "Можно ли учиться на телефоне?", answer: "Да, сайт полностью адаптирован под мобильные устройства; прогресс сохраняется в аккаунте." },
      ]
    : [
        { question: "What order should I take the courses in?", answer: "We recommend starting with Financial Literacy, then Business Creation, then Leadership. Each course stands on its own, so you can begin anywhere." },
        { question: "How is a week structured?", answer: "Each week has 6 days: overview and goals, two lesson deep-dives, an interactive worksheet, real-world practice, and a wrap-up. The next week unlocks when you complete the current one." },
        { question: "Is there a certificate?", answer: "When you finish a course you get a printable completion summary in your account (your worksheets and action plan)." },
        { question: "Can I learn on my phone?", answer: "Yes. The site is fully mobile-friendly and progress is saved to your account." },
      ];

  const title = isCentralAsia ? `Программы обучения | ${siteConfig.name}` : `Learning Path & Programs | ${siteConfig.name}`;
  const description = isCentralAsia
    ? "Четыре этапа: финансовая грамотность, создание бизнеса, лидерство и сообщество. Бесплатные онлайн-курсы на русском и английском."
    : "Four stages: financial literacy, business creation, leadership, and community. Free online courses in English and Russian.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={absoluteUrl("/programs", language)} />
        <meta property="og:image" content={siteConfig.defaultImageUrl} />
        <script type="application/ld+json">{JSON.stringify(generateFAQSchema(faqs))}</script>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            name: isCentralAsia ? "Программы обучения" : "Learning programs",
            itemListElement: stages.slice(0, 3).map((s, i) => ({
              "@type": "ListItem",
              position: i + 1,
              name: s.title,
              url: absoluteUrl(s.to, language),
            })),
          })}
        </script>
      </Helmet>

      <div className="bg-[#1B2A4A] text-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-white/70">
            <Breadcrumbs items={[{ name: isCentralAsia ? "Главная" : "Home", url: absoluteUrl("/", language) }, { name: isCentralAsia ? "Программы" : "Programs", url: absoluteUrl("/programs", language) }]} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{isCentralAsia ? "Путь обучения" : "The learning path"}</h1>
          <p className="text-lg text-white/85 max-w-2xl">
            {isCentralAsia
              ? "Четыре этапа, которые ведут от контроля над деньгами к собственному бизнесу и лидерству в сообществе. Каждый этап бесплатный, самостоятельный и доступен на двух языках."
              : "Four stages that take you from control over your money to your own business and leadership in your community. Every stage is free, self-paced, and available in two languages."}
          </p>
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-white/80">
            <span className="flex items-center gap-2"><Clock className="w-4 h-4 text-[#C9922A]" /> {isCentralAsia ? "15–30 минут в день" : "15–30 minutes a day"}</span>
            <span className="flex items-center gap-2"><Globe className="w-4 h-4 text-[#C9922A]" /> {isCentralAsia ? "Русский и английский" : "English and Russian"}</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-[#C9922A]" /> {isCentralAsia ? "Бесплатно навсегда" : "Free forever"}</span>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14 space-y-10">
        {stages.map((s, idx) => (
          <Card key={s.to} className="border-gray-200 overflow-hidden">
            <CardContent className="p-0">
              <div className="grid md:grid-cols-[2fr_3fr]">
                <div className="p-8 bg-gray-50 border-b md:border-b-0 md:border-r border-gray-200">
                  <p className="text-xs font-semibold uppercase tracking-wide text-[#C9922A] mb-3">{s.stage}</p>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-[#1B2A4A] text-white w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0">
                      <s.Icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#1B2A4A]">{s.title}</h2>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">{s.duration}</p>
                  <p className="text-gray-700 leading-relaxed mb-6">{s.desc}</p>
                  <Link to={s.to}>
                    <Button className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white">
                      {idx < 3 ? (isCentralAsia ? "Открыть курс" : "Open course") : isCentralAsia ? "Присоединиться" : "Join the community"}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                <div className="p-8">
                  {s.weeks.length > 0 ? (
                    <>
                      <h3 className="font-bold text-[#1B2A4A] mb-3">{isCentralAsia ? "Программа по неделям" : "Week-by-week syllabus"}</h3>
                      {s.modules ? (
                        <Accordion type="multiple" className="w-full">
                          {s.modules.map((m, mi) => (
                            <AccordionItem key={m.title} value={`m${mi}`}>
                              <AccordionTrigger className="text-sm font-semibold text-[#1B2A4A]">
                                {isCentralAsia ? `Модуль ${mi + 1}` : `Module ${mi + 1}`}: {m.title}
                              </AccordionTrigger>
                              <AccordionContent>
                                <ol className="space-y-1.5">
                                  {s.weeks.filter((w) => m.weeks.includes(w.n)).map((w) => (
                                    <li key={w.n} className="text-sm text-gray-700 flex gap-2">
                                      <span className="text-[#C9922A] font-semibold w-16 flex-shrink-0">{isCentralAsia ? `Нед. ${w.n}` : `Week ${w.n}`}</span>
                                      <Link to={`${s.to}/week-${w.n}`} className="hover:text-[#C9922A]">{w.title}</Link>
                                    </li>
                                  ))}
                                </ol>
                              </AccordionContent>
                            </AccordionItem>
                          ))}
                        </Accordion>
                      ) : (
                        <ol className="space-y-2">
                          {s.weeks.map((w) => (
                            <li key={w.n} className="text-sm text-gray-700 flex gap-2">
                              <span className="text-[#C9922A] font-semibold w-16 flex-shrink-0">{isCentralAsia ? `Нед. ${w.n}` : `Week ${w.n}`}</span>
                              <Link to={`${s.to}/week-${w.n}`} className="hover:text-[#C9922A]">{w.title}</Link>
                            </li>
                          ))}
                        </ol>
                      )}
                    </>
                  ) : (
                    <ul className="space-y-3">
                      {(isCentralAsia
                        ? ["Чат курса в каждом уроке", "Живые когорты с фасилитатором (6–12 человек)", "Локальные встречи и WhatsApp/Telegram-группы", "Путь фасилитатора: научитесь вести группу сами"]
                        : ["Course chat inside every lesson", "Facilitator-led live cohorts (6–12 people)", "Local meetups and WhatsApp/Telegram groups", "Facilitator pathway: learn to lead a group yourself"]
                      ).map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                          <CheckCircle2 className="w-4 h-4 text-[#C9922A] mt-0.5 flex-shrink-0" /> {item}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}

        <section className="max-w-3xl mx-auto pt-6">
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-4">{isCentralAsia ? "Частые вопросы" : "Frequently asked questions"}</h2>
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((f, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left font-semibold text-[#1B2A4A]">{f.question}</AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed">{f.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      </div>
    </>
  );
}
