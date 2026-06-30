'use client';

import { useState, KeyboardEvent } from 'react';

interface LoanResult {
  monthlyPayment: number;
  totalPayment: number;
  totalInterest: number;
}

export default function LoanCalculator() {
  const [amount, setAmount] = useState('');
  const [rate, setRate] = useState('');
  const [years, setYears] = useState('');

  const [result, setResult] = useState<LoanResult | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    setResult(null);

    const P = parseFloat(amount);
    const annualRate = parseFloat(rate);
    const loanYears = parseFloat(years);

    if (
      !amount ||
      !rate ||
      !years ||
      isNaN(P) ||
      isNaN(annualRate) ||
      isNaN(loanYears)
    ) {
      setError('Please fill in all fields.');
      return;
    }

    if (P <= 0 || annualRate <= 0 || loanYears <= 0) {
      setError('All values must be greater than 0.');
      return;
    }

    const r = annualRate / 100 / 12;
    const n = loanYears * 12;

    const monthlyPayment =
      (P * r * Math.pow(1 + r, n)) /
      (Math.pow(1 + r, n) - 1);

    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
    });
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') calculate();
  };

  const resetState = () => {
    setError('');
    if (result) setResult(null);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1117] px-4 py-12">
      <div className="w-full max-w-md bg-[#1a1d27] border border-white/10 rounded-2xl p-8">

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl mx-auto mb-5">
          💰
        </div>

        <h1 className="text-xl font-semibold text-white text-center mb-1">
          Loan Calculator
        </h1>

        <p className="text-sm text-slate-400 text-center mb-7">
          Estimate your monthly loan payments
        </p>

        {/* Loan Amount */}
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Loan Amount
        </label>

        <input
          type="number"
          placeholder="e.g. 100000"
          value={amount}
          onChange={(e) => {
            setAmount(e.target.value);
            resetState();
          }}
          onKeyDown={handleKeyDown}
          className="w-full bg-[#22263a] border border-white/10 rounded-xl px-4 py-3.5 text-2xl font-semibold text-white text-center tracking-wide placeholder:text-slate-600 placeholder:text-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all mb-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        {/* Interest Rate */}
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Interest Rate (%)
        </label>

        <input
          type="number"
          step="0.01"
          placeholder="e.g. 7.5"
          value={rate}
          onChange={(e) => {
            setRate(e.target.value);
            resetState();
          }}
          onKeyDown={handleKeyDown}
          className="w-full bg-[#22263a] border border-white/10 rounded-xl px-4 py-3.5 text-2xl font-semibold text-white text-center tracking-wide placeholder:text-slate-600 placeholder:text-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all mb-4 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />

        {/* Years */}
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Loan Term (Years)
        </label>

        <input
          type="number"
          placeholder="e.g. 30"
          value={years}
          onChange={(e) => {
            setYears(e.target.value);
            resetState();
          }}
          onKeyDown={handleKeyDown}
          className="w-full bg-[#22263a] border border-white/10 rounded-xl px-4 py-3.5 text-2xl font-semibold text-white text-center tracking-wide placeholder:text-slate-600 placeholder:text-lg outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 transition-all [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
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
          className="mt-4 w-full bg-indigo-600 hover:bg-indigo-500 active:scale-[0.98] text-white font-semibold text-[15px] rounded-xl py-3.5 transition-all duration-150 cursor-pointer border-none"
        >
          Calculate Loan
        </button>

        {/* Result */}
        {result && (
          <div className="mt-7 pt-7 border-t border-white/10 flex flex-col gap-4 animate-fade-up">

            <div className="text-center">
              <div className="text-6xl font-bold text-white tracking-tight leading-none">
                {result.monthlyPayment.toLocaleString(undefined, {
                  maximumFractionDigits: 2,
                })}
              </div>

              <div className="text-sm text-slate-400 mt-1">
                monthly payment
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-lg font-semibold text-white">
                  {Number(amount).toLocaleString()}
                </div>
                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Loan
                </div>
              </div>

              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-lg font-semibold text-white">
                  {result.totalInterest.toLocaleString(undefined, {
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
              💸 Total repayment will be{' '}
              {result.totalPayment.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}