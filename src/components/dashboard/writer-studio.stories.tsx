import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { WriterStudio } from "@/components/dashboard/writer-studio";
import { withDarkCanvas, withMockedDashboardFetch } from "@/stories/storybook-mocks";

const meta = {
  title: "Dashboard/WriterStudio",
  component: WriterStudio,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Éditeur texte personnel avec documents persistants, compteur de mots et raccourcis de structure.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [withMockedDashboardFetch, withDarkCanvas],
} satisfies Meta<typeof WriterStudio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
