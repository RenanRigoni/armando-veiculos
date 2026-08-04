import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type Tone = "neutral" | "brand" | "success" | "warning" | "muted";

const tones: Record<Tone, string> = {
  neutral: "border-border bg-surface-2 text-fg",
  brand: "border-brand bg-brand text-on-brand",
  success: "border-success/40 bg-success/15 text-success",
  warning: "border-warning/40 bg-warning/15 text-warning",
  muted: "border-border bg-transparent text-fg-muted",
};

type BadgeProps = {
  tone?: Tone;
  className?: string;
  children: ReactNode;
};

export function Badge({ tone = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "font-display inline-flex items-center rounded-sm border px-2 py-0.5 text-xs tracking-wider uppercase",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
