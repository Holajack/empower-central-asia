import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";

const upcomingEvents = [
  {
    date: "March 15, 2024",
    title: "Business Planning Workshop",
    type: "Workshop",
  },
  {
    date: "March 20, 2024",
    title: "Financial Literacy Basics",
    type: "Class",
  },
  {
    date: "March 25, 2024",
    title: "Mentor Matching Event",
    type: "Networking",
  },
];

const UpcomingEvents = () => {
  return (
    <Card className="border-sage-200">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-sage-500" />
          <CardTitle className="text-xl text-sage-500">
            Upcoming Events
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-sage-50 rounded-lg transition-colors">
              <div>
                <p className="font-medium text-sage-500">{event.title}</p>
                <p className="text-sm text-gray-600">{event.date}</p>
              </div>
              <Link to={`/events/${event.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <Button size="sm" variant="outline" className="border-sage-300 text-sage-600 hover:bg-sage-50">
                  Sign Up
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingEvents;