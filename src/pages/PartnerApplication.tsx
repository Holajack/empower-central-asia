
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Handshake,
  CheckCircle2,
  Globe,
  Users,
  Target,
  Heart,
  ArrowRight,
  Building2,
  Mail,
  Phone,
  User,
} from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";
import { trackConversion } from "@/lib/analytics";
import { useFormSettings } from "@/hooks/useFormSettings";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwNjCpqnF62FS46eygrXMNATbNLGTjQ5UofInsBuSrrBJ6_J8PlSr_WdCoIgfW6bEFNBw/exec";

const partnerSchema = z.object({
  orgName: z.string().min(2, "Organization name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  orgType: z.string().min(1, "Please select your organization type"),
  partnershipInterest: z.string().min(1, "Please select a partnership type"),
  message: z.string().min(20, "Please tell us more about your interest (at least 20 characters)"),
});

type PartnerFormData = z.infer<typeof partnerSchema>;

const PartnerApplication = () => {
  const { toast } = useToast();
  const { isCentralAsia, isRegionCentralAsia } = useRegion();
  const { forms } = useFormSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<PartnerFormData>({
    resolver: zodResolver(partnerSchema),
    defaultValues: {
      orgName: "",
      contactName: "",
      email: "",
      phone: "",
      orgType: "",
      partnershipInterest: "",
      message: "",
    },
  });

  const onSubmit = async (data: PartnerFormData) => {
    setIsSubmitting(true);
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "partner",
          submittedAt: new Date().toISOString(),
          ...data,
        }),
      });
      trackConversion("partner_apply", { method: "partner_application", form_type: "partner" });
      setIsSubmitted(true);
      toast({
        title: isCentralAsia ? "Заявка получена" : "Application Received",
        description: isCentralAsia
          ? "Спасибо за интерес к партнёрству. Мы рассмотрим вашу заявку и свяжемся с вами в ближайшие рабочие дни."
          : "Thank you for your interest. We'll review your application and reach out within a few business days.",
      });
      form.reset();
    } catch {
      toast({
        title: isCentralAsia ? "Ошибка отправки" : "Submission Error",
        description: isCentralAsia
          ? "Что-то пошло не так. Попробуйте ещё раз или напишите нам напрямую."
          : "Something went wrong. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const principles = isCentralAsia
    ? [
        {
          icon: Handshake,
          title: "Взаимное уважение и совместное владение",
          description:
            "Партнёрство строится совместно. Мы не навязываем готовые модели — мы создаём их вместе, опираясь на местные сильные стороны и общие цели.",
        },
        {
          icon: Globe,
          title: "Местные корни, международная поддержка",
          description:
            "Программы реализуют местные лидеры на родных языках. Партнёры обеспечивают культурный контекст; BBB предоставляет учебные материалы и методическую поддержку.",
        },
        {
          icon: Users,
          title: "Прежде всего — развитие потенциала",
          description:
            "Мы передаём знания и ресурсы, чтобы партнёры могли самостоятельно поддерживать и расширять программы. Цель — устойчивое воздействие, а не зависимость.",
        },
        {
          icon: Target,
          title: "Ответственность и прозрачность",
          description:
            "Мы измеряем результаты, открыто публикуем отчёты о достижениях и придерживаемся высочайших стандартов управления некоммерческой организацией.",
        },
      ]
    : [
        {
          icon: Handshake,
          title: "Mutual Respect & Shared Ownership",
          description:
            "Partnerships are co-designed. We don't impose models -- we build together based on local strengths and shared goals.",
        },
        {
          icon: Globe,
          title: "Local Roots, Global Support",
          description:
            "Programs are delivered by local leaders in local languages. Partners provide the cultural context; BBB provides the curriculum and training.",
        },
        {
          icon: Users,
          title: "Capacity Building First",
          description:
            "We transfer knowledge and resources so partners can sustain and expand programs independently. The goal is lasting impact, not dependency.",
        },
        {
          icon: Target,
          title: "Accountability & Transparency",
          description:
            "We measure outcomes, report impact openly, and hold ourselves to the highest standards of nonprofit governance.",
        },
      ];

  return (
    <>
      <Helmet>
        <title>
          {isCentralAsia
            ? "Стать партнёром | Businesses Beyond Borders"
            : "Partner With Us | Businesses Beyond Borders"}
        </title>
        <meta
          name="description"
          content={
            isCentralAsia
              ? "Станьте партнёром Businesses Beyond Borders, чтобы поддержать предпринимателей Центральной Азии. Узнайте о форматах партнёрства и начните диалог."
              : "Partner with Businesses Beyond Borders to empower entrepreneurs in Central Asia. Learn what partnership looks like and start the conversation."
          }
        />
        <link rel="canonical" href="https://businessesbeyondborders.com/partner-application" />
        <meta
          property="og:title"
          content={
            isCentralAsia
              ? "Стать партнёром | Businesses Beyond Borders"
              : "Partner With Us | Businesses Beyond Borders"
          }
        />
        <meta
          property="og:description"
          content={
            isCentralAsia
              ? "Корпоративное, институциональное и НКО-партнёрство для поддержки предпринимателей в Центральной Азии."
              : "Corporate partnerships, church partnerships, and organizational collaborations to empower entrepreneurs in Central Asia."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/partner-application" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div
          className="relative h-[60vh] flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-up [--animation-delay:100ms]">
              <Handshake className="w-4 h-4" />
              {isCentralAsia ? "Организационное партнёрство" : "Organizational Partnerships"}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
              {forms.partner.getHeading(isCentralAsia)}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed">
              {forms.partner.getSubheading(isCentralAsia)}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 space-y-16">
          {/* What Partnership Means */}
          <section className="max-w-4xl mx-auto">
            <div className="text-sm font-bold tracking-widest text-[#C9922A] mb-4">
              {isCentralAsia ? "ПЕРЕД ПОДАЧЕЙ ЗАЯВКИ" : "BEFORE YOU APPLY"}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-6">
              {isCentralAsia
                ? "Что означает партнёрство на самом деле"
                : "What Partnership Actually Means"}
            </h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-lg mb-12">
              {isCentralAsia ? (
                <>
                  <p>
                    Партнёрство с Businesses Beyond Borders — это не логотип на брошюре. Это
                    обязательство идти рядом с предпринимателями Центральной Азии, пока они строят
                    бизнес, меняющий жизнь их семей и местных сообществ.
                  </p>
                  <p>
                    Мы работаем с организациями, компаниями и учреждениями, разделяющими наши
                    ценности: достоинство человека, устойчивость, честность и убеждённость в том,
                    что экономическое развитие — один из самых действенных способов разорвать
                    цикл бедности.
                  </p>
                  <p>
                    Прежде чем заполнить форму ниже, мы хотим, чтобы вы понимали, во что
                    ввязываетесь — и что мы будем ожидать друг от друга.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    A partnership with Businesses Beyond Borders is not a logo on a
                    brochure. It's a commitment to walk alongside entrepreneurs in
                    Central Asia as they build businesses that transform their families
                    and communities.
                  </p>
                  <p>
                    We partner with organizations, churches, businesses, and institutions
                    that share our values: human dignity, sustainability, integrity, and
                    a belief that economic empowerment is one of the most effective ways
                    to break cycles of poverty.
                  </p>
                  <p>
                    Before you fill out the form below, we want you to understand what
                    you're stepping into -- and what we'll ask of each other.
                  </p>
                </>
              )}
            </div>

            {/* Partnership Principles */}
            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {principles.map((p, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 p-6"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-[#C9922A]/10 p-2 rounded-lg">
                      <p.icon className="w-5 h-5 text-[#C9922A]" />
                    </div>
                    <h3 className="font-bold text-[#1B2A4A]">{p.title}</h3>
                  </div>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {p.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Types of Partnership */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-8">
              {isCentralAsia
                ? "Как организации сотрудничают с BBB"
                : "How Organizations Partner With BBB"}
            </h2>
            <div className="space-y-4">
              <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center flex-shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1B2A4A]">
                    {isCentralAsia
                      ? "Корпоративные и бизнес-партнёры"
                      : "Corporate & Business Partners"}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed ml-14">
                  {isCentralAsia
                    ? "Волонтёрские программы для сотрудников, наставничество и консультирование в области бизнеса. Экспертиза вашей команды напрямую помогает предпринимателям Центральной Азии."
                    : "Employee volunteer programs, matching gift campaigns, CSR collaborations, and skills-based volunteering. Your team's business expertise directly mentors entrepreneurs in Central Asia."}
                </p>
              </div>

              {/* Faith-based section — hidden for Central Asian visitors */}
              {!isRegionCentralAsia && (
                <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                  <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-full bg-[#C9922A] text-white flex items-center justify-center flex-shrink-0">
                      <Heart className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-bold text-[#1B2A4A]">
                      Church & Faith-Based Partners
                    </h3>
                  </div>
                  <p className="text-gray-600 leading-relaxed ml-14">
                    Stewardship partnerships, congregational giving programs,
                    service team coordination, and co-facilitation of financial
                    literacy courses. We partner with churches that want to
                    tangibly serve their communities and the world.
                  </p>
                </div>
              )}

              <div className="bg-white rounded-xl border border-gray-200 p-6 md:p-8">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center flex-shrink-0">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1B2A4A]">
                    {isCentralAsia
                      ? "НКО и институциональные партнёры"
                      : "NGO & Institutional Partners"}
                  </h3>
                </div>
                <p className="text-gray-600 leading-relaxed ml-14">
                  {isCentralAsia
                    ? "Совместные программы, обмен ресурсами и региональное расширение. Мы сотрудничаем с организациями в Центральной Азии и по всему миру: НКО, образовательными учреждениями, микрофинансовыми организациями и государственными структурами."
                    : "Joint programs, resource sharing, and regional expansion. We collaborate with organizations in Central Asia and worldwide -- community-based organizations, educational institutions, microfinance providers, and government agencies."}
                </p>
              </div>
            </div>
          </section>

          {/* What We Ask */}
          <section className="max-w-4xl mx-auto">
            <div className="bg-[#1B2A4A] rounded-2xl p-8 md:p-10 text-white">
              <h2 className="text-2xl font-bold mb-6">
                {isCentralAsia ? "Что мы ожидаем от вас" : "What We'll Ask of You"}
              </h2>
              <div className="grid md:grid-cols-2 gap-6 text-white/85 text-sm leading-relaxed">
                <div>
                  <h3 className="font-bold text-white mb-2">
                    {isCentralAsia ? "Общие ценности" : "Values Alignment"}
                  </h3>
                  <p>
                    {isCentralAsia
                      ? "Мы работаем с организациями, приверженными достоинству человека, честности и устойчивому развитию. Мы не принимаем партнёрства, противоречащие нашей миссии или интересам сообществ, которым мы служим."
                      : "We partner with organizations committed to human dignity, integrity, and sustainability. We don't accept partnerships that conflict with our mission or our commitment to the communities we serve."}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">
                    {isCentralAsia ? "Активное участие" : "Active Participation"}
                  </h3>
                  <p>
                    {isCentralAsia
                      ? "Партнёрство — это не просто финансовый взнос. Будь то волонтёрская работа, совместное проведение тренингов или вовлечение вашей команды — мы ждём реального участия."
                      : "Partnership means showing up -- not just writing a check. Whether it's providing volunteers, co-facilitating training, or engaging your team, we ask for meaningful involvement."}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">
                    {isCentralAsia ? "Прозрачность" : "Transparency"}
                  </h3>
                  <p>
                    {isCentralAsia
                      ? "Мы открыто публикуем отчёты о результатах. Мы ожидаем того же от наших партнёров. Регулярное общение, честная обратная связь и взаимная ответственность — основа успешного партнёрства."
                      : "We report impact openly. We expect the same from our partners. Regular communication, honest feedback, and shared accountability make partnerships work."}
                  </p>
                </div>
                <div>
                  <h3 className="font-bold text-white mb-2">
                    {isCentralAsia ? "Долгосрочная перспектива" : "Long-Term Thinking"}
                  </h3>
                  <p>
                    {isCentralAsia
                      ? "Устойчивые изменения требуют времени. Мы отдаём приоритет долгосрочным обязательствам перед разовыми акциями. Предприниматели, которым мы служим, заслуживают постоянства."
                      : "Sustainable change takes time. We prioritize multi-year commitments over one-off engagements. The entrepreneurs we serve deserve consistency."}
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Application Form */}
          <section className="max-w-3xl mx-auto" id="partner-form">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-3">
                {isCentralAsia ? "Начнём диалог" : "Start the Conversation"}
              </h2>
              <p className="text-gray-600">
                {isCentralAsia
                  ? "Это не договор — это начало разговора. Расскажите нам о вашей организации и о том, как вы хотели бы участвовать."
                  : "This isn't a contract -- it's the beginning of a conversation. Tell us about your organization and how you'd like to be involved."}
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">
                  {isCentralAsia ? "Заявка получена" : "Application Received"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {forms.partner.getSuccessMessage(isCentralAsia)}
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-gray-300"
                >
                  {isCentralAsia ? "Подать ещё одну заявку" : "Submit Another Application"}
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="orgName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Building2 className="w-4 h-4" />
                              {forms.getFieldLabel(
                                "partner",
                                "orgName",
                                isCentralAsia,
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={forms.getFieldPlaceholder(
                                  "partner",
                                  "orgName",
                                  isCentralAsia,
                                )}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="contactName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {forms.getFieldLabel(
                                "partner",
                                "contactName",
                                isCentralAsia,
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={forms.getFieldPlaceholder(
                                  "partner",
                                  "contactName",
                                  isCentralAsia,
                                )}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Mail className="w-4 h-4" />
                              {forms.getFieldLabel(
                                "partner",
                                "email",
                                isCentralAsia,
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder={forms.getFieldPlaceholder(
                                  "partner",
                                  "email",
                                  isCentralAsia,
                                )}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <Phone className="w-4 h-4" />
                              {forms.getFieldLabel(
                                "partner",
                                "phone",
                                isCentralAsia,
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder={forms.getFieldPlaceholder(
                                  "partner",
                                  "phone",
                                  isCentralAsia,
                                )}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="orgType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {forms.getFieldLabel(
                                "partner",
                                "orgType",
                                isCentralAsia,
                              )}
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={forms.getFieldPlaceholder(
                                      "partner",
                                      "orgType",
                                      isCentralAsia,
                                    )}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {isCentralAsia ? (
                                  <>
                                    <SelectItem value="business">Компания / Корпорация</SelectItem>
                                    <SelectItem value="nonprofit">НКО / НПО</SelectItem>
                                    <SelectItem value="education">
                                      Образовательное учреждение
                                    </SelectItem>
                                    <SelectItem value="government">
                                      Государственная структура
                                    </SelectItem>
                                    <SelectItem value="foundation">Фонд</SelectItem>
                                    <SelectItem value="other">Другое</SelectItem>
                                  </>
                                ) : (
                                  <>
                                    <SelectItem value="business">Business / Corporation</SelectItem>
                                    <SelectItem value="church">Church / Faith-Based</SelectItem>
                                    <SelectItem value="nonprofit">Nonprofit / NGO</SelectItem>
                                    <SelectItem value="education">
                                      Educational Institution
                                    </SelectItem>
                                    <SelectItem value="government">Government Agency</SelectItem>
                                    <SelectItem value="foundation">Foundation</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="partnershipInterest"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {forms.getFieldLabel(
                                "partner",
                                "partnershipInterest",
                                isCentralAsia,
                              )}
                            </FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={forms.getFieldPlaceholder(
                                      "partner",
                                      "partnershipInterest",
                                      isCentralAsia,
                                    )}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {isCentralAsia ? (
                                  <>
                                    <SelectItem value="volunteer">
                                      Волонтёрство сотрудников / команды
                                    </SelectItem>
                                    <SelectItem value="skills">
                                      Наставничество на основе экспертизы
                                    </SelectItem>
                                    <SelectItem value="joint-program">
                                      Разработка совместных программ
                                    </SelectItem>
                                    <SelectItem value="resource-sharing">
                                      Обмен ресурсами
                                    </SelectItem>
                                    <SelectItem value="exploring">
                                      Ещё изучаю возможности
                                    </SelectItem>
                                  </>
                                ) : (
                                  <>
                                    <SelectItem value="financial">
                                      Financial Support / Sponsorship
                                    </SelectItem>
                                    <SelectItem value="volunteer">
                                      Employee / Team Volunteering
                                    </SelectItem>
                                    <SelectItem value="skills">Skills-Based Mentoring</SelectItem>
                                    <SelectItem value="joint-program">
                                      Joint Program Development
                                    </SelectItem>
                                    <SelectItem value="church-stewardship">
                                      Church Stewardship Partnership
                                    </SelectItem>
                                    <SelectItem value="resource-sharing">
                                      Resource Sharing
                                    </SelectItem>
                                    <SelectItem value="exploring">
                                      Still Exploring Options
                                    </SelectItem>
                                  </>
                                )}
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {forms.getFieldLabel(
                              "partner",
                              "message",
                              isCentralAsia,
                            )}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={forms.getFieldPlaceholder(
                                "partner",
                                "message",
                                isCentralAsia,
                              )}
                              className="min-h-[120px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-12 text-lg font-semibold bg-[#C9922A] hover:bg-[#C9922A]/90 text-white"
                    >
                      {isSubmitting
                        ? isCentralAsia
                          ? "Отправляем..."
                          : "Submitting..."
                        : forms.partner.getButtonLabel(isCentralAsia)}
                      {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      {isCentralAsia
                        ? "Ваши данные конфиденциальны. Мы свяжемся с вами в ближайшие рабочие дни для вводного звонка."
                        : "Your information is kept confidential. We'll reach out within a few business days to schedule an introductory call."}
                    </p>
                  </form>
                </Form>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default PartnerApplication;
