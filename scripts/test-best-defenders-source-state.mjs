import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";
import { bestDefendersSourceIssue } from "../src/lib/best-defenders-source-state.mjs";

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

test("un run Cloudflare devient un warning SOURCE_PROTECTED non retryable", () => {
  const issue = bestDefendersSourceIssue({
    run: {
      status: "failed",
      errors: [{
        code: "SOURCE_PROTECTED",
        message: "HTTP 403 · protection Cloudflare active",
        details: { retryable: false, preservation: "Conserver le current MongoDB." },
      }],
    },
  });
  assert.deepEqual(issue, {
    code: "SOURCE_PROTECTED",
    title: "Source protégée par le fournisseur",
    message: "HTTP 403 · protection Cloudflare active",
    preservation: "Conserver le current MongoDB.",
    retryable: false,
  });
});

test("le diagnostic MongoDB persistant expose SOURCE_TEMPORARILY_UNAVAILABLE", () => {
  const issue = bestDefendersSourceIssue({
    data: {
      meta: {
        diagnostics: {
          sourceAvailability: {
            code: "SOURCE_TEMPORARILY_UNAVAILABLE",
            message: "Page HTML inattendue",
            retryable: true,
            preservation: "Le dernier snapshot reste actif.",
          },
        },
      },
    },
  });
  assert.equal(issue.code, "SOURCE_TEMPORARILY_UNAVAILABLE");
  assert.equal(issue.retryable, true);
  assert.equal(issue.preservation, "Le dernier snapshot reste actif.");
});

test("une erreur générique n'est pas présentée comme une protection fournisseur", () => {
  assert.equal(bestDefendersSourceIssue({ errors: [{ code: "VALIDATION_FAILED" }] }), null);
});

test("le panneau conserve le dataset et rend un warning de disponibilité explicite", () => {
  const panel = fs.readFileSync(path.join(rootDir, "src", "components", "admin", "pokemon", "best-defenders-panel.jsx"), "utf8");
  assert.match(panel, /data-source-availability=\{sourceIssue\.code\}/);
  assert.match(panel, /La dernière version MongoDB validée reste affichée/);
  assert.match(panel, /setDataset\(payload\.data\)/);
});
