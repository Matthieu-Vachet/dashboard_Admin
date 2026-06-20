/* eslint-disable @typescript-eslint/no-require-imports */
import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { withDarkCanvas } from "@/stories/storybook-mocks";

const { LoginCard } = require("./login-card.jsx");

const meta = {
  title: "Pokémon/Admin/LoginCard",
  component: LoginCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "Carte de connexion de l'espace admin Pokémon. Elle protège les outils de correction, audit assets et lecture source.",
      },
    },
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="grid min-h-[520px] w-[680px] max-w-[calc(100vw-2rem)] place-items-center">
        <Story />
      </div>
    ),
    withDarkCanvas,
  ],
} satisfies Meta<typeof LoginCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    password: "",
    error: "",
    loading: false,
    onPasswordChange: () => {},
    onSubmit: () => {},
  },
};

export const ErrorState: Story = {
  args: {
    ...Empty.args,
    password: "••••••••",
    error: "Connexion refusée.",
  },
};
