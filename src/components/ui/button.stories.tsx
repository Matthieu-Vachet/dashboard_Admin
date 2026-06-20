import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Plus, Save } from "lucide-react";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Design System/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Bouton principal du design system. Utiliser `primary` pour une action forte, `secondary` pour les actions courantes, `ghost` pour navigation, `danger` pour suppression.",
      },
    },
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

export const AllVariants: Story = {
  render: () => (
    <div className="grid gap-3">
      <Button variant="primary" icon={<Plus size={16} />}>Créer</Button>
      <Button variant="secondary" icon={<Save size={16} />}>Sauvegarder</Button>
      <Button variant="ghost">Navigation discrète</Button>
      <Button variant="danger">Supprimer</Button>
      <Button disabled>Indisponible</Button>
    </div>
  ),
};
