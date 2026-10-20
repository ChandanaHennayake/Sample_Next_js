import type { Metadata } from "next";
import Link from "next/link";
import AgeCalculatorClient from "./AgeCalculatorClient";
import AdSlot from "@/src/components/AdSlot";
import FAQAccordion, { FAQItem } from "@/src/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Age Calculator - Exact Chronological Age & Birthday Countdown | UnitNov",
  description:
    "Calculate your exact age in years, months, weeks, days, hours, and minutes. Free chronological age calculator with birthday countdown and leap year precision.",
  keywords: [
    "age calculator",
    "exact age calculator",
    "calculate my age",
    "birthday countdown",
    "how old am i",
    "chronological age calculator",
    "days lived calculator",
  ],
  alternates: {
    canonical: "https://unitnov.com/calculators/age-calculator",
  },
  openGraph: {
    title: "Age Calculator - Exact Chronological Age in Years, Months, Days",
    description: "Calculate your exact age down to the day, hour, and minute with next birthday countdown.",
    url: "https://unitnov.com/calculators/age-calculator",
  },
};

export default function AgeCalculatorPage() {
  const faqs: FAQItem[] = [
    {
      question: "How is chronological age calculated?",
      answer:
        "Chronological age is calculated by finding the exact time elapsed between your date of birth and the current calendar date. It accounts for varying days in each month (28, 29, 30, or 31) and leap years (366 days).",
    },
    {
      question: "How does the calculator handle leap years?",
      answer:
        "Our calculation engine uses native UTC calendar methods that accurately account for February 29th in leap years (such as 2000, 2004, 2020, 2024, etc.), ensuring total days lived is 100% mathematically correct.",
    },
    {
      question: "Can I calculate the age of someone on a specific historical date?",
      answer:
        "By default, UnitNov calculates age relative to today's date. If you need to find the duration between two specific historical dates, you can also use our Date Calculator.",
    },
  ];

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "UnitNov Age Calculator",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online tool to calculate exact age in years, months, days, weeks, and total hours lived with birthday countdown.",
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
        <span className="text-slate-200 font-medium">Age Calculator</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <span>🎂</span> Date & Time Utility
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Age Calculator
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Find out your exact chronological age in years, months, weeks, days, and total hours lived.
        </p>
      </div>

      {/* Top Ad Slot */}
      <AdSlot label="Advertisement" format="horizontal" />

      {/* Interactive Tool Client */}
      <AgeCalculatorClient />

      {/* Educational Content & Guidelines */}
      <article className="mt-16 pt-12 border-t border-white/[0.08] space-y-10 text-slate-300 leading-relaxed text-sm md:text-base">
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Understanding Chronological Age Calculation
          </h2>
          <p className="mb-4">
            In most western cultures, age increments by one year on each anniversary of a person&apos;s birth. However, calculating the exact number of months and days requires adjusting for the irregular number of days in each calendar month:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 text-xs md:text-sm">
            <div className="bg-[#1E2335] rounded-xl p-4 border border-white/5">
              <span className="font-bold text-white block text-sm mb-1">Standard Months</span>
              Months have 30 or 31 days (except February), which require borrowing days from the preceding month when the current day is less than the birth day.
            </div>
            <div className="bg-[#1E2335] rounded-xl p-4 border border-white/5">
              <span className="font-bold text-white block text-sm mb-1">Leap Year Adjustments</span>
              Leap years occur every 4 years (with century exceptions). UnitNov adds 366 days for each leap cycle lived.
            </div>
            <div className="bg-[#1E2335] rounded-xl p-4 border border-white/5">
              <span className="font-bold text-white block text-sm mb-1">Total Hours Lived</span>
              Computed by taking the millisecond timestamp difference and dividing by 3,600,000 milliseconds per hour.
            </div>
          </div>
        </section>

        {/* Second Ad Slot */}
        <AdSlot label="Sponsored Content" format="horizontal" />

        {/* FAQs */}
        <FAQAccordion items={faqs} />

        {/* Related Tools */}
        <section className="pt-8 border-t border-white/[0.08]">
          <h3 className="text-lg font-bold text-white mb-4">Related Time & Math Calculators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/calculators/date-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">📅</span>
              <h4 className="font-semibold text-white text-sm">Date Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Calculate duration and days between two dates.</p>
            </Link>
            <Link
              href="/calculators/bmi-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">⚖️</span>
              <h4 className="font-semibold text-white text-sm">BMI Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Check body mass index and healthy weight ranges.</p>
            </Link>
            <Link
              href="/calculators/percentage-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">📊</span>
              <h4 className="font-semibold text-white text-sm">Percentage Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Solve percentage increases, discounts, and proportions.</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}