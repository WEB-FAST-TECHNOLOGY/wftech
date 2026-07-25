'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SocialProof from '@/components/SocialProof';
import { useLanguage } from '@/context/LanguageContext';

export default function DirtyMetaClient() {
  const { t } = useLanguage();
  const pageT = t.dirtymeta_page;

  if (!pageT) return null;

  const socialProofClients = [
    'Société Générale', 'BNP Paribas', 'Cdiscount', 'Fnac Darty',
    'Veolia', 'Engie', 'Orange Business', 'Capgemini',
  ];

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 min-h-screen bg-bg">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Breadcrumb */}
          <p className="font-mono text-xs font-semibold tracking-widest uppercase text-muted mb-4 animate-fade-in flex items-center gap-2">
            <Link href="/homepage" className="hover:text-primary transition-colors">{pageT.breadcrumb[0]}</Link>
            <span className="text-border">/</span>
            <Link href="/homepage#solutions" className="hover:text-primary transition-colors">{pageT.breadcrumb[1]}</Link>
            <span className="text-border">/</span>
            <span className="text-foreground">{pageT.breadcrumb[2]}</span>
          </p>

          {/* Hero */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-6">
              {pageT.tags.map((tag: string, idx: number) => (
                <span key={idx} className="font-sans text-xs font-semibold tracking-widest uppercase px-4 py-1.5 bg-primary/10 text-primary rounded-full">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-4">
              {pageT.title}
            </h1>
            <p className="font-sans text-xl md:text-2xl font-light italic text-muted mb-6">
              {pageT.subtitle}
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-gradient-end rounded-full mb-8" />
            <p className="font-sans text-lg text-muted leading-relaxed max-w-2xl bg-surface p-6 rounded-3xl border border-border shadow-sm">
              {pageT.intro}
            </p>
          </div>

          {/* Features */}
          <section className="mb-20">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-10 flex items-center gap-3">
              <span className="w-8 h-1 bg-primary rounded-full" />
              {pageT.features_title}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {pageT.features.map((f: any, idx: number) => (
                <div key={idx} className="bg-surface p-8 rounded-3xl border border-border group hover:border-primary/50 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <h3 className="font-sans text-lg font-bold text-foreground group-hover:text-primary mb-3 transition-colors">{f.title}</h3>
                  <p className="font-sans text-sm text-muted leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Use Cases */}
          <section className="mb-20">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-10">{pageT.use_cases_title}</h2>
            <div className="space-y-6">
              {pageT.use_cases.map((uc: any, idx: number) => (
                <div key={idx} className="glass-card rounded-3xl p-8 flex flex-col md:flex-row md:items-start gap-6 border hover:border-primary/30 transition-colors">
                  <span className="font-sans text-xs font-semibold tracking-widest uppercase px-4 py-1.5 bg-gradient-to-r from-primary to-gradient-end text-white rounded-full flex-shrink-0 self-start shadow-md shadow-primary/20">
                    {uc.tag}
                  </span>
                  <div>
                    <h3 className="font-sans text-xl font-bold text-foreground mb-2">{uc.title}</h3>
                    <p className="font-sans text-sm text-muted leading-relaxed">{uc.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Social Proof */}
          <div className="mb-20">
            <SocialProof clients={socialProofClients} caseStudy={pageT.socialProof?.caseStudy} />
          </div>

          {/* Benefits */}
          <section className="mb-20">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-10 text-center">{pageT.benefits_title}</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {pageT.benefits.map((b: any, idx: number) => (
                <div key={idx} className="bg-surface p-8 rounded-3xl border border-border text-center hover:border-primary/40 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  <p className="font-sans text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-br from-primary to-gradient-end mb-3 drop-shadow-sm">{b.number}</p>
                  <p className="font-sans text-xs font-semibold tracking-widest uppercase text-muted">{b.label}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="bg-gradient-to-br from-primary/5 to-gradient-end/5 border border-primary/20 rounded-3xl p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden text-center md:text-left">
            <div className="relative z-10">
              <p className="font-sans text-2xl font-bold text-foreground mb-2">{pageT.cta_text}</p>
              <p className="font-sans text-sm text-muted">Prêt à transformer vos données en insights nets ?</p>
            </div>
            <Link href="/contact" className="relative z-10 bg-gradient-to-r from-primary to-gradient-end text-white px-8 py-4 rounded-full font-sans text-sm font-bold tracking-wide uppercase hover:opacity-90 transition-opacity shadow-xl shadow-primary/30 flex-shrink-0">
              {pageT.cta_button}
            </Link>
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-end/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3" />
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
