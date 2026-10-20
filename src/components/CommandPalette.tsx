"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { tools, Tool } from "@/data/tools";
import { recordRecent, useRecents, useFavorites } from "@/src/lib/userTools";

export const OPEN_PALETTE_EVENT = "unitnov:open-palette";

export function openCommandPalette() {
  window.dispatchEvent(new Event(OPEN_PALETTE_EVENT));
}

function matches(tool: Tool, q: string) {
  return (
    tool.name.toLowerCase().includes(q) ||
    tool.description.toLowerCase().includes(q) ||
    tool.categoryLabel.toLowerCase().includes(q) ||
    tool.keywords.some((k) => k.toLowerCase().includes(q))
  );
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const recents = useRecents();
  const favorites = useFavorites();

  // Record tool visits for the "Recently used" list.
  useEffect(() => {
    const tool = tools.find((t) => t.href === pathname);
    if (tool) recordRecent(tool.id);
  }, [pathname]);

  // Global shortcuts: Ctrl/Cmd+K toggles, "/" opens (when not typing), Esc closes.
  useEffect(() => {
    const handleOpen = () => {
      setQuery("");
      setActive(0);
      setOpen(true);
    };

    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target && (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) {
            setQuery("");
            setActive(0);
          }
          return !o;
        });
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        handleOpen();
      }
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, handleOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, handleOpen);
    };
  }, [open]);

  // Focus input and lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const t = setTimeout(() => inputRef.current?.focus(), 10);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      clearTimeout(t);
      document.body.style.overflow = prev;
    };
  }, [open]);

  const sections = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (q) {
      return [{ title: "Results", items: tools.filter((t) => matches(t, q)) }];
    }
    const byId = (ids: string[]) =>
      ids.map((id) => tools.find((t) => t.id === id)).filter((t): t is Tool => Boolean(t));
    const fav = byId(favorites);
    const rec = byId(recents).filter((t) => !favorites.includes(t.id));
    const shown = new Set([...fav, ...rec].map((t) => t.id));
    return [
      { title: "Favorites", items: fav },
      { title: "Recently used", items: rec },
      { title: fav.length || rec.length ? "All tools" : "Popular tools", items: tools.filter((t) => !shown.has(t.id)) },
    ].filter((s) => s.items.length > 0);
  }, [query, recents, favorites]);

  const flat = useMemo(() => sections.flatMap((s) => s.items), [sections]);

  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [active]);

  const go = (tool: Tool | undefined) => {
    if (!tool) return;
    setOpen(false);
    router.push(tool.href);
  };

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (flat.length ? (a + 1) % flat.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (flat.length ? (a - 1 + flat.length) % flat.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      go(flat[active]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  if (!open) return null;

  let index = -1;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center px-4 pt-[12vh] bg-black/60 backdrop-blur-sm palette-fade"
      onMouseDown={(e) => e.target === e.currentTarget && setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Search tools"
    >
      <div className="palette-pop w-full max-w-xl rounded-2xl border border-white/10 bg-[#141826]/95 backdrop-blur-xl shadow-2xl shadow-black/60 overflow-hidden">
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 border-b border-white/[0.08]">
          <svg className="w-5 h-5 text-slate-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            id="commandPaletteInput"
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            onKeyDown={onInputKey}
            placeholder="Search tools… try “loan”, “bmi”, “kg to lbs”"
            className="flex-1 bg-transparent py-4 text-base text-white placeholder-slate-500 outline-none"
            role="combobox"
            aria-expanded="true"
            aria-controls="commandPaletteList"
            aria-activedescendant={flat[active] ? `palette-item-${flat[active].id}` : undefined}
          />
          <kbd className="hidden sm:inline text-[10px] font-semibold text-slate-400 border border-white/10 rounded-md px-1.5 py-0.5">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <ul id="commandPaletteList" ref={listRef} role="listbox" className="max-h-[55vh] overflow-y-auto p-2">
          {flat.length === 0 && (
            <li className="px-4 py-10 text-center text-sm text-slate-400">
              No tools match “{query}”.
              <a href="/contact" className="block mt-2 text-indigo-400 hover:text-indigo-300 text-xs">
                Request this tool →
              </a>
            </li>
          )}
          {sections.map((section) => (
            <li key={section.title} role="presentation">
              <div className="px-3 pt-3 pb-1.5 text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                {section.title}
              </div>
              <ul role="presentation">
                {section.items.map((tool) => {
                  index++;
                  const i = index;
                  const isActive = i === active;
                  return (
                    <li
                      key={`${section.title}-${tool.id}`}
                      id={`palette-item-${tool.id}`}
                      data-index={i}
                      role="option"
                      aria-selected={isActive}
                      onMouseMove={() => setActive(i)}
                      onClick={() => go(tool)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-colors ${
                        isActive ? "bg-indigo-500/15" : "hover:bg-white/5"
                      }`}
                    >
                      <span className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-lg shrink-0">
                        {tool.icon}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span className={`block text-sm font-medium ${isActive ? "text-white" : "text-slate-200"}`}>
                          {tool.name}
                        </span>
                        <span className="block text-xs text-slate-500 truncate">{tool.description}</span>
                      </span>
                      <span className="text-[10px] text-slate-500 hidden sm:block">{tool.categoryLabel}</span>
                      {isActive && <span className="text-indigo-300 text-xs">↵</span>}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>

        {/* Footer hints */}
        <div className="flex items-center gap-4 px-4 py-2.5 border-t border-white/[0.08] text-[11px] text-slate-500">
          <span><kbd className="font-semibold text-slate-400">↑↓</kbd> navigate</span>
          <span><kbd className="font-semibold text-slate-400">↵</kbd> open</span>
          <span className="ml-auto"><kbd className="font-semibold text-slate-400">Ctrl K</kbd> toggle</span>
        </div>
      </div>
    </div>
  );
}
