import React from 'react';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Contact — WFTECH',
  description: 'Contactez WFTECH pour vos projets de solutions numériques.',
  alternates: { canonical: '/contact' },
};

export default function Contact() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="mb-16">
            <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-4">
              Entreprise · Contact
            </p>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-6">
              Parlons-en
            </h1>
            <div className="w-16 h-px bg-foreground" />
          </div>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            {/* Left — Info */}
            <div>
              <p className="font-sans text-lg text-muted leading-relaxed mb-10">
                Vous avez un projet en tête ? Une question sur nos services ? 
                Notre équipe est disponible pour vous accompagner.
              </p>

              <div className="space-y-8">
                <div>
                  <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-2">
                    Email général
                  </p>
                  <a
                    href="mailto:contact@wftech.fr"
                    className="font-sans text-xl font-bold text-foreground hover:text-muted transition-colors"
                  >
                    contact@wftech.fr
                  </a>
                </div>

                <div>
                  <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-2">
                    Partenariats & Business
                  </p>
                  <a
                    href="mailto:business@wftech.fr"
                    className="font-sans text-xl font-bold text-foreground hover:text-muted transition-colors"
                  >
                    business@wftech.fr
                  </a>
                </div>

                <div>
                  <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-2">
                    Support technique
                  </p>
                  <a
                    href="mailto:support@wftech.fr"
                    className="font-sans text-xl font-bold text-foreground hover:text-muted transition-colors"
                  >
                    support@wftech.fr
                  </a>
                </div>

                <div>
                  <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-2">
                    Localisation
                  </p>
                  <p className="font-sans text-base text-foreground font-medium">
                    Afrique de l'Ouest · Remote-first
                  </p>
                </div>
              </div>
            </div>

            {/* Right — Quick Actions */}
            <div className="space-y-px bg-border">
              {[
                { label: 'Devenir partenaire', desc: 'Explorons les opportunités de collaboration.', href: 'mailto:business@wftech.fr?subject=Partenariat' },
                { label: 'Rejoindre l\'équipe', desc: 'Consultez nos offres d\'emploi et postulez.', href: '/carrieres' },
              ].map((action) => (
                <a
                  key={action.label}
                  href={action.href}
                  className="block bg-white p-8 group hover:bg-foreground transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-sans text-lg font-bold text-foreground group-hover:text-white mb-1">
                        {action.label}
                      </h3>
                      <p className="font-sans text-sm text-muted group-hover:text-white/60">
                        {action.desc}
                      </p>
                    </div>
                    <span className="font-sans text-xl text-muted group-hover:text-white ml-4">→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Response Time */}
          <div className="border-t border-border pt-12 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-1 md:mt-0" />
            <p className="font-sans text-sm text-muted">
              <span className="font-bold text-foreground">Temps de réponse moyen : 24h.</span>{' '}
              Notre équipe s'engage à répondre à toutes les demandes dans les meilleurs délais.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
