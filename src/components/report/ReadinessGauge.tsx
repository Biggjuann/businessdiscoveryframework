"use client";

interface ReadinessGaugeProps {
  score: number;
}

export default function ReadinessGauge({ score }: ReadinessGaugeProps) {
  const getColor = () => {
    if (score >= 70) return "text-green-600";
    if (score >= 40) return "text-amber-500";
    return "text-red-500";
  };

  const getLabel = () => {
    if (score >= 70) return "High Readiness";
    if (score >= 40) return "Moderate Readiness";
    return "Early Stage";
  };

  const circumference = 2 * Math.PI * 54;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="flex flex-col items-center">
      <div className="relative h-36 w-36">
        <svg className="h-36 w-36 -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="54" fill="none" stroke="#e2e8f0" strokeWidth="8" />
          <circle
            cx="60"
            cy="60"
            r="54"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className={`transition-all duration-1000 ${getColor()}`}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={`text-3xl font-bold ${getColor()}`}>{score}</span>
          <span className="text-xs text-slate-500">/ 100</span>
        </div>
      </div>
      <p className={`mt-2 text-sm font-medium ${getColor()}`}>{getLabel()}</p>
    </div>
  );
}
