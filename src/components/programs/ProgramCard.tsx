import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon, ArrowRight, CheckCircle2 } from "lucide-react";

interface ProgramDetail {
  text: string;
}

interface ProgramProps {
  title: string;
  description: string;
  icon: LucideIcon;
  details: string[];
  cta: {
    text: string;
    link: string;
  };
}

const ProgramCard = ({ title, description, icon: Icon, details, cta }: ProgramProps) => {
  return (
    <Card className="border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-white h-full flex flex-col">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4 mb-4">
          <div className="p-3 bg-gradient-to-br from-purple-100 to-blue-100 rounded-lg">
            <Icon className="w-6 h-6 text-purple-600" />
          </div>
          <CardTitle className="text-xl font-bold text-gray-800">{title}</CardTitle>
        </div>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col">
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            Program Highlights
          </h4>
          <ul className="space-y-2">
            {details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-purple-400 flex-shrink-0" />
                <span>{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-auto space-y-3">
          {/* Volunteer CTA - Primary */}
          <Link to="/get-involved?type=volunteer" className="block">
            <Button 
              size="sm"
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2"
            >
              Volunteer for This Program
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
          
          {/* Learn More - Secondary */}
          <Link to={cta.link}>
            <Button 
              variant="outline"
              size="sm"
              className="w-full border-purple-200 text-purple-600 hover:bg-purple-50 py-2"
            >
              {cta.text}
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProgramCard;