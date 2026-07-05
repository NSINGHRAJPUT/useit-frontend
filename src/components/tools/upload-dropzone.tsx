"use client";

import { FileUp, FolderOpen, Sparkles } from "lucide-react";
import { useDropzone } from "react-dropzone";
import type { ToolDefinition } from "@toolkit-pro/shared-types";
import { getToolIcon } from "@/lib/tool-icons";
import { cn } from "@/lib/utils";

export function UploadDropzone({
  tool,
  onFiles,
  onError,
  hasFiles = false,
}: {
  tool: ToolDefinition;
  onFiles: (files: File[]) => void;
  onError: (message: string) => void;
  hasFiles?: boolean;
}) {
  const allowsMultiple = tool.inputType === "multi-file" || tool.category === "image";
  const ToolIcon = getToolIcon(tool);

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
    multiple: allowsMultiple,
    accept,
    maxSize: 250 * 1024 * 1024,
    onDropAccepted: (accepted) => {
      if (!accepted.length) return;
      onFiles(accepted);
    },
    onDropRejected: (rejections) => {
      const rejection = rejections[0];
      const message =
        rejection?.errors[0]?.code === "file-too-large"
          ? "This file is larger than the maximum supported upload size."
          : `Upload a valid ${tool.acceptedFormats.map((item) => item.toUpperCase()).join(", ")} file.`;
      onError(message);
    },
  });

  const { isDragActive, isDragAccept, isDragReject } = dropzone;

  const label = hasFiles
    ? allowsMultiple
      ? "Add more files"
      : "Replace file"
    : tool.category === "image" && allowsMultiple
      ? "Drop your images here"
      : tool.category === "pdf"
        ? "Drop your PDF here"
        : tool.category === "document"
          ? "Drop your document here"
          : "Drop your file here";

  const formats = tool.acceptedFormats.map((item) => item.toUpperCase()).join(" · ");

  return (
    <div
      {...dropzone.getRootProps()}
      className={cn(
        "group relative cursor-pointer overflow-hidden rounded-2xl border text-center transition-all duration-500 ease-out",
        hasFiles
          ? "min-h-[112px] border-gold/20 bg-card/50 px-6 py-5 backdrop-blur-sm hover:border-gold/35 hover:bg-gold/5"
          : "min-h-[340px] border-dashed border-gold/25 bg-card/40 p-8 backdrop-blur-md hover:border-gold/45",
        !hasFiles && "dropzone-shimmer dropzone-ring animate-dropzone-glow",
        isDragActive && "scale-[1.01] border-gold/60 bg-gold/10",
        isDragAccept && "border-gold shadow-[0_0_40px_oklch(0.72_0.14_82_/_0.25)]",
        isDragReject && "border-destructive/50 bg-destructive/5",
      )}
    >
      <input {...dropzone.getInputProps()} />

      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 transition-opacity duration-500",
          isDragActive ? "opacity-100" : "opacity-60 group-hover:opacity-90",
        )}
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 0%, oklch(0.72 0.12 82 / 0.14), transparent 70%)",
        }}
      />

      <div
        className={cn(
          "relative z-10 flex flex-col items-center justify-center",
          hasFiles ? "gap-3 sm:flex-row sm:justify-between sm:text-left" : "gap-5",
        )}
      >
        <div className={cn("flex items-center gap-4", hasFiles ? "" : "flex-col")}>
          <div
            className={cn(
              "relative flex items-center justify-center rounded-2xl border border-gold/25 bg-background/50 shadow-inner transition-transform duration-500",
              hasFiles ? "size-12" : "size-20",
              isDragActive ? "scale-110" : "group-hover:scale-105",
            )}
          >
            <div className={cn(!hasFiles && "icon-float-inner")}>
              {isDragActive ? (
                <Sparkles className={cn("text-gold", hasFiles ? "size-5" : "size-9")} />
              ) : (
                <ToolIcon className={cn("text-gold", hasFiles ? "size-5" : "size-9")} />
              )}
            </div>
            {!hasFiles ? (
              <div className="absolute -bottom-1 -right-1 flex size-8 items-center justify-center rounded-full border border-gold/30 bg-card shadow-sm">
                <FileUp className="size-4 text-gold-muted" />
              </div>
            ) : null}
          </div>

          <div className={hasFiles ? "min-w-0 flex-1" : ""}>
            <p className={cn("font-semibold tracking-tight", hasFiles ? "text-base" : "font-heading text-2xl")}>
              {isDragActive ? (isDragReject ? "Unsupported file type" : "Release to upload") : label}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">
              {formats}
              {allowsMultiple ? " · multi-select supported" : ""}
            </p>
          </div>
        </div>

        <div
          className={cn(
            "inline-flex items-center gap-2 rounded-full border border-gold/25 bg-background/70 px-4 py-2 text-sm font-medium text-foreground shadow-sm transition-all duration-300",
            "group-hover:border-gold/40 group-hover:bg-gold/10",
            isDragActive && "border-gold/50 bg-gold/15",
          )}
        >
          <FolderOpen className="size-4 text-gold" />
          Browse files
        </div>
      </div>
    </div>
  );
}
