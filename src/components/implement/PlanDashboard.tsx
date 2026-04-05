"use client";

import { useState } from "react";
import type { ImplementationPlan, OpportunityImplementation } from "@/types/implementation";
import OpportunitySection from "./OpportunitySection";
import Button from "@/components/ui/Button";

interface PlanDashboardProps {
  initialPlan: ImplementationPlan;
  onReset: () => void;
}

export default function PlanDashboard({ initialPlan, onReset }: PlanDashboardProps) {
  const [plan, setPlan] = useState<ImplementationPlan>(initialPlan);

  const updateOpportunity = (index: number, updated: OpportunityImplementation) => {
    const newOpps = [...plan.opportunities];
    newOpps[index] = updated;
    setPlan({ ...plan, opportunities: newOpps });
  };

  const allTasks = plan.opportunities.flatMap((o) => o.tasks);
  const completedTasks = allTasks.filter((t) => t.status === "completed").length;
  const inProgressTasks = allTasks.filter((t) => t.status === "in_progress").length;
  const blockedTasks = allTasks.filter((t) => t.status === "blocked").length;
  const totalTasks = allTasks.length;
  const overallProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const quickWins = plan.opportunities.filter((o) => o.phase === "1");
  const mediumTerm = plan.opportunities.filter((o) => o.phase === "2");
  const strategic = plan.opportunities.filter((o) => o.phase === "3");

  const handleExportPlan = () => {
    const blob = new Blob([JSON.stringify(plan, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `kova-implementation-${plan.clientName.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-kova-navy">
      <div className="mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 rounded-2xl border border-kova-navy-light bg-kova-navy-mid p-6">
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-kova-violet font-display">
                KOVA Implementation Plan
              </p>
              <h1 className="mt-1 text-2xl font-bold text-white font-display">
                {plan.clientName}
              </h1>
              <div className="mt-2 flex items-center gap-4 text-xs text-slate-500 font-mono">
                <span>Industry: <span className="text-slate-300">{plan.industry.replace(/_/g, " ")}</span></span>
                <span>Readiness: <span className="text-kova-teal">{plan.readinessScore}/100</span></span>
                <span>Opportunities: <span className="text-kova-violet">{plan.opportunities.length}</span></span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button size="sm" onClick={handleExportPlan}>Save Plan</Button>
              <Button size="sm" variant="outline" onClick={onReset}>New Report</Button>
            </div>
          </div>

          {/* Stats bar */}
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-lg bg-kova-navy p-3 border border-kova-navy-light">
              <p className="text-xs text-slate-500">Total Tasks</p>
              <p className="text-xl font-bold text-white font-mono">{totalTasks}</p>
            </div>
            <div className="rounded-lg bg-kova-navy p-3 border border-kova-navy-light">
              <p className="text-xs text-slate-500">In Progress</p>
              <p className="text-xl font-bold text-kova-violet font-mono">{inProgressTasks}</p>
            </div>
            <div className="rounded-lg bg-kova-navy p-3 border border-kova-navy-light">
              <p className="text-xs text-slate-500">Blocked</p>
              <p className="text-xl font-bold text-kova-red font-mono">{blockedTasks}</p>
            </div>
            <div className="rounded-lg bg-kova-navy p-3 border border-kova-navy-light">
              <p className="text-xs text-slate-500">Completed</p>
              <p className="text-xl font-bold text-kova-teal font-mono">{completedTasks}</p>
            </div>
          </div>

          {/* Overall progress bar */}
          <div className="mt-4">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Overall Progress</span>
              <span className="font-mono text-kova-teal">{overallProgress}%</span>
            </div>
            <div className="h-2 rounded-full bg-kova-navy-light">
              <div
                className="h-2 rounded-full bg-kova-teal transition-all"
                style={{ width: `${overallProgress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Opportunity sections grouped by phase */}
        {quickWins.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white font-display">
              <span className="rounded-full bg-kova-teal px-2.5 py-0.5 text-xs font-bold text-white">Phase 1</span>
              Quick Wins
              <span className="text-sm text-slate-500 font-mono font-normal">0-3 months</span>
            </h2>
            <div className="space-y-4">
              {quickWins.map((item) => {
                const globalIndex = plan.opportunities.indexOf(item);
                return (
                  <OpportunitySection
                    key={item.opportunity.id}
                    item={item}
                    index={globalIndex}
                    onUpdate={(updated) => updateOpportunity(globalIndex, updated)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {mediumTerm.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white font-display">
              <span className="rounded-full bg-kova-gold px-2.5 py-0.5 text-xs font-bold text-white">Phase 2</span>
              Medium-Term Initiatives
              <span className="text-sm text-slate-500 font-mono font-normal">3-6 months</span>
            </h2>
            <div className="space-y-4">
              {mediumTerm.map((item) => {
                const globalIndex = plan.opportunities.indexOf(item);
                return (
                  <OpportunitySection
                    key={item.opportunity.id}
                    item={item}
                    index={globalIndex}
                    onUpdate={(updated) => updateOpportunity(globalIndex, updated)}
                  />
                );
              })}
            </div>
          </div>
        )}

        {strategic.length > 0 && (
          <div className="mb-8">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-white font-display">
              <span className="rounded-full bg-kova-violet px-2.5 py-0.5 text-xs font-bold text-white">Phase 3</span>
              Strategic Investments
              <span className="text-sm text-slate-500 font-mono font-normal">6-12+ months</span>
            </h2>
            <div className="space-y-4">
              {strategic.map((item) => {
                const globalIndex = plan.opportunities.indexOf(item);
                return (
                  <OpportunitySection
                    key={item.opportunity.id}
                    item={item}
                    index={globalIndex}
                    onUpdate={(updated) => updateOpportunity(globalIndex, updated)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
