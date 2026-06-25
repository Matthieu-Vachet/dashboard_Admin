export type DailyCodeTip = {
  title: string;
  concept: string;
  snippet: string;
  takeaway: string;
  hashtags: string[];
};

export const dailyCodeTips: DailyCodeTip[] = [
  {
    title: "Nullish coalescing",
    concept: "Utilise ?? quand seul null ou undefined doit déclencher une valeur de secours.",
    snippet: "const label = user.nickname ?? user.name ?? \"Invité\";",
    takeaway: "Contrairement à ||, la valeur 0 ou \"\" reste valide.",
    hashtags: ["#JavaScript", "#AstuceJS", "#Frontend", "#CodeTips"],
  },
  {
    title: "Retour anticipé",
    concept: "Réduis les if imbriqués en sortant tôt quand une condition bloque.",
    snippet: "function save(data) {\n  if (!data) return null;\n  return persist(data);\n}",
    takeaway: "Le code reste plat, lisible et plus facile à tester.",
    hashtags: ["#CleanCode", "#JavaScript", "#DevTips", "#ApprendreJS"],
  },
  {
    title: "Destructuring utile",
    concept: "Récupère uniquement les champs dont tu as besoin.",
    snippet: "const { id, name, stats: { attack } } = pokemon;",
    takeaway: "Parfait pour clarifier les données manipulées.",
    hashtags: ["#JavaScript", "#ES6", "#CodeDaily", "#FrontendDev"],
  },
  {
    title: "Array.some",
    concept: "Teste si au moins un élément respecte une condition.",
    snippet: "const hasIssue = entries.some((entry) => entry.issues.length > 0);",
    takeaway: "Plus expressif qu'une boucle manuelle avec un booléen.",
    hashtags: ["#JavaScript", "#ArrayMethods", "#CodeTips", "#Dev"],
  },
  {
    title: "Array.every",
    concept: "Valide qu'une liste entière respecte une règle.",
    snippet: "const allReady = tasks.every((task) => task.done);",
    takeaway: "Idéal pour les checklists, formulaires et validations.",
    hashtags: ["#JavaScript", "#AstuceCode", "#LearningJS", "#WebDev"],
  },
  {
    title: "Objet immuable",
    concept: "Copie un objet avant de changer une propriété.",
    snippet: "const nextUser = { ...user, role: \"admin\" };",
    takeaway: "Essentiel en React pour déclencher un rendu propre.",
    hashtags: ["#ReactJS", "#JavaScript", "#State", "#Frontend"],
  },
  {
    title: "Filtrer sans muter",
    concept: "Supprime un élément en créant une nouvelle liste.",
    snippet: "const next = todos.filter((todo) => todo.id !== id);",
    takeaway: "filter garde ton état prévisible.",
    hashtags: ["#JavaScript", "#React", "#CleanCode", "#CodeTips"],
  },
  {
    title: "Map pour transformer",
    concept: "map sert à créer une nouvelle liste à partir d'une autre.",
    snippet: "const names = pokemons.map((pokemon) => pokemon.names.French);",
    takeaway: "Si tu ne retournes rien, ce n'est probablement pas map qu'il faut.",
    hashtags: ["#JavaScript", "#ArrayMap", "#ApprendreJS", "#DevTips"],
  },
  {
    title: "Optional chaining",
    concept: "Lis une propriété profonde sans casser si un niveau manque.",
    snippet: "const candy = pokemon.assets?.candy?.image ?? null;",
    takeaway: "Utile pour les données API évolutives.",
    hashtags: ["#JavaScript", "#API", "#Frontend", "#CodeDaily"],
  },
  {
    title: "Set anti-doublon",
    concept: "Un Set garde chaque valeur une seule fois.",
    snippet: "const uniqueTypes = [...new Set(types)];",
    takeaway: "Simple et rapide pour nettoyer une liste primitive.",
    hashtags: ["#JavaScript", "#Data", "#AstuceJS", "#WebDev"],
  },
  {
    title: "find vs filter",
    concept: "find renvoie le premier élément, filter renvoie une liste.",
    snippet: "const pikachu = pokemons.find((p) => p.formId === \"PIKACHU\");",
    takeaway: "Utilise find quand tu cherches une seule fiche.",
    hashtags: ["#JavaScript", "#ArrayMethods", "#CodeTips", "#Dev"],
  },
  {
    title: "includes lisible",
    concept: "Remplace plusieurs comparaisons par une liste autorisée.",
    snippet: "const isMega = [\"mega\", \"mega-x\", \"mega-y\"].includes(form);",
    takeaway: "Plus lisible que form === a || form === b || form === c.",
    hashtags: ["#JavaScript", "#CleanCode", "#CodeDaily", "#Frontend"],
  },
  {
    title: "Fonction pure",
    concept: "Une fonction pure retourne le même résultat avec les mêmes entrées.",
    snippet: "const total = prices.reduce((sum, price) => sum + price, 0);",
    takeaway: "Moins de surprises, plus de tests faciles.",
    hashtags: ["#JavaScript", "#FunctionalProgramming", "#DevTips", "#CleanCode"],
  },
  {
    title: "Template literal",
    concept: "Compose une chaîne avec des variables sans concaténation confuse.",
    snippet: "const url = `/api/pokemon/${encodeURIComponent(slug)}`;",
    takeaway: "encodeURIComponent protège les paramètres d'URL.",
    hashtags: ["#JavaScript", "#WebAPI", "#CodeTips", "#FrontendDev"],
  },
  {
    title: "try/catch ciblé",
    concept: "Attrape l'erreur au niveau où tu peux vraiment réagir.",
    snippet: "try {\n  await save();\n} catch (error) {\n  toast.error(error.message);\n}",
    takeaway: "Ne cache pas une erreur sans feedback utilisateur.",
    hashtags: ["#JavaScript", "#AsyncAwait", "#Frontend", "#DevTips"],
  },
  {
    title: "Promise.all",
    concept: "Lance plusieurs requêtes indépendantes en parallèle.",
    snippet: "const [pokemon, moves] = await Promise.all([getPokemon(), getMoves()]);",
    takeaway: "Plus rapide qu'attendre chaque appel l'un après l'autre.",
    hashtags: ["#JavaScript", "#Async", "#Performance", "#CodeDaily"],
  },
  {
    title: "Date ISO simple",
    concept: "Une date ISO est pratique pour trier et comparer.",
    snippet: "const today = new Date().toISOString().slice(0, 10);",
    takeaway: "Le format YYYY-MM-DD se trie naturellement.",
    hashtags: ["#JavaScript", "#Date", "#AstuceJS", "#Dev"],
  },
  {
    title: "Guard clause tableau",
    concept: "Protège un map quand la donnée API peut manquer.",
    snippet: "const safeEntries = Array.isArray(entries) ? entries : [];",
    takeaway: "Ton UI évite de planter sur une réponse inattendue.",
    hashtags: ["#JavaScript", "#API", "#Frontend", "#CleanCode"],
  },
  {
    title: "Nommer le prédicat",
    concept: "Extrais une condition complexe dans une fonction lisible.",
    snippet: "const isReleased = (p) => p.availability?.released === true;",
    takeaway: "Le nom explique l'intention mieux qu'un gros if.",
    hashtags: ["#JavaScript", "#CleanCode", "#CodeTips", "#LearningJS"],
  },
  {
    title: "Réduire en dictionnaire",
    concept: "Transforme une liste en accès rapide par id.",
    snippet: "const byId = Object.fromEntries(items.map((item) => [item.id, item]));",
    takeaway: "Lecture ensuite en O(1): byId[id].",
    hashtags: ["#JavaScript", "#DataStructures", "#Performance", "#DevTips"],
  },
  {
    title: "CSS aspect-ratio",
    concept: "Garde une carte image stable sans sauts de layout.",
    snippet: ".post-card {\n  aspect-ratio: 4 / 5;\n}",
    takeaway: "Très utile pour les visuels Instagram et galeries.",
    hashtags: ["#CSS", "#Frontend", "#UI", "#CodeTips"],
  },
  {
    title: "Clamp CSS",
    concept: "Borne une valeur entre un minimum et un maximum.",
    snippet: ".title {\n  font-size: clamp(1.5rem, 4vw, 3rem);\n}",
    takeaway: "Un titre responsive sans media query partout.",
    hashtags: ["#CSS", "#ResponsiveDesign", "#Frontend", "#WebDev"],
  },
  {
    title: "data-attribute",
    concept: "Expose un état au CSS sans ajouter de classe fragile.",
    snippet: "<button data-active={isActive}>Filtre</button>",
    takeaway: "Pratique avec Tailwind, tests et composants UI.",
    hashtags: ["#HTML", "#ReactJS", "#Frontend", "#CodeTips"],
  },
  {
    title: "ARIA label",
    concept: "Un bouton icône doit avoir un nom accessible.",
    snippet: "<button aria-label=\"Fermer la fenêtre\">×</button>",
    takeaway: "L'accessibilité commence par les petits contrôles.",
    hashtags: ["#HTML", "#Accessibility", "#Frontend", "#A11y"],
  },
  {
    title: "FormData",
    concept: "Lis un formulaire sans contrôler chaque champ.",
    snippet: "const form = new FormData(event.currentTarget);\nconst title = form.get(\"title\");",
    takeaway: "Parfait pour un submit simple et lisible.",
    hashtags: ["#JavaScript", "#HTMLForms", "#WebDev", "#CodeDaily"],
  },
  {
    title: "Debounce mental",
    concept: "Attends que l'utilisateur arrête de taper avant de filtrer lourd.",
    snippet: "const timer = setTimeout(() => setQuery(value), 250);\nreturn () => clearTimeout(timer);",
    takeaway: "Moins de calculs, interface plus fluide.",
    hashtags: ["#JavaScript", "#Performance", "#ReactJS", "#Frontend"],
  },
  {
    title: "Module clair",
    concept: "Un fichier utilitaire doit exporter des fonctions nommées.",
    snippet: "export function formatDexId(value) {\n  return String(value).padStart(4, \"0\");\n}",
    takeaway: "Les imports restent explicites et faciles à chercher.",
    hashtags: ["#JavaScript", "#Modules", "#CleanCode", "#DevTips"],
  },
  {
    title: "Boolean strict",
    concept: "Compare explicitement quand l'origine des données est externe.",
    snippet: "const released = pokemon.availability?.released === true;",
    takeaway: "Tu évites les surprises entre true, \"true\", 1 ou undefined.",
    hashtags: ["#JavaScript", "#API", "#TypeSafety", "#CodeTips"],
  },
  {
    title: "Copie profonde simple",
    concept: "Pour du JSON pur, structuredClone est plus clair.",
    snippet: "const draft = structuredClone(sourceJson);",
    takeaway: "À éviter avec fonctions/classes, parfait pour JSON.",
    hashtags: ["#JavaScript", "#JSON", "#WebAPI", "#DevTips"],
  },
  {
    title: "Tri stable lisible",
    concept: "localeCompare trie proprement les textes.",
    snippet: "items.sort((a, b) => a.name.localeCompare(b.name, \"fr\"));",
    takeaway: "Mieux adapté aux accents qu'une comparaison brute.",
    hashtags: ["#JavaScript", "#Sorting", "#AstuceJS", "#Frontend"],
  },
];

export function getDailyCodeTip(date: Date | string = new Date()) {
  const iso = date instanceof Date ? date.toISOString().slice(0, 10) : String(date).slice(0, 10);
  const seed = iso.split("").reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return dailyCodeTips[seed % dailyCodeTips.length];
}
