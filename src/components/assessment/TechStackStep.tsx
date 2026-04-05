"use client";

import { useState } from "react";
import { useDiscovery } from "@/context/DiscoveryContext";
import StepShell from "./StepShell";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import RadioGroup from "@/components/ui/RadioGroup";
import { CURRENT_SYSTEMS, DATA_MATURITY_LEVELS } from "@/lib/constants";
import type { TechStack, DataMaturity } from "@/types/discovery";

export default function TechStackStep() {
  const { state, dispatch } = useDiscovery();
  const [form, setForm] = useState<TechStack>(state.techStack);

  const canProceed = form.dataMaturity !== "";

  const handleNext = () => {
    dispatch({ type: "SET_TECH_STACK", payload: form });
    dispatch({ type: "MARK_COMPLETE" });
  };

  const handleBack = () => {
    dispatch({ type: "SET_TECH_STACK", payload: form });
    dispatch({ type: "PREV_STEP" });
  };

  return (
    <StepShell
      title="Technology & Data Readiness"
      description="Help us understand your current technology landscape and data maturity."
      onNext={handleNext}
      onBack={handleBack}
      isLast
      canProceed={canProceed}
    >
      <CheckboxGroup
        label="What systems do you currently use?"
        options={CURRENT_SYSTEMS.map((s) => ({ value: s, label: s }))}
        values={form.currentSystems}
        onChange={(v) => setForm({ ...form, currentSystems: v })}
      />

      <RadioGroup
        label="How would you describe your data maturity?"
        name="dataMaturity"
        options={DATA_MATURITY_LEVELS}
        value={form.dataMaturity}
        onChange={(v) => setForm({ ...form, dataMaturity: v as DataMaturity })}
      />

      <div>
        <label className="mb-3 block text-sm font-medium text-slate-700">
          Integration Readiness (1 = Not ready, 5 = Fully ready)
        </label>
        <div className="flex items-center gap-3">
          {[1, 2, 3, 4, 5].map((n) => (
            <button
              key={n}
              onClick={() => setForm({ ...form, integrationReadiness: n })}
              className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors ${
                form.integrationReadiness >= n
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-500 hover:bg-slate-200"
              }`}
            >
              {n}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-3 block text-sm font-medium text-slate-700">
          Are you currently using any AI or machine learning tools?
        </label>
        <div className="flex gap-3">
          <button
            onClick={() => setForm({ ...form, existingAI: true })}
            className={`rounded-lg border px-6 py-2 text-sm font-medium transition-colors ${
              form.existingAI
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            Yes
          </button>
          <button
            onClick={() => setForm({ ...form, existingAI: false })}
            className={`rounded-lg border px-6 py-2 text-sm font-medium transition-colors ${
              !form.existingAI
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-slate-200 text-slate-600 hover:border-slate-300"
            }`}
          >
            No
          </button>
        </div>
      </div>
    </StepShell>
  );
}
