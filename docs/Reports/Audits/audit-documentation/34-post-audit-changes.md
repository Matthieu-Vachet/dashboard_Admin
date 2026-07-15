---
last_updated: 2026-07-13
titre: Changements post-audit — Ma collection Pokémon GO
version: 1.1.0
statut: validation_locale_terminee
date: 2026-07-13
projet: Dashboard Admin
audit_reference: snapshot du 2026-07-12
---

# 34 — Changements post-audit

## Fonctionnalité

Ajout de `PAGE-049 — Ma collection Pokémon GO`, section privée d'Admin Pokémon permettant la prévisualisation, l'import atomique, la consultation paginée et le rollback d'une collection personnelle Pokémon GO.

Ce document conserve l’écart post-audit. Les rapports `00` à `33` portent désormais un encart « Mise à jour code courant — 13 juillet 2026 » lorsqu’un constat est affecté; leurs sections d’audit initial continuent d’identifier le snapshot du 12 juillet 2026.

## Fichiers de code créés

- `Dashboard Admin/src/types/admin/trainer-pokemon.ts`
- `Dashboard Admin/src/lib/trainer-pokemon/{schema,normalize,references,atomic,repository,http}.ts`
- `Dashboard Admin/src/services/admin/trainer-pokemon-api.ts`
- `Dashboard Admin/src/components/admin/pokemon/trainer-pokemon-collection-panel.tsx`
- `Dashboard Admin/src/app/api/trainer-pokemon/route.ts`
- `Dashboard Admin/src/app/api/trainer-pokemon/import/route.ts`
- `Dashboard Admin/src/app/api/trainer-pokemon/imports/route.ts`
- `Dashboard Admin/src/app/api/trainer-pokemon/imports/[id]/rollback/route.ts`
- `Dashboard Admin/scripts/test-trainer-pokemon.mjs`

## Fichiers de code modifiés

- `Dashboard Admin/src/components/admin/pokemon/admin-app.jsx` — navigation et chargement dynamique.
- `Dashboard Admin/src/components/ui/modal.tsx` — focus initial, piège Tab/Escape et restauration.
- `Dashboard Admin/src/proxy.ts` — famille de routes reconnue ; l'autorisation reste revérifiée dans les handlers.
- `Dashboard Admin/package.json` et `package-lock.json` — version `1.21.0` et commande de test ciblée.
- `Dashboard Admin/src/data/app-version.ts`, `dashboard-version-history.ts` et `CHANGELOG.md` — historique de livraison aligné.
- `Dashboard Admin/tsconfig.json` — imports `.ts` autorisés pour les tests natifs Node sans émission.

## Nouvelles routes

| ID | Méthode | Route | Visibilité |
|---|---|---|---|
| API-157 | GET | `/api/trainer-pokemon` | privée Dashboard |
| API-158 | POST | `/api/trainer-pokemon/import` | privée Dashboard, mutation same-origin |
| API-159 | GET | `/api/trainer-pokemon/imports` | privée Dashboard |
| API-160 | POST | `/api/trainer-pokemon/imports/:id/rollback` | privée Dashboard, mutation same-origin |

Ces routes sont absentes de l'OpenAPI et de l'API Explorer publics.

## Nouvelles collections MongoDB

| ID | Collection | Rôle |
|---|---|---|
| COL-030 | `trainer_pokemon_owners` | pointeur actif/previous atomique par propriétaire |
| COL-031 | `trainer_pokemon_snapshots` | provenance, historique, diagnostics et statuts |
| COL-032 | `trainer_pokemon_entries` | entrées normalisées liées au snapshot |

## Nouveau composant et dataset

- `COMP-137 — TrainerPokemonCollectionPanel`
- `DATASET-020 — Collection personnelle Pokémon GO` (`private-dashboard`)
- `WORKFLOW-016 — Import et activation atomique de la collection Pokémon GO`

## Documentation créée

Onze fiches post-audit ont été ajoutées sous `Dashboard Admin/docs/codex/Post-audit 2026-07-13/` : PAGE-049, COMP-137, API-157 à API-160, COL-030 à COL-032, DATASET-020 et WORKFLOW-016.

## Documentation vivante réconciliée

DOC-011 à DOC-035 utilisent désormais le même front matter, les huit mêmes sections et des faits vérifiés dans le code courant. Les rapports Markdown `00` à `33` portent un encart daté du 13 juillet 2026 et les registres JSON intègrent PAGE-049, COMP-137, SERVICE-005, API-157 à API-160, COL-030 à COL-032, DATASET-020 et WORKFLOW-016.

## Dépendances

Aucune dépendance npm ajoutée ou supprimée. La fonctionnalité réutilise MongoDB, Next.js, React, Lucide, Sonner et les primitives UI déjà présentes.

## Tests et validations

- `npm run test:trainer-pokemon` : 14/14 réussis, dont le fichier réel de 4 838 entrées, les assets exacts/fallback et les simulations import initial/remplacement/échec/read-back/rollback.
- `npm run test:admin-pokemon` : 11/11 réussis, dont navigation, focus des modales, Background, Shiny, agenda mobile, diagnostics, API Explorer et catalogue.
- `npm run typecheck` : réussi.
- `npm run lint` : aucune erreur ; 64 avertissements historiques `no-img-element` hors nouvelle UI.
- `npm run build` : réussi ; avertissement NFT historique de `/api/pokemon-admin` inchangé.
- Playwright local : 375×812, 390×844, 430×932, 768×1024, 1440×900 et 1920×1080, thèmes sombre/clair, aucun overlay/erreur console/débordement global.
- Aperçu serveur réel : 4 838 annoncés, réels et valides ; confirmation rendue disponible sans déclencher l'import MongoDB.

## Impact public / privé

Impact public nul. La collection reste liée à l'email de session, avec cache privé/no-store, contrôle handler-par-handler et absence de toute route PokemonGo-API ou documentation OpenAPI publique.

## Risques restant ouverts

- Le fichier réel produit 1 061 diagnostics non bloquants lors de l'aperçu : 1 genre inconnu, 171 formes partielles, 390 attaques non résolues et 499 assets exacts absents (principalement costumes). Les valeurs source restent visibles et aucun type/asset n'est inventé.
- Les alertes externes et la politique de rétention/TTL des snapshots ne sont pas implémentées.
- Le commit réel et le rollback réel nécessitent une base MongoDB configurée et n'ont pas été exécutés pour éviter une mutation non autorisée.
- Les 64 avertissements lint historiques sur d'anciens `<img>` restent hors périmètre.

## Correctifs V1.21.1

- La navigation Admin Pokémon se compacte sans étirer les groupes fermés et expose des raccourcis mobile.
- Background relie les Location Cards aux fiches par fichier et variante au lieu d’afficher des associations vides.
- La collection enrichit les lectures en mémoire avec les référentiels canoniques, sans écriture ni migration MongoDB, et ajoute les filtres poids/taille.
- Shiny Tracker, le calendrier, les diagnostics source, l’API Explorer et le catalogue d’attaques possèdent désormais des variantes mobile dédiées.
- Aucun import, rollback, reset ou changement de progression utilisateur n’a été exécuté pendant cette passe corrective.
