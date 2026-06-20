import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DashboardCharts } from "@/components/dashboard/dashboard-charts";
import { withDarkCanvas } from "@/stories/storybook-mocks";

const meta = {
  title: "Dashboard/DashboardCharts",
  component: DashboardCharts,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Panneaux Recharts historiques du dashboard. Gardés comme composants de visualisation réutilisables pour futurs widgets chiffrés.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [withDarkCanvas],
} satisfies Meta<typeof DashboardCharts>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
