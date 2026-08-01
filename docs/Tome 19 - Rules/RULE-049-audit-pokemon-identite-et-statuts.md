---
id: RULE-049
title: Identité et statuts des audits Pokémon
version: 1.0.0
status: Active
last_update: 2026-07-31
author: Matthieu Vachet
affected_projects: [Dashboard Admin, PokemonGo-Data, PokemonGo-API-]
references: [ADR-014, ADR-016, DATASET-029]
---

# RULE-049 — Identité et statuts des audits Pokémon

1. `dexId + form + costume` est la clé métier ; `isFemale` ne la modifie pas.
2. Le parseur extrait, le normaliseur structure et le résolveur associe : ces responsabilités ne sont pas fusionnées.
3. Une suggestion textuelle, une ambiguïté ou une erreur de parsing ne devient jamais une divergence.
4. `divergence` exige une identité résolue et un objet de comparaison contenant champ, valeur externe, valeur locale et raison.
5. La source externe est en lecture seule et ne modifie aucun JSON Pokémon.
6. Un provider absent du registre Identity Manager est rejeté avant persistance.
7. Une association manuelle exige un candidat canonique existant, une confirmation explicite et une écriture traçable dans Identity Manager ; elle ne crée pas d’identité et ne réécrit aucun JSON Pokémon.
8. Les compteurs dérivent exclusivement des statuts documentés et restent filtrables.
