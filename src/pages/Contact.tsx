
import { Helmet } from "react-helmet";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import SocialLinks from "@/components/contact/SocialLinks";
import LocationMap from "@/components/contact/LocationMap";

// Enhanced hero header with conversion focus
const ContactHeroHeader = () => (
  <div 
    className="relative h-[65vh] flex items-center justify-center mb-8 pt-20"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
    <div className="relative z-10 container mx-auto px-4 text-center text-white">
      {/* Trust Badge */}
      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-up [--animation-delay:100ms]">
        📍 Port Orange, FL • Serving Central Asia
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
        Let's Transform Lives 
        <span className="text-yellow-400"> Together</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed mb-8">
        <strong className="text-yellow-300">Ready to make a global impact?</strong> Whether you want to volunteer as a mentor, 
        make a donation, explore partnerships, or learn about our programs, 
        <strong className="text-yellow-300"> we're here to connect with you</strong>.
      </p>

      {/* Contact Methods Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-center mb-8">
        <div className="animate-fade-up [--animation-delay:600ms] bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="text-lg font-bold text-yellow-400 mb-1">📞 Call Us</div>
          <div className="text-sm text-white/80">(386) 517-1527</div>
        </div>
        <div className="animate-fade-up [--animation-delay:700ms] bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="text-lg font-bold text-yellow-400 mb-1">📧 Email Us</div>
          <div className="text-sm text-white/80">donations@businessesbeyondborders.com</div>
        </div>
        <div className="animate-fade-up [--animation-delay:800ms] bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="text-lg font-bold text-yellow-400 mb-1">⏰ Response Time</div>
          <div className="text-sm text-white/80">24-48 Hours</div>
        </div>
      </div>

      {/* Primary CTA */}
      <div className="animate-fade-up [--animation-delay:900ms] mb-6">
        <a href="#contact-form" className="inline-block">
          <button className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg rounded-lg transition-all duration-300 hover:scale-105">
            📝 Send Us a Message
          </button>
        </a>
      </div>

      {/* Social Proof */}
      <p className="text-sm text-white/70 animate-fade-up [--animation-delay:1000ms]">
        🌟 <strong className="text-white">Be among our founding volunteers and partners</strong> - we're just getting started but growing our mission in Volusia County • 
        💬 <strong className="text-white">Free consultations available</strong> • 
        🤝 <strong className="text-white">Multilingual support</strong> (English & Russian)
      </p>
    </div>
  </div>
);

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Port Orange FL Nonprofit | Businesses Beyond Borders | (386) 517-1527</title>
        <meta 
          name="description" 
          content="Contact Businesses Beyond Borders in Port Orange, FL for volunteer opportunities, program information, partnerships, or donations. Call (386) 517-1527 or email donations@businessesbeyondborders.com. Serving Volusia County and empowering Central Asia entrepreneurs." 
        />
        <meta 
          name="keywords" 
          content="contact nonprofit Port Orange FL, Businesses Beyond Borders phone number, volunteer opportunities Volusia County, nonprofit contact Daytona Beach, Central Asia entrepreneurship programs contact, Port Orange business mentorship, nonprofit partnerships Florida, community development contact Volusia County, international development nonprofit Florida" 
        />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Contact Businesses Beyond Borders - Port Orange FL Nonprofit" />
        <meta property="og:description" content="Get in touch with our Port Orange team for volunteer opportunities, partnerships, donations, or program information. Transforming Central Asia from Volusia County." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/contact" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1559827260-dc66d52bef19" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Contact Port Orange Nonprofit - Volunteer & Partnership Opportunities" />
        <meta name="twitter:description" content="Connect with Businesses Beyond Borders for volunteer mentoring, donations, partnerships, or program information. Port Orange serving Central Asia." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1559827260-dc66d52bef19" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Businesses Beyond Borders" />
        <link rel="canonical" href="https://businessesbeyondborders.com/contact" />
        <meta name="geo.region" content="US-FL" />
        <meta name="geo.placename" content="Port Orange, Florida" />
        <meta name="geo.position" content="29.1386;-81.0062" />
        <meta name="ICBM" content="29.1386, -81.0062" />
        
        {/* Local Business Contact Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NonprofitOrganization",
            "name": "Businesses Beyond Borders",
            "description": "Port Orange nonprofit empowering entrepreneurs in Central Asia through business training, leadership development, and community collaboration programs",
            "url": "https://businessesbeyondborders.com",
            "logo": "https://businessesbeyondborders.com/logo.png",
            "image": "https://images.unsplash.com/photo-1559827260-dc66d52bef19",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Port Orange",
              "addressRegion": "FL",
              "postalCode": "32127",
              "addressCountry": "US"
            },
            "contactPoint": [
              {
                "@type": "ContactPoint",
                "telephone": "+1-386-517-1527",
                "contactType": "customer support",
                "areaServed": ["US", "KZ", "KG", "TJ", "UZ", "TM"],
                "availableLanguage": ["English", "Russian"]
              },
              {
                "@type": "ContactPoint",
                "email": "donations@businessesbeyondborders.com",
                "contactType": "donations"
              }
            ],
            "sameAs": [
              "https://facebook.com/businessesbeyondborders",
              "https://linkedin.com/company/businesses-beyond-borders"
            ],
            "foundingDate": "2020",
            "employee": [
              {
                "@type": "Person",
                "name": "Leadership Team",
                "jobTitle": "Program Directors"
              }
            ],
            "serviceArea": {
              "@type": "Place",
              "name": "Central Asia and Volusia County, Florida"
            }
          })}
        </script>
      </Helmet>

      {/* Hero Header */}
      <ContactHeroHeader />

      <div className="min-h-screen pt-4 pb-16 bg-gray-50" role="main">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Contact Reasons Section */}
            <div className="py-16">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                  How Can We 
                  <span className="text-blue-600"> Help You?</span>
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                  Whether you're ready to volunteer, make a donation, explore partnerships, or learn about our programs, 
                  we're here to guide you toward the perfect way to make global impact from Volusia County.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-blue-500">
                  <div className="text-2xl mb-3">🤝</div>
                  <h3 className="font-bold text-gray-800 mb-2">Volunteer Opportunities</h3>
                  <p className="text-sm text-gray-600">Become a mentor, coordinator, or supporter for our new programs</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-green-500">
                  <div className="text-2xl mb-3">💝</div>
                  <h3 className="font-bold text-gray-800 mb-2">Make a Donation</h3>
                  <p className="text-sm text-gray-600">Support operations, training, or business incubation programs</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-purple-500">
                  <div className="text-2xl mb-3">🏢</div>
                  <h3 className="font-bold text-gray-800 mb-2">Corporate Partnerships</h3>
                  <p className="text-sm text-gray-600">Explore CSR opportunities and employee engagement programs</p>
                </div>
                <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border-l-4 border-orange-500">
                  <div className="text-2xl mb-3">📚</div>
                  <h3 className="font-bold text-gray-800 mb-2">Program Information</h3>
                  <p className="text-sm text-gray-600">Learn about our proven business training and leadership programs</p>
                </div>
              </div>
            </div>
            
            {/* Main Contact Section */}
            <div className="grid lg:grid-cols-3 gap-12 py-8">
              {/* Contact Form - Takes up 2 columns */}
              <div className="lg:col-span-2" id="contact-form">
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">Send Us a Message</h2>
                    <p className="text-gray-600">We typically respond within 24-48 hours. For urgent matters, please call us directly.</p>
                  </div>
                  <ContactForm />
                </div>
              </div>

              {/* Contact Info - Takes up 1 column */}
              <div className="space-y-8">
                <div className="bg-white rounded-xl shadow-sm p-8">
                  <ContactInfo />
                </div>
                
                {/* Quick Contact Options */}
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 border border-blue-200">
                  <h3 className="font-bold text-blue-800 mb-4">Need Immediate Help?</h3>
                  <div className="space-y-3">
                    <a href="tel:+13865171527" className="flex items-center gap-3 text-blue-700 hover:text-blue-800 transition-colors">
                      <div className="bg-blue-100 p-2 rounded-full">📞</div>
                      <div>
                        <div className="font-medium">Call Us Now</div>
                        <div className="text-sm">(386) 517-1527</div>
                      </div>
                    </a>
                    <a href="mailto:donations@businessesbeyondborders.com" className="flex items-center gap-3 text-blue-700 hover:text-blue-800 transition-colors">
                      <div className="bg-blue-100 p-2 rounded-full">📧</div>
                      <div>
                        <div className="font-medium">Email Us</div>
                        <div className="text-sm text-blue-600">donations@businessesbeyondborders.com</div>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section - Map and Social */}
            <div className="grid md:grid-cols-2 gap-12 pb-16">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <LocationMap />
              </div>

              <div className="bg-white rounded-lg shadow-sm p-8">
                <SocialLinks />
              </div>
            </div>

            {/* Enhanced FAQ Section */}
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-xl p-8 mb-16 border border-purple-200">
              <div className="text-center max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">
                  Frequently Asked Questions
                </h2>
                <p className="text-purple-600 mb-8 max-w-2xl mx-auto">
                  Get quick answers to common questions about volunteering, donating, partnerships, and our programs.
                </p>
                
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div className="bg-white p-6 rounded-lg border border-purple-200">
                    <h3 className="font-bold text-purple-800 mb-3 text-lg">
                      🕐 How quickly do you respond to inquiries?
                    </h3>
                    <p className="text-purple-700">
                      We typically respond within <strong>24-48 hours</strong> during business days. 
                      Urgent volunteer or partnership matters are addressed the same day. 
                      Call <strong>(386) 517-1527</strong> for immediate assistance.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-purple-200">
                    <h3 className="font-bold text-purple-800 mb-3 text-lg">
                      📅 Can I schedule a free consultation?
                    </h3>
                    <p className="text-purple-700">
                      Yes! We offer <strong>free initial consultations</strong> to discuss volunteer opportunities, 
                      corporate partnerships, or how our proven programs can benefit your organization.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-purple-200">
                    <h3 className="font-bold text-purple-800 mb-3 text-lg">
                      🌍 Do you work with international partners?
                    </h3>
                    <p className="text-purple-700">
                      Absolutely. We collaborate with organizations in <strong>Central Asia, Volusia County, 
                      and worldwide</strong> to expand our impact. Our programs operate in Kazakhstan, 
                      Kyrgyzstan, Tajikistan, and beyond.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-purple-200">
                    <h3 className="font-bold text-purple-800 mb-3 text-lg">
                      🤝 How can I support your mission?
                    </h3>
                    <p className="text-purple-700">
                      Many ways to help: <strong>volunteer as a mentor</strong>, make a donation for operations 
                      or business incubation, explore corporate partnerships, or spread awareness about our 
                      <strong>100% success rate programs</strong>.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-purple-200">
                    <h3 className="font-bold text-purple-800 mb-3 text-lg">
                      💰 What donation amounts make the biggest impact?
                    </h3>
                    <p className="text-purple-700">
                      <strong>$400</strong> trains a local facilitator, <strong>$5,000</strong> provides startup capital, 
                      and <strong>$10,000</strong> establishes a complete incubator. Even smaller amounts 
                      like <strong>$150</strong> support our Port Orange operations.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-lg border border-purple-200">
                    <h3 className="font-bold text-purple-800 mb-3 text-lg">
                      🏢 What corporate partnership options exist?
                    </h3>
                    <p className="text-purple-700">
                      We offer <strong>employee volunteer programs</strong>, matching donations, 
                      sponsorship opportunities, and CSR collaborations. Perfect for Volusia County 
                      businesses wanting to make global impact.
                    </p>
                  </div>
                </div>
                
                {/* Additional Contact CTA */}
                <div className="mt-8 p-6 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white">
                  <h3 className="text-xl font-bold mb-2">Still Have Questions?</h3>
                  <p className="mb-4">We're here to help you find the perfect way to make global impact from Port Orange.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="tel:+13865171527" className="bg-white text-purple-600 font-bold px-6 py-3 rounded-lg hover:bg-purple-50 transition-colors">
                      📞 Call (386) 517-1527
                    </a>
                    <a href="#contact-form" className="bg-purple-500 hover:bg-purple-400 text-white font-bold px-6 py-3 rounded-lg transition-colors">
                      📧 Send a Message
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
