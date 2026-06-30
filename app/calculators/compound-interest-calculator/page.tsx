'use client';

import { useState, KeyboardEvent } from 'react';

interface CompoundResult {
  futureValue: number;
  interestEarned: number;
}

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');

  const [result, setResult] = useState<CompoundResult | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    setResult(null);

    const P = parseFloat(principal);
    const r = parseFloat(rate);
    const t = parseFloat(years);

    if (
      !principal ||
      !rate ||
      !years ||
      isNaN(P) ||
      isNaN(r) ||
      isNaN(t)
    ) {
      setError('Please fill in all fields.');
      return;
    }

    if (P <= 0 || r <= 0 || t <= 0) {
      setError('All values must be greater than 0.');
      return;
    }

    const futureValue = P * Math.pow(1 + r / 100, t);
    const interestEarned = futureValue - P;

    setResult({
      futureValue,
      interestEarned,
    });
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') calculate();
  };

  const resetResult = () => {
    setError('');
    if (result) setResult(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1117] px-4 py-12">
      <div className="w-full max-w-md bg-[#1a1d27] border border-white/10 rounded-2xl p-8">

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl mx-auto mb-5">
          📈
        </div>

        <h1 className="text-xl font-semibold text-white text-center mb-1">
          Compound Interest Calculator
        </h1>

        <p className="text-sm text-slate-400 text-center mb-7">
          Estimate the future value of your investment
        </p>

        {/* Principal */}
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Principal Amount
        </label>

        <input
          type="number"
          placeholder="e.g. 10000"
          value={principal}
          onChange={(e) => {
            setPrincipal(e.target.value);
            resetResult();
          }}
          onKeyDown={handleKeyDown}
          className="w-full bg-[#22263a] border border-white/10 rounded-xl px-4 py-3.5 text-2xl font-semibold text-white text-center placeholder:text-slate-600 placeholder:text-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all mb-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        {/* Rate */}
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Annual Interest Rate (%)
        </label>

        <input
          type="number"
          step="0.01"
          placeholder="e.g. 8"
          value={rate}
          onChange={(e) => {
            setRate(e.target.value);
            resetResult();
          }}
          onKeyDown={handleKeyDown}
          className="w-full bg-[#22263a] border border-white/10 rounded-xl px-4 py-3.5 text-2xl font-semibold text-white text-center placeholder:text-slate-600 placeholder:text-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all mb-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        {/* Years */}
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Investment Period (Years)
        </label>

        <input
          type="number"
          placeholder="e.g. 10"
          value={years}
          onChange={(e) => {
            setYears(e.target.value);
            resetResult();
          }}
          onKeyDown={handleKeyDown}
          className="w-full bg-[#22263a] border border-white/10 rounded-xl px-4 py-3.5 text-2xl font-semibold text-white text-center placeholder:text-slate-600 placeholder:text-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        <p
          role="alert"
          className="text-xs text-red-400 mt-2 min-h-[1.25rem]"
        >
          {error}
        </p>

        <button
          onClick={calculate}
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold text-[15px] rounded-xl py-3.5 transition-all duration-150 cursor-pointer border-none"
        >
          Calculate Growth
        </button>

        {result && (
          <div className="mt-7 pt-7 border-t border-white/10 flex flex-col gap-4 animate-fade-up">

            <div className="text-center">
              <div className="text-6xl font-bold text-white tracking-tight leading-none">
                {result.futureValue.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </div>

              <div className="text-sm text-slate-400 mt-1">
                future value
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-lg font-semibold text-white">
                  {Number(principal).toLocaleString()}
                </div>

                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Principal
                </div>
              </div>

              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-lg font-semibold text-white">
                  {result.interestEarned.toLocaleString(undefined, {
                    maximumFractionDigits: 0,
                  })}
                </div>

                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Interest
                </div>
              </div>

              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-lg font-semibold text-white">
                  {years}
                </div>

                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Years
                </div>
              </div>
            </div>

            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3 text-sm text-indigo-300 flex items-center gap-2">
              🚀 Your investment could grow by{' '}
              {result.interestEarned.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}