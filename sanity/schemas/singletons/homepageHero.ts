import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepageHero",
  title: "Homepage Hero",
  type: "document",
  description:
    "The big top section of the homepage — heading, subheading, two CTA buttons, background image. Singleton (only one).",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "media", title: "Background" },
    { name: "ctas", title: "Call-to-Action Buttons" },
  ],
  fields: [
    defineField({
      name: "heading",
      title: "Heading",
      type: "string",
      group: "english",
      initialValue: "Hope That Builds",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "headingRu",
      title: "Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Надежда, Которая Строит",
    }),
    defineField({
      name: "subheading",
      title: "Subheading",
      type: "text",
      group: "english",
      rows: 3,
      initialValue:
        "So that the hopeless can find hope -- and the hopeful can multiply it.",
    }),
    defineField({
      name: "subheadingRu",
      title: "Subheading (Русский)",
      type: "text",
      group: "russian",
      rows: 3,
      initialValue:
        "Чтобы потерявшие надежду могли её обрести — а обретшие надежду могли её приумножить.",
    }),
    defineField({
      name: "backgroundImage",
      title: "Background Image",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt text" },
      ],
      description: "Falls back to /images/hero-bg.webp if empty.",
    }),
    defineField({
      name: "primaryCtaLabel",
      title: "Primary Button Label",
      type: "string",
      group: "ctas",
      initialValue: "Start Learning (Free)",
    }),
    defineField({
      name: "primaryCtaLabelRu",
      title: "Primary Button Label (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Начать обучение (бесплатно)",
    }),
    defineField({
      name: "primaryCtaUrl",
      title: "Primary Button URL",
      type: "string",
      group: "ctas",
      initialValue: "#programs-section",
      description:
        "Use a #anchor (e.g. #programs-section) to scroll on the page, or a path (/get-involved) to navigate.",
    }),
    defineField({
      name: "secondaryCtaLabel",
      title: "Secondary Button Label",
      type: "string",
      group: "ctas",
      initialValue: "Support a Future Entrepreneur",
      description:
        "Hidden when the visitor is in the Central Asia region (donation flow only shown to US/global).",
    }),
    defineField({
      name: "secondaryCtaLabelRu",
      title: "Secondary Button Label (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Поддержать будущего предпринимателя",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage Hero" }),
  },
});
