import { Mail, Phone, MapPin } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">Get in Touch</h2>
      
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-gray-600">
          <Mail className="h-5 w-5 text-terracotta-500" aria-hidden="true" />
          <a 
            href="mailto:contact@businessesbeyondborders.org" 
            className="hover:text-terracotta-500"
            aria-label="Email us"
          >
            contact@businessesbeyondborders.org
          </a>
        </div>
        
        <div className="flex items-center gap-3 text-gray-600">
          <Phone className="h-5 w-5 text-terracotta-500" aria-hidden="true" />
          <a 
            href="tel:+1234567890" 
            className="hover:text-terracotta-500"
            aria-label="Call us"
          >
            +1 (234) 567-890
          </a>
        </div>
        
        <div className="flex items-center gap-3 text-gray-600">
          <MapPin className="h-5 w-5 text-terracotta-500" aria-hidden="true" />
          <address className="not-italic">
            123 Impact Street<br />
            San Francisco, CA 94105
          </address>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;