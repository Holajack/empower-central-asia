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

export interface ContactFaqItem {
  _key?: string;
  question?: string;
  questionRu?: string;
  answer?: string;
  answerRu?: string;
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

  // Hero CTAs
  heroPrimaryCtaLabel: string;
  heroPrimaryCtaLabelRu?: string;
  heroSecondaryCtaLabel?: string; // when blank, falls back to phone-number display
  heroWhatsappCtaLabel: string;
  heroWhatsappCtaLabelRu?: string;
  whatsappUrl: string;

  // Form section
  formHeading: string;
  formHeadingRu?: string;
  formSubheading: string;
  formSubheadingRu?: string;

  // Info card labels
  infoHeading: string;
  infoHeadingRu?: string;
  emailLabel: string;
  emailLabelRu?: string;
  phoneLabel: string;
  phoneLabelRu?: string;
  phoneCallNote: string;
  phoneCallNoteRu?: string;
  whatsappBlockNote?: string; // Russian-only note in CA mode
  addressBlockLabel: string;
  addressBlockLabelRu?: string;
  hoursBlockLabel: string;
  hoursBlockLabelRu?: string;
  serviceAreasBlockLabel: string;
  serviceAreasBlockLabelRu?: string;
  serviceAreasBlockShort: string;
  serviceAreasBlockShortRu?: string;
  serviceAreasBlockNote: string;
  serviceAreasBlockNoteRu?: string;

  // FAQ section
  faqsHeading: string;
  faqsHeadingRu?: string;
  faqs: ContactFaqItem[];

  // Bottom CTA banner
  bottomCtaHeading: string;
  bottomCtaHeadingRu?: string;
  bottomCtaSubheading: string;
  bottomCtaSubheadingRu?: string;
  bottomCtaPrimaryLabel: string;
  bottomCtaPrimaryLabelRu?: string;
  bottomCtaPrimaryUrl: string;
  bottomCtaSecondaryLabel: string;
  bottomCtaSecondaryLabelRu?: string;
  bottomCtaSecondaryUrl: string;
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

  // Hero CTAs
  heroPrimaryCtaLabel: "Send a Message",
  heroPrimaryCtaLabelRu: "Написать нам",
  heroSecondaryCtaLabel: "",
  heroWhatsappCtaLabel: "WhatsApp",
  heroWhatsappCtaLabelRu: "WhatsApp",
  whatsappUrl: "https://wa.me/13865171527",

  // Form section
  formHeading: "Send Us a Message",
  formHeadingRu: "Напишите нам",
  formSubheading: "We typically respond within 24-48 hours.",
  formSubheadingRu: "Как правило, мы отвечаем в течение 24–48 часов.",

  // Info card
  infoHeading: "Contact Information",
  infoHeadingRu: "Контактная информация",
  emailLabel: "Email",
  emailLabelRu: "Электронная почта",
  phoneLabel: "Phone",
  phoneLabelRu: "Телефон",
  phoneCallNote: "Call or text, Monday - Friday",
  phoneCallNoteRu: "Звонки и SMS, понедельник – пятница",
  whatsappBlockNote: "Напишите нам в WhatsApp",
  addressBlockLabel: "Address",
  addressBlockLabelRu: "Адрес",
  hoursBlockLabel: "Hours",
  hoursBlockLabelRu: "Часы работы",
  serviceAreasBlockLabel: "Service Areas",
  serviceAreasBlockLabelRu: "Регионы присутствия",
  serviceAreasBlockShort: "Kazakhstan, Kyrgyzstan, Uzbekistan",
  serviceAreasBlockShortRu: "Казахстан, Кыргызстан, Узбекистан",
  serviceAreasBlockNote: "Remote consultations worldwide",
  serviceAreasBlockNoteRu: "Удалённые консультации по всему миру",

