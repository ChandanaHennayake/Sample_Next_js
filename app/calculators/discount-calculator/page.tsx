import type { Metadata } from "next";
import Link from "next/link";
import DiscountCalculatorClient from "./DiscountCalculatorClient";
import AdSlot from "@/src/components/AdSlot";
import ShareBar from "@/src/components/ShareBar";
import Breadcrumb from "@/src/components/Breadcrumb";
import FAQAccordion, { FAQItem } from "@/src/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Discount Calculator - Sale Price & Total Savings | UnitNov",
  description:
    "Calculate sale prices, percentage discounts, and dollar savings instantly. Free online discount calculator with sales tax options for smart shopping.",
  keywords: [
    "discount calculator",
    "sale price calculator",
    "calculate discount",
    "percentage off calculator",
    "coupon calculator",
    "savings calculator",
  ],
  alternates: {
    canonical: "https://unitnov.com/calculators/discount-calculator",
  },
  openGraph: {
    title: "Discount Calculator - Calculate Sale Price & Money Saved",
    description: "Find discounted prices and calculate your shopping savings instantly.",
    url: "https://unitnov.com/calculators/discount-calculator",
  },
};

export default function DiscountCalculatorPage() {
  const faqs: FAQItem[] = [
    {
      question: "How do you calculate a discount?",
      answer:
        "To calculate a discount manually: multiply the original retail price by the discount percentage divided by 100 to get the savings amount. Then subtract the savings from the original price to find the final sale price.",
    },
    {
      question: "What is the formula for sale price with tax?",
      answer:
        "First calculate the discounted subtotal: Subtotal = Original Price × (1 – Discount%). Next, calculate sales tax: Tax = Subtotal × Tax%. Finally, add tax to the subtotal: Final Price = Subtotal + Tax.",
    },
    {
      question: "How much is 25% off $100?",
      answer:
        "25% off $100 saves you $25.00, resulting in a final sale price of $75.00 before any applicable taxes.",
    },
    {
      question: "How do you calculate stacked or double discounts?",
      answer:
        "Stacked discounts are applied sequentially rather than added together. For example, 20% off an $100 item brings it to $80. An additional 10% off is then taken from the $80, saving another $8 for a final price of $72 (a total 28% discount, not 30%).",
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Discount Calculator",
      url: "https://unitnov.com/calculators/discount-calculator",
      applicationCategory: "ShoppingApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Free online discount calculator to find discounted prices, sales savings, and post-tax checkout totals.",
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
          { name: "Discount Calculator", href: "/calculators/discount-calculator" },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <span>🏷️</span> Shopping & Retail
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Discount Calculator
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Find out exact sale prices, calculate total dollars saved, and compute optional sales tax before checkout.
        </p>
      </div>

      {/* Top Ad Slot */}
      <AdSlot label="Advertisement" format="horizontal" />

      {/* Calculator Client */}
      <DiscountCalculatorClient />

      {/* Share & Export */}
      <ShareBar toolName="Discount Calculator" className="my-6" />

      {/* Guide Section */}
      <article className="mt-16 pt-12 border-t border-white/[0.08] space-y-10 text-slate-300 leading-relaxed text-sm md:text-base">
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            How Discount Math Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs md:text-sm">
            <div className="bg-[#1B2032] p-5 rounded-xl border border-white/5 space-y-2">
              <h3 className="font-bold text-white text-base">Discounted Price Equation</h3>
              <p className="text-slate-400">
                Final Sale Price = Original Price × (1 – Discount Rate)
              </p>
              <div className="font-mono text-indigo-300 text-xs pt-1">
                Example: $80 item at 30% off = $80 × 0.70 = $56.00
              </div>
            </div>

            <div className="bg-[#1B2032] p-5 rounded-xl border border-white/5 space-y-2">
              <h3 className="font-bold text-white text-base">Savings Amount Equation</h3>
              <p className="text-slate-400">
                Total Saved = Original Price × (Discount Rate ÷ 100)
              </p>
              <div className="font-mono text-emerald-400 text-xs pt-1">
                Example: $80 item at 30% off saves $80 × 0.30 = $24.00
              </div>
            </div>
          </div>
        </section>

        {/* Step-by-Step Calculation Example */}
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Step-by-Step Discount & Sales Tax Example
          </h2>
          <p className="mb-3">
            Suppose you find a designer jacket with an original retail price of <strong>$150.00</strong> on sale for <strong>35% off</strong> with an <strong>8% local sales tax rate</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-400">
            <li><strong>Calculate discount savings:</strong> $150.00 × (35 ÷ 100) = <strong>$52.50 saved</strong>.</li>
            <li><strong>Calculate discounted subtotal:</strong> $150.00 – $52.50 = <strong>$97.50 subtotal</strong>.</li>
            <li><strong>Calculate sales tax:</strong> $97.50 × (8 ÷ 100) = <strong>$7.80 sales tax</strong>.</li>
            <li><strong>Calculate final checkout price:</strong> $97.50 + $7.80 = <strong>$105.30 total out-of-pocket</strong>.</li>
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
              href="/calculators/percentage-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">📊</span>
              <h4 className="font-semibold text-white text-sm">Percentage Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Solve percentage increases, shares, and differences.</p>
            </Link>
            <Link
              href="/calculators/loan-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">💳</span>
              <h4 className="font-semibold text-white text-sm">Loan Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Calculate installment loans and borrowing costs.</p>
            </Link>
            <Link
              href="/calculators/unit-converter"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">🔄</span>
              <h4 className="font-semibold text-white text-sm">Unit Converter</h4>
              <p className="text-xs text-slate-400 mt-1">Convert metric and imperial units instantly.</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}