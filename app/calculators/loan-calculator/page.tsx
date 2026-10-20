import type { Metadata } from "next";
import Link from "next/link";
import LoanCalculatorClient from "./LoanCalculatorClient";
import AdSlot from "@/src/components/AdSlot";
import AffiliateCard from "@/src/components/AffiliateCard";
import ShareBar from "@/src/components/ShareBar";
import Breadcrumb from "@/src/components/Breadcrumb";
import FAQAccordion, { FAQItem } from "@/src/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Loan Calculator - Monthly Payment & Total Interest | UnitNov",
  description:
    "Calculate monthly loan payments, total interest, and total repayment costs. Free, fast personal loan and auto loan calculator with amortization breakdown.",
  keywords: [
    "loan calculator",
    "monthly payment calculator",
    "personal loan calculator",
    "auto loan calculator",
    "loan interest calculator",
    "amortization schedule",
  ],
  alternates: {
    canonical: "https://unitnov.com/calculators/loan-calculator",
  },
  openGraph: {
    title: "Loan Calculator - Calculate Monthly Payment & Total Interest",
    description: "Free instant loan payment calculator. Real-time principal and interest breakdown.",
    url: "https://unitnov.com/calculators/loan-calculator",
  },
};

export default function LoanCalculatorPage() {
  const faqs: FAQItem[] = [
    {
      question: "How is a monthly loan payment calculated?",
      answer:
        "Monthly payments are calculated using the standard amortization formula: M = P [ r(1 + r)^n ] / [ (1 + r)^n – 1 ], where P is the principal loan amount, r is the monthly interest rate (annual rate divided by 12 months), and n is the total number of monthly payments (years multiplied by 12).",
    },
    {
      question: "What is the difference between principal and interest?",
      answer:
        "The principal is the original sum of money you borrowed from the lender. Interest is the fee charged by the lender for borrowing that money, calculated as a percentage of the remaining principal balance.",
    },
    {
      question: "Does this calculator support personal loans, car loans, and student loans?",
      answer:
        "Yes! Any fixed-rate amortizing installment loan—including auto loans, personal loans, and private student loans—follows this exact mathematical formula.",
    },
    {
      question: "How can I lower my total interest cost?",
      answer:
        "You can lower total interest by choosing a shorter loan term (e.g., 3 years instead of 5 years), securing a lower annual percentage rate (APR) with a higher credit score, or making extra payments toward the principal balance.",
    },
  ];

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "UnitNov Loan Calculator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online tool to calculate monthly installment payments and total interest costs for any personal, auto, or business loan.",
  };

  return (
    <div className="py-4">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      {/* Semantic Breadcrumb Navigation & BreadcrumbList Schema */}
      <Breadcrumb
        items={[
          { name: "Calculators", href: "/calculators" },
          { name: "Loan Calculator", href: "/calculators/loan-calculator" },
        ]}
      />

      {/* Tool Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <span>💳</span> Financial Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Loan Calculator
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Estimate your exact monthly payment, total interest charges, and loan amortization breakdown in real-time.
        </p>
      </div>

      {/* Top Ad Slot (Non-intrusive) */}
      <AdSlot label="Advertisement" format="horizontal" />

      {/* Interactive Calculator Client */}
      <LoanCalculatorClient />

      {/* Share & Export */}
      <ShareBar toolName="Loan Calculator" className="my-6" />

      {/* High-Ticket Financial Affiliate Card */}
      <AffiliateCard
        title="Looking for the Lowest Interest Rate on Your Loan?"
        description="Check personalized rates across top vetted national lenders without affecting your credit score. Fixed APRs available for debt consolidation, home improvements, and major expenses."
        ctaText="Check Pre-Qualified Rates"
        ctaHref={process.env.NEXT_PUBLIC_LOAN_AFFILIATE_URL}
      />

      {/* Comprehensive SEO Content & Formula Explanation */}
      <article className="mt-16 pt-12 border-t border-white/[0.08] space-y-10 text-slate-300 leading-relaxed text-sm md:text-base">
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            How the Loan Payment Formula Works
          </h2>
          <p className="mb-4">
            Lenders calculate fixed monthly installment payments using standard amortization formulas. To compute your monthly repayment manually, use the equation below:
          </p>

          <div className="bg-[#0F1117] border border-indigo-500/20 rounded-xl p-5 my-4 text-center font-mono text-indigo-300 text-base md:text-lg">
            M = P × [ r(1 + r)ⁿ ] / [ (1 + r)ⁿ – 1 ]
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-xs md:text-sm">
            <div className="bg-[#1E2335] rounded-xl p-4 border border-white/5">
              <span className="font-bold text-white block text-sm mb-1">P = Principal</span>
              The total money borrowed (e.g. $25,000).
            </div>
            <div className="bg-[#1E2335] rounded-xl p-4 border border-white/5">
              <span className="font-bold text-white block text-sm mb-1">r = Monthly Rate</span>
              Annual interest rate divided by 12 months (e.g. 6.5% / 12 = 0.005417).
            </div>
            <div className="bg-[#1E2335] rounded-xl p-4 border border-white/5">
              <span className="font-bold text-white block text-sm mb-1">n = Total Months</span>
              Number of loan repayment years multiplied by 12 (e.g. 5 yrs = 60 months).
            </div>
          </div>
        </section>

        {/* Example Walkthrough */}
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Step-by-Step Calculation Example
          </h2>
          <p className="mb-3">
            Suppose you borrow <strong>$20,000</strong> at an annual interest rate of <strong>6%</strong> for a term of <strong>5 years (60 months)</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-400">
            <li><strong>Convert rate:</strong> Monthly rate = 6% / 100 / 12 = <code>0.005</code>.</li>
            <li><strong>Calculate factor:</strong> (1 + 0.005)⁶⁰ ≈ <code>1.34885</code>.</li>
            <li><strong>Compute monthly payment:</strong> 20,000 × [0.005 × 1.34885] / [1.34885 – 1] = <strong>$386.66 per month</strong>.</li>
            <li><strong>Total amount repaid:</strong> 60 × $386.66 = <strong>$23,199.60</strong>.</li>
            <li><strong>Total interest paid:</strong> $23,199.60 – $20,000 = <strong>$3,199.60</strong>.</li>
          </ol>
        </section>

        {/* Second Ad Slot */}
        <AdSlot label="Sponsored Content" format="horizontal" />

        {/* Frequently Asked Questions */}
        <FAQAccordion items={faqs} />

        {/* Related Tools Navigation Grid */}
        <section className="pt-8 border-t border-white/[0.08]">
          <h3 className="text-lg font-bold text-white mb-4">Related Financial Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/calculators/mortgage-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">🏡</span>
              <h4 className="font-semibold text-white text-sm">Mortgage Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Estimate home loan payments and amortization.</p>
            </Link>
            <Link
              href="/calculators/compound-interest-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">📈</span>
              <h4 className="font-semibold text-white text-sm">Compound Interest</h4>
              <p className="text-xs text-slate-400 mt-1">Forecast investment returns and growth.</p>
            </Link>
            <Link
              href="/calculators/discount-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">🏷️</span>
              <h4 className="font-semibold text-white text-sm">Discount Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Calculate sales discounts and saved dollars.</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}