  // FAQ
  faqsHeading: "Common Questions",
  faqsHeadingRu: "Частые вопросы",
  faqs: [
    {
      _key: "faq-response-time",
      question: "How quickly do you respond to inquiries?",
      questionRu: "Как быстро вы отвечаете на запросы?",
      answer:
        "We typically respond within 24-48 hours during business days. For urgent matters, call us directly at (386) 517-1527.",
      answerRu:
        "Как правило, мы отвечаем в течение 24–48 часов в рабочие дни. По срочным вопросам вы можете написать нам в WhatsApp или позвонить напрямую по номеру (386) 517-1527.",
    },
    {
      _key: "faq-consultation",
      question: "Can I schedule a consultation?",
      questionRu: "Могу ли я записаться на консультацию?",
      answer:
        "Yes. We offer free initial consultations to discuss volunteer opportunities, corporate partnerships, or how our programs can benefit your organization. Use the contact form or call us to schedule.",
      answerRu:
        "Да. Мы предлагаем бесплатные первичные консультации для обсуждения возможностей волонтёрства, корпоративного партнёрства или того, как наши программы могут принести пользу вашей организации. Воспользуйтесь формой обратной связи, свяжитесь с нами через WhatsApp или позвоните нам для записи.",
    },
    {
      _key: "faq-international",
      question: "Do you work with international partners?",
      questionRu: "Работаете ли вы с международными партнёрами?",
      answer:
        "Absolutely. We collaborate with organizations in Central Asia and worldwide. Our programs operate in Kazakhstan, Kyrgyzstan, and Uzbekistan, with remote consultations available globally.",
      answerRu:
        "Безусловно. Мы сотрудничаем с организациями в Центральной Азии и по всему миру. Наши программы реализуются в Казахстане, Кыргызстане и Узбекистане, а удалённые консультации доступны в глобальном масштабе.",
    },
    {
      _key: "faq-languages",
      question: "What languages do you support?",
      questionRu: "На каких языках вы работаете?",
      answer:
        "Our team communicates in English and Russian. Programs in Central Asia are delivered in local languages with bilingual facilitation.",
      answerRu:
        "Наша команда общается на английском и русском языках. Программы в Центральной Азии проводятся на местных языках с двуязычным сопровождением.",
    },
  ],

