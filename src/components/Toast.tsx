"use client";

import { createContext, useCallback, useContext, useRef, useState, ReactNode } from "react";

type ToastVariant = "success" | "info" | "error";

interface ToastItem {
  id: number;
  message: string;
  variant: ToastVariant;
}

interface ToastContextValue {
  toast: (message: string, variant?: ToastVariant) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  // Fail soft: if a component renders outside the provider, toasts become no-ops.
  return ctx ?? { toast: () => {} };
}

const variantStyles: Record<ToastVariant, { ring: string; icon: string; iconBg: string }> = {
  success: { ring: "border-emerald-500/30", icon: "✓", iconBg: "bg-emerald-500/15 text-emerald-300" },
  info: { ring: "border-indigo-500/30", icon: "i", iconBg: "bg-indigo-500/15 text-indigo-300" },
  error: { ring: "border-rose-500/30", icon: "!", iconBg: "bg-rose-500/15 text-rose-300" },
};

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const nextId = useRef(1);

  const toast = useCallback((message: string, variant: ToastVariant = "success") => {
    const id = nextId.current++;
    setToasts((prev) => [...prev.slice(-2), { id, message, variant }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 2600);
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div
        aria-live="polite"
        className="fixed bottom-5 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center gap-2 pointer-events-none"
      >
        {toasts.map((t) => {
          const s = variantStyles[t.variant];
          return (
            <div
              key={t.id}
              role="status"
              className={`toast-in pointer-events-auto flex items-center gap-3 rounded-xl border ${s.ring} bg-[#1A1F2E]/95 backdrop-blur-xl px-4 py-2.5 text-sm text-slate-100 shadow-2xl shadow-black/40`}
            >
              <span className={`w-5 h-5 rounded-md flex items-center justify-center text-[11px] font-bold ${s.iconBg}`}>
                {s.icon}
              </span>
              {t.message}
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}
