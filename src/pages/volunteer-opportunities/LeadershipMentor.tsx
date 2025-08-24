import React from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, Target, Users2, Clock, Award, CheckCircle2, Heart, Star, TrendingUp, Lightbulb, Crown, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import GoHighLevelForm from "@/components/forms/GoHighLevelForm";

const LeadershipMentor = () => {
  return (
    <>
      <Helmet>
        <title>Leadership Development Mentor - Volunteer Opportunity | Businesses Beyond Borders</title>
        <meta name="description" content="Become a Leadership Development Mentor with Businesses Beyond Borders. Guide emerging leaders through our proven 12-month program using the 70-20-10 model. 4-6 hours monthly commitment. Make global impact from Port Orange, FL." />
        <meta name="keywords" content="leadership mentor volunteer Port Orange FL, business mentorship opportunities Volusia County, executive coaching volunteer Florida, leadership development volunteer Daytona Beach, mentor volunteer Central Asia, nonprofit mentorship program Florida, volunteer business advisor opportunities" />
      </Helmet>

      <div className="min-h-screen pt-20">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-blue-600 to-purple-700 text-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
                <Target className="w-4 h-4" />
                HIGH PRIORITY VOLUNTEER OPPORTUNITY
              </div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                Leadership Development
                <span className="text-yellow-300"> Mentor</span>
              </h1>
              <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed mb-8">
                Guide emerging leaders through our proven 12-month program. 
                <strong className="text-white"> Your expertise becomes someone's breakthrough moment.</strong>
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#apply-now">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                    Apply to Mentor
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
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-blue-600 mb-2">4-6 hrs</div>
                <div className="text-sm text-gray-600">Monthly Time Commitment</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-green-600 mb-2">12 mo</div>
                <div className="text-sm text-gray-600">Program Duration</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-purple-600 mb-2">85%</div>
                <div className="text-sm text-gray-600">Career Advancement Rate</div>
              </div>
              <div className="bg-orange-50 p-6 rounded-lg">
                <div className="text-2xl font-bold text-orange-600 mb-2">1:1</div>
                <div className="text-sm text-gray-600">Mentorship Format</div>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16">
          {/* What You'll Do Section */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-gray-800">
                What You'll Do as a 
                <span className="text-blue-600"> Leadership Mentor</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-l-4 border-blue-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-600">
                      <Compass className="w-6 h-6" />
                      Guide Emerging Leaders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Work one-on-one with 2-3 emerging leaders in Central Asia, helping them develop essential leadership skills through our proven 70-20-10 development model.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Monthly virtual mentoring sessions (60-90 minutes each)
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Goal setting and progress tracking
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Leadership challenge development
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-600">
                      <TrendingUp className="w-6 h-6" />
                      Develop Core Skills
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Focus on developing emotional intelligence, servant leadership principles, and transformational leadership skills in your mentees.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Emotional intelligence coaching
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Communication and conflict resolution
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Strategic thinking and decision-making
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-purple-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-600">
                      <Lightbulb className="w-6 h-6" />
                      Share Real Experience
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Draw from your professional experience to provide practical insights, case studies, and real-world applications of leadership principles.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Share leadership challenges you've overcome
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Provide industry-specific insights
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Connect mentees with your professional network
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-orange-500 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-600">
                      <Crown className="w-6 h-6" />
                      Build Future Leaders
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Help mentees create their own leadership multiplication plans, ensuring the impact continues beyond your direct mentorship.
                    </p>
                    <ul className="space-y-2 text-sm text-gray-600">
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Leadership legacy planning
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Succession planning guidance
                      </li>
                      <li className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        Community impact strategies
                      </li>
                    </ul>
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
                <span className="text-blue-600"> Leadership Mentor?</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Users2 className="w-6 h-6 text-blue-600" />
                    Ideal Background
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      5+ years in executive or senior management roles
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Experience leading teams of 10+ people
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Track record of developing other leaders
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Entrepreneurial or business development experience
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
                      Passion for developing others
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Cultural sensitivity and empathy
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Excellent communication and listening skills
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      Commitment to 12-month mentoring relationship
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Program Structure */}
          <section className="mb-16">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                12-Month Mentorship 
                <span className="text-purple-600"> Program Structure</span>
              </h2>
              <div className="space-y-6">
                <Card className="border-l-4 border-blue-500">
                  <CardHeader>
                    <CardTitle className="text-blue-600">Months 1-3: Foundation Building</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Establish trust, assess current leadership capacity, and set development goals.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Assessment</div>
                        <p className="text-sm text-gray-600">Leadership style evaluation</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Goal Setting</div>
                        <p className="text-sm text-gray-600">12-month development plan</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Trust Building</div>
                        <p className="text-sm text-gray-600">Establish mentoring relationship</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-green-500">
                  <CardHeader>
                    <CardTitle className="text-green-600">Months 4-8: Skill Development</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Focus on core leadership competencies through real-world challenges and practice.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">EQ Development</div>
                        <p className="text-sm text-gray-600">Emotional intelligence training</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Communication</div>
                        <p className="text-sm text-gray-600">Leadership communication skills</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Team Building</div>
                        <p className="text-sm text-gray-600">Team development strategies</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-l-4 border-purple-500">
                  <CardHeader>
                    <CardTitle className="text-purple-600">Months 9-12: Mastery & Multiplication</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Apply learned skills in real leadership challenges and develop others.
                    </p>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Leadership Project</div>
                        <p className="text-sm text-gray-600">Lead significant initiative</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Mentoring Others</div>
                        <p className="text-sm text-gray-600">Begin mentoring junior leaders</p>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-800">Legacy Planning</div>
                        <p className="text-sm text-gray-600">Sustainable impact strategy</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>

          {/* Benefits Section */}
          <section className="mb-16 bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
                Why Our Mentors 
                <span className="text-orange-600"> Love What They Do</span>
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Award className="w-6 h-6 text-yellow-500" />
                    Professional Benefits
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      Develop your own mentoring and coaching skills
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      Gain cross-cultural leadership experience
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      Expand your global professional network
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                      Professional references and recognition
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Heart className="w-6 h-6 text-red-500" />
                    Personal Rewards
                  </h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      Make transformational impact on emerging leaders
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      Build meaningful international relationships
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      Create lasting legacy in communities
                    </li>
                    <li className="flex items-start gap-2">
                      <Heart className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                      Personal fulfillment from giving back
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
                You Won't Be 
                <span className="text-blue-600"> Mentoring Alone</span>
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                <Card className="text-center p-6">
                  <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Target className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Comprehensive Training</h3>
                  <p className="text-sm text-gray-600">
                    Complete mentor training program covering cross-cultural mentoring, our curriculum, and best practices
                  </p>
                </Card>
                <Card className="text-center p-6">
                  <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users2 className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Mentor Community</h3>
                  <p className="text-sm text-gray-600">
                    Monthly peer learning sessions with other mentors to share challenges and best practices
                  </p>
                </Card>
                <Card className="text-center p-6">
                  <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2">Ongoing Support</h3>
                  <p className="text-sm text-gray-600">
                    Dedicated program coordinator and resources to ensure your mentoring success
                  </p>
                </Card>
              </div>
            </div>
          </section>

          {/* Application Form Section */}
          <section id="apply-now" className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                Ready to Become a 
                <span className="text-blue-600"> Leadership Mentor?</span>
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Join our founding team of leadership mentors and help shape the future of emerging leaders in Central Asia.
              </p>
            </div>
            <GoHighLevelForm
              formType="volunteer"
              title="Leadership Mentor Application"
              description="Apply to become a leadership development mentor. We'll review your application and contact you within 48 hours."
              submitButtonText="Submit Mentor Application"
              volunteerOpportunity="leadership-mentor"
            />
          </section>
        </div>
      </div>
    </>
  );
};

export default LeadershipMentor;