import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AppFrame } from "@/components/dashboard/app-frame";
import { Providers } from "@/components/dashboard/providers";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { withMockedDashboardFetch } from "@/stories/storybook-mocks";

const meta = {
  title: "Dashboard/AppFrame",
  component: AppFrame,
  parameters: {
    layout: "fullscreen",
    nextjs: {
      appDirectory: true,
      navigation: { pathname: "/" },
    },
    docs: {
      description: {
        component:
          "Shell principal du dashboard: sidebar responsive, barre supérieure, bouton Storybook, thème clair/sombre persistant et animation GSAP de page.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [withMockedDashboardFetch],
} satisfies Meta<typeof AppFrame>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Desktop: Story = {
  args: {
    userEmail: "vachet.matthieu@icloud.com",
    children: null,
  },
  render: () => (
    <Providers>
      <AppFrame userEmail="vachet.matthieu@icloud.com">
        <Card tone="strong" className="p-5">
          <CardHeader eyebrow="Preview" action={<Badge tone="green">Admin</Badge>}>
            <CardTitle>Centre de commande personnel</CardTitle>
            <CardDescription>
              Storybook documente le layout complet avec navigation, thème et zone de contenu.
            </CardDescription>
          </CardHeader>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {["Notes", "Todo", "Pokémon API"].map((label) => (
              <div className="rounded-lg border border-line bg-white/[0.055] p-4" key={label}>
                <p className="text-xs font-black uppercase tracking-[0.16em] text-muted">
                  Widget
                </p>
                <strong className="mt-2 block text-xl font-black">{label}</strong>
              </div>
            ))}
          </div>
        </Card>
      </AppFrame>
    </Providers>
  ),
};
