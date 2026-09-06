import { defineField, defineType } from "sanity";

/**
 * One small trust badge under a program-page hero
 * (e.g. "100% Free", "Self-Paced", "Evidence-Based").
 * Used as an array element on programPage.trustBadges.
 *
 * The icon name resolves to a lucide-react icon at render time.
 */
export default defineType({
  name: "trustBadge",
  title: "Trust Badge",
  type: "object",
  fields: [
    defineField({
      name: "icon",
      title: "Icon (lucide name)",
      type: "string",
      description:
        "Lucide icon name — e.g. Zap, Clock, Users, Shield, Star, BookOpen. Case-sensitive.",
      initialValue: "Sparkles",
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
    select: { icon: "icon", label: "label" },
    prepare({ icon, label }) {
      return {
        title: label ?? "(no label)",
        subtitle: icon,
      };
    },
  },
});
