"use client";

import { useState } from "react";
import { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { api } from "@/services/api";
import { DownloadCard, type ToolResult } from "./download-card";
import { ProcessingStatus, type ToolStatus } from "./processing-status";

export function TextTool({ tool }: { tool: ToolDefinition }) {
  const [text, setText] = useState("");
  const [status, setStatus] = useState<ToolStatus>("idle");
  const [result, setResult] = useState<ToolResult | null>(null);
  const [busy, setBusy] = useState(false);

  async function process() {
    if (!text.trim()) return toast.error("Enter text to process.");
    const form = new FormData();
    form.set("text", text);
    setBusy(true);
    setStatus("processing");
    setResult(null);
    try {
      const { data } = await api.post<{ data: ToolResult }>(`/conversions/${tool.slug}`, form);
      setResult(data.data);
      setStatus("completed");
      toast.success("Conversion complete.");
    } catch (error) {
      setStatus("failed");
      const message =
        error instanceof AxiosError ? error.response?.data?.error?.message : "Conversion failed.";
      toast.error(message ?? "Conversion failed.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <div className="space-y-4 rounded-lg border bg-card p-6 shadow-sm">
        <Label htmlFor="text-input">Input</Label>
        <Textarea
          id="text-input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste your text, JSON, CSV, or data here…"
          className="min-h-[280px] font-mono text-sm"
        />
        <Button onClick={process} disabled={busy} className="w-full sm:w-auto">
          {busy ? <Loader2 className="size-4 animate-spin" /> : null}
          Process
        </Button>
      </div>
      <div className="space-y-4">
        <ProcessingStatus status={status} />
        {result ? <DownloadCard result={result} /> : null}
      </div>
    </div>
  );
}
