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
        <p className="text-xs font-black uppercase tracking-[0.18em] text-brand-2">
          {eyebrow}
        </p>
        <h2 className="mt-3 text-3xl font-black">{title}</h2>
        <p className="mt-2 text-sm font-semibold leading-6 text-muted">{detail}</p>
      </div>
      <div className="mt-8 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <Card
            tone="flat"
            className="h-28 animate-pulse"
            key={index}
          />
        ))}
      </div>
    </Card>
  );
}
