"use client";

import { useSyncExternalStore } from "react";

/**
 * Tiny localStorage-backed store for per-user tool preferences
 * (favorites + recently used). No backend, no cookies — data never leaves the browser.
 */

const FAVORITES_KEY = "unitnov:favorites";
const RECENTS_KEY = "unitnov:recents";
const MAX_RECENTS = 6;
const EMPTY: string[] = [];

type Listener = () => void;
const listeners = new Set<Listener>();
const cache = new Map<string, string[]>();

function read(key: string): string[] {
  if (typeof window === "undefined") return EMPTY;
  if (cache.has(key)) return cache.get(key)!;
  let value: string[] = EMPTY;
  try {
    const raw = window.localStorage.getItem(key);
    const parsed = raw ? JSON.parse(raw) : [];
    value = Array.isArray(parsed) ? parsed.filter((v) => typeof v === "string") : EMPTY;
  } catch {
    value = EMPTY;
  }
  cache.set(key, value);
  return value;
}

function write(key: string, value: string[]) {
  cache.set(key, value);
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Storage full or disabled (e.g. private mode) — keep in-memory value only.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === FAVORITES_KEY || e.key === RECENTS_KEY) {
      cache.delete(e.key);
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useFavorites(): string[] {
  return useSyncExternalStore(subscribe, () => read(FAVORITES_KEY), () => EMPTY);
}

export function useRecents(): string[] {
  return useSyncExternalStore(subscribe, () => read(RECENTS_KEY), () => EMPTY);
}

export function toggleFavorite(toolId: string): boolean {
  const current = read(FAVORITES_KEY);
  const isFav = current.includes(toolId);
  write(FAVORITES_KEY, isFav ? current.filter((id) => id !== toolId) : [toolId, ...current]);
  return !isFav;
}

export function recordRecent(toolId: string) {
  const current = read(RECENTS_KEY);
  if (current[0] === toolId) return;
  write(RECENTS_KEY, [toolId, ...current.filter((id) => id !== toolId)].slice(0, MAX_RECENTS));
}

export function clearRecents() {
  write(RECENTS_KEY, []);
}
