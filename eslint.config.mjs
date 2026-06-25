import nextVitals from "eslint-config-next/core-web-vitals";
import nextTypescript from "eslint-config-next/typescript";

const eslintConfig = [
  ...nextVitals,
  ...nextTypescript,
  {
    ignores: [
      ".next/**",
      ".vercel/**",
      ".data/**",
      "out/**",
      "next-env.d.ts",
      "scripts/data/**",
      "src/server/pokemon-go/**",
    ],
  },
];

export default eslintConfig;
