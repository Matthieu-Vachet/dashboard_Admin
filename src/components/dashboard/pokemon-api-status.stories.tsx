import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PokemonApiStatus } from "@/components/dashboard/pokemon-api-status";
import { withDarkCanvas, withMockedDashboardFetch } from "@/stories/storybook-mocks";

const meta = {
  title: "Pokémon/API Status",
  component: PokemonApiStatus,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Widget d'état de l'API Pokémon GO et de sa base Mongo. Affiche le badge `API + DB connectées` et les liens Redoc/Swagger.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    withMockedDashboardFetch,
    (Story) => (
      <div className="w-[680px] max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
    withDarkCanvas,
  ],
} satisfies Meta<typeof PokemonApiStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {};

export const Compact: Story = {
  args: { compact: true },
};
