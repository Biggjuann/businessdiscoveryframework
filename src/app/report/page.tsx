"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useDiscovery } from "@/context/DiscoveryContext";
import { analyzeDiscovery } from "@/lib/analysis";
import ReadinessGauge from "@/components/report/ReadinessGauge";
import OpportunityCard from "@/components/report/OpportunityCard";
import RoadmapTimeline from "@/components/report/RoadmapTimeline";
import Button from "@/components/ui/Button";

export default function ReportPage() {
  const { state, dispatch } = useDiscovery();
  const router = useRouter();

  const analysis = useMemo(() => {
    if (!state.isComplete) return null;
    return analyzeDiscovery(state);
  }, [state]);

  if (!state.isComplete || !analysis) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-kova-navy">
        <div className="text-center">
          <h2 className="text-xl font-bold text-white font-display">No Assessment Data</h2>
          <p className="mt-2 text-slate-400">Complete the assessment first to generate your report.</p>
          <Button className="mt-4" onClick={() => router.push("/assessment")}>
            Start Assessment
          </Button>
        </div>
      </div>
    );
  }

  const handleStartOver = () => {
    dispatch({ type: "RESET" });
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-kova-navy">
      <div className="mx-auto max-w-4xl px-4 py-8">
        {/* Header */}
        <div className="mb-8 rounded-2xl border border-kova-navy-light bg-kova-navy-mid p-8">
          <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.15em] text-kova-violet font-display">
                KOVA AI Discovery Report
              </p>
              <h1 className="mt-1 text-2xl font-bold text-white font-display">
                {state.companyOverview.companyName}
              </h1>
              <p className="mt-1 text-sm text-slate-500 font-mono">
                {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
            <ReadinessGauge score={analysis.overallReadiness} />
          </div>
          <div className="mt-6 rounded-lg bg-kova-navy p-4 border border-kova-navy-light">
            <h3 className="text-sm font-semibold text-kova-violet-pale font-display">AI Readiness Summary</h3>
            <p className="mt-1 text-sm text-slate-400">
              {analysis.overallReadiness >= 70
                ? "Your organization has strong foundations for AI adoption. You have the data infrastructure, technical readiness, and organizational capacity to pursue advanced AI initiatives."
                : analysis.overallReadiness >= 40
                ? "Your organization has a solid starting point for AI adoption. Focus on strengthening data practices and building integration capabilities to unlock higher-impact opportunities."
                : "Your organization is in the early stages of AI readiness. Start with low-effort, high-impact quick wins to build momentum and gradually invest in data infrastructure."}
            </p>
          </div>
        </div>

        {/* Opportunities */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-bold text-white font-display">
            AI Opportunities <span className="text-kova-violet font-mono">({analysis.opportunities.length})</span>
          </h2>
          <div className="space-y-4">
            {analysis.opportunities.map((opp, index) => (
              <OpportunityCard key={opp.id} opportunity={opp} rank={index + 1} />
            ))}
          </div>
        </div>

        {/* Roadmap */}
        {analysis.roadmap.length > 0 && (
          <div className="mb-8">
            <RoadmapTimeline roadmap={analysis.roadmap} />
          </div>
        )}

        {/* Actions */}
        <div className="flex flex-wrap justify-center gap-4 rounded-2xl border border-kova-navy-light bg-kova-navy-mid p-6">
          <Button onClick={() => window.print()}>Print Report</Button>
          <Button variant="outline" onClick={handleStartOver}>
            Start Over
          </Button>
        </div>
      </div>
    </div>
  );
}
