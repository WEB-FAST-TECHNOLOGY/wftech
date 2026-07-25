'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useLanguage } from '@/context/LanguageContext';

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

export default function ContactClient() {
  const { t } = useLanguage();
  const [fields, setFields] = useState<FormFields>({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Partial<Record<keyof FormFields, boolean>>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  function validateField(name: keyof FormFields, value: string): string {
    switch (name) {
      case 'name':
        if (!value.trim()) return 'Requis';
        if (value.trim().length < 2) return 'Min 2 chars';
        return '';
      case 'email':
        if (!value.trim()) return 'Requis';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Invalide';
        return '';
      case 'subject':
        if (!value.trim()) return 'Requis';
        return '';
      case 'message':
        if (!value.trim()) return 'Requis';
        if (value.trim().length < 20) return 'Min 20 chars';
        return '';
      default:
        return '';
    }
  }

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
    'w-full bg-surface border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted/50 outline-none transition-all duration-300 focus:ring-2 shadow-sm focus:shadow-md';
  const inputValid = (field: keyof FormFields) =>
    touched[field] && !errors[field] && fields[field]
      ? 'border-green-400 focus:ring-green-200/50'
      : touched[field] && errors[field]
      ? 'border-red-400 focus:ring-red-200/50' :'border-border hover:border-primary/50 focus:ring-primary/20 focus:border-primary';

  return (
    <>
      <Header />
      <main className="pt-32 pb-24 min-h-screen bg-bg">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          {/* Header */}
          <div className="mb-16">
            <p className="font-mono text-xs font-semibold tracking-widest uppercase text-primary mb-4 animate-fade-in">
              {t.contact_page?.label}
            </p>
            <h1 className="font-sans text-5xl md:text-7xl font-bold tracking-tight text-foreground leading-none mb-6">
              {t.contact_page?.title}
            </h1>
            <div className="w-16 h-1 bg-gradient-to-r from-primary to-gradient-end rounded-full" />
          </div>

          {/* Contact Grid */}
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            {/* Left — Info */}
            <div>
              <p className="font-sans text-lg text-muted leading-relaxed mb-10">
                {t.contact_page?.intro}
              </p>

              <div className="space-y-8 glass-card p-8 rounded-3xl">
                {Object.entries(t.contact_page?.emails || {}).map(([key, info]: [string, any]) => (
                  <div key={key}>
                    <p className="font-sans text-xs font-semibold tracking-widest uppercase text-muted mb-2">
                      {info.label}
                    </p>
                    <a
                      href={`mailto:${info.value}`}
                      className="font-sans text-xl font-bold text-foreground hover:text-primary transition-colors"
                    >
                      {info.value}
                    </a>
                  </div>
                ))}
                <div className="pt-4 border-t border-border">
                  <p className="font-sans text-xs font-semibold tracking-widest uppercase text-muted mb-2">
                    {t.contact_page?.location?.label}
                  </p>
                  <p className="font-sans text-base text-foreground font-medium">
                    {t.contact_page?.location?.value}
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="mt-12 space-y-4">
                {t.contact_page?.actions?.map((action: any, idx: number) => (
                  <a
                    key={idx}
                    href={idx === 0 ? 'mailto:business@wftech.com?subject=Partenariat' : '/carrieres'}
                    className="block bg-surface p-6 rounded-2xl border border-border shadow-sm group hover:shadow-lg hover:border-primary/30 transition-all transform hover:-translate-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-sans text-base font-bold text-foreground group-hover:text-primary mb-1 transition-colors">
                          {action.label}
                        </h3>
                        <p className="font-sans text-sm text-muted">
                          {action.desc}
                        </p>
                      </div>
                      <span className="font-sans text-xl text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">→</span>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Right — Contact Form */}
            <div>
              <div className="bg-surface p-8 rounded-3xl border border-border shadow-xl">
                <p className="font-sans text-xs font-semibold tracking-widest uppercase text-primary mb-6">
                  {t.contact_page?.form?.title}
                </p>

                {status === 'success' ? (
                  <div className="rounded-2xl border border-green-200 bg-green-50/50 p-8 text-center animate-fade-in">
                    <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
                      <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-sans text-xl font-bold text-foreground mb-3">{t.contact_page?.form?.success_title}</h3>
                    <p className="font-sans text-base text-muted mb-8">
                      {t.contact_page?.form?.success_desc}
                    </p>
                    <button
                      onClick={() => setStatus('idle')}
                      className="font-sans text-sm font-semibold tracking-wide text-primary border-2 border-primary px-8 py-3 rounded-full hover:bg-primary hover:text-white transition-colors"
                    >
                      {t.contact_page?.form?.send_another}
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate className="space-y-6">
                    {/* Name */}
                    <div>
                      <label className="font-sans text-sm font-semibold text-foreground block mb-2">
                        {t.contact_page?.form?.name} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={fields.name}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputBase} ${inputValid('name')}`}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="font-sans text-sm font-semibold text-foreground block mb-2">
                        {t.contact_page?.form?.email} <span className="text-primary">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={fields.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputBase} ${inputValid('email')}`}
                      />
                    </div>

                    {/* Subject */}
                    <div>
                      <label className="font-sans text-sm font-semibold text-foreground block mb-2">
                        {t.contact_page?.form?.subject} <span className="text-primary">*</span>
                      </label>
                      <select
                        name="subject"
                        value={fields.subject}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        className={`${inputBase} ${inputValid('subject')} appearance-none cursor-pointer`}
                      >
                        <option value="">{t.contact_page?.form?.select_subject}</option>
                        {t.contact_page?.form?.subjects?.map((sub: string) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ))}
                      </select>
                    </div>

                    {/* Message */}
                    <div>
                      <label className="font-sans text-sm font-semibold text-foreground block mb-2">
                        {t.contact_page?.form?.message} <span className="text-primary">*</span>
                      </label>
                      <textarea
                        name="message"
                        value={fields.message}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        rows={5}
                        className={`${inputBase} ${inputValid('message')} resize-none`}
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={status === 'submitting'}
                      className="w-full bg-gradient-to-r from-primary to-gradient-end text-white py-4 rounded-full font-sans text-sm font-bold tracking-wide uppercase hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 shadow-lg shadow-primary/20 mt-4"
                    >
                      {status === 'submitting' ? (
                        <>
                          <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          {t.contact_page?.form?.submitting}
                        </>
                      ) : (
                        t.contact_page?.form?.submit
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
          
          <div className="border-t border-border pt-12 flex flex-col md:flex-row items-start md:items-center gap-6 pb-8">
            <div className="w-3 h-3 rounded-full bg-green-500 shrink-0 mt-1 md:mt-0 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
            <p className="font-sans text-sm text-muted">
              <span className="font-bold text-foreground">{t.contact_page?.form?.response_time}</span>{' '}
              {t.contact_page?.form?.response_desc}
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
