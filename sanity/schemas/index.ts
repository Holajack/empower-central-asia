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
import course from "./documents/course";
import courseWeek from "./documents/courseWeek";
import volunteerOpportunity from "./documents/volunteerOpportunity";
import siteSettings from "./singletons/siteSettings";
import homepageHero from "./singletons/homepageHero";
import homepageMission from "./singletons/homepageMission";
import aboutPage from "./singletons/aboutPage";
import footerSettings from "./singletons/footerSettings";
import formSettings from "./singletons/formSettings";
import programsAndImpactPage from "./singletons/programsAndImpactPage";
import contactPage from "./singletons/contactPage";
import homepageHowToHelp from "./singletons/homepageHowToHelp";
import debtCalculatorPage from "./singletons/debtCalculatorPage";
import seoFields from "./objects/seoFields";
import cta from "./objects/cta";
import blockContent from "./objects/blockContent";
import valueItem from "./objects/valueItem";
import videoEmbed from "./objects/videoEmbed";
import helpCard from "./objects/helpCard";
import weekOverview from "./objects/weekOverview";
import programStat from "./objects/programStat";
import trustBadge from "./objects/trustBadge";

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
  course,
  courseWeek,
  volunteerOpportunity,
  // Singletons
  siteSettings,
  homepageHero,
  homepageMission,
  aboutPage,
  footerSettings,
  formSettings,
  programsAndImpactPage,
  contactPage,
  homepageHowToHelp,
  debtCalculatorPage,
  // Objects (reusable)
  seoFields,
  cta,
  blockContent,
  valueItem,
  videoEmbed,
  helpCard,
  weekOverview,
  programStat,
  trustBadge,
];
