
import { Mail, Phone, MapPin, Clock, Globe } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import {
  useContactPage,
  getContactCopy,
  getHoursRowLabel,
  getHoursRowHours,
  getServiceAreaLabel,
} from "@/hooks/useContactPage";

const ContactInfo = () => {
  const { isCentralAsia } = useRegion();
  const { settings } = useSiteSettings();
  const { data } = useContactPage();

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-semibold text-gray-900">
        {getContactCopy(data, "heroHeading", isCentralAsia)}
      </h2>

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
            <p className="text-sm text-gray-500">
              {getContactCopy(data, "primaryEmailDescription", isCentralAsia)}
            </p>
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
            <p className="text-sm text-gray-500">
              {getContactCopy(data, "primaryPhoneDescription", isCentralAsia)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-gray-600">
          <MapPin className="h-5 w-5 text-[#C9922A] mt-0.5" aria-hidden="true" />
          <div>
            <address className="not-italic font-medium" style={{ whiteSpace: "pre-line" }}>
              {settings.getAddress(isCentralAsia)}
            </address>
            <p className="text-sm text-gray-500 mt-1">
              {getContactCopy(data, "addressLabel", isCentralAsia)}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3 text-gray-600">
          <Clock className="h-5 w-5 text-[#C9922A] mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium">
              {getContactCopy(data, "businessHoursHeading", isCentralAsia)}
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              {data.businessHours.map((row, idx) => {
                const label = getHoursRowLabel(row, isCentralAsia);
                const hours = getHoursRowHours(row, isCentralAsia);
                return (
                  <p key={`${label}-${idx}`}>
                    {label}
                    {label && hours ? ": " : ""}
                    {hours}
                  </p>
                );
              })}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-3 text-gray-600">
          <Globe className="h-5 w-5 text-[#C9922A] mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-medium">
              {getContactCopy(data, "serviceAreasHeading", isCentralAsia)}
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              {data.serviceAreas.map((area, idx) => (
                <p key={idx}>{getServiceAreaLabel(area, isCentralAsia)}</p>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#C9922A]/5 p-4 rounded-lg">
        <h3 className="font-semibold text-[#1B2A4A] mb-2">
          {getContactCopy(data, "emergencyHeading", isCentralAsia)}
        </h3>
        <p className="text-sm text-gray-700">
          {getContactCopy(data, "emergencyBody", isCentralAsia)}
          <a href={`tel:${settings.contactPhoneTel}`} className="font-medium hover:underline ml-1">
            {settings.contactPhone}
          </a>
        </p>
      </div>
    </div>
  );
};

export default ContactInfo;
