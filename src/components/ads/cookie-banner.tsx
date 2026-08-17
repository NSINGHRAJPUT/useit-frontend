"use client";

import { useCallback, useSyncExternalStore } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const STORAGE_KEY = "toolpin-cookie-consent";
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  try {
    return window.localStorage.getItem(STORAGE_KEY) !== "accepted";
  } catch {
    return true;
  }
}

function getServerSnapshot() {
  return false;
}

export function CookieBanner() {
  const visible = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const accept = useCallback(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // Ignore storage failures.
    }
    emit();
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-gold/20 bg-background/95 px-4 py-4 shadow-[0_-12px_40px_oklch(0.05_0.02_265_/_0.35)] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-3xl text-sm leading-6 text-muted-foreground">
          ToolPin uses cookies for theme preference and Google AdSense advertising. See our{" "}
          <Link href="/privacy-policy" className="text-gold underline-offset-2 hover:underline">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="/cookie-policy" className="text-gold underline-offset-2 hover:underline">
            Cookie Policy
          </Link>
          .
        </p>
        <Button className="btn-gold shrink-0 border-0" onClick={accept}>
          Accept
        </Button>
      </div>
    </div>
  );
}
