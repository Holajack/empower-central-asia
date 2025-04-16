
import { ArrowRight, Target, MessageSquare, LightbulbIcon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import UpcomingEvents from "@/components/programs/UpcomingEvents";

const LeadershipDevelopment = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div 
        className="relative h-[40vh] md:h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-up [--animation-delay:200ms]">
            Leadership Development
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
            One-on-one mentoring with experienced business leaders to develop management skills
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
                  Our Leadership Development program is designed to nurture the next generation of visionary and effective leaders. In today's rapidly evolving business landscape, organizations need leaders who can navigate complexity, inspire teams, and drive sustainable growth.
                </p>
                <p className="mb-4">
                  What sets our program apart is its personalized approach to leadership development. We believe that true leadership growth happens when theory meets practice in the context of individual experience and aspirations. Through one-on-one mentoring relationships with accomplished business leaders, participants receive guidance tailored to their specific leadership journey.
                </p>
                <p className="mb-4">
                  This program goes beyond traditional leadership training by focusing not just on management techniques but on developing the whole leader. We emphasize emotional intelligence, ethical decision-making, and adaptive leadership approaches that can be applied across various contexts and challenges.
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
                        <Target className="h-5 w-5 text-sage-500" />
                      </div>
                      <CardTitle className="text-xl text-sage-500">Strategic Thinking</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Develop the ability to think holistically about your organization, identify emerging opportunities, and create actionable plans that align with long-term vision and goals.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sage-100 rounded-lg">
                        <MessageSquare className="h-5 w-5 text-sage-500" />
                      </div>
                      <CardTitle className="text-xl text-sage-500">Communication Skills</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Master techniques for clear, persuasive communication that effectively conveys your vision, builds consensus, and inspires action across diverse stakeholders.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sage-100 rounded-lg">
                        <Users className="h-5 w-5 text-sage-500" />
                      </div>
                      <CardTitle className="text-xl text-sage-500">Team Building</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Learn strategies for forming high-performing teams, fostering collaboration, managing conflicts constructively, and developing the potential of team members.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sage-100 rounded-lg">
                        <LightbulbIcon className="h-5 w-5 text-sage-500" />
                      </div>
                      <CardTitle className="text-xl text-sage-500">Adaptive Leadership</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Develop the flexibility to adjust your leadership approach based on context, challenges, and the needs of those you lead, especially during times of change and uncertainty.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-sage-600 mb-6">Program Format</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Our Leadership Development program is structured around a mentorship model, complemented by group learning sessions and practical leadership challenges. The program runs for six months, creating sufficient time for meaningful development and measurable growth.
                </p>
                <p className="mb-4">
                  Each participant is carefully matched with a mentor based on their industry, career stage, development needs, and personal leadership style. These mentoring relationships serve as the cornerstone of the program, with bi-weekly one-on-one sessions providing personalized guidance, feedback, and support.
                </p>
                <p className="mb-4">
                  Monthly group workshops bring all participants together to explore specific leadership topics through interactive discussions, case studies, and skill-building exercises. These sessions create opportunities for peer learning and network building among a community of emerging leaders.
                </p>
                <p className="mb-4">
                  Throughout the program, participants work on real-world leadership projects within their organizations, applying new concepts and skills to address actual challenges. These projects serve as practical laboratories for leadership development and provide tangible benefits to the participant's organization.
                </p>
              </div>
            </section>

            <section className="bg-sage-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-sage-600 mb-4">Success Stories</h2>
              <blockquote className="border-l-4 border-sage-300 pl-4 italic text-gray-700">
                "The personalized mentoring I received through this program transformed not just my leadership skills but my entire perspective on what it means to lead. My mentor challenged my assumptions, helped me identify blind spots, and guided me in developing my authentic leadership voice. As a result, I've been able to build a more cohesive team and drive significant business growth in my department."
                <footer className="mt-2 text-sage-500 not-italic">– Elena T., Program Graduate</footer>
              </blockquote>
            </section>

            <div className="flex justify-center mt-8">
              <Link to="/contact">
                <Button className="bg-sage-500 hover:bg-sage-600">
                  Apply for Mentorship
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
                  <span className="font-medium">6 months</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Format:</span>
                  <span className="font-medium">Mentorship & Workshops</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Commitment:</span>
                  <span className="font-medium">5 hours/week</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Cohort:</span>
                  <span className="font-medium">July 10, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Application:</span>
                  <span className="font-medium">Competitive selection</span>
                </div>
                <div className="pt-4">
                  <Link to="/contact">
                    <Button variant="outline" className="w-full border-sage-300 text-sage-600 hover:bg-sage-50">
                      Download Brochure
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

export default LeadershipDevelopment;
