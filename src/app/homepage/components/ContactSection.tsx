"use client";

import React from 'react';
import Icon from '@/components/ui/AppIcon';

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="max-w-7xl mx-auto w-full px-4 md:px-6 pt-4 pb-20 md:pb-24"
    >
      <div className="bg-foreground border border-border rounded-[2.5rem] overflow-hidden">
        <div className="grid md:grid-cols-2 min-h-[420px]">
          {/* Left — Headline */}
          <div className="p-10 md:p-14 flex flex-col justify-between">
            <div className="space-y-6">
              <span className="label-tag text-white/40 tracking-widest block">
                // Contact
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                Travaillons
                <br />
                <span className="italic font-light">ensemble.</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                Une question sur nos solutions ? Contactez-nous directement. Notre équipe vous répond sous 24h.
              </p>
            </div>

            <div className="mt-10 pt-8 border-t border-white/10">
              <p className="label-tag text-white/20">
                WFTECH — Studio de solutions numériques · B2B
              </p>
            </div>
          </div>

          {/* Right — Contact details */}
          <div className="bg-surface p-10 md:p-14 flex flex-col justify-center gap-8">
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="size-11 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                  <Icon name="EnvelopeIcon" size={18} variant="outline" className="text-foreground" />
                </span>
                <div>
                  <p className="label-tag text-muted mb-0.5">Email</p>
                  <a
                    href="mailto:contact@wftech.com"
                    className="text-foreground text-sm font-medium hover:underline underline-offset-4"
                  >
                    contact@wftech.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="size-11 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPinIcon" size={18} variant="outline" className="text-foreground" />
                </span>
                <div>
                  <p className="label-tag text-muted mb-0.5">Localisation</p>
                  <p className="text-foreground text-sm font-medium">Cameroun, Yaoundé — News Street Nkolndogo</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="size-11 rounded-full border border-border flex items-center justify-center flex-shrink-0">
                  <Icon name="ClockIcon" size={18} variant="outline" className="text-foreground" />
                </span>
                <div>
                  <p className="label-tag text-muted mb-0.5">Réponse</p>
                  <p className="text-foreground text-sm font-medium">Sous 24 heures ouvrées</p>
                </div>
              </div>
            </div>

            <a
              href="mailto:contact@wftech.com"
              className="inline-flex items-center gap-3 bg-foreground text-white px-8 py-4 rounded-xl font-mono text-[11px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors w-fit mt-2"
            >
              Nous contacter
              <Icon name="ArrowUpRightIcon" size={15} variant="outline" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}