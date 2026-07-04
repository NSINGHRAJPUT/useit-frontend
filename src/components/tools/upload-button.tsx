"use client";

import { Loader2, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function UploadButton({ disabled, busy, onClick }: { disabled?: boolean; busy?: boolean; onClick: () => void }) {
  return (
    <Button className="w-full" disabled={disabled || busy} onClick={onClick}>
      {busy ? <Loader2 className="size-4 animate-spin" /> : <Wand2 className="size-4" />}
      Process file
    </Button>
  );
}
