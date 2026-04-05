import type { OpportunityCategory } from "@/types/discovery";

export interface ServiceTier {
  name: string;
  monthlyCost: string;
  features: string[];
}

export interface AIService {
  id: string;
  name: string;
  vendor: string;
  description: string;
  category: "platform" | "point_solution" | "api";
  websiteHint: string;
  /** Which opportunity IDs this service can address */
  addressesOpportunities: string[];
  /** Which opportunity categories this service covers */
  coverageCategories: OpportunityCategory[];
  tiers: ServiceTier[];
  implementationTimeWeeks: number;
  strengths: string[];
  considerations: string[];
}

export const SERVICE_CATALOG: AIService[] = [
  // === BROAD PLATFORMS (solve many problems) ===
  {
    id: "microsoft-copilot",
    name: "Microsoft 365 Copilot",
    vendor: "Microsoft",
    description: "AI assistant embedded across Word, Excel, Outlook, Teams, and PowerPoint. Automates content generation, data analysis, email drafting, meeting summaries, and workflow automation.",
    category: "platform",
    websiteHint: "microsoft.com/copilot",
    addressesOpportunities: ["auto_reporting", "content_generation", "doc_processing", "knowledge_management", "smart_scheduling"],
    coverageCategories: ["automation", "generative_ai"],
    tiers: [
      { name: "Copilot for M365", monthlyCost: "$30/user/mo", features: ["All M365 app integration", "Meeting summaries", "Email drafting", "Excel analysis", "PowerPoint generation"] },
    ],
    implementationTimeWeeks: 2,
    strengths: ["Already integrated into tools most businesses use", "Minimal training needed", "Covers document, email, reporting, and scheduling use cases simultaneously"],
    considerations: ["Requires Microsoft 365 E3/E5 licenses", "Quality depends on organizational data in Microsoft Graph"],
  },
  {
    id: "zapier-ai",
    name: "Zapier + AI Actions",
    vendor: "Zapier",
    description: "No-code automation platform connecting 6,000+ apps with built-in AI actions for data extraction, summarization, classification, and workflow routing.",
    category: "platform",
    websiteHint: "zapier.com",
    addressesOpportunities: ["doc_processing", "auto_reporting", "smart_scheduling", "compliance_automation"],
    coverageCategories: ["automation"],
    tiers: [
      { name: "Professional", monthlyCost: "$49/mo", features: ["2,000 tasks/mo", "Multi-step Zaps", "AI actions"] },
      { name: "Team", monthlyCost: "$69/user/mo", features: ["Unlimited tasks", "Shared workspaces", "Premium apps", "AI-powered automation"] },
    ],
    implementationTimeWeeks: 1,
    strengths: ["Extremely fast to deploy", "Connects almost any SaaS tool", "No engineering resources needed", "Covers multiple automation needs with one subscription"],
    considerations: ["Complex logic can be hard to debug", "Per-task pricing can scale up"],
  },
  {
    id: "hubspot-ai",
    name: "HubSpot AI / Breeze",
    vendor: "HubSpot",
    description: "CRM platform with built-in AI for lead scoring, sales forecasting, content generation, customer service chatbot, and email automation.",
    category: "platform",
    websiteHint: "hubspot.com",
    addressesOpportunities: ["predictive_sales", "customer_chatbot", "content_generation", "sentiment_analysis", "auto_reporting"],
    coverageCategories: ["prediction", "generative_ai", "analytics"],
    tiers: [
      { name: "Professional", monthlyCost: "$800/mo", features: ["AI lead scoring", "Sales forecasting", "Content AI", "Custom reporting"] },
      { name: "Enterprise", monthlyCost: "$3,600/mo", features: ["Predictive lead scoring", "Advanced AI", "Custom objects", "Revenue attribution"] },
    ],
    implementationTimeWeeks: 4,
    strengths: ["Consolidates CRM, marketing, sales, and service AI into one platform", "Strong lead scoring and forecasting", "Built-in chatbot for customer service"],
    considerations: ["Significant investment for full suite", "Migration from existing CRM needed", "Best value when replacing multiple point solutions"],
  },
  {
    id: "make-automation",
    name: "Make (formerly Integromat)",
    vendor: "Make",
    description: "Visual automation platform for building complex workflows with AI modules for document processing, data transformation, and multi-system orchestration.",
    category: "platform",
    websiteHint: "make.com",
    addressesOpportunities: ["doc_processing", "auto_reporting", "smart_scheduling", "compliance_automation"],
    coverageCategories: ["automation"],
    tiers: [
      { name: "Pro", monthlyCost: "$16/mo", features: ["10,000 ops/mo", "Unlimited scenarios", "AI modules"] },
      { name: "Teams", monthlyCost: "$29/user/mo", features: ["Unlimited ops", "Team collaboration", "Priority support"] },
    ],
    implementationTimeWeeks: 1,
    strengths: ["Very cost-effective", "Visual workflow builder", "More complex logic than Zapier", "Good for document processing flows"],
    considerations: ["Steeper learning curve than Zapier", "Smaller app ecosystem"],
  },

  // === CUSTOMER-FACING AI ===
  {
    id: "intercom-fin",
    name: "Intercom Fin AI Agent",
    vendor: "Intercom",
    description: "AI customer service agent that resolves support inquiries automatically using your knowledge base, with seamless handoff to human agents.",
    category: "point_solution",
    websiteHint: "intercom.com",
    addressesOpportunities: ["customer_chatbot", "sentiment_analysis", "knowledge_management"],
    coverageCategories: ["generative_ai", "analytics"],
    tiers: [
      { name: "Essential", monthlyCost: "$29/seat/mo", features: ["Fin AI Agent", "Shared inbox", "Knowledge base"] },
      { name: "Advanced", monthlyCost: "$85/seat/mo", features: ["AI-first workflows", "Sentiment analysis", "Custom reporting"] },
    ],
    implementationTimeWeeks: 2,
    strengths: ["Best-in-class AI resolution rates (up to 50%)", "Covers customer service AND internal knowledge base", "Sentiment analysis included"],
    considerations: ["Per-seat pricing adds up with large support teams", "Need good knowledge base content to be effective"],
  },
  {
    id: "zendesk-ai",
    name: "Zendesk AI",
    vendor: "Zendesk",
    description: "AI-powered customer service suite with automated ticket routing, AI agents, sentiment analysis, and predictive analytics for support operations.",
    category: "point_solution",
    websiteHint: "zendesk.com",
    addressesOpportunities: ["customer_chatbot", "sentiment_analysis"],
    coverageCategories: ["generative_ai", "analytics"],
    tiers: [
      { name: "Suite Professional", monthlyCost: "$115/agent/mo", features: ["AI agents", "Auto-routing", "Analytics", "Sentiment detection"] },
    ],
    implementationTimeWeeks: 3,
    strengths: ["Mature platform with strong analytics", "Good for enterprises with complex support needs"],
    considerations: ["Higher price point", "Can be complex to configure"],
  },

  // === DOCUMENT & DATA PROCESSING ===
  {
    id: "docsumo",
    name: "Docsumo",
    vendor: "Docsumo",
    description: "AI-powered document data extraction for invoices, receipts, bank statements, and forms with 99% accuracy and direct integrations to accounting tools.",
    category: "point_solution",
    websiteHint: "docsumo.com",
    addressesOpportunities: ["doc_processing", "compliance_automation"],
    coverageCategories: ["automation"],
    tiers: [
      { name: "Growth", monthlyCost: "$500/mo", features: ["2,500 documents/mo", "Pre-built models", "API access", "Accounting integrations"] },
      { name: "Business", monthlyCost: "$2,000/mo", features: ["10,000 documents/mo", "Custom models", "Priority support"] },
    ],
    implementationTimeWeeks: 2,
    strengths: ["Very high accuracy on financial documents", "Pre-built models for common document types", "Direct integration with QuickBooks, Xero, etc."],
    considerations: ["Specialized for document processing only", "Custom document types require training"],
  },

  // === ANALYTICS & PREDICTION ===
  {
    id: "obviously-ai",
    name: "Obviously AI",
    vendor: "Obviously AI",
    description: "No-code predictive analytics platform that builds ML models from your data in minutes. Covers sales forecasting, churn prediction, demand planning, and more.",
    category: "point_solution",
    websiteHint: "obviously.ai",
    addressesOpportunities: ["predictive_sales", "supply_chain", "fraud_detection"],
    coverageCategories: ["prediction", "analytics"],
    tiers: [
      { name: "Starter", monthlyCost: "$75/mo", features: ["Unlimited predictions", "Data connectors", "Basic models"] },
      { name: "Professional", monthlyCost: "$250/mo", features: ["Advanced models", "API deployment", "Team collaboration"] },
    ],
    implementationTimeWeeks: 1,
    strengths: ["No data science team needed", "Build predictive models in minutes", "Covers forecasting, churn, fraud, and demand planning with one tool"],
    considerations: ["Limited customization vs. custom ML", "Data quality heavily impacts results"],
  },
  {
    id: "pecan-ai",
    name: "Pecan AI",
    vendor: "Pecan",
    description: "Predictive analytics platform for business teams. Automates model building for revenue forecasting, customer lifetime value, churn, and demand prediction.",
    category: "point_solution",
    websiteHint: "pecan.ai",
    addressesOpportunities: ["predictive_sales", "supply_chain"],
    coverageCategories: ["prediction"],
    tiers: [
      { name: "Business", monthlyCost: "Custom pricing", features: ["Automated ML", "Revenue prediction", "Churn models", "SQL-based"] },
    ],
    implementationTimeWeeks: 3,
    strengths: ["Enterprise-grade predictions", "Handles large datasets", "SQL-friendly for analysts"],
    considerations: ["Custom pricing requires sales call", "Better suited for mid-market and up"],
  },

  // === HR & RECRUITING ===
  {
    id: "manatal",
    name: "Manatal",
    vendor: "Manatal",
    description: "AI-powered ATS and recruitment platform with AI resume screening, candidate scoring, and job-to-candidate matching.",
    category: "point_solution",
    websiteHint: "manatal.com",
    addressesOpportunities: ["resume_screening"],
    coverageCategories: ["automation"],
    tiers: [
      { name: "Professional", monthlyCost: "$15/user/mo", features: ["AI recommendations", "Resume parsing", "Candidate scoring", "Career page"] },
      { name: "Enterprise", monthlyCost: "$35/user/mo", features: ["Advanced AI matching", "Compliance", "Custom workflows", "API access"] },
    ],
    implementationTimeWeeks: 1,
    strengths: ["Very affordable", "AI screening reduces time-to-hire by 50%+", "Easy to deploy"],
    considerations: ["Focused solely on recruiting", "May overlap with existing ATS"],
  },

  // === OPERATIONS & OPTIMIZATION ===
  {
    id: "celonis",
    name: "Celonis",
    vendor: "Celonis",
    description: "Process mining and execution management platform that analyzes workflows from system logs, identifies bottlenecks, and automates process improvements.",
    category: "platform",
    websiteHint: "celonis.com",
    addressesOpportunities: ["process_mining", "supply_chain", "compliance_automation"],
    coverageCategories: ["analytics", "optimization"],
    tiers: [
      { name: "Business", monthlyCost: "Custom pricing", features: ["Process mining", "Conformance checking", "Automation recommendations", "Execution management"] },
    ],
    implementationTimeWeeks: 6,
    strengths: ["Gold standard for process mining", "Discovers issues you didn't know existed", "Covers process optimization AND supply chain AND compliance"],
    considerations: ["Enterprise pricing", "Requires good system logs/data", "Longer implementation"],
  },
  {
    id: "uptake",
    name: "Uptake",
    vendor: "Uptake Technologies",
    description: "Industrial AI platform for predictive maintenance, asset performance management, and operational optimization for manufacturing and heavy industry.",
    category: "point_solution",
    websiteHint: "uptake.com",
    addressesOpportunities: ["predictive_maintenance", "quality_inspection"],
    coverageCategories: ["prediction", "optimization"],
    tiers: [
      { name: "Enterprise", monthlyCost: "Custom pricing", features: ["Predictive maintenance", "Asset health scoring", "Failure prediction", "IoT integration"] },
    ],
    implementationTimeWeeks: 8,
    strengths: ["Purpose-built for industrial use cases", "Covers both predictive maintenance AND quality inspection", "Proven ROI in manufacturing"],
    considerations: ["Requires sensor/IoT data", "Custom pricing", "Longer deployment for full value"],
  },

  // === CONTENT & MARKETING ===
  {
    id: "jasper-ai",
    name: "Jasper",
    vendor: "Jasper AI",
    description: "Enterprise AI content platform for marketing teams. Generates brand-consistent copy, campaigns, social posts, and product descriptions at scale.",
    category: "point_solution",
    websiteHint: "jasper.ai",
    addressesOpportunities: ["content_generation"],
    coverageCategories: ["generative_ai"],
    tiers: [
      { name: "Creator", monthlyCost: "$49/seat/mo", features: ["Brand voice", "AI content generation", "SEO mode", "Templates"] },
      { name: "Pro", monthlyCost: "$69/seat/mo", features: ["Brand knowledge", "AI image generation", "Analytics", "Collaboration"] },
    ],
    implementationTimeWeeks: 1,
    strengths: ["Maintains brand voice consistency", "Built specifically for marketing teams", "Very fast to deploy"],
    considerations: ["Marketing-focused only", "Content still needs human review"],
  },
];
