import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialProof from '@/components/SocialProof';

export const metadata: Metadata = {
  title: 'ZETRAVEL — Voyages sans friction | WFTECH',
  description: 'ZETRAVEL est l\'application de planification et réservation de voyages de WFTECH. Itinéraires personnalisés, gestion des réservations et expériences de voyage sur mesure.',
  alternates: { canonical: '/solutions/zetravel' },
};

const features = [
  { title: 'Planification d\'itinéraires IA', desc: 'Générez des itinéraires personnalisés en quelques secondes grâce à l\'IA, adaptés à vos préférences, budget et contraintes de temps.' },
  { title: 'Réservation centralisée', desc: 'Réservez vols, hôtels, activités et transports depuis une seule interface, avec comparaison des prix en temps réel.' },
  { title: 'Gestion des voyages d\'affaires', desc: 'Outils dédiés aux entreprises pour gérer les déplacements professionnels, les notes de frais et la conformité aux politiques voyages.' },
  { title: 'Recommandations contextuelles', desc: 'Suggestions d\'activités, restaurants et expériences basées sur la localisation, la météo et les préférences de l\'utilisateur.' },
  { title: 'Partage & collaboration', desc: 'Planifiez des voyages en groupe avec des outils de collaboration en temps réel et de vote sur les activités.' },
  { title: 'Mode hors ligne', desc: 'Accédez à vos itinéraires, réservations et cartes même sans connexion internet pendant vos déplacements.' },
];

const useCases = [
  { tag: 'Tourisme', title: 'Agences de voyage', desc: 'Les agences utilisent ZETRAVEL pour créer et gérer des packages touristiques personnalisés, réduisant le temps de conception de 70%.' },
  { tag: 'Corporate', title: 'Voyages d\'affaires', desc: 'Les entreprises déploient ZETRAVEL pour centraliser la gestion des déplacements professionnels et optimiser les coûts.' },
  { tag: 'Loisirs', title: 'Voyageurs indépendants', desc: 'Les voyageurs individuels utilisent ZETRAVEL pour planifier des aventures sur mesure avec des recommandations IA ultra-personnalisées.' },
];

const socialProofClients = [
  'Accor Hotels', 'Club Med', 'Voyageurs du Monde', 'Kuoni',
  'Thomas Cook', 'Havas Voyages', 'Selectour', 'TUI France',
];

const socialProofCaseStudy = {
  company: 'Club Med',
  industry: 'Tourisme haut de gamme',
  result: '−70% de temps de planification itinéraire',
  quote: 'ZETRAVEL a transformé notre processus de création de séjours sur mesure. Nos conseillers peuvent désormais proposer des itinéraires personnalisés en quelques minutes.',
};

const benefits = [
  { number: '70%', label: 'Gain de temps de planification' },
  { number: '20%', label: 'Économies sur les réservations' },
  { number: '4.8/5', label: 'Note de satisfaction utilisateur' },
  { number: '50+', label: 'Destinations couvertes' },
];

export default function ZetravelPage() {
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
            {' · '}ZETRAVEL
          </p>

          {/* Hero */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 border border-border rounded-full text-muted">TravelTech</span>
              <span className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 border border-border rounded-full text-muted">Prod_03</span>
            </div>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-4">
              ZETRAVEL
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light italic text-muted mb-6">Voyages sans friction</p>
            <div className="w-16 h-px bg-foreground mb-8" />
            <p className="font-sans text-base text-muted leading-relaxed max-w-2xl">
              Application de planification et réservation de voyages. Itinéraires personnalisés, gestion des réservations et expériences de voyage sur mesure pour des aventures inoubliables.
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
              <p className="font-mono text-[11px] tracking-widest uppercase text-muted mb-2">Intéressé par ZETRAVEL ?</p>
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
