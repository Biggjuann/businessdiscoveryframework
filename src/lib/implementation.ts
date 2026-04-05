import type { ClientReport } from "./report-export";
import type { ImplementationPlan, OpportunityImplementation, ImplementationTask } from "@/types/implementation";
import type { AIOpportunity } from "@/types/discovery";

function generateTasks(opportunity: AIOpportunity, phase: string): ImplementationTask[] {
  const baseTasks: { title: string; description: string }[] = [];

  // Discovery & scoping tasks
  baseTasks.push({
    title: "Requirements gathering & stakeholder interviews",
    description: `Meet with client stakeholders to define detailed requirements for ${opportunity.title}. Document current workflow, data sources, and success criteria.`,
  });

  baseTasks.push({
    title: "Data audit & readiness assessment",
    description: `Evaluate the client's data quality, availability, and format for ${opportunity.title}. Identify gaps and remediation steps.`,
  });

  // Implementation tasks based on category
  if (opportunity.category === "automation") {
    baseTasks.push({
      title: "Map existing process & identify automation points",
      description: "Document the current manual process step-by-step. Identify which steps can be automated and which require human oversight.",
    });
    baseTasks.push({
      title: "Configure & deploy automation pipeline",
      description: "Set up the automation workflow, configure integrations, and deploy to staging environment for testing.",
    });
  } else if (opportunity.category === "analytics" || opportunity.category === "prediction") {
    baseTasks.push({
      title: "Data pipeline & model development",
      description: "Build data ingestion pipeline, perform feature engineering, and develop/train the predictive model or analytics dashboard.",
    });
    baseTasks.push({
      title: "Model validation & accuracy testing",
      description: "Validate model performance against historical data. Iterate on features and parameters to meet accuracy targets.",
    });
  } else if (opportunity.category === "generative_ai") {
    baseTasks.push({
      title: "Prompt engineering & knowledge base setup",
      description: "Design prompt templates, configure the knowledge base with client-specific data, and set up guardrails.",
    });
    baseTasks.push({
      title: "Integration with existing systems",
      description: "Connect the AI system to client's existing tools (CRM, helpdesk, etc.) via APIs. Configure data flow and triggers.",
    });
  } else if (opportunity.category === "optimization") {
    baseTasks.push({
      title: "Baseline measurement & constraint modeling",
      description: "Measure current performance metrics. Model constraints, objectives, and decision variables for the optimization problem.",
    });
    baseTasks.push({
      title: "Algorithm implementation & simulation",
      description: "Implement the optimization algorithm, run simulations against historical scenarios, and validate improvements.",
    });
  }

  // Universal closing tasks
  baseTasks.push({
    title: "UAT & client training",
    description: "Conduct user acceptance testing with client team. Provide training materials and hands-on sessions.",
  });

  baseTasks.push({
    title: "Go-live & monitoring setup",
    description: "Deploy to production, configure monitoring and alerting, and establish the feedback loop for continuous improvement.",
  });

  const priorityMap: Record<string, "critical" | "high" | "medium" | "low"> = {
    "1": "critical",
    "2": "critical",
    "3": "high",
  };

  return baseTasks.map((task, index) => ({
    id: `${opportunity.id}-task-${index}`,
    opportunityId: opportunity.id,
    title: task.title,
    description: task.description,
    status: "not_started" as const,
    priority: priorityMap[phase] ?? "medium",
    assignee: "",
    notes: "",
    dueDate: "",
  }));
}

export function buildImplementationPlan(report: ClientReport): ImplementationPlan {
  const opportunities: OpportunityImplementation[] = [];

  for (const phase of report.analysis.roadmap) {
    for (const opp of phase.opportunities) {
      opportunities.push({
        opportunity: opp,
        phase: phase.phase,
        tasks: generateTasks(opp, phase.phase),
        clientNotes: "",
        status: "not_started",
      });
    }
  }

  return {
    clientName: report.client.companyOverview.companyName,
    industry: report.client.companyOverview.industry,
    readinessScore: report.analysis.overallReadiness,
    createdAt: new Date().toISOString(),
    opportunities,
  };
}
