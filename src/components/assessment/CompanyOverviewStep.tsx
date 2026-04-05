"use client";

import { useState } from "react";
import { useDiscovery } from "@/context/DiscoveryContext";
import StepShell from "./StepShell";
import TextInput from "@/components/ui/TextInput";
import TextArea from "@/components/ui/TextArea";
import Select from "@/components/ui/Select";
import RadioGroup from "@/components/ui/RadioGroup";
import { INDUSTRIES, EMPLOYEE_RANGES, REVENUE_RANGES } from "@/lib/constants";
import type { CompanyOverview } from "@/types/discovery";

export default function CompanyOverviewStep() {
  const { state, dispatch } = useDiscovery();
  const [form, setForm] = useState<CompanyOverview>(state.companyOverview);

  const canProceed = form.companyName.trim() !== "" && form.industry !== "" && form.employeeCount !== "";

  const handleNext = () => {
    dispatch({ type: "SET_COMPANY_OVERVIEW", payload: form });
    dispatch({ type: "NEXT_STEP" });
  };

  return (
    <StepShell
      title="Company Overview"
      description="Help us understand your business so we can tailor AI recommendations to your context."
      onNext={handleNext}
      isFirst
      canProceed={canProceed}
    >
      <TextInput
        label="Company Name"
        placeholder="Acme Corp"
        value={form.companyName}
        onChange={(e) => setForm({ ...form, companyName: e.target.value })}
      />

      <Select
        label="Industry"
        options={INDUSTRIES}
        value={form.industry}
        onChange={(v) => setForm({ ...form, industry: v as CompanyOverview["industry"] })}
        placeholder="Select your industry"
      />

      <RadioGroup
        label="Number of Employees"
        name="employeeCount"
        options={EMPLOYEE_RANGES}
        value={form.employeeCount}
        onChange={(v) => setForm({ ...form, employeeCount: v as CompanyOverview["employeeCount"] })}
      />

      <RadioGroup
        label="Annual Revenue"
        name="annualRevenue"
        options={REVENUE_RANGES}
        value={form.annualRevenue}
        onChange={(v) => setForm({ ...form, annualRevenue: v as CompanyOverview["annualRevenue"] })}
      />

      <TextArea
        label="Brief description of your business"
        placeholder="What does your company do? What products or services do you offer?"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
    </StepShell>
  );
}
