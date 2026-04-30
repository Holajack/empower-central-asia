/**
 * Fetches the singleton `formSettings` document from Sanity.
 *
 * Returns `{forms}` with a helper object per form section. Each section
 * exposes four localized helpers:
 *
 *   forms.newsletter.getHeading(isCentralAsia)
 *   forms.newsletter.getSubheading(isCentralAsia)
 *   forms.newsletter.getButtonLabel(isCentralAsia)
 *   forms.newsletter.getSuccessMessage(isCentralAsia)
 *
 * and the same pattern for `contact`, `volunteer`, and `partner`.
 *
 * Hardcoded fallbacks mirror the `initialValue` in the Sanity schema and the
 * copy that the four pages used before CMS wiring. The site never breaks if
 * Sanity is unreachable.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface FormSection {
  heading: string;
  headingRu?: string;
  subheading?: string;
  subheadingRu?: string;
  buttonLabel: string;
  buttonLabelRu?: string;
  successMessage: string;
  successMessageRu?: string;
  /** Localized helpers — pass isCentralAsia from useRegion(). */
  getHeading: (isCA: boolean) => string;
  getSubheading: (isCA: boolean) => string;
  getButtonLabel: (isCA: boolean) => string;
  getSuccessMessage: (isCA: boolean) => string;
}

export interface FormSettings {
  newsletter: FormSection;
  contact: FormSection;
  volunteer: FormSection;
  partner: FormSection;
}

// ── Fallbacks (mirror Sanity initialValues + current page copy) ───────────────

const FALLBACK_RAW = {
  // Newsletter
  newsletterHeading: "Stay Connected",
  newsletterHeadingRu: "Оставайтесь на связи",
  newsletterSubheading:
    "Get inspiring updates about our work empowering entrepreneurs in Central Asia. Success stories, program updates, and ways to make a difference.",
  newsletterSubheadingRu:
    "Получайте вдохновляющие новости о нашей работе по развитию предпринимательства в Центральной Азии. Истории успеха, обновления программ и возможности для участия.",
  newsletterButtonLabel: "Subscribe",
  newsletterButtonLabelRu: "Подписаться",
  newsletterSuccessMessage:
    "Thank you for joining our community. You'll receive updates about our work empowering entrepreneurs in Central Asia.",
  newsletterSuccessMessageRu:
    "Спасибо, что присоединились к нашему сообществу. Вы будете получать новости о нашей работе по поддержке предпринимателей в Центральной Азии.",

  // Contact
  contactHeading: "Get in Touch",
  contactHeadingRu: "Свяжитесь с нами",
  contactSubheading:
    "Whether you're interested in volunteering, partnerships, or learning about our programs — we'd love to hear from you.",
  contactSubheadingRu:
    "Хотите стать волонтёром, установить партнёрство или узнать о наших программах? Мы будем рады услышать вас.",
  contactButtonLabel: "Send Message",
  contactButtonLabelRu: "Отправить сообщение",
  contactSuccessMessage:
    "Thanks for reaching out — we'll reply within 1-2 business days.",
  contactSuccessMessageRu:
    "Спасибо за обращение — мы ответим в течение 1–2 рабочих дней.",

  // Volunteer
  volunteerHeading: "Your Skills Can Change Someone's Future",
  volunteerHeadingRu: "Ваши навыки могут изменить чьё-то будущее",
  volunteerSubheading:
    "A few hours a week of your experience can help an entrepreneur in Central Asia build a business that transforms their community.",
  volunteerSubheadingRu:
    "Несколько часов вашего опыта в неделю помогут предпринимателю из Центральной Азии построить бизнес, который преобразит его сообщество.",
  volunteerButtonLabel: "Submit Volunteer Application",
  volunteerButtonLabelRu: "Подать заявку на волонтёрство",
  volunteerSuccessMessage:
    "Thank you for wanting to volunteer with BBB. We'll review your application and reach out within a few business days.",
  volunteerSuccessMessageRu:
    "Спасибо за желание стать волонтёром BBB. Мы рассмотрим вашу заявку и свяжемся с вами в течение нескольких рабочих дней.",

  // Partner
  partnerHeading: "Partner With Purpose",
  partnerHeadingRu: "Партнёрство с целью",
  partnerSubheading:
    "We don't just accept partners — we build relationships grounded in shared values, clear expectations, and measurable impact.",
  partnerSubheadingRu:
    "Мы не просто принимаем партнёров — мы выстраиваем отношения, основанные на общих ценностях, чётких ожиданиях и измеримых результатах.",
  partnerButtonLabel: "Start the Partnership Conversation",
  partnerButtonLabelRu: "Начать диалог",
  partnerSuccessMessage:
    "Thank you for your interest in partnering with BBB. We'll review your application and reach out within a few business days to schedule a conversation.",
  partnerSuccessMessageRu:
    "Спасибо за интерес к партнёрству с BBB. Мы рассмотрим вашу заявку и свяжемся с вами в ближайшие рабочие дни, чтобы назначить встречу.",
};

