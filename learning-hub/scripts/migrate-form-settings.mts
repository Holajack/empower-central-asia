/**
 * Seed the `formSettings` singleton with the current copy from the four
 * form-driven pages: Newsletter, Contact, Volunteer Application, and
 * Partner Application.
 *
 * Idempotent — uses createOrReplace with _id="formSettings".
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:forms
 */
import { createClient } from "@sanity/client";

const projectId = process.env.SANITY_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_DATASET || process.env.VITE_SANITY_DATASET || "production";
const token = process.env.SANITY_WRITE_TOKEN;

if (!token || !projectId) {
  console.error("\n❌ Set SANITY_PROJECT_ID and SANITY_WRITE_TOKEN (see SETUP.md).\n");
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
  console.log("\nSeeding formSettings singleton...\n");

  await client.createOrReplace({
    _id: "formSettings",
    _type: "formSettings",

    // ── Newsletter ──────────────────────────────────────────────────────────
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

    // ── Contact ─────────────────────────────────────────────────────────────
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

    // ── Volunteer Application ───────────────────────────────────────────────
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

    // ── Partner Application ─────────────────────────────────────────────────
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
  });

  console.log(
    "Done. Visit https://bbborders.sanity.studio/structure/formSettings to verify.\n"
  );
}

main().catch((err) => {
  console.error("\nMigration crashed:", err);
  process.exit(1);
});
