
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { testimonials, getLocalizedTestimonial } from "@/data/testimonials";
import { useRegion } from "@/contexts/RegionContext";

const featured = testimonials[0];

const SuccessStoryFeature = () => {
  const { isCentralAsia } = useRegion();

  if (!featured) return null;

  const localized = getLocalizedTestimonial(featured, isCentralAsia);

  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto max-w-4xl">
        <div className="bg-white rounded-lg shadow-lg p-8 flex flex-col md:flex-row gap-8 items-center">
          <div className="w-full md:w-1/3">
            <img
              src={featured.image}
              alt={featured.name}
              width={192}
              height={192}
              loading="lazy"
              className="rounded-full w-48 h-48 object-cover mx-auto"
            />
          </div>
          <div className="w-full md:w-2/3 space-y-4">
            <blockquote className="text-xl italic text-gray-700">
              "{localized.displayQuote}"
            </blockquote>
            <div className="font-semibold text-[#1B2A4A]">{featured.name}</div>
            {localized.displayBusiness && (
              <div className="text-sm text-gray-600">{localized.displayBusiness}</div>
            )}
            {localized.displayBefore && localized.displayAfter && (
              <div className="flex gap-4 text-sm flex-wrap">
                <div className="bg-red-50 text-red-700 px-3 py-1 rounded-full">
                  {isCentralAsia ? "До: " : "Before: "}{localized.displayBefore}
                </div>
                <div className="bg-green-50 text-green-700 px-3 py-1 rounded-full">
                  {isCentralAsia ? "После: " : "After: "}{localized.displayAfter}
                </div>
              </div>
            )}
            <Link
              to="/success-stories"
              className="inline-flex items-center bg-[#C9922A] text-white px-6 py-3 rounded-md hover:bg-[#C9922A]/90 transition-colors group"
            >
              {isCentralAsia ? "Больше историй успеха" : "See More Success Stories"}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SuccessStoryFeature;
