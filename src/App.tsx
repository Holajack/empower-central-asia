import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Helmet } from "react-helmet";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import Index from "./pages/Index";
import About from "./pages/About";
import ProgramsAndImpact from "./pages/ProgramsAndImpact";
import SuccessStories from "./pages/SuccessStories";
import GetInvolved from "./pages/GetInvolved";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Helmet>
          <html lang="en" />
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="description" content="CentralImpact - Empowering entrepreneurs and transforming communities across Central Asia through sustainable business development and financial literacy programs." />
          <meta name="keywords" content="entrepreneurship, Central Asia, business development, financial literacy, community development, economic empowerment" />
          <title>CentralImpact - Empowering Entrepreneurs in Central Asia</title>
          <meta property="og:title" content="CentralImpact - Empowering Entrepreneurs in Central Asia" />
          <meta property="og:description" content="Transforming communities through entrepreneurship education and sustainable business development in Central Asia." />
          <meta property="og:type" content="website" />
          <meta name="twitter:card" content="summary_large_image" />
          <link rel="canonical" href="https://centralimpact.org" />
        </Helmet>
        <Navigation />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/programs" element={<ProgramsAndImpact />} />
            <Route path="/stories" element={<SuccessStories />} />
            <Route path="/get-involved" element={<GetInvolved />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Index />} /> {/* Add catch-all route */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;