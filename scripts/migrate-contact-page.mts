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
  });

  console.log(
    "Done. Visit https://bbborders.sanity.studio/structure/contactPage to verify.\n"
  );
}

main().catch((err) => {
  console.error("\nMigration crashed:", err);
  process.exit(1);
});
