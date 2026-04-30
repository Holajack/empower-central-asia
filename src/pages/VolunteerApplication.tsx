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
  Users,
  CheckCircle2,
  Clock,
  Wifi,
  GraduationCap,
  Heart,
  ArrowRight,
  User,
  Mail,
  Phone,
} from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";
import { trackConversion } from "@/lib/analytics";
import { useFormSettings } from "@/hooks/useFormSettings";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwNjCpqnF62FS46eygrXMNATbNLGTjQ5UofInsBuSrrBJ6_J8PlSr_WdCoIgfW6bEFNBw/exec";

const volunteerSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  volunteerType: z.string().min(1, "Please select a volunteer role"),
  experience: z.string().min(10, "Please describe your relevant experience"),
  availability: z.string().min(1, "Please select your availability"),
  motivation: z.string().min(20, "Please tell us why you want to volunteer"),
});

type VolunteerFormData = z.infer<typeof volunteerSchema>;

const VolunteerApplication = () => {
  const { toast } = useToast();
  const { isCentralAsia } = useRegion();
  const { forms } = useFormSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<VolunteerFormData>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      volunteerType: "",
      experience: "",
      availability: "",
      motivation: "",
    },
  });

  const onSubmit = async (data: VolunteerFormData) => {
    setIsSubmitting(true);
    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          formType: "volunteer",
          submittedAt: new Date().toISOString(),
          ...data,
        }),
      });
      trackConversion("volunteer_apply", { method: "volunteer_application", form_type: "volunteer" });
      setIsSubmitted(true);
      toast({
        title: isCentralAsia ? "Заявка получена" : "Application Received",
        description: isCentralAsia
          ? "Спасибо за желание стать волонтёром. Мы свяжемся с вами в течение нескольких рабочих дней."
          : "Thank you for wanting to volunteer. We'll be in touch within a few business days.",
      });
      form.reset();
    } catch {
      toast({
        title: isCentralAsia ? "Ошибка отправки" : "Submission Error",
        description: isCentralAsia
          ? "Что-то пошло не так. Повторите попытку или напишите нам напрямую."
          : "Something went wrong. Please try again or email us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const roles = [
    {
      icon: GraduationCap,
      title: isCentralAsia ? "Наставник по бизнес-обучению" : "Business Training Mentor",
      time: isCentralAsia ? "2–4 ч/нед." : "2-4 hrs/week",
      description: isCentralAsia
        ? "Помогайте предпринимателям с бизнес-планированием, финансовыми прогнозами и рыночной стратегией. Вас свяжут с человеком, который строит реальный бизнес в Центральной Азии."
        : "Guide entrepreneurs through business planning, financial projections, and market strategy. You'll be matched with someone building a real business in Central Asia.",
    },
    {
      icon: Users,
      title: isCentralAsia ? "Фасилитатор финансовой грамотности" : "Financial Literacy Facilitator",
      time: isCentralAsia ? "3–5 ч/нед. во время курса" : "3-5 hrs/week during cohort",
      description: isCentralAsia
        ? "Совместно проводите наш 6- или 10-недельный курс финансовой грамотности. Вы поможете участникам освоить бюджетирование, накопления, управление долгом и долгосрочное планирование."
        : "Co-facilitate our 6-week or 10-week financial literacy course. You'll help participants learn budgeting, saving, debt management, and long-term planning.",
    },
    {
      icon: Wifi,
      title: isCentralAsia ? "Удалённый волонтёр по навыкам" : "Remote Skills Volunteer",
      time: isCentralAsia ? "Гибко, проектная основа" : "Flexible, project-based",
      description: isCentralAsia
        ? "Применяйте свои профессиональные навыки из любой точки мира — маркетинговая стратегия, бухгалтерский учёт, веб-дизайн, перевод или административная поддержка."
        : "Contribute your professional skills from anywhere -- marketing strategy, accounting, web design, translation, or administrative support.",
    },
    {
      icon: Heart,
      title: isCentralAsia ? "Работа с аудиторией и сообществом" : "Outreach & Community Building",
      time: isCentralAsia ? "2–4 ч/нед." : "2-4 hrs/week",
      description: isCentralAsia
        ? "Помогайте продвигать BBB через социальные сети, мероприятия, презентации и сетевые встречи. Формируйте сеть поддержки, на которую опираются наши предприниматели."
        : "Help spread the word about BBB through social media, events, church presentations, and community networking. Build the support network our entrepreneurs rely on.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>
          {isCentralAsia
            ? "Стать волонтёром | Businesses Beyond Borders"
            : "Volunteer With Us | Businesses Beyond Borders"}
        </title>
        <meta
          name="description"
          content={
            isCentralAsia
              ? "Станьте волонтёром Businesses Beyond Borders. Наставляйте предпринимателей, проводите курсы финансовой грамотности или помогайте удалённо."
              : "Volunteer with Businesses Beyond Borders. Mentor entrepreneurs, facilitate financial literacy courses, or contribute your skills remotely."
          }
        />
        <link rel="canonical" href="https://businessesbeyondborders.com/volunteer-application" />
        <meta
          property="og:title"
          content={
            isCentralAsia
              ? "Стать волонтёром | Businesses Beyond Borders"
              : "Volunteer With Us | Businesses Beyond Borders"
          }
        />
        <meta
          property="og:description"
          content={
            isCentralAsia
              ? "Присоединяйтесь к нашей волонтёрской сети и помогайте предпринимателям Центральной Азии."
              : "Join our volunteer network and help empower entrepreneurs in Central Asia."
          }
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/volunteer-application" />
      </Helmet>

      <div className="min-h-screen bg-gray-50">
        {/* Hero */}
        <div
          className="relative h-[60vh] flex items-center justify-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
          <div className="relative z-10 container mx-auto px-4 text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-up [--animation-delay:100ms]">
              <Users className="w-4 h-4" />
              {isCentralAsia ? "Возможности для волонтёров" : "Volunteer Opportunities"}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
              {forms.volunteer.getHeading(isCentralAsia)}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed">
              {forms.volunteer.getSubheading(isCentralAsia)}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 space-y-16">
          {/* What Volunteering Looks Like */}
          <section className="max-w-4xl mx-auto">
            <div className="text-sm font-bold tracking-widest text-[#C9922A] mb-4">
              {isCentralAsia ? "ЧЕГО ОЖИДАТЬ" : "WHAT TO EXPECT"}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-6">
              {isCentralAsia
                ? "Как выглядит волонтёрство на практике"
                : "What Volunteering Actually Looks Like"}
            </h2>
            <div className="text-gray-600 space-y-4 leading-relaxed text-lg mb-12">
              {isCentralAsia ? (
                <>
                  <p>
                    Волонтёры BBB не раскладывают конверты. Они наставляют реальных людей,
                    строящих реальный бизнес. Каждый волонтёр получает роль, соответствующую
                    его настоящему профессиональному опыту, — а не просто желанию помочь.
                  </p>
                  <p>
                    Большинство волонтёрских задач выполняется удалённо. Вам не нужно
                    находиться в Центральной Азии. Вам нужна последовательность, надёжность
                    и готовность вложить свой опыт в чьё-то будущее.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    BBB volunteers don't stuff envelopes. They mentor real people
                    building real businesses. Every volunteer is matched with a role
                    that uses their actual professional experience -- not just their
                    willingness to help.
                  </p>
                  <p>
                    Most of our volunteering happens remotely. You don't need to be in
                    Central Asia. You need to be consistent, reliable, and willing to
                    invest your expertise in someone else's future.
                  </p>
                </>
              )}
            </div>

            {/* Key expectations */}
            <div className="grid sm:grid-cols-3 gap-6 mb-12">
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <Clock className="w-8 h-8 text-[#C9922A] mx-auto mb-3" />
                <h3 className="font-bold text-[#1B2A4A] mb-2">
                  {isCentralAsia ? "Временные затраты" : "Time Commitment"}
                </h3>
                <p className="text-sm text-gray-600">
                  {isCentralAsia
                    ? "2–5 часов в неделю в зависимости от роли. Гибкий график с учётом вашей занятости."
                    : "2-5 hours per week, depending on role. Flexible scheduling around your availability."}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <Wifi className="w-8 h-8 text-[#C9922A] mx-auto mb-3" />
                <h3 className="font-bold text-[#1B2A4A] mb-2">
                  {isCentralAsia ? "Полностью удалённо" : "Fully Remote"}
                </h3>
                <p className="text-sm text-gray-600">
                  {isCentralAsia
                    ? "Работайте из любого места с интернетом. Видеозвонки, общие документы и постоянная коммуникация."
                    : "Work from anywhere with an internet connection. Video calls, shared documents, and ongoing communication."}
                </p>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 p-6 text-center">
                <GraduationCap className="w-8 h-8 text-[#C9922A] mx-auto mb-3" />
                <h3 className="font-bold text-[#1B2A4A] mb-2">
                  {isCentralAsia ? "Обучение предоставляется" : "Training Provided"}
                </h3>
                <p className="text-sm text-gray-600">
                  {isCentralAsia
                    ? "Мы проводим ориентацию для каждого волонтёра, предоставляем материалы и постоянную поддержку."
                    : "We onboard every volunteer with orientation, materials, and ongoing support from our team."}
                </p>
              </div>
            </div>
          </section>

          {/* Volunteer Roles */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-8">
              {isCentralAsia ? "Доступные роли волонтёров" : "Available Volunteer Roles"}
            </h2>
            <div className="space-y-4">
              {roles.map((role, i) => (
                <div
                  key={i}
                  className="bg-white rounded-xl border border-gray-200 p-6 md:p-8"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-[#C9922A]/10 p-3 rounded-lg flex-shrink-0">
                      <role.icon className="w-6 h-6 text-[#C9922A]" />
                    </div>
                    <div>
                      <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                        <h3 className="text-lg font-bold text-[#1B2A4A]">
                          {role.title}
                        </h3>
                        <span className="text-sm text-[#C9922A] font-medium">
                          {role.time}
                        </span>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {role.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Application Form */}
          <section className="max-w-3xl mx-auto" id="volunteer-form">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-3">
                {isCentralAsia ? "Подать заявку на волонтёрство" : "Apply to Volunteer"}
              </h2>
              <p className="text-gray-600">
                {isCentralAsia
                  ? "Расскажите о себе и о том, какая роль вас интересует. Мы свяжемся, чтобы обсудить следующие шаги."
                  : "Tell us about yourself and what role interests you. We'll reach out to discuss next steps."}
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">
                  {isCentralAsia ? "Заявка получена" : "Application Received"}
                </h3>
                <p className="text-gray-600 mb-6">
                  {forms.volunteer.getSuccessMessage(isCentralAsia)}
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-gray-300"
                >
                  {isCentralAsia ? "Подать другую заявку" : "Submit Another Application"}
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {isCentralAsia ? "Имя" : "First Name"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={isCentralAsia ? "Имя" : "First name"}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>{isCentralAsia ? "Фамилия" : "Last Name"}</FormLabel>
                            <FormControl>
                              <Input
                                placeholder={isCentralAsia ? "Фамилия" : "Last name"}
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
                              {isCentralAsia ? "Электронная почта" : "Email"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="you@email.com"
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
                              {isCentralAsia ? "WhatsApp / Телефон" : "Phone"}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder={
                                  isCentralAsia ? "+7 (999) 123-45-67" : "(386) 555-0123"
                                }
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
                        name="volunteerType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {isCentralAsia
                                ? "Интересующая роль"
                                : "Role You're Interested In"}
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={
                                      isCentralAsia ? "Выберите роль" : "Select a role"
                                    }
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="business-mentor">
                                  {isCentralAsia
                                    ? "Наставник по бизнес-обучению"
                                    : "Business Training Mentor"}
                                </SelectItem>
                                <SelectItem value="financial-facilitator">
                                  {isCentralAsia
                                    ? "Фасилитатор финансовой грамотности"
                                    : "Financial Literacy Facilitator"}
                                </SelectItem>
                                <SelectItem value="skills-volunteer">
                                  {isCentralAsia
                                    ? "Удалённый волонтёр по навыкам"
                                    : "Remote Skills Volunteer"}
                                </SelectItem>
                                <SelectItem value="outreach">
                                  {isCentralAsia
                                    ? "Работа с аудиторией и сообществом"
                                    : "Outreach & Community Building"}
                                </SelectItem>
                                <SelectItem value="open">
                                  {isCentralAsia ? "Открыт к любой роли" : "Open to Anything"}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="availability"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {isCentralAsia ? "Доступность" : "Availability"}
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={
                                      isCentralAsia
                                        ? "Ваша доступность"
                                        : "Your availability"
                                    }
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="2-4-hours">
                                  {isCentralAsia
                                    ? "2–4 часа в неделю"
                                    : "2-4 hours per week"}
                                </SelectItem>
                                <SelectItem value="5-8-hours">
                                  {isCentralAsia
                                    ? "5–8 часов в неделю"
                                    : "5-8 hours per week"}
                                </SelectItem>
                                <SelectItem value="8-plus-hours">
                                  {isCentralAsia
                                    ? "8+ часов в неделю"
                                    : "8+ hours per week"}
                                </SelectItem>
                                <SelectItem value="project-based">
                                  {isCentralAsia
                                    ? "Проектная основа / гибко"
                                    : "Project-based / flexible"}
                                </SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="experience"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {isCentralAsia ? "Соответствующий опыт" : "Relevant Experience"}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={
                                isCentralAsia
                                  ? "Какой профессиональный или волонтёрский опыт вы привносите? Какие навыки могли бы применить?"
                                  : "What professional or volunteer experience do you bring? What skills could you contribute?"
                              }
                              className="min-h-[100px]"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            {isCentralAsia
                              ? "Почему вы хотите стать волонтёром?"
                              : "Why Do You Want to Volunteer?"}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={
                                isCentralAsia
                                  ? "Что привлекает вас в миссии BBB? Почему это важно для вас?"
                                  : "What draws you to BBB's mission? Why is this meaningful to you?"
                              }
                              className="min-h-[100px]"
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
                          ? "Отправка..."
                          : "Submitting..."
                        : forms.volunteer.getButtonLabel(isCentralAsia)}
                      {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      {isCentralAsia
                        ? "Ваши данные конфиденциальны. Мы свяжемся с вами в течение нескольких рабочих дней для обсуждения следующих шагов и оформления."
                        : "Your information is kept confidential. We'll reach out within a few business days to discuss next steps and onboarding."}
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

export default VolunteerApplication;
