import type { AIOpportunity } from "./discovery";

export type TaskStatus = "not_started" | "in_progress" | "blocked" | "completed";
export type TaskPriority = "critical" | "high" | "medium" | "low";

export interface ImplementationTask {
  id: string;
  opportunityId: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  notes: string;
  dueDate: string;
}

export interface OpportunityImplementation {
  opportunity: AIOpportunity;
  phase: string;
  tasks: ImplementationTask[];
  clientNotes: string;
  status: TaskStatus;
}

export interface ImplementationPlan {
  clientName: string;
  industry: string;
  readinessScore: number;
  createdAt: string;
  opportunities: OpportunityImplementation[];
}
