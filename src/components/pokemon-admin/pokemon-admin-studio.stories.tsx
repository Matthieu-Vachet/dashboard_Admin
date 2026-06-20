import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PokemonAdminStudio } from "@/components/pokemon-admin/pokemon-admin-studio";
import { withDarkCanvas, withMockedDashboardFetch } from "@/stories/storybook-mocks";

const meta = {
  title: "Pokémon/Admin/Studio",
  component: PokemonAdminStudio,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Studio admin Pokémon intégré au dashboard: fiches, assets, veille sources, catalogues, comparaison, corrections, export, todo et éditeur.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [withMockedDashboardFetch, withDarkCanvas],
} satisfies Meta<typeof PokemonAdminStudio>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {};
