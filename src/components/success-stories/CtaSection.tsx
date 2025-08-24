import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users, ArrowRight, Star, Target, Phone } from "lucide-react";

interface CtaSectionProps {
  inView: boolean;
}

const CtaSection = ({ inView }: CtaSectionProps) => {
  return (
    <section 
      className={`py-20 px-4 md:px-6 lg:px-8 bg-gradient-to-br from-purple-50 via-blue-50 to-sage-50 transition-opacity duration-1000 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto max-w-6xl">
        {/* Main CTA Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <Star className="w-4 h-4" />
            Join Our Success Story Community
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-800">
            Help Write the Next Chapter of 
            <span className="text-purple-600"> Global Impact</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Every success story you've read started with someone believing in an entrepreneur's potential. 
            <strong className="text-gray-800"> Your involvement creates the next breakthrough.</strong>
          </p>
          
          {/* Impact Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">25+</div>
              <div className="text-sm text-gray-600">Entrepreneurs Supported</div>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">50+</div>
              <div className="text-sm text-gray-600">Jobs Created</div>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">$500K+</div>
              <div className="text-sm text-gray-600">Revenue Generated</div>
            </div>
            <div className="bg-white/80 backdrop-blur rounded-lg p-4 text-center">
              <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">3</div>
              <div className="text-sm text-gray-600">Countries Served</div>
            </div>
          </div>
        </div>

        {/* Primary CTAs */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Donation CTA - Primary */}
          <Card className="relative p-8 bg-gradient-to-br from-purple-600 to-purple-700 text-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <div className="absolute top-4 right-4">
              <div className="bg-yellow-400 text-yellow-900 px-3 py-1 rounded-full text-xs font-bold">
                MOST NEEDED
              </div>
            </div>
            <CardHeader className="space-y-4 pb-6">
              <div className="flex justify-center">
                <div className="bg-white/20 p-4 rounded-full">
                  <Heart className="w-8 h-8 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center">Fund the Next Success Story</CardTitle>
              <CardDescription className="text-purple-100 text-center text-lg">
                <strong className="text-white">$50</strong> provides complete business training for one entrepreneur.
                <strong className="text-white"> $200</strong> funds mentorship for an entire year.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-white/10 p-4 rounded-lg">
                <p className="text-sm text-purple-100 mb-2">Your donation creates:</p>
                <ul className="text-sm text-white space-y-1">
                  <li>• Financial literacy training</li>
                  <li>• 1-on-1 mentorship matching</li>
                  <li>• Business plan development</li>
                  <li>• Ongoing support network</li>
                </ul>
              </div>
              <Link to="/get-involved">
                <Button 
                  size="lg"
                  className="w-full bg-white text-purple-600 hover:bg-purple-50 font-bold py-4 text-lg shadow-lg"
                >
                  Donate Now - Create Impact Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Volunteer/Mentor CTA */}
          <Card className="p-8 bg-white border-2 border-sage-200 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
            <CardHeader className="space-y-4 pb-6">
              <div className="flex justify-center">
                <div className="bg-sage-100 p-4 rounded-full">
                  <Users className="w-8 h-8 text-sage-600" />
                </div>
              </div>
              <CardTitle className="text-2xl font-bold text-center text-gray-800">Share Your Expertise</CardTitle>
              <CardDescription className="text-gray-600 text-center text-lg">
                <strong>2-4 hours per month</strong> of your business experience creates life-changing mentorship for entrepreneurs worldwide.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-sage-50 p-4 rounded-lg">
                <p className="text-sm text-sage-700 mb-2 font-medium">Volunteer opportunities:</p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Remote business mentoring</li>
                  <li>• Financial planning support</li>
                  <li>• Marketing strategy guidance</li>
                  <li>• Industry expertise sharing</li>
                </ul>
              </div>
              <Link to="/get-involved?type=volunteer">
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full border-2 border-sage-300 text-sage-700 hover:bg-sage-50 font-bold py-4 text-lg"
                >
                  Become a Mentor
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Secondary CTAs */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {/* Corporate Partnerships */}
          <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex justify-center">
                <Target className="w-6 h-6 text-blue-600" />
              </div>
              <CardTitle className="text-lg text-center">Corporate Partnership</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center mb-4">
                Engage your team in meaningful global impact through skills-based volunteering.
              </p>
              <Link to="/contact">
                <Button variant="outline" size="sm" className="w-full">
                  Explore Partnerships
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* Newsletter */}
          <Card className="p-6 bg-white border border-gray-200 hover:shadow-lg transition-all duration-300">
            <CardHeader className="pb-4">
              <div className="flex justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <CardTitle className="text-lg text-center">Success Stories</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center mb-4">
                Get monthly updates on entrepreneur progress and impact stories.
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
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <CardTitle className="text-lg text-center">Talk to Our Team</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 text-center mb-4">
                Questions about getting involved? Speak directly with our Port Orange team.
              </p>
              <Link to="/contact">
                <Button variant="outline" size="sm" className="w-full">
                  Call (386) 517-1527
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Social Proof and Urgency */}
        <div className="bg-white rounded-2xl p-8 text-center border border-gray-200">
          <p className="text-lg text-gray-700 mb-4">
            <strong className="text-purple-600">Join 50+ volunteers</strong> from Volusia County already creating global impact from their homes.
          </p>
          <p className="text-sm text-gray-500 mb-6">
            🌟 <strong>Next mentor training session:</strong> February 25, 2026 | <strong>Application deadline:</strong> February 20, 2026
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/get-involved">
              <Button size="lg" className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3">
                Start Your Impact Journey
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/blog" className="text-purple-600 hover:text-purple-700 font-medium">
              Learn More About Our Approach →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;