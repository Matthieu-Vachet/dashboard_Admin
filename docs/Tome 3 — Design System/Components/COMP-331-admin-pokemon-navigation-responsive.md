---
id: COMP-331
title: Navigation interne responsive Admin Pokémon
version: 1.1.0
status: Active
last_update: 2026-08-27
author: Matthieu Vachet
affected_projects: [Dashboard Admin]
references: [PAGE-050, PAGE-051, PAGE-052]
---

# COMP-331 — Navigation interne responsive Admin Pokémon

La navigation principale Pokémon est définie une seule fois par `navGroups`. La sidebar
desktop, son mode réduit, le drawer mobile et le fil d’Ariane réutilisent ce registre.
Les destinations sont des routes plates et l’état actif vient du pathname. Shiny
Tracker appartient au groupe Données Pokémon; aucun lien parallèle ne subsiste dans
Qualité & supervision.

À l’intérieur des pages qui possèdent encore des sous-sections, la barre compacte
combine recherche et état actif. Sur mobile et tablette étroite, un bouton ouvre un
panneau plein écran, verrouille le scroll, focalise la recherche et se ferme avec
Échap. La sous-section peut rester reflétée dans `?section=` sans recréer une seconde
navigation principale.
