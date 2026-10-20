import Link from "next/link";

export default function Footer() {
  const toolLinks = [
    { label: "Loan Calculator", href: "/calculators/loan-calculator" },
    { label: "Mortgage Calculator", href: "/calculators/mortgage-calculator" },
    { label: "Compound Interest", href: "/calculators/compound-interest-calculator" },
    { label: "BMI Calculator", href: "/calculators/bmi-calculator" },
    { label: "Age Calculator", href: "/calculators/age-calculator" },
    { label: "Percentage Calculator", href: "/calculators/percentage-calculator" },
  ];

  const categoryLinks = [
    { label: "All Tools", href: "/all-tools" },
    { label: "Calculators", href: "/calculators" },
    { label: "Converters", href: "/converters" },
    { label: "Generators", href: "/generators" },
  ];

  const legalLinks = [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Disclaimer", href: "/disclaimer" },
  ];

  return (
    <footer className="border-t border-white/[0.08] bg-[#07090E] mt-24 relative overflow-hidden">
      {/* Subtle top edge glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent" />

      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-200">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-white font-extrabold text-lg tracking-tight">UnitNov</span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed mb-5">
              High-speed, precision online calculators, converters, and developer utilities. 100% private and executed entirely in your browser.
            </p>

            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
                100% Client-Side Privacy
              </div>
              <div className="flex items-center gap-2 text-xs text-indigo-300 font-medium">
                <span className="text-indigo-400">⚡</span>
                Zero Latency Computing
              </div>
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Calculators
            </h3>
            <ul className="space-y-2.5">
              {toolLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-400 hover:text-indigo-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Generators & Converters */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Utilities & Hubs
            </h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/generators/qr-code-generator" className="text-xs text-slate-400 hover:text-indigo-300 transition-colors">
                  QR Code Generator
                </Link>
              </li>
              <li>
                <Link href="/generators/password-generator" className="text-xs text-slate-400 hover:text-indigo-300 transition-colors">
                  Password Generator
                </Link>
              </li>
              <li>
                <Link href="/generators/word-counter" className="text-xs text-slate-400 hover:text-indigo-300 transition-colors">
                  Word Counter
                </Link>
              </li>
              <li>
                <Link href="/converters/case-converter" className="text-xs text-slate-400 hover:text-indigo-300 transition-colors">
                  Text Case Converter
                </Link>
              </li>
              {categoryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-400 hover:text-indigo-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h3 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-4">
              Trust & Legal
            </h3>
            <ul className="space-y-2.5">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-400 hover:text-indigo-300 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} UnitNov. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[11px] text-slate-400">
              For informational purposes only. See our{" "}
              <Link href="/disclaimer" className="text-indigo-400 hover:underline">
                Disclaimer
              </Link>
              .
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}