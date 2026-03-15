import { Metadata } from "next";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, MessageCircle, MapPin } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with the HikeWise team. We'd love to hear from you.",
};

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Send us an email anytime",
    value: "hello@hikewise.app",
    href: "mailto:hello@hikewise.app",
  },
  {
    icon: MessageCircle,
    title: "Live Chat",
    description: "Chat with our support team",
    value: "Available 9am-5pm EST",
    href: "#",
  },
  {
    icon: MapPin,
    title: "Office",
    description: "Visit us in person",
    value: "San Francisco, CA",
    href: "#",
  },
];

export default function ContactPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="container mx-auto px-6">
        <SectionHeader
          title="Get in Touch"
          subtitle="Have a question or feedback? We'd love to hear from you."
        />

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="bg-white border-none shadow-soft">
            <CardContent className="p-8">
              <h2 className="text-2xl font-semibold mb-6">Send us a message</h2>
              <form className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium mb-2"
                    >
                      Name
                    </label>
                    <Input id="name" placeholder="Your name" />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium mb-2"
                    >
                      Email
                    </label>
                    <Input id="email" type="email" placeholder="your@email.com" />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2"
                  >
                    Subject
                  </label>
                  <Input id="subject" placeholder="How can we help?" />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more..."
                    rows={5}
                  />
                </div>
                <Button type="submit" className="w-full rounded-full">
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Methods */}
          <div className="space-y-6">
            {contactMethods.map((method) => (
              <Card
                key={method.title}
                className="bg-white border-none shadow-soft"
              >
                <CardContent className="p-6 flex items-start gap-4">
                  <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center flex-shrink-0">
                    <method.icon className="w-6 h-6 text-forest" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{method.title}</h3>
                    <p className="text-muted-foreground text-sm mb-2">
                      {method.description}
                    </p>
                    <a
                      href={method.href}
                      className="text-teal font-medium hover:underline"
                    >
                      {method.value}
                    </a>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
