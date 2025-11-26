// hooks/useLocalStorage.ts
import { useEffect, useState, useRef } from "react";

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(defaultValue);
  const isFirstRender = useRef(true);

  // Load from localStorage on mount
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const stored = window.localStorage.getItem(key);
      if (stored !== null) {
        setValue(JSON.parse(stored) as T);
      } else {
        window.localStorage.setItem(key, JSON.stringify(defaultValue));
      }
    } catch (error) {
      // If anything goes wrong, fall back to the default value
      console.error(`useLocalStorage: error loading key "${key}"`, error);
      setValue(defaultValue);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  // Persist to localStorage whenever value changes (but skip first render)
  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    // Skip saving on the very first render - let the load effect handle it
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`useLocalStorage: error saving key "${key}"`, error);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
