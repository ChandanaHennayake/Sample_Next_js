"use client";

import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#2A2D3A] bg-[#0F1117]/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 11h.01M12 11h.01M15 11h.01M4 19h16a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <span className="text-white font-bold text-lg tracking-tight group-hover:text-indigo-400 transition-colors">
            ToolHub
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/calculators" className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-all">
            Calculators
          </Link>
          <Link href="/converters" className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-all">
            Converters
          </Link>
          <Link href="/generators" className="px-3 py-1.5 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-all">
            Generators
          </Link>
          <div className="w-px h-4 bg-[#2A2D3A] mx-2" />
          <Link
            href="/all-tools"
            className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors shadow-md shadow-indigo-500/20"
          >
            All Tools
          </Link>
        </nav>

        {/* Mobile menu button */}
        <button
          className="md:hidden p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-all"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
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

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-[#2A2D3A] bg-[#0F1117] px-6 py-3 flex flex-col gap-1">
          <Link href="/calculators" className="px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-all">Calculators</Link>
          <Link href="/converters" className="px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-all">Converters</Link>
          <Link href="/generators" className="px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition-all">Generators</Link>
          <Link href="/all-tools" className="mt-1 px-3 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-md transition-colors text-center">All Tools</Link>
        </div>
      )}
    </header>
  );
}