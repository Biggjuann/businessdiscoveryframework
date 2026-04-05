import type { DataMaturity, EmployeeRange, BudgetRange, RevenueRange } from "@/types/discovery";

export function dataMaturityScore(maturity: DataMaturity | ""): number {
  const scores: Record<string, number> = { minimal: 15, basic: 35, intermediate: 65, advanced: 90 };
  return scores[maturity] ?? 0;
}

export function employeeCapacityScore(range: EmployeeRange | ""): number {
  const scores: Record<string, number> = { "1-10": 30, "11-50": 50, "51-200": 70, "201-1000": 85, "1000+": 95 };
  return scores[range] ?? 0;
}

export function budgetScore(range: BudgetRange | ""): number {
  const scores: Record<string, number> = {
    under_10k: 20, "10k_50k": 40, "50k_200k": 60, "200k_500k": 80, "500k_plus": 95,
  };
  return scores[range] ?? 0;
}

export function revenueScore(range: RevenueRange | ""): number {
  const scores: Record<string, number> = {
    under_500k: 20, "500k_1m": 35, "1m_5m": 50, "5m_20m": 70, "20m_100m": 85, "100m_plus": 95,
  };
  return scores[range] ?? 0;
}

export function weightedAverage(values: { score: number; weight: number }[]): number {
  const totalWeight = values.reduce((sum, v) => sum + v.weight, 0);
  if (totalWeight === 0) return 0;
  return Math.round(values.reduce((sum, v) => sum + v.score * v.weight, 0) / totalWeight);
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
