import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, Users } from "lucide-react";

interface CtaSectionProps {
  inView: boolean;
}

const CtaSection = ({ inView }: CtaSectionProps) => {
  return (
    <section 
      className={`py-16 px-4 md:px-6 lg:px-8 bg-sage-50 transition-opacity duration-1000 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-3xl font-bold mb-6 text-sand-500">Be Part of Our Next Success Story</h2>
        <p className="text-lg text-sage-500 mb-8">
          Your involvement can help create more inspiring entrepreneurial journeys across Central Asia.
          Join us in empowering the next generation of business leaders.
        </p>
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-300">
            <CardHeader className="space-y-2">
              <div className="flex justify-center">
                <Heart className="w-12 h-12 text-terracotta-400" />
              </div>
              <CardTitle className="text-xl">Support Our Mission</CardTitle>
              <CardDescription>
                Help create more success stories through your generous donation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/get-involved">
                <Button 
                  size="lg"
                  className="w-full bg-terracotta-400 hover:bg-terracotta-500"
                >
                  Donate Today
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="p-6 space-y-4 hover:shadow-lg transition-all duration-300">
            <CardHeader className="space-y-2">
              <div className="flex justify-center">
                <Users className="w-12 h-12 text-sage-500" />
              </div>
              <CardTitle className="text-xl">Share Your Expertise</CardTitle>
              <CardDescription>
                Become a mentor and help shape the future of entrepreneurship
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Link to="/get-involved?type=mentor">
                <Button 
                  size="lg"
                  variant="outline"
                  className="w-full border-sage-300 text-sage-600 hover:bg-sage-50"
                >
                  Become a Mentor
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CtaSection;