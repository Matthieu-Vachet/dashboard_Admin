import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export function Input({ className, ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      className={cn(
        "min-h-11 w-full rounded-lg border border-line bg-white/[0.06] px-3 text-sm font-semibold text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand-2/55 focus:bg-white/[0.09]",
        className,
      )}
      {...props}
    />
  );
}

export function Textarea({
  className,
  ...props
}: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      className={cn(
        "min-h-32 w-full resize-none rounded-lg border border-line bg-white/[0.06] p-3 text-sm font-medium leading-6 text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand-2/55 focus:bg-white/[0.09]",
        className,
      )}
      {...props}
    />
  );
}
