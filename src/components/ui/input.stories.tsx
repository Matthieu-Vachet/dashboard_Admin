import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Input, Textarea } from "@/components/ui/input";

const meta = {
  title: "Design System/Input",
  component: Input,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Champs de saisie standard du dashboard. Utilisés pour notes, projets, kanban, calendrier et outils quotidiens.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[360px]">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    placeholder: "Nom du projet",
  },
};

export const Filled: Story = {
  args: {
    value: "Dashboard Admin",
    readOnly: true,
  },
};

export const TextareaField: Story = {
  render: () => <Textarea placeholder="Écris une note ou une description..." />,
};
