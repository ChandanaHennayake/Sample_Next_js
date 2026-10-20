"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { tools, Tool } from "@/data/tools";
import { toggleFavorite, useFavorites, useRecents, clearRecents } from "@/src/lib/userTools";
import { useToast } from "@/src/components/Toast";

interface ToolsDirectoryProps {
  initialCategory?: string;
  title?: string;
  description?: string;
  /** Show the personalised "Favorites / Recently used" strip above the grid. */
  showPersonal?: boolean;
}

const categories = [
  { id: "all", label: "All Tools" },
  { id: "finance", label: "Finance" },
  { id: "math", label: "Math & Dates" },
  { id: "health", label: "Health & Fitness" },
  { id: "converters", label: "Converters" },
  { id: "generators", label: "Generators" },
];

function StarButton({ tool, isFav }: { tool: Tool; isFav: boolean }) {
  const { toast } = useToast();
  const [pop, setPop] = useState(false);
  return (
    <button
      type="button"
      onClick={() => {
        const nowFav = toggleFavorite(tool.id);
        setPop(true);
        setTimeout(() => setPop(false), 300);
        toast(nowFav ? `${tool.name} added to favorites` : `${tool.name} removed from favorites`, nowFav ? "success" : "info");
      }}
      aria-pressed={isFav}
      aria-label={isFav ? `Remove ${tool.name} from favorites` : `Add ${tool.name} to favorites`}
      title={isFav ? "Remove from favorites" : "Add to favorites"}
      className={`absolute top-5 right-5 z-10 w-8 h-8 rounded-lg flex items-center justify-center text-base transition-colors cursor-pointer ${
        isFav ? "text-amber-300 bg-amber-500/10" : "text-slate-500 hover:text-amber-300 hover:bg-white/5"
      } ${pop ? "star-pop" : ""}`}
    >
      {isFav ? "★" : "☆"}
    </button>
  );
}

function ToolCard({ tool, isFav }: { tool: Tool; isFav: boolean }) {
  return (
    <div className="group relative rounded-2xl glass-card overflow-hidden transition-all duration-300 hover:-translate-y-1.5">
      {/* Ambient hover glow gradient inside card */}
      <div className="absolute top-0 right-0 w-36 h-36 bg-gradient-to-bl from-indigo-500/10 via-violet-500/5 to-transparent rounded-full blur-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <StarButton tool={tool} isFav={isFav} />
      <Link href={tool.href} className="block p-6 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
        <div className="flex items-start gap-3 mb-4 pr-10">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 flex items-center justify-center text-2xl group-hover:scale-110 group-hover:border-indigo-500/40 transition-all duration-300 shadow-inner">
            {tool.icon}
          </div>
          {tool.badge && (
            <span
              className={`ml-auto text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                tool.badge === "Popular"
                  ? "bg-amber-500/15 text-amber-300 border-amber-500/30 shadow-sm shadow-amber-500/10"
                  : tool.badge === "Featured"
                  ? "bg-violet-500/15 text-violet-300 border-violet-500/30 shadow-sm shadow-violet-500/10"
                  : "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 shadow-sm shadow-emerald-500/10"
              }`}
            >
              {tool.badge}
            </span>
          )}
        </div>

        <span className="text-[10px] uppercase font-bold tracking-widest text-indigo-400 block mb-1">
          {tool.categoryLabel}
        </span>
        <h2 className="text-white font-bold text-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-indigo-200 transition-all duration-200">
          {tool.name}
        </h2>
        <p className="text-slate-400 text-xs leading-relaxed line-clamp-2 mt-1.5">{tool.description}</p>

        <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between text-indigo-400 text-xs font-semibold group-hover:text-indigo-300 transition-colors">
          <span className="tracking-wide">Launch tool</span>
          <svg className="w-4 h-4 transform group-hover:translate-x-1.5 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Link>
    </div>
  );
}

