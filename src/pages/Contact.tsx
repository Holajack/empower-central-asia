
import { Helmet } from "react-helmet";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import SocialLinks from "@/components/contact/SocialLinks";
import LocationMap from "@/components/contact/LocationMap";

// About-style hero header
const ContactHeroHeader = () => (
  <div 
    className="relative h-[60vh] flex items-center justify-center"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-black/40" />
    <div className="relative z-10 container mx-auto px-4 text-center text-white">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up [--animation-delay:200ms]">
        Contact Us
      </h1>
      <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
        Ready to make a difference? Whether you're interested in our programs, want to volunteer, 
        or explore partnership opportunities, we're here to connect with you.
      </p>
    </div>
  </div>
);

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Businesses Beyond Borders - Connect for Impact</title>
        <meta 
          name="description" 
          content="Get in touch with Businesses Beyond Borders. Connect with us for program information, volunteer opportunities, partnerships, or general inquiries about our Central Asian entrepreneurship initiatives." 
        />
        <meta 
          name="keywords" 
          content="contact, entrepreneurship support, Central Asia business, volunteer opportunities, partnership, community development, business mentorship" 
        />
        <meta property="og:title" content="Contact Businesses Beyond Borders - Join Our Mission" />
        <meta property="og:description" content="Reach out to discuss entrepreneurship programs, volunteering, partnerships, or learn more about our impact in Central Asia." />
      </Helmet>

      {/* Hero Header */}
      <ContactHeroHeader />

      <div className="min-h-screen pt-0 pb-16 bg-gray-50" role="main">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            
            {/* Main Contact Section */}
            <div className="grid lg:grid-cols-3 gap-12 py-16">
              {/* Contact Form - Takes up 2 columns */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <ContactForm />
                </div>
              </div>

              {/* Contact Info - Takes up 1 column */}
              <div className="space-y-8">
                <div className="bg-white rounded-lg shadow-sm p-8">
                  <ContactInfo />
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

            {/* Additional Information Section */}
            <div className="bg-purple-50 rounded-lg p-8 mb-16">
              <div className="text-center max-w-3xl mx-auto">
                <h2 className="text-2xl font-bold text-purple-800 mb-4">
                  Frequently Asked Questions
                </h2>
                <div className="grid md:grid-cols-2 gap-6 text-left">
                  <div>
                    <h3 className="font-semibold text-purple-700 mb-2">
                      How quickly do you respond to inquiries?
                    </h3>
                    <p className="text-purple-600 text-sm">
                      We typically respond within 24-48 hours during business days. 
                      Urgent matters are addressed the same day.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-700 mb-2">
                      Can I schedule a consultation?
                    </h3>
                    <p className="text-purple-600 text-sm">
                      Yes! We offer free initial consultations to discuss how our 
                      programs can benefit you or your organization.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-700 mb-2">
                      Do you work with international partners?
                    </h3>
                    <p className="text-purple-600 text-sm">
                      Absolutely. We collaborate with organizations worldwide to 
                      expand our impact across Central Asia and beyond.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-purple-700 mb-2">
                      How can I support your mission?
                    </h3>
                    <p className="text-purple-600 text-sm">
                      There are many ways to help: donate, volunteer, mentor, 
                      or spread awareness about our programs.
                    </p>
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
