import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Newsroom — WFTECH',
  description: 'Actualités, annonces et communiqués de presse de WFTECH.',
  alternates: { canonical: '/newsroom' },
};

interface NewsItem {
  date: string;
  category: string;
  title: string;
  excerpt: string;
}

const news: NewsItem[] = [
  {
    date: '08 Avril 2026',
    category: 'Annonce',
    title: 'WFTECH lance sa plateforme de gestion logistique intelligente',
    excerpt: 'Notre nouvelle solution SaaS révolutionne la gestion des chaînes d\'approvisionnement avec l\'IA intégrée.',
  },
  {
    date: '15 Mars 2026',
    category: 'Partenariat',
    title: 'WFTECH s\'associe à des acteurs clés du secteur agricole',
    excerpt: 'Un partenariat stratégique pour déployer nos logiciels agricoles à grande échelle en Afrique de l\'Ouest.',
  },
  {
    date: '01 Février 2026',
    category: 'Produit',
    title: 'Lancement de WFHealth : notre solution de santé numérique',
    excerpt: 'WFHealth simplifie la gestion des dossiers patients et améliore le suivi médical pour les cliniques.',
  },
  {
    date: '10 Janvier 2026',
    category: 'Entreprise',
    title: 'WFTECH franchit le cap des 50 projets livrés',
    excerpt: 'Une étape majeure qui témoigne de notre engagement envers l\'excellence et l\'innovation numérique.',
  },
];

export default function Newsroom() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="mb-16">
            <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-4">
              Entreprise · Newsroom
            </p>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-6">
              Actualités
            </h1>
            <div className="w-16 h-px bg-foreground" />
          </div>

          {/* Featured Article */}
          <div className="mb-16 p-10 bg-foreground text-white">
            <p className="font-mono text-[11px] tracking-widest uppercase text-white/50 mb-4">
              {news[0].date} · {news[0].category}
            </p>
            <h2 className="font-sans text-3xl md:text-4xl font-bold leading-tight mb-4">
              {news[0].title}
            </h2>
            <p className="font-sans text-base text-white/70 leading-relaxed max-w-2xl">
              {news[0].excerpt}
            </p>
          </div>

          {/* News Grid */}
          <div className="space-y-px bg-border">
            {news.slice(1).map((item) => (
              <div
                key={item.title}
                className="bg-white p-8 group hover:bg-foreground transition-colors cursor-pointer"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="md:w-40 shrink-0">
                    <p className="font-mono text-[11px] tracking-widest uppercase text-muted group-hover:text-white/50">
                      {item.date}
                    </p>
                    <span className="inline-block mt-2 font-mono text-[10px] tracking-widest uppercase border border-border group-hover:border-white/30 text-muted group-hover:text-white/60 px-2 py-0.5 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans text-xl font-bold text-foreground group-hover:text-white mb-2">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-muted group-hover:text-white/70 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                  <span className="font-sans text-lg text-muted group-hover:text-white self-center">→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Press Contact */}
          <div className="mt-20 border-t border-border pt-12">
            <h2 className="font-sans text-2xl font-bold text-foreground mb-4">Contact presse</h2>
            <p className="font-sans text-sm text-muted mb-4">
              Pour toute demande médiatique ou interview, contactez notre équipe communication.
            </p>
            <a
              href="mailto:presse@wftech.fr"
              className="font-mono text-[11px] font-medium tracking-widest uppercase text-foreground hover:text-muted transition-colors underline underline-offset-4"
            >
              presse@wftech.fr
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
