/**
 * Contact-page-specific Sanity content (singleton). Hero copy, business
 * hours table, service-areas list, emergency-contact callout, and the
 * subtitles next to the email / phone / address blocks — all editable in
 * Studio without touching code.
 *
 * Hardcoded fallbacks mirror the bilingual copy that `ContactInfo.tsx` and
 * `Contact.tsx` used before CMS wiring, so the page never breaks if Sanity
 * is unreachable.
 *
 * The mailing address, primary email, and primary phone themselves still
 * come from `useSiteSettings()` — this hook only owns the surrounding copy.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface ContactHoursRow {
  label?: string;
  labelRu?: string;
  hours?: string;
  hoursRu?: string;
}

export interface ContactServiceArea {
  label?: string;
  labelRu?: string;
}

export interface ContactPageData {
  heroHeading: string;
  heroHeadingRu?: string;
  heroSubheading?: string;
  heroSubheadingRu?: string;
  businessHoursHeading: string;
  businessHoursHeadingRu?: string;
  businessHours: ContactHoursRow[];
  serviceAreasHeading: string;
  serviceAreasHeadingRu?: string;
  serviceAreas: ContactServiceArea[];
  emergencyHeading: string;
  emergencyHeadingRu?: string;
  emergencyBody: string;
  emergencyBodyRu?: string;
  addressLabel: string;
  addressLabelRu?: string;
  primaryEmailDescription: string;
  primaryEmailDescriptionRu?: string;
  primaryPhoneDescription: string;
  primaryPhoneDescriptionRu?: string;
}

// ── Fallbacks (mirror the schema initialValues + the previously-hardcoded copy) ──

const FALLBACK: ContactPageData = {
  heroHeading: "Get in Touch",
  heroHeadingRu: "Свяжитесь с нами",
  heroSubheading:
    "Whether you're interested in volunteering, partnerships, or learning about our programs — we'd love to hear from you.",
  heroSubheadingRu:
    "Хотите стать волонтёром, установить партнёрство или узнать о наших программах? Мы будем рады услышать вас.",
  businessHoursHeading: "Business Hours",
  businessHoursHeadingRu: "Часы работы",
  businessHours: [
    {
      label: "Monday - Friday",
      labelRu: "Понедельник — Пятница",
      hours: "9:00 AM - 6:00 PM EST",
      hoursRu: "9:00 — 18:00 EST",
    },
    {
      label: "Saturday",
      labelRu: "Суббота",
      hours: "10:00 AM - 2:00 PM EST",
      hoursRu: "10:00 — 14:00 EST",
    },
    {
      label: "Sunday",
      labelRu: "Воскресенье",
      hours: "Closed",
      hoursRu: "Выходной",
    },
  ],
  serviceAreasHeading: "Service Areas",
  serviceAreasHeadingRu: "Регионы обслуживания",
  serviceAreas: [
    {
      label: "Central Asia: Kazakhstan, Kyrgyzstan, Uzbekistan",
      labelRu: "Центральная Азия: Казахстан, Кыргызстан, Узбекистан",
    },
    {
      label: "Remote consultations available worldwide",
      labelRu: "Онлайн-консультации по всему миру",
    },
  ],
  emergencyHeading: "Emergency Contact",
  emergencyHeadingRu: "Экстренная связь",
  emergencyBody:
    "For urgent matters related to ongoing programs, please call or text our emergency line at ",
  emergencyBodyRu:
    "По срочным вопросам, связанным с текущими программами, позвоните или напишите на нашу линию экстренной связи: ",
  addressLabel: "Headquarters & Operations Center",
  addressLabelRu: "Штаб-квартира и операционный центр",
  primaryEmailDescription: "Primary contact for inquiries",
  primaryEmailDescriptionRu: "Основной контакт для вопросов",
  primaryPhoneDescription: "Text & Call Available Monday - Friday",
  primaryPhoneDescriptionRu: "Звонки и сообщения: понедельник — пятница",
};

// ── GROQ query ────────────────────────────────────────────────────────────────

const CONTACT_PAGE_QUERY = /* groq */ `
  *[_id == "contactPage"][0]{
    heroHeading,
    heroHeadingRu,
    heroSubheading,
    heroSubheadingRu,
    businessHoursHeading,
    businessHoursHeadingRu,
    businessHours,
    serviceAreasHeading,
    serviceAreasHeadingRu,
    serviceAreas,
    emergencyHeading,
    emergencyHeadingRu,
    emergencyBody,
    emergencyBodyRu,
    addressLabel,
    addressLabelRu,
    primaryEmailDescription,
    primaryEmailDescriptionRu,
    primaryPhoneDescription,
    primaryPhoneDescriptionRu
  }
`;

interface RawContactPage {
  heroHeading?: string;
  heroHeadingRu?: string;
  heroSubheading?: string;
  heroSubheadingRu?: string;
  businessHoursHeading?: string;
  businessHoursHeadingRu?: string;
  businessHours?: ContactHoursRow[];
  serviceAreasHeading?: string;
  serviceAreasHeadingRu?: string;
  serviceAreas?: ContactServiceArea[];
  emergencyHeading?: string;
  emergencyHeadingRu?: string;
  emergencyBody?: string;
  emergencyBodyRu?: string;
  addressLabel?: string;
  addressLabelRu?: string;
  primaryEmailDescription?: string;
  primaryEmailDescriptionRu?: string;
  primaryPhoneDescription?: string;
  primaryPhoneDescriptionRu?: string;
}

