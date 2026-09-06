/**
 * Fetches the singleton `formSettings` document from Sanity.
 *
 * Returns `{forms}` with a helper object per form section. Each section
 * exposes localized helpers:
 *
 *   forms.newsletter.getHeading(isCentralAsia)
 *   forms.newsletter.getSubheading(isCentralAsia)
 *   forms.newsletter.getButtonLabel(isCentralAsia)
 *   forms.newsletter.getSuccessMessage(isCentralAsia)
 *
 * Plus per-field helpers (label / placeholder / helper text):
 *
 *   forms.getFieldLabel("contact", "firstName", isCentralAsia)
 *   forms.getFieldPlaceholder("contact", "email", isCentralAsia)
 *   forms.getFieldHelper("volunteer", "skills", isCentralAsia)
 *
 * Hardcoded fallbacks mirror the `initialValue` in the Sanity schema and the
 * copy that the four pages used before CMS wiring. The site never breaks if
 * Sanity is unreachable.
 */
import { useQuery } from "@tanstack/react-query";
import { sanity } from "@/lib/sanity";
import { getLocalized } from "@/lib/localized";
import { siteConfig } from "@/lib/seo";

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

export type FormName = "newsletter" | "contact" | "volunteer" | "partner";

export interface FormFieldLabel {
  fieldName: string;
  label: string;
  labelRu?: string;
  placeholder?: string;
  placeholderRu?: string;
  helperText?: string;
  helperTextRu?: string;
}

export interface FormSettings {
  newsletter: FormSection;
  contact: FormSection;
  volunteer: FormSection;
  partner: FormSection;
  /** Per-form, per-field bilingual labels (raw, indexed by fieldName). */
  fieldLabels: Record<FormName, Record<string, FormFieldLabel>>;
  /**
   * Get the localized label for a given form's field. Falls back to the
   * hardcoded English label if the entry isn't in Sanity yet.
   */
  getFieldLabel: (
    formName: FormName,
    fieldName: string,
    isCentralAsia: boolean,
  ) => string;
  /**
   * Get the localized placeholder for a given form's field. Returns "" if
   * the field has no placeholder defined.
   */
  getFieldPlaceholder: (
    formName: FormName,
    fieldName: string,
    isCentralAsia: boolean,
  ) => string;
  /**
   * Get the localized helper text for a given form's field. Returns "" if
   * the field has no helper text defined.
   */
  getFieldHelper: (
    formName: FormName,
    fieldName: string,
    isCentralAsia: boolean,
  ) => string;
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
    `Thank you for wanting to volunteer with ${siteConfig.shortName}. We'll review your application and reach out within a few business days.`,
  volunteerSuccessMessageRu:
    `Спасибо за желание стать волонтёром ${siteConfig.shortName}. Мы рассмотрим вашу заявку и свяжемся с вами в течение нескольких рабочих дней.`,

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
    `Thank you for your interest in partnering with ${siteConfig.shortName}. We'll review your application and reach out within a few business days to schedule a conversation.`,
  partnerSuccessMessageRu:
    `Спасибо за интерес к партнёрству с ${siteConfig.shortName}. Мы рассмотрим вашу заявку и свяжемся с вами в ближайшие рабочие дни, чтобы назначить встречу.`,
};

// ── Field-label fallbacks (mirror current hardcoded copy in form components) ──
// These mirror exactly what each form renders today before CMS wiring.

