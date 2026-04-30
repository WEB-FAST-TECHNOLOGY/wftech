import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialProof from '@/components/SocialProof';

export const metadata: Metadata = {
  title: 'Dirty Meta — Données brutes, insights nets | WFTECH',
  description: 'Outil d\'analyse et de nettoyage de métadonnées pour extraction, transformation et valorisation des données non structurées.',
  alternates: { canonical: '/solutions/dirty-meta' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'Dirty Meta — Données brutes, insights nets',
    description: 'Outil d\'analyse et de nettoyage de métadonnées pour transformation des données.',
    siteName: 'WFTECH',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'Dirty Meta — Outil de nettoyage de données',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dirty Meta — Données brutes, insights nets',
    description: 'Outil d\'analyse et de nettoyage de métadonnées pour transformation des données.',
    images: ['/assets/images/app_logo.png'],
  },
};

const features = [
  { title: 'Extraction de métadonnées', desc: 'Extrayez automatiquement les métadonnées de toutes vos sources de données : fichiers, bases de données, APIs et flux en temps réel.' },
  { title: 'Nettoyage & normalisation', desc: 'Détectez et corrigez les anomalies, doublons et incohérences dans vos données grâce à des règles de nettoyage configurables.' },
  { title: 'Pipeline ETL visuel', desc: 'Construisez des pipelines de transformation de données avec une interface drag-and-drop sans écrire une ligne de code.' },
  { title: 'Catalogage des données', desc: 'Créez un catalogue centralisé de toutes vos données avec des métadonnées enrichies, des tags et des descriptions automatiques.' },
  { title: 'Qualité des données', desc: 'Mesurez et suivez la qualité de vos données avec des scores de complétude, d\'exactitude et de cohérence en temps réel.' },
  { title: 'Gouvernance des données', desc: 'Définissez des politiques d\'accès, de rétention et de conformité pour garantir la gouvernance de vos actifs de données.' },
];

const useCases = [
  { tag: 'Data Engineering', title: 'Équipes data & analytics', desc: 'Les data engineers utilisent Dirty Meta pour automatiser le nettoyage des données et réduire le temps de préparation de 80%.' },
  { tag: 'E-commerce', title: 'Plateformes e-commerce', desc: 'Les e-commerçants nettoient et enrichissent leurs catalogues produits pour améliorer la recherche et les recommandations.' },
  { tag: 'Finance', title: 'Institutions financières', desc: 'Les banques et assurances utilisent Dirty Meta pour assurer la conformité réglementaire et la qualité de leurs données clients.' },
];

const socialProofClients = [
  'Société Générale', 'BNP Paribas', 'Cdiscount', 'Fnac Darty',
  'Veolia', 'Engie', 'Orange Business', 'Capgemini',
];

const socialProofCaseStudy = {
  company: 'Cdiscount',
  industry: 'E-commerce',
  result: '10× plus rapide sur les analyses de données produits',
  quote: 'Dirty Meta a transformé notre pipeline de données. Nous avons réduit de 80% le temps passé à nettoyer nos catalogues et nos équipes peuvent enfin se concentrer sur l\'analyse.',
};

const benefits = [
  { number: '80%', label: 'Réduction du temps de préparation' },
  { number: '99%', label: 'Précision des données nettoyées' },
  { number: '10×', label: 'Accélération des analyses' },
  { number: '0', label: 'Compétences code requises' },
];

export default function DirtyMetaPage() {
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
            {' · '}Dirty Meta
          </p>

          {/* Hero */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 border border-border rounded-full text-muted">Data & Analytics</span>
              <span className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 border border-border rounded-full text-muted">Prod_05</span>
            </div>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-4">
              Dirty Meta
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light italic text-muted mb-6">Données brutes, insights nets</p>
            <div className="w-16 h-px bg-foreground mb-8" />
            <p className="font-sans text-base text-muted leading-relaxed max-w-2xl">
              Outil d&apos;analyse et de nettoyage de métadonnées. Extraction, transformation et valorisation des données non structurées pour des décisions éclairées et une gouvernance maîtrisée.
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
              <p className="font-mono text-[11px] tracking-widest uppercase text-muted mb-2">Intéressé par Dirty Meta ?</p>
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
