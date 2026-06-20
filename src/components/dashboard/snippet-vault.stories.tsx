import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { SnippetVault } from "@/components/dashboard/snippet-vault";
import { withDarkCanvas, withMockedDashboardFetch } from "@/stories/storybook-mocks";

const meta = {
  title: "Dashboard/SnippetVault",
  component: SnippetVault,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Coffre à snippets avec recherche, modale d'édition, tags, catégories et copie en un clic.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [withMockedDashboardFetch, withDarkCanvas],
} satisfies Meta<typeof SnippetVault>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
