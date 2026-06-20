import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DashboardHomeLive } from "@/components/dashboard/dashboard-home-live";
import { withDarkCanvas, withMockedDashboardFetch } from "@/stories/storybook-mocks";

const meta = {
  title: "Dashboard/Accueil live",
  component: DashboardHomeLive,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Accueil principal avec raccourcis, compteurs réels, graphiques kanban/Pokémon, état API et persistance Mongo.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [withMockedDashboardFetch, withDarkCanvas],
} satisfies Meta<typeof DashboardHomeLive>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
