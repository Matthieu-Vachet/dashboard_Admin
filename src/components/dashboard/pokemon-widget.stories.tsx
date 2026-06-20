import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PokemonWidget } from "@/components/dashboard/pokemon-widget";
import { withDarkCanvas, withMockedDashboardFetch } from "@/stories/storybook-mocks";

const meta = {
  title: "Pokémon/Widget",
  component: PokemonWidget,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Widget de résumé Pokémon connecté à `/api/pokemon-stats`: total, qualité, issues et progression par génération.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    withMockedDashboardFetch,
    (Story) => (
      <div className="w-[720px] max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
    withDarkCanvas,
  ],
} satisfies Meta<typeof PokemonWidget>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LiveSummary: Story = {};
