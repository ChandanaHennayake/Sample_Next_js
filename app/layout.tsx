import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import { GoogleAnalytics } from "@next/third-parties/google";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import CommandPalette from "@/src/components/CommandPalette";
import { ToastProvider } from "@/src/components/Toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://unitnov.com"),

  // Google Search Console verification
  verification: {
    google: "zhoBvdPxnO40PvyFYHCl6tAdGbNFVFhufW-ZpwKgy_A",
  },

  title: {
    default: "UnitNov - Free Online Calculators & Tools",
    template: "%s | UnitNov",
  },

  description:
    "UnitNov offers free online calculators and tools including Age Calculator, BMI Calculator, Loan Calculator, Percentage Calculator, Date Calculator, Unit Converter, Compound Interest Calculator, and more.",

  keywords: [
    "online calculator",
    "free calculator",
    "age calculator",
    "BMI calculator",
    "loan calculator",
    "mortgage calculator",
    "percentage calculator",
    "date calculator",
    "discount calculator",
    "compound interest calculator",
    "unit converter",
    "online tools",
    "UnitNov",
  ],

  applicationName: "UnitNov",

  authors: [
    {
      name: "UnitNov",
      url: "https://unitnov.com",
    },
  ],

  creator: "UnitNov",
  publisher: "UnitNov",

  alternates: {
    canonical: "https://unitnov.com",
  },

  robots: {
    index: true,
    follow: true,

    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://unitnov.com",
    siteName: "UnitNov",

    title: "UnitNov - Free Online Calculators & Tools",

    description:
      "Free online calculators for finance, health, math, dates, percentages, conversions and more.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "UnitNov - Free Online Calculators & Tools",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "UnitNov - Free Online Calculators & Tools",

    description:
      "Free online calculators and productivity tools.",

    images: ["/og-image.png"],
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#090B11] text-slate-100 antialiased font-sans selection:bg-indigo-500/30 selection:text-indigo-200 min-h-screen relative overflow-x-hidden">
        {/* Atmospheric Aurora Lighting Layers */}
        <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1100px] h-[550px] bg-gradient-to-b from-indigo-500/15 via-violet-500/10 to-transparent blur-[130px] rounded-full" />
          <div className="absolute top-[35%] -left-48 w-[650px] h-[650px] bg-cyan-500/6 blur-[150px] rounded-full" />
          <div className="absolute top-[65%] -right-48 w-[650px] h-[650px] bg-indigo-500/6 blur-[150px] rounded-full" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
        </div>

        <ToastProvider>
          <Header />

          <main className="max-w-6xl mx-auto px-6 py-8">
            {children}
          </main>

          <Footer />
          <CommandPalette />
        </ToastProvider>

        {/* Google Analytics */}
        <GoogleAnalytics gaId="G-QJYN3G8M00" />

        {/* Google AdSense (Enabled when NEXT_PUBLIC_ADSENSE_CLIENT is set in Vercel) */}
        {process.env.NEXT_PUBLIC_ADSENSE_CLIENT && (
          <Script
            id="google-adsense"
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}
      </body>
    </html>
  );
}