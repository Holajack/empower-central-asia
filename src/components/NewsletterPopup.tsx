
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import NewsletterSignup from "./NewsletterSignup";

const NewsletterPopup = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkAndShowPopup = () => {
      const hasSeenPopup = localStorage.getItem("newsletter-popup-seen");
      const dontShowAgain = localStorage.getItem("newsletter-popup-dismissed");
      
      // Don't show if user has dismissed it permanently
      if (dontShowAgain === "true") {
        return;
      }
      
      // Show popup after 5 seconds if not seen in this session
      if (!hasSeenPopup) {
        const timer = setTimeout(() => {
          setIsOpen(true);
          localStorage.setItem("newsletter-popup-seen", "true");
        }, 5000);
        
        return () => clearTimeout(timer);
      }
    };

    checkAndShowPopup();
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleDontShowAgain = () => {
    localStorage.setItem("newsletter-popup-dismissed", "true");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-[500px] p-0">
        <div className="relative">
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 z-10 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
          
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 p-8 rounded-t-lg">
            <NewsletterSignup variant="popup" />
          </div>
          
          <div className="p-4 border-t bg-gray-50 rounded-b-lg">
            <div className="flex justify-between items-center">
              <p className="text-sm text-gray-600">Join thousands making a difference</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleDontShowAgain}
                className="text-gray-500 hover:text-gray-700"
              >
                Don't show again
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default NewsletterPopup;
