"use client";

import { useState } from "react";
import { useDiscovery } from "@/context/DiscoveryContext";
import StepShell from "./StepShell";
import TextArea from "@/components/ui/TextArea";
import Button from "@/components/ui/Button";
import { BOTTLENECK_TEMPLATES } from "@/lib/constants";
import type { PainPoints, Bottleneck, ManualTask } from "@/types/discovery";

export default function PainPointsStep() {
  const { state, dispatch } = useDiscovery();
  const [form, setForm] = useState<PainPoints>(state.painPoints);

  const canProceed = form.bottlenecks.length > 0 || form.biggestChallenges.trim() !== "";

  const handleNext = () => {
    dispatch({ type: "SET_PAIN_POINTS", payload: form });
    dispatch({ type: "NEXT_STEP" });
  };

  const handleBack = () => {
    dispatch({ type: "SET_PAIN_POINTS", payload: form });
    dispatch({ type: "PREV_STEP" });
  };

  const toggleBottleneck = (id: string, label: string) => {
    const exists = form.bottlenecks.find((b) => b.id === id);
    if (exists) {
      setForm({ ...form, bottlenecks: form.bottlenecks.filter((b) => b.id !== id) });
    } else {
      setForm({ ...form, bottlenecks: [...form.bottlenecks, { id, label, severity: 3 }] });
    }
  };

  const updateSeverity = (id: string, severity: number) => {
    setForm({
      ...form,
      bottlenecks: form.bottlenecks.map((b) => (b.id === id ? { ...b, severity } : b)),
    });
  };

  const addManualTask = () => {
    setForm({
      ...form,
      manualTasks: [...form.manualTasks, { name: "", hoursPerWeek: 0, errorProne: false }],
    });
  };

  const updateTask = (index: number, updates: Partial<ManualTask>) => {
    const updated = form.manualTasks.map((t, i) => (i === index ? { ...t, ...updates } : t));
    setForm({ ...form, manualTasks: updated });
  };

  const removeTask = (index: number) => {
    setForm({ ...form, manualTasks: form.manualTasks.filter((_, i) => i !== index) });
  };

  return (
    <StepShell
      title="Pain Points & Challenges"
      description="Identify the bottlenecks and manual work that slow your business down."
      onNext={handleNext}
      onBack={handleBack}
      canProceed={canProceed}
    >
      <div>
        <label className="mb-3 block text-sm font-medium text-slate-700">
          Select your biggest bottlenecks and rate their severity
        </label>
        <div className="space-y-2">
          {BOTTLENECK_TEMPLATES.map((bt) => {
            const selected = form.bottlenecks.find((b) => b.id === bt.id);
            return (
              <div
                key={bt.id}
                className={`rounded-lg border p-3 transition-colors ${
                  selected ? "border-blue-500 bg-blue-50" : "border-slate-200"
                }`}
              >
                <label className="flex cursor-pointer items-center">
                  <input
                    type="checkbox"
                    checked={!!selected}
                    onChange={() => toggleBottleneck(bt.id, bt.label)}
                    className="h-4 w-4 rounded text-blue-600"
                  />
                  <span className="ml-3 text-sm text-slate-700">{bt.label}</span>
                </label>
                {selected && (
                  <div className="mt-2 ml-7 flex items-center gap-2">
                    <span className="text-xs text-slate-500">Severity:</span>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <button
                        key={n}
                        onClick={() => updateSeverity(bt.id, n)}
                        className={`h-7 w-7 rounded text-xs font-medium transition-colors ${
                          selected.severity >= n
                            ? "bg-blue-600 text-white"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {n}
                      </button>
                    ))}
                    <span className="text-xs text-slate-400 ml-1">
                      {selected.severity <= 2 ? "Low" : selected.severity === 3 ? "Medium" : "High"}
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium text-slate-700">
          Manual / Repetitive Tasks
        </label>
        <div className="space-y-3">
          {form.manualTasks.map((task, index) => (
            <div key={index} className="flex gap-2 items-center rounded-lg border border-slate-200 p-3">
              <input
                className="flex-1 rounded border border-slate-300 px-2 py-1.5 text-sm"
                placeholder="Task name"
                value={task.name}
                onChange={(e) => updateTask(index, { name: e.target.value })}
              />
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  min={0}
                  max={168}
                  className="w-16 rounded border border-slate-300 px-2 py-1.5 text-sm"
                  value={task.hoursPerWeek || ""}
                  onChange={(e) => updateTask(index, { hoursPerWeek: Number(e.target.value) })}
                />
                <span className="text-xs text-slate-500">hrs/wk</span>
              </div>
              <label className="flex items-center gap-1 text-xs text-slate-600">
                <input
                  type="checkbox"
                  checked={task.errorProne}
                  onChange={(e) => updateTask(index, { errorProne: e.target.checked })}
                  className="h-3.5 w-3.5 rounded"
                />
                Error-prone
              </label>
              <button onClick={() => removeTask(index)} className="text-slate-400 hover:text-red-500 p-1">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" className="mt-3" onClick={addManualTask}>
          + Add Manual Task
        </Button>
      </div>

      <TextArea
        label="What are your biggest operational challenges?"
        placeholder="Describe any recurring issues, inefficiencies, or frustrations your team faces..."
        value={form.biggestChallenges}
        onChange={(e) => setForm({ ...form, biggestChallenges: e.target.value })}
      />
    </StepShell>
  );
}
