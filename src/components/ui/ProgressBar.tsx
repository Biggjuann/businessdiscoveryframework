"use client";

interface ProgressBarProps {
  steps: string[];
  currentStep: number;
}

export default function ProgressBar({ steps, currentStep }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step} className="flex flex-1 items-center">
            <div className="flex flex-col items-center">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium font-display transition-colors ${
                  index < currentStep
                    ? "bg-kova-violet text-white"
                    : index === currentStep
                    ? "bg-kova-violet text-white ring-4 ring-kova-violet/20"
                    : "bg-kova-navy-light text-slate-500"
                }`}
              >
                {index < currentStep ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  index + 1
                )}
              </div>
              <span
                className={`mt-2 text-xs font-medium hidden sm:block ${
                  index <= currentStep ? "text-kova-violet" : "text-slate-500"
                }`}
              >
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mx-2 h-0.5 flex-1 transition-colors ${
                  index < currentStep ? "bg-kova-violet" : "bg-kova-navy-light"
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
