"use client";

interface Option {
  value: string;
  label: string;
}

interface SelectProps {
  label?: string;
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
}

export default function Select({ label, options, value, onChange, placeholder, error }: SelectProps) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-kova-violet-pale">{label}</label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full rounded-lg border border-kova-navy-light bg-kova-navy px-3 py-2 text-sm text-white focus:border-kova-violet focus:outline-none focus:ring-1 focus:ring-kova-violet ${
          error ? "border-kova-red" : ""
        } ${!value ? "text-slate-500" : ""}`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-kova-red">{error}</p>}
    </div>
  );
}
