'use client';

import { useState, KeyboardEvent } from 'react';

interface AgeResult {
  age: number;
  months: number;
  weeks: number;
  days: number;
  daysUntilBirthday: number;
}

export default function AgeCalculator() {
  const [year, setYear] = useState('');
  const [result, setResult] = useState<AgeResult | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    setResult(null);

    const yr = parseInt(year, 10);
    const now = new Date();
    const curYr = now.getFullYear();

    if (!year || isNaN(yr)) {
      setError('Please enter a birth year.');
      return;
    }
    if (yr < 1900) {
      setError('Please enter a year after 1900.');
      return;
    }
    if (yr > curYr) {
      setError("Birth year can't be in the future.");
      return;
    }

    const age = curYr - yr;
    const birthDateThisYear = new Date(yr, now.getMonth(), now.getDate());
    const totalDays = Math.round(
      (now.getTime() - birthDateThisYear.getTime()) / 86_400_000
    );
    const nextBirthday = new Date(curYr + 1, now.getMonth(), now.getDate());
    const daysUntilBirthday = Math.round(
      (nextBirthday.getTime() - now.getTime()) / 86_400_000
    );

    setResult({
      age,
      months: age * 12,
      weeks: Math.round(totalDays / 7),
      days: totalDays,
      daysUntilBirthday,
    });
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') calculate();
  };

  const handleChange = (val: string) => {
    setYear(val);
    setError('');
    if (result) setResult(null);
  };

  const bdayText =
    result?.daysUntilBirthday === 365
      ? '🎂 Your birthday is today!'
      : `🎉 ${result?.daysUntilBirthday} days until your next birthday`;

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1117] px-4 py-12">
      <div className="w-full max-w-md bg-[#1a1d27] border border-white/10 rounded-2xl p-8">

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl mx-auto mb-5">
          🎂
        </div>

        <h1 className="text-xl font-semibold text-white text-center mb-1">
          How old are you?
        </h1>
        <p className="text-sm text-slate-400 text-center mb-7">
          Enter your birth year to find out
        </p>

        {/* Input */}
        <label htmlFor="yearInput" className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Birth year
        </label>
        <input
          id="yearInput"
          type="number"
          inputMode="numeric"
          placeholder="e.g. 1990"
          min={1900}
          max={new Date().getFullYear()}
          value={year}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={handleKeyDown}
          aria-describedby="yearError"
          className="
            w-full bg-[#22263a] border border-white/10 rounded-xl
            px-4 py-3.5 text-2xl font-semibold text-white text-center
            tracking-widest placeholder:text-slate-600 placeholder:text-lg
            placeholder:font-normal placeholder:tracking-normal
            outline-none focus:border-indigo-500 focus:ring-2
            focus:ring-indigo-500/20 transition-all
            [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
          "
        />

        {/* Error */}
        <p id="yearError" role="alert" className="text-xs text-red-400 mt-2 min-h-[1.25rem]">
          {error}
        </p>

        {/* Button */}
        <button
          onClick={calculate}
          className="
            mt-4 w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98]
            text-white font-semibold text-[15px] rounded-xl py-3.5
            transition-all duration-150 cursor-pointer border-none
          "
        >
          Calculate my age
        </button>

        {/* Result */}
        {result && (
          <div className="mt-7 pt-7 border-t border-white/10 flex flex-col gap-4 animate-fade-up">

            {/* Big age */}
            <div className="text-center">
              <div className="text-7xl font-bold text-white tracking-tight leading-none">
                {result.age}
              </div>
              <div className="text-sm text-slate-400 mt-1">years old</div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-3 gap-2.5">
              {[
                { val: result.months.toLocaleString(), label: 'Months' },
                { val: result.weeks.toLocaleString(), label: 'Weeks' },
                { val: result.days.toLocaleString(), label: 'Days' },
              ].map(({ val, label }) => (
                <div
                  key={label}
                  className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center"
                >
                  <div className="text-lg font-semibold text-white">{val}</div>
                  <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                    {label}
                  </div>
                </div>
              ))}
            </div>

            {/* Birthday countdown */}
            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3 text-sm text-indigo-300 flex items-center gap-2.5">
              {bdayText}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}