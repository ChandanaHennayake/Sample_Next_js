"use client";

import { useState, useMemo } from "react";
import { useToast } from "@/src/components/Toast";

export default function CompoundInterestCalculatorClient() {
  const [initialDeposit, setInitialDeposit] = useState<number>(10000);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [annualRate, setAnnualRate] = useState<number>(8);
  const [investmentYears, setInvestmentYears] = useState<number>(20);
  const [compoundFrequency, setCompoundFrequency] = useState<number>(12); // 12 = Monthly, 1 = Annually, 365 = Daily
  const [copied, setCopied] = useState<boolean>(false);
  const { toast } = useToast();

  const calculation = useMemo(() => {
    const P = initialDeposit;
    const PMT = monthlyContribution;
    const r = annualRate / 100;
    const t = investmentYears;
    const n = compoundFrequency;

    if (P < 0 || r <= 0 || t <= 0) {
      return {
        futureValue: 0,
        totalPrincipal: 0,
        totalInterest: 0,
        principalPercent: 0,
        interestPercent: 0,
      };
    }

    // Compound interest on initial principal: P * (1 + r/n)^(n*t)
    const futurePrincipal = P * Math.pow(1 + r / n, n * t);

    // Future value of regular monthly contributions (annuity formula adjusted for monthly PMT)
    const monthlyRate = r / 12;
    const totalMonths = t * 12;
    let futureContributions = 0;
    if (PMT > 0 && monthlyRate > 0) {
      futureContributions = PMT * ((Math.pow(1 + monthlyRate, totalMonths) - 1) / monthlyRate);
    }

    const futureValue = futurePrincipal + futureContributions;
    const totalPrincipal = P + PMT * totalMonths;
    const totalInterest = Math.max(0, futureValue - totalPrincipal);

    const principalPercent = Math.round((totalPrincipal / futureValue) * 100);
    const interestPercent = 100 - principalPercent;

    return {
      futureValue: Math.round(futureValue * 100) / 100,
      totalPrincipal: Math.round(totalPrincipal),
      totalInterest: Math.round(totalInterest * 100) / 100,
      principalPercent,
      interestPercent,
    };
  }, [initialDeposit, monthlyContribution, annualRate, investmentYears, compoundFrequency]);

  const copySummary = () => {
    const text = `UnitNov Compound Interest Calculation:
• Initial Deposit: $${initialDeposit.toLocaleString()}
• Monthly Contribution: $${monthlyContribution.toLocaleString()}
• Annual Return: ${annualRate}%
• Investment Horizon: ${investmentYears} years
• Total Amount Contributed: $${calculation.totalPrincipal.toLocaleString()}
• Total Compound Interest: $${calculation.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })}
• Projected Future Value: $${calculation.futureValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
Calculated free at https://unitnov.com/calculators/compound-interest-calculator`;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        toast("Investment projection copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => toast("Couldn't access clipboard", "error"));
  };

  const depositPresets = [1000, 5000, 10000, 25000, 50000];
  const yearPresets = [5, 10, 15, 20, 30];

  return (
    <div className="bg-[#151926] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Initial Deposit */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="initialDepositInput" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Initial Deposit ($)
              </label>
              <div className="flex items-center gap-1">
                <span className="text-slate-400 text-sm font-semibold">$</span>
                <input
                  id="initialDepositInput"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={10000000}
                  step={500}
                  value={initialDeposit}
                  onChange={(e) => setInitialDeposit(Math.max(0, Number(e.target.value)))}
                  className="w-28 bg-[#22263A] border border-white/10 rounded-lg px-2.5 py-1 text-sm font-bold text-white text-right focus:outline-none focus:border-indigo-500"
                />
              </div>
            </div>
            <input
              id="initialDeposit"
              aria-label="Initial Deposit Slider"
              type="range"
              min={0}
              max={100000}
              step={1000}
              value={initialDeposit}
              onChange={(e) => setInitialDeposit(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer h-2 bg-[#22263A] rounded-lg"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {depositPresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setInitialDeposit(preset)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    initialDeposit === preset
                      ? "bg-indigo-600/30 text-indigo-300 border-indigo-500/40 font-semibold"
                      : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10"
                  }`}
                >
                  ${(preset / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          {/* Monthly Contribution */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="monthlyContributionInput" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Monthly Contribution ($)
              </label>
              <div className="flex items-center gap-1">
                <span className="text-slate-400 text-sm font-semibold">$</span>
                <input
                  id="monthlyContributionInput"
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={50000}
                  step={25}
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value)))}
                  className="w-24 bg-[#22263A] border border-white/10 rounded-lg px-2.5 py-1 text-sm font-bold text-white text-right focus:outline-none focus:border-indigo-500"
                />
                <span className="text-slate-400 text-xs">/mo</span>
              </div>
            </div>
            <input
              id="monthlyContribution"
              aria-label="Monthly Contribution Slider"
              type="range"
              min={0}
              max={5000}
              step={50}
              value={monthlyContribution}
              onChange={(e) => setMonthlyContribution(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer h-2 bg-[#22263A] rounded-lg"
            />
          </div>

          {/* Annual Return & Years */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="annualRateInput" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Annual Return (%)
                </label>
                <div className="flex items-center gap-1">
                  <input
                    id="annualRateInput"
                    type="number"
                    inputMode="decimal"
                    step="0.1"
                    min="0.1"
                    max="50"
                    value={annualRate}
                    onChange={(e) => setAnnualRate(Math.max(0.1, Number(e.target.value)))}
                    className="w-16 bg-[#22263A] border border-white/10 rounded-lg px-2 py-0.5 text-xs font-bold text-white text-right focus:outline-none focus:border-indigo-500"
                  />
                  <span className="text-slate-400 text-xs">%</span>
                </div>
              </div>
              <input
                id="annualRate"
                aria-label="Annual Return Slider"
                type="range"
                min={1}
                max={20}
                step={0.5}
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-2 bg-[#22263A] rounded-lg"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="compoundingFreq" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Compound Frequency
                </label>
              </div>
              <select
                id="compoundingFreq"
                value={compoundFrequency}
                onChange={(e) => setCompoundFrequency(Number(e.target.value))}
                className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
              >
                <option value={12}>Monthly (Recommended)</option>
                <option value={1}>Annually</option>
                <option value={365}>Daily</option>
              </select>
            </div>
          </div>

          {/* Investment Horizon Years */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Investment Horizon
              </label>
              <span className="text-sm font-semibold text-white">
                {investmentYears} Years
              </span>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {yearPresets.map((yr) => (
                <button
                  key={yr}
                  type="button"
                  onClick={() => setInvestmentYears(yr)}
                  className={`text-xs px-3 py-1.5 rounded-xl border transition-all cursor-pointer ${
                    investmentYears === yr
                      ? "bg-indigo-600 text-white border-indigo-500 font-semibold shadow-md shadow-indigo-500/20"
                      : "bg-[#1E2335] text-slate-400 border-white/5 hover:text-white"
                  }`}
                >
                  {yr} Years
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Output Column */}
        <div className="lg:col-span-5 bg-[#1B2032] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
              Projected Future Balance
            </span>
            <div className="text-4xl md:text-5xl font-black text-white tracking-tight mt-1 mb-4 tabular-nums">
              ${calculation.futureValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </div>

            {/* Visual ratio bar */}
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
                  className="bg-emerald-400 transition-all duration-300"
                />
              </div>
            </div>

            {/* Metric breakdown */}
            <div className="space-y-2.5 border-t border-white/[0.06] pt-4 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Total Contributions:</span>
                <span className="font-semibold text-white">
                  ${calculation.totalPrincipal.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Total Compound Interest:</span>
                <span className="font-bold text-emerald-400">
                  +${calculation.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>
              <div className="flex items-center justify-between text-slate-400 text-[11px] pt-1">
                <span>Growth Multiplier:</span>
                <span className="text-indigo-300">
                  {(calculation.futureValue / Math.max(1, calculation.totalPrincipal)).toFixed(2)}x initial contributions
                </span>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center gap-2">
            <button
              type="button"
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
              <span>{copied ? "Copied!" : "Copy Projection"}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setInitialDeposit(10000);
                setMonthlyContribution(500);
                setAnnualRate(8);
                setInvestmentYears(20);
                setCompoundFrequency(12);
              }}
              className="py-2.5 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-xs transition-colors cursor-pointer"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
