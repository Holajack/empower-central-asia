import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, HandHelping, Users, DollarSign, Handshake } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const GetInvolved = () => {
  const { toast } = useToast();

  const donationTiers = [
    {
      amount: 50,
      description: "Provides essential business training materials for one entrepreneur",
      icon: <DollarSign className="h-6 w-6" />,
    },
    {
      amount: 100,
      description: "Sponsors a full day of workshops for aspiring business owners",
      icon: <Users className="h-6 w-6" />,
    },
    {
      amount: 250,
      description: "Funds a month of mentorship for three local entrepreneurs",
      icon: <HandHelping className="h-6 w-6" />,
    },
  ];

  const handleDonateClick = (amount: number) => {
    toast({
      title: "Thank you for your interest!",
      description: `Donation processing for $${amount} will be implemented soon.`,
    });
  };

  const handlePartnershipClick = () => {
    toast({
      title: "Partnership Inquiry",
      description: "Our team will contact you soon to discuss partnership opportunities.",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-12 animate-fade-in mt-20">
      {/* Hero Section */}
      <section className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-sand-500">Join Our Mission</h1>
        <p className="text-lg text-sage-500 max-w-2xl mx-auto">
          Your support empowers entrepreneurs across Central Asia to build sustainable businesses
          and transform their communities.
        </p>
      </section>

      {/* Donation Options */}
      <section className="space-y-6">
        <h2 className="text-2xl font-semibold text-sand-500">Make a Difference Today</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {donationTiers.map((tier) => (
            <Card key={tier.amount} className="p-6 space-y-4 hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3">
                {tier.icon}
                <h3 className="text-xl font-semibold">${tier.amount}</h3>
              </div>
              <p className="text-sage-500">{tier.description}</p>
              <Button 
                onClick={() => handleDonateClick(tier.amount)}
                className="w-full bg-terracotta-400 hover:bg-terracotta-500"
              >
                <Heart className="mr-2 h-4 w-4" />
                Donate ${tier.amount}
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* Volunteer & Partnership Section */}
      <section className="grid md:grid-cols-2 gap-8">
        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <HandHelping className="h-6 w-6 text-sage-500" />
            <h2 className="text-2xl font-semibold">Volunteer Opportunities</h2>
          </div>
          <ul className="space-y-2 text-sage-500">
            <li>• Mentor aspiring entrepreneurs</li>
            <li>• Host business workshops</li>
            <li>• Provide consulting services</li>
            <li>• Support local initiatives</li>
          </ul>
          <Button variant="outline" className="w-full">
            <Users className="mr-2 h-4 w-4" />
            Join as Volunteer
          </Button>
        </Card>

        <Card className="p-6 space-y-4">
          <div className="flex items-center gap-3">
            <Handshake className="h-6 w-6 text-sage-500" />
            <h2 className="text-2xl font-semibold">Partnership Opportunities</h2>
          </div>
          <ul className="space-y-2 text-sage-500">
            <li>• Corporate sponsorships</li>
            <li>• Matching grant programs</li>
            <li>• Resource sharing</li>
            <li>• Joint initiatives</li>
          </ul>
          <Button 
            variant="outline" 
            className="w-full"
            onClick={handlePartnershipClick}
          >
            <Handshake className="mr-2 h-4 w-4" />
            Partner With Us
          </Button>
        </Card>
      </section>

      {/* Impact Recap */}
      <section className="bg-sand-50 p-8 rounded-lg text-center space-y-4">
        <h2 className="text-2xl font-semibold text-sand-500">Your Impact in Action</h2>
        <p className="text-sage-500 max-w-2xl mx-auto">
          Every contribution directly supports entrepreneurs in Central Asia, helping them build
          sustainable businesses that create jobs and strengthen local economies. Join us in
          empowering communities through entrepreneurship.
        </p>
        <Button 
          size="lg" 
          className="bg-terracotta-400 hover:bg-terracotta-500"
          onClick={() => handleDonateClick(100)}
        >
          <Heart className="mr-2 h-5 w-5" />
          Donate Today
        </Button>
      </section>
    </div>
  );
};

export default GetInvolved;