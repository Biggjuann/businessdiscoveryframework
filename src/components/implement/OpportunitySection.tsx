"use client";

import { useState } from "react";
import type { OpportunityImplementation, ImplementationTask } from "@/types/implementation";
import TaskCard from "./TaskCard";

interface OpportunitySectionProps {
  item: OpportunityImplementation;
  index: number;
  onUpdate: (updated: OpportunityImplementation) => void;
}

const categoryLabels: Record<string, { label: string; color: string }> = {
  automation: { label: "Automation", color: "bg-kova-violet/20 text-kova-violet" },
  analytics: { label: "Analytics", color: "bg-kova-violet-pale/20 text-kova-violet-pale" },
  generative_ai: { label: "Generative AI", color: "bg-kova-teal/20 text-kova-teal" },
  prediction: { label: "Prediction", color: "bg-kova-gold/20 text-kova-gold" },
  optimization: { label: "Optimization", color: "bg-kova-violet-deep/20 text-kova-violet" },
};

const phaseLabels: Record<string, { label: string; color: string }> = {
  "1": { label: "Quick Win", color: "bg-kova-teal text-white" },
  "2": { label: "Medium Term", color: "bg-kova-gold text-white" },
  "3": { label: "Strategic", color: "bg-kova-violet text-white" },
};

export default function OpportunitySection({ item, index, onUpdate }: OpportunitySectionProps) {
  const [expanded, setExpanded] = useState(index === 0);
  const cat = categoryLabels[item.opportunity.category] ?? { label: item.opportunity.category, color: "bg-kova-navy-light text-slate-400" };
  const phase = phaseLabels[item.phase] ?? phaseLabels["3"];

  const completedTasks = item.tasks.filter((t) => t.status === "completed").length;
  const totalTasks = item.tasks.length;
  const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  const updateTask = (taskId: string, updates: Partial<ImplementationTask>) => {
    const updatedTasks = item.tasks.map((t) =>
      t.id === taskId ? { ...t, ...updates } : t
    );
    onUpdate({ ...item, tasks: updatedTasks });
  };

  return (
    <div className="rounded-xl border border-kova-navy-light bg-kova-navy-mid overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full p-5 text-left hover:bg-kova-navy-light/30 transition-colors"
      >
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-kova-violet text-sm font-bold text-white font-display">
              {index + 1}
            </span>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="font-semibold text-white font-display">{item.opportunity.title}</h3>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${cat.color}`}>
                  {cat.label}
                </span>
                <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${phase.color}`}>
                  {phase.label}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-4 text-xs text-slate-500 font-mono">
                <span>Impact: <span className="text-kova-teal">{item.opportunity.impactScore}/10</span></span>
                <span>Effort: <span className="text-kova-gold">{item.opportunity.effortScore}/10</span></span>
                <span>ROI: <span className="text-kova-gold">{item.opportunity.estimatedROI}</span></span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="text-right">
              <span className="text-xs text-slate-500 font-mono">{completedTasks}/{totalTasks}</span>
              <div className="mt-1 h-1.5 w-20 rounded-full bg-kova-navy-light">
                <div
                  className="h-1.5 rounded-full bg-kova-teal transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
            <svg
              className={`h-5 w-5 text-slate-500 transition-transform ${expanded ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </button>

      {expanded && (
        <div className="border-t border-kova-navy-light p-5">
          <div className="mb-4">
            <label className="block text-xs text-slate-500 mb-1 font-medium">Client-Specific Notes</label>
            <textarea
              value={item.clientNotes}
              onChange={(e) => onUpdate({ ...item, clientNotes: e.target.value })}
              placeholder="Add context about this client's specific needs, constraints, or preferences for this opportunity..."
              rows={2}
              className="w-full rounded-lg border border-kova-navy-light bg-kova-navy px-3 py-2 text-sm text-white placeholder:text-slate-600 resize-none"
            />
          </div>

          <h4 className="text-sm font-semibold text-kova-violet-pale font-display mb-3">
            Implementation Tasks
          </h4>
          <div className="space-y-3">
            {item.tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onUpdate={(updates) => updateTask(task.id, updates)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
