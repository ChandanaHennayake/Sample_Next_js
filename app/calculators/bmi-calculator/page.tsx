'use client';

import { useState, KeyboardEvent } from 'react';

interface BMIResult {
  bmi: number;
  category: string;
}

export default function BMICalculator() {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState('');

  const calculate = () => {
    setError('');
    setResult(null);

    const w = parseFloat(weight);
    const h = parseFloat(height);

    if (!weight || !height || isNaN(w) || isNaN(h)) {
      setError('Please enter weight and height.');
      return;
    }

    if (w <= 0 || h <= 0) {
      setError('Values must be greater than 0.');
      return;
    }

    const bmi = w / (h * h);

    let category = '';

    if (bmi < 18.5) category = 'Underweight';
    else if (bmi < 25) category = 'Normal Weight';
    else if (bmi < 30) category = 'Overweight';
    else category = 'Obese';

    setResult({
      bmi,
      category,
    });
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') calculate();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1117] px-4 py-12">
      <div className="w-full max-w-md bg-[#1a1d27] border border-white/10 rounded-2xl p-8">

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl mx-auto mb-5">
          ⚖️
        </div>

        <h1 className="text-xl font-semibold text-white text-center mb-1">
          BMI Calculator
        </h1>

        <p className="text-sm text-slate-400 text-center mb-7">
          Calculate your Body Mass Index
        </p>

        {/* Weight */}
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Weight (kg)
        </label>

        <input
          type="number"
          placeholder="e.g. 70"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          onKeyDown={handleKeyDown}
          className="
            w-full bg-[#22263a] border border-white/10 rounded-xl
            px-4 py-3.5 text-2xl font-semibold text-white text-center
            placeholder:text-slate-600 placeholder:text-lg
            outline-none focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-500/20
            transition-all mb-4
          "
        />

        {/* Height */}
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Height (m)
        </label>

        <input
          type="number"
          step="0.01"
          placeholder="e.g. 1.75"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          onKeyDown={handleKeyDown}
          className="
            w-full bg-[#22263a] border border-white/10 rounded-xl
            px-4 py-3.5 text-2xl font-semibold text-white text-center
            placeholder:text-slate-600 placeholder:text-lg
            outline-none focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-500/20
            transition-all
          "
        />

        <p
          role="alert"
          className="text-xs text-red-400 mt-2 min-h-[1.25rem]"
        >
          {error}
        </p>

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
          Calculate BMI
        </button>

        {result && (
          <div className="mt-7 pt-7 border-t border-white/10 flex flex-col gap-4 animate-fade-up">

            <div className="text-center">
              <div className="text-7xl font-bold text-white leading-none">
                {result.bmi.toFixed(1)}
              </div>

              <div className="text-sm text-slate-400 mt-1">
                BMI Score
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-lg font-semibold text-white">
                  {result.category}
                </div>

                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Category
                </div>
              </div>

              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-lg font-semibold text-white">
                  {height}m
                </div>

                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Height
                </div>
              </div>
            </div>

            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3 text-sm text-indigo-300">
              ⚖️ Your BMI category is <strong>{result.category}</strong>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}