"use client";

import { type ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-kova-violet text-white hover:bg-kova-violet-deep shadow-sm shadow-kova-violet/25",
  secondary: "bg-kova-navy-light text-white hover:bg-kova-navy-mid",
  outline: "border border-kova-navy-light text-white hover:bg-kova-navy-light",
};

const sizeClasses: Record<Size, string> = {
  sm: "px-3 py-1.5 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-6 py-3 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  className = "",
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-lg font-semibold font-display transition-colors focus:outline-none focus:ring-2 focus:ring-kova-violet focus:ring-offset-2 focus:ring-offset-kova-navy disabled:opacity-50 disabled:cursor-not-allowed ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      disabled={disabled}
      {...props}
    />
  );
}
