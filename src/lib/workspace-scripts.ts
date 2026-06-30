import { existsSync, readdirSync, readFileSync, statSync } from "fs";
import path from "path";

export type WorkspaceScript = {
  id: string;
  project: string;
  kind: "npm" | "node";
  name: string;
  command: string;
  description: string;
  cwd: string;
  scriptPath?: string;
};

const ignoredProjects = new Set(["node_modules", ".next", ".git", "archive JSON"]);

function workspaceRoot() {
  return process.env.WORKSPACE_ROOT || path.resolve(process.cwd(), "..");
}

function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
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
      name,
      command: `npm run ${name}`,
      description: command,
      cwd: projectDir,
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
      if (stat.isDirectory()) return walk(item);
      return name.endsWith(".js") || name.endsWith(".mjs") || name.endsWith(".cjs") ? [item] : [];
    });

  return walk(scriptsDir).map((scriptPath) => {
    const relative = path.relative(projectDir, scriptPath);
    return {
      id: `${slug(project)}:node:${slug(relative)}`,
      project,
      kind: "node" as const,
      name: relative,
      command: `node ${relative}`,
      description: "Script Node detecte dans le dossier scripts.",
      cwd: projectDir,
      scriptPath,
    };
  });
}

export function listWorkspaceScripts() {
  const root = workspaceRoot();
  const directories = [process.cwd(), ...projectDirectories(root)];
  const uniqueDirectories = Array.from(new Set(directories)).filter((dir) => existsSync(dir));

  return uniqueDirectories
    .flatMap((projectDir) => {
      const project = path.basename(projectDir);
      return [...packageScripts(projectDir, project), ...nodeScripts(projectDir, project)];
    })
    .sort((left, right) => left.project.localeCompare(right.project) || left.name.localeCompare(right.name));
}

