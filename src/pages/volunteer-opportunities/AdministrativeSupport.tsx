import React from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, Network, FileText, Clock, Calendar, CheckCircle2, Heart, Star, Database, Mail, Headphones, Monitor } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import GoHighLevelForm from "@/components/forms/GoHighLevelForm";

const AdministrativeSupport = () => {
  return (
    <>
      <Helmet>
        <title>Administrative Support Volunteer - Essential Operations | Businesses Beyond Borders</title>
        <meta name="description" content="Support essential operations as an Administrative Support Volunteer with Businesses Beyond Borders. Help with communications, events, and program coordination. Flexible remote work from Port Orange, FL." />
        <meta name="keywords" content="administrative support volunteer Port Orange FL, nonprofit admin volunteer Volusia County, virtual assistant volunteer Florida, event coordination volunteer Daytona Beach, communications volunteer Central Florida, database management volunteer opportunities" />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-orange-600 to-red-600 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Network className="w-4 h-4" />
                ESSENTIAL OPERATIONS SUPPORT
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Administrative
                <span className="text-yellow-300"> Support</span>
              </h1>
              <p className="text-xl md:text-2xl text-orange-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Be the backbone of our operations. Help with communications, events, and program coordination. 
                <strong className="text-white"> Your organizational skills make everything possible.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#apply-now">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                    Apply for Admin Support
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Link to="/get-involved">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-orange-700 font-bold px-8 py-4 text-lg">
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
              <div className="bg-orange-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">3-5 hrs</div>
                <div className="text-sm text-gray-600">Per Week</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">Remote</div>
                <div className="text-sm text-gray-600">Work Location</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">Flexible</div>
                <div className="text-sm text-gray-600">Schedule</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">Essential</div>
                <div className="text-sm text-gray-600">Mission Support</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Administrative Roles Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                Administrative Support 
                <span className="text-orange-600"> Roles Available</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-blue-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <Mail className="w-6 h-6" />
                      Communications Coordinator
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Manage email communications, social media updates, newsletter creation, and volunteer communication systems.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Create and send volunteer newsletters
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Manage social media content calendar
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Respond to general inquiries and volunteer questions
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Coordinate announcements and updates
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-purple-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-600">
                      <Calendar className="w-6 h-6" />
                      Event Coordination Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Support event planning, registration management, and logistical coordination for workshops, networking events, and volunteer meetings.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Manage event registration and attendee lists
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Coordinate virtual meeting setup and tech support
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Create event materials and follow-up surveys
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Send event reminders and confirmations
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <Database className="w-6 h-6" />
                      Database & Records Manager
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Maintain volunteer databases, update contact information, track volunteer hours, and generate reports for program evaluation.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Update volunteer and partner contact databases
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Track volunteer hours and contributions
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Generate monthly activity and impact reports
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Maintain program participant records
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-teal-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-teal-600">
                      <Monitor className="w-6 h-6" />
                      Technical Support Assistant
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Provide technical support during virtual training sessions, help with website updates, and assist with digital tool implementation.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Troubleshoot virtual meeting technical issues
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Help participants with platform access
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Basic website content updates
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Assist with digital tool setup and training
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Daily Tasks Section */}
          <section className="mb-16 bg-gray-50 p-8 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                What You'll Do 
                <span className="text-orange-600"> Day-to-Day</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center p-6">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Daily Communications</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Handle email correspondence, social media updates, and volunteer communications to keep everyone connected and informed.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Email management</li>
                    <li>• Social media posting</li>
                    <li>• Volunteer updates</li>
                  </ul>
                </Card>

                <Card className="text-center p-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <FileText className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Data Management</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Organize and maintain accurate records of volunteers, participants, and program activities for effective operations.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Database updates</li>
                    <li>• Report generation</li>
                    <li>• Record maintenance</li>
                  </ul>
                </Card>

                <Card className="text-center p-6">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Headphones className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Program Support</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Provide behind-the-scenes support during training sessions, events, and meetings to ensure smooth operations.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Event coordination</li>
                    <li>• Technical support</li>
                    <li>• Logistics management</li>
                  </ul>
                </Card>
              </div>
            </div>
          </section>

          {/* Skills & Tools Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Skills & Tools 
                <span className="text-orange-600"> You'll Use</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-orange-500">
                  <CardHeader>
                    <CardTitle className="text-orange-600">Essential Skills</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Strong written communication skills
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Attention to detail and accuracy
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Time management and organization
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Customer service orientation
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Basic computer and internet skills
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500">
                  <CardHeader>
                    <CardTitle className="text-blue-600">Tools & Platforms</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Microsoft Office or Google Workspace
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Zoom, Teams, or similar video platforms
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Email marketing tools (training provided)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Social media platforms
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Database management tools (training provided)
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Benefits & Growth Section */}
          <section className="mb-16 bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Professional Development 
                <span className="text-orange-600"> Opportunities</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Star className="w-6 h-6 text-yellow-500" />
                    Skills You'll Develop
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      Nonprofit operations and management
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      Digital marketing and communications
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      Event planning and coordination
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      Database management and analytics
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      Cross-cultural communication
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    Career Benefits
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      Build portfolio of nonprofit experience
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      Professional references and recommendations
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      Network with business professionals
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      Gain international development experience
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      Flexible schedule for work-life balance
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Time Commitment Options */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
                Choose Your 
                <span className="text-orange-600"> Commitment Level</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center p-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Part-Time Support</h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">2-3 hrs/week</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Perfect for students or professionals with limited availability but wanting to contribute meaningfully.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Email management</li>
                    <li>• Basic database updates</li>
                    <li>• Social media posting</li>
                  </ul>
                </Card>

                <Card className="text-center p-6 border-2 border-orange-300">
                  <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-orange-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Regular Support</h3>
                  <p className="text-2xl font-bold text-orange-600 mb-2">4-6 hrs/week</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Most popular commitment level - comprehensive administrative support across multiple areas.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Full communications management</li>
                    <li>• Event coordination support</li>
                    <li>• Database and reporting</li>
                  </ul>
                </Card>

                <Card className="text-center p-6">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Network className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Lead Administrator</h3>
                  <p className="text-2xl font-bold text-purple-600 mb-2">8-10 hrs/week</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Leadership role coordinating administrative functions and supervising other admin volunteers.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Operations coordination</li>
                    <li>• Team leadership</li>
                    <li>• Strategic planning support</li>
                  </ul>
                </Card>
              </div>
            </div>
          </section>

          {/* Application Form Section */}
          <section id="apply-now" className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Ready to Support Our 
                <span className="text-orange-600"> Operations?</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join our administrative team and be the backbone that enables our programs to transform lives around the world.
              </p>
            </div>
            <GoHighLevelForm
              formType="volunteer"
              title="Administrative Support Volunteer Application"
              description="Apply to join our administrative support team. We'll review your application and contact you within 48 hours to discuss the best role for your skills and availability."
              submitButtonText="Submit Admin Support Application"
              volunteerOpportunity="admin-support"
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default AdministrativeSupport;