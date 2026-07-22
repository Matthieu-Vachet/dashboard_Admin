import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(
  { className, ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      className={cn(
        "min-h-11 w-full rounded-lg border border-line bg-surface-control px-3 text-sm font-semibold text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand-2/55 focus:bg-surface-control-focus",
        className,
      )}
      {...props}
    />
  );
});

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaHTMLAttributes<HTMLTextAreaElement>>(
  function Textarea({ className, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(
        "min-h-32 w-full resize-none rounded-lg border border-line bg-surface-control p-3 text-sm font-medium leading-6 text-foreground outline-none transition placeholder:text-muted/70 focus:border-brand-2/55 focus:bg-surface-control-focus",
        className,
      )}
      {...props}
    />
  );
  },
);
