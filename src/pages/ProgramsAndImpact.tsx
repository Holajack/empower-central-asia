import React from "react";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import SpotlightStories from "@/components/programs/SpotlightStories";
import { ArrowRight, BookOpen, Users2, Lightbulb, Target, Heart, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const ProgramsAndImpact = () => {
  const { ref: programsRef, inView: programsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { ref: metricsRef, inView: metricsInView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const programs = [
    {
      title: "Business Training Workshops",
      description: "Comprehensive workshops covering essential business fundamentals, from planning to execution. Our practical sessions are led by experienced entrepreneurs and industry experts.",
      icon: BookOpen,
      details: [
        "Business planning, marketing strategies, and operational management",
        "Guest lectures from successful local entrepreneurs",
        "90% of participants launch businesses within one year",
        "Hands-on practical sessions and real-world case studies"
      ],
      cta: {
        text: "Join Next Workshop",
        link: "/programs/business-training"
      }
    },
    {
      title: "Financial Literacy Classes",
      description: "Essential financial education designed specifically for entrepreneurs, focusing on sustainable business growth and personal financial management.",
      icon: Target,
      details: [
        "Micro-financing opportunities and management",
        "Strategic budgeting and saving techniques",
        "Investment principles for small businesses",
        "Digital financial tools and technologies"
      ],
      cta: {
        text: "Register for Classes",
        link: "/programs/financial-literacy"
      }
    },
    {
      title: "Leadership & Mentorship Sessions",
      description: "One-on-one mentoring and group coaching sessions with experienced business leaders, designed to develop strong management and leadership skills.",
      icon: Users2,
      details: [
        "Personalized mentor matching program",
        "Monthly group leadership workshops",
        "Access to regional business networks",
        "Ongoing support and guidance"
      ],
      cta: {
        text: "Find a Mentor",
        link: "/programs/mentorship"
      }
    },
    {
      title: "Community Collaboration Projects",
      description: "Initiative-driven projects that bring entrepreneurs together to create sustainable impact in local communities through shared resources and knowledge.",
      icon: Lightbulb,
      details: [
        "Cross-sector partnership opportunities",
        "Resource sharing networks",
        "Joint community development projects",
        "Technology and innovation collaborations"
      ],
      cta: {
        text: "Collaborate With Us",
        link: "/programs/collaborate"
      }
    },
  ];

  const upcomingEvents = [
    {
      date: "March 15, 2024",
      title: "Business Planning Workshop",
      type: "Workshop",
    },
    {
      date: "March 20, 2024",
      title: "Financial Literacy Basics",
      type: "Class",
    },
    {
      date: "March 25, 2024",
      title: "Mentor Matching Event",
      type: "Networking",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div 
        className="relative h-[60vh] flex items-center justify-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1577962917302-cd874c4e31d2')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-up [--animation-delay:200ms]">
            Empowering Through Action
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
            Explore our range of programs designed to create sustainable impact in Central Asia.
          </p>
        </div>
      </div>

      {/* Programs Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto mb-12 text-center">
          <p className="text-lg text-gray-600">
            Our programs are designed to empower local entrepreneurs with practical skills, 
            knowledge, and resources. Through our community-driven approach, we focus on 
            building sustainable businesses that create lasting impact in Central Asia.
          </p>
        </div>

        <div
          ref={programsRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ${
            programsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {programs.map((program, index) => (
            <Card 
              key={index} 
              className="border-sage-200 hover:shadow-lg transition-all duration-300"
            >
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-2 bg-sage-100 rounded-lg">
                    <program.icon className="w-6 h-6 text-sage-500" />
                  </div>
                  <CardTitle className="text-xl text-sage-500">
                    {program.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 mb-4">
                  {program.description}
                </CardDescription>
                <ul className="space-y-2 mb-6">
                  {program.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-sage-400" />
                      {detail}
                    </li>
                  ))}
                </ul>
                <Link to={program.cta.link}>
                  <Button 
                    variant="outline" 
                    className="w-full border-sage-300 text-sage-600 hover:bg-sage-50"
                  >
                    {program.cta.text}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Impact Metrics Section */}
        <div
          ref={metricsRef}
          className={`mt-20 transition-all duration-700 ${
            metricsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl font-semibold text-sage-500 mb-12 text-center">
            Our Impact
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard number={500} label="Entrepreneurs Trained" suffix="+" delay={0} />
            <StatCard number={10} label="Communities Served" suffix="+" delay={200} />
            <StatCard number={85} label="Success Rate" suffix="%" delay={400} />
            <StatCard number={2000} label="Jobs Created" suffix="+" delay={600} />
          </div>
        </div>

        {/* Spotlight Stories Section */}
        <SpotlightStories />

        {/* Updated Call to Action Section */}
        <div className="mt-20 bg-white py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-semibold text-sage-500 mb-4">
                  Join Us in Making a Difference
                </h2>
                <p className="text-gray-600 max-w-2xl mx-auto">
                  Support our mission to empower entrepreneurs and transform communities
                  across Central Asia through various ways of involvement.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                <Card className="border-sage-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Heart className="w-6 h-6 text-terracotta-500" />
                      <h3 className="text-xl font-semibold text-sage-500">Support Our Programs</h3>
                    </div>
                    <p className="text-gray-600">
                      Your donation helps provide essential resources and training to aspiring
                      entrepreneurs in Central Asia.
                    </p>
                    <Link to="/get-involved">
                      <Button className="w-full bg-terracotta-500 hover:bg-terracotta-600">
                        Donate to Fuel More Programs
                      </Button>
                    </Link>
                  </CardContent>
                </Card>

                <Card className="border-sage-200 hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                      <Users2 className="w-6 h-6 text-sage-500" />
                      <h3 className="text-xl font-semibold text-sage-500">Get Involved</h3>
                    </div>
                    <p className="text-gray-600">
                      Share your expertise as a mentor or partner with us to create
                      lasting impact in local communities.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <Link to="/get-involved?type=mentor">
                        <Button variant="outline" className="w-full border-sage-300 text-sage-600 hover:bg-sage-50">
                          Become a Mentor
                        </Button>
                      </Link>
                      <Link to="/get-involved?type=partner">
                        <Button variant="outline" className="w-full border-sage-300 text-sage-600 hover:bg-sage-50">
                          Partner With Us
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Events Section */}
              <Card className="border-sage-200">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-sage-500" />
                    <CardTitle className="text-xl text-sage-500">
                      Upcoming Events
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {upcomingEvents.map((event, index) => (
                      <div key={index} className="flex items-center justify-between p-3 hover:bg-sage-50 rounded-lg transition-colors">
                        <div>
                          <p className="font-medium text-sage-500">{event.title}</p>
                          <p className="text-sm text-gray-600">{event.date}</p>
                        </div>
                        <Link to={`/events/${event.title.toLowerCase().replace(/\s+/g, '-')}`}>
                          <Button size="sm" variant="outline" className="border-sage-300 text-sage-600 hover:bg-sage-50">
                            Sign Up
                          </Button>
                        </Link>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsAndImpact;
