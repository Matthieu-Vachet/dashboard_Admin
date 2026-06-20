/* eslint-disable @typescript-eslint/no-require-imports */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  samplePokemonEntry,
  samplePokemonEntryWithIssues,
  sampleTypeCatalog,
  sampleWeatherCatalog,
} from "@/stories/mock-data";
import { withDarkCanvas } from "@/stories/storybook-mocks";

const { PokemonCard } = require("./pokemon-card.jsx");

const meta = {
  title: "Pokémon/Cartes/PokemonCard",
  component: PokemonCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Carte fiche Pokémon utilisée dans l'admin: sprite, score qualité, types, météo, état JSON, assets et action d'ouverture.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[360px] bg-[#050816] p-4">
        <Story />
      </div>
    ),
    withDarkCanvas,
  ],
} satisfies Meta<typeof PokemonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Complete: Story = {
  args: {
    admin: true,
    actionLabel: "Ouvrir",
    assetChecked: true,
    entry: samplePokemonEntry,
    typeCatalog: sampleTypeCatalog,
    weatherCatalog: sampleWeatherCatalog,
    onOpen: () => {},
    onAssetChecked: () => {},
  },
};

export const WithIssues: Story = {
  args: {
    admin: true,
    actionLabel: "Ouvrir",
    entry: samplePokemonEntryWithIssues,
    typeCatalog: sampleTypeCatalog,
    weatherCatalog: sampleWeatherCatalog,
    onOpen: () => {},
  },
};
