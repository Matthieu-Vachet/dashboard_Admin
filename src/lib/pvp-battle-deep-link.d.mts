export type PvpDeepLinkFighter = {
  canonicalId: string;
  level: number;
  ivs: { attack: number; defense: number; stamina: number };
  shadow: boolean;
  fastMoveId: string;
  chargedMoveIds: string[];
  shields: number;
  startingEnergy: number;
  startingHpPercent: number;
  startingStages: { attack: number; defense: number };
  presetLabel?: "Rank 1" | "Mes IV" | string;
};
export function encodePvpBattle(value: unknown): string;
export function decodePvpBattle(value: string): unknown;
export function pvpBattleUrl(configuration: unknown, base?: string): string;
export function fighterFromRanking(entry: Record<string, unknown>, presetLabel?: string): PvpDeepLinkFighter | null;
export function fighterFromChecklistBuild(build: Record<string, unknown>): PvpDeepLinkFighter | null;
