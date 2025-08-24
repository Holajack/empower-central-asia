import React from "react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HandHelping, Users, Network, Share, DollarSign, Calendar, HelpCircle, ArrowRight, Star, UserPlus, Target, CheckCircle2, Heart, Trophy, Clock, Mail, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DonateButton from "@/components/DonateButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import ImpactStats from "@/components/home/ImpactStats";
import TestimonialCard from "@/components/success-stories/TestimonialCard";
import { testimonials } from "@/data/testimonials";

const GetInvolvedHeroHeader = () => (
  <div 
    className="relative h-[70vh] flex items-center justify-center mb-8 pt-20"
    style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/20" />
    <div className="relative z-10 container mx-auto px-4 text-center text-white">
      {/* Trust Badge */}
      <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur text-white px-4 py-2 rounded-full text-sm font-medium mb-6 animate-fade-up [--animation-delay:100ms]">
        <Star className="w-4 h-4 text-yellow-400" />
        100% Success Rate Programs
      </div>
      
      <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-up [--animation-delay:200ms] leading-tight">
        Make Global Impact From 
        <span className="text-yellow-400"> Port Orange</span>
      </h1>
      
      <p className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto animate-fade-up [--animation-delay:400ms] leading-relaxed mb-8">
        <strong className="text-yellow-300">URGENT:</strong> We need volunteer mentors and community organizers to launch our 
        <strong className="text-yellow-300"> research-based Leadership Development</strong> and 
        <strong className="text-yellow-300"> Community Collaboration programs</strong>.
      </p>

      {/* Key Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto text-center mb-8">
        <div className="animate-fade-up [--animation-delay:600ms] bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">NEW</div>
          <div className="text-sm text-white/80">Programs Launching</div>
        </div>
        <div className="animate-fade-up [--animation-delay:700ms] bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">20+</div>
          <div className="text-sm text-white/80">Volunteers Needed</div>
        </div>
        <div className="animate-fade-up [--animation-delay:800ms] bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">FREE</div>
          <div className="text-sm text-white/80">Training & Support</div>
        </div>
        <div className="animate-fade-up [--animation-delay:900ms] bg-white/10 backdrop-blur rounded-lg p-4">
          <div className="text-2xl md:text-3xl font-bold text-yellow-400 mb-1">3</div>
          <div className="text-sm text-white/80">Ways to Help</div>
        </div>
      </div>

      {/* Primary CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up [--animation-delay:1000ms]">
        <Link to="#volunteer-now">
          <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
            Volunteer for New Programs
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </Link>
        <DonateButton 
          size="lg"
          className="bg-white/20 backdrop-blur border-white text-white hover:bg-white hover:text-black font-bold px-8 py-4 text-lg"
        >
          Donate to Support
        </DonateButton>
      </div>

      {/* Social Proof */}
      <p className="text-sm text-white/70 mt-6 animate-fade-up [--animation-delay:1100ms]">
        ⭐ <strong className="text-white">Be among our founding volunteers</strong> - we're just getting started but growing our mission in Volusia County • 
        🌍 <strong className="text-white">3 proven programs</strong> with 100% success rate • 
        🤝 <strong className="text-white">Research-based approaches</strong> that transform communities
      </p>
    </div>
  </div>
);

