'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

export default function NewsroomClient() {
  const { t } = useLanguage();
  const news = t.newsroom_page?.news || [];

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 min-h-screen bg-bg">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="mb-16">
            <p className="font-mono text-xs font-semibold tracking-widest uppercase text-primary mb-4 animate-fade-in">
              {t.newsroom_page?.label}
            </p>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-6">
              {t.newsroom_page?.title}
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-gradient-end rounded-full" />
          </div>

          {/* Featured Article */}
          {news.length > 0 && (
            <div className="mb-16 p-10 bg-foreground text-white rounded-3xl relative overflow-hidden group shadow-xl">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-gradient-end/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="relative z-10">
                <p className="font-sans text-xs font-semibold tracking-widest uppercase text-primary mb-4 flex items-center gap-3">
                  <span>{news[0].date}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-border" />
                  <span className="bg-primary/20 text-primary px-3 py-1 rounded-full">{news[0].category}</span>
                </p>
                <h2 className="font-sans text-3xl md:text-4xl font-bold leading-tight mb-4 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/70 transition-all">
                  {news[0].title}
                </h2>
                <p className="font-sans text-base text-white/70 leading-relaxed max-w-2xl">
                  {news[0].excerpt}
                </p>
              </div>
            </div>
          )}

          {/* News Grid */}
          <div className="grid gap-6">
            {news.slice(1).map((item: any, idx: number) => (
              <div
                key={idx}
                className="bg-surface p-8 rounded-2xl group hover:shadow-lg hover:border-primary/50 transition-all border border-border cursor-pointer transform hover:-translate-y-1"
              >
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="md:w-48 shrink-0">
                    <p className="font-sans text-sm font-semibold tracking-wide text-muted group-hover:text-primary transition-colors">
                      {item.date}
                    </p>
                    <span className="inline-block mt-2 font-sans text-xs font-semibold tracking-widest uppercase bg-bg group-hover:bg-primary/10 text-muted group-hover:text-primary px-3 py-1 rounded-full transition-colors">
                      {item.category}
                    </span>
                  </div>
                  <div className="flex-1">
                    <h3 className="font-sans text-xl font-bold text-foreground group-hover:text-primary mb-2 transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-muted leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>
                  <span className="font-sans text-xl text-primary group-hover:translate-x-2 transition-transform self-center opacity-0 group-hover:opacity-100">→</span>
                </div>
              </div>
            ))}
          </div>

          {/* Press Contact */}
          <div className="mt-20 border-t border-border pt-12 flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div>
              <h2 className="font-sans text-2xl font-bold text-foreground mb-2">{t.newsroom_page?.press_title}</h2>
              <p className="font-sans text-sm text-muted">
                {t.newsroom_page?.press_desc}
              </p>
            </div>
            <a
              href="mailto:presse@wftech.com"
              className="inline-flex items-center gap-2 font-sans text-sm font-semibold tracking-wide bg-surface border border-border px-6 py-3 rounded-full hover:border-primary text-foreground hover:text-primary transition-colors shadow-sm"
            >
              presse@wftech.com
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
