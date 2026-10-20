import type { Metadata } from "next";
import Link from "next/link";
import ToolsDirectory from "@/src/components/ToolsDirectory";

export const metadata: Metadata = {
  title: "Online Generators - Passwords, QR Codes & Text Tools | UnitNov",
  description:
    "Free developer and utility generators including strong password generators, customizable QR code makers, word counters, and text tools.",
  alternates: {
    canonical: "https://unitnov.com/generators",
  },
};

export default function GeneratorsPage() {
  const upcomingRoadmap = [
    {
      name: "Client-Side Image Compressor",
      desc: "Compress JPEG, PNG, and WebP images directly in the browser using HTML5 Canvas with zero server uploads.",
      icon: "🖼️",
      status: "Next Release",
    },
    {
      name: "PDF Merger & Splitter",
      desc: "Merge multiple PDF documents or split pages into separate files 100% locally using WebAssembly.",
      icon: "📄",
      status: "Next Release",
    },
    {
      name: "UUID / GUID Generator",
      desc: "Generate bulk v4 UUIDs for developer databases, API keys, and testing with 1-click clipboard copy.",
      icon: "⚡",
      status: "Planned",
    },
    {
      name: "Lorem Ipsum & Mock Text",
      desc: "Generate placeholder paragraphs, words, and sentences for website mockups and typography layouts.",
      icon: "📝",
      status: "Planned",
    },
  ];

  return (
    <div>
      <ToolsDirectory
        initialCategory="generators"
        title="Developer & Utility Generators"
        description="Instant utilities to generate secure passwords, QR codes, and text statistics right in your browser."
      />

      {/* Upcoming Section */}
      <div className="mt-16 pt-12 border-t border-white/[0.08]">
        <div className="text-center mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-3 py-1 rounded-full border border-indigo-500/20">
            Roadmap
          </span>
          <h2 className="text-2xl font-bold text-white mt-3">Upcoming Media & Data Tools</h2>
          <p className="text-slate-400 text-sm max-w-md mx-auto mt-1">
            Browser-based tools currently scheduled for our next release.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingRoadmap.map((gen) => (
            <div
              key={gen.name}
              className="bg-[#151926]/60 border border-white/[0.06] rounded-2xl p-6 flex items-start gap-4"
            >
              <div className="text-3xl p-2 rounded-xl bg-white/5 border border-white/5">
                {gen.icon}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-base font-semibold text-white">{gen.name}</h3>
                  <span className="text-[10px] font-semibold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                    {gen.status}
                  </span>
                </div>
                <p className="text-slate-400 text-xs leading-relaxed">{gen.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-medium text-indigo-400 hover:text-indigo-300"
          >
            Have a specific tool or calculation requirement? Let us know →
          </Link>
        </div>
      </div>
    </div>
  );
}
