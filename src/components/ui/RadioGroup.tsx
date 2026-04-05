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
      {label && <legend className="mb-3 text-sm font-medium text-slate-700">{label}</legend>}
      <div className="space-y-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-start rounded-lg border p-3 transition-colors ${
              value === option.value
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <input
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              className="mt-0.5 h-4 w-4 text-blue-600 focus:ring-blue-500"
            />
            <div className="ml-3">
              <span className="text-sm font-medium text-slate-900">{option.label}</span>
              {option.description && (
                <p className="text-xs text-slate-500 mt-0.5">{option.description}</p>
              )}
            </div>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
