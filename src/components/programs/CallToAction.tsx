import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Heart, Users2, ArrowRight, Star, Target, Phone, Clock, DollarSign, MapPin } from "lucide-react";
import UpcomingEvents from "./UpcomingEvents";

const CallToAction = () => {
  return (
    <div className="bg-gradient-to-br from-purple-50 via-blue-50 to-sage-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          
          {/* Main CTA Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              <Star className="w-4 h-4" />
              Ready to Create Global Impact?
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
              Your Skills Can 
              <span className="text-purple-600"> Transform Lives</span>
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Join <strong className="text-gray-800">50+ Volusia County volunteers</strong> already making a difference. 
              Your expertise becomes someone's breakthrough opportunity.
            </p>
            
            {/* Impact Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
              <div className="bg-white/80 backdrop-blur rounded-lg p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">150+</div>
                <div className="text-sm text-gray-600">Lives Transformed</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">100%</div>
                <div className="text-sm text-gray-600">Program Success Rate</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">6+</div>
                <div className="text-sm text-gray-600">Communities Served</div>
              </div>
              <div className="bg-white/80 backdrop-blur rounded-lg p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">2-4</div>
                <div className="text-sm text-gray-600">Hours/Month</div>
              </div>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Volunteer CTA - Primary for Programs Page */}
            <Card className="relative p-8 bg-gradient-to-br from-purple-600 to-purple-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <div className="absolute top-4 right-4">
                <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                  MOST NEEDED
                </div>
              </div>
              <CardHeader className="space-y-4 pb-6">
                <div className="flex justify-center">
                  <div className="bg-white/20 p-4 rounded-full">
                    <Users2 className="w-8 h-8 text-white" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-center">Become a Program Volunteer</CardTitle>
                <CardDescription className="text-purple-100 text-center text-lg">
                  <strong className="text-white">2-4 hours per month</strong> of your expertise creates life-changing impact.
                  <strong className="text-white"> Remote volunteering</strong> from anywhere in Volusia County.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <p className="text-sm text-purple-100 mb-2">Your volunteer role includes:</p>
                  <ul className="text-sm text-white space-y-1">
                    <li>• Business mentoring via video calls</li>
                    <li>• Financial literacy training support</li>
                    <li>• Program curriculum development</li>
                    <li>• Success story documentation</li>
                  </ul>
                </div>
                <Link to="/get-involved?type=volunteer">
                  <Button 
                    size="lg"
                    className="w-full bg-white text-purple-600 hover:bg-purple-50 font-bold py-4 text-lg shadow-lg"
                  >
                    Start Volunteering Today
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Donation CTA - Secondary */}
            <Card className="p-8 bg-white border-2 border-purple-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
              <CardHeader className="space-y-4 pb-6">
                <div className="flex justify-center">
                  <div className="bg-purple-100 p-4 rounded-full">
                    <Heart className="w-8 h-8 text-purple-600" />
                  </div>
                </div>
                <CardTitle className="text-2xl font-bold text-center text-gray-800">Fund Program Expansion</CardTitle>
                <CardDescription className="text-gray-600 text-center text-lg">
                  <strong>$50</strong> funds complete business training for one entrepreneur.
                  <strong> $200</strong> sponsors an entire program cohort.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-sm text-purple-700 mb-2 font-medium">Your donation provides:</p>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Training materials and resources</li>
                    <li>• Technology platform access</li>
                    <li>• Mentor-entrepreneur matching</li>
                    <li>• Program evaluation and support</li>
                  </ul>
                </div>
                <Link to="/get-involved">
                  <Button 
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-purple-300 text-purple-700 hover:bg-purple-50 font-bold py-4 text-lg"
                  >
                    Donate Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Secondary CTAs */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Corporate Programs */}
            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg text-center">Corporate Training Partnership</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center mb-4">
                  Engage your Daytona Beach team in meaningful skills-based volunteering programs.
                </p>
                <Link to="/contact">
                  <Button variant="outline" size="sm" className="w-full">
                    Partner With Us
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Program Updates */}
            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-center">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg text-center">Program Updates</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center mb-4">
                  Get monthly reports on entrepreneur progress and program impact metrics.
                </p>
                <Link to="/get-involved?type=newsletter">
                  <Button variant="outline" size="sm" className="w-full">
                    Subscribe to Updates
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Direct Contact */}
            <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex justify-center">
                  <Phone className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-lg text-center">Questions About Programs?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 text-center mb-4">
                  Speak directly with our Port Orange program team about volunteer opportunities.
                </p>
                <Link to="/contact">
                  <Button variant="outline" size="sm" className="w-full">
                    Call (386) 517-1527
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Social Proof and Upcoming Events */}
          <div className="bg-white rounded-2xl p-8 mb-8 border border-gray-200">
            <div className="text-center mb-6">
              <p className="text-lg text-gray-700 mb-4">
                <strong className="text-purple-600">Next volunteer orientation:</strong> February 25, 2026 at 7:00 PM EST (Virtual)
              </p>
              <p className="text-sm text-gray-600 mb-6">
                🌟 <strong>Training provided:</strong> Business mentoring techniques, cultural sensitivity, and program platforms
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link to="/get-involved?type=volunteer">
                  <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                    Reserve Your Spot
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/success-stories" className="text-purple-600 hover:text-purple-700 font-medium">
                  See Success Stories →
                </Link>
              </div>
            </div>

            {/* Local Focus */}
            <div className="border-t border-gray-100 pt-6 text-center">
              <div className="flex items-center justify-center gap-2 text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Serving from Port Orange, FL - Open to all Volusia County residents</span>
              </div>
              <p className="text-xs text-gray-500">
                Virtual volunteer opportunities • Flexible scheduling • Full training provided • Ongoing support
              </p>
            </div>
          </div>

          {/* Keep existing upcoming events */}
          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
};

export default CallToAction;