import { defineField, defineType } from "sanity";

/**
 * The /programs-and-impact landing page. Hero copy, "Our Difference"
 * section, and the impact metrics block. Singleton.
 */
export default defineType({
  name: "programsAndImpactPage",
  title: "Programs & Impact Page",
  type: "document",
  description:
    "The /programs-and-impact landing page — hero, 'Our Difference' section, impact metrics. Singleton.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "metrics", title: "Impact Metrics" },
  ],
  fields: [
    defineField({
      name: "heroHeading",
      title: "Hero Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Programs Designed to Build Real Lives",
    }),
    defineField({
      name: "heroHeadingRu",
      title: "Hero Heading (Русский)",
      type: "string",
      group: "russian",
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
      name: "differenceHeading",
      title: "'Our Difference' Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Our Difference",
    }),
    defineField({
      name: "differenceHeadingRu",
      title: "'Our Difference' Heading (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "differenceBody",
      title: "'Our Difference' Body (English)",
      type: "blockContent",
      group: "english",
    }),
    defineField({
      name: "differenceBodyRu",
      title: "'Our Difference' Body (Русский)",
      type: "blockContent",
      group: "russian",
    }),
    defineField({
      name: "metricsHeading",
      title: "Metrics Section Heading (English)",
      type: "string",
      group: "english",
      initialValue: "Our Impact So Far",
    }),
    defineField({
      name: "metricsHeadingRu",
      title: "Metrics Section Heading (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "metrics",
      title: "Impact Metrics",
      type: "array",
      group: "metrics",
      description:
        "Stat cards shown on this page. These are SEPARATE from the homepage Impact Stats — edit each independently.",
      of: [
        {
          type: "object",
          name: "metric",
          fields: [
            { name: "value", type: "number", title: "Number" },
            { name: "suffix", type: "string", title: "Suffix (e.g. '+', '%')", initialValue: "+" },
            { name: "label", type: "string", title: "Label (English)" },
            { name: "labelRu", type: "string", title: "Label (Русский)" },
          ],
          preview: {
            select: { value: "value", suffix: "suffix", label: "label" },
            prepare({ value, suffix, label }) {
              return {
                title: `${value ?? "?"}${suffix ?? ""}`,
                subtitle: label,
              };
            },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Programs & Impact Page" }),
  },
});
