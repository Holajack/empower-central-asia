/**
 * Business course worksheet completion percent functions.
 * Extracted into a separate file so BusinessCourseWeek.tsx can statically import these
 * without conflicting with the lazy-loaded worksheet components.
 */

function countFilled(fields: (string | undefined | null)[]): number {
  return fields.filter((f) => f && String(f).trim() !== "").length;
}

function percent(filled: number, total: number): number {
  return total === 0 ? 0 : Math.round((filled / total) * 100);
}

// Week 1: Assumption Mapper
export function getBusinessWorksheet1Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-business-worksheet-1");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [data.businessIdea];
    const assumptionFields = data.assumptions?.flatMap(
      (a: { text: string; risk: string; evidence: string }) => [a.text, a.risk, a.evidence]
    ) || [];
    const topFields = data.topAssumptions?.filter((t: string) => t && t.trim()) || [];
    const allFields = [...fields, ...assumptionFields, ...topFields];
    return percent(countFilled(allFields), Math.max(allFields.length, 10));
  } catch { return 0; }
}

// Week 2: Productivity Blueprint
export function getBusinessWorksheet2Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-business-worksheet-2");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const timeFields = [data.deepWork, data.admin, data.socialMedia, data.family, data.rest, data.other];
    const matrixFields = data.matrix?.flatMap(
      (m: { q1: string; q2: string; q3: string; q4: string }) => [m.q1, m.q2, m.q3, m.q4]
    ) || [data.q1, data.q2, data.q3, data.q4];
    const weekFields = data.idealWeek?.flatMap(
      (d: { morning: string; afternoon: string; evening: string }) => [d.morning, d.afternoon, d.evening]
    ) || [];
    const commitmentField = [data.eliminateOrDelegate];
    const allFields = [...timeFields, ...matrixFields, ...weekFields, ...commitmentField];
    return percent(countFilled(allFields), Math.max(allFields.length, 12));
  } catch { return 0; }
}

// Week 3: Opportunity Canvas
export function getBusinessWorksheet3Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-business-worksheet-3");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const oppFields = data.opportunities?.flatMap(
      (o: { problem: string; customer: string; solution: string }) => [o.problem, o.customer, o.solution]
    ) || [];
    const pestFields = [data.political, data.economic, data.social, data.technological];
    const impactFields = data.socialImpact || [];
    const hatFields = [data.whiteFacts, data.blackRisks, data.yellowBenefits, data.goldAlternative];
    const selectionField = [data.selectedOpportunity];
    const allFields = [...oppFields, ...pestFields, ...impactFields, ...hatFields, ...selectionField];
    return percent(countFilled(allFields), Math.max(allFields.length, 14));
  } catch { return 0; }
}

// Week 4: Business Model Canvas
export function getBusinessWorksheet4Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-bmc-data");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const blocks = ["customerSegments", "valuePropositions", "channels", "customerRelationships",
      "revenueStreams", "keyResources", "keyActivities", "keyPartnerships", "costStructure"];
    let filled = 0;
    for (const block of blocks) {
      const items = data[block];
      if (Array.isArray(items) && items.some((i: string) => i && i.trim())) filled++;
    }
    return percent(filled, 9);
  } catch { return 0; }
}

// Week 5: Value Proposition Canvas
export function getBusinessWorksheet5Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-vpc-data");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const sections = ["jobs", "pains", "gains", "products", "painRelievers", "gainCreators"];
    let filled = 0;
    for (const section of sections) {
      const items = data[section];
      if (Array.isArray(items) && items.some((i: { text?: string; name?: string }) =>
        (i.text && i.text.trim()) || (i.name && i.name.trim())
      )) filled++;
    }
    return percent(filled, 6);
  } catch { return 0; }
}

