import React from 'react';
import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

export default function HeroSection() {
  return (
    <section className="relative w-full min-h-screen overflow-hidden rounded-b-[2.5rem] bg-foreground">
      {/* Background photo — dark office/tech environment */}
      <AppImage
        src="https://images.unsplash.com/photo-1690638882876-d20f531212fc"
        alt="Modern open office workspace with dark walls, dim atmospheric lighting, clean desks and monitors, architectural shadows"
        fill
        priority
        className="object-cover opacity-50 grayscale"
        sizes="100vw" />
      

      {/* Gradient scrim — bottom to top for text legibility */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />

      {/* Top left label */}
      <div className="absolute top-28 left-8 md:left-12 z-10">
        <span className="glass-card px-4 py-1.5 rounded-full label-tag text-white/60">
          Studio · Startup · Solutions Numériques
        </span>
      </div>

      {/* Top right status */}
      <div className="absolute top-28 right-8 md:right-12 z-10 hidden md:flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-green-400 inline-block" />
        <span className="label-tag text-white/40">Disponible — 2026</span>
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col justify-between px-8 md:px-12 pt-32 pb-12">
        {/* Headline block */}
        <div className="flex-1 flex items-center">
          <div className="max-w-4xl">
            <p className="label-tag text-white/50 mb-6 tracking-widest">
              // Studio de solutions numériques
            </p>
            <h1 className="hero-title text-white mb-8">
              Nous construisons ce qui fait{' '}
              <span className="italic font-light">avancer</span>
              <br />
              votre entreprise.
            </h1>
            <p className="text-white/60 text-base md:text-lg max-w-xl leading-relaxed mb-10 font-light">
              WFTECH est un studio de solutions numériques qui crée des logiciels et applications dans les domaines de la logistique, l&apos;agriculture, la santé, l&apos;e-commerce, la mobilité, l&apos;IA et la R&D.
            </p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Link
                href="#services"
                className="btn-primary bg-white text-foreground px-8 py-4 rounded-full flex items-center gap-3 font-mono text-[11px] font-medium tracking-widest uppercase hover:bg-gray-100">
                Voir nos services
                <span className="size-7 rounded-full bg-foreground text-white flex items-center justify-center">
                  <Icon name="ArrowDownIcon" size={14} variant="outline" />
                </span>
              </Link>
              <Link
                href="/solutions/otostop"
                className="flex items-center gap-2 text-white/50 hover:text-white/80 transition-colors font-mono text-[11px] tracking-widest uppercase">
                Découvrir nos produits
                <Icon name="ArrowUpRightIcon" size={14} variant="outline" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom row — stats + card */}
        <div className="flex flex-col md:flex-row items-end justify-between gap-6 mt-8">
          {/* Stats */}
          <div className="flex gap-10">
            <div className="flex flex-col gap-1">
              <span className="text-white font-bold text-2xl tracking-tight">+50</span>
              <span className="label-tag text-white/40">Projets livrés</span>
            </div>
            <div className="w-px h-10 bg-white/10 self-center" />
            <div className="flex flex-col gap-1">
              <span className="text-white font-bold text-2xl tracking-tight">8 ans</span>
              <span className="label-tag text-white/40">D&apos;expérience</span>
            </div>
            <div className="w-px h-10 bg-white/10 self-center hidden sm:block" />
            <div className="hidden sm:flex flex-col gap-1">
              <span className="text-white font-bold text-2xl tracking-tight">100%</span>
              <span className="label-tag text-white/40">Sur mesure</span>
            </div>
          </div>

          {/* Glass card */}
          <div className="glass-card rounded-3xl px-8 py-6 max-w-xs space-y-3">
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-full bg-foreground flex items-center justify-center">
                <Icon name="CodeBracketIcon" size={16} variant="outline" className="text-white" />
              </span>
              <div>
                <p className="text-foreground font-semibold text-sm leading-tight">
                  Solutions sur mesure
                </p>
                <p className="label-tag text-muted mt-0.5">Logistique · Santé · AgriTech · IA</p>
              </div>
            </div>
            <div className="h-px bg-border" />
            <p className="text-muted text-xs leading-relaxed">
              8 domaines d&apos;expertise pour accélérer votre transformation digitale.
            </p>
          </div>
        </div>
      </div>
    </section>);

}