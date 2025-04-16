
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import GetInvolved from "@/pages/GetInvolved";
import ProgramsAndImpact from "@/pages/ProgramsAndImpact";
import SuccessStories from "@/pages/SuccessStories";
import Blog from "@/pages/Blog";
import BlogPost from "@/pages/BlogPost";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";
import FinancialLiteracy from "@/pages/programs/FinancialLiteracy";
import BusinessCreation from "@/pages/programs/BusinessCreation";
import LeadershipDevelopment from "@/pages/programs/LeadershipDevelopment";
import CommunityCollaboration from "@/pages/programs/CommunityCollaboration";

function App() {
  return (
    <Router>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/get-involved" element={<GetInvolved />} />
          <Route path="/programs-and-impact" element={<ProgramsAndImpact />} />
          <Route path="/success-stories" element={<SuccessStories />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
          
          {/* New Program Routes */}
          <Route path="/programs/financial-literacy" element={<FinancialLiteracy />} />
          <Route path="/programs/business-creation" element={<BusinessCreation />} />
          <Route path="/programs/leadership-development" element={<LeadershipDevelopment />} />
          <Route path="/programs/community-collaboration" element={<CommunityCollaboration />} />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
