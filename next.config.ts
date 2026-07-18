import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // The workspace contains several independent applications and lockfiles.
  // Pinning Turbopack to this package prevents it from selecting the parent
  // workspace and producing stale React Client Manifests during local reloads.
  turbopack: {
    root: process.cwd(),
  },
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
      "./.data/PokemonGo-Data/raids/**",
      "./.data/PokemonGo-Data/eggs/**",
      "./.data/PokemonGo-Data/max-battles/**",
      "./.data/PokemonGo-Data/rocket/**",
      "./.data/PokemonGo-Data/research/**",
      "./.data/PokemonGo-Data/items/**",
      "./public/ui/**",
    ],
    "/api/admin/community-days/**": [
      "./.data/PokemonGo-Data/pokemon/**",
      "./.data/PokemonGo-Data/pokemon-forms/**",
      "./.data/PokemonGo-Data/pokemon-assets/**",
    ],
    "/api/admin/events/scrape": [
      "./.data/PokemonGo-Data/pokemon/**",
      "./.data/PokemonGo-Data/pokemon-forms/**",
      "./.data/PokemonGo-Data/pokemon-assets/**",
      "./.data/PokemonGo-Data/moves/**",
      "./.data/PokemonGo-Data/raids/**",
      "./.data/PokemonGo-Data/eggs/**",
      "./.data/PokemonGo-Data/max-battles/**",
      "./.data/PokemonGo-Data/rocket/**",
      "./.data/PokemonGo-Data/research/**",
      "./.data/PokemonGo-Data/items/**",
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
