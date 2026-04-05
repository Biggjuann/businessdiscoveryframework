"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/assessment", label: "Assessment" },
  { href: "/report", label: "Report" },
  { href: "/implement", label: "Implementation Hub" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-kova-navy-light bg-kova-navy-mid">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative h-8 w-8">
            <div className="absolute inset-0 rotate-45 rounded bg-kova-violet/20 border border-kova-violet/40" />
            <div className="absolute inset-1 rotate-45 rounded-sm bg-kova-violet/40" />
            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold font-display text-white">
              K
            </span>
          </div>
          <span className="text-sm font-bold tracking-wider text-white font-display">KOVA</span>
        </Link>

        <div className="flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-kova-violet/10 text-kova-violet"
                    : "text-slate-400 hover:text-white hover:bg-kova-navy-light"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