  // Bottom CTA
  bottomCtaHeading: "Ready to Make an Impact?",
  bottomCtaHeadingRu: "Готовы изменить жизни?",
  bottomCtaSubheading:
    "Learn about our programs, become a volunteer mentor, or support entrepreneurs building businesses in Central Asia.",
  bottomCtaSubheadingRu:
    "Узнайте о наших программах, станьте волонтёром-наставником или поддержите предпринимателей, строящих бизнес в Центральной Азии.",
  bottomCtaPrimaryLabel: "Get Involved",
  bottomCtaPrimaryLabelRu: "Принять участие",
  bottomCtaPrimaryUrl: "/get-involved",
  bottomCtaSecondaryLabel: "Explore Our Programs",
  bottomCtaSecondaryLabelRu: "Наши программы",
  bottomCtaSecondaryUrl: "/programs-and-impact",
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
    primaryPhoneDescriptionRu,
    heroPrimaryCtaLabel,
    heroPrimaryCtaLabelRu,
    heroSecondaryCtaLabel,
    heroWhatsappCtaLabel,
    heroWhatsappCtaLabelRu,
    whatsappUrl,
    formHeading,
    formHeadingRu,
    formSubheading,
    formSubheadingRu,
    infoHeading,
    infoHeadingRu,
    emailLabel,
    emailLabelRu,
    phoneLabel,
    phoneLabelRu,
    phoneCallNote,
    phoneCallNoteRu,
    whatsappBlockNote,
    addressBlockLabel,
    addressBlockLabelRu,
    hoursBlockLabel,
    hoursBlockLabelRu,
    serviceAreasBlockLabel,
    serviceAreasBlockLabelRu,
    serviceAreasBlockShort,
    serviceAreasBlockShortRu,
    serviceAreasBlockNote,
    serviceAreasBlockNoteRu,
    faqsHeading,
    faqsHeadingRu,
    faqs[]{ _key, question, questionRu, answer, answerRu },
    bottomCtaHeading,
    bottomCtaHeadingRu,
    bottomCtaSubheading,
    bottomCtaSubheadingRu,
    bottomCtaPrimaryLabel,
    bottomCtaPrimaryLabelRu,
    bottomCtaPrimaryUrl,
    bottomCtaSecondaryLabel,
    bottomCtaSecondaryLabelRu,
    bottomCtaSecondaryUrl
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
  heroPrimaryCtaLabel?: string;
  heroPrimaryCtaLabelRu?: string;
  heroSecondaryCtaLabel?: string;
  heroWhatsappCtaLabel?: string;
  heroWhatsappCtaLabelRu?: string;
  whatsappUrl?: string;
  formHeading?: string;
  formHeadingRu?: string;
  formSubheading?: string;
  formSubheadingRu?: string;
  infoHeading?: string;
  infoHeadingRu?: string;
  emailLabel?: string;
  emailLabelRu?: string;
  phoneLabel?: string;
  phoneLabelRu?: string;
  phoneCallNote?: string;
  phoneCallNoteRu?: string;
  whatsappBlockNote?: string;
  addressBlockLabel?: string;
  addressBlockLabelRu?: string;
  hoursBlockLabel?: string;
  hoursBlockLabelRu?: string;
  serviceAreasBlockLabel?: string;
  serviceAreasBlockLabelRu?: string;
  serviceAreasBlockShort?: string;
  serviceAreasBlockShortRu?: string;
  serviceAreasBlockNote?: string;
  serviceAreasBlockNoteRu?: string;
  faqsHeading?: string;
  faqsHeadingRu?: string;
  faqs?: ContactFaqItem[];
  bottomCtaHeading?: string;
  bottomCtaHeadingRu?: string;
  bottomCtaSubheading?: string;
  bottomCtaSubheadingRu?: string;
  bottomCtaPrimaryLabel?: string;
  bottomCtaPrimaryLabelRu?: string;
  bottomCtaPrimaryUrl?: string;
  bottomCtaSecondaryLabel?: string;
  bottomCtaSecondaryLabelRu?: string;
  bottomCtaSecondaryUrl?: string;
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

    // Hero CTAs
    heroPrimaryCtaLabel:
      r.heroPrimaryCtaLabel || FALLBACK.heroPrimaryCtaLabel,
    heroPrimaryCtaLabelRu:
      r.heroPrimaryCtaLabelRu || FALLBACK.heroPrimaryCtaLabelRu,
    heroSecondaryCtaLabel:
      r.heroSecondaryCtaLabel || FALLBACK.heroSecondaryCtaLabel,
    heroWhatsappCtaLabel:
      r.heroWhatsappCtaLabel || FALLBACK.heroWhatsappCtaLabel,
    heroWhatsappCtaLabelRu:
      r.heroWhatsappCtaLabelRu || FALLBACK.heroWhatsappCtaLabelRu,
    whatsappUrl: r.whatsappUrl || FALLBACK.whatsappUrl,

    // Form section
    formHeading: r.formHeading || FALLBACK.formHeading,
    formHeadingRu: r.formHeadingRu || FALLBACK.formHeadingRu,
    formSubheading: r.formSubheading || FALLBACK.formSubheading,
    formSubheadingRu: r.formSubheadingRu || FALLBACK.formSubheadingRu,

