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
      <section className="relative pt-6 pb-12">
        {/* Hero Spotlight Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[320px] bg-gradient-to-tr from-indigo-500/20 via-violet-500/15 to-cyan-400/10 blur-[100px] rounded-full pointer-events-none -z-10" />

        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-300 text-xs font-semibold mb-6 shadow-sm shadow-indigo-500/10 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
            100% Free · No Sign-up · Client-Side Private
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white tracking-tight leading-[1.1] max-w-4xl mx-auto mb-4">
            Every Online Tool You Need,{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-violet-300 to-cyan-300">
              Fast & Private.
            </span>
          </h1>

          <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
            High-precision financial calculators, unit converters, and developer utilities. Instant zero-latency computation directly in your browser.
          </p>

          {/* Quick Metrics Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-emerald-400 font-bold">✓</span>
              <span>13 Free Instant Tools</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-400 font-bold">✓</span>
              <span>Zero Server Logging</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-violet-400 font-bold">✓</span>
              <span>Export & 1-Click Share</span>
            </div>
          </div>
        </div>

        {/* Live Filterable Directory */}
        <ToolsDirectory
          title=""
          description=""
          initialCategory="all"
        />
      </section>

      {/* Trust & Performance Pillars */}
      <section className="mt-14 pt-14 border-t border-white/[0.08]">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
            Engineered for Precision, Privacy & Speed
          </h2>
          <p className="text-slate-400 text-xs md:text-sm mt-2 max-w-lg mx-auto">
            Built using modern web standards so your computations happen instantaneously on your device.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {highlights.map((h) => (
            <div
              key={h.title}
              className="glass-card rounded-2xl p-7 hover:border-indigo-500/40 transition-all duration-300 hover:-translate-y-1"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/[0.08] to-white/[0.02] border border-white/10 flex items-center justify-center text-2xl mb-4 shadow-inner">
                {h.icon}
              </div>
              <h3 className="text-base font-bold text-white mb-2">{h.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed">{h.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Suggest a Tool CTA Banner */}
      <section className="mt-16 rounded-3xl relative overflow-hidden glass-card border border-indigo-500/30 p-8 md:p-12 text-center shadow-2xl shadow-indigo-500/10">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-indigo-500/20 via-violet-500/10 to-transparent blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent blur-3xl pointer-events-none -z-10" />

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-[11px] font-bold uppercase tracking-wider mb-4">
          Community Driven
        </div>

        <h2 className="text-2xl md:text-3xl font-black text-white mb-3">
          Need a Custom Tool or Financial Calculator?
        </h2>
        <p className="text-slate-400 text-sm max-w-lg mx-auto mb-8 leading-relaxed">
          We ship new developer utilities, financial models, and converters weekly. Submit your request and we&apos;ll build it client-side.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:from-indigo-400 hover:to-violet-500 text-white text-sm font-bold transition-all shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50 active:scale-95"
        >
          <span>Request a New Tool</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </section>
    </div>
  );
}