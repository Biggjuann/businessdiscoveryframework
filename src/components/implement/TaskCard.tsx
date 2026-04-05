"use client";

import type { ImplementationTask, TaskStatus } from "@/types/implementation";

interface TaskCardProps {
  task: ImplementationTask;
  onUpdate: (updates: Partial<ImplementationTask>) => void;
}

const statusOptions: { value: TaskStatus; label: string; color: string }[] = [
  { value: "not_started", label: "Not Started", color: "bg-slate-500" },
  { value: "in_progress", label: "In Progress", color: "bg-kova-violet" },
  { value: "blocked", label: "Blocked", color: "bg-kova-red" },
  { value: "completed", label: "Completed", color: "bg-kova-teal" },
];

export default function TaskCard({ task, onUpdate }: TaskCardProps) {
  const status = statusOptions.find((s) => s.value === task.status) ?? statusOptions[0];

  return (
    <div className="rounded-lg border border-kova-navy-light bg-kova-navy p-4">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-white">{task.title}</h4>
          <p className="mt-1 text-xs text-slate-400">{task.description}</p>
        </div>
        <select
          value={task.status}
          onChange={(e) => onUpdate({ status: e.target.value as TaskStatus })}
          className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium border-0 ${status.color} text-white cursor-pointer`}
        >
          {statusOptions.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-slate-500 mb-1">Assignee</label>
          <input
            type="text"
            value={task.assignee}
            onChange={(e) => onUpdate({ assignee: e.target.value })}
            placeholder="Team member"
            className="w-full rounded border border-kova-navy-light bg-kova-navy-mid px-2 py-1 text-xs text-white placeholder:text-slate-600"
          />
        </div>
        <div>
          <label className="block text-xs text-slate-500 mb-1">Due Date</label>
          <input
            type="date"
            value={task.dueDate}
            onChange={(e) => onUpdate({ dueDate: e.target.value })}
            className="w-full rounded border border-kova-navy-light bg-kova-navy-mid px-2 py-1 text-xs text-white"
          />
        </div>
      </div>

      <div className="mt-2">
        <label className="block text-xs text-slate-500 mb-1">Notes</label>
        <textarea
          value={task.notes}
          onChange={(e) => onUpdate({ notes: e.target.value })}
          placeholder="Implementation notes..."
          rows={2}
          className="w-full rounded border border-kova-navy-light bg-kova-navy-mid px-2 py-1 text-xs text-white placeholder:text-slate-600 resize-none"
        />
      </div>
    </div>
  );
}
