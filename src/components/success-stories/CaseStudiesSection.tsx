
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface CaseStudy {
  title: string;
  description: string;
  image: string;
  impact: string;
}

interface CaseStudiesSectionProps {
  caseStudies: CaseStudy[];
  inView: boolean;
}

const caseStudyLinks = [
  "/success-stories/case-study-sarah",
  "/success-stories/case-study-marcus"
];

const CaseStudiesSection = ({ caseStudies, inView }: CaseStudiesSectionProps) => {
  return (
    <section
      className={`py-12 px-4 md:px-6 lg:px-8 transition-opacity duration-1000 ${
        inView ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center">Case Studies</h2>
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {caseStudies.map((study, index) => (
            <Card key={index} className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <CardHeader>
                <CardTitle>{study.title}</CardTitle>
                <CardDescription>{study.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-secondary/50 p-4 rounded-lg">
                  <p className="font-semibold">Impact:</p>
                  <p className="text-muted-foreground">{study.impact}</p>
                </div>
                <a href={caseStudyLinks[index]} className="block mt-4">
                  <Button className="w-full bg-purple-500 hover:bg-purple-600">Read Full Story</Button>
                </a>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CaseStudiesSection;
