import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Clock, MapPin, TrendingUp } from "lucide-react";

interface CaseStudy {
  title: string;
  description: string;
  image: string;
  impact: string;
  id?: string;
}

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
  inView: boolean;
}

const CaseStudiesSection = ({ caseStudies, inView }: CaseStudiesSectionProps) => {
  return (
    <section
      className={`py-20 px-4 md:px-6 lg:px-8 bg-gray-50 transition-opacity duration-1000 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <TrendingUp className="w-4 h-4" />
            Detailed Case Studies
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Real Stories, Real Results
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Dive deep into the journeys of entrepreneurs who transformed their lives and communities 
            through determination, mentorship, and strategic business development.
          </p>
        </div>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {caseStudies.map((study, index) => (
            <Card key={index} className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white">
              <div className="relative h-64 overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4" />
                    <span>Central Asia</span>
                  </div>
                </div>
              </div>
              <CardHeader className="pb-4">
                <CardTitle className="text-xl font-bold line-clamp-2 hover:text-purple-600 transition-colors">
                  {study.title}
                </CardTitle>
                <CardDescription className="text-gray-600 line-clamp-3 leading-relaxed">
                  {study.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border-l-4 border-green-400">
                  <p className="font-semibold text-green-800 mb-1">Key Impact:</p>
                  <p className="text-green-700 text-sm">{study.impact}</p>
                </div>
                
                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>12-16 min read</span>
                  </div>
                  
                  <Link 
                    to={study.id ? `/success-stories/${study.id}` : `/success-stories/case-study-${index + 1}`} 
                    className="block"
                  >
                    <Button 
                      className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-2"
                      size="sm"
                    >
                      Read Full Story
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Featured Quote Section */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <blockquote className="text-center">
              <p className="text-xl md:text-2xl font-medium text-gray-800 mb-6 italic">
                "Every entrepreneur's success story started with someone believing in their potential. 
                Through Businesses Beyond Borders, Volusia County volunteers become part of these transformative journeys."
              </p>
              <footer className="text-purple-600 font-semibold">
                — Jacken Holland, Founder & Executive Director
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
