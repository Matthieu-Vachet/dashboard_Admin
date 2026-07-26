"use client";

import { Card } from "@/components/ui/card";

export function DashboardLoadingState({
  eyebrow = "Synchronisation",
  title,
  detail = "Chargement de tes données enregistrées...",
}: {
  eyebrow?: string;
  title: string;
  detail?: string;
}) {
  return (
    <Card tone="strong" className="min-h-[420px] p-5">
      <div className="max-w-2xl">
        <p className="type-overline text-brand-2">
          {eyebrow}
        </p>
        <h2 className="mt-3 type-title-page">{title}</h2>
        <p className="mt-2 type-body-strong text-muted">{detail}</p>
      </div>
      <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            tone="flat"
            className="h-28 animate-pulse motion-reduce:animate-none"
            key={index}
          />
        ))}
      </div>
    </Card>
  );
}
