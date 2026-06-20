import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TodoList } from "@/components/dashboard/todo-list";
import { withDarkCanvas, withMockedDashboardFetch } from "@/stories/storybook-mocks";

const meta = {
  title: "Dashboard/TodoList",
  component: TodoList,
  parameters: {
    layout: "fullscreen",
    docs: { description: { component: "Todo list éditable avec priorités, suppression et progression réelle." } },
  },
  tags: ["autodocs"],
  decorators: [withMockedDashboardFetch, withDarkCanvas],
} satisfies Meta<typeof TodoList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
