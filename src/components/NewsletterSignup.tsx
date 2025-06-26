
import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface NewsletterSignupProps {
  className?: string;
  variant?: "footer" | "popup";
}

const NewsletterSignup = ({ className = "", variant = "footer" }: NewsletterSignupProps) => {
  const [email, setEmail] = useState("");
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

    setIsSubmitting(true);
    
    // Simulate API call - replace with actual newsletter signup logic
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast({
        title: "Successfully Subscribed!",
        description: "Thank you for joining our newsletter. You'll receive updates about our work in the 10/40 window.",
      });
      setEmail("");
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
            Get inspiring updates about our work transforming lives in the 10/40 window region. 
            Discover success stories, program updates, and ways to make a difference in Central Asia.
          </p>
        </div>
      ) : (
        <div className="mb-4">
          <h4 className="text-lg font-semibold mb-2 text-gray-800">Newsletter</h4>
          <p className="text-gray-600 text-sm mb-4">
            Stay updated on our impact in the 10/40 window region with inspiring stories and program highlights.
          </p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              required
            />
          </div>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-purple-500 hover:bg-purple-600 text-white px-6"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
        <p className="text-xs text-gray-500">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
};

export default NewsletterSignup;
