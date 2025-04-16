
import { ArrowRight, DollarSign, PiggyBank, TrendingUp, BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import UpcomingEvents from "@/components/programs/UpcomingEvents";

const FinancialLiteracy = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div 
        className="relative h-[40vh] md:h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-up [--animation-delay:200ms]">
            Financial Literacy Development
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
            Essential financial education covering budgeting, savings, and investment principles
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
                  Our Financial Literacy Development program is designed to equip individuals with essential knowledge and skills to make informed financial decisions. In today's complex economic landscape, understanding how to manage personal finances effectively is critical for long-term success and stability.
                </p>
                <p className="mb-4">
                  Financial literacy is more than just knowing how to balance a checkbook or save for retirement—it's about developing a comprehensive understanding of how money works in the world. Our program takes a holistic approach, combining theoretical knowledge with practical application to ensure participants can immediately apply what they learn to their daily lives.
                </p>
                <p className="mb-4">
                  We believe that financial education should be accessible to everyone, regardless of their background or current financial situation. That's why our curriculum is designed to be approachable for beginners while still offering valuable insights for those with more financial experience.
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
                        <PiggyBank className="h-5 w-5 text-sage-500" />
                      </div>
                      <CardTitle className="text-xl text-sage-500">Budgeting & Saving</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Learn practical techniques for creating effective budgets, tracking expenses, and establishing healthy saving habits that grow your financial security over time.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sage-100 rounded-lg">
                        <DollarSign className="h-5 w-5 text-sage-500" />
                      </div>
                      <CardTitle className="text-xl text-sage-500">Debt Management</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Develop strategies for efficiently managing and reducing debt, understanding interest rates, and making informed decisions about loans and credit.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sage-100 rounded-lg">
                        <TrendingUp className="h-5 w-5 text-sage-500" />
                      </div>
                      <CardTitle className="text-xl text-sage-500">Investment Basics</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Explore fundamental investment concepts, diversification strategies, and how to build wealth through various investment vehicles appropriate for different life stages.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sage-100 rounded-lg">
                        <BarChart3 className="h-5 w-5 text-sage-500" />
                      </div>
                      <CardTitle className="text-xl text-sage-500">Financial Planning</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Create comprehensive financial plans that address short and long-term goals, from emergency funds to retirement planning and estate considerations.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-sage-600 mb-6">Program Format</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Our Financial Literacy Development program is delivered through a combination of interactive workshops, one-on-one coaching sessions, and self-paced learning modules. This multi-faceted approach ensures that participants can engage with the material in ways that best suit their learning styles.
                </p>
                <p className="mb-4">
                  Workshops are held bi-weekly and cover specific financial topics in depth. These sessions are interactive, encouraging participants to ask questions and engage in discussions with both instructors and peers. Real-world scenarios and case studies are incorporated to help bridge the gap between theory and practical application.
                </p>
                <p className="mb-4">
                  Each participant is also paired with a financial coach who provides personalized guidance based on individual circumstances and goals. These one-on-one sessions allow for more tailored advice and create a supportive environment for addressing specific financial challenges.
                </p>
                <p className="mb-4">
                  To complement the in-person learning, participants have access to our online portal containing resources, tools, and additional learning materials that can be reviewed at their own pace.
                </p>
              </div>
            </section>

            <section className="bg-sage-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-sage-600 mb-4">Success Stories</h2>
              <blockquote className="border-l-4 border-sage-300 pl-4 italic text-gray-700">
                "Before joining this program, I was constantly stressed about money. Now, I have a budget that works, I'm steadily reducing my debt, and I've even started a small investment portfolio. The confidence I've gained in managing my finances has changed my life."
                <footer className="mt-2 text-sage-500 not-italic">– Sarah K., Program Graduate</footer>
              </blockquote>
            </section>

            <div className="flex justify-center mt-8">
              <Link to="/contact">
                <Button className="bg-sage-500 hover:bg-sage-600">
                  Register for the Program
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
                  <span className="font-medium">8 weeks</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <span className="font-medium">Hybrid (Online/In-person)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Commitment:</span>
                  <span className="font-medium">4 hours/week</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Start Date:</span>
                  <span className="font-medium">May 5, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Cost:</span>
                  <span className="font-medium">Sliding scale available</span>
                </div>
                <div className="pt-4">
                  <Link to="/contact">
                    <Button variant="outline" className="w-full border-sage-300 text-sage-600 hover:bg-sage-50">
                      Request Information
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

export default FinancialLiteracy;
