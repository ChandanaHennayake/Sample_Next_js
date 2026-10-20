"use client";

import { useState, useCallback } from "react";
import { useToast } from "@/src/components/Toast";

function generateSinglePasswordHelper(
  len: number,
  up: boolean,
  low: boolean,
  num: boolean,
  sym: boolean,
  excl: boolean
): string {
  let upperChars = "ABCDEFGHJKLMNPQRSTUVWXYZ"; // without I, O if similar excluded
  let lowerChars = "abcdefghijkmnopqrstuvwxyz"; // without l, o if similar excluded
  let numberChars = "23456789"; // without 1, 0 if similar excluded
  const symbolChars = "!@#$%^&*()_+-=[]{}|;:,.<>?";

  if (!excl) {
    upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    lowerChars = "abcdefghijklmnopqrstuvwxyz";
    numberChars = "0123456789";
  }

  let validPool = "";
  if (up) validPool += upperChars;
  if (low) validPool += lowerChars;
  if (num) validPool += numberChars;
  if (sym) validPool += symbolChars;

  if (!validPool) return "Please select at least 1 character set";

  // Use Web Crypto API when available for cryptographically secure random values
  if (typeof window !== "undefined" && window.crypto && window.crypto.getRandomValues) {
    const randomArray = new Uint32Array(len);
    window.crypto.getRandomValues(randomArray);
    let result = "";
    for (let i = 0; i < len; i++) {
      result += validPool[randomArray[i] % validPool.length];
    }
    return result;
  }

  let result = "";
  for (let i = 0; i < len; i++) {
    result += validPool[Math.floor(Math.random() * validPool.length)];
  }
  return result;
}

function generatePasswordBatch(
  count: number,
  len: number,
  up: boolean,
  low: boolean,
  num: boolean,
  sym: boolean,
  excl: boolean
): string[] {
  const list: string[] = [];
  for (let i = 0; i < count; i++) {
    list.push(generateSinglePasswordHelper(len, up, low, num, sym, excl));
  }
  return list;
}

