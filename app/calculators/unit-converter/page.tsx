'use client';

import { useState, KeyboardEvent } from 'react';

interface ConversionResult {
  value: number;
  from: string;
  to: string;
}

const conversions = {
  'km-miles': {
    label: 'Kilometers → Miles',
    from: 'KM',
    to: 'Miles',
    convert: (n: number) => n * 0.621371,
  },
  'miles-km': {
    label: 'Miles → Kilometers',
    from: 'Miles',
    to: 'KM',
    convert: (n: number) => n * 1.60934,
  },
  'kg-lbs': {
    label: 'Kilograms → Pounds',
    from: 'KG',
    to: 'LBS',
    convert: (n: number) => n * 2.20462,
  },
  'lbs-kg': {
    label: 'Pounds → Kilograms',
    from: 'LBS',
    to: 'KG',
    convert: (n: number) => n * 0.453592,
  },
  'c-f': {
    label: 'Celsius → Fahrenheit',
    from: '°C',
    to: '°F',
    convert: (n: number) => (n * 9) / 5 + 32,
  },
  'f-c': {
    label: 'Fahrenheit → Celsius',
    from: '°F',
    to: '°C',
    convert: (n: number) => ((n - 32) * 5) / 9,
  },
} as const;

export default function UnitConverter() {
  const [value, setValue] = useState('');
  const [conversion, setConversion] =
    useState<keyof typeof conversions>('km-miles');

  const [result, setResult] =
    useState<ConversionResult | null>(null);

  const [error, setError] = useState('');

  const convert = () => {
    setError('');
    setResult(null);

    const num = parseFloat(value);

    if (!value || isNaN(num)) {
      setError('Please enter a value.');
      return;
    }

    const selected = conversions[conversion];

    setResult({
      value: selected.convert(num),
      from: selected.from,
      to: selected.to,
    });
  };

  const clearResult = () => {
    setError('');
    if (result) setResult(null);
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Enter') convert();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#0f1117] px-4 py-12">
      <div className="w-full max-w-md bg-[#1a1d27] border border-white/10 rounded-2xl p-8">

        {/* Icon */}
        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-2xl mx-auto mb-5">
          📏
        </div>

        <h1 className="text-xl font-semibold text-white text-center mb-1">
          Unit Converter
        </h1>

        <p className="text-sm text-slate-400 text-center mb-7">
          Convert between common units instantly
        </p>

        {/* Value */}
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Value
        </label>

        <input
          type="number"
          inputMode="decimal"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            clearResult();
          }}
          onKeyDown={handleKeyDown}
          placeholder="e.g. 100"
          className="
            w-full bg-[#22263a] border border-white/10 rounded-xl
            px-4 py-3.5 text-2xl font-semibold text-white text-center
            placeholder:text-slate-600 placeholder:text-lg
            outline-none focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-500/20
            transition-all mb-4
          "
        />

        {/* Conversion Type */}
        <label className="block text-xs font-medium text-slate-400 uppercase tracking-widest mb-2">
          Conversion
        </label>

        <select
          value={conversion}
          onChange={(e) => {
            setConversion(
              e.target.value as keyof typeof conversions
            );
            clearResult();
          }}
          className="
            w-full bg-[#22263a] border border-white/10 rounded-xl
            px-4 py-3.5 text-white
            outline-none focus:border-indigo-500
            focus:ring-2 focus:ring-indigo-500/20
            transition-all
          "
        >
          {Object.entries(conversions).map(
            ([key, item]) => (
              <option key={key} value={key}>
                {item.label}
              </option>
            )
          )}
        </select>

        {/* Error */}
        <p
          role="alert"
          className="text-xs text-red-400 mt-2 min-h-[1.25rem]"
        >
          {error}
        </p>

        {/* Button */}
        <button
          onClick={convert}
          className="
            mt-4 w-full bg-indigo-600 hover:bg-indigo-500
            active:scale-[0.98]
            text-white font-semibold text-[15px]
            rounded-xl py-3.5 transition-all duration-150
            cursor-pointer border-none
          "
        >
          Convert Unit
        </button>

        {/* Results */}
        {result && (
          <div className="mt-7 pt-7 border-t border-white/10 flex flex-col gap-4 animate-fade-up">

            <div className="text-center">
              <div className="text-7xl font-bold text-white tracking-tight leading-none">
                {result.value.toFixed(2)}
              </div>

              <div className="text-sm text-slate-400 mt-1">
                {result.to}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2.5">

              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-lg font-semibold text-white">
                  {Number(value).toLocaleString()}
                </div>

                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  {result.from}
                </div>
              </div>

              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-lg font-semibold text-white">
                  {result.value.toFixed(2)}
                </div>

                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  {result.to}
                </div>
              </div>

              <div className="bg-[#22263a] border border-white/10 rounded-xl py-3.5 text-center">
                <div className="text-lg font-semibold text-white">
                  1
                </div>

                <div className="text-[11px] text-slate-400 uppercase tracking-wider mt-0.5">
                  Conversion
                </div>
              </div>

            </div>

            <div className="bg-indigo-500/10 border border-indigo-500/20 rounded-xl px-4 py-3 text-sm text-indigo-300 flex items-center gap-2">
              🔄 {value} {result.from} equals{' '}
              {result.value.toFixed(2)} {result.to}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}