function PersonalStrip({ favorites, recents }: { favorites: string[]; recents: string[] }) {
  const byId = (ids: string[]) =>
    ids.map((id) => tools.find((t) => t.id === id)).filter((t): t is Tool => Boolean(t));
  const fav = byId(favorites);
  const rec = byId(recents).filter((t) => !favorites.includes(t.id));
  if (!fav.length && !rec.length) return null;

  const Chip = ({ tool, star }: { tool: Tool; star?: boolean }) => (
    <Link
      href={tool.href}
      className="flex items-center gap-2 shrink-0 pl-2 pr-3 py-1.5 rounded-xl bg-[#151926] border border-white/[0.08] hover:border-indigo-500/40 text-sm text-slate-200 transition-colors"
    >
      <span className="text-base">{tool.icon}</span>
      {tool.name}
      {star && <span className="text-amber-300 text-xs">★</span>}
    </Link>
  );

  return (
    <div className="mb-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4 space-y-3">
      {fav.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 w-20 shrink-0">Favorites</span>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {fav.map((t) => <Chip key={t.id} tool={t} star />)}
          </div>
        </div>
      )}
      {rec.length > 0 && (
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500 w-20 shrink-0">Recent</span>
          <div className="flex gap-2 overflow-x-auto pb-1 flex-1">
            {rec.map((t) => <Chip key={t.id} tool={t} />)}
          </div>
          <button
            type="button"
            onClick={clearRecents}
            className="text-[11px] text-slate-500 hover:text-slate-300 shrink-0 cursor-pointer"
          >
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default function ToolsDirectory({
  initialCategory = "all",
  title = "All Online Tools",
  description = "Browse our full collection of free, privacy-first online calculators and converters.",
  showPersonal = true,
}: ToolsDirectoryProps) {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const favorites = useFavorites();
  const recents = useRecents();

  const filteredTools = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    return tools.filter((tool) => {
      const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
      if (!q) return matchesCategory;
      return (
        matchesCategory &&
        (tool.name.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          tool.keywords.some((k) => k.toLowerCase().includes(q)) ||
          tool.categoryLabel.toLowerCase().includes(q))
      );
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div className="py-6">
      <div className="text-center mb-10">
        {title && <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-3">{title}</h1>}
        {description && <p className="text-slate-400 text-sm md:text-base max-w-2xl mx-auto">{description}</p>}

        {/* Live Search Bar */}
        <div className="relative max-w-xl mx-auto mt-8 group">
          <div className="absolute inset-0 bg-indigo-500/10 rounded-2xl blur-xl group-hover:bg-indigo-500/20 transition-all pointer-events-none -z-10" />
          <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 group-hover:text-indigo-400 transition-colors pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
          <input
            id="directorySearchInput"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by tool name or keyword (loan, bmi, qr, password, case)…"
            aria-label="Filter tools"
            className="w-full pl-12 pr-20 py-4 rounded-2xl glass-input text-white placeholder-slate-400 text-sm md:text-base focus:border-indigo-500/60 shadow-2xl shadow-black/40 transition-all"
          />
          {searchQuery ? (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs bg-white/10 hover:bg-white/20 rounded-full px-2.5 py-1 cursor-pointer transition-colors"
            >
              Clear
            </button>
          ) : (
            <kbd className="hidden md:block absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-mono font-medium text-slate-400 border border-white/10 rounded-md px-1.5 py-0.5 bg-white/5">
              Ctrl K
            </kbd>
          )}
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mt-7" role="tablist" aria-label="Tool categories">
          {categories.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            const count = cat.id === "all" ? tools.length : tools.filter((t) => t.category === cat.id).length;
            return (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 cursor-pointer flex items-center gap-2 ${
                  isSelected
                    ? "bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white shadow-lg shadow-indigo-500/25 border border-indigo-400/30 scale-105"
                    : "glass-card text-slate-400 hover:text-white hover:border-white/15 hover:bg-white/[0.04]"
                }`}
              >
                <span>{cat.label}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${isSelected ? "bg-white/25 text-white" : "bg-white/5 text-slate-400"}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {showPersonal && <PersonalStrip favorites={favorites} recents={recents} />}

      <div className="flex items-center justify-between mb-6">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400" aria-live="polite">
          Showing {filteredTools.length} {filteredTools.length === 1 ? "tool" : "tools"}
        </span>
        {searchQuery && <span className="text-xs text-indigo-400">Filtered by &quot;{searchQuery}&quot;</span>}
      </div>

      {filteredTools.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTools.map((tool) => (
            <ToolCard key={tool.id} tool={tool} isFav={favorites.includes(tool.id)} />
          ))}
        </div>
      ) : (
        <div className="bg-[#151926] border border-white/[0.08] rounded-2xl p-12 text-center">
          <div className="text-4xl mb-3">🔍</div>
          <h3 className="text-lg font-bold text-white mb-1">
            {selectedCategory === "generators" && !searchQuery ? "Generators are coming soon" : "No tools matched your criteria"}
          </h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto mb-6">
            {searchQuery
              ? <>We couldn&apos;t find any tools matching &quot;{searchQuery}&quot;. Try another keyword or category.</>
              : "There are no tools in this category yet."}
          </p>
          <div className="flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium transition-colors cursor-pointer"
            >
              Show all tools
            </button>
            <Link href="/contact" className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 text-xs font-medium border border-white/10">
              Request a tool
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
