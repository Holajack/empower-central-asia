
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DATA = {
  title: "Tech Innovation in Rural Areas",
  description: "Marcus brought affordable internet solutions to underserved communities.",
  image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
  impact: "Connected 1000+ households",
};

const MarcusCaseStudy = () => (
  <div className="min-h-screen bg-gray-50 pt-20 md:pt-28">
    <div className="container mx-auto px-4 py-8">
      <Link to="/success-stories" className="text-terracotta-500 hover:text-terracotta-700 flex items-center gap-2 mb-6 md:mb-8">
        <ArrowLeft size={16} /> Back to Success Stories
      </Link>
      <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-3xl mx-auto">
        <img
          src={DATA.image}
          alt={DATA.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-8">
          <h1 className="text-3xl font-bold text-sage-500 mb-4">{DATA.title}</h1>
          <p className="text-gray-700 text-lg mb-6">{DATA.description}</p>
          <div className="bg-sage-50 p-4 rounded mb-4">
            <div className="font-semibold text-sage-700">Impact:</div>
            <div className="text-gray-600">{DATA.impact}</div>
          </div>
          <p className="text-gray-600">
            Marcus grew up in a rural area with limited internet access. After studying technology, he returned home determined to bridge the digital divide. He founded his company to provide affordable, reliable internet infrastructure to towns in need.
          </p>
          <p className="text-gray-600 mt-2">
            Through determination and community engagement, Marcus partnered with local leaders and international organizations. His work has digitally connected over a thousand households, enabling education, entrepreneurship, and new opportunities for all.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default MarcusCaseStudy;
