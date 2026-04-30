
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Globe,
  ArrowRight,
  MessageSquare,
} from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import LocationMap from "@/components/contact/LocationMap";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRegion } from "@/contexts/RegionContext";
import { useContactPage, getContactCopy } from "@/hooks/useContactPage";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { getLocalized } from "@/lib/localized";

const Contact = () => {
  const { isCentralAsia } = useRegion();
  const { data: contactPage } = useContactPage();
  const { settings } = useSiteSettings();

  // Localized FAQ list — pulled from contactPage.faqs (or fallback).
  const faqs = contactPage.faqs.map((f) => ({
    _key: f._key,
    question: getLocalized(f.question, f.questionRu, isCentralAsia),
    answer: getLocalized(f.answer, f.answerRu, isCentralAsia),
  }));

  return (
    <>
      <Helmet>
        <title>{isCentralAsia ? "Свяжитесь с нами | BBB" : "Contact Us | Businesses Beyond Borders"}</title>
        <meta
          name="description"
          content={isCentralAsia
            ? "Свяжитесь с BBB: волонтёрство, партнёрства, программы или пожертвования. Звоните (386) 517-1527 или пишите на email."
            : "Contact BBB for volunteer opportunities, partnerships, or donations. Call (386) 517-1527 or email donations@businessesbeyondborders.com."}
        />
        <meta
          property="og:title"
          content={isCentralAsia ? "Свяжитесь с нами | Businesses Beyond Borders" : "Contact Us | Businesses Beyond Borders"}
        />
        <meta
          property="og:description"
          content={isCentralAsia
            ? "Свяжитесь с нашей командой по вопросам волонтёрства, партнёрства, пожертвований или программ."
            : "Get in touch with our team for volunteer opportunities, partnerships, donations, or program information."}
        />
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://businessesbeyondborders.com/contact"
        />
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Businesses Beyond Borders" />
        <link
          rel="canonical"
          href="https://businessesbeyondborders.com/contact"
        />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NonprofitOrganization",
            name: "Businesses Beyond Borders",
            description:
              "International nonprofit empowering entrepreneurs in Central Asia through business training, leadership development, and community collaboration programs",
            url: "https://businessesbeyondborders.com",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Port Orange",
              addressRegion: "FL",
              postalCode: "32128",
              addressCountry: "US",
            },
            contactPoint: [
              {
                "@type": "ContactPoint",
                telephone: "+1-386-517-1527",
                contactType: "customer support",
                areaServed: ["US", "KZ", "KG", "UZ"],
                availableLanguage: ["English", "Russian"],
              },
              {
                "@type": "ContactPoint",
                email: "donations@businessesbeyondborders.com",
                contactType: "donations",
              },
            ],
            sameAs: [
              "https://www.facebook.com/Businesses.BB",
              "https://www.linkedin.com/company/businesses-beyond-borders",
              "https://www.instagram.com/businessesbeyondborders",
            ],
            foundingDate: "2022",
          })}
        </script>
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
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
              {getContactCopy(contactPage, "heroHeading", isCentralAsia)}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed mb-8">
              {getContactCopy(contactPage, "heroSubheading", isCentralAsia)}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up [--animation-delay:600ms]">
              <a href="#contact-form">
                <Button
                  size="lg"
                  className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8 py-4 text-lg"
                >
                  <MessageSquare className="mr-2 w-5 h-5" />
                  {getContactCopy(contactPage, "heroPrimaryCtaLabel", isCentralAsia)}
                </Button>
              </a>
              {isCentralAsia ? (
                <a href={contactPage.whatsappUrl} target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="bg-white/20 backdrop-blur border border-white text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8 py-4 text-lg"
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    {getContactCopy(contactPage, "heroWhatsappCtaLabel", isCentralAsia)}
                  </Button>
                </a>
              ) : (
                <a href={`tel:${settings.contactPhoneTel}`}>
                  <Button
                    size="lg"
                    className="bg-white/20 backdrop-blur border border-white text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8 py-4 text-lg"
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    {contactPage.heroSecondaryCtaLabel || settings.contactPhone}
                  </Button>
                </a>
              )}
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 md:py-16">
          <div className="max-w-6xl mx-auto">
            {/* Contact Form + Info */}
            <div className="grid lg:grid-cols-3 gap-8 mb-16" id="contact-form">
              {/* Form - 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-[#1B2A4A] mb-2">
                      {getContactCopy(contactPage, "formHeading", isCentralAsia)}
                    </h2>
                    <p className="text-gray-600">
                      {getContactCopy(contactPage, "formSubheading", isCentralAsia)}
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </div>

              {/* Info - 1 column */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                  <h3 className="text-xl font-bold text-[#1B2A4A] mb-6">
                    {getContactCopy(contactPage, "infoHeading", isCentralAsia)}
                  </h3>
                  <div className="space-y-5">
                    <a
                      href={`mailto:${settings.contactEmail}`}
                      className="flex items-start gap-3 text-gray-600 hover:text-[#C9922A] transition-colors"
                    >
                      <Mail className="h-5 w-5 text-[#C9922A] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-800">
                          {getContactCopy(contactPage, "emailLabel", isCentralAsia)}
                        </div>
                        <div className="text-sm">{settings.contactEmail}</div>
                      </div>
                    </a>

                    <a
                      href={`tel:${settings.contactPhoneTel}`}
                      className="flex items-start gap-3 text-gray-600 hover:text-[#C9922A] transition-colors"
                    >
                      <Phone className="h-5 w-5 text-[#C9922A] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-800">
                          {getContactCopy(contactPage, "phoneLabel", isCentralAsia)}
                        </div>
                        <div className="text-sm">{settings.contactPhone}</div>
                        <div className="text-xs text-gray-400">
                          {getContactCopy(contactPage, "phoneCallNote", isCentralAsia)}
                        </div>
                      </div>
                    </a>

                    {isCentralAsia && (
                      <a
                        href={contactPage.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 text-gray-600 hover:text-[#C9922A] transition-colors"
                      >
                        <Phone className="h-5 w-5 text-[#C9922A] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-gray-800">
                            {getContactCopy(contactPage, "heroWhatsappCtaLabel", isCentralAsia)}
                          </div>
                          <div className="text-sm">{settings.contactPhone}</div>
                          <div className="text-xs text-gray-400">
                            {contactPage.whatsappBlockNote}
                          </div>
                        </div>
                      </a>
                    )}

                    <div className="flex items-start gap-3 text-gray-600">
                      <MapPin className="h-5 w-5 text-[#C9922A] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-800">
                          {getContactCopy(contactPage, "addressBlockLabel", isCentralAsia)}
                        </div>
                        <address
                          className="text-sm not-italic"
                          style={{ whiteSpace: "pre-line" }}
                        >
                          {settings.getAddress(isCentralAsia)}
                        </address>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-gray-600">
                      <Clock className="h-5 w-5 text-[#C9922A] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-800">
                          {getContactCopy(contactPage, "hoursBlockLabel", isCentralAsia)}
                        </div>
                        <div className="text-sm space-y-0.5">
                          {contactPage.businessHours
                            .filter((row) => {
                              const hours = isCentralAsia
                                ? row.hoursRu || row.hours
                                : row.hours;
                              // Hide "Closed" rows from the compact info card.
                              return (
                                hours &&
                                !/closed/i.test(hours) &&
                                !/выходной/i.test(hours)
                              );
                            })
                            .map((row, i) => (
                              <p key={i}>
                                {isCentralAsia
                                  ? `${row.labelRu || row.label}: ${row.hoursRu || row.hours}`
                                  : `${row.label}: ${row.hours}`}
                              </p>
                            ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-gray-600">
                      <Globe className="h-5 w-5 text-[#C9922A] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-800">
                          {getContactCopy(contactPage, "serviceAreasBlockLabel", isCentralAsia)}
                        </div>
                        <div className="text-sm">
                          {getContactCopy(contactPage, "serviceAreasBlockShort", isCentralAsia)}
                        </div>
                        <div className="text-xs text-gray-400">
                          {getContactCopy(contactPage, "serviceAreasBlockNote", isCentralAsia)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="bg-white rounded-xl shadow-sm p-6">
                  <LocationMap />
                </div>
              </div>
            </div>

            {/* FAQ */}
            <div className="max-w-3xl mx-auto mb-16">
              <h2 className="text-2xl md:text-3xl font-bold text-[#1B2A4A] text-center mb-8">
                {getContactCopy(contactPage, "faqsHeading", isCentralAsia)}
              </h2>
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={faq._key ?? index}
                    value={`item-${faq._key ?? index}`}
                  >
                    <AccordionTrigger className="text-left text-gray-800">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>

            {/* Bottom CTA */}
            <div className="bg-[#1B2A4A] rounded-2xl p-8 md:p-12 text-center text-white max-w-4xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                {getContactCopy(contactPage, "bottomCtaHeading", isCentralAsia)}
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                {getContactCopy(contactPage, "bottomCtaSubheading", isCentralAsia)}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to={contactPage.bottomCtaPrimaryUrl}>
                  <Button
                    size="lg"
                    className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8"
                  >
                    {getContactCopy(contactPage, "bottomCtaPrimaryLabel", isCentralAsia)}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to={contactPage.bottomCtaSecondaryUrl}>
                  <Button
                    size="lg"
                    className="bg-white/20 backdrop-blur border border-white text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8"
                  >
                    {getContactCopy(contactPage, "bottomCtaSecondaryLabel", isCentralAsia)}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
