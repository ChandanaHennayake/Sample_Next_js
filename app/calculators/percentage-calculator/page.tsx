import type { Metadata } from "next";
import Link from "next/link";
import PercentageCalculatorClient from "./PercentageCalculatorClient";
import AdSlot from "@/src/components/AdSlot";
import ShareBar from "@/src/components/ShareBar";
import Breadcrumb from "@/src/components/Breadcrumb";
import FAQAccordion, { FAQItem } from "@/src/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Percentage Calculator: Increase, Decrease & Change | UnitNov",
  description:
    "Free online percentage calculator. Quickly calculate what is X% of Y, find percentage proportions, and calculate percentage increase or decrease.",
  keywords: [
    "percentage calculator",
    "calculate percentage",
    "percent increase calculator",
    "percent decrease calculator",
    "what percent of",
    "percentage formula",
  ],
  alternates: {
    canonical: "https://unitnov.com/calculators/percentage-calculator",
  },
  openGraph: {
    title: "Percentage Calculator - Fast Percentage, Difference & Change",
    description: "Solve percentage problems in seconds with our free online calculator.",
    url: "https://unitnov.com/calculators/percentage-calculator",
  },
};

export default function PercentageCalculatorPage() {
  const faqs: FAQItem[] = [
    {
      question: "How do you calculate a percentage of a number?",
      answer:
        "To calculate P percent of a number X: convert the percentage to a decimal by dividing by 100, then multiply by the number. For example, 15% of 80 is calculated as (15 ÷ 100) × 80 = 0.15 × 80 = 12.",
    },
    {
      question: "How do you calculate percentage increase or decrease?",
      answer:
        "To find the percentage change from an initial value to a final value: subtract the initial value from the final value, divide the difference by the absolute initial value, and multiply by 100. Formula: [ (Final – Initial) ÷ |Initial| ] × 100.",
    },
    {
      question: "How do you find what percentage one number is of another?",
      answer:
        "To find what percentage X is of Y: divide X by Y, then multiply by 100. For example, 25 out of 200 is (25 ÷ 200) × 100 = 0.125 × 100 = 12.5%.",
    },
    {
      question: "How do you calculate reverse percentage (original value)?",
      answer:
        "To find the original number before a percentage increase, divide the final amount by (1 + percentage/100). For a percentage discount, divide the final sale price by (1 – percentage/100). For example, if an item costs $80 after a 20% discount, original = $80 / 0.80 = $100.",
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Percentage Calculator",
      url: "https://unitnov.com/calculators/percentage-calculator",
      applicationCategory: "EducationalApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Free online percentage calculator to solve percentages, proportions, discounts, and percentage change.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <div className="py-4">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Semantic Breadcrumb Navigation & Schema */}
      <Breadcrumb
        items={[
          { name: "Calculators", href: "/calculators" },
          { name: "Percentage Calculator", href: "/calculators/percentage-calculator" },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <span>📊</span> Math & Calculations
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Percentage Calculator
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Solve everyday percentage questions: calculate percentages of numbers, find percentage shares, and measure rate of increase or decrease.
        </p>
      </div>

      {/* Top Ad Slot */}
      <AdSlot label="Advertisement" format="horizontal" />

      {/* Calculator Client */}
      <PercentageCalculatorClient />

      {/* Share & Export */}
      <ShareBar toolName="Percentage Calculator" className="my-6" />

      {/* Educational Guide Section */}
      <article className="mt-16 pt-12 border-t border-white/[0.08] space-y-10 text-slate-300 leading-relaxed text-sm md:text-base">
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Standard Percentage Formulas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#1B2032] p-5 rounded-xl border border-white/5 space-y-2">
              <h3 className="font-bold text-white text-sm">Percentage of a Number</h3>
              <p className="text-xs text-slate-400">Find P% of value X</p>
              <div className="font-mono text-indigo-300 text-sm py-2">
                Result = (P ÷ 100) × X
              </div>
            </div>

            <div className="bg-[#1B2032] p-5 rounded-xl border border-white/5 space-y-2">
              <h3 className="font-bold text-white text-sm">Percentage Proportion</h3>
              <p className="text-xs text-slate-400">X is what % of Y</p>
              <div className="font-mono text-indigo-300 text-sm py-2">
                P = (X ÷ Y) × 100%
              </div>
            </div>

            <div className="bg-[#1B2032] p-5 rounded-xl border border-white/5 space-y-2">
              <h3 className="font-bold text-white text-sm">Percentage Change</h3>
              <p className="text-xs text-slate-400">Difference from V₁ to V₂</p>
              <div className="font-mono text-indigo-300 text-sm py-2">
                Δ = [(V₂ – V₁) ÷ V₁] × 100%
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Calculation Example */}
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Step-by-Step Percentage Calculation Example
          </h2>
          <p className="mb-3">
            Suppose an investment or asset increases in value from an initial price of <strong>$50.00</strong> to a new price of <strong>$75.00</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-400">
            <li><strong>Find the absolute difference:</strong> $75.00 – $50.00 = <strong>+$25.00 increase</strong>.</li>
            <li><strong>Divide by initial value:</strong> $25.00 ÷ $50.00 = <code>0.50</code>.</li>
            <li><strong>Convert to percentage:</strong> 0.50 × 100% = <strong>+50% percentage increase</strong>.</li>
            <li><strong>Reverse check:</strong> $50.00 × 1.50 = $75.00 (confirmed mathematically).</li>
          </ol>
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
              href="/calculators/discount-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">🏷️</span>
              <h4 className="font-semibold text-white text-sm">Discount Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Calculate sale discounts and saved money.</p>
            </Link>
            <Link
              href="/calculators/compound-interest-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">📈</span>
              <h4 className="font-semibold text-white text-sm">Compound Interest</h4>
              <p className="text-xs text-slate-400 mt-1">Project percentage investment growth over time.</p>
            </Link>
            <Link
              href="/calculators/loan-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">💳</span>
              <h4 className="font-semibold text-white text-sm">Loan Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Calculate interest rates and installment loans.</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}