import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useToast } from "@/hooks/use-toast";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, User, Mail, Phone, MessageSquare } from "lucide-react";

// Enhanced form schema with more comprehensive validation
const contactFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  inquiryType: z.string().min(1, "Please select an inquiry type"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  source: z.string().optional(),
});

const volunteerFormSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  volunteerType: z.string().min(1, "Please select a volunteer opportunity"),
  experience: z.string().min(10, "Please describe your experience"),
  availability: z.string().min(1, "Please specify your availability"),
  motivation: z.string().min(20, "Please tell us why you want to volunteer (at least 20 characters)"),
  skills: z.string().min(5, "Please list your relevant skills"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;
type VolunteerFormData = z.infer<typeof volunteerFormSchema>;

interface GoHighLevelFormProps {
  formType: "contact" | "volunteer";
  title: string;
  description: string;
  submitButtonText?: string;
  volunteerOpportunity?: string;
  onSuccess?: () => void;
}

const GoHighLevelForm: React.FC<GoHighLevelFormProps> = ({
  formType,
  title,
  description,
  submitButtonText = "Submit",
  volunteerOpportunity,
  onSuccess,
}) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const schema = formType === "contact" ? contactFormSchema : volunteerFormSchema;
  
  const form = useForm<ContactFormData | VolunteerFormData>({
    resolver: zodResolver(schema),
    defaultValues: formType === "contact" 
      ? {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          inquiryType: "",
          message: "",
          source: typeof window !== 'undefined' ? window.location.pathname : '',
        }
      : {
          firstName: "",
          lastName: "",
          email: "",
          phone: "",
          volunteerType: volunteerOpportunity || "",
          experience: "",
          availability: "",
          motivation: "",
          skills: "",
        },
  });

  const submitToGoHighLevel = async (data: ContactFormData | VolunteerFormData) => {
    try {
      // This would integrate with GoHighLevel API
      // For now, we'll simulate the API call
      
      const goHighLevelPayload = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        source: formType === "contact" ? (data as ContactFormData).source || "website" : "volunteer-application",
        tags: formType === "contact" 
          ? [(data as ContactFormData).inquiryType, "website-lead"]
          : ["volunteer-applicant", (data as VolunteerFormData).volunteerType],
        customFields: formType === "contact"
          ? {
              inquiry_type: (data as ContactFormData).inquiryType,
              message: (data as ContactFormData).message,
              submitted_at: new Date().toISOString(),
              form_source: "enhanced-contact-form"
            }
          : {
              volunteer_type: (data as VolunteerFormData).volunteerType,
              experience: (data as VolunteerFormData).experience,
              availability: (data as VolunteerFormData).availability,
              motivation: (data as VolunteerFormData).motivation,
              skills: (data as VolunteerFormData).skills,
              submitted_at: new Date().toISOString(),
              form_source: "enhanced-volunteer-form"
            }
      };

      // In a real implementation, you would make an API call to GoHighLevel:
      // const response = await fetch('https://rest.gohighlevel.com/v1/contacts/', {
      //   method: 'POST',
      //   headers: {
      //     'Authorization': `Bearer ${process.env.GOHIGHLEVEL_API_KEY}`,
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify(goHighLevelPayload),
      // });

      // For now, simulate successful submission
      console.log("Would submit to GoHighLevel:", goHighLevelPayload);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return { success: true };
    } catch (error) {
      console.error("GoHighLevel submission error:", error);
      throw error;
    }
  };

  const onSubmit = async (data: ContactFormData | VolunteerFormData) => {
    setIsSubmitting(true);
    
    try {
      await submitToGoHighLevel(data);
      
      setIsSubmitted(true);
      toast({
        title: "Success!",
        description: formType === "contact" 
          ? "Thank you for reaching out. We'll get back to you within 24-48 hours!"
          : "Thank you for your volunteer application. We'll review it and contact you soon!",
      });
      
      form.reset();
      onSuccess?.();
    } catch (error) {
      toast({
        title: "Submission Error",
        description: "There was an issue submitting your form. Please try again or contact us directly.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <Card className="max-w-md mx-auto">
        <CardContent className="pt-8 text-center">
          <div className="flex justify-center mb-4">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold text-green-700 mb-2">
            {formType === "contact" ? "Message Sent!" : "Application Submitted!"}
          </h3>
          <p className="text-gray-600 mb-4">
            {formType === "contact" 
              ? "We'll get back to you within 24-48 hours."
              : "We'll review your application and contact you soon."
            }
          </p>
          <Button 
            onClick={() => setIsSubmitted(false)}
            variant="outline"
            className="mt-2"
          >
            Submit Another {formType === "contact" ? "Message" : "Application"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader className="text-center pb-6">
        <CardTitle className="text-2xl font-bold text-gray-800">{title}</CardTitle>
        <CardDescription className="text-lg text-gray-600 mt-2">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      First Name
                    </FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your first name" 
                        {...field} 
                        className="h-12 text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Enter your last name" 
                        {...field}
                        className="h-12 text-lg" 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Contact Fields */}
            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="email"
                        placeholder="your@email.com" 
                        {...field}
                        className="h-12 text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="flex items-center gap-2">
                      <Phone className="w-4 h-4" />
                      Phone Number
                    </FormLabel>
                    <FormControl>
                      <Input 
                        type="tel"
                        placeholder="(386) 555-0123" 
                        {...field}
                        className="h-12 text-lg"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Form-specific fields */}
            {formType === "contact" ? (
              <>
                <FormField
                  control={form.control}
                  name="inquiryType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>How can we help you?</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-lg">
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="volunteer">Volunteer Opportunities</SelectItem>
                          <SelectItem value="programs">Program Information</SelectItem>
                          <SelectItem value="partnership">Corporate Partnership</SelectItem>
                          <SelectItem value="donation">Donation Questions</SelectItem>
                          <SelectItem value="media">Media & Press</SelectItem>
                          <SelectItem value="general">General Inquiry</SelectItem>
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
                      <FormLabel className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4" />
                        Your Message
                      </FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us more about your inquiry. The more details you provide, the better we can assist you."
                          className="min-h-[120px] text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            ) : (
              <>
                <FormField
                  control={form.control}
                  name="volunteerType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Volunteer Opportunity</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-lg">
                            <SelectValue placeholder="Select volunteer opportunity" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="leadership-mentor">Leadership Development Mentor</SelectItem>
                          <SelectItem value="community-organizer">Community Organizer</SelectItem>
                          <SelectItem value="business-trainer">Business Training Volunteer</SelectItem>
                          <SelectItem value="admin-support">Administrative Support</SelectItem>
                          <SelectItem value="outreach-specialist">Outreach Specialist</SelectItem>
                          <SelectItem value="event-organizer">Event Organizer</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="experience"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Relevant Experience</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Describe your relevant work experience, volunteer experience, or skills that would help in this role."
                          className="min-h-[100px] text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="availability"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Availability</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-12 text-lg">
                            <SelectValue placeholder="Select your availability" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="2-4-hours-week">2-4 hours per week</SelectItem>
                          <SelectItem value="5-8-hours-week">5-8 hours per week</SelectItem>
                          <SelectItem value="8-12-hours-week">8-12 hours per week</SelectItem>
                          <SelectItem value="flexible">Flexible schedule</SelectItem>
                          <SelectItem value="project-based">Project-based</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="motivation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why do you want to volunteer with us?</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us what motivates you to volunteer and why you're interested in our mission."
                          className="min-h-[100px] text-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="skills"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Skills & Expertise</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g., Business mentorship, marketing, financial planning, event coordination..."
                          {...field}
                          className="h-12 text-lg"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </>
            )}

            <Button
              type="submit"
              className="w-full h-14 text-lg font-semibold bg-purple-600 hover:bg-purple-700 text-white"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : submitButtonText}
            </Button>

            <p className="text-sm text-gray-500 text-center">
              Your information will be securely stored and used to match you with the best opportunities. 
              We respect your privacy and will never share your information.
            </p>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GoHighLevelForm;