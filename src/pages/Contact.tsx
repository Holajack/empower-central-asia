import { Helmet } from "react-helmet";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import SocialLinks from "@/components/contact/SocialLinks";
import LocationMap from "@/components/contact/LocationMap";

const Contact = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us | Businesses Beyond Borders - Empowering Entrepreneurs in Central Asia</title>
        <meta 
          name="description" 
          content="Get in touch with Businesses Beyond Borders. Whether you're interested in our entrepreneurship programs, want to volunteer, or explore partnership opportunities in Central Asia, we're here to help." 
        />
        <meta 
          name="keywords" 
          content="contact, entrepreneurship support, Central Asia business, volunteer opportunities, partnership, community development" 
        />
      </Helmet>

      <div className="min-h-screen pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
              <p className="text-lg text-gray-600">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <ContactForm />

              {/* Contact Information */}
              <div className="space-y-8">
                <ContactInfo />
                <LocationMap />
                <SocialLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;