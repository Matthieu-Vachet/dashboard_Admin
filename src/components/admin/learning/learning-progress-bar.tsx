import { cn } from "@/lib/cn";

export function LearningProgressBar({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const safeValue = Math.max(0, Math.min(100, value));

  return (
    <div className={cn("h-2 overflow-hidden rounded-full bg-surface-emphasis", className)}>
      <span
        className="block h-full rounded-full bg-gradient-to-r from-brand-2 via-brand to-brand-3 transition-[width] duration-500"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}

