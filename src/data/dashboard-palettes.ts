export type DashboardPaletteId =
  | "sapphire"
  | "ruby"
  | "fire-red"
  | "violet"
  | "leaf-green"
  | "pink"
  | "gold"
  | "electric";

type PaletteTokens = {
  "--brand": string;
  "--brand-2": string;
  "--brand-3": string;
  "--accent-primary": string;
  "--accent-secondary": string;
  "--accent-tertiary": string;
  "--accent-muted": string;
  "--accent-glow": string;
  "--accent-border": string;
  "--accent-text": string;
  "--accent-bg": string;
  "--accent-rgb": string;
};

export type DashboardPalette = {
  id: DashboardPaletteId;
  label: string;
  description: string;
  icon: string;
  swatches: string[];
  modes: {
    dark: PaletteTokens;
    light: PaletteTokens;
  };
};

export const defaultDashboardPaletteId: DashboardPaletteId = "sapphire";

export const dashboardPalettes: DashboardPalette[] = [
  {
    id: "sapphire",
    label: "Saphir",
    description: "Bleu / Cyan actuel",
    icon: "/ui/Types/ico_10_water.png",
    swatches: ["#20d3ff", "#905bf4", "#58f2a9"],
    modes: {
      dark: {
        "--brand": "#905bf4",
        "--brand-2": "#20d3ff",
        "--brand-3": "#58f2a9",
        "--accent-primary": "#20d3ff",
        "--accent-secondary": "#905bf4",
        "--accent-tertiary": "#58f2a9",
        "--accent-muted": "rgba(32, 211, 255, 0.12)",
        "--accent-glow": "rgba(32, 211, 255, 0.28)",
        "--accent-border": "rgba(32, 211, 255, 0.36)",
        "--accent-text": "#bdf5ff",
        "--accent-bg": "rgba(32, 211, 255, 0.12)",
        "--accent-rgb": "32 211 255",
      },
      light: {
        "--brand": "#7c3aed",
        "--brand-2": "#0284c7",
        "--brand-3": "#059669",
        "--accent-primary": "#0284c7",
        "--accent-secondary": "#7c3aed",
        "--accent-tertiary": "#059669",
        "--accent-muted": "rgba(2, 132, 199, 0.12)",
        "--accent-glow": "rgba(2, 132, 199, 0.18)",
        "--accent-border": "rgba(2, 132, 199, 0.34)",
        "--accent-text": "#075985",
        "--accent-bg": "rgba(2, 132, 199, 0.11)",
        "--accent-rgb": "2 132 199",
      },
    },
  },
  {
    id: "ruby",
    label: "Rubis",
    description: "Rouge / Rose",
    icon: "/ui/Types/ico_9_fire.png",
    swatches: ["#fb7185", "#e11d48", "#f97316"],
    modes: {
      dark: {
        "--brand": "#f43f5e",
        "--brand-2": "#fb7185",
        "--brand-3": "#f97316",
        "--accent-primary": "#fb7185",
        "--accent-secondary": "#e11d48",
        "--accent-tertiary": "#f97316",
        "--accent-muted": "rgba(251, 113, 133, 0.13)",
        "--accent-glow": "rgba(251, 113, 133, 0.3)",
        "--accent-border": "rgba(251, 113, 133, 0.38)",
        "--accent-text": "#ffe4e6",
        "--accent-bg": "rgba(251, 113, 133, 0.13)",
        "--accent-rgb": "251 113 133",
      },
      light: {
        "--brand": "#be123c",
        "--brand-2": "#e11d48",
        "--brand-3": "#ea580c",
        "--accent-primary": "#e11d48",
        "--accent-secondary": "#be123c",
        "--accent-tertiary": "#ea580c",
        "--accent-muted": "rgba(225, 29, 72, 0.11)",
        "--accent-glow": "rgba(225, 29, 72, 0.18)",
        "--accent-border": "rgba(225, 29, 72, 0.32)",
        "--accent-text": "#9f1239",
        "--accent-bg": "rgba(225, 29, 72, 0.1)",
        "--accent-rgb": "225 29 72",
      },
    },
  },
  {
    id: "fire-red",
    label: "Rouge Feu",
    description: "Orange / Ambre",
    icon: "/ui/Types/ico_9_fire.png",
    swatches: ["#f97316", "#fb923c", "#facc15"],
    modes: {
      dark: {
        "--brand": "#f97316",
        "--brand-2": "#fb923c",
        "--brand-3": "#facc15",
        "--accent-primary": "#fb923c",
        "--accent-secondary": "#f97316",
        "--accent-tertiary": "#facc15",
        "--accent-muted": "rgba(251, 146, 60, 0.13)",
        "--accent-glow": "rgba(251, 146, 60, 0.3)",
        "--accent-border": "rgba(251, 146, 60, 0.38)",
        "--accent-text": "#ffedd5",
        "--accent-bg": "rgba(251, 146, 60, 0.13)",
        "--accent-rgb": "251 146 60",
      },
      light: {
        "--brand": "#c2410c",
        "--brand-2": "#ea580c",
        "--brand-3": "#d97706",
        "--accent-primary": "#ea580c",
        "--accent-secondary": "#f97316",
        "--accent-tertiary": "#d97706",
        "--accent-muted": "rgba(234, 88, 12, 0.11)",
        "--accent-glow": "rgba(234, 88, 12, 0.18)",
        "--accent-border": "rgba(234, 88, 12, 0.32)",
        "--accent-text": "#9a3412",
        "--accent-bg": "rgba(234, 88, 12, 0.1)",
        "--accent-rgb": "234 88 12",
      },
    },
  },
  {
    id: "violet",
    label: "Violet",
    description: "Violet / Pourpre",
    icon: "/ui/Types/ico_13_psychic.png",
    swatches: ["#a78bfa", "#8b5cf6", "#22d3ee"],
    modes: {
      dark: {
        "--brand": "#8b5cf6",
        "--brand-2": "#a78bfa",
        "--brand-3": "#22d3ee",
        "--accent-primary": "#a78bfa",
        "--accent-secondary": "#8b5cf6",
        "--accent-tertiary": "#22d3ee",
        "--accent-muted": "rgba(167, 139, 250, 0.13)",
        "--accent-glow": "rgba(167, 139, 250, 0.3)",
        "--accent-border": "rgba(167, 139, 250, 0.4)",
        "--accent-text": "#ede9fe",
        "--accent-bg": "rgba(167, 139, 250, 0.13)",
        "--accent-rgb": "167 139 250",
      },
      light: {
        "--brand": "#6d28d9",
        "--brand-2": "#7c3aed",
        "--brand-3": "#0891b2",
        "--accent-primary": "#7c3aed",
        "--accent-secondary": "#6d28d9",
        "--accent-tertiary": "#0891b2",
        "--accent-muted": "rgba(124, 58, 237, 0.11)",
        "--accent-glow": "rgba(124, 58, 237, 0.18)",
        "--accent-border": "rgba(124, 58, 237, 0.32)",
        "--accent-text": "#5b21b6",
        "--accent-bg": "rgba(124, 58, 237, 0.1)",
        "--accent-rgb": "124 58 237",
      },
    },
  },
  {
    id: "leaf-green",
    label: "Vert Feuille",
    description: "Emeraude / Lime",
    icon: "/ui/Types/ico_11_grass.png",
    swatches: ["#34d399", "#22c55e", "#a3e635"],
    modes: {
      dark: {
        "--brand": "#22c55e",
        "--brand-2": "#34d399",
        "--brand-3": "#a3e635",
        "--accent-primary": "#34d399",
        "--accent-secondary": "#22c55e",
        "--accent-tertiary": "#a3e635",
        "--accent-muted": "rgba(52, 211, 153, 0.13)",
        "--accent-glow": "rgba(52, 211, 153, 0.3)",
        "--accent-border": "rgba(52, 211, 153, 0.38)",
        "--accent-text": "#d1fae5",
        "--accent-bg": "rgba(52, 211, 153, 0.13)",
        "--accent-rgb": "52 211 153",
      },
      light: {
        "--brand": "#15803d",
        "--brand-2": "#059669",
        "--brand-3": "#65a30d",
        "--accent-primary": "#059669",
        "--accent-secondary": "#15803d",
        "--accent-tertiary": "#65a30d",
        "--accent-muted": "rgba(5, 150, 105, 0.11)",
        "--accent-glow": "rgba(5, 150, 105, 0.18)",
        "--accent-border": "rgba(5, 150, 105, 0.32)",
        "--accent-text": "#065f46",
        "--accent-bg": "rgba(5, 150, 105, 0.1)",
        "--accent-rgb": "5 150 105",
      },
    },
  },
  {
    id: "pink",
    label: "Rose",
    description: "Rose / Fee",
    icon: "/ui/Types/ico_17_fairy.png",
    swatches: ["#f472b6", "#ec4899", "#c084fc"],
    modes: {
      dark: {
        "--brand": "#ec4899",
        "--brand-2": "#f472b6",
        "--brand-3": "#c084fc",
        "--accent-primary": "#f472b6",
        "--accent-secondary": "#ec4899",
        "--accent-tertiary": "#c084fc",
        "--accent-muted": "rgba(244, 114, 182, 0.13)",
        "--accent-glow": "rgba(244, 114, 182, 0.3)",
        "--accent-border": "rgba(244, 114, 182, 0.38)",
        "--accent-text": "#fce7f3",
        "--accent-bg": "rgba(244, 114, 182, 0.13)",
        "--accent-rgb": "244 114 182",
      },
      light: {
        "--brand": "#be185d",
        "--brand-2": "#db2777",
        "--brand-3": "#9333ea",
        "--accent-primary": "#db2777",
        "--accent-secondary": "#be185d",
        "--accent-tertiary": "#9333ea",
        "--accent-muted": "rgba(219, 39, 119, 0.11)",
        "--accent-glow": "rgba(219, 39, 119, 0.18)",
        "--accent-border": "rgba(219, 39, 119, 0.32)",
        "--accent-text": "#9d174d",
        "--accent-bg": "rgba(219, 39, 119, 0.1)",
        "--accent-rgb": "219 39 119",
      },
    },
  },
  {
    id: "gold",
    label: "Or",
    description: "Or / Ambre",
    icon: "/ui/Types/ico_5_rock.png",
    swatches: ["#facc15", "#f59e0b", "#fde68a"],
    modes: {
      dark: {
        "--brand": "#f59e0b",
        "--brand-2": "#facc15",
        "--brand-3": "#fde68a",
        "--accent-primary": "#facc15",
        "--accent-secondary": "#f59e0b",
        "--accent-tertiary": "#fde68a",
        "--accent-muted": "rgba(250, 204, 21, 0.13)",
        "--accent-glow": "rgba(250, 204, 21, 0.28)",
        "--accent-border": "rgba(250, 204, 21, 0.38)",
        "--accent-text": "#fef3c7",
        "--accent-bg": "rgba(250, 204, 21, 0.13)",
        "--accent-rgb": "250 204 21",
      },
      light: {
        "--brand": "#b45309",
        "--brand-2": "#d97706",
        "--brand-3": "#ca8a04",
        "--accent-primary": "#d97706",
        "--accent-secondary": "#b45309",
        "--accent-tertiary": "#ca8a04",
        "--accent-muted": "rgba(217, 119, 6, 0.12)",
        "--accent-glow": "rgba(217, 119, 6, 0.18)",
        "--accent-border": "rgba(217, 119, 6, 0.32)",
        "--accent-text": "#92400e",
        "--accent-bg": "rgba(217, 119, 6, 0.1)",
        "--accent-rgb": "217 119 6",
      },
    },
  },
  {
    id: "electric",
    label: "Jaune Electrique",
    description: "Jaune / Cyan",
    icon: "/ui/Types/ico_12_electric.png",
    swatches: ["#fde047", "#eab308", "#38bdf8"],
    modes: {
      dark: {
        "--brand": "#eab308",
        "--brand-2": "#fde047",
        "--brand-3": "#38bdf8",
        "--accent-primary": "#fde047",
        "--accent-secondary": "#eab308",
        "--accent-tertiary": "#38bdf8",
        "--accent-muted": "rgba(253, 224, 71, 0.13)",
        "--accent-glow": "rgba(253, 224, 71, 0.28)",
        "--accent-border": "rgba(253, 224, 71, 0.38)",
        "--accent-text": "#fef9c3",
        "--accent-bg": "rgba(253, 224, 71, 0.13)",
        "--accent-rgb": "253 224 71",
      },
      light: {
        "--brand": "#a16207",
        "--brand-2": "#ca8a04",
        "--brand-3": "#0284c7",
        "--accent-primary": "#ca8a04",
        "--accent-secondary": "#a16207",
        "--accent-tertiary": "#0284c7",
        "--accent-muted": "rgba(202, 138, 4, 0.12)",
        "--accent-glow": "rgba(202, 138, 4, 0.18)",
        "--accent-border": "rgba(202, 138, 4, 0.32)",
        "--accent-text": "#854d0e",
        "--accent-bg": "rgba(202, 138, 4, 0.1)",
        "--accent-rgb": "202 138 4",
      },
    },
  },
];

export const dashboardPaletteMap = Object.fromEntries(
  dashboardPalettes.map((palette) => [palette.id, palette]),
) as Record<DashboardPaletteId, DashboardPalette>;
