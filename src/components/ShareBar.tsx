"use client";

import { useState } from "react";
import { useToast } from "@/src/components/Toast";

interface ShareBarProps {
  toolName: string;
  summaryText?: string;
  className?: string;
}

export default function ShareBar({ toolName, summaryText, className = "" }: ShareBarProps) {
  const [copied, setCopied] = useState<boolean>(false);
  const { toast } = useToast();

  const handleCopy = () => {
    const textToCopy = summaryText || (typeof window !== "undefined" ? window.location.href : `https://unitnov.com`);
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setCopied(true);
          toast("Link & summary copied to clipboard!");
          setTimeout(() => setCopied(false), 2000);
        })
        .catch(() => toast("Could not access clipboard", "error"));
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const currentUrl = typeof window !== "undefined" ? encodeURIComponent(window.location.href) : "https%3A%2F%2Funitnov.com";
  const shareText = encodeURIComponent(`Check out this free ${toolName} on UnitNov: `);

  const twitterUrl = `https://twitter.com/intent/tweet?text=${shareText}&url=${currentUrl}`;
  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`;
  const whatsAppUrl = `https://api.whatsapp.com/send?text=${shareText}%20${currentUrl}`;

  return (
    <div
      data-no-print="true"
      className={`bg-[#151926] border border-white/[0.08] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3 ${className}`}
    >
      <div className="flex items-center gap-2">
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Share & Export:
        </span>
      </div>

      <div className="flex items-center flex-wrap gap-2">
        {/* Copy Link / Summary */}
        <button
          type="button"
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/5 transition-all cursor-pointer active:scale-95"
          title="Copy link to clipboard"
        >
          <span>{copied ? "✓ Copied" : "📋 Copy Link"}</span>
        </button>

        {/* Print / Save PDF */}
        <button
          type="button"
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs font-medium border border-white/5 transition-all cursor-pointer active:scale-95"
          title="Print or Save as PDF"
        >
          <span>🖨️ Print / PDF</span>
        </button>

        {/* Twitter / X */}
        <a
          href={twitterUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs border border-white/5 transition-all"
          title="Share on X"
          aria-label="Share on X"
        >
          𝕏
        </a>

        {/* LinkedIn */}
        <a
          href={linkedInUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs border border-white/5 transition-all"
          title="Share on LinkedIn"
          aria-label="Share on LinkedIn"
        >
          in
        </a>

        {/* WhatsApp */}
        <a
          href={whatsAppUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white text-xs border border-white/5 transition-all"
          title="Share on WhatsApp"
          aria-label="Share on WhatsApp"
        >
          💬
        </a>
      </div>
    </div>
  );
}
