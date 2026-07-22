import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type BadgeTone = "cyan" | "violet" | "green" | "amber" | "red" | "neutral";

const tones: Record<BadgeTone, string> = {
  cyan: "border-brand-2/30 bg-brand-2/10 text-accent-text",
  violet: "border-brand/30 bg-brand/12 text-foreground",
  green: "border-success/30 bg-success/10 text-success-foreground",
  amber: "border-warning/35 bg-warning/12 text-warning-foreground",
  red: "border-danger/35 bg-danger/12 text-danger-foreground",
  neutral: "border-line bg-surface-control text-muted",
};

export function Badge({
  className,
  tone = "neutral",
  ...props
}: HTMLAttributes<HTMLSpanElement> & { tone?: BadgeTone }) {
  return (
    <span
      className={cn(
        "inline-flex min-h-7 items-center rounded-full border px-2.5 text-xs font-black",
        tones[tone],
        className,
      )}
      {...props}
    />
  );
}
