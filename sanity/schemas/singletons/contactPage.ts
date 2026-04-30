import { defineField, defineType } from "sanity";

/**
 * The /contact page — hero copy, business hours table, service-areas list,
 * emergency-contact section. Mailing address + email + phone live on
 * siteSettings (already wired); this singleton owns the rest of the page.
 */
export default defineType({
  name: "contactPage",
  title: "Contact Page",
  type: "document",
  description:
    "All editable copy on /contact: hero, business hours table, service-areas list, emergency-contact section. Mailing address + email + phone come from Site Settings.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "details", title: "Hours & Service Areas" },
  ],
  fields: [
    defineField({
      name: "heroHeading",
      title: "Hero Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Get in Touch",
    }),
    defineField({
      name: "heroHeadingRu",
      title: "Hero Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Свяжитесь с нами",
    }),
    defineField({
      name: "heroSubheading",
      title: "Hero Subheading (English)",
      type: "text",
      rows: 3,
      group: "english",
    }),
    defineField({
      name: "heroSubheadingRu",
      title: "Hero Subheading (Русский)",
      type: "text",
      rows: 3,
      group: "russian",
    }),
    defineField({
      name: "businessHoursHeading",
      title: "Business Hours Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Business Hours",
    }),
    defineField({
      name: "businessHoursHeadingRu",
      title: "Business Hours Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Часы работы",
    }),
    defineField({
      name: "businessHours",
      title: "Business Hours",
      type: "array",
      group: "details",
      of: [
        {
          type: "object",
          name: "hoursRow",
          fields: [
            { name: "label", type: "string", title: "Day(s) Label (English)" },
            { name: "labelRu", type: "string", title: "Day(s) Label (Русский)" },
            { name: "hours", type: "string", title: "Hours (English)" },
            { name: "hoursRu", type: "string", title: "Hours (Русский)" },
          ],
          preview: {
            select: { title: "label", subtitle: "hours" },
          },
        },
      ],
      description: "Each row = one day or day range. e.g. label='Monday - Friday' hours='9:00 AM - 6:00 PM EST'.",
    }),
    defineField({
      name: "serviceAreasHeading",
      title: "Service Areas Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Service Areas",
    }),
    defineField({
      name: "serviceAreasHeadingRu",
      title: "Service Areas Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Регионы обслуживания",
    }),
    defineField({
      name: "serviceAreas",
      title: "Service Areas",
      type: "array",
      group: "details",
      of: [
        {
          type: "object",
          name: "serviceArea",
          fields: [
            { name: "label", type: "string", title: "Description (English)" },
            { name: "labelRu", type: "string", title: "Description (Русский)" },
          ],
          preview: { select: { title: "label" } },
        },
      ],
    }),
    defineField({
      name: "emergencyHeading",
      title: "Emergency Contact Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Emergency Contact",
    }),
    defineField({
      name: "emergencyHeadingRu",
      title: "Emergency Contact Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Экстренная связь",
    }),
    defineField({
      name: "emergencyBody",
      title: "Emergency Contact Body (English)",
      type: "text",
      group: "english",
      rows: 3,
      description:
        "Body text that appears in the emergency contact callout. The phone number itself is rendered separately (from Site Settings).",
    }),
    defineField({
      name: "emergencyBodyRu",
      title: "Emergency Contact Body (Русский)",
      type: "text",
      group: "russian",
      rows: 3,
    }),
    defineField({
      name: "addressLabel",
      title: "Address Label (English)",
      type: "string",
      group: "english",
      description: "Small subtitle under the mailing address (e.g. 'Headquarters & Operations Center').",
      initialValue: "Headquarters & Operations Center",
    }),
    defineField({
      name: "addressLabelRu",
      title: "Address Label (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Штаб-квартира и операционный центр",
    }),
    defineField({
      name: "primaryEmailDescription",
      title: "Primary Email Subtitle (English)",
      type: "string",
      group: "english",
      initialValue: "Primary contact for inquiries",
    }),
    defineField({
      name: "primaryEmailDescriptionRu",
      title: "Primary Email Subtitle (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Основной контакт для вопросов",
    }),
    defineField({
      name: "primaryPhoneDescription",
      title: "Primary Phone Subtitle (English)",
      type: "string",
      group: "english",
      initialValue: "Text & Call Available Monday - Friday",
    }),
    defineField({
      name: "primaryPhoneDescriptionRu",
      title: "Primary Phone Subtitle (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Звонки и сообщения: понедельник — пятница",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Contact Page" }),
  },
});