// ── GROQ query ────────────────────────────────────────────────────────────────

const FORM_SETTINGS_QUERY = /* groq */ `
  *[_type == "formSettings"][0]{
    newsletterHeading,
    newsletterHeadingRu,
    newsletterSubheading,
    newsletterSubheadingRu,
    newsletterButtonLabel,
    newsletterButtonLabelRu,
    newsletterSuccessMessage,
    newsletterSuccessMessageRu,
    contactHeading,
    contactHeadingRu,
    contactSubheading,
    contactSubheadingRu,
    contactButtonLabel,
    contactButtonLabelRu,
    contactSuccessMessage,
    contactSuccessMessageRu,
    volunteerHeading,
    volunteerHeadingRu,
    volunteerSubheading,
    volunteerSubheadingRu,
    volunteerButtonLabel,
    volunteerButtonLabelRu,
    volunteerSuccessMessage,
    volunteerSuccessMessageRu,
    partnerHeading,
    partnerHeadingRu,
    partnerSubheading,
    partnerSubheadingRu,
    partnerButtonLabel,
    partnerButtonLabelRu,
    partnerSuccessMessage,
    partnerSuccessMessageRu
  }
`;

interface RawFormSettings {
  newsletterHeading?: string;
  newsletterHeadingRu?: string;
  newsletterSubheading?: string;
  newsletterSubheadingRu?: string;
  newsletterButtonLabel?: string;
  newsletterButtonLabelRu?: string;
  newsletterSuccessMessage?: string;
  newsletterSuccessMessageRu?: string;
  contactHeading?: string;
  contactHeadingRu?: string;
  contactSubheading?: string;
  contactSubheadingRu?: string;
  contactButtonLabel?: string;
  contactButtonLabelRu?: string;
  contactSuccessMessage?: string;
  contactSuccessMessageRu?: string;
  volunteerHeading?: string;
  volunteerHeadingRu?: string;
  volunteerSubheading?: string;
  volunteerSubheadingRu?: string;
  volunteerButtonLabel?: string;
  volunteerButtonLabelRu?: string;
  volunteerSuccessMessage?: string;
  volunteerSuccessMessageRu?: string;
  partnerHeading?: string;
  partnerHeadingRu?: string;
  partnerSubheading?: string;
  partnerSubheadingRu?: string;
  partnerButtonLabel?: string;
  partnerButtonLabelRu?: string;
  partnerSuccessMessage?: string;
  partnerSuccessMessageRu?: string;
}

// ── Builder ───────────────────────────────────────────────────────────────────

function makeSection(
  heading: string,
  headingRu: string | undefined,
  subheading: string | undefined,
  subheadingRu: string | undefined,
  buttonLabel: string,
  buttonLabelRu: string | undefined,
  successMessage: string,
  successMessageRu: string | undefined
): FormSection {
  return {
    heading,
    headingRu,
    subheading,
    subheadingRu,
    buttonLabel,
    buttonLabelRu,
    successMessage,
    successMessageRu,
    getHeading: (isCA) => getLocalized(heading, headingRu, isCA),
    getSubheading: (isCA) => getLocalized(subheading, subheadingRu, isCA),
    getButtonLabel: (isCA) => getLocalized(buttonLabel, buttonLabelRu, isCA),
    getSuccessMessage: (isCA) => getLocalized(successMessage, successMessageRu, isCA),
  };
}

