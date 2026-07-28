import type { ComponentType } from "react";

export const TypeIcons: ComponentType<{
  types?: unknown[];
  catalog?: unknown[];
  size?: "sm" | "md";
}>;

export const WeatherIcons: ComponentType<{
  weather?: unknown[];
  catalog?: unknown[];
}>;
