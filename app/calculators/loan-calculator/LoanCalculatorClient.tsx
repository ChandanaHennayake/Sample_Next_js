"use client";

import { useState, useMemo } from "react";
import { useToast } from "@/src/components/Toast";

export default function LoanCalculatorClient() {
  const [loanAmount, setLoanAmount] = useState<number>(25000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [loanTermYears, setLoanTermYears] = useState<number>(5);
  const [copied, setCopied] = useState<boolean>(false);
  const { toast } = useToast();

  // Instant reactive calculation
  const calculation = useMemo(() => {
    const P = loanAmount;
    const r = interestRate / 100 / 12;
    const n = loanTermYears * 12;

    if (P <= 0 || interestRate <= 0 || loanTermYears <= 0) {
      return {
        monthlyPayment: 0,
        totalPayment: 0,
        totalInterest: 0,
        principalPercent: 0,
        interestPercent: 0,
      };
    }

    const monthlyPayment = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    const principalPercent = Math.round((P / totalPayment) * 100);
    const interestPercent = 100 - principalPercent;

    return {
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      totalPayment: Math.round(totalPayment * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      principalPercent,
      interestPercent,
    };
  }, [loanAmount, interestRate, loanTermYears]);

  const copySummary = () => {
    const text = `UnitNov Loan Calculation Summary:
• Loan Amount: $${loanAmount.toLocaleString()}
• Interest Rate: ${interestRate}%
• Loan Term: ${loanTermYears} years
• Monthly Payment: $${calculation.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2 })}
• Total Interest: $${calculation.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })}
• Total Repayment: $${calculation.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2 })}
Calculated at https://unitnov.com/calculators/loan-calculator`;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        toast("Loan summary copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => toast("Couldn't access the clipboard", "error"));
  };

  const amountPresets = [5000, 10000, 25000, 50000, 100000];
  const yearPresets = [1, 3, 5, 7, 10];

  return (
    <div className="bg-[#151926] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Loan Amount */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="loanAmount" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Loan Amount ($)
              </label>
              <span className="text-lg font-bold text-white tabular-nums">
                ${loanAmount.toLocaleString()}
              </span>
            </div>
            <input
              id="loanAmount"
              type="range"
              min={1000}
              max={250000}
              step={1000}
              value={loanAmount}
              onChange={(e) => setLoanAmount(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer h-2 bg-[#22263A] rounded-lg"
            />
            {/* Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {amountPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setLoanAmount(preset)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    loanAmount === preset
                      ? "bg-indigo-600/30 text-indigo-300 border-indigo-500/40 font-semibold"
                      : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10"
                  }`}
                >
                  ${(preset / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          {/* Interest Rate */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="interestRate" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Annual Interest Rate (%)
              </label>
              <div className="flex items-center gap-1">
                <input
                  type="number"
                  step="0.1"
                  min="0.1"
                  max="35"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0.1, Number(e.target.value)))}
                  className="w-20 bg-[#22263A] border border-white/10 rounded-lg px-2.5 py-1 text-sm font-bold text-white text-right focus:outline-none focus:border-indigo-500"
                />
                <span className="text-slate-400 text-sm">%</span>
              </div>
            </div>
            <input
              id="interestRate"
              type="range"
              min={1}
              max={25}
              step={0.1}
              value={interestRate}
              onChange={(e) => setInterestRate(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer h-2 bg-[#22263A] rounded-lg"
            />
          </div>

          {/* Loan Term */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="loanTerm" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Loan Term (Years)
              </label>
              <span className="text-lg font-bold text-white tabular-nums">
                {loanTermYears} {loanTermYears === 1 ? "Year" : "Years"} ({loanTermYears * 12} Months)
              </span>
            </div>
            <input
              id="loanTerm"
              type="range"
              min={1}
              max={30}
              step={1}
              value={loanTermYears}
              onChange={(e) => setLoanTermYears(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer h-2 bg-[#22263A] rounded-lg"
            />
            {/* Year Presets */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {yearPresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setLoanTermYears(preset)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    loanTermYears === preset
                      ? "bg-indigo-600/30 text-indigo-300 border-indigo-500/40 font-semibold"
                      : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10"
                  }`}
                >
                  {preset} {preset === 1 ? "yr" : "yrs"}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Results Column */}
        <div className="lg:col-span-5 bg-[#1B2032] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
              Estimated Monthly Payment
            </span>
            <div className="text-4xl md:text-5xl font-black text-white tracking-tight mt-1 mb-4 tabular-nums">
              ${calculation.monthlyPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-sm font-normal text-slate-400 ml-1">/mo</span>
            </div>

            {/* Visual breakdown progress bar */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1.5">
                <span>Principal: {calculation.principalPercent}%</span>
                <span>Interest: {calculation.interestPercent}%</span>
              </div>
              <div className="h-2.5 w-full bg-[#121520] rounded-full overflow-hidden flex">
                <div
                  style={{ width: `${calculation.principalPercent}%` }}
                  className="bg-indigo-500 transition-all duration-300"
                />
                <div
                  style={{ width: `${calculation.interestPercent}%` }}
                  className="bg-violet-400 transition-all duration-300"
                />
              </div>
            </div>

            {/* Metrics breakdown */}
            <div className="space-y-2.5 border-t border-white/[0.06] pt-4 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Total Principal:</span>
                <span className="font-semibold text-white">${loanAmount.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Total Interest:</span>
                <span className="font-semibold text-violet-300">
                  ${calculation.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300 pt-2 border-t border-white/[0.06]">
                <span className="font-medium">Total Cost of Loan:</span>
                <span className="font-bold text-white text-sm">
                  ${calculation.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2">
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
              <span>{copied ? "Copied to Clipboard!" : "Copy Summary"}</span>
            </button>
            <button
              onClick={() => {
                setLoanAmount(25000);
                setInterestRate(6.5);
                setLoanTermYears(5);
              }}
              className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs transition-colors cursor-pointer"
              title="Reset to defaults"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
