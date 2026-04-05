"use client";

import { useCallback, useState } from "react";
import { validateReportFile, type ClientReport } from "@/lib/report-export";
import Button from "@/components/ui/Button";

interface ReportUploaderProps {
  onReportLoaded: (report: ClientReport) => void;
}

export default function ReportUploader({ onReportLoaded }: ReportUploaderProps) {
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const processFile = useCallback(
    (file: File) => {
      setError(null);
      if (!file.name.endsWith(".json")) {
        setError("Please upload a .json report file exported from the discovery assessment.");
        return;
      }
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = JSON.parse(e.target?.result as string);
          if (!validateReportFile(data)) {
            setError("Invalid report format. Please upload a KOVA discovery report file.");
            return;
          }
          onReportLoaded(data);
        } catch {
          setError("Failed to parse file. Ensure it is a valid JSON report.");
        }
      };
      reader.readAsText(file);
    },
    [onReportLoaded]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  return (
    <div className="flex min-h-screen items-center justify-center bg-kova-navy px-4">
      <div className="w-full max-w-lg text-center">
        <div className="mb-2 flex justify-center">
          <div className="relative h-12 w-12">
            <div className="absolute inset-0 rotate-45 rounded-lg bg-kova-violet/20 border border-kova-violet/40" />
            <div className="absolute inset-2 rotate-45 rounded-md bg-kova-violet/40" />
            <span className="absolute inset-0 flex items-center justify-center text-lg font-bold font-display text-white">
              K
            </span>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-white font-display">KOVA Implementation Hub</h1>
        <p className="mt-2 text-slate-400">
          Upload a client discovery report to generate an actionable implementation plan.
        </p>

        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={`mt-8 rounded-2xl border-2 border-dashed p-12 transition-colors ${
            isDragging
              ? "border-kova-violet bg-kova-violet/5"
              : "border-kova-navy-light hover:border-kova-violet/40"
          }`}
        >
          <svg
            className="mx-auto h-12 w-12 text-slate-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={1}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
          <p className="mt-4 text-sm text-slate-400">
            Drag & drop a report JSON file here, or
          </p>
          <label className="mt-3 inline-block cursor-pointer rounded-lg bg-kova-navy-light px-4 py-2 text-sm font-semibold text-white hover:bg-kova-navy-light/80 transition-colors font-display">
            Browse Files
            <input
              type="file"
              accept=".json"
              onChange={handleFileInput}
              className="hidden"
            />
          </label>
        </div>

        {error && (
          <div className="mt-4 rounded-lg bg-kova-red/10 border border-kova-red/30 p-3 text-sm text-kova-red">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
