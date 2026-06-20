/* eslint-disable @typescript-eslint/no-require-imports */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import {
  samplePokemonDetail,
  samplePokemonEntry,
  sampleTypeCatalog,
  sampleWeatherCatalog,
} from "@/stories/mock-data";
import { withDarkCanvas } from "@/stories/storybook-mocks";

const { DetailModal } = require("./detail-modal.jsx");

const meta = {
  title: "Pokémon/Fiches/DetailModal",
  component: DetailModal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Modal détaillée d'une fiche Pokémon: identité, stats, PC, attaques, PvP, shadow, assets, JSON source et outils admin.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [withDarkCanvas],
} satisfies Meta<typeof DetailModal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Overview: Story = {
  args: {
    open: true,
    entry: samplePokemonEntry,
    detail: { detail: samplePokemonDetail },
    mode: "admin",
    typeCatalog: sampleTypeCatalog,
    weatherCatalog: sampleWeatherCatalog,
    onPrevious: () => {},
    onNext: () => {},
    onClose: () => {},
    onCopyPatch: () => {},
    onAuditUrls: () => {},
    onAssetAudit: () => {},
  },
};
