import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, HandHelping, Users, DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DonateButton from "@/components/DonateButton";

const GetInvolved = () => {
  const { toast } = useToast();

  const donationTiers = [
    {
      amount: 50,
      description: "Provides essential business training materials for one entrepreneur",
      icon: <DollarSign className="h-6 w-6" />,
      impact: "Equip one aspiring business owner with fundamental knowledge"
    },
    {
      amount: 100,
      description: "Sponsors a full day of workshops for aspiring business owners",
      icon: <Users className="h-6 w-6" />,
      impact: "Enable 10-15 entrepreneurs to receive hands-on training"
    },
    {
      amount: 250,
      description: "Funds a month of mentorship for three local entrepreneurs",
      icon: <HandHelping className="h-6 w-6" />,
      impact: "Transform three businesses through expert guidance"
    },
  ];

  const handleVolunteerClick = () => {
    toast({
      title: "Volunteer Application",
      description: "Thank you for your interest! We'll contact you soon with more details.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 animate-fade-in mt-20">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-sand-500">Be Part of the Change</h1>
        <p className="text-lg text-sage-500 max-w-2xl mx-auto">
          Explore how you can support and empower entrepreneurs in Central Asia.
        </p>
        <DonateButton 
          className="bg-terracotta-400 hover:bg-terracotta-500 mt-6"
          size="lg"
        />
      </section>

      {/* Ways to Get Involved Section */}
      <section className="space-y-12 mt-16">
        <h2 className="text-3xl font-bold text-center text-sand-500 mb-8">
          Ways to Get Involved
        </h2>

        {/* Donation Section */}
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold text-sand-500 flex items-center gap-2">
            <Heart className="text-terracotta-400" />
            Make a Donation
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            {donationTiers.map((tier) => (
              <Card key={tier.amount} className="p-6 space-y-4 hover:shadow-lg transition-shadow border-sage-200">
                <div className="flex items-center gap-3">
                  {tier.icon}
                  <h3 className="text-xl font-semibold">${tier.amount}</h3>
                </div>
                <p className="text-sage-500">{tier.description}</p>
                <div className="text-sm text-terracotta-400 italic">
                  Impact: {tier.impact}
                </div>
                <DonateButton 
                  variant="outline"
                  className="w-full border-terracotta-400 text-terracotta-400 hover:bg-terracotta-50"
                />
              </Card>
            ))}
          </div>
        </div>

        {/* Volunteer Section */}
        <div className="space-y-8 bg-sage-50 p-8 rounded-lg">
          <h3 className="text-2xl font-semibold text-sand-500 flex items-center gap-2">
            <HandHelping className="text-sage-500" />
            Volunteer Opportunities
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h4 className="font-semibold text-lg">Share Your Expertise</h4>
              <ul className="space-y-2 text-sage-500">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />
                  Mentor aspiring entrepreneurs
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />
                  Lead skill-sharing workshops
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />
                  Provide remote business consulting
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />
                  Support on-site training programs
                </li>
              </ul>
            </div>
            <div className="flex flex-col justify-center items-center space-y-4 bg-white p-6 rounded-lg">
              <p className="text-center text-sage-500">
                Ready to make a difference? Join our network of volunteer mentors and trainers.
              </p>
              <Button 
                onClick={handleVolunteerClick}
                className="bg-sage-500 hover:bg-sage-400 w-full max-w-sm"
              >
                Apply as Volunteer
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Recap */}
      <section className="bg-sand-50 p-8 rounded-lg text-center space-y-4">
        <h2 className="text-2xl font-semibold text-sand-500">Your Impact in Action</h2>
        <p className="text-sage-500 max-w-2xl mx-auto">
          Every contribution directly supports entrepreneurs in Central Asia, helping them build
          sustainable businesses that create jobs and strengthen local economies. Join us in
          empowering communities through entrepreneurship.
        </p>
        <DonateButton 
          size="lg" 
          className="bg-terracotta-400 hover:bg-terracotta-500"
        />
      </section>
    </div>
  );
};

export default GetInvolved;