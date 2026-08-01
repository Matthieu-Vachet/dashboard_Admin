---
id: DATASET-029
title: Audit externe des sorties Pokémon
version: 2.0.0
status: Private
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-API-]
references: [PROVIDER-021, ADR-014, ADR-016, RULE-049, PAGE-059, PAGE-060, PAGE-061, PAGE-062]
---

# DATASET-029 — Pokémon Release Audit

Dataset privé, éphémère et strictement en lecture seule. Le pipeline est : source Margxt → extraction des cellules et séparateurs HTML → normalisation des champs → résolution canonique → comparaison locale → statuts indépendants → affichage. Le HTML brut n’est jamais une autorité d’écriture.

Une carte qui expose plusieurs candidats peut proposer « Lier à cette fiche JSON ». Cette action ne modifie pas le dataset d’audit ni les JSON Pokémon : après confirmation humaine, elle ajoute un alias `margxt` manuel et historisé à l’identité canonique déjà synchronisée dans Identity Manager, puis recalcule l’audit.

## Contrat

Chaque observation conserve le nom brut, le nom normalisé, `dexId`, forme, costume, événement, date, images source et provenance. Une résolution ajoute `canonicalId`, fichier JSON, `assetsRef`, variantes de sexe, stratégie et confiance. Chaque comparaison expose `field`, `externalValue`, `localValue`, `matches` et `reason`.

Les statuts métier sont `up-to-date`, `divergence`, `external-only`, `local-only` et `not-verified`. Les statuts de qualité sont `identity-ambiguous`, `identity-unresolved`, `parse-error` et `source-unavailable`. Les états `ignored`, `false-positive` et `manual-match` appartiennent au workflow Identity Manager. Une ambiguïté, une suggestion textuelle ou une erreur de parsing ne compte jamais comme divergence.

## Compteurs

`externalEntries`, `resolvedIdentities`, `upToDate`, `divergences`, `ambiguous`, `unresolved`, `parseErrors`, `externalOnly`, `localOnly`, `notVerified` et `sourceUnavailable` ont une définition renvoyée avec le payload et affichée dans l’interface. `totalResults` n’est pas utilisé comme compteur métier car une observation externe et sa couverture locale peuvent produire plusieurs lignes de revue.

Le payload est validé par Zod dans `pokemon-release-audit-schema.js`. Le contrat canonique de référence est documenté par `PokemonGo-Data/schemas/pokemon-audit-identity.schema.json`.
