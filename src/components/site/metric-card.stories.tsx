/* eslint-disable @typescript-eslint/no-require-imports */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withDarkCanvas } from "@/stories/storybook-mocks";

const { MetricCard } = require("./metric-card.jsx");
const { uiAssets } = require("./ui-assets");

const meta = {
  title: "Pokémon/Admin/MetricCard",
  component: MetricCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Carte métrique de l'admin Pokémon. Les pictos d'interface sont éclaircis pour rester lisibles sur fonds sombres et glassmorphism.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[760px] max-w-[calc(100vw-2rem)]">
        <Story />
      </div>
    ),
    withDarkCanvas,
  ],
} satisfies Meta<typeof MetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    label: "Fiches analysées",
    value: 1602,
    icon: uiAssets.icons.fiche,
  },
};

export const Accents: Story = {
  render: () => (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="Fiches" value={1602} icon={uiAssets.icons.fiche} />
      <MetricCard label="Terminées" value={1602} accent="green" icon={uiAssets.icons.bookSpells} />
      <MetricCard label="Problèmes" value={0} accent="amber" icon={uiAssets.icons.problem} />
      <MetricCard label="Assets" value={1692} accent="violet" icon={uiAssets.icons.result} />
    </div>
  ),
};
