import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, MessageCircle, Bell } from "lucide-react";

const SmsOptIn = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate phone number format (basic validation)
    const phoneRegex = /^[\+]?[1-9][\d]{3,14}$/;
    if (!phoneRegex.test(phoneNumber.replace(/[\s\-\(\)]/g, ''))) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    try {
      // Here you would typically send the data to your backend
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Success!",
        description: "You've been added to our SMS list. Check your phone for a confirmation message.",
      });
      
      setPhoneNumber("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Stay Connected with SMS Updates
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get timely donor updates, inspiring impact stories, event reminders, and volunteer opportunities delivered straight to your phone.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="h-6 w-6 text-purple-600" />
                What You'll Receive
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Donor Updates</h3>
                  <p className="text-gray-600 text-sm">Stay informed about how your contributions are making a difference</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Impact Stories</h3>
                  <p className="text-gray-600 text-sm">Inspiring stories from entrepreneurs we've helped succeed</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Event Reminders</h3>
                  <p className="text-gray-600 text-sm">Never miss important events, workshops, or fundraising activities</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Bell className="h-5 w-5 text-purple-600 mt-1" />
                <div>
                  <h3 className="font-semibold">Volunteer Opportunities</h3>
                  <p className="text-gray-600 text-sm">Be the first to know about new ways to get involved</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Smartphone className="h-6 w-6 text-purple-600" />
                Subscribe to SMS Updates
              </CardTitle>
              <CardDescription>
                Message frequency: 1-4 messages per month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="phone">Mobile Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(386) 517-1527"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    required
                    className="mt-1"
                  />
                </div>
                
                <div className="text-sm text-gray-600 bg-gray-50 p-4 rounded-lg">
                  <p className="mb-2">
                    By entering your mobile number and tapping 'Subscribe,' you agree to receive recurring automated and non-automated texts from Businesses Beyond Borders about donor updates, impact stories, event reminders, and volunteer opportunities.
                  </p>
                  <p className="mb-2">
                    Msg & data rates may apply. Msg frequency varies. Consent is not a condition of donation or purchase. Reply STOP to cancel, HELP for help.
                  </p>
                  <p>
                    Privacy Policy and Mobile Terms:{" "}
                    <a href="/privacy" className="text-purple-600 hover:underline">
                      https://businessesbeyondborders.com/privacy
                    </a>{" "}
                    •{" "}
                    <a href="/mobile-terms" className="text-purple-600 hover:underline">
                      https://businessesbeyondborders.com/mobile-terms
                    </a>
                  </p>
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Subscribing..." : "Subscribe"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="text-center">
          <Card className="inline-block">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-2">Alternative: Text to Join</h3>
              <p className="text-gray-600">
                Text <span className="font-mono bg-gray-100 px-2 py-1 rounded">JOIN</span> to{" "}
                <span className="font-semibold">(386) 517-1527</span>
              </p>
              <p className="text-sm text-gray-500 mt-2">
                You'll receive a confirmation message before being added to our list.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SmsOptIn;