import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { NotesBoard } from "@/components/dashboard/notes-board";
import { withDarkCanvas, withMockedDashboardFetch } from "@/stories/storybook-mocks";

const meta = {
  title: "Dashboard/NotesBoard",
  component: NotesBoard,
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Carnet de notes connecté au stockage dashboard Mongo via `matweb.notes`." } },
  },
  tags: ["autodocs"],
  decorators: [withMockedDashboardFetch, withDarkCanvas],
} satisfies Meta<typeof NotesBoard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
