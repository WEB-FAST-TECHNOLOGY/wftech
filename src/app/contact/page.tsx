"use client";

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface FormFields {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

function validateField(name: keyof FormFields, value: string): string {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Le nom est requis.';
      if (value.trim().length < 2) return 'Le nom doit contenir au moins 2 caractères.';
      return '';
    case 'email':
      if (!value.trim()) return "L'adresse e-mail est requise.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Veuillez entrer une adresse e-mail valide.";
      return '';
    case 'subject':
      if (!value.trim()) return 'Le sujet est requis.';
      if (value.trim().length < 3) return 'Le sujet doit contenir au moins 3 caractères.';
      return '';
    case 'message':
      if (!value.trim()) return 'Le message est requis.';
      if (value.trim().length < 20) return 'Le message doit contenir au moins 20 caractères.';
      return '';
    default:
      return '';
  }
}

export default function Contact() {
  const [fields, setFields] = useState<FormFields>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormFields]) {
      const error = validateField(name as keyof FormFields, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormFields, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const allTouched = { name: true, email: true, subject: true, message: true };
    setTouched(allTouched);
    const newErrors: FormErrors = {};
    (Object.keys(fields) as (keyof FormFields)[]).forEach(key => {
      const err = validateField(key, fields[key]);
      if (err) newErrors[key] = err;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setStatus('submitting');
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setStatus('success');
      setFields({ name: '', email: '', subject: '', message: '' });
      setTouched({});
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  const inputBase =
    'w-full bg-white border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/50 outline-none transition-all duration-200 focus:ring-2';
  const inputValid = (field: keyof FormFields) =>
    touched[field] && !errors[field] && fields[field]
      ? 'border-green-400 focus:ring-green-100'
      : touched[field] && errors[field]
      ? 'border-red-400 focus:ring-red-100' :'border-border focus:ring-foreground/10 focus:border-foreground/40';

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 min-h-screen bg-white">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="mb-16">
            <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-4">
              Entreprise · Contact
            </p>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-6">
              Parlons-en
            </h1>
            <div className="w-16 h-px bg-foreground" />
          </div>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            {/* Left — Info */}
            <div>
              <p className="font-sans text-lg text-muted leading-relaxed mb-10">
                Vous avez un projet en tête ? Une question sur nos services ?
                Notre équipe est disponible pour vous accompagner.
              </p>

              <div className="space-y-8">
                <div>
                  <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-2">
                    Email général
                  </p>
                  <a
                    href="mailto:contact@wftech.com"
                    className="font-sans text-xl font-bold text-foreground hover:text-muted transition-colors"
                  >
                    contact@wftech.com
                  </a>
                </div>

                <div>
                  <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-2">
                    Partenariats & Business
                  </p>
                  <a
                    href="mailto:business@wftech.fr"
                    className="font-sans text-xl font-bold text-foreground hover:text-muted transition-colors"
                  >
                    business@wftech.fr
                  </a>
                </div>

                <div>
                  <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-2">
                    Support technique
                  </p>
                  <a
                    href="mailto:support@wftech.fr"
                    className="font-sans text-xl font-bold text-foreground hover:text-muted transition-colors"
                  >
                    support@wftech.fr
                  </a>
                </div>

                <div>
                  <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-2">
                    Localisation
                  </p>
                  <p className="font-sans text-base text-foreground font-medium">
                    Cameroun, Yaoundé — News Street Nkolndogo
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-12 space-y-px bg-border">
                {[
                  { label: 'Devenir partenaire', desc: 'Explorons les opportunités de collaboration.', href: 'mailto:business@wftech.fr?subject=Partenariat' },
                  { label: "Rejoindre l'équipe", desc: "Consultez nos offres d'emploi et postulez.", href: '/carrieres' },
                ].map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    className="block bg-white p-6 group hover:bg-foreground transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-sans text-base font-bold text-foreground group-hover:text-white mb-1">
                          {action.label}
                        </h3>
                        <p className="font-sans text-sm text-muted group-hover:text-white/60">
                          {action.desc}
                        </p>
                      </div>
                      <span className="font-sans text-xl text-muted group-hover:text-white ml-4">→</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — Contact Form */}
            <div>
              <p className="font-mono text-[11px] font-medium tracking-widest uppercase text-muted mb-6">
                Envoyer un message
              </p>

              {status === 'success' ? (
                <div className="rounded-2xl border border-green-200 bg-green-50 p-8 text-center">
                  <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-sans text-lg font-bold text-foreground mb-2">Message envoyé !</h3>
                  <p className="font-sans text-sm text-muted mb-6">
                    Merci pour votre message. Notre équipe vous répondra dans les 24 heures ouvrées.
                  </p>
                  <button
                    onClick={() => setStatus('idle')}
                    className="font-mono text-[11px] font-medium tracking-widest uppercase text-foreground border border-foreground px-6 py-3 rounded-xl hover:bg-foreground hover:text-white transition-colors"
                  >
                    Envoyer un autre message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="font-mono text-[10px] font-medium tracking-widest uppercase text-muted block mb-1.5">
                      Nom complet <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={fields.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Jean Dupont"
                      className={`${inputBase} ${inputValid('name')}`}
                    />
                    {touched.name && errors.name && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.name}
                      </p>
                    )}
                    {touched.name && !errors.name && fields.name && (
                      <p className="mt-1.5 text-xs text-green-600 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Parfait !
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="font-mono text-[10px] font-medium tracking-widest uppercase text-muted block mb-1.5">
                      Adresse e-mail <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={fields.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="jean@exemple.com"
                      className={`${inputBase} ${inputValid('email')}`}
                    />
                    {touched.email && errors.email && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.email}
                      </p>
                    )}
                    {touched.email && !errors.email && fields.email && (
                      <p className="mt-1.5 text-xs text-green-600 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        Parfait !
                      </p>
                    )}
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="font-mono text-[10px] font-medium tracking-widest uppercase text-muted block mb-1.5">
                      Sujet <span className="text-red-400">*</span>
                    </label>
                    <select
                      name="subject"
                      value={fields.subject}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={`${inputBase} ${inputValid('subject')} appearance-none cursor-pointer`}
                    >
                      <option value="">Sélectionnez un sujet</option>
                      <option value="Projet numérique">Projet numérique</option>
                      <option value="Partenariat">Partenariat</option>
                      <option value="Support technique">Support technique</option>
                      <option value="Recrutement">Recrutement</option>
                      <option value="Autre">Autre</option>
                    </select>
                    {touched.subject && errors.subject && (
                      <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                        <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.subject}
                      </p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-mono text-[10px] font-medium tracking-widest uppercase text-muted block mb-1.5">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={fields.message}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      rows={5}
                      placeholder="Décrivez votre projet ou votre demande..."
                      className={`${inputBase} ${inputValid('message')} resize-none`}
                    />
                    <div className="flex items-start justify-between mt-1.5">
                      {touched.message && errors.message ? (
                        <p className="text-xs text-red-500 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                          {errors.message}
                        </p>
                      ) : touched.message && !errors.message && fields.message ? (
                        <p className="text-xs text-green-600 flex items-center gap-1">
                          <svg className="w-3.5 h-3.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Parfait !
                        </p>
                      ) : <span />}
                      <span className={`text-xs ml-auto ${fields.message.length < 20 ? 'text-muted' : 'text-green-600'}`}>
                        {fields.message.length} / 20 min
                      </span>
                    </div>
                  </div>

                  {/* Submit Error */}
                  {status === 'error' && (
                    <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 flex items-center gap-2">
                      <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      Une erreur est survenue. Veuillez réessayer ou nous contacter directement.
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={status === 'submitting'}
                    className="w-full bg-foreground text-white py-4 rounded-xl font-mono text-[11px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    {status === 'submitting' ? (
                      <>
                        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        Envoi en cours…
                      </>
                    ) : (
                      <>
                        Envoyer le message
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Response Time */}
          <div className="border-t border-border pt-12 flex flex-col md:flex-row items-start md:items-center gap-6">
            <div className="w-2 h-2 rounded-full bg-green-500 shrink-0 mt-1 md:mt-0" />
            <p className="font-sans text-sm text-muted">
              <span className="font-bold text-foreground">Temps de réponse moyen : 24h.</span>{' '}
              Notre équipe s'engage à répondre à toutes les demandes dans les meilleurs délais.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
