'use client';

import { useState, KeyboardEvent } from 'react';

interface DiscountResult {
  finalPrice: number;
  savings: number;
}

export default function DiscountCalculator() {
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');

  const [result, setResult] = useState<DiscountResult | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    setResult(null);

    const originalPrice = parseFloat(price);
    const discountRate = parseFloat(discount);

    if (
      !price ||
      !discount ||
      isNaN(originalPrice) ||
      isNaN(discountRate)
    ) {
      setError('Please enter both values.');
      return;
    }

    if (originalPrice <= 0) {
      setError('Price must be greater than 0.');
      return;
    }

    if (discountRate < 0 || discountRate > 100) {
      setError('Discount must be between 0 and 100.');
      return;
    }

    const savings =
      originalPrice * (discountRate / 100);

    const finalPrice =
      originalPrice - savings;

    setResult({
      finalPrice,
      savings,
    });
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') calculate();
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
          🏷️
        </div>

        <h1 className="text-xl font-semibold text-white text-center mb-1">
          Discount Calculator
        </h1>

        <p className="text-sm text-slate-400 text-center mb-7">
          Calculate the final price after a discount
        </p>

        {/* Price */}
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Original Price
        </label>

        <input
          type="number"
          inputMode="decimal"
          placeholder="e.g. 199.99"
          value={price}
          onChange={(e) => {
            setPrice(e.target.value);
            clearResult();
          }}
          onKeyDown={handleKeyDown}
          className="
            w-full bg-[#22263a] border border-white/10 rounded-xl
            px-4 py-3.5 text-2xl font-semibold text-white text-center
            placeholder:text-slate-600 placeholder:text-lg
            outline-none focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-500/20
            transition-all mb-4
            [appearance:textfield]
            [&::-webkit-outer-spin-button]:appearance-none
            [&::-webkit-inner-spin-button]:appearance-none
          "
        />

        {/* Discount */}
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Discount (%)
        </label>

        <input
          type="number"
          inputMode="decimal"
          placeholder="e.g. 25"
          value={discount}
          onChange={(e) => {
            setDiscount(e.target.value);
            clearResult();
          }}
          onKeyDown={handleKeyDown}
          className="
            w-full bg-[#22263a] border border-white/10 rounded-xl
            px-4 py-3.5 text-2xl font-semibold text-white text-center
            placeholder:text-slate-600 placeholder:text-lg
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
          Calculate Discount
        </button>

        {/* Results */}
        {result && (
          <div className="mt-7 pt-7 border-t border-white/10 flex flex-col gap-4 animate-fade-up">

            <div className="text-center">
              <div className="text-6xl font-bold text-white tracking-tight leading-none">
                {result.finalPrice.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>

              <div className="text-sm text-slate-400 mt-1">
                final price
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">

              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-lg font-semibold text-white">
                  {Number(price).toLocaleString()}
                </div>

                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Original
                </div>
              </div>

              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-lg font-semibold text-white">
                  {result.savings.toLocaleString(undefined, {
                    maximumFractionDigits: 2,
                  })}
                </div>

                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Savings
                </div>
              </div>

              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-lg font-semibold text-white">
                  {discount}%
                </div>

                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Discount
                </div>
              </div>

            </div>

            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3 text-sm text-indigo-300 flex items-center gap-2">
              💸 You save{' '}
              {result.savings.toLocaleString(undefined, {
                maximumFractionDigits: 2,
              })}
              {' '}with this discount
            </div>

          </div>
        )}
      </div>
    </div>
  );
}