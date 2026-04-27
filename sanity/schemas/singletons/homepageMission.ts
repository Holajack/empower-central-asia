import { defineField, defineType } from "sanity";

export default defineType({
  name: "homepageMission",
  title: "Homepage Mission Section",
  type: "document",
  description:
    "The 'Our Mission' block under the hero — heading, mission paragraph, vision paragraph, and three value cards. Singleton.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "cta", title: "Call to Action" },
  ],
  fields: [
    defineField({
      name: "heading",
      title: "Section Heading",
      type: "string",
      group: "english",
      initialValue: "Our Mission",
    }),
    defineField({
      name: "headingRu",
      title: "Section Heading (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Наша миссия",
    }),
    defineField({
      name: "missionStatement",
      title: "Mission Statement",
      type: "text",
      group: "english",
      rows: 4,
      initialValue:
        "Businesses Beyond Borders exists to bring hope to the hopeless -- equipping diligent people to build dignified, sustainable lives through financial literacy, entrepreneurship, and opportunity.",
    }),
    defineField({
      name: "missionStatementRu",
      title: "Mission Statement (Русский)",
      type: "text",
      group: "russian",
      rows: 4,
      initialValue:
        "Businesses Beyond Borders существует, чтобы принести надежду тем, кто её потерял — вооружая трудолюбивых людей знаниями и возможностями для достойной и устойчивой жизни через финансовую грамотность, предпринимательство и реальные шансы.",
    }),
    defineField({
      name: "vision",
      title: "Vision Statement (italic line)",
      type: "text",
      group: "english",
      rows: 2,
      initialValue:
        "Our vision: a world where people see hope right where they are, and build it for someone else.",
    }),
    defineField({
      name: "visionRu",
      title: "Vision Statement (Русский)",
      type: "text",
      group: "russian",
      rows: 2,
      initialValue:
        "Наше видение: мир, в котором люди видят надежду прямо там, где они есть, и строят её для кого-то другого.",
    }),
    defineField({
      name: "valueCards",
      title: "Value Cards (3 small cards under mission)",
      type: "array",
      group: "english",
      validation: (R) => R.length(3).warning("Show exactly 3 cards for best layout."),
      of: [
        {
          type: "object",
          name: "valueCard",
          fields: [
            { name: "title", type: "string", title: "Title (English)" },
            { name: "titleRu", type: "string", title: "Title (Русский)" },
            { name: "description", type: "text", rows: 2, title: "Description (English)" },
            {
              name: "descriptionRu",
              type: "text",
              rows: 2,
              title: "Description (Русский)",
            },
          ],
          preview: {
            select: { title: "title", subtitle: "description" },
          },
        },
      ],
      initialValue: [
        {
          _type: "valueCard",
          title: "Poverty isn't laziness",
          titleRu: "Бедность — это не лень",
          description: "It's a lack of access to knowledge, tools, and opportunity.",
          descriptionRu: "Это нехватка доступа к знаниям, инструментам и возможностям.",
        },
        {
          _type: "valueCard",
          title: "Entrepreneurship is dignity",
          titleRu: "Предпринимательство — это достоинство",
          description:
            "Building something of your own transforms families and communities.",
          descriptionRu:
            "Создание своего дела преображает семьи и целые сообщества.",
        },
        {
          _type: "valueCard",
          title: "You can help from anywhere",
          titleRu: "Вы можете помочь отсюда",
          description: "Your time, skills, or support can change someone's trajectory.",
          descriptionRu:
            "Ваши знания, время и поддержка способны изменить чью-то судьбу.",
        },
      ],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Label",
      type: "string",
      group: "cta",
      initialValue: "Read Our Story",
    }),
    defineField({
      name: "ctaLabelRu",
      title: "CTA Label (Русский)",
      type: "string",
      group: "russian",
      initialValue: "Наша история",
    }),
    defineField({
      name: "ctaUrl",
      title: "CTA URL",
      type: "string",
      group: "cta",
      initialValue: "/about",
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage Mission Section" }),
  },
});
