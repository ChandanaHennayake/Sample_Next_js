import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Age Calculator - Calculate Your Exact Age Online",

  description:
    "Calculate your exact age in years, months, weeks, and days. Find out how many days remain until your next birthday with our free online age calculator.",

  openGraph: {
    type: "website",
    url: "https://unitnov.com/calculators/age-calculator",
    title: "Age Calculator - Calculate Your Exact Age Online",
    description:
      "Find your exact age in years, months, weeks, and days instantly.",
    siteName: "UnitNov",
  },

  twitter: {
    card: "summary_large_image",
    title: "Age Calculator - Calculate Your Exact Age Online",
    description:
      "Calculate your exact age and next birthday countdown online for free.",
  },

  alternates: {
    canonical: "https://unitnov.com/calculators/age-calculator",
  },

  robots: {
    index: true,
    follow: true,
  },
};