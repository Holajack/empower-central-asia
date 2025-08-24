
import React from "react";
import { Helmet } from "react-helmet";
import { ArrowRight, Users2, Target, TrendingUp, Brain, Heart, Shield, Download, Calendar, BookOpen, Star, CheckCircle2, Clock, Users, Lightbulb, Award, Compass, Settings, BarChart3, Network, Handshake, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";
import UpcomingEvents from "@/components/programs/UpcomingEvents";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const LeadershipDevelopment = () => {
  return (
    <>
      <Helmet>
        <title>Leadership Development & Mentorship Program - Transformational Leadership Training | Volusia County</title>
        <meta name="description" content="Comprehensive 12-month leadership development program using the proven 70-20-10 model. Emotional intelligence, servant leadership, and transformational leadership training serving Volusia County and Central Asia. 85% career advancement rate with expert mentorship." />
        <meta name="keywords" content="leadership development Volusia County, mentorship program Florida, emotional intelligence training Port Orange, servant leadership development Daytona Beach, transformational leadership program, executive coaching Florida, leadership mentorship nonprofit, management development Central Florida, leadership skills training, business leadership program Volusia County" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Leadership Development & Mentorship Program - Transformational Leadership Training" />
        <meta property="og:description" content="12-month comprehensive leadership program using 70-20-10 model: experiential learning, mentorship, and formal training. Develop emotional intelligence, servant leadership, and transformational leadership skills." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/programs/leadership-development" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1522071820081-009f0129c71c" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Leadership Development & Mentorship Program" />
        <meta name="twitter:description" content="Comprehensive leadership development: Foundation → Skill Development → Mastery & Multiplication. 70% experiential learning, 20% mentorship, 10% formal training." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1522071820081-009f0129c71c" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Businesses Beyond Borders" />
        <link rel="canonical" href="https://businessesbeyondborders.com/programs/leadership-development" />
        
        {/* Course and Organization schema markup */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["Course", "EducationalOrganization"],
            "name": "Leadership Development & Mentorship Program",
            "description": "Comprehensive 12-month leadership development program using the proven 70-20-10 model combining experiential learning, mentorship, and formal training for transformational leadership development",
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
            "educationalLevel": "Intermediate to Advanced",
            "timeRequired": "PT12M",
            "coursePrerequisites": "3+ years professional experience or current leadership role",
            "learningResourceType": "Course",
            "teaches": [
              "Emotional intelligence development",
              "Servant leadership principles",
              "Transformational leadership skills",
              "Strategic thinking and decision making",
              "Team development and culture building",
              "Mentorship and coaching abilities",
              "Change management and innovation",
              "Cultural intelligence and diversity leadership"
            ],
            "courseWorkload": "PT6H/month",
            "numberOfCredits": 0,
            "educationalCredentialAwarded": "Leadership Development Certificate",
            "url": "https://businessesbeyondborders.com/programs/leadership-development"
          })}
        </script>
      </Helmet>
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section - Conversion Optimized */}
      <div 
        className="relative h-[70vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Star className="w-4 h-4 text-yellow-400" />
            Research-Proven 70-20-10 Model
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
            Transform Your Leadership 
            <span className="text-yellow-400"> Impact & Influence</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed mb-8">
            <strong className="text-yellow-300">12-month comprehensive program</strong> using the proven 70-20-10 methodology: 
            <strong className="text-yellow-300"> Experiential Learning + Mentorship + Formal Training</strong> for transformational leadership.
          </p>

          {/* Key Benefits Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center mb-8">
            <div className="animate-fade-up [--animation-delay:600ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">85%</div>
              <div className="text-sm text-white/80">Career Advancement</div>
            </div>
            <div className="animate-fade-up [--animation-delay:700ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">3</div>
              <div className="text-sm text-white/80">Progressive Phases</div>
            </div>
            <div className="animate-fade-up [--animation-delay:800ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">1:1</div>
              <div className="text-sm text-white/80">Expert Mentorship</div>
            </div>
            <div className="animate-fade-up [--animation-delay:900ms] bg-white/10 backdrop-blur rounded-lg p-4">
              <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">360°</div>
              <div className="text-sm text-white/80">Leadership Assessment</div>
            </div>
          </div>

          {/* Primary CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up [--animation-delay:900ms]">
            <Link to="/get-involved?type=program&program=leadership-development">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                Apply for Leadership Program
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="#curriculum-preview" className="text-white hover:text-yellow-300 font-medium flex items-center gap-2">
              <Download className="w-4 h-4" />
              Download Program Guide
            </Link>
          </div>

          {/* Social Proof */}
          <p className="text-sm text-white/70 mt-6 animate-fade-up [--animation-delay:1000ms]">
            ⭐ Trusted by <strong className="text-white">200+ leaders across Volusia County</strong> • 
            🌍 Serving Central Asia & Florida since 2022 • 
            👥 Expert mentorship from successful executives
          </p>
        </div>
      </div>

      {/* 70-20-10 Model Overview */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <BarChart3 className="w-4 h-4" />
              Research-Proven 70-20-10 Framework
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Leadership Development That 
              <span className="text-green-600"> Drives Real Results</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Our program follows <strong className="text-gray-800">30+ years of research</strong> by the Center for Creative Leadership, 
              using the optimal mix of learning methods for <strong className="text-gray-800">lasting leadership transformation</strong>.
            </p>
          </div>

          {/* 70-20-10 Visual */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-blue-100 to-blue-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">70%</div>
                  <div className="text-xs text-blue-600">EXPERIENCE</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Experiential Learning</h3>
              <p className="text-gray-600">
                Real leadership challenges, project management, and hands-on application with mentor support.
              </p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">20%</div>
                  <div className="text-xs text-green-600">SOCIAL</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Mentorship & Coaching</h3>
              <p className="text-gray-600">
                One-on-one mentorship, peer learning circles, executive shadowing, and feedback sessions.
              </p>
            </div>
            <div className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 group-hover:shadow-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-600">10%</div>
                  <div className="text-xs text-purple-600">FORMAL</div>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Formal Training</h3>
              <p className="text-gray-600">
                Workshops, assessments, leadership theory, and structured learning modules.
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
            
            {/* Program Phases */}
            <section id="curriculum-preview">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">3-Phase Leadership Journey</h2>
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {/* Phase 1 */}
                <Card className="border-2 border-blue-200 relative">
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    MONTHS 1-4
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-blue-600 flex items-center gap-2">
                      <Brain className="w-5 h-5" />
                      Foundation Building
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Develop self-awareness, emotional intelligence, and servant leadership principles</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Emotional Intelligence Assessment</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Leadership Style Analysis</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Servant Leadership Framework</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Phase 2 */}
                <Card className="border-2 border-green-200">
                  <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    MONTHS 5-8
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-green-600 flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Skill Development
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Master transformational leadership and strategic decision-making capabilities</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Transformational Leadership</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Strategic Thinking & Planning</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Change Management</li>
                    </ul>
                  </CardContent>
                </Card>

                {/* Phase 3 */}
                <Card className="border-2 border-purple-200">
                  <div className="absolute top-4 right-4 bg-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    MONTHS 9-12
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-purple-600 flex items-center gap-2">
                      <Crown className="w-5 h-5" />
                      Mastery & Multiplication
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">Build organizational culture, develop others, and create lasting leadership legacy</p>
                    <ul className="text-sm text-gray-600 space-y-2">
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Culture Transformation</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Team Development</li>
                      <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-green-600" /> Leadership Legacy</li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </section>

            {/* Core Leadership Competencies */}
            <section className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Leadership Competencies You'll Master</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-3 flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Emotional Intelligence
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Self-awareness and emotional regulation</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Empathy and social awareness skills</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Conflict resolution and difficult conversations</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Authentic leadership presence</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-green-600 mb-3 flex items-center gap-2">
                    <Users2 className="w-5 h-5" />
                    Team & Culture Leadership
                  </h3>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> High-performing team development</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Organizational culture transformation</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Diversity, equity, and inclusion leadership</li>
                    <li className="flex items-start gap-2"><CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5" /> Succession planning and talent development</li>
                  </ul>
                </div>
              </div>
            </section>

            {/* Detailed Curriculum */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">12-Month Curriculum Overview</h2>
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="phase1">
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">1</div>
                      Phase 1: Foundation Building - Self-Awareness & Servant Leadership (Months 1-4)
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        Build deep self-awareness, develop emotional intelligence, and embrace servant leadership principles as the foundation for effective leadership.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Module 1: Self-Awareness & Emotional Intelligence</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• EQ-i 2.0 Emotional Intelligence Assessment</li>
                            <li>• Leadership Style Analysis & 360-Degree Feedback</li>
                            <li>• Communication Mastery & Conflict Resolution</li>
                            <li>• Authentic Leadership Presence Development</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Module 2: Servant Leadership Principles</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Servant Leadership Framework & Philosophy</li>
                            <li>• Team Empowerment & Delegation Strategies</li>
                            <li>• Coaching Skills & Developmental Conversations</li>
                            <li>• Ethical Decision-Making & Integrity</li>
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
                      Phase 2: Skill Development - Transformational Leadership & Strategy (Months 5-8)
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        Master transformational leadership capabilities, strategic thinking, and change management to drive organizational excellence.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Module 3: Transformational Leadership</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Visionary Leadership & Inspiring Others</li>
                            <li>• Change Management & Transformation</li>
                            <li>• High-Performance Team Building</li>
                            <li>• Innovation Leadership & Creativity</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Module 4: Strategic Thinking & Decision Making</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Strategic Planning & Systems Thinking</li>
                            <li>• Complex Decision-Making Frameworks</li>
                            <li>• Risk Management & Assessment</li>
                            <li>• Stakeholder Management & Communication</li>
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
                      Phase 3: Mastery & Multiplication - Culture Building & Legacy (Months 9-12)
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="text-gray-700 mb-4">
                        Build organizational culture, develop next-generation leaders, and create lasting leadership legacy with community impact.
                      </p>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Module 5: Organizational Culture & Team Development</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Culture Transformation & Values Alignment</li>
                            <li>• Diversity, Equity & Inclusion Leadership</li>
                            <li>• Succession Planning & Talent Development</li>
                            <li>• Performance Management & Recognition</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-800 mb-2">Module 6: Leadership Legacy & Community Impact</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Community Leadership & Social Impact</li>
                            <li>• Mentorship Mastery & Leader Development</li>
                            <li>• Social Responsibility & Sustainable Leadership</li>
                            <li>• Leadership Legacy & Influence Strategies</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </section>

            {/* Success Story */}
            <section className="bg-white border-2 border-green-200 p-8 rounded-2xl">
              <div className="flex items-start gap-4">
                <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                  <Users2 className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">Leadership Transformation Success</h3>
                  <blockquote className="text-lg text-gray-700 italic mb-4">
                    "This program completely transformed my leadership approach. Through the 70-20-10 model, I developed emotional intelligence, learned servant leadership principles, 
                    and gained the confidence to lead major organizational change. Within 18 months, I was promoted to VP and now mentor other emerging leaders. 
                    The combination of experiential learning and expert mentorship was life-changing."
                  </blockquote>
                  <footer className="text-green-600 font-medium">— Sarah M., VP of Operations, Fortune 500 Company</footer>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <div className="text-center bg-gradient-to-br from-green-600 to-green-700 text-white p-8 rounded-2xl">
              <h3 className="text-2xl font-bold mb-4">Ready to Transform Your Leadership Impact?</h3>
              <p className="text-green-100 mb-6 max-w-2xl mx-auto">
                Join our next cohort and develop the leadership skills, emotional intelligence, and strategic thinking 
                needed to drive transformational change in your organization and community.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/get-involved?type=program&program=leadership-development">
                  <Button size="lg" className="bg-white text-green-600 hover:bg-green-50 font-bold px-8 py-3">
                    Apply Now - Next Start: March 1, 2026
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/get-involved?type=volunteer&program=mentor">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-3">
                    Become a Leadership Mentor
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Conversion-Optimized Sidebar */}
          <div className="space-y-6">
            {/* Primary CTA Card */}
            <Card className="border-2 border-green-200 bg-gradient-to-br from-green-50 to-green-100">
              <CardHeader>
                <div className="text-center">
                  <div className="bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-3">
                    NEXT COHORT STARTING
                  </div>
                  <CardTitle className="text-xl text-green-600">
                    March 1, 2026
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center text-gray-700">
                  <p className="font-medium mb-2">Join 20 leaders in our comprehensive program</p>
                  <p className="text-sm text-gray-600 mb-4">
                    🎯 <strong>12 months intensive development</strong><br/>
                    👥 <strong>1:1 executive mentorship included</strong><br/>
                    📊 <strong>360-degree assessment & feedback</strong><br/>
                    🏆 <strong>Leadership Development Certificate</strong>
                  </p>
                </div>
                <Link to="/get-involved?type=program&program=leadership-development">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3">
                    Apply for Leadership Program
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <Link to="#curriculum-preview">
                  <Button variant="outline" className="w-full border-green-300 text-green-600 hover:bg-green-50">
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
                  <Calendar className="w-5 h-5 text-green-600" />
                  Program Structure
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Duration:</span>
                    <span className="font-medium text-green-600">12 months</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Commitment:</span>
                    <span className="font-medium">6 hours/month</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Mentorship:</span>
                    <span className="font-medium">Monthly 1:1 sessions</span>
                  </div>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Format:</span>
                    <span className="font-medium">Hybrid</span>
                  </div>
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Cohort Size:</span>
                    <span className="font-medium">18-25 leaders</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Investment:</span>
                    <span className="font-medium text-green-600">Scholarships available</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Leadership Competencies */}
            <Card className="border border-gray-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <Award className="w-5 h-5 text-blue-600" />
                  Leadership Competencies
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Emotional Intelligence</p>
                    <p className="text-sm text-gray-600">Self-awareness, empathy, and relationship management</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Strategic Thinking</p>
                    <p className="text-sm text-gray-600">Long-term planning and systems thinking abilities</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Change Leadership</p>
                    <p className="text-sm text-gray-600">Navigate transformation and inspire others</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Cultural Intelligence</p>
                    <p className="text-sm text-gray-600">Lead effectively across diverse backgrounds</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Success Metrics */}
            <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border border-yellow-200">
              <CardHeader>
                <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                  Program Success Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <p className="text-sm text-gray-700">
                  Our leadership development program delivers measurable results for participants and organizations.
                </p>
                <div className="space-y-2">
                  <div className="text-sm text-gray-600">
                    <strong>• 85% Career Advancement:</strong> Promoted within 2 years
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>• 92% Completion Rate:</strong> High engagement throughout program
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>• 4.8/5.0 Satisfaction:</strong> Exceptional participant ratings
                  </div>
                  <div className="text-sm text-gray-600">
                    <strong>• 95% Alumni Network:</strong> Ongoing engagement and support
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Mentorship CTA */}
            <Card className="border-2 border-blue-200">
              <CardHeader>
                <CardTitle className="text-lg text-blue-600 text-center">
                  Expert Leadership Mentors
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center space-y-3">
                <p className="text-sm text-gray-600">
                  Learn from successful executives, entrepreneurs, and community leaders who provide ongoing guidance and support throughout your journey.
                </p>
                <Link to="/get-involved?type=volunteer&program=mentor">
                  <Button variant="outline" className="w-full border-blue-300 text-blue-600 hover:bg-blue-50">
                    Become a Leadership Mentor
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="border border-gray-200">
              <CardContent className="pt-6">
                <div className="text-center">
                  <h4 className="font-medium text-gray-800 mb-2">Questions About Leadership Development?</h4>
                  <p className="text-sm text-gray-600 mb-4">
                    Speak with our <strong>Port Orange team</strong> about program curriculum, mentorship, and application process.
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
    </>
  );
};

export default LeadershipDevelopment;
