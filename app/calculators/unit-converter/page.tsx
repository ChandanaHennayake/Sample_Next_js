import type { Metadata } from "next";
import Link from "next/link";
import UnitConverterClient from "./UnitConverterClient";
import AdSlot from "@/src/components/AdSlot";
import ShareBar from "@/src/components/ShareBar";
import Breadcrumb from "@/src/components/Breadcrumb";
import FAQAccordion, { FAQItem } from "@/src/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Unit Converter - Metric to Imperial Conversion | UnitNov",
  description:
    "Free online unit converter. Convert length, weight, volume, speed, and temperature between metric and imperial units with instant accuracy.",
  keywords: [
    "unit converter",
    "metric to imperial converter",
    "kg to lbs converter",
    "cm to inches converter",
    "celsius to fahrenheit",
    "measurement converter",
  ],
  alternates: {
    canonical: "https://unitnov.com/calculators/unit-converter",
  },
  openGraph: {
    title: "Unit Converter - Fast Metric & Imperial Conversions",
    description: "Convert length, weight, temperature, volume, and speed units instantly.",
    url: "https://unitnov.com/calculators/unit-converter",
  },
};

export default function UnitConverterPage() {
  const faqs: FAQItem[] = [
    {
      question: "How do you convert kilograms to pounds?",
      answer:
        "1 kilogram is equal to approximately 2.20462 pounds. To convert kilograms to pounds, multiply your weight in kg by 2.20462. For example, 70 kg × 2.20462 = 154.32 lbs.",
    },
    {
      question: "How do you convert Celsius to Fahrenheit?",
      answer:
        "The formula to convert Celsius to Fahrenheit is: °F = (°C × 9/5) + 32. For example, 20°C converts to (20 × 1.8) + 32 = 68°F.",
    },
    {
      question: "How many inches are in a centimeter?",
      answer:
        "1 inch is legally defined as exactly 2.54 centimeters. Therefore, 1 centimeter is equal to approximately 0.3937 inches.",
    },
    {
      question: "What is the difference between metric and imperial systems?",
      answer:
        "The Metric system is a decimal-based system used globally (meters, grams, liters) with factors of 10. The Imperial/US Customary system uses traditional units (feet, pounds, gallons) with varying conversion factors.",
    },
  ];

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "UnitNov Unit Converter",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online converter for length, weight, volume, speed, and temperature between metric and imperial standards.",
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
          { name: "Unit Converter", href: "/calculators/unit-converter" },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <span>🔄</span> Measurement Utilities
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Unit Converter
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Quickly convert measurements across length, weight, temperature, volume, and speed between metric and imperial standards.
        </p>
      </div>

      {/* Top Ad Slot */}
      <AdSlot label="Advertisement" format="horizontal" />

      {/* Calculator Client */}
      <UnitConverterClient />

      {/* Share & Export */}
      <ShareBar toolName="Unit Converter" className="my-6" />

      {/* Reference Conversion Table */}
      <article className="mt-16 pt-12 border-t border-white/[0.08] space-y-10 text-slate-300 leading-relaxed text-sm md:text-base">
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Common Quick Conversion Factors
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#1B2032] p-4 rounded-xl border border-white/5">
              <span className="font-bold text-indigo-300 block mb-1">Length</span>
              <p className="text-slate-400">1 inch = 2.54 cm</p>
              <p className="text-slate-400">1 meter = 3.28084 ft</p>
              <p className="text-slate-400">1 mile = 1.60934 km</p>
            </div>
            <div className="bg-[#1B2032] p-4 rounded-xl border border-white/5">
              <span className="font-bold text-emerald-300 block mb-1">Weight</span>
              <p className="text-slate-400">1 kg = 2.20462 lbs</p>
              <p className="text-slate-400">1 lb = 453.592 grams</p>
              <p className="text-slate-400">1 oz = 28.3495 grams</p>
            </div>
            <div className="bg-[#1B2032] p-4 rounded-xl border border-white/5">
              <span className="font-bold text-amber-300 block mb-1">Temperature</span>
              <p className="text-slate-400">0°C = 32°F</p>
              <p className="text-slate-400">20°C = 68°F (Room)</p>
              <p className="text-slate-400">100°C = 212°F (Boil)</p>
            </div>
            <div className="bg-[#1B2032] p-4 rounded-xl border border-white/5">
              <span className="font-bold text-violet-300 block mb-1">Volume</span>
              <p className="text-slate-400">1 liter = 33.814 fl oz</p>
              <p className="text-slate-400">1 US gal = 3.78541 L</p>
              <p className="text-slate-400">1 cup = 236.588 mL</p>
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
              href="/calculators/bmi-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">⚖️</span>
              <h4 className="font-semibold text-white text-sm">BMI Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Calculate Body Mass Index using metric and imperial.</p>
            </Link>
            <Link
              href="/calculators/percentage-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">📊</span>
              <h4 className="font-semibold text-white text-sm">Percentage Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Calculate percentages, increases, and proportions.</p>
            </Link>
            <Link
              href="/calculators/date-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">📅</span>
              <h4 className="font-semibold text-white text-sm">Date Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Convert time durations and business days.</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}