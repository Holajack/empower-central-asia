import { useState, useEffect, useCallback } from "react";
import { Save, Printer, Plus, Trash2, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const STORAGE_KEY = "bbb-bmc-data";

interface BMCData {
  customerSegments: string[];
  valuePropositions: string[];
  channels: string[];
  customerRelationships: string[];
  revenueStreams: string[];
  keyResources: string[];
  keyActivities: string[];
  keyPartnerships: string[];
  costStructure: string[];
}

const defaultData: BMCData = {
  customerSegments: [""],
  valuePropositions: [""],
  channels: [""],
  customerRelationships: [""],
  revenueStreams: [""],
  keyResources: [""],
  keyActivities: [""],
  keyPartnerships: [""],
  costStructure: [""],
};

// Bakery examples for each block
const EXAMPLES: Record<keyof BMCData, string[]> = {
  customerSegments: [
    "Busy working mothers aged 25-45",
    "Office workers who want fresh lunch",
    "Families celebrating birthdays and events",
  ],
  valuePropositions: [
    "Fresh bread baked same day, delivered to your door",
    "No preservatives — just real ingredients",
    "Custom cakes for any occasion within 48 hours",
  ],
  channels: [
    "WhatsApp orders from returning customers",
    "Local market stall on Saturday mornings",
    "Word of mouth from happy neighbors",
  ],
  customerRelationships: [
    "Personal delivery with a smile and short conversation",
    "Loyalty discount for customers who order 3+ times",
    "WhatsApp group for weekly menu announcements",
  ],
  revenueStreams: [
    "Daily bread sales (1,500 som per loaf)",
    "Custom cakes (4,000-8,000 som each)",
    "Weekly subscription boxes (5,500 som/week)",
  ],
  keyResources: [
    "Home oven and baking equipment",
    "Trusted flour and butter supplier",
    "Phone and WhatsApp for taking orders",
  ],
  keyActivities: [
    "Baking fresh products every morning by 6am",
    "Delivering orders before 9am",
    "Posting photos of fresh products on WhatsApp",
  ],
  keyPartnerships: [
    "Local flour mill for bulk purchase discount",
    "Neighbor who helps with delivery on busy days",
    "Local events planner who refers cake orders",
  ],
  costStructure: [
    "Ingredients (flour, butter, eggs, sugar): 8,000 som/month",
    "Packaging (bags, boxes): 1,500 som/month",
    "Delivery fuel/transport: 2,000 som/month",
  ],
};

interface BlockConfig {
  key: keyof BMCData;
  title: string;
  icon: string;
  guiding: string;
  placeholder: string;
}

const BLOCKS: BlockConfig[] = [
  {
    key: "keyPartnerships",
    title: "Key Partnerships",
    icon: "🤝",
    guiding: "Who are your key suppliers and partners? What do you get from them? What do they get?",
    placeholder: "e.g., Local flour supplier who gives credit terms...",
  },
  {
    key: "keyActivities",
    title: "Key Activities",
    icon: "⚙️",
    guiding: "What must you DO every day or week to deliver your value? What activities keep the business running?",
    placeholder: "e.g., Bake fresh products every morning...",
  },
  {
    key: "valuePropositions",
    title: "Value Propositions",
    icon: "💡",
    guiding: "What value do you deliver to customers? What problem do you solve? Why would someone choose you?",
    placeholder: "e.g., Fresh bread with no preservatives, delivered same day...",
  },
  {
    key: "customerRelationships",
    title: "Customer Relationships",
    icon: "💬",
    guiding: "How do you get customers? How do you keep them? How do you grow the relationship over time?",
    placeholder: "e.g., Personal delivery, loyalty discounts...",
  },
  {
    key: "customerSegments",
    title: "Customer Segments",
    icon: "👥",
    guiding: "Who are your most important customers? Be specific — age, location, situation, needs.",
    placeholder: "e.g., Working mothers aged 25-45 in my neighborhood...",
  },
  {
    key: "keyResources",
    title: "Key Resources",
    icon: "🔑",
    guiding: "What assets do you need most? Physical equipment, knowledge, people, money, or relationships?",
    placeholder: "e.g., Home oven, trusted supplier, phone for orders...",
  },
  {
    key: "channels",
    title: "Channels",
    icon: "📣",
    guiding: "How do customers find out about you? How do you deliver your product or service to them?",
    placeholder: "e.g., WhatsApp orders, Saturday market, word of mouth...",
  },
  {
    key: "costStructure",
    title: "Cost Structure",
    icon: "💸",
    guiding: "What are your biggest costs? List fixed costs (same every month) and variable costs (change with volume).",
    placeholder: "e.g., Ingredients: 8,000 som/month...",
  },
  {
    key: "revenueStreams",
    title: "Revenue Streams",
    icon: "💰",
    guiding: "How do you earn money? List each product/service and its price. How does each customer pay?",
    placeholder: "e.g., Daily bread sales at 1,500 som per loaf...",
  },
];

// Which blocks appear in which grid areas (standard BMC layout)
// Row 1: Key Partners | Key Activities | Value Props | Customer Rel | Customer Segments
// Row 2: Key Partners | Key Resources  | Value Props | Channels     | Customer Segments
// Row 3: Cost Structure (cols 1-2)     | Revenue Streams (cols 3-5)
// We render this as a CSS grid using named areas.

interface BMCBlockProps {
  config: BlockConfig;
  items: string[];
  onChange: (items: string[]) => void;
}

function BMCBlock({ config, items, onChange }: BMCBlockProps) {
  const [showExamples, setShowExamples] = useState(false);

  function updateItem(index: number, value: string) {
    const updated = [...items];
    updated[index] = value;
    onChange(updated);
  }

  function addItem() {
    onChange([...items, ""]);
  }

  function removeItem(index: number) {
    if (items.length <= 1) {
      onChange([""]);
      return;
    }
    onChange(items.filter((_, i) => i !== index));
  }

  const hasContent = items.some(i => i.trim() !== "");

  return (
    <div className="flex flex-col h-full min-h-[180px] p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
      <div className="flex items-center gap-1.5 mb-1">
        <span className="text-base leading-none">{config.icon}</span>
        <h5 className="text-xs font-bold text-[#1B2A4A] leading-tight">{config.title}</h5>
        {hasContent && (
          <span className="ml-auto w-2 h-2 rounded-full bg-green-400 shrink-0" title="Has content" />
        )}
      </div>
      <p className="text-[10px] text-gray-400 mb-2 leading-relaxed">{config.guiding}</p>

      <div className="flex-1 space-y-1.5">
        {items.map((item, i) => (
          <div key={i} className="flex items-center gap-1">
            <Input
              value={item}
              onChange={e => updateItem(i, e.target.value)}
              placeholder={i === 0 ? config.placeholder : "Add another..."}
              className="text-xs h-7 px-2"
            />
            {items.length > 1 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => removeItem(i)}
                className="h-7 w-7 p-0 text-red-400 hover:text-red-600 shrink-0 no-print"
              >
                <Trash2 className="w-3 h-3" />
              </Button>
            )}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 mt-2 no-print">
        <Button
          variant="ghost"
          size="sm"
          onClick={addItem}
          className="h-6 text-xs text-[#1B2A4A] px-1 hover:bg-gray-100"
        >
          <Plus className="w-3 h-3 mr-0.5" /> Add
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowExamples(v => !v)}
          className="h-6 text-xs text-gray-400 px-1 hover:bg-gray-100 ml-auto"
        >
          {showExamples ? (
            <>
              <ChevronUp className="w-3 h-3 mr-0.5" /> Hide examples
            </>
          ) : (
            <>
              <ChevronDown className="w-3 h-3 mr-0.5" /> See examples
            </>
          )}
        </Button>
      </div>

      {showExamples && (
        <div className="mt-2 p-2 bg-amber-50 border border-amber-200 rounded text-[10px] text-amber-800 space-y-1">
          <p className="font-semibold mb-1">Bakery example:</p>
          {EXAMPLES[config.key].map((ex, i) => (
            <p key={i} className="leading-snug">- {ex}</p>
          ))}
        </div>
      )}
    </div>
  );
}

export default function BusinessModelCanvas() {
  const [data, setData] = useState<BMCData>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        // Ensure every block is an array
        const result = { ...defaultData };
        for (const key of Object.keys(defaultData) as (keyof BMCData)[]) {
          if (Array.isArray(parsed[key]) && parsed[key].length > 0) {
            result[key] = parsed[key];
          }
        }
        return result;
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

  function updateBlock(key: keyof BMCData, items: string[]) {
    setData(prev => ({ ...prev, [key]: items }));
  }

  // Completion: a block counts as filled if it has at least one non-empty item
  const blockKeys = Object.keys(defaultData) as (keyof BMCData)[];
  const filledBlocks = blockKeys.filter(k => data[k].some(i => i.trim() !== "")).length;
  const completionPercent = Math.round((filledBlocks / 9) * 100);

  const getBlock = (key: keyof BMCData) =>
    BLOCKS.find(b => b.key === key)!;

  return (
    <div className="worksheet-container space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h3 className="text-xl font-bold text-[#1B2A4A]">Business Model Canvas</h3>
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
          <span>Blocks filled ({filledBlocks} of 9)</span>
          <span>{completionPercent}%</span>
        </div>
        <Progress value={completionPercent} className="h-2" />
      </div>

      <Card>
        <CardContent className="pt-4 pb-4">
          <p className="text-xs text-gray-500 mb-1">
            Fill in all 9 blocks to map how your business creates, delivers, and captures value. Click "See examples"
            on any block to see a bakery example for guidance.
          </p>
        </CardContent>
      </Card>

      {/* Desktop Grid Layout — matches standard BMC */}
      <div className="hidden lg:grid gap-2" style={{
        gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr",
        gridTemplateRows: "auto auto auto",
      }}>
        {/* Row 1 & 2 combined cells */}

        {/* Key Partnerships — spans 2 rows */}
        <div style={{ gridColumn: "1", gridRow: "1 / 3" }}>
          <BMCBlock
            config={getBlock("keyPartnerships")}
            items={data.keyPartnerships}
            onChange={items => updateBlock("keyPartnerships", items)}
          />
        </div>

        {/* Key Activities — row 1, col 2 */}
        <div style={{ gridColumn: "2", gridRow: "1" }}>
          <BMCBlock
            config={getBlock("keyActivities")}
            items={data.keyActivities}
            onChange={items => updateBlock("keyActivities", items)}
          />
        </div>

        {/* Value Propositions — spans 2 rows, col 3 */}
        <div style={{ gridColumn: "3", gridRow: "1 / 3" }}>
          <BMCBlock
            config={getBlock("valuePropositions")}
            items={data.valuePropositions}
            onChange={items => updateBlock("valuePropositions", items)}
          />
        </div>

        {/* Customer Relationships — row 1, col 4 */}
        <div style={{ gridColumn: "4", gridRow: "1" }}>
          <BMCBlock
            config={getBlock("customerRelationships")}
            items={data.customerRelationships}
            onChange={items => updateBlock("customerRelationships", items)}
          />
        </div>

        {/* Customer Segments — spans 2 rows, col 5 */}
        <div style={{ gridColumn: "5", gridRow: "1 / 3" }}>
          <BMCBlock
            config={getBlock("customerSegments")}
            items={data.customerSegments}
            onChange={items => updateBlock("customerSegments", items)}
          />
        </div>

        {/* Key Resources — row 2, col 2 */}
        <div style={{ gridColumn: "2", gridRow: "2" }}>
          <BMCBlock
            config={getBlock("keyResources")}
            items={data.keyResources}
            onChange={items => updateBlock("keyResources", items)}
          />
        </div>

        {/* Channels — row 2, col 4 */}
        <div style={{ gridColumn: "4", gridRow: "2" }}>
          <BMCBlock
            config={getBlock("channels")}
            items={data.channels}
            onChange={items => updateBlock("channels", items)}
          />
        </div>

        {/* Cost Structure — row 3, cols 1-2 */}
        <div style={{ gridColumn: "1 / 3", gridRow: "3" }}>
          <BMCBlock
            config={getBlock("costStructure")}
            items={data.costStructure}
            onChange={items => updateBlock("costStructure", items)}
          />
        </div>

        {/* Revenue Streams — row 3, cols 3-5 */}
        <div style={{ gridColumn: "3 / 6", gridRow: "3" }}>
          <BMCBlock
            config={getBlock("revenueStreams")}
            items={data.revenueStreams}
            onChange={items => updateBlock("revenueStreams", items)}
          />
        </div>
      </div>

      {/* Mobile Layout — vertically stacked in logical order */}
      <div className="lg:hidden space-y-3">
        {/* Top context: who you're building for */}
        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1">
          Who You Serve
        </div>
        <BMCBlock
          config={getBlock("customerSegments")}
          items={data.customerSegments}
          onChange={items => updateBlock("customerSegments", items)}
        />

        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1 pt-2">
          What You Offer
        </div>
        <BMCBlock
          config={getBlock("valuePropositions")}
          items={data.valuePropositions}
          onChange={items => updateBlock("valuePropositions", items)}
        />

        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1 pt-2">
          How You Reach &amp; Serve Them
        </div>
        <BMCBlock
          config={getBlock("channels")}
          items={data.channels}
          onChange={items => updateBlock("channels", items)}
        />
        <BMCBlock
          config={getBlock("customerRelationships")}
          items={data.customerRelationships}
          onChange={items => updateBlock("customerRelationships", items)}
        />

        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1 pt-2">
          How You Make Money
        </div>
        <BMCBlock
          config={getBlock("revenueStreams")}
          items={data.revenueStreams}
          onChange={items => updateBlock("revenueStreams", items)}
        />

        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1 pt-2">
          What You Need to Operate
        </div>
        <BMCBlock
          config={getBlock("keyActivities")}
          items={data.keyActivities}
          onChange={items => updateBlock("keyActivities", items)}
        />
        <BMCBlock
          config={getBlock("keyResources")}
          items={data.keyResources}
          onChange={items => updateBlock("keyResources", items)}
        />
        <BMCBlock
          config={getBlock("keyPartnerships")}
          items={data.keyPartnerships}
          onChange={items => updateBlock("keyPartnerships", items)}
        />

        <div className="text-xs font-semibold text-gray-400 uppercase tracking-wide px-1 pt-2">
          What It Costs
        </div>
        <BMCBlock
          config={getBlock("costStructure")}
          items={data.costStructure}
          onChange={items => updateBlock("costStructure", items)}
        />
      </div>

      {/* Summary card */}
      {filledBlocks >= 5 && (
        <Card className="border-green-300 bg-green-50/30">
          <CardContent className="pt-5">
            <h4 className="font-bold text-[#1B2A4A] mb-2">Good progress!</h4>
            <p className="text-sm text-gray-600">
              You have filled {filledBlocks} of 9 blocks. Once all blocks are complete, you will have a full
              picture of how your business works. Print this canvas to share with your mentor or cohort.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
