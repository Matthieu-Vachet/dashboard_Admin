const LIGHT_TEXT = Object.freeze({ r: 248, g: 250, b: 252, a: 1 });
const DARK_TEXT = Object.freeze({ r: 2, g: 6, b: 23, a: 1 });
const WHITE = Object.freeze({ r: 255, g: 255, b: 255, a: 1 });
const HEADER_DARK = Object.freeze({ r: 2, g: 6, b: 23, a: 1 });

function channel(value) {
  const numeric = Number(value ?? 0);
  if (!Number.isFinite(numeric)) return 0;
  return Math.max(0, Math.min(255, Math.round(numeric <= 1 ? numeric * 255 : numeric)));
}

function alpha(value) {
  const numeric = Number(value ?? 1);
  return Number.isFinite(numeric) ? Math.max(0, Math.min(1, numeric)) : 1;
}

function fromHex(value) {
  const raw = value.replace(/^#/, "").trim();
  if (![3, 4, 6, 8].includes(raw.length) || !/^[0-9a-f]+$/i.test(raw)) return null;
  const expanded = raw.length <= 4 ? [...raw].map((part) => `${part}${part}`).join("") : raw;
  return {
    r: Number.parseInt(expanded.slice(0, 2), 16),
    g: Number.parseInt(expanded.slice(2, 4), 16),
    b: Number.parseInt(expanded.slice(4, 6), 16),
    a: expanded.length === 8 ? Number.parseInt(expanded.slice(6, 8), 16) / 255 : 1,
  };
}

function fromRgb(value) {
  const match = value.match(/^rgba?\(\s*([\d.]+)(%)?\s*[, ]\s*([\d.]+)(%)?\s*[, ]\s*([\d.]+)(%)?(?:\s*[,/]\s*([\d.]+)(%)?)?\s*\)$/i);
  if (!match) return null;
  const cssChannel = (numeric, percentage) => Math.max(0, Math.min(255, Math.round(Number(numeric) * (percentage ? 2.55 : 1))));
  return {
    r: cssChannel(match[1], match[2]),
    g: cssChannel(match[3], match[4]),
    b: cssChannel(match[5], match[6]),
    a: match[7] == null ? 1 : alpha(Number(match[7]) / (match[8] ? 100 : 1)),
  };
}

export function normalizeCandyColor(color, fallback = HEADER_DARK) {
  if (typeof color === "string") {
    return fromHex(color) || fromRgb(color) || { ...fallback };
  }
  if (!color || typeof color !== "object") return { ...fallback };
  return {
    r: channel(color.r ?? color.red),
    g: channel(color.g ?? color.green),
    b: channel(color.b ?? color.blue),
    a: alpha(color.a ?? color.alpha ?? 1),
  };
}

function composite(color, background = HEADER_DARK) {
  const opacity = alpha(color.a);
  return {
    r: color.r * opacity + background.r * (1 - opacity),
    g: color.g * opacity + background.g * (1 - opacity),
    b: color.b * opacity + background.b * (1 - opacity),
    a: 1,
  };
}

export function mixCandyColors(first, second, secondWeight = 0.5) {
  const weight = Math.max(0, Math.min(1, secondWeight));
  return {
    r: first.r * (1 - weight) + second.r * weight,
    g: first.g * (1 - weight) + second.g * weight,
    b: first.b * (1 - weight) + second.b * weight,
    a: 1,
  };
}

export function relativeLuminance(color) {
  const normalized = [color.r, color.g, color.b].map((value) => {
    const channelValue = Math.max(0, Math.min(255, value)) / 255;
    return channelValue <= 0.04045
      ? channelValue / 12.92
      : ((channelValue + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * normalized[0] + 0.7152 * normalized[1] + 0.0722 * normalized[2];
}

export function contrastRatio(first, second) {
  const light = Math.max(relativeLuminance(first), relativeLuminance(second));
  const dark = Math.min(relativeLuminance(first), relativeLuminance(second));
  return (light + 0.05) / (dark + 0.05);
}

function minimumContrast(text, samples) {
  return Math.min(...samples.map((sample) => contrastRatio(text, sample)));
}

function cssRgb(color) {
  return `rgb(${Math.round(color.r)} ${Math.round(color.g)} ${Math.round(color.b)})`;
}

export function candyFamilyContrast(primaryColor, secondaryColor, target = 4.5) {
  const primary = composite(normalizeCandyColor(primaryColor));
  const secondary = composite(normalizeCandyColor(secondaryColor, primary));
  const gradientSamples = [
    mixCandyColors(primary, WHITE, 0.067),
    mixCandyColors(primary, secondary, 0.5),
    mixCandyColors(secondary, HEADER_DARK, 0.2),
  ];
  const lightRatio = minimumContrast(LIGHT_TEXT, gradientSamples);
  const darkRatio = minimumContrast(DARK_TEXT, gradientSamples);
  const foregroundColor = lightRatio >= darkRatio ? LIGHT_TEXT : DARK_TEXT;
  const overlayColor = foregroundColor === LIGHT_TEXT ? HEADER_DARK : WHITE;

  let low = 0;
  let high = 0.92;
  for (let index = 0; index < 18; index += 1) {
    const candidate = (low + high) / 2;
    const adjusted = gradientSamples.map((sample) => mixCandyColors(sample, overlayColor, candidate));
    if (minimumContrast(foregroundColor, adjusted) >= target) high = candidate;
    else low = candidate;
  }
  const overlayOpacity = Math.min(0.92, Math.max(high, 0.08) + 0.035);
  const adjustedSamples = gradientSamples.map((sample) => mixCandyColors(sample, overlayColor, overlayOpacity));

  return {
    foreground: cssRgb(foregroundColor),
    overlay: `rgba(${Math.round(overlayColor.r)}, ${Math.round(overlayColor.g)}, ${Math.round(overlayColor.b)}, ${overlayOpacity.toFixed(3)})`,
    surface: foregroundColor === LIGHT_TEXT ? "rgba(2, 6, 23, .18)" : "rgba(255, 255, 255, .22)",
    border: foregroundColor === LIGHT_TEXT ? "rgba(255, 255, 255, .28)" : "rgba(2, 6, 23, .22)",
    minimumContrast: minimumContrast(foregroundColor, adjustedSamples),
    tone: foregroundColor === LIGHT_TEXT ? "light" : "dark",
  };
}

export function candyColorToCss(color) {
  if (!color) return "rgba(148, 163, 184, .35)";
  const normalized = normalizeCandyColor(color);
  return `rgba(${normalized.r}, ${normalized.g}, ${normalized.b}, ${normalized.a})`;
}

export function candyColorToLabel(color) {
  if (!color) return "-";
  if (typeof color === "string") return color;
  const normalized = normalizeCandyColor(color);
  return `rgba(${normalized.r}, ${normalized.g}, ${normalized.b}, ${normalized.a})`;
}

export function candyColorToHex(color) {
  if (!color) return "";
  const normalized = normalizeCandyColor(color);
  return `#${[normalized.r, normalized.g, normalized.b]
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()}`;
}
