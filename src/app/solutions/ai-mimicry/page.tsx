import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialProof from '@/components/SocialProof';

export const metadata: Metadata = {
  title: 'AI-Mimicry — L\'IA qui s\'adapte | WFTECH',
  description: 'Moteur d\'IA générative et adaptative pour agents conversationnels, automatisation de processus et modèles IA personnalisés.',
  alternates: { canonical: '/solutions/ai-mimicry' },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    title: 'AI-Mimicry — L\'IA qui s\'adapte',
    description: 'Moteur d\'IA générative pour agents conversationnels et automatisation de processus.',
    siteName: 'WFTECH',
    images: [
      {
        url: '/assets/images/app_logo.png',
        width: 1200,
        height: 630,
        alt: 'AI-Mimicry — Moteur d\'intelligence artificielle',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI-Mimicry — L\'IA qui s\'adapte',
    description: 'Moteur d\'IA générative pour agents conversationnels et automatisation de processus.',
    images: ['/assets/images/app_logo.png'],
  },
};

const features = [
  { title: 'Agents conversationnels', desc: 'Déployez des assistants IA conversationnels capables de comprendre le contexte métier et de répondre avec précision à vos utilisateurs.' },
  { title: 'Automatisation de processus', desc: 'Automatisez les tâches répétitives et les workflows complexes grâce à des agents IA autonomes qui apprennent de vos processus.' },
  { title: 'Fine-tuning de modèles', desc: 'Personnalisez des modèles LLM sur vos données propriétaires pour obtenir des performances optimales sur votre domaine métier.' },
  { title: 'Orchestration multi-agents', desc: 'Coordonnez plusieurs agents IA spécialisés pour résoudre des problèmes complexes nécessitant des compétences multiples.' },
  { title: 'RAG & base de connaissances', desc: 'Connectez l\'IA à vos documents, bases de données et systèmes existants pour des réponses précises et contextualisées.' },
  { title: 'Monitoring & explicabilité', desc: 'Suivez les performances de vos modèles IA, détectez les dérives et comprenez les décisions prises grâce aux outils d\'explicabilité.' },
];

const useCases = [
  { tag: 'Service client', title: 'Automatisation du support', desc: 'Les entreprises déploient AI-Mimicry pour automatiser 80% des demandes de support client avec des agents IA contextuels.' },
  { tag: 'RH & recrutement', title: 'Screening de candidatures', desc: 'Les équipes RH utilisent AI-Mimicry pour analyser les CV, conduire des pré-entretiens et identifier les meilleurs profils.' },
  { tag: 'Finance', title: 'Analyse de documents financiers', desc: 'Les institutions financières automatisent l\'analyse de contrats, rapports et documents réglementaires avec AI-Mimicry.' },
];

const socialProofClients = [
  'Thales', 'Dassault Systèmes', 'Sopra Steria', 'Atos',
  'Allianz France', 'AXA', 'Crédit Agricole', 'La Française des Jeux',
];

const socialProofCaseStudy = {
  company: 'Allianz France',
  industry: 'Assurance',
  result: '80% des demandes support traitées automatiquement',
  quote: 'AI-Mimicry a dépassé toutes nos attentes. Les agents IA comprennent le contexte assurantiel avec une précision remarquable et nos clients ne font plus la différence avec un conseiller humain.',
};

const benefits = [
  { number: '80%', label: 'Tâches automatisées' },
  { number: '10×', label: 'Productivité des équipes' },
  { number: '24/7', label: 'Disponibilité des agents IA' },
  { number: '6 sem.', label: 'Délai de déploiement' },
];

export default function AiMimicryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@graph': [
              {
                '@type': 'WebPage',
                '@id': 'https://wftech2906.builtwithrocket.new/solutions/ai-mimicry#webpage',
                url: 'https://wftech2906.builtwithrocket.new/solutions/ai-mimicry',
                name: 'AI-Mimicry — L\'IA qui s\'adapte',
                description: 'Moteur d\'IA générative et adaptative pour agents conversationnels, automatisation de processus et modèles IA personnalisés.',
                isPartOf: {
                  '@id': 'https://wftech2906.builtwithrocket.new/#website',
                },
                inLanguage: 'fr',
              },
              {
                '@type': 'SoftwareApplication',
                '@id': 'https://wftech2906.builtwithrocket.new/solutions/ai-mimicry#softwareapplication',
                name: 'AI-Mimicry',
                applicationCategory: 'BusinessApplication',
                description: 'Moteur d\'intelligence artificielle générative et adaptative.',
                offers: {
                  '@type': 'Offer',
                  priceCurrency: 'USD',
                  price: 'Contactez-nous',
                },
              },
            ],
          }),
        }}
      />
      <Header />
      <main className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Breadcrumb */}
          <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-4">
            <Link href="/homepage" className="hover:text-foreground transition-colors">Accueil</Link>
            {' · '}
            <Link href="/homepage#solutions" className="hover:text-foreground transition-colors">Solutions</Link>
            {' · '}AI-Mimicry
          </p>

          {/* Hero */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 border border-border rounded-full text-muted">Intelligence Artificielle</span>
              <span className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 border border-border rounded-full text-muted">Prod_07</span>
            </div>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-4">
              AI-Mimicry
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light italic text-muted mb-6">L&apos;IA qui s&apos;adapte</p>
            <div className="w-16 h-px bg-foreground mb-8" />
            <p className="font-sans text-base text-muted leading-relaxed max-w-2xl">
              Moteur d&apos;intelligence artificielle générative et adaptative. Agents conversationnels, automatisation de processus et modèles IA personnalisés pour chaque métier.
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
              <p className="font-mono text-[11px] tracking-widest uppercase text-muted mb-2">Intéressé par AI-Mimicry ?</p>
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
