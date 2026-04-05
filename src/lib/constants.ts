import type { Industry, EmployeeRange, RevenueRange, BudgetRange, Timeline, DataMaturity, Department, Objective } from "@/types/discovery";

export const STEPS = [
  { id: 0, title: "Company Overview", description: "Tell us about your business" },
  { id: 1, title: "Current Workflows", description: "How does your team work today?" },
  { id: 2, title: "Pain Points", description: "Where are the biggest challenges?" },
  { id: 3, title: "Goals & Priorities", description: "What outcomes matter most?" },
  { id: 4, title: "Technology & Data", description: "What's your current tech landscape?" },
];

export const INDUSTRIES: { value: Industry; label: string }[] = [
  { value: "healthcare", label: "Healthcare" },
  { value: "finance", label: "Finance & Banking" },
  { value: "retail", label: "Retail & E-Commerce" },
  { value: "manufacturing", label: "Manufacturing" },
  { value: "technology", label: "Technology" },
  { value: "education", label: "Education" },
  { value: "real_estate", label: "Real Estate" },
  { value: "logistics", label: "Logistics & Supply Chain" },
  { value: "professional_services", label: "Professional Services" },
  { value: "hospitality", label: "Hospitality & Travel" },
  { value: "other", label: "Other" },
];

export const EMPLOYEE_RANGES: { value: EmployeeRange; label: string }[] = [
  { value: "1-10", label: "1-10 employees" },
  { value: "11-50", label: "11-50 employees" },
  { value: "51-200", label: "51-200 employees" },
  { value: "201-1000", label: "201-1,000 employees" },
  { value: "1000+", label: "1,000+ employees" },
];

export const REVENUE_RANGES: { value: RevenueRange; label: string }[] = [
  { value: "under_500k", label: "Under $500K" },
  { value: "500k_1m", label: "$500K - $1M" },
  { value: "1m_5m", label: "$1M - $5M" },
  { value: "5m_20m", label: "$5M - $20M" },
  { value: "20m_100m", label: "$20M - $100M" },
  { value: "100m_plus", label: "$100M+" },
];

export const BUDGET_RANGES: { value: BudgetRange; label: string }[] = [
  { value: "under_10k", label: "Under $10K" },
  { value: "10k_50k", label: "$10K - $50K" },
  { value: "50k_200k", label: "$50K - $200K" },
  { value: "200k_500k", label: "$200K - $500K" },
  { value: "500k_plus", label: "$500K+" },
];

export const TIMELINES: { value: Timeline; label: string }[] = [
  { value: "3_months", label: "3 months" },
  { value: "6_months", label: "6 months" },
  { value: "12_months", label: "12 months" },
  { value: "18_months_plus", label: "18+ months" },
];

export const DATA_MATURITY_LEVELS: { value: DataMaturity; label: string; description: string }[] = [
  { value: "minimal", label: "Minimal", description: "Mostly paper-based or disconnected spreadsheets" },
  { value: "basic", label: "Basic", description: "Some digital records, limited structure" },
  { value: "intermediate", label: "Intermediate", description: "Structured databases, some integration between systems" },
  { value: "advanced", label: "Advanced", description: "Centralized data platform, APIs, data governance in place" },
];

export const DEPARTMENTS: { value: Department; label: string }[] = [
  { value: "sales", label: "Sales" },
  { value: "marketing", label: "Marketing" },
  { value: "operations", label: "Operations" },
  { value: "finance", label: "Finance & Accounting" },
  { value: "hr", label: "Human Resources" },
  { value: "customer_support", label: "Customer Support" },
  { value: "engineering", label: "Engineering / IT" },
  { value: "logistics", label: "Logistics / Supply Chain" },
  { value: "legal", label: "Legal & Compliance" },
];

export const OBJECTIVES: { value: Objective; label: string }[] = [
  { value: "reduce_costs", label: "Reduce operational costs" },
  { value: "increase_revenue", label: "Increase revenue" },
  { value: "improve_efficiency", label: "Improve process efficiency" },
  { value: "enhance_customer_experience", label: "Enhance customer experience" },
  { value: "reduce_errors", label: "Reduce errors and improve quality" },
  { value: "scale_operations", label: "Scale operations without proportional headcount" },
  { value: "improve_decision_making", label: "Improve data-driven decision making" },
  { value: "accelerate_innovation", label: "Accelerate innovation" },
];

export const BOTTLENECK_TEMPLATES = [
  { id: "data_entry", label: "Manual data entry and transfer between systems" },
  { id: "reporting", label: "Report generation and data compilation" },
  { id: "approval_workflows", label: "Approval workflows and routing" },
  { id: "customer_response", label: "Customer inquiry response times" },
  { id: "inventory_management", label: "Inventory tracking and management" },
  { id: "scheduling", label: "Scheduling and resource allocation" },
  { id: "document_processing", label: "Document review and processing" },
  { id: "quality_control", label: "Quality control and inspection" },
  { id: "lead_qualification", label: "Lead qualification and scoring" },
  { id: "compliance_monitoring", label: "Compliance monitoring and reporting" },
];

export const CURRENT_SYSTEMS = [
  "CRM (Salesforce, HubSpot, etc.)",
  "ERP System",
  "Accounting Software",
  "Project Management Tools",
  "Communication Platforms",
  "Custom Internal Software",
  "Spreadsheets / Manual Tracking",
  "E-commerce Platform",
  "HR / Payroll System",
  "Business Intelligence Tools",
];

export const PROCESS_FREQUENCIES = [
  { value: "daily" as const, label: "Daily" },
  { value: "weekly" as const, label: "Weekly" },
  { value: "monthly" as const, label: "Monthly" },
  { value: "quarterly" as const, label: "Quarterly" },
];

export const EFFORT_LEVELS = [
  { value: "low" as const, label: "Low" },
  { value: "medium" as const, label: "Medium" },
  { value: "high" as const, label: "High" },
];
