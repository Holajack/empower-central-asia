import React from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, Users, Network, Clock, Calendar, CheckCircle2, Heart, Star, UserPlus, Settings, Megaphone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import GoHighLevelForm from "@/components/forms/GoHighLevelForm";

const CommunityOrganizer = () => {
  return (
    <>
      <Helmet>
        <title>Community Organizer - Volunteer Opportunity | Businesses Beyond Borders</title>
        <meta name="description" content="Join our founding team as a Community Organizer with Businesses Beyond Borders. Build volunteer-driven community collaboration networks connecting entrepreneurs. 2 hours/week commitment. Make global impact from Port Orange, FL." />
        <meta name="keywords" content="community organizer volunteer Port Orange FL, volunteer coordinator opportunities Volusia County, nonprofit community organizing Florida, volunteer program coordinator Daytona Beach, community development volunteer Central Florida, nonprofit outreach volunteer opportunities" />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-green-600 to-teal-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <UserPlus className="w-4 h-4" />
                FOUNDING TEAM OPPORTUNITY
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Community
                <span className="text-yellow-300"> Organizer</span>
              </h1>
              <p className="text-xl md:text-2xl text-green-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Build our volunteer-driven community collaboration network from the ground up. 
                <strong className="text-white"> Help connect entrepreneurs with the resources they need.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#apply-now">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                    Join Founding Team
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Link to="/get-involved">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-green-700 font-bold px-8 py-4 text-lg">
                    View All Opportunities
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Key Stats */}
        <div className="bg-white py-12 border-b">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto text-center">
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">2 hrs</div>
                <div className="text-sm text-gray-600">Per Week</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">Apr 2026</div>
                <div className="text-sm text-gray-600">Start Date</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">Remote</div>
                <div className="text-sm text-gray-600">Work Location</div>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">New</div>
                <div className="text-sm text-gray-600">Program Launch</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Available Roles Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                Community Organizer 
                <span className="text-green-600"> Roles Available</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-blue-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <Settings className="w-6 h-6" />
                      Program Coordinators
                      <span className="bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full ml-2">2 needed</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Lead program development and oversee day-to-day operations of community collaboration initiatives.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Develop program structure and processes
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Coordinate volunteer teams and activities
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Track program metrics and outcomes
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Manage partnerships and collaborations
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-purple-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-600">
                      <Calendar className="w-6 h-6" />
                      Event Organizers
                      <span className="bg-purple-100 text-purple-700 text-xs px-2 py-1 rounded-full ml-2">4 needed</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Plan and execute networking events, workshops, and community gatherings both virtual and in-person.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Design engaging event experiences
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Manage event logistics and coordination
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Facilitate networking and connections
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Follow up on event outcomes
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-orange-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-600">
                      <Megaphone className="w-6 h-6" />
                      Outreach Specialists
                      <span className="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full ml-2">6 needed</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Build relationships with local businesses, organizations, and potential partners to expand our network.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Research and identify potential partners
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Create compelling outreach materials
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Conduct initial partnership meetings
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Maintain relationship database
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-teal-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-teal-600">
                      <Network className="w-6 h-6" />
                      Administrative Support
                      <span className="bg-teal-100 text-teal-700 text-xs px-2 py-1 rounded-full ml-2">4 needed</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Provide essential operational support including communications, data management, and process documentation.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Manage community communications
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Maintain volunteer and partner databases
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Create process documentation
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Support program reporting
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Program Development Timeline */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Community Collaboration 
                <span className="text-green-600"> Development Timeline</span>
              </h2>
              <div className="space-y-6">
                <Card className="border-l-4 border-blue-500">
                  <CardHeader>
                    <CardTitle className="text-blue-600">Phase 1: Foundation Building (Months 1-3) - Q2 2026</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Establish program structure, recruit founding team, and build core systems.
                    </p>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Team Building</div>
                        <p className="text-sm text-gray-600">Recruit 16 volunteers</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Training</div>
                        <p className="text-sm text-gray-600">Comprehensive onboarding</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Systems</div>
                        <p className="text-sm text-gray-600">Build operational processes</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Partnerships</div>
                        <p className="text-sm text-gray-600">Initial partner outreach</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardHeader>
                    <CardTitle className="text-green-600">Phase 2: Program Launch (Months 4-6) - Q3 2026</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Launch community collaboration initiatives and begin serving entrepreneurs.
                    </p>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">First Events</div>
                        <p className="text-sm text-gray-600">Monthly networking events</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Partnerships</div>
                        <p className="text-sm text-gray-600">10+ active partners</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Entrepreneurs</div>
                        <p className="text-sm text-gray-600">Serve first 25 entrepreneurs</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Feedback</div>
                        <p className="text-sm text-gray-600">Continuous improvement</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-purple-500">
                  <CardHeader>
                    <CardTitle className="text-purple-600">Phase 3: Growth & Impact (Months 7-12) - Q4 2026 & Beyond</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Scale program impact and establish sustainable community collaboration model.
                    </p>
                    <div className="grid md:grid-cols-4 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Scale</div>
                        <p className="text-sm text-gray-600">100+ entrepreneurs served</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Network</div>
                        <p className="text-sm text-gray-600">25+ partner organizations</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Success Stories</div>
                        <p className="text-sm text-gray-600">Document impact</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Expansion</div>
                        <p className="text-sm text-gray-600">Plan program growth</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Ideal Candidate Section */}
          <section className="mb-16 bg-gray-50 p-8 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Are You Our Next 
                <span className="text-green-600"> Community Organizer?</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Users className="w-6 h-6 text-green-600" />
                    Experience We Value
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Event planning or project coordination experience
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Community organizing or volunteer management
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Business networking or partnership development
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Social media and communications experience
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    Essential Qualities
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Strong communication and interpersonal skills
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Self-motivated and able to work independently
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Passionate about community building
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Committed to building valuable networks
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16 bg-gradient-to-br from-blue-50 to-green-50 p-8 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Why Our Community Organizers 
                <span className="text-green-600"> Love Their Role</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-500" />
                    Professional Growth
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      Build program management and coordination skills
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      Develop extensive professional network
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      Gain experience in startup and nonprofit sectors
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      Leadership development opportunities
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    Community Impact
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      Create lasting connections between entrepreneurs
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      Build sustainable community resources
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      Be part of founding team legacy
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      Make measurable community impact
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Support Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Complete Support for 
                <span className="text-green-600"> Founding Team</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center p-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Settings className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Comprehensive Training</h3>
                  <p className="text-sm text-gray-600">
                    Complete onboarding covering community organizing, partnership development, and program management
                  </p>
                </Card>
                <Card className="text-center p-6">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Network className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Team Collaboration</h3>
                  <p className="text-sm text-gray-600">
                    Work closely with other organizers in weekly team meetings and collaborative project planning
                  </p>
                </Card>
                <Card className="text-center p-6">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Flexible Remote Work</h3>
                  <p className="text-sm text-gray-600">
                    Work from anywhere with flexible scheduling to accommodate your availability and time zone
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* Application Form Section */}
          <section id="apply-now" className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Ready to Join Our 
                <span className="text-green-600"> Founding Team?</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Be part of building something new! Apply to become a Community Organizer and help us create lasting impact.
              </p>
            </div>
            <GoHighLevelForm
              formType="volunteer"
              title="Community Organizer Application"
              description="Apply to join our founding team of Community Organizers. We'll review your application and contact you within 48 hours."
              submitButtonText="Submit Community Organizer Application"
              volunteerOpportunity="community-organizer"
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default CommunityOrganizer;