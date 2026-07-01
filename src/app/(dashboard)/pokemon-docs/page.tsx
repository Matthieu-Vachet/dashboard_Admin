import { promises as fs } from "node:fs";
import path from "node:path";
import { PokemonApiExplorer } from "@/components/dashboard/pokemon-api-explorer";
import { PokemonApiStatus } from "@/components/dashboard/pokemon-api-status";
import { PokemonDocsViewer, type PokemonDoc } from "@/components/dashboard/pokemon-docs-viewer";

const docsOrder = [
  "SCHEMA.md",
  "TEMPLATES.md",
  "DATA-NORMALIZATION.md",
  "API.md",
  "EVENTS-CALENDAR.md",
  "PROJECT-STRUCTURE.md",
  "JAVASCRIPT-FILES.md",
  "MAINTENANCE.md",
  "GIT-WORKFLOW.md",
  "SHUFFLE-NAMING-CONVENTION.md",
];

export default async function PokemonDocsPage() {
  const docs = await loadPokemonDocs();
  return (
    <div className="space-y-4">
      <PokemonApiStatus />
      <PokemonApiExplorer />
      <PokemonDocsViewer docs={docs} />
    </div>
  );
}

async function loadPokemonDocs(): Promise<PokemonDoc[]> {
  const docsDir = path.join(process.cwd(), "src/data/pokemon-docs");
  const files = await fs.readdir(docsDir);
  const markdownFiles = files
    .filter((file) => file.endsWith(".md"))
    .sort((left, right) => {
      const leftIndex = docsOrder.indexOf(left);
      const rightIndex = docsOrder.indexOf(right);
      return (leftIndex === -1 ? 999 : leftIndex) - (rightIndex === -1 ? 999 : rightIndex);
    });

  return Promise.all(
    markdownFiles.map(async (file) => {
      const content = await fs.readFile(path.join(docsDir, file), "utf8");
      const title =
        content
          .split("\n")
          .find((line) => line.startsWith("# "))
          ?.replace(/^#\s+/, "")
          .trim() || file.replace(/\.md$/, "");

      return {
        slug: file.toLowerCase().replace(/\.md$/, "").replace(/[^a-z0-9]+/g, "-"),
        file,
        title,
        content,
        lineCount: content.split("\n").length,
      };
    }),
  );
}
