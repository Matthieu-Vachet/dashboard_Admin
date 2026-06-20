import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DailyTools } from "@/components/dashboard/daily-tools";
import { withDarkCanvas, withMockedDashboardFetch } from "@/stories/storybook-mocks";

const meta = {
  title: "Dashboard/DailyTools",
  component: DailyTools,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Boîte à outils quotidienne: liens rapides, snippets, abonnements, contacts, focus timer et journal, avec sauvegarde dashboard.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [withMockedDashboardFetch, withDarkCanvas],
} satisfies Meta<typeof DailyTools>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
