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
      {label && <legend className="mb-3 text-sm font-medium text-kova-violet-pale">{label}</legend>}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex cursor-pointer items-center rounded-lg border p-3 transition-colors ${
              values.includes(option.value)
                ? "border-kova-violet bg-kova-violet/10"
                : "border-kova-navy-light hover:border-kova-navy-light/80 hover:bg-kova-navy-light/50"
            }`}
          >
            <input
              type="checkbox"
              checked={values.includes(option.value)}
              onChange={() => toggle(option.value)}
              className="h-4 w-4 rounded border-kova-navy-light text-kova-violet focus:ring-kova-violet bg-kova-navy"
            />
            <span className="ml-3 text-sm text-slate-300">{option.label}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}
