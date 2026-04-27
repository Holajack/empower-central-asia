/**
 * Schema registry — every document/object type must be imported and added here.
 */
import blogPost from "./documents/blogPost";
import author from "./documents/author";
import successStory from "./documents/successStory";
import programPage from "./documents/programPage";
import heroSlide from "./documents/heroSlide";
import impactStat from "./documents/impactStat";
import siteSettings from "./singletons/siteSettings";
import homepageHero from "./singletons/homepageHero";
import homepageMission from "./singletons/homepageMission";
import seoFields from "./objects/seoFields";
import cta from "./objects/cta";
import blockContent from "./objects/blockContent";

export const schemaTypes = [
  // Documents
  blogPost,
  author,
  successStory,
  programPage,
  heroSlide,
  impactStat,
  // Singletons
  siteSettings,
  homepageHero,
  homepageMission,
  // Objects (reusable)
  seoFields,
  cta,
  blockContent,
];
