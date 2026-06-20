import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { PokemonDocsViewer } from "@/components/dashboard/pokemon-docs-viewer";
import { samplePokemonDocs } from "@/stories/mock-data";
import { withDarkCanvas } from "@/stories/storybook-mocks";

const meta = {
  title: "Pokémon/Docs Viewer",
  component: PokemonDocsViewer,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "Lecteur interne des fichiers Markdown de structure JSON: recherche, sélection de document, rendu titres, tableaux, listes et blocs de code.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [withDarkCanvas],
} satisfies Meta<typeof PokemonDocsViewer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Documentation: Story = {
  args: { docs: samplePokemonDocs },
};
