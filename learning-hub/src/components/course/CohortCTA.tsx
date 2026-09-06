import { Link } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRegion } from "@/contexts/RegionContext";

export default function CohortCTA() {
  const { isCentralAsia } = useRegion();

  return (
    <Card className="border-[#1B2A4A]/20 bg-gradient-to-br from-[#1B2A4A]/5 to-[#C9922A]/5 no-print">
      <CardContent className="py-8 text-center">
        <Users className="w-10 h-10 text-[#C9922A] mx-auto mb-4" />
        <h3 className="text-xl font-bold text-[#1B2A4A] mb-2">
          {isCentralAsia ? "Хотите углубиться?" : "Want to Go Deeper?"}
        </h3>
        <p className="text-gray-600 max-w-md mx-auto mb-6 text-sm leading-relaxed">
          {isCentralAsia
            ? "Присоединяйтесь к живой группе с фасилитатором для обсуждений, подотчётности и поддержки сообщества. Наша 10-недельная программа охватывает дополнительные темы."
            : "Join a live facilitated group for guided discussions, accountability, and community. Our 10-week comprehensive program covers additional topics with a trained facilitator walking alongside you every step."}
        </p>
        <Link to="/cohort">
          <Button className="bg-[#1B2A4A] hover:bg-[#1B2A4A]/90 text-white">
            {isCentralAsia ? "Узнать о когортах" : "Learn About Live Cohorts"}
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
