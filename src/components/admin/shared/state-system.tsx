import { CircleAlert, Inbox, LoaderCircle } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";

import { cn } from "@/lib/cn";
import { Card } from "@/components/ui/card";

type FetchLoadingStateProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  title?: ReactNode;
  detail?: ReactNode;
  layout?: "section" | "inline";
};

export function FetchLoadingState({
  title = "Chargement…",
  detail,
  layout = "section",
  className,
  ...props
}: FetchLoadingStateProps) {
  const content = (
    <>
      <LoaderCircle
        className={cn(
          "shrink-0 animate-spin text-brand-2 motion-reduce:animate-none",
          layout === "section" ? "mx-auto" : "",
        )}
        size={layout === "section" ? 30 : 18}
        aria-hidden="true"
      />
      <div className={layout === "section" ? "mt-3 text-center" : "min-w-0"}>
        <p className="type-body-strong text-foreground">{title}</p>
        {detail ? <p className="type-body mt-1 text-muted">{detail}</p> : null}
      </div>
    </>
  );

  if (layout === "inline") {
    return (
      <div
        className={cn("flex min-h-10 items-center justify-center gap-3", className)}
        role="status"
        aria-live="polite"
        aria-busy="true"
        data-state-system="fetch-loading"
        {...props}
      >
        {content}
      </div>
    );
  }

  return (
    <Card
      className={cn("grid min-h-52 place-items-center p-6", className)}
      role="status"
      aria-live="polite"
      aria-busy="true"
      data-state-system="fetch-loading"
      {...props}
    >
      <div>{content}</div>
    </Card>
  );
}

type EmptyStateProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  title: ReactNode;
  description?: ReactNode;
  icon?: ReactNode;
  action?: ReactNode;
  size?: "compact" | "section";
};

export function EmptyState({
  title,
  description,
  icon = <Inbox size={20} aria-hidden="true" />,
  action,
  size = "compact",
  className,
  ...props
}: EmptyStateProps) {
  return (
    <Card
      className={cn(
        "grid place-items-center rounded-surface border border-dashed border-line bg-surface-faint text-center",
        size === "section" ? "min-h-40 p-6" : "min-h-20 p-4",
        className,
      )}
      data-state-system="empty"
      {...props}
    >
      <div className="max-w-xl">
        <span className="mx-auto grid h-9 w-9 place-items-center rounded-full bg-surface-interactive text-muted">
          {icon}
        </span>
        <p className="type-body-strong mt-2 text-foreground-secondary">{title}</p>
        {description ? <p className="type-body mt-1 text-muted">{description}</p> : null}
        {action ? <div className="mt-4 flex justify-center">{action}</div> : null}
      </div>
    </Card>
  );
}

type ErrorStateProps = Omit<HTMLAttributes<HTMLDivElement>, "title"> & {
  message: ReactNode;
  title?: ReactNode;
  action?: ReactNode;
};

export function ErrorState({
  message,
  title = "Impossible de charger les données",
  action,
  className,
  ...props
}: ErrorStateProps) {
  return (
    <Card
      className={cn(
        "rounded-surface border border-danger/30 bg-danger/10 p-4 text-danger",
        className,
      )}
      role="alert"
      data-state-system="error"
      {...props}
    >
      <div className="flex items-start gap-3">
        <CircleAlert className="mt-0.5 shrink-0" size={19} aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <p className="type-title-inline">{title}</p>
          <p className="type-body-strong mt-1 break-words">{message}</p>
          {action ? <div className="mt-3">{action}</div> : null}
        </div>
      </div>
    </Card>
  );
}