function shape(raw: RawFormSettings | null): FormSettings {
  const r = raw ?? {};

  return {
    newsletter: makeSection(
      r.newsletterHeading || FALLBACK_RAW.newsletterHeading,
      r.newsletterHeadingRu || FALLBACK_RAW.newsletterHeadingRu,
      r.newsletterSubheading || FALLBACK_RAW.newsletterSubheading,
      r.newsletterSubheadingRu || FALLBACK_RAW.newsletterSubheadingRu,
      r.newsletterButtonLabel || FALLBACK_RAW.newsletterButtonLabel,
      r.newsletterButtonLabelRu || FALLBACK_RAW.newsletterButtonLabelRu,
      r.newsletterSuccessMessage || FALLBACK_RAW.newsletterSuccessMessage,
      r.newsletterSuccessMessageRu || FALLBACK_RAW.newsletterSuccessMessageRu
    ),
    contact: makeSection(
      r.contactHeading || FALLBACK_RAW.contactHeading,
      r.contactHeadingRu || FALLBACK_RAW.contactHeadingRu,
      r.contactSubheading || FALLBACK_RAW.contactSubheading,
      r.contactSubheadingRu || FALLBACK_RAW.contactSubheadingRu,
      r.contactButtonLabel || FALLBACK_RAW.contactButtonLabel,
      r.contactButtonLabelRu || FALLBACK_RAW.contactButtonLabelRu,
      r.contactSuccessMessage || FALLBACK_RAW.contactSuccessMessage,
      r.contactSuccessMessageRu || FALLBACK_RAW.contactSuccessMessageRu
    ),
    volunteer: makeSection(
      r.volunteerHeading || FALLBACK_RAW.volunteerHeading,
      r.volunteerHeadingRu || FALLBACK_RAW.volunteerHeadingRu,
      r.volunteerSubheading || FALLBACK_RAW.volunteerSubheading,
      r.volunteerSubheadingRu || FALLBACK_RAW.volunteerSubheadingRu,
      r.volunteerButtonLabel || FALLBACK_RAW.volunteerButtonLabel,
      r.volunteerButtonLabelRu || FALLBACK_RAW.volunteerButtonLabelRu,
      r.volunteerSuccessMessage || FALLBACK_RAW.volunteerSuccessMessage,
      r.volunteerSuccessMessageRu || FALLBACK_RAW.volunteerSuccessMessageRu
    ),
    partner: makeSection(
      r.partnerHeading || FALLBACK_RAW.partnerHeading,
      r.partnerHeadingRu || FALLBACK_RAW.partnerHeadingRu,
      r.partnerSubheading || FALLBACK_RAW.partnerSubheading,
      r.partnerSubheadingRu || FALLBACK_RAW.partnerSubheadingRu,
      r.partnerButtonLabel || FALLBACK_RAW.partnerButtonLabel,
      r.partnerButtonLabelRu || FALLBACK_RAW.partnerButtonLabelRu,
      r.partnerSuccessMessage || FALLBACK_RAW.partnerSuccessMessage,
      r.partnerSuccessMessageRu || FALLBACK_RAW.partnerSuccessMessageRu
    ),
  };
}

// Re-export the fallback shape for callers that want it (e.g. tests).
export const FALLBACK_FORM_SETTINGS: FormSettings = shape(null);

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useFormSettings(): { forms: FormSettings; isLoading: boolean } {
  const { data, isLoading } = useQuery({
    queryKey: ["formSettings"],
    queryFn: async () => {
      try {
        return await sanity.fetch<RawFormSettings | null>(FORM_SETTINGS_QUERY);
      } catch (err) {
        if (import.meta.env.DEV) {
          // eslint-disable-next-line no-console
          console.warn("[formSettings] Sanity fetch failed:", err);
        }
        return null;
      }
    },
  });

  return {
    forms: shape(data ?? null),
    isLoading,
  };
}
