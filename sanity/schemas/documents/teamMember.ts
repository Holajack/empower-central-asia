import { defineField, defineType } from "sanity";

export default defineType({
  name: "teamMember",
  title: "Team Member",
  type: "document",
  description:
    "BBB team members shown on the About page. Add new staff, mark old ones inactive.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "media", title: "Photo & Social" },
  ],
  fields: [
    defineField({
      name: "name",
      title: "Name",
      type: "string",
      group: "english",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "nameRu",
      title: "Name (Русский)",
      type: "string",
      group: "russian",
      description: "Russian transliteration / variant — leave empty to use English in Russian mode.",
    }),
    defineField({
      name: "role",
      title: "Role / Title (English)",
      type: "string",
      group: "english",
      description: "e.g. 'Founder & CEO', 'Co-Founder & COO'.",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "roleRu",
      title: "Role / Title (Русский)",
      type: "string",
      group: "russian",
    }),
    defineField({
      name: "bio",
      title: "Bio (English)",
      type: "text",
      group: "english",
      rows: 6,
    }),
    defineField({
      name: "bioRu",
      title: "Bio (Русский)",
      type: "text",
      group: "russian",
      rows: 6,
    }),
    defineField({
      name: "photo",
      title: "Photo",
      type: "image",
      group: "media",
      options: { hotspot: true },
      fields: [
        { name: "alt", type: "string", title: "Alt text" },
      ],
    }),
    defineField({
      name: "initials",
      title: "Initials Fallback",
      type: "string",
      group: "media",
      description: "2-3 letters shown in avatar circle when no photo (e.g. JH, YR).",
    }),
    defineField({
      name: "social",
      title: "Social Links",
      type: "object",
      group: "media",
      fields: [
        { name: "linkedin", type: "url", title: "LinkedIn" },
        { name: "twitter", type: "url", title: "Twitter / X" },
        { name: "email", type: "string", title: "Email" },
      ],
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      initialValue: 10,
      description: "Lower numbers appear first.",
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
    select: { name: "name", role: "role", media: "photo", active: "active" },
    prepare({ name, role, media, active }) {
      return {
        title: active === false ? `[HIDDEN] ${name}` : name,
        subtitle: role,
        media,
      };
    },
  },
});
