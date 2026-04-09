import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialProof from '@/components/SocialProof';

export const metadata: Metadata = {
  title: 'LogistikAgricol — Agriculture numérique | WFTECH',
  description: 'LogistikAgricol est le logiciel de gestion logistique agricole de WFTECH. Traçabilité des cultures, optimisation des stocks et coordination des livraisons.',
  alternates: { canonical: '/solutions/logistikagricol' },
};

const features = [
  { title: 'Traçabilité des cultures', desc: 'Suivez chaque lot de production de la semence à la livraison finale avec une traçabilité complète et certifiable.' },
  { title: 'Gestion des stocks agricoles', desc: 'Optimisez vos niveaux de stock d\'intrants, de semences et de produits récoltés pour éviter les ruptures et les pertes.' },
  { title: 'Coordination des livraisons', desc: 'Planifiez et optimisez les tournées de collecte et de livraison pour réduire les coûts de transport et les délais.' },
  { title: 'Tableaux de bord exploitants', desc: 'Visualisez en temps réel les performances de votre exploitation : rendements, coûts, marges et prévisions de récolte.' },
  { title: 'Gestion des fournisseurs', desc: 'Centralisez les relations avec vos fournisseurs d\'intrants, négociez les prix et suivez les commandes en cours.' },
  { title: 'Conformité & certifications', desc: 'Générez automatiquement les documents de conformité pour les certifications bio, les normes sanitaires et les audits.' },
];

const useCases = [
  { tag: 'AgriTech', title: 'Exploitations agricoles', desc: 'Les agriculteurs utilisent LogistikAgricol pour digitaliser leur gestion quotidienne et améliorer la rentabilité de leur exploitation.' },
  { tag: 'Coopératives', title: 'Coopératives agricoles', desc: 'Les coopératives coordonnent la collecte, le stockage et la commercialisation des productions de leurs membres via LogistikAgricol.' },
  { tag: 'Agro-industrie', title: 'Industries agroalimentaires', desc: 'Les industriels utilisent LogistikAgricol pour sécuriser leur approvisionnement et garantir la traçabilité de leurs matières premières.' },
];

const socialProofClients = [
  'InVivo', 'Limagrain', 'Terrena', 'Agrial',
  'Soufflet Groupe', 'Vivescia', 'Axéréal', 'Maïsadour',
];

const socialProofCaseStudy = {
  company: 'Coopérative Terrena',
  industry: 'Coopérative agricole',
  result: '−35% de pertes post-récolte sur la saison',
  quote: 'LogistikAgricol nous a permis de coordonner la collecte de 12 000 adhérents avec une précision inégalée. La traçabilité est désormais totale, de la parcelle à la livraison.',
};

const benefits = [
  { number: '35%', label: 'Réduction des pertes post-récolte' },
  { number: '28%', label: 'Économies sur la logistique' },
  { number: '100%', label: 'Traçabilité garantie' },
  { number: '5×', label: 'Retour sur investissement' },
];

export default function LogistikAgricolPage() {
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
            {' · '}LogistikAgricol
          </p>

          {/* Hero */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              <span className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 border border-border rounded-full text-muted">AgriTech & Logistique</span>
              <span className="font-mono text-[11px] tracking-widest uppercase px-3 py-1.5 border border-border rounded-full text-muted">Prod_04</span>
            </div>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-4">
              LogistikAgricol
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light italic text-muted mb-6">Agriculture numérique</p>
            <div className="w-16 h-px bg-foreground mb-8" />
            <p className="font-sans text-base text-muted leading-relaxed max-w-2xl">
              Logiciel de gestion logistique agricole. Traçabilité des cultures, optimisation des stocks, coordination des livraisons et tableaux de bord pour exploitants agricoles modernes.
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
              <p className="font-mono text-[11px] tracking-widest uppercase text-muted mb-2">Intéressé par LogistikAgricol ?</p>
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
