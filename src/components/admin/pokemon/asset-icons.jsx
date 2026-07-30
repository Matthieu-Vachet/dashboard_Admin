"use client";

import { uiAssets } from "@/components/site/ui-assets";

const typeIconMap = {
  Normal: "/assets/pokemon/types/icons/ico_0_normal.png",
  Fighting: "/assets/pokemon/types/icons/ico_1_fighting.png",
  Flying: "/assets/pokemon/types/icons/ico_2_flying.png",
  Poison: "/assets/pokemon/types/icons/ico_3_poison.png",
  Ground: "/assets/pokemon/types/icons/ico_4_ground.png",
  Rock: "/assets/pokemon/types/icons/ico_5_rock.png",
  Bug: "/assets/pokemon/types/icons/ico_6_bug.png",
  Ghost: "/assets/pokemon/types/icons/ico_7_ghost.png",
  Steel: "/assets/pokemon/types/icons/ico_8_steel.png",
  Fire: "/assets/pokemon/types/icons/ico_9_fire.png",
  Water: "/assets/pokemon/types/icons/ico_10_water.png",
  Grass: "/assets/pokemon/types/icons/ico_11_grass.png",
  Electric: "/assets/pokemon/types/icons/ico_12_electric.png",
  Psychic: "/assets/pokemon/types/icons/ico_13_psychic.png",
  Ice: "/assets/pokemon/types/icons/ico_14_ice.png",
  Dragon: "/assets/pokemon/types/icons/ico_15_dragon.png",
  Dark: "/assets/pokemon/types/icons/ico_16_dark.png",
  Fairy: "/assets/pokemon/types/icons/ico_17_fairy.png",
};

function values(data) {
  return Array.isArray(data) ? data : [];
}

function normalizeLabel(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/^\w/, (letter) => letter.toUpperCase());
}

function catalogItem(items, value) {
  const key = String(value || "").toLowerCase();
  return values(items).find((item) =>
    [item.id, item.type, item.slug, item.names?.English, item.names?.French]
      .filter(Boolean)
      .map((candidate) => String(candidate).toLowerCase())
      .includes(key),
  );
}

function typeIcon(type, catalog = []) {
  const item = catalogItem(catalog, type);
  const label = normalizeLabel(type);
  return item?.assets?.icon || typeIconMap[label] || null;
}

function typeName(type, catalog = []) {
  const item = catalogItem(catalog, type);
  return item?.names?.French || item?.names?.English || type || "-";
}

function weatherAsset(weather, catalog = []) {
  const item = catalogItem(catalog, weather);
  return {
    icon: item?.assets?.icon || item?.image || uiAssets.icons.weatherBoost,
    label: item?.names?.French || item?.names?.English || weather || "Meteo",
  };
}

export function TypeIcons({ types, catalog = [], size = "md" }) {
  const list = values(types).filter(Boolean);
  if (!list.length) return null;
  const classes = size === "sm" ? "h-7 w-7 p-1" : "h-8 w-8 p-1.5";

  return (
    <span className="inline-flex flex-wrap items-center gap-1.5" role="group" aria-label="Types Pokémon">
      {list.map((type) => {
        const icon = typeIcon(type, catalog);
        return (
          <span
            key={type}
            className={`grid ${classes} place-items-center rounded-full border border-line bg-surface-inset-medium`}
            title={typeName(type, catalog)}
          >
            {icon ? (
              <img className="h-full w-full object-contain" src={icon} alt={typeName(type, catalog)} loading="lazy" />
            ) : (
              <span className="text-[9px] font-black text-domain-foreground">{String(type).slice(0, 2).toUpperCase()}</span>
            )}
          </span>
        );
      })}
    </span>
  );
}

export function WeatherIcons({ weather, catalog = [] }) {
  const list = values(weather).filter(Boolean);
  if (!list.length) return null;
  return (
    <span className="inline-flex flex-wrap items-center gap-1.5" role="group" aria-label="Météo">
      {list.map((item) => {
        const asset = weatherAsset(item, catalog);
        return (
          <span
            key={item}
            className="inline-flex h-8 min-w-8 items-center justify-center rounded-full border border-cyan-100/15 bg-cyan-300/10 p-1.5"
            title={asset.label}
          >
            <img className="h-full w-full object-contain" src={asset.icon} alt={asset.label} loading="lazy" />
          </span>
        );
      })}
    </span>
  );
}
