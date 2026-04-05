export type Industry =
  | "healthcare"
  | "finance"
  | "retail"
  | "manufacturing"
  | "technology"
  | "education"
  | "real_estate"
  | "logistics"
  | "professional_services"
  | "hospitality"
  | "other";

export type EmployeeRange = "1-10" | "11-50" | "51-200" | "201-1000" | "1000+";

export type RevenueRange =
  | "under_500k"
  | "500k_1m"
  | "1m_5m"
  | "5m_20m"
  | "20m_100m"
  | "100m_plus";

export type BudgetRange =
  | "under_10k"
  | "10k_50k"
  | "50k_200k"
  | "200k_500k"
  | "500k_plus";

export type Timeline = "3_months" | "6_months" | "12_months" | "18_months_plus";

export type DataMaturity = "minimal" | "basic" | "intermediate" | "advanced";

export type Department =
  | "sales"
  | "marketing"
  | "operations"
  | "finance"
  | "hr"
  | "customer_support"
  | "engineering"
  | "logistics"
  | "legal";

export type Objective =
  | "reduce_costs"
  | "increase_revenue"
  | "improve_efficiency"
  | "enhance_customer_experience"
  | "reduce_errors"
  | "scale_operations"
  | "improve_decision_making"
  | "accelerate_innovation";

export type OpportunityCategory =
  | "automation"
  | "analytics"
  | "generative_ai"
  | "prediction"
  | "optimization";

export interface CompanyOverview {
  companyName: string;
  industry: Industry | "";
  employeeCount: EmployeeRange | "";
  annualRevenue: RevenueRange | "";
  description: string;
}

export interface Process {
  name: string;
  frequency: "daily" | "weekly" | "monthly" | "quarterly";
  manualEffort: "low" | "medium" | "high";
}

export interface WorkflowInfo {
  departments: Department[];
  keyProcesses: Process[];
  currentTools: string[];
}

export interface Bottleneck {
  id: string;
  label: string;
  severity: number; // 1-5
}

export interface ManualTask {
  name: string;
  hoursPerWeek: number;
  errorProne: boolean;
}

export interface PainPoints {
  bottlenecks: Bottleneck[];
  manualTasks: ManualTask[];
  biggestChallenges: string;
}

export interface Goals {
  primaryObjectives: Objective[];
  timeline: Timeline | "";
  budgetRange: BudgetRange | "";
  successMetrics: string;
}

export interface TechStack {
  currentSystems: string[];
  dataMaturity: DataMaturity | "";
  integrationReadiness: number; // 1-5
  existingAI: boolean;
}

export interface DiscoveryState {
  currentStep: number;
  companyOverview: CompanyOverview;
  workflows: WorkflowInfo;
  painPoints: PainPoints;
  goals: Goals;
  techStack: TechStack;
  isComplete: boolean;
}

export interface AIOpportunity {
  id: string;
  title: string;
  description: string;
  category: OpportunityCategory;
  impactScore: number;
  effortScore: number;
  priorityScore: number;
  relevantPainPoints: string[];
  relevantGoals: string[];
  estimatedROI: string;
}

export interface RoadmapPhase {
  phase: string;
  title: string;
  timeframe: string;
  opportunities: AIOpportunity[];
}

export interface AnalysisResult {
  overallReadiness: number;
  opportunities: AIOpportunity[];
  roadmap: RoadmapPhase[];
}

export type DiscoveryAction =
  | { type: "SET_COMPANY_OVERVIEW"; payload: CompanyOverview }
  | { type: "SET_WORKFLOWS"; payload: WorkflowInfo }
  | { type: "SET_PAIN_POINTS"; payload: PainPoints }
  | { type: "SET_GOALS"; payload: Goals }
  | { type: "SET_TECH_STACK"; payload: TechStack }
  | { type: "SET_STEP"; payload: number }
  | { type: "NEXT_STEP" }
  | { type: "PREV_STEP" }
  | { type: "MARK_COMPLETE" }
  | { type: "RESET" };
