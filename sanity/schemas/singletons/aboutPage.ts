import { defineField, defineType } from "sanity";

export default defineType({
  name: "aboutPage",
  title: "About Page",
  type: "document",
  description:
    "The /about page content — hero, mission, founding story, values list. Singleton. Team members are managed separately under People → Team Members.",
  groups: [
    { name: "english", title: "English", default: true },
    { name: "russian", title: "Русский (Russian)" },
    { name: "values", title: "Values" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "heroTitle",
      title: "Hero Title (English)",
      type: "string",
      group: "english",
      initialValue: "About Us",
    }),
    defineField({
      name: "heroTitleRu",
      title: "Hero Title (Русский)",
      type: "string",
      group: "russian",
      initialValue: "О нас",
    }),
    defineField({
      name: "heroSubtitle",
      title: "Hero Subtitle (English)",
      type: "text",
      group: "english",
      rows: 3,
      initialValue:
        "Founded by Jacken Holland — abandoned at birth in Haiti, adopted, and driven to give others the same chance. Meet the team behind Businesses Beyond Borders.",
    }),
    defineField({
      name: "heroSubtitleRu",
      title: "Hero Subtitle (Русский)",
      type: "text",
      group: "russian",
      rows: 3,
    }),
    defineField({
      name: "missionText",
      title: "Mission Text (English)",
      type: "blockContent",
      group: "english",
      description: "Long-form mission narrative shown on the about page.",
    }),
    defineField({
      name: "missionTextRu",
      title: "Mission Text (Русский)",
      type: "blockContent",
      group: "russian",
    }),
    defineField({
      name: "foundingStory",
      title: "Founding Story (English)",
      type: "blockContent",
      group: "english",
    }),
    defineField({
      name: "foundingStoryRu",
      title: "Founding Story (Русский)",
      type: "blockContent",
      group: "russian",
    }),
    defineField({
      name: "values",
      title: "Values List",
      type: "array",
      group: "values",
      of: [{ type: "valueItem" }],
      description: "Add, remove, reorder the values shown on the about page. Recommended count: 4-8.",
    }),
    defineField({
      name: "seo",
      title: "SEO",
      type: "seoFields",
      group: "seo",
    }),
  ],
  preview: {
    prepare: () => ({ title: "About Page" }),
  },
});
