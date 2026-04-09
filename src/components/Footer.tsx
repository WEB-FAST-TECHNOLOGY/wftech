import React from 'react';
import Link from 'next/link';
import AppLogo from '@/components/ui/AppLogo';

export default function Footer() {
  return (
    <footer className="border-t border-border bg-surface">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          {/* Brand */}
          <div>
            <Link href="/homepage" className="flex items-center gap-2 mb-3">
              <AppLogo size={28} />
              <span className="font-sans font-bold text-base tracking-tight text-foreground">
                WFTECH
              </span>
            </Link>
            <p className="font-sans text-sm text-muted leading-relaxed">
              Studio startup de solutions numériques innovantes.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-foreground mb-4">
              Services
            </p>
            <div className="flex flex-col gap-2">
              <Link href="#services" className="font-mono text-[11px] tracking-widest uppercase text-muted hover:text-foreground transition-colors">
                Nos solutions
              </Link>
            </div>
          </div>

          {/* Entreprise */}
          <div>
            <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-foreground mb-4">
              Entreprise
            </p>
            <div className="flex flex-col gap-2">
              {[
                { label: 'À propos', href: '/a-propos' },
                { label: 'Carrières', href: '/carrieres' },
                { label: 'Newsroom', href: '/newsroom' },
                { label: 'Contact', href: '/contact' },
              ]?.map((link) => (
                <Link
                  key={link?.href}
                  href={link?.href}
                  className="font-mono text-[11px] tracking-widest uppercase text-muted hover:text-foreground transition-colors"
                >
                  {link?.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-[11px] text-muted">© 2026 WFTECH</span>
          <div className="flex items-center gap-4">
            <Link href="#" className="font-mono text-[11px] text-muted hover:text-foreground transition-colors">
              Confidentialité
            </Link>
            <span className="text-border-strong">·</span>
            <Link href="#" className="font-mono text-[11px] text-muted hover:text-foreground transition-colors">
              Mentions légales
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}