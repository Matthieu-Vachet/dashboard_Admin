import type { Preview } from "@storybook/nextjs-vite";
import "../src/app/globals.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on.*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "MatWeb dark",
      values: [
        { name: "MatWeb dark", value: "#05060d" },
        { name: "Studio light", value: "#f7f8fb" },
      ],
    },
  },
};

export default preview;
