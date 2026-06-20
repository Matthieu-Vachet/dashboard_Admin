import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PokemonApiExplorer } from "@/components/dashboard/pokemon-api-explorer";
import { withDarkCanvas, withMockedDashboardFetch } from "@/stories/storybook-mocks";

const meta = {
  title: "Pokémon/API Explorer",
  component: PokemonApiExplorer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Console de test pour les endpoints publics Pokémon. Les appels passent par le proxy sécurisé du dashboard et sont mockés dans Storybook.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [withMockedDashboardFetch, withDarkCanvas],
} satisfies Meta<typeof PokemonApiExplorer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Ready: Story = {};
