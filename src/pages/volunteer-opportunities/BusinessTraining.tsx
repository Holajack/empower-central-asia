import React from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, HandHelping, BookOpen, Clock, Award, CheckCircle2, Heart, Star, TrendingUp, Lightbulb, Users, Calculator } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import GoHighLevelForm from "@/components/forms/GoHighLevelForm";

const BusinessTraining = () => {
  return (
    <>
      <Helmet>
        <title>Business Training Volunteer - Support Our Programs | Businesses Beyond Borders</title>
        <meta name="description" content="Support our proven Financial Discipleship and Business Creation programs as a Business Training Volunteer. Help entrepreneurs in Central Asia develop essential business skills. Flexible scheduling from Port Orange, FL." />
        <meta name="keywords" content="business training volunteer Port Orange FL, financial literacy volunteer Volusia County, entrepreneurship education volunteer Florida, business mentor volunteer Daytona Beach, nonprofit training volunteer Central Florida, volunteer business instructor opportunities" />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <HandHelping className="w-4 h-4" />
                PROVEN PROGRAM SUPPORT
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Business Training
                <span className="text-yellow-300"> Volunteer</span>
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Support our proven Financial Discipleship and Business Creation programs. 
                <strong className="text-white"> Help entrepreneurs build sustainable businesses.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#apply-now">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                    Apply to Support Programs
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </a>
                <Link to="/get-involved">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-purple-700 font-bold px-8 py-4 text-lg">
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
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-sm text-gray-600">Program Success Rate</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">2</div>
                <div className="text-sm text-gray-600">Core Programs</div>
              </div>
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">Flexible</div>
                <div className="text-sm text-gray-600">Schedule</div>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">Remote</div>
                <div className="text-sm text-gray-600">Support Role</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* Program Support Opportunities */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                Support Our Proven 
                <span className="text-purple-600"> Training Programs</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-green-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <Calculator className="w-6 h-6" />
                      Financial Discipleship Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Support our comprehensive financial literacy program that has achieved 100% completion rates across Central Asia.
                    </p>
                    <div className="bg-green-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-green-800 mb-2">Program Features:</h4>
                      <ul className="text-sm text-green-700 space-y-1">
                        <li>• Three-Thirds Learning Method</li>
                        <li>• 10-week, 6-week, and 4-week formats</li>
                        <li>• Practical money management training</li>
                        <li>• Biblical stewardship principles</li>
                      </ul>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Assist with curriculum preparation and materials
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Support virtual training sessions
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Help with participant progress tracking
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-blue-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <TrendingUp className="w-6 h-6" />
                      Business Creation Training
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Help deliver our 12-week comprehensive entrepreneurship program using Lean Startup methodology and Business Model Canvas.
                    </p>
                    <div className="bg-blue-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-blue-800 mb-2">Program Components:</h4>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Business Model Canvas training</li>
                        <li>• MVP development guidance</li>
                        <li>• Market validation techniques</li>
                        <li>• Financial planning and budgeting</li>
                      </ul>
                    </div>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Facilitate workshop breakout sessions
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Provide one-on-one business plan feedback
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Mentor entrepreneurs through program milestones
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Volunteer Roles Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Ways to Support 
                <span className="text-purple-600"> Our Training Programs</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center p-6">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Training Assistant</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Help facilitate training sessions, manage breakout rooms, and provide technical support during virtual workshops.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• 2-3 hours per session</li>
                    <li>• Flexible scheduling</li>
                    <li>• Training provided</li>
                  </ul>
                </Card>

                <Card className="text-center p-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Curriculum Developer</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Help create and refine training materials, worksheets, and resources for our proven programs.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Project-based work</li>
                    <li>• Creative collaboration</li>
                    <li>• Skills development</li>
                  </ul>
                </Card>

                <Card className="text-center p-6">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Lightbulb className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Business Mentor</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    Provide one-on-one mentoring to entrepreneurs going through our business creation program.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• 1-2 hours per week</li>
                    <li>• Ongoing relationships</li>
                    <li>• High impact role</li>
                  </ul>
                </Card>
              </div>
            </div>
          </section>

          {/* Training & Support Section */}
          <section className="mb-16 bg-gray-50 p-8 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Complete Training & 
                <span className="text-purple-600"> Support Provided</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-purple-500">
                  <CardHeader>
                    <CardTitle className="text-purple-600">Comprehensive Onboarding</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Program methodology training
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Cultural sensitivity workshop
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Technology platform tutorial
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Practice sessions with feedback
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardHeader>
                    <CardTitle className="text-green-600">Ongoing Support</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3 text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Weekly volunteer coordination meetings
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Dedicated program coordinator support
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Access to training materials and resources
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        Monthly volunteer appreciation events
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Ideal Volunteer Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Are You Our Next 
                <span className="text-purple-600"> Business Training Volunteer?</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-purple-600" />
                    Ideal Background
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Business experience or educational background
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Financial literacy or accounting knowledge
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Teaching, training, or presentation experience
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Entrepreneurial or small business experience
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
                      Passion for helping others succeed
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Patient and encouraging teaching style
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Cultural sensitivity and adaptability
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Reliable and committed to program success
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Time Commitment Options */}
          <section className="mb-16 bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Flexible Time 
                <span className="text-purple-600"> Commitment Options</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center p-6">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Light Support</h3>
                  <p className="text-2xl font-bold text-blue-600 mb-2">2-3 hrs/week</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Perfect for busy professionals who want to make a meaningful impact with limited time availability.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Curriculum development</li>
                    <li>• Material preparation</li>
                    <li>• Occasional session support</li>
                  </ul>
                </Card>

                <Card className="text-center p-6 border-2 border-purple-300">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Star className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Regular Support</h3>
                  <p className="text-2xl font-bold text-purple-600 mb-2">4-6 hrs/week</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Most popular option - regular training session support with ongoing mentoring relationships.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Weekly session facilitation</li>
                    <li>• 1:1 entrepreneur mentoring</li>
                    <li>• Program development input</li>
                  </ul>
                </Card>

                <Card className="text-center p-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Award className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Lead Volunteer</h3>
                  <p className="text-2xl font-bold text-green-600 mb-2">8-10 hrs/week</p>
                  <p className="text-sm text-gray-600 mb-4">
                    Leadership role coordinating program delivery and mentoring other volunteers.
                  </p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    <li>• Program coordination</li>
                    <li>• Volunteer mentoring</li>
                    <li>• Strategic planning input</li>
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
                <span className="text-purple-600"> Training Programs?</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join our team of business training volunteers and help entrepreneurs build successful, sustainable businesses.
              </p>
            </div>
            <GoHighLevelForm
              formType="volunteer"
              title="Business Training Volunteer Application"
              description="Apply to support our proven Financial Discipleship and Business Creation programs. We'll review your application and contact you within 48 hours."
              submitButtonText="Submit Training Volunteer Application"
              volunteerOpportunity="business-trainer"
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default BusinessTraining;