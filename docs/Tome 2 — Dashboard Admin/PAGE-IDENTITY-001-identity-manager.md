---
id: PAGE-IDENTITY-001
title: Identity Manager Pokémon
status: active
version: 1.1.0
updated: 2026-07-18
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

## Règles d’intégrité

- ne jamais inventer un canonical ID actif ;
- ne jamais modifier la valeur brute d’un alias fournisseur ;
- ne jamais appliquer un plan contenant un conflit ;
- conserver les orphelins en brouillon au lieu de les supprimer ;
- afficher la raison exacte de chaque diagnostic ;
- afficher l’asset bundle ou signaler explicitement son absence.

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
