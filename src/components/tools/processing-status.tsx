"use client";

import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import { ProgressBar } from "./progress-bar";

export type ToolStatus = "idle" | "uploading" | "processing" | "generating" | "completed" | "failed";

const labels: Record<ToolStatus, string> = {
  idle: "Ready",
  uploading: "Uploading",
  processing: "Processing",
  generating: "Generating download",
  completed: "Completed",
  failed: "Failed"
};

const progress: Record<ToolStatus, number> = {
  idle: 0,
  uploading: 30,
  processing: 68,
  generating: 88,
  completed: 100,
  failed: 100
};

export function ProcessingStatus({ status, error }: { status: ToolStatus; error?: string }) {
  const Icon = status === "completed" ? CheckCircle2 : status === "failed" ? XCircle : Loader2;
  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex items-center gap-2 text-sm font-medium">
        <Icon className={status === "idle" || status === "completed" || status === "failed" ? "size-4" : "size-4 animate-spin"} />
        {labels[status]}
      </div>
      <div className="mt-3"><ProgressBar value={progress[status]} /></div>
      {error ? <p className="mt-3 text-sm leading-6 text-destructive">{error}</p> : null}
    </div>
  );
}
