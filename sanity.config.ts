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
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

// Production site URL — used by the Presentation tool to iframe the live site.
// Studio admins can see a live visual preview of their edits inside Studio.
const SITE_URL = "https://businessesbeyondborders.com";

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

    // Presentation tool — live preview of the site with click-to-edit overlays.
    // Admins get a side-by-side "Edit here → see change on the site" workflow.
    presentationTool({
      previewUrl: {
        origin: SITE_URL,
        previewMode: {
          enable: "/api/sanity/preview",
          disable: "/api/sanity/preview/disable",
        },
      },
      resolve: {
        // Map document types -> site URLs so "Open preview" opens the right page.
        locations: {
          blogPost: {
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title ?? "Untitled post",
                  href: `/blog/${doc?.slug}`,
                },
                { title: "Blog index", href: "/blog" },
              ],
            }),
          },
          programPage: {
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title ?? "Untitled program",
                  href: `/programs/${doc?.slug}`,
                },
              ],
            }),
          },
          successStory: {
            select: { name: "name", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.name ?? "Story",
                  href: `/success-stories/${doc?.slug}`,
                },
                { title: "Success stories", href: "/success-stories" },
              ],
            }),
          },
          siteSettings: {
            resolve: () => ({
              locations: [
                { title: "Home", href: "/" },
                { title: "Contact", href: "/contact" },
              ],
            }),
          },
        },
      },
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
