import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import StatCard from "@/components/StatCard";

const Index = () => {
  return (
    <div className="min-h-screen bg-sand-50">
      <Navigation />
      <Hero />

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
                  <a
                    href="#"
                    className="text-gray-600 hover:text-terracotta-500 transition-colors"
                  >
                    About Us
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-terracotta-500 transition-colors"
                  >
                    Programs
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-terracotta-500 transition-colors"
                  >
                    Success Stories
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-600 hover:text-terracotta-500 transition-colors"
                  >
                    Contact
                  </a>
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