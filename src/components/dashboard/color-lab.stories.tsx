import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ColorLab } from "@/components/dashboard/color-lab";
import { withDarkCanvas, withMockedDashboardFetch } from "@/stories/storybook-mocks";

const meta = {
  title: "Dashboard/ColorLab",
  component: ColorLab,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component: "Labo couleur avec sélecteur, conversion HEX/RGB/HSL, contraste, palettes générées et nuancier sauvegardé.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [withMockedDashboardFetch, withDarkCanvas],
} satisfies Meta<typeof ColorLab>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
