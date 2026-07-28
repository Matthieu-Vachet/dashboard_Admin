import type { ComponentType } from "react";

export const PokemonArtwork: ComponentType<{
  pokemon?: unknown;
  alt?: string;
  className?: string;
  shiny?: boolean;
  priority?: boolean;
  variant?: Record<string, unknown>;
}>;
