"use client";

import { useState } from "react";
import type { ServiceRecommendation } from "@/lib/service-matcher";
import ServiceCard from "./ServiceCard";

interface ServiceRecommendationsProps {
  recommendation: ServiceRecommendation;
}

export default function ServiceRecommendations({ recommendation }: ServiceRecommendationsProps) {
  const [view, setView] = useState<"bundle" | "all">("bundle");

  const bundleIds = new Set(recommendation.optimalBundle.map((m) => m.service.id));

  return (
    <div className="space-y-6">
      {/* Summary header */}
      <div className="rounded-xl border border-kova-navy-light bg-kova-navy-mid p-6">
        <h2 className="text-xl font-bold text-white font-display">Service Recommendations</h2>
        <p className="mt-1 text-sm text-slate-400">
          Optimized for maximum issue coverage with minimum investment.
        </p>

        <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-lg bg-kova-navy p-3 border border-kova-navy-light">
            <p className="text-xs text-slate-500">Services Needed</p>
            <p className="text-xl font-bold text-kova-violet font-mono">{recommendation.optimalBundle.length}</p>
          </div>
          <div className="rounded-lg bg-kova-navy p-3 border border-kova-navy-light">
            <p className="text-xs text-slate-500">Issues Covered</p>
            <p className="text-xl font-bold text-kova-teal font-mono">
              {recommendation.bundleCoverage}/{recommendation.totalOpportunities}
            </p>
          </div>
          <div className="rounded-lg bg-kova-navy p-3 border border-kova-navy-light">
            <p className="text-xs text-slate-500">Coverage Rate</p>
            <p className="text-xl font-bold text-kova-teal font-mono">
              {recommendation.totalOpportunities > 0
                ? Math.round((recommendation.bundleCoverage / recommendation.totalOpportunities) * 100)
                : 0}%
            </p>
          </div>
          <div className="rounded-lg bg-kova-navy p-3 border border-kova-navy-light">
            <p className="text-xs text-slate-500">All Matches</p>
            <p className="text-xl font-bold text-slate-300 font-mono">{recommendation.rankedServices.length}</p>
          </div>
        </div>

        {recommendation.uncoveredOpportunities.length > 0 && (
          <div className="mt-4 rounded-lg bg-kova-gold/5 border border-kova-gold/20 p-3">
            <p className="text-xs font-semibold text-kova-gold">
              {recommendation.uncoveredOpportunities.length} opportunity{recommendation.uncoveredOpportunities.length !== 1 ? "ies" : "y"} may need custom solutions:
            </p>
            <div className="mt-1.5 flex flex-wrap gap-1.5">
              {recommendation.uncoveredOpportunities.map((o) => (
                <span key={o.id} className="rounded bg-kova-gold/10 px-2 py-0.5 text-xs text-kova-gold">
                  {o.title}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* View toggle */}
      <div className="flex gap-2">
        <button
          onClick={() => setView("bundle")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            view === "bundle"
              ? "bg-kova-teal text-white"
              : "bg-kova-navy-light text-slate-400 hover:text-white"
          }`}
        >
          Optimal Bundle ({recommendation.optimalBundle.length})
        </button>
        <button
          onClick={() => setView("all")}
          className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
            view === "all"
              ? "bg-kova-violet text-white"
              : "bg-kova-navy-light text-slate-400 hover:text-white"
          }`}
        >
          All Matches ({recommendation.rankedServices.length})
        </button>
      </div>

      {/* Service list */}
      <div className="space-y-4">
        {view === "bundle"
          ? recommendation.optimalBundle.map((match, index) => (
              <ServiceCard key={match.service.id} match={match} rank={index + 1} isBundled allMatches={recommendation.rankedServices} />
            ))
          : recommendation.rankedServices.map((match, index) => (
              <ServiceCard
                key={match.service.id}
                match={match}
                rank={index + 1}
                isBundled={bundleIds.has(match.service.id)}
                allMatches={recommendation.rankedServices}
              />
            ))}
      </div>
    </div>
  );
}
