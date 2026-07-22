import { catalogItem, pokemonVariantLabel, preferredPokemonImage, typeBackground, typeColors, typeIcon, typeName } from "@/components/site/pokemon-style";
import { uiAssets } from "@/components/site/ui-assets";
import { Checkbox } from "@/components/ui/checkbox";

/** Vérifie si une fiche possède au moins un asset exploitable. */
function hasAssets(entry) {
  const assets = entry.assets || {};
  return Boolean(
    assets.go ||
      assets.candy ||
      assets.goShiny ||
      assets.home ||
      assets.homeShiny ||
      assets.goVariants ||
      assets.homeVariants ||
      assets.locationCards ||
      assets.shuffleVariants,
  );
}

/** Isole les clés manquantes, y compris celles remontées par les règles personnalisées. */
function missingKeyIssues(entry) {
  return (entry?.issues || []).filter(
    (issue) => issue.issue === "missing" || issue.category === "custom",
  );
}

function TypeBadge({ type, catalog }) {
  if (!type) return null;
  return (
    <span
      className="inline-flex min-h-9 min-w-0 flex-1 items-center justify-center gap-2 rounded-xl border border-line px-3 text-xs font-black text-domain-foreground shadow-sm"
      style={{
        background: `color-mix(in srgb, ${typeColors[type] || "#7aa7ff"} 58%, rgba(255,255,255,.12))`,
      }}
    >
      {typeIcon(type, catalog) ? (
        <img className="h-5 w-5 shrink-0 object-contain" src={typeIcon(type, catalog)} alt="" />
      ) : (
        <span
          className="h-3 w-3 shrink-0 rounded-full"
          style={{ background: typeColors[type] || "#7aa7ff" }}
        />
      )}
      <span className="truncate">{typeName(type, catalog)}</span>
    </span>
  );
}

function WeatherBadge({ weatherId, catalog }) {
  const item = catalogItem(catalog, weatherId);
  return (
    <span className="inline-flex min-h-8 min-w-0 max-w-full items-center justify-center gap-2 overflow-hidden rounded-lg border border-line bg-surface-emphasis px-3 text-xs font-black text-foreground">
      {item?.assets?.icon ? (
        <img className="h-5 w-5 shrink-0 object-contain" src={item.assets.icon} alt="" />
      ) : null}
      <span className="truncate">{item?.names?.French || weatherId}</span>
    </span>
  );
}

function MiniInfo({ children, icon }) {
  return (
    <span className="inline-flex min-h-8 items-center justify-center gap-2 rounded-lg border border-line bg-surface-emphasis px-3 text-xs font-black text-foreground">
      {icon ? <img className="h-4 w-4 shrink-0 object-contain" src={icon} alt="" /> : null}
      <span className="truncate">{children}</span>
    </span>
  );
}

