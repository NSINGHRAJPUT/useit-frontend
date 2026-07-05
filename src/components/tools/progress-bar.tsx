"use client";

export function ProgressBar({
  value,
  active = false,
}: {
  value: number;
  active?: boolean;
}) {
  return (
    <div className="relative h-2.5 overflow-hidden rounded-full bg-muted/80">
      <div
        className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-gold-muted via-gold to-gold transition-[width] duration-700 ease-out"
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      >
        {active ? <span className="progress-shimmer-bar absolute inset-0 block" /> : null}
      </div>
    </div>
  );
}
