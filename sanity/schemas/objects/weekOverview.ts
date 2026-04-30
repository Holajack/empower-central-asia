import { defineField, defineType } from "sanity";

/**
 * One row in a program page's "What You'll Learn" / curriculum accordion.
 * Used as an array element on programPage.weeks.
 *
 * The detailed week content (objectives, action items, video, etc.) still lives
 * on `courseWeek` documents — this object only carries what the program landing
 * page needs: a number, a short title, and a one-paragraph summary.
 */
export default defineType({
  name: "weekOverview",
  title: "Week / Module Overview",
  type: "object",
  fields: [
    defineField({
      name: "weekNumber",
      title: "Week / Module Number",
      type: "number",
      validation: (R) => R.required().min(1).max(20),
    }),
    defineField({
      name: "title",
      title: "Title (English)",
      type: "string",
      validation: (R) => R.required(),
    }),
    defineField({
      name: "titleRu",
      title: "Title (Русский)",
      type: "string",
    }),
    defineField({
      name: "summary",
      title: "Summary (English)",
      type: "text",
      rows: 3,
      description:
        "Short paragraph shown when the row is expanded on the program page.",
    }),
    defineField({
      name: "summaryRu",
      title: "Summary (Русский)",
      type: "text",
      rows: 3,
    }),
  ],
  preview: {
    select: { weekNumber: "weekNumber", title: "title" },
    prepare({ weekNumber, title }) {
      return {
        title: `Week ${weekNumber ?? "?"}: ${title ?? "(untitled)"}`,
      };
    },
  },
});
