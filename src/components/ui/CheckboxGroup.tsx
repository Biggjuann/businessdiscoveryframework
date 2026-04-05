"use client";

interface Option {
  value: string;
  label: string;
}

interface CheckboxGroupProps {
  label?: string;
  options: Option[];
  values: string[];
  onChange: (values: string[]) => void;
}

export default function CheckboxGroup({ label, options, values, onChange }: CheckboxGroupProps) {
  const toggle = (value: string) => {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  return (
    <fieldset>
      {label && <legend className="mb-3 text-sm font-medium text-slate-700">{label}</legend>}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center rounded-lg border p-3 transition-colors ${
              values.includes(option.value)
                ? "border-blue-500 bg-blue-50"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <input
              type="checkbox"
              checked={values.includes(option.value)}
              onChange={() => toggle(option.value)}
              className="h-4 w-4 rounded text-blue-600 focus:ring-blue-500"
            />
            <span className="ml-3 text-sm text-slate-700">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
