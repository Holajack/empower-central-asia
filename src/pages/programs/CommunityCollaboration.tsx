
import { ArrowRight, UsersIcon, Building, Handshake, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import UpcomingEvents from "@/components/programs/UpcomingEvents";

const CommunityCollaboration = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Hero Section */}
      <div 
        className="relative h-[40vh] md:h-[50vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-3xl md:text-5xl font-bold mb-4 animate-fade-up [--animation-delay:200ms]">
            Community Collaboration
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
            Initiatives that bring entrepreneurs together to create sustainable impact in local communities
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
                  Our Community Collaboration program is built on the fundamental belief that sustainable economic development emerges from within communities rather than being imposed from outside. This program creates platforms and processes for local entrepreneurs to connect, collaborate, and collectively address community challenges.
                </p>
                <p className="mb-4">
                  Unlike traditional business development programs that focus solely on individual entrepreneurs, our approach recognizes the power of collaborative networks and shared resources. We facilitate partnerships among entrepreneurs, community organizations, and institutional stakeholders to create initiatives with broader and more lasting impact.
                </p>
                <p className="mb-4">
                  What distinguishes this program is its emphasis on both economic success and social benefit. We help participants identify opportunities where business innovation can directly address community needs, creating ventures that are profitable while also contributing to local resilience and well-being.
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
                        <UsersIcon className="h-5 w-5 text-sage-500" />
                      </div>
                      <CardTitle className="text-xl text-sage-500">Network Building</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Create meaningful connections among entrepreneurs, community organizations, and local stakeholders to foster collaboration and resource sharing.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sage-100 rounded-lg">
                        <Building className="h-5 w-5 text-sage-500" />
                      </div>
                      <CardTitle className="text-xl text-sage-500">Social Enterprise</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Develop business models that integrate social impact with financial sustainability, addressing community needs while generating viable revenue.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sage-100 rounded-lg">
                        <Handshake className="h-5 w-5 text-sage-500" />
                      </div>
                      <CardTitle className="text-xl text-sage-500">Collaborative Projects</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Initiate and facilitate shared ventures that leverage the strengths of multiple entrepreneurs to address larger community challenges.
                    </p>
                  </CardContent>
                </Card>

                <Card className="border-sage-200">
                  <CardHeader className="pb-2">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-sage-100 rounded-lg">
                        <Globe className="h-5 w-5 text-sage-500" />
                      </div>
                      <CardTitle className="text-xl text-sage-500">Community Impact</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600">
                      Measure and amplify the social, economic, and environmental benefits of entrepreneurial activity within local communities.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-sage-600 mb-6">Program Format</h2>
              <div className="prose max-w-none text-gray-700">
                <p className="mb-4">
                  Our Community Collaboration program operates as an ongoing initiative with multiple entry points and participation options. The program combines structured activities with organic relationship building to create a sustainable ecosystem of collaboration.
                </p>
                <p className="mb-4">
                  Quarterly community forums serve as anchoring events, bringing together entrepreneurs, community leaders, and institutional partners. These forums feature facilitated discussions around community challenges, emerging opportunities, and potential collaborative solutions.
                </p>
                <p className="mb-4">
                  Themed working groups form around specific community issues or opportunities identified during the forums. These smaller groups meet regularly over several months to develop detailed project plans, with guidance from our facilitators and subject matter experts.
                </p>
                <p className="mb-4">
                  Resource matching is a core service of the program, helping to connect collaborative initiatives with appropriate funding, technical assistance, mentoring, and institutional support. We maintain an extensive network of partners who can provide various forms of backing for promising community projects.
                </p>
                <p className="mb-4">
                  Digital platforms complement in-person activities, providing spaces for ongoing communication, resource sharing, and collaboration tracking. These tools help sustain momentum between formal gatherings and expand the potential for participation.
                </p>
              </div>
            </section>

            <section className="bg-sage-50 p-6 rounded-lg">
              <h2 className="text-2xl font-bold text-sage-600 mb-4">Success Stories</h2>
              <blockquote className="border-l-4 border-sage-300 pl-4 italic text-gray-700">
                "Through this program, I connected with three other local business owners who shared my concern about youth unemployment in our neighborhood. Together, we created an internship program that now serves 25 young people annually. What I couldn't accomplish alone became possible through collaboration, and our businesses have all benefited from the fresh talent and community goodwill."
                <footer className="mt-2 text-sage-500 not-italic">– David L., Program Participant</footer>
              </blockquote>
            </section>

            <div className="flex justify-center mt-8">
              <Link to="/contact">
                <Button className="bg-sage-500 hover:bg-sage-600">
                  Join Our Network
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
                  <span className="text-gray-600">Format:</span>
                  <span className="font-medium">Ongoing initiatives</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Community Forums:</span>
                  <span className="font-medium">Quarterly</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Working Groups:</span>
                  <span className="font-medium">Monthly meetings</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Next Forum:</span>
                  <span className="font-medium">May 20, 2025</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Participation:</span>
                  <span className="font-medium">Open to all local entrepreneurs</span>
                </div>
                <div className="pt-4">
                  <Link to="/contact">
                    <Button variant="outline" className="w-full border-sage-300 text-sage-600 hover:bg-sage-50">
                      Join Mailing List
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

export default CommunityCollaboration;
