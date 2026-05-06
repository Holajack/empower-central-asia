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
  Briefcase,
  BookOpen,
  GraduationCap,
  Wifi,
  Clock,
} from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";
import { trackConversion } from "@/lib/analytics";
import { useFormSettings } from "@/hooks/useFormSettings";
import { getLocalized } from "@/lib/localized";
import {
  usePartnerApplicationPage,
  getPartnerCopy,
  getPartnerHeroIntroParagraphs,
  getPartnerWhatWeLookForIntro,
  getPartnershipTierName,
  getPartnershipTierDescription,
  getPartnershipTierIdealFor,
  getPartnerStepTitle,
  getPartnerStepDescription,
  getPartnerBenefitLabel,
  getPartnerBenefitDescription,
  getPartnerFaqQuestion,
  getPartnerFaqAnswer,
} from "@/hooks/usePartnerApplicationPage";

const GOOGLE_SHEET_URL =
  "https://script.google.com/macros/s/AKfycbwNjCpqnF62FS46eygrXMNATbNLGTjQ5UofInsBuSrrBJ6_J8PlSr_WdCoIgfW6bEFNBw/exec";

const partnerSchema = z.object({
  orgName: z.string().min(2, "Organization name is required"),
  contactName: z.string().min(2, "Contact name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  orgType: z.string().min(1, "Please select your organization type"),
  partnershipInterest: z
    .string()
    .min(1, "Please select a partnership type"),
  message: z
    .string()
    .min(20, "Please tell us more about your interest (at least 20 characters)"),
});

type PartnerFormData = z.infer<typeof partnerSchema>;

/**
 * Static dropdown option labels that map 1:1 to enum values in
 * `partnerSchema`. Bilingual but not Studio-editable (changing them
 * would silently break the form-submission contract with Google Sheets).
 *
 * `centralAsiaOnly` / `globalOnly` toggle which options appear depending
 * on the visitor's detected region — e.g. faith-based partnerships are
 * hidden in CA but the rest are universal.
 */
const ORG_TYPE_OPTIONS: Array<{
  value: string;
  en: string;
  ru: string;
  hideForCentralAsia?: boolean;
}> = [
  { value: "business", en: "Business / Corporation", ru: "Компания / Корпорация" },
  {
    value: "church",
    en: "Church / Faith-Based",
    ru: "Церковь / религиозная организация",
    hideForCentralAsia: true,
  },
  { value: "nonprofit", en: "Nonprofit / NGO", ru: "НКО / НПО" },
  {
    value: "education",
    en: "Educational Institution",
    ru: "Образовательное учреждение",
  },
  {
    value: "government",
    en: "Government Agency",
    ru: "Государственная структура",
  },
  { value: "foundation", en: "Foundation", ru: "Фонд" },
  { value: "other", en: "Other", ru: "Другое" },
];

const PARTNERSHIP_INTEREST_OPTIONS: Array<{
  value: string;
  en: string;
  ru: string;
  hideForCentralAsia?: boolean;
}> = [
  {
    value: "financial",
    en: "Financial Support / Sponsorship",
    ru: "Финансовая поддержка / спонсорство",
    hideForCentralAsia: true,
  },
  {
    value: "volunteer",
    en: "Employee / Team Volunteering",
    ru: "Волонтёрство сотрудников / команды",
  },
  {
    value: "skills",
    en: "Skills-Based Mentoring",
    ru: "Наставничество на основе экспертизы",
  },
  {
    value: "joint-program",
    en: "Joint Program Development",
    ru: "Разработка совместных программ",
  },
  {
    value: "church-stewardship",
    en: "Church Stewardship Partnership",
    ru: "Партнёрство со служением церкви",
    hideForCentralAsia: true,
  },
  {
    value: "resource-sharing",
    en: "Resource Sharing",
    ru: "Обмен ресурсами",
  },
  {
    value: "exploring",
    en: "Still Exploring Options",
    ru: "Ещё изучаю возможности",
  },
];

/** Lucide icon names → component lookup. Keep this in sync with the
 * available icon options in `partnerApplicationPage` schema. */
const iconMap: Record<string, React.ElementType> = {
  Handshake,
  CheckCircle2,
  Globe,
  Users,
  Target,
  Heart,
  Building2,
  Mail,
  Phone,
  User,
  Briefcase,
  BookOpen,
  GraduationCap,
  Wifi,
  Clock,
};

const renderIcon = (
  name: string | undefined,
  fallback: React.ElementType,
  className?: string,
) => {
  const Icon = (name && iconMap[name]) || fallback;
  return <Icon className={className} />;
};

const PartnerApplication = () => {
  const { toast } = useToast();
  const { isCentralAsia, isRegionCentralAsia } = useRegion();
  const { forms } = useFormSettings();
  const { data: page } = usePartnerApplicationPage();
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
      trackConversion("partner_apply", {
        method: "partner_application",
        form_type: "partner",
      });
      setIsSubmitted(true);
      toast({
        title: getLocalized(
          "Application Received",
          "Заявка получена",
          isCentralAsia,
        ),
        description: getLocalized(
          "Thank you for your interest. We'll review your application and reach out within a few business days.",
          "Спасибо за интерес к партнёрству. Мы рассмотрим вашу заявку и свяжемся с вами в ближайшие рабочие дни.",
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
          "Что-то пошло не так. Попробуйте ещё раз или напишите нам напрямую.",
          isCentralAsia,
        ),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── Localized copy from CMS singleton ──
  const heroBadge = getPartnerCopy(page, "heroBadge", isCentralAsia);
  const heroHeadingOverride = getPartnerCopy(
    page,
    "heroHeading",
    isCentralAsia,
  );
  const heroSubheadingOverride = getPartnerCopy(
    page,
    "heroSubheading",
    isCentralAsia,
  );
  const heroIntroParagraphs = getPartnerHeroIntroParagraphs(
    page,
    isCentralAsia,
  );
  const whatWeLookForBadge = getPartnerCopy(
    page,
    "whatWeLookForBadge",
    isCentralAsia,
  );
  const whatWeLookForHeading = getPartnerCopy(
    page,
    "whatWeLookForHeading",
    isCentralAsia,
  );
  const whatWeLookForIntro = getPartnerWhatWeLookForIntro(
    page,
    isCentralAsia,
  );
  const howItWorksHeading = getPartnerCopy(
    page,
    "howItWorksHeading",
    isCentralAsia,
  );
  const howItWorksIntro = getPartnerCopy(
    page,
    "howItWorksIntro",
    isCentralAsia,
  );
  const benefitsHeading = getPartnerCopy(
    page,
    "benefitsHeading",
    isCentralAsia,
  );
  const faqsHeading = getPartnerCopy(page, "faqsHeading", isCentralAsia);
  const bottomCtaHeading = getPartnerCopy(
    page,
    "bottomCtaHeading",
    isCentralAsia,
  );
  const bottomCtaSubheading = getPartnerCopy(
    page,
    "bottomCtaSubheading",
    isCentralAsia,
  );
  const bottomCtaPrimaryLabel = getPartnerCopy(
    page,
    "bottomCtaPrimaryLabel",
    isCentralAsia,
  );
  const bottomCtaSecondaryLabel = getPartnerCopy(
    page,
    "bottomCtaSecondaryLabel",
    isCentralAsia,
  );

  const heroHeading =
    heroHeadingOverride || forms.partner.getHeading(isCentralAsia);
  const heroSubheading =
    heroSubheadingOverride || forms.partner.getSubheading(isCentralAsia);

  // Filter out cards that should hide for Central Asian visitors.
  const visiblePrinciples = page.whatWeLookFor.filter(
    (tier) => !(tier.hideForCentralAsia && isRegionCentralAsia),
  );

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
        <link
          rel="canonical"
          href="https://businessesbeyondborders.com/partner-application"
        />
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
        <meta
          property="og:url"
          content="https://businessesbeyondborders.com/partner-application"
        />
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
          {/* What Partnership Means */}
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

            {/* Partnership Principles */}
            {visiblePrinciples.length > 0 && (
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {visiblePrinciples.map((tier) => {
                  const idealFor = getPartnershipTierIdealFor(
                    tier,
                    isCentralAsia,
                  );
                  return (
                    <div
                      key={tier._key}
                      className="bg-white rounded-xl border border-gray-200 p-6"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#C9922A]/10 p-2 rounded-lg">
                          {renderIcon(
                            tier.icon,
                            Handshake,
                            "w-5 h-5 text-[#C9922A]",
                          )}
                        </div>
                        <h3 className="font-bold text-[#1B2A4A]">
                          {getPartnershipTierName(tier, isCentralAsia)}
                        </h3>
                      </div>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {getPartnershipTierDescription(tier, isCentralAsia)}
                      </p>
                      {idealFor && (
                        <p className="text-xs text-[#C9922A] font-semibold mt-3">
                          {idealFor}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </section>

          {/* Types of Partnership */}
          {page.howItWorksSteps.length > 0 && (
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
                {page.howItWorksSteps.map((step) => {
                  // Faith-based card hides for visitors detected as in CA.
                  if (step._key === "way-faith" && isRegionCentralAsia) {
                    return null;
                  }
                  return (
                    <div
                      key={step._key}
                      className="bg-white rounded-xl border border-gray-200 p-6 md:p-8"
                    >
                      <div className="flex items-center gap-4 mb-3">
                        <div className="w-10 h-10 rounded-full bg-[#1B2A4A] text-white flex items-center justify-center flex-shrink-0">
                          {renderIcon(
                            step.icon,
                            Building2,
                            "w-5 h-5",
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-[#1B2A4A]">
                          {getPartnerStepTitle(step, isCentralAsia)}
                        </h3>
                      </div>
                      <p className="text-gray-600 leading-relaxed ml-14">
                        {getPartnerStepDescription(step, isCentralAsia)}
                      </p>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {/* What We Ask / What We Offer */}
          {page.benefits.length > 0 && (
            <section className="max-w-4xl mx-auto">
              <div className="bg-[#1B2A4A] rounded-2xl p-8 md:p-10 text-white">
                <h2 className="text-2xl font-bold mb-6">{benefitsHeading}</h2>
                <div className="grid md:grid-cols-2 gap-6 text-white/85 text-sm leading-relaxed">
                  {page.benefits.map((benefit) => (
                    <div key={benefit._key}>
                      <h3 className="font-bold text-white mb-2">
                        {getPartnerBenefitLabel(benefit, isCentralAsia)}
                      </h3>
                      <p>
                        {getPartnerBenefitDescription(benefit, isCentralAsia)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* FAQs (optional) */}
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
                      {getPartnerFaqQuestion(faq, isCentralAsia)}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {getPartnerFaqAnswer(faq, isCentralAsia)}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </section>
          )}

          {/* Application Form */}
          <section className="max-w-3xl mx-auto" id="partner-form">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-3">
                {getLocalized(
                  "Start the Conversation",
                  "Начнём диалог",
                  isCentralAsia,
                )}
              </h2>
              <p className="text-gray-600">
                {getLocalized(
                  "This isn't a contract -- it's the beginning of a conversation. Tell us about your organization and how you'd like to be involved.",
                  "Это не договор — это начало разговора. Расскажите нам о вашей организации и о том, как вы хотели бы участвовать.",
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
                  {forms.partner.getSuccessMessage(isCentralAsia)}
                </p>
                <Button
                  onClick={() => setIsSubmitted(false)}
                  variant="outline"
                  className="border-gray-300"
                >
                  {getLocalized(
                    "Submit Another Application",
                    "Подать ещё одну заявку",
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
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
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
                                {ORG_TYPE_OPTIONS.filter(
                                  (opt) =>
                                    !(
                                      opt.hideForCentralAsia &&
                                      isRegionCentralAsia
                                    ),
                                ).map((opt) => (
                                  <SelectItem
                                    key={opt.value}
                                    value={opt.value}
                                  >
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
                            <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
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
                                {PARTNERSHIP_INTEREST_OPTIONS.filter(
                                  (opt) =>
                                    !(
                                      opt.hideForCentralAsia &&
                                      isRegionCentralAsia
                                    ),
                                ).map((opt) => (
                                  <SelectItem
                                    key={opt.value}
                                    value={opt.value}
                                  >
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
                        ? getLocalized(
                            "Submitting...",
                            "Отправляем...",
                            isCentralAsia,
                          )
                        : forms.partner.getButtonLabel(isCentralAsia)}
                      {!isSubmitting && <ArrowRight className="ml-2 w-5 h-5" />}
                    </Button>

                    <p className="text-xs text-gray-500 text-center">
                      {getLocalized(
                        "Your information is kept confidential. We'll reach out within a few business days to schedule an introductory call.",
                        "Ваши данные конфиденциальны. Мы свяжемся с вами в ближайшие рабочие дни для вводного звонка.",
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

export default PartnerApplication;
