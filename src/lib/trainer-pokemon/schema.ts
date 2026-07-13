import { createHash } from "node:crypto";
import type {
  TrainerPokemonImportFile,
  TrainerPokemonValidationIssue,
} from "@/types/admin/trainer-pokemon";

const requiredEntryFields = [
  "mon_number",
  "mon_name",
  "mon_cp",
  "mon_attack",
  "mon_defence",
  "mon_stamina",
  "mon_isShiny",
  "mon_isLucky",
  "mon_weight",
  "mon_height",
  "mon_move_1",
  "mon_move_2",
] as const;

export const trainerPokemonImportMaxBytes = 12_000_000;
export const trainerPokemonImportMaxEntries = 20_000;

export class TrainerPokemonValidationError extends Error {
  status = 400;
  code = "TRAINER_POKEMON_VALIDATION_FAILED";
  issues: TrainerPokemonValidationIssue[];

  constructor(issues: TrainerPokemonValidationIssue[]) {
    super(`Import invalide : ${issues.length} erreur(s) bloquante(s).`);
    this.issues = issues;
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function issue(issues: TrainerPokemonValidationIssue[], path: string, message: string) {
  issues.push({ path, message });
}

function validFiniteNumber(value: unknown) {
  return typeof value === "number" && Number.isFinite(value);
}

export function stableTrainerPokemonChecksum(value: unknown) {
  return createHash("sha256").update(JSON.stringify(value)).digest("hex");
}

export function validateTrainerPokemonImport(value: unknown): TrainerPokemonImportFile {
  const issues: TrainerPokemonValidationIssue[] = [];
  if (!isRecord(value)) throw new TrainerPokemonValidationError([{ path: "$", message: "Le fichier JSON doit contenir un objet." }]);

  const fileData = value.fileData;
  if (!isRecord(fileData)) {
    issue(issues, "$.fileData", "fileData doit être un objet indexé par les identifiants Pokémon.");
  }

  const fileName = typeof value.fileName === "string" && value.fileName.trim() ? value.fileName.trim() : "";
  if (!fileName) issue(issues, "$.fileName", "Le nom logique du fichier est requis.");

  const pokemonCount = value.pokemonCount;
  if (!Number.isInteger(pokemonCount) || Number(pokemonCount) < 0) {
    issue(issues, "$.pokemonCount", "pokemonCount doit être un entier positif ou nul.");
  }

  if (isRecord(fileData)) {
    const entries = Object.entries(fileData);
    if (entries.length > trainerPokemonImportMaxEntries) {
      issue(issues, "$.fileData", `Le fichier dépasse la limite de ${trainerPokemonImportMaxEntries.toLocaleString("fr-FR")} entrées.`);
    }
    if (Number.isInteger(pokemonCount) && Number(pokemonCount) !== entries.length) {
      issue(issues, "$.pokemonCount", `Le compteur annoncé (${pokemonCount}) ne correspond pas au nombre réel d’entrées (${entries.length}).`);
    }

    for (const [sourceId, raw] of entries) {
      const basePath = `$.fileData[${JSON.stringify(sourceId)}]`;
      if (typeof sourceId !== "string") issue(issues, basePath, "L’identifiant doit rester une chaîne.");
      if (!isRecord(raw)) {
        issue(issues, basePath, "L’entrée doit être un objet.");
        continue;
      }
      for (const field of requiredEntryFields) {
        if (!(field in raw)) issue(issues, `${basePath}.${field}`, "Champ obligatoire manquant.");
      }
      if (!Number.isInteger(raw.mon_number) || Number(raw.mon_number) <= 0) {
        issue(issues, `${basePath}.mon_number`, "mon_number doit être un entier strictement positif.");
      }
      if (typeof raw.mon_name !== "string" || !raw.mon_name.trim()) {
        issue(issues, `${basePath}.mon_name`, "mon_name doit être un texte non vide.");
      }
      for (const field of ["mon_cp", "mon_weight", "mon_height"] as const) {
        if (!validFiniteNumber(raw[field]) || Number(raw[field]) < 0) {
          issue(issues, `${basePath}.${field}`, `${field} doit être un nombre fini positif ou nul.`);
        }
      }
      for (const field of ["mon_attack", "mon_defence", "mon_stamina"] as const) {
        if (!Number.isInteger(raw[field]) || Number(raw[field]) < 0 || Number(raw[field]) > 15) {
          issue(issues, `${basePath}.${field}`, `${field} doit être un entier compris entre 0 et 15.`);
        }
      }
      for (const field of ["mon_isShiny", "mon_isLucky"] as const) {
        if (raw[field] !== "YES" && raw[field] !== "NO") {
          issue(issues, `${basePath}.${field}`, `${field} doit valoir YES ou NO.`);
        }
      }
      for (const field of ["mon_move_1", "mon_move_2"] as const) {
        if (typeof raw[field] !== "string" || !raw[field].trim()) {
          issue(issues, `${basePath}.${field}`, `${field} doit être un texte non vide.`);
        }
      }
      if (raw.mon_move_3 !== undefined && (typeof raw.mon_move_3 !== "string" || !raw.mon_move_3.trim())) {
        issue(issues, `${basePath}.mon_move_3`, "mon_move_3 doit être un texte non vide lorsqu’il est présent.");
      }
    }
  }

  if (issues.length) throw new TrainerPokemonValidationError(issues);

  return {
    fileName,
    exportTime: typeof value.exportTime === "string" && value.exportTime.trim() ? value.exportTime.trim() : null,
    exportTimestamp: typeof value.exportTimestamp === "string" && value.exportTimestamp.trim() ? value.exportTimestamp.trim() : null,
    pokemonCount: Number(pokemonCount),
    version: typeof value.version === "string" && value.version.trim() ? value.version.trim() : null,
    fileData: fileData as Record<string, unknown>,
  };
}
