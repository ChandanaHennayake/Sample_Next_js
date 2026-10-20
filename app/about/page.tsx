import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Us | UnitNov",
  description:
    "Learn about UnitNov's mission to provide fast, privacy-first, free online calculators and utilities for everyone worldwide.",
  alternates: {
    canonical: "https://unitnov.com/about",
  },
};

export default function AboutPage() {
  const values = [
    {
      title: "100% Client-Side Privacy",
      desc: "All calculations execute right inside your browser. We never log, store, or transmit your sensitive numbers.",
      icon: "🔒",
    },
    {
      title: "Lightning-Fast Execution",
      desc: "Zero bloated pop-ups, no mandatory accounts, no waiting. Instant calculation on every keystroke.",
      icon: "⚡",
    },
    {
      title: "Math You Can Verify",
      desc: "Every calculator is accompanied by mathematical formulas, step-by-step examples, and transparent algorithms.",
      icon: "📐",
    },
    {
      title: "Universal Free Access",
      desc: "Tools built for students, professionals, homeowners, and developers across the globe, completely free.",
      icon: "🌍",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10">
      {/* Hero */}
      <div className="mb-12 text-center">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
          Our Story
        </span>
        <h1 className="text-3xl md:text-5xl font-bold text-white mt-4 tracking-tight">
          About UnitNov
        </h1>
        <p className="text-slate-400 text-base md:text-lg max-w-2xl mx-auto mt-3">
          We build simple, fast, and mathematically accurate online calculators and daily utilities with a privacy-first ethos.
        </p>
      </div>

      {/* Mission statement card */}
      <div className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8 md:p-12 mb-10 leading-relaxed text-slate-300 space-y-6">
        <h2 className="text-2xl font-bold text-white">Why We Built UnitNov</h2>
        <p>
          The internet is filled with calculator websites covered in disruptive pop-ups, heavy tracking cookies, and outdated interfaces that require refreshing pages to see a single number.
        </p>
        <p>
          We created <strong>UnitNov</strong> to be different: an elegant, lightning-fast suite of calculators and utilities that work instantly without clutter, registration walls, or subscription barriers.
        </p>
        <p>
          Whether you are calculating a monthly mortgage payment, checking body mass index, calculating age down to the day, or converting measurements between systems, UnitNov gives you immediate, dependable answers.
        </p>
      </div>

      {/* Core Values Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {values.map((v) => (
          <div
            key={v.title}
            className="bg-[#151926] border border-white/[0.08] rounded-2xl p-6 hover:border-indigo-500/30 transition-colors"
          >
            <div className="text-3xl mb-3">{v.icon}</div>
            <h3 className="text-lg font-semibold text-white mb-1.5">{v.title}</h3>
            <p className="text-slate-400 text-sm leading-relaxed">{v.desc}</p>
          </div>
        ))}
      </div>

      {/* Call to action */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-900/30 via-violet-900/20 to-[#151926] border border-indigo-500/25 p-8 text-center">
        <h3 className="text-xl font-bold text-white mb-2">Explore Our Online Tools</h3>
        <p className="text-slate-400 text-sm mb-6 max-w-lg mx-auto">
          From financial planning to everyday conversions, find the exact tool you need in seconds.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/all-tools"
            className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-sm transition-colors shadow-lg shadow-indigo-500/20"
          >
            Browse All Tools
          </Link>
          <Link
            href="/contact"
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 font-medium text-sm transition-colors border border-white/10"
          >
            Contact the Team
          </Link>
        </div>
      </div>
    </div>
  );
}
