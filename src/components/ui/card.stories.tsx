import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "Design System/Card",
  component: Card,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "Surface glass du dashboard. Sert de conteneur pour widgets, formulaires, graphiques et panneaux métier.",
      },
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DashboardPanel: Story = {
  render: () => (
    <Card className="w-[380px] p-4">
      <CardHeader eyebrow="Panel" action={<Badge tone="cyan">Live</Badge>}>
        <CardTitle>Carte dashboard</CardTitle>
        <CardDescription>
          Surface glass réutilisable pour les widgets, formulaires et panneaux métier.
        </CardDescription>
      </CardHeader>
      <div className="mt-5 h-24 rounded-lg border border-line bg-white/[0.045]" />
    </Card>
  ),
};

export const StrongPanel: Story = {
  render: () => (
    <Card tone="strong" className="w-[420px] p-5">
      <CardHeader eyebrow="Strong panel" action={<Badge tone="green">Actif</Badge>}>
        <CardTitle>Panneau mis en avant</CardTitle>
        <CardDescription>
          Variante plus contrastée pour les entêtes de pages et modules prioritaires.
        </CardDescription>
      </CardHeader>
    </Card>
  ),
};
