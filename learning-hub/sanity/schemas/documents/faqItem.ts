import { defineField, defineType } from "sanity";

export default defineType({
  name: "faqItem",
  title: "FAQ Item",
  type: "document",
  description:
    "A single FAQ question + answer. Categorize by audience (general / volunteers / donors / participants) so the right ones render on the right page.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "meta", title: "Categorization & Order" },
  ],
  fields: [
    defineField({
      name: "question",
      title: "Question (English)",
      type: "string",
      group: "english",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "questionRu",
      title: "Question (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "answer",
      title: "Answer (English)",
      type: "text",
      group: "english",
      rows: 6,
      validation: (R) => R.required(),
    }),
    defineField({
      name: "answerRu",
      title: "Answer (Русский)",
      type: "text",
      group: "russian",
      rows: 6,
    }),
    defineField({
      name: "category",
      title: "Category",
      type: "string",
      group: "meta",
      options: {
        list: [
          { title: "General", value: "general" },
          { title: "Participants", value: "participants" },
          { title: "Volunteers", value: "volunteers" },
          { title: "Donors", value: "donors" },
        ],
        layout: "radio",
      },
      initialValue: "general",
    }),

    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      group: "meta",
      initialValue: 10,
      description: "Lower numbers show first within a category.",
    }),
    defineField({
      name: "active",
      title: "Active?",
      type: "boolean",
      group: "meta",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Order",
      name: "orderAsc",
      by: [
        { field: "category", direction: "asc" },
        { field: "order", direction: "asc" },
      ],
    },
  ],
  preview: {
    select: { question: "question", category: "category", active: "active" },
    prepare({ question, category, active }) {
      return {
        title: active === false ? `[HIDDEN] ${question}` : question,
        subtitle: category ?? "general",
      };
    },
  },
});
