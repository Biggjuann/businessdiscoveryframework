"use client";

import { useState } from "react";
import type { ClientReport } from "@/lib/report-export";
import type { ImplementationPlan } from "@/types/implementation";
import { buildImplementationPlan } from "@/lib/implementation";
import ReportUploader from "@/components/implement/ReportUploader";
import PlanDashboard from "@/components/implement/PlanDashboard";

export default function ImplementPage() {
  const [plan, setPlan] = useState<ImplementationPlan | null>(null);

  const handleReportLoaded = (report: ClientReport) => {
    const implementationPlan = buildImplementationPlan(report);
    setPlan(implementationPlan);
  };

  const handleReset = () => {
    setPlan(null);
  };

  if (!plan) {
    return <ReportUploader onReportLoaded={handleReportLoaded} />;
  }

  return <PlanDashboard initialPlan={plan} onReset={handleReset} />;
}
