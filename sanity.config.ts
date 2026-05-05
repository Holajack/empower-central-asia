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
            S.listItem()
              .title("Footer")
              .id("footerSettings")
              .child(
                S.document()
                  .schemaType("footerSettings")
                  .documentId("footerSettings")
              ),
            S.listItem()
              .title("Form Copy")
              .id("formSettings")
              .child(
                S.document()
                  .schemaType("formSettings")
                  .documentId("formSettings")
              ),
            S.listItem()
              .title("Contact Page")
              .id("contactPage")
              .child(
                S.document()
                  .schemaType("contactPage")
                  .documentId("contactPage")
              ),
            S.listItem()
              .title("Get Involved Page")
              .id("getInvolvedPage")
              .child(
                S.document()
                  .schemaType("getInvolvedPage")
                  .documentId("getInvolvedPage")
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
            S.listItem()
              .title("Homepage How-to-Help Section")
              .id("homepageHowToHelp")
              .child(
                S.document()
                  .schemaType("homepageHowToHelp")
                  .documentId("homepageHowToHelp")
              ),
            S.documentTypeListItem("impactStat").title("Impact Stats"),
            S.divider(),

            // ── About page ──
            S.listItem()
              .title("About Page")
              .id("aboutPage")
              .child(
                S.document()
                  .schemaType("aboutPage")
                  .documentId("aboutPage")
              ),
            S.documentTypeListItem("teamMember").title("Team Members"),
            S.divider(),

            // ── Editorial ──
            S.documentTypeListItem("blogPost").title("Blog Posts"),
            S.documentTypeListItem("author").title("Authors"),
            S.documentTypeListItem("successStory").title("Success Stories"),
            S.divider(),

            // ── Programs ──
            S.listItem()
              .title("Programs & Impact Page")
              .id("programsAndImpactPage")
              .child(
                S.document()
                  .schemaType("programsAndImpactPage")
                  .documentId("programsAndImpactPage")
              ),
            S.documentTypeListItem("programPage").title("Program Pages"),
            S.divider(),

            // ── Courses ──
            S.documentTypeListItem("course").title("Courses"),
            S.documentTypeListItem("courseWeek").title("Course Weeks"),
            S.divider(),

            // ── Get Involved / Resources ──
            S.documentTypeListItem("faqItem").title("FAQ Items"),
            S.documentTypeListItem("resource").title("Resources & Toolkits"),
            S.documentTypeListItem("testimonial").title("Testimonials"),
            S.documentTypeListItem("volunteerOpportunity").title("Volunteer Opportunities"),
            S.divider(),

            // ── Legacy ──
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
          footerSettings: {
            resolve: () => ({
              locations: [
                { title: "Footer (every page)", href: "/" },
              ],
            }),
          },
          formSettings: {
            resolve: () => ({
              locations: [
                { title: "Newsletter", href: "/newsletter" },
                { title: "Contact", href: "/contact" },
                { title: "Volunteer Application", href: "/volunteer-application" },
                { title: "Partner Application", href: "/partner-application" },
              ],
            }),
          },
          contactPage: {
            resolve: () => ({
              locations: [{ title: "Contact page", href: "/contact" }],
            }),
          },
          getInvolvedPage: {
            resolve: () => ({
              locations: [
                { title: "Get Involved page", href: "/get-involved" },
              ],
            }),
          },
          homepageHowToHelp: {
            resolve: () => ({
              locations: [{ title: "Homepage HowToHelp section", href: "/" }],
            }),
          },
          programsAndImpactPage: {
            resolve: () => ({
              locations: [
                { title: "Programs & Impact", href: "/programs-and-impact" },
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
          aboutPage: {
            resolve: () => ({
              locations: [{ title: "About page", href: "/about" }],
            }),
          },
          teamMember: {
            resolve: () => ({
              locations: [{ title: "About page (team section)", href: "/about" }],
            }),
          },
          faqItem: {
            resolve: () => ({
              locations: [{ title: "Get Involved (FAQ section)", href: "/get-involved" }],
            }),
          },
          resource: {
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                { title: doc?.title ?? "Resource", href: `/resources/${doc?.slug}` },
                { title: "Resources index", href: "/resources" },
              ],
            }),
          },
          testimonial: {
            resolve: () => ({
              locations: [
                { title: "Success Stories (carousel)", href: "/success-stories" },
                { title: "Get Involved (testimonials)", href: "/get-involved" },
              ],
            }),
          },
          course: {
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                { title: doc?.title ?? "Course", href: `/course/${doc?.slug}` },
              ],
            }),
          },
          volunteerOpportunity: {
            select: { title: "title", slug: "slug.current" },
            resolve: (doc) => ({
              locations: [
                {
                  title: doc?.title ?? "Volunteer role",
                  href: `/volunteer-opportunities/${doc?.slug}`,
                },
                { title: "Get Involved", href: "/get-involved" },
              ],
            }),
          },
          courseWeek: {
            select: {
              week: "weekNumber",
              title: "title",
              courseSlug: "course->slug.current",
            },
            resolve: (doc) => ({
              locations: doc?.courseSlug && doc?.week
                ? [
                    {
                      title: `Week ${doc.week}: ${doc.title ?? ""}`,
                      href: `/course/${doc.courseSlug}/week-${doc.week}`,
                    },
                  ]
                : [],
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
      const singletons = ["siteSettings", "homepageHero", "homepageMission", "aboutPage", "footerSettings", "formSettings", "programsAndImpactPage", "contactPage", "homepageHowToHelp", "getInvolvedPage"];
      return prev.filter(({ schemaType }) => !singletons.includes(schemaType));
    },
  },

  document: {
    // Hide 'Duplicate' and 'Delete' on singletons.
    actions: (prev, { schemaType }) => {
      const singletons = ["siteSettings", "homepageHero", "homepageMission", "aboutPage", "footerSettings", "formSettings", "programsAndImpactPage", "contactPage", "homepageHowToHelp", "getInvolvedPage"];
      return singletons.includes(schemaType)
        ? prev.filter(
            ({ action }) => !["duplicate", "delete"].includes(action || "")
          )
        : prev;
    },
  },
});
