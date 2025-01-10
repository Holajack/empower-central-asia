import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Index from "./pages/Index";
import About from "./pages/About";
import ProgramsAndImpact from "./pages/ProgramsAndImpact";
import SuccessStories from "./pages/SuccessStories";
import GetInvolved from "./pages/GetInvolved";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/programs" element={<ProgramsAndImpact />} />
        <Route path="/stories" element={<SuccessStories />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;