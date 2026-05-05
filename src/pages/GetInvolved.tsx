import React from "react";
import { Helmet } from "react-helmet";
import * as LucideIcons from "lucide-react";
import {
  ArrowRight,
  HelpCircle,
  Mail,
  Phone,
  Users,
  Clock,
  Laptop,
  type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import DonateButton from "@/components/DonateButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import TestimonialCard from "@/components/success-stories/TestimonialCard";
import { getLocalizedTestimonial } from "@/data/testimonials";
import { useRegion } from "@/contexts/RegionContext";
import { useFaqItems, localizeFaqs } from "@/hooks/useFaqItems";
import { useTestimonials } from "@/hooks/useTestimonials";
import {
  useGetInvolvedPage,
  getStageCopy,
  getFeatureCopy,
  getTierCopy,
  getOptionCopy,
  getIntroParagraphs,
  type CircleColor,
} from "@/hooks/useGetInvolvedPage";
import { getLocalized } from "@/lib/localized";

// ── Helpers ───────────────────────────────────────────────────────────────────

/**
 * Resolve a Lucide icon component by name with a sensible fallback.
 * Lucide exports many components; the runtime lookup needs a string indexer
 * but we narrow the result back to LucideIcon so callers stay typed.
 */
const ICON_FALLBACK: LucideIcon = HelpCircle;

function resolveIcon(name: string): LucideIcon {
  const lookup = LucideIcons as unknown as Record<string, LucideIcon>;
  return lookup[name] ?? ICON_FALLBACK;
}

/** Map our "navy" / "gold" choice to the bg + text Tailwind classes. */
function circleClasses(color: CircleColor): string {
  return color === "gold"
    ? "bg-[#C9922A] text-white"
    : "bg-[#1B2A4A] text-white";
}

const GetInvolved = () => {
  const { isCentralAsia, isRegionCentralAsia } = useRegion();
  // FAQs come from Sanity (faqItem docs) with a hardcoded fallback in the hook.
  // BBB staff add/edit/reorder via Studio → Get Involved page updates within ~60s.
  const { faqs: rawFaqs } = useFaqItems();
  const faqs = localizeFaqs(rawFaqs, isCentralAsia);
  // Testimonials come from Sanity (testimonial docs) with hardcoded fallback.
  const { testimonials } = useTestimonials();
  // Rest of the page copy comes from Sanity (getInvolvedPage singleton) with
  // full hardcoded fallback so the page never breaks if Sanity is unreachable.
  const { data } = useGetInvolvedPage();

  // ── Localized strings ──────────────────────────────────────────────────────
  const heroHeading = getLocalized(data.heroHeading, data.heroHeadingRu, isCentralAsia);
  const heroSubheading = getLocalized(data.heroSubheading, data.heroSubheadingRu, isCentralAsia);
  const heroParticipantCta = getLocalized(data.heroParticipantCtaLabel, data.heroParticipantCtaLabelRu, isCentralAsia);
  const heroDonorCta = getLocalized(data.heroDonorCtaLabel, data.heroDonorCtaLabelRu, isCentralAsia);
  const heroVolunteerCta = getLocalized(data.heroVolunteerCtaLabel, data.heroVolunteerCtaLabelRu, isCentralAsia);

  const participantsEyebrow = getLocalized(data.participantsEyebrow, data.participantsEyebrowRu, isCentralAsia);
  const participantsHeading = getLocalized(data.participantsHeading, data.participantsHeadingRu, isCentralAsia);
  const participantsIntro = getIntroParagraphs(
    data.participantsIntroParagraphs,
    data.participantsIntroParagraphsRu,
    isCentralAsia
  );

  const visibleStages = data.participantStages.filter(
    (stage) => !(isRegionCentralAsia && stage.hideForCentralAsia)
  );

  const liveClassesHeading = getLocalized(data.liveClassesHeading, data.liveClassesHeadingRu, isCentralAsia);
  const liveClassesBody = getLocalized(data.liveClassesBody, data.liveClassesBodyRu, isCentralAsia);
  const liveClassesCta = getLocalized(data.liveClassesCtaLabel, data.liveClassesCtaLabelRu, isCentralAsia);

  const volunteersEyebrow = getLocalized(data.volunteersEyebrow, data.volunteersEyebrowRu, isCentralAsia);
  const volunteersHeading = getLocalized(data.volunteersHeading, data.volunteersHeadingRu, isCentralAsia);
  const volunteersIntro = getLocalized(data.volunteersIntro, data.volunteersIntroRu, isCentralAsia);
  const volunteerApplyCta = getLocalized(data.volunteerApplyCtaLabel, data.volunteerApplyCtaLabelRu, isCentralAsia);

  const donorsEyebrow = getLocalized(data.donorsEyebrow, data.donorsEyebrowRu, isCentralAsia);
  const donorsHeading = getLocalized(data.donorsHeading, data.donorsHeadingRu, isCentralAsia);
  const donorsIntro = getIntroParagraphs(
    data.donorsIntroParagraphs,
    data.donorsIntroParagraphsRu,
    isCentralAsia
  );
  const donorsDifferenceHeading = getLocalized(data.donorsDifferenceHeading, data.donorsDifferenceHeadingRu, isCentralAsia);
  const donorsDifferenceParagraphs = getIntroParagraphs(
    data.donorsDifferenceParagraphs,
    data.donorsDifferenceParagraphsRu,
    isCentralAsia
  );
  const donateCta = getLocalized(data.donateCtaLabel, data.donateCtaLabelRu, isCentralAsia);
  const donateTaxNote = getLocalized(data.donateTaxNote, data.donateTaxNoteRu, isCentralAsia);

  const partnerHeading = getLocalized(data.partnerHeading, data.partnerHeadingRu, isCentralAsia);
  const partnerBody = getLocalized(data.partnerBody, data.partnerBodyRu, isCentralAsia);
  const partnerCta = getLocalized(data.partnerCtaLabel, data.partnerCtaLabelRu, isCentralAsia);

  const successStoriesHeading = getLocalized(data.successStoriesHeading, data.successStoriesHeadingRu, isCentralAsia);
  const faqHeading = getLocalized(data.faqHeading, data.faqHeadingRu, isCentralAsia);
  const faqContactPrompt = getLocalized(data.faqContactPrompt, data.faqContactPromptRu, isCentralAsia);
  const faqContactCta = getLocalized(data.faqContactCtaLabel, data.faqContactCtaLabelRu, isCentralAsia);

  const bottomCtaHeading = getLocalized(data.bottomCtaHeading, data.bottomCtaHeadingRu, isCentralAsia);
  const bottomCtaSubheading = getLocalized(data.bottomCtaSubheading, data.bottomCtaSubheadingRu, isCentralAsia);
  const bottomCtaParticipant = getLocalized(data.bottomCtaParticipantLabel, data.bottomCtaParticipantLabelRu, isCentralAsia);
  const bottomCtaDonor = getLocalized(data.bottomCtaDonorLabel, data.bottomCtaDonorLabelRu, isCentralAsia);
  const bottomCtaVolunteer = getLocalized(data.bottomCtaVolunteerLabel, data.bottomCtaVolunteerLabelRu, isCentralAsia);
  const bottomCtaTagline = getLocalized(data.bottomCtaTagline, data.bottomCtaTaglineRu, isCentralAsia);

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
              {heroHeading}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed mb-8">
              {heroSubheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up [--animation-delay:600ms]">
              <a href="#for-participants">
                <Button
                  size="lg"
                  className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8 py-4 text-lg"
                >
                  {heroParticipantCta}
                </Button>
              </a>
              {!isRegionCentralAsia && (
                <a href="#for-donors">
                  <Button
                    size="lg"
                    className="bg-white/20 backdrop-blur border border-white text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8 py-4 text-lg"
                  >
                    {heroDonorCta}
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
                  {heroVolunteerCta}
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
                {participantsEyebrow}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {participantsHeading}
              </h2>

              <div className="prose prose-lg max-w-none text-gray-600 mb-12">
                {participantsIntro.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              {/* The Stages - Participant View */}
              <div className="space-y-6 mb-12">
                {visibleStages.map((stage, idx) => {
                  const copy = getStageCopy(stage, isCentralAsia);
                  return (
                    <div
                      key={`${stage.stageNumber}-${idx}`}
                      className="bg-white rounded-xl border border-gray-200 p-6 md:p-8"
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div
                          className={`w-10 h-10 rounded-full ${circleClasses(stage.circleColor)} flex items-center justify-center text-sm font-bold flex-shrink-0`}
                        >
                          {copy.number}
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-800">
                            {copy.title}
                          </h3>
                          {copy.label && (
                            <span className="text-sm text-[#C9922A] font-medium">
                              {copy.label}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed ml-14">
                        {copy.description}
                      </p>
                      {copy.ctaLabel && stage.ctaUrl && (
                        <div className="ml-14 mt-4">
                          <Link to={stage.ctaUrl}>
                            <Button className="bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 text-white">
                              {copy.ctaLabel}
                              <ArrowRight className="ml-2 w-4 h-4" />
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Live classes / Zoom Placeholder */}
              {liveClassesHeading && (
                <div className="bg-[#C9922A]/10 border border-[#C9922A]/30 rounded-xl p-6 md:p-8 text-center">
                  <h3 className="text-lg font-bold text-[#1B2A4A] mb-2">
                    {liveClassesHeading}
                  </h3>
                  {liveClassesBody && (
                    <p className="text-gray-600 mb-4">{liveClassesBody}</p>
                  )}
                  {liveClassesCta && data.liveClassesCtaUrl && (
                    <Link to={data.liveClassesCtaUrl}>
                      <Button className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white">
                        {liveClassesCta}
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* ============================== */}
          {/* SECTION 2: FOR VOLUNTEERS      */}
          {/* ============================== */}
          <section id="for-volunteers" className="scroll-mt-24">
            <div className="max-w-6xl mx-auto">
              <div className="text-sm font-bold tracking-widest text-[#C9922A] mb-4">
                {volunteersEyebrow}
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                {volunteersHeading}
              </h2>

              {volunteersIntro && (
                <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                  <p>{volunteersIntro}</p>
                </div>
              )}

              {data.volunteerFeatures.length > 0 && (
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  {data.volunteerFeatures.map((feature, idx) => {
                    const copy = getFeatureCopy(feature, isCentralAsia);
                    const Icon = resolveIcon(feature.icon);
                    return (
                      <Card key={idx} className="border border-gray-200">
                        <CardContent className="p-6 text-center">
                          <div
                            className={`w-12 h-12 rounded-full ${circleClasses(feature.circleColor)} flex items-center justify-center mx-auto mb-4`}
                          >
                            <Icon className="w-6 h-6" />
                          </div>
                          <h3 className="font-bold text-gray-800 mb-2">
                            {copy.title}
                          </h3>
                          <p className="text-gray-600 text-sm">
                            {copy.description}
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              )}

              {volunteerApplyCta && data.volunteerApplyCtaUrl && (
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link to={data.volunteerApplyCtaUrl}>
                    <Button
                      size="lg"
                      className="bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 text-white font-bold px-8 py-4"
                    >
                      {volunteerApplyCta}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </section>

          {/* ============================== */}
          {/* SECTION 3: FOR DONORS (US only) */}
          {/* ============================== */}
          {!isRegionCentralAsia && (
            <section id="for-donors" className="scroll-mt-24">
              <div className="max-w-6xl mx-auto">
                <div className="text-sm font-bold tracking-widest text-[#C9922A] mb-4">
                  {donorsEyebrow}
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  {donorsHeading}
                </h2>

                {donorsIntro.length > 0 && (
                  <div className="prose prose-lg max-w-none text-gray-600 mb-12">
                    {donorsIntro.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>
                )}

                {/* Donation Impact Tiers */}
                {data.donorTiers.length > 0 && (
                  <div className="grid md:grid-cols-3 gap-6 mb-12">
                    {data.donorTiers.map((tier, idx) => {
                      const copy = getTierCopy(tier, isCentralAsia);
                      return (
                        <Card
                          key={idx}
                          className="border border-gray-200 hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-6">
                            <div className="text-3xl font-bold text-[#1B2A4A] mb-2">
                              {copy.amount}
                            </div>
                            <div className="text-sm font-medium text-[#C9922A] mb-4">
                              {copy.name}
                            </div>
                            <p className="text-gray-600 text-sm leading-relaxed">
                              {copy.description}
                            </p>
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                )}

                {/* Why BBB is Different - Donor Perspective */}
                {donorsDifferenceParagraphs.length > 0 && (
                  <div className="bg-[#1B2A4A] rounded-xl p-8 text-white mb-12">
                    {donorsDifferenceHeading && (
                      <h3 className="text-2xl font-bold mb-6">
                        {donorsDifferenceHeading}
                      </h3>
                    )}
                    <div className="space-y-4 text-white/85 leading-relaxed">
                      {donorsDifferenceParagraphs.map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                      ))}
                    </div>
                  </div>
                )}

                {/* Donate CTA */}
                <div className="text-center mb-12">
                  <DonateButton
                    size="lg"
                    className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-10 py-5 text-lg"
                  >
                    {donateCta}
                  </DonateButton>
                  {donateTaxNote && (
                    <p className="text-sm text-gray-500 mt-3">{donateTaxNote}</p>
                  )}
                </div>

                {/* Corporate Partnerships */}
                <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {partnerHeading}
                  </h3>
                  {partnerBody && (
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {partnerBody}
                    </p>
                  )}
                  {data.partnerOptions.length > 0 && (
                    <div className="grid md:grid-cols-3 gap-4 mb-6 text-sm text-gray-600">
                      {data.partnerOptions.map((option, idx) => {
                        const copy = getOptionCopy(option, isCentralAsia);
                        return (
                          <div key={idx}>
                            <div className="font-medium text-gray-800 mb-1">
                              {copy.title}
                            </div>
                            {copy.description}
                          </div>
                        );
                      })}
                    </div>
                  )}
                  {partnerCta && data.partnerCtaUrl && (
                    <Link to={data.partnerCtaUrl}>
                      <Button className="bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 text-white font-medium">
                        {partnerCta}
                        <ArrowRight className="ml-2 w-4 h-4" />
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </section>
          )}

          {/* ============================== */}
          {/* SUCCESS STORIES                */}
          {/* ============================== */}
          <section className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              {successStoriesHeading}
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
              {faqHeading}
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
              <p className="text-gray-600 mb-4">{faqContactPrompt}</p>
              <Link to="/contact">
                <Button variant="outline" className="border-gray-300 text-gray-700">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  {faqContactCta}
                </Button>
              </Link>
            </div>
          </section>

          {/* ============================== */}
          {/* FINAL CTA                      */}
          {/* ============================== */}
          <section className="bg-[#1B2A4A] rounded-2xl p-8 md:p-16 text-center text-white max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {bottomCtaHeading}
            </h2>
            <p className="text-lg text-white/85 mb-8 max-w-2xl mx-auto leading-relaxed">
              {bottomCtaSubheading}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              {bottomCtaParticipant && data.bottomCtaParticipantUrl && (
                <Link to={data.bottomCtaParticipantUrl}>
                  <Button
                    size="lg"
                    className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8 py-4"
                  >
                    {bottomCtaParticipant}
                  </Button>
                </Link>
              )}
              {!isRegionCentralAsia && bottomCtaDonor && (
                <DonateButton
                  size="lg"
                  className="bg-white/20 backdrop-blur border-white text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8 py-4"
                >
                  {bottomCtaDonor}
                </DonateButton>
              )}
              {bottomCtaVolunteer && data.bottomCtaVolunteerUrl && (
                <Link to={data.bottomCtaVolunteerUrl}>
                  <Button
                    size="lg"
                    className="bg-white/10 backdrop-blur border border-white/50 text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8 py-4"
                  >
                    {bottomCtaVolunteer}
                  </Button>
                </Link>
              )}
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
              {bottomCtaTagline && <p>{bottomCtaTagline}</p>}
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default GetInvolved;
