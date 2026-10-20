import type { Metadata } from "next";
import ToolsDirectory from "@/src/components/ToolsDirectory";

export const metadata: Metadata = {
  title: "Unit Converters - Metric & Imperial Units | UnitNov",
  description:
    "Free online unit converters for length, weight, volume, speed, and temperature. Convert between metric and imperial systems instantly.",
  alternates: {
    canonical: "https://unitnov.com/converters",
  },
};

export default function ConvertersPage() {
  return (
    <ToolsDirectory
      initialCategory="converters"
      title="Unit Converters"
      description="Quickly convert between common imperial and metric measurements with zero latency."
    />
  );
}
