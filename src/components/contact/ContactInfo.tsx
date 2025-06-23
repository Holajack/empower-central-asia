
import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react";

const ContactInfo = () => {
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">Get in Touch</h2>
      
      <div className="space-y-6">
        <div className="flex items-center gap-3 text-gray-600">
          <Mail className="h-5 w-5 text-purple-500" aria-hidden="true" />
          <div>
            <a 
              href="mailto:donations@businessesbeyondborders.com" 
              className="hover:text-purple-500 font-medium"
              aria-label="Email us"
            >
              donations@businessesbeyondborders.com
            </a>
            <p className="text-sm text-gray-500">Primary contact for inquiries</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3 text-gray-600">
          <Phone className="h-5 w-5 text-purple-500" aria-hidden="true" />
          <div>
            <a 
              href="tel:+14074098836" 
              className="hover:text-purple-500 font-medium"
              aria-label="Call us"
            >
              +1 (407) 409-8836
            </a>
            <p className="text-sm text-gray-500">Available Monday - Friday</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 text-gray-600">
          <MapPin className="h-5 w-5 text-purple-500 mt-0.5" aria-hidden="true" />
          <div>
            <address className="not-italic font-medium">
              2570 Jasmine Rd.<br />
              Port Orange, FL 32128<br />
              United States
            </address>
            <p className="text-sm text-gray-500 mt-1">Headquarters & Operations Center</p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-gray-600">
          <Clock className="h-5 w-5 text-purple-500 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium">Business Hours</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
              <p>Saturday: 10:00 AM - 2:00 PM EST</p>
              <p>Sunday: Closed</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 text-gray-600">
          <Globe className="h-5 w-5 text-purple-500 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium">Service Areas</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>Central Asia: Kazakhstan, Kyrgyzstan, Tajikistan</p>
              <p>Remote consultations available worldwide</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-purple-50 p-4 rounded-lg">
        <h3 className="font-semibold text-purple-800 mb-2">Emergency Contact</h3>
        <p className="text-sm text-purple-700">
          For urgent matters related to ongoing programs, please call our emergency line at 
          <a href="tel:+14074098836" className="font-medium hover:underline ml-1">
            +1 (407) 409-8836
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
