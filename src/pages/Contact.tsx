import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Facebook, Linkedin, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Helmet } from "react-helmet";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  inquiryType: z.string(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

const Contact = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      inquiryType: "general",
      message: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    console.log("Form submitted:", values);
    
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out. We'll get back to you soon!",
    });
    
    form.reset();
    setIsSubmitting(false);
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | Businesses Beyond Borders - Empowering Entrepreneurs in Central Asia</title>
        <meta name="description" content="Get in touch with Businesses Beyond Borders. Whether you're interested in our entrepreneurship programs, want to volunteer, or explore partnership opportunities in Central Asia, we're here to help." />
        <meta name="keywords" content="contact, entrepreneurship support, Central Asia business, volunteer opportunities, partnership, community development" />
      </Helmet>

      <div className="min-h-screen pt-20 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            {/* Header */}
            <div className="text-center space-y-4">
              <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
              <p className="text-lg text-gray-600">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="space-y-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input placeholder="Your name" {...field} aria-label="Your name" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input placeholder="your@email.com" {...field} aria-label="Your email address" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="inquiryType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Inquiry Type</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger aria-label="Select inquiry type">
                                <SelectValue placeholder="Select inquiry type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="general">General Inquiry</SelectItem>
                              <SelectItem value="volunteer">Volunteer Inquiry</SelectItem>
                              <SelectItem value="media">Media Request</SelectItem>
                              <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Message</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="How can we help you?"
                              className="min-h-[120px]"
                              {...field}
                              aria-label="Your message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-terracotta-500 hover:bg-terracotta-600"
                      disabled={isSubmitting}
                      aria-label={isSubmitting ? "Sending message..." : "Send message"}
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                </Form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-semibold text-gray-900">Get in Touch</h2>
                  
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-gray-600">
                      <Mail className="h-5 w-5 text-terracotta-500" aria-hidden="true" />
                      <a 
                        href="mailto:contact@businessesbeyondborders.org" 
                        className="hover:text-terracotta-500"
                        aria-label="Email us"
                      >
                        contact@businessesbeyondborders.org
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-600">
                      <Phone className="h-5 w-5 text-terracotta-500" aria-hidden="true" />
                      <a 
                        href="tel:+1234567890" 
                        className="hover:text-terracotta-500"
                        aria-label="Call us"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                    
                    <div className="flex items-center gap-3 text-gray-600">
                      <MapPin className="h-5 w-5 text-terracotta-500" aria-hidden="true" />
                      <address className="not-italic">
                        123 Impact Street<br />
                        San Francisco, CA 94105
                      </address>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="aspect-video w-full rounded-lg overflow-hidden border border-gray-200">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.0637731777166!2d-122.39901518441636!3d37.78779997975772!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085807d2a7800a5%3A0x94b02f5b056f3f47!2sMarket%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1647894687693!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Our location on Google Maps"
                    aria-label="Interactive map showing our location"
                  ></iframe>
                </div>

                {/* Social Media Links */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Follow Us</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 hover:bg-terracotta-100 text-gray-600 hover:text-terracotta-500 transition-colors"
                      aria-label="Visit our Facebook page"
                    >
                      <Facebook className="h-5 w-5" aria-hidden="true" />
                    </a>
                    <a
                      href="https://linkedin.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 hover:bg-terracotta-100 text-gray-600 hover:text-terracotta-500 transition-colors"
                      aria-label="Visit our LinkedIn page"
                    >
                      <Linkedin className="h-5 w-5" aria-hidden="true" />
                    </a>
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-full bg-gray-100 hover:bg-terracotta-100 text-gray-600 hover:text-terracotta-500 transition-colors"
                      aria-label="Visit our Instagram page"
                    >
                      <Instagram className="h-5 w-5" aria-hidden="true" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contact;