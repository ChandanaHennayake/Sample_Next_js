import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Tool Not Found | UnitNov",
  description: "The requested calculator or utility page could not be found. Explore our free suite of online tools.",
  robots: {
    index: false,
    follow: true,
  },
};

export default function NotFound() {
  const popularTools = [
    { name: "Loan Calculator", href: "/calculators/loan-calculator", icon: "💳" },
    { name: "Mortgage Calculator", href: "/calculators/mortgage-calculator", icon: "🏡" },
    { name: "BMI Calculator", href: "/calculators/bmi-calculator", icon: "⚖️" },
    { name: "QR Code Generator", href: "/generators/qr-code-generator", icon: "📱" },
    { name: "Password Generator", href: "/generators/password-generator", icon: "🔑" },
    { name: "Text Case Converter", href: "/converters/case-converter", icon: "🔠" },
  ];

  return (
    <div className="py-16 text-center max-w-2xl mx-auto">
      <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center text-3xl mx-auto mb-6 shadow-lg shadow-indigo-500/10">
        404
      </div>

      <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-3">
        Tool or Page Not Found
      </h1>
      <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-8">
        The tool or page you are looking for may have been moved, updated, or does not exist. Try searching our directory or jump to a popular calculator below.
      </p>

      {/* Popular Recovery Links */}
      <div className="glass-card rounded-2xl p-6 text-left mb-8 border border-white/[0.08]">
        <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
          Popular Online Tools
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {popularTools.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className="flex items-center gap-2.5 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-indigo-500/30 hover:bg-white/[0.06] text-slate-200 text-xs font-medium transition-all"
            >
              <span className="text-base">{t.icon}</span>
              <span>{t.name}</span>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 transition-all active:scale-95"
        >
          Return to Homepage
        </Link>
        <Link
          href="/all-tools"
          className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white border border-white/10 font-bold text-xs uppercase tracking-wider transition-all"
        >
          Browse All 13 Tools
        </Link>
      </div>
    </div>
  );
}
