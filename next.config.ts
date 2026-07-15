import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingIncludes: {
    "/api/pokemon-admin": [
      "./.data/PokemonGo-Data/pokemon/**",
      "./.data/PokemonGo-Data/pokemon-forms/**",
      "./.data/PokemonGo-Data/pokemon-assets/**",
      "./.data/PokemonGo-Data/moves/**",
      "./.data/PokemonGo-Data/generations/**",
      "./.data/PokemonGo-Data/types/**",
      "./.data/PokemonGo-Data/weather/**",
      "./.data/PokemonGo-Data/stickers/**",
      "./.data/PokemonGo-Data/source-watch/**",
      "./public/ui/**",
    ],
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
      },
    ],
  },
};

export default nextConfig;
