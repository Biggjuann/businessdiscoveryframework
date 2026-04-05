"use client";

import { useState } from "react";
import type { ServiceMatch } from "@/lib/service-matcher";

interface ServiceCardProps {
  match: ServiceMatch;
  rank: number;
  isBundled: boolean;
}

export default function ServiceCard({ match, rank, isBundled }: ServiceCardProps) {
  const [expanded, setExpanded] = useState(false);
  const { service } = match;

  const categoryLabel: Record<string, string> = {
    platform: "Platform",
    point_solution: "Point Solution",
    api: "API / Developer Tool",
  };

  return (
    <div className={`rounded-xl border bg-kova-navy-mid overflow-hidden ${isBundled ? "border-kova-teal/40" : "border-kova-navy-light"}`}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 text-left hover:bg-kova-navy-light/30 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-bold text-white font-display ${isBundled ? "bg-kova-teal" : "bg-kova-violet"}`}>
              {rank}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-white font-display">{service.name}</h3>
                <span className="text-xs text-slate-500">{service.vendor}</span>
                <span className="rounded-full bg-kova-navy-light px-2 py-0.5 text-xs text-slate-400">
                  {categoryLabel[service.category]}
                </span>
                {isBundled && (
                  <span className="rounded-full bg-kova-teal/20 px-2 py-0.5 text-xs font-medium text-kova-teal">
                    Recommended
                  </span>
                )}
              </div>
              <p className="mt-1 text-sm text-slate-400">{service.description}</p>
              <div className="mt-2 flex items-center gap-4 text-xs font-mono">
                <span className="text-kova-teal">
                  Solves {match.coverageCount} issue{match.coverageCount !== 1 ? "s" : ""}
                </span>
                <span className="text-kova-gold">
                  Score: {match.consolidationScore}
                </span>
                <span className="text-slate-500">
                  ~{service.implementationTimeWeeks}wk deploy
                </span>
              </div>
            </div>
          </div>
          <svg
            className={`h-5 w-5 shrink-0 text-slate-500 transition-transform ${expanded ? "rotate-180" : ""}`}
            fill="none" viewBox="0 0 24 24" stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-kova-navy-light p-5 space-y-4">
          {/* Issues addressed */}
          <div>
            <h4 className="text-xs font-semibold text-kova-violet-pale uppercase tracking-wider mb-2">Issues Addressed</h4>
            <div className="flex flex-wrap gap-1.5">
              {match.addressedOpportunities.map((opp) => (
                <span key={opp.id} className="rounded-lg bg-kova-violet/10 border border-kova-violet/20 px-2.5 py-1 text-xs text-kova-violet">
                  {opp.title}
                  <span className="ml-1 text-kova-violet-pale font-mono">P{opp.priorityScore}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h4 className="text-xs font-semibold text-kova-violet-pale uppercase tracking-wider mb-2">Pricing Tiers</h4>
            <div className="grid gap-2 sm:grid-cols-2">
              {service.tiers.map((tier) => (
                <div
                  key={tier.name}
                  className={`rounded-lg border p-3 ${
                    tier.name === match.recommendedTier
                      ? "border-kova-teal/40 bg-kova-teal/5"
                      : "border-kova-navy-light bg-kova-navy"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">{tier.name}</span>
                    <span className="text-sm font-bold text-kova-gold font-mono">{tier.monthlyCost}</span>
                  </div>
                  <ul className="mt-2 space-y-1">
                    {tier.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5 text-xs text-slate-400">
                        <svg className="h-3 w-3 text-kova-teal shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        {f}
                      </li>
                    ))}
                  </ul>
                  {tier.name === match.recommendedTier && (
                    <span className="mt-2 inline-block text-xs font-medium text-kova-teal">Recommended tier</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Strengths & Considerations */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="text-xs font-semibold text-kova-teal uppercase tracking-wider mb-2">Strengths</h4>
              <ul className="space-y-1">
                {service.strengths.map((s) => (
                  <li key={s} className="flex items-start gap-1.5 text-xs text-slate-400">
                    <span className="text-kova-teal mt-0.5">+</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold text-kova-gold uppercase tracking-wider mb-2">Considerations</h4>
              <ul className="space-y-1">
                {service.considerations.map((c) => (
                  <li key={c} className="flex items-start gap-1.5 text-xs text-slate-400">
                    <span className="text-kova-gold mt-0.5">!</span>
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
