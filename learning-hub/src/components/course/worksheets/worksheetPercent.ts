/**
 * Worksheet completion percent functions.
 * Extracted into a separate file so CourseWeek.tsx can statically import these
 * without conflicting with the lazy-loaded worksheet components.
 */

function countFilled(fields: string[]): number {
  return fields.filter(f => f && String(f).trim() !== "").length;
}

function percent(filled: number, total: number): number {
  return total === 0 ? 0 : Math.round((filled / total) * 100);
}

// Week 1: Financial Snapshot
export function getWorksheet1Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-worksheet-1");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.incomePrimary, data.incomeSecondary, data.incomeOther,
      data.expenseHousing, data.expenseUtilities, data.expenseFood,
      data.expenseTransport, data.expenseInsurance, data.expenseDebt,
      data.expenseEntertainment, data.expenseSubscriptions, data.expenseGiving,
      data.expenseOther,
      data.savingsEmergency, data.savingsRetirement, data.savingsOther,
    ];
    const debtFields = data.debts?.flatMap((d: { creditor: string; balance: string; payment: string }) => [d.creditor, d.balance, d.payment]) || [];
    const allFields = [...fields, ...debtFields];
    return percent(countFilled(allFields), allFields.length);
  } catch { return 0; }
}

// Week 2: Income Map
export function getWorksheet2Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-worksheet-2");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.currentIncome,
      data.maintainSources,
      data.maintainProtect,
      data.growthPlan?.step,
      data.growthPlan?.timeline,
      data.growthPlan?.obstacles,
      data.growthPlan?.help,
      data.goal90Day,
      data.actionThisWeek,
    ];
    const createFields = data.createRows?.flatMap((r: { skill: string; opportunity: string; firstStep: string }) => [r.skill, r.opportunity, r.firstStep]) || [];
    const checkboxes = [data.guardCheck1, data.guardCheck2, data.guardCheck3, data.guardCheck4].map((b: boolean) => b ? "true" : "");
    const allFields = [...fields, ...createFields, ...checkboxes];
    return percent(countFilled(allFields), allFields.length);
  } catch { return 0; }
}

// Week 3: Zero-Based Budget
export function getWorksheet3Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-worksheet-3");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.income,
      ...data.categories.flatMap((c: { planned: string; actual: string }) => [c.planned, c.actual]),
    ];
    return percent(countFilled(fields), fields.length);
  } catch { return 0; }
}

// Week 4: Debt Inventory
export function getWorksheet4Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-worksheet-4");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.extraPayment,
      ...data.debts.flatMap((d: { creditor: string; type: string; balance: string; interestRate: string; minimumPayment: string }) => [d.creditor, d.type, d.balance, d.interestRate, d.minimumPayment]),
    ];
    return percent(countFilled(fields), fields.length);
  } catch { return 0; }
}

// Week 5: Emergency Fund Plan
export function getWorksheet5Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-worksheet-5");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.housing,
      data.utilities,
      data.food,
      data.transport,
      data.insurance,
      data.minDebt,
      data.currentSavings,
      data.monthlySavings,
    ];
    const sellFields = data.sellItems?.flatMap((s: { item: string; value: string }) => [s.item, s.value]) || [];
    const allFields = [...fields, ...sellFields];
    return percent(countFilled(allFields), allFields.length);
  } catch { return 0; }
}

// Week 6: Progress Review
export function getWorksheet6Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-worksheet-6");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.startIncome,
      data.startExpenses,
      data.startGap,
      data.startDebt,
      data.startSavings,
      data.nowIncome,
      data.nowExpenses,
      data.nowGap,
      data.nowDebt,
      data.nowSavings,
      data.whoToTeach,
      data.whatToShare,
    ];
    const goalFields = data.goals?.flatMap((g: { goal: string; targetDate: string; firstAction: string }) => [g.goal, g.targetDate, g.firstAction]) || [];
    const checkboxField = data.facilitatorInterest ? "true" : "";
    const allFields = [...fields, ...goalFields, checkboxField];
    return percent(countFilled(allFields), allFields.length);
  } catch { return 0; }
}

// Leadership Week 1: Self-Leadership Assessment
export function getLeadershipWorksheet1Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-leadership-ws-1");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.habit1Rating, data.habit2Rating, data.habit3Rating,
      data.habit4Rating, data.habit5Rating, data.habit6Rating,
      data.habit7Rating, data.biggestStrength, data.biggestGrowthArea,
      data.commitmentThisWeek, data.whyLeadershipMatters,
    ];
    return percent(countFilled(fields), fields.length);
  } catch { return 0; }
}

// Leadership Week 2: Emotional Intelligence Audit
export function getLeadershipWorksheet2Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-leadership-ws-2");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.selfAwarenessScore, data.selfAwarenessExample,
      data.selfRegulationScore, data.selfRegulationTrigger,
      data.motivationScore, data.motivationDrives,
      data.empathyScore, data.empathySituation,
      data.socialSkillsScore, data.socialSkillsGrowth,
      data.overallEqReflection, data.developmentPlan,
    ];
    return percent(countFilled(fields), fields.length);
  } catch { return 0; }
}

// Leadership Week 3: Values Clarification
export function getLeadershipWorksheet3Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-leadership-ws-3");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.coreValue1, data.coreValue1Why,
      data.coreValue2, data.coreValue2Why,
      data.coreValue3, data.coreValue3Why,
      data.valuesConflict,
      data.decisionQuestion1, data.decisionQuestion2, data.decisionQuestion3,
      data.valueLivingGap, data.alignmentCommitment,
    ];
    return percent(countFilled(fields), fields.length);
  } catch { return 0; }
}

