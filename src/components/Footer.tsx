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
    <footer className="border-t border-white/[0.08] bg-[#0A0C12] mt-24">
      <div className="max-w-6xl mx-auto px-6 py-14">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4 group">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2.2}
                    d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <span className="text-white font-bold text-lg tracking-tight">UnitNov</span>
            </Link>
            <p className="text-slate-400 text-xs leading-relaxed mb-4">
              Free, fast, and privacy-conscious online tools, calculators, and converters. All calculations execute instantly in your browser.
            </p>
            <div className="flex items-center gap-2 text-xs text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              100% Client-Side Privacy
            </div>
          </div>

          {/* Popular Tools */}
          <div>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Popular Tools
            </h3>
            <ul className="space-y-2">
              {toolLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Categories
            </h3>
            <ul className="space-y-2">
              {categoryLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal & Company */}
          <div>
            <h3 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-3">
              Trust & Legal
            </h3>
            <ul className="space-y-2">
              {legalLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-xs text-slate-400 hover:text-indigo-400 transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} UnitNov. All rights reserved.</p>
          <p className="text-center md:text-right text-[11px] text-slate-500">
            For educational and informational purposes only. See our{" "}
            <Link href="/disclaimer" className="text-slate-400 hover:underline">
              Disclaimer
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}