import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const QuickAbout = () => {
  return (
    <section className="py-16 px-4 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center space-y-8 animate-fade-up">
          <p className="text-xl text-gray-700 leading-relaxed">
            Businesses Beyond Borders is dedicated to helping aspiring entrepreneurs gain the knowledge 
            and resources they need to build sustainable businesses and impact their communities.
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-8">
            {["Inclusivity", "Innovation", "Community", "Sustainability"].map((value, index) => (
              <div 
                key={value}
                className="p-4 rounded-lg bg-sage-50 text-sage-500 text-center font-semibold"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {value}
              </div>
            ))}
          </div>

          <Link 
            to="/about"
            className="inline-flex items-center text-terracotta-500 hover:text-terracotta-400 font-medium group"
          >
            Read Our Story
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default QuickAbout;