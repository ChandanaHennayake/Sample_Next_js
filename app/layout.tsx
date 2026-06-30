import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/src/components/Header";
import Footer from "@/src/components/Footer";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ToolHub — Free Online Tools",
  description: "Fast, free online calculators and tools for everyday use.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-[#0F1117] text-slate-100 antialiased font-sans">
        <Header />
        <main className="max-w-5xl mx-auto px-6 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}