// Leadership Week 4: Communication Style Assessment
export function getLeadershipWorksheet4Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-leadership-ws-4");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.listeningScore, data.listeningBarrier,
      data.feedbackGivingScore, data.lastFeedbackExample,
      data.feedbackReceivingScore, data.feedbackReceivingReaction,
      data.crucialConvAvoiding, data.crucialConvOutcome,
      data.communicationStyle, data.developmentAction,
    ];
    return percent(countFilled(fields), fields.length);
  } catch { return 0; }
}

// Leadership Week 5: Influence Mapping
export function getLeadershipWorksheet5Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-leadership-ws-5");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const stakeholderFields = data.stakeholders?.flatMap(
      (s: { name: string; role: string; influence: string; relationship: string; nextStep: string }) =>
        [s.name, s.role, s.influence, s.relationship, s.nextStep]
    ) || [];
    const fields = [
      ...stakeholderFields,
      data.biggestAlly, data.biggestChallenger, data.neglectedRelationship,
      data.trustBuilderAction, data.influenceStyle, data.thirtyDayGoal,
    ];
    return percent(countFilled(fields), fields.length);
  } catch { return 0; }
}

// Leadership Week 6: Coaching Plan (GROW Model)
export function getLeadershipWorksheet6Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-leadership-ws-6");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.coacheeName, data.growthGoal, data.goalCurrentReality,
      data.goalObstacles, data.growthOptions1, data.growthOptions2,
      data.growthOptions3, data.wayForwardAction, data.wayForwardTimeline,
      data.wayForwardAccountability, data.coachingApproachReflection, data.nextSessionDate,
    ];
    return percent(countFilled(fields), fields.length);
  } catch { return 0; }
}

// Leadership Week 7: Team Health Check
export function getLeadershipWorksheet7Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-leadership-ws-7");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.trustScore, data.trustEvidence, data.trustWeakness,
      data.conflictScore, data.conflictPattern,
      data.commitmentScore, data.commitmentGap,
      data.accountabilityScore, data.accountabilityAction,
      data.resultsScore, data.resultsBottleneck,
      data.teamOverallHealth, data.priorityFix,
    ];
    return percent(countFilled(fields), fields.length);
  } catch { return 0; }
}

// Leadership Week 8: Conflict Resolution Planner
export function getLeadershipWorksheet8Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-leadership-ws-8");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.conflictDescription, data.partiesInvolved, data.conflictType,
      data.myPosition, data.otherPosition,
      data.myUnderlyingInterest, data.otherUnderlyingInterest, data.sharedInterests,
      data.optionA, data.optionB, data.optionC,
      data.selectedApproach, data.firstConversationPlan, data.successDefinition,
    ];
    return percent(countFilled(fields), fields.length);
  } catch { return 0; }
}

// Leadership Week 9: Delegation Matrix
export function getLeadershipWorksheet9Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-leadership-ws-9");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const rowFields = data.rows?.flatMap(
      (r: { task: string; currentOwner: string; delegateTo: string; readinessLevel: string; supportNeeded: string; targetDate: string }) =>
        [r.task, r.currentOwner, r.delegateTo, r.readinessLevel, r.supportNeeded, r.targetDate]
    ) || [];
    const fields = [
      data.delegationBarrier, data.tasksOnlyIMustDo,
      ...rowFields,
      data.followUpSystem, data.timeSavedGoal, data.biggestDelegationFear,
    ];
    return percent(countFilled(fields), fields.length);
  } catch { return 0; }
}

// Leadership Week 10: Strategic Vision Canvas
export function getLeadershipWorksheet10Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-leadership-ws-10");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.missionStatement, data.visionStatement, data.bhag, data.bhagTimeHorizon,
      data.strategicPriority1, data.strategicPriority2, data.strategicPriority3,
      data.keyMetric1, data.keyMetric2, data.keyMetric3,
      data.biggestStrategicRisk, data.nextQuarterFocus, data.visionCommunicationPlan,
    ];
    return percent(countFilled(fields), fields.length);
  } catch { return 0; }
}

// Leadership Week 11: Change Management Plan
export function getLeadershipWorksheet11Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-leadership-ws-11");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.changeDescription, data.changeUrgency, data.guidingCoalition,
      data.changeVision, data.communicationPlan, data.quickWins,
      data.resistanceAnticipated, data.resistanceStrategy,
      data.systemsToChange, data.sustainabilityPlan,
      data.biggestRisk, data.firstThirtyDays,
    ];
    return percent(countFilled(fields), fields.length);
  } catch { return 0; }
}

// Leadership Week 12: Leadership Legacy Statement
export function getLeadershipWorksheet12Percent(): number {
  try {
    const saved = localStorage.getItem("bbb-leadership-ws-12");
    if (!saved) return 0;
    const data = JSON.parse(saved);
    const fields = [
      data.personalMission, data.howIWantToBeKnown,
      data.impactIn5Years, data.impactIn20Years,
      data.successorName, data.successorStrengths,
      data.successorDevelopmentPlan, data.institutionalKnowledgeToTransfer,
      data.leadershipPrincipleI, data.leadershipPrincipleII, data.leadershipPrincipleIII,
      data.letterToFutureSelf,
    ];
    return percent(countFilled(fields), fields.length);
  } catch { return 0; }
}
