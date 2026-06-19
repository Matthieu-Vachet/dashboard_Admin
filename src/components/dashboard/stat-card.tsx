import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/cn";

export type StatCardProps = {
  label: string;
  value: string;
  delta: string;
  trend?: "up" | "down";
  icon: LucideIcon;
  accent?: "cyan" | "violet" | "green" | "amber";
};

const accentMap = {
  cyan: "from-brand-2/24 text-brand-2",
  violet: "from-brand/24 text-brand",
  green: "from-brand-3/24 text-brand-3",
  amber: "from-warning/24 text-warning",
};

export function StatCard({
  label,
  value,
  delta,
  trend = "up",
  icon: Icon,
  accent = "cyan",
}: StatCardProps) {
  const TrendIcon = trend === "up" ? ArrowUpRight : ArrowDownRight;

  return (
    <Card className="motion-border p-4">
      <div className="relative z-10 flex items-start justify-between gap-3">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">
            {label}
          </p>
          <p className="mt-3 font-mono text-3xl font-black leading-none">{value}</p>
        </div>
        <div
          className={cn(
            "grid h-11 w-11 place-items-center rounded-lg bg-gradient-to-br to-white/[0.04]",
            accentMap[accent],
          )}
        >
          <Icon size={20} />
        </div>
      </div>
      <div className="relative z-10 mt-5 flex items-center gap-2 text-xs font-black text-muted">
        <TrendIcon
          size={15}
          className={trend === "up" ? "text-brand-3" : "text-danger"}
        />
        <span>{delta}</span>
      </div>
    </Card>
  );
}
