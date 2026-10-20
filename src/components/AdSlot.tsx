"use client";

interface AdSlotProps {
  slotId?: string;
  format?: "horizontal" | "rectangle" | "vertical";
  label?: string;
  className?: string;
}

/**
 * Responsive AdSlot component designed to reserve layout space and prevent CLS (Cumulative Layout Shift).
 * Displays a clean non-intrusive placeholder until live AdSense scripts are active.
 */
export default function AdSlot({
  format = "horizontal",
  label = "Sponsored Placement",
  className = "",
}: AdSlotProps) {
  // Until real ad code is wired up (NEXT_PUBLIC_ADSENSE_CLIENT), render nothing in production:
  // empty "ad space" boxes look broken to visitors and can hurt AdSense review.
  if (process.env.NODE_ENV === "production" && !process.env.NEXT_PUBLIC_ADSENSE_CLIENT) {
    return null;
  }

  const getFormatClass = () => {
    switch (format) {
      case "rectangle":
        return "w-full max-w-[336px] min-h-[280px]";
      case "vertical":
        return "w-full max-w-[300px] min-h-[600px]";
      case "horizontal":
      default:
        return "w-full min-h-[90px] md:min-h-[100px]";
    }
  };

  return (
    <div className={`my-8 flex flex-col items-center justify-center ${className}`}>
      <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 mb-1.5">
        {label}
      </span>
      <div
        className={`${getFormatClass()} rounded-xl border border-white/[0.06] bg-[#121520]/60 flex flex-col items-center justify-center p-4 text-center transition-colors hover:border-white/10`}
      >
        <div className="flex items-center gap-2 text-slate-500 text-xs font-medium">
          <svg className="w-4 h-4 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>Advertisement Space</span>
        </div>
        <p className="text-[11px] text-slate-600 mt-1">
          UnitNov Partner Network
        </p>
      </div>
    </div>
  );
}
