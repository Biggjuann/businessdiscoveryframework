"use client";

import { useRouter } from "next/navigation";
import { useDiscovery } from "@/context/DiscoveryContext";
import ProgressBar from "@/components/ui/ProgressBar";
import CompanyOverviewStep from "@/components/assessment/CompanyOverviewStep";
import CurrentWorkflowsStep from "@/components/assessment/CurrentWorkflowsStep";
import PainPointsStep from "@/components/assessment/PainPointsStep";
import GoalsStep from "@/components/assessment/GoalsStep";
import TechStackStep from "@/components/assessment/TechStackStep";
import { STEPS } from "@/lib/constants";
import { useEffect } from "react";

const stepComponents = [
  CompanyOverviewStep,
  CurrentWorkflowsStep,
  PainPointsStep,
  GoalsStep,
  TechStackStep,
];

export default function AssessmentPage() {
  const { state } = useDiscovery();
  const router = useRouter();

  useEffect(() => {
    if (state.isComplete) {
      router.push("/report");
    }
  }, [state.isComplete, router]);

  const StepComponent = stepComponents[state.currentStep];

  return (
    <div className="min-h-screen bg-kova-navy">
      <div className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8">
          <ProgressBar steps={STEPS.map((s) => s.title)} currentStep={state.currentStep} />
        </div>
        <div className="rounded-2xl border border-kova-navy-light bg-kova-navy-mid p-6 shadow-sm sm:p-10">
          {StepComponent && <StepComponent />}
        </div>
      </div>
    </div>
  );
}
