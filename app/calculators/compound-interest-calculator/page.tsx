import type { Metadata } from "next";
import Link from "next/link";
import CompoundInterestCalculatorClient from "./CompoundInterestCalculatorClient";
import AdSlot from "@/src/components/AdSlot";
import AffiliateCard from "@/src/components/AffiliateCard";
import ShareBar from "@/src/components/ShareBar";
import Breadcrumb from "@/src/components/Breadcrumb";
import FAQAccordion, { FAQItem } from "@/src/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Compound Interest Calculator - Investment Growth & APY | UnitNov",
  description:
    "Calculate compound interest and projected investment growth with monthly contributions. Free, fast financial forecasting tool for savings and retirement.",
  keywords: [
    "compound interest calculator",
    "investment calculator",
    "interest growth calculator",
    "future value calculator",
    "savings growth calculator",
    "compound interest formula",
  ],
  alternates: {
    canonical: "https://unitnov.com/calculators/compound-interest-calculator",
  },
  openGraph: {
    title: "Compound Interest Calculator - Project Wealth & Investment Growth",
    description: "Calculate future savings and investment balance with regular monthly additions and compound interest.",
    url: "https://unitnov.com/calculators/compound-interest-calculator",
  },
};

export default function CompoundInterestCalculatorPage() {
  const faqs: FAQItem[] = [
    {
      question: "What is compound interest and how does it work?",
      answer:
        "Compound interest is the interest calculated on the initial principal and also on the accumulated interest from previous periods. Unlike simple interest, which only grows on the original balance, compound interest generates 'interest on interest,' causing your wealth to grow exponentially over time.",
    },
    {
      question: "What is the compound interest formula?",
      answer:
        "The standard formula for compound interest on a lump sum is A = P(1 + r/n)^(nt), where A is the future balance, P is the principal investment, r is the annual nominal interest rate, n is the number of compounding times per year, and t is the number of years.",
    },
    {
      question: "How does compounding frequency affect total return?",
      answer:
        "The more frequently interest compounds—such as daily or monthly versus annually—the faster your balance grows, because interest is added to your principal more frequently and starts earning its own interest sooner.",
    },
    {
      question: "What is the Rule of 72?",
      answer:
        "The Rule of 72 is a quick mental math shortcut to estimate how many years it takes for an investment to double: divide 72 by your annual interest rate. For example, at an 8% annual return, your money doubles in approximately 9 years (72 ÷ 8 = 9).",
    },
  ];

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "UnitNov Compound Interest Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online calculator to forecast investment growth, compound returns, and future wealth with recurring contributions.",
  };

  return (
    <div className="py-4">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      {/* Semantic Breadcrumb Navigation & Schema */}
      <Breadcrumb
        items={[
          { name: "Calculators", href: "/calculators" },
          { name: "Compound Interest", href: "/calculators/compound-interest-calculator" },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <span>📈</span> Investing & Wealth
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Compound Interest Calculator
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Project how your savings and investments grow over time with recurring contributions and compound returns.
        </p>
      </div>

      {/* Top Ad Slot */}
      <AdSlot label="Advertisement" format="horizontal" />

      {/* Calculator Client */}
      <CompoundInterestCalculatorClient />

      {/* Share & Export */}
      <ShareBar toolName="Compound Interest Calculator" className="my-6" />

      {/* Investing Affiliate Card */}
      <AffiliateCard
        title="Put Your Money to Work with High-Yield Savings & Investing"
        description="Earn top APY on your emergency fund or automate long-term index fund investing with zero commission fees."
        ctaText="Explore High-Yield Accounts"
        ctaHref={process.env.NEXT_PUBLIC_INVESTING_AFFILIATE_URL}
      />

      {/* SEO Content & Guide */}
      <article className="mt-16 pt-12 border-t border-white/[0.08] space-y-10 text-slate-300 leading-relaxed text-sm md:text-base">
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            The Mathematics of Compound Growth
          </h2>
          <p className="mb-4">
            Compound interest represents one of the most powerful principles in personal finance. When your interest generates additional interest, growth follows an exponential curve described by:
          </p>

          <div className="bg-[#0F1117] border border-indigo-500/20 rounded-xl p-5 my-4 text-center font-mono text-indigo-300 text-base md:text-lg">
            A = P × (1 + r/n)ⁿᵗ
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mt-6 text-xs md:text-sm">
            <div className="bg-[#1E2335] rounded-xl p-4 border border-white/5">
              <span className="font-bold text-white block text-sm mb-1">A = Final Balance</span>
              The future value of the investment including accumulated compound interest.
            </div>
            <div className="bg-[#1E2335] rounded-xl p-4 border border-white/5">
              <span className="font-bold text-white block text-sm mb-1">P = Principal</span>
              Initial starting sum deposited before compounding begins.
            </div>
            <div className="bg-[#1E2335] rounded-xl p-4 border border-white/5">
              <span className="font-bold text-white block text-sm mb-1">r = Annual Rate</span>
              Annual interest rate expressed as a decimal (e.g., 8% = 0.08).
            </div>
            <div className="bg-[#1E2335] rounded-xl p-4 border border-white/5">
              <span className="font-bold text-white block text-sm mb-1">n & t = Cycles</span>
              n is compounding frequency per year; t is total years invested.
            </div>
          </div>
        </section>

        {/* Second Ad Slot */}
        <AdSlot label="Sponsored Content" format="horizontal" />

        {/* FAQs */}
        <FAQAccordion items={faqs} />

        {/* Related Tools */}
        <section className="pt-8 border-t border-white/[0.08]">
          <h3 className="text-lg font-bold text-white mb-4">Related Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/calculators/loan-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">💳</span>
              <h4 className="font-semibold text-white text-sm">Loan Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Calculate installment payments and borrowing costs.</p>
            </Link>
            <Link
              href="/calculators/mortgage-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">🏡</span>
              <h4 className="font-semibold text-white text-sm">Mortgage Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Estimate home loan financing and interest.</p>
            </Link>
            <Link
              href="/calculators/percentage-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">📊</span>
              <h4 className="font-semibold text-white text-sm">Percentage Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Calculate investment returns and percentage change.</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}