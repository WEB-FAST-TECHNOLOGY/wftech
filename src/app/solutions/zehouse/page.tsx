import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialProof from '@/components/SocialProof';

export const metadata: Metadata = {
  title: 'ZEHOUSE — Habitat connecté | WFTECH',
  description: 'ZEHOUSE est la solution de gestion immobilière et domotique de WFTECH. Pilotage des biens, suivi des locataires et automatisation des espaces de vie.',
  alternates: { canonical: '/solutions/zehouse' },
};

const features = [
  { title: 'Gestion des biens immobiliers', desc: 'Centralisez la gestion de votre portefeuille immobilier : contrats, documents, états des lieux et historiques en un seul endroit.' },
  { title: 'Suivi des locataires', desc: 'Gérez les profils locataires, les paiements de loyer, les demandes de maintenance et la communication en temps réel.' },
  { title: 'Domotique intégrée', desc: 'Contrôlez l\'éclairage, la température, la sécurité et les appareils connectés depuis une interface unifiée.' },
  { title: 'Automatisation des espaces', desc: 'Programmez des scénarios d\'automatisation pour optimiser la consommation énergétique et le confort des occupants.' },
  { title: 'Rapports financiers', desc: 'Suivez les revenus locatifs, les charges et la rentabilité de chaque bien avec des tableaux de bord financiers détaillés.' },
  { title: 'Maintenance prédictive', desc: 'Anticipez les pannes et planifiez les interventions grâce aux capteurs IoT et aux algorithmes prédictifs.' },
];

const useCases = [
  { tag: 'PropTech', title: 'Agences immobilières', desc: 'Les agences utilisent ZEHOUSE pour gérer leur portefeuille de biens, automatiser les processus administratifs et améliorer la relation locataire.' },
  { tag: 'Smart Home', title: 'Résidences connectées', desc: 'Les promoteurs immobiliers intègrent ZEHOUSE pour offrir des logements intelligents avec contrôle domotique complet.' },
  { tag: 'Investissement', title: 'Investisseurs immobiliers', desc: 'Les investisseurs utilisent ZEHOUSE pour suivre la performance de leur portefeuille et optimiser la rentabilité de leurs biens.' },
];

const socialProofClients = [
  'Nexity', 'Foncia', 'Orpi', 'Century 21',
  'BNP Paribas Real Estate', 'Bouygues Immobilier', 'Vinci Immobilier', 'Kaufman & Broad',
];

const socialProofCaseStudy = {
  company: 'Foncia Groupe',
  industry: 'Gestion immobilière',
  result: '−60% de tâches administratives manuelles',
  quote: 'ZEHOUSE a révolutionné notre façon de gérer les biens. Nos gestionnaires gagnent des heures chaque semaine et nos locataires sont bien plus satisfaits.',
};

const benefits = [
  { number: '60%', label: 'Réduction des tâches administratives' },
  { number: '30%', label: 'Économies d\'énergie' },
  { number: '95%', label: 'Satisfaction des locataires' },
  { number: '2×', label: 'Rendement locatif amélioré' },
];

export default function ZehousePage() {
  return (
    <>
      <Header />
      <main className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Breadcrumb */}
          <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-4">
            <Link href="/homepage" className="hover:text-foreground transition-colors">Accueil</Link>
            {' · '}
            <Link href="/homepage#solutions" className="hover:text-foreground transition-colors">Solutions</Link>
            {' · '}ZEHOUSE
          </p>

          {/* Hero */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 border border-border rounded-full text-muted">Immobilier & Smart Home</span>
              <span className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 border border-border rounded-full text-muted">Prod_02</span>
            </div>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-4">
              ZEHOUSE
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light italic text-muted mb-6">Habitat connecté</p>
            <div className="w-16 h-px bg-foreground mb-8" />
            <p className="font-sans text-base text-muted leading-relaxed max-w-2xl">
              Solution de gestion immobilière et domotique. Pilotage des biens, suivi des locataires et automatisation des espaces de vie pour un habitat plus intelligent et plus rentable.
            </p>
          </div>

          {/* Features */}
          <section className="mb-20">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-10">Fonctionnalités</h2>
            <div className="grid md:grid-cols-2 gap-px bg-border">
              {features.map((f) => (
                <div key={f.title} className="bg-white p-8 hover:bg-foreground group transition-colors duration-300">
                  <h3 className="font-sans text-lg font-bold text-foreground group-hover:text-white mb-3 transition-colors">{f.title}</h3>
                  <p className="font-sans text-sm text-muted group-hover:text-white/70 leading-relaxed transition-colors">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-20">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-10">Cas d&apos;usage</h2>
            <div className="space-y-4">
              {useCases.map((uc) => (
                <div key={uc.title} className="border border-border rounded-3xl p-8 flex flex-col md:flex-row md:items-start gap-6">
                  <span className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 border border-border rounded-full text-muted flex-shrink-0 self-start">{uc.tag}</span>
                  <div>
                    <h3 className="font-sans text-xl font-bold text-foreground mb-2">{uc.title}</h3>
                    <p className="font-sans text-sm text-muted leading-relaxed">{uc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Social Proof */}
          <SocialProof clients={socialProofClients} caseStudy={socialProofCaseStudy} />

          {/* Benefits */}
          <section className="mb-20">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-10">Bénéfices</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-border">
              {benefits.map((b) => (
                <div key={b.label} className="bg-white p-8 text-center">
                  <p className="font-sans text-4xl font-bold text-foreground mb-2">{b.number}</p>
                  <p className="font-mono text-[11px] tracking-widest uppercase text-muted">{b.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="border-t border-border pt-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <p className="font-mono text-[11px] tracking-widest uppercase text-muted mb-2">Intéressé par ZEHOUSE ?</p>
              <p className="font-sans text-2xl font-bold text-foreground">Discutons de votre projet.</p>
            </div>
            <Link href="/contact" className="btn-primary bg-foreground text-white px-6 py-3 rounded-full font-mono text-[10px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors">
              Nous contacter
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
