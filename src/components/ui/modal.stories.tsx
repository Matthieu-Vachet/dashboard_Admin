import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { withDarkCanvas } from "@/stories/storybook-mocks";

const meta = {
  title: "UI/Modal",
  component: Modal,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Fenêtre modale partagée pour les formulaires de création et édition du dashboard.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [withDarkCanvas],
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {
  args: {
    open: true,
    title: "Créer un élément",
    description: "Exemple de contenu modal documenté.",
    children: (
      <div className="space-y-3">
        <p className="text-sm font-semibold text-muted">La modale utilise un portal et ferme avec Échap ou le bouton de fermeture.</p>
        <Button variant="primary">Action principale</Button>
      </div>
    ),
    onClose: () => undefined,
  },
};
