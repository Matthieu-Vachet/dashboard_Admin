---
id: PAGE-IDENTITY-001
title: Identity Manager Pokémon
status: active
version: 2.0.0
updated: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-API-, PokemonGo-Data]
references: []
---

# Identity Manager Pokémon

## Objectif

Administrer les alias des fournisseurs Pokémon GO sans réécrire la vérité canonique de PokemonGo-Data. Les identités actives viennent exclusivement de l’inventaire local ; MongoDB conserve les alias, les métadonnées manuelles et l’historique.

## Architecture

Le panneau `IdentityManagerPanel` passe par le BFF authentifié `/api/pokemon-admin`. Le BFF transmet le secret Admin uniquement côté serveur vers PokemonGo-API. Le navigateur ne reçoit jamais ce secret.

Le workflow de synchronisation est toujours :

1. charger et valider l’inventaire PokemonGo-Data ;
2. calculer un aperçu sans écriture ;
3. afficher créations, mises à jour, orphelins et conflits ;
4. bloquer l’application en présence d’un conflit ;
5. appliquer en lot en conservant alias et historique ;
6. recalculer l’aperçu afin de vérifier l’idempotence.

## PAGE-IDENTITY-001 — interface

Chaque fiche expose le `canonicalId`, le Pokémon local, le tuple forme/costume/transformation, `syncStatus`, la clé locale, le fichier source, l’asset bundle, les assets sexués, les alias et les actions historisées.

Les champs dérivés de PokemonGo-Data sont verrouillés pour une identité synchronisée. Une identité créée manuellement commence en `draft` ; elle ne devient active qu’après existence et validation de la fiche locale.

## API

- `identity-manager-inventory` recherche l’inventaire local ;
- `identity-manager-sync-preview` calcule la comparaison sans écriture ;
- `identity-manager-sync-apply` applique le plan si aucun conflit ne subsiste ;
- `identity-manager` accepte `syncStatus` et le tri correspondant.
- `identity-manager-providers` fournit uniquement le registre central actif utilisé par les filtres et la création d’alias ; une valeur « Autre… » ou une source inconnue n’est plus acceptée par l’API.
- les diagnostics GO Hub et Margxt peuvent être associés à une identité, puis pris en compte lors de la régénération ou de la nouvelle résolution suivante.

## Règles d’intégrité

- ne jamais inventer un canonical ID actif ;
- ne jamais modifier la valeur brute d’un alias fournisseur ;
- ne jamais appliquer un plan contenant un conflit ;
- conserver les orphelins en brouillon au lieu de les supprimer ;
- afficher la raison exacte de chaque diagnostic ;
- afficher l’asset bundle ou signaler explicitement son absence.
- rejeter tout provider absent du registre actif avec `IDENTITY_PROVIDER_NOT_REGISTERED` ;
- ne jamais réinjecter un provider rencontré seulement dans un historique ou une sauvegarde.

## Retrait de la collection personnelle

Le provider retiré n’appartient plus au registre, aux filtres ou aux actions. La migration `2026-07-31-retire-ma-collection` a sauvegardé chaque document avant nettoyage, vidé les anciennes collections Dresseur et retiré les alias/diagnostics actifs. Les seules références conservées sont historiques et résident dans les collections de migration documentées par COL-042 et COL-043.

## Gestion du genre

Les variantes mâle et femelle d’un même costume restent une seule identité logique. Les assets sexués sont visibles sur la fiche et `isFemale` ne sert qu’au choix de l’asset final. Les formes officielles `MALE` ou `FEMALE` restent distinctes.

## Checklist

- [ ] L’aperçu ne contient aucun conflit.
- [ ] Mewtwo Armored est présent comme identité distincte.
- [ ] Le second aperçu est entièrement inchangé.
- [ ] Les alias existants sont préservés.
- [ ] Les fiches synchronisées affichent une clé locale et leur source.
- [ ] L’asset bundle est visible ou explicitement absent.

## Historique

- 2026-07-17 — création du CRUD et des diagnostics Identity Manager.
- 2026-07-18 — branchement à l’inventaire exhaustif PokemonGo-Data, synchronisation prévisualisée et provenance locale visible.
- 2026-07-26 — catalogue central de providers, GO Hub et Margxt, avec diagnostics groupés réutilisables par Résolution des variantes.
- 2026-07-31 — registre fermé, retrait de la source obsolète, migration réversible et rejet des providers inconnus.
