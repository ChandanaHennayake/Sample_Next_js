import type { Metadata } from "next";
import Link from "next/link";
import MortgageCalculatorClient from "./MortgageCalculatorClient";
import AdSlot from "@/src/components/AdSlot";
import AffiliateCard from "@/src/components/AffiliateCard";
import ShareBar from "@/src/components/ShareBar";
import FAQAccordion, { FAQItem } from "@/src/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Mortgage Calculator - Monthly Payment & Amortization | UnitNov",
  description:
    "Free online mortgage calculator. Estimate monthly house payments including principal, interest, property taxes, and homeowners insurance.",
  keywords: [
    "mortgage calculator",
    "home loan calculator",
    "monthly mortgage payment",
    "house payment calculator",
    "mortgage interest calculator",
    "30 year mortgage",
    "15 year mortgage",
  ],
  alternates: {
    canonical: "https://unitnov.com/calculators/mortgage-calculator",
  },
  openGraph: {
    title: "Mortgage Calculator - Monthly Payment & Amortization Breakdown",
    description: "Calculate your monthly home loan payment with taxes, insurance, and lifetime interest breakdown.",
    url: "https://unitnov.com/calculators/mortgage-calculator",
  },
};

export default function MortgageCalculatorPage() {
  const faqs: FAQItem[] = [
    {
      question: "How do lenders calculate a monthly mortgage payment?",
      answer:
        "The standard monthly mortgage principal and interest payment is calculated using the formula M = P [ r(1 + r)^n ] / [ (1 + r)^n – 1 ]. P is your total loan amount (home price minus down payment), r is the monthly interest rate (annual APR divided by 12), and n is total months (e.g. 360 months for a 30-year fixed loan).",
    },
    {
      question: "What is PITI in a mortgage payment?",
      answer:
        "PITI stands for Principal, Interest, Taxes, and Insurance. Most homeowners make a single monthly payment to their lender or loan servicer that combines the principal loan repayment, interest charges, local property taxes into escrow, and homeowner's insurance premiums.",
    },
    {
      question: "Is a 15-year or 30-year mortgage better?",
      answer:
        "A 30-year mortgage offers lower monthly payments, giving you more cash flow flexibility. A 15-year mortgage has higher monthly payments, but typically comes with a lower interest rate and will save tens of thousands of dollars in lifetime interest charges.",
    },
    {
      question: "How much down payment do I need to buy a home?",
      answer:
        "Conventional loans commonly recommend a 20% down payment to avoid Private Mortgage Insurance (PMI). However, many conventional loan programs accept 3% to 5% down, and FHA loans allow as little as 3.5% down.",
    },
  ];

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "UnitNov Mortgage Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online mortgage calculator to estimate monthly payments, property taxes, homeowners insurance, and lifetime interest.",
  };

  return (
    <div className="py-4">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      {/* Breadcrumb */}
      <nav className="flex items-center gap-2 text-xs text-slate-400 mb-6">
        <Link href="/" className="hover:text-white transition-colors">
          Home
        </Link>
        <span>/</span>
        <Link href="/calculators" className="hover:text-white transition-colors">
          Calculators
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-medium">Mortgage Calculator</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <span>🏡</span> Real Estate Finance
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Mortgage Calculator
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Estimate your monthly mortgage payments, including principal, interest, property taxes, and homeowners insurance.
        </p>
      </div>

      {/* Top Ad Slot */}
      <AdSlot label="Advertisement" format="horizontal" />

      {/* Calculator Component */}
      <MortgageCalculatorClient />

      {/* Share & Export */}
      <ShareBar toolName="Mortgage Calculator" className="my-6" />

      {/* High-Ticket Mortgage Affiliate Card */}
      <AffiliateCard
        title="Ready to Buy or Refinance? Compare Current Mortgage Rates"
        description="See pre-qualified mortgage and refinance rates from top lenders. Checking your rates is fast and does not affect your credit score."
        ctaText="View Competitive Mortgage Rates"
        ctaHref={process.env.NEXT_PUBLIC_MORTGAGE_AFFILIATE_URL}
      />

      {/* Educational Guide & Formula Section */}
      <article className="mt-16 pt-12 border-t border-white/[0.08] space-y-10 text-slate-300 leading-relaxed text-sm md:text-base">
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            How Mortgage Payments Are Calculated
          </h2>
          <p className="mb-4">
            A fixed-rate mortgage amortizes over the loan term, meaning every monthly payment consists of both principal repayment and interest expense. The formula used across all major banks is:
          </p>

          <div className="bg-[#0F1117] border border-indigo-500/20 rounded-xl p-5 my-4 text-center font-mono text-indigo-300 text-base md:text-lg">
            M = P × [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ – 1 ]
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-xs md:text-sm">
            <div className="bg-[#1E2335] rounded-xl p-4 border border-white/5">
              <span className="font-bold text-white block text-sm mb-1">P = Loan Amount</span>
              Purchase price minus down payment (e.g., $400,000 home – $80,000 = $320,000).
            </div>
            <div className="bg-[#1E2335] rounded-xl p-4 border border-white/5">
              <span className="font-bold text-white block text-sm mb-1">r = Monthly Interest</span>
              Annual interest rate divided by 12 months (e.g., 6.75% / 12 = 0.005625).
            </div>
            <div className="bg-[#1E2335] rounded-xl p-4 border border-white/5">
              <span className="font-bold text-white block text-sm mb-1">n = Number of Months</span>
              Loan term in years × 12 months (e.g., 30 years × 12 = 360 payments).
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
              <p className="text-xs text-slate-400 mt-1">Estimate personal and auto loan installment plans.</p>
            </Link>
            <Link
              href="/calculators/compound-interest-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">📈</span>
              <h4 className="font-semibold text-white text-sm">Compound Interest</h4>
              <p className="text-xs text-slate-400 mt-1">Forecast investment returns and wealth growth.</p>
            </Link>
            <Link
              href="/calculators/percentage-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">📊</span>
              <h4 className="font-semibold text-white text-sm">Percentage Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Solve down payment percentages and proportions.</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}