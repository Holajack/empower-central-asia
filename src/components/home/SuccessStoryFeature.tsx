import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const SuccessStoryFeature = () => {
  return (
    <section className="py-16 px-4 bg-sage-50">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3">
            <img
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
              alt="Sarah Chen"
              className="rounded-full w-48 h-48 object-cover mx-auto"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <blockquote className="text-xl italic text-gray-700">
              "BBB's mentorship program transformed my small tech startup into a thriving business serving our local community. Their guidance was invaluable in helping me scale sustainably."
            </blockquote>
            <div className="font-semibold text-sage-500">Sarah Chen</div>
            <div className="text-sm text-gray-600">Tech Solutions Co.</div>
            <Link 
              to="/success-stories"
              className="inline-flex items-center bg-terracotta-500 text-white px-6 py-3 rounded-md hover:bg-terracotta-400 transition-colors group"
            >
              See More Success Stories
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoryFeature;