"use client";

import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

export function usePersistentState<T>(
  key: string,
  initialValue: T,
): [T, Dispatch<SetStateAction<T>>, boolean] {
  const [value, setValue] = useState<T>(initialValue);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let nextValue: T | null = null;
    let hasStoredValue = false;

    try {
      const storedValue = window.localStorage.getItem(key);
      if (storedValue) {
        nextValue = JSON.parse(storedValue) as T;
        hasStoredValue = true;
      }
    } catch {
      window.localStorage.removeItem(key);
    }

    const timeout = window.setTimeout(() => {
      if (hasStoredValue && nextValue !== null) {
        setValue(nextValue);
      }
      setReady(true);
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [key]);

  useEffect(() => {
    if (!ready) return;
    window.localStorage.setItem(key, JSON.stringify(value));
  }, [key, ready, value]);

  return [value, setValue, ready];
}
