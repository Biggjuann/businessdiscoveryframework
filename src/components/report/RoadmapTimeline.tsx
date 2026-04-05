import type { RoadmapPhase } from "@/types/discovery";

interface RoadmapTimelineProps {
  roadmap: RoadmapPhase[];
}

const phaseColors = [
  { bg: "bg-green-50", border: "border-green-200", badge: "bg-green-600", text: "text-green-700" },
  { bg: "bg-amber-50", border: "border-amber-200", badge: "bg-amber-600", text: "text-amber-700" },
  { bg: "bg-purple-50", border: "border-purple-200", badge: "bg-purple-600", text: "text-purple-700" },
];

export default function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-slate-900">Implementation Roadmap</h2>
      <div className="space-y-4">
        {roadmap.map((phase, index) => {
          const colors = phaseColors[index] ?? phaseColors[0];
          return (
            <div
              key={phase.phase}
              className={`rounded-xl border ${colors.border} ${colors.bg} p-5`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`rounded-full ${colors.badge} px-3 py-1 text-xs font-bold text-white`}>
                  Phase {phase.phase}
                </span>
                <h3 className={`font-semibold ${colors.text}`}>{phase.title}</h3>
                <span className="text-sm text-slate-500">{phase.timeframe}</span>
              </div>
              <ul className="space-y-2">
                {phase.opportunities.map((opp) => (
                  <li key={opp.id} className="flex items-center gap-2 text-sm text-slate-700">
                    <svg className={`h-4 w-4 shrink-0 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="font-medium">{opp.title}</span>
                    <span className="text-slate-400">— Priority {opp.priorityScore}</span>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}
