import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowRight, Users, Megaphone, FileText, Calendar, MapPin, Clock, CheckCircle, Target, Globe, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import GoHighLevelForm from "@/components/forms/GoHighLevelForm";

const AdvocacyOutreach = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Advocacy & Outreach Opportunities
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Amplify Our Mission
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Help us spread awareness, build partnerships, and advocate for economic empowerment across Central Asia
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Global Impact
              </span>
              <span className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Strategic Communication
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Community Building
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="border-0 shadow-lg">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold mb-4">
                  Your Voice, Our Mission
                </CardTitle>
                <CardDescription className="text-lg">
                  As an Advocacy & Outreach volunteer, you'll be instrumental in expanding our reach, 
                  building strategic partnerships, and ensuring our message resonates with the communities 
                  and stakeholders who can make the biggest difference in Central Asia.
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Opportunity Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Advocacy & Outreach Opportunities</h2>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* Community Advocacy */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-green-100 rounded-lg">
                      <Megaphone className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-xl">Community Advocacy</CardTitle>
                  </div>
                  <CardDescription>
                    Champion economic empowerment initiatives within your local community and beyond
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Organize awareness events and presentations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Connect with local organizations and community groups</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Share success stories and impact testimonials</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Advocate for policy changes supporting entrepreneurship</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Partnership Development */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Users className="h-6 w-6 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">Partnership Development</CardTitle>
                  </div>
                  <CardDescription>
                    Build strategic relationships with organizations, institutions, and leaders
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Research and identify potential partner organizations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Develop partnership proposals and presentations</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Facilitate collaboration meetings and initiatives</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Maintain relationships with existing partners</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Content Creation & Storytelling */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-purple-100 rounded-lg">
                      <FileText className="h-6 w-6 text-purple-600" />
                    </div>
                    <CardTitle className="text-xl">Content Creation & Storytelling</CardTitle>
                  </div>
                  <CardDescription>
                    Create compelling content that shares our mission and impact stories
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Write articles, blog posts, and social media content</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Create visual content and infographics</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Document success stories and program impact</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Develop marketing materials and campaigns</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Digital Outreach */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-orange-100 rounded-lg">
                      <Globe className="h-6 w-6 text-orange-600" />
                    </div>
                    <CardTitle className="text-xl">Digital Outreach</CardTitle>
                  </div>
                  <CardDescription>
                    Leverage digital platforms to expand our reach and engagement
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Manage social media campaigns and engagement</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Develop email marketing campaigns</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Create and optimize online fundraising campaigns</span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Engage with online communities and forums</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Skills and Qualifications */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Ideal Skills & Qualities</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Preferred Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Excellent written and verbal communication</li>
                    <li>• Experience with social media marketing</li>
                    <li>• Content creation and storytelling abilities</li>
                    <li>• Public speaking and presentation skills</li>
                    <li>• Networking and relationship-building experience</li>
                    <li>• Understanding of nonprofit or development work</li>
                    <li>• Cultural sensitivity and awareness</li>
                    <li>• Creative problem-solving skills</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Personal Qualities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Passionate about economic empowerment</li>
                    <li>• Strong belief in community development</li>
                    <li>• Self-motivated and proactive</li>
                    <li>• Collaborative and team-oriented</li>
                    <li>• Adaptable to different audiences</li>
                    <li>• Persistent and results-driven</li>
                    <li>• Culturally sensitive and respectful</li>
                    <li>• Committed to ethical advocacy practices</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Levels */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Flexible Commitment Options</h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-2 border-green-200 hover:border-green-300 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto p-3 bg-green-100 rounded-full w-fit mb-3">
                    <Clock className="h-6 w-6 text-green-600" />
                  </div>
                  <CardTitle className="text-lg">Flexible Support</CardTitle>
                  <CardDescription>2-5 hours/month</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Perfect for busy professionals who want to contribute through strategic advocacy efforts
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Social media sharing</li>
                    <li>• Network introductions</li>
                    <li>• Event participation</li>
                    <li>• Content review</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-blue-200 hover:border-blue-300 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto p-3 bg-blue-100 rounded-full w-fit mb-3">
                    <Calendar className="h-6 w-6 text-blue-600" />
                  </div>
                  <CardTitle className="text-lg">Regular Advocate</CardTitle>
                  <CardDescription>5-10 hours/month</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    Ideal for those who can dedicate regular time to building partnerships and creating content
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Partnership development</li>
                    <li>• Content creation</li>
                    <li>• Event organization</li>
                    <li>• Campaign coordination</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-2 border-purple-200 hover:border-purple-300 transition-colors">
                <CardHeader className="text-center">
                  <div className="mx-auto p-3 bg-purple-100 rounded-full w-fit mb-3">
                    <Target className="h-6 w-6 text-purple-600" />
                  </div>
                  <CardTitle className="text-lg">Lead Advocate</CardTitle>
                  <CardDescription>10+ hours/month</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">
                    For dedicated advocates ready to lead major outreach initiatives and strategic partnerships
                  </p>
                  <ul className="text-sm space-y-1">
                    <li>• Strategic planning</li>
                    <li>• Major partnership deals</li>
                    <li>• Campaign leadership</li>
                    <li>• Team coordination</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Support & Benefits */}
      <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">What We Provide</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Development</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Advocacy and public speaking training</li>
                    <li>• Digital marketing workshops</li>
                    <li>• Partnership development skills</li>
                    <li>• Content creation training</li>
                    <li>• Cultural competency education</li>
                    <li>• Networking opportunities with leaders</li>
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Support & Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li>• Marketing materials and templates</li>
                    <li>• Access to impact data and statistics</li>
                    <li>• Storytelling resources and guidelines</li>
                    <li>• Partnership development toolkit</li>
                    <li>• Regular strategy meetings</li>
                    <li>• Recognition and appreciation events</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Ready to Amplify Our Mission?</h2>
              <p className="text-lg text-muted-foreground">
                Join our advocacy team and help spread the message of economic empowerment across Central Asia
              </p>
            </div>

            <GoHighLevelForm
              formType="volunteer"
              title="Advocacy & Outreach Application"
              description="Tell us about your advocacy experience and how you'd like to help expand our reach and impact."
              submitButtonText="Submit Application"
            />

            <div className="mt-8 text-center">
              <p className="text-sm text-muted-foreground mb-4">
                Questions about advocacy opportunities?
              </p>
              <Button variant="outline" asChild>
                <Link to="/contact" className="inline-flex items-center gap-2">
                  Contact Our Team
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdvocacyOutreach;