import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(fs.readFileSync(path.join(root, "package.json"), "utf8"));
const expectedUiVersion = `V${packageJson.version}`;
const appVersionSource = fs.readFileSync(path.join(root, "src/data/app-version.ts"), "utf8");
const historySource = fs.readFileSync(
  path.join(root, "src/data/dashboard-version-history.ts"),
  "utf8",
);
const changelog = fs.readFileSync(path.join(root, "CHANGELOG.md"), "utf8");

assert.match(
  appVersionSource,
  new RegExp(`DASHBOARD_VERSION\\s*=\\s*["]${expectedUiVersion}["]`),
);
assert.match(
  historySource,
  new RegExp(`dashboardVersionHistory:[\\s\\S]*?version:\\s*["]${expectedUiVersion}["]`),
);
assert.match(changelog, new RegExp(`^## ${packageJson.version} - `, "m"));

console.log(`Version Dashboard alignée : ${expectedUiVersion}`);
