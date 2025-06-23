import { Button } from "./ui/button";
import { Heart } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useEffect } from "react";

interface DonateButtonProps {
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
}

const DonateButton = ({ 
  className = "", 
  variant = "default",
  size = "default",
  showIcon = true 
}: DonateButtonProps) => {
  useEffect(() => {
    // Add Donorbox widget script
    const script = document.createElement('script');
    script.src = "https://donorbox.org/widget.js";
    script.async = true;
    script.setAttribute('paypalExpress', 'true');
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`${className}`}
        >
          {showIcon && <Heart className="mr-2 h-4 w-4" />}
          Donate Now
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Make a Donation</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center w-full">
          <iframe 
            src="https://donorbox.org/embed/financial-mentorship-program?language=en-us" 
            name="donorbox" 
            allow="payment"
            seamless={true}
            frameBorder="0" 
            scrolling="no" 
            height="900px" 
            width="100%" 
            style={{ 
              maxWidth: '500px', 
              minWidth: '250px', 
              maxHeight: 'none !important' 
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DonateButton;