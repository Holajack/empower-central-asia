
import React from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, Users, Building, Handshake, Globe, Heart, Star, CheckCircle2, Calendar, BookOpen, Download, UserPlus, Network, Target, TrendingUp, Award, Clock, Settings, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import UpcomingEvents from "@/components/programs/UpcomingEvents";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const CommunityCollaboration = () => {
  return (
    <>
      <Helmet>
        <title>Community Collaboration Network - Volunteer-Driven Partnerships | Volusia County</title>
        <meta name="description" content="Join our volunteer-driven community collaboration network connecting entrepreneurs, businesses, and organizations in Volusia County and Central Asia. Volunteers needed to help build sustainable partnerships for local economic development and social impact." />
        <meta name="keywords" content="community collaboration Volusia County, volunteer opportunities Port Orange, nonprofit partnerships Florida, community development Daytona Beach, volunteer coordinator positions, business networking Central Florida, social enterprise collaboration, community organizing volunteers, nonprofit community partnerships, volunteer management programs" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Community Collaboration Network - Volunteer-Driven Partnerships" />
        <meta property="og:description" content="Building volunteer-driven community partnerships to connect entrepreneurs, businesses, and organizations for sustainable local impact. Volunteers needed to help launch this initiative." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/programs/community-collaboration" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1559827260-dc66d52bef19" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Community Collaboration Network - Volunteers Needed" />
        <meta name="twitter:description" content="Help us build community partnerships connecting entrepreneurs with resources and opportunities. Volunteer coordinators, organizers, and business professionals needed." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1559827260-dc66d52bef19" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Businesses Beyond Borders" />
        <link rel="canonical" href="https://businessesbeyondborders.com/programs/community-collaboration" />
        
        {/* Course and Organization schema markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["VolunteerAction", "Organization"],
            "name": "Community Collaboration Network",
            "description": "Volunteer-driven community partnerships connecting entrepreneurs, businesses, and organizations for sustainable local impact in Volusia County and Central Asia",
            "organizer": {
              "@type": "NonprofitOrganization",
              "name": "Businesses Beyond Borders",
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Port Orange",
                "addressRegion": "FL",
                "addressCountry": "US"
              },
              "telephone": "(386) 517-1527",
              "email": "donations@businessesbeyondborders.com"
            },
            "volunteerType": ["Community Organizer", "Partnership Coordinator", "Business Professional", "Event Facilitator"],
            "timeRequired": "PT2H/week",
            "skills": [
              "Community organizing",
              "Partnership development", 
              "Event planning",
              "Business networking",
              "Project coordination",
              "Communication skills"
            ],
            "location": {
              "@type": "Place",
              "name": "Volusia County, Florida",
              "address": {
                "@type": "PostalAddress",
                "addressRegion": "FL",
                "addressCountry": "US"
              }
            },
            "url": "https://businessesbeyondborders.com/programs/community-collaboration"
          })}
        </script>
      </Helmet>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Conversion Optimized */}
      <div 
        className="relative h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            Volunteers Needed to Launch
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
            Build Community 
            <span className="text-yellow-400"> Partnerships That Matter</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed mb-8">
            <strong className="text-yellow-300">Help us launch</strong> a volunteer-driven network connecting entrepreneurs, businesses, and organizations for 
            <strong className="text-yellow-300"> sustainable community impact</strong> in Volusia County and beyond.
          </p>

          {/* Key Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center mb-8">
            <div className="animate-fade-up [--animation-delay:600ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">NEW</div>
              <div className="text-sm text-white/80">Program Launch</div>
            </div>
            <div className="animate-fade-up [--animation-delay:700ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">2hrs</div>
              <div className="text-sm text-white/80">Weekly Commitment</div>
            </div>
            <div className="animate-fade-up [--animation-delay:800ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">$31.80</div>
              <div className="text-sm text-white/80">Volunteer Hour Value</div>
            </div>
            <div className="animate-fade-up [--animation-delay:900ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">10+</div>
              <div className="text-sm text-white/80">Volunteer Roles</div>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up [--animation-delay:900ms]">
            <Link to="/get-involved?type=volunteer&program=community-collaboration">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                Volunteer to Build Community
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="#volunteer-opportunities" className="text-white hover:text-yellow-300 font-medium flex items-center gap-2">
              <Download className="w-4 h-4" />
              See Volunteer Opportunities
            </Link>
          </div>

          {/* Social Proof */}
          <p className="text-sm text-white/70 mt-6 animate-fade-up [--animation-delay:1000ms]">
            ⭐ Join <strong className="text-white">pioneering volunteers</strong> building Volusia County's first comprehensive community collaboration network • 
            🌍 Connecting local impact to global change • 
            🤝 Be part of something transformational from day one
          </p>
        </div>
      </div>

      {/* Program Status - New Launch */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <UserPlus className="w-4 h-4" />
              Launching New Program
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Help Us Build Something 
              <span className="text-orange-600"> Extraordinary Together</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Based on extensive research into <strong className="text-gray-800">community collaboration best practices</strong>, we're launching a volunteer-driven 
              network that will <strong className="text-gray-800">transform how entrepreneurs connect</strong> in our community.
            </p>
          </div>

          {/* Program Vision */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Network className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Connect</h3>
              <p className="text-gray-600">
                Build meaningful relationships between entrepreneurs, businesses, and community organizations.
              </p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Handshake className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Collaborate</h3>
              <p className="text-gray-600">
                Facilitate partnerships that leverage collective strengths to address community challenges.
              </p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Heart className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Create Impact</h3>
              <p className="text-gray-600">
                Generate sustainable social, economic, and environmental benefits for our communities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-12">
            
            {/* Volunteer Opportunities */}
            <section id="volunteer-opportunities">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Volunteer Opportunities Available</h2>
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Coordinator Roles */}
                <Card className="border-2 border-blue-200 relative">
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    LEADERSHIP
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
                      <Target className="w-5 h-5" />
                      Program Coordinators
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Lead the development and implementation of collaboration initiatives</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Partnership Development Coordinator</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Event Planning Coordinator</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Resource Network Coordinator</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Community Roles */}
                <Card className="border-2 border-green-200">
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    COMMUNITY
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600 flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      Community Organizers
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Connect with local entrepreneurs and facilitate networking activities</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Outreach Specialists</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Forum Facilitators</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Working Group Leaders</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Professional Roles */}
                <Card className="border-2 border-purple-200">
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    EXPERTISE
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-600 flex items-center gap-2">
                      <Building className="w-5 h-5" />
                      Business Professionals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Share expertise and mentor collaborative business initiatives</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Business Mentors</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Industry Specialists</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Strategic Advisors</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Support Roles */}
                <Card className="border-2 border-orange-200">
                  <div className="absolute top-4 right-4 bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    SUPPORT
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-orange-600 flex items-center gap-2">
                      <Settings className="w-5 h-5" />
                      Support Specialists
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Provide administrative and technical support for network operations</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Administrative Assistants</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Technology Support</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Communications Team</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Program Components */}
            <section className="bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">What We're Building Together</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-orange-600 mb-3 flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    Quarterly Community Forums
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Networking events bringing together 100+ entrepreneurs</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Facilitated discussions on community challenges</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Partnership matching and resource sharing</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Collaborative project showcase and planning</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-orange-600 mb-3 flex items-center gap-2">
                    <Network className="w-5 h-5" />
                    Digital Collaboration Platform
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Online directory of local entrepreneurs and resources</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Project collaboration tools and communication</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Volunteer coordination and scheduling system</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Impact tracking and success story sharing</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Implementation Timeline */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Launch Timeline & Milestones</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="phase1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      Phase 1: Foundation Building (Months 1-3) - Q2 2026
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        Recruit and train volunteer coordinators, establish partnerships, and create initial network infrastructure.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Volunteer Recruitment</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Recruit 15-20 volunteer coordinators</li>
                            <li>• Volunteer training and orientation program</li>
                            <li>• Establish volunteer management system</li>
                            <li>• Create volunteer recognition program</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Infrastructure Development</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Develop digital collaboration platform</li>
                            <li>• Establish partnership agreements</li>
                            <li>• Create resource library and tools</li>
                            <li>• Design program brand and materials</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="phase2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      Phase 2: Program Launch (Months 4-6) - Q3 2026
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        Host inaugural community forum, launch digital platform, and begin facilitating collaboration projects.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Community Engagement</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• First Quarterly Community Forum</li>
                            <li>• Launch outreach campaign</li>
                            <li>• Form initial working groups</li>
                            <li>• Begin partnership matching</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Platform Activation</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Digital platform public launch</li>
                            <li>• First collaborative projects</li>
                            <li>• Volunteer coordination system</li>
                            <li>• Impact measurement baseline</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="phase3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      Phase 3: Growth & Impact (Months 7-12) - Q4 2026 & Beyond
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        Scale network operations, measure impact, and establish sustainable volunteer-driven model for long-term success.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Network Expansion</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Scale to 200+ network members</li>
                            <li>• Expand to additional communities</li>
                            <li>• Launch specialized working groups</li>
                            <li>• Develop leadership pipeline</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Impact Measurement</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Quarterly impact reports</li>
                            <li>• Success story documentation</li>
                            <li>• Volunteer recognition events</li>
                            <li>• Program sustainability planning</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Volunteer Benefits */}
            <section className="bg-white border-2 border-orange-200 p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="bg-orange-100 p-3 rounded-full flex-shrink-0">
                  <Heart className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Why Volunteer With Us?</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Personal Benefits</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Build valuable leadership and networking skills</li>
                        <li>• Gain experience in nonprofit management</li>
                        <li>• Connect with like-minded professionals</li>
                        <li>• Develop project management expertise</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Community Impact</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        <li>• Drive economic development in Volusia County</li>
                        <li>• Create lasting partnerships and collaborations</li>
                        <li>• Support emerging entrepreneurs and businesses</li>
                        <li>• Build a stronger, more connected community</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <div className="text-center bg-gradient-to-br from-orange-600 to-orange-700 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Help Build Something Amazing?</h3>
              <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
                Join our founding volunteer team and help create Volusia County's premier community collaboration network. 
                Your time and skills can drive transformational change in our community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/get-involved?type=volunteer&program=community-collaboration">
                  <Button size="lg" className="bg-white text-orange-600 hover:bg-orange-50 font-bold px-8 py-3">
                    Volunteer Today - Help Us Launch
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-orange-600 px-8 py-3">
                    Learn More About Volunteering
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Conversion-Optimized Sidebar */}
          <div className="space-y-6">
            {/* Primary CTA Card */}
            <Card className="border-2 border-orange-200 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardHeader>
                <div className="text-center">
                  <div className="bg-orange-600 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">
                    VOLUNTEERS NEEDED NOW
                  </div>
                  <CardTitle className="text-xl text-orange-600">
                    Join Our Launch Team
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-700">
                  <p className="font-medium mb-2">Help us recruit founding volunteers</p>
                  <p className="text-sm text-gray-600 mb-4">
                    🚀 <strong>Be part of the founding team</strong><br/>
                    ⏰ <strong>Flexible 2-hour weekly commitment</strong><br/>
                    🤝 <strong>Build valuable networks & skills</strong><br/>
                    🏆 <strong>Recognition and leadership opportunities</strong>
                  </p>
                </div>
                <Link to="/get-involved?type=volunteer&program=community-collaboration">
                  <Button className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3">
                    Sign Up to Volunteer
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button variant="outline" className="w-full border-orange-300 text-orange-600 hover:bg-orange-50">
                    <Download className="mr-2 w-4 h-4" />
                    Get Volunteer Info Packet
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Volunteer Roles Needed */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-orange-600" />
                  Immediate Volunteer Needs
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Program Coordinator:</span>
                    <span className="font-medium text-orange-600">2 needed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Event Organizers:</span>
                    <span className="font-medium">4 needed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Outreach Specialists:</span>
                    <span className="font-medium">6 needed</span>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Time Commitment:</span>
                    <span className="font-medium">2 hours/week</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Start Date:</span>
                    <span className="font-medium">April 1, 2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Training Provided:</span>
                    <span className="font-medium text-green-600">Yes - Full Support</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Impact Potential */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Expected Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">200+ Entrepreneurs Connected</p>
                    <p className="text-sm text-gray-600">First year network growth target</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">50+ Partnerships Formed</p>
                    <p className="text-sm text-gray-600">Cross-sector collaborations facilitated</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">$1M+ Economic Impact</p>
                    <p className="text-sm text-gray-600">Estimated community economic benefit</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">25+ Jobs Created</p>
                    <p className="text-sm text-gray-600">Through collaborative business ventures</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Volunteer Benefits */}
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-600" />
                  Volunteer Benefits
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">
                  Join our volunteer team and gain valuable experience while making a lasting impact on your community.
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <strong>• Leadership Skills:</strong> Project and team management
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>• Professional Network:</strong> Connect with business leaders
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>• Recognition:</strong> Awards and reference letters
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>• Training:</strong> Nonprofit management certification
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border border-gray-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h4 className="font-medium text-gray-800 mb-2">Questions About Volunteering?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Speak with our <strong>Port Orange team</strong> about volunteer opportunities and training.
                  </p>
                  <Link to="/contact">
                    <Button variant="outline" size="sm" className="w-full">
                      <Users className="mr-2 w-4 h-4" />
                      Contact Volunteer Coordinator
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        
        {/* Full-width Upcoming Events */}
        <div className="mt-16">
          <UpcomingEvents />
        </div>
      </div>
    </div>
    </>
  );
};

export default CommunityCollaboration;
