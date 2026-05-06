import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
  Handshake,
  Globe,
  Briefcase,
  BookOpen,
  Target,
} from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";
import { trackConversion } from "@/lib/analytics";
import { useFormSettings } from "@/hooks/useFormSettings";
import { getLocalized } from "@/lib/localized";
import {
  useVolunteerApplicationPage,
  getVolunteerCopy,
  getVolunteerHeroIntroParagraphs,
  getVolunteerWhatWeLookForIntro,
  getVolunteerRoleLabel,
  getVolunteerRoleDescription,
  getVolunteerRoleTimeCommitment,
  getVolunteerBenefitLabel,
  getVolunteerBenefitDescription,
  getVolunteerStepTitle,
  getVolunteerStepDescription,
  getVolunteerFaqQuestion,
  getVolunteerFaqAnswer,
} from "@/hooks/useVolunteerApplicationPage";

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

/**
 * Static dropdown option labels that map 1:1 to enum values in
 * `volunteerSchema`. Bilingual but not Studio-editable (changing them
 * would silently break the form-submission contract with Google Sheets).
 */
const VOLUNTEER_TYPE_OPTIONS: Array<{
  value: string;
  en: string;
  ru: string;
}> = [
  {
    value: "business-mentor",
    en: "Business Training Mentor",
    ru: "Наставник по бизнес-обучению",
  },
  {
    value: "financial-facilitator",
    en: "Financial Literacy Facilitator",
    ru: "Фасилитатор финансовой грамотности",
  },
  {
    value: "skills-volunteer",
    en: "Remote Skills Volunteer",
    ru: "Удалённый волонтёр по навыкам",
  },
  {
    value: "outreach",
    en: "Outreach & Community Building",
    ru: "Работа с аудиторией и сообществом",
  },
  { value: "open", en: "Open to Anything", ru: "Открыт к любой роли" },
];

const AVAILABILITY_OPTIONS: Array<{ value: string; en: string; ru: string }> = [
  { value: "2-4-hours", en: "2-4 hours per week", ru: "2–4 часа в неделю" },
  { value: "5-8-hours", en: "5-8 hours per week", ru: "5–8 часов в неделю" },
  {
    value: "8-plus-hours",
    en: "8+ hours per week",
    ru: "8+ часов в неделю",
  },
  {
    value: "project-based",
    en: "Project-based / flexible",
    ru: "Проектная основа / гибко",
  },
];

/** Lucide icon names → component lookup. Keep this in sync with the
 * available icon options in `volunteerApplicationPage` schema. Falls back
 * to GraduationCap if a Studio editor types an unknown icon name. */
const iconMap: Record<string, React.ElementType> = {
  Users,
  CheckCircle2,
  Clock,
  Wifi,
  GraduationCap,
  Heart,
  Handshake,
  Globe,
  Briefcase,
  BookOpen,
  Target,
  Mail,
  Phone,
  User,
};

const renderIcon = (
  name: string | undefined,
  fallback: React.ElementType,
  className?: string,
) => {
  const Icon = (name && iconMap[name]) || fallback;
  return <Icon className={className} />;
};

const VolunteerApplication = () => {
  const { toast } = useToast();
  const { isCentralAsia } = useRegion();
  const { forms } = useFormSettings();
  const { data: page } = useVolunteerApplicationPage();
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
      trackConversion("volunteer_apply", {
        method: "volunteer_application",
        form_type: "volunteer",
      });
      setIsSubmitted(true);
      toast({
        title: getLocalized(
          "Application Received",
          "Заявка получена",
          isCentralAsia,
        ),
        description: getLocalized(
          "Thank you for wanting to volunteer. We'll be in touch within a few business days.",
          "Спасибо за желание стать волонтёром. Мы свяжемся с вами в течение нескольких рабочих дней.",
          isCentralAsia,
        ),
      });
      form.reset();
    } catch {
      toast({
        title: getLocalized(
          "Submission Error",
          "Ошибка отправки",
          isCentralAsia,
        ),
        description: getLocalized(
          "Something went wrong. Please try again or email us directly.",
          "Что-то пошло не так. Повторите попытку или напишите нам напрямую.",
          isCentralAsia,
        ),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Localized copy from CMS singleton ──
  const heroBadge = getVolunteerCopy(page, "heroBadge", isCentralAsia);
  const heroHeadingOverride = getVolunteerCopy(
    page,
    "heroHeading",
    isCentralAsia,
  );
  const heroSubheadingOverride = getVolunteerCopy(
    page,
    "heroSubheading",
    isCentralAsia,
  );
  const heroIntroParagraphs = getVolunteerHeroIntroParagraphs(
    page,
    isCentralAsia,
  );
  const whatWeLookForBadge = getVolunteerCopy(
    page,
    "whatWeLookForBadge",
    isCentralAsia,
  );
  const whatWeLookForHeading = getVolunteerCopy(
    page,
    "whatWeLookForHeading",
    isCentralAsia,
  );
  const whatWeLookForIntro = getVolunteerWhatWeLookForIntro(
    page,
    isCentralAsia,
  );
  const benefitsHeading = getVolunteerCopy(
    page,
    "benefitsHeading",
    isCentralAsia,
  );
  const howItWorksHeading = getVolunteerCopy(
    page,
    "howItWorksHeading",
    isCentralAsia,
  );
  const howItWorksIntro = getVolunteerCopy(
    page,
    "howItWorksIntro",
    isCentralAsia,
  );
  const faqsHeading = getVolunteerCopy(page, "faqsHeading", isCentralAsia);
  const bottomCtaHeading = getVolunteerCopy(
    page,
    "bottomCtaHeading",
    isCentralAsia,
  );
  const bottomCtaSubheading = getVolunteerCopy(
    page,
    "bottomCtaSubheading",
    isCentralAsia,
  );
  const bottomCtaPrimaryLabel = getVolunteerCopy(
    page,
    "bottomCtaPrimaryLabel",
    isCentralAsia,
  );
  const bottomCtaSecondaryLabel = getVolunteerCopy(
    page,
    "bottomCtaSecondaryLabel",
    isCentralAsia,
  );

  // Hero heading/subheading override CMS form heading/subheading if set,
  // otherwise we fall back to the form-level heading/subheading from
  // formSettings (Agent V's wiring).
  const heroHeading =
    heroHeadingOverride || forms.volunteer.getHeading(isCentralAsia);
  const heroSubheading =
    heroSubheadingOverride || forms.volunteer.getSubheading(isCentralAsia);

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
        <link
          rel="canonical"
          href="https://businessesbeyondborders.com/volunteer-application"
        />
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
        <meta
          property="og:url"
          content="https://businessesbeyondborders.com/volunteer-application"
        />
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
              {heroBadge}
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
              {heroHeading}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed">
              {heroSubheading}
            </p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16 space-y-16">
          {/* What Volunteering Looks Like */}
          <section className="max-w-4xl mx-auto">
            {whatWeLookForBadge && (
              <div className="text-sm font-bold tracking-widest text-[#C9922A] mb-4">
                {whatWeLookForBadge}
              </div>
            )}
            <h2 className="text-3xl md:text-4xl font-bold text-[#1B2A4A] mb-6">
              {whatWeLookForHeading}
            </h2>
            {(heroIntroParagraphs.length > 0 ||
              whatWeLookForIntro.length > 0) && (
              <div className="text-gray-600 space-y-4 leading-relaxed text-lg mb-12">
                {heroIntroParagraphs.map((p, i) => (
                  <p key={`hero-intro-${i}`}>{p}</p>
                ))}
                {whatWeLookForIntro.map((p, i) => (
                  <p key={`wwlf-intro-${i}`}>{p}</p>
                ))}
              </div>
            )}

            {/* Key expectations */}
            {page.benefits.length > 0 && (
              <>
                {benefitsHeading && (
                  <h3 className="sr-only">{benefitsHeading}</h3>
                )}
                <div className="grid sm:grid-cols-3 gap-6 mb-12">
                  {page.benefits.map((benefit) => (
                    <div
                      key={benefit._key}
                      className="bg-white rounded-xl border border-gray-200 p-6 text-center"
                    >
                      {renderIcon(
                        benefit.icon,
                        Clock,
                        "w-8 h-8 text-[#C9922A] mx-auto mb-3",
                      )}
                      <h3 className="font-bold text-[#1B2A4A] mb-2">
                        {getVolunteerBenefitLabel(benefit, isCentralAsia)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {getVolunteerBenefitDescription(
                          benefit,
                          isCentralAsia,
                        )}
                      </p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </section>

          {/* Volunteer Roles */}
          {page.whatWeLookFor.length > 0 && (
            <section className="max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-8">
                {howItWorksHeading}
              </h2>
              {howItWorksIntro && (
                <p className="text-gray-600 leading-relaxed mb-6">
                  {howItWorksIntro}
                </p>
              )}
              <div className="space-y-4">
                {page.whatWeLookFor.map((role) => (
                  <div
                    key={role._key}
                    className="bg-white rounded-xl border border-gray-200 p-6 md:p-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className="bg-[#C9922A]/10 p-3 rounded-lg flex-shrink-0">
                        {renderIcon(
                          role.icon,
                          GraduationCap,
                          "w-6 h-6 text-[#C9922A]",
                        )}
                      </div>
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                          <h3 className="text-lg font-bold text-[#1B2A4A]">
                            {getVolunteerRoleLabel(role, isCentralAsia)}
                          </h3>
                          <span className="text-sm text-[#C9922A] font-medium">
                            {getVolunteerRoleTimeCommitment(role, isCentralAsia)}
                          </span>
                        </div>
                        <p className="text-gray-600 leading-relaxed">
                          {getVolunteerRoleDescription(role, isCentralAsia)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* How-it-works steps (optional, only if Studio editors add steps) */}
          {page.howItWorksSteps.length > 0 && (
            <section className="max-w-4xl mx-auto">
              <div className="grid md:grid-cols-2 gap-6">
                {page.howItWorksSteps.map((step) => (
                  <div
                    key={step._key}
                    className="bg-white rounded-xl border border-gray-200 p-6 flex gap-4"
                  >
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center font-bold">
                      {step.stepNumber ?? ""}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1B2A4A] mb-1">
                        {getVolunteerStepTitle(step, isCentralAsia)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {getVolunteerStepDescription(step, isCentralAsia)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* FAQs (optional, only renders if Studio editors add items) */}
          {page.faqs.length > 0 && (
            <section className="max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-6 text-center">
                {faqsHeading}
              </h2>
              <Accordion type="single" collapsible className="w-full">
                {page.faqs.map((faq) => (
                  <AccordionItem
                    key={faq._key}
                    value={faq._key ?? ""}
                    className="bg-white rounded-xl border border-gray-200 mb-3 px-5"
                  >
                    <AccordionTrigger className="text-left font-bold text-[#1B2A4A] hover:no-underline">
                      {getVolunteerFaqQuestion(faq, isCentralAsia)}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {getVolunteerFaqAnswer(faq, isCentralAsia)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}

          {/* Application Form */}
          <section className="max-w-3xl mx-auto" id="volunteer-form">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-3">
                {getLocalized(
                  "Apply to Volunteer",
                  "Подать заявку на волонтёрство",
                  isCentralAsia,
                )}
              </h2>
              <p className="text-gray-600">
                {getLocalized(
                  "Tell us about yourself and what role interests you. We'll reach out to discuss next steps.",
                  "Расскажите о себе и о том, какая роль вас интересует. Мы свяжемся, чтобы обсудить следующие шаги.",
                  isCentralAsia,
                )}
              </p>
            </div>

            {isSubmitted ? (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">
                  {getLocalized(
                    "Application Received",
                    "Заявка получена",
                    isCentralAsia,
                  )}
                </h3>
                <p className="text-gray-600 mb-6">
                  {forms.volunteer.getSuccessMessage(isCentralAsia)}
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-gray-300"
                >
                  {getLocalized(
                    "Submit Another Application",
                    "Подать другую заявку",
                    isCentralAsia,
                  )}
                </Button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                  >
                    <div className="grid md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center gap-2">
                              <User className="w-4 h-4" />
                              {forms.getFieldLabel(
                                "volunteer",
                                "firstName",
                                isCentralAsia,
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={forms.getFieldPlaceholder(
                                  "volunteer",
                                  "firstName",
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
                        name="lastName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {forms.getFieldLabel(
                                "volunteer",
                                "lastName",
                                isCentralAsia,
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder={forms.getFieldPlaceholder(
                                  "volunteer",
                                  "lastName",
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
                                "volunteer",
                                "email",
                                isCentralAsia,
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder={forms.getFieldPlaceholder(
                                  "volunteer",
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
                                "volunteer",
                                "phone",
                                isCentralAsia,
                              )}
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="tel"
                                placeholder={forms.getFieldPlaceholder(
                                  "volunteer",
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
                        name="volunteerType"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>
                              {forms.getFieldLabel(
                                "volunteer",
                                "volunteerType",
                                isCentralAsia,
                              )}
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={forms.getFieldPlaceholder(
                                      "volunteer",
                                      "volunteerType",
                                      isCentralAsia,
                                    )}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {VOLUNTEER_TYPE_OPTIONS.map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value}>
                                    {getLocalized(
                                      opt.en,
                                      opt.ru,
                                      isCentralAsia,
                                    )}
                                  </SelectItem>
                                ))}
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
                              {forms.getFieldLabel(
                                "volunteer",
                                "availability",
                                isCentralAsia,
                              )}
                            </FormLabel>
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue
                                    placeholder={forms.getFieldPlaceholder(
                                      "volunteer",
                                      "availability",
                                      isCentralAsia,
                                    )}
                                  />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                {AVAILABILITY_OPTIONS.map((opt) => (
                                  <SelectItem key={opt.value} value={opt.value}>
                                    {getLocalized(
                                      opt.en,
                                      opt.ru,
                                      isCentralAsia,
                                    )}
                                  </SelectItem>
                                ))}
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
                            {forms.getFieldLabel(
                              "volunteer",
                              "experience",
                              isCentralAsia,
                            )}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={forms.getFieldPlaceholder(
                                "volunteer",
                                "experience",
                                isCentralAsia,
                              )}
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
                            {forms.getFieldLabel(
                              "volunteer",
                              "motivation",
                              isCentralAsia,
                            )}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder={forms.getFieldPlaceholder(
                                "volunteer",
                                "motivation",
                                isCentralAsia,
                              )}
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
                        ? getLocalized(
                            "Submitting...",
                            "Отправка...",
                            isCentralAsia,
                          )
                        : forms.volunteer.getButtonLabel(isCentralAsia)}
                      {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      {getLocalized(
                        "Your information is kept confidential. We'll reach out within a few business days to discuss next steps and onboarding.",
                        "Ваши данные конфиденциальны. Мы свяжемся с вами в течение нескольких рабочих дней для обсуждения следующих шагов и оформления.",
                        isCentralAsia,
                      )}
                    </p>
                  </form>
                </Form>
              </div>
            )}
          </section>

          {/* Bottom CTA (only renders if Studio editors set a heading) */}
          {bottomCtaHeading && (
            <section className="max-w-3xl mx-auto">
              <div className="bg-[#1B2A4A] rounded-2xl p-8 md:p-10 text-center text-white">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">
                  {bottomCtaHeading}
                </h2>
                {bottomCtaSubheading && (
                  <p className="text-white/85 mb-6 max-w-xl mx-auto">
                    {bottomCtaSubheading}
                  </p>
                )}
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  {bottomCtaPrimaryLabel && page.bottomCtaPrimaryUrl && (
                    <Button
                      asChild
                      className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white"
                    >
                      <Link to={page.bottomCtaPrimaryUrl}>
                        {bottomCtaPrimaryLabel}
                      </Link>
                    </Button>
                  )}
                  {bottomCtaSecondaryLabel && page.bottomCtaSecondaryUrl && (
                    <Button
                      asChild
                      variant="outline"
                      className="border-white text-white hover:bg-white hover:text-[#1B2A4A]"
                    >
                      <Link to={page.bottomCtaSecondaryUrl}>
                        {bottomCtaSecondaryLabel}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </>
  );
};

export default VolunteerApplication;
