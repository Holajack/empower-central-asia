import React, { useState, useEffect } from "react";
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
} from "@/components/ui/dialog";
import ImpactStats from "@/components/home/ImpactStats";
import TestimonialCard from "@/components/success-stories/TestimonialCard";
import { testimonials } from "@/data/testimonials";

const GetInvolvedHeroHeader = () => (
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
        Get Involved
      </h1>
      <p className="text-xl text-white/90 max-w-2xl mx-auto animate-fade-up [--animation-delay:400ms]">
        Explore how you can support and empower entrepreneurs in Central Asia.
      </p>
    </div>
  </div>
);

const GetInvolved = () => {
  const { toast } = useToast();
  const [openLeadDialog, setOpenLeadDialog] = useState(false);

  useEffect(() => {
    if (openLeadDialog) {
      const scriptId = "lead-connector-form";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = "https://link.msgsndr.com/js/form_embed.js";
        script.async = true;
        document.body.appendChild(script);
      }
    }
  }, [openLeadDialog]);

  const donationTiers = [
    {
      amount: 150,
      description: "Provides comprehensive business training resources for multiple entrepreneurs",
      icon: <DollarSign className="h-6 w-6" />,
      impact: "Equip 3-5 aspiring business owners with essential knowledge"
    },
    {
      amount: 250,
      description: "Sponsors two-day intensive entrepreneurship workshops for local business owners",
      icon: <Users className="h-6 w-6" />,
      impact: "Enable 15-20 entrepreneurs to receive hands-on training"
    },
    {
      amount: 500,
      description: "Funds three months of mentorship for a group of local entrepreneurs",
      icon: <HandHelping className="h-6 w-6" />,
      impact: "Transform five businesses through expert guidance and support"
    },
  ];

  const handlePartnerClick = () => {
    toast({
      title: "Partnership Inquiry",
      description: "Thank you for your interest in partnering with us. Our team will reach out shortly.",
    });
  };

  const handleButtonTest = () => {
    setOpenLeadDialog(true);
  };

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
    <div>
      <GetInvolvedHeroHeader />
      <div className="container mx-auto px-4 py-8 space-y-12 animate-fade-in pt-12">
        <section className="text-center space-y-4"></section>

        <section className="space-y-12 mt-16">
          <h2 className="text-3xl font-bold text-center text-sand-500 mb-8">
            Ways to Get Involved
          </h2>

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
                    Provide your skills
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />
                    Advocate for us
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />
                    Support on-site training programs
                  </li>
                  <li className="flex items-center gap-2 text-muted-foreground opacity-50">
                    <div className="w-1.5 h-1.5 rounded-full bg-sage-400" />
                    Mentor aspiring entrepreneurs <span className="text-gray-500 text-xs ml-2">Coming soon</span>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col justify-center items-center space-y-4 bg-white p-6 rounded-lg">
                <p className="text-center text-sage-500">
                  Ready to make a difference? Join our network of volunteers.
                </p>
                <Button 
                  onClick={handleButtonTest}
                  className="bg-sage-500 hover:bg-sage-400 w-full max-w-sm"
                >
                  Button Test
                </Button>
                <Dialog open={openLeadDialog} onOpenChange={setOpenLeadDialog}>
                  <DialogContent className="max-w-2xl w-[95vw] p-0 overflow-hidden">
                    <DialogHeader>
                      <DialogTitle className="p-6 pb-2">Volunteer Application</DialogTitle>
                      <DialogDescription className="px-6 pb-2 text-sage-600">
                        Please fill in the volunteer application form below.
                      </DialogDescription>
                    </DialogHeader>
                    <div style={{ minHeight: 500, height: 600 }}>
                      <iframe
                        src="https://api.leadconnectorhq.com/widget/form/Eik96ptPRWcPm5P2Am2w"
                        style={{ width: "100%", height: "100%", border: "none", borderRadius: "3px", background: "white" }}
                        id="popup-Eik96ptPRWcPm5P2Am2w"
                        data-layout="{'id':'POPUP'}"
                        data-trigger-type="alwaysShow"
                        data-trigger-value=""
                        data-activation-type="alwaysActivated"
                        data-activation-value=""
                        data-deactivation-type="neverDeactivate"
                        data-deactivation-value=""
                        data-form-name="Form 1"
                        data-height="850"
                        data-layout-iframe-id="popup-Eik96ptPRWcPm5P2Am2w"
                        data-form-id="Eik96ptPRWcPm5P2Am2w"
                        title="Form 1"
                        allow="clipboard-write"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>

          <div className="space-y-8 bg-sage-50 p-8 rounded-lg">
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
      </div>
    </div>
  );
};

export default GetInvolved;
