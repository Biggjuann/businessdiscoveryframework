"use client";

interface Option {
  value: string;
  label: string;
  description?: string;
}

interface RadioGroupProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  name: string;
}

export default function RadioGroup({ label, options, value, onChange, name }: RadioGroupProps) {
  return (
    <fieldset>
      {label && <legend className="mb-3 text-sm font-medium text-kova-violet-pale">{label}</legend>}
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-start rounded-lg border p-3 transition-colors ${
              value === option.value
                ? "border-kova-violet bg-kova-violet/10"
                : "border-kova-navy-light hover:border-kova-navy-light/80 hover:bg-kova-navy-light/50"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="mt-0.5 h-4 w-4 border-kova-navy-light text-kova-violet focus:ring-kova-violet bg-kova-navy"
            />
            <div className="ml-3">
              <span className="text-sm font-medium text-white">{option.label}</span>
              {option.description && (
                <p className="text-xs text-slate-400 mt-0.5">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
