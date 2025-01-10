import { Helmet } from "react-helmet";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import SocialLinks from "@/components/contact/SocialLinks";
import LocationMap from "@/components/contact/LocationMap";

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

      <div className="min-h-screen pt-20 pb-16" role="main">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
              <p className="text-lg text-gray-600">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

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