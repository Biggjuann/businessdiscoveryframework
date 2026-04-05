"use client";

import { useState, useMemo } from "react";
import type { ClientReport } from "@/lib/report-export";
import type { ImplementationPlan } from "@/types/implementation";
import { buildImplementationPlan } from "@/lib/implementation";
import { recommendServices, type ServiceRecommendation } from "@/lib/service-matcher";
import ReportUploader from "@/components/implement/ReportUploader";
import PlanDashboard from "@/components/implement/PlanDashboard";
import ServiceRecommendations from "@/components/implement/ServiceRecommendations";
import Button from "@/components/ui/Button";

type TabView = "services" | "tasks";

export default function ImplementPage() {
  const [report, setReport] = useState<ClientReport | null>(null);
  const [plan, setPlan] = useState<ImplementationPlan | null>(null);
  const [serviceRec, setServiceRec] = useState<ServiceRecommendation | null>(null);
  const [activeTab, setActiveTab] = useState<TabView>("services");

  const handleReportLoaded = (loaded: ClientReport) => {
    setReport(loaded);
    setPlan(buildImplementationPlan(loaded));
    setServiceRec(recommendServices(loaded));
  };

  const handleReset = () => {
    setReport(null);
    setPlan(null);
    setServiceRec(null);
    setActiveTab("services");
  };

  if (!report || !plan || !serviceRec) {
    return <ReportUploader onReportLoaded={handleReportLoaded} />;
  }

  return (
    <div className="min-h-screen bg-kova-navy">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Client header */}
        <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-kova-violet font-display">
              KOVA Implementation Plan
            </p>
            <h1 className="mt-1 text-2xl font-bold text-white font-display">
              {plan.clientName}
            </h1>
            <div className="mt-1 flex items-center gap-4 text-xs text-slate-500 font-mono">
              <span>Industry: <span className="text-slate-300">{plan.industry.replace(/_/g, " ")}</span></span>
              <span>Readiness: <span className="text-kova-teal">{plan.readinessScore}/100</span></span>
            </div>
          </div>
          <Button size="sm" variant="outline" onClick={handleReset}>Upload New Report</Button>
        </div>

        {/* Tab switcher */}
        <div className="mb-6 flex gap-2 border-b border-kova-navy-light pb-4">
          <button
            onClick={() => setActiveTab("services")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold font-display transition-colors ${
              activeTab === "services"
                ? "bg-kova-violet text-white"
                : "text-slate-400 hover:text-white hover:bg-kova-navy-light"
            }`}
          >
            Service Recommendations
          </button>
          <button
            onClick={() => setActiveTab("tasks")}
            className={`rounded-lg px-4 py-2 text-sm font-semibold font-display transition-colors ${
              activeTab === "tasks"
                ? "bg-kova-violet text-white"
                : "text-slate-400 hover:text-white hover:bg-kova-navy-light"
            }`}
          >
            Task Tracker
          </button>
        </div>

        {/* Content */}
        {activeTab === "services" && <ServiceRecommendations recommendation={serviceRec} />}
        {activeTab === "tasks" && <PlanDashboard initialPlan={plan} onReset={handleReset} />}
      </div>
    </div>
  );
}
