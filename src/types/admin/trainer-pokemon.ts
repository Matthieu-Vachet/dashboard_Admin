export type TrainerPokemonGender = "MALE" | "FEMALE" | "GENDERLESS" | "UNKNOWN";

export type TrainerPokemonAlignment = "NORMAL" | "SHADOW" | "PURIFIED" | "UNKNOWN";

export type TrainerPokemonDiagnosticCode =
  | "UNKNOWN_GENDER"
  | "UNKNOWN_ALIGNMENT"
  | "PARTIAL_FORM_MATCH"
  | "ASSET_FALLBACK"
  | "UNKNOWN_MOVE"
  | "MISSING_ASSET"
  | "IDENTITY_UNMATCHED"
  | "IDENTITY_AMBIGUOUS"
  | "CANONICAL_ASSET_MISSING"
  | "IDENTITY_MANAGER_UNAVAILABLE";

export type TrainerPokemonDiagnostic = {
  code: TrainerPokemonDiagnosticCode;
  path: string;
  message: string;
  sourceId?: string;
  provider?: string;
  rawAlias?: string;
  reason?: string;
  occurrences?: number;
};

export type TrainerPokemonValidationIssue = {
  path: string;
  message: string;
};

export type NormalizedTrainerPokemonMove = {
  sourceName: string;
  name: string;
  type: string | null;
  typeName: string | null;
  typeIcon: string | null;
  category: "fast" | "charged" | "unknown";
  resolved: boolean;
};

export type TrainerPokemon = {
  sourceId: string;
  dexNumber: number;
  sourceName: string;
  frenchName: string;
  nickname: string | null;
  form: string | null;
  specialForm: boolean;
  costume: string | null;
  alignment: TrainerPokemonAlignment;
  gender: TrainerPokemonGender;
  shiny: boolean;
  lucky: boolean;
  cp: number;
  attackIv: number;
  defenseIv: number;
  staminaIv: number;
  ivTotal: number;
  ivPercent: number;
  weightKg: number;
  heightM: number;
  fastMove: NormalizedTrainerPokemonMove;
  chargedMoves: NormalizedTrainerPokemonMove[];
  primaryType: string | null;
  secondaryType: string | null;
  image: string | null;
  imageMatch: "exact" | "form" | "normal" | "base" | "missing";
  matchedForm?: string | null;
  matchedCostume?: string | null;
  matchedSource?: string;
  resolutionStatus?: "matched" | "missing-asset";
  identityProvider?: "ma-collection";
  rawAlias?: string;
  canonicalId?: string | null;
  identityId?: string | null;
  identityStatus?: string;
  identityReason?: string | null;
  identityConfidence?: number;
  searchText: string;
};

export type TrainerPokemonImportFile = {
  fileName: string;
  exportTime: string | null;
  exportTimestamp: string | null;
  pokemonCount: number;
  version: string | null;
  fileData: Record<string, unknown>;
};

export type TrainerPokemonStats = {
  total: number;
  shiny: number;
  lucky: number;
  perfect: number;
  shadow: number;
  purified: number;
  costume: number;
};

export type TrainerPokemonImportPreview = {
  sourceFileName: string;
  sourceExportTime: string | null;
  sourceExportTimestamp: string | null;
  sourceVersion: string | null;
  declaredPokemonCount: number;
  actualPokemonCount: number;
  validPokemonCount: number;
  checksum: string;
  diagnostics: TrainerPokemonDiagnostic[];
  diagnosticCounts: Record<TrainerPokemonDiagnosticCode, number>;
  stats: TrainerPokemonStats;
};

export type TrainerPokemonSnapshotSummary = {
  id: string;
  sourceFileName: string;
  sourceExportTime: string | null;
  sourceExportTimestamp: string | null;
  sourceVersion: string | null;
  declaredPokemonCount: number;
  actualPokemonCount: number;
  importedAt: string;
  importedBy: string;
  checksum: string;
  status: "staging" | "active" | "archived" | "failed";
  diagnostics: { warnings: number; errors: number; counts?: Record<string, number>; samples?: TrainerPokemonDiagnostic[] };
  stats: TrainerPokemonStats;
  canRollback: boolean;
};

export type TrainerPokemonSortField =
  | "dexNumber"
  | "frenchName"
  | "nickname"
  | "cp"
  | "ivPercent"
  | "attackIv"
  | "defenseIv"
  | "staminaIv"
  | "weightKg"
  | "heightM"
  | "shiny"
  | "lucky";

export type TrainerPokemonListResponse = {
  items: TrainerPokemon[];
  snapshot: TrainerPokemonSnapshotSummary | null;
  stats: TrainerPokemonStats;
  filters: {
    genders: TrainerPokemonGender[];
    alignments: TrainerPokemonAlignment[];
    forms: string[];
    costumes: string[];
    cp: { min: number; max: number };
    ivPercent: { min: number; max: number };
    weightKg: { min: number; max: number };
    heightM: { min: number; max: number };
  };
  pagination: { page: number; limit: number; total: number; pages: number };
};

export type TrainerPokemonIdentityDiagnosticGroup = {
  key: string;
  dexNumber: number;
  pokemonName: string;
  rawAlias: string;
  form: string | null;
  costume: string | null;
  gender: TrainerPokemonGender;
  shiny: boolean;
  canonicalId: string | null;
  identityStatus: string;
  reason: string;
  occurrences: number;
  sourceIds: string[];
};

export type TrainerPokemonIdentityDiagnosticsResponse = {
  snapshot: {
    id: string;
    sourceFileName: string;
    importedAt: string;
    identityResolvedAt: string | null;
    active: boolean;
  };
  items: TrainerPokemonIdentityDiagnosticGroup[];
  summary: {
    totalEntries: number;
    totalGroups: number;
    filteredEntries: number;
    filteredGroups: number;
    reasons: Record<string, number>;
  };
  pagination: { page: number; limit: number; total: number; pages: number };
};
