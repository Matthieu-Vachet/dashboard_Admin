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
        "rounded-surface",
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
    <div className={cn("flex min-w-0 flex-col items-start justify-between gap-3 sm:flex-row sm:gap-4", className)}>
      <div className="min-w-0">
        {eyebrow ? (
          <p className="type-overline text-brand-2">
            {eyebrow}
          </p>
        ) : null}
        {children}
      </div>
      {action ? <div className="max-w-full self-start sm:shrink-0">{action}</div> : null}
    </div>
  );
}

export function CardTitle({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h2
      className={cn("type-title-card text-foreground", className)}
      {...props}
    />
  );
}

export function CardDescription({
  className,
  ...props
}: HTMLAttributes<HTMLParagraphElement>) {
  return (
    <p className={cn("type-body mt-1 text-muted", className)} {...props} />
  );
}
