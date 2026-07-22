import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";

type CardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "soft" | "strong" | "flat";
};

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, tone = "soft", ...props },
  ref,
) {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-lg",
        tone === "strong"
          ? "glass-panel-strong"
          : tone === "flat"
            ? "border border-line bg-surface-flat"
            : "glass-panel",
        className,
      )}
      {...props}
    />
  );
});

export function CardHeader({
  className,
  children,
  eyebrow,
  action,
}: HTMLAttributes<HTMLDivElement> & {
  eyebrow?: string;
  action?: ReactNode;
}) {
  return (
    <div className={cn("flex items-start justify-between gap-4", className)}>
      <div className="min-w-0">
        {eyebrow ? (
          <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">
            {eyebrow}
          </p>
        ) : null}
        {children}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("text-lg font-black leading-tight text-foreground", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("mt-1 text-sm font-medium leading-6 text-muted", className)} {...props} />
  );
}
