import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'À propos — WFTECH',
  description: 'Découvrez WFTECH, un studio startup spécialisé dans la création de solutions numériques innovantes.',
  alternates: { canonical: '/a-propos' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'À propos — WFTECH',
    description: 'Découvrez WFTECH, un studio startup spécialisé dans la création de solutions numériques.',
    siteName: 'WFTECH',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'WFTECH — À propos',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'À propos — WFTECH',
    description: 'Découvrez WFTECH, un studio startup spécialisé dans la création de solutions numériques.',
    images: ['/assets/images/app_logo.png'],
  },
};

export default function APropos() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="mb-16">
            <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-4">
              Entreprise · À propos
            </p>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-6">
              Qui sommes-nous
            </h1>
            <div className="w-16 h-px bg-foreground" />
          </div>

          {/* Mission */}
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="font-sans text-2xl font-bold text-foreground mb-4">Notre mission</h2>
              <p className="font-sans text-base text-muted leading-relaxed">
                WFTECH est un studio startup dédié à la création de solutions numériques sur mesure. 
                Nous concevons des logiciels innovants qui transforment les secteurs de la logistique, 
                de l'agriculture, de la santé, de l'e-commerce et bien d'autres.
              </p>
            </div>
            <div>
              <h2 className="font-sans text-2xl font-bold text-foreground mb-4">Notre vision</h2>
              <p className="font-sans text-base text-muted leading-relaxed">
                Nous croyons que la technologie doit être accessible, efficace et adaptée aux réalités 
                locales. Notre ambition est de devenir le partenaire technologique de référence pour 
                les entreprises africaines et mondiales.
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-10">Nos valeurs</h2>
            <div className="grid md:grid-cols-3 gap-px bg-border">
              {[
                { title: 'Innovation', desc: 'Nous repoussons les limites du possible avec des technologies de pointe.' },
                { title: 'Excellence', desc: 'Chaque ligne de code, chaque interface est pensée pour la perfection.' },
                { title: 'Impact', desc: 'Nos solutions créent une valeur réelle et mesurable pour nos clients.' },
              ].map((v) => (
                <div key={v.title} className="bg-white p-8 hover:bg-foreground hover:text-white group transition-colors">
                  <h3 className="font-sans text-xl font-bold text-foreground group-hover:text-white mb-3">{v.title}</h3>
                  <p className="font-sans text-sm text-muted group-hover:text-white/70 leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-16">
            {[
              { number: '8+', label: 'Domaines d\'expertise' },
              { number: '100%', label: 'Solutions sur mesure' },
              { number: '2024', label: 'Année de création' },
              { number: '∞', label: 'Ambition' },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <p className="font-sans text-4xl font-bold text-foreground mb-2">{s.number}</p>
                <p className="font-mono text-[11px] tracking-widest uppercase text-muted">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
