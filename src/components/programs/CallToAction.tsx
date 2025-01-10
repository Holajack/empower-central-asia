import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Users2 } from "lucide-react";
import UpcomingEvents from "./UpcomingEvents";

const CallToAction = () => {
  return (
    <div className="mt-20 bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-semibold text-sage-500 mb-4">
              Join Us in Making a Difference
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Support our mission to empower entrepreneurs and transform communities
              across Central Asia through various ways of involvement.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="border-sage-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Heart className="w-6 h-6 text-terracotta-500" />
                  <h3 className="text-xl font-semibold text-sage-500">Support Our Programs</h3>
                </div>
                <p className="text-gray-600">
                  Your donation helps provide essential resources and training to aspiring
                  entrepreneurs in Central Asia.
                </p>
                <Link to="/get-involved">
                  <Button className="w-full bg-terracotta-500 hover:bg-terracotta-600">
                    Donate to Fuel More Programs
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-sage-200 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <Users2 className="w-6 h-6 text-sage-500" />
                  <h3 className="text-xl font-semibold text-sage-500">Get Involved</h3>
                </div>
                <p className="text-gray-600">
                  Share your expertise as a mentor or partner with us to create
                  lasting impact in local communities.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <Link to="/get-involved?type=mentor">
                    <Button variant="outline" className="w-full border-sage-300 text-sage-600 hover:bg-sage-50">
                      Become a Mentor
                    </Button>
                  </Link>
                  <Link to="/get-involved?type=partner">
                    <Button variant="outline" className="w-full border-sage-300 text-sage-600 hover:bg-sage-50">
                      Partner With Us
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>

          <UpcomingEvents />
        </div>
      </div>
    </div>
  );
};

export default CallToAction;