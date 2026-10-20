"use client";

import { useState, useMemo } from "react";
import { useToast } from "@/src/components/Toast";

export default function BMICalculatorClient() {
  const [unitSystem, setUnitSystem] = useState<"metric" | "imperial">("metric");

  // Metric fields
  const [heightCm, setHeightCm] = useState<number>(175);
  const [weightKg, setWeightKg] = useState<number>(70);

  // Imperial fields
  const [heightFeet, setHeightFeet] = useState<number>(5);
  const [heightInches, setHeightInches] = useState<number>(9);
  const [weightLbs, setWeightLbs] = useState<number>(155);

  const [copied, setCopied] = useState<boolean>(false);
  const { toast } = useToast();

  const calculation = useMemo(() => {
    let weightInKg = 0;
    let heightInMeters = 0;

    if (unitSystem === "metric") {
      weightInKg = weightKg;
      heightInMeters = heightCm / 100;
    } else {
      weightInKg = weightLbs * 0.45359237;
      const totalInches = heightFeet * 12 + heightInches;
      heightInMeters = totalInches * 0.0254;
    }

    if (weightInKg <= 0 || heightInMeters <= 0) {
      return null;
    }

    const bmi = weightInKg / (heightInMeters * heightInMeters);

    let category = "Normal Weight";
    let colorClass = "text-emerald-400";
    let bgClass = "bg-emerald-500/10 border-emerald-500/20";
    let advice = "Your BMI is within the healthy recommended range.";

    if (bmi < 18.5) {
      category = "Underweight";
      colorClass = "text-sky-400";
      bgClass = "bg-sky-500/10 border-sky-500/20";
      advice = "Your BMI suggests you may be underweight. Consult a healthcare provider regarding nutritional intake.";
    } else if (bmi < 25) {
      category = "Normal Weight";
      colorClass = "text-emerald-400";
      bgClass = "bg-emerald-500/10 border-emerald-500/20";
      advice = "Great! Your BMI falls within the healthy body mass range according to WHO guidelines.";
    } else if (bmi < 30) {
      category = "Overweight";
      colorClass = "text-amber-400";
      bgClass = "bg-amber-500/10 border-amber-500/20";
      advice = "Your BMI indicates moderate excess weight. Regular physical activity and balanced diet are beneficial.";
    } else {
      category = "Obesity";
      colorClass = "text-rose-400";
      bgClass = "bg-rose-500/10 border-rose-500/20";
      advice = "Your BMI falls in the obesity classification. Consult a physician for personalized health recommendations.";
    }

    // Healthy weight range for this height (BMI 18.5 to 24.9)
    const minHealthyKg = 18.5 * (heightInMeters * heightInMeters);
    const maxHealthyKg = 24.9 * (heightInMeters * heightInMeters);

    const healthyRangeText =
      unitSystem === "metric"
        ? `${minHealthyKg.toFixed(1)} kg – ${maxHealthyKg.toFixed(1)} kg`
        : `${(minHealthyKg * 2.20462).toFixed(1)} lbs – ${(maxHealthyKg * 2.20462).toFixed(1)} lbs`;

    return {
      bmi: Math.round(bmi * 10) / 10,
      category,
      colorClass,
      bgClass,
      advice,
      healthyRangeText,
    };
  }, [unitSystem, heightCm, weightKg, heightFeet, heightInches, weightLbs]);

  const copySummary = () => {
    if (!calculation) return;
    const text = `UnitNov BMI Calculation Summary:
• BMI Score: ${calculation.bmi} (${calculation.category})
• Healthy Weight Range: ${calculation.healthyRangeText}
Calculated free at https://unitnov.com/calculators/bmi-calculator`;

    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        toast("BMI summary copied to clipboard");
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(() => toast("Couldn't access clipboard", "error"));
  };

  return (
    <div className="bg-[#151926] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/20">
      {/* Unit System Toggle */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-[#121520] p-1 rounded-xl border border-white/5 flex gap-1">
          <button
            type="button"
            onClick={() => setUnitSystem("metric")}
            className={`px-5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              unitSystem === "metric"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Metric (cm, kg)
          </button>
          <button
            type="button"
            onClick={() => setUnitSystem("imperial")}
            className={`px-5 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
              unitSystem === "imperial"
                ? "bg-indigo-600 text-white shadow-md shadow-indigo-500/20"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Imperial (ft, in, lbs)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Input Column */}
        <div className="lg:col-span-6 space-y-6">
          {unitSystem === "metric" ? (
            <>
              {/* Height in cm */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="heightCm" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Height (cm)
                  </label>
                  <span className="text-lg font-bold text-white tabular-nums">
                    {heightCm} cm ({(heightCm / 100).toFixed(2)} m)
                  </span>
                </div>
                <input
                  id="heightCm"
                  type="range"
                  min={120}
                  max={230}
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer h-2 bg-[#22263A] rounded-lg"
                />
              </div>

              {/* Weight in kg */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="weightKg" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Weight (kg)
                  </label>
                  <span className="text-lg font-bold text-white tabular-nums">
                    {weightKg} kg ({(weightKg * 2.20462).toFixed(1)} lbs)
                  </span>
                </div>
                <input
                  id="weightKg"
                  type="range"
                  min={35}
                  max={180}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer h-2 bg-[#22263A] rounded-lg"
                />
              </div>
            </>
          ) : (
            <>
              {/* Height in feet and inches */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">
                  Height (Feet & Inches)
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">Feet</span>
                    <select
                      value={heightFeet}
                      onChange={(e) => setHeightFeet(Number(e.target.value))}
                      className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-3 py-2 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
                    >
                      {[4, 5, 6, 7].map((f) => (
                        <option key={f} value={f}>
                          {f} ft
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block mb-1">Inches</span>
                    <select
                      value={heightInches}
                      onChange={(e) => setHeightInches(Number(e.target.value))}
                      className="w-full bg-[#1B2032] border border-white/10 rounded-xl px-3 py-2 text-sm font-semibold text-white focus:outline-none focus:border-indigo-500"
                    >
                      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((inch) => (
                        <option key={inch} value={inch}>
                          {inch} in
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Weight in lbs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="weightLbs" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                    Weight (lbs)
                  </label>
                  <span className="text-lg font-bold text-white tabular-nums">
                    {weightLbs} lbs ({(weightLbs * 0.453592).toFixed(1)} kg)
                  </span>
                </div>
                <input
                  id="weightLbs"
                  type="range"
                  min={80}
                  max={400}
                  step={1}
                  value={weightLbs}
                  onChange={(e) => setWeightLbs(Number(e.target.value))}
                  className="w-full accent-indigo-500 cursor-pointer h-2 bg-[#22263A] rounded-lg"
                />
              </div>
            </>
          )}
        </div>

        {/* Results Column */}
        <div className="lg:col-span-6 bg-[#1B2032] border border-white/[0.08] rounded-2xl p-6 flex flex-col justify-between">
          {calculation ? (
            <div className="space-y-5">
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                  Your Calculated Body Mass Index
                </span>
                <div className="flex items-baseline gap-3 mt-1">
                  <span className="text-5xl font-black text-white tracking-tight tabular-nums">
                    {calculation.bmi}
                  </span>
                  <span className={`text-xl font-bold ${calculation.colorClass}`}>
                    {calculation.category}
                  </span>
                </div>
              </div>

              {/* Status card */}
              <div className={`p-4 rounded-xl border text-xs leading-relaxed ${calculation.bgClass}`}>
                {calculation.advice}
              </div>

              {/* Healthy Range Indicator */}
              <div className="bg-[#121520] border border-white/5 rounded-xl p-4 text-xs space-y-1">
                <span className="text-slate-400 block">Recommended healthy weight for your height:</span>
                <span className="font-bold text-white text-sm">{calculation.healthyRangeText}</span>
              </div>

              {/* Action buttons */}
              <div className="pt-2 border-t border-white/[0.06] flex items-center gap-2">
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
                  <span>{copied ? "Copied!" : "Copy BMI Summary"}</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-slate-400 text-sm">
              Please enter valid height and weight values.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
