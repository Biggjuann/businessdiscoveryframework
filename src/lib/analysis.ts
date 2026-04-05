import type { DiscoveryState, AIOpportunity, RoadmapPhase, AnalysisResult } from "@/types/discovery";
import { OPPORTUNITY_CATALOG, type OpportunityTemplate } from "./recommendations";
import { dataMaturityScore, employeeCapacityScore, budgetScore, weightedAverage, clamp } from "./scoring";

function computeReadiness(state: DiscoveryState): number {
  return weightedAverage([
    { score: dataMaturityScore(state.techStack.dataMaturity), weight: 0.3 },
    { score: state.techStack.integrationReadiness * 20, weight: 0.2 },
    { score: employeeCapacityScore(state.companyOverview.employeeCount), weight: 0.15 },
    { score: state.techStack.existingAI ? 80 : 30, weight: 0.15 },
    { score: budgetScore(state.goals.budgetRange), weight: 0.2 },
  ]);
}

function scoreOpportunity(template: OpportunityTemplate, state: DiscoveryState): AIOpportunity | null {
  let relevanceScore = 0;
  const relevantPainPoints: string[] = [];
  const relevantGoals: string[] = [];

  // Industry match
  if (template.matchIndustries.length === 0) {
    relevanceScore += 1; // Universal opportunity
  } else if (template.matchIndustries.includes(state.companyOverview.industry as typeof template.matchIndustries[number])) {
    relevanceScore += 2;
  }

  // Department match
  for (const dept of state.workflows.departments) {
    if (template.matchDepartments.includes(dept)) {
      relevanceScore += 1.5;
    }
  }

  // Objective match
  for (const obj of state.goals.primaryObjectives) {
    if (template.matchObjectives.includes(obj)) {
      relevanceScore += 1.5;
      relevantGoals.push(obj);
    }
  }

  // Bottleneck match
  for (const bottleneck of state.painPoints.bottlenecks) {
    if (template.matchBottleneckIds.includes(bottleneck.id)) {
      relevanceScore += bottleneck.severity * 0.5;
      relevantPainPoints.push(bottleneck.label);
    }
  }

  // Manual task match (boost for high-hour error-prone tasks)
  const manualHours = state.painPoints.manualTasks
    .filter((t) => t.errorProne)
    .reduce((sum, t) => sum + t.hoursPerWeek, 0);
  if (manualHours > 10 && template.category === "automation") {
    relevanceScore += 1;
  }

  // Filter out low-relevance opportunities
  if (relevanceScore < 2) return null;

  // Adjust impact based on relevance
  const impactScore = clamp(Math.round(template.baseImpact * (0.7 + relevanceScore * 0.06)), 1, 10);

  // Adjust effort based on tech readiness
  const readinessAdj = (state.techStack.integrationReadiness - 3) * -0.5;
  const maturityAdj = state.techStack.dataMaturity === "advanced" ? -1 : state.techStack.dataMaturity === "minimal" ? 1 : 0;
  const effortScore = clamp(Math.round(template.baseEffort + readinessAdj + maturityAdj), 1, 10);

  const priorityScore = Math.round((impactScore * (11 - effortScore)) / 10 * 10) / 10;

  return {
    id: template.id,
    title: template.title,
    description: template.description,
    category: template.category,
    impactScore,
    effortScore,
    priorityScore,
    relevantPainPoints,
    relevantGoals,
    estimatedROI: template.estimatedROI,
  };
}

function buildRoadmap(opportunities: AIOpportunity[]): RoadmapPhase[] {
  const quickWins = opportunities.filter((o) => o.priorityScore >= 6);
  const mediumTerm = opportunities.filter((o) => o.priorityScore >= 4 && o.priorityScore < 6);
  const strategic = opportunities.filter((o) => o.priorityScore < 4);

  const phases: RoadmapPhase[] = [];

  if (quickWins.length > 0) {
    phases.push({
      phase: "1",
      title: "Quick Wins",
      timeframe: "0-3 months",
      opportunities: quickWins,
    });
  }

  if (mediumTerm.length > 0) {
    phases.push({
      phase: "2",
      title: "Medium-Term Initiatives",
      timeframe: "3-6 months",
      opportunities: mediumTerm,
    });
  }

  if (strategic.length > 0) {
    phases.push({
      phase: "3",
      title: "Strategic Investments",
      timeframe: "6-12+ months",
      opportunities: strategic,
    });
  }

  return phases;
}

export function analyzeDiscovery(state: DiscoveryState): AnalysisResult {
  const overallReadiness = computeReadiness(state);

  const opportunities = OPPORTUNITY_CATALOG
    .map((template) => scoreOpportunity(template, state))
    .filter((o): o is AIOpportunity => o !== null)
    .sort((a, b) => b.priorityScore - a.priorityScore);

  const roadmap = buildRoadmap(opportunities);

  return { overallReadiness, opportunities, roadmap };
}
