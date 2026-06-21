"use client";

import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";

function serializeValue<T>(value: T) {
  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
}

export function usePersistentState<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [ready, setReady] = useState(false);
  const [storageMode, setStorageMode] = useState<"database" | "browser">("database");
  const initialValueRef = useRef(initialValue);
  const hydratedRef = useRef(false);
  const persistedValueRef = useRef(serializeValue(initialValue));

  useEffect(() => {
    initialValueRef.current = initialValue;
  }, [initialValue]);

  useEffect(() => {
    let cancelled = false;

    async function hydrate() {
      setReady(false);
      hydratedRef.current = false;

      const legacyValue = readLegacyValue<T>(key);

      try {
        const response = await fetch(`/api/dashboard-store?key=${encodeURIComponent(key)}`, {
          cache: "no-store",
        });

        if (cancelled) return;

        if (response.ok) {
          const payload = (await response.json()) as {
            data?: { configured?: boolean; value?: T | null };
          };
          const configured = Boolean(payload.data?.configured);
          const databaseValue = payload.data?.value;

          if (configured) {
            if (databaseValue !== null && databaseValue !== undefined) {
              persistedValueRef.current = serializeValue(databaseValue);
              setValue(databaseValue);
            } else if (legacyValue.found) {
              persistedValueRef.current = serializeValue(legacyValue.value);
              setValue(legacyValue.value);
              void saveDatabaseValue(key, legacyValue.value).then(() => {
                window.localStorage.removeItem(key);
              });
            } else {
              const fallbackValue = initialValueRef.current;
              persistedValueRef.current = serializeValue(fallbackValue);
              setValue(fallbackValue);
            }

            setStorageMode("database");
            hydratedRef.current = true;
            setReady(true);
            return;
          }
        }
      } catch {
        // Local fallback below keeps the dashboard usable without a configured DB.
      }

      if (cancelled) return;

      if (legacyValue.found) {
        persistedValueRef.current = serializeValue(legacyValue.value);
        setValue(legacyValue.value);
      } else {
        const fallbackValue = initialValueRef.current;
        persistedValueRef.current = serializeValue(fallbackValue);
        setValue(fallbackValue);
      }

      setStorageMode("browser");
      hydratedRef.current = true;
      setReady(true);
    }

    void hydrate();

    return () => {
      cancelled = true;
    };
  }, [key]);

  useEffect(() => {
    if (!ready || !hydratedRef.current) return;

    const serializedValue = serializeValue(value);
    if (serializedValue === persistedValueRef.current) return;

    if (storageMode === "database") {
      const timeout = window.setTimeout(() => {
        void saveDatabaseValue(key, value).then((saved) => {
          if (saved) {
            persistedValueRef.current = serializedValue;
            window.localStorage.removeItem(key);
          }
        });
      }, 450);

      return () => window.clearTimeout(timeout);
    }

    window.localStorage.setItem(key, JSON.stringify(value));
    persistedValueRef.current = serializedValue;
  }, [key, ready, storageMode, value]);

  return [value, setValue, ready];
}

function readLegacyValue<T>(key: string): { found: false; value: T } | { found: true; value: T } {
  try {
    const storedValue = window.localStorage.getItem(key);
    if (!storedValue) return { found: false, value: null as T };
    return { found: true, value: JSON.parse(storedValue) as T };
  } catch {
    window.localStorage.removeItem(key);
    return { found: false, value: null as T };
  }
}

async function saveDatabaseValue<T>(key: string, value: T) {
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
