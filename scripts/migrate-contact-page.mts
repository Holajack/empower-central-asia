/**
 * Seed the `contactPage` singleton with the current bilingual copy that
 * was previously hardcoded in:
 *   - src/components/contact/ContactInfo.tsx
 *   - src/pages/Contact.tsx (hero only)
 *
 * The mailing address, primary email, and primary phone live on
 * `siteSettings` (already wired) — this singleton owns hero copy, the
 * business-hours table, the service-areas list, the emergency-contact
 * callout, and the small subtitles next to each contact block.
 *
 * Idempotent — uses createOrReplace with _id="contactPage".
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:contact-page
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token) {
  console.error(
    "\n❌ Missing SANITY_WRITE_TOKEN. Get one at https://sanity.io/manage and run:\n" +
      "   SANITY_WRITE_TOKEN=<token> npm run migrate:contact-page\n"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: "2024-01-01",
  useCdn: false,
});

async function main() {
  console.log("\nSeeding contactPage singleton...\n");

  await client.createOrReplace({
    _id: "contactPage",
    _type: "contactPage",

    // ── Hero ────────────────────────────────────────────────────────────────
    heroHeading: "Get in Touch",
    heroHeadingRu: "Свяжитесь с нами",
    heroSubheading:
      "Whether you're interested in volunteering, partnerships, or learning about our programs — we'd love to hear from you.",
    heroSubheadingRu:
      "Хотите стать волонтёром, установить партнёрство или узнать о наших программах? Мы будем рады услышать вас.",

    // ── Business hours ──────────────────────────────────────────────────────
    businessHoursHeading: "Business Hours",
    businessHoursHeadingRu: "Часы работы",
    businessHours: [
      {
        _key: "row-mon-fri",
        _type: "hoursRow",
        label: "Monday - Friday",
        labelRu: "Понедельник — Пятница",
        hours: "9:00 AM - 6:00 PM EST",
        hoursRu: "9:00 — 18:00 EST",
      },
      {
        _key: "row-saturday",
        _type: "hoursRow",
        label: "Saturday",
        labelRu: "Суббота",
        hours: "10:00 AM - 2:00 PM EST",
        hoursRu: "10:00 — 14:00 EST",
      },
      {
        _key: "row-sunday",
        _type: "hoursRow",
        label: "Sunday",
        labelRu: "Воскресенье",
        hours: "Closed",
        hoursRu: "Выходной",
      },
    ],

    // ── Service areas ───────────────────────────────────────────────────────
    serviceAreasHeading: "Service Areas",
    serviceAreasHeadingRu: "Регионы обслуживания",
    serviceAreas: [
      {
        _key: "area-central-asia",
        _type: "serviceArea",
        label: "Central Asia: Kazakhstan, Kyrgyzstan, Uzbekistan",
        labelRu: "Центральная Азия: Казахстан, Кыргызстан, Узбекистан",
      },
      {
        _key: "area-remote",
        _type: "serviceArea",
        label: "Remote consultations available worldwide",
        labelRu: "Онлайн-консультации по всему миру",
      },
    ],

    // ── Emergency contact callout ───────────────────────────────────────────
    emergencyHeading: "Emergency Contact",
    emergencyHeadingRu: "Экстренная связь",
    emergencyBody:
      "For urgent matters related to ongoing programs, please call or text our emergency line at ",
    emergencyBodyRu:
      "По срочным вопросам, связанным с текущими программами, позвоните или напишите на нашу линию экстренной связи: ",

    // ── Subtitles next to address / email / phone (from siteSettings) ───────
    addressLabel: "Headquarters & Operations Center",
    addressLabelRu: "Штаб-квартира и операционный центр",
    primaryEmailDescription: "Primary contact for inquiries",
    primaryEmailDescriptionRu: "Основной контакт для вопросов",
    primaryPhoneDescription: "Text & Call Available Monday - Friday",
    primaryPhoneDescriptionRu: "Звонки и сообщения: понедельник — пятница",

    // ── Hero CTA buttons ─────────────────────────────────────────────────────
    heroPrimaryCtaLabel: "Send a Message",
    heroPrimaryCtaLabelRu: "Написать нам",
    heroSecondaryCtaLabel: "",
    heroWhatsappCtaLabel: "WhatsApp",
    heroWhatsappCtaLabelRu: "WhatsApp",
    whatsappUrl: "https://wa.me/13865171527",

    // ── Form section ────────────────────────────────────────────────────────
    formHeading: "Send Us a Message",
    formHeadingRu: "Напишите нам",
    formSubheading: "We typically respond within 24-48 hours.",
    formSubheadingRu: "Как правило, мы отвечаем в течение 24–48 часов.",

    // ── Right-column info card labels ───────────────────────────────────────
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

    // ── FAQs ────────────────────────────────────────────────────────────────
    faqsHeading: "Common Questions",
    faqsHeadingRu: "Частые вопросы",
    faqs: [
      {
        _key: "faq-response-time",
        _type: "contactFaq",
        question: "How quickly do you respond to inquiries?",
        questionRu: "Как быстро вы отвечаете на запросы?",
        answer:
          "We typically respond within 24-48 hours during business days. For urgent matters, call us directly at (386) 517-1527.",
        answerRu:
          "Как правило, мы отвечаем в течение 24–48 часов в рабочие дни. По срочным вопросам вы можете написать нам в WhatsApp или позвонить напрямую по номеру (386) 517-1527.",
      },
      {
        _key: "faq-consultation",
        _type: "contactFaq",
        question: "Can I schedule a consultation?",
        questionRu: "Могу ли я записаться на консультацию?",
        answer:
          "Yes. We offer free initial consultations to discuss volunteer opportunities, corporate partnerships, or how our programs can benefit your organization. Use the contact form or call us to schedule.",
        answerRu:
          "Да. Мы предлагаем бесплатные первичные консультации для обсуждения возможностей волонтёрства, корпоративного партнёрства или того, как наши программы могут принести пользу вашей организации. Воспользуйтесь формой обратной связи, свяжитесь с нами через WhatsApp или позвоните нам для записи.",
      },
      {
        _key: "faq-international",
        _type: "contactFaq",
        question: "Do you work with international partners?",
        questionRu: "Работаете ли вы с международными партнёрами?",
        answer:
          "Absolutely. We collaborate with organizations in Central Asia and worldwide. Our programs operate in Kazakhstan, Kyrgyzstan, and Uzbekistan, with remote consultations available globally.",
        answerRu:
          "Безусловно. Мы сотрудничаем с организациями в Центральной Азии и по всему миру. Наши программы реализуются в Казахстане, Кыргызстане и Узбекистане, а удалённые консультации доступны в глобальном масштабе.",
      },
      {
        _key: "faq-languages",
        _type: "contactFaq",
        question: "What languages do you support?",
        questionRu: "На каких языках вы работаете?",
        answer:
          "Our team communicates in English and Russian. Programs in Central Asia are delivered in local languages with bilingual facilitation.",
        answerRu:
          "Наша команда общается на английском и русском языках. Программы в Центральной Азии проводятся на местных языках с двуязычным сопровождением.",
      },
    ],

    // ── Bottom CTA banner ───────────────────────────────────────────────────
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
  });

  console.log(
    "Done. Visit https://bbborders.sanity.studio/structure/contactPage to verify.\n"
  );
}

main().catch((err) => {
  console.error("\nMigration crashed:", err);
  process.exit(1);
});
