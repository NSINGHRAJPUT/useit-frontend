"use client";

import Image from "next/image";
import { FileImage } from "lucide-react";
import { useEffect, useState } from "react";
import { formatBytes } from "@/lib/format";

export function FilePreview({ file }: { file: File | null }) {
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    if (!file) {
      setUrl(null);
      return;
    }
    const nextUrl = URL.createObjectURL(file);
    setUrl(nextUrl);
    return () => URL.revokeObjectURL(nextUrl);
  }, [file]);

  if (!file) return null;

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm">
      <div className="flex gap-4">
        <div className="relative flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-md bg-muted">
          {url ? <Image src={url} alt={file.name} fill sizes="80px" className="object-cover" unoptimized /> : <FileImage className="size-6" />}
        </div>
        <div className="min-w-0">
          <p className="truncate font-medium">{file.name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{file.type} · {formatBytes(file.size)}</p>
        </div>
      </div>
    </div>
  );
}
