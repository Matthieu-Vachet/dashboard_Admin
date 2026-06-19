import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Design System/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "ghost", "danger"],
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg", "icon"],
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Créer un projet",
    variant: "primary",
    icon: <Plus size={16} />,
  },
};

export const Secondary: Story = {
  args: {
    children: "Sauvegarder",
    variant: "secondary",
    icon: <Save size={16} />,
  },
};

export const IconOnly: Story = {
  args: {
    children: <Plus size={16} />,
    size: "icon",
    "aria-label": "Ajouter",
  },
};
