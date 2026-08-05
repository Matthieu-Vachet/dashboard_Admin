"use client";

import { useState } from "react";
import { CircleDot } from "lucide-react";

export function CandyAssetImage({ familyId, normalUrl = null, xlUrl = null, kind = "normal", className = "h-12 w-12", showLabel = false, highContrast = false }) {
  const url = kind === "xl" ? xlUrl : normalUrl;
  const [failedUrl, setFailedUrl] = useState(null);
  const missing = !url || failedUrl === url;
  const label = kind === "xl" ? "Bonbon XL" : "Bonbon";
  return (
    <span className="inline-flex min-w-0 flex-col items-center gap-1">
      {missing ? (
        <span className={`grid place-items-center rounded-xl border border-dashed border-amber-300/35 bg-amber-400/10 text-amber-200 ${className}`} title={`${label} absent`}>
          <CircleDot size={20} aria-hidden="true" />
          <span className="sr-only">{label} absent</span>
        </span>
      ) : (
        <img className={`object-contain drop-shadow-xl ${className}`} src={url} alt={`${label} · famille ${familyId ?? "inconnue"}`} onError={() => setFailedUrl(url)} />
      )}
      {showLabel ? (
        <small className={`type-overline-compact ${highContrast ? "text-current opacity-90" : missing ? "text-amber-200" : "text-muted"}`}>
          {missing ? `${label} absent` : label}
        </small>
      ) : null}
    </span>
  );
}
