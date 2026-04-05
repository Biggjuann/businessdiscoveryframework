"use client";

import Button from "@/components/ui/Button";

interface StepShellProps {
  title: string;
  description: string;
  children: React.ReactNode;
  onNext: () => void;
  onBack?: () => void;
  isFirst?: boolean;
  isLast?: boolean;
  canProceed?: boolean;
}

export default function StepShell({
  title,
  description,
  children,
  onNext,
  onBack,
  isFirst,
  isLast,
  canProceed = true,
}: StepShellProps) {
  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-900">{title}</h2>
        <p className="mt-1 text-sm text-slate-500">{description}</p>
      </div>

      <div className="space-y-6">{children}</div>

      <div className="mt-8 flex justify-between">
        {!isFirst ? (
          <Button variant="outline" onClick={onBack}>
            Back
          </Button>
        ) : (
          <div />
        )}
        <Button onClick={onNext} disabled={!canProceed}>
          {isLast ? "Generate Report" : "Continue"}
        </Button>
      </div>
    </div>
  );
}