export function PokemonCard({
  entry,
  onOpen,
  actionLabel = "Voir la fiche",
  compact = false,
  admin = false,
  assetChecked = false,
  onAssetChecked,
  typeCatalog = [],
  weatherCatalog = [],
}) {
  const score = entry?.quality?.score ?? 0;
  const types = [entry.primaryType, entry.secondaryType].filter(Boolean);
  const weather = (entry.weatherBoost || []).filter(Boolean);
  const assetsPresent = hasAssets(entry);
  const missingKeys = missingKeyIssues(entry);
  const mainType = String(entry.primaryType || "NORMAL").toUpperCase();
  const background = typeBackground(mainType, typeCatalog);
  const visibleWeather = compact ? weather.slice(0, 1) : weather.slice(0, 2);
  const displayImage = preferredPokemonImage(entry, {
    shiny: entry?.presentationVariant?.shiny === true,
  });
  const variantLabel = pokemonVariantLabel(entry);

  return (
    <article
      className={`relative isolate flex h-full min-h-[430px] flex-col overflow-hidden rounded-[1.65rem] border p-4 shadow-[0_18px_50px_rgba(0,0,0,0.24)] ${
        entry.complete ? "border-emerald-300/25" : "border-amber-300/30"
      } ${assetChecked ? "ring-2 ring-emerald-300/50" : ""}`}
      style={{
        borderColor: `color-mix(in srgb, ${typeColors[mainType] || "#7aa7ff"} 42%, rgba(255,255,255,.12))`,
        backgroundImage: `${
          background ? `linear-gradient(120deg, rgba(8,10,13,.88), rgba(24,28,36,.76)), url("${background}")` : "linear-gradient(120deg, rgba(8,10,13,.92), rgba(24,28,36,.84))"
        }`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="absolute inset-x-[-20%] bottom-[-38%] -z-10 h-2/3 rounded-full blur-3xl"
        style={{ background: `color-mix(in srgb, ${typeColors[mainType] || "#7aa7ff"} 45%, transparent)` }}
      />
      <div className="grid grid-cols-[86px_minmax(0,1fr)_58px] items-center gap-3 max-[520px]:grid-cols-[74px_minmax(0,1fr)]">
        <div className="grid h-[86px] w-[86px] place-items-center overflow-hidden rounded-full border-[5px] border-white/75 bg-[linear-gradient(#fff_0_48%,#1f2937_49%_52%,#ff4f5e_53%_100%)] max-[520px]:h-[74px] max-[520px]:w-[74px]">
          {displayImage ? (
            <img className="h-[105%] w-[105%] object-contain drop-shadow-lg" src={displayImage} alt={entry.name} loading="lazy" />
          ) : (
            <span className="h-6 w-6 rounded-full bg-slate-900" />
          )}
        </div>
        <div className="min-w-0">
          <span className="font-black tracking-widest text-foreground">N° {entry.dexId}</span>
          <h3 className="mt-1 break-words text-xl font-black leading-tight text-domain-foreground">
            {entry.name}
          </h3>
          <p className="mt-1 truncate text-sm font-medium text-foreground-secondary">
            {entry.profile || entry.kind} · {entry.form || "normal"} · Gén.{" "}
            {entry.generation || "?"}
          </p>
          <span className="mt-2 inline-flex rounded-full border border-line-medium bg-white/12 px-2.5 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-domain-foreground">
            {variantLabel}
          </span>
        </div>
        <div
          className="grid h-[58px] w-[58px] place-items-center rounded-full text-sm font-black text-domain-foreground max-[520px]:absolute max-[520px]:right-4 max-[520px]:top-4 max-[520px]:h-[54px] max-[520px]:w-[54px]"
          style={{
            background: `radial-gradient(circle at center, #08090d 54%, transparent 56%), conic-gradient(${typeColors[mainType] || "#7aa7ff"} ${score}%, rgba(255,255,255,.16) 0)`,
          }}
        >
          {score}%
        </div>
      </div>

      <div className={`mt-4 grid min-h-9 gap-2 ${types.length > 1 ? "grid-cols-2" : ""}`}>
        {types.map((type) => (
          <TypeBadge key={type} type={type} catalog={typeCatalog} />
        ))}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 min-[521px]:hidden">
        <MiniInfo icon={uiAssets.icons.weatherBoost}>
          {weather.length || 0} météo
        </MiniInfo>
        <MiniInfo icon={uiAssets.icons.attack}>
          {(entry.quickMoveCount || 0) + (entry.chargedMoveCount || 0)} attaques
        </MiniInfo>
      </div>

      <div className="mt-3 grid min-h-[5.5rem] grid-cols-2 content-start gap-2 max-[520px]:hidden">
        {visibleWeather.map((weatherId) => (
          <WeatherBadge key={weatherId} weatherId={weatherId} catalog={weatherCatalog} />
        ))}
        <MiniInfo icon={uiAssets.icons.attack}>
          {entry.quickMoveCount || 0} rapide(s)
        </MiniInfo>
        <MiniInfo icon={uiAssets.icons.attack}>
          {entry.chargedMoveCount || 0} chargée(s)
        </MiniInfo>
        {entry.maxMoveCount ? (
          <MiniInfo icon={uiAssets.icons.attack}>
            {entry.maxMoveCount} Max
          </MiniInfo>
        ) : null}
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <span
          className={`inline-flex min-h-8 items-center justify-center rounded-lg border px-3 text-xs font-black ${
            entry.complete
              ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-200"
              : "border-amber-300/30 bg-amber-300/10 text-amber-200"
          }`}
        >
          {entry.complete ? "JSON complet" : `${entry.issues.length} problème(s)`}
        </span>
        <span
          className={`inline-flex min-h-8 items-center justify-center rounded-lg border px-3 text-xs font-black ${
            assetsPresent
              ? "border-emerald-300/30 bg-emerald-300/10 text-emerald-200"
              : "border-amber-300/30 bg-amber-300/10 text-amber-200"
          }`}
        >
          {assetsPresent ? "Assets liés" : "Assets à vérifier"}
        </span>
      </div>

      {missingKeys.length ? (
        <div className="mt-3 rounded-xl border border-amber-300/25 bg-surface-inset-strong p-3">
          <div className="flex items-center justify-between gap-3">
            <span className="text-xs font-black uppercase tracking-[0.16em] text-amber-100">
              Clés manquantes
            </span>
            <span className="rounded-full bg-amber-300/15 px-2 py-1 text-[11px] font-black text-amber-100">
              {missingKeys.length}
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {missingKeys.slice(0, 5).map((issue) => (
              <span
                className="max-w-full truncate rounded-lg border border-line bg-surface-emphasis px-2 py-1 font-mono text-[11px] font-bold text-foreground"
                key={`${issue.ruleId || "base"}-${issue.path}-${issue.issue}`}
                title={issue.ruleName ? `${issue.ruleName}: ${issue.path}` : issue.path}
              >
                {issue.path}
              </span>
            ))}
            {missingKeys.length > 5 ? (
              <span className="rounded-lg border border-line bg-surface-emphasis px-2 py-1 text-[11px] font-black text-foreground">
                +{missingKeys.length - 5}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="mt-auto grid gap-2 pt-4">
        {admin ? (
          <label className="flex min-h-10 items-center gap-2 rounded-xl border border-line bg-surface-emphasis px-3 text-sm font-black text-domain-foreground">
            <Checkbox
              className="h-5 w-5 accent-emerald-400"
              checked={assetChecked}
              onChange={(event) => onAssetChecked?.(entry.key, event.target.checked)}
            />
            <span>Assets OK</span>
          </label>
        ) : null}
        {onOpen ? (
          <button
            className="min-h-12 rounded-2xl bg-gradient-to-r from-cyan-400 via-sky-500 to-emerald-400 px-4 font-black text-domain-foreground shadow-[0_16px_45px_rgba(14,165,233,.25)] transition hover:scale-[1.01]"
            type="button"
            onClick={() => onOpen(entry)}
          >
            {actionLabel}
          </button>
        ) : null}
      </div>
    </article>
  );
}
