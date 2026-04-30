import { Navigate } from "react-router-dom";

/**
 * Legacy route — content for Sarah Chen now lives in Sanity as a successStory
 * doc with slug "sarah-chen", rendered by src/pages/SuccessStoryDetail.tsx.
 * Old `/success-stories/case-study-sarah` URLs (referenced from course pages
 * and external links) redirect here so SEO and bookmarks keep working.
 */
const SarahCaseStudy = () => {
  return <Navigate to="/success-stories/sarah-chen" replace />;
};

export default SarahCaseStudy;
