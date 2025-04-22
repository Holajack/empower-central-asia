
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const DATA = {
  title: "From Market Stall to Market Leader",
  description: "How Sarah transformed her local produce stand into a sustainable business empire.",
  image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085",
  impact: "Created 50+ jobs in the community",
};

const SarahCaseStudy = () => (
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
            When Sarah began her business journey, she operated a humble produce stall at the local bazaar. With mentorship and training, she learned to analyze market trends, build strong customer relationships, and streamline her supply chain.
          </p>
          <p className="text-gray-600 mt-2">
            Step by step, Sarah expanded her product range, hired team members from her community, and adopted sustainable business practices. Today, her company is a leader in local produce, creating jobs and inspiring other women to pursue entrepreneurship.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default SarahCaseStudy;
