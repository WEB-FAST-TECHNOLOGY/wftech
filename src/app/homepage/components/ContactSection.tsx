"use client";

import React, { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { useLanguage } from '@/context/LanguageContext';

interface FormFields {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

function validateField(name: keyof FormFields, value: string): string {
  switch (name) {
    case 'name':
      if (!value.trim()) return 'Le nom est requis.';
      if (value.trim().length < 2) return 'Minimum 2 caractères.';
      return '';
    case 'email':
      if (!value.trim()) return "L'e-mail est requis.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'E-mail invalide.';
      return '';
    case 'message':
      if (!value.trim()) return 'Le message est requis.';
      if (value.trim().length < 20) return 'Minimum 20 caractères.';
      return '';
    default:
      return '';
  }
}

export default function ContactSection() {
  const [fields, setFields] = useState<FormFields>({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const { t } = useLanguage();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFields(prev => ({ ...prev, [name]: value }));
    if (touched[name as keyof FormFields]) {
      const error = validateField(name as keyof FormFields, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name as keyof FormFields, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ name: true, email: true, message: true });
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
      setFields({ name: '', email: '', message: '' });
      setTouched({});
      setErrors({});
    } catch {
      setStatus('error');
    }
  };

  const inputBase =
    'w-full bg-white/5 border rounded-xl px-4 py-3 text-sm text-white placeholder:text-white/30 outline-none transition-all duration-200 focus:ring-2';
  const inputState = (field: keyof FormFields) =>
    touched[field] && errors[field]
      ? 'border-red-400/60 focus:ring-red-400/20'
      : touched[field] && !errors[field] && fields[field]
      ? 'border-green-400/60 focus:ring-green-400/20' :'border-white/10 focus:ring-white/10 focus:border-white/30';

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
                {t.contact.label}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white leading-tight">
                {t.contact.headline1}
                <br />
                <span className="italic font-light">{t.contact.headline2}</span>
              </h2>
              <p className="text-white/50 text-sm leading-relaxed max-w-sm">
                {t.contact.description}
              </p>
            </div>

            <div className="mt-10 space-y-4">
              <div className="flex items-center gap-3">
                <span className="size-9 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="EnvelopeIcon" size={15} variant="outline" className="text-white/50" />
                </span>
                <a href="mailto:contact@wftechsarl.com" className="text-white/50 text-xs hover:text-white transition-colors">
                  contact@wftechsarl.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="size-9 rounded-full border border-white/10 flex items-center justify-center flex-shrink-0">
                  <Icon name="MapPinIcon" size={15} variant="outline" className="text-white/50" />
                </span>
                <p className="text-white/50 text-xs">{t.contact.address}</p>
              </div>
              <div className="pt-4 border-t border-white/10">
                <p className="label-tag text-white/20">
                  WFTECH — Studio de solutions numériques · B2B
                </p>
              </div>
            </div>
          </div>

          {/* Right — Form */}
          <div className="bg-surface p-10 md:p-14 flex flex-col justify-center">
            {status === 'success' ? (
              <div className="text-center py-8">
                <div className="w-14 h-14 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center mx-auto mb-5">
                  <svg className="w-7 h-7 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-foreground text-lg font-bold mb-2">{t.contact.success_title}</h3>
                <p className="text-muted text-sm mb-6 leading-relaxed">
                  {t.contact.success_desc}
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="font-mono text-[10px] tracking-widest uppercase text-foreground border border-border px-5 py-2.5 rounded-xl hover:bg-foreground hover:text-white transition-colors"
                >
                  {t.contact.new_message}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <p className="label-tag text-muted mb-2">{t.contact.form_label}</p>

                {/* Name */}
                <div>
                  <input
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={t.contact.name_placeholder}
                    className={`${inputBase} ${inputState('name')}`}
                  />
                  {touched.name && errors.name && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <input
                    type="email"
                    name="email"
                    value={fields.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={t.contact.email_placeholder}
                    className={`${inputBase} ${inputState('email')}`}
                  />
                  {touched.email && errors.email && (
                    <p className="mt-1 text-xs text-red-400 flex items-center gap-1">
                      <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <textarea
                    name="message"
                    value={fields.message}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    rows={4}
                    placeholder={t.contact.message_placeholder}
                    className={`${inputBase} ${inputState('message')} resize-none`}
                  />
                  <div className="flex items-center justify-between mt-1">
                    {touched.message && errors.message ? (
                      <p className="text-xs text-red-400 flex items-center gap-1">
                        <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        {errors.message}
                      </p>
                    ) : <span />}
                    <span className={`text-xs ml-auto ${fields.message.length >= 20 ? 'text-green-400' : 'text-white/20'}`}>
                      {fields.message.length}/20
                    </span>
                  </div>
                </div>

                {status === 'error' && (
                  <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-xs text-red-400">
                    {t.contact.error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full inline-flex items-center justify-center gap-3 bg-foreground text-white px-8 py-4 rounded-xl font-mono text-[11px] font-medium tracking-widest uppercase hover:bg-gray-800 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'submitting' ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      {t.contact.sending}
                    </>
                  ) : (
                    <>
                      {t.contact.submit}
                      <Icon name="ArrowUpRightIcon" size={15} variant="outline" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}