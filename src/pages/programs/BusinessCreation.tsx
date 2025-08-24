
import React from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, Briefcase, BarChart2, Users, Globe, Download, Calendar, BookOpen, Target, Star, TrendingUp, DollarSign, Shield, Heart, CheckCircle2, Clock, Users2, Lightbulb, Rocket, PieChart, Zap, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import UpcomingEvents from "@/components/programs/UpcomingEvents";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const BusinessCreation = () => {
  return (
    <>
      <Helmet>
        <title>Business Creation Training - Comprehensive Entrepreneurship Program | Volusia County</title>
        <meta name="description" content="Transform your business idea into reality with our 12-week comprehensive entrepreneurship program. Lean Startup methodology, Business Model Canvas, MVP development, and hands-on training serving Volusia County and Central Asia. 90% launch success rate." />
        <meta name="keywords" content="business creation training Volusia County, entrepreneurship program Florida, lean startup methodology Port Orange, business model canvas training Daytona Beach, MVP development course, startup accelerator program Florida, business planning workshops Central Florida, entrepreneur training nonprofit, business incubator Volusia County, startup mentorship program" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Business Creation Training - Comprehensive Entrepreneurship Program" />
        <meta property="og:description" content="12-week intensive entrepreneurship program using Lean Startup methodology and Business Model Canvas. From idea to viable business with 90% success rate." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/programs/business-creation" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1542744173-8e7e53415bb0" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Business Creation Training - Entrepreneurship Program" />
        <meta name="twitter:description" content="Comprehensive 12-week program: Think Like Entrepreneur → Shape Business Model → Validate Assumptions → Build Traction. From Port Orange serving globally." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1542744173-8e7e53415bb0" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Businesses Beyond Borders" />
        <link rel="canonical" href="https://businessesbeyondborders.com/programs/business-creation" />
        
        {/* Course and Organization schema markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Course", "EducationalOrganization"],
            "name": "Business Creation Training Program",
            "description": "Comprehensive 12-week entrepreneurship program using Lean Startup methodology, Business Model Canvas, and hands-on MVP development for emerging market entrepreneurs",
            "provider": {
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
            "courseMode": ["online", "blended"],
            "educationalLevel": "Beginner to Intermediate",
            "timeRequired": "PT12W",
            "coursePrerequisites": "Business idea or entrepreneurial interest",
            "learningResourceType": "Course",
            "teaches": [
              "Lean Startup methodology",
              "Business Model Canvas development",
              "Customer discovery and validation",
              "MVP design and development",
              "Market research and analysis",
              "Value proposition design",
              "Investment pitch creation",
              "Financial planning and metrics"
            ],
            "courseWorkload": "PT6H/week",
            "numberOfCredits": 0,
            "educationalCredentialAwarded": "Certificate of Completion",
            "url": "https://businessesbeyondborders.com/programs/business-creation"
          })}
        </script>
      </Helmet>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Conversion Optimized */}
      <div 
        className="relative h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            Proven Lean Startup Methodology
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
            From Business Idea to 
            <span className="text-yellow-400"> Market-Ready Venture</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed mb-8">
            <strong className="text-yellow-300">12-week intensive program</strong> using Lean Startup methodology and Business Model Canvas: 
            <strong className="text-yellow-300"> Think → Shape → Validate → Launch</strong> your successful business.
          </p>

          {/* Key Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center mb-8">
            <div className="animate-fade-up [--animation-delay:600ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">90%</div>
              <div className="text-sm text-white/80">Launch Success Rate</div>
            </div>
            <div className="animate-fade-up [--animation-delay:700ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">72</div>
              <div className="text-sm text-white/80">Hours of Training</div>
            </div>
            <div className="animate-fade-up [--animation-delay:800ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">4</div>
              <div className="text-sm text-white/80">Progressive Modules</div>
            </div>
            <div className="animate-fade-up [--animation-delay:900ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">1:1</div>
              <div className="text-sm text-white/80">Mentorship Support</div>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up [--animation-delay:900ms]">
            <Link to="/get-involved?type=program&program=business-creation">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                Join Our Next Cohort
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="#curriculum-preview" className="text-white hover:text-yellow-300 font-medium flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Program Overview
            </Link>
          </div>

          {/* Social Proof */}
          <p className="text-sm text-white/70 mt-6 animate-fade-up [--animation-delay:1000ms]">
            ⭐ Trusted by <strong className="text-white">100+ aspiring entrepreneurs</strong> • 
            🌍 Serving Central Asia & Florida since 2022 • 
            🚀 From startup idea to investor-ready pitch in 12 weeks
          </p>
        </div>
      </div>

      {/* Four-Module Structure Overview */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Rocket className="w-4 h-4" />
              Proven 4-Module Framework
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Entrepreneurship Training That 
              <span className="text-blue-600"> Creates Real Businesses</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our curriculum combines <strong className="text-gray-800">Lean Startup methodology</strong> with practical business development skills 
              using a progressive 4-module framework that ensures <strong className="text-gray-800">successful business launches</strong>.
            </p>
          </div>

          {/* Four-Module Visual */}
          <div className="grid md:grid-cols-4 gap-6 mb-16">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Lightbulb className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Think Like Entrepreneur</h3>
              <p className="text-gray-600 text-sm">
                Build entrepreneurial mindset, identify opportunities, and master productivity systems.
              </p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Settings className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Shape Business Model</h3>
              <p className="text-gray-600 text-sm">
                Design Business Model Canvas, validate value propositions, and master customer discovery.
              </p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <BarChart2 className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Validate Assumptions</h3>
              <p className="text-gray-600 text-sm">
                Test hypotheses, collect data, and iterate based on real customer feedback.
              </p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-orange-100 to-orange-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Rocket className="w-10 h-10 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-3">Build Traction</h3>
              <p className="text-gray-600 text-sm">
                Develop MVP, achieve product-market fit, and create investor-ready pitches.
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
            
            {/* Program Format */}
            <section id="curriculum-preview">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Program Structure</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Intensive Format */}
                <Card className="border-2 border-blue-200 relative">
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    INTENSIVE
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600">12-Week Program</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Comprehensive entrepreneurship bootcamp with full business development</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> 72 total hours training</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> 2 sessions per week, 3 hours each</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Hands-on MVP development</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Weekend Track */}
                <Card className="border-2 border-purple-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-600">Weekend Track</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Flexible weekend-focused schedule for working professionals</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Saturday workshops</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Online weekday support</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Extended timeline</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Corporate Track */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600">Corporate Innovation</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Customized program for existing organizations building new ventures</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Intrapreneurship focus</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Custom scheduling</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Team-based projects</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Program Outcomes */}
            <section className="bg-gradient-to-br from-blue-50 to-purple-50 p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">What You'll Achieve</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center gap-2">
                    <Rocket className="w-5 h-5" />
                    Business Launch
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Validated business model with proven demand</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Functional MVP tested with real customers</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Go-to-market strategy and launch plan</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Investor-ready pitch and financial projections</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-blue-600 mb-3 flex items-center gap-2">
                    <Users2 className="w-5 h-5" />
                    Skills & Network
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Lean Startup and Customer Development mastery</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Ongoing mentorship and advisory relationships</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Strong alumni and investor network access</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Entrepreneurial confidence and mindset</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Key Methodologies */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Core Methodologies</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg">
                        <Zap className="w-6 h-6 text-purple-600" />
                      </div>
                      <CardTitle className="text-xl text-gray-800">Lean Startup Method</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Master the Build-Measure-Learn cycle to rapidly test ideas, validate assumptions, and iterate toward product-market fit.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Hypothesis-driven development</li>
                      <li>• MVP design and testing</li>
                      <li>• Pivot vs. persevere decisions</li>
                      <li>• Validated learning frameworks</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg">
                        <PieChart className="w-6 h-6 text-blue-600" />
                      </div>
                      <CardTitle className="text-xl text-gray-800">Business Model Canvas</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Create comprehensive business models using the 9-building-block framework for strategic clarity and communication.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Customer segments and relationships</li>
                      <li>• Value proposition design</li>
                      <li>• Revenue streams and cost structure</li>
                      <li>• Key partnerships and resources</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-green-100 to-green-200 rounded-lg">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <CardTitle className="text-xl text-gray-800">Customer Discovery</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Learn systematic approaches to understanding customer needs, validating problems, and testing solutions with real users.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Interview techniques and insights</li>
                      <li>• Problem-solution fit validation</li>
                      <li>• Customer journey mapping</li>
                      <li>• User feedback integration</li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="border border-gray-200 hover:shadow-lg transition-all duration-300">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <div className="p-3 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg">
                        <TrendingUp className="w-6 h-6 text-orange-600" />
                      </div>
                      <CardTitle className="text-xl text-gray-800">Traction & Growth</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Build sustainable growth engines through metrics-driven marketing, sales optimization, and strategic partnerships.
                    </p>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Growth hacking techniques</li>
                      <li>• Key metrics and KPI tracking</li>
                      <li>• Sales funnel optimization</li>
                      <li>• Partnership development</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Detailed Curriculum */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">12-Week Curriculum Breakdown</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="module1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      Module 1: Think Like an Entrepreneur (Weeks 1-3)
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        Build entrepreneurial mindset, master Lean Startup methodology, and develop personal productivity systems for business success.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Key Topics:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Introduction to Entrepreneurship & Growth Mindset</li>
                            <li>• Lean Startup Methodology & Build-Measure-Learn</li>
                            <li>• Personal Productivity & Time Management</li>
                            <li>• Identifying Business Opportunities</li>
                            <li>• Better World Business Models</li>
                            <li>• Market Research Fundamentals</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Deliverables:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Personal vision statement</li>
                            <li>• Productivity system implementation</li>
                            <li>• Opportunity evaluation matrix</li>
                            <li>• Market research plan</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="module2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      Module 2: Shape Your Business Model (Weeks 4-6)
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        Master Business Model Canvas, design compelling value propositions, and develop customer discovery processes.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Key Topics:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Business Model Canvas Deep Dive</li>
                            <li>• Value Proposition Design</li>
                            <li>• Customer Discovery Process</li>
                            <li>• Problem-Solution Fit Validation</li>
                            <li>• Pitching and Presentation Skills</li>
                            <li>• Channel Strategy & Customer Relationships</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Deliverables:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Complete Business Model Canvas</li>
                            <li>• Value Proposition Canvas</li>
                            <li>• Customer interview reports</li>
                            <li>• Problem-solution fit presentation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="module3">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3</div>
                      Module 3: Validate Your Assumptions (Weeks 7-9)
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        Learn data-driven decision making, test value propositions systematically, and achieve customer validation milestones.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Key Topics:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Business Metrics & KPI Tracking</li>
                            <li>• Value Proposition Testing Methods</li>
                            <li>• Feedback System Design</li>
                            <li>• Customer Validation Frameworks</li>
                            <li>• Business Model Iteration</li>
                            <li>• Competitive Analysis & Positioning</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Deliverables:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• KPI dashboard and tracking system</li>
                            <li>• Validation experiment results</li>
                            <li>• Customer validation report</li>
                            <li>• Competitive analysis matrix</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="module4">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-orange-100 text-orange-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">4</div>
                      Module 4: Build Traction - The First Milestone (Weeks 10-12)
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        Develop functional MVP, achieve product-market fit, and create investor-ready pitches for successful business launch.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Key Topics:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• MVP Design & Development Workshop</li>
                            <li>• Product-Market Fit Measurement</li>
                            <li>• Investment-Ready Pitch Creation</li>
                            <li>• Financial Modeling & Projections</li>
                            <li>• Launch Strategy & Go-to-Market</li>
                            <li>• Graduation & Next Steps Planning</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Deliverables:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Functional MVP prototype</li>
                            <li>• Product-market fit analysis</li>
                            <li>• Investor pitch deck</li>
                            <li>• Financial model & projections</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Success Story */}
            <section className="bg-white border-2 border-blue-200 p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="bg-blue-100 p-3 rounded-full flex-shrink-0">
                  <Rocket className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">From Idea to Thriving Business</h3>
                  <blockquote className="text-lg text-gray-700 italic mb-4">
                    "I came to this program with just an idea about sustainable waste management. Through the Lean Startup methodology and Business Model Canvas, I validated my concept, 
                    found my first customers, and built a real business. Today we serve 50+ clients and employ 12 people. The systematic approach saved me years of trial and error."
                  </blockquote>
                  <footer className="text-blue-600 font-medium">— Kameron K., CleanTech Solutions Founder</footer>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <div className="text-center bg-gradient-to-br from-blue-600 to-blue-700 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Launch Your Business?</h3>
              <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
                Join our next cohort and transform your business idea into a market-ready venture. 
                Expert mentorship, proven methodology, and ongoing support included.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/get-involved?type=program&program=business-creation">
                  <Button size="lg" className="bg-white text-blue-600 hover:bg-blue-50 font-bold px-8 py-3">
                    Enroll Now - Next Start: April 15, 2026
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/get-involved?type=volunteer&program=mentor">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3">
                    Become a Mentor
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Conversion-Optimized Sidebar */}
          <div className="space-y-6">
            {/* Primary CTA Card */}
            <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardHeader>
                <div className="text-center">
                  <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">
                    NEXT COHORT STARTING
                  </div>
                  <CardTitle className="text-xl text-blue-600">
                    April 15, 2026
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-700">
                  <p className="font-medium mb-2">Join 15 entrepreneurs in our intensive program</p>
                  <p className="text-sm text-gray-600 mb-4">
                    🚀 <strong>2 sessions/week, 3 hours each</strong><br/>
                    💻 <strong>Hybrid: In-person + online support</strong><br/>
                    📱 <strong>MVP development tools included</strong><br/>
                    🎯 <strong>1:1 mentorship throughout</strong>
                  </p>
                </div>
                <Link to="/get-involved?type=program&program=business-creation">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3">
                    Apply for Cohort 5
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="#curriculum-preview">
                  <Button variant="outline" className="w-full border-blue-300 text-blue-600 hover:bg-blue-50">
                    <Download className="mr-2 w-4 h-4" />
                    Download Program Guide
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Program Details */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  Program Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium text-blue-600">12 weeks intensive</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Schedule:</span>
                    <span className="font-medium">Tue/Thu 6-9 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Hours:</span>
                    <span className="font-medium">72 hours + mentoring</span>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">Hybrid</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Cohort Size:</span>
                    <span className="font-medium">12-15 entrepreneurs</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment:</span>
                    <span className="font-medium text-green-600">Scholarships available</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Metrics */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  Program Success Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">90% Launch Rate</p>
                    <p className="text-sm text-gray-600">Participants launch viable businesses within 6 months</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">$2M+ Revenue Generated</p>
                    <p className="text-sm text-gray-600">Combined revenue of graduate businesses</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">85% Completion Rate</p>
                    <p className="text-sm text-gray-600">High engagement throughout intensive program</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">100+ Jobs Created</p>
                    <p className="text-sm text-gray-600">Employment generated by graduate ventures</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tools & Resources */}
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Settings className="w-5 h-5 text-yellow-600" />
                  Tools & Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">
                  Access professional-grade tools and platforms used by successful startups worldwide.
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <strong>• Miro/Mural:</strong> Business Model Canvas collaboration
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>• Figma:</strong> MVP prototyping and design
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>• Typeform:</strong> Customer validation surveys
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>• Financial Templates:</strong> Projections and modeling
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mentorship CTA */}
            <Card className="border-2 border-purple-200">
              <CardHeader>
                <CardTitle className="text-lg text-purple-600 text-center">
                  Expert Mentorship
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-sm text-gray-600">
                  Connect with successful entrepreneurs and industry experts who provide ongoing guidance throughout your journey.
                </p>
                <Link to="/get-involved?type=volunteer&program=mentor">
                  <Button variant="outline" className="w-full border-purple-300 text-purple-600 hover:bg-purple-50">
                    Become a Mentor
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border border-gray-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h4 className="font-medium text-gray-800 mb-2">Questions About the Program?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Speak with our <strong>Port Orange team</strong> about curriculum, scheduling, and enrollment.
                  </p>
                  <Link to="/contact">
                    <Button variant="outline" size="sm" className="w-full">
                      <Users className="mr-2 w-4 h-4" />
                      Contact Program Team
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
    </>  );
};

export default BusinessCreation;
