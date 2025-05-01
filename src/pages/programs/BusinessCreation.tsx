
import { ArrowRight, Briefcase, BarChart2, Users, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import UpcomingEvents from "@/components/programs/UpcomingEvents";

const BusinessCreation = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div 
        className="relative h-[40vh] md:h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-up [--animation-delay:200ms]">
            Business Creation Training
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
            Comprehensive workshops covering business planning, marketing, and financial management fundamentals
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-sage-600 mb-6">About the Program</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Our Business Creation Training program is designed to guide aspiring entrepreneurs through the complex process of establishing and growing a successful business. We understand that while passion and innovation are crucial for entrepreneurship, they must be complemented by sound business knowledge and strategic planning.
                </p>
                <p className="mb-4">
                  This comprehensive program bridges the gap between vision and implementation, providing participants with the practical tools, knowledge, and support needed to transform business ideas into sustainable enterprises. Through a combination of interactive workshops, personalized mentoring, and hands-on project work, we create a dynamic learning environment that simulates real-world business challenges.
                </p>
                <p className="mb-4">
                  What distinguishes our approach is our focus on both technical business skills and the personal development necessary for successful entrepreneurship. We recognize that building a business requires not only knowledge of operations and finance but also resilience, adaptability, and effective leadership.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-sage-600 mb-6">Key Focus Areas</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Card className="border-sage-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sage-100 rounded-lg">
                        <Briefcase className="h-5 w-5 text-sage-500" />
                      </div>
                      <CardTitle className="text-xl text-sage-500">Business Planning</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Learn how to develop comprehensive business plans that articulate your vision, outline your operational strategy, and establish clear milestones for growth and success.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sage-100 rounded-lg">
                        <BarChart2 className="h-5 w-5 text-sage-500" />
                      </div>
                      <CardTitle className="text-xl text-sage-500">Financial Management</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Master the essentials of business financial management, including budgeting, cash flow analysis, pricing strategies, and securing appropriate funding for your venture.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sage-100 rounded-lg">
                        <Users className="h-5 w-5 text-sage-500" />
                      </div>
                      <CardTitle className="text-xl text-sage-500">Marketing & Sales</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Develop effective strategies for identifying your target market, creating compelling value propositions, and implementing cost-effective marketing approaches to attract and retain customers.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sage-100 rounded-lg">
                        <Globe className="h-5 w-5 text-sage-500" />
                      </div>
                      <CardTitle className="text-xl text-sage-500">Market Research</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Learn techniques for gathering and analyzing market data to identify opportunities, understand your competition, and make informed strategic decisions for your business.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-sage-600 mb-6">Program Format</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Our Business Creation Training program follows a structured yet flexible format that combines theoretical learning with practical application. The program runs for 12 weeks, with participants expected to commit approximately 6-8 hours per week to maximize their learning experience.
                </p>
                <p className="mb-4">
                  Weekly workshops form the backbone of the program, each focusing on a specific aspect of business creation and management. These sessions are highly interactive, encouraging participants to engage with the material through discussions, case studies, and small group activities.
                </p>
                <p className="mb-4">
                  Throughout the program, participants work on developing their own business concepts, applying the knowledge and tools gained from the workshops to their specific ventures. Regular progress reviews with experienced mentors provide guidance, feedback, and support for these developing business plans.
                </p>
                <p className="mb-4">
                  The program culminates in a business pitch event, where participants present their refined business concepts to a panel of entrepreneurs, potential investors, and community leaders. This not only provides valuable pitching experience but also creates networking opportunities and potential pathways for business funding.
                </p>
              </div>
            </section>

            <section className="bg-sage-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-sage-600 mb-4">Success Stories</h2>
              <blockquote className="border-l-4 border-sage-300 pl-4 italic text-gray-700">
                "When I joined this program, I had a business idea but no clue how to execute it. The workshops and mentoring helped me transform my concept into a viable business plan. Today, my cleaning and sewage company employs struggling people and serves clients across the region. This wouldn't have been possible without the foundation I built through this program."
                <footer className="mt-2 text-sage-500 not-italic">– Kameron K., Program Graduate</footer>
              </blockquote>
            </section>

            <div className="flex justify-center mt-8">
              <Link to="/contact">
                <Button className="bg-sage-500 hover:bg-sage-600">
                  Join the Next Cohort
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="border-sage-200">
              <CardHeader>
                <CardTitle className="text-xl text-sage-500">
                  Program Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">12 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <span className="font-medium">In-person workshops</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Commitment:</span>
                  <span className="font-medium">6-8 hours/week</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Cohort:</span>
                  <span className="font-medium">June 15, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost:</span>
                  <span className="font-medium">Subsidized rates available</span>
                </div>
                <div className="pt-4">
                  <Link to="/contact">
                    <Button variant="outline" className="w-full border-sage-300 text-sage-600 hover:bg-sage-50">
                      Request Application
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            <UpcomingEvents />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessCreation;
