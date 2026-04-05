"use client";

import { type InputHTMLAttributes } from "react";

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function TextInput({ label, error, className = "", ...props }: TextInputProps) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-kova-violet-pale">{label}</label>
      )}
      <input
        className={`w-full rounded-lg border border-kova-navy-light bg-kova-navy px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-kova-violet focus:outline-none focus:ring-1 focus:ring-kova-violet ${
          error ? "border-kova-red" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-kova-red">{error}</p>}
    </div>
  );
}
