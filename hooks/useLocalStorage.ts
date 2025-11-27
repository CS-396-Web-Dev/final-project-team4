// hooks/useLocalStorage.ts
import { useEffect, useState, useRef } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const isInitialMount = useRef(true);

  // Load from localStorage ONLY on initial mount
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Only load on the very first mount
    if (!isInitialMount.current) {
      return;
    }
    isInitialMount.current = false;

    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        const parsed = JSON.parse(stored) as T;
        setValue(parsed);
        console.log(`useLocalStorage: loaded from localStorage on mount, count:`, Array.isArray(parsed) ? parsed.length : 'N/A');
      } else {
        console.log(`useLocalStorage: localStorage empty, setting default`);
        window.localStorage.setItem(key, JSON.stringify(defaultValue));
        setValue(defaultValue);
      }
    } catch (error) {
      // If anything goes wrong, fall back to the default value
      console.error(`useLocalStorage: error loading key "${key}"`, error);
      setValue(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Persist to localStorage whenever value changes (but skip on initial mount)
  useEffect(() => {
    if (typeof window === "undefined" || isInitialMount.current) {
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
      console.log(`useLocalStorage: saved to localStorage, count:`, Array.isArray(value) ? value.length : 'N/A');
    } catch (error) {
      console.error(`useLocalStorage: error saving key "${key}"`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
