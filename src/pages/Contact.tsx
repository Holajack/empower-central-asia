
import { Helmet } from "react-helmet";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import SocialLinks from "@/components/contact/SocialLinks";
import LocationMap from "@/components/contact/LocationMap";

// Add: About-style hero header
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
        Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
      </p>
    </div>
  </div>
);

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | CentralImpact - Reach Out for Support and Information</title>
        <meta 
          name="description" 
          content="Get in touch with CentralImpact. Whether you're interested in our entrepreneurship programs, want to volunteer, or explore partnership opportunities in Central Asia, we're here to help." 
        />
        <meta 
          name="keywords" 
          content="contact, entrepreneurship support, Central Asia business, volunteer opportunities, partnership, community development" 
        />
        <meta property="og:title" content="Contact CentralImpact - Get Involved in Central Asian Entrepreneurship" />
        <meta property="og:description" content="Reach out to discuss entrepreneurship programs, volunteering, or partnerships in Central Asia." />
      </Helmet>

      {/* About-style Hero Header */}
      <ContactHeroHeader />

      <div className="min-h-screen pt-0 pb-16" role="main">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Remove duplicate Contact Us title/desc section */}
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="sr-only">Contact Form</h2>
                <ContactForm />
              </div>

              <div className="space-y-8">
                <section aria-labelledby="contact-info-heading">
                  <h2 id="contact-info-heading" className="sr-only">Contact Information</h2>
                  <ContactInfo />
                </section>

                <section aria-labelledby="location-heading">
                  <h2 id="location-heading" className="sr-only">Our Location</h2>
                  <LocationMap />
                </section>

                <section aria-labelledby="social-heading">
                  <h2 id="social-heading" className="sr-only">Social Media Links</h2>
                  <SocialLinks />
                </section>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;
