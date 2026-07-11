import fs from "node:fs";
import path from "node:path";
import { validateLearningCatalog, validateLearningTopic } from "../src/lib/learning/schema.ts";

const root = process.cwd();
const learningDirectory = path.join(root, "src/data/learning");
const topicFiles = fs.readdirSync(learningDirectory)
  .filter((file) => file.endsWith(".json") && !file.startsWith("curriculum") && !file.startsWith("template"))
  .sort();
const topics = topicFiles.map((file) => JSON.parse(fs.readFileSync(path.join(learningDirectory, file), "utf8")));
const curriculum = JSON.parse(fs.readFileSync(path.join(learningDirectory, "curriculum.json"), "utf8"));
const catalog = validateLearningCatalog(topics, curriculum);
const template = JSON.parse(fs.readFileSync(path.join(learningDirectory, "template-topic.json"), "utf8"));
const templateResult = validateLearningTopic(template);

if (!templateResult.success) {
  templateResult.issues.forEach((issue) => catalog.issues.push({ ...issue, path: `template-topic.${issue.path}` }));
}

for (const issue of catalog.issues) {
  const prefix = issue.severity === "error" ? "ERREUR" : "AVERTISSEMENT";
  console.log(`${prefix} ${issue.path} : ${issue.message}`);
}

const errors = catalog.issues.filter((issue) => issue.severity === "error");
if (errors.length) {
  console.error(`Validation refusée : ${errors.length} erreur(s).`);
  process.exit(1);
}

console.log(`Validation learning réussie : ${catalog.topics.length} thème(s), ${topicFiles.length} fichier(s), schéma V1.`);
