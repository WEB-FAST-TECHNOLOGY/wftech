'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';
import { useLanguage } from '@/context/LanguageContext';
import { SUPPORTED_LANGUAGES, Language } from '@/lib/i18n';

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
  const [langOpen, setLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const currentLang = SUPPORTED_LANGUAGES.find(l => l.code === language);

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
              {t.nav.services}
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
                {t.nav.solutions}
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 z-50">
                  <div className="w-48 bg-white/95 backdrop-blur-md border border-border rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {solutionsLinks?.map((link) => (
                      <Link
                        key={link?.href}
                        href={link?.href}
                        className="block px-5 py-3 font-sans text-sm font-medium tracking-wide text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        {link?.label}
                      </Link>
                    ))}
                  </div>
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
                {t.nav.company}
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
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-6 z-50">
                  <div className="w-44 bg-white/95 backdrop-blur-md border border-border rounded-2xl shadow-xl overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                    {entrepriseLinks?.map((link) => (
                      <Link
                        key={link?.href}
                        href={link?.href}
                        className="block px-5 py-3 font-sans text-sm font-medium tracking-wide text-foreground/80 hover:text-primary hover:bg-primary/5 transition-colors"
                      >
                        {link?.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right side — Language Switcher + CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            {/* Language Switcher */}
            <div
              className="relative hidden md:block"
              onMouseEnter={() => setLangOpen(true)}
              onMouseLeave={() => setLangOpen(false)}
            >
              <button
                className="flex items-center gap-1.5 font-sans text-sm font-medium tracking-wide text-foreground/80 hover:text-primary transition-colors border border-border rounded-full px-4 py-2 hover:border-primary/30 bg-white/50"
                aria-expanded={langOpen}
                aria-haspopup="true"
              >
                <span>{currentLang?.flag} {currentLang?.nativeLabel}</span>
                <svg
                  className={`w-3 h-3 transition-transform ${langOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {langOpen && (
                <div className="absolute top-full right-0 pt-3 z-50">
                  <div className="w-48 bg-white/95 backdrop-blur-md border border-border rounded-2xl shadow-xl overflow-hidden">
                    {SUPPORTED_LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setLanguage(lang.code as Language); setLangOpen(false); }}
                        className={`w-full text-left flex items-center justify-between px-5 py-3 font-sans text-sm font-medium tracking-wide transition-colors hover:bg-primary/5 ${
                          language === lang.code ? 'text-primary bg-primary/5' : 'text-foreground/80 hover:text-primary'
                        }`}
                      >
                        <span className="flex items-center gap-2">{lang.flag} {lang.nativeLabel}</span>
                        {language === lang.code && (
                          <svg className="w-4 h-4 text-primary" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/contact"
              className="btn-primary bg-foreground text-white px-5 py-2.5 rounded-full font-mono text-[10px] font-medium tracking-widest uppercase hover:bg-gray-800 hidden md:inline-flex"
            >
              {t.nav.contact}
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
                {t.nav.services}
              </Link>

              <div>
                <p className="px-4 py-2 font-mono text-[10px] font-medium tracking-widest uppercase text-foreground/40">
                  {t.nav.solutions}
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
                  {t.nav.company}
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

              {/* Mobile Language Switcher */}
              <div>
                <p className="px-4 py-2 font-mono text-[10px] font-medium tracking-widest uppercase text-foreground/40">
                  Language
                </p>
                <div className="grid grid-cols-2 gap-1 px-2">
                  {SUPPORTED_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => { setLanguage(lang.code as Language); setMobileOpen(false); }}
                      className={`text-left px-3 py-2 font-sans text-sm font-medium tracking-wide rounded-xl transition-colors ${
                        language === lang.code
                          ? 'bg-primary text-white'
                          : 'text-foreground/80 hover:text-primary hover:bg-primary/5'
                      }`}
                    >
                      <span className="flex items-center gap-2">{lang.flag} {lang.nativeLabel}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-border">
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center bg-foreground text-white px-5 py-3 rounded-full font-mono text-[10px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors mt-2"
                >
                  {t.nav.contact}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}