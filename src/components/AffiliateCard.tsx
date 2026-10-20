import Link from "next/link";

interface AffiliateCardProps {
  title: string;
  badge?: string;
  description: string;
  ctaText?: string;
  ctaHref?: string;
  features?: string[];
  partnerNotice?: string;
}

export default function AffiliateCard({
  title,
  badge = "Featured Partner",
  description,
  ctaText = "Compare Rates",
  ctaHref,
  features = [],
  partnerNotice = "UnitNov may receive compensation from featured partners.",
}: AffiliateCardProps) {
  // Only show once a real partner/affiliate URL is configured. Never show made-up offers.
  if (!ctaHref || !ctaHref.startsWith("http")) {
    return null;
  }

  return (
    <div className="my-8 rounded-2xl bg-gradient-to-br from-indigo-950/40 via-[#151926] to-[#121520] border border-indigo-500/30 p-6 md:p-8 shadow-xl shadow-indigo-500/5 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
        <div className="flex-1">
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-indigo-500/15 border border-indigo-500/25 text-indigo-300 text-[11px] font-semibold mb-2.5">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            {badge}
          </div>

          <h3 className="text-lg md:text-xl font-bold text-white tracking-tight mb-2">
            {title}
          </h3>

          <p className="text-slate-300 text-xs md:text-sm leading-relaxed mb-4 max-w-xl">
            {description}
          </p>

          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-400">
            {features.map((feat, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <svg className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                </svg>
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col items-center sm:items-end w-full md:w-auto">
          <Link
            href={ctaHref}
            target={ctaHref.startsWith("http") ? "_blank" : undefined}
            rel={ctaHref.startsWith("http") ? "noopener noreferrer sponsored" : undefined}
            className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-semibold text-xs md:text-sm text-center transition-all shadow-lg shadow-indigo-500/25 active:scale-95"
          >
            {ctaText} →
          </Link>
          <span className="text-[10px] text-slate-500 mt-2 text-center md:text-right">
            {partnerNotice}
          </span>
        </div>
      </div>
    </div>
  );
}
