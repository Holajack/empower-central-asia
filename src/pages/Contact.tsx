
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

const Contact = () => {
  const { isCentralAsia } = useRegion();

  const faqs = [
    {
      question: isCentralAsia
        ? "Как быстро вы отвечаете на запросы?"
        : "How quickly do you respond to inquiries?",
      answer: isCentralAsia
        ? "Как правило, мы отвечаем в течение 24–48 часов в рабочие дни. По срочным вопросам вы можете написать нам в WhatsApp или позвонить напрямую по номеру (386) 517-1527."
        : "We typically respond within 24-48 hours during business days. For urgent matters, call us directly at (386) 517-1527.",
    },
    {
      question: isCentralAsia
        ? "Могу ли я записаться на консультацию?"
        : "Can I schedule a consultation?",
      answer: isCentralAsia
        ? "Да. Мы предлагаем бесплатные первичные консультации для обсуждения возможностей волонтёрства, корпоративного партнёрства или того, как наши программы могут принести пользу вашей организации. Воспользуйтесь формой обратной связи, свяжитесь с нами через WhatsApp или позвоните нам для записи."
        : "Yes. We offer free initial consultations to discuss volunteer opportunities, corporate partnerships, or how our programs can benefit your organization. Use the contact form or call us to schedule.",
    },
    {
      question: isCentralAsia
        ? "Работаете ли вы с международными партнёрами?"
        : "Do you work with international partners?",
      answer: isCentralAsia
        ? "Безусловно. Мы сотрудничаем с организациями в Центральной Азии и по всему миру. Наши программы реализуются в Казахстане, Кыргызстане и Узбекистане, а удалённые консультации доступны в глобальном масштабе."
        : "Absolutely. We collaborate with organizations in Central Asia and worldwide. Our programs operate in Kazakhstan, Kyrgyzstan, and Uzbekistan, with remote consultations available globally.",
    },
    {
      question: isCentralAsia
        ? "На каких языках вы работаете?"
        : "What languages do you support?",
      answer: isCentralAsia
        ? "Наша команда общается на английском и русском языках. Программы в Центральной Азии проводятся на местных языках с двуязычным сопровождением."
        : "Our team communicates in English and Russian. Programs in Central Asia are delivered in local languages with bilingual facilitation.",
    },
  ];

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
              {isCentralAsia ? "Свяжитесь с нами" : "Get in Touch"}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed mb-8">
              {isCentralAsia
                ? "Хотите стать волонтёром, установить партнёрство или узнать о наших программах? Мы будем рады услышать вас."
                : "Whether you're interested in volunteering, partnerships, or learning about our programs -- we'd love to hear from you."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up [--animation-delay:600ms]">
              <a href="#contact-form">
                <Button
                  size="lg"
                  className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8 py-4 text-lg"
                >
                  <MessageSquare className="mr-2 w-5 h-5" />
                  {isCentralAsia ? "Написать нам" : "Send a Message"}
                </Button>
              </a>
              {isCentralAsia ? (
                <a href="https://wa.me/13865171527" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="lg"
                    className="bg-white/20 backdrop-blur border border-white text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8 py-4 text-lg"
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    WhatsApp
                  </Button>
                </a>
              ) : (
                <a href="tel:+13865171527">
                  <Button
                    size="lg"
                    className="bg-white/20 backdrop-blur border border-white text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8 py-4 text-lg"
                  >
                    <Phone className="mr-2 w-5 h-5" />
                    (386) 517-1527
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
                      {isCentralAsia ? "Напишите нам" : "Send Us a Message"}
                    </h2>
                    <p className="text-gray-600">
                      {isCentralAsia
                        ? "Как правило, мы отвечаем в течение 24–48 часов."
                        : "We typically respond within 24-48 hours."}
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </div>

              {/* Info - 1 column */}
              <div className="space-y-6">
                <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
                  <h3 className="text-xl font-bold text-[#1B2A4A] mb-6">
                    {isCentralAsia ? "Контактная информация" : "Contact Information"}
                  </h3>
                  <div className="space-y-5">
                    <a
                      href="mailto:donations@businessesbeyondborders.com"
                      className="flex items-start gap-3 text-gray-600 hover:text-[#C9922A] transition-colors"
                    >
                      <Mail className="h-5 w-5 text-[#C9922A] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-800">
                          {isCentralAsia ? "Электронная почта" : "Email"}
                        </div>
                        <div className="text-sm">
                          donations@businessesbeyondborders.com
                        </div>
                      </div>
                    </a>

                    <a
                      href="tel:+13865171527"
                      className="flex items-start gap-3 text-gray-600 hover:text-[#C9922A] transition-colors"
                    >
                      <Phone className="h-5 w-5 text-[#C9922A] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-800">
                          {isCentralAsia ? "Телефон" : "Phone"}
                        </div>
                        <div className="text-sm">+1 (386) 517-1527</div>
                        <div className="text-xs text-gray-400">
                          {isCentralAsia
                            ? "Звонки и SMS, понедельник – пятница"
                            : "Call or text, Monday - Friday"}
                        </div>
                      </div>
                    </a>

                    {isCentralAsia && (
                      <a
                        href="https://wa.me/13865171527"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3 text-gray-600 hover:text-[#C9922A] transition-colors"
                      >
                        <Phone className="h-5 w-5 text-[#C9922A] mt-0.5 flex-shrink-0" />
                        <div>
                          <div className="font-medium text-gray-800">WhatsApp</div>
                          <div className="text-sm">+1 (386) 517-1527</div>
                          <div className="text-xs text-gray-400">
                            Напишите нам в WhatsApp
                          </div>
                        </div>
                      </a>
                    )}

                    <div className="flex items-start gap-3 text-gray-600">
                      <MapPin className="h-5 w-5 text-[#C9922A] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-800">
                          {isCentralAsia ? "Адрес" : "Address"}
                        </div>
                        <address className="text-sm not-italic">
                          2570 Jasmine Rd.
                          <br />
                          Port Orange, FL 32128
                        </address>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-gray-600">
                      <Clock className="h-5 w-5 text-[#C9922A] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-800">
                          {isCentralAsia ? "Часы работы" : "Hours"}
                        </div>
                        <div className="text-sm space-y-0.5">
                          {isCentralAsia ? (
                            <>
                              <p>Пн – Пт: 9:00 – 18:00 EST</p>
                              <p>Сб: 10:00 – 14:00 EST</p>
                            </>
                          ) : (
                            <>
                              <p>Mon - Fri: 9:00 AM - 6:00 PM EST</p>
                              <p>Sat: 10:00 AM - 2:00 PM EST</p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 text-gray-600">
                      <Globe className="h-5 w-5 text-[#C9922A] mt-0.5 flex-shrink-0" />
                      <div>
                        <div className="font-medium text-gray-800">
                          {isCentralAsia ? "Регионы присутствия" : "Service Areas"}
                        </div>
                        <div className="text-sm">
                          {isCentralAsia
                            ? "Казахстан, Кыргызстан, Узбекистан"
                            : "Kazakhstan, Kyrgyzstan, Uzbekistan"}
                        </div>
                        <div className="text-xs text-gray-400">
                          {isCentralAsia
                            ? "Удалённые консультации по всему миру"
                            : "Remote consultations worldwide"}
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
                {isCentralAsia ? "Частые вопросы" : "Common Questions"}
              </h2>
              <Accordion type="single" collapsible>
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
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
                {isCentralAsia ? "Готовы изменить жизни?" : "Ready to Make an Impact?"}
              </h2>
              <p className="text-white/80 mb-8 max-w-2xl mx-auto">
                {isCentralAsia
                  ? "Узнайте о наших программах, станьте волонтёром-наставником или поддержите предпринимателей, строящих бизнес в Центральной Азии."
                  : "Learn about our programs, become a volunteer mentor, or support entrepreneurs building businesses in Central Asia."}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/get-involved">
                  <Button
                    size="lg"
                    className="bg-[#C9922A] hover:bg-[#C9922A]/90 text-white font-bold px-8"
                  >
                    {isCentralAsia ? "Принять участие" : "Get Involved"}
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/programs-and-impact">
                  <Button
                    size="lg"
                    className="bg-white/20 backdrop-blur border border-white text-white hover:bg-white hover:text-[#1B2A4A] font-bold px-8"
                  >
                    {isCentralAsia ? "Наши программы" : "Explore Our Programs"}
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
