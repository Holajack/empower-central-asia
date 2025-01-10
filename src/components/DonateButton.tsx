import { Button } from "./ui/button";
import { Heart } from "lucide-react";

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
  const handleDonateClick = () => {
    // Open Donorbox in a new tab
    window.open('https://donorbox.org/your-campaign-name', '_blank');
    
    console.log('Donate button clicked - redirecting to Donorbox');
  };

  return (
    <Button
      variant={variant}
      size={size}
      className={`${className}`}
      onClick={handleDonateClick}
    >
      {showIcon && <Heart className="mr-2 h-4 w-4" />}
      Donate Now
    </Button>
  );
};

export default DonateButton;