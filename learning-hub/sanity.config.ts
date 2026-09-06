/**
 * Sanity Studio configuration for the Learning Hub (OPTIONAL).
 *
 * The site ships with all content bundled in src/data. Only set this up if
 * you want to edit course landing copy, blog posts, resources, or site
 * settings in a CMS instead of in code.
 *
 *   1. Create a project at sanity.io/manage and copy its project id.
 *   2. Put VITE_SANITY_PROJECT_ID (+ VITE_SANITY_DATASET) in .env.local.
 *   3. npm run studio            → local Studio at http://localhost:3333
 *      npm run studio:deploy     → hosted Studio at https://<name>.sanity.studio
 *   4. Seed content: SANITY_WRITE_TOKEN=... npm run migrate:courses (etc.)
 */
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { presentationTool } from "sanity/presentation";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./sanity/schemas";

const projectId = process.env.SANITY_STUDIO_PROJECT_ID || process.env.VITE_SANITY_PROJECT_ID || "";
const dataset = process.env.SANITY_STUDIO_DATASET || process.env.VITE_SANITY_DATASET || "production";
const SITE_URL = process.env.SANITY_STUDIO_SITE_URL || process.env.VITE_SITE_URL || "http://localhost:8080";

const singleton = (S: any, id: string, title: string) =>
  S.listItem().title(title).id(id).child(S.document().schemaType(id).documentId(id));

export default defineConfig({
  name: "learning-hub-studio",
  title: "Learning Hub",
  projectId,
  dataset,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            singleton(S, "siteSettings", "Site Settings"),
            singleton(S, "footerSettings", "Footer"),
            singleton(S, "formSettings", "Form Copy"),
            S.divider(),
            S.documentTypeListItem("course").title("Courses"),
            S.documentTypeListItem("courseWeek").title("Course Weeks"),
            S.documentTypeListItem("courseLesson").title("Course Lessons (days)"),
            S.documentTypeListItem("faqItem").title("FAQs"),
            S.divider(),
            singleton(S, "cohortPage", "Cohort Page"),
            singleton(S, "newsletterPage", "Newsletter Page"),
            singleton(S, "debtCalculatorPage", "Debt Calculator Page"),
            S.divider(),
            S.documentTypeListItem("blogPost").title("Blog Posts"),
            S.documentTypeListItem("author").title("Authors"),
            S.documentTypeListItem("resource").title("Resources"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
          ]),
    }),
    presentationTool({
      previewUrl: { origin: SITE_URL, previewMode: { enable: "/" } },
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
