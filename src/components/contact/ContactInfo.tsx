
import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const ContactInfo = () => {
  const { isCentralAsia } = useRegion();
  const { settings } = useSiteSettings();
  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">{isCentralAsia ? "Свяжитесь с нами" : "Get in Touch"}</h2>

      <div className="space-y-6">
        <div className="flex items-center gap-3 text-gray-600">
          <Mail className="h-5 w-5 text-[#C9922A]" aria-hidden="true" />
          <div>
            <a
              href={`mailto:${settings.contactEmail}`}
              className="hover:text-[#C9922A] font-medium"
              aria-label={isCentralAsia ? "Написать нам" : "Email us"}
            >
              {settings.contactEmail}
            </a>
            <p className="text-sm text-gray-500">{isCentralAsia ? "Основной контакт для вопросов" : "Primary contact for inquiries"}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 text-gray-600">
          <Phone className="h-5 w-5 text-[#C9922A]" aria-hidden="true" />
          <div>
            <a
              href={`tel:${settings.contactPhoneTel}`}
              className="hover:text-[#C9922A] font-medium"
              aria-label={isCentralAsia ? "Позвонить нам" : "Call us"}
            >
              {settings.contactPhone}
            </a>
            <p className="text-sm text-gray-500">{isCentralAsia ? "Звонки и сообщения: понедельник — пятница" : "Text & Call Available Monday - Friday"}</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 text-gray-600">
          <MapPin className="h-5 w-5 text-[#C9922A] mt-0.5" aria-hidden="true" />
          <div>
            <address className="not-italic font-medium" style={{ whiteSpace: "pre-line" }}>
              {settings.getAddress(isCentralAsia)}
            </address>
            <p className="text-sm text-gray-500 mt-1">{isCentralAsia ? "Штаб-квартира и операционный центр" : "Headquarters & Operations Center"}</p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-gray-600">
          <Clock className="h-5 w-5 text-[#C9922A] mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium">{isCentralAsia ? "Часы работы" : "Business Hours"}</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>{isCentralAsia ? "Понедельник — Пятница: 9:00 — 18:00 EST" : "Monday - Friday: 9:00 AM - 6:00 PM EST"}</p>
              <p>{isCentralAsia ? "Суббота: 10:00 — 14:00 EST" : "Saturday: 10:00 AM - 2:00 PM EST"}</p>
              <p>{isCentralAsia ? "Воскресенье: Выходной" : "Sunday: Closed"}</p>
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 text-gray-600">
          <Globe className="h-5 w-5 text-[#C9922A] mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium">{isCentralAsia ? "Регионы обслуживания" : "Service Areas"}</p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>{isCentralAsia ? "Центральная Азия: Казахстан, Кыргызстан, Узбекистан" : "Central Asia: Kazakhstan, Kyrgyzstan, Uzbekistan"}</p>
              <p>{isCentralAsia ? "Онлайн-консультации по всему миру" : "Remote consultations available worldwide"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#C9922A]/5 p-4 rounded-lg">
        <h3 className="font-semibold text-[#1B2A4A] mb-2">{isCentralAsia ? "Экстренная связь" : "Emergency Contact"}</h3>
        <p className="text-sm text-gray-700">
          {isCentralAsia
            ? "По срочным вопросам, связанным с текущими программами, позвоните или напишите на нашу линию экстренной связи: "
            : "For urgent matters related to ongoing programs, please call or text our emergency line at "}
          <a href={`tel:${settings.contactPhoneTel}`} className="font-medium hover:underline ml-1">
            {settings.contactPhone}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
