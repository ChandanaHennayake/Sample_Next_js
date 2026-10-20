"use client";

import { useState, useMemo } from "react";
import { useToast } from "@/src/components/Toast";

export default function MortgageCalculatorClient() {
  const [homePrice, setHomePrice] = useState<number>(400000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(6.75);
  const [loanTermYears, setLoanTermYears] = useState<number>(30);
  const [includeTaxes, setIncludeTaxes] = useState<boolean>(true);
  const [annualPropertyTax, setAnnualPropertyTax] = useState<number>(4200);
  const [annualInsurance, setAnnualInsurance] = useState<number>(1400);
  const [copied, setCopied] = useState<boolean>(false);
  const { toast } = useToast();

  const downPaymentAmount = Math.round((homePrice * downPaymentPercent) / 100);
  const principalLoan = Math.max(0, homePrice - downPaymentAmount);

  const calculation = useMemo(() => {
    const P = principalLoan;
    const r = interestRate / 100 / 12;
    const n = loanTermYears * 12;

    if (P <= 0 || interestRate <= 0 || loanTermYears <= 0) {
      return {
        monthlyPI: 0,
        monthlyTax: 0,
        monthlyInsurance: 0,
        totalMonthly: 0,
        totalInterest: 0,
        totalCost: 0,
        principalPercent: 0,
        interestPercent: 0,
      };
    }

    const monthlyPI = (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const monthlyTax = includeTaxes ? annualPropertyTax / 12 : 0;
    const monthlyInsurance = includeTaxes ? annualInsurance / 12 : 0;
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance;

    const totalPIPaid = monthlyPI * n;
    const totalInterest = totalPIPaid - P;
    const totalCost = totalPIPaid + (includeTaxes ? (annualPropertyTax + annualInsurance) * loanTermYears : 0);

    const principalPercent = Math.round((P / totalPIPaid) * 100);
    const interestPercent = 100 - principalPercent;

    return {
      monthlyPI: Math.round(monthlyPI * 100) / 100,
      monthlyTax: Math.round(monthlyTax * 100) / 100,
      monthlyInsurance: Math.round(monthlyInsurance * 100) / 100,
      totalMonthly: Math.round(totalMonthly * 100) / 100,
      totalInterest: Math.round(totalInterest * 100) / 100,
      totalCost: Math.round(totalCost * 100) / 100,
      principalPercent,
      interestPercent,
    };
  }, [principalLoan, interestRate, loanTermYears, includeTaxes, annualPropertyTax, annualInsurance]);

  const copySummary = () => {
    const text = `UnitNov Mortgage Calculation Summary:
• Home Price: $${homePrice.toLocaleString()}
• Down Payment: $${downPaymentAmount.toLocaleString()} (${downPaymentPercent}%)
• Loan Amount: $${principalLoan.toLocaleString()}
• Interest Rate: ${interestRate}%
• Loan Term: ${loanTermYears} years
• Monthly Principal & Interest: $${calculation.monthlyPI.toLocaleString(undefined, { minimumFractionDigits: 2 })}
• Total Monthly Payment: $${calculation.totalMonthly.toLocaleString(undefined, { minimumFractionDigits: 2 })}
• Lifetime Total Interest: $${calculation.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2 })}
Calculated at https://unitnov.com/calculators/mortgage-calculator`;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        toast("Mortgage summary copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => toast("Couldn't access clipboard", "error"));
  };

  const pricePresets = [250000, 350000, 450000, 600000, 800000];
  const termPresets = [15, 20, 30];

  return (
    <div className="bg-[#151926] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Input Column */}
        <div className="lg:col-span-7 space-y-5">
          {/* Home Price */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="homePrice" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Home Price ($)
              </label>
              <span className="text-lg font-bold text-white tabular-nums">
                ${homePrice.toLocaleString()}
              </span>
            </div>
            <input
              id="homePrice"
              type="range"
              min={100000}
              max={1500000}
              step={10000}
              value={homePrice}
              onChange={(e) => setHomePrice(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer h-2 bg-[#22263A] rounded-lg"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {pricePresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setHomePrice(preset)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    homePrice === preset
                      ? "bg-indigo-600/30 text-indigo-300 border-indigo-500/40 font-semibold"
                      : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10"
                  }`}
                >
                  ${(preset / 1000).toFixed(0)}k
                </button>
              ))}
            </div>
          </div>

          {/* Down Payment */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="downPayment" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Down Payment ({downPaymentPercent}%)
                </label>
                <span className="text-sm font-semibold text-slate-300 tabular-nums">
                  ${downPaymentAmount.toLocaleString()}
                </span>
              </div>
              <input
                id="downPayment"
                type="range"
                min={0}
                max={50}
                step={5}
                value={downPaymentPercent}
                onChange={(e) => setDownPaymentPercent(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-2 bg-[#22263A] rounded-lg"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label htmlFor="interestRate" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  step="0.05"
                  min="1"
                  max="20"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0.1, Number(e.target.value)))}
                  className="w-20 bg-[#22263A] border border-white/10 rounded-lg px-2 py-0.5 text-xs font-bold text-white text-right focus:outline-none focus:border-indigo-500"
                />
              </div>
              <input
                id="interestRate"
                type="range"
                min={2}
                max={12}
                step={0.05}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer h-2 bg-[#22263A] rounded-lg"
              />
            </div>
          </div>

          {/* Loan Term */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Loan Term (Years)
              </label>
              <span className="text-sm font-semibold text-white">
                {loanTermYears} Years ({loanTermYears * 12} Payments)
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {termPresets.map((term) => (
                <button
                  key={term}
                  type="button"
                  onClick={() => setLoanTermYears(term)}
                  className={`py-2 text-xs font-semibold rounded-xl border transition-all cursor-pointer text-center ${
                    loanTermYears === term
                      ? "bg-indigo-600 text-white border-indigo-500 shadow-md shadow-indigo-500/25"
                      : "bg-[#1E2335] text-slate-400 border-white/5 hover:text-white hover:bg-white/5"
                  }`}
                >
                  {term} Years
                </button>
              ))}
            </div>
          </div>

          {/* Taxes & Insurance Toggle */}
          <div className="pt-2 border-t border-white/[0.06]">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={includeTaxes}
                onChange={(e) => setIncludeTaxes(e.target.checked)}
                className="w-4 h-4 rounded accent-indigo-500 cursor-pointer"
              />
              <span className="font-medium">Include Property Taxes & Homeowners Insurance</span>
            </label>

            {includeTaxes && (
              <div className="grid grid-cols-2 gap-3 mt-3">
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">Annual Property Tax ($)</span>
                  <input
                    type="number"
                    value={annualPropertyTax}
                    onChange={(e) => setAnnualPropertyTax(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-[#1B2032] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block mb-1">Annual Insurance ($)</span>
                  <input
                    type="number"
                    value={annualInsurance}
                    onChange={(e) => setAnnualInsurance(Math.max(0, Number(e.target.value)))}
                    className="w-full bg-[#1B2032] border border-white/10 rounded-lg px-3 py-1.5 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Output Column */}
        <div className="lg:col-span-5 bg-[#1B2032] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
              Estimated Monthly Payment
            </span>
            <div className="text-4xl md:text-5xl font-black text-white tracking-tight mt-1 mb-4 tabular-nums">
              ${calculation.totalMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              <span className="text-sm font-normal text-slate-400 ml-1">/mo</span>
            </div>

            {/* Payment breakdown */}
            <div className="space-y-2 border-t border-white/[0.06] pt-4 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Principal & Interest:</span>
                <span className="font-semibold text-white">
                  ${calculation.monthlyPI.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </span>
              </div>
              {includeTaxes && (
                <>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Property Taxes (est.):</span>
                    <span>${calculation.monthlyTax.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Home Insurance (est.):</span>
                    <span>${calculation.monthlyInsurance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                  </div>
                </>
              )}
            </div>

            {/* Total figures */}
            <div className="mt-4 pt-3 border-t border-white/[0.06] space-y-2 text-xs">
              <div className="flex items-center justify-between text-slate-300">
                <span>Loan Principal Amount:</span>
                <span className="font-semibold text-white">${principalLoan.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between text-slate-300">
                <span>Lifetime Total Interest:</span>
                <span className="font-semibold text-violet-300">
                  ${calculation.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
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
              <span>{copied ? "Copied!" : "Copy Summary"}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setHomePrice(400000);
                setDownPaymentPercent(20);
                setInterestRate(6.75);
                setLoanTermYears(30);
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
