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
      "./.data/PokemonGo-Data/data/pokemon/**",
      "./.data/PokemonGo-Data/data/assets/**",
      "./.data/PokemonGo-Data/data/pvp/**",
      "./.data/PokemonGo-Data/mappings/providers/pvpoke/**",
      "./.data/PokemonGo-Data/data/moves/**",
      "./.data/PokemonGo-Data/data/reference/types/**",
      "./.data/PokemonGo-Data/data/battles/gbl/**",
    ],
    "/api/pokemon-admin": [
      "./.data/PokemonGo-Data/package.json",
      "./.data/PokemonGo-Data/.dashboard-data-snapshot.json",
      "./.data/PokemonGo-Data/data/pokemon/**",
      "./.data/PokemonGo-Data/data/assets/**",
      "./.data/PokemonGo-Data/data/pvp/**",
      "./.data/PokemonGo-Data/mappings/providers/pvpoke/**",
      "./.data/PokemonGo-Data/data/moves/**",
      "./.data/PokemonGo-Data/data/reference/generations/**",
      "./.data/PokemonGo-Data/data/reference/types/**",
      "./.data/PokemonGo-Data/data/reference/weather/**",
      "./.data/PokemonGo-Data/data/reference/stickers/**",
      "./.data/PokemonGo-Data/operations/audits/sources/**",
      "./.data/PokemonGo-Data/mappings/margxtAuditAliases.json",
      "./.data/PokemonGo-Data/mappings/pokemon/identity-inventory.json",
      "./.data/PokemonGo-Data/data/battles/raids/**",
      "./.data/PokemonGo-Data/data/activities/eggs/**",
      "./.data/PokemonGo-Data/data/battles/max-battles/**",
      "./.data/PokemonGo-Data/data/battles/rocket/**",
      "./.data/PokemonGo-Data/data/activities/research/**",
      "./.data/PokemonGo-Data/data/reference/items/**",
      "./public/assets/**",
    ],
    "/api/admin/community-days/**": [
      "./.data/PokemonGo-Data/package.json",
      "./.data/PokemonGo-Data/.dashboard-data-snapshot.json",
      "./.data/PokemonGo-Data/data/pokemon/**",
      "./.data/PokemonGo-Data/data/assets/**",
    ],
    "/api/admin/events/scrape": [
      "./.data/PokemonGo-Data/package.json",
      "./.data/PokemonGo-Data/.dashboard-data-snapshot.json",
      "./.data/PokemonGo-Data/data/pokemon/**",
      "./.data/PokemonGo-Data/data/assets/**",
      "./.data/PokemonGo-Data/data/moves/**",
      "./.data/PokemonGo-Data/data/battles/raids/**",
      "./.data/PokemonGo-Data/data/activities/eggs/**",
      "./.data/PokemonGo-Data/data/battles/max-battles/**",
      "./.data/PokemonGo-Data/data/battles/rocket/**",
      "./.data/PokemonGo-Data/data/activities/research/**",
      "./.data/PokemonGo-Data/data/reference/items/**",
    ],
  },
  // Visual regression artifacts are local test outputs and never participate
  // in a server route at runtime. Excluding them prevents dynamic fs tracing
  // from packaging the complete test-results tree into Vercel Functions.
  outputFileTracingExcludes: {
    "/api/admin/pvp-simulator": [
      "./.data/PokemonGo-Data/archives/**",
      "./.data/PokemonGo-Data/data/pvp/rankings/**",
    ],
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
