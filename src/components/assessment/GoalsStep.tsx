"use client";

import { useState } from "react";
import { useDiscovery } from "@/context/DiscoveryContext";
import StepShell from "./StepShell";
import CheckboxGroup from "@/components/ui/CheckboxGroup";
import RadioGroup from "@/components/ui/RadioGroup";
import TextArea from "@/components/ui/TextArea";
import { OBJECTIVES, TIMELINES, BUDGET_RANGES } from "@/lib/constants";
import type { Goals, Objective, Timeline, BudgetRange } from "@/types/discovery";

export default function GoalsStep() {
  const { state, dispatch } = useDiscovery();
  const [form, setForm] = useState<Goals>(state.goals);

  const canProceed = form.primaryObjectives.length > 0 && form.timeline !== "";

  const handleNext = () => {
    dispatch({ type: "SET_GOALS", payload: form });
    dispatch({ type: "NEXT_STEP" });
  };

  const handleBack = () => {
    dispatch({ type: "SET_GOALS", payload: form });
    dispatch({ type: "PREV_STEP" });
  };

  return (
    <StepShell
      title="Goals & Priorities"
      description="What outcomes are you looking to achieve with AI-powered optimization?"
      onNext={handleNext}
      onBack={handleBack}
      canProceed={canProceed}
    >
      <CheckboxGroup
        label="What are your primary objectives? (select all that apply)"
        options={OBJECTIVES}
        values={form.primaryObjectives}
        onChange={(v) => setForm({ ...form, primaryObjectives: v as Objective[] })}
      />

      <RadioGroup
        label="What is your target timeline for seeing results?"
        name="timeline"
        options={TIMELINES}
        value={form.timeline}
        onChange={(v) => setForm({ ...form, timeline: v as Timeline })}
      />

      <RadioGroup
        label="What is your estimated budget for AI initiatives?"
        name="budgetRange"
        options={BUDGET_RANGES}
        value={form.budgetRange}
        onChange={(v) => setForm({ ...form, budgetRange: v as BudgetRange })}
      />

      <TextArea
        label="How will you measure success?"
        placeholder="e.g., 20% reduction in processing time, 30% fewer manual errors, $100K cost savings..."
        value={form.successMetrics}
        onChange={(e) => setForm({ ...form, successMetrics: e.target.value })}
      />
    </StepShell>
  );
}
