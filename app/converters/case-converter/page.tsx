import type { Metadata } from "next";
import Link from "next/link";
import CaseConverterClient from "./CaseConverterClient";
import AdSlot from "@/src/components/AdSlot";
import FAQAccordion, { FAQItem } from "@/src/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Case Converter - UPPERCASE, lowercase, camelCase, Title Case | UnitNov",
  description:
    "Free online text case converter. Easily convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, kebab-case, and snake_case with 1-click copy.",
  keywords: [
    "case converter",
    "uppercase converter",
    "lowercase converter",
    "title case converter",
    "camelcase converter",
    "kebab case generator",
    "slug generator",
    "text case changer",
  ],
  alternates: {
    canonical: "https://unitnov.com/converters/case-converter",
  },
  openGraph: {
    title: "Case Converter - Convert Text to UPPERCASE, camelCase, Title Case",
    description: "Convert string case online instantly. Clean text formatting for developers, writers, and students.",
    url: "https://unitnov.com/converters/case-converter",
  },
};

export default function CaseConverterPage() {
  const faqs: FAQItem[] = [
    {
      question: "What is camelCase?",
      answer:
        "camelCase is a naming convention where the first word is written in lowercase and every subsequent word starts with an uppercase letter, with no spaces or punctuation (e.g., `calculateMonthlyPayment`). It is widely used in JavaScript, TypeScript, and Java.",
    },
    {
      question: "What is kebab-case and slugify?",
      answer:
        "kebab-case combines all words in lowercase separated by hyphens (e.g., `loan-calculator-tool`). It is the standard naming convention for website URLs, CSS class names, and SEO-friendly slugs.",
    },
    {
      question: "What is snake_case?",
      answer:
        "snake_case separates words with underscores in lowercase (e.g., `user_profile_data`). It is commonly used in Python, SQL database column names, and Rust.",
    },
    {
      question: "What is Title Case?",
      answer:
        "Title Case capitalizes the initial letter of every principal word while leaving conjunctions and short prepositions lowercase according to standard publication style guides (e.g., APA, Chicago).",
    },
  ];

  const appSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "UnitNov Case Converter",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "All",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description:
      "Free online case converter to transform text into UPPERCASE, lowercase, Title Case, Sentence case, camelCase, kebab-case, and snake_case.",
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
        <Link href="/converters" className="hover:text-white transition-colors">
          Converters
        </Link>
        <span>/</span>
        <span className="text-slate-200 font-medium">Case Converter</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <span>🔠</span> Text & Developer Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Text Case Converter
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Instantly transform any text between UPPERCASE, lowercase, Title Case, Sentence case, camelCase, kebab-case, and snake_case.
        </p>
      </div>

      {/* Top Ad Slot */}
      <AdSlot label="Advertisement" format="horizontal" />

      {/* Converter Client */}
      <CaseConverterClient />

      {/* Case Guide Section */}
      <article className="mt-16 pt-12 border-t border-white/[0.08] space-y-10 text-slate-300 leading-relaxed text-sm md:text-base">
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Naming Conventions Guide for Developers & Writers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs md:text-sm">
            <div className="bg-[#1B2032] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="font-bold text-indigo-400">camelCase</span>
              <p className="text-slate-400">Standard for JavaScript/TypeScript variables, functions, and object properties.</p>
              <div className="font-mono text-slate-200 text-xs pt-1">e.g. `getUserAccountBalance`</div>
            </div>

            <div className="bg-[#1B2032] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="font-bold text-emerald-400">kebab-case</span>
              <p className="text-slate-400">Industry standard for URL slugs, web routing, REST endpoints, and CSS classes.</p>
              <div className="font-mono text-slate-200 text-xs pt-1">e.g. `loan-calculator-tool`</div>
            </div>

            <div className="bg-[#1B2032] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="font-bold text-amber-400">snake_case</span>
              <p className="text-slate-400">Primary convention for Python variables, SQL database columns, and config files.</p>
              <div className="font-mono text-slate-200 text-xs pt-1">e.g. `monthly_interest_rate`</div>
            </div>

            <div className="bg-[#1B2032] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="font-bold text-violet-400">PascalCase</span>
              <p className="text-slate-400">Used for React component names, TypeScript types/interfaces, and C# classes.</p>
              <div className="font-mono text-slate-200 text-xs pt-1">e.g. `LoanCalculatorClient`</div>
            </div>
          </div>
        </section>

        {/* Second Ad Slot */}
        <AdSlot label="Sponsored Content" format="horizontal" />

        {/* FAQs */}
        <FAQAccordion items={faqs} />

        {/* Related Tools */}
        <section className="pt-8 border-t border-white/[0.08]">
          <h3 className="text-lg font-bold text-white mb-4">Related Utilities & Converters</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/generators/word-counter"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">📝</span>
              <h4 className="font-semibold text-white text-sm">Word Counter</h4>
              <p className="text-xs text-slate-400 mt-1">Count words, characters, and reading time.</p>
            </Link>
            <Link
              href="/generators/password-generator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">🔑</span>
              <h4 className="font-semibold text-white text-sm">Password Generator</h4>
              <p className="text-xs text-slate-400 mt-1">Generate strong cryptographically secure passwords.</p>
            </Link>
            <Link
              href="/generators/qr-code-generator"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">📱</span>
              <h4 className="font-semibold text-white text-sm">QR Code Generator</h4>
              <p className="text-xs text-slate-400 mt-1">Generate high-res QR codes for WiFi and links.</p>
            </Link>
          </div>
        </section>
      </article>
    </div>
  );
}
