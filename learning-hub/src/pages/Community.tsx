import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { ArrowRight, Users, MessageCircle, MapPin, GraduationCap, Mail, CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumbs } from "@/components/SEO";
import { useRegion } from "@/contexts/RegionContext";
import { useAuthUser, clerkEnabled } from "@/lib/auth";
import { subscribe } from "@/lib/subscribe";
import { siteConfig, absoluteUrl } from "@/lib/seo";

/**
 * /community — community building hub: how to connect (chat, cohorts,
 * local groups, facilitator pathway) plus a contact / "start a group in my
 * city" form that lands in the email backend.
 */
export default function Community() {
  const { isCentralAsia, language } = useRegion();
  const { user } = useAuthUser();
  const [firstName, setFirstName] = useState(user?.firstName ?? "");
  const [email, setEmail] = useState(user?.email ?? "");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState("");
  const [interest, setInterest] = useState<"cohort" | "facilitator" | "question">("cohort");
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim() || !firstName.trim()) return;
    setState("sending");
    const { ok } = await subscribe({
      email: email.trim(),
      firstName: firstName.trim(),
      language,
      city: city.trim(),
      interests: [interest],
      source: interest === "question" ? "community-question" : interest === "facilitator" ? "facilitator-interest" : "cohort-interest",
      resource: message.trim().slice(0, 500),
      clerkUserId: user?.id,
    });
    setState(ok ? "sent" : "error");
  }

  const ways = [
    {
      Icon: MessageCircle,
      title: isCentralAsia ? "Чат курса" : "Course chat",
      desc: isCentralAsia
        ? "В каждом уроке есть чат с другими учениками того же курса. Задавайте вопросы, делитесь результатами рабочих листов, поддерживайте друг друга."
        : "Every lesson has a chat with other learners on the same course. Ask questions, share worksheet results, encourage each other.",
      to: "/course/financial-literacy/week-1",
      cta: isCentralAsia ? "Открыть первый урок" : "Open the first lesson",
    },
    {
      Icon: Users,
      title: isCentralAsia ? "Живые когорты" : "Live cohorts",
      desc: isCentralAsia
        ? "Группы из 6–12 человек проходят курс вместе с фасилитатором: еженедельные встречи онлайн или лично, ответственность и дружба."
        : "Groups of 6–12 go through a course together with a facilitator: weekly meetings online or in person, accountability, and friendship.",
      to: "/cohort",
      cta: isCentralAsia ? "Записаться в когорту" : "Join a cohort",
    },
    {
      Icon: MapPin,
      title: isCentralAsia ? "Местные группы" : "Local groups",
      desc: isCentralAsia
        ? "Бишкек, Алматы, Ташкент, Ош, Душанбе — и ваш город. Мы помогаем создать WhatsApp/Telegram-группу и найти место для встреч."
        : "Bishkek, Almaty, Tashkent, Osh, Dushanbe — and your city. We help you start a WhatsApp/Telegram group and find a place to meet.",
      to: "#connect",
      cta: isCentralAsia ? "Создать группу в моём городе" : "Start a group in my city",
    },
    {
      Icon: GraduationCap,
      title: isCentralAsia ? "Путь фасилитатора" : "Facilitator pathway",
      desc: isCentralAsia
        ? "Прошли курс? Научитесь вести группу сами. Мы даём методику, материалы и поддержку, чтобы вы умножали результат в своём сообществе."
        : "Finished a course? Learn to lead a group yourself. We provide the method, materials, and support so you can multiply impact in your community.",
      to: "#connect",
      cta: isCentralAsia ? "Хочу стать фасилитатором" : "I want to facilitate",
    },
  ];

  const title = isCentralAsia ? `Сообщество | ${siteConfig.name}` : `Community | ${siteConfig.name}`;
  const description = isCentralAsia
    ? "Чат курса, живые когорты, местные группы и путь фасилитатора. Учитесь вместе с людьми из Центральной Азии и всего мира."
    : "Course chat, live cohorts, local groups, and a facilitator pathway. Learn alongside people across Central Asia and the world.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={absoluteUrl("/community", language)} />
        <meta property="og:image" content={siteConfig.defaultImageUrl} />
      </Helmet>

      <div className="bg-[#1B2A4A] text-white pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div>
            <Breadcrumbs tone="dark" items={[{ name: isCentralAsia ? "Главная" : "Home", url: absoluteUrl("/", language) }, { name: isCentralAsia ? "Сообщество" : "Community", url: absoluteUrl("/community", language) }]} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{isCentralAsia ? "Никто не должен учиться в одиночку" : "No one should learn alone"}</h1>
          <p className="text-lg text-white/85 max-w-2xl">
            {isCentralAsia
              ? "Знания меняют жизнь, когда рядом есть люди. Вот четыре способа найти своих."
              : "Knowledge changes lives when there are people beside you. Here are four ways to find yours."}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-14">
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {ways.map((w) => (
            <Card key={w.title} className="border-gray-200 hover:border-[#C9922A]/60 transition-colors">
              <CardContent className="pt-6 flex flex-col h-full">
                <div className="bg-[#C9922A]/10 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                  <w.Icon className="w-6 h-6 text-[#C9922A]" />
                </div>
                <h2 className="text-xl font-bold text-[#1B2A4A] mb-2">{w.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6 flex-1">{w.desc}</p>
                {w.to.startsWith("#") ? (
                  <a href={w.to} className="text-[#C9922A] font-medium inline-flex items-center gap-1 hover:text-[#1B2A4A]">
                    {w.cta} <ArrowRight className="w-4 h-4" />
                  </a>
                ) : (
                  <Link to={w.to} className="text-[#C9922A] font-medium inline-flex items-center gap-1 hover:text-[#1B2A4A]">
                    {w.cta} <ArrowRight className="w-4 h-4" />
                  </Link>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        <section id="connect" className="max-w-2xl mx-auto scroll-mt-28">
          <h2 className="text-2xl font-bold text-[#1B2A4A] mb-2">{isCentralAsia ? "Свяжитесь с нами" : "Get in touch"}</h2>
          <p className="text-gray-600 mb-6">
            {isCentralAsia
              ? "Хотите когорту, группу в своём городе или стать фасилитатором? Есть вопрос по уроку? Напишите — мы отвечаем на вашем языке."
              : "Want a cohort, a group in your city, or to become a facilitator? Have a question about a lesson? Write to us — we reply in your language."}{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-[#C9922A] underline">
              {siteConfig.email}
            </a>
          </p>
          {state === "sent" ? (
            <Card className="border-green-300 bg-green-50/50">
              <CardContent className="py-8 text-center">
                <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="font-bold text-green-800">{isCentralAsia ? "Спасибо! Мы получили ваше сообщение." : "Thank you! We received your message."}</p>
                <p className="text-sm text-green-700 mt-1">{isCentralAsia ? "Ответим в течение нескольких дней." : "We'll reply within a few days."}</p>
              </CardContent>
            </Card>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 bg-white border border-gray-200 rounded-xl p-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-name" className="text-xs font-medium text-gray-600 mb-1 block">{isCentralAsia ? "Имя *" : "First name *"}</label>
                  <Input id="c-name" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div>
                  <label htmlFor="c-email" className="text-xs font-medium text-gray-600 mb-1 block">Email *</label>
                  <Input id="c-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="c-city" className="text-xs font-medium text-gray-600 mb-1 block">{isCentralAsia ? "Город" : "City"}</label>
                  <Input id="c-city" value={city} onChange={(e) => setCity(e.target.value)} placeholder={isCentralAsia ? "Бишкек" : "Bishkek"} />
                </div>
                <div>
                  <label htmlFor="c-interest" className="text-xs font-medium text-gray-600 mb-1 block">{isCentralAsia ? "Тема" : "Topic"}</label>
                  <select id="c-interest" value={interest} onChange={(e) => setInterest(e.target.value as typeof interest)} className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm">
                    <option value="cohort">{isCentralAsia ? "Хочу в живую когорту / группу" : "Join a live cohort / local group"}</option>
                    <option value="facilitator">{isCentralAsia ? "Хочу стать фасилитатором" : "Become a facilitator"}</option>
                    <option value="question">{isCentralAsia ? "Вопрос по курсу" : "Question about a course"}</option>
                  </select>
                </div>
              </div>
              <div>
                <label htmlFor="c-message" className="text-xs font-medium text-gray-600 mb-1 block">{isCentralAsia ? "Сообщение" : "Message"}</label>
                <Textarea id="c-message" value={message} onChange={(e) => setMessage(e.target.value)} rows={4} maxLength={500} />
              </div>
              {state === "error" && <p className="text-sm text-red-600">{isCentralAsia ? "Не удалось отправить. Напишите нам на email." : "Could not send. Please email us directly."}</p>}
              <Button type="submit" disabled={state === "sending"} className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white w-full sm:w-auto">
                <Send className="mr-2 w-4 h-4" /> {state === "sending" ? (isCentralAsia ? "Отправка..." : "Sending...") : isCentralAsia ? "Отправить" : "Send"}
              </Button>
              {!clerkEnabled && (
                <p className="text-xs text-gray-400 flex items-center gap-1"><Mail className="w-3 h-3" /> {isCentralAsia ? "Мы используем email только для ответа и материалов курса." : "We only use your email to reply and send course material."}</p>
              )}
            </form>
          )}
        </section>
      </div>
    </>
  );
}
