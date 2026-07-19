export const typeLabels: Record<string, string>;
export const typeColors: Record<string, string>;

export function catalogItem(items: unknown[], id: string): unknown;
export function typeName(type: string, catalog?: unknown[]): string;
export function typeIcon(type: string, catalog?: unknown[]): string | null;
export function typeBackground(type: string, catalog?: unknown[]): string | null;
export function preferredPokemonImage(entry?: Record<string, unknown>, options?: Record<string, unknown>): string | null;
export function pokemonVariantLabel(entry?: Record<string, unknown>): string;
