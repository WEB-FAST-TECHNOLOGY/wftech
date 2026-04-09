import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialProof from '@/components/SocialProof';

export const metadata: Metadata = {
  title: 'OtoStop — Mobilité intelligente | WFTECH',
  description: 'OtoStop est la plateforme de gestion et d\'optimisation des arrêts de transport de WFTECH. Suivi en temps réel, planification de trajets et coordination des flux de mobilité urbaine.',
  alternates: { canonical: '/solutions/otostop' },
};

const features = [
  { title: 'Suivi en temps réel', desc: 'Visualisez la position et l\'état de chaque arrêt de transport en temps réel sur une carte interactive.' },
  { title: 'Planification de trajets', desc: 'Algorithmes d\'optimisation pour planifier les itinéraires les plus efficaces selon la demande et les contraintes.' },
  { title: 'Coordination des flux', desc: 'Synchronisez les flux de passagers entre plusieurs lignes et modes de transport pour réduire les temps d\'attente.' },
  { title: 'Tableaux de bord analytiques', desc: 'Rapports détaillés sur la fréquentation, les retards et les performances pour une prise de décision éclairée.' },
  { title: 'Alertes & notifications', desc: 'Système d\'alertes automatiques pour les incidents, retards ou anomalies détectés sur le réseau.' },
  { title: 'API ouverte', desc: 'Intégration facile avec les systèmes existants des opérateurs de transport via une API RESTful documentée.' },
];

const useCases = [
  { tag: 'Transport urbain', title: 'Réseaux de bus municipaux', desc: 'Les villes utilisent OtoStop pour optimiser leurs réseaux de bus, réduire les temps d\'attente et améliorer la satisfaction des usagers.' },
  { tag: 'Mobilité partagée', title: 'Opérateurs de covoiturage', desc: 'Les plateformes de covoiturage intègrent OtoStop pour coordonner les points de prise en charge et maximiser le taux de remplissage.' },
  { tag: 'Logistique', title: 'Livraison du dernier kilomètre', desc: 'Les entreprises de livraison utilisent OtoStop pour optimiser les tournées et réduire les coûts opérationnels.' },
];

const socialProofClients = [
  'Keolis', 'RATP Dev', 'Transdev', 'Île-de-France Mobilités',
  'Bolloré Logistics', 'Chronopost', 'La Poste', 'Geodis',
];

const socialProofCaseStudy = {
  company: 'Keolis Métropole',
  industry: 'Transport urbain',
  result: '−38% de temps d\'attente moyen',
  quote: 'OtoStop nous a permis de repenser entièrement la coordination de nos lignes de bus. La visibilité en temps réel a transformé notre façon d\'opérer.',
};

const benefits = [
  { number: '40%', label: 'Réduction des temps d\'attente' },
  { number: '25%', label: 'Économies sur les coûts opérationnels' },
  { number: '98%', label: 'Disponibilité de la plateforme' },
  { number: '3×', label: 'Amélioration de la satisfaction usager' },
];

export default function OtoStopPage() {
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
            {' · '}OtoStop
          </p>

          {/* Hero */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 border border-border rounded-full text-muted">Transport & Mobilité</span>
              <span className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 border border-border rounded-full text-muted">Prod_01</span>
            </div>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-4">
              OtoStop
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light italic text-muted mb-6">Mobilité intelligente</p>
            <div className="w-16 h-px bg-foreground mb-8" />
            <p className="font-sans text-base text-muted leading-relaxed max-w-2xl">
              Plateforme de gestion et d&apos;optimisation des arrêts de transport. Suivi en temps réel, planification de trajets et coordination des flux de mobilité urbaine pour des réseaux plus efficaces.
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
              <p className="font-mono text-[11px] tracking-widest uppercase text-muted mb-2">Intéressé par OtoStop ?</p>
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
