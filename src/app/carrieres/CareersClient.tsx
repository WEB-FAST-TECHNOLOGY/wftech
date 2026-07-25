'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function CareersClient() {
  const { t } = useLanguage();

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 min-h-screen bg-bg">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="mb-16">
            <p className="font-mono text-xs font-semibold tracking-widest uppercase text-primary mb-4 animate-fade-in">
              {t.careers_page?.label}
            </p>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-6">
              {t.careers_page?.title}
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-gradient-end rounded-full" />
          </div>

          {/* Intro */}
          <div className="max-w-2xl mb-20 p-8 glass-card rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
            <p className="font-sans text-lg text-muted leading-relaxed">
              {t.careers_page?.intro}
            </p>
          </div>

          {/* Why Join */}
          <div className="mb-20">
            <h2 className="font-sans text-3xl font-bold text-foreground mb-10 border-b border-border pb-4 w-max pr-8">
              {t.careers_page?.why_title}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {t.careers_page?.why_items?.map((item: any, idx: number) => (
                <div key={idx} className="bg-surface p-8 shadow-sm rounded-3xl group hover:shadow-xl transition-all border border-border/50 hover:border-primary/30 transform hover:-translate-y-1">
                  <span className="text-3xl mb-4 block group-hover:scale-110 transition-transform origin-left">{item.icon}</span>
                  <h3 className="font-sans text-lg font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="font-sans text-sm text-muted leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Job Offers */}
          <div>
            <h2 className="font-sans text-3xl font-bold text-foreground mb-10 flex items-center gap-3">
              <span className="size-3 rounded-full bg-green-500 animate-pulse" />
              {t.careers_page?.jobs_title}
            </h2>
            <div className="space-y-4">
              {t.careers_page?.jobs?.map((job: any, idx: number) => (
                <div
                  key={idx}
                  className="bg-surface px-8 py-6 rounded-2xl border border-border flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:border-primary/50 hover:shadow-md transition-all cursor-pointer"
                >
                  <div>
                    <h3 className="font-sans text-lg font-bold text-foreground group-hover:text-primary transition-colors">{job.title}</h3>
                    <p className="font-mono text-[11px] tracking-widest uppercase text-muted mt-1">
                      {job.department}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-xs font-semibold px-4 py-1.5 rounded-full bg-primary/10 text-primary">
                      {job.type}
                    </span>
                    <span className="font-sans text-xs font-semibold px-4 py-1.5 rounded-full bg-border text-foreground/70">
                      {job.location}
                    </span>
                    <span className="font-sans text-sm font-medium text-muted group-hover:text-primary transition-colors ml-2 group-hover:translate-x-1 duration-300">→</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 p-8 rounded-3xl border border-primary/20 bg-primary/5">
              <h3 className="font-sans text-xl font-bold text-foreground mb-2">{t.careers_page?.spontaneous_title}</h3>
              <p className="font-sans text-sm text-muted mb-6">
                {t.careers_page?.spontaneous_desc}
              </p>
              <a
                href="mailto:carrieres@wftech.com"
                className="inline-block font-sans text-sm font-semibold text-white px-8 py-3 rounded-full bg-gradient-to-r from-primary to-gradient-end hover:opacity-90 transition-opacity shadow-lg shadow-primary/30"
              >
                {t.careers_page?.spontaneous_btn}
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
