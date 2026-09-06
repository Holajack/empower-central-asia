import { defineField, defineType } from "sanity";

export default defineType({
  name: "cta",
  title: "Call to Action",
  type: "object",
  fields: [
    defineField({
      name: "label",
      title: "Button Text",
      type: "string",
      validation: (Rule) => Rule.required().max(40),
    }),
    defineField({
      name: "url",
      title: "Link",
      type: "string",
      description: "Full URL (https://…) or internal path (/get-involved)",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "openInNewTab",
      title: "Open in new tab?",
      type: "boolean",
      initialValue: false,
    }),
  ],
});
