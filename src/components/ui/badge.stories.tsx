import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "Design System/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    tone: {
      control: "select",
      options: ["cyan", "violet", "green", "amber", "red", "neutral"],
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Status: Story = {
  args: {
    children: "Live",
    tone: "green",
  },
};

export const Palette: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      {(["cyan", "violet", "green", "amber", "red", "neutral"] as const).map((tone) => (
        <Badge key={tone} tone={tone}>
          {tone}
        </Badge>
      ))}
    </div>
  ),
};
