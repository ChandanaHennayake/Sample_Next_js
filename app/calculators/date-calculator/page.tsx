import type { Metadata } from "next";
import Link from "next/link";
import DateCalculatorClient from "./DateCalculatorClient";
import AdSlot from "@/src/components/AdSlot";
import ShareBar from "@/src/components/ShareBar";
import Breadcrumb from "@/src/components/Breadcrumb";
import FAQAccordion, { FAQItem } from "@/src/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Date Calculator: Days Between Dates & Workdays | UnitNov",
  description:
    "Calculate the exact number of days, weeks, and business days between two dates. Add or subtract days from any date with our free online calendar tool.",
  keywords: [
    "date calculator",
    "days between dates",
    "business days calculator",
    "working days calculator",
    "add days to date",
    "calendar calculator",
  ],
  alternates: {
    canonical: "https://unitnov.com/calculators/date-calculator",
  },
  openGraph: {
    title: "Date Calculator - Calculate Days Between Dates & Business Days",
    description: "Calculate duration, weekdays, and target dates quickly and accurately.",
    url: "https://unitnov.com/calculators/date-calculator",
  },
};

export default function DateCalculatorPage() {
  const faqs: FAQItem[] = [
    {
      question: "How does the calculator determine business days?",
      answer:
        "Business days count Monday through Friday between your selected start and end dates, excluding Saturdays and Sundays. It provides an accurate representation of working days for project planning, shipping estimates, and employment contracts.",
    },
    {
      question: "Does the date difference include the start or end date?",
      answer:
        "By standard calendar convention, this tool calculates the total elapsed duration (end date minus start date). If you want to include both the first and last day inclusively, simply add 1 day to the final count.",
    },
    {
      question: "How does the tool handle leap years?",
      answer:
        "All calculations use full Gregorian calendar math that automatically accounts for February 29th leap days across past, present, and future centuries.",
    },
    {
      question: "How do I calculate what date is 90 days from today?",
      answer:
        "In the 'Add / Subtract Days' mode of our calculator, select today as your start date, ensure the operation is set to Add (+), and enter 90. UnitNov will compute the exact future calendar day, taking into account differing month day-counts and leap years.",
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "Date Calculator",
      url: "https://unitnov.com/calculators/date-calculator",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Free online date calculator to compute days between dates, working business days, and add or subtract days.",
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
          { name: "Date Calculator", href: "/calculators/date-calculator" },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <span>📅</span> Time & Calendar
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Date Calculator
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Count days and business working days between two calendar dates, or add and subtract days to find a target future or past date.
        </p>
      </div>

      {/* Top Ad Slot */}
      <AdSlot label="Advertisement" format="horizontal" />

      {/* Calculator Client */}
      <DateCalculatorClient />

      {/* Share & Export */}
      <ShareBar toolName="Date Calculator" className="my-6" />

      {/* SEO Content Section */}
      <article className="mt-16 pt-12 border-t border-white/[0.08] space-y-10 text-slate-300 leading-relaxed text-sm md:text-base">
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Common Calendar & Date Calculations
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <h3 className="font-bold text-white text-base">Calendar Duration vs Working Days</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Total calendar days represent the literal chronological elapsed time (24 hours per day). Working business days filter out Saturdays and Sundays, which is essential for invoice payment terms (e.g., Net 30), legal deadlines, and delivery schedules.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-white text-base">Date Offsets & Deadlines</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Adding or subtracting a fixed number of days to a starting date helps determine visa expiration dates, warranty durations, project milestone deadlines, and event countdowns without tedious manual calendar counting.
              </p>
            </div>
          </div>
        </section>

        {/* Step-by-Step Calculation Example */}
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Step-by-Step Date & Business Day Example
          </h2>
          <p className="mb-3">
            Suppose a commercial contract commences on <strong>September 1, 2026</strong> and completes on <strong>October 15, 2026</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-400">
            <li><strong>Count total calendar days:</strong> 30 days in September – 1 + 15 days in October = <strong>44 total calendar days (6 weeks and 2 days)</strong>.</li>
            <li><strong>Filter weekends:</strong> September 1 to October 15 contains 6 full weekends (12 weekend days).</li>
            <li><strong>Compute working business days:</strong> 44 total days – 12 weekend days = <strong>32 Monday-through-Friday business working days</strong>.</li>
            <li><strong>Project billing deadline (Net 30):</strong> Adding 30 days from September 1 yields an invoice due date of <strong>Thursday, October 1, 2026</strong>.</li>
          </ol>
        </section>

        {/* Second Ad Slot */}
        <AdSlot label="Sponsored Content" format="horizontal" />

        {/* FAQs */}
        <FAQAccordion items={faqs} />

        {/* Related Tools */}
        <section className="pt-8 border-t border-white/[0.08]">
          <h3 className="text-lg font-bold text-white mb-4">Related Utilities</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/calculators/age-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">🎂</span>
              <h4 className="font-semibold text-white text-sm">Age Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Calculate exact age in years, months, and days.</p>
            </Link>
            <Link
              href="/calculators/percentage-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">📊</span>
              <h4 className="font-semibold text-white text-sm">Percentage Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Calculate percentage differences and changes.</p>
            </Link>
            <Link
              href="/calculators/discount-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">🏷️</span>
              <h4 className="font-semibold text-white text-sm">Discount Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Calculate sale prices and shopping discounts.</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}