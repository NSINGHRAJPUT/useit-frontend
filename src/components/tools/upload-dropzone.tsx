"use client";

import { FileUp } from "lucide-react";
import { useDropzone } from "react-dropzone";
import type { ToolDefinition } from "@toolkit-pro/shared-types";

export function UploadDropzone({
  tool,
  onFile,
  onError,
}: {
  tool: ToolDefinition;
  onFile: (file: File) => void;
  onError: (message: string) => void;
}) {
  const accept =
    tool.acceptedMimeTypes.length > 0
      ? Object.fromEntries(
          tool.acceptedMimeTypes.map((mime) => [
            mime,
            tool.acceptedFormats.map((format) => `.${format}`),
          ]),
        )
      : undefined;

  const dropzone = useDropzone({
    multiple: tool.inputType === "multi-file",
    accept,
    maxSize: 250 * 1024 * 1024,
    onDropAccepted: (accepted) => {
      if (accepted[0]) onFile(accepted[0]);
      if (tool.inputType === "multi-file") {
        accepted.forEach((file) => onFile(file));
      }
    },
    onDropRejected: ([rejection]) => {
      const message =
        rejection?.errors[0]?.code === "file-too-large"
          ? "This file is larger than the maximum supported upload size."
          : `Upload a valid ${tool.acceptedFormats.map((item) => item.toUpperCase()).join(", ")} file.`;
      onError(message);
    },
  });

  const label =
    tool.category === "pdf"
      ? "Drop a PDF or choose a file"
      : tool.category === "document"
        ? "Drop a document or choose a file"
        : "Drop a file or choose from your device";

  return (
    <div
      {...dropzone.getRootProps()}
      className="flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-2xl border border-dashed border-gold/25 bg-card/60 p-8 text-center transition hover:border-gold/40 hover:bg-gold/5"
    >
      <input {...dropzone.getInputProps()} />
      <FileUp className="size-10 text-gold" />
      <p className="mt-5 text-lg font-semibold">{label}</p>
      <p className="mt-2 text-sm text-muted-foreground">
        {tool.acceptedFormats.map((item) => item.toUpperCase()).join(", ")} accepted
      </p>
    </div>
  );
}