    // Info card
    infoHeading: r.infoHeading || FALLBACK.infoHeading,
    infoHeadingRu: r.infoHeadingRu || FALLBACK.infoHeadingRu,
    emailLabel: r.emailLabel || FALLBACK.emailLabel,
    emailLabelRu: r.emailLabelRu || FALLBACK.emailLabelRu,
    phoneLabel: r.phoneLabel || FALLBACK.phoneLabel,
    phoneLabelRu: r.phoneLabelRu || FALLBACK.phoneLabelRu,
    phoneCallNote: r.phoneCallNote || FALLBACK.phoneCallNote,
    phoneCallNoteRu: r.phoneCallNoteRu || FALLBACK.phoneCallNoteRu,
    whatsappBlockNote: r.whatsappBlockNote || FALLBACK.whatsappBlockNote,
    addressBlockLabel: r.addressBlockLabel || FALLBACK.addressBlockLabel,
    addressBlockLabelRu:
      r.addressBlockLabelRu || FALLBACK.addressBlockLabelRu,
    hoursBlockLabel: r.hoursBlockLabel || FALLBACK.hoursBlockLabel,
    hoursBlockLabelRu: r.hoursBlockLabelRu || FALLBACK.hoursBlockLabelRu,
    serviceAreasBlockLabel:
      r.serviceAreasBlockLabel || FALLBACK.serviceAreasBlockLabel,
    serviceAreasBlockLabelRu:
      r.serviceAreasBlockLabelRu || FALLBACK.serviceAreasBlockLabelRu,
    serviceAreasBlockShort:
      r.serviceAreasBlockShort || FALLBACK.serviceAreasBlockShort,
    serviceAreasBlockShortRu:
      r.serviceAreasBlockShortRu || FALLBACK.serviceAreasBlockShortRu,
    serviceAreasBlockNote:
      r.serviceAreasBlockNote || FALLBACK.serviceAreasBlockNote,
    serviceAreasBlockNoteRu:
      r.serviceAreasBlockNoteRu || FALLBACK.serviceAreasBlockNoteRu,

    // FAQ
    faqsHeading: r.faqsHeading || FALLBACK.faqsHeading,
    faqsHeadingRu: r.faqsHeadingRu || FALLBACK.faqsHeadingRu,
    faqs: r.faqs && r.faqs.length > 0 ? r.faqs : FALLBACK.faqs,

    // Bottom CTA
    bottomCtaHeading: r.bottomCtaHeading || FALLBACK.bottomCtaHeading,
    bottomCtaHeadingRu:
      r.bottomCtaHeadingRu || FALLBACK.bottomCtaHeadingRu,
    bottomCtaSubheading:
      r.bottomCtaSubheading || FALLBACK.bottomCtaSubheading,
    bottomCtaSubheadingRu:
      r.bottomCtaSubheadingRu || FALLBACK.bottomCtaSubheadingRu,
    bottomCtaPrimaryLabel:
      r.bottomCtaPrimaryLabel || FALLBACK.bottomCtaPrimaryLabel,
    bottomCtaPrimaryLabelRu:
      r.bottomCtaPrimaryLabelRu || FALLBACK.bottomCtaPrimaryLabelRu,
    bottomCtaPrimaryUrl:
      r.bottomCtaPrimaryUrl || FALLBACK.bottomCtaPrimaryUrl,
    bottomCtaSecondaryLabel:
      r.bottomCtaSecondaryLabel || FALLBACK.bottomCtaSecondaryLabel,
    bottomCtaSecondaryLabelRu:
      r.bottomCtaSecondaryLabelRu || FALLBACK.bottomCtaSecondaryLabelRu,
    bottomCtaSecondaryUrl:
      r.bottomCtaSecondaryUrl || FALLBACK.bottomCtaSecondaryUrl,
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
  | "primaryPhoneDescription"
  | "heroPrimaryCtaLabel"
  | "heroWhatsappCtaLabel"
  | "formHeading"
  | "formSubheading"
  | "infoHeading"
  | "emailLabel"
  | "phoneLabel"
  | "phoneCallNote"
  | "addressBlockLabel"
  | "hoursBlockLabel"
  | "serviceAreasBlockLabel"
  | "serviceAreasBlockShort"
  | "serviceAreasBlockNote"
  | "faqsHeading"
  | "bottomCtaHeading"
  | "bottomCtaSubheading"
  | "bottomCtaPrimaryLabel"
  | "bottomCtaSecondaryLabel";

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
