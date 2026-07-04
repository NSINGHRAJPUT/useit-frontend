import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Heading({
  as: Component = "h2",
  children,
  className,
}: {
  as?: ElementType;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Component
      className={cn(
        "text-balance text-3xl font-semibold tracking-tight sm:text-4xl",
        className,
      )}
    >
      {children}
    </Component>
  );
}