const GetInvolved = () => {
  const { toast } = useToast();

  const adminTrainingDonations = [
    {
      amount: 150,
      category: "Admin & Training",
      description: "Administrative fees for maintaining systems, supporting current families in training, and basic operational costs",
      icon: <Users className="h-6 w-6" />,
      impact: "Support 1 month of operations, family assistance, and training resources",
      color: "blue"
    },
    {
      amount: 400,
      category: "Local Staff Training",
      description: "Sponsors 3-month Startup Academy training for one local facilitator in Central Asia",
      icon: <HandHelping className="h-6 w-6" />,
      impact: "Train 1 local facilitator to teach 20+ entrepreneurs",
      color: "green"
    },
    {
      amount: 1000,
      category: "Team Development",
      description: "Team development, family support during training periods, and hiring/training local staff for 6 months",
      icon: <Target className="h-6 w-6" />,
      impact: "Enable sustained program delivery with trained local team and family support",
      color: "purple"
    },
  ];

  const businessIncubatorDonations = [
    {
      amount: 500,
      category: "Startup Support",
      description: "Provides startup resources and materials for 5-10 new entrepreneurs",
      icon: <DollarSign className="h-6 w-6" />,
      impact: "Launch 5-10 new businesses with essential resources",
      color: "orange"
    },
    {
      amount: 2500,
      category: "Business Incubator",
      description: "Partial funding for business incubator setup including workspace and initial resources",
      icon: <Network className="h-6 w-6" />,
      impact: "Support incubator operations serving 50+ entrepreneurs",
      color: "teal"
    },
    {
      amount: 5000,
      category: "Startup Capital Fund",
      description: "Provides startup capital loan (3-year term) for one promising entrepreneur",
      icon: <Trophy className="h-6 w-6" />,
      impact: "Fund 1 complete business launch with $5K startup capital",
      color: "red"
    },
  ];

  const upcomingEvents = [
    {
      date: "March 15, 2026",
      title: "Volunteer Orientation",
      type: "Virtual",
    },
    {
      date: "March 20, 2026",
      title: "Partner Networking Event",
      type: "In-Person",
    },
    {
      date: "March 25, 2026",
      title: "Fundraising Workshop",
      type: "Hybrid",
    },
  ];

  const faqs = [
    {
      question: "How are donations used?",
      answer: "Your donations directly support entrepreneur training programs, mentorship initiatives, and resource development in Central Asian communities.",
    },
    {
      question: "What skills do I need to volunteer?",
      answer: "We welcome volunteers with various skills, particularly in business mentorship, financial literacy, marketing, and general business operations.",
    },
    {
      question: "How can organizations partner with us?",
      answer: "Organizations can partner through resource sharing, joint programs, sponsorships, or by providing expertise and mentorship to our entrepreneurs.",
    },
  ];

  return (
    <>
      <Helmet>
        <title>Get Involved - Volunteer, Donate & Partner | Businesses Beyond Borders Port Orange FL</title>
        <meta name="description" content="Join our Port Orange nonprofit empowering Central Asia entrepreneurs. URGENT: Leadership mentors & community organizers needed for new programs. Volunteer in Volusia County, donate online, or become a corporate partner. 100% success rate programs." />
        <meta name="keywords" content="volunteer mentor opportunities Port Orange FL, leadership development volunteers Volusia County, community organizer volunteer Daytona Beach, nonprofit volunteer Central Florida, international development volunteer Florida, donate entrepreneurs Central Asia, corporate partnerships nonprofit Florida, business mentorship volunteer opportunities, volunteer coordinator positions Port Orange, community collaboration volunteer Florida" />
        
        {/* Open Graph tags */}
        <meta property="og:title" content="Get Involved - Volunteer Mentors Needed | Businesses Beyond Borders" />
        <meta property="og:description" content="NEW PROGRAMS LAUNCHING: We need volunteer mentors for our Leadership Development program and community organizers for our Collaboration Network. Make global impact from Port Orange, FL." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://businessesbeyondborders.com/get-involved" />
        <meta property="og:image" content="https://images.unsplash.com/photo-1559827260-dc66d52bef19" />
        
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Volunteer Mentors Needed - New Programs Launching" />
        <meta name="twitter:description" content="Help us launch Leadership Development & Community Collaboration programs. Volunteer mentors and coordinators needed in Volusia County." />
        <meta name="twitter:image" content="https://images.unsplash.com/photo-1559827260-dc66d52bef19" />
        
        {/* Additional SEO tags */}
        <meta name="robots" content="index, follow" />
        <meta name="author" content="Businesses Beyond Borders" />
        <link rel="canonical" href="https://businessesbeyondborders.com/get-involved" />
        
        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": ["NonprofitOrganization", "VolunteerAction"],
            "name": "Businesses Beyond Borders",
            "description": "Port Orange nonprofit empowering entrepreneurs in Central Asia through business training, leadership development, and community collaboration programs",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Port Orange",
              "addressRegion": "FL",
              "addressCountry": "US"
            },
            "telephone": "(386) 517-1527",
            "email": "donations@businessesbeyondborders.com",
            "url": "https://businessesbeyondborders.com",
            "sameAs": [
              "https://facebook.com/businessesbeyondborders",
              "https://linkedin.com/company/businesses-beyond-borders"
            ],
            "volunteerType": ["Leadership Mentor", "Community Organizer", "Business Trainer", "Program Coordinator"],
            "actionableFeedbackPolicy": "https://businessesbeyondborders.com/get-involved",
            "seeks": {
              "@type": "Demand",
              "name": "Volunteer Leadership Mentors and Community Organizers"
            }
          })}
        </script>
      </Helmet>
      <div className="min-h-screen">
      <GetInvolvedHeroHeader />
      <div className="container mx-auto px-4 py-8 space-y-16 animate-fade-in">
        {/* Urgent Volunteer Needs - Above the Fold */}
        <section id="volunteer-now" className="bg-gradient-to-br from-orange-50 to-red-50 -mx-4 px-4 py-16">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <UserPlus className="w-4 h-4" />
              URGENT: New Programs Launching
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800">
              Volunteer Opportunities 
              <span className="text-red-600"> Available Now</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              We're launching <strong className="text-gray-800">two research-based programs</strong> and need dedicated volunteers to make them successful. 
              Join our <strong className="text-gray-800">founding team</strong> and help create lasting impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Leadership Development Volunteers */}
            <Card className="border-2 border-blue-200 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                HIGH PRIORITY
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-blue-600 flex items-center gap-2">
                  <Target className="w-6 h-6" />
                  Leadership Development Mentors
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Guide emerging leaders through our 12-month program using the proven 70-20-10 model.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-800 mb-2">What We Need:</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Experienced executives & entrepreneurs</li>
                    <li>• 4-6 hours monthly commitment</li>
                    <li>• Mentorship and coaching skills</li>
                    <li>• Cultural sensitivity and empathy</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <Link to="/volunteer-opportunities/leadership-mentor">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3">
                      Learn More & Apply
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <p className="text-xs text-gray-500 text-center">
                    Full training provided • Flexible scheduling • Recognition & references
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Community Collaboration Volunteers */}
            <Card className="border-2 border-green-200 relative overflow-hidden">
              <div className="absolute top-4 right-4 bg-green-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                FOUNDING TEAM
              </div>
              <CardHeader>
                <CardTitle className="text-2xl text-green-600 flex items-center gap-2">
                  <Users className="w-6 h-6" />
                  Community Organizers
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Help build our volunteer-driven community collaboration network from the ground up.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-800 mb-2">Volunteer Roles:</h4>
                  <ul className="text-sm text-green-700 space-y-1">
                    <li>• Program coordinators (2 needed)</li>
                    <li>• Event organizers (4 needed)</li>
                    <li>• Outreach specialists (6 needed)</li>
                    <li>• Administrative support (4 needed)</li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <Link to="/volunteer-opportunities/community-organizer">
                    <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3">
                      Learn More & Apply
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                  <p className="text-xs text-gray-500 text-center">
                    2 hours/week • April 2026 start • Build valuable networks
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Volunteer Opportunities */}
          <div className="bg-white p-8 rounded-xl border border-gray-200">
            <h3 className="text-xl font-bold text-gray-800 mb-6 text-center">Other Volunteer Opportunities</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <HandHelping className="w-8 h-8 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Business Training</h4>
                <p className="text-sm text-gray-600 mb-4">Support our proven Financial Discipleship and Business Creation programs</p>
                <Link to="/volunteer-opportunities/business-training">
                  <Button variant="outline" size="sm" className="border-purple-300 text-purple-600 hover:bg-purple-50">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="text-center">
                <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Network className="w-8 h-8 text-orange-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Administrative Support</h4>
                <p className="text-sm text-gray-600 mb-4">Help with communications, events, and program coordination</p>
                <Link to="/volunteer-opportunities/administrative-support">
                  <Button variant="outline" size="sm" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                    Apply Now
                  </Button>
                </Link>
              </div>
              <div className="text-center">
                <div className="bg-teal-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Share className="w-8 h-8 text-teal-600" />
                </div>
                <h4 className="font-semibold text-gray-800 mb-2">Advocacy & Outreach</h4>
                <p className="text-sm text-gray-600 mb-4">Help spread awareness and recruit new volunteers and partners</p>
                <Link to="/volunteer-opportunities/advocacy-outreach">
                  <Button variant="outline" size="sm" className="border-teal-300 text-teal-600 hover:bg-teal-50">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
              All Ways to 
              <span className="text-blue-600"> Make Impact</span>
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Whether you volunteer, donate, or partner with us, you're joining a proven movement that transforms lives and communities.
            </p>
          </div>

          {/* Donation Section - Two Categories */}
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-8 rounded-2xl">
            <div className="text-center mb-12">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <Heart className="text-red-500" />
                Support Our 100% Success Rate Programs
              </h3>
              <p className="text-gray-600 max-w-3xl mx-auto mb-6">
                Your donation directly funds proven programs that transform entrepreneurs and communities. 
                <strong className="text-green-600">Choose the impact area that matters most to you.</strong>
              </p>
              <div className="grid md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-200">
                  <h4 className="font-bold text-blue-800 mb-2">💼 Operations & Training</h4>
                  <p className="text-sm text-blue-700">Support admin, team development, and local staff training</p>
                </div>
                <div className="bg-orange-100 p-4 rounded-lg border-2 border-orange-200">
                  <h4 className="font-bold text-orange-800 mb-2">🚀 Business Incubation</h4>
                  <p className="text-sm text-orange-700">Fund incubators, startup resources, and capital investment</p>
                </div>
              </div>
            </div>

            {/* Admin & Training Donations */}
            <div className="mb-12">
              <div className="text-center mb-8">
                <h4 className="text-xl md:text-2xl font-bold text-blue-600 mb-2">Operations & Training Support</h4>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Help us maintain our <strong className="text-blue-600">Port Orange operations</strong> and train local staff in Central Asia to deliver programs effectively.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {adminTrainingDonations.map((tier, index) => {
                  const colorClasses = {
                    blue: { border: 'border-blue-200 hover:border-blue-300', badge: 'bg-blue-600', icon: 'bg-gradient-to-br from-blue-100 to-blue-200', title: 'text-blue-600', bg: 'bg-blue-50', text: 'text-blue-700', button: 'bg-blue-600 hover:bg-blue-700' },
                    green: { border: 'border-green-200 hover:border-green-300', badge: 'bg-green-600', icon: 'bg-gradient-to-br from-green-100 to-green-200', title: 'text-green-600', bg: 'bg-green-50', text: 'text-green-700', button: 'bg-green-600 hover:bg-green-700' },
                    purple: { border: 'border-purple-200 hover:border-purple-300', badge: 'bg-purple-600', icon: 'bg-gradient-to-br from-purple-100 to-purple-200', title: 'text-purple-600', bg: 'bg-purple-50', text: 'text-purple-700', button: 'bg-purple-600 hover:bg-purple-700' },
                  };
                  const colors = colorClasses[tier.color];
                  return (
                    <Card key={tier.amount} className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 ${colors.border}`}>
                      <div className={`absolute top-4 right-4 ${colors.badge} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                        {tier.category}
                      </div>
                      <CardHeader className="text-center pb-4">
                        <div className={`${colors.icon} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                          {tier.icon}
                        </div>
                        <CardTitle className={`text-2xl font-bold ${colors.title}`}>${tier.amount}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-center text-sm">{tier.description}</p>
                        <div className={`${colors.bg} p-3 rounded-lg`}>
                          <p className={`text-sm ${colors.text} font-medium text-center`}>
                            💫 Impact: {tier.impact}
                          </p>
                        </div>
                        <DonateButton 
                          className={`w-full ${colors.button} text-white font-bold py-3`}
                        >
                          Support Operations ${tier.amount}
                        </DonateButton>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Business Incubator Donations */}
            <div className="mb-8">
              <div className="text-center mb-8">
                <h4 className="text-xl md:text-2xl font-bold text-orange-600 mb-2">Business Incubation & Growth</h4>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Help entrepreneurs <strong className="text-orange-600">launch and scale their businesses</strong> through incubators, resources, and startup capital.
                </p>
              </div>
              <div className="grid md:grid-cols-3 gap-6 mb-6">
                {businessIncubatorDonations.map((tier, index) => {
                  const colorClasses = {
                    orange: { border: 'border-orange-200 hover:border-orange-300', badge: 'bg-orange-600', icon: 'bg-gradient-to-br from-orange-100 to-orange-200', title: 'text-orange-600', bg: 'bg-orange-50', text: 'text-orange-700', button: 'bg-orange-600 hover:bg-orange-700' },
                    teal: { border: 'border-teal-200 hover:border-teal-300', badge: 'bg-teal-600', icon: 'bg-gradient-to-br from-teal-100 to-teal-200', title: 'text-teal-600', bg: 'bg-teal-50', text: 'text-teal-700', button: 'bg-teal-600 hover:bg-teal-700' },
                    red: { border: 'border-red-200 hover:border-red-300', badge: 'bg-red-600', icon: 'bg-gradient-to-br from-red-100 to-red-200', title: 'text-red-600', bg: 'bg-red-50', text: 'text-red-700', button: 'bg-red-600 hover:bg-red-700' },
                  };
                  const colors = colorClasses[tier.color];
                  return (
                    <Card key={tier.amount} className={`relative overflow-hidden hover:shadow-xl transition-all duration-300 border-2 ${colors.border}`}>
                      <div className={`absolute top-4 right-4 ${colors.badge} text-white px-2 py-1 rounded-full text-xs font-bold`}>
                        {tier.category}
                      </div>
                      <CardHeader className="text-center pb-4">
                        <div className={`${colors.icon} rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4`}>
                          {tier.icon}
                        </div>
                        <CardTitle className={`text-2xl font-bold ${colors.title}`}>${tier.amount}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <p className="text-gray-600 text-center text-sm">{tier.description}</p>
                        <div className={`${colors.bg} p-3 rounded-lg`}>
                          <p className={`text-sm ${colors.text} font-medium text-center`}>
                            💫 Impact: {tier.impact}
                          </p>
                        </div>
                        <DonateButton 
                          className={`w-full ${colors.button} text-white font-bold py-3`}
                        >
                          Fund Business Growth ${tier.amount}
                        </DonateButton>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Special Funding Opportunities */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl border-2 border-purple-200 mb-8">
              <div className="text-center">
                <h4 className="text-xl font-bold text-purple-800 mb-3">🌟 Transform Entire Communities</h4>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h5 className="font-bold text-purple-700 mb-2">$10,000 - Complete Incubator Setup</h5>
                    <p className="text-sm text-gray-600 mb-3">Establish a full Startup Academy and Incubator in a new city, including facilitator training and ongoing support.</p>
                    <p className="text-xs text-purple-600 font-medium">Impact: Serve 100+ entrepreneurs annually</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg border border-purple-200">
                    <h5 className="font-bold text-purple-700 mb-2">$25,000 - Regional Program Launch</h5>
                    <p className="text-sm text-gray-600 mb-3">Launch comprehensive entrepreneurship program across multiple cities with full staff training and startup capital fund.</p>
                    <p className="text-xs text-purple-600 font-medium">Impact: Transform 500+ entrepreneurs over 3 years</p>
                  </div>
                </div>
                <DonateButton 
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold px-8 py-4 mt-4"
                >
                  Make Transformational Impact
                  <Heart className="ml-2 w-5 h-5" />
                </DonateButton>
              </div>
            </div>

            {/* Any Amount Donation */}
            <div className="text-center">
              <p className="text-gray-600 mb-4">🌟 <strong>100% of donations</strong> go directly to programs • <strong>Tax-deductible</strong> • <strong>Transparent impact reporting</strong></p>
              <DonateButton 
                size="lg"
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold px-8 py-4"
              >
                Donate Any Amount - Choose Your Impact
                <Heart className="ml-2 w-5 h-5" />
              </DonateButton>
            </div>
          </div>

          {/* Volunteer Benefits & Recognition */}
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 p-8 rounded-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <Trophy className="text-yellow-500" />
                Why Our Volunteers Love What They Do
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                <strong className="text-orange-600">Be among our founding volunteers</strong> who will build valuable skills while creating global impact from Volusia County. 
                While positions are unpaid, the personal and professional benefits are tremendous!
              </p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" />
                  Personal Benefits
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-100 rounded-full p-1 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Leadership & Management Skills</p>
                      <p className="text-sm text-gray-600">Project management, team coordination, strategic planning</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-green-100 rounded-full p-1 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Professional Networking</p>
                      <p className="text-sm text-gray-600">Connect with business leaders, entrepreneurs, executives</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-purple-100 rounded-full p-1 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Recognition & References</p>
                      <p className="text-sm text-gray-600">Awards, certificates, professional references</p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" />
                  Community Impact
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="bg-orange-100 rounded-full p-1 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Global Impact from Home</p>
                      <p className="text-sm text-gray-600">Transform lives in Central Asia while living in Florida</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-teal-100 rounded-full p-1 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-teal-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Proven Programs</p>
                      <p className="text-sm text-gray-600">Support 100% success rate training programs</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="bg-pink-100 rounded-full p-1 flex-shrink-0">
                      <CheckCircle2 className="w-4 h-4 text-pink-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">Legacy Building</p>
                      <p className="text-sm text-gray-600">Create lasting change that benefits generations</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-8">
              <Link to="#volunteer-now">
                <Button size="lg" className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 text-white font-bold px-8 py-4">
                  Start Volunteering Today
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Corporate Partnership Section - Enhanced */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
            <div className="text-center mb-8">
              <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 flex items-center justify-center gap-2">
                <Network className="text-blue-600" />
                Corporate & Organizational Partnerships
              </h3>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Join leading organizations in <strong className="text-blue-600">Volusia County and beyond</strong> who partner with us to create 
                <strong className="text-blue-600"> measurable social impact</strong> and enhance their corporate social responsibility.
              </p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-600 flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Financial Partnerships
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Corporate matching donations</li>
                    <li>• Program sponsorships</li>
                    <li>• Annual giving partnerships</li>
                    <li>• Employee fundraising campaigns</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-green-600 flex items-center gap-2">
                    <HandHelping className="w-5 h-5" />
                    Employee Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Corporate volunteer programs</li>
                    <li>• Team building through service</li>
                    <li>• Skills-based volunteering</li>
                    <li>• Leadership development</li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-lg text-purple-600 flex items-center gap-2">
                    <Share className="w-5 h-5" />
                    Strategic Collaboration
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-600 text-sm">
                    <li>• Joint training workshops</li>
                    <li>• Resource sharing initiatives</li>
                    <li>• Marketing collaborations</li>
                    <li>• Thought leadership</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
            <div className="bg-white p-6 rounded-xl border border-blue-200">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h4 className="text-xl font-bold text-gray-800 mb-3">Partnership Benefits</h4>
                  <ul className="space-y-2 text-gray-600">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Enhanced corporate social responsibility
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Employee engagement and retention
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Measurable impact reporting
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-600" />
                      Tax benefits and recognition
                    </li>
                  </ul>
                </div>
                <div className="text-center">
                  <Link to="/partner-application">
                    <Button size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 mb-3">
                      Become a Partner
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Button>
                  </Link>
                  <p className="text-sm text-gray-500">
                    Custom partnership packages available • Free consultation
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 bg-sage-50 rounded-lg">
          <ImpactStats isMobile={false} />
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-sand-500">Success Stories</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-2">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </section>

        <section className="py-12 bg-white rounded-lg shadow-sm">
          <h2 className="text-3xl font-bold text-center mb-8 text-sand-500">Upcoming Events</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {upcomingEvents.map((event, index) => (
              <Card key={index} className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <Calendar className="h-5 w-5 text-sage-500" />
                  <span className="text-sage-600">{event.date}</span>
                </div>
                <h3 className="font-semibold mb-2">{event.title}</h3>
                <p className="text-sage-500 mb-4">{event.type}</p>
                <Button variant="outline" className="w-full">
                  Register Now
                </Button>
              </Card>
            ))}
          </div>
        </section>

        <section className="py-12">
          <h2 className="text-3xl font-bold text-center mb-8 text-sand-500">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible>
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger>{faq.question}</AccordionTrigger>
                  <AccordionContent>{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            <div className="text-center mt-8">
              <h3 className="text-lg font-semibold mb-4">Still Have Questions?</h3>
              <Link to="/contact">
                <Button className="bg-sage-500 hover:bg-sage-600">
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Final CTA Section - Enhanced */}
        <section className="py-16 bg-gradient-to-br from-blue-600 to-green-600 rounded-2xl text-center text-white">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Make Global Impact From 
            <span className="text-yellow-300"> Volusia County?</span>
          </h2>
          <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            <strong className="text-white">Be among our founding volunteers and donors</strong> who are transforming lives in Central Asia through 
            <strong className="text-white"> proven, research-based programs</strong> with 100% success rates. We're just getting started but growing our mission!
          </p>
          
          {/* Final CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link to="#volunteer-now">
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold px-8 py-4 text-lg">
                🚀 Volunteer for New Programs
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <DonateButton 
              size="lg"
              className="bg-white/20 backdrop-blur border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-4 text-lg"
            >
              💝 Donate to Support
            </DonateButton>
            <Link to="/partner-application">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600 font-bold px-8 py-4 text-lg">
                🤝 Become a Partner
              </Button>
            </Link>
          </div>
          
          {/* Contact Information */}
          <div className="bg-white/10 backdrop-blur rounded-xl p-6 max-w-2xl mx-auto">
            <h3 className="text-xl font-bold mb-4">Have Questions? Let's Talk!</h3>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center justify-center gap-2">
                <Phone className="w-4 h-4" />
                <span>(386) 517-1527</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Mail className="w-4 h-4" />
                <span>donations@businessesbeyondborders.com</span>
              </div>
            </div>
            <p className="text-xs text-blue-100 mt-3">
              📍 Proudly serving from Port Orange, FL • Making global impact locally
            </p>
          </div>
        </section>
      </div>
    </div>
    </>
  );
};

export default GetInvolved;
