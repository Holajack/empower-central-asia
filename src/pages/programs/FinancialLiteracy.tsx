import React from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, Check, FileText, CircleDollarSign, Users, Download, Calendar, BookOpen, Target, Star, TrendingUp, DollarSign, Shield, Heart, CheckCircle2, Clock, Users2, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import UpcomingEvents from "@/components/programs/UpcomingEvents";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const FinancialLiteracy = () => {
  return (
    <>
      <Helmet>
        <title>Three-Thirds Financial Education Curriculum - Comprehensive Financial Literacy | Volusia County</title>
        <meta name="description" content="Transform lives through our proven Three-Thirds Financial Education Curriculum. Comprehensive financial literacy education serving Volusia County and Central Asia. 100% success rate with 10-week, 6-week, and 4-week programs available. Join Port Orange volunteers making global impact." />
        <meta name="keywords" content="financial education Volusia County, financial literacy curriculum, money management education Florida, Three-Thirds learning method, financial stewardship training Port Orange, financial planning education Daytona Beach, nonprofit financial education program, budgeting curriculum, debt elimination program, financial literacy volunteer opportunities Florida" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Three-Thirds Financial Education Curriculum - Comprehensive Financial Literacy Education" />
        <meta property="og:description" content="Comprehensive financial education using the proven Three-Thirds learning method. Serving Volusia County volunteers and Central Asian entrepreneurs through practical money management training." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/programs/financial-literacy" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Financial Education Curriculum - Port Orange Nonprofit" />
        <meta name="twitter:description" content="Three-Thirds method financial education: Look Back, Look Up, Look Forward. Comprehensive stewardship training with 100% completion success rate." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Businesses Beyond Borders" />
        <link rel="canonical" href="https://businessesbeyondborders.com/programs/financial-literacy" />
        
        {/* Course and Organization schema markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Course", "EducationalOrganization"],
            "name": "Three-Thirds Financial Education Curriculum",
            "description": "Comprehensive financial education program using the proven Three-Thirds learning method for practical money management and stewardship training",
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
            "educationalLevel": "Beginner",
            "timeRequired": ["PT10W", "PT6W", "PT4W"],
            "coursePrerequisites": "None required - open to all backgrounds",
            "learningResourceType": "Course",
            "teaches": [
              "Comprehensive financial stewardship",
              "Zero-based budgeting",
              "Debt elimination strategies", 
              "Emergency fund planning",
              "Ethical generosity principles",
              "Financial goal setting",
              "Money management accountability"
            ],
            "courseWorkload": "PT4H/week",
            "numberOfCredits": 0,
            "educationalCredentialAwarded": "Certificate of Completion",
            "url": "https://businessesbeyondborders.com/programs/financial-literacy"
          })}
        </script>
      </Helmet>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Conversion Optimized */}
      <div 
        className="relative h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            Proven Three-Thirds Learning Method
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
            Transform Lives Through 
            <span className="text-yellow-400"> Financial Wisdom</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed mb-8">
            <strong className="text-yellow-300">10-week comprehensive curriculum</strong> using the proven Three-Thirds method: 
            <strong className="text-yellow-300"> Look Back → Look Up → Look Forward</strong> for lasting financial transformation.
          </p>

          {/* Key Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto text-center mb-8">
            <div className="animate-fade-up [--animation-delay:600ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">100%</div>
              <div className="text-sm text-white/80">Completion Success Rate</div>
            </div>
            <div className="animate-fade-up [--animation-delay:700ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">3</div>
              <div className="text-sm text-white/80">Flexible Track Options</div>
            </div>
            <div className="animate-fade-up [--animation-delay:800ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">150+</div>
              <div className="text-sm text-white/80">Lives Transformed</div>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up [--animation-delay:900ms]">
            <Link to="/get-involved?type=program&program=financial-literacy">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                Join Our Next Cohort
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="#curriculum-preview" className="text-white hover:text-yellow-300 font-medium flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Free Resources
            </Link>
          </div>

          {/* Social Proof */}
          <p className="text-sm text-white/70 mt-6 animate-fade-up [--animation-delay:1000ms]">
            ⭐ Trusted by <strong className="text-white">50+ Volusia County volunteers</strong> • 
            🌍 Serving Central Asia since 2022 • 
            📖 Time-tested principles with practical application
          </p>
        </div>
      </div>

      {/* Three-Thirds Structure Overview */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BookOpen className="w-4 h-4" />
              Proven Three-Thirds Method
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Financial Education That 
              <span className="text-purple-600"> Actually Works</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our curriculum combines <strong className="text-gray-800">time-tested ethical principles</strong> with practical money management skills 
              using the Three-Thirds learning method that ensures <strong className="text-gray-800">lasting transformation</strong>.
            </p>
          </div>

          {/* Three-Thirds Visual */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <TrendingUp className="w-10 h-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Look Back</h3>
              <p className="text-gray-600">
                Celebrate wins, troubleshoot challenges, and maintain accountability for lasting progress.
              </p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <BookOpen className="w-10 h-10 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Look Up</h3>
              <p className="text-gray-600">
                Discover ethical principles and practical tools through interactive lessons and real-life stories.
              </p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <Target className="w-10 h-10 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Look Forward</h3>
              <p className="text-gray-600">
                Set SMART goals, practice new skills, and create action plans for the week ahead.
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
            
            {/* Curriculum Tracks */}
            <section id="curriculum-preview">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Choose Your Learning Track</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* 10-Week Track */}
                <Card className="border-2 border-purple-200 relative">
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    COMPREHENSIVE
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-600">10-Week Primary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Complete discipleship journey with in-depth biblical foundation</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Full curriculum coverage</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Gospel integration training</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Multiplication planning</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* 6-Week Track */}
                <Card className="border-2 border-blue-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600">6-Week Accelerator</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Condensed version covering core financial principles</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Essential topics focus</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Practical applications</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Group accountability</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* 4-Week Track */}
                <Card className="border-2 border-green-200">
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600">4-Week Sprint</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Intensive bootcamp for immediate financial breakthrough</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Crisis intervention</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Foundation building</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Next steps planning</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Program Outcomes */}
            <section className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">What You'll Achieve</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-purple-600 mb-3 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Financial Foundations
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Working zero-based budget</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Debt elimination plan</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Emergency fund strategy</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Ethical giving plan</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-600 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Personal Development
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Ethical stewardship understanding</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Community-sharing confidence</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Integrity commitments</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Multiplication readiness</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Detailed Curriculum */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">10-Week Curriculum Overview</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="week1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      The Journey Begins: Core Values, Ownership & Our Story
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        Establish ethical principles as the foundation for life and money. Create the "Stewardship" mindset and learn to share your story.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Key Activities:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Personal Financial Snapshot</li>
                            <li>• Stewardship commitment exercise</li>
                            <li>• Personal story sharing tool</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Core Principles:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Ethical decision-making foundation</li>
                            <li>• Stewardship responsibility</li>
                            <li>• Personal accountability</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="week2">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">2</div>
                      Stewardship & Identity: Faithful with Little
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        Define ethical stewardship and identify competing priorities. Build your first zero-based budget.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Key Activities:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Zero-based budget creation</li>
                            <li>• Community sharing circles</li>
                            <li>• Cash envelope system</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Core Principles:</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Faithful resource management</li>
                            <li>• Priority-based decisions</li>
                            <li>• Long-term thinking</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>

                {/* Continue with remaining weeks... */}
                <AccordionItem value="weeks3-10">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-purple-100 text-purple-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">3-10</div>
                      Weeks 3-10: Complete Curriculum Details
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">Weeks 3-5: Foundation Building</h4>
                          <ul className="text-sm text-gray-600 space-y-2">
                            <li><strong>Week 3:</strong> Work & Income - Vocation excellence and integrity</li>
                            <li><strong>Week 4:</strong> Control Your Spending - Contentment and planning</li>
                            <li><strong>Week 5:</strong> Debt: Kill the Lion - Debt elimination strategies</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-3">Weeks 6-10: Growth & Multiplication</h4>
                          <ul className="text-sm text-gray-600 space-y-2">
                            <li><strong>Week 6:</strong> Saving & Investing - Ant strategy for building wealth</li>
                            <li><strong>Week 7:</strong> Generosity - Firstfruits and flow</li>
                            <li><strong>Week 8:</strong> Honesty & Integrity - Straight paths in business</li>
                            <li><strong>Week 9:</strong> Crisis & Eternity - Peace in the storm</li>
                            <li><strong>Week 10:</strong> Finishing Well & Legacy - Multiply and commission</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Success Story */}
            <section className="bg-white border-2 border-purple-200 p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="bg-purple-100 p-3 rounded-full flex-shrink-0">
                  <Users2 className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Real Transformation</h3>
                  <blockquote className="text-lg text-gray-700 italic mb-4">
                    "Before this curriculum, I was drowning in debt with no plan. The Three-Thirds method gave me accountability, ethical wisdom, and practical tools. 
                    Six months later, I'm debt-free with an emergency fund and teaching my neighbors the same principles."
                  </blockquote>
                  <footer className="text-purple-600 font-medium">— Maria S., Kazakhstan Graduate</footer>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <div className="text-center bg-gradient-to-br from-purple-600 to-purple-700 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Financial Future?</h3>
              <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
                Join our next cohort and experience the life-changing power of comprehensive financial education. 
                Full facilitator training and ongoing support provided.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/get-involved?type=program&program=financial-literacy">
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-purple-50 font-bold px-8 py-3">
                    Enroll Now - Next Start: March 15, 2026
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/get-involved?type=volunteer&program=facilitator">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3">
                    Become a Facilitator
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Conversion-Optimized Sidebar */}
          <div className="space-y-6">
            {/* Primary CTA Card */}
            <Card className="border-2 border-purple-200 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardHeader>
                <div className="text-center">
                  <div className="bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">
                    NEXT COHORT STARTING
                  </div>
                  <CardTitle className="text-xl text-purple-600">
                    March 15, 2026
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-700">
                  <p className="font-medium mb-2">Join 24 participants in our next cohort</p>
                  <p className="text-sm text-gray-600 mb-4">
                    🕐 <strong>90-120 minutes/week</strong><br/>
                    💻 <strong>Virtual & in-person options</strong><br/>
                    📖 <strong>All materials provided</strong><br/>
                    ✅ <strong>Certificate of completion</strong>
                  </p>
                </div>
                <Link to="/get-involved?type=program&program=financial-literacy">
                  <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3">
                    Reserve Your Spot Now
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="#curriculum-preview">
                  <Button variant="outline" className="w-full border-purple-300 text-purple-600 hover:bg-purple-50">
                    <Download className="mr-2 w-4 h-4" />
                    Free Sample Materials
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Program Details */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-purple-600" />
                  Program Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">10-Week Primary:</span>
                    <span className="font-medium text-purple-600">March 15</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">6-Week Accelerator:</span>
                    <span className="font-medium text-blue-600">April 5</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">4-Week Sprint:</span>
                    <span className="font-medium text-green-600">As needed</span>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">Hybrid</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Group Size:</span>
                    <span className="font-medium">4-12 participants</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-medium text-green-600">Free to participants</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Trust Signals */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-600" />
                  Why Choose Our Program?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">100% Success Rate</p>
                    <p className="text-sm text-gray-600">Every participant who completes achieves their financial goals</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Ethical Foundation</p>
                    <p className="text-sm text-gray-600">Time-tested principles with practical application</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Ongoing Support</p>
                    <p className="text-sm text-gray-600">Facilitator training and accountability partnerships</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Global Impact</p>
                    <p className="text-sm text-gray-600">Used successfully across Central Asia and Florida</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Resources Download */}
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-yellow-600" />
                  Free Resources
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">
                  Download sample materials from our curriculum to see the quality and depth of our comprehensive financial education.
                </p>
                <div className="space-y-2">
                  <Link to="/resources/financial-snapshot" className="block">
                    <Button variant="outline" size="sm" className="w-full text-left justify-start border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                      <Download className="mr-2 w-4 h-4" />
                      Personal Financial Snapshot
                    </Button>
                  </Link>
                  <Link to="/resources/budget-template" className="block">
                    <Button variant="outline" size="sm" className="w-full text-left justify-start border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                      <Download className="mr-2 w-4 h-4" />
                      Zero-Based Budget Template
                    </Button>
                  </Link>
                  <Link to="/resources/debt-elimination" className="block">
                    <Button variant="outline" size="sm" className="w-full text-left justify-start border-yellow-300 text-yellow-700 hover:bg-yellow-50">
                      <Download className="mr-2 w-4 h-4" />
                      Debt Elimination Planner
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Secondary CTA */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-600 text-center">
                  Become a Facilitator
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-sm text-gray-600">
                  Help multiply this impact by leading your own Three-Thirds Financial Education group. Full training provided.
                </p>
                <Link to="/get-involved?type=volunteer&program=facilitator">
                  <Button variant="outline" className="w-full border-blue-300 text-blue-600 hover:bg-blue-50">
                    Learn About Facilitating
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border border-gray-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h4 className="font-medium text-gray-800 mb-2">Questions?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Speak with our <strong>Port Orange team</strong> about the curriculum and enrollment.
                  </p>
                  <Link to="/contact">
                    <Button variant="outline" size="sm" className="w-full">
                      <Users className="mr-2 w-4 h-4" />
                      Contact Us
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

export default FinancialLiteracy;
