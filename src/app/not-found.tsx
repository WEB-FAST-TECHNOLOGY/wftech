'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function NotFound() {
  const router = useRouter();

  const handleGoBack = () => {
    if (typeof window !== 'undefined') {
      window.history?.back();
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white flex items-center justify-center pt-32 pb-24">
        <div className="max-w-5xl mx-auto px-6 md:px-8 w-full">
          <div className="mb-16">
            <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-4">
              Erreur · 404
            </p>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-6">
              Page introuvable
            </h1>
            <div className="w-16 h-px bg-foreground mb-8" />
            <p className="font-sans text-lg text-muted leading-relaxed max-w-xl mb-12">
              La page que vous recherchez n&apos;existe pas ou a été déplacée. Retournez à l&apos;accueil ou explorez nos solutions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/homepage"
                className="inline-flex items-center justify-center gap-2 bg-foreground text-white px-8 py-4 rounded-full font-mono text-[11px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors"
              >
                Retour à l&apos;accueil
              </Link>
              <button
                onClick={handleGoBack}
                className="inline-flex items-center justify-center gap-2 border border-border text-foreground px-8 py-4 rounded-full font-mono text-[11px] font-medium tracking-widest uppercase hover:bg-foreground hover:text-white transition-colors"
              >
                Page précédente
              </button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-px bg-border">
            {[
              { label: 'Nos solutions', href: '/homepage#solutions', desc: 'Découvrez nos 7 produits numériques.' },
              { label: 'À propos', href: '/a-propos', desc: 'Qui sommes-nous et notre mission.' },
              { label: 'Contact', href: '/contact', desc: 'Parlons de votre projet.' },
            ]?.map((item) => (
              <Link
                key={item?.href}
                href={item?.href}
                className="bg-white p-8 group hover:bg-foreground transition-colors"
              >
                <h3 className="font-sans text-lg font-bold text-foreground group-hover:text-white mb-2">{item?.label}</h3>
                <p className="font-sans text-sm text-muted group-hover:text-white/70">{item?.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}