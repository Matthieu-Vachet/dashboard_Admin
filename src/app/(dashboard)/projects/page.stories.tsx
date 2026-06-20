import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import ProjectsPage from "./page";
import { withDarkCanvas, withMockedDashboardFetch } from "@/stories/storybook-mocks";

const meta = {
  title: "Dashboard/ProjectsPage",
  component: ProjectsPage,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Page projets complète: cartes sélectionnables, fiche éditable, liens GitHub/Vercel, statuts, roadmap et suppression avec sauvegarde dashboard.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [withMockedDashboardFetch, withDarkCanvas],
} satisfies Meta<typeof ProjectsPage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
