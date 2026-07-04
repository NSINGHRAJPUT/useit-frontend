import Link from "next/link";
import { ArrowRight, LayoutDashboard, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/constants/site";
import { GlobalSearch } from "./global-search";
import { ThemeToggle } from "./theme-toggle";

const nav = [
  ["Tools", "/tools"],
  ["Pricing", "/pricing"],
  ["Blog", "/blog"],
  ["FAQ", "/faq"],
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-gold/15 bg-background/75 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 font-semibold"
        >
          <span className="flex size-9 items-center justify-center rounded-xl btn-gold shadow-sm">
            <Sparkles className="size-4" />
          </span>
          <span className="text-base tracking-tight">
            <span className="text-metallic-gold">{siteConfig.name}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground md:flex">
          {nav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className="transition hover:text-gold"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="hidden flex-1 justify-end lg:flex">
          <GlobalSearch />
        </div>
        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="hidden text-muted-foreground hover:text-gold sm:inline-flex"
          >
            <Link href="/dashboard">
              <LayoutDashboard className="size-4" />
              Dashboard
            </Link>
          </Button>
          <Button size="sm" asChild className="btn-gold border-0 font-semibold">
            <Link href="/tools">
              Start
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