// Week 6: Customer Discovery Kit
export function getBusinessWorksheet6Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-business-worksheet-6");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const planFields = data.interviewees?.flatMap(
      (p: { name: string; where: string; when: string }) => [p.name, p.where, p.when]
    ) || [];
    const scriptFields = data.questions?.filter((q: string) => q && q.trim()) || [];
    const empathyFields = [data.says, data.thinks, data.does, data.feels];
    const updateField = [data.bmcUpdates];
    const hatFields = [data.whiteData, data.blackWeakest, data.yellowStrongest, data.goldAlternativeModel];
    const allFields = [...planFields, ...scriptFields, ...empathyFields, ...updateField, ...hatFields];
    return percent(countFilled(allFields), Math.max(allFields.length, 15));
  } catch { return 0; }
}

// Week 7: Financial Dashboard
export function getBusinessWorksheet7Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-business-worksheet-7");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.price, data.unitsSold, data.fixedCosts, data.variablePerUnit,
      data.cacCost, data.cacCustomers, data.avgPurchaseValue, data.avgPurchaseFrequency,
      data.avgCustomerLifespan, data.monthlyBurn, data.currentCash,
    ];
    return percent(countFilled(fields), fields.length);
  } catch { return 0; }
}

// Week 8: Pitch Builder
export function getBusinessWorksheet8Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-business-worksheet-8");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.hook, data.problem, data.solution, data.market, data.model,
      data.traction, data.ask, data.sixtySecondPitch, data.fiveMinutePitch,
    ];
    return percent(countFilled(fields), fields.length);
  } catch { return 0; }
}

// Week 9: Validation Designer
export function getBusinessWorksheet9Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-business-worksheet-9");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const hypothesisFields = data.hypotheses?.flatMap(
      (h: { hypothesis: string; metric: string; criteria: string }) => [h.hypothesis, h.metric, h.criteria]
    ) || [];
    const experimentFields = data.experiments?.flatMap(
      (e: { description: string; duration: string; result: string }) => [e.description, e.duration, e.result]
    ) || [];
    const decisionField = [data.pivotOrPersevere];
    const hatFields = [data.whiteValidation, data.blackConcerns, data.yellowConfidence, data.goldPivotIdea];
    const allFields = [...hypothesisFields, ...experimentFields, ...decisionField, ...hatFields];
    return percent(countFilled(allFields), Math.max(allFields.length, 12));
  } catch { return 0; }
}

// Week 10: MVP Blueprint
export function getBusinessWorksheet10Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-business-worksheet-10");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [data.vpcBefore, data.vpcAfter, data.mvpType, data.mvpDescription];
    const featureFields = data.features?.flatMap(
      (f: { name: string; priority: string }) => [f.name, f.priority]
    ) || [];
    const resourceFields = data.resources?.flatMap(
      (r: { resource: string; have: string; need: string }) => [r.resource, r.have, r.need]
    ) || [];
    const allFields = [...fields, ...featureFields, ...resourceFields];
    return percent(countFilled(allFields), Math.max(allFields.length, 10));
  } catch { return 0; }
}

// Week 11: Traction Planner
export function getBusinessWorksheet11Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-business-worksheet-11");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const channelFields = data.channels?.flatMap(
      (c: { channel: string; plan: string; cost: string; timeline: string }) =>
        [c.channel, c.plan, c.cost, c.timeline]
    ) || [];
    const funnelFields = [data.awareness, data.interest, data.decision, data.action];
    const milestoneFields = data.milestones?.flatMap(
      (m: { milestone: string; target: string; date: string }) => [m.milestone, m.target, m.date]
    ) || [];
    const allFields = [...channelFields, ...funnelFields, ...milestoneFields];
    return percent(countFilled(allFields), Math.max(allFields.length, 12));
  } catch { return 0; }
}

// Week 12: Final Business Plan
export function getBusinessWorksheet12Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-business-worksheet-12");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.businessName, data.missionStatement, data.problemStatement,
      data.solutionStatement, data.targetCustomer, data.revenueModel,
      data.competitiveAdvantage, data.financialSummary, data.launchPlan,
      data.thirtyDay, data.sixtyDay, data.ninetyDay,
    ];
    const hatFields = [data.whiteReadiness, data.blackRisk, data.yellowStrength, data.goldNext];
    const allFields = [...fields, ...hatFields];
    return percent(countFilled(allFields), allFields.length);
  } catch { return 0; }
}
