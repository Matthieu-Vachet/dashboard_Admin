# JSON Builder canonique

Le JSON Builder crée une nouvelle identité PokémonGo-Data depuis les templates et schémas canoniques présents sur la branche `develop`. Il ne contient aucune copie manuelle du schéma métier : la structure, les clés et leur ordre proviennent des fichiers `templates/` et `schemas/` de PokémonGo-Data.

## Flux

1. La route admin charge le contrat canonique et les catalogues d’identités, de types et de moves.
2. Le wizard conserve un brouillon interne composé de `values`, `states`, `assets` et `options`.
3. Le serveur automatise l’identité, classe l’entité avec le classificateur partagé et construit les références Pokémon, Assets et PvP.
4. Le dry-run valide les schémas, les placeholders, les collisions Identity, les chemins, le parent et la branche Git.
5. Il applique les fichiers planifiés dans un overlay temporaire, puis consomme le générateur officiel pour recalculer exactement `mappings/pokemon/identity-inventory.json` sans modifier le dépôt.
6. Il retourne la preview exacte, le diff de chaque fichier, la liste exhaustive des écritures et une empreinte signée expirant après trente minutes.
7. La création recalcule intégralement le plan, vérifie les hashes et le HEAD, prépare tous les fichiers, puis les installe avec journal et rollback.

## États de valeurs

- `filled` : la valeur du brouillon est écrite.
- `automatic` : la valeur est calculée ou normalisée par le contrat central.
- `not-applicable`, `unknown`, `not-published` : deviennent `null` si le schéma autorise `null`, sont omis si la clé est optionnelle, et restent bloquants autrement.

Aucune chaîne sentinelle telle que `INCONNU`, `N/A` ou `À_REMPLIR` n’est écrite dans un JSON canonique.

## Fichiers et ordre

Une opération peut créer la fiche Pokémon, l’Assets Core, les familles Assets sélectionnées, une fiche PvP status-only, les manifests recalculés, l’inventaire Identity officiel, un backup parent et un rapport d’opération. Un fichier cible existant provoque `OVERWRITE_PROTECTED`.

Les objets générés suivent récursivement l’ordre des clés du template. Le patch parent remplace uniquement le tableau JSON concerné (`regionForms`, `megaEvolutions`, `dynamaxForms` ou `gigantamaxForms`) et conserve le reste du texte à l’octet près.

## Sécurité et environnements

- Authentification Dashboard obligatoire.
- Same-origin obligatoire pour les mutations.
- Rate limit et taille maximale du payload.
- Allowlist de chemins et refus des traversals/liens symboliques sortants.
- Dry-run signé, lié au propriétaire et invalidé si le dépôt ou un fichier attendu change.
- Écriture disponible uniquement depuis un checkout PokémonGo-Data local sur `develop`.
- Preview/Vercel : lecture et dry-run seulement. Aucun chemin arbitraire ni commit distant implicite.
- `main` et la production ne sont jamais ciblés.

## Validation

`npm run test:json-builder` couvre les dix catégories, le statut PvP futur, les états de valeur, l’inventaire Identity exact, les collisions, l’anti-overwrite, la préservation du patch, les traversals, le stale dry-run, le rollback injecté et la transaction réussie sans modification d’un fichier sentinelle non concerné.
