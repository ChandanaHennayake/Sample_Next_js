"use client";

import { useState, useMemo, useSyncExternalStore } from "react";
import { useToast } from "@/src/components/Toast";

const DAY_MS = 1000 * 60 * 60 * 24;

// "now" is read only on the client (server snapshot = 0) so the statically
// prerendered HTML never bakes in the build date. Refreshes every minute.
let nowCache = 0;
function subscribeNow(cb: () => void) {
  nowCache = Date.now();
  const id = setInterval(() => {
    nowCache = Date.now();
    cb();
  }, 60_000);
  return () => clearInterval(id);
}
const getNow = () => nowCache || (nowCache = Date.now());
const getServerNow = () => 0;

/** Parse "YYYY-MM-DD" as a LOCAL date (new Date(str) would treat it as UTC). */
function parseLocalDate(value: string): Date | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(value);
  if (!m) return null;
  const d = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  return isNaN(d.getTime()) ? null : d;
}

function toInputValue(d: Date) {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
}

export default function AgeCalculatorClient() {
  const [birthDate, setBirthDate] = useState<string>("1998-05-15");
  const [copied, setCopied] = useState<boolean>(false);
  const { toast } = useToast();
  const nowMs = useSyncExternalStore(subscribeNow, getNow, getServerNow);

  const result = useMemo(() => {
    if (!birthDate || !nowMs) return null;
    const birth = parseLocalDate(birthDate);
    const now = new Date(nowMs);
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());

    if (!birth || birth > today) {
      return null;
    }

    // Exact years, months, days calculation
    let years = today.getFullYear() - birth.getFullYear();
    let months = today.getMonth() - birth.getMonth();
    let days = today.getDate() - birth.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Total units
    const diffMs = now.getTime() - birth.getTime();
    const totalDays = Math.round((today.getTime() - birth.getTime()) / DAY_MS);
    const totalWeeks = Math.floor(totalDays / 7);
    const totalHours = Math.floor(diffMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor(diffMs / (1000 * 60));

    // Next birthday (compare calendar days, so "today" counts as 0 days away)
    let nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday < today) {
      nextBirthday = new Date(today.getFullYear() + 1, birth.getMonth(), birth.getDate());
    }
    const daysUntilBirthday = Math.round((nextBirthday.getTime() - today.getTime()) / DAY_MS);

    // Day of the week born
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const bornDayName = daysOfWeek[birth.getDay()];

    return {
      years,
      months,
      days,
      totalMonths: years * 12 + months,
      totalWeeks,
      totalDays,
      totalHours,
      totalMinutes,
      daysUntilBirthday,
      bornDayName,
    };
  }, [birthDate, nowMs]);

  const copySummary = () => {
    if (!result) return;
    const text = `UnitNov Age Calculation:
• Exact Age: ${result.years} years, ${result.months} months, ${result.days} days
• Total Days Lived: ${result.totalDays.toLocaleString()} days
• Total Hours Lived: ${result.totalHours.toLocaleString()} hours
• Born on a: ${result.bornDayName}
• Next Birthday in: ${result.daysUntilBirthday} days
Calculated free at https://unitnov.com/calculators/age-calculator`;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        toast("Age breakdown copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => toast("Couldn't access the clipboard", "error"));
  };

  return (
    <div className="bg-[#151926] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Column */}
        <div className="lg:col-span-5 space-y-5">
          <div>
            <label htmlFor="birthDateInput" className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
              Select Your Date of Birth
            </label>
            <input
              id="birthDateInput"
              type="date"
              value={birthDate}
              max={nowMs ? toInputValue(new Date(nowMs)) : undefined}
              onChange={(e) => setBirthDate(e.target.value)}
              className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-3.5 text-base font-semibold text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all cursor-pointer"
            />
          </div>

          <div className="bg-[#121520] border border-white/5 rounded-xl p-4 text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-indigo-400 font-medium">
              <span>💡</span>
              <span>Did you know?</span>
            </div>
            <p>
              Your exact chronological age changes every second. UnitNov accounts for leap years and varying month lengths to give precise day-level accuracy.
            </p>
          </div>

          {result && (
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl p-4 text-xs text-indigo-300 flex items-center justify-between">
              <span>📅 Born on a:</span>
              <strong className="text-white text-sm">{result.bornDayName}</strong>
            </div>
          )}
        </div>

        {/* Results Column */}
        <div className="lg:col-span-7 bg-[#1B2032] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between">
          {result ? (
            <div className="space-y-6">
              {/* Primary Large Age Metric */}
              <div className="text-center md:text-left">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
                  Your Chronological Age
                </span>
                <div className="text-4xl md:text-5xl font-black text-white tracking-tight mt-1 mb-1">
                  {result.years}{" "}
                  <span className="text-xl font-normal text-slate-400">years,</span>{" "}
                  {result.months}{" "}
                  <span className="text-xl font-normal text-slate-400">months,</span>{" "}
                  {result.days}{" "}
                  <span className="text-xl font-normal text-slate-400">days</span>
                </div>
              </div>

              {/* Total Units Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#121520] border border-white/5 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white tabular-nums">
                    {result.totalDays.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                    Days Lived
                  </div>
                </div>

                <div className="bg-[#121520] border border-white/5 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white tabular-nums">
                    {result.totalWeeks.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                    Weeks
                  </div>
                </div>

                <div className="bg-[#121520] border border-white/5 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-white tabular-nums">
                    {result.totalHours.toLocaleString()}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                    Hours
                  </div>
                </div>

                <div className="bg-[#121520] border border-white/5 rounded-xl p-3 text-center">
                  <div className="text-lg font-bold text-indigo-400 tabular-nums">
                    {result.daysUntilBirthday}
                  </div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">
                    Days to Birthday
                  </div>
                </div>
              </div>

              {/* Next Birthday Banner */}
              <div className="bg-gradient-to-r from-indigo-500/10 via-violet-500/10 to-transparent border border-indigo-500/20 rounded-xl p-4 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎂</span>
                  <span>
                    Next Birthday Countdown: <strong>{result.daysUntilBirthday} days</strong> remaining
                  </span>
                </div>
              </div>

              {/* Action Bar */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center gap-3">
                <button
                  onClick={copySummary}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-md shadow-indigo-500/20"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
                    />
                  </svg>
                  <span>{copied ? "Copied to Clipboard!" : "Copy Age Breakdown"}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 text-sm">
              Please choose a valid birth date on the left to see your age breakdown.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
