import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import path from "path";

export type WorkspaceScript = {
  id: string;
  project: string;
  kind: "npm" | "node";
  category: string;
  name: string;
  command: string;
  description: string;
  cwd: string;
  relativePath?: string;
  scriptPath?: string;
  runnable: boolean;
};

const ignoredProjects = new Set(["node_modules", ".next", ".git", ".backup", "archive JSON"]);
const ignoredWalkFolders = new Set(["node_modules", ".next", ".git", ".data", "coverage", "dist", "build"]);

function workspaceRoot() {
  return process.env.WORKSPACE_ROOT || path.resolve(process.cwd(), "..");
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function projectLabel(projectDir: string) {
  const name = path.basename(projectDir);
  if (name === "PokemonGo-API-") return "PokemonGo-API";
  return name;
}

function categoryFromName(value: string) {
  const source = value.toLowerCase();
  if (source.includes("generate")) return "Générateur";
  if (source.includes("import") || source.includes("download") || source.includes("extract")) return "Import";
  if (source.includes("migrate") || source.includes("normalize")) return "Migration";
  if (source.includes("sync") || source.includes("watch")) return "Synchronisation";
  if (source.includes("audit") || source.includes("validate") || source.includes("check") || source.includes("test")) return "Contrôle";
  if (source.includes("build") || source.includes("dev") || source.includes("start")) return "Application";
  if (source.includes("mongo") || source.includes("index")) return "MongoDB";
  if (source.includes("backup")) return "Sauvegarde";
  return "Script";
}

function scriptPathFromCommand(projectDir: string, command: string) {
  const match = command.match(/\bnode\s+(?:\.\/)?(scripts\/[^\s]+)/);
  if (!match) return null;
  const relative = match[1].replace(/^\.\//, "");
  const fullPath = path.join(projectDir, relative);
  return existsSync(fullPath) ? { relative, fullPath } : null;
}

function descriptionFromCommand(
  projectDir: string,
  name: string,
  command: string,
  packageScripts: Record<string, string>,
  seen = new Set<string>(),
) {
  const scriptPath = scriptPathFromCommand(projectDir, command);
  if (scriptPath) return descriptionFromPath(scriptPath.relative, scriptPath.fullPath);

  const source = `${name} ${command}`.toLowerCase();
  const npmRun = command.match(/^npm run ([^\s]+)/);
  if (npmRun && !seen.has(npmRun[1]) && packageScripts[npmRun[1]]) {
    seen.add(npmRun[1]);
    return descriptionFromCommand(projectDir, npmRun[1], packageScripts[npmRun[1]], packageScripts, seen);
  }

  if (source.includes("next dev")) return "Démarre l'application Next.js en mode développement.";
  if (source.includes("next build")) return "Compile l'application Next.js pour la production.";
  if (source.includes("next start")) return "Lance le serveur Next.js à partir du build de production.";
  if (source.includes("nodemon src/server.js")) return "Démarre le serveur API en développement avec redémarrage automatique.";
  if (source.includes("node src/server.js")) return "Démarre le serveur API Node/Express.";
  if (source.includes("eslint") || source.includes("lint")) return "Analyse le code avec ESLint pour détecter les erreurs et incohérences.";
  if (source.includes("node --test") || source.includes("npm test")) return "Exécute les tests automatisés du projet.";
  if (source.includes("sync:dry") || source.includes("--dry-run")) return "Simule la synchronisation sans écrire de données.";
  if (source.includes("--check")) return "Vérifie les données sans les modifier.";
  if (source.includes("--write")) return "Exécute le script en mode écriture et modifie les fichiers ou la base ciblée.";
  if (source.includes("mongo")) return "Lance une opération MongoDB liée aux données Pokémon.";
  return `Commande npm définie dans package.json: ${command}`;
}

function commentDescription(scriptPath: string) {
  try {
    const lines = readFileSync(scriptPath, "utf8").split(/\r?\n/).slice(0, 24);
    const comments: string[] = [];
    let block = false;
    for (const rawLine of lines) {
      const line = rawLine.trim();
      if (!line || line.startsWith("#!")) continue;
      if (line.includes("eslint-disable") || line.includes("@ts-")) continue;
      if (line.startsWith("/**") || line.startsWith("/*")) {
        block = true;
        comments.push(line.replace(/^\/\*+\s?/, "").replace(/\*\/$/, "").trim());
        continue;
      }
      if (block) {
        comments.push(line.replace(/^\*\s?/, "").replace(/\*\/$/, "").trim());
        if (line.includes("*/")) break;
        continue;
      }
      if (line.startsWith("//")) {
        comments.push(line.replace(/^\/\/\s?/, "").trim());
        continue;
      }
      break;
    }
    return comments.filter(Boolean).join(" ").slice(0, 220);
  } catch {
    return "";
  }
}

function descriptionFromPath(relative: string, scriptPath: string) {
  const fromComment = commentDescription(scriptPath);
  if (fromComment) return fromComment;

  const source = relative.toLowerCase();
  const filename = path.basename(relative).replace(/\.(mjs|cjs|js|ts)$/, "");
  const label = filename.replace(/[-_]+/g, " ");
  if (source.includes("ensure-data")) return "Synchronise ou prépare les données locales nécessaires avant build ou exécution.";
  if (source.includes("verify-responsive")) return "Lance une vérification Playwright des vues responsives du dashboard.";
  if (source.includes("generatecurrentraids")) return "Génère le fichier JSON des raids actifs à partir des sources externes et des fiches locales.";
  if (source.includes("generatecurrenteggs")) return "Génère le fichier JSON des œufs actifs avec rareté, CP et enrichissement Pokémon.";
  if (source.includes("generatecurrentmaxbattles")) return "Génère le fichier JSON des Max Battles/Dynamax/Gigamax actifs.";
  if (source.includes("generatecurrentrocket")) return "Génère les équipes Team GO Rocket actives et leurs références Pokémon.";
  if (source.includes("generatecurrentresearch")) return "Génère les recherches actives avec récompenses Pokémon/items et métadonnées.";
  if (source.includes("generategamemasterreferences")) return "Reconstruit les références issues du Game Master pour enrichir les données locales.";
  if (source.includes("sync-shiny-release-data")) return "Synchronise les informations de sortie shiny dans les fiches Pokémon.";
  if (source.includes("add-candy-assets")) return "Ajoute ou met à jour les assets de bonbons dans les données Pokémon.";
  if (source.includes("import-pokemons-to-mongo")) return "Importe les fiches Pokémon locales dans MongoDB.";
  if (source.includes("import-pokemon-assets-to-mongo")) return "Importe les assets Pokémon locaux dans MongoDB.";
  if (source.includes("create-mongo-indexes")) return "Crée ou vérifie les index MongoDB nécessaires aux collections Pokémon.";
  if (source.includes("check-orphan-assets")) return "Cherche les assets Pokémon qui ne sont plus rattachés à une fiche connue.";
  if (source.includes("validate-pokemon-schema")) return "Valide les fiches Pokémon contre le schéma attendu.";
  if (source.includes("migrate") || source.includes("normalize")) return `Normalise ou migre les données liées à ${label}.`;
  if (source.includes("audit")) return `Contrôle la cohérence des données liées à ${label}.`;
  if (source.includes("import")) return `Importe ou enrichit les données liées à ${label}.`;
  if (source.includes("sync")) return `Synchronise les données liées à ${label}.`;
  return `Script Node ${relative}.`;
}

function projectDirectories(root: string) {
  return readdirSync(root)
    .filter((name) => !ignoredProjects.has(name))
    .map((name) => path.join(root, name))
    .filter((item) => {
      try {
        return statSync(item).isDirectory();
      } catch {
        return false;
      }
    });
}

function packageScripts(projectDir: string, project: string) {
  const packagePath = path.join(projectDir, "package.json");
  if (!existsSync(packagePath)) return [];

  try {
    const pkg = JSON.parse(readFileSync(packagePath, "utf8")) as { scripts?: Record<string, string> };
    return Object.entries(pkg.scripts || {}).map(([name, command]) => ({
      id: `${slug(project)}:npm:${slug(name)}`,
      project,
      kind: "npm" as const,
      category: categoryFromName(`${name} ${command}`),
      name,
      command: `npm run ${name}`,
      description: descriptionFromCommand(projectDir, name, command, pkg.scripts || {}),
      cwd: projectDir,
      runnable: true,
    }));
  } catch {
    return [];
  }
}

function nodeScripts(projectDir: string, project: string) {
  const scriptsDir = path.join(projectDir, "scripts");
  if (!existsSync(scriptsDir)) return [];

  const walk = (dir: string): string[] =>
    readdirSync(dir).flatMap((name) => {
      const item = path.join(dir, name);
      const stat = statSync(item);
      if (stat.isDirectory() && ignoredWalkFolders.has(name)) return [];
      if (stat.isDirectory()) return walk(item);
      return name.endsWith(".js") || name.endsWith(".mjs") || name.endsWith(".cjs") ? [item] : [];
    });

  return walk(scriptsDir).map((scriptPath) => {
    const relative = path.relative(projectDir, scriptPath);
    const runnable = !relative.split(path.sep).includes("lib");
    return {
      id: `${slug(project)}:node:${slug(relative)}`,
      project,
      kind: "node" as const,
      category: categoryFromName(relative),
      name: relative,
      command: `node ${relative}`,
      description: descriptionFromPath(relative, scriptPath),
      cwd: projectDir,
      relativePath: relative,
      scriptPath,
      runnable,
    };
  });
}

export function listWorkspaceScripts() {
  const root = workspaceRoot();
  const directories = [process.cwd(), ...projectDirectories(root)];
  const uniqueDirectories = Array.from(new Set(directories)).filter((dir) => existsSync(dir));

  return uniqueDirectories
    .flatMap((projectDir) => {
      const project = projectLabel(projectDir);
      return [...packageScripts(projectDir, project), ...nodeScripts(projectDir, project)];
    })
    .sort((left, right) => left.project.localeCompare(right.project) || left.name.localeCompare(right.name));
}
