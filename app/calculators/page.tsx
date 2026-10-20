import type { Metadata } from "next";
import ToolsDirectory from "@/src/components/ToolsDirectory";

export const metadata: Metadata = {
  title: "Online Calculators - Finance, Math & Health | UnitNov",
  description:
    "Free online calculators for loan payments, mortgages, compound interest, BMI, percentage calculations, dates, and discounts.",
  alternates: {
    canonical: "https://unitnov.com/calculators",
  },
};

export default function CalculatorsPage() {
  return (
    <ToolsDirectory
      initialCategory="all"
      title="Online Calculators"
      description="Perform quick, precise calculations for personal finance, mathematical formulas, and health metrics."
    />
  );
}
