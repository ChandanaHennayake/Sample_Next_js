"use client";

import { useState, useMemo } from "react";
import { useToast } from "@/src/components/Toast";

export default function DiscountCalculatorClient() {
  const [originalPrice, setOriginalPrice] = useState<number>(100);
  const [discountPercent, setDiscountPercent] = useState<number>(25);
  const [salesTaxPercent, setSalesTaxPercent] = useState<number>(0);
  const [copied, setCopied] = useState<boolean>(false);
  const { toast } = useToast();

  const calculation = useMemo(() => {
    if (originalPrice <= 0) return null;

    const discountAmount = originalPrice * (discountPercent / 100);
    const discountedPrice = originalPrice - discountAmount;
    const taxAmount = discountedPrice * (salesTaxPercent / 100);
    const finalPrice = discountedPrice + taxAmount;

    return {
      discountAmount: Math.round(discountAmount * 100) / 100,
      discountedPrice: Math.round(discountedPrice * 100) / 100,
      taxAmount: Math.round(taxAmount * 100) / 100,
      finalPrice: Math.round(finalPrice * 100) / 100,
    };
  }, [originalPrice, discountPercent, salesTaxPercent]);

  const copySummary = () => {
    if (!calculation) return;
    const text = `UnitNov Discount Calculation:
• Original Price: $${originalPrice.toFixed(2)}
• Discount: ${discountPercent}% (-$${calculation.discountAmount.toFixed(2)})
• Sales Tax: ${salesTaxPercent}% (+$${calculation.taxAmount.toFixed(2)})
• Final Price to Pay: $${calculation.finalPrice.toFixed(2)}
• Total Saved: $${calculation.discountAmount.toFixed(2)}
Calculated at https://unitnov.com/calculators/discount-calculator`;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        toast("Discount summary copied!");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => toast("Couldn't access clipboard", "error"));
  };

  const discountPills = [10, 15, 20, 25, 30, 40, 50, 70];

  return (
    <div className="bg-[#151926] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/20">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Inputs */}
        <div className="lg:col-span-7 space-y-6">
          {/* Original Price */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="originalPrice" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Original Price ($)
              </label>
              <span className="text-xl font-bold text-white tabular-nums">
                ${originalPrice.toFixed(2)}
              </span>
            </div>
            <input
              id="originalPrice"
              type="number"
              inputMode="decimal"
              min={1}
              step="any"
              value={originalPrice}
              onChange={(e) => setOriginalPrice(Math.max(0, Number(e.target.value)))}
              className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-3 text-lg font-bold text-white focus:outline-none focus:border-indigo-500"
            />
          </div>

          {/* Discount Percentage */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="discountPercent" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Discount Percentage (%)
              </label>
              <span className="text-lg font-bold text-emerald-400 tabular-nums">
                {discountPercent}% OFF
              </span>
            </div>
            <input
              id="discountPercent"
              aria-label="Discount Percentage Slider"
              type="range"
              min={0}
              max={95}
              step={1}
              value={discountPercent}
              onChange={(e) => setDiscountPercent(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer h-2 bg-[#22263A] rounded-lg"
            />
            {/* Quick discount buttons */}
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              {discountPills.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setDiscountPercent(pill)}
                  className={`text-xs px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    discountPercent === pill
                      ? "bg-indigo-600 text-white border-indigo-500 font-semibold shadow-md shadow-indigo-500/20"
                      : "bg-[#1E2335] text-slate-400 border-white/5 hover:text-white"
                  }`}
                >
                  {pill}%
                </button>
              ))}
            </div>
          </div>

          {/* Optional Sales Tax */}
          <div className="pt-2 border-t border-white/[0.06]">
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="salesTax" className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Optional Sales Tax (%)
              </label>
              <span className="text-xs font-semibold text-slate-300">
                {salesTaxPercent}%
              </span>
            </div>
            <input
              id="salesTax"
              type="number"
              inputMode="decimal"
              min={0}
              max={25}
              step={0.25}
              value={salesTaxPercent}
              onChange={(e) => setSalesTaxPercent(Math.max(0, Number(e.target.value)))}
              className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-2 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-5 bg-[#1B2032] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between">
          {calculation ? (
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-indigo-400">
                Final Sale Price
              </span>
              <div className="text-4xl md:text-5xl font-black text-white tracking-tight mt-1 mb-4 tabular-nums">
                ${calculation.finalPrice.toFixed(2)}
              </div>

              {/* Savings highlight badge */}
              <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3.5 text-center mb-4">
                <span className="text-xs text-emerald-400 font-medium block">Total You Save:</span>
                <span className="text-2xl font-black text-emerald-400 tabular-nums">
                  ${calculation.discountAmount.toFixed(2)}
                </span>
              </div>

              {/* Breakdown metrics */}
              <div className="space-y-2 border-t border-white/[0.06] pt-4 text-xs">
                <div className="flex items-center justify-between text-slate-300">
                  <span>Original Price:</span>
                  <span className="line-through text-slate-500">${originalPrice.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Discount Applied:</span>
                  <span className="text-emerald-400 font-semibold">
                    -{discountPercent}% (-${calculation.discountAmount.toFixed(2)})
                  </span>
                </div>
                {salesTaxPercent > 0 && (
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Sales Tax ({salesTaxPercent}%):</span>
                    <span>+${calculation.taxAmount.toFixed(2)}</span>
                  </div>
                )}
              </div>

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
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-400 text-sm py-8">
              Enter an original price above 0.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
