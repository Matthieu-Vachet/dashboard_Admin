import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotebookPen } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

const meta = {
  title: "Dashboard/StatCard",
  component: StatCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Carte statistique animée du dashboard. À utiliser pour les compteurs réels: notes, tâches, projets, API, qualité.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[320px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    label: "Notes actives",
    value: "24",
    delta: "+6 cette semaine",
    icon: NotebookPen,
    accent: "cyan",
  },
};

export const Variants: Story = {
  args: {
    label: "Notes",
    value: "12",
    delta: "4 notes projet",
    icon: NotebookPen,
    accent: "cyan",
  },
  render: () => (
    <div className="grid w-[720px] grid-cols-2 gap-4">
      <StatCard label="Notes" value="12" delta="4 notes projet" icon={NotebookPen} accent="cyan" />
      <StatCard label="Qualité" value="100%" delta="API connectée" icon={NotebookPen} accent="green" />
      <StatCard label="Projets" value="4" delta="2 live" icon={NotebookPen} accent="violet" />
      <StatCard label="Alertes" value="0" delta="Rien à corriger" icon={NotebookPen} accent="amber" />
    </div>
  ),
};
