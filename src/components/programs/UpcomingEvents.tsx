import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { useRegion } from "@/contexts/RegionContext";

const upcomingEvents = [
  {
    date: "March 15, 2026",
    dateRu: "15 марта 2026",
    title: "Business Planning Workshop",
    titleRu: "Семинар по бизнес-планированию",
    type: "Workshop",
    typeRu: "Семинар",
  },
  {
    date: "March 20, 2026",
    dateRu: "20 марта 2026",
    title: "Financial Literacy Basics",
    titleRu: "Основы финансовой грамотности",
    type: "Class",
    typeRu: "Занятие",
  },
  {
    date: "March 25, 2026",
    dateRu: "25 марта 2026",
    title: "Mentor Matching Event",
    titleRu: "Встреча с менторами",
    type: "Networking",
    typeRu: "Нетворкинг",
  },
];

const UpcomingEvents = () => {
  const { isCentralAsia } = useRegion();
  return (
    <Card className="border-[#1B2A4A]/20">
      <CardHeader>
        <div className="flex items-center gap-3">
          <Calendar className="w-6 h-6 text-[#1B2A4A]" />
          <CardTitle className="text-xl text-[#1B2A4A]">
            {isCentralAsia ? "Предстоящие мероприятия" : "Upcoming Events"}
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingEvents.map((event, index) => (
            <div key={index} className="flex items-center justify-between p-3 hover:bg-[#1B2A4A]/5 rounded-lg transition-colors">
              <div>
                <p className="font-medium text-[#1B2A4A]">{isCentralAsia ? event.titleRu : event.title}</p>
                <p className="text-sm text-gray-600">{isCentralAsia ? event.dateRu : event.date}</p>
              </div>
              <Link to={`/events/${event.title.toLowerCase().replace(/\s+/g, '-')}`}>
                <Button size="sm" variant="outline" className="border-[#1B2A4A]/30 text-[#1B2A4A] hover:bg-[#1B2A4A]/5">
                  {isCentralAsia ? "Записаться" : "Sign Up"}
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