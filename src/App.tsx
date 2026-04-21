
import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { VisualEditing } from "@sanity/visual-editing/react-router";
import Index from "@/pages/Index";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/ScrollToTop";
import NewsletterPopup from "@/components/NewsletterPopup";
import ErrorBoundary from "@/components/ErrorBoundary";
import NotFound from "@/pages/NotFound";
import { RegionProvider } from "@/contexts/RegionContext";

// Lazy-loaded page imports for route-level code splitting
const About = lazy(() => import("@/pages/About"));
const Contact = lazy(() => import("@/pages/Contact"));
const GetInvolved = lazy(() => import("@/pages/GetInvolved"));
const ProgramsAndImpact = lazy(() => import("@/pages/ProgramsAndImpact"));
const SuccessStories = lazy(() => import("@/pages/SuccessStories"));
const SuccessStoryDetail = lazy(() => import("@/pages/SuccessStoryDetail"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));

// Programs pages
const FinancialLiteracy = lazy(() => import("@/pages/programs/FinancialLiteracy"));
const BusinessCreation = lazy(() => import("@/pages/programs/BusinessCreation"));
const LeadershipDevelopment = lazy(() => import("@/pages/programs/LeadershipDevelopment"));
const CommunityCollaboration = lazy(() => import("@/pages/programs/CommunityCollaboration"));

// Success story case studies
const SarahCaseStudy = lazy(() => import("@/pages/success-stories/SarahCaseStudy"));
const MarcusCaseStudy = lazy(() => import("@/pages/success-stories/MarcusCaseStudy"));

// Application pages
const VolunteerApplication = lazy(() => import("@/pages/VolunteerApplication"));
const PartnerApplication = lazy(() => import("@/pages/PartnerApplication"));

// Volunteer opportunity pages
const LeadershipMentor = lazy(() => import("@/pages/volunteer-opportunities/LeadershipMentor"));
const CommunityOrganizer = lazy(() => import("@/pages/volunteer-opportunities/CommunityOrganizer"));
const BusinessTraining = lazy(() => import("@/pages/volunteer-opportunities/BusinessTraining"));
const AdministrativeSupport = lazy(() => import("@/pages/volunteer-opportunities/AdministrativeSupport"));
const AdvocacyOutreach = lazy(() => import("@/pages/volunteer-opportunities/AdvocacyOutreach"));

// Course pages
const FinancialLiteracyCourse = lazy(() => import("@/pages/course/FinancialLiteracyCourse"));
const CourseWeek = lazy(() => import("@/pages/course/CourseWeek"));
const BusinessCreationCourse = lazy(() => import("@/pages/course/BusinessCreationCourse"));
const BusinessCourseWeek = lazy(() => import("@/pages/course/BusinessCourseWeek"));
const LeadershipCourse = lazy(() => import("@/pages/course/LeadershipCourse"));
const LeadershipCourseWeek = lazy(() => import("@/pages/course/LeadershipCourseWeek"));

// Resources and tools
const Resources = lazy(() => import("@/pages/Resources"));
const ResourceDetail = lazy(() => import("@/pages/ResourceDetail"));
const Cohort = lazy(() => import("@/pages/Cohort"));
const DebtCalculator = lazy(() => import("@/pages/tools/DebtCalculator"));

// Legal pages
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const MobileTerms = lazy(() => import("@/pages/MobileTerms"));
const SmsOptIn = lazy(() => import("@/pages/SmsOptIn"));

// Newsletter (standalone QR landing page — kept lazy but non-nav)
const Newsletter = lazy(() => import("@/pages/Newsletter"));

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
          <Suspense fallback={<div className="min-h-screen" />}>
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
          </Suspense>
        </ErrorBoundary>
      </main>
      {!isStandalone && <Footer />}
      <Toaster />
      {!isStandalone && <NewsletterPopup />}
      {/* Click-to-edit overlays when rendered inside Sanity Studio's Presentation
          iframe. No-op for normal visitors — safe to render unconditionally. */}
      <VisualEditing />
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
