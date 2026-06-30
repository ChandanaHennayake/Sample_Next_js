'use client';

import { useState, KeyboardEvent } from 'react';

interface PercentageResult {
  percentage: number;
}

export default function PercentageCalculator() {
  const [value, setValue] = useState('');
  const [total, setTotal] = useState('');
  const [result, setResult] = useState<PercentageResult | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    setResult(null);

    const val = parseFloat(value);
    const tot = parseFloat(total);

    if (!value || !total || isNaN(val) || isNaN(tot)) {
      setError('Please enter both values.');
      return;
    }

    if (tot === 0) {
      setError('Total cannot be zero.');
      return;
    }

    const percentage = (val / tot) * 100;

    setResult({
      percentage,
    });
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') calculate();
  };

  const handleValueChange = (val: string) => {
    setValue(val);
    setError('');
    if (result) setResult(null);
  };

  const handleTotalChange = (val: string) => {
    setTotal(val);
    setError('');
    if (result) setResult(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1117] px-4 py-12">
      <div className="w-full max-w-md bg-[#1a1d27] border border-white/10 rounded-2xl p-8">

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl mx-auto mb-5">
          📊
        </div>

        <h1 className="text-xl font-semibold text-white text-center mb-1">
          Percentage Calculator
        </h1>

        <p className="text-sm text-slate-400 text-center mb-7">
          Calculate what percentage a value is of a total
        </p>

        {/* Value */}
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Value
        </label>

        <input
          type="number"
          inputMode="decimal"
          placeholder="e.g. 25"
          value={value}
          onChange={(e) =>
            handleValueChange(e.target.value)
          }
          onKeyDown={handleKeyDown}
          className="
            w-full bg-[#22263a] border border-white/10 rounded-xl
            px-4 py-3.5 text-2xl font-semibold text-white text-center
            tracking-wide placeholder:text-slate-600
            placeholder:text-lg placeholder:font-normal
            outline-none focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-500/20
            transition-all mb-4
            [appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
          "
        />

        {/* Total */}
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Total
        </label>

        <input
          type="number"
          inputMode="decimal"
          placeholder="e.g. 100"
          value={total}
          onChange={(e) =>
            handleTotalChange(e.target.value)
          }
          onKeyDown={handleKeyDown}
          className="
            w-full bg-[#22263a] border border-white/10 rounded-xl
            px-4 py-3.5 text-2xl font-semibold text-white text-center
            tracking-wide placeholder:text-slate-600
            placeholder:text-lg placeholder:font-normal
            outline-none focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-500/20
            transition-all
            [appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
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
          Calculate Percentage
        </button>

        {/* Result */}
        {result && (
          <div className="mt-7 pt-7 border-t border-white/10 flex flex-col gap-4 animate-fade-up">

            <div className="text-center">
              <div className="text-7xl font-bold text-white tracking-tight leading-none">
                {result.percentage.toFixed(2)}
              </div>

              <div className="text-sm text-slate-400 mt-1">
                percent
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-lg font-semibold text-white">
                  {Number(value).toLocaleString()}
                </div>

                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Value
                </div>
              </div>

              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-lg font-semibold text-white">
                  {Number(total).toLocaleString()}
                </div>

                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Total
                </div>
              </div>
            </div>

            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3 text-sm text-indigo-300 flex items-center gap-2">
              📈 {value} is {result.percentage.toFixed(2)}% of {total}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}