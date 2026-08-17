import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-4 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.24em] text-gold">404</p>
      <h1 className="mt-4 font-heading text-4xl font-semibold">Page not found</h1>
      <p className="mt-4 text-muted-foreground">
        That URL is not a tool or article on ToolPin. Try the tools directory or go home.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild className="btn-gold border-0">
          <Link href="/">Home</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/tools">All tools</Link>
        </Button>
      </div>
    </div>
  );
}
