import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialProof from '@/components/SocialProof';

export const metadata: Metadata = {
  title: 'Health-of — Santé augmentée | WFTECH',
  description: 'Health-of est la plateforme de suivi de santé et de bien-être de WFTECH. Dossiers patients numériques, téléconsultation et outils de prévention.',
  alternates: { canonical: '/solutions/health-of' },
};

const features = [
  { title: 'Dossier patient numérique', desc: 'Centralisez l\'historique médical complet de chaque patient : consultations, ordonnances, résultats d\'examens et antécédents.' },
  { title: 'Téléconsultation', desc: 'Plateforme de consultation médicale à distance sécurisée avec vidéo HD, partage de documents et prescription électronique.' },
  { title: 'Suivi de bien-être', desc: 'Tableaux de bord personnalisés pour suivre les indicateurs de santé, les objectifs de bien-être et les programmes de prévention.' },
  { title: 'Gestion des rendez-vous', desc: 'Système de prise de rendez-vous en ligne avec rappels automatiques, gestion des agendas et réduction des no-shows.' },
  { title: 'Interopérabilité', desc: 'Intégration avec les systèmes hospitaliers, laboratoires et pharmacies via les standards HL7 FHIR et DICOM.' },
  { title: 'Conformité RGPD & santé', desc: 'Hébergement des données de santé certifié HDS, chiffrement de bout en bout et conformité aux réglementations sanitaires.' },
];

const useCases = [
  { tag: 'HealthTech', title: 'Cliniques & hôpitaux', desc: 'Les établissements de santé déploient Health-of pour digitaliser les parcours patients et améliorer la coordination des soins.' },
  { tag: 'Télémédecine', title: 'Médecins libéraux', desc: 'Les praticiens utilisent Health-of pour proposer des consultations à distance et gérer leur patientèle de manière efficace.' },
  { tag: 'Prévention', title: 'Programmes de santé publique', desc: 'Les organismes de santé publique utilisent Health-of pour déployer des programmes de prévention et de suivi épidémiologique.' },
];

const socialProofClients = [
  'AP-HP', 'Doctolib', 'Ramsay Santé', 'Elsan',
  'Korian', 'Orpea', 'Vivalto Santé', 'MGEN',
];

const socialProofCaseStudy = {
  company: 'Ramsay Santé',
  industry: 'Cliniques privées',
  result: '−50% de délais de consultation en télémédecine',
  quote: 'Health-of a permis à nos praticiens de proposer des consultations à distance de qualité tout en maintenant la continuité des soins. L\'adoption par les patients a été immédiate.',
};

const benefits = [
  { number: '50%', label: 'Réduction des délais de consultation' },
  { number: '40%', label: 'Amélioration de l\'observance' },
  { number: '99.9%', label: 'Disponibilité de la plateforme' },
  { number: '100%', label: 'Conformité réglementaire' },
];

export default function HealthOfPage() {
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
            {' · '}Health-of
          </p>

          {/* Hero */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 border border-border rounded-full text-muted">HealthTech</span>
              <span className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 border border-border rounded-full text-muted">Prod_06</span>
            </div>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-4">
              Health-of
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light italic text-muted mb-6">Santé augmentée</p>
            <div className="w-16 h-px bg-foreground mb-8" />
            <p className="font-sans text-base text-muted leading-relaxed max-w-2xl">
              Plateforme de suivi de santé et de bien-être. Dossiers patients numériques, téléconsultation et outils de prévention pour professionnels de santé et patients.
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
              <p className="font-mono text-[11px] tracking-widest uppercase text-muted mb-2">Intéressé par Health-of ?</p>
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
