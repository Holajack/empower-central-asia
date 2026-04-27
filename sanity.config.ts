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
            // ── Global / site-wide ──
            S.listItem()
              .title("Site Settings")
              .id("siteSettings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings")
              ),
            S.divider(),

            // ── Homepage ──
            S.listItem()
              .title("Homepage Hero")
              .id("homepageHero")
              .child(
                S.document()
                  .schemaType("homepageHero")
                  .documentId("homepageHero")
              ),
            S.listItem()
              .title("Homepage Mission Section")
              .id("homepageMission")
              .child(
                S.document()
                  .schemaType("homepageMission")
                  .documentId("homepageMission")
              ),
            S.documentTypeListItem("impactStat").title("Impact Stats"),
            S.divider(),

            // ── Editorial ──
            S.documentTypeListItem("blogPost").title("Blog Posts"),
            S.documentTypeListItem("author").title("Authors"),
            S.documentTypeListItem("successStory").title("Success Stories"),
            S.divider(),

            // ── Programs & legacy ──
            S.documentTypeListItem("programPage").title("Program Pages"),
            S.documentTypeListItem("heroSlide").title("Hero Slides (legacy)"),
          ]),
    }),

    // Presentation tool — live preview of the site with click-to-edit overlays.
    // Admins get a side-by-side "Edit here → see change on the site" workflow.
    presentationTool({
      previewUrl: {
        origin: SITE_URL,
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
          homepageHero: {
            resolve: () => ({
              locations: [{ title: "Homepage hero", href: "/" }],
            }),
          },
          homepageMission: {
            resolve: () => ({
              locations: [{ title: "Homepage mission section", href: "/" }],
            }),
          },
          impactStat: {
            resolve: () => ({
              locations: [{ title: "Homepage impact stats", href: "/" }],
            }),
          },
        },
      },
    }),

    visionTool(),
  ],

  schema: {
    types: schemaTypes,
    // Block creation of additional singleton docs.
    templates: (prev) => {
      const singletons = ["siteSettings", "homepageHero", "homepageMission"];
      return prev.filter(({ schemaType }) => !singletons.includes(schemaType));
    },
  },

  document: {
    // Hide 'Duplicate' and 'Delete' on singletons.
    actions: (prev, { schemaType }) => {
      const singletons = ["siteSettings", "homepageHero", "homepageMission"];
      return singletons.includes(schemaType)
        ? prev.filter(
            ({ action }) => !["duplicate", "delete"].includes(action || "")
          )
        : prev;
    },
  },
});
