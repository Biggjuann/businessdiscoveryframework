"use client";

import { useState } from "react";
import { useDiscovery } from "@/context/DiscoveryContext";
import StepShell from "./StepShell";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import Button from "@/components/ui/Button";
import { DEPARTMENTS, PROCESS_FREQUENCIES, EFFORT_LEVELS } from "@/lib/constants";
import type { WorkflowInfo, Process, Department } from "@/types/discovery";

export default function CurrentWorkflowsStep() {
  const { state, dispatch } = useDiscovery();
  const [form, setForm] = useState<WorkflowInfo>(state.workflows);

  const canProceed = form.departments.length > 0;

  const handleNext = () => {
    dispatch({ type: "SET_WORKFLOWS", payload: form });
    dispatch({ type: "NEXT_STEP" });
  };

  const handleBack = () => {
    dispatch({ type: "SET_WORKFLOWS", payload: form });
    dispatch({ type: "PREV_STEP" });
  };

  const addProcess = () => {
    setForm({
      ...form,
      keyProcesses: [...form.keyProcesses, { name: "", frequency: "daily", manualEffort: "medium" }],
    });
  };

  const updateProcess = (index: number, updates: Partial<Process>) => {
    const updated = form.keyProcesses.map((p, i) => (i === index ? { ...p, ...updates } : p));
    setForm({ ...form, keyProcesses: updated });
  };

  const removeProcess = (index: number) => {
    setForm({ ...form, keyProcesses: form.keyProcesses.filter((_, i) => i !== index) });
  };

  return (
    <StepShell
      title="Current Workflows"
      description="Tell us about the departments and processes that drive your business."
      onNext={handleNext}
      onBack={handleBack}
      canProceed={canProceed}
    >
      <CheckboxGroup
        label="Which departments are involved in your key workflows?"
        options={DEPARTMENTS}
        values={form.departments}
        onChange={(v) => setForm({ ...form, departments: v as Department[] })}
      />

      <div>
        <label className="mb-3 block text-sm font-medium text-kova-violet-pale">
          Key Business Processes
        </label>
        <div className="space-y-3">
          {form.keyProcesses.map((process, index) => (
            <div key={index} className="flex gap-2 items-start rounded-lg border border-kova-navy-light bg-kova-navy p-3">
              <input
                className="flex-1 rounded border border-kova-navy-light bg-kova-navy-mid px-2 py-1.5 text-sm text-white placeholder:text-slate-500"
                placeholder="Process name"
                value={process.name}
                onChange={(e) => updateProcess(index, { name: e.target.value })}
              />
              <select
                className="rounded border border-kova-navy-light bg-kova-navy-mid px-2 py-1.5 text-sm text-white"
                value={process.frequency}
                onChange={(e) => updateProcess(index, { frequency: e.target.value as Process["frequency"] })}
              >
                {PROCESS_FREQUENCIES.map((f) => (
                  <option key={f.value} value={f.value}>{f.label}</option>
                ))}
              </select>
              <select
                className="rounded border border-kova-navy-light bg-kova-navy-mid px-2 py-1.5 text-sm text-white"
                value={process.manualEffort}
                onChange={(e) => updateProcess(index, { manualEffort: e.target.value as Process["manualEffort"] })}
              >
                {EFFORT_LEVELS.map((l) => (
                  <option key={l.value} value={l.value}>{l.label} effort</option>
                ))}
              </select>
              <button
                onClick={() => removeProcess(index)}
                className="text-slate-500 hover:text-kova-red p-1"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>
        <Button variant="outline" size="sm" className="mt-3" onClick={addProcess}>
          + Add Process
        </Button>
      </div>

    </StepShell>
  );
}
