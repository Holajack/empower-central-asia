
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import SmsOptIn from "@/pages/SmsOptIn";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import MobileTerms from "@/pages/MobileTerms";
import ScrollToTop from "@/components/ScrollToTop";
import NewsletterPopup from "@/components/NewsletterPopup";

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Navigation />
      <main>
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
          
          {/* Legal and Compliance Pages */}
          <Route path="/sms" element={<SmsOptIn />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/mobile-terms" element={<MobileTerms />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
      <NewsletterPopup />
    </Router>
  );
}

export default App;
