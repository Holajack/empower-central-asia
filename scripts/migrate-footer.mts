/**
 * Phase 8b — seed footerSettings singleton with current Footer copy.
 *
 *   SANITY_WRITE_TOKEN=<token> npx tsx scripts/migrate-footer.mts
 *
 * Idempotent — _id="footerSettings".
 */
import { createClient } from "@sanity/client";

const projectId = "55u2jb6b";
const dataset = "production";
const token = process.env.SANITY_WRITE_TOKEN;
if (!token) {
  console.error("\n❌ Missing SANITY_WRITE_TOKEN.\n");
  process.exit(1);
}
const client = createClient({ projectId, dataset, token, apiVersion: "2024-01-01", useCdn: false });

async function main() {
  console.log("\n🚀 Seeding footerSettings\n");
  await client.createOrReplace({
    _id: "footerSettings",
    _type: "footerSettings",
    quickLinksHeading: "Quick Links",
    quickLinksHeadingRu: "Быстрые ссылки",
    quickLinks: [
      { _key: "ql1", label: "About", labelRu: "О нас", url: "/about" },
      { _key: "ql2", label: "Programs", labelRu: "Программы", url: "/programs-and-impact" },
      { _key: "ql3", label: "Success Stories", labelRu: "Истории успеха", url: "/success-stories" },
      { _key: "ql4", label: "Blog", labelRu: "Блог", url: "/blog" },
      { _key: "ql5", label: "Free Resources", labelRu: "Бесплатные ресурсы", url: "/resources" },
      { _key: "ql6", label: "Contact", labelRu: "Контакты", url: "/contact" },
    ],
    contactHeading: "Contact Us",
    contactHeadingRu: "Контакты",
    emailUsLabel: "Email us",
    emailUsLabelRu: "Написать нам",
    textUsLabel: "Text us",
    textUsLabelRu: "Написать SMS",
    whatsAppLabel: "WhatsApp",
    followUsHeading: "Follow Us",
    followUsHeadingRu: "Мы в соцсетях",
    copyright: "Businesses Beyond Borders. All rights reserved.",
    copyrightRu: "Businesses Beyond Borders. Все права защищены.",
    legalLinks: [
      { _key: "ll1", label: "Privacy Policy", labelRu: "Политика конфиденциальности", url: "/privacy" },
      { _key: "ll2", label: "Mobile Terms", labelRu: "Условия мобильного использования", url: "/mobile-terms" },
      { _key: "ll3", label: "SMS Notifications", labelRu: "SMS-уведомления", url: "/sms" },
    ],
  });
  console.log("✅ Done. Visit https://bbborders.sanity.studio/structure/footerSettings to verify.\n");
}

main().catch((err) => {
  console.error("\n❌ Migration crashed:", err);
  process.exit(1);
});
