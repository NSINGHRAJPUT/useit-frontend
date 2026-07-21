"use client";

import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Sparkles, Wand2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ProgressBar } from "./progress-bar";

export type ToolStatus = "idle" | "uploading" | "processing" | "generating" | "completed" | "failed";

const stageLabels: Record<ToolStatus, string> = {
  idle: "Ready when you are",
  uploading: "Uploading securely",
  processing: "Converting your files",
  generating: "Preparing download",
  completed: "All done",
  failed: "Something went wrong",
};

const rotatingMessages = [
  "Preparing your files in a secure workspace…",
  "Applying premium conversion settings…",
  "Optimizing quality and file size…",
  "Polishing the final output…",
  "Almost ready for download…",
];

const stages = [
  { key: "upload", label: "Upload" },
  { key: "process", label: "Convert" },
  { key: "ready", label: "Ready" },
] as const;

function useAnimatedProgress(
  status: ToolStatus,
  batchCurrent?: number,
  batchTotal?: number,
  runKey = 0,
) {
  const [value, setValue] = useState(0);

  const batchProgress =
    batchTotal && batchCurrent
      ? Math.min(
          99,
          (((batchCurrent - 1) / batchTotal) + 0.45 / batchTotal) * 100,
        )
      : null;

  useEffect(() => {
    if (status === "idle") {
      setValue(0);
      return;
    }
    if (status === "completed" || status === "failed") {
      setValue(100);
      return;
    }

    if (batchProgress != null) {
      setValue(batchProgress);
      return;
    }

    setValue(8);

    const tick = window.setInterval(() => {
      setValue((current) => {
        const cap = status === "uploading" ? 36 : status === "generating" ? 94 : 90;
        if (current >= cap) return current;
        return current + Math.max(0.5, (cap - current) * 0.12);
      });
    }, 80);

    return () => window.clearInterval(tick);
  }, [status, batchProgress, runKey]);

  if (batchProgress != null && (status === "uploading" || status === "processing" || status === "generating")) {
    return batchProgress;
  }

  return value;
}

function ProcessingOrb({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div className="relative mx-auto mb-4 flex size-20 items-center justify-center">
      <div className="processing-orbit absolute inset-0 rounded-full border border-dashed border-gold/30" />
      <div className="processing-orbit absolute inset-2 rounded-full border border-gold/20 [animation-direction:reverse] [animation-duration:4.5s]" />
      <div className="processing-pulse absolute inset-4 rounded-full bg-gold/10 blur-sm" />
      <div className="relative flex size-12 items-center justify-center rounded-2xl border border-gold/30 bg-background/80 shadow-[0_0_30px_oklch(0.72_0.14_82_/_0.25)]">
        <Wand2 className="size-5 text-gold" />
      </div>
    </div>
  );
}

export function ProcessingStatus({
  status,
  error,
  detail,
  batchCurrent,
  batchTotal,
  runKey = 0,
}: {
  status: ToolStatus;
  error?: string;
  detail?: string;
  batchCurrent?: number;
  batchTotal?: number;
  runKey?: number;
}) {
  const [messageIndex, setMessageIndex] = useState(0);
  const progress = useAnimatedProgress(status, batchCurrent, batchTotal, runKey);
  const isActive = status === "uploading" || status === "processing" || status === "generating";

  useEffect(() => {
    if (!isActive) return;
    const interval = window.setInterval(() => {
      setMessageIndex((index) => (index + 1) % rotatingMessages.length);
    }, 2400);
    return () => window.clearInterval(interval);
  }, [isActive]);

  const activeStage = useMemo(() => {
    if (status === "uploading") return 0;
    if (status === "processing" || status === "generating") return 1;
    if (status === "completed") return 2;
    return -1;
  }, [status]);

  if (status === "idle") return null;

  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border bg-card/80 p-5 shadow-sm backdrop-blur-sm transition-all duration-500",
        status === "completed" && "animate-success-pop border-gold/30",
        status === "failed" && "border-destructive/30",
        isActive && "border-gold/25",
      )}
    >
      {status === "completed" ? (
        <div className="flex flex-col items-center py-2 text-center">
          <div className="flex size-14 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
            <CheckCircle2 className="size-7 text-gold" />
          </div>
          <p className="mt-4 font-heading text-xl font-semibold text-metallic-gold">Conversion complete</p>
          <p className="mt-1 text-sm text-muted-foreground">Your files are ready to download.</p>
        </div>
      ) : status === "failed" ? (
        <div className="flex items-start gap-3">
          <XCircle className="mt-0.5 size-5 shrink-0 text-destructive" />
          <div>
            <p className="font-medium">Conversion failed</p>
            {error ? <p className="mt-2 text-sm leading-6 text-destructive">{error}</p> : null}
          </div>
        </div>
      ) : (
        <>
          <ProcessingOrb active={isActive} />

          <div className="text-center">
            <p className="flex items-center justify-center gap-2 font-heading text-lg font-semibold">
              <Sparkles className="size-4 text-gold" />
              {stageLabels[status]}
            </p>
            <p className="mt-2 min-h-[2.5rem] text-sm text-muted-foreground transition-opacity duration-500">
              {detail ?? rotatingMessages[messageIndex]}
            </p>
            {batchTotal && batchCurrent ? (
              <p className="mt-1 text-xs font-medium uppercase tracking-[0.2em] text-gold-muted">
                File {batchCurrent} of {batchTotal}
              </p>
            ) : null}
          </div>

          <div className="mt-5">
            <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <ProgressBar value={progress} active={isActive} />
          </div>

          <div className="mt-5 grid grid-cols-3 gap-2">
            {stages.map((stage, index) => {
              const isDone = activeStage > index;
              const isCurrent = activeStage === index;
              return (
                <div
                  key={stage.key}
                  className={cn(
                    "rounded-xl border px-2 py-2 text-center text-[11px] font-semibold uppercase tracking-wide transition-all duration-500",
                    isDone && "border-gold/25 bg-gold/10 text-gold",
                    isCurrent && "stage-active border-gold/40 bg-gold/15 text-foreground",
                    !isDone && !isCurrent && "border-border/60 text-muted-foreground",
                  )}
                >
                  {stage.label}
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
