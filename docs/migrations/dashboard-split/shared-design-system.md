# Design System partagé par copie indépendante

Les deux applications embarquent leur propre copie des primitives nécessaires. Il n’existe aucune dépendance runtime entre les repositories.

Le Dashboard Pokémon conserve l’identité visuelle Zygarde/Pokémon, ses assets historiques et les primitives Button, Badge, Card, Modal, champs, états, navigation, thèmes et responsive réellement consommées. Le Dashboard JavaScript conserve les mêmes contrats de primitives au moment de la séparation avec une identité MatWeb.

Les documents historiques de fondation et d’audit restent des snapshots datés. Les documents actifs JS Progress ont été retirés de ce repository et placés dans `dashboard-javascript/docs`.
