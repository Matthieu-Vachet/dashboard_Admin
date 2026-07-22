"use client";

import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { focusBlocks, revenueData } from "@/data/dashboard";

const tooltipStyle = {
  background: "var(--panel-strong)",
  border: "1px solid var(--line)",
  borderRadius: 8,
  color: "var(--foreground)",
};

export function DashboardCharts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setMounted(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  return (
    <div className="grid min-w-0 gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]">
      <Card className="min-w-0 p-4">
        <CardHeader eyebrow="Pipeline">
          <CardTitle>Revenus et projets</CardTitle>
          <CardDescription>Simulation de pilotage pour tes prochains projets.</CardDescription>
        </CardHeader>
        <div className="mt-6 h-72 min-h-72 min-w-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={1}>
            <AreaChart data={revenueData} margin={{ left: -18, right: 8, top: 16 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="var(--brand-2)" stopOpacity={0.38} />
                  <stop offset="95%" stopColor="var(--brand-2)" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="var(--line)" vertical={false} />
              <XAxis dataKey="name" stroke="var(--muted)" tickLine={false} axisLine={false} />
              <YAxis stroke="var(--muted)" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="var(--brand-2)"
                strokeWidth={3}
                fill="url(#revenueGradient)"
              />
              <Area
                type="monotone"
                dataKey="projects"
                stroke="var(--brand-3)"
                strokeWidth={2}
                fill="transparent"
              />
            </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full rounded-lg border border-line bg-surface-faint" />
          )}
        </div>
      </Card>

      <Card className="min-w-0 p-4">
        <CardHeader eyebrow="Temps">
          <CardTitle>Répartition focus</CardTitle>
          <CardDescription>Vue rapide de tes blocs de travail.</CardDescription>
        </CardHeader>
        <div className="mt-6 h-72 min-h-72 min-w-0">
          {mounted ? (
            <ResponsiveContainer width="100%" height="100%" minWidth={1}>
            <BarChart data={focusBlocks} layout="vertical" margin={{ left: 18, right: 12 }}>
              <CartesianGrid stroke="var(--line)" horizontal={false} />
              <XAxis type="number" stroke="var(--muted)" tickLine={false} axisLine={false} />
              <YAxis
                dataKey="label"
                type="category"
                stroke="var(--muted)"
                tickLine={false}
                axisLine={false}
                width={78}
              />
              <Tooltip contentStyle={tooltipStyle} />
              <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                {focusBlocks.map((entry) => (
                  <Cell key={entry.label} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full rounded-lg border border-line bg-surface-faint" />
          )}
        </div>
      </Card>
    </div>
  );
}
