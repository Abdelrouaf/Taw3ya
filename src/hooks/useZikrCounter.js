import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "taw3ya_zikr_counts_v1";

function readStore() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function writeStore(data) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {}
}

export function useZikrCounter(zikrId, target) {
  const key = String(zikrId);

  // 1. Initialize state once from localStorage
  const [count, setCount] = useState(() => {
    return readStore()[key] ?? 0;
  });

  // 2. Keep localStorage in sync with the state
  useEffect(() => {
    const store = readStore();
    if (count === 0) {
      delete store[key];
    } else {
      store[key] = count;
    }
    writeStore(store);
  }, [count, key]);

  // 3. Increment logic: only reset AFTER hitting the target
  const increment = useCallback(() => {
    setCount((prev) => {
      if (prev >= target) return 0; // Reset only after the goal is reached
      return prev + 1;
    });
  }, [target]);

  const reset = useCallback(() => {
    setCount(0);
  }, []);

  return { count, increment, reset };
}