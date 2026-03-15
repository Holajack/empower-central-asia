
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import GetInvolved from "@/pages/GetInvolved";
import ProgramsAndImpact from "@/pages/ProgramsAndImpact";
import SuccessStories from "@/pages/SuccessStories";
import SuccessStoryDetail from "@/pages/SuccessStoryDetail";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import FinancialLiteracy from "@/pages/programs/FinancialLiteracy";
import BusinessCreation from "@/pages/programs/BusinessCreation";
import LeadershipDevelopment from "@/pages/programs/LeadershipDevelopment";
import CommunityCollaboration from "@/pages/programs/CommunityCollaboration";
import SarahCaseStudy from "@/pages/success-stories/SarahCaseStudy";
import MarcusCaseStudy from "@/pages/success-stories/MarcusCaseStudy";
import VolunteerApplication from "@/pages/VolunteerApplication";
import PartnerApplication from "@/pages/PartnerApplication";
import LeadershipMentor from "@/pages/volunteer-opportunities/LeadershipMentor";
import CommunityOrganizer from "@/pages/volunteer-opportunities/CommunityOrganizer";
import BusinessTraining from "@/pages/volunteer-opportunities/BusinessTraining";
import AdministrativeSupport from "@/pages/volunteer-opportunities/AdministrativeSupport";
import AdvocacyOutreach from "@/pages/volunteer-opportunities/AdvocacyOutreach";
import Newsletter from "@/pages/Newsletter";
import SmsOptIn from "@/pages/SmsOptIn";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import MobileTerms from "@/pages/MobileTerms";
import DebtCalculator from "@/pages/tools/DebtCalculator";
import FinancialLiteracyCourse from "@/pages/course/FinancialLiteracyCourse";
import CourseWeek from "@/pages/course/CourseWeek";
import BusinessCreationCourse from "@/pages/course/BusinessCreationCourse";
import BusinessCourseWeek from "@/pages/course/BusinessCourseWeek";
import LeadershipCourse from "@/pages/course/LeadershipCourse";
import LeadershipCourseWeek from "@/pages/course/LeadershipCourseWeek";
import Cohort from "@/pages/Cohort";
import Resources from "@/pages/Resources";
import ResourceDetail from "@/pages/ResourceDetail";
import ScrollToTop from "@/components/ScrollToTop";
import NewsletterPopup from "@/components/NewsletterPopup";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/NotFound";
import { RegionProvider } from "@/contexts/RegionContext";

// Standalone pages that render without Nav/Footer (e.g. QR code landing pages)
const STANDALONE_ROUTES = ["/newsletter"];

function AppContent() {
  const location = useLocation();
  const isStandalone = STANDALONE_ROUTES.includes(location.pathname);

  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-[#1B2A4A] focus:rounded focus:shadow-lg focus:text-sm focus:font-medium">
        Skip to main content
      </a>
      <ScrollToTop />
      {!isStandalone && <Navigation />}
      <main id="main-content">
        <ErrorBoundary>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/programs-and-impact" element={<ProgramsAndImpact />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/success-stories/:id" element={<SuccessStoryDetail />} />
          <Route path="/success-stories/case-study-sarah" element={<SarahCaseStudy />} />
          <Route path="/success-stories/case-study-marcus" element={<MarcusCaseStudy />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          
          <Route path="/programs/financial-literacy" element={<FinancialLiteracy />} />
          <Route path="/programs/business-creation" element={<BusinessCreation />} />
          <Route path="/programs/leadership-development" element={<LeadershipDevelopment />} />
          <Route path="/programs/community-collaboration" element={<CommunityCollaboration />} />
          <Route path="/volunteer-application" element={<VolunteerApplication />} />
          <Route path="/partner-application" element={<PartnerApplication />} />
          
          {/* Volunteer Opportunity Pages */}
          <Route path="/volunteer-opportunities/leadership-mentor" element={<LeadershipMentor />} />
          <Route path="/volunteer-opportunities/community-organizer" element={<CommunityOrganizer />} />
          <Route path="/volunteer-opportunities/business-training" element={<BusinessTraining />} />
          <Route path="/volunteer-opportunities/administrative-support" element={<AdministrativeSupport />} />
          <Route path="/volunteer-opportunities/advocacy-outreach" element={<AdvocacyOutreach />} />
          
          {/* Newsletter Signup (QR code landing page) */}
          <Route path="/newsletter" element={<Newsletter />} />

          {/* Interactive Tools */}
          <Route path="/tools/debt-calculator" element={<DebtCalculator />} />

          {/* Cohort Page */}
          <Route path="/cohort" element={<Cohort />} />

          {/* Free Resources / Lead Magnets */}
          <Route path="/resources" element={<Resources />} />
          <Route path="/resources/:slug" element={<ResourceDetail />} />

          {/* Course Pages */}
          <Route path="/course/financial-literacy" element={<FinancialLiteracyCourse />} />
          <Route path="/course/financial-literacy/:week" element={<CourseWeek />} />
          <Route path="/course/business-creation" element={<BusinessCreationCourse />} />
          <Route path="/course/business-creation/:week" element={<BusinessCourseWeek />} />
          <Route path="/course/leadership-development" element={<LeadershipCourse />} />
          <Route path="/course/leadership-development/:week" element={<LeadershipCourseWeek />} />

          {/* Legal and Compliance Pages */}
          <Route path="/sms" element={<SmsOptIn />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/mobile-terms" element={<MobileTerms />} />

          {/* 404 Catch-All */}
          <Route path="*" element={<NotFound />} />
        </Routes>
        </ErrorBoundary>
      </main>
      {!isStandalone && <Footer />}
      <Toaster />
      {!isStandalone && <NewsletterPopup />}
    </>
  );
}

function App() {
  return (
    <RegionProvider>
      <Router>
        <AppContent />
      </Router>
    </RegionProvider>
  );
}

export default App;
