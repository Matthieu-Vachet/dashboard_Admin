export function readLocalJson(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(key) || "null") ?? fallback;
  } catch {
    return fallback;
  }
}

export async function readDashboardStoreValue(key) {
  try {
    const response = await fetch(`/api/dashboard-store?key=${encodeURIComponent(key)}`, {
      cache: "no-store",
    });
    if (!response.ok) return { ok: false, configured: false, value: null };
    const payload = await response.json();
    return {
      ok: true,
      configured: Boolean(payload.data?.configured),
      value: payload.data?.value,
    };
  } catch {
    return { ok: false, configured: false, value: null };
  }
}

export async function writeDashboardStoreValue(key, value) {
  try {
    const response = await fetch("/api/dashboard-store", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ key, value }),
    });
    return response.ok;
  } catch {
    return false;
  }
}
