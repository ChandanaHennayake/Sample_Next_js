"use client";

import { useState, useMemo } from "react";
import { useToast } from "@/src/components/Toast";

export default function WordCounterClient() {
  const [text, setText] = useState<string>(
    "UnitNov provides fast, privacy-first online tools and calculators. Every calculation runs entirely in your web browser with zero server latency."
  );
  const { toast } = useToast();

  const stats = useMemo(() => {
    const raw = text.trim();
    if (!raw) {
      return {
        words: 0,
        charsWithSpaces: 0,
        charsNoSpaces: 0,
        sentences: 0,
        paragraphs: 0,
        readingTimeMinutes: 0,
        speakingTimeMinutes: 0,
        keywordDensity: [],
      };
    }

    const wordsArray = raw.match(/\b[a-zA-Z0-9_\u00C0-\u017F'-]+\b/g) || [];
    const words = wordsArray.length;
    const charsWithSpaces = text.length;
    const charsNoSpaces = text.replace(/\s/g, "").length;
    const sentences = (text.match(/[^.!?]+[.!?]+(\s|$)/g) || []).length || (raw ? 1 : 0);
    const paragraphs = text.split(/\n+/).filter((p) => p.trim().length > 0).length || (raw ? 1 : 0);

    // 200 words per minute average reading speed
    const readingTimeMinutes = Math.max(0.1, Math.round((words / 200) * 10) / 10);
    // 130 words per minute average speaking speed
    const speakingTimeMinutes = Math.max(0.1, Math.round((words / 130) * 10) / 10);

    // Calculate top keywords (excluding small common stop words)
    const stopWords = new Set(["the", "and", "a", "an", "in", "to", "of", "is", "for", "on", "it", "with", "as", "at", "by", "this", "that", "from", "or", "your", "be", "are"]);
    const frequencyMap: Record<string, number> = {};
    wordsArray.forEach((w) => {
      const lower = w.toLowerCase();
      if (lower.length > 2 && !stopWords.has(lower)) {
        frequencyMap[lower] = (frequencyMap[lower] || 0) + 1;
      }
    });

    const keywordDensity = Object.entries(frequencyMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([word, count]) => ({
        word,
        count,
        percent: Math.round((count / Math.max(1, words)) * 100),
      }));

    return {
      words,
      charsWithSpaces,
      charsNoSpaces,
      sentences,
      paragraphs,
      readingTimeMinutes,
      speakingTimeMinutes,
      keywordDensity,
    };
  }, [text]);

  const copyText = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast("Text copied to clipboard!"))
      .catch(() => toast("Couldn't access clipboard", "error"));
  };

  const clearText = () => {
    setText("");
    toast("Text cleared", "info");
  };

  const transformCase = (type: "upper" | "lower" | "title" | "clean") => {
    if (type === "upper") setText(text.toUpperCase());
    if (type === "lower") setText(text.toLowerCase());
    if (type === "title") {
      setText(
        text.replace(
          /\w\S*/g,
          (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
        )
      );
    }
    if (type === "clean") {
      setText(text.replace(/\s+/g, " ").trim());
    }
    toast("Case transformed!");
  };

  return (
    <div className="bg-[#151926] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/20">
      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-6">
        <div className="bg-[#1B2032] border border-white/5 rounded-2xl p-4 text-center">
          <span className="text-3xl font-black text-white tabular-nums">{stats.words}</span>
          <span className="block text-[10px] uppercase font-semibold tracking-wider text-slate-400 mt-1">
            Words
          </span>
        </div>

        <div className="bg-[#1B2032] border border-white/5 rounded-2xl p-4 text-center">
          <span className="text-3xl font-black text-indigo-400 tabular-nums">{stats.charsWithSpaces}</span>
          <span className="block text-[10px] uppercase font-semibold tracking-wider text-slate-400 mt-1">
            Characters
          </span>
        </div>

        <div className="bg-[#1B2032] border border-white/5 rounded-2xl p-4 text-center">
          <span className="text-3xl font-black text-slate-300 tabular-nums">{stats.charsNoSpaces}</span>
          <span className="block text-[10px] uppercase font-semibold tracking-wider text-slate-400 mt-1">
            No Spaces
          </span>
        </div>

        <div className="bg-[#1B2032] border border-white/5 rounded-2xl p-4 text-center">
          <span className="text-3xl font-black text-white tabular-nums">{stats.sentences}</span>
          <span className="block text-[10px] uppercase font-semibold tracking-wider text-slate-400 mt-1">
            Sentences
          </span>
        </div>

        <div className="bg-[#1B2032] border border-white/5 rounded-2xl p-4 text-center">
          <span className="text-3xl font-black text-white tabular-nums">{stats.paragraphs}</span>
          <span className="block text-[10px] uppercase font-semibold tracking-wider text-slate-400 mt-1">
            Paragraphs
          </span>
        </div>

        <div className="bg-[#1B2032] border border-white/5 rounded-2xl p-4 text-center">
          <span className="text-3xl font-black text-emerald-400 tabular-nums">~{stats.readingTimeMinutes}m</span>
          <span className="block text-[10px] uppercase font-semibold tracking-wider text-slate-400 mt-1">
            Reading Time
          </span>
        </div>
      </div>

      {/* Text Area */}
      <div className="relative mb-4">
        <textarea
          rows={8}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Paste or type your text here to begin live analysis..."
          className="w-full bg-[#1B2032] border border-white/10 rounded-2xl p-5 text-sm md:text-base text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all resize-y leading-relaxed"
        />
      </div>

      {/* Quick Action Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <div className="flex flex-wrap items-center gap-1.5">
          <button
            type="button"
            onClick={() => transformCase("upper")}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors border border-white/5"
          >
            UPPERCASE
          </button>
          <button
            type="button"
            onClick={() => transformCase("lower")}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors border border-white/5"
          >
            lowercase
          </button>
          <button
            type="button"
            onClick={() => transformCase("title")}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors border border-white/5"
          >
            Title Case
          </button>
          <button
            type="button"
            onClick={() => transformCase("clean")}
            className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-xs font-semibold text-slate-300 transition-colors border border-white/5"
          >
            Clean Spaces
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={copyText}
            className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors shadow-md shadow-indigo-500/20"
          >
            Copy Text
          </button>
          <button
            type="button"
            onClick={clearText}
            className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs transition-colors"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Top Keywords Strip */}
      {stats.keywordDensity.length > 0 && (
        <div className="mt-8 pt-6 border-t border-white/[0.06]">
          <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-3">
            Top Keyword Density
          </span>
          <div className="flex flex-wrap gap-2">
            {stats.keywordDensity.map((kw) => (
              <span
                key={kw.word}
                className="px-3 py-1.5 rounded-xl bg-[#1B2032] border border-white/5 text-xs text-slate-300 flex items-center gap-2"
              >
                <strong>{kw.word}</strong>
                <span className="text-[10px] text-indigo-400 bg-indigo-500/10 px-1.5 py-0.5 rounded-md">
                  {kw.count}× ({kw.percent}%)
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
