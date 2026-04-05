import type { AIOpportunity } from "@/types/discovery";

const categoryLabels: Record<string, { label: string; color: string }> = {
  automation: { label: "Automation", color: "bg-blue-100 text-blue-700" },
  analytics: { label: "Analytics", color: "bg-purple-100 text-purple-700" },
  generative_ai: { label: "Generative AI", color: "bg-green-100 text-green-700" },
  prediction: { label: "Prediction", color: "bg-amber-100 text-amber-700" },
  optimization: { label: "Optimization", color: "bg-rose-100 text-rose-700" },
};

interface OpportunityCardProps {
  opportunity: AIOpportunity;
  rank: number;
}

export default function OpportunityCard({ opportunity, rank }: OpportunityCardProps) {
  const cat = categoryLabels[opportunity.category] ?? { label: opportunity.category, color: "bg-slate-100 text-slate-700" };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
            {rank}
          </span>
          <div>
            <h3 className="font-semibold text-slate-900">{opportunity.title}</h3>
            <p className="mt-1 text-sm text-slate-600">{opportunity.description}</p>
          </div>
        </div>
        <span className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${cat.color}`}>
          {cat.label}
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 border-t border-slate-100 pt-4">
        <div>
          <p className="text-xs text-slate-500">Impact</p>
          <div className="mt-1 flex items-center gap-1">
            <div className="h-2 flex-1 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-green-500"
                style={{ width: `${opportunity.impactScore * 10}%` }}
              />
            </div>
            <span className="text-xs font-medium text-slate-700">{opportunity.impactScore}/10</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500">Effort</p>
          <div className="mt-1 flex items-center gap-1">
            <div className="h-2 flex-1 rounded-full bg-slate-100">
              <div
                className="h-2 rounded-full bg-amber-500"
                style={{ width: `${opportunity.effortScore * 10}%` }}
              />
            </div>
            <span className="text-xs font-medium text-slate-700">{opportunity.effortScore}/10</span>
          </div>
        </div>
        <div>
          <p className="text-xs text-slate-500">Priority</p>
          <span className="text-lg font-bold text-blue-600">{opportunity.priorityScore}</span>
        </div>
      </div>

      <div className="mt-3 text-xs text-slate-500">
        <span className="font-medium">Est. ROI:</span> {opportunity.estimatedROI}
      </div>

      {(opportunity.relevantPainPoints.length > 0 || opportunity.relevantGoals.length > 0) && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {opportunity.relevantPainPoints.map((p) => (
            <span key={p} className="rounded bg-red-50 px-2 py-0.5 text-xs text-red-600">
              {p}
            </span>
          ))}
          {opportunity.relevantGoals.map((g) => (
            <span key={g} className="rounded bg-blue-50 px-2 py-0.5 text-xs text-blue-600">
              {g.replace(/_/g, " ")}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
