import type { AIOpportunity } from "@/types/discovery";
import type { ClientReport } from "./report-export";
import { SERVICE_CATALOG, type AIService } from "./service-catalog";

export interface ServiceMatch {
  service: AIService;
  /** Which of the client's opportunities this service addresses */
  addressedOpportunities: AIOpportunity[];
  /** How many client opportunities it covers */
  coverageCount: number;
  /** Weighted score: coverage * avg priority of addressed opportunities */
  consolidationScore: number;
  /** Is this the recommended tier? */
  recommendedTier: string;
}

export interface ServiceRecommendation {
  /** Services ordered by consolidation value (most issues solved per dollar) */
  rankedServices: ServiceMatch[];
  /** The optimal bundle: fewest services covering the most opportunities */
  optimalBundle: ServiceMatch[];
  /** Opportunities not covered by any service in the catalog */
  uncoveredOpportunities: AIOpportunity[];
  /** Total opportunities the bundle covers */
  bundleCoverage: number;
  /** Total opportunities from the report */
  totalOpportunities: number;
}

function matchServices(opportunities: AIOpportunity[]): ServiceMatch[] {
  const oppIds = new Set(opportunities.map((o) => o.id));
  const matches: ServiceMatch[] = [];

  for (const service of SERVICE_CATALOG) {
    const addressed = opportunities.filter((o) =>
      service.addressesOpportunities.includes(o.id)
    );

    if (addressed.length === 0) continue;

    const avgPriority =
      addressed.reduce((sum, o) => sum + o.priorityScore, 0) / addressed.length;

    // Consolidation score: rewards services that solve many high-priority issues
    const consolidationScore = Math.round(addressed.length * avgPriority * 10) / 10;

    // Pick recommended tier: smallest tier that covers the needs
    const recommendedTier = service.tiers.length > 1
      ? service.tiers[Math.min(1, service.tiers.length - 1)].name
      : service.tiers[0].name;

    matches.push({
      service,
      addressedOpportunities: addressed,
      coverageCount: addressed.length,
      consolidationScore,
      recommendedTier,
    });
  }

  // Sort by consolidation score (most value per service)
  return matches.sort((a, b) => b.consolidationScore - a.consolidationScore);
}

function buildOptimalBundle(
  rankedServices: ServiceMatch[],
  opportunities: AIOpportunity[]
): { bundle: ServiceMatch[]; uncovered: AIOpportunity[] } {
  const coveredIds = new Set<string>();
  const bundle: ServiceMatch[] = [];

  // Greedy set cover: pick the service that covers the most uncovered opportunities,
  // weighted by priority
  const remaining = [...rankedServices];

  while (remaining.length > 0) {
    // Re-score based on uncovered opportunities only
    let bestIdx = -1;
    let bestScore = 0;

    for (let i = 0; i < remaining.length; i++) {
      const uncoveredAddressed = remaining[i].addressedOpportunities.filter(
        (o) => !coveredIds.has(o.id)
      );
      if (uncoveredAddressed.length === 0) continue;

      const avgPriority =
        uncoveredAddressed.reduce((sum, o) => sum + o.priorityScore, 0) /
        uncoveredAddressed.length;
      const score = uncoveredAddressed.length * avgPriority;

      if (score > bestScore) {
        bestScore = score;
        bestIdx = i;
      }
    }

    if (bestIdx === -1) break;

    const selected = remaining[bestIdx];
    bundle.push(selected);
    for (const o of selected.addressedOpportunities) {
      coveredIds.add(o.id);
    }
    remaining.splice(bestIdx, 1);

    // Stop if all opportunities are covered
    if (coveredIds.size >= opportunities.length) break;
  }

  const uncovered = opportunities.filter((o) => !coveredIds.has(o.id));

  return { bundle, uncovered };
}

export function recommendServices(report: ClientReport): ServiceRecommendation {
  const opportunities = report.analysis.opportunities;
  const rankedServices = matchServices(opportunities);
  const { bundle, uncovered } = buildOptimalBundle(rankedServices, opportunities);

  return {
    rankedServices,
    optimalBundle: bundle,
    uncoveredOpportunities: uncovered,
    bundleCoverage: opportunities.length - uncovered.length,
    totalOpportunities: opportunities.length,
  };
}
