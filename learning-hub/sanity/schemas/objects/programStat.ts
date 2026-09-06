import { defineField, defineType } from "sanity";

/**
 * One stat card in a program page's hero stats grid
 * (e.g. "90%" / "Launch Success Rate").
 * Used as an array element on programPage.stats.
 */
export default defineType({
  name: "programStat",
  title: "Program Stat",
  type: "object",
  fields: [
    defineField({
      name: "value",
      title: "Value",
      type: "string",
      description:
        "Big number/text shown in the stat card. e.g. '90%', '72', '$2M+', 'NEW', '1:1'.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "label",
      title: "Label (English)",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "labelRu",
      title: "Label (Русский)",
      type: "string",
    }),
  ],
  preview: {
    select: { value: "value", label: "label" },
    prepare({ value, label }) {
      return {
        title: value ?? "(no value)",
        subtitle: label,
      };
    },
  },
});
