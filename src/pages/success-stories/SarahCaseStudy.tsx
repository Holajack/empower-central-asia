
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
            Sarah Chen grew up in a small agricultural town, working after school at her family's modest produce stall in the local bazaar. The stall was little more than a table and a few crates of vegetables, but even as a child, Sarah dreamed of more—of helping her family thrive, not just survive. She watched her parents struggle season after season, facing unpredictable weather, rising costs, and fierce competition. Yet, Sarah always sensed that with the right skills and support, they could turn their humble beginnings into something far greater.
          </p>
          <p className="text-gray-600 mt-2">
            Determined to find a better path, Sarah looked for new opportunities. Her journey changed course when she discovered the Businesses Beyond Borders mentorship program. Through tailored workshops and hands-on learning, she developed skills in market analysis, financial management, and digital marketing. Sarah learned to track seasonal trends and buyer behavior, which helped her adjust the stall's offerings to better match customer needs. She also found guidance from experienced women entrepreneurs who encouraged Sarah to visualize bigger possibilities for her business.
          </p>
          <p className="text-gray-600 mt-2">
            Applying what she learned, Sarah gradually expanded the market stall into a thriving business. She began offering not just raw produce, but value-added products such as jams, pickles, and fresh salads, using traditional recipes with a modern twist. With a new eye for branding, Sarah introduced eco-friendly packaging and promoted her products on social media, attracting a new wave of customers from neighboring regions. As demand grew, she hired women from her community, providing them with stable incomes and opportunities they never had before.
          </p>
          <p className="text-gray-600 mt-2">
            Today, Sarah's company is recognized as a model of sustainable business in her area. She champions environmentally conscious practices, like composting waste and supporting local growers, and regularly mentors other aspiring entrepreneurs. Beyond just financial success, Sarah is proud to have created over 50 jobs in her hometown, positively impacting countless families. Her story is a testament to what can happen when determination meets the right support network—a journey from market stall to market leader, inspiring a new generation to dream bigger and build stronger communities.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default SarahCaseStudy;

