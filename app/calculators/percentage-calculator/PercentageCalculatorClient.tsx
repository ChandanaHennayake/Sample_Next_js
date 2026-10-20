"use client";

import { useState } from "react";
import { useToast } from "@/src/components/Toast";

export default function PercentageCalculatorClient() {
  const [activeTab, setActiveTab] = useState<"whatIs" | "isWhatPercent" | "change">("whatIs");
  const { toast } = useToast();

  // Mode 1: What is P% of X?
  const [m1Percent, setM1Percent] = useState<number>(15);
  const [m1Value, setM1Value] = useState<number>(120);

  // Mode 2: X is what percent of Y?
  const [m2Part, setM2Part] = useState<number>(25);
  const [m2Whole, setM2Whole] = useState<number>(200);

  // Mode 3: Percentage Change from X to Y
  const [m3Initial, setM3Initial] = useState<number>(50);
  const [m3Final, setM3Final] = useState<number>(75);

  const copyResult = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast("Result copied to clipboard!"))
      .catch(() => toast("Couldn't access clipboard", "error"));
  };

  // Calculations
  const m1Result = Math.round(((m1Percent / 100) * m1Value) * 100) / 100;

  const m2Result =
    m2Whole !== 0 ? Math.round(((m2Part / m2Whole) * 100) * 100) / 100 : 0;

  const m3Diff = m3Final - m3Initial;
  const m3PercentChange =
    m3Initial !== 0 ? Math.round(((m3Diff / Math.abs(m3Initial)) * 100) * 100) / 100 : 0;
  const isIncrease = m3Diff >= 0;

  return (
    <div className="bg-[#151926] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/20">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        <button
          type="button"
          onClick={() => setActiveTab("whatIs")}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === "whatIs"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
              : "bg-[#1B2032] text-slate-400 hover:text-white border border-white/5"
          }`}
        >
          What is X% of Y?
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("isWhatPercent")}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === "isWhatPercent"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
              : "bg-[#1B2032] text-slate-400 hover:text-white border border-white/5"
          }`}
        >
          X is what % of Y?
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("change")}
          className={`px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            activeTab === "change"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
              : "bg-[#1B2032] text-slate-400 hover:text-white border border-white/5"
          }`}
        >
          % Increase / Decrease
        </button>
      </div>

      {/* Mode 1: What is X% of Y? */}
      {activeTab === "whatIs" && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="m1Percent" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Percentage (%)
              </label>
              <input
                id="m1Percent"
                type="number"
                value={m1Percent}
                onChange={(e) => setM1Percent(Number(e.target.value))}
                className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-3 text-lg font-bold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="m1Value" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Of Number
              </label>
              <input
                id="m1Value"
                type="number"
                value={m1Value}
                onChange={(e) => setM1Value(Number(e.target.value))}
                className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-3 text-lg font-bold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#1B2032] border border-indigo-500/30 rounded-2xl p-6 text-center">
            <span className="text-xs uppercase font-semibold tracking-wider text-indigo-400 block mb-1">
              Answer
            </span>
            <div className="text-4xl md:text-5xl font-black text-white tabular-nums">
              {m1Result.toLocaleString()}
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {m1Percent}% of {m1Value} is <strong>{m1Result}</strong>
            </p>
            <button
              type="button"
              onClick={() => copyResult(`${m1Percent}% of ${m1Value} = ${m1Result}`)}
              className="mt-4 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-medium transition-colors"
            >
              Copy Result
            </button>
          </div>
        </div>
      )}

      {/* Mode 2: X is what percent of Y? */}
      {activeTab === "isWhatPercent" && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="m2Part" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Part (X)
              </label>
              <input
                id="m2Part"
                type="number"
                value={m2Part}
                onChange={(e) => setM2Part(Number(e.target.value))}
                className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-3 text-lg font-bold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="m2Whole" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Whole (Y)
              </label>
              <input
                id="m2Whole"
                type="number"
                value={m2Whole}
                onChange={(e) => setM2Whole(Number(e.target.value))}
                className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-3 text-lg font-bold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#1B2032] border border-indigo-500/30 rounded-2xl p-6 text-center">
            <span className="text-xs uppercase font-semibold tracking-wider text-indigo-400 block mb-1">
              Percentage
            </span>
            <div className="text-4xl md:text-5xl font-black text-white tabular-nums">
              {m2Result}%
            </div>
            <p className="text-xs text-slate-400 mt-2">
              {m2Part} is <strong>{m2Result}%</strong> of {m2Whole}
            </p>
            <button
              type="button"
              onClick={() => copyResult(`${m2Part} is ${m2Result}% of ${m2Whole}`)}
              className="mt-4 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-medium transition-colors"
            >
              Copy Result
            </button>
          </div>
        </div>
      )}

      {/* Mode 3: Percentage Change */}
      {activeTab === "change" && (
        <div className="max-w-xl mx-auto space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="m3Initial" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Initial Value
              </label>
              <input
                id="m3Initial"
                type="number"
                value={m3Initial}
                onChange={(e) => setM3Initial(Number(e.target.value))}
                className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-3 text-lg font-bold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="m3Final" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Final Value
              </label>
              <input
                id="m3Final"
                type="number"
                value={m3Final}
                onChange={(e) => setM3Final(Number(e.target.value))}
                className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-3 text-lg font-bold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Result Card */}
          <div className="bg-[#1B2032] border border-indigo-500/30 rounded-2xl p-6 text-center">
            <span className="text-xs uppercase font-semibold tracking-wider text-indigo-400 block mb-1">
              Percentage {isIncrease ? "Increase" : "Decrease"}
            </span>
            <div
              className={`text-4xl md:text-5xl font-black tabular-nums ${
                isIncrease ? "text-emerald-400" : "text-rose-400"
              }`}
            >
              {isIncrease ? "+" : ""}
              {m3PercentChange}%
            </div>
            <p className="text-xs text-slate-400 mt-2">
              From {m3Initial} to {m3Final} is a difference of {Math.abs(m3Diff)} (
              {isIncrease ? "increase" : "decrease"} of {Math.abs(m3PercentChange)}%)
            </p>
            <button
              type="button"
              onClick={() => copyResult(`Percentage change from ${m3Initial} to ${m3Final}: ${m3PercentChange}%`)}
              className="mt-4 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-medium transition-colors"
            >
              Copy Result
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
