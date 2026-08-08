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
    "/api/admin/pvp-simulator": [
      "./.data/PokemonGo-Data/package.json",
      "./.data/PokemonGo-Data/.dashboard-data-snapshot.json",
      "./.data/PokemonGo-Data/pokemon/**",
      "./.data/PokemonGo-Data/pokemon-forms/**",
      "./.data/PokemonGo-Data/pokemon-assets/**",
      "./.data/PokemonGo-Data/pvp/manifest.json",
      "./.data/PokemonGo-Data/pvp/pokemon/**",
      "./.data/PokemonGo-Data/moves/**",
      "./.data/PokemonGo-Data/types/**",
      "./.data/PokemonGo-Data/gbl-calendar/**",
    ],
    "/api/pokemon-admin": [
      "./.data/PokemonGo-Data/pokemon/**",
      "./.data/PokemonGo-Data/pokemon-forms/**",
      "./.data/PokemonGo-Data/pokemon-assets/**",
      "./.data/PokemonGo-Data/pvp/manifest.json",
      "./.data/PokemonGo-Data/pvp/pokemon/**",
      "./.data/PokemonGo-Data/moves/**",
      "./.data/PokemonGo-Data/generations/**",
      "./.data/PokemonGo-Data/types/**",
      "./.data/PokemonGo-Data/weather/**",
      "./.data/PokemonGo-Data/stickers/**",
      "./.data/PokemonGo-Data/source-watch/**",
      "./.data/PokemonGo-Data/mappings/margxtAuditAliases.json",
      "./.data/PokemonGo-Data/mappings/pokemonLocalIdentityInventory.json",
      "./.data/PokemonGo-Data/raids/**",
      "./.data/PokemonGo-Data/eggs/**",
      "./.data/PokemonGo-Data/max-battles/**",
      "./.data/PokemonGo-Data/rocket/**",
      "./.data/PokemonGo-Data/research/**",
      "./.data/PokemonGo-Data/items/**",
      "./public/assets/**",
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
  // Visual regression artifacts are local test outputs and never participate
  // in a server route at runtime. Excluding them prevents dynamic fs tracing
  // from packaging the complete test-results tree into Vercel Functions.
  outputFileTracingExcludes: {
    "/*": ["./test-results/**/*"],
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
