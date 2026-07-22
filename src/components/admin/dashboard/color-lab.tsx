"use client";

import { Check, Copy, Palette, Plus, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { usePersistentState } from "@/lib/use-persistent-state";

const defaultSwatches = ["#20d3ff", "#58f2a9", "#905bf4", "#ffd166", "#ff5f7d", "#111827"];

export function ColorLab() {
  const [color, setColor] = useState("#20d3ff");
  const [swatches, setSwatches, ready] = usePersistentState("matweb.palette.swatches", defaultSwatches);
  const [copied, setCopied] = useState("");
  const safeColor = /^#[0-9a-fA-F]{6}$/.test(color) ? color : "#20d3ff";
  const rgb = hexToRgb(safeColor);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const palette = useMemo(() => buildPalette(safeColor), [safeColor]);
  const contrast = contrastColor(safeColor);

  function copy(value: string) {
    void navigator.clipboard.writeText(value);
    setCopied(value);
    window.setTimeout(() => setCopied(""), 1200);
  }

  return (
    <div className="space-y-4">
      <Card tone="strong" className="grid gap-5 p-5 xl:grid-cols-[360px_1fr]">
        <div>
          <Badge tone={ready ? "green" : "neutral"}>{ready ? "Palette sauvegardée" : "Chargement"}</Badge>
          <h2 className="mt-3 text-3xl font-black">Labo couleur</h2>
          <p className="mt-2 text-sm font-semibold leading-6 text-muted">
            Sélecteur, conversions, contraste et palettes rapides pour tes interfaces.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-[180px_1fr]">
          <label className="grid aspect-square place-items-center rounded-lg border border-line bg-surface-flat p-4">
            <input
              className="h-full w-full cursor-pointer rounded-lg border-0 bg-transparent"
              type="color"
              value={safeColor}
              onChange={(event) => setColor(event.target.value)}
              aria-label="Sélecteur de couleur"
            />
          </label>
          <div className="space-y-3">
            <Input aria-label="HEX" value={color} onChange={(event) => setColor(normalizeHex(event.target.value))} />
            <ColorValue label="HEX" value={color.toUpperCase()} copied={copied} onCopy={copy} />
            <ColorValue label="RGB" value={`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`} copied={copied} onCopy={copy} />
            <ColorValue label="HSL" value={`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`} copied={copied} onCopy={copy} />
            <div className="rounded-lg border border-line p-3" style={{ backgroundColor: color, color: contrast }}>
              <p className="text-sm font-black">Contraste automatique</p>
              <p className="mt-1 text-xs font-bold opacity-80">{contrast === "#05060d" ? "Texte sombre conseillé" : "Texte clair conseillé"}</p>
            </div>
          </div>
        </div>
      </Card>

      <section className="grid gap-4 xl:grid-cols-[1fr_360px]">
        <Card className="p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-lg border border-brand-2/25 bg-brand-2/10 text-brand-2">
                <Palette size={18} />
              </span>
              <h3 className="text-lg font-black">Palette générée</h3>
            </div>
            <Button
              size="sm"
              variant="primary"
              icon={<Plus size={15} />}
              type="button"
              onClick={() => setSwatches((current) => [safeColor, ...current.filter((item) => item !== safeColor)])}
            >
              Sauver
            </Button>
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {palette.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => copy(item)}
                className="overflow-hidden rounded-lg border border-line text-left transition hover:-translate-y-0.5 hover:border-brand-2/45"
              >
                <span className="block h-28" style={{ backgroundColor: item }} />
                <span className="flex items-center justify-between gap-2 p-3 font-mono text-xs font-black">
                  {item.toUpperCase()}
                  {copied === item ? <Check size={14} /> : <Copy size={14} />}
                </span>
              </button>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-black">Nuancier sauvegardé</h3>
          <div className="mt-4 grid gap-2">
            {swatches.map((swatch) => (
              <Card tone="flat" key={swatch} className="grid grid-cols-[48px_1fr_auto_auto] items-center gap-2 p-2">
                <button
                  type="button"
                  className="h-10 rounded-md border border-line-medium"
                  style={{ backgroundColor: swatch }}
                  aria-label={`Utiliser ${swatch}`}
                  onClick={() => setColor(swatch)}
                />
                <span className="font-mono text-xs font-black">{swatch.toUpperCase()}</span>
                <Button size="icon" type="button" aria-label="Copier" onClick={() => copy(swatch)}>
                  {copied === swatch ? <Check size={16} /> : <Copy size={16} />}
                </Button>
                <Button
                  size="icon"
                  variant="danger"
                  type="button"
                  aria-label="Supprimer"
                  onClick={() => setSwatches((current) => current.filter((item) => item !== swatch))}
                >
                  <Trash2 size={16} />
                </Button>
              </Card>
            ))}
          </div>
        </Card>
      </section>
    </div>
  );
}

function ColorValue({
  label,
  value,
  copied,
  onCopy,
}: {
  label: string;
  value: string;
  copied: string;
  onCopy: (value: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onCopy(value)}
      className="grid w-full grid-cols-[72px_1fr_auto] items-center gap-3 rounded-lg border border-line bg-surface-flat p-3 text-left"
    >
      <span className="text-xs font-black uppercase tracking-[0.16em] text-muted">{label}</span>
      <span className="font-mono text-sm font-black">{value}</span>
      {copied === value ? <Check size={16} className="text-brand-3" /> : <Copy size={16} className="text-muted" />}
    </button>
  );
}

function normalizeHex(value: string) {
  const cleaned = value.trim();
  if (/^#[0-9a-fA-F]{6}$/.test(cleaned)) return cleaned;
  if (/^[0-9a-fA-F]{6}$/.test(cleaned)) return `#${cleaned}`;
  return cleaned.startsWith("#") ? cleaned.slice(0, 7) : `#${cleaned.slice(0, 6)}`;
}

function hexToRgb(hex: string) {
  const normalized = /^#[0-9a-fA-F]{6}$/.test(hex) ? hex : "#20d3ff";
  const value = Number.parseInt(normalized.slice(1), 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255,
  };
}

function rgbToHsl(r: number, g: number, b: number) {
  r /= 255;
  g /= 255;
  b /= 255;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const delta = max - min;
    s = l > 0.5 ? delta / (2 - max - min) : delta / (max + min);
    h =
      max === r
        ? (g - b) / delta + (g < b ? 6 : 0)
        : max === g
          ? (b - r) / delta + 2
          : (r - g) / delta + 4;
    h /= 6;
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

function buildPalette(hex: string) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  return [88, 72, 56, 42, 28, 18].map((lightness) => hslToHex(hsl.h, hsl.s, lightness));
}

function hslToHex(h: number, s: number, l: number) {
  s /= 100;
  l /= 100;
  const k = (n: number) => (n + h / 30) % 12;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => l - a * Math.max(-1, Math.min(k(n) - 3, Math.min(9 - k(n), 1)));
  return `#${[f(0), f(8), f(4)]
    .map((value) =>
      Math.round(255 * value)
        .toString(16)
        .padStart(2, "0"),
    )
    .join("")}`;
}

function contrastColor(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? "#05060d" : "#ffffff";
}
