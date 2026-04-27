import { defineField, defineType } from "sanity";

export default defineType({
  name: "impactStat",
  title: "Impact Stat",
  type: "document",
  description:
    "A single stat card on the homepage (e.g. '150+ Entrepreneurs Activated'). Add or remove as the org's numbers change.",
  fields: [
    defineField({
      name: "value",
      title: "Number / Value",
      type: "number",
      description: "Just the number — e.g. 150, 50, 100, 6.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "suffix",
      title: "Suffix",
      type: "string",
      description: "Symbol after the number — e.g. '+', '%', 'K'. Empty for none.",
      initialValue: "+",
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
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 10,
      description: "Lower numbers show first. Use increments of 10.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "active",
      title: "Active?",
      type: "boolean",
      initialValue: true,
      description: "Untick to hide without deleting.",
    }),
  ],
  orderings: [
    {
      title: "Display Order",
      name: "orderAsc",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: { value: "value", suffix: "suffix", label: "label", active: "active" },
    prepare({ value, suffix, label, active }) {
      const v = `${value ?? "?"}${suffix ?? ""}`;
      return {
        title: active === false ? `[HIDDEN] ${v}` : v,
        subtitle: label,
      };
    },
  },
});
