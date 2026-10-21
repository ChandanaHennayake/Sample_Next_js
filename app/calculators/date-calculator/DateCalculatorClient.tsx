"use client";

import { useState, useMemo } from "react";
import { useToast } from "@/src/components/Toast";

function parseLocalDate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return isNaN(d.getTime()) ? null : d;
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function toInputValue(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export default function DateCalculatorClient() {
  const [mode, setMode] = useState<"between" | "addSubtract">("between");
  const { toast } = useToast();

  const today = useMemo(() => new Date(), []);
  const defaultEnd = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d;
  }, []);

  // Mode 1: Duration between dates
  const [startDateStr, setStartDateStr] = useState<string>(toInputValue(today));
  const [endDateStr, setEndDateStr] = useState<string>(toInputValue(defaultEnd));

  // Mode 2: Add / Subtract
  const [baseDateStr, setBaseDateStr] = useState<string>(toInputValue(today));
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [daysCount, setDaysCount] = useState<number>(30);

  // Calculation for Mode 1
  const betweenResult = useMemo(() => {
    const start = parseLocalDate(startDateStr);
    const end = parseLocalDate(endDateStr);
    if (!start || !end) return null;

    const diffMs = end.getTime() - start.getTime();
    const diffDays = Math.round(diffMs / (1000 * 60 * 60 * 24));

    // Count business days (Mon-Fri)
    let businessDays = 0;
    const cur = new Date(Math.min(start.getTime(), end.getTime()));
    const target = new Date(Math.max(start.getTime(), end.getTime()));
    while (cur < target) {
      cur.setDate(cur.getDate() + 1);
      const day = cur.getDay();
      if (day !== 0 && day !== 6) {
        businessDays++;
      }
    }

    const weeks = Math.floor(Math.abs(diffDays) / 7);
    const remainingDays = Math.abs(diffDays) % 7;

    return {
      totalDays: Math.abs(diffDays),
      isNegative: diffDays < 0,
      businessDays,
      weekendDays: Math.abs(diffDays) - businessDays,
      weeks,
      remainingDays,
    };
  }, [startDateStr, endDateStr]);

  // Calculation for Mode 2
  const addSubtractResult = useMemo(() => {
    const base = parseLocalDate(baseDateStr);
    if (!base) return null;

    const target = new Date(base.getTime());
    const offset = operation === "add" ? daysCount : -daysCount;
    target.setDate(target.getDate() + offset);

    return {
      targetDateFormatted: formatDate(target),
      targetIso: toInputValue(target),
    };
  }, [baseDateStr, operation, daysCount]);

  const copyResult = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast("Date calculation copied!"))
      .catch(() => toast("Couldn't access clipboard", "error"));
  };

  return (
    <div className="bg-[#151926] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/20">
      {/* Mode Switcher */}
      <div className="flex items-center justify-center gap-2 mb-8">
        <button
          type="button"
          onClick={() => setMode("between")}
          className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            mode === "between"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
              : "bg-[#1B2032] text-slate-400 hover:text-white border border-white/5"
          }`}
        >
          Days Between Two Dates
        </button>
        <button
          type="button"
          onClick={() => setMode("addSubtract")}
          className={`px-5 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
            mode === "addSubtract"
              ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
              : "bg-[#1B2032] text-slate-400 hover:text-white border border-white/5"
          }`}
        >
          Add / Subtract Days
        </button>
      </div>

      {mode === "between" ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Inputs */}
          <div className="lg:col-span-6 space-y-4">
            <div>
              <label htmlFor="startDate" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Start Date
              </label>
              <input
                id="startDate"
                type="date"
                value={startDateStr}
                onChange={(e) => setStartDateStr(e.target.value)}
                className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="endDate" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                End Date
              </label>
              <input
                id="endDate"
                type="date"
                value={endDateStr}
                onChange={(e) => setEndDateStr(e.target.value)}
                className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
              />
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-6 bg-[#1B2032] border border-white/[0.08] rounded-2xl p-6">
            {betweenResult ? (
              <div className="space-y-4">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
                  Total Duration
                </span>
                <div className="text-4xl md:text-5xl font-black text-white tracking-tight tabular-nums">
                  {betweenResult.totalDays}{" "}
                  <span className="text-xl font-normal text-slate-400">Days</span>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="bg-[#121520] p-3 rounded-xl border border-white/5 text-center">
                    <span className="text-base font-bold text-emerald-400 tabular-nums">
                      {betweenResult.businessDays}
                    </span>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                      Business Days (M-F)
                    </span>
                  </div>

                  <div className="bg-[#121520] p-3 rounded-xl border border-white/5 text-center">
                    <span className="text-base font-bold text-slate-300 tabular-nums">
                      {betweenResult.weeks}w {betweenResult.remainingDays}d
                    </span>
                    <span className="block text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                      Weeks & Days
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    copyResult(
                      `Duration: ${betweenResult.totalDays} days (${betweenResult.businessDays} business days) between ${startDateStr} and ${endDateStr}`
                    )
                  }
                  className="w-full mt-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold transition-colors cursor-pointer"
                >
                  Copy Summary
                </button>
              </div>
            ) : (
              <div className="text-center text-slate-400 text-sm py-8">Select valid dates</div>
            )}
          </div>
        </div>
      ) : (
        /* Mode 2: Add or Subtract Days */
        <div className="max-w-xl mx-auto space-y-6">
          <div>
            <label htmlFor="baseDate" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
              Starting Date
            </label>
            <input
              id="baseDate"
              type="date"
              value={baseDateStr}
              onChange={(e) => setBaseDateStr(e.target.value)}
              className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-3 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500 cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="operationSelect" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Operation
              </label>
              <select
                id="operationSelect"
                value={operation}
                onChange={(e) => setOperation(e.target.value as "add" | "subtract")}
                className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-3 py-2.5 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
              >
                <option value="add">Add (+)</option>
                <option value="subtract">Subtract (-)</option>
              </select>
            </div>

            <div>
              <label htmlFor="daysCountInput" className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5">
                Number of Days
              </label>
              <input
                id="daysCountInput"
                type="number"
                inputMode="numeric"
                min={1}
                max={10000}
                value={daysCount}
                onChange={(e) => setDaysCount(Math.max(1, Number(e.target.value)))}
                className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-2 text-sm font-bold text-white focus:outline-none focus:border-indigo-500"
              />
            </div>
          </div>

          {/* Quick Presets */}
          <div className="flex flex-wrap gap-1.5">
            {[7, 14, 30, 60, 90, 180, 365].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDaysCount(d)}
                className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                  daysCount === d
                    ? "bg-indigo-600/30 text-indigo-300 border-indigo-500/40 font-semibold"
                    : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10"
                }`}
              >
                {d} days
              </button>
            ))}
          </div>

          {/* Result Card */}
          {addSubtractResult && (
            <div className="bg-[#1B2032] border border-indigo-500/30 rounded-2xl p-6 text-center">
              <span className="text-xs uppercase font-semibold tracking-wider text-indigo-400 block mb-1">
                Target Date
              </span>
              <div className="text-2xl md:text-3xl font-black text-white">
                {addSubtractResult.targetDateFormatted}
              </div>
              <p className="text-xs text-slate-400 mt-2">
                {daysCount} days {operation === "add" ? "after" : "before"} {baseDateStr}
              </p>
              <button
                type="button"
                onClick={() => copyResult(`Target Date: ${addSubtractResult.targetDateFormatted}`)}
                className="mt-4 px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-slate-300 font-medium transition-colors"
              >
                Copy Date
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
