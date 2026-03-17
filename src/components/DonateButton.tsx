
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
import { useRegion } from "@/contexts/RegionContext";
import { trackConversion } from "@/lib/analytics";

interface DonateButtonProps {
  className?: string;
  variant?: "default" | "outline";
  size?: "default" | "sm" | "lg" | "icon";
  showIcon?: boolean;
  children?: React.ReactNode;
}

const DonateButton = ({
  className = "",
  variant = "default",
  size = "default",
  showIcon = true,
  children
}: DonateButtonProps) => {
  const { isCentralAsia } = useRegion();
  const buttonLabel = children || (isCentralAsia ? "Пожертвовать" : "Donate Now");
  useEffect(() => {
    // Add Donorbox widget script
    const script = document.createElement('script');
    script.src = "https://donorbox.org/widget.js";
    script.async = true;
    script.setAttribute('paypalExpress', 'true');
    document.body.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={variant}
          size={size}
          className={`bg-[#C9922A] hover:bg-[#C9922A]/90 text-white ${className}`}
          onClick={() => trackConversion("donate_click", { method: "donorbox_dialog" })}
        >
          {showIcon && <Heart className="mr-2 h-4 w-4" />}
          {buttonLabel}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{isCentralAsia ? "Сделать пожертвование" : "Make a Donation"}</DialogTitle>
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
