import { useState, useEffect, useCallback } from "react";
import { Save, Printer, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-business-worksheet-3";

interface OpportunityRow {
  problem: string;
  customer: string;
  solution: string;
}

interface OpportunityData {
  opportunities: OpportunityRow[];
  political: string;
  economic: string;
  social: string;
  technological: string;
  socialImpact: string;
  selectedOpportunity: string;
}

const defaultData: OpportunityData = {
  opportunities: [{ problem: "", customer: "", solution: "" }],
  political: "",
  economic: "",
  social: "",
  technological: "",
  socialImpact: "",
  selectedOpportunity: "",
};

export default function OpportunityCanvas() {
  const [data, setData] = useState<OpportunityData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch {}
    return defaultData;
  });
  const [saved, setSaved] = useState(false);

  const save = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }, [data]);

  // Auto-save debounced
  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  function update<K extends keyof Omit<OpportunityData, "opportunities">>(
    field: K,
    value: string
  ) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  function updateOpportunity(index: number, field: keyof OpportunityRow, value: string) {
    setData(prev => {
      const opportunities = [...prev.opportunities];
      opportunities[index] = { ...opportunities[index], [field]: value };
      return { ...prev, opportunities };
    });
  }

  function addOpportunity() {
    setData(prev => ({
      ...prev,
      opportunities: [...prev.opportunities, { problem: "", customer: "", solution: "" }],
    }));
  }

  function removeOpportunity(index: number) {
    setData(prev => ({
      ...prev,
      opportunities:
        prev.opportunities.length > 1
          ? prev.opportunities.filter((_, i) => i !== index)
          : prev.opportunities,
    }));
  }

  // Completion percentage
  const oppFields = data.opportunities.flatMap(o => [o.problem, o.customer, o.solution]);
  const pestFields = [data.political, data.economic, data.social, data.technological];
  const allFields = [...oppFields, ...pestFields, data.socialImpact, data.selectedOpportunity];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / Math.max(allFields.length, 14)) * 100);

  return (
    <div className="worksheet-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Opportunity Canvas</h3>
          <p className="text-sm text-gray-500">Your data is saved automatically to this device.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()} className="no-print">
            <Printer className="w-4 h-4 mr-1" /> Print
          </Button>
          <Button variant="outline" size="sm" onClick={save} className="no-print">
            <Save className="w-4 h-4 mr-1" /> {saved ? "Saved!" : "Save"}
          </Button>
        </div>
      </div>

      {/* Progress */}
      <div className="no-print">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
          <span>Worksheet Progress</span>
          <span>{completionPercent}%</span>
        </div>
        <Progress value={completionPercent} className="h-2" />
      </div>

      {/* Opportunities */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Business Opportunities</h4>
          <p className="text-xs text-gray-500 mb-4">
            Describe each opportunity by identifying the real problem, exactly who has it, and your potential solution.
            Good businesses solve real problems for specific people.
          </p>

          <div className="space-y-4">
            {data.opportunities.map((opp, i) => (
              <div key={i} className="p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-[#1B2A4A]">Opportunity {i + 1}</span>
                  {data.opportunities.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeOpportunity(i)}
                      className="text-red-400 hover:text-red-600 no-print"
                    >
                      <Trash2 className="w-4 h-4 mr-1" /> Remove
                    </Button>
                  )}
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Problem — What specific problem exists?
                  </label>
                  <Input
                    value={opp.problem}
                    onChange={e => updateOpportunity(i, "problem", e.target.value)}
                    placeholder="e.g., Families in my area can't find fresh vegetables nearby..."
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Target Customer — Who specifically has this problem?
                  </label>
                  <Input
                    value={opp.customer}
                    onChange={e => updateOpportunity(i, "customer", e.target.value)}
                    placeholder="e.g., Mothers aged 25-45 in our neighborhood with young children..."
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 block mb-1">
                    Potential Solution — How could you solve it?
                  </label>
                  <Input
                    value={opp.solution}
                    onChange={e => updateOpportunity(i, "solution", e.target.value)}
                    placeholder="e.g., Weekly vegetable delivery from my garden to 20 families..."
                  />
                </div>
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={addOpportunity} className="mt-3 no-print">
            <Plus className="w-4 h-4 mr-1" /> Add Opportunity
          </Button>
        </CardContent>
      </Card>

      {/* PEST Analysis */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">PEST Analysis</h4>
          <p className="text-xs text-gray-500 mb-4">
            What external forces in your environment could affect your business? Consider both threats and opportunities
            in each area.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-[#1B2A4A] block mb-1">
                Political &amp; Legal
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Regulations, permits, government support, trade rules...
              </p>
              <Textarea
                value={data.political}
                onChange={e => update("political", e.target.value)}
                placeholder="e.g., Food safety permits required, government loans available for small businesses..."
                rows={4}
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#1B2A4A] block mb-1">
                Economic
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Local income levels, inflation, competition pricing, purchasing power...
              </p>
              <Textarea
                value={data.economic}
                onChange={e => update("economic", e.target.value)}
                placeholder="e.g., Customers have limited budgets, but demand for affordable goods is high..."
                rows={4}
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#1B2A4A] block mb-1">
                Social &amp; Cultural
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Community values, buying habits, trust networks, demographics...
              </p>
              <Textarea
                value={data.social}
                onChange={e => update("social", e.target.value)}
                placeholder="e.g., People prefer buying from neighbors they trust, strong women entrepreneurship culture..."
                rows={4}
                className="text-sm"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-[#1B2A4A] block mb-1">
                Technological
              </label>
              <p className="text-xs text-gray-400 mb-2">
                Mobile access, internet availability, tools you can use or must compete with...
              </p>
              <Textarea
                value={data.technological}
                onChange={e => update("technological", e.target.value)}
                placeholder="e.g., Most customers use WhatsApp, mobile payments growing, competitors have no online presence..."
                rows={4}
                className="text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Social Impact */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Social Impact Assessment</h4>
          <p className="text-xs text-gray-500 mb-4">
            Beyond profit, how will this business benefit your family, neighbors, or community? Strong businesses
            create value for more than just the owner.
          </p>
          <Textarea
            value={data.socialImpact}
            onChange={e => update("socialImpact", e.target.value)}
            placeholder="e.g., My bakery will create part-time work for 2 neighbor women, provide fresh bread at lower cost to 30 families, and keep money circulating in our community..."
            rows={5}
          />
        </CardContent>
      </Card>

      {/* Selected Opportunity */}
      <Card className="border-blue-300 bg-blue-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Your Selected Opportunity</h4>
          <p className="text-xs text-gray-500 mb-4">
            Which opportunity will you pursue? Explain why this one fits your skills, your context, and the real
            need you identified.
          </p>
          <Textarea
            value={data.selectedOpportunity}
            onChange={e => update("selectedOpportunity", e.target.value)}
            placeholder="I will pursue Opportunity # ___ because..."
            rows={5}
          />
        </CardContent>
      </Card>
    </div>
  );
}
