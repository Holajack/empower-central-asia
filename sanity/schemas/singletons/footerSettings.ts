import { defineField, defineType } from "sanity";

export default defineType({
  name: "footerSettings",
  title: "Footer",
  type: "document",
  description:
    "All editable copy + links in the site footer. Quick links, contact section labels, follow-us heading, copyright text, legal links. Singleton.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "links", title: "Links" },
  ],
  fields: [
    defineField({
      name: "quickLinksHeading",
      title: "Quick Links Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Quick Links",
    }),
    defineField({
      name: "quickLinksHeadingRu",
      title: "Quick Links Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Быстрые ссылки",
    }),
    defineField({
      name: "quickLinks",
      title: "Quick Links",
      type: "array",
      group: "links",
      description: "Each item: label (English + Russian) + URL.",
      of: [
        {
          type: "object",
          name: "footerLink",
          fields: [
            { name: "label", type: "string", title: "Label (English)" },
            { name: "labelRu", type: "string", title: "Label (Русский)" },
            { name: "url", type: "string", title: "URL (path or full)" },
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        },
      ],
    }),
    defineField({
      name: "contactHeading",
      title: "Contact Section Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Contact Us",
    }),
    defineField({
      name: "contactHeadingRu",
      title: "Contact Section Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Контакты",
    }),
    defineField({
      name: "emailUsLabel",
      title: "'Email us' Label (English)",
      type: "string",
      group: "english",
      initialValue: "Email us",
    }),
    defineField({
      name: "emailUsLabelRu",
      title: "'Email us' Label (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Написать нам",
    }),
    defineField({
      name: "textUsLabel",
      title: "'Text us' Label (English) — for non-Central-Asia visitors",
      type: "string",
      group: "english",
      initialValue: "Text us",
    }),
    defineField({
      name: "textUsLabelRu",
      title: "'Text us' Label (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "whatsAppLabel",
      title: "WhatsApp Label — for Central-Asia visitors",
      type: "string",
      group: "english",
      initialValue: "WhatsApp",
    }),
    defineField({
      name: "followUsHeading",
      title: "Follow Us Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Follow Us",
    }),
    defineField({
      name: "followUsHeadingRu",
      title: "Follow Us Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Мы в соцсетях",
    }),
    defineField({
      name: "copyright",
      title: "Copyright Text (English)",
      type: "string",
      group: "english",
      description:
        "Shown after © {year}. e.g. 'Businesses Beyond Borders. All rights reserved.'",
      initialValue: "Businesses Beyond Borders. All rights reserved.",
    }),
    defineField({
      name: "copyrightRu",
      title: "Copyright Text (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Businesses Beyond Borders. Все права защищены.",
    }),
    defineField({
      name: "legalLinks",
      title: "Legal Links (bottom row)",
      type: "array",
      group: "links",
      description: "Privacy, terms, etc. — shown bottom-right of footer.",
      of: [
        {
          type: "object",
          name: "footerLink",
          fields: [
            { name: "label", type: "string", title: "Label (English)" },
            { name: "labelRu", type: "string", title: "Label (Русский)" },
            { name: "url", type: "string", title: "URL" },
          ],
          preview: {
            select: { title: "label", subtitle: "url" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Footer Settings" }),
  },
});
