import { forwardRef, type SelectHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select(
  { className, ...props },
  ref,
) {
  return (
    <select
      ref={ref}
      className={cn(
        "min-h-11 w-full rounded-lg border border-line bg-surface-control px-3 text-sm font-black text-foreground outline-none transition focus:border-brand-2/55 focus:bg-surface-control-focus focus-visible:ring-2 focus-visible:ring-brand-2/35 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-danger aria-invalid:ring-2 aria-invalid:ring-danger/30",
        className,
      )}
      {...props}
    />
  );
});
