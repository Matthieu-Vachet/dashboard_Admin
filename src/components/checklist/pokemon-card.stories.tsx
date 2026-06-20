/* eslint-disable @typescript-eslint/no-require-imports */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";

const { PokemonCard } = require("./pokemon-card.jsx");

const meta = {
  title: "Pokemon Admin/PokemonCard",
  component: PokemonCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[360px] bg-[#050816] p-4">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof PokemonCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Complete: Story = {
  args: {
    admin: true,
    actionLabel: "Ouvrir",
    assetChecked: true,
    entry: {
      key: "pokemon:data/pokemon/0001-bulbasaur.json",
      dexId: "0001",
      name: "Bulbizarre",
      kind: "pokemon",
      form: "normal",
      generation: 1,
      primaryType: "GRASS",
      secondaryType: "POISON",
      complete: true,
      issues: [],
      issueCategories: [],
      quality: { score: 100 },
      image:
        "https://raw.githubusercontent.com/Matthieu-Vachet/PokemonGo-Assets-API/refs/heads/main/PokemonHd/poke_capture_0001_000_mf_n_00000000_f_n.png",
      shinyImage:
        "https://raw.githubusercontent.com/Matthieu-Vachet/PokemonGo-Assets-API/refs/heads/main/PokemonHd/poke_capture_0001_000_mf_n_00000000_f_r.png",
      assets: {
        go: true,
        goShiny: true,
        home: true,
        homeShiny: true,
        incompletePairs: 0,
      },
      file: "data/pokemon/0001-bulbasaur.json",
    },
  },
};
