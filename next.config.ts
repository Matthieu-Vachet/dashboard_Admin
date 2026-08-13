import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  turbopack: { root: process.cwd() },
  outputFileTracingIncludes: {
    "/api/dashboard-redeploy": [
      "./runtime-data/PokemonGo-Data/package.json",
      "./runtime-data/PokemonGo-Data/.dashboard-data-snapshot.json",
    ],
    "/api/admin/pvp-simulator": [
      "./runtime-data/PokemonGo-Data/package.json",
      "./runtime-data/PokemonGo-Data/.dashboard-data-snapshot.json",
      "./runtime-data/PokemonGo-Data/data/pokemon/**/*",
      "./runtime-data/PokemonGo-Data/data/assets/**/*",
      "./runtime-data/PokemonGo-Data/data/pvp/**/*",
      "./runtime-data/PokemonGo-Data/mappings/providers/pvpoke/**/*",
      "./runtime-data/PokemonGo-Data/data/moves/**/*",
      "./runtime-data/PokemonGo-Data/data/reference/types/**/*",
      "./runtime-data/PokemonGo-Data/data/battles/gbl/**/*",
    ],
    "/api/pokemon-admin": [
      "./runtime-data/PokemonGo-Data/package.json",
      "./runtime-data/PokemonGo-Data/.dashboard-data-snapshot.json",
      "./runtime-data/PokemonGo-Data/data/pokemon/**/*",
      "./runtime-data/PokemonGo-Data/data/assets/**/*",
      "./runtime-data/PokemonGo-Data/data/pvp/**/*",
      "./runtime-data/PokemonGo-Data/mappings/providers/pvpoke/**/*",
      "./runtime-data/PokemonGo-Data/data/moves/**/*",
      "./runtime-data/PokemonGo-Data/data/reference/generations/**/*",
      "./runtime-data/PokemonGo-Data/data/reference/types/**/*",
      "./runtime-data/PokemonGo-Data/data/reference/weather/**/*",
      "./runtime-data/PokemonGo-Data/data/reference/stickers/**/*",
      "./runtime-data/PokemonGo-Data/data/reference/event-variant-classification.json",
      "./runtime-data/PokemonGo-Data/operations/audits/sources/**/*",
      "./runtime-data/PokemonGo-Data/mappings/margxtAuditAliases.json",
      "./runtime-data/PokemonGo-Data/mappings/pokemon/identity-inventory.json",
      "./runtime-data/PokemonGo-Data/data/battles/raids/**/*",
      "./runtime-data/PokemonGo-Data/data/activities/eggs/**/*",
      "./runtime-data/PokemonGo-Data/data/battles/max-battles/**/*",
      "./runtime-data/PokemonGo-Data/data/battles/rocket/**/*",
      "./runtime-data/PokemonGo-Data/data/activities/research/**/*",
      "./runtime-data/PokemonGo-Data/data/reference/items/**/*",
      "./public/assets/**/*",
    ],
    "/api/admin/community-days/**/*": [
      "./runtime-data/PokemonGo-Data/package.json",
      "./runtime-data/PokemonGo-Data/.dashboard-data-snapshot.json",
      "./runtime-data/PokemonGo-Data/data/pokemon/**/*",
      "./runtime-data/PokemonGo-Data/data/assets/**/*",
    ],
    "/api/admin/events/scrape": [
      "./runtime-data/PokemonGo-Data/package.json",
      "./runtime-data/PokemonGo-Data/.dashboard-data-snapshot.json",
      "./runtime-data/PokemonGo-Data/data/pokemon/**/*",
      "./runtime-data/PokemonGo-Data/data/assets/**/*",
      "./runtime-data/PokemonGo-Data/data/moves/**/*",
      "./runtime-data/PokemonGo-Data/data/battles/raids/**/*",
      "./runtime-data/PokemonGo-Data/data/activities/eggs/**/*",
      "./runtime-data/PokemonGo-Data/data/battles/max-battles/**/*",
      "./runtime-data/PokemonGo-Data/data/battles/rocket/**/*",
      "./runtime-data/PokemonGo-Data/data/activities/research/**/*",
      "./runtime-data/PokemonGo-Data/data/reference/items/**/*",
    ],
  },
  outputFileTracingExcludes: {
    "/api/admin/pvp-simulator": [
      "./runtime-data/PokemonGo-Data/archives/**/*",
      "./runtime-data/PokemonGo-Data/data/pvp/rankings/**/*",
    ],
    "/*": ["./test-results/**/*"],
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
    ],
  },
};

export default nextConfig;
