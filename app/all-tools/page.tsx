import type { Metadata } from "next";
import ToolsDirectory from "@/src/components/ToolsDirectory";

export const metadata: Metadata = {
  title: "All Online Tools & Calculators | UnitNov",
  description:
    "Explore our complete directory of free online calculators, unit converters, and productivity tools. 100% free and client-side private.",
  alternates: {
    canonical: "https://unitnov.com/all-tools",
  },
};

export default function AllToolsPage() {
  return (
    <ToolsDirectory
      initialCategory="all"
      title="All Online Calculators & Tools"
      description="Instant, accurate, and completely free web utilities. No registration, no ads required."
    />
  );
}
