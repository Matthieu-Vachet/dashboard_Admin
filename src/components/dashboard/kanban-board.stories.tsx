import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { KanbanBoard } from "@/components/dashboard/kanban-board";
import { withDarkCanvas, withMockedDashboardFetch } from "@/stories/storybook-mocks";

const meta = {
  title: "Dashboard/KanbanBoard",
  component: KanbanBoard,
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Kanban avec drag-and-drop, édition, suppression, catégories colorées et sauvegarde Mongo." } },
  },
  tags: ["autodocs"],
  decorators: [withMockedDashboardFetch, withDarkCanvas],
} satisfies Meta<typeof KanbanBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