const FALLBACK_FIELD_LABELS: Record<FormName, FormFieldLabel[]> = {
  // /newsletter standalone signup page
  newsletter: [
    {
      fieldName: "firstName",
      label: "First name",
      labelRu: "Имя",
      placeholder: "First name",
      placeholderRu: "Имя",
    },
    {
      fieldName: "lastName",
      label: "Last name",
      labelRu: "Фамилия",
      placeholder: "Last name",
      placeholderRu: "Фамилия",
    },
    {
      fieldName: "email",
      label: "Email",
      labelRu: "Электронная почта",
      placeholder: "you@example.com",
      placeholderRu: "you@example.com",
    },
    {
      fieldName: "phone",
      label: "Phone number",
      labelRu: "Номер телефона",
      placeholder: "(386) 555-0123",
      placeholderRu: "+7 (700) 000-0000",
    },
  ],

  // /contact page (rendered via GoHighLevelForm)
  contact: [
    {
      fieldName: "firstName",
      label: "First Name",
      labelRu: "Имя",
      placeholder: "Enter your first name",
      placeholderRu: "Введите ваше имя",
    },
    {
      fieldName: "lastName",
      label: "Last Name",
      labelRu: "Фамилия",
      placeholder: "Enter your last name",
      placeholderRu: "Введите вашу фамилию",
    },
    {
      fieldName: "email",
      label: "Email Address",
      labelRu: "Электронная почта",
      placeholder: "your@email.com",
      placeholderRu: "ваш@email.com",
    },
    {
      fieldName: "phone",
      label: "Phone Number",
      labelRu: "Номер телефона",
      placeholder: "(386) 555-0123",
      placeholderRu: "+7 (555) 000-0000",
    },
    {
      fieldName: "inquiryType",
      label: "How can we help you?",
      labelRu: "Как мы можем помочь вам?",
      placeholder: "Select inquiry type",
      placeholderRu: "Выберите тип запроса",
    },
    {
      fieldName: "message",
      label: "Your Message",
      labelRu: "Ваше сообщение",
      placeholder:
        "Tell us more about your inquiry. The more details you provide, the better we can assist you.",
      placeholderRu:
        "Расскажите подробнее о вашем запросе. Чем больше деталей вы предоставите, тем лучше мы сможем помочь.",
    },
  ],

  // /volunteer-application page
  volunteer: [
    {
      fieldName: "firstName",
      label: "First Name",
      labelRu: "Имя",
      placeholder: "First name",
      placeholderRu: "Имя",
    },
    {
      fieldName: "lastName",
      label: "Last Name",
      labelRu: "Фамилия",
      placeholder: "Last name",
      placeholderRu: "Фамилия",
    },
    {
      fieldName: "email",
      label: "Email",
      labelRu: "Электронная почта",
      placeholder: "you@email.com",
      placeholderRu: "you@email.com",
    },
    {
      fieldName: "phone",
      label: "Phone",
      labelRu: "WhatsApp / Телефон",
      placeholder: "(386) 555-0123",
      placeholderRu: "+7 (999) 123-45-67",
    },
    {
      fieldName: "volunteerType",
      label: "Role You're Interested In",
      labelRu: "Интересующая роль",
      placeholder: "Select a role",
      placeholderRu: "Выберите роль",
    },
    {
      fieldName: "availability",
      label: "Availability",
      labelRu: "Доступность",
      placeholder: "Your availability",
      placeholderRu: "Ваша доступность",
    },
    {
      fieldName: "experience",
      label: "Relevant Experience",
      labelRu: "Соответствующий опыт",
      placeholder:
        "What professional or volunteer experience do you bring? What skills could you contribute?",
      placeholderRu:
        "Какой профессиональный или волонтёрский опыт вы привносите? Какие навыки могли бы применить?",
    },
    {
      fieldName: "motivation",
      label: "Why Do You Want to Volunteer?",
      labelRu: "Почему вы хотите стать волонтёром?",
      placeholder:
        `What draws you to ${siteConfig.shortName}'s mission? Why is this meaningful to you?`,
      placeholderRu:
        `Что привлекает вас в миссии ${siteConfig.shortName}? Почему это важно для вас?`,
    },
    {
      fieldName: "skills",
      label: "Skills & Expertise",
      labelRu: "Навыки и экспертиза",
      placeholder:
        "e.g., Business mentorship, marketing, financial planning, event coordination...",
      placeholderRu:
        "Например: наставничество в бизнесе, маркетинг, финансовое планирование, организация мероприятий...",
    },
  ],

  // /partner-application page
  partner: [
    {
      fieldName: "orgName",
      label: "Organization Name",
      labelRu: "Название организации",
      placeholder: "Your organization",
      placeholderRu: "Ваша организация",
    },
    {
      fieldName: "contactName",
      label: "Your Name",
      labelRu: "Ваше имя",
      placeholder: "Full name",
      placeholderRu: "Имя и фамилия",
    },
    {
      fieldName: "email",
      label: "Email",
      labelRu: "Электронная почта",
      placeholder: "you@org.com",
      placeholderRu: "you@org.com",
    },
    {
      fieldName: "phone",
      label: "Phone",
      labelRu: "Телефон",
      placeholder: "(386) 555-0123",
      placeholderRu: "+7 (700) 000-0000",
    },
    {
      fieldName: "orgType",
      label: "Organization Type",
      labelRu: "Тип организации",
      placeholder: "Select type",
      placeholderRu: "Выберите тип",
    },
    {
      fieldName: "partnershipInterest",
      label: "Partnership Interest",
      labelRu: "Формат партнёрства",
      placeholder: "How you'd like to partner",
      placeholderRu: "Как вы хотите участвовать",
    },
    {
      fieldName: "message",
      label: "Tell Us About Your Interest",
      labelRu: "Расскажите о своём интересе",
      placeholder:
        `What drew you to ${siteConfig.shortName}? What does your organization hope to accomplish through this partnership? Any specific ideas or questions?`,
      placeholderRu:
        `Что привлекло вас в ${siteConfig.shortName}? Чего ваша организация хочет достичь через это партнёрство? Есть ли конкретные идеи или вопросы?`,
    },
  ],
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
    partnerSuccessMessageRu,
    newsletterFieldLabels[]{
      fieldName,
      label,
      labelRu,
      placeholder,
      placeholderRu,
      helperText,
      helperTextRu
    },
    contactFieldLabels[]{
      fieldName,
      label,
      labelRu,
      placeholder,
      placeholderRu,
      helperText,
      helperTextRu
    },
    volunteerFieldLabels[]{
      fieldName,
      label,
      labelRu,
      placeholder,
      placeholderRu,
      helperText,
      helperTextRu
    },
    partnerFieldLabels[]{
      fieldName,
      label,
      labelRu,
      placeholder,
      placeholderRu,
      helperText,
      helperTextRu
    }
  }
