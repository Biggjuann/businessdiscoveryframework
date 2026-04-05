import type { AIOpportunity } from "@/types/discovery";

const categoryLabels: Record<string, { label: string; color: string }> = {
  automation: { label: "Automation", color: "bg-kova-violet/20 text-kova-violet" },
  analytics: { label: "Analytics", color: "bg-kova-violet-pale/20 text-kova-violet-pale" },
  generative_ai: { label: "Generative AI", color: "bg-kova-teal/20 text-kova-teal" },
  prediction: { label: "Prediction", color: "bg-kova-gold/20 text-kova-gold" },
  optimization: { label: "Optimization", color: "bg-kova-violet-deep/20 text-kova-violet" },
};

interface OpportunityCardProps {
  opportunity: AIOpportunity;
  rank: number;
}

export default function OpportunityCard({ opportunity, rank }: OpportunityCardProps) {
  const cat = categoryLabels[opportunity.category] ?? { label: opportunity.category, color: "bg-kova-navy-light text-slate-400" };

  return (
    <div className="rounded-xl border border-kova-navy-light bg-kova-navy-mid p-5">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kova-violet text-sm font-bold text-white font-display">
            {rank}
          </span>
          <div>
            <h3 className="font-semibold text-white font-display">{opportunity.title}</h3>
            <p className="mt-1 text-sm text-slate-400">{opportunity.description}</p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${cat.color}`}>
          {cat.label}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 border-t border-kova-navy-light pt-4">
        <div>
          <p className="text-xs text-slate-500">Impact</p>
          <div className="mt-1 flex items-center gap-1">
            <div className="h-2 flex-1 rounded-full bg-kova-navy-light">
              <div
                className="h-2 rounded-full bg-kova-teal"
                style={{ width: `${opportunity.impactScore * 10}%` }}
              />
            </div>
            <span className="text-xs font-medium text-kova-teal font-mono">{opportunity.impactScore}/10</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500">Effort</p>
          <div className="mt-1 flex items-center gap-1">
            <div className="h-2 flex-1 rounded-full bg-kova-navy-light">
              <div
                className="h-2 rounded-full bg-kova-gold"
                style={{ width: `${opportunity.effortScore * 10}%` }}
              />
            </div>
            <span className="text-xs font-medium text-kova-gold font-mono">{opportunity.effortScore}/10</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500">Priority</p>
          <span className="text-lg font-bold text-kova-violet font-mono">{opportunity.priorityScore}</span>
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-500">
        <span className="font-medium text-kova-gold">Est. ROI:</span> {opportunity.estimatedROI}
      </div>

      {(opportunity.relevantPainPoints.length > 0 || opportunity.relevantGoals.length > 0) && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {opportunity.relevantPainPoints.map((p) => (
            <span key={p} className="rounded bg-kova-red/10 px-2 py-0.5 text-xs text-kova-red">
              {p}
            </span>
          ))}
          {opportunity.relevantGoals.map((g) => (
            <span key={g} className="rounded bg-kova-violet/10 px-2 py-0.5 text-xs text-kova-violet">
              {g.replace(/_/g, " ")}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
