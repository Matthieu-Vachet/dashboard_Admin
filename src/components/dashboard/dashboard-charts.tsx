"use client";

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
  background: "rgba(10, 13, 24, 0.95)",
  border: "1px solid rgba(255,255,255,0.12)",
  borderRadius: 8,
  color: "#eef3ff",
};

export function DashboardCharts() {
  return (
    <div className="grid gap-4 xl:grid-cols-[1.35fr_.65fr]">
      <Card className="p-4">
        <CardHeader eyebrow="Pipeline">
          <CardTitle>Revenus et projets</CardTitle>
          <CardDescription>Simulation de pilotage pour tes prochains projets.</CardDescription>
        </CardHeader>
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ left: -18, right: 8, top: 16 }}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="5%" stopColor="#20d3ff" stopOpacity={0.38} />
                  <stop offset="95%" stopColor="#20d3ff" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="name" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis stroke="#94a3b8" tickLine={false} axisLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#20d3ff"
                strokeWidth={3}
                fill="url(#revenueGradient)"
              />
              <Area
                type="monotone"
                dataKey="projects"
                stroke="#58f2a9"
                strokeWidth={2}
                fill="transparent"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-4">
        <CardHeader eyebrow="Temps">
          <CardTitle>Répartition focus</CardTitle>
          <CardDescription>Vue rapide de tes blocs de travail.</CardDescription>
        </CardHeader>
        <div className="mt-6 h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={focusBlocks} layout="vertical" margin={{ left: 18, right: 12 }}>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" horizontal={false} />
              <XAxis type="number" stroke="#94a3b8" tickLine={false} axisLine={false} />
              <YAxis
                dataKey="label"
                type="category"
                stroke="#94a3b8"
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
        </div>
      </Card>
    </div>
  );
}
