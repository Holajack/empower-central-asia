import { Navigate } from "react-router-dom";

/**
 * Legacy route — content for Marcus Williams now lives in Sanity as a
 * successStory doc with slug "marcus-williams", rendered by
 * src/pages/SuccessStoryDetail.tsx. Old `/success-stories/case-study-marcus`
 * URLs (referenced from course pages and external links) redirect here so
 * SEO and bookmarks keep working.
 */
const MarcusCaseStudy = () => {
  return <Navigate to="/success-stories/marcus-williams" replace />;
};

export default MarcusCaseStudy;
