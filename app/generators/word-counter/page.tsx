import type { Metadata } from "next";
import Link from "next/link";
import WordCounterClient from "./WordCounterClient";
import AdSlot from "@/src/components/AdSlot";
import ShareBar from "@/src/components/ShareBar";
import Breadcrumb from "@/src/components/Breadcrumb";
import FAQAccordion, { FAQItem } from "@/src/components/FAQAccordion";

export const metadata: Metadata = {
  title: "Word Counter - Live Word, Character & Sentence Count | UnitNov",
  description:
    "Free online word and character counter. Analyze word count, character count with and without spaces, reading time, and keyword density in real-time.",
  keywords: [
    "word counter",
    "character counter",
    "letter count",
    "sentence counter",
    "reading time calculator",
    "keyword density checker",
    "essay word count",
  ],
  alternates: {
    canonical: "https://unitnov.com/generators/word-counter",
  },
  openGraph: {
    title: "Word Counter - Fast Word & Character Statistics Online",
    description: "Analyze word count, character count, and estimated reading time with live text statistics.",
    url: "https://unitnov.com/generators/word-counter",
  },
};

export default function WordCounterPage() {
  const faqs: FAQItem[] = [
    {
      question: "How is reading time calculated?",
      answer:
        "Average adult silent reading speed is estimated at 200 to 250 words per minute (WPM). UnitNov divides your total word count by 200 WPM to provide a realistic reading duration for blog posts, essays, and articles.",
    },
    {
      question: "What is the difference between characters with and without spaces?",
      answer:
        "Characters with spaces counts every single keystroke, including spacebar presses and tabs. Characters without spaces isolates only alphabetical letters, numbers, and punctuation marks, which is often required for academic assignments and publisher submissions.",
    },
    {
      question: "Does this tool work for essays, Twitter/X posts, and SEO meta descriptions?",
      answer:
        "Yes! It provides immediate feedback for platform length limits: 280 characters for Twitter/X, 150–160 characters for SEO meta descriptions, and custom limits for university admissions essays.",
    },
  ];

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: "UnitNov Word Counter",
      url: "https://unitnov.com/generators/word-counter",
      applicationCategory: "UtilitiesApplication",
      operatingSystem: "All",
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
      description:
        "Free online word and character counter tool to calculate words, characters with/without spaces, sentences, and estimated reading time.",
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
          { name: "Generators", href: "/generators" },
          { name: "Word Counter", href: "/generators/word-counter" },
        ]}
      />

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-semibold mb-3">
          <span>📝</span> Text & Writing Tool
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
          Word & Character Counter
        </h1>
        <p className="text-slate-400 text-sm md:text-base mt-2 max-w-2xl leading-relaxed">
          Count words, characters, sentences, paragraphs, and estimate reading and speaking times instantly.
        </p>
      </div>

      {/* Top Ad Slot */}
      <AdSlot label="Advertisement" format="horizontal" />

      {/* Word Counter Client */}
      <WordCounterClient />

      {/* Share & Export */}
      <ShareBar toolName="Word & Character Counter" className="my-6" />

      {/* Educational Guide Section & Formulas */}
      <article className="mt-16 pt-12 border-t border-white/[0.08] space-y-10 text-slate-300 leading-relaxed text-sm md:text-base">
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Reading & Speaking Speed Formulas
          </h2>
          <p className="mb-4">
            Reading and speaking times are calculated using empirical averages from psychological reading comprehension studies:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6 font-mono text-xs md:text-sm">
            <div className="bg-[#0F1117] border border-indigo-500/20 rounded-xl p-5 text-center text-indigo-300">
              <span className="font-sans font-semibold text-slate-400 block mb-2 text-xs uppercase tracking-wider">Silent Reading Time (225 WPM)</span>
              Reading Minutes = Total Words / 225
            </div>
            <div className="bg-[#0F1117] border border-indigo-500/20 rounded-xl p-5 text-center text-indigo-300">
              <span className="font-sans font-semibold text-slate-400 block mb-2 text-xs uppercase tracking-wider">Public Speaking Time (130 WPM)</span>
              Speech Minutes = Total Words / 130
            </div>
          </div>
        </section>

        {/* Worked Calculation Example */}
        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Step-by-Step Article Analysis Example
          </h2>
          <p className="mb-3">
            Suppose you compose an in-depth blog post or academic essay containing <strong>1,800 words</strong>:
          </p>
          <ol className="list-decimal pl-5 space-y-2 text-slate-400 text-xs md:text-sm">
            <li><strong>Silent reading duration:</strong> 1,800 words ÷ 225 WPM = <strong>8.0 minutes</strong>.</li>
            <li><strong>Public speaking duration:</strong> 1,800 words ÷ 130 WPM = <strong>13.8 minutes (≈ 13m 50s)</strong>.</li>
            <li><strong>Character estimation:</strong> At an English average of 5.1 characters per word, 1,800 words spans approximately <strong>9,180 characters (no spaces)</strong> and <strong>10,980 total characters</strong>.</li>
            <li><strong>Page layout estimate:</strong> Standard single-spaced A4 (500 words/page) = <strong>3.6 pages</strong>; double-spaced (250 words/page) = <strong>7.2 pages</strong>.</li>
          </ol>
        </section>

        <section className="bg-[#151926] border border-white/[0.08] rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-white mb-4">
            Standard Writing & Social Media Length Guidelines
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs">
            <div className="bg-[#1B2032] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="font-bold text-indigo-300 block">Social Media</span>
              <p className="text-slate-400">Twitter/X: 280 chars</p>
              <p className="text-slate-400">LinkedIn: ~3,000 chars</p>
              <p className="text-slate-400">Instagram: 2,200 chars</p>
            </div>
            <div className="bg-[#1B2032] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="font-bold text-emerald-300 block">SEO Standards</span>
              <p className="text-slate-400">Title Tag: 50–60 chars</p>
              <p className="text-slate-400">Meta Desc: 150–160 chars</p>
              <p className="text-slate-400">Blog Post: 1,500–2,500 words</p>
            </div>
            <div className="bg-[#1B2032] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="font-bold text-amber-300 block">Academics</span>
              <p className="text-slate-400">Abstract: 150–250 words</p>
              <p className="text-slate-400">Standard Essay: 500 words/page</p>
              <p className="text-slate-400">Research Paper: 3,000–8,000 words</p>
            </div>
            <div className="bg-[#1B2032] p-4 rounded-xl border border-white/5 space-y-1">
              <span className="font-bold text-violet-300 block">Speeches</span>
              <p className="text-slate-400">1 min speech: ~130 words</p>
              <p className="text-slate-400">5 min speech: ~650 words</p>
              <p className="text-slate-400">10 min speech: ~1,300 words</p>
            </div>
          </div>
        </section>

        {/* Second Ad Slot */}
        <AdSlot label="Sponsored Content" format="horizontal" />

        {/* FAQs */}
        <FAQAccordion items={faqs} />

        {/* Related Tools */}
        <section className="pt-8 border-t border-white/[0.08]">
          <h3 className="text-lg font-bold text-white mb-4">Related Utilities & Generators</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Link
              href="/converters/case-converter"
              className="bg-[#151926] border border-white/[0.08] rounded-xl p-4 hover:border-indigo-500/40 transition-colors"
            >
              <span className="text-xl block mb-1">🔠</span>
              <h4 className="font-semibold text-white text-sm">Case Converter</h4>
              <p className="text-xs text-slate-400 mt-1">Convert text between UPPERCASE, camelCase, etc.</p>
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
