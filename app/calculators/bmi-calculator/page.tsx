import type { Metadata } from "next";
import Link from "next/link";
import BMICalculatorClient from "./BMICalculatorClient";
import AdSlot from "@/src/components/AdSlot";
import ShareBar from "@/src/components/ShareBar";
import Breadcrumb from "@/src/components/Breadcrumb";
import FAQAccordion, { FAQItem } from "@/src/components/FAQAccordion";

export const metadata: Metadata = {
  title: "BMI Calculator: Body Mass Index & Health | UnitNov",
  description:
    "Free online BMI calculator with Metric (cm/kg) and Imperial (feet/inches/lbs) units. Check body mass index, WHO weight categories, and healthy weight ranges.",
  keywords: [
    "bmi calculator",
    "body mass index calculator",
    "healthy weight calculator",
    "bmi chart",
    "calculate bmi",
    "ideal weight calculator",
  ],
  alternates: {
    canonical: "https://unitnov.com/calculators/bmi-calculator",
  },
  openGraph: {
    title: "BMI Calculator - Calculate Body Mass Index with Metric & Imperial",
    description: "Check your BMI category and healthy weight range instantly with our free online calculator.",
    url: "https://unitnov.com/calculators/bmi-calculator",
  },
};

export default function BMICalculatorPage() {
  const faqs: FAQItem[] = [
    {
      question: "What is Body Mass Index (BMI)?",
      answer:
        "Body Mass Index (BMI) is a screening metric that compares your weight to your height. Established by the World Health Organization (WHO), BMI is widely used by clinicians and researchers to categorize individuals into underweight, normal weight, overweight, and obesity ranges.",
    },
    {
      question: "What is the formula to calculate BMI?",
      answer:
        "In the Metric system, BMI = weight (kg) ÷ [height (m)]². In the Imperial system, BMI = [weight (lbs) ÷ (height (inches))²] × 703.",
    },
    {
      question: "What are the standard WHO BMI categories?",
      answer:
        "According to the WHO: Underweight is below 18.5, Normal weight is 18.5 to 24.9, Overweight is 25.0 to 29.9, and Obesity is 30.0 or higher.",
    },
    {
      question: "Can BMI overestimate body fat in muscular athletes?",
      answer:
        "Yes. BMI does not distinguish between muscle mass and fat tissue. Athletes and bodybuilders with high muscle mass may have a BMI in the overweight or obese category despite having low body fat.",
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "BMI Calculator",
      url: "https://unitnov.com/calculators/bmi-calculator",
      applicationCategory: "HealthApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Free online Body Mass Index calculator supporting both metric and imperial measurements with healthy weight target guidance.",
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

      {/* Semantic Breadcrumb Navigation & BreadcrumbList Schema */}
      <Breadcrumb
        items={[
          { name: "Calculators", href: "/calculators" },
          { name: "BMI Calculator", href: "/calculators/bmi-calculator" },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-3">
          <span>⚖️</span> Health & Wellness
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          BMI Calculator
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Calculate your Body Mass Index (BMI) and discover your recommended healthy weight range using metric or imperial measurements.
        </p>
      </div>

      {/* Top Ad Slot */}
      <AdSlot label="Advertisement" format="horizontal" />

      {/* Calculator Client */}
      <BMICalculatorClient />

      {/* Share & Export */}
      <ShareBar toolName="BMI Calculator" className="my-6" />

      {/* Medical Disclaimer Alert */}
      <div className="mt-8 p-4 rounded-xl border border-amber-500/20 bg-amber-500/5 text-amber-200/90 text-xs flex items-start gap-3">
        <span className="text-base">⚠️</span>
        <p>
          <strong>Medical Notice:</strong> BMI is a general screening guideline and should not replace clinical medical assessments. Always consult a healthcare professional for diagnosis and personalized wellness plans.
        </p>
      </div>

      {/* Educational & WHO Reference Table Section */}
      <article className="mt-16 pt-12 border-t border-white/[0.08] space-y-10 text-slate-300 leading-relaxed text-sm md:text-base">
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            World Health Organization (WHO) BMI Classifications
          </h2>
          <p className="mb-6">
            The table below shows the international BMI cutoff categories established by the World Health Organization for adults aged 20 and older:
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm border-collapse">
              <thead>
                <tr className="border-b border-white/10 text-slate-400 uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-4">BMI Range</th>
                  <th className="py-3 px-4">Classification</th>
                  <th className="py-3 px-4">Health Implication</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                <tr>
                  <td className="py-3 px-4 font-mono font-bold text-sky-400">Below 18.5</td>
                  <td className="py-3 px-4 font-semibold text-white">Underweight</td>
                  <td className="py-3 px-4 text-slate-400">Higher risk of nutritional deficiency and bone density loss.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">18.5 – 24.9</td>
                  <td className="py-3 px-4 font-semibold text-white">Normal Weight</td>
                  <td className="py-3 px-4 text-slate-400">Lowest statistical risk of cardiovascular and metabolic conditions.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-bold text-amber-400">25.0 – 29.9</td>
                  <td className="py-3 px-4 font-semibold text-white">Overweight</td>
                  <td className="py-3 px-4 text-slate-400">Moderate risk; increased emphasis on balanced diet and activity.</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-mono font-bold text-rose-400">30.0 or Higher</td>
                  <td className="py-3 px-4 font-semibold text-white">Obesity</td>
                  <td className="py-3 px-4 text-slate-400">Substantially higher risk for hypertension and type 2 diabetes.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Step-by-Step Calculation Example */}
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Step-by-Step BMI Calculation Example
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
            <div className="space-y-3">
              <h3 className="text-base font-bold text-indigo-400">Metric Example (kg & cm)</h3>
              <p className="text-slate-400">
                Consider an individual who is <strong>175 cm (1.75 m) tall</strong> and weighs <strong>70 kg</strong>:
              </p>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-400 text-xs md:text-sm">
                <li>Convert height to meters: 175 cm ÷ 100 = <code>1.75 m</code>.</li>
                <li>Square the height: 1.75 × 1.75 = <code>3.0625</code>.</li>
                <li>Divide weight: 70 kg ÷ 3.0625 = <strong>22.86 BMI</strong>.</li>
                <li>Result: <strong>Normal weight</strong> (within 18.5 – 24.9).</li>
              </ol>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-indigo-400">Imperial Example (lbs & inches)</h3>
              <p className="text-slate-400">
                Consider an individual who is <strong>5 ft 10 in (70 inches)</strong> and weighs <strong>165 lbs</strong>:
              </p>
              <ol className="list-decimal pl-5 space-y-1.5 text-slate-400 text-xs md:text-sm">
                <li>Convert height to inches: (5 × 12) + 10 = <code>70 in</code>.</li>
                <li>Square the height: 70 × 70 = <code>4,900</code>.</li>
                <li>Compute with 703 factor: [165 ÷ 4,900] × 703 = <strong>23.67 BMI</strong>.</li>
                <li>Result: <strong>Normal weight</strong> (within 18.5 – 24.9).</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Second Ad Slot */}
        <AdSlot label="Sponsored Content" format="horizontal" />

        {/* FAQs */}
        <FAQAccordion items={faqs} />

        {/* Related Tools */}
        <section className="pt-8 border-t border-white/[0.08]">
          <h3 className="text-lg font-bold text-white mb-4">Related Health & Math Tools</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/calculators/age-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">🎂</span>
              <h4 className="font-semibold text-white text-sm">Age Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Calculate exact chronological age down to the day.</p>
            </Link>
            <Link
              href="/calculators/unit-converter"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">🔄</span>
              <h4 className="font-semibold text-white text-sm">Unit Converter</h4>
              <p className="text-xs text-slate-400 mt-1">Convert weight (kg to lbs) and length (cm to feet).</p>
            </Link>
            <Link
              href="/calculators/percentage-calculator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">📊</span>
              <h4 className="font-semibold text-white text-sm">Percentage Calculator</h4>
              <p className="text-xs text-slate-400 mt-1">Calculate percentage weight change and targets.</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}