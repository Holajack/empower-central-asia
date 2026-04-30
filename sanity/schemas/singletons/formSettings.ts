import { defineField, defineType } from "sanity";

/**
 * Editable copy for the four form-driven pages: Newsletter, Contact,
 * Volunteer Application, Partner Application. Headings, subheadings,
 * field labels, button text, and success/error messages are all here.
 *
 * Singleton — only one of these exists.
 */
export default defineType({
  name: "formSettings",
  title: "Form Copy",
  type: "document",
  description:
    "Editable copy for Newsletter, Contact, Volunteer Application, and Partner Application pages — headings, subheadings, button labels, success messages.",
  groups: [
    { name: "newsletter", title: "Newsletter", default: true },
    { name: "contact", title: "Contact" },
    { name: "volunteer", title: "Volunteer Application" },
    { name: "partner", title: "Partner Application" },
  ],
  fields: [
    // ── Newsletter ──────────────────────────────────────────────────
    defineField({
      name: "newsletterHeading",
      title: "Newsletter — Heading (English)",
      type: "string",
      group: "newsletter",
      initialValue: "Stay in the loop",
    }),
    defineField({
      name: "newsletterHeadingRu",
      title: "Newsletter — Heading (Русский)",
      type: "string",
      group: "newsletter",
    }),
    defineField({
      name: "newsletterSubheading",
      title: "Newsletter — Subheading (English)",
      type: "text",
      rows: 2,
      group: "newsletter",
    }),
    defineField({
      name: "newsletterSubheadingRu",
      title: "Newsletter — Subheading (Русский)",
      type: "text",
      rows: 2,
      group: "newsletter",
    }),
    defineField({
      name: "newsletterButtonLabel",
      title: "Newsletter — Submit Button (English)",
      type: "string",
      group: "newsletter",
      initialValue: "Subscribe",
    }),
    defineField({
      name: "newsletterButtonLabelRu",
      title: "Newsletter — Submit Button (Русский)",
      type: "string",
      group: "newsletter",
    }),
    defineField({
      name: "newsletterSuccessMessage",
      title: "Newsletter — Success Message (English)",
      type: "text",
      rows: 2,
      group: "newsletter",
      initialValue: "Thanks! Check your inbox to confirm.",
    }),
    defineField({
      name: "newsletterSuccessMessageRu",
      title: "Newsletter — Success Message (Русский)",
      type: "text",
      rows: 2,
      group: "newsletter",
    }),

    // ── Contact ─────────────────────────────────────────────────────
    defineField({
      name: "contactHeading",
      title: "Contact — Heading (English)",
      type: "string",
      group: "contact",
      initialValue: "Contact Us",
    }),
    defineField({
      name: "contactHeadingRu",
      title: "Contact — Heading (Русский)",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactSubheading",
      title: "Contact — Subheading (English)",
      type: "text",
      rows: 3,
      group: "contact",
    }),
    defineField({
      name: "contactSubheadingRu",
      title: "Contact — Subheading (Русский)",
      type: "text",
      rows: 3,
      group: "contact",
    }),
    defineField({
      name: "contactButtonLabel",
      title: "Contact — Submit Button (English)",
      type: "string",
      group: "contact",
      initialValue: "Send Message",
    }),
    defineField({
      name: "contactButtonLabelRu",
      title: "Contact — Submit Button (Русский)",
      type: "string",
      group: "contact",
    }),
    defineField({
      name: "contactSuccessMessage",
      title: "Contact — Success Message (English)",
      type: "text",
      rows: 2,
      group: "contact",
      initialValue: "Thanks for reaching out — we'll reply within 1-2 business days.",
    }),
    defineField({
      name: "contactSuccessMessageRu",
      title: "Contact — Success Message (Русский)",
      type: "text",
      rows: 2,
      group: "contact",
    }),

    // ── Volunteer Application ──────────────────────────────────────
    defineField({
      name: "volunteerHeading",
      title: "Volunteer App — Heading (English)",
      type: "string",
      group: "volunteer",
      initialValue: "Volunteer with BBB",
    }),
    defineField({
      name: "volunteerHeadingRu",
      title: "Volunteer App — Heading (Русский)",
      type: "string",
      group: "volunteer",
    }),
    defineField({
      name: "volunteerSubheading",
      title: "Volunteer App — Subheading (English)",
      type: "text",
      rows: 3,
      group: "volunteer",
    }),
    defineField({
      name: "volunteerSubheadingRu",
      title: "Volunteer App — Subheading (Русский)",
      type: "text",
      rows: 3,
      group: "volunteer",
    }),
    defineField({
      name: "volunteerButtonLabel",
      title: "Volunteer App — Submit Button (English)",
      type: "string",
      group: "volunteer",
      initialValue: "Submit Application",
    }),
    defineField({
      name: "volunteerButtonLabelRu",
      title: "Volunteer App — Submit Button (Русский)",
      type: "string",
      group: "volunteer",
    }),
    defineField({
      name: "volunteerSuccessMessage",
      title: "Volunteer App — Success Message (English)",
      type: "text",
      rows: 2,
      group: "volunteer",
      initialValue:
        "Thanks for applying! We'll review your application and get back to you within a week.",
    }),
    defineField({
      name: "volunteerSuccessMessageRu",
      title: "Volunteer App — Success Message (Русский)",
      type: "text",
      rows: 2,
      group: "volunteer",
    }),

    // ── Partner Application ────────────────────────────────────────
    defineField({
      name: "partnerHeading",
      title: "Partner App — Heading (English)",
      type: "string",
      group: "partner",
      initialValue: "Partner with BBB",
    }),
    defineField({
      name: "partnerHeadingRu",
      title: "Partner App — Heading (Русский)",
      type: "string",
      group: "partner",
    }),
    defineField({
      name: "partnerSubheading",
      title: "Partner App — Subheading (English)",
      type: "text",
      rows: 3,
      group: "partner",
    }),
    defineField({
      name: "partnerSubheadingRu",
      title: "Partner App — Subheading (Русский)",
      type: "text",
      rows: 3,
      group: "partner",
    }),
    defineField({
      name: "partnerButtonLabel",
      title: "Partner App — Submit Button (English)",
      type: "string",
      group: "partner",
      initialValue: "Submit Inquiry",
    }),
    defineField({
      name: "partnerButtonLabelRu",
      title: "Partner App — Submit Button (Русский)",
      type: "string",
      group: "partner",
    }),
    defineField({
      name: "partnerSuccessMessage",
      title: "Partner App — Success Message (English)",
      type: "text",
      rows: 2,
      group: "partner",
      initialValue:
        "Thanks for reaching out — our partnerships team will be in touch within a week.",
    }),
    defineField({
      name: "partnerSuccessMessageRu",
      title: "Partner App — Success Message (Русский)",
      type: "text",
      rows: 2,
      group: "partner",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Form Copy" }),
  },
});
