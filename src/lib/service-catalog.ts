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
  addressesOpportunities: string[];
  coverageCategories: OpportunityCategory[];
  tiers: ServiceTier[];
  implementationTimeWeeks: number;
  strengths: string[];
  considerations: string[];
  budgetTier: "budget" | "mid" | "premium";
  alternativeId?: string;
}

export const SERVICE_CATALOG: AIService[] = [
  // ============================================
  // BROAD PLATFORMS
  // ============================================

  // --- Microsoft Copilot (mid) → Google Gemini (budget) ---
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
    budgetTier: "mid",
    alternativeId: "google-gemini-workspace",
  },
  {
    id: "google-gemini-workspace",
    name: "Google Workspace + Gemini",
    vendor: "Google",
    description: "Gemini AI built into Gmail, Docs, Sheets, Slides, and Meet. Drafts emails, generates documents, analyzes spreadsheet data, creates presentations, and summarizes meetings.",
    category: "platform",
    websiteHint: "workspace.google.com",
    addressesOpportunities: ["auto_reporting", "content_generation", "doc_processing", "knowledge_management", "smart_scheduling"],
    coverageCategories: ["automation", "generative_ai"],
    tiers: [
      { name: "Business Starter + Gemini", monthlyCost: "$14/user/mo", features: ["Gemini in Docs, Sheets, Gmail", "Meeting summaries", "30GB storage"] },
      { name: "Business Standard + Gemini", monthlyCost: "$20/user/mo", features: ["Everything in Starter", "2TB storage", "Advanced Gemini features", "AppSheet automation"] },
    ],
    implementationTimeWeeks: 1,
    strengths: ["50-60% cheaper than Microsoft Copilot per user", "Familiar interface for Google-native businesses", "Includes Gemini at lower tiers", "Faster to deploy — no E3/E5 prerequisite"],
    considerations: ["Less powerful for Excel-heavy workflows (Sheets AI is newer)", "Smaller enterprise feature set than M365", "Less third-party integration depth"],
    budgetTier: "budget",
    alternativeId: "microsoft-copilot",
  },

  // --- Zapier (mid) → Make (budget) ---
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
    strengths: ["Largest app ecosystem (6,000+)", "Extremely intuitive interface", "No engineering resources needed"],
    considerations: ["Per-task pricing can scale up quickly", "Complex logic can be hard to debug"],
    budgetTier: "mid",
    alternativeId: "make-automation",
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
    strengths: ["67% cheaper than Zapier at Pro tier", "More powerful visual workflow builder", "Better for complex multi-step logic", "Handles data transformations natively"],
    considerations: ["Steeper learning curve — visual builder takes time to learn", "Smaller app catalog (~1,500 vs Zapier's 6,000)", "Community support vs Zapier's larger knowledge base"],
    budgetTier: "budget",
    alternativeId: "zapier-ai",
  },

  // --- HubSpot (premium) → Brevo (budget) ---
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
    strengths: ["All-in-one CRM, marketing, sales, and service", "Industry-leading AI lead scoring", "Massive integration ecosystem"],
    considerations: ["$800+/mo is a significant commitment for small businesses", "Migration from existing CRM is complex", "Best value only when fully replacing multiple tools"],
    budgetTier: "premium",
    alternativeId: "brevo-crm",
  },
  {
    id: "brevo-crm",
    name: "Brevo (formerly Sendinblue)",
    vendor: "Brevo",
    description: "All-in-one CRM and marketing platform with AI-powered email campaigns, lead scoring, chatbot, sales pipeline management, and marketing automation.",
    category: "platform",
    websiteHint: "brevo.com",
    addressesOpportunities: ["predictive_sales", "customer_chatbot", "content_generation", "auto_reporting"],
    coverageCategories: ["prediction", "generative_ai", "analytics"],
    tiers: [
      { name: "Free", monthlyCost: "$0/mo", features: ["300 emails/day", "CRM", "Chat widget", "Basic automation"] },
      { name: "Business", monthlyCost: "$65/mo", features: ["Unlimited emails", "AI content assistant", "Lead scoring", "Sales pipeline", "Advanced automation", "Chatbot"] },
    ],
    implementationTimeWeeks: 2,
    strengths: ["90%+ cheaper than HubSpot Professional", "Free tier to start immediately", "Covers CRM + email + chat + automation in one tool", "Good enough AI for most small business needs"],
    considerations: ["AI features are less sophisticated than HubSpot's", "No native sales forecasting — need manual reporting", "Smaller integration ecosystem", "Less robust reporting and analytics"],
    budgetTier: "budget",
    alternativeId: "hubspot-ai",
  },

  // ============================================
  // CUSTOMER-FACING AI
  // ============================================

  // --- Intercom (mid) → Tidio (budget) ---
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
    budgetTier: "mid",
    alternativeId: "tidio-ai",
  },
  {
    id: "tidio-ai",
    name: "Tidio AI Chatbot (Lyro)",
    vendor: "Tidio",
    description: "AI chatbot that learns from your FAQ and knowledge base to answer customer questions automatically. Includes live chat, ticketing, and multi-channel support.",
    category: "point_solution",
    websiteHint: "tidio.com",
    addressesOpportunities: ["customer_chatbot", "knowledge_management"],
    coverageCategories: ["generative_ai"],
    tiers: [
      { name: "Free", monthlyCost: "$0/mo", features: ["50 Lyro AI conversations/mo", "Live chat", "Ticketing", "Social integrations"] },
      { name: "Lyro AI", monthlyCost: "$39/mo", features: ["Unlimited AI conversations", "FAQ learning", "Smart routing", "Analytics"] },
    ],
    implementationTimeWeeks: 1,
    strengths: ["Free tier to validate before committing", "Flat pricing — not per-seat", "Fast setup (can be live in hours)", "Good for small teams handling <1,000 tickets/mo"],
    considerations: ["Less sophisticated AI than Intercom Fin", "No built-in sentiment analysis", "Limited enterprise features (no custom reporting)", "Fewer integrations with enterprise tools"],
    budgetTier: "budget",
    alternativeId: "intercom-fin",
  },

  // --- Zendesk (premium) ---
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
    budgetTier: "premium",
    alternativeId: "tidio-ai",
  },

  // ============================================
  // DOCUMENT & DATA PROCESSING
  // ============================================

  // --- Docsumo (premium) → Parseur (budget) ---
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
    considerations: ["$500/mo minimum is steep for low-volume processing", "Specialized for document processing only"],
    budgetTier: "premium",
    alternativeId: "parseur",
  },
  {
    id: "parseur",
    name: "Parseur",
    vendor: "Parseur",
    description: "AI document parser for emails, PDFs, and attachments. Extracts data from invoices, orders, leads, and notifications and sends it to your apps automatically.",
    category: "point_solution",
    websiteHint: "parseur.com",
    addressesOpportunities: ["doc_processing", "compliance_automation"],
    coverageCategories: ["automation"],
    tiers: [
      { name: "Starter", monthlyCost: "$39/mo", features: ["100 documents/mo", "Email parsing", "PDF extraction", "Zapier/Make integration"] },
      { name: "Professional", monthlyCost: "$69/mo", features: ["500 documents/mo", "Table extraction", "Multi-page docs", "Webhook support"] },
    ],
    implementationTimeWeeks: 1,
    strengths: ["90%+ cheaper than Docsumo", "Good enough accuracy for most small business documents", "Easy email-based workflow (forward emails to parse)", "Integrates with Zapier/Make for downstream automation"],
    considerations: ["Lower accuracy than Docsumo on complex financial documents", "Limited to email and PDF (no image/scan processing)", "No pre-built accounting integrations — need Zapier/Make as middleware", "Smaller volume limits per tier"],
    budgetTier: "budget",
    alternativeId: "docsumo",
  },

  // ============================================
  // ANALYTICS & PREDICTION
  // ============================================

  // --- Obviously AI (mid) → MonkeyLearn + Google Sheets (budget) ---
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
    budgetTier: "mid",
    alternativeId: "sheets-ml",
  },
  {
    id: "sheets-ml",
    name: "Google Sheets + Simple ML Add-on",
    vendor: "Google / Community",
    description: "Free machine learning add-ons for Google Sheets that enable basic prediction, classification, and forecasting directly in spreadsheets without any coding.",
    category: "point_solution",
    websiteHint: "workspace.google.com/marketplace",
    addressesOpportunities: ["predictive_sales", "supply_chain"],
    coverageCategories: ["prediction", "analytics"],
    tiers: [
      { name: "Free", monthlyCost: "$0/mo", features: ["Basic prediction models", "Classification", "Regression", "Works in Sheets"] },
    ],
    implementationTimeWeeks: 1,
    strengths: ["Completely free", "No new tool to learn — works inside Google Sheets", "Good enough for basic sales forecasting", "Zero vendor lock-in"],
    considerations: ["Accuracy significantly lower than dedicated ML platforms", "Limited to small datasets (Sheets row limits)", "No API deployment — manual process only", "No fraud detection capabilities", "Requires clean, well-structured data in Sheets"],
    budgetTier: "budget",
    alternativeId: "obviously-ai",
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
    budgetTier: "premium",
    alternativeId: "obviously-ai",
  },

  // ============================================
  // HR & RECRUITING
  // ============================================
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
    strengths: ["Very affordable at $15/user", "AI screening reduces time-to-hire by 50%+", "Easy to deploy"],
    considerations: ["Focused solely on recruiting", "May overlap with existing ATS"],
    budgetTier: "budget",
  },

  // ============================================
  // OPERATIONS & OPTIMIZATION
  // ============================================

  // --- Celonis (premium) → Process Street (budget) ---
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
    considerations: ["Enterprise pricing (typically $50K+/yr)", "Requires good system logs/data", "Longer implementation"],
    budgetTier: "premium",
    alternativeId: "process-street",
  },
  {
    id: "process-street",
    name: "Process Street",
    vendor: "Process Street",
    description: "AI-powered workflow and process management platform. Automates recurring checklists, approval workflows, and process documentation with AI assist.",
    category: "point_solution",
    websiteHint: "process.st",
    addressesOpportunities: ["process_mining", "compliance_automation"],
    coverageCategories: ["automation", "optimization"],
    tiers: [
      { name: "Startup", monthlyCost: "$100/mo", features: ["Unlimited workflows", "AI process creation", "Conditional logic", "Integrations"] },
      { name: "Pro", monthlyCost: "$415/mo", features: ["Advanced permissions", "Process analytics", "Audit trails", "API access"] },
    ],
    implementationTimeWeeks: 2,
    strengths: ["Fraction of Celonis cost", "Immediate value — no system log integration needed", "AI creates process templates from descriptions", "Good for compliance checklists and approvals"],
    considerations: ["Not true process mining — can't discover processes from system logs", "No supply chain optimization", "Process insights are manual, not data-driven", "Less powerful for complex enterprise workflows"],
    budgetTier: "budget",
    alternativeId: "celonis",
  },

  // --- Uptake (premium) → Fiix (budget) ---
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
    considerations: ["Requires sensor/IoT data", "Custom pricing (typically $25K+/yr)", "Longer deployment for full value"],
    budgetTier: "premium",
    alternativeId: "fiix-maintenance",
  },
  {
    id: "fiix-maintenance",
    name: "Fiix (by Rockwell Automation)",
    vendor: "Rockwell Automation",
    description: "AI-powered CMMS (maintenance management) that uses machine learning to optimize maintenance schedules, predict failures, and manage work orders.",
    category: "point_solution",
    websiteHint: "fiixsoftware.com",
    addressesOpportunities: ["predictive_maintenance"],
    coverageCategories: ["prediction"],
    tiers: [
      { name: "Free", monthlyCost: "$0/mo", features: ["Unlimited work orders", "Asset management", "Mobile app", "Basic reporting"] },
      { name: "Professional", monthlyCost: "$75/user/mo", features: ["AI maintenance scheduling", "Predictive analytics", "Advanced integrations", "Custom dashboards"] },
    ],
    implementationTimeWeeks: 3,
    strengths: ["Free tier for basic maintenance management", "Much cheaper than Uptake for small operations", "Backed by Rockwell Automation", "Good mobile app for field teams"],
    considerations: ["No quality inspection capabilities (maintenance only)", "AI features only in paid tier", "Less sophisticated prediction than Uptake's industrial AI", "Better for facilities/fleet than heavy manufacturing"],
    budgetTier: "budget",
    alternativeId: "uptake",
  },

  // ============================================
  // CONTENT & MARKETING
  // ============================================

  // --- Jasper (mid) → Canva AI (budget) ---
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
    budgetTier: "mid",
    alternativeId: "canva-ai",
  },
  {
    id: "canva-ai",
    name: "Canva + Magic Studio AI",
    vendor: "Canva",
    description: "Design and content platform with AI-powered text generation, image creation, brand kit management, social scheduling, and presentation builder.",
    category: "point_solution",
    websiteHint: "canva.com",
    addressesOpportunities: ["content_generation"],
    coverageCategories: ["generative_ai"],
    tiers: [
      { name: "Free", monthlyCost: "$0/mo", features: ["Basic AI text generation", "Limited Magic Studio", "5GB storage"] },
      { name: "Pro", monthlyCost: "$13/user/mo", features: ["Full Magic Studio AI", "Brand kit", "1TB storage", "Social scheduler", "AI image generation"] },
    ],
    implementationTimeWeeks: 1,
    strengths: ["Free tier available", "73% cheaper than Jasper per user", "Visual design + copy in one tool", "Team already likely knows Canva", "Includes social media scheduling"],
    considerations: ["AI copywriting less sophisticated than Jasper", "No SEO optimization mode", "Less control over brand voice in AI output", "Better for visual content than long-form writing"],
    budgetTier: "budget",
    alternativeId: "jasper-ai",
  },

  // ============================================
  // VOICE AGENTS
  // ============================================

  // --- Retell AI (mid) → Vapi (budget) ---
  {
    id: "retell-ai",
    name: "Retell AI",
    vendor: "Retell AI",
    description: "Voice AI platform for building and deploying conversational phone agents. Handles inbound/outbound calls with natural-sounding voices, call transfers, appointment booking, and CRM integration.",
    category: "point_solution",
    websiteHint: "retellai.com",
    addressesOpportunities: ["voice_agent", "customer_chatbot"],
    coverageCategories: ["generative_ai"],
    tiers: [
      { name: "Pay As You Go", monthlyCost: "$0.07-0.20/min", features: ["Unlimited agents", "Call recording", "Custom voices", "Webhooks"] },
      { name: "Enterprise", monthlyCost: "Custom pricing", features: ["Dedicated infrastructure", "SLA", "SSO", "Priority support"] },
    ],
    implementationTimeWeeks: 1,
    strengths: ["Best voice quality in the category", "Very fast to prototype (live in hours)", "Built-in call transfer and booking workflows", "Strong developer API for custom integrations"],
    considerations: ["Per-minute costs can add up at high volume", "Newer platform — smaller community", "Advanced flows require developer resources"],
    budgetTier: "mid",
    alternativeId: "vapi-ai",
  },
  {
    id: "vapi-ai",
    name: "Vapi",
    vendor: "Vapi",
    description: "Developer-first voice AI platform for building phone agents. Pay-per-minute pricing with support for custom LLMs, tool calling, and real-time voice conversations.",
    category: "point_solution",
    websiteHint: "vapi.ai",
    addressesOpportunities: ["voice_agent", "customer_chatbot"],
    coverageCategories: ["generative_ai"],
    tiers: [
      { name: "Pay As You Go", monthlyCost: "$0.05-0.15/min", features: ["Unlimited assistants", "Tool calling", "Custom LLM support", "Call recording"] },
      { name: "Pro", monthlyCost: "$50/mo + usage", features: ["Lower per-minute rates", "Analytics dashboard", "Priority support", "Team management"] },
    ],
    implementationTimeWeeks: 1,
    strengths: ["Cheapest per-minute rates in the market", "Bring your own LLM (OpenAI, Claude, etc.)", "Strong developer community", "Most flexible for custom workflows"],
    considerations: ["More technical to set up than Retell", "Voice quality slightly behind Retell", "Requires developer to build complex flows", "Dashboard/analytics less polished"],
    budgetTier: "budget",
    alternativeId: "retell-ai",
  },
  {
    id: "synthflow",
    name: "Synthflow",
    vendor: "Synthflow",
    description: "No-code AI voice agent builder. Create phone agents for appointment booking, lead qualification, and customer support without any coding — includes phone number provisioning.",
    category: "point_solution",
    websiteHint: "synthflow.ai",
    addressesOpportunities: ["voice_agent", "customer_chatbot", "smart_scheduling"],
    coverageCategories: ["generative_ai", "automation"],
    tiers: [
      { name: "Starter", monthlyCost: "$29/mo", features: ["50 minutes", "1 agent", "Phone number included", "No-code builder"] },
      { name: "Pro", monthlyCost: "$99/mo", features: ["500 minutes", "Unlimited agents", "CRM integrations", "Call transfers"] },
      { name: "Agency", monthlyCost: "$449/mo", features: ["5,000 minutes", "White-label", "Sub-accounts", "API access"] },
    ],
    implementationTimeWeeks: 1,
    strengths: ["True no-code — non-technical staff can build agents", "Phone number included in every plan", "Flat monthly pricing (predictable costs)", "Also covers scheduling use case"],
    considerations: ["Minute limits can be restrictive on lower tiers", "Less customizable than Vapi/Retell", "Voice quality adequate but not best-in-class", "Limited integration depth vs developer platforms"],
    budgetTier: "budget",
    alternativeId: "retell-ai",
  },

  // ============================================
  // SOCIAL MEDIA COMMENT MANAGEMENT
  // ============================================

  // --- Sprout Social (premium) → NapoleonCat (mid) → Manychat (budget) ---
  {
    id: "sprout-social",
    name: "Sprout Social",
    vendor: "Sprout Social",
    description: "Enterprise social media management platform with AI-powered comment moderation, sentiment analysis, automated responses, and unified inbox across all major platforms including Google Business, Meta, and TikTok.",
    category: "platform",
    websiteHint: "sproutsocial.com",
    addressesOpportunities: ["social_reply_agent", "sentiment_analysis", "content_generation"],
    coverageCategories: ["generative_ai", "analytics"],
    tiers: [
      { name: "Professional", monthlyCost: "$249/seat/mo", features: ["5 social profiles", "AI-assisted replies", "Unified inbox", "Review management", "Sentiment analysis", "TikTok + Meta + Google"] },
      { name: "Advanced", monthlyCost: "$399/seat/mo", features: ["Unlimited profiles", "Automated rules", "AI content suggestions", "Custom workflows", "Chatbots"] },
    ],
    implementationTimeWeeks: 2,
    strengths: ["Most comprehensive social management platform", "AI generates on-brand reply suggestions", "Covers Google Business reviews + Meta + TikTok in unified inbox", "Enterprise-grade analytics and reporting", "Also handles content generation and sentiment analysis"],
    considerations: ["$249+/seat is expensive for small teams", "Can be overkill if you only need comment replies", "Complex feature set takes time to learn"],
    budgetTier: "premium",
    alternativeId: "napoleoncat",
  },
  {
    id: "napoleoncat",
    name: "NapoleonCat",
    vendor: "NapoleonCat",
    description: "Social media management tool focused on engagement automation. Auto-moderates and replies to comments and reviews across Meta (Facebook/Instagram), Google Business, TikTok, and YouTube with AI-powered rules.",
    category: "point_solution",
    websiteHint: "napoleoncat.com",
    addressesOpportunities: ["social_reply_agent", "sentiment_analysis"],
    coverageCategories: ["generative_ai", "analytics"],
    tiers: [
      { name: "Standard", monthlyCost: "$32/mo", features: ["3 profiles", "Auto-moderation", "Unified inbox", "Google + Meta + TikTok", "Basic analytics"] },
      { name: "Pro", monthlyCost: "$76/mo", features: ["Unlimited profiles", "AI auto-replies", "Sentiment tagging", "Team workflows", "Reporting"] },
    ],
    implementationTimeWeeks: 1,
    strengths: ["85% cheaper than Sprout Social", "Auto-moderation rules can reply instantly 24/7", "Covers Google Business + Meta + TikTok + YouTube", "Built specifically for comment/review management", "Good sentiment tagging for tracking brand health"],
    considerations: ["Less powerful analytics than Sprout Social", "AI reply generation less sophisticated", "Smaller brand — less third-party integration ecosystem", "No built-in content creation tools"],
    budgetTier: "mid",
    alternativeId: "manychat",
  },
  {
    id: "manychat",
    name: "ManyChat",
    vendor: "ManyChat",
    description: "Chat automation platform that auto-replies to Instagram, Facebook, and TikTok comments and DMs. Triggers automated conversation flows from comment keywords to drive leads, sales, and engagement.",
    category: "point_solution",
    websiteHint: "manychat.com",
    addressesOpportunities: ["social_reply_agent", "customer_chatbot"],
    coverageCategories: ["generative_ai", "automation"],
    tiers: [
      { name: "Free", monthlyCost: "$0/mo", features: ["Instagram + Facebook + TikTok", "Basic automation", "Comment triggers", "Up to 1,000 contacts"] },
      { name: "Pro", monthlyCost: "$15/mo", features: ["Unlimited contacts", "Advanced flows", "AI text generation", "Keyword triggers", "Analytics", "SMS + Email"] },
    ],
    implementationTimeWeeks: 1,
    strengths: ["Free tier to start immediately", "Best-in-class for Instagram/TikTok comment-to-DM automation", "Drives direct revenue (comment → DM → sale flow)", "Dead simple to set up — no-code", "Also automates DMs which doubles engagement"],
    considerations: ["No Google Business review management", "Comment replies are rule-based, not fully AI-generated", "Focused on engagement/sales funnels — not review management", "No sentiment analysis or reporting depth", "Instagram/Facebook/TikTok only — no Google, YouTube, or X"],
    budgetTier: "budget",
    alternativeId: "napoleoncat",
  },
];
