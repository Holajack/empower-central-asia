import React from "react";
import { useInView } from "react-intersection-observer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import StatCard from "@/components/StatCard";
import { ArrowRight, BookOpen, Users2, Lightbulb, Target } from "lucide-react";
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
      description: "Comprehensive workshops covering business planning, marketing, and financial management fundamentals.",
      icon: BookOpen,
      details: "12-week intensive program with hands-on learning",
    },
    {
      title: "Leadership Mentorship",
      description: "One-on-one mentoring with experienced business leaders to develop management skills.",
      icon: Users2,
      details: "6-month mentorship program with local and international mentors",
    },
    {
      title: "Innovation Incubator",
      description: "Support for early-stage entrepreneurs to develop and launch their business ideas.",
      icon: Lightbulb,
      details: "3-month incubation period with seed funding opportunities",
    },
    {
      title: "Financial Literacy Program",
      description: "Essential financial education covering budgeting, savings, and investment principles.",
      icon: Target,
      details: "8-week course with practical exercises and real-world applications",
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
        <div
          ref={programsRef}
          className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-all duration-700 ${
            programsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {programs.map((program, index) => (
            <Card key={index} className="border-sage-200 hover:shadow-lg transition-all duration-300">
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
                <p className="text-sm text-sage-400">{program.details}</p>
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

        {/* Call to Action Section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-semibold text-sage-500 mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-8">
            Support our mission to empower entrepreneurs and transform communities
            across Central Asia.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/success-stories">
              <Button variant="outline" className="gap-2">
                Read Success Stories
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/get-involved">
              <Button className="bg-terracotta-500 hover:bg-terracotta-600">
                Support Our Work
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgramsAndImpact;