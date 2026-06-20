import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PokemonAnalytics } from "@/components/dashboard/pokemon-analytics";
import { withDarkCanvas, withMockedDashboardFetch } from "@/stories/storybook-mocks";

const meta = {
  title: "Pokémon/Analytics",
  component: PokemonAnalytics,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Page analytique Pokémon GO API avec compteurs réels, bar chart de génération et pie chart par type de fiche.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [withMockedDashboardFetch, withDarkCanvas],
} satisfies Meta<typeof PokemonAnalytics>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Dashboard: Story = {};
