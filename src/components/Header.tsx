"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { openCommandPalette } from "@/src/components/CommandPalette";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: "Calculators", href: "/calculators" },
    { label: "Converters", href: "/converters" },
    { label: "Generators", href: "/generators" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.08] bg-[#0F1117]/85 backdrop-blur-xl">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-500 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-200">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2.2}
                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-white font-bold text-lg tracking-tight group-hover:text-indigo-400 transition-colors leading-none">
              UnitNov
            </span>
            <span className="text-[10px] text-slate-400 font-medium tracking-wider uppercase mt-0.5">
              Free Online Tools
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1.5">
          <button
            id="headerSearchButton"
            type="button"
            onClick={openCommandPalette}
            className="mr-2 flex items-center gap-2 w-56 px-3 py-1.5 rounded-lg bg-white/[0.04] border border-white/10 text-slate-400 text-sm hover:border-indigo-500/40 hover:text-slate-200 transition-colors cursor-pointer"
            aria-label="Search tools"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
            </svg>
            <span className="flex-1 text-left">Search tools…</span>
            <kbd className="text-[10px] font-semibold border border-white/10 rounded px-1.5 py-0.5">Ctrl K</kbd>
          </button>
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-1.5 text-sm font-medium rounded-lg transition-all duration-150 ${
                  isActive
                    ? "text-white bg-white/10 shadow-sm"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="w-px h-4 bg-white/10 mx-2" />

          <Link
            href="/all-tools"
            className="px-4 py-1.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 rounded-lg transition-all duration-200 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/35 active:scale-95"
          >
            All Tools
          </Link>
        </nav>

        {/* Mobile actions */}
        <div className="md:hidden flex items-center gap-1">
        <button
          id="mobileSearchButton"
          type="button"
          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          onClick={openCommandPalette}
          aria-label="Search tools"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M17 11A6 6 0 115 11a6 6 0 0112 0z" />
          </svg>
        </button>
        <button
          className="p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-lg transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/[0.08] bg-[#0F1117] px-6 py-4 flex flex-col gap-2 slide-down">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-all"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/all-tools"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors text-center shadow-md shadow-indigo-500/20"
          >
            Browse All Tools
          </Link>
        </div>
      )}
    </header>
  );
}