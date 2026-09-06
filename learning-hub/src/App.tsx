import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ConvexProvider } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { useAuth } from "@clerk/react";
import Index from "@/pages/Index";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import ScrollToTop from "@/components/ScrollToTop";
import NewsletterPopup from "@/components/NewsletterPopup";
import ErrorBoundary from "@/components/ErrorBoundary";
import LocaleSEO from "@/components/seo/LocaleSEO";
import NotFound from "@/pages/NotFound";
import { RegionProvider } from "@/contexts/RegionContext";
import { AuthProvider, clerkEnabled } from "@/lib/auth";
import { convexClient } from "@/lib/convex";
import { currentBasename } from "@/lib/locale";
import RequireAuth from "@/components/auth/RequireAuth";

// Lazy-loaded routes (code splitting keeps the large course data out of the first paint)
const Programs = lazy(() => import("@/pages/Programs"));
const Community = lazy(() => import("@/pages/Community"));
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const Resources = lazy(() => import("@/pages/Resources"));
const ResourceDetail = lazy(() => import("@/pages/ResourceDetail"));
const Cohort = lazy(() => import("@/pages/Cohort"));
const Newsletter = lazy(() => import("@/pages/Newsletter"));
const DebtCalculator = lazy(() => import("@/pages/tools/DebtCalculator"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));

const FinancialLiteracyCourse = lazy(() => import("@/pages/course/FinancialLiteracyCourse"));
const CourseWeek = lazy(() => import("@/pages/course/CourseWeek"));
const BusinessCreationCourse = lazy(() => import("@/pages/course/BusinessCreationCourse"));
const BusinessCourseWeek = lazy(() => import("@/pages/course/BusinessCourseWeek"));
const LeadershipCourse = lazy(() => import("@/pages/course/LeadershipCourse"));
const LeadershipCourseWeek = lazy(() => import("@/pages/course/LeadershipCourseWeek"));

const SignInPage = lazy(() => import("@/pages/auth/SignInPage"));
const SignUpPage = lazy(() => import("@/pages/auth/SignUpPage"));
const WelcomePage = lazy(() => import("@/pages/auth/WelcomePage"));
const DashboardPage = lazy(() => import("@/pages/auth/DashboardPage"));

// Standalone pages that render without Nav/Footer (e.g. QR code landing pages)
const STANDALONE_ROUTES = ["/newsletter"];

function AppContent() {
  const location = useLocation();
  const isStandalone = STANDALONE_ROUTES.includes(location.pathname);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:text-[#1B2A4A] focus:rounded focus:shadow-lg focus:text-sm focus:font-medium"
      >
        Skip to main content
      </a>
      <LocaleSEO />
      <ScrollToTop />
      {!isStandalone && <Navigation />}
      <main id="main-content">
        <ErrorBoundary>
          <Suspense fallback={<div className="min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/programs" element={<Programs />} />
              <Route path="/community" element={<Community />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/resources" element={<Resources />} />
              <Route path="/resources/:slug" element={<ResourceDetail />} />
              <Route path="/cohort" element={<Cohort />} />
              <Route path="/newsletter" element={<Newsletter />} />
              <Route path="/tools/debt-calculator" element={<DebtCalculator />} />
              <Route path="/privacy" element={<PrivacyPolicy />} />

              {/* Courses — landing pages are public; week pages show a preview to signed-out visitors */}
              <Route path="/course/financial-literacy" element={<FinancialLiteracyCourse />} />
              <Route path="/course/financial-literacy/:week" element={<CourseWeek />} />
              <Route path="/course/business-creation" element={<BusinessCreationCourse />} />
              <Route path="/course/business-creation/:week" element={<BusinessCourseWeek />} />
              <Route path="/course/leadership-development" element={<LeadershipCourse />} />
              <Route path="/course/leadership-development/:week" element={<LeadershipCourseWeek />} />

              {/* Account */}
              <Route path="/sign-in" element={<SignInPage />} />
              <Route path="/sign-up" element={<SignUpPage />} />
              <Route path="/welcome" element={<WelcomePage />} />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <DashboardPage />
                  </RequireAuth>
                }
              />

              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      {!isStandalone && <Footer />}
      <Toaster />
      {!isStandalone && <NewsletterPopup />}
    </>
  );
}

/** Wires Convex (optional) to Clerk (optional). */
function DataProvider({ children }: { children: React.ReactNode }) {
  if (!convexClient) return <>{children}</>;
  if (clerkEnabled) {
    return (
      <ConvexProviderWithClerk client={convexClient} useAuth={useAuth}>
        {children}
      </ConvexProviderWithClerk>
    );
  }
  return <ConvexProvider client={convexClient}>{children}</ConvexProvider>;
}

function App() {
  return (
    <RegionProvider>
      <AuthProvider>
        <DataProvider>
          <Router basename={currentBasename()}>
            <AppContent />
          </Router>
        </DataProvider>
      </AuthProvider>
    </RegionProvider>
  );
}

export default App;
