
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { testimonials } from "@/data/testimonials";

const nicoleTestimonial = testimonials.find(t => t.name === "Nicole");

const SuccessStoryFeature = () => {
  // Guard: if Nicole is missing, render nothing (should not happen)
  if (!nicoleTestimonial) return null;

  return (
    <section className="py-16 px-4 bg-sage-50">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3">
            <img
              src={nicoleTestimonial.image}
              alt={nicoleTestimonial.name}
              className="rounded-full w-48 h-48 object-cover mx-auto"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <blockquote className="text-xl italic text-gray-700">
              "{nicoleTestimonial.quote}"
            </blockquote>
            <div className="font-semibold text-sage-500">{nicoleTestimonial.name}</div>
            {nicoleTestimonial.business && (
              <div className="text-sm text-gray-600">{nicoleTestimonial.business}</div>
            )}
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
