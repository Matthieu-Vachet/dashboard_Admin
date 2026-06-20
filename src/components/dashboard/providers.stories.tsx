import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Providers } from "@/components/dashboard/providers";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const meta = {
  title: "Infrastructure/Providers",
  component: Providers,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Provider racine du dashboard. Il installe next-themes avec les classes `dark` et `light`, sans transition parasite au changement de thème.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Providers>;

export default meta;
type Story = StoryObj<typeof meta>;

export const ThemeProviderShell: Story = {
  args: {
    children: null,
  },
  render: () => (
    <Providers>
      <Card className="w-[360px] p-4">
        <CardHeader eyebrow="Theme">
          <CardTitle>Provider actif</CardTitle>
          <CardDescription>
            Les composants enfants reçoivent les variables de thème et les tokens MatWeb.
          </CardDescription>
        </CardHeader>
        <Button className="mt-5" variant="primary">
          Action thémée
        </Button>
      </Card>
    </Providers>
  ),
};
