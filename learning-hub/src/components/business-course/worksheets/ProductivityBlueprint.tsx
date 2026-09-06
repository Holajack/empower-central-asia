import { useState, useEffect, useCallback } from "react";
import { Save, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";

const STORAGE_KEY = "bbb-business-worksheet-2";

interface DayRow {
  morning: string;
  afternoon: string;
  evening: string;
}

interface ProductivityData {
  deepWork: string;
  admin: string;
  socialMedia: string;
  family: string;
  rest: string;
  other: string;
  q1: string;
  q2: string;
  q3: string;
  q4: string;
  idealWeek: DayRow[];
  eliminateOrDelegate: string;
}

const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const defaultData: ProductivityData = {
  deepWork: "",
  admin: "",
  socialMedia: "",
  family: "",
  rest: "",
  other: "",
  q1: "",
  q2: "",
  q3: "",
  q4: "",
  idealWeek: DAYS.map(() => ({ morning: "", afternoon: "", evening: "" })),
  eliminateOrDelegate: "",
};

export default function ProductivityBlueprint() {
  const [data, setData] = useState<ProductivityData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure idealWeek always has 7 days
        if (!parsed.idealWeek || parsed.idealWeek.length !== 7) {
          parsed.idealWeek = DAYS.map((_: unknown, i: number) =>
            parsed.idealWeek?.[i] || { morning: "", afternoon: "", evening: "" }
          );
        }
        return parsed;
      }
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

  function update<K extends keyof Omit<ProductivityData, "idealWeek">>(
    field: K,
    value: ProductivityData[K]
  ) {
    setData(prev => ({ ...prev, [field]: value }));
  }

  function updateDay(dayIndex: number, field: keyof DayRow, value: string) {
    setData(prev => {
      const idealWeek = [...prev.idealWeek];
      idealWeek[dayIndex] = { ...idealWeek[dayIndex], [field]: value };
      return { ...prev, idealWeek };
    });
  }

  // Total audit hours
  const auditFields = [data.deepWork, data.admin, data.socialMedia, data.family, data.rest, data.other];
  const totalAuditHours = auditFields.reduce((sum, v) => {
    const n = parseFloat(v);
    return sum + (isNaN(n) ? 0 : n);
  }, 0);

  // Completion percentage
  const allFields = [
    data.deepWork, data.admin, data.socialMedia, data.family, data.rest, data.other,
    data.q1, data.q2, data.q3, data.q4,
    ...data.idealWeek.flatMap(d => [d.morning, d.afternoon, d.evening]),
    data.eliminateOrDelegate,
  ];
  const filledCount = allFields.filter(f => f && f.trim() !== "").length;
  const completionPercent = Math.round((filledCount / Math.max(allFields.length, 12)) * 100);

  return (
    <div className="worksheet-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Productivity Blueprint</h3>
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

      {/* Time Audit */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Time Audit: Where Does Your Time Go?</h4>
          <p className="text-xs text-gray-500 mb-4">
            Estimate how many hours per week you currently spend in each category. Be honest.
          </p>
          <div className="space-y-3">
            {[
              { field: "deepWork" as const, label: "Deep work (focused, creative, business-building)" },
              { field: "admin" as const, label: "Admin tasks (email, errands, logistics)" },
              { field: "socialMedia" as const, label: "Social media & entertainment" },
              { field: "family" as const, label: "Family & community" },
              { field: "rest" as const, label: "Rest & personal care" },
              { field: "other" as const, label: "Other" },
            ].map(({ field, label }) => (
              <div key={field} className="flex items-center gap-3">
                <label className="text-sm text-gray-700 flex-1 min-w-[180px]">{label}</label>
                <div className="flex items-center gap-1 w-28 shrink-0">
                  <Input
                    type="number"
                    min="0"
                    max="168"
                    step="0.5"
                    value={data[field]}
                    onChange={e => update(field, e.target.value)}
                    placeholder="0"
                    className="text-right"
                  />
                  <span className="text-xs text-gray-400 shrink-0">hrs</span>
                </div>
              </div>
            ))}
            <div className="flex items-center gap-3 pt-2 border-t">
              <span className="text-sm font-bold text-[#1B2A4A] flex-1">Total hours tracked</span>
              <span
                className={`text-lg font-bold shrink-0 ${
                  totalAuditHours > 168 ? "text-red-600" : "text-[#1B2A4A]"
                }`}
              >
                {totalAuditHours.toFixed(1)} / 168
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Eisenhower Matrix */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Eisenhower Matrix</h4>
          <p className="text-xs text-gray-500 mb-4">
            List your current tasks and commitments in the right quadrant. Focus your business time on Q2.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs font-bold text-red-700 mb-1">Q1: Urgent + Important</p>
              <p className="text-xs text-gray-500 mb-2">Do now. Crisis, deadlines, real emergencies.</p>
              <Textarea
                value={data.q1}
                onChange={e => update("q1", e.target.value)}
                placeholder="e.g., Urgent customer order, family health issue..."
                rows={4}
                className="text-sm"
              />
            </div>
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs font-bold text-green-700 mb-1">Q2: Not Urgent + Important</p>
              <p className="text-xs text-gray-500 mb-2">Schedule. Business planning, learning, relationships.</p>
              <Textarea
                value={data.q2}
                onChange={e => update("q2", e.target.value)}
                placeholder="e.g., Research suppliers, build website, customer conversations..."
                rows={4}
                className="text-sm"
              />
            </div>
            <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
              <p className="text-xs font-bold text-yellow-700 mb-1">Q3: Urgent + Not Important</p>
              <p className="text-xs text-gray-500 mb-2">Delegate. Interruptions, some meetings, others' priorities.</p>
              <Textarea
                value={data.q3}
                onChange={e => update("q3", e.target.value)}
                placeholder="e.g., Unimportant phone calls, most social notifications..."
                rows={4}
                className="text-sm"
              />
            </div>
            <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg">
              <p className="text-xs font-bold text-gray-600 mb-1">Q4: Not Urgent + Not Important</p>
              <p className="text-xs text-gray-500 mb-2">Eliminate. Time-wasters, trivial entertainment.</p>
              <Textarea
                value={data.q4}
                onChange={e => update("q4", e.target.value)}
                placeholder="e.g., Mindless scrolling, activities that drain without giving back..."
                rows={4}
                className="text-sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Ideal Week */}
      <Card>
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">Design Your Ideal Week</h4>
          <p className="text-xs text-gray-500 mb-4">
            What would each time block look like if you were working at your best? Be specific about your business time.
          </p>
          <div className="space-y-4">
            {DAYS.map((day, i) => (
              <div key={day} className="p-3 bg-gray-50 rounded-lg">
                <p className="text-sm font-semibold text-[#1B2A4A] mb-2">{day}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Morning</label>
                    <Input
                      value={data.idealWeek[i].morning}
                      onChange={e => updateDay(i, "morning", e.target.value)}
                      placeholder="e.g., Deep work, calls..."
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Afternoon</label>
                    <Input
                      value={data.idealWeek[i].afternoon}
                      onChange={e => updateDay(i, "afternoon", e.target.value)}
                      placeholder="e.g., Admin, customer visits..."
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 block mb-1">Evening</label>
                    <Input
                      value={data.idealWeek[i].evening}
                      onChange={e => updateDay(i, "evening", e.target.value)}
                      placeholder="e.g., Family, rest, review..."
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* One Commitment */}
      <Card className="border-blue-300 bg-blue-50/30">
        <CardContent className="pt-5">
          <h4 className="font-bold text-[#1B2A4A] mb-1">One Commitment to Eliminate or Delegate</h4>
          <p className="text-xs text-gray-500 mb-4">
            To make room for your business, what is one thing you will stop doing or hand off to someone else?
          </p>
          <Textarea
            value={data.eliminateOrDelegate}
            onChange={e => update("eliminateOrDelegate", e.target.value)}
            placeholder="e.g., I will stop watching TV after dinner and use that time for planning. Or I will ask my spouse to handle grocery shopping on Saturdays..."
            rows={4}
          />
        </CardContent>
      </Card>
    </div>
  );
}
