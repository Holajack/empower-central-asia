import { defineField, defineType } from "sanity";

/**
 * Reusable shape for one editable form field's bilingual UI strings.
 *
 * The `fieldName` matches the actual form input `name` attribute
 * (e.g. "firstName", "email", "skills") — that's how the front-end looks up
 * the right label at render time.
 *
 * Lives inside the `formSettings` singleton via the per-form
 * `<form>FieldLabels` arrays.
 */
export default defineType({
  name: "formFieldLabel",
  title: "Form Field Label",
  type: "object",
  fields: [
    defineField({
      name: "fieldName",
      title: "Field Name (machine ID)",
      type: "string",
      description:
        "Matches the form input `name` attribute (e.g. 'firstName', 'email', 'skills'). Do not change unless the form code changes.",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "label",
      title: "Label (English)",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "labelRu",
      title: "Label (Русский)",
      type: "string",
    }),
    defineField({
      name: "placeholder",
      title: "Placeholder (English)",
      type: "string",
      description: "Optional. Shown inside the empty input.",
    }),
    defineField({
      name: "placeholderRu",
      title: "Placeholder (Русский)",
      type: "string",
    }),
    defineField({
      name: "helperText",
      title: "Helper Text (English)",
      type: "text",
      rows: 2,
      description:
        "Optional. Small description shown near the field (e.g. example syntax, character limits).",
    }),
    defineField({
      name: "helperTextRu",
      title: "Helper Text (Русский)",
      type: "text",
      rows: 2,
    }),
  ],
  preview: {
    select: {
      title: "label",
      subtitle: "fieldName",
    },
    prepare: ({ title, subtitle }: { title?: string; subtitle?: string }) => ({
      title: title || "(no label)",
      subtitle: subtitle ? `name="${subtitle}"` : "(no fieldName)",
    }),
  },
});
