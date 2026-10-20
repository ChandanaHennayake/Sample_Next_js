import Link from "next/link";
import ToolsDirectory from "@/src/components/ToolsDirectory";

export default function Home() {
  const highlights = [
    {
      title: "100% Client-Side Privacy",
      description: "Calculations happen in your browser. Sensitive numbers and formulas are never sent to a server.",
      icon: "🛡️",
    },
    {
      title: "Zero Delay Computation",
      description: "Real-time recalculations as you type and slide. No refreshing, no waiting, no lagging.",
      icon: "⚡",
    },
    {
      title: "Always Free & Open",
      description: "Every calculator, converter, and utility is completely free with no registration or paywalls.",
      icon: "✨",
    },
  ];

  return (
    <div>
      {/* Hero & Interactive Directory */}
      <section className="pt-4 pb-12">
        <div className="text-center mb-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-medium mb-6 shadow-sm shadow-indigo-500/10">
            <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
            100% Free · No Sign-up · Client-Side Private
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight max-w-3xl mx-auto mb-4">
            Every Online Tool You Need,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-indigo-300">
              Fast & Private.
            </span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-xl mx-auto mb-2 leading-relaxed">
            Fast, accurate online calculators, converters, and utilities. Zero clutter, no login walls, 100% private.
          </p>
        </div>

        {/* Live Filterable Directory */}
        <ToolsDirectory
          title=""
          description=""
          initialCategory="all"
        />
      </section>

      {/* Trust & Performance Pillars */}
      <section className="mt-12 pt-12 border-t border-white/[0.08]">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
            Built for Speed, Privacy, and Accuracy
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-1">
            Engineered with modern web standards to deliver instant answers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="bg-[#151926] border border-white/[0.06] rounded-2xl p-6 hover:border-indigo-500/30 transition-colors"
            >
              <div className="text-3xl mb-3">{h.icon}</div>
              <h3 className="text-base font-semibold text-white mb-2">{h.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{h.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Suggest a Tool CTA Banner */}
      <section className="mt-16 rounded-2xl bg-gradient-to-br from-indigo-600/20 via-violet-600/15 to-[#151926] border border-indigo-500/20 p-8 md:p-10 text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Need a Custom Tool or Calculation?
        </h2>
        <p className="text-slate-400 text-sm max-w-lg mx-auto mb-6">
          We are adding new financial calculators, unit converters, and developer utilities weekly. Tell us what tool you need next.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
        >
          Request a Calculator or Tool
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>
    </div>
  );
}