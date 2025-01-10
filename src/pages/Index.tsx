import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StatCard from "@/components/StatCard";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const Index = () => {
  return (
    <div className="min-h-screen bg-sand-50">
      <Navigation />
      <Hero />

      {/* Quick About Section */}
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

      {/* Impact Statistics */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <StatCard number={500} label="Entrepreneurs Trained" delay={0} />
            <StatCard number={10} label="Communities Served" suffix="+" delay={200} />
            <StatCard number={85} label="Success Rate" suffix="%" delay={400} />
            <StatCard number={1200} label="Jobs Created" delay={600} />
          </div>
        </div>
      </section>

      {/* Programs at a Glance */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Programs at a Glance
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Business Training Workshops",
                description: "Comprehensive workshops covering business planning, marketing, and financial management fundamentals.",
              },
              {
                title: "Financial Literacy Classes",
                description: "Essential financial education covering budgeting, savings, and investment principles.",
              },
              {
                title: "Leadership & Mentorship Sessions",
                description: "One-on-one mentoring with experienced business leaders to develop management skills.",
              },
              {
                title: "Community Collaboration Projects",
                description: "Initiatives that bring entrepreneurs together to create sustainable impact in local communities.",
              },
            ].map((program, index) => (
              <Card 
                key={program.title}
                className="border-sage-200 hover:shadow-lg transition-all duration-300"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader>
                  <CardTitle className="text-xl text-sage-500">
                    {program.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 mb-4">
                    {program.description}
                  </CardDescription>
                  <Link 
                    to="/programs"
                    className="inline-flex items-center text-terracotta-500 hover:text-terracotta-400 text-sm font-medium group"
                  >
                    Learn More
                    <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4 text-terracotta-500">
                CentralImpact
              </h3>
              <p className="text-gray-600 mb-4">
                Empowering entrepreneurs and transforming communities across Central
                Asia through sustainable business development.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                Quick Links
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className="text-gray-600 hover:text-terracotta-500 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    to="/programs"
                    className="text-gray-600 hover:text-terracotta-500 transition-colors"
                  >
                    Programs
                  </Link>
                </li>
                <li>
                  <Link
                    to="/success-stories"
                    className="text-gray-600 hover:text-terracotta-500 transition-colors"
                  >
                    Success Stories
                  </Link>
                </li>
                <li>
                  <Link
                    to="/contact"
                    className="text-gray-600 hover:text-terracotta-500 transition-colors"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4 text-gray-800">
                Contact Us
              </h4>
              <p className="text-gray-600 mb-2">Email: info@centralimpact.org</p>
              <p className="text-gray-600 mb-4">Phone: +1 (555) 123-4567</p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-gray-400 hover:text-terracotta-500 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-terracotta-500 transition-colors"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="text-gray-400 hover:text-terracotta-500 transition-colors"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; 2024 CentralImpact. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
