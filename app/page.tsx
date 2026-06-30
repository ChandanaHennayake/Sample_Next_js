import Link from "next/link";
import { tools } from "@/data/tools";

const stats = [
  { value: "10+", label: "Free tools" },
  { value: "100%", label: "Free" },
  { value: "0", label: "Ads today" },
];

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="pt-10 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-medium mb-6">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
          Free · No signup · No ads
        </div>

        <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4">
          Every tool you need,{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            right here.
          </span>
        </h1>

        <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
          Fast, accurate online calculators and utilities. No clutter, no distractions.
        </p>

        {/* Search */}
        <div className="relative max-w-md mx-auto">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z"
            />
          </svg>

          <input
            type="search"
            placeholder="Search tools..."
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-[#1A1D27] border border-[#2A2D3A] text-slate-200 placeholder-slate-500 text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
        </div>

        {/* Stats */}
        <div className="flex items-center justify-center gap-8 mt-10">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-bold text-white">
                {s.value}
              </div>

              <div className="text-xs text-slate-500 mt-1">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Section Title */}
      <div className="flex items-center gap-3 mb-5">
        <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">
          Calculators
        </span>

        <div className="flex-1 h-px bg-[#2A2D3A]" />
      </div>

      {/* Tools */}
      <div className="grid gap-4 md:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="block rounded-xl bg-[#1A1D27] border border-[#2A2D3A] p-5 hover:border-indigo-500/40 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-lg bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 font-bold">
                {tool.name.charAt(0)}
              </div>

              {tool.badge && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    tool.badge === "New"
                      ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/20"
                      : "bg-indigo-500/15 text-indigo-400 border border-indigo-500/20"
                  }`}
                >
                  {tool.badge}
                </span>
              )}
            </div>

            <h2 className="text-white font-semibold text-base mb-1">
              {tool.name}
            </h2>

            <p className="text-slate-500 text-sm leading-snug">
              {tool.description}
            </p>

            <div className="mt-4 flex items-center gap-1 text-indigo-400 text-xs font-medium">
              Open tool

              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>

      {/* CTA */}
      <div className="mt-16 rounded-2xl bg-gradient-to-br from-indigo-600/20 to-violet-600/10 border border-indigo-500/20 p-8 text-center">
        <h2 className="text-xl font-bold text-white mb-2">
          More tools coming soon
        </h2>

        <p className="text-slate-400 text-sm mb-5">
          Unit converters, finance calculators, image tools and PDF tools.
        </p>

        <Link
          href="/all-tools"
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium transition-colors"
        >
          Browse all tools

          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}