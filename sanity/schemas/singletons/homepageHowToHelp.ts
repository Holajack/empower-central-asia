import { defineField, defineType } from "sanity";

/**
 * The HowToHelp section on the homepage. Three groups of cards
 * (Learn / Volunteer / Partner) — each card has a title, description,
 * link, and CTA button text. All bilingual.
 */
export default defineType({
  name: "homepageHowToHelp",
  title: "Homepage How-to-Help Section",
  type: "document",
  description:
    "Three card groups (Learn / Volunteer / Partner) shown on the homepage HowToHelp section.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "cards", title: "Cards" },
  ],
  fields: [
    defineField({
      name: "sectionHeading",
      title: "Section Heading (English)",
      type: "string",
      group: "english",
      initialValue: "How You Can Help",
    }),
    defineField({
      name: "sectionHeadingRu",
      title: "Section Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Как вы можете помочь",
    }),
    defineField({
      name: "learnHeading",
      title: "Learn Group Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Learn",
    }),
    defineField({
      name: "learnHeadingRu",
      title: "Learn Group Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Учиться",
    }),
    defineField({
      name: "learnCards",
      title: "Learn Cards",
      type: "array",
      group: "cards",
      of: [{ type: "helpCard" }],
    }),
    defineField({
      name: "volunteerHeading",
      title: "Volunteer Group Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Volunteer",
    }),
    defineField({
      name: "volunteerHeadingRu",
      title: "Volunteer Group Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Стать волонтёром",
    }),
    defineField({
      name: "volunteerCards",
      title: "Volunteer Cards",
      type: "array",
      group: "cards",
      of: [{ type: "helpCard" }],
    }),
    defineField({
      name: "partnerHeading",
      title: "Partner Group Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Partner",
    }),
    defineField({
      name: "partnerHeadingRu",
      title: "Partner Group Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Партнёрство",
    }),
    defineField({
      name: "partnerCards",
      title: "Partner Cards",
      type: "array",
      group: "cards",
      of: [{ type: "helpCard" }],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage How-to-Help Section" }),
  },
});
