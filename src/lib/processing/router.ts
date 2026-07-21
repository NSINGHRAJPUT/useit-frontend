import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { api } from "@/services/api";
import type { ToolResult } from "@/components/tools/download-card";
import type { ProcessInput, ProcessOutput, ProcessOptions } from "./types";
import { validateFiles, validateText } from "./validate";
import { toDownloadUrl } from "./download";
import { processImageTool, processImageBatch } from "./processors/image.processor";
import { processTextTool } from "./processors/text.processor";
import { processPdfTool } from "./processors/pdf.processor";
import { processDocumentTool } from "./processors/document.processor";

function outputToResult(output: ProcessOutput, id?: string): ToolResult {
  return {
    id: id ?? crypto.randomUUID(),
    downloadUrl: toDownloadUrl(output),
    fileName: output.fileName,
    inputSize: output.inputSize,
    outputSize: output.outputSize,
    isLocal: true,
  };
}

async function pollJob(jobId: string, tool: ToolDefinition): Promise<ToolResult> {
  const maxAttempts = 120;
  for (let i = 0; i < maxAttempts; i++) {
    const { data } = await api.get<{
      data: {
        status: string;
        downloadUrl?: string;
        errorMessage?: string;
        conversionId?: string;
        fileName?: string;
        inputSize?: number;
        outputSize?: number;
      };
    }>(`/conversions/jobs/${jobId}`);
    if (data.data.status === "completed" && data.data.downloadUrl) {
      return {
        id: data.data.conversionId ?? jobId,
        downloadUrl: data.data.downloadUrl,
        fileName: data.data.fileName ?? "processed-file",
        inputSize: data.data.inputSize ?? 0,
        outputSize: data.data.outputSize ?? 0,
        isLocal: false,
      };
    }
    if (data.data.status === "failed") {
      throw new Error(data.data.errorMessage ?? "Processing failed.");
    }
    await new Promise((r) => setTimeout(r, 2000));
  }
  throw new Error("Processing timed out. Try again later.");
}

async function processOnServer(
  tool: ToolDefinition,
  files: File[],
  options: ProcessOptions,
): Promise<ToolResult> {
  const form = new FormData();
  for (const file of files) form.append("file", file);
  if (options.quality != null) form.set("quality", String(options.quality));
  if (options.width != null) form.set("width", String(options.width));
  if (options.height != null) form.set("height", String(options.height));
  if (options.text) form.set("text", options.text);

  const { data, status } = await api.post<{
    data: ToolResult & { jobId?: string };
  }>(`/conversions/${tool.slug}`, form);

  if (status === 202 && data.data.jobId) {
    return pollJob(data.data.jobId, tool);
  }
  return { ...data.data, isLocal: false };
}

async function processOnClient(input: ProcessInput): Promise<ProcessOutput | ProcessOutput[]> {
  const { tool } = input;
  if (tool.category === "text") return processTextTool(input);
  if (tool.category === "image") {
    if (input.files.length > 1 && tool.inputType === "file") {
      return processImageBatch(input);
    }
    return processImageTool(input);
  }
  if (tool.category === "pdf") return processPdfTool(input);
  if (tool.category === "document") return processDocumentTool(input);
  throw new Error(`No client processor for "${tool.slug}".`);
}

export async function processTool(input: {
  tool: ToolDefinition;
  files?: File[];
  options?: ProcessOptions;
}): Promise<ToolResult | ToolResult[]> {
  const { tool } = input;
  const files = input.files ?? [];
  const options = input.options ?? {};

  if (tool.processingLocation === "server") {
    await validateFiles(files, tool);
    return processOnServer(tool, files, options);
  }

  if (tool.inputType === "text") {
    validateText(options.text ?? "");
    const output = (await processOnClient({ tool, files: [], options })) as ProcessOutput;
    return outputToResult(output);
  }

  await validateFiles(files, tool);
  const result = await processOnClient({ tool, files, options });
  if (Array.isArray(result)) {
    return result.map((output) => outputToResult(output));
  }
  return outputToResult(result);
}
