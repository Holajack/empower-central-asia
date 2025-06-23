
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

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
    <Card className="border-blue-200 hover:shadow-lg transition-all duration-300">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Icon className="w-6 h-6 text-blue-500" />
          </div>
          <CardTitle className="text-xl text-blue-500">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4">{description}</p>
        <ul className="space-y-2 mb-6">
          {details.map((detail, idx) => (
            <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
              <div className="w-1.5 h-1.5 mt-1.5 rounded-full bg-blue-400" />
              {detail}
            </li>
          ))}
        </ul>
        <Link to={cta.link}>
          <Button 
            variant="outline" 
            className="w-full border-blue-300 text-blue-600 hover:bg-blue-50"
          >
            {cta.text}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ProgramCard;
