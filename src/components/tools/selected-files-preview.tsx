"use client";

import { useEffect, useMemo, useState } from "react";
import { FileText, FileType, ImageIcon, Layers, Sparkles, X } from "lucide-react";
import { formatBytes } from "@/lib/format";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type PreviewKind = "image" | "pdf" | "other";

function getPreviewKind(file: File): PreviewKind {
  if (file.type.startsWith("image/")) return "image";
  if (file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf")) return "pdf";
  return "other";
}

function FileTypeIcon({ kind }: { kind: PreviewKind }) {
  if (kind === "image") return <ImageIcon className="size-8 text-gold" />;
  if (kind === "pdf") return <FileType className="size-8 text-gold" />;
  return <FileText className="size-8 text-gold" />;
}

function useObjectUrls(files: File[]) {
  const [urls, setUrls] = useState<string[]>([]);

  useEffect(() => {
    const next = files.map((file) => {
      const kind = getPreviewKind(file);
      return kind === "image" || kind === "pdf" ? URL.createObjectURL(file) : "";
    });
    setUrls(next);

    return () => {
      next.forEach((url) => {
        if (url) URL.revokeObjectURL(url);
      });
    };
  }, [files]);

  return urls;
}

function PreviewMedia({ file, url }: { file: File; url: string }) {
  const kind = getPreviewKind(file);

  if (kind === "image") {
    return (
      <img
        src={url}
        alt={file.name}
        className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
    );
  }

  if (kind === "pdf") {
    return (
      <iframe
        src={`${url}#toolbar=0&navpanes=0`}
        title={file.name}
        className="h-full w-full border-0 bg-white"
      />
    );
  }

  return null;
}

function FilePreviewCard({
  file,
  url,
  compact,
  index,
  onRemove,
}: {
  file: File;
  url: string;
  compact?: boolean;
  index: number;
  onRemove: () => void;
}) {
  const kind = getPreviewKind(file);
  const hasVisualPreview = kind === "image" || kind === "pdf";

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border bg-card/70 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-gold/35 hover:shadow-[0_20px_40px_oklch(0.5_0.1_82_/_0.12)]",
        compact ? "border-gold/15" : "animate-scale-in border-gold/25",
      )}
      style={{ animationDelay: `${index * 70}ms` }}
    >
      <div
        className={cn(
          "relative overflow-hidden bg-muted/30",
          compact ? "aspect-[4/3]" : "aspect-video max-h-[300px] sm:max-h-[340px]",
        )}
      >
        {hasVisualPreview && url ? (
          <>
            <PreviewMedia file={file} url={url} />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 p-4 text-center">
            <div className="icon-float-inner">
              <FileTypeIcon kind={kind} />
            </div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              {file.name.split(".").pop()}
            </p>
          </div>
        )}

        <div className="absolute left-3 top-3 rounded-full border border-gold/20 bg-background/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-gold backdrop-blur-sm">
          #{index + 1}
        </div>

        <Button
          type="button"
          size="icon"
          variant="secondary"
          className="absolute right-2 top-2 size-8 rounded-full border border-border/60 bg-background/90 opacity-100 shadow-md backdrop-blur-sm transition-all duration-300 hover:scale-105 sm:opacity-0 sm:group-hover:opacity-100"
          onClick={onRemove}
          aria-label={`Remove ${file.name}`}
        >
          <X className="size-4" />
        </Button>
      </div>

      <div className="space-y-0.5 border-t border-gold/10 px-3.5 py-3">
        <p className="truncate text-sm font-medium" title={file.name}>
          {file.name}
        </p>
        <p className="text-xs text-muted-foreground">{formatBytes(file.size)}</p>
      </div>
    </div>
  );
}

export function SelectedFilesPreview({
  files,
  onRemove,
}: {
  files: File[];
  onRemove: (index: number) => void;
}) {
  const urls = useObjectUrls(files);
  const compact = files.length > 1;
  const totalSize = useMemo(() => files.reduce((sum, file) => sum + file.size, 0), [files]);

  const gridClass = useMemo(() => {
    if (files.length === 1) return "grid-cols-1";
    if (files.length === 2) return "grid-cols-1 sm:grid-cols-2";
    return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
  }, [files.length]);

  if (!files.length) return null;

  return (
    <div className="animate-fade-up-in space-y-4 rounded-2xl border border-gold/20 bg-card/40 p-4 backdrop-blur-sm sm:p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-xl border border-gold/25 bg-gold/10">
            <Layers className="size-4 text-gold" />
          </div>
          <div>
            <p className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="size-3.5 text-gold" />
              {files.length} file{files.length > 1 ? "s" : ""} ready
            </p>
            <p className="text-xs text-muted-foreground">Total {formatBytes(totalSize)}</p>
          </div>
        </div>
        {files.length > 1 ? (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="h-8 text-muted-foreground hover:text-foreground"
            onClick={() => onRemove(-1)}
          >
            Clear all
          </Button>
        ) : null}
      </div>

      <div className={`grid gap-3 ${gridClass}`}>
        {files.map((file, index) => (
          <FilePreviewCard
            key={`${file.name}-${file.size}-${file.lastModified}-${index}`}
            file={file}
            url={urls[index] ?? ""}
            compact={compact}
            index={index}
            onRemove={() => onRemove(index)}
          />
        ))}
      </div>
    </div>
  );
}
