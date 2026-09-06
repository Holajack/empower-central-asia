import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import * as LucideIcons from "lucide-react";
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
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useRegion } from "@/contexts/RegionContext";
import { siteConfig } from "@/lib/seo";
import { trackConversion } from "@/lib/analytics";
import { subscribe } from "@/lib/subscribe";
import {
  useCohortPage,
  getCohortCopy,
  getCohortDateLabel,
  getCohortDateDurationLine,
  getCohortDateGroupSizeLine,
  getCohortDateTopicsLine,
  getCohortItemLabel,
  getCohortItemDescription,
  getCohortStepTitle,
  getCohortStepDescription,
  getCohortFaqQuestion,
  getCohortFaqAnswer,
} from "@/hooks/useCohortPage";


// Map icon-name string -> Lucide component, with sane fallback.
function resolveIcon(name: string | undefined, fallback: LucideIcons.LucideIcon): LucideIcons.LucideIcon {
  if (!name) return fallback;
  const Icon = (LucideIcons as unknown as Record<string, LucideIcons.LucideIcon>)[name];
  return Icon ?? fallback;
}

// Convert a kebab/snake-case lucide name to its PascalCase export
// (e.g. "book-open" -> "BookOpen", "message_circle" -> "MessageCircle").
function pascal(name: string | undefined): string | undefined {
  if (!name) return undefined;
  return name
    .split(/[-_]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

export default function Cohort() {
  const { isCentralAsia } = useRegion();
  const { data: cohort } = useCohortPage();
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!firstName.trim() || !email.trim()) {
      setError(getCohortCopy(cohort, "interestFormErrorMissing", isCentralAsia));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(getCohortCopy(cohort, "interestFormErrorInvalidEmail", isCentralAsia));
      return;
    }

    setIsSubmitting(true);
    try {
      await subscribe({
        email: email.trim(),
        firstName: firstName.trim(),
        language: isCentralAsia ? "ru" : "en",
        interests: ["cohort"],
        source: "cohort-interest",
      });
      trackConversion("cohort_interest", { method: "cohort_page", form_type: "cohort-interest" });
      setIsSubmitted(true);
    } catch {
      setError(getCohortCopy(cohort, "interestFormErrorGeneric", isCentralAsia));
    } finally {
      setIsSubmitting(false);
    }
  }

  // ── Helmet copy (kept as ternaries per task scope) ──
  const pageTitle = isCentralAsia
    ? `Бесплатные когорты — обучение | ${siteConfig.shortName}`
    : `Free Cohort Programs - Now Enrolling | ${siteConfig.shortName}`;
  const pageDesc = isCentralAsia
    ? "Запишитесь в бесплатную когорту по финансовой грамотности или созданию бизнеса. Группы формируются сейчас — обучение с фасилитатором и сообществом."
    : "Enroll in a free financial literacy or business creation cohort. Groups forming now with facilitator-led sessions, accountability, and community support.";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: isCentralAsia ? "Живые когорты — финансовая грамотность и создание бизнеса" : "Live Cohorts — Financial Literacy & Business Creation",
    description: pageDesc,
    url: `${siteConfig.url}/cohort`,
    inLanguage: isCentralAsia ? "ru" : "en",
    isPartOf: { "@type": "WebSite", name: siteConfig.name, url: siteConfig.url },
    about: {
      "@type": "Course",
      name: isCentralAsia ? "Живая когорта с фасилитатором" : "Facilitator-led live cohort",
      description: pageDesc,
      provider: { "@type": "Organization", name: siteConfig.orgName, url: siteConfig.url },
      isAccessibleForFree: true,
      hasCourseInstance: { "@type": "CourseInstance", courseMode: "Blended", courseWorkload: "PT2H" },
    },
  };

  // ── Pre-resolve copy ──
  const heroBadge = getCohortCopy(cohort, "heroBadge", isCentralAsia);
  const heroHeading = getCohortCopy(cohort, "heroHeading", isCentralAsia);
  const heroSubheading = getCohortCopy(cohort, "heroSubheading", isCentralAsia);
  const whatIsHeading = getCohortCopy(cohort, "whatIsHeading", isCentralAsia);
  const whatIsBody = getCohortCopy(cohort, "whatIsBody", isCentralAsia);
  // whatIsBody supports paragraphs separated by blank lines.
  const whatIsParagraphs = whatIsBody.split(/\n\s*\n/).filter(Boolean);
  const scheduleHeading = getCohortCopy(cohort, "scheduleHeading", isCentralAsia);
  const whatYouGetHeading = getCohortCopy(cohort, "whatYouGetHeading", isCentralAsia);
  const interestFormHeading = getCohortCopy(cohort, "interestFormHeading", isCentralAsia);
  const interestFormSubheading = getCohortCopy(cohort, "interestFormSubheading", isCentralAsia);
  const interestFormSubmitLabel = getCohortCopy(cohort, "interestFormSubmitLabel", isCentralAsia);
  const interestFormSubmittingLabel = getCohortCopy(cohort, "interestFormSubmittingLabel", isCentralAsia);
  const interestFormDisclaimer = getCohortCopy(cohort, "interestFormDisclaimer", isCentralAsia);
  const interestFormSuccessHeading = getCohortCopy(cohort, "interestFormSuccessHeading", isCentralAsia);
  const interestFormSuccessBody = getCohortCopy(cohort, "interestFormSuccessBody", isCentralAsia);
  const bottomCtaHeading = getCohortCopy(cohort, "bottomCtaHeading", isCentralAsia);
  const bottomCtaSubheading = getCohortCopy(cohort, "bottomCtaSubheading", isCentralAsia);
  const primaryLabel = getCohortCopy(cohort, "primaryLabel", isCentralAsia);
  const secondaryLabel = getCohortCopy(cohort, "secondaryLabel", isCentralAsia);
  const ctaCardArrowLabel = getCohortCopy(cohort, "ctaCardArrowLabel", isCentralAsia);
  const crosslinkInvolvedLabel = getCohortCopy(cohort, "crosslinkInvolvedLabel", isCentralAsia);
  const crosslinkStoriesLabel = getCohortCopy(cohort, "crosslinkStoriesLabel", isCentralAsia);
  const faqsHeading = getCohortCopy(cohort, "faqsHeading", isCentralAsia);

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDesc} />
        <meta
          name="keywords"
          content="financial literacy group program, business creation cohort Florida, live cohort course, facilitated financial literacy, entrepreneurship program Volusia County"
        />
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
              <span className="text-sm font-medium text-[#C9922A]">{heroBadge}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight">{heroHeading}</h1>
            <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto">{heroSubheading}</p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
          {/* What is a Cohort */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-4">{whatIsHeading}</h2>
            {whatIsParagraphs.map((para, i) => (
              <p
                key={i}
                className={`text-gray-700 text-lg leading-relaxed ${
                  i < whatIsParagraphs.length - 1 ? "mb-4" : ""
                }`}
              >
                {para}
              </p>
            ))}
          </section>

          {/* Schedule/Format */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-6">{scheduleHeading}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {cohort.cohortDates.map((track) => {
                // Each track gets a header icon (book-open / trophy by default), and three
                // bullet rows with fixed icons (calendar / users / target) to mirror the
                // original visual hierarchy.
                const HeaderIcon = resolveIcon(pascal(track.icon), BookOpen);
                const duration = getCohortDateDurationLine(track, isCentralAsia);
                const groupSize = getCohortDateGroupSizeLine(track, isCentralAsia);
                const topics = getCohortDateTopicsLine(track, isCentralAsia);
                return (
                  <Card key={track._key ?? track.label} className="border-[#C9922A]/20">
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-[#C9922A]/10 w-10 h-10 rounded-full flex items-center justify-center">
                          <HeaderIcon className="w-5 h-5 text-[#C9922A]" />
                        </div>
                        <h3 className="font-bold text-[#1B2A4A]">
                          {getCohortDateLabel(track, isCentralAsia)}
                        </h3>
                      </div>
                      <ul className="space-y-2 text-sm text-gray-600">
                        {duration && (
                          <li className="flex items-start gap-2">
                            <Calendar className="w-4 h-4 text-[#C9922A] flex-shrink-0 mt-0.5" />
                            {duration}
                          </li>
                        )}
                        {groupSize && (
                          <li className="flex items-start gap-2">
                            <Users className="w-4 h-4 text-[#C9922A] flex-shrink-0 mt-0.5" />
                            {groupSize}
                          </li>
                        )}
                        {topics && (
                          <li className="flex items-start gap-2">
                            <Target className="w-4 h-4 text-[#C9922A] flex-shrink-0 mt-0.5" />
                            {topics}
                          </li>
                        )}
                      </ul>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* What to Expect */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-6">{whatYouGetHeading}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {cohort.whatYouGet.map((item, idx) => {
                // Default icon rotation matches the original page (target/message-circle/users)
                // when no icon is provided.
                const fallbackIcons = [Target, MessageCircle, Users];
                const Icon = resolveIcon(pascal(item.icon), fallbackIcons[idx % fallbackIcons.length]);
                return (
                  <Card key={item._key ?? item.label} className="text-center border-[#1B2A4A]/10">
                    <CardContent className="pt-6">
                      <Icon className="w-8 h-8 text-[#C9922A] mx-auto mb-3" />
                      <h3 className="font-bold text-[#1B2A4A] mb-2">
                        {getCohortItemLabel(item, isCentralAsia)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {getCohortItemDescription(item, isCentralAsia)}
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Application Steps */}
          {cohort.applicationSteps && cohort.applicationSteps.length > 0 && (
            <section className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-6">
                {getCohortCopy(cohort, "applicationStepsHeading", isCentralAsia)}
              </h2>
              <ol className="space-y-4">
                {cohort.applicationSteps.map((step) => (
                  <li
                    key={step._key ?? step.stepNumber}
                    className="flex gap-4 items-start bg-white border border-[#C9922A]/20 rounded-lg p-5"
                  >
                    <div className="bg-[#C9922A] text-white font-bold w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0">
                      {step.stepNumber ?? "•"}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#1B2A4A] mb-1">
                        {getCohortStepTitle(step, isCentralAsia)}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {getCohortStepDescription(step, isCentralAsia)}
                      </p>
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

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
                        {interestFormSuccessHeading}
                      </h3>
                      <p className="text-gray-600 text-sm">{interestFormSuccessBody}</p>
                    </>
                  ) : (
                    <>
                      <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">
                        {interestFormHeading}
                      </h3>
                      <p className="text-sm text-gray-600 mb-6">{interestFormSubheading}</p>
                      <form onSubmit={handleSubmit} className="space-y-3 text-left">
                        <div>
                          <label htmlFor="cohort-name" className="text-xs font-medium text-gray-600 mb-1 block">
                            {getCohortCopy(cohort, "interestFormFirstNameLabel", isCentralAsia)}
                          </label>
                          <Input
                            id="cohort-name"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder={getCohortCopy(cohort, "interestFormFirstNamePlaceholder", isCentralAsia)}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="cohort-email" className="text-xs font-medium text-gray-600 mb-1 block">
                            {getCohortCopy(cohort, "interestFormEmailLabel", isCentralAsia)}
                          </label>
                          <Input
                            id="cohort-email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={getCohortCopy(cohort, "interestFormEmailPlaceholder", isCentralAsia)}
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
                          {isSubmitting ? interestFormSubmittingLabel : interestFormSubmitLabel}
                          <ArrowRight className="ml-2 w-4 h-4" />
                        </Button>
                        <p className="text-xs text-gray-400 text-center mt-2">{interestFormDisclaimer}</p>
                      </form>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </section>

          {/* FAQs */}
          {cohort.faqs && cohort.faqs.length > 0 && (
            <section className="mb-12 md:mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-6">{faqsHeading}</h2>
              <div className="space-y-3">
                {cohort.faqs.map((faq) => (
                  <details
                    key={faq._key ?? faq.question}
                    className="bg-white border border-[#C9922A]/20 rounded-lg p-5 group"
                  >
                    <summary className="cursor-pointer font-bold text-[#1B2A4A] flex items-center justify-between">
                      <span>{getCohortFaqQuestion(faq, isCentralAsia)}</span>
                      <Sparkles className="w-4 h-4 text-[#C9922A] flex-shrink-0 ml-3 group-open:rotate-90 transition-transform" />
                    </summary>
                    <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                      {getCohortFaqAnswer(faq, isCentralAsia)}
                    </p>
                  </details>
                ))}
              </div>
            </section>
          )}

          {/* CTAs — self-paced courses + cross-links */}
          <section className="mb-12 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] mb-4">{bottomCtaHeading}</h2>
            <p className="text-gray-600 mb-6">{bottomCtaSubheading}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to={cohort.primaryUrl}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-[#C9922A]/20 h-full">
                  <CardContent className="pt-6">
                    <BookOpen className="w-6 h-6 text-[#C9922A] mb-2" />
                    <h3 className="font-bold text-[#1B2A4A] mb-1">{primaryLabel}</h3>
                    <span className="text-sm text-[#C9922A] font-medium inline-flex items-center gap-1">
                      {ctaCardArrowLabel} <ArrowRight className="w-3 h-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
              <Link to={cohort.secondaryUrl}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer border-[#C9922A]/20 h-full">
                  <CardContent className="pt-6">
                    <Trophy className="w-6 h-6 text-[#C9922A] mb-2" />
                    <h3 className="font-bold text-[#1B2A4A] mb-1">{secondaryLabel}</h3>
                    <span className="text-sm text-[#C9922A] font-medium inline-flex items-center gap-1">
                      {ctaCardArrowLabel} <ArrowRight className="w-3 h-3" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </section>

          {/* Additional Cross-Links */}
          <section>
            <div className="flex flex-wrap gap-3 justify-center text-sm">
              <Link to={cohort.crosslinkInvolvedUrl} className="text-[#C9922A] hover:text-[#1B2A4A] font-medium transition-colors">
                {crosslinkInvolvedLabel}
              </Link>
              <span className="text-gray-300">|</span>
              <Link to={cohort.crosslinkStoriesUrl} className="text-[#C9922A] hover:text-[#1B2A4A] font-medium transition-colors">
                {crosslinkStoriesLabel}
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
