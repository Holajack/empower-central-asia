import { useState, useEffect, useCallback } from "react";
import { Save, Printer, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STORAGE_KEY = "bbb-business-worksheet-10";

type Priority = "Must Have" | "Should Have" | "Could Have" | "Won't Have" | "";
type MVPType =
  | "Single-Feature"
  | "Wizard of Oz"
  | "Concierge"
  | "Piecemeal"
  | "Crowd-funded"
  | "";

interface FeatureRow {
  name: string;
  priority: Priority;
}

interface ResourceRow {
  resource: string;
  have: string;
  need: string;
}

interface MVPData {
  vpcBefore: string;
  vpcAfter: string;
  features: FeatureRow[];
  mvpType: MVPType;
  mvpDescription: string;
  resources: ResourceRow[];
}

const defaultFeatures: FeatureRow[] = [
  { name: "", priority: "" },
  { name: "", priority: "" },
  { name: "", priority: "" },
  { name: "", priority: "" },
  { name: "", priority: "" },
];

const defaultResources: ResourceRow[] = [
  { resource: "", have: "", need: "" },
  { resource: "", have: "", need: "" },
  { resource: "", have: "", need: "" },
];

const defaultData: MVPData = {
  vpcBefore: "",
  vpcAfter: "",
  features: defaultFeatures,
  mvpType: "",
  mvpDescription: "",
  resources: defaultResources,
};

const MVP_TYPES: { value: MVPType; label: string; description: string }[] = [
  { value: "Single-Feature", label: "Single-Feature", description: "Build just one core feature to test your main value proposition" },
  { value: "Wizard of Oz", label: "Wizard of Oz", description: "Simulate the product manually behind the scenes while it looks automated to users" },
  { value: "Concierge", label: "Concierge", description: "Serve a small number of customers manually and personally to learn what they need" },
  { value: "Piecemeal", label: "Piecemeal", description: "Combine existing tools and services to deliver your value without building from scratch" },
  { value: "Crowd-funded", label: "Crowd-funded", description: "Validate demand by getting customers to commit money before the product exists" },
];

const PRIORITY_COLORS: Record<string, string> = {
  "Must Have": "text-red-700 bg-red-50",
  "Should Have": "text-orange-700 bg-orange-50",
  "Could Have": "text-blue-700 bg-blue-50",
  "Won't Have": "text-gray-500 bg-gray-100",
};

export default function MVPBlueprint() {
  const [data, setData] = useState<MVPData>(() => {
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

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    }, 500);
    return () => clearTimeout(timer);
  }, [data]);

  // Feature helpers
  function updateFeature(index: number, field: keyof FeatureRow, value: string) {
    setData(prev => {
      const features = [...prev.features];
      features[index] = { ...features[index], [field]: value };
      return { ...prev, features };
    });
  }

  function addFeature() {
    setData(prev => ({
      ...prev,
      features: [...prev.features, { name: "", priority: "" }],
    }));
  }

  function removeFeature(index: number) {
    setData(prev => ({
      ...prev,
      features:
        prev.features.length > 1
          ? prev.features.filter((_, i) => i !== index)
          : prev.features,
    }));
  }

  // Resource helpers
  function updateResource(index: number, field: keyof ResourceRow, value: string) {
    setData(prev => {
      const resources = [...prev.resources];
      resources[index] = { ...resources[index], [field]: value };
      return { ...prev, resources };
    });
  }

  function addResource() {
    setData(prev => ({
      ...prev,
      resources: [...prev.resources, { resource: "", have: "", need: "" }],
    }));
  }

  function removeResource(index: number) {
    setData(prev => ({
      ...prev,
      resources:
        prev.resources.length > 1
          ? prev.resources.filter((_, i) => i !== index)
          : prev.resources,
    }));
  }

  // Completion percentage
  const coreFields = [data.vpcBefore, data.vpcAfter, data.mvpType, data.mvpDescription];
  const featureFields = data.features.flatMap(f => [f.name, f.priority]);
  const resourceFields = data.resources.flatMap(r => [r.resource, r.have, r.need]);
  const allFields = [...coreFields, ...featureFields, ...resourceFields];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / Math.max(allFields.length, 10)) * 100);

  const selectedMVPType = MVP_TYPES.find(t => t.value === data.mvpType);

  return (
    <div className="worksheet-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">MVP Blueprint</h3>
          <p className="text-sm text-gray-500">Week 10 — Your data is saved automatically to this device.</p>
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

      {/* VPC Before / After */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Value Proposition Canvas: Before vs. After</h4>
          <p className="text-xs text-gray-500 mb-4">
            Reflect on how your understanding of your customer evolved through the validation process. What changed?
          </p>
          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                VPC Before Validation
              </label>
              <Textarea
                value={data.vpcBefore}
                onChange={e => setData(prev => ({ ...prev, vpcBefore: e.target.value }))}
                placeholder="What did your Value Proposition Canvas look like before customer discovery? What did you assume about your customers' jobs, pains, and gains?"
                rows={4}
              />
            </div>
            <div>
              <label className="text-xs font-medium text-gray-700 block mb-1">
                VPC After Validation
              </label>
              <Textarea
                value={data.vpcAfter}
                onChange={e => setData(prev => ({ ...prev, vpcAfter: e.target.value }))}
                placeholder="How has it changed based on what you learned? Which assumptions were wrong? What surprised you about your customers?"
                rows={4}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* MoSCoW Features */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Feature Prioritization (MoSCoW)</h4>
          <p className="text-xs text-gray-500 mb-4">
            List all the features you could build and assign each a priority. Your MVP should focus almost entirely on Must Haves.
          </p>

          <div className="mb-3 flex flex-wrap gap-2 text-xs">
            {["Must Have", "Should Have", "Could Have", "Won't Have"].map(p => (
              <span key={p} className={`px-2 py-0.5 rounded-full font-medium ${PRIORITY_COLORS[p]}`}>
                {p}
              </span>
            ))}
          </div>

          <div className="space-y-2">
            {data.features.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-[1fr_180px_auto] gap-2 items-center p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  {i === 0 && (
                    <label className="text-xs text-gray-500 block mb-1">Feature Name</label>
                  )}
                  <Input
                    value={row.name}
                    onChange={e => updateFeature(i, "name", e.target.value)}
                    placeholder="e.g., User login, payment processing, product listing..."
                  />
                </div>
                <div>
                  {i === 0 && (
                    <label className="text-xs text-gray-500 block mb-1">Priority</label>
                  )}
                  <Select
                    value={row.priority}
                    onValueChange={val => updateFeature(i, "priority", val)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Must Have">Must Have</SelectItem>
                      <SelectItem value="Should Have">Should Have</SelectItem>
                      <SelectItem value="Could Have">Could Have</SelectItem>
                      <SelectItem value="Won't Have">Won't Have</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {data.features.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFeature(i)}
                    className="text-red-400 hover:text-red-600 no-print mt-0 sm:mt-5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={addFeature} className="mt-3 no-print">
            <Plus className="w-4 h-4 mr-1" /> Add Feature
          </Button>
        </CardContent>
      </Card>

      {/* MVP Type Selection */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">MVP Type</h4>
          <p className="text-xs text-gray-500 mb-4">
            Choose the type of MVP that best fits your business idea, resources, and what you need to learn.
          </p>

          <div className="space-y-2 mb-4">
            {MVP_TYPES.map(type => (
              <button
                key={type.value}
                type="button"
                onClick={() => setData(prev => ({ ...prev, mvpType: type.value }))}
                className={`w-full text-left p-3 rounded-lg border-2 transition-all ${
                  data.mvpType === type.value
                    ? "border-[#C9922A] bg-amber-50"
                    : "border-gray-200 bg-gray-50 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full border-2 shrink-0 flex items-center justify-center ${
                      data.mvpType === type.value
                        ? "border-[#C9922A]"
                        : "border-gray-400"
                    }`}
                  >
                    {data.mvpType === type.value && (
                      <div className="w-2 h-2 rounded-full bg-[#C9922A]" />
                    )}
                  </div>
                  <div>
                    <span className="text-sm font-semibold text-[#1B2A4A]">{type.label}</span>
                    <p className="text-xs text-gray-500 mt-0.5">{type.description}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          {selectedMVPType && (
            <div className="p-3 rounded-lg bg-[#C9922A]/10 border border-[#C9922A]/30 text-xs text-[#1B2A4A]">
              You selected: <strong>{selectedMVPType.label}</strong> — {selectedMVPType.description}
            </div>
          )}
        </CardContent>
      </Card>

      {/* MVP Description */}
      <Card className="border-[#C9922A]/30 bg-amber-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">MVP Description</h4>
          <p className="text-xs text-gray-500 mb-4">
            Describe your minimum viable product in detail. What exactly will you build or offer? Who is it for? What problem does it solve? How will customers access it?
          </p>
          <Textarea
            value={data.mvpDescription}
            onChange={e => setData(prev => ({ ...prev, mvpDescription: e.target.value }))}
            placeholder="Describe your MVP in detail: what it includes, what it doesn't include, who your first users will be, and how you'll deliver it..."
            rows={5}
          />
        </CardContent>
      </Card>

      {/* Resource Inventory */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Resource Inventory</h4>
          <p className="text-xs text-gray-500 mb-4">
            List the resources you need to build your MVP. Be honest about what you already have and what you need to acquire.
          </p>

          <div className="space-y-2">
            {data.resources.map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-[1fr_100px_1fr_auto] gap-2 items-end p-3 bg-gray-50 rounded-lg"
              >
                <div>
                  {i === 0 && <label className="text-xs text-gray-500 block mb-1">Resource</label>}
                  <Input
                    value={row.resource}
                    onChange={e => updateResource(i, "resource", e.target.value)}
                    placeholder="e.g., Smartphone, delivery vehicle, baking oven..."
                  />
                </div>
                <div>
                  {i === 0 && <label className="text-xs text-gray-500 block mb-1">Have it?</label>}
                  <Input
                    value={row.have}
                    onChange={e => updateResource(i, "have", e.target.value)}
                    placeholder="Yes / No"
                  />
                </div>
                <div>
                  {i === 0 && <label className="text-xs text-gray-500 block mb-1">How to get it</label>}
                  <Input
                    value={row.need}
                    onChange={e => updateResource(i, "need", e.target.value)}
                    placeholder="Buy, borrow, partner, apply for grant..."
                  />
                </div>
                {data.resources.length > 1 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeResource(i)}
                    className="text-red-400 hover:text-red-600 no-print"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button variant="outline" size="sm" onClick={addResource} className="mt-3 no-print">
            <Plus className="w-4 h-4 mr-1" /> Add Resource
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
