
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import GetInvolved from "@/pages/GetInvolved";
import ProgramsAndImpact from "@/pages/ProgramsAndImpact";
import SuccessStories from "@/pages/SuccessStories";
import Blog from "@/pages/Blog";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Toaster } from "@/components/ui/toaster";

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
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </Router>
  );
}

export default App;
