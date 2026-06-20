import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      ".vercel/**",
      "out/**",
      "storybook-static/**",
      "public/storybook/**",
      "next-env.d.ts",
      "scripts/data/**",
      "src/server/pokemon-go/**",
    ],
  },
];

export default eslintConfig;
