'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function AboutClient() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 min-h-screen bg-bg">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="mb-16">
            <p className="font-mono text-xs font-semibold tracking-widest uppercase text-primary mb-4 animate-fade-in">
              {t.about_page?.label}
            </p>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-6">
              {t.about_page?.title}
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-gradient-end rounded-full" />
          </div>

          {/* Mission */}
          <div className="grid md:grid-cols-2 gap-16 mb-20 p-8 glass-card rounded-3xl">
            <div>
              <h2 className="font-sans text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" />
                {t.about_page?.mission_title}
              </h2>
              <p className="font-sans text-base text-muted leading-relaxed">
                {t.about_page?.mission_desc}
              </p>
            </div>
            <div>
              <h2 className="font-sans text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gradient-end" />
                {t.about_page?.vision_title}
              </h2>
              <p className="font-sans text-base text-muted leading-relaxed">
                {t.about_page?.vision_desc}
              </p>
            </div>
          </div>

          {/* Values */}
          <div className="mb-20">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-10">{t.about_page?.values_title}</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {t.about_page?.values?.map((v: any, idx: number) => (
                <div key={idx} className="bg-surface border border-border shadow-sm p-8 rounded-3xl hover:border-primary/50 hover:shadow-lg transition-all group duration-300 transform hover:-translate-y-1">
                  <h3 className="font-sans text-xl font-bold text-foreground group-hover:text-primary mb-3 transition-colors">{v.title}</h3>
                  <p className="font-sans text-sm text-muted leading-relaxed">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-border pt-16">
            {t.about_page?.stats?.map((s: any, idx: number) => (
              <div key={idx} className="text-center group">
                <p className="font-sans text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-gradient-end mb-2 group-hover:scale-110 transition-transform">
                  {s.number}
                </p>
                <p className="font-mono text-[11px] tracking-widest uppercase text-muted font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
