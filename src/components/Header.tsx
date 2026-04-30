'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

const entrepriseLinks = [
  { label: 'À propos', href: '/a-propos' },
  { label: 'Carrières', href: '/carrieres' },
  { label: 'Newsroom', href: '/newsroom' },
  { label: 'Contact', href: '/contact' },
];

const solutionsLinks = [
  { label: 'OtoStop', href: '/solutions/otostop' },
  { label: 'ZEHOUSE', href: '/solutions/zehouse' },
  { label: 'ZETRAVEL', href: '/solutions/zetravel' },
  { label: 'LogistikAgricol', href: '/solutions/logistikagricol' },
  { label: 'Dirty Meta', href: '/solutions/dirty-meta' },
  { label: 'Health-of', href: '/solutions/health-of' },
  { label: 'AI-Mimicry', href: '/solutions/ai-mimicry' },
];

export default function Header() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center justify-between px-6 md:px-8 h-16 bg-white/80 backdrop-blur-md rounded-full border border-border shadow-sm">
          {/* Logo */}
          <Link href="/homepage" className="flex items-center gap-2.5 group">
            <AppLogo size={32} />
            <span className="font-sans font-bold text-lg tracking-tight text-foreground">
              WFTECH
            </span>
          </Link>

          {/* Nav Links — Desktop */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/homepage#services"
              className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted hover:text-foreground transition-colors"
            >
              Services
            </Link>

            {/* Solutions Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setSolutionsOpen(true)}
              onMouseLeave={() => setSolutionsOpen(false)}
            >
              <button
                className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted hover:text-foreground transition-colors flex items-center gap-1"
                aria-expanded={solutionsOpen}
                aria-haspopup="true"
              >
                Solutions
                <svg
                  className={`w-3 h-3 transition-transform ${solutionsOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {solutionsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-48 bg-white border border-border rounded-2xl shadow-lg overflow-hidden">
                  {solutionsLinks?.map((link) => (
                    <Link
                      key={link?.href}
                      href={link?.href}
                      className="block px-5 py-3 font-mono text-[11px] font-medium tracking-widest uppercase text-muted hover:text-foreground hover:bg-gray-50 transition-colors"
                    >
                      {link?.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Entreprise Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button
                className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted hover:text-foreground transition-colors flex items-center gap-1"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                Entreprise
                <svg
                  className={`w-3 h-3 transition-transform ${dropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-44 bg-white border border-border rounded-2xl shadow-lg overflow-hidden">
                  {entrepriseLinks?.map((link) => (
                    <Link
                      key={link?.href}
                      href={link?.href}
                      className="block px-5 py-3 font-mono text-[11px] font-medium tracking-widest uppercase text-muted hover:text-foreground hover:bg-gray-50 transition-colors"
                    >
                      {link?.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right side — CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Link
              href="/contact"
              className="btn-primary bg-foreground text-white px-5 py-2.5 rounded-full font-mono text-[10px] font-medium tracking-widest uppercase hover:bg-gray-800 hidden md:inline-flex"
            >
              Nous contacter
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5"
              aria-label="Menu"
            >
              <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden mt-2 bg-white border border-border rounded-3xl shadow-lg overflow-hidden">
            <div className="p-6 space-y-1">
              <Link
                href="/homepage#services"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 font-mono text-[11px] font-medium tracking-widest uppercase text-muted hover:text-foreground hover:bg-gray-50 rounded-xl transition-colors"
              >
                Services
              </Link>

              <div>
                <p className="px-4 py-2 font-mono text-[10px] font-medium tracking-widest uppercase text-foreground/40">
                  Solutions
                </p>
                {solutionsLinks?.map((link) => (
                  <Link
                    key={link?.href}
                    href={link?.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 font-mono text-[11px] font-medium tracking-widest uppercase text-muted hover:text-foreground hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    {link?.label}
                  </Link>
                ))}
              </div>

              <div>
                <p className="px-4 py-2 font-mono text-[10px] font-medium tracking-widest uppercase text-foreground/40">
                  Entreprise
                </p>
                {entrepriseLinks?.map((link) => (
                  <Link
                    key={link?.href}
                    href={link?.href}
                    onClick={() => setMobileOpen(false)}
                    className="block px-4 py-2.5 font-mono text-[11px] font-medium tracking-widest uppercase text-muted hover:text-foreground hover:bg-gray-50 rounded-xl transition-colors"
                  >
                    {link?.label}
                  </Link>
                ))}
              </div>

              <div className="pt-2 border-t border-border">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-foreground text-white px-5 py-3 rounded-full font-mono text-[10px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors mt-2"
                >
                  Nous contacter
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}