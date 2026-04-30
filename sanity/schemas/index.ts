/**
 * Schema registry — every document/object type must be imported and added here.
 */
import blogPost from "./documents/blogPost";
import author from "./documents/author";
import successStory from "./documents/successStory";
import programPage from "./documents/programPage";
import heroSlide from "./documents/heroSlide";
import impactStat from "./documents/impactStat";
import teamMember from "./documents/teamMember";
import faqItem from "./documents/faqItem";
import resource from "./documents/resource";
import testimonial from "./documents/testimonial";
import siteSettings from "./singletons/siteSettings";
import homepageHero from "./singletons/homepageHero";
import homepageMission from "./singletons/homepageMission";
import aboutPage from "./singletons/aboutPage";
import seoFields from "./objects/seoFields";
import cta from "./objects/cta";
import blockContent from "./objects/blockContent";
import valueItem from "./objects/valueItem";

export const schemaTypes = [
  // Documents
  blogPost,
  author,
  successStory,
  programPage,
  heroSlide,
  impactStat,
  teamMember,
  faqItem,
  resource,
  testimonial,
  // Singletons
  siteSettings,
  homepageHero,
  homepageMission,
  aboutPage,
  // Objects (reusable)
  seoFields,
  cta,
  blockContent,
  valueItem,
];
