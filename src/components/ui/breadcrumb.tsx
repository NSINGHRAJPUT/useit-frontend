import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Breadcrumb({ children, className }: { children: React.ReactNode; className?: string }) {
  return <nav aria-label="breadcrumb" className={cn("text-sm text-muted-foreground", className)}>{children}</nav>;
}

export function BreadcrumbList({ children }: { children: React.ReactNode }) {
  return <ol className="flex flex-wrap items-center gap-2">{children}</ol>;
}

export function BreadcrumbItem({ children }: { children: React.ReactNode }) {
  return <li className="flex items-center gap-2">{children}</li>;
}

export function BreadcrumbLink({ href, children }: { href: string; children: React.ReactNode }) {
  return <Link href={href} className="transition hover:text-foreground">{children}</Link>;
}

export function BreadcrumbPage({ children }: { children: React.ReactNode }) {
  return <span className="font-medium text-foreground">{children}</span>;
}

export function BreadcrumbSeparator() {
  return <ChevronRight className="size-4" />;
}
