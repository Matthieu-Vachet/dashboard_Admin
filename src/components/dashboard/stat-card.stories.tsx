import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotebookPen } from "lucide-react";
import { StatCard } from "@/components/dashboard/stat-card";

const meta = {
  title: "Dashboard/StatCard",
  component: StatCard,
  parameters: {
    layout: "centered",
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
