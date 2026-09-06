/**
 * Patches the existing siteSettings singleton with the new structured-address
 * fields and Google Maps embed URL added in this commit:
 *   addressLocality, addressRegion, addressZip, addressCountry, mapEmbedUrl
 *
 * Idempotent — uses client.patch().setIfMissing() so admin-edited values
 * never get overwritten. Only fills fields that are currently empty.
 *
 * Run AFTER `npm run studio:deploy` so Studio recognizes the new fields.
 *
 * Usage:
 *   SANITY_WRITE_TOKEN=<token> npm run migrate:site-settings-address
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
  console.log("\nPatching siteSettings with structured-address fields...\n");

  // setIfMissing only fills empty fields — preserves any admin edits.
  const result = await client
    .patch("siteSettings")
    .setIfMissing({
      addressLocality: "Port Orange",
      addressRegion: "FL",
      addressZip: "32128",
      addressCountry: "US",
      mapEmbedUrl:
        "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3533.8234567890123!2d-81.02345678901234!3d29.123456789012345!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88e6c8b123456789%3A0x123456789abcdef0!2s2570%20Jasmine%20Rd%2C%20Port%20Orange%2C%20FL%2032128%2C%20USA!5e0!3m2!1sen!2sus!4v1647894687693!5m2!1sen!2sus",
    })
    .commit();

  console.log("Done. Patched fields:", Object.keys(result));
  console.log(
    "\nRemember: admin-edited values are preserved. Only blank fields get the defaults.\n",
    "Edit them at https://bbborders.sanity.studio/structure/siteSettings → Contact tab.\n"
  );
}

main().catch((err) => {
  console.error("\nMigration crashed:", err);
  process.exit(1);
});
