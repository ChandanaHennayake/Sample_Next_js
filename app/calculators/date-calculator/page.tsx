'use client';

import { useState } from 'react';

interface DateResult {
  days: number;
  weeks: number;
  months: number;
}

export default function DateCalculator() {
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const [result, setResult] = useState<DateResult | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    setResult(null);

    if (!start || !end) {
      setError('Please select both dates.');
      return;
    }

    const startDate = new Date(start);
    const endDate = new Date(end);

    const diffMs =
      endDate.getTime() - startDate.getTime();

    const diffDays = Math.round(
      diffMs / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) {
      setError('End date must be after start date.');
      return;
    }

    setResult({
      days: diffDays,
      weeks: Math.floor(diffDays / 7),
      months: Math.floor(diffDays / 30.44),
    });
  };

  const clearResult = () => {
    setError('');
    if (result) setResult(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1117] px-4 py-12">
      <div className="w-full max-w-md bg-[#1a1d27] border border-white/10 rounded-2xl p-8">

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl mx-auto mb-5">
          📅
        </div>

        <h1 className="text-xl font-semibold text-white text-center mb-1">
          Date Calculator
        </h1>

        <p className="text-sm text-slate-400 text-center mb-7">
          Calculate the difference between two dates
        </p>

        {/* Start Date */}
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Start Date
        </label>

        <input
          type="date"
          value={start}
          onChange={(e) => {
            setStart(e.target.value);
            clearResult();
          }}
          className="
            w-full bg-[#22263a] border border-white/10 rounded-xl
            px-4 py-3.5 text-white
            outline-none focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-500/20
            transition-all mb-4
          "
        />

        {/* End Date */}
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          End Date
        </label>

        <input
          type="date"
          value={end}
          onChange={(e) => {
            setEnd(e.target.value);
            clearResult();
          }}
          className="
            w-full bg-[#22263a] border border-white/10 rounded-xl
            px-4 py-3.5 text-white
            outline-none focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-500/20
            transition-all
          "
        />

        {/* Error */}
        <p
          role="alert"
          className="text-xs text-red-400 mt-2 min-h-[1.25rem]"
        >
          {error}
        </p>

        {/* Button */}
        <button
          onClick={calculate}
          className="
            mt-4 w-full bg-indigo-600 hover:bg-indigo-500
            active:scale-[0.98]
            text-white font-semibold text-[15px]
            rounded-xl py-3.5 transition-all duration-150
            cursor-pointer border-none
          "
        >
          Calculate Difference
        </button>

        {/* Results */}
        {result && (
          <div className="mt-7 pt-7 border-t border-white/10 flex flex-col gap-4 animate-fade-up">

            <div className="text-center">
              <div className="text-7xl font-bold text-white tracking-tight leading-none">
                {result.days.toLocaleString()}
              </div>

              <div className="text-sm text-slate-400 mt-1">
                days
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">

              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-sm font-semibold text-white">
                  {new Date(start).toLocaleDateString()}
                </div>

                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Start
                </div>
              </div>

              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-sm font-semibold text-white">
                  {new Date(end).toLocaleDateString()}
                </div>

                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  End
                </div>
              </div>

              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-lg font-semibold text-white">
                  {result.weeks}
                </div>

                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Weeks
                </div>
              </div>

            </div>

            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3 text-sm text-indigo-300 flex items-center gap-2">
              ⏳ Approximately {result.months} month
              {result.months !== 1 ? 's' : ''} between these dates
            </div>

          </div>
        )}
      </div>
    </div>
  );
}