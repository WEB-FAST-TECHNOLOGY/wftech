import React from 'react';

interface CaseStudy {
  company: string;
  industry: string;
  result: string;
  quote: string;
}

interface SocialProofProps {
  clients: string[];
  caseStudy: CaseStudy;
}

export default function SocialProof({ clients, caseStudy }: SocialProofProps) {
  return (
    <section className="mb-20">
      {/* Section label */}
      <p className="font-mono text-[11px] tracking-widest uppercase text-muted mb-10">// Ils nous font confiance</p>

      {/* Client logos strip */}
      <div className="border border-border rounded-3xl p-8 mb-6">
        <p className="font-mono text-[10px] tracking-widest uppercase text-muted mb-6">Partenaires &amp; clients</p>
        <div className="flex flex-wrap items-center gap-x-10 gap-y-6">
          {clients.map((name) => (
            <span
              key={name}
              className="font-sans text-sm font-semibold tracking-tight text-foreground/30 hover:text-foreground/70 transition-colors duration-300 select-none"
            >
              {name}
            </span>
          ))}
        </div>
      </div>

      {/* Case study preview */}
      <div className="border border-border rounded-3xl p-8 bg-surface hover:bg-foreground group transition-colors duration-500">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Tag */}
          <div className="flex-shrink-0">
            <span className="font-mono text-[10px] tracking-widest uppercase px-3 py-1.5 border border-border group-hover:border-white/20 rounded-full text-muted group-hover:text-white/50 transition-all duration-300">
              Étude de cas
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 space-y-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              <h3 className="font-sans text-xl font-bold text-foreground group-hover:text-white transition-colors duration-300">
                {caseStudy.company}
              </h3>
              <span className="font-mono text-[10px] tracking-widest uppercase text-muted group-hover:text-white/40 transition-colors duration-300">
                — {caseStudy.industry}
              </span>
            </div>

            <blockquote className="font-sans text-sm italic text-muted group-hover:text-white/70 leading-relaxed transition-colors duration-300 border-l-2 border-border group-hover:border-white/20 pl-4">
              &ldquo;{caseStudy.quote}&rdquo;
            </blockquote>

            <div className="pt-2">
              <p className="font-sans text-2xl font-bold text-foreground group-hover:text-white transition-colors duration-300">
                {caseStudy.result}
              </p>
              <p className="font-mono text-[10px] tracking-widest uppercase text-muted group-hover:text-white/40 transition-colors duration-300 mt-1">
                Résultat clé
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