// ── Builder ───────────────────────────────────────────────────────────────────

function shape(raw: RawContactPage | null): ContactPageData {
  const r = raw ?? {};
  return {
    heroHeading: r.heroHeading || FALLBACK.heroHeading,
    heroHeadingRu: r.heroHeadingRu || FALLBACK.heroHeadingRu,
    heroSubheading: r.heroSubheading || FALLBACK.heroSubheading,
    heroSubheadingRu: r.heroSubheadingRu || FALLBACK.heroSubheadingRu,
    businessHoursHeading:
      r.businessHoursHeading || FALLBACK.businessHoursHeading,
    businessHoursHeadingRu:
      r.businessHoursHeadingRu || FALLBACK.businessHoursHeadingRu,
    businessHours:
      r.businessHours && r.businessHours.length > 0
        ? r.businessHours
        : FALLBACK.businessHours,
    serviceAreasHeading:
      r.serviceAreasHeading || FALLBACK.serviceAreasHeading,
    serviceAreasHeadingRu:
      r.serviceAreasHeadingRu || FALLBACK.serviceAreasHeadingRu,
    serviceAreas:
      r.serviceAreas && r.serviceAreas.length > 0
        ? r.serviceAreas
        : FALLBACK.serviceAreas,
    emergencyHeading: r.emergencyHeading || FALLBACK.emergencyHeading,
    emergencyHeadingRu: r.emergencyHeadingRu || FALLBACK.emergencyHeadingRu,
    emergencyBody: r.emergencyBody || FALLBACK.emergencyBody,
    emergencyBodyRu: r.emergencyBodyRu || FALLBACK.emergencyBodyRu,
    addressLabel: r.addressLabel || FALLBACK.addressLabel,
    addressLabelRu: r.addressLabelRu || FALLBACK.addressLabelRu,
    primaryEmailDescription:
      r.primaryEmailDescription || FALLBACK.primaryEmailDescription,
    primaryEmailDescriptionRu:
      r.primaryEmailDescriptionRu || FALLBACK.primaryEmailDescriptionRu,
    primaryPhoneDescription:
      r.primaryPhoneDescription || FALLBACK.primaryPhoneDescription,
    primaryPhoneDescriptionRu:
      r.primaryPhoneDescriptionRu || FALLBACK.primaryPhoneDescriptionRu,
  };
}

// ── Bilingual helpers ─────────────────────────────────────────────────────────

/**
 * Pull the bilingual variant of any plain string field on the contactPage
 * document. Pass the English value, the Russian value, and an isCentralAsia
 * flag — get the right one with English fallback when Russian is missing.
 *
 * Convenience wrapper around `getLocalized` typed against the field names
 * on `ContactPageData` so callers can write:
 *
 *   getContactCopy(data, "heroHeading", isCentralAsia)
 *
 * instead of repeating `getLocalized(data.heroHeading, data.heroHeadingRu, …)`
 * at every call site.
 */
type StringField =
  | "heroHeading"
  | "heroSubheading"
  | "businessHoursHeading"
  | "serviceAreasHeading"
  | "emergencyHeading"
  | "emergencyBody"
  | "addressLabel"
  | "primaryEmailDescription"
  | "primaryPhoneDescription";

export function getContactCopy(
  data: ContactPageData,
  field: StringField,
  isCentralAsia: boolean
): string {
  const ruField = `${field}Ru` as keyof ContactPageData;
  const english = data[field] as string | undefined;
  const russian = data[ruField] as string | undefined;
  return getLocalized(english, russian, isCentralAsia);
}

/** Localize a single hours row. */
export function getHoursRowLabel(
  row: ContactHoursRow,
  isCentralAsia: boolean
): string {
  return getLocalized(row.label, row.labelRu, isCentralAsia);
}

export function getHoursRowHours(
  row: ContactHoursRow,
  isCentralAsia: boolean
): string {
  return getLocalized(row.hours, row.hoursRu, isCentralAsia);
}

/** Localize a single service-area row. */
export function getServiceAreaLabel(
  area: ContactServiceArea,
  isCentralAsia: boolean
): string {
  return getLocalized(area.label, area.labelRu, isCentralAsia);
}

// Re-export the fallback for callers that want it (tests, storybook, etc.).
export const FALLBACK_CONTACT_PAGE: ContactPageData = shape(null);

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useContactPage(): {
  data: ContactPageData;
  isLoading: boolean;
} {
  const { data, isLoading } = useQuery({
    queryKey: ["contactPage"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawContactPage | null>(CONTACT_PAGE_QUERY);
      } catch (err) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("[contactPage] Sanity fetch failed:", err);
        }
        return null;
      }
    },
  });

  return {
    data: shape(data ?? null),
    isLoading,
  };
}
