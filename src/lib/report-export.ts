import type { DiscoveryState, AnalysisResult } from "@/types/discovery";

export interface ClientReport {
  version: "1.0";
  exportedAt: string;
  client: DiscoveryState;
  analysis: AnalysisResult;
}

export function exportReport(state: DiscoveryState, analysis: AnalysisResult): ClientReport {
  return {
    version: "1.0",
    exportedAt: new Date().toISOString(),
    client: state,
    analysis,
  };
}

export function downloadReportJSON(report: ClientReport) {
  const blob = new Blob([JSON.stringify(report, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `kova-report-${report.client.companyOverview.companyName.toLowerCase().replace(/\s+/g, "-")}-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function validateReportFile(data: unknown): data is ClientReport {
  if (!data || typeof data !== "object") return false;
  const obj = data as Record<string, unknown>;
  return (
    obj.version === "1.0" &&
    typeof obj.exportedAt === "string" &&
    obj.client !== null &&
    typeof obj.client === "object" &&
    obj.analysis !== null &&
    typeof obj.analysis === "object"
  );
}
