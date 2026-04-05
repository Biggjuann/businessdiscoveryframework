import type { RoadmapPhase } from "@/types/discovery";

interface RoadmapTimelineProps {
  roadmap: RoadmapPhase[];
}

const phaseColors = [
  { bg: "bg-kova-teal/5", border: "border-kova-teal/30", badge: "bg-kova-teal", text: "text-kova-teal" },
  { bg: "bg-kova-gold/5", border: "border-kova-gold/30", badge: "bg-kova-gold", text: "text-kova-gold" },
  { bg: "bg-kova-violet/5", border: "border-kova-violet/30", badge: "bg-kova-violet", text: "text-kova-violet" },
];

export default function RoadmapTimeline({ roadmap }: RoadmapTimelineProps) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-white font-display">Implementation Roadmap</h2>
      <div className="space-y-4">
        {roadmap.map((phase, index) => {
          const colors = phaseColors[index] ?? phaseColors[0];
          return (
            <div
              key={phase.phase}
              className={`rounded-xl border ${colors.border} ${colors.bg} p-5`}
            >
              <div className="flex items-center gap-3 mb-3">
                <span className={`rounded-full ${colors.badge} px-3 py-1 text-xs font-bold text-white font-display`}>
                  Phase {phase.phase}
                </span>
                <h3 className={`font-semibold font-display ${colors.text}`}>{phase.title}</h3>
                <span className="text-sm text-slate-500 font-mono">{phase.timeframe}</span>
              </div>
              <ul className="space-y-2">
                {phase.opportunities.map((opp) => (
                  <li key={opp.id} className="flex items-center gap-2 text-sm text-slate-300">
                    <svg className={`h-4 w-4 shrink-0 ${colors.text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    <span className="font-medium">{opp.title}</span>
                    <span className="text-slate-500 font-mono">— Priority {opp.priorityScore}</span>
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
