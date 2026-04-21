/**
 * Sanity Studio configuration for Businesses Beyond Borders.
 *
 * Studio is deployed standalone to `bbb.sanity.studio` (NOT embedded in the
 * Vite app) — this keeps the main site bundle lean. Editors log in at the
 * hosted URL to manage content.
 *
 * Local dev:  npm run studio
 * Deploy:     npm run studio:deploy
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

export default defineConfig({
  name: "bbb-studio",
  title: "Businesses Beyond Borders",

  projectId: "55u2jb6b",
  dataset: "production",

  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            // Singleton: Site Settings (only one doc allowed)
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),

            // Regular document types
            S.documentTypeListItem("blogPost").title("Blog Posts"),
            S.documentTypeListItem("author").title("Authors"),
            S.documentTypeListItem("successStory").title("Success Stories"),
            S.documentTypeListItem("programPage").title("Program Pages"),
            S.documentTypeListItem("heroSlide").title("Homepage Hero Slides"),
          ]),
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Block the creation of additional siteSettings docs (singleton enforcement)
    templates: (prev) =>
      prev.filter(({ schemaType }) => schemaType !== "siteSettings"),
  },

  document: {
    // Hide 'Duplicate' and 'Delete' on siteSettings singleton
    actions: (prev, { schemaType }) =>
      schemaType === "siteSettings"
        ? prev.filter(
            ({ action }) => !["duplicate", "delete"].includes(action || "")
          )
        : prev,
  },
});
