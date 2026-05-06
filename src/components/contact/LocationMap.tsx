import { useRegion } from "@/contexts/RegionContext";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const LocationMap = () => {
  const { isCentralAsia } = useRegion();
  const { settings } = useSiteSettings();

  // Build a one-line address string for the iframe title + aria-label.
  // settings.address is multi-line — flatten newlines to commas.
  const addressOneLine = settings
    .getAddress(isCentralAsia)
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-900">
        {isCentralAsia ? "Наше местоположение" : "Visit Our Location"}
      </h3>
      <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-200">
        <iframe
          src={settings.mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={
            isCentralAsia
              ? `Расположение нашего офиса: ${addressOneLine}`
              : `Our office location: ${addressOneLine}`
          }
          aria-label={
            isCentralAsia
              ? `Интерактивная карта с расположением нашего офиса: ${addressOneLine}`
              : `Interactive map showing our office location at ${addressOneLine}`
          }
        ></iframe>
      </div>
      <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
        <p className="font-medium">
          {isCentralAsia ? "Посещение нашего офиса:" : "Visiting Our Office:"}
        </p>
        <p>
          {isCentralAsia
            ? "Пожалуйста, запишитесь заранее. Визиты без записи приветствуются в рабочее время, но запись гарантирует, что наша команда уделит вам время."
            : "Please schedule an appointment in advance. Walk-ins welcome during business hours, but appointments ensure dedicated time with our team."}
        </p>
      </div>
    </div>
  );
};

export default LocationMap;
