import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CalendarPlanner } from "@/components/dashboard/calendar-planner";
import { withDarkCanvas, withMockedDashboardFetch } from "@/stories/storybook-mocks";

const meta = {
  title: "Dashboard/CalendarPlanner",
  component: CalendarPlanner,
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Calendrier mensuel avec événements éditables, couleurs, notes et persistance dashboard." } },
  },
  tags: ["autodocs"],
  decorators: [withMockedDashboardFetch, withDarkCanvas],
} satisfies Meta<typeof CalendarPlanner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