export default function PasswordGeneratorClient() {
  const [length, setLength] = useState<number>(16);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeSimilar, setExcludeSimilar] = useState<boolean>(true);
  const [count, setCount] = useState<number>(1);
  const [passwords, setPasswords] = useState<string[]>(() =>
    generatePasswordBatch(1, 16, true, true, true, true, true)
  );
  const { toast } = useToast();

  const handleUpdate = useCallback(
    (
      newCount = count,
      newLen = length,
      up = includeUpper,
      low = includeLower,
      num = includeNumbers,
      sym = includeSymbols,
      excl = excludeSimilar
    ) => {
      setPasswords(generatePasswordBatch(newCount, newLen, up, low, num, sym, excl));
    },
    [count, length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeSimilar]
  );

  const regenerate = () => {
    handleUpdate(count, length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeSimilar);
  };

  const onLengthChange = (val: number) => {
    setLength(val);
    handleUpdate(count, val, includeUpper, includeLower, includeNumbers, includeSymbols, excludeSimilar);
  };

  const onUpperChange = (val: boolean) => {
    setIncludeUpper(val);
    handleUpdate(count, length, val, includeLower, includeNumbers, includeSymbols, excludeSimilar);
  };

  const onLowerChange = (val: boolean) => {
    setIncludeLower(val);
    handleUpdate(count, length, includeUpper, val, includeNumbers, includeSymbols, excludeSimilar);
  };

  const onNumbersChange = (val: boolean) => {
    setIncludeNumbers(val);
    handleUpdate(count, length, includeUpper, includeLower, val, includeSymbols, excludeSimilar);
  };

  const onSymbolsChange = (val: boolean) => {
    setIncludeSymbols(val);
    handleUpdate(count, length, includeUpper, includeLower, includeNumbers, val, excludeSimilar);
  };

  const onExcludeSimilarChange = (val: boolean) => {
    setExcludeSimilar(val);
    handleUpdate(count, length, includeUpper, includeLower, includeNumbers, includeSymbols, val);
  };

  const onCountChange = (val: number) => {
    setCount(val);
    handleUpdate(val, length, includeUpper, includeLower, includeNumbers, includeSymbols, excludeSimilar);
  };

  // Compute password strength for primary password
  const primaryPassword = passwords[0] || "";
  const entropy = (() => {
    let poolSize = 0;
    if (includeUpper) poolSize += 26;
    if (includeLower) poolSize += 26;
    if (includeNumbers) poolSize += 10;
    if (includeSymbols) poolSize += 28;
    if (poolSize === 0) return 0;
    return Math.round(length * (Math.log(poolSize) / Math.log(2)));
  })();

  const strength = (() => {
    if (entropy < 40) return { label: "Weak", color: "text-rose-400", barClass: "bg-rose-500 w-1/4" };
    if (entropy < 65) return { label: "Fair", color: "text-amber-400", barClass: "bg-amber-500 w-2/4" };
    if (entropy < 90) return { label: "Strong", color: "text-indigo-400", barClass: "bg-indigo-500 w-3/4" };
    return { label: "Very Strong", color: "text-emerald-400", barClass: "bg-emerald-500 w-full" };
  })();

  const copyToClipboard = (text: string) => {
    navigator.clipboard
      .writeText(text)
      .then(() => toast("Password copied to clipboard!"))
      .catch(() => toast("Could not access clipboard", "error"));
  };

  return (
    <div className="bg-[#151926] border border-white/[0.08] rounded-3xl p-6 md:p-8 shadow-2xl shadow-black/20">
      {/* Primary Highlight Password Output */}
      <div className="bg-[#1B2032] border border-indigo-500/30 rounded-2xl p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:flex-1 overflow-x-auto">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
            Generated Secure Password
          </span>
          <div className="font-mono text-xl md:text-2xl font-bold text-white tracking-wider break-all select-all">
            {primaryPassword}
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={regenerate}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white transition-all cursor-pointer border border-white/5 active:rotate-180"
            title="Generate new password"
          >
            🔄
          </button>
          <button
            type="button"
            onClick={() => copyToClipboard(primaryPassword)}
            className="flex-1 sm:flex-none px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs md:text-sm transition-all cursor-pointer shadow-lg shadow-indigo-500/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Copy Password</span>
          </button>
        </div>
      </div>

      {/* Strength indicator */}
      <div className="mb-8 bg-[#121520] p-4 rounded-xl border border-white/5">
        <div className="flex items-center justify-between text-xs mb-2">
          <span className="text-slate-400">Security Strength: <strong className={strength.color}>{strength.label}</strong></span>
          <span className="text-slate-500 font-mono text-[11px]">~{entropy} bits of entropy</span>
        </div>
        <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
          <div className={`h-full transition-all duration-300 ${strength.barClass}`} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Controls Column */}
        <div className="lg:col-span-7 space-y-6">
          {/* Length Slider */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label htmlFor="lengthSlider" className="text-xs font-semibold uppercase tracking-wider text-slate-300">
                Password Length
              </label>
              <span className="text-lg font-bold text-white tabular-nums">
                {length} characters
              </span>
            </div>
            <input
              id="lengthSlider"
              type="range"
              min={8}
              max={64}
              value={length}
              onChange={(e) => onLengthChange(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer h-2 bg-[#22263A] rounded-lg"
            />
            <div className="flex flex-wrap gap-1.5 mt-2">
              {[12, 16, 20, 24, 32, 48].map((l) => (
                <button
                  key={l}
                  type="button"
                  onClick={() => onLengthChange(l)}
                  className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${
                    length === l
                      ? "bg-indigo-600/30 text-indigo-300 border-indigo-500/40 font-semibold"
                      : "bg-white/5 text-slate-400 border-white/5 hover:bg-white/10"
                  }`}
                >
                  {l} chars
                </button>
              ))}
            </div>
          </div>

          {/* Toggles */}
          <div className="space-y-3 pt-2 border-t border-white/[0.06]">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-2">
              Character Sets Included
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#1B2032] border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={includeUpper}
                  onChange={(e) => onUpperChange(e.target.checked)}
                  className="w-4 h-4 rounded accent-indigo-500 cursor-pointer"
                />
                <span>Uppercase (A–Z)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#1B2032] border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={includeLower}
                  onChange={(e) => onLowerChange(e.target.checked)}
                  className="w-4 h-4 rounded accent-indigo-500 cursor-pointer"
                />
                <span>Lowercase (a–z)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#1B2032] border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={includeNumbers}
                  onChange={(e) => onNumbersChange(e.target.checked)}
                  className="w-4 h-4 rounded accent-indigo-500 cursor-pointer"
                />
                <span>Numbers (0–9)</span>
              </label>

              <label className="flex items-center gap-2.5 p-3 rounded-xl bg-[#1B2032] border border-white/5 cursor-pointer hover:border-white/10 transition-colors">
                <input
                  type="checkbox"
                  checked={includeSymbols}
                  onChange={(e) => onSymbolsChange(e.target.checked)}
                  className="w-4 h-4 rounded accent-indigo-500 cursor-pointer"
                />
                <span>Symbols (!@#$%)</span>
              </label>
            </div>

            <label className="flex items-center gap-2.5 pt-2 text-xs text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={excludeSimilar}
                onChange={(e) => onExcludeSimilarChange(e.target.checked)}
                className="w-4 h-4 rounded accent-indigo-500 cursor-pointer"
              />
              <span>Avoid ambiguous characters (e.g., 1, l, I, 0, O, o)</span>
            </label>
          </div>
        </div>

        {/* Bulk Generator Column */}
        <div className="lg:col-span-5 bg-[#1B2032] border border-white/[0.08] rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Bulk Passwords
            </span>
            <div className="flex gap-1 bg-[#121520] p-1 rounded-lg border border-white/5">
              {[1, 5, 10].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => onCountChange(n)}
                  className={`text-[11px] px-2.5 py-0.5 rounded-md font-semibold transition-all ${
                    count === n
                      ? "bg-indigo-600 text-white"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2 max-h-[280px] overflow-y-auto pr-1">
            {passwords.map((pwd, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-xl bg-[#121520] border border-white/5 flex items-center justify-between gap-2 hover:border-white/10 transition-colors"
              >
                <span className="font-mono text-xs text-slate-200 truncate flex-1">
                  {pwd}
                </span>
                <button
                  type="button"
                  onClick={() => copyToClipboard(pwd)}
                  className="text-[11px] text-indigo-400 hover:text-indigo-300 font-medium px-2 py-1 rounded bg-white/5 hover:bg-white/10 shrink-0"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
