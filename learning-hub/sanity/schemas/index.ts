/**
 * Schema registry — every document/object type must be imported and added here.
 */
import blogPost from "./documents/blogPost";
import author from "./documents/author";
import faqItem from "./documents/faqItem";
import resource from "./documents/resource";
import testimonial from "./documents/testimonial";
import course from "./documents/course";
import courseWeek from "./documents/courseWeek";
import courseLesson from "./documents/courseLesson";
import siteSettings from "./singletons/siteSettings";
import footerSettings from "./singletons/footerSettings";
import formSettings from "./singletons/formSettings";
import debtCalculatorPage from "./singletons/debtCalculatorPage";
import cohortPage from "./singletons/cohortPage";
import newsletterPage from "./singletons/newsletterPage";
import seoFields from "./objects/seoFields";
import cta from "./objects/cta";
import blockContent from "./objects/blockContent";
import valueItem from "./objects/valueItem";
import videoEmbed from "./objects/videoEmbed";
import helpCard from "./objects/helpCard";
import weekOverview from "./objects/weekOverview";
import programStat from "./objects/programStat";
import trustBadge from "./objects/trustBadge";
import formFieldLabel from "./objects/formFieldLabel";

export const schemaTypes = [
  // Documents
  blogPost,
  author,
  faqItem,
  resource,
  testimonial,
  course,
  courseWeek,
  courseLesson,
  // Singletons
  siteSettings,
  footerSettings,
  formSettings,
  debtCalculatorPage,
  cohortPage,
  newsletterPage,
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
  formFieldLabel,
];
