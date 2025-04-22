import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { HandHelping, Users, Network, Share, DollarSign, Calendar, HelpCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import DonateButton from "@/components/DonateButton";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import VolunteerForm from "@/components/get-involved/VolunteerForm";

const GetInvolved = () => {
  const { toast } = useToast();
  const [volunteerDialogOpen, setVolunteerDialogOpen] = useState(false);

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
    setVolunteerDialogOpen(true);
  };

  const handleVolunteerSubmit = (data: any) => {
    setVolunteerDialogOpen(false);
    toast({
      title: "Volunteer Application Submitted",
      description: `Thank you, ${data.firstName}! We'll contact you soon with more details.`,
    });
  };

  const handlePartnerClick = () => {
    toast({
      title: "Partnership Inquiry",
      description: "Thank you for your interest in partnering with us. Our team will reach out shortly.",
    });
  };

  const impactStats = [
    { number: "5000+", label: "Volunteer Hours" },
    { number: "250+", label: "Families Reached" },
    { number: "100+", label: "Active Volunteers" },
    { number: "25+", label: "Partner Organizations" },
  ];

  const upcomingEvents = [
    {
      date: "March 15, 2024",
      title: "Volunteer Orientation",
      type: "Virtual",
    },
    {
      date: "March 20, 2024",
      title: "Partner Networking Event",
      type: "In-Person",
    },
    {
      date: "March 25, 2024",
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
    <div className="container mx-auto px-4 py-8 space-y-12 animate-fade-in pt-28">
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
            <DollarSign className="text-terracotta-400" />
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

        {/* Partner Section */}
        <div className="space-y-8">
          <h3 className="text-2xl font-semibold text-sand-500 flex items-center gap-2">
            <Network className="text-sage-500" />
            Partner With Us
          </h3>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 space-y-4">
              <h4 className="font-semibold text-lg">Collaboration Opportunities</h4>
              <ul className="space-y-2 text-sage-500">
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />
                  Corporate matching donation programs
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />
                  Joint training workshops and events
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />
                  Resource sharing initiatives
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />
                  Sponsorship opportunities
                </li>
              </ul>
              <Button 
                onClick={handlePartnerClick}
                variant="outline"
                className="w-full border-sage-300 text-sage-600 hover:bg-sage-50 mt-4"
              >
                Become a Partner
              </Button>
            </Card>
            <Card className="p-6 space-y-4 bg-sage-50">
              <h4 className="font-semibold text-lg">Why Partner With Us?</h4>
              <p className="text-sage-500">
                Join forces with us to create lasting impact in Central Asian communities. 
                Together, we can strengthen local economies and empower the next generation 
                of entrepreneurs.
              </p>
            </Card>
          </div>
        </div>

        {/* Advocate Section */}
        <div className="space-y-8 bg-sand-50 p-8 rounded-lg">
          <h3 className="text-2xl font-semibold text-sand-500 flex items-center gap-2">
            <Share className="text-sand-500" />
            Spread the Word
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 text-center space-y-4">
              <Share className="h-8 w-8 mx-auto text-sand-500" />
              <h4 className="font-semibold">Share on Social Media</h4>
              <p className="text-sage-500">Help us reach more people by sharing our mission</p>
            </Card>
            <Card className="p-6 text-center space-y-4">
              <Users className="h-8 w-8 mx-auto text-sand-500" />
              <h4 className="font-semibold">Host a Fundraiser</h4>
              <p className="text-sage-500">Organize events to support our programs</p>
            </Card>
            <Card className="p-6 text-center space-y-4">
              <Network className="h-8 w-8 mx-auto text-sand-500" />
              <h4 className="font-semibold">Join Local Events</h4>
              <p className="text-sage-500">Participate in community gatherings and workshops</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-12 bg-sage-50 rounded-lg">
        <h2 className="text-3xl font-bold text-center mb-8 text-sage-500">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-terracotta-500 mb-2">{stat.number}</div>
              <div className="text-sage-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Volunteer/Partner Spotlights */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-sand-500">Success Stories</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-6">
            <blockquote className="space-y-4">
              <p className="text-sage-600 italic">
                "Being a mentor has been incredibly rewarding. Seeing entrepreneurs grow and succeed makes every hour worth it."
              </p>
              <footer className="text-sage-500">
                - Sarah Chen, Business Mentor since 2022
              </footer>
            </blockquote>
          </Card>
          <Card className="p-6">
            <blockquote className="space-y-4">
              <p className="text-sage-600 italic">
                "Our partnership has enabled us to reach more communities and create lasting impact in Central Asia."
              </p>
              <footer className="text-sage-500">
                - Tech Solutions Co., Partner Organization
              </footer>
            </blockquote>
          </Card>
        </div>
      </section>

      {/* Upcoming Events */}
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

      {/* FAQ Section */}
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

      {/* Final CTA */}
      <section className="py-16 bg-terracotta-50 rounded-lg text-center">
        <h2 className="text-4xl font-bold mb-6 text-terracotta-500">
          Ready to Empower Entrepreneurs Today?
        </h2>
        <p className="text-lg text-sage-600 mb-8 max-w-2xl mx-auto">
          Join us in creating lasting change in Central Asian communities through entrepreneurship support.
        </p>
        <DonateButton 
          size="lg"
          className="bg-terracotta-500 hover:bg-terracotta-400 min-w-[200px]"
        />
      </section>

      {/* Volunteer Application Dialog */}
      <Dialog open={volunteerDialogOpen} onOpenChange={setVolunteerDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-sage-500 text-xl">Volunteer Application</DialogTitle>
            <DialogDescription>
              Fill out the form below to join our volunteer network. We'll get back to you within 48 hours.
            </DialogDescription>
          </DialogHeader>
          <VolunteerForm onSubmit={handleVolunteerSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GetInvolved;