`;

interface RawFieldLabel {
  fieldName?: string;
  label?: string;
  labelRu?: string;
  placeholder?: string;
  placeholderRu?: string;
  helperText?: string;
  helperTextRu?: string;
}

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
  newsletterFieldLabels?: RawFieldLabel[];
  contactFieldLabels?: RawFieldLabel[];
  volunteerFieldLabels?: RawFieldLabel[];
  partnerFieldLabels?: RawFieldLabel[];
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
  successMessageRu: string | undefined,
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
    getSuccessMessage: (isCA) =>
      getLocalized(successMessage, successMessageRu, isCA),
  };
}

/**
 * Merge a Sanity field-label array on top of the hardcoded fallbacks. Sanity
 * entries win when they have a non-empty `label`. Anything missing falls back
 * to the bundled defaults so the UI never goes blank.
 */
function mergeFieldLabels(
  fallback: FormFieldLabel[],
  remote: RawFieldLabel[] | undefined,
): Record<string, FormFieldLabel> {
  const map: Record<string, FormFieldLabel> = {};

  for (const f of fallback) {
    map[f.fieldName] = { ...f };
  }

  if (remote && remote.length > 0) {
    for (const r of remote) {
      if (!r.fieldName) continue;
      const base = map[r.fieldName] ?? { fieldName: r.fieldName, label: "" };
      map[r.fieldName] = {
        fieldName: r.fieldName,
        label: r.label || base.label,
        labelRu: r.labelRu ?? base.labelRu,
        placeholder: r.placeholder ?? base.placeholder,
        placeholderRu: r.placeholderRu ?? base.placeholderRu,
        helperText: r.helperText ?? base.helperText,
        helperTextRu: r.helperTextRu ?? base.helperTextRu,
      };
    }
  }

  return map;
}

function shape(raw: RawFormSettings | null): FormSettings {
  const r = raw ?? {};

  const fieldLabels: Record<FormName, Record<string, FormFieldLabel>> = {
    newsletter: mergeFieldLabels(
      FALLBACK_FIELD_LABELS.newsletter,
      r.newsletterFieldLabels,
    ),
    contact: mergeFieldLabels(
      FALLBACK_FIELD_LABELS.contact,
      r.contactFieldLabels,
    ),
    volunteer: mergeFieldLabels(
      FALLBACK_FIELD_LABELS.volunteer,
      r.volunteerFieldLabels,
    ),
    partner: mergeFieldLabels(
      FALLBACK_FIELD_LABELS.partner,
      r.partnerFieldLabels,
    ),
  };

  const getFieldLabel = (
    formName: FormName,
    fieldName: string,
    isCentralAsia: boolean,
  ): string => {
    const entry = fieldLabels[formName]?.[fieldName];
    if (!entry) return "";
    return getLocalized(entry.label, entry.labelRu, isCentralAsia);
  };

  const getFieldPlaceholder = (
    formName: FormName,
    fieldName: string,
    isCentralAsia: boolean,
  ): string => {
    const entry = fieldLabels[formName]?.[fieldName];
    if (!entry) return "";
    return getLocalized(entry.placeholder, entry.placeholderRu, isCentralAsia);
  };

  const getFieldHelper = (
    formName: FormName,
    fieldName: string,
    isCentralAsia: boolean,
  ): string => {
    const entry = fieldLabels[formName]?.[fieldName];
    if (!entry) return "";
    return getLocalized(entry.helperText, entry.helperTextRu, isCentralAsia);
  };

  return {
    newsletter: makeSection(
      r.newsletterHeading || FALLBACK_RAW.newsletterHeading,
      r.newsletterHeadingRu || FALLBACK_RAW.newsletterHeadingRu,
      r.newsletterSubheading || FALLBACK_RAW.newsletterSubheading,
      r.newsletterSubheadingRu || FALLBACK_RAW.newsletterSubheadingRu,
      r.newsletterButtonLabel || FALLBACK_RAW.newsletterButtonLabel,
      r.newsletterButtonLabelRu || FALLBACK_RAW.newsletterButtonLabelRu,
      r.newsletterSuccessMessage || FALLBACK_RAW.newsletterSuccessMessage,
      r.newsletterSuccessMessageRu || FALLBACK_RAW.newsletterSuccessMessageRu,
    ),
    contact: makeSection(
      r.contactHeading || FALLBACK_RAW.contactHeading,
      r.contactHeadingRu || FALLBACK_RAW.contactHeadingRu,
      r.contactSubheading || FALLBACK_RAW.contactSubheading,
      r.contactSubheadingRu || FALLBACK_RAW.contactSubheadingRu,
      r.contactButtonLabel || FALLBACK_RAW.contactButtonLabel,
      r.contactButtonLabelRu || FALLBACK_RAW.contactButtonLabelRu,
      r.contactSuccessMessage || FALLBACK_RAW.contactSuccessMessage,
      r.contactSuccessMessageRu || FALLBACK_RAW.contactSuccessMessageRu,
    ),
    volunteer: makeSection(
      r.volunteerHeading || FALLBACK_RAW.volunteerHeading,
      r.volunteerHeadingRu || FALLBACK_RAW.volunteerHeadingRu,
      r.volunteerSubheading || FALLBACK_RAW.volunteerSubheading,
      r.volunteerSubheadingRu || FALLBACK_RAW.volunteerSubheadingRu,
      r.volunteerButtonLabel || FALLBACK_RAW.volunteerButtonLabel,
      r.volunteerButtonLabelRu || FALLBACK_RAW.volunteerButtonLabelRu,
      r.volunteerSuccessMessage || FALLBACK_RAW.volunteerSuccessMessage,
      r.volunteerSuccessMessageRu || FALLBACK_RAW.volunteerSuccessMessageRu,
    ),
    partner: makeSection(
      r.partnerHeading || FALLBACK_RAW.partnerHeading,
      r.partnerHeadingRu || FALLBACK_RAW.partnerHeadingRu,
      r.partnerSubheading || FALLBACK_RAW.partnerSubheading,
      r.partnerSubheadingRu || FALLBACK_RAW.partnerSubheadingRu,
      r.partnerButtonLabel || FALLBACK_RAW.partnerButtonLabel,
      r.partnerButtonLabelRu || FALLBACK_RAW.partnerButtonLabelRu,
      r.partnerSuccessMessage || FALLBACK_RAW.partnerSuccessMessage,
      r.partnerSuccessMessageRu || FALLBACK_RAW.partnerSuccessMessageRu,
    ),
    fieldLabels,
    getFieldLabel,
    getFieldPlaceholder,
    getFieldHelper,
  };
}

// Re-export the fallback shape for callers that want it (e.g. tests).
export const FALLBACK_FORM_SETTINGS: FormSettings = shape(null);

// Re-export the fallback field labels (mirrors current hardcoded values per
// form). Useful for tests + the migration script.
export { FALLBACK_FIELD_LABELS };

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
