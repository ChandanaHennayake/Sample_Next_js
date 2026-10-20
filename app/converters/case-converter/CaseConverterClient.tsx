"use client";

import { useState, useMemo } from "react";
import { useToast } from "@/src/components/Toast";

export default function CaseConverterClient() {
  const [input, setInput] = useState<string>("free online developer tools and calculators");
  const { toast } = useToast();

  const conversions = useMemo(() => {
    const raw = input.trim();
    if (!raw) {
      return {
        upper: "",
        lower: "",
        title: "",
        sentence: "",
        camel: "",
        kebab: "",
        snake: "",
        pascal: "",
      };
    }

    // Split into clean words array
    const words = raw
      .replace(/([a-z])([A-Z])/g, "$1 $2")
      .replace(/[_\-]+/g, " ")
      .trim()
      .split(/\s+/);

    const upper = input.toUpperCase();
    const lower = input.toLowerCase();

    // Title Case
    const title = input.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );

    // Sentence case
    const sentence = input
      .toLowerCase()
      .replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase());

    // camelCase
    const camel = words
      .map((w, idx) =>
        idx === 0
          ? w.toLowerCase()
          : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()
      )
      .join("");

    // kebab-case
    const kebab = words.map((w) => w.toLowerCase()).join("-");

    // snake_case
    const snake = words.map((w) => w.toLowerCase()).join("_");

    // PascalCase
    const pascal = words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
      .join("");

    return {
      upper,
      lower,
      title,
      sentence,
      camel,
      kebab,
      snake,
      pascal,
    };
  }, [input]);

  const copyResult = (text: string, label: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast(`${label} copied to clipboard!`))
      .catch(() => toast("Couldn't access clipboard", "error"));
  };

  const caseFormats = [
    { id: "upper", label: "UPPERCASE", value: conversions.upper, desc: "ALL CAPITAL LETTERS" },
    { id: "lower", label: "lowercase", value: conversions.lower, desc: "all small letters" },
    { id: "title", label: "Title Case", value: conversions.title, desc: "Capitalize The First Letter Of Each Word" },
    { id: "sentence", label: "Sentence case", value: conversions.sentence, desc: "Capitalize the first letter of each sentence." },
    { id: "camel", label: "camelCase", value: conversions.camel, desc: "firstWordLowerThenCapitalized" },
    { id: "kebab", label: "kebab-case", value: conversions.kebab, desc: "words-separated-by-hyphens" },
    { id: "snake", label: "snake_case", value: conversions.snake, desc: "words_separated_by_underscores" },
    { id: "pascal", label: "PascalCase", value: conversions.pascal, desc: "FirstLetterOfEveryWordCapitalized" },
  ];

  return (
    <div className="bg-[#151926] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/20 space-y-6">
      {/* Input Area */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="textInput" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
            Enter or Paste Text
          </label>
          <span className="text-xs text-slate-400">
            {input.length} characters • {input.trim() ? input.trim().split(/\s+/).length : 0} words
          </span>
        </div>
        <textarea
          id="textInput"
          rows={3}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type or paste your text here..."
          className="w-full bg-[#1B2032] border border-white/10 rounded-2xl p-4 text-sm md:text-base text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y"
        />
      </div>

      {/* Conversion Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {caseFormats.map((fmt) => (
          <div
            key={fmt.id}
            className="p-4 rounded-2xl bg-[#1B2032] border border-white/5 hover:border-white/10 transition-colors flex flex-col justify-between"
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                {fmt.label}
              </span>
              <span className="text-[10px] text-slate-500">{fmt.desc}</span>
            </div>

            <div className="font-mono text-sm text-white break-all my-2 select-all line-clamp-2">
              {fmt.value || <span className="text-slate-600 font-sans text-xs">Enter text above...</span>}
            </div>

            <div className="pt-2 border-t border-white/5 flex justify-end">
              <button
                type="button"
                onClick={() => copyResult(fmt.value, fmt.label)}
                className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
              >
                Copy {fmt.label}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
