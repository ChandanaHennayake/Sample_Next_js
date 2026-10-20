"use client";

import { useState, useMemo } from "react";
import { useToast } from "@/src/components/Toast";

type UnitCategory = "length" | "weight" | "temperature" | "volume" | "speed";

interface UnitDef {
  id: string;
  name: string;
  symbol: string;
  // ratio to base unit
  toBase?: (val: number) => number;
  fromBase?: (val: number) => number;
}

const unitDatabase: Record<UnitCategory, { label: string; icon: string; baseUnit: string; units: UnitDef[] }> = {
  length: {
    label: "Length",
    icon: "📏",
    baseUnit: "meters",
    units: [
      { id: "m", name: "Meter", symbol: "m", toBase: (v) => v, fromBase: (v) => v },
      { id: "km", name: "Kilometer", symbol: "km", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
      { id: "cm", name: "Centimeter", symbol: "cm", toBase: (v) => v / 100, fromBase: (v) => v * 100 },
      { id: "mm", name: "Millimeter", symbol: "mm", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "mi", name: "Mile", symbol: "mi", toBase: (v) => v * 1609.344, fromBase: (v) => v / 1609.344 },
      { id: "yd", name: "Yard", symbol: "yd", toBase: (v) => v * 0.9144, fromBase: (v) => v / 0.9144 },
      { id: "ft", name: "Foot", symbol: "ft", toBase: (v) => v * 0.3048, fromBase: (v) => v / 0.3048 },
      { id: "in", name: "Inch", symbol: "in", toBase: (v) => v * 0.0254, fromBase: (v) => v / 0.0254 },
    ],
  },
  weight: {
    label: "Weight & Mass",
    icon: "⚖️",
    baseUnit: "kilograms",
    units: [
      { id: "kg", name: "Kilogram", symbol: "kg", toBase: (v) => v, fromBase: (v) => v },
      { id: "g", name: "Gram", symbol: "g", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "mg", name: "Milligram", symbol: "mg", toBase: (v) => v / 1000000, fromBase: (v) => v * 1000000 },
      { id: "lb", name: "Pound", symbol: "lb", toBase: (v) => v * 0.45359237, fromBase: (v) => v / 0.45359237 },
      { id: "oz", name: "Ounce", symbol: "oz", toBase: (v) => v * 0.028349523, fromBase: (v) => v / 0.028349523 },
      { id: "t", name: "Metric Ton", symbol: "t", toBase: (v) => v * 1000, fromBase: (v) => v / 1000 },
    ],
  },
  temperature: {
    label: "Temperature",
    icon: "🌡️",
    baseUnit: "celsius",
    units: [
      { id: "c", name: "Celsius", symbol: "°C", toBase: (v) => v, fromBase: (v) => v },
      { id: "f", name: "Fahrenheit", symbol: "°F", toBase: (v) => ((v - 32) * 5) / 9, fromBase: (v) => (v * 9) / 5 + 32 },
      { id: "k", name: "Kelvin", symbol: "K", toBase: (v) => v - 273.15, fromBase: (v) => v + 273.15 },
    ],
  },
  volume: {
    label: "Volume",
    icon: "🧪",
    baseUnit: "liters",
    units: [
      { id: "l", name: "Liter", symbol: "L", toBase: (v) => v, fromBase: (v) => v },
      { id: "ml", name: "Milliliter", symbol: "mL", toBase: (v) => v / 1000, fromBase: (v) => v * 1000 },
      { id: "gal", name: "Gallon (US)", symbol: "gal", toBase: (v) => v * 3.78541, fromBase: (v) => v / 3.78541 },
      { id: "qt", name: "Quart (US)", symbol: "qt", toBase: (v) => v * 0.946353, fromBase: (v) => v / 0.946353 },
      { id: "cup", name: "Cup (US)", symbol: "cup", toBase: (v) => v * 0.236588, fromBase: (v) => v / 0.236588 },
      { id: "floz", name: "Fluid Ounce", symbol: "fl oz", toBase: (v) => v * 0.0295735, fromBase: (v) => v / 0.0295735 },
    ],
  },
  speed: {
    label: "Speed",
    icon: "🚀",
    baseUnit: "m/s",
    units: [
      { id: "kmh", name: "Kilometers / Hour", symbol: "km/h", toBase: (v) => v / 3.6, fromBase: (v) => v * 3.6 },
      { id: "mph", name: "Miles / Hour", symbol: "mph", toBase: (v) => v * 0.44704, fromBase: (v) => v / 0.44704 },
      { id: "ms", name: "Meters / Second", symbol: "m/s", toBase: (v) => v, fromBase: (v) => v },
      { id: "knot", name: "Knot", symbol: "kn", toBase: (v) => v * 0.514444, fromBase: (v) => v / 0.514444 },
    ],
  },
};

export default function UnitConverterClient() {
  const [category, setCategory] = useState<UnitCategory>("length");
  const [inputValue, setInputValue] = useState<number>(1);
  const [fromUnitId, setFromUnitId] = useState<string>("km");
  const [toUnitId, setToUnitId] = useState<string>("mi");
  const { toast } = useToast();

  const currentCategoryDef = unitDatabase[category];
  const units = currentCategoryDef.units;

  // Handle category change (reset selected units to valid pair)
  const handleCategoryChange = (newCat: UnitCategory) => {
    setCategory(newCat);
    const catUnits = unitDatabase[newCat].units;
    setFromUnitId(catUnits[0].id);
    setToUnitId(catUnits[1]?.id || catUnits[0].id);
  };

  const swapUnits = () => {
    const temp = fromUnitId;
    setFromUnitId(toUnitId);
    setToUnitId(temp);
  };

  const convertedValue = useMemo(() => {
    if (isNaN(inputValue)) return 0;
    const fromDef = units.find((u) => u.id === fromUnitId);
    const toDef = units.find((u) => u.id === toUnitId);
    if (!fromDef || !toDef || !fromDef.toBase || !toDef.fromBase) return 0;

    const baseVal = fromDef.toBase(inputValue);
    const result = toDef.fromBase(baseVal);

    // Format precision dynamically
    if (Math.abs(result) >= 1000 || Math.abs(result) < 0.001) {
      return parseFloat(result.toPrecision(6));
    }
    return Math.round(result * 100000) / 100000;
  }, [inputValue, fromUnitId, toUnitId, units]);

  const copyResult = () => {
    const fromDef = units.find((u) => u.id === fromUnitId);
    const toDef = units.find((u) => u.id === toUnitId);
    const text = `${inputValue} ${fromDef?.symbol} = ${convertedValue} ${toDef?.symbol} (UnitNov)`;

    navigator.clipboard
      .writeText(text)
      .then(() => toast("Conversion copied to clipboard!"))
      .catch(() => toast("Couldn't access clipboard", "error"));
  };

  const fromDef = units.find((u) => u.id === fromUnitId);
  const toDef = units.find((u) => u.id === toUnitId);

  return (
    <div className="bg-[#151926] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/20">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
        {(Object.keys(unitDatabase) as UnitCategory[]).map((catKey) => {
          const item = unitDatabase[catKey];
          const isSelected = category === catKey;
          return (
            <button
              key={catKey}
              type="button"
              onClick={() => handleCategoryChange(catKey)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
                isSelected
                  ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/25"
                  : "bg-[#1B2032] text-slate-400 hover:text-white border border-white/5"
              }`}
            >
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Converter Control Grid */}
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 items-center">
          {/* From Side */}
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="fromUnitSelect" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              From
            </label>
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(Number(e.target.value))}
              className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-4 py-3 text-lg font-bold text-white focus:outline-none focus:border-indigo-500"
            />
            <select
              id="fromUnitSelect"
              value={fromUnitId}
              onChange={(e) => setFromUnitId(e.target.value)}
              className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>

          {/* Swap Button */}
          <div className="flex items-center justify-center md:pt-6">
            <button
              type="button"
              onClick={swapUnits}
              className="w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-slate-300 hover:text-white transition-all cursor-pointer active:scale-95 shadow-lg"
              title="Swap units"
            >
              ⇄
            </button>
          </div>

          {/* To Side */}
          <div className="md:col-span-2 space-y-2">
            <label htmlFor="toUnitSelect" className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
              To
            </label>
            <div className="w-full bg-[#121520] border border-white/5 rounded-xl px-4 py-3 text-lg font-bold text-emerald-400 tabular-nums overflow-x-auto">
              {convertedValue}
            </div>
            <select
              id="toUnitSelect"
              value={toUnitId}
              onChange={(e) => setToUnitId(e.target.value)}
              className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-3 py-2 text-xs font-semibold text-white focus:outline-none focus:border-indigo-500"
            >
              {units.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.name} ({u.symbol})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Big Highlight Answer */}
        <div className="bg-[#1B2032] border border-indigo-500/30 rounded-2xl p-6 text-center">
          <span className="text-xs uppercase font-semibold tracking-wider text-indigo-400 block mb-1">
            Conversion Result
          </span>
          <div className="text-3xl md:text-4xl font-black text-white tabular-nums">
            {inputValue} {fromDef?.symbol} ={" "}
            <span className="text-emerald-400">
              {convertedValue} {toDef?.symbol}
            </span>
          </div>
          <button
            type="button"
            onClick={copyResult}
            className="mt-4 px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-medium text-xs transition-colors cursor-pointer shadow-md shadow-indigo-500/20"
          >
            Copy Conversion
          </button>
        </div>
      </div>
    </div>
  );
}
