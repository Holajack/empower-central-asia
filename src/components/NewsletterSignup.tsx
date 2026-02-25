
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail, User, Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Google Apps Script web app URL - handles writing to Google Sheet
// To set up: see NEWSLETTER_SETUP.md in project root
const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwNjCpqnF62FS46eygrXMNATbNLGTjQ5UofInsBuSrrBJ6_J8PlSr_WdCoIgfW6bEFNBw/exec";

interface NewsletterSignupProps {
  className?: string;
  variant?: "footer" | "popup";
}

const NewsletterSignup = ({ className = "", variant = "footer" }: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    if (!firstName.trim()) {
      toast({
        title: "First Name Required",
        description: "Please enter your first name.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          firstName: firstName.trim(),
          lastName: lastName.trim(),
          phone: phone.trim(),
        }),
      });

      // no-cors mode always returns opaque response, so we assume success
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for joining our newsletter. You'll receive updates about our work in Central Asia.",
      });
      setEmail("");
      setFirstName("");
      setLastName("");
      setPhone("");
    } catch (error) {
      toast({
        title: "Subscription Failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isPopup = variant === "popup";

  return (
    <div className={`${className}`}>
      {isPopup ? (
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900 mb-2">
            Stay Connected with Our Mission
          </h3>
          <p className="text-gray-600 mb-4">
            Get inspiring updates about our work transforming lives in Central Asia.
            Discover success stories, program updates, and ways to make a difference.
          </p>
        </div>
      ) : (
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2 text-gray-800">Newsletter</h4>
          <p className="text-gray-600 text-sm mb-4">
            Stay updated on our impact in Central Asia with inspiring stories and program highlights.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <div className="relative flex-1">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="text"
                placeholder="First name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <div className="flex-1">
              <Input
                type="text"
                placeholder="Last name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10"
                required
              />
            </div>
            <div className="relative flex-1">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                type="tel"
                placeholder="Phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <div className="flex">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-purple-500 hover:bg-purple-600 text-white px-6"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </div>
          </div>
        <p className="text-xs text-gray-500">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
};

export default NewsletterSignup;
