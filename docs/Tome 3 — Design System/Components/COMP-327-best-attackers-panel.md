---
id: COMP-327
title: BestAttackersPanel
version: 1.2.0
status: Active
last_update: 2026-07-15
author: Matthieu Vachet
affected_projects: [Dashboard Admin]
references: [PAGE-050, API-161, COMP-325, COMP-326]
---

# COMP-327 — BestAttackersPanel

Orchestre la vue PvE : filtres contrôlés, états loading/vide/erreur, pagination, métriques et actions d'actualisation, export et régénération. Les requêtes et calculs restent côté serveur. Le type est un groupe radio visuel à sélection unique utilisant `typeIcon`, avec scroll mobile et contrat serveur `ANY`/types inchangé. Sous `sm`, la carte compacte rang, artwork, identité, attaques et métriques ; le layout desktop reste inchangé. L'artwork mobile mesure 76 px, partage sa zone avec le badge de rang et les six premiers résultats sont chargés en priorité. Le libellé technique de variante sous l'artwork est masqué dans ce classement, car `PokemonStateIndicators` expose déjà la même information dans l'identité. Les résultats suivants restent lazy-loadés et ont été vérifiés au scroll : 50 assets résolus, 50 chargés, aucun échec.
