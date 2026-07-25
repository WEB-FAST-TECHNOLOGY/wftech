'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabaseClient';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// ─── Types ─────────────────────────────────────────────────────────────────────
type AppTab = 'map' | 'explorer' | 'mes-annonces' | 'publier' | 'messages' | 'favoris' | 'profil';
type AuthMode = 'login' | 'register';
type PublishStep = 1 | 2 | 3;
type Role = 'particulier' | 'professionnel' | 'agent' | 'proprietaire';

interface Listing {
  id: string; user_id: string; title: string; address: string; price: number;
  surface: number; rooms: number; listing_type: 'sale' | 'rent'; property_type: string;
  description: string; image_url: string; lat: number; lng: number;
  is_active: boolean; created_at: string;
}
interface SavedProperty {
  id: string; property_id: string; title: string; address: string;
  price: number; listing_type: string; surface: number; rooms: number; image_url: string;
}
interface UserProfile {
  id: string; full_name: string; phone: string; role: string;
  is_verified: boolean; email?: string; avatar_url?: string; profession?: string;
}

// ─── Role definitions (mirrors mobile AuthRoleSelectorWidget) ──────────────────
const ROLES: { id: Role; label: string; description: string; icon: React.ReactNode }[] = [
  {
    id: 'particulier', label: 'Particulier', description: 'Acheteur / Locataire',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  },
  {
    id: 'professionnel', label: 'Professionnel', description: 'Architecte / Promoteur',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>,
  },
  {
    id: 'agent', label: 'Agent', description: 'Agent immobilier',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2" /></svg>,
  },
  {
    id: 'proprietaire', label: 'Propriétaire', description: 'Bailleur / Vendeur',
    icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  },
];

const PROFESSIONS_BY_ROLE: Record<Role, { id: string; label: string }[]> = {
  particulier: [
    { id: 'acheteur', label: 'Acheteur' },
    { id: 'locataire', label: 'Locataire' },
    { id: 'investisseur', label: 'Investisseur' },
    { id: 'autre', label: 'Autre' },
  ],
  professionnel: [
    { id: 'architecte', label: 'Architecte' },
    { id: 'ingenieur', label: 'Ingénieur' },
    { id: 'promoteur', label: 'Promoteur' },
    { id: 'notaire', label: 'Notaire' },
    { id: 'geometre', label: 'Géomètre' },
    { id: 'entrepreneur', label: 'Entrepreneur' },
    { id: 'designer', label: 'Designer' },
    { id: 'expert_immobilier', label: 'Expert immobilier' },
    { id: 'juriste', label: 'Juriste' },
    { id: 'autre_pro', label: 'Autre professionnel' },
  ],
  agent: [
    { id: 'agent_immobilier', label: 'Agent immobilier' },
    { id: 'courtier', label: 'Courtier' },
    { id: 'mandataire', label: 'Mandataire' },
    { id: 'gestionnaire', label: 'Gestionnaire de biens' },
  ],
  proprietaire: [
    { id: 'bailleur', label: 'Bailleur' },
    { id: 'vendeur', label: 'Vendeur' },
    { id: 'promoteur_prive', label: 'Promoteur privé' },
    { id: 'sci', label: 'SCI / Société' },
  ],
};

const isProfessional = (role: Role) => role === 'professionnel' || role === 'agent';

// ─── Password strength check ───────────────────────────────────────────────────
function usePasswordStrength(pwd: string) {
  return {
    hasMinLength: pwd.length >= 8,
    hasUppercase: /[A-Z]/.test(pwd),
    hasNumber: /[0-9]/.test(pwd),
    hasSymbol: /[!@#$%^&*(),.?":{}|<>_\-+=\[\]\\/]/.test(pwd),
  };
}

// ─── Error translation (mirrors mobile _translateAuthError) ────────────────────
function translateAuthError(msg: string): string {
  const m = msg.toLowerCase();
  if (m.includes('invalid login credentials') || m.includes('invalid_credentials'))
    return 'Email ou mot de passe incorrect';
  if (m.includes('email already registered') || m.includes('already registered'))
    return 'Cet email est déjà utilisé';
  if (m.includes('password should be at least'))
    return 'Le mot de passe doit comporter au moins 8 caractères';
  if (m.includes('unable to validate email address'))
    return 'Adresse email invalide';
  if (m.includes('email rate limit exceeded'))
    return 'Trop de tentatives, réessayez plus tard';
  if (m.includes('user not found'))
    return 'Utilisateur introuvable';
  return msg;
}

// ─── AUTH SCREEN (mirrors mobile SignUpLoginScreen exactly) ────────────────────
function AuthScreen({ onAuth }: { onAuth: () => void }) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [role, setRole] = useState<Role>('particulier');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [profession, setProfession] = useState('');
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [showVerifModal, setShowVerifModal] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const strength = usePasswordStrength(password);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setError('');
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/solutions/zehouse/app` : undefined },
      });
    } catch (err: any) {
      setError(`Connexion Google échouée : ${err.message}`);
      setGoogleLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!email || !email.includes('@')) {
      setError('Entrez votre email pour réinitialiser le mot de passe');
      return;
    }
    setLoading(true);
    await supabase.auth.resetPasswordForEmail(email.trim());
    setLoading(false);
    setForgotSent(true);
    setTimeout(() => setForgotSent(false), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation (mirrors mobile)
    if (!email || !email.includes('@')) { setError('Adresse email invalide'); return; }
    if (!password) { setError('Mot de passe requis'); return; }
    if (mode === 'register') {
      if (!name) { setError('Nom complet requis'); return; }
      if (isProfessional(role) && !phone) { setError('Téléphone obligatoire pour les professionnels'); return; }
      if (password.length < 8) { setError('Le mot de passe doit comporter au moins 8 caractères'); return; }
      if (!strength.hasUppercase) { setError('Le mot de passe doit contenir une majuscule'); return; }
      if (!strength.hasNumber) { setError('Le mot de passe doit contenir un chiffre'); return; }
      if (!strength.hasSymbol) { setError('Le mot de passe doit contenir un symbole'); return; }
      if (isProfessional(role) && !avatarFile) { setError('Photo de profil obligatoire pour les professionnels'); return; }
      if (!acceptedTerms) { setError('Vous devez accepter les CGU pour continuer'); return; }
    }

    setLoading(true);
    try {
      if (mode === 'login') {
        const { error: err } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
        if (err) throw err;
        onAuth();
      } else {
        const { data, error: err } = await supabase.auth.signUp({
          email: email.trim(), password,
          options: { data: { full_name: name, role, phone: phone || '' } },
        });
        if (err) throw err;
        if (data.user) {
          // Upload avatar if provided
          let avatarUrl = '';
          if (avatarFile) {
            try {
              const fname = `avatar_${data.user.id}_${Date.now()}.jpg`;
              const { error: upErr } = await supabase.storage.from('avatars').upload(fname, avatarFile);
              if (!upErr) avatarUrl = supabase.storage.from('avatars').getPublicUrl(fname).data.publicUrl;
            } catch (_) {}
          }
          await supabase.from('user_profiles').upsert({
            id: data.user.id, email: email.trim(), full_name: name,
            role, phone: phone || '', is_verified: false,
            ...(avatarUrl ? { avatar_url: avatarUrl } : {}),
            ...(profession ? { profession } : {}),
          });
          setShowVerifModal(true);
        }
      }
    } catch (err: any) {
      setError(translateAuthError(err.message || 'Une erreur est survenue'));
    } finally {
      setLoading(false);
    }
  };

  // Email verification modal (mirrors mobile _showEmailVerificationDialog)
  if (showVerifModal) return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4">
      <div className="bg-surface border border-border rounded-3xl p-10 max-w-sm w-full text-center shadow-2xl">
        <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
          <svg className="w-8 h-8 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 19v-8.93a2 2 0 01.89-1.664l7-4.666a2 2 0 012.22 0l7 4.666A2 2 0 0121 10.07V19M3 19a2 2 0 002 2h14a2 2 0 002-2M3 19l6.75-4.5M21 19l-6.75-4.5M3 10l6.75 4.5M21 10l-6.75 4.5m0 0l-1.14.76a2 2 0 01-2.22 0l-1.14-.76" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-foreground mb-3">Vérifiez votre email</h2>
        <p className="text-sm text-muted mb-8 leading-relaxed">
          Un email de confirmation a été envoyé à <strong className="text-foreground">{email}</strong>. Cliquez sur le lien pour activer votre compte.
        </p>
        <button onClick={() => { setShowVerifModal(false); onAuth(); }}
          className="w-full bg-gradient-to-r from-primary to-gradient-end text-white py-3.5 rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20">
          Compris, continuer
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-end/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Back to vitrine */}
        <Link href="/solutions/zehouse" className="flex items-center gap-2 text-muted hover:text-primary transition-colors text-sm mb-8 w-fit">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
          Retour à la vitrine
        </Link>

        {/* Logo (animated, mirrors mobile) */}
        <div className="text-center mb-8">
          <div className="inline-flex flex-col items-center gap-3 mb-2">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-primary to-gradient-end flex items-center justify-center shadow-2xl shadow-primary/30 animate-[scaleIn_0.8s_ease-out]">
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <p className="text-2xl font-black text-primary tracking-[0.2em]">ZEHOUSE</p>
              <p className="text-sm text-muted">Trouvez votre chez-vous</p>
            </div>
          </div>
        </div>

        {/* Tab toggle */}
        <div className="bg-surface border border-border rounded-2xl p-1 flex mb-7">
          {(['login', 'register'] as AuthMode[]).map(m => (
            <button key={m} onClick={() => { setMode(m); setError(''); }}
              className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all
                ${mode === m ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-muted hover:text-foreground'}`}>
              {m === 'login' ? 'Connexion' : 'Inscription'}
            </button>
          ))}
        </div>

        <div className="bg-surface border border-border rounded-3xl p-7 shadow-xl">
          {/* ROLE SELECTOR (signup only — mirrors mobile AuthRoleSelectorWidget) */}
          {mode === 'register' && (
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <p className="text-sm font-bold text-foreground">Je suis</p>
                {isProfessional(role) && (
                  <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    Vérification requise
                  </span>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4">
                {ROLES.map(r => (
                  <button key={r.id} type="button" onClick={() => { setRole(r.id); setProfession(''); }}
                    className={`flex flex-col items-center gap-1.5 py-3 px-2 rounded-2xl border-2 transition-all
                      ${role === r.id
                        ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
                        : 'bg-bg border-border text-muted hover:border-primary/40 hover:text-foreground'}`}>
                    <span className={role === r.id ? 'text-white' : 'text-muted'}>{r.icon}</span>
                    <span className="text-xs font-bold">{r.label}</span>
                    <span className={`text-[9px] leading-none ${role === r.id ? 'text-white/70' : 'text-muted'}`}>{r.description}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full name (signup only) */}
            {mode === 'register' && (
              <div>
                <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">Nom complet *</label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                  <input value={name} onChange={e => setName(e.target.value)} required placeholder="Marie Nguimbus"
                    className="w-full pl-9 pr-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">Adresse email *</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="vous@email.com"
                  className="w-full pl-9 pr-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary transition-colors" />
              </div>
            </div>

            {/* Phone (signup only — mandatory for professionals) */}
            {mode === 'register' && (
              <div>
                <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">
                  {isProfessional(role) ? 'Téléphone professionnel *' : 'Téléphone'}
                </label>
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} required={isProfessional(role)} placeholder="+237 6XX XXX XXX"
                    className="w-full pl-9 pr-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary transition-colors" />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">Mot de passe *</label>
              <div className="relative">
                <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                <input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                  className="w-full pl-9 pr-11 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary transition-colors" />
                <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors">
                  {showPassword
                    ? <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>
                    : <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                  }
                </button>
              </div>
              {/* Password strength (signup only — mirrors mobile) */}
              {mode === 'register' && password.length > 0 && (
                <div className="mt-2 grid grid-cols-2 gap-1">
                  {[
                    { ok: strength.hasMinLength, label: '8 caractères min' },
                    { ok: strength.hasUppercase, label: '1 majuscule' },
                    { ok: strength.hasNumber, label: '1 chiffre' },
                    { ok: strength.hasSymbol, label: '1 symbole' },
                  ].map((c, i) => (
                    <div key={i} className={`flex items-center gap-1.5 text-[11px] font-medium transition-colors ${c.ok ? 'text-emerald-600' : 'text-muted'}`}>
                      <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center flex-shrink-0 transition-all ${c.ok ? 'bg-emerald-500 border-emerald-500' : 'border-border'}`}>
                        {c.ok && <svg className="w-2 h-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                      </div>
                      {c.label}
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Forgot password (login only) */}
            {mode === 'login' && (
              <div className="flex justify-end">
                <button type="button" onClick={handleForgotPassword}
                  className="text-xs text-primary font-semibold hover:underline transition-all">
                  {forgotSent ? '✓ Email envoyé !' : 'Mot de passe oublié ?'}
                </button>
              </div>
            )}

            {/* Profession selector (signup only — mirrors mobile _buildProfessionSelector) */}
            {mode === 'register' && (
              <div>
                <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-2">
                  {role === 'particulier' ? 'Je cherche à' : role === 'proprietaire' ? 'Je suis' : 'Ma spécialité'}
                </label>
                <div className="flex flex-wrap gap-2">
                  {PROFESSIONS_BY_ROLE[role].map(p => (
                    <button key={p.id} type="button" onClick={() => setProfession(profession === p.id ? '' : p.id)}
                      className={`text-xs font-bold px-3 py-1.5 rounded-full border transition-all
                        ${profession === p.id
                          ? 'bg-foreground text-white border-foreground'
                          : 'bg-bg border-border text-muted hover:border-primary/40 hover:text-foreground'}`}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Profile photo (signup + professional only — mirrors mobile _buildProfilePhotoSection) */}
            {mode === 'register' && isProfessional(role) && (
              <div>
                <label className="text-xs font-bold text-muted uppercase tracking-wider block mb-2">Photo de profil *</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-border overflow-hidden flex items-center justify-center bg-bg flex-shrink-0">
                    {avatarPreview
                      ? <img src={avatarPreview} alt="preview" className="w-full h-full object-cover" />
                      : <svg className="w-6 h-6 text-muted" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    }
                  </div>
                  <div>
                    <button type="button" onClick={() => fileRef.current?.click()}
                      className="text-sm font-bold text-primary border border-primary/20 bg-primary/5 px-4 py-2 rounded-xl hover:bg-primary/10 transition-colors">
                      {avatarPreview ? 'Changer la photo' : 'Choisir une photo'}
                    </button>
                    <p className="text-[10px] text-muted mt-1">JPG, PNG · max 5 MB</p>
                    <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatarChange} className="hidden" />
                  </div>
                </div>
              </div>
            )}

            {/* CGU checkbox (signup only — mirrors mobile _buildConsentCheckbox) */}
            {mode === 'register' && (
              <label className="flex items-start gap-3 cursor-pointer">
                <div className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all ${acceptedTerms ? 'bg-primary border-primary' : 'border-border'}`}
                  onClick={() => setAcceptedTerms(v => !v)}>
                  {acceptedTerms && <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>}
                </div>
                <span className="text-xs text-muted leading-relaxed">
                  J&apos;accepte les{' '}
                  <Link href="/solutions/zehouse/terms" className="text-primary font-semibold hover:underline">
                    Conditions Générales d&apos;Utilisation
                  </Link>{' '}et la{' '}
                  <Link href="/solutions/zehouse/terms" className="text-primary font-semibold hover:underline">
                    Politique de confidentialité
                  </Link>
                </span>
              </label>
            )}

            {/* Error */}
            {error && (
              <div className="bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs px-4 py-3 rounded-2xl flex items-start gap-2">
                <svg className="w-4 h-4 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit */}
            <button type="submit" disabled={loading}
              className="w-full bg-gradient-to-r from-primary to-gradient-end text-white py-3.5 rounded-2xl font-bold text-sm uppercase tracking-wider hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50">
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Chargement…
                </span>
              ) : mode === 'login' ? 'Se connecter' : "Créer mon compte"}
            </button>
          </form>

          {/* Divider + Google Sign-In (mirrors mobile AuthSocialButtonsWidget) */}
          <div className="mt-6">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex-1 h-px bg-border" />
              <span className="text-xs text-muted font-medium">ou continuer avec</span>
              <div className="flex-1 h-px bg-border" />
            </div>
            <button onClick={handleGoogleSignIn} disabled={googleLoading}
              className="w-full flex items-center justify-center gap-3 py-3.5 rounded-2xl border-2 border-border bg-bg hover:border-primary/30 hover:bg-primary/5 transition-all font-bold text-sm text-foreground disabled:opacity-50">
              {googleLoading ? (
                <svg className="animate-spin w-5 h-5 text-muted" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
              ) : (
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
              )}
              Continuer avec Google
            </button>
          </div>

          {/* Switch mode */}
          <p className="text-center text-xs text-muted mt-5">
            {mode === 'login' ? "Pas encore de compte ?" : "Déjà un compte ?"}{' '}
            <button onClick={() => { setMode(mode === 'login' ? 'register' : 'login'); setError(''); }}
              className="text-primary font-bold hover:underline">
              {mode === 'login' ? "S'inscrire" : "Se connecter"}
            </button>
          </p>

          <p className="text-center text-[10px] text-muted mt-4">
            © 2025 WebFast Technology SARL · Tous droits réservés
          </p>
        </div>

        {/* Admin link */}
        <div className="mt-4 text-center">
          <Link href="/solutions/zehouse/admin/login" className="text-xs text-muted hover:text-primary transition-colors flex items-center justify-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" /></svg>
            Accès console admin
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── SVG Icon helpers ──────────────────────────────────────────────────────────
const Icon = {
  home: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
  map: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
  list: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>,
  plus: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 4v16m8-8H4" /></svg>,
  heart: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>,
  user: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>,
  pin: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  logout: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>,
  shield: <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
  edit: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>,
  check: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>,
  search: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>,
  filter: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>,
  locate: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  layers: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" /></svg>,
  x: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>,
  route: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" /></svg>,
  chat: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
  send: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" /></svg>,
  share: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 10.742l4.828-2.414m0 0a3 3 0 10-1.243-2.518l-4.829 2.414m4.829 0a3 3 0 11-1.243 2.518m-4.829-2.414a3 3 0 101.243 2.518m-1.243-2.518l4.829 2.414" /></svg>,
  alert: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>,
  chart: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
  pdf: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
  tour: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>,
  center: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
};

// ─── Listing Card ──────────────────────────────────────────────────────────────
function ListingCard({ item, saved, onSave, onUnsave, onDelete, onToggle, showOwnerActions = false, onClick }: {
  item: Listing; saved?: boolean;
  onSave?: (item: Listing) => void; onUnsave?: (id: string) => void;
  onDelete?: (id: string) => void; onToggle?: (id: string, cur: boolean) => void;
  showOwnerActions?: boolean; onClick?: (item: Listing) => void;
}) {
  return (
    <div onClick={() => onClick?.(item)}
      className={`bg-surface border border-border rounded-2xl overflow-hidden group hover:border-primary/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 ${onClick ? 'cursor-pointer' : ''}`}>
      <div className="h-44 relative overflow-hidden bg-muted/10">
        <img src={item.image_url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'} alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider text-white ${item.listing_type === 'sale' ? 'bg-indigo-500' : 'bg-emerald-500'}`}>
            {item.listing_type === 'sale' ? 'Vente' : 'Location'}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/40 text-white">{item.property_type}</span>
        </div>
        {!showOwnerActions && (
          <button onClick={e => { e.stopPropagation(); saved ? onUnsave?.(item.id) : onSave?.(item); }}
            className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur ${saved ? 'bg-rose-500 text-white' : 'bg-black/40 text-white hover:bg-rose-500'}`}>
            <svg className="w-4 h-4" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        )}
      </div>
      <div className="p-4">
        <h4 className="font-bold text-foreground text-sm mb-1 line-clamp-1 group-hover:text-primary transition-colors">{item.title}</h4>
        <p className="text-xs text-muted mb-3 flex items-center gap-1">{Icon.pin} {item.address}</p>
        <div className="flex items-center justify-between mb-3">
          <span className="text-base font-bold text-primary font-mono">{item.price.toLocaleString()} CFA</span>
          <span className="text-xs text-muted">{item.surface}m² · {item.rooms}p</span>
        </div>
        {showOwnerActions && (
          <div className="flex gap-2 pt-3 border-t border-border">
            <button onClick={e => { e.stopPropagation(); onToggle?.(item.id, item.is_active); }}
              className={`flex-1 text-xs font-bold py-2 rounded-xl border transition-colors ${item.is_active ? 'bg-amber-500/10 text-amber-600 border-amber-500/20' : 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20'}`}>
              {item.is_active ? 'Archiver' : 'Réactiver'}
            </button>
            <button onClick={e => { e.stopPropagation(); onDelete?.(item.id); }}
              className="flex-1 text-xs font-bold py-2 rounded-xl bg-rose-500/10 text-rose-600 border border-rose-500/20 transition-colors">
              Supprimer
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── MapWrapper (Interactive fake map helper with pan & zoom) ──────────────────
// ─── MapWrapper (Vraie Carte Mapbox GL JS 3D) ──────────────────────────────────
function MapWrapper({
  filtered, selectedProperty, setSelectedProperty, simulateRoute, mapStyle, userPos
}: {
  filtered: Listing[]; selectedProperty: Listing | null;
  setSelectedProperty: (item: Listing | null) => void;
  simulateRoute: (item: Listing) => void; mapStyle: 'streets' | 'satellite';
  userPos: { lat: number; lng: number } | null;
  PIN_OFFSETS?: any;
}) {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const markersRef = useRef<mapboxgl.Marker[]>([]);

  // Token Mapbox Zehouse (depuis le projet)
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN || 'pk.eyJ1Ijoid2Z0ZWNoIiwiYSI6ImNtbTIzYWZoZTAya2IycnNkcWt6d2VqeDgifQ.XXXXXXX';

  // Initialisation Mapbox
  useEffect(() => {
    if (!mapContainerRef.current) return;
    mapboxgl.accessToken = mapboxToken;

    const initialCenter: [number, number] = userPos ? [userPos.lng, userPos.lat] : [11.5021, 3.8480]; // Yaoundé default coordinates

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle === 'streets' 
        ? 'mapbox://styles/mapbox/streets-v12' 
        : 'mapbox://styles/mapbox/satellite-streets-v12',
      center: initialCenter,
      zoom: 12,
      pitch: 45, // 3D Tilt like mobile
      bearing: -17,
      antialias: true
    });

    map.addControl(new mapboxgl.NavigationControl({ showCompass: true, showZoom: true }), 'bottom-right');
    mapRef.current = map;

    return () => {
      map.remove();
    };
  }, []);

  // Update map style when style changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    map.setStyle(mapStyle === 'streets' 
      ? 'mapbox://styles/mapbox/streets-v12' 
      : 'mapbox://styles/mapbox/satellite-streets-v12');
  }, [mapStyle]);

  // Update pins markers on map
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Clear existing markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current = [];

    // Add current user location dot if available
    if (userPos) {
      const el = document.createElement('div');
      el.className = 'user-gps-dot';
      el.innerHTML = `
        <div class="relative w-8 h-8 flex items-center justify-center">
          <div class="absolute inset-0 bg-blue-500/30 rounded-full animate-ping"></div>
          <div class="w-4 h-4 bg-blue-500 rounded-full border-2 border-white shadow-lg relative z-10"></div>
        </div>
      `;
      const userMarker = new mapboxgl.Marker({ element: el })
        .setLngLat([userPos.lng, userPos.lat])
        .addTo(map);
      markersRef.current.push(userMarker);
    }

    // Add properties markers
    filtered.slice(0, 15).forEach(item => {
      const isSelected = selectedProperty?.id === item.id;
      const el = document.createElement('div');
      el.className = 'custom-property-pin cursor-pointer transform hover:scale-110 transition-all';
      el.innerHTML = `
        <div class="flex flex-col items-center">
          <div class="rounded-xl px-2.5 py-1 text-xs font-black shadow-2xl border transition-all ${
            isSelected 
              ? 'bg-indigo-600 text-white border-indigo-500 scale-110 shadow-indigo-600/50' 
              : item.listing_type === 'sale'
                ? 'bg-indigo-500 text-white border-indigo-400'
                : 'bg-emerald-500 text-white border-emerald-400'
          }">
            ${(item.price / 1000).toFixed(0)}k
          </div>
          <div class="w-2.5 h-2.5 rounded-full mt-0.5 shadow-md ${
            isSelected ? 'bg-indigo-600' : item.listing_type === 'sale' ? 'bg-indigo-500' : 'bg-emerald-500'
          }"></div>
        </div>
      `;

      // Tap event
      el.addEventListener('click', (e) => {
        e.stopPropagation();
        setSelectedProperty(isSelected ? null : item);
        if (!isSelected) {
          simulateRoute(item);
          map.easeTo({ center: [item.lng, item.lat], zoom: 14, duration: 800 });
        }
      });

      const marker = new mapboxgl.Marker({ element: el })
        .setLngLat([item.lng, item.lat])
        .addTo(map);
      markersRef.current.push(marker);
    });
  }, [filtered, selectedProperty, userPos]);

  // Center on selected property if change
  useEffect(() => {
    const map = mapRef.current;
    if (!map || !selectedProperty) return;
    map.easeTo({
      center: [selectedProperty.lng, selectedProperty.lat],
      zoom: 14,
      duration: 800
    });
  }, [selectedProperty]);

  return (
    <div className="w-full h-full relative">
      <div ref={mapContainerRef} className="w-full h-full" />
      <style jsx global>{`
        .mapboxgl-ctrl-bottom-right {
          bottom: 20px;
          right: 20px;
        }
        .mapboxgl-ctrl-group {
          border-radius: 12px !important;
          border: 1px border-border !important;
          background: var(--surface) !important;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1) !important;
        }
        .mapboxgl-ctrl-group button {
          width: 38px !important;
          height: 38px !important;
        }
      `}</style>
    </div>
  );
}

// ─── MAP TAB (mirrors mobile MapScreen — Mapbox-style interactive map) ─────────
function MapTab({ userId, focusProperty, onFocusConsumed }: { userId: string; focusProperty?: Listing | null; onFocusConsumed?: () => void }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState('');
  const [activeFilter, setActiveFilter] = useState('Tous');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Listing | null>(null);
  const [userPos, setUserPos] = useState<{ lat: number; lng: number } | null>(null);
  const [zenMode, setZenMode] = useState(false);
  const [routeInfo, setRouteInfo] = useState<{ distance: string; duration: string } | null>(null);
  const [mapStyle, setMapStyle] = useState<'streets' | 'satellite'>('streets');
  const [filters, setFilters] = useState({ minPrice: '', maxPrice: '', minSurface: '', maxSurface: '', minRooms: '0', onlyAroundMe: false });
  const [loading, setLoading] = useState(true);

  // Map canvas ref
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    Promise.all([
      supabase.from('user_listings').select('*').eq('is_active', true).order('created_at', { ascending: false }),
      supabase.from('saved_properties').select('property_id').eq('user_id', userId),
    ]).then(([{ data: l }, { data: s }]) => {
      setListings(l || []);
      setSaved(new Set((s || []).map((x: any) => x.property_id)));
      setLoading(false);
    });
    // Get GPS
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => setUserPos({ lat: pos.coords.latitude, lng: pos.coords.longitude }),
        () => setUserPos({ lat: 3.8480, lng: 11.5021 }) // Yaoundé fallback
      );
    }
  }, [userId]);

  // Auto-select and center on a property when focusProperty changes (triggered from ExplorerTab)
  useEffect(() => {
    if (!focusProperty) return;
    setSelectedProperty(focusProperty);
    simulateRoute(focusProperty);
    if (onFocusConsumed) onFocusConsumed();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusProperty]);

  const FILTER_CHIPS = ['Tous', 'Acheter', 'Louer', 'Appartement', 'Maison', 'Studio', 'Villa', 'Terrain'];

  const filtered = listings.filter(l => {
    const q = search.toLowerCase();
    const matchQ = !q || l.title.toLowerCase().includes(q) || l.address.toLowerCase().includes(q);
    const matchChip = activeFilter === 'Tous' ? true
      : activeFilter === 'Acheter' ? l.listing_type === 'sale'
      : activeFilter === 'Louer' ? l.listing_type === 'rent'
      : l.property_type === activeFilter;
    const matchMinP = !filters.minPrice || l.price >= Number(filters.minPrice);
    const matchMaxP = !filters.maxPrice || l.price <= Number(filters.maxPrice);
    const matchMinS = !filters.minSurface || l.surface >= Number(filters.minSurface);
    const matchRooms = !filters.minRooms || filters.minRooms === '0' || l.rooms >= Number(filters.minRooms);
    return matchQ && matchChip && matchMinP && matchMaxP && matchMinS && matchRooms;
  });

  // Haversine distance
  const haversine = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    const R = 6371;
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = Math.sin(dLat/2)**2 + Math.cos(lat1*Math.PI/180)*Math.cos(lat2*Math.PI/180)*Math.sin(dLng/2)**2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  };

  const simulateRoute = (prop: Listing) => {
    if (!userPos) { setRouteInfo(null); return; }
    const dist = haversine(userPos.lat, userPos.lng, prop.lat, prop.lng);
    const km = dist.toFixed(1);
    const mins = Math.round(dist * 2.5); // ~24km/h urban
    setRouteInfo({
      distance: dist >= 1 ? `${km} km` : `${Math.round(dist * 1000)} m`,
      duration: mins >= 60 ? `${Math.floor(mins/60)}h ${mins%60}min` : `${mins} min`,
    });
  };

  const handleSave = async (item: Listing) => {
    await supabase.from('saved_properties').insert({ user_id: userId, property_id: item.id, title: item.title, address: item.address, price: item.price, listing_type: item.listing_type, surface: item.surface, rooms: item.rooms, image_url: item.image_url });
    setSaved(s => new Set([...s, item.id]));
  };
  const handleUnsave = async (propId: string) => {
    await supabase.from('saved_properties').delete().eq('user_id', userId).eq('property_id', propId);
    setSaved(s => { const n = new Set(s); n.delete(propId); return n; });
  };

  // Pin positions (distributed across map canvas for visual effect)
  const PIN_OFFSETS = [
    { dx: 0.20, dy: 0.30 }, { dx: 0.55, dy: 0.25 }, { dx: 0.75, dy: 0.45 },
    { dx: 0.35, dy: 0.60 }, { dx: 0.65, dy: 0.65 }, { dx: 0.15, dy: 0.65 },
    { dx: 0.50, dy: 0.50 }, { dx: 0.80, dy: 0.25 }, { dx: 0.40, dy: 0.20 },
    { dx: 0.70, dy: 0.75 }, { dx: 0.28, dy: 0.45 }, { dx: 0.62, dy: 0.38 },
  ];

  return (
    <div className="flex flex-col h-full relative" style={{ height: 'calc(100vh - 64px)' }}>
      {/* Search bar (mirrors mobile MapSearchBarWidget) */}
      {!zenMode && (
        <div className="absolute top-4 left-0 right-0 z-20 px-4" style={{ pointerEvents: 'none' }}>
          <div style={{ pointerEvents: 'all' }} className="max-w-2xl mx-auto">
            <div className="bg-surface/90 backdrop-blur-xl border border-border rounded-2xl shadow-2xl">
              <div className="flex items-center gap-3 px-4 py-3">
                <span className="text-muted">{Icon.search}</span>
                <input type="text" value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Rechercher une ville, un quartier, un bien…"
                  className="flex-1 bg-transparent text-sm text-foreground placeholder-muted outline-none" />
                {search && <button onClick={() => setSearch('')} className="text-muted hover:text-foreground">{Icon.x}</button>}
                <button onClick={() => setShowAdvanced(!showAdvanced)} className={`p-1.5 rounded-xl transition-colors ${showAdvanced ? 'bg-primary text-white' : 'text-muted hover:text-foreground'}`}>
                  {Icon.filter}
                </button>
              </div>
              {/* Filter chips (mirrors mobile MapFilterChipsWidget) */}
              <div className="px-3 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
                {FILTER_CHIPS.map(f => (
                  <button key={f} onClick={() => setActiveFilter(f)}
                    className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold transition-all flex-shrink-0
                      ${activeFilter === f ? 'bg-primary text-white shadow-md' : 'bg-bg text-muted border border-border hover:border-primary/40'}`}>
                    {f}
                  </button>
                ))}
              </div>
              {/* Advanced filters (mirrors mobile MapAdvancedFilterWidget) */}
              {showAdvanced && (
                <div className="border-t border-border px-4 py-3 grid grid-cols-2 md:grid-cols-3 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Prix min (CFA)</label>
                    <input type="number" value={filters.minPrice} onChange={e => setFilters(f => ({...f, minPrice: e.target.value}))}
                      placeholder="0" className="w-full px-3 py-1.5 bg-bg border border-border rounded-xl text-xs outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Prix max (CFA)</label>
                    <input type="number" value={filters.maxPrice} onChange={e => setFilters(f => ({...f, maxPrice: e.target.value}))}
                      placeholder="∞" className="w-full px-3 py-1.5 bg-bg border border-border rounded-xl text-xs outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Surface min (m²)</label>
                    <input type="number" value={filters.minSurface} onChange={e => setFilters(f => ({...f, minSurface: e.target.value}))}
                      placeholder="0" className="w-full px-3 py-1.5 bg-bg border border-border rounded-xl text-xs outline-none focus:border-primary" />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-muted uppercase tracking-wider block mb-1">Pièces min</label>
                    <select value={filters.minRooms} onChange={e => setFilters(f => ({...f, minRooms: e.target.value}))}
                      className="w-full px-3 py-1.5 bg-bg border border-border rounded-xl text-xs outline-none focus:border-primary">
                      {['0','1','2','3','4','5'].map(n => <option key={n} value={n}>{n === '0' ? 'Tous' : `${n}+`}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center gap-2 col-span-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <div onClick={() => setFilters(f => ({...f, onlyAroundMe: !f.onlyAroundMe}))}
                        className={`w-9 h-5 rounded-full border-2 transition-all ${filters.onlyAroundMe ? 'bg-primary border-primary' : 'bg-bg border-border'} relative`}>
                        <div className={`absolute top-0.5 w-3.5 h-3.5 rounded-full bg-white shadow transition-all ${filters.onlyAroundMe ? 'right-0.5' : 'left-0.5'}`} />
                      </div>
                      <span className="text-xs font-medium text-foreground">Autour de moi</span>
                    </label>
                    <button onClick={() => setFilters({ minPrice:'',maxPrice:'',minSurface:'',maxSurface:'',minRooms:'0',onlyAroundMe:false })}
                      className="ml-auto text-xs text-muted hover:text-primary">Réinitialiser</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

        {/* Real Interactive Map simulation (drag to pan, mousewheel to zoom) */}
        <MapWrapper filtered={filtered} selectedProperty={selectedProperty} setSelectedProperty={setSelectedProperty} simulateRoute={simulateRoute} mapStyle={mapStyle} userPos={userPos} PIN_OFFSETS={PIN_OFFSETS} />

        {/* Results count badge */}
        {!zenMode && (
          <div className="absolute bottom-4 left-4 z-20 bg-surface/90 backdrop-blur border border-border rounded-xl px-3 py-1.5 text-xs font-bold text-foreground shadow-lg">
            {filtered.length} bien{filtered.length > 1 ? 's' : ''}
            {search && <span className="text-muted font-normal"> · "{search}"</span>}
          </div>
        )}

        {/* Loading overlay */}
        {loading && (
          <div className="absolute inset-0 bg-bg/50 backdrop-blur-sm z-30 flex items-center justify-center">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        )}


      {/* Property bottom sheet (mirrors mobile MapPropertyBottomSheetWidget) */}
      {selectedProperty && (
        <div className="absolute bottom-0 left-0 right-0 z-30 animate-slideUp">
          <div className="bg-surface/95 backdrop-blur-xl border-t border-border rounded-t-3xl shadow-2xl p-5 max-h-72 overflow-y-auto">
            <div className="w-12 h-1 bg-border rounded-full mx-auto mb-4" />
            <div className="flex gap-4">
              <img src={selectedProperty.image_url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'} alt=""
                className="w-24 h-20 rounded-2xl object-cover flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <h3 className="font-bold text-foreground text-sm line-clamp-1">{selectedProperty.title}</h3>
                  <button onClick={() => setSelectedProperty(null)} className="text-muted hover:text-foreground flex-shrink-0">{Icon.x}</button>
                </div>
                <p className="text-xs text-muted flex items-center gap-1 mb-2">{Icon.pin} {selectedProperty.address}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-base font-bold text-primary font-mono">{selectedProperty.price.toLocaleString()} CFA</span>
                  <span className="text-xs text-muted">{selectedProperty.surface}m² · {selectedProperty.rooms}p</span>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${selectedProperty.listing_type === 'sale' ? 'bg-indigo-500/10 text-indigo-600' : 'bg-emerald-500/10 text-emerald-600'}`}>
                    {selectedProperty.listing_type === 'sale' ? 'Vente' : 'Location'}
                  </span>
                </div>
              </div>
            </div>
            {/* Route info (mirrors mobile route calculation) */}
            {routeInfo && (
              <div className="mt-3 flex items-center gap-3 bg-primary/5 border border-primary/20 rounded-2xl px-4 py-2.5">
                {Icon.route}
                <div className="flex items-center gap-4 text-sm">
                  <span className="font-bold text-foreground">{routeInfo.distance}</span>
                  <span className="text-muted">·</span>
                  <span className="text-muted">{routeInfo.duration} en voiture</span>
                </div>
              </div>
            )}
            <div className="mt-3 flex gap-2">
              <button onClick={() => saved.has(selectedProperty.id) ? handleUnsave(selectedProperty.id) : handleSave(selectedProperty)}
                className={`flex-1 py-2.5 rounded-2xl text-xs font-bold border transition-all flex items-center justify-center gap-1.5
                  ${saved.has(selectedProperty.id) ? 'bg-rose-500/10 text-rose-600 border-rose-500/20' : 'bg-bg border-border text-muted hover:border-primary hover:text-primary'}`}>
                <svg className="w-4 h-4" fill={saved.has(selectedProperty.id) ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                {saved.has(selectedProperty.id) ? 'Sauvegardé' : 'Sauvegarder'}
              </button>
              <button onClick={() => simulateRoute(selectedProperty)}
                className="flex-1 py-2.5 rounded-2xl text-xs font-bold bg-gradient-to-r from-primary to-gradient-end text-white shadow-md shadow-primary/20 flex items-center justify-center gap-1.5">
                {Icon.route} Itinéraire
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Explorer Tab ─────────────────────────────────────────────────────────────
function ExplorerTab({ userId, onCenterOnMap }: { userId: string; onCenterOnMap?: (item: Listing) => void }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all'|'sale'|'rent'>('all');
  const [propType, setPropType] = useState('all');
  const [maxPrice, setMaxPrice] = useState('');
  const [minSurface, setMinSurface] = useState('');

  useEffect(() => {
    Promise.all([
      supabase.from('user_listings').select('*').eq('is_active', true).order('created_at', { ascending: false }),
      supabase.from('saved_properties').select('property_id').eq('user_id', userId),
    ]).then(([{ data: l }, { data: s }]) => {
      setListings(l || []); setSaved(new Set((s || []).map((x: any) => x.property_id))); setLoading(false);
    });
  }, [userId]);

  const handleSave = async (item: Listing) => {
    await supabase.from('saved_properties').insert({ user_id: userId, property_id: item.id, title: item.title, address: item.address, price: item.price, listing_type: item.listing_type, surface: item.surface, rooms: item.rooms, image_url: item.image_url });
    setSaved(s => new Set([...s, item.id]));
  };
  const handleUnsave = async (propId: string) => {
    await supabase.from('saved_properties').delete().eq('user_id', userId).eq('property_id', propId);
    setSaved(s => { const n = new Set(s); n.delete(propId); return n; });
  };

  const [selectedDetail, setSelectedDetail] = useState<Listing | null>(null);
  const [chatStarting, setChatStarting] = useState(false);
  const [alertToast, setAlertToast] = useState('');
  const [showCreditModal, setShowCreditModal] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);
  const [creditYears, setCreditYears] = useState(15);
  const [creditRate, setCreditRate] = useState(7.5);
  const [sharingId, setSharingId] = useState<string | null>(null);
  const [priceAlertSet, setPriceAlertSet] = useState<Set<string>>(new Set());

  const startChatWithOwner = async (property: Listing) => {
    if (!userId || chatStarting) return;
    setChatStarting(true);
    try {
      // 1. Check if conversation already exists for this property between these two users
      const { data: existing } = await supabase
        .from('conversations')
        .select('id')
        .eq('property_title', property.title)
        .or(`and(participant_one.eq.${userId},participant_two.eq.${property.user_id}),and(participant_one.eq.${property.user_id},participant_two.eq.${userId})`)
        .maybeSingle();

      if (existing) {
        // Conversation exists! Redirect the user to the Messages tab
        // Note: For absolute responsiveness, we trigger a custom window event or reload
        window.location.hash = `#chat-${existing.id}`;
        window.dispatchEvent(new HashChangeEvent('hashchange'));
        setSelectedDetail(null);
        setChatStarting(false);
        return;
      }

      // 2. Create new conversation
      const { data: newConv, error } = await supabase
        .from('conversations')
        .insert({
          participant_one: userId,
          participant_two: property.user_id,
          property_title: property.title,
          property_image_url: property.image_url,
          property_price: `${property.price.toLocaleString()} CFA`,
          last_message: 'Bonjour, je suis intéressé par votre annonce.',
          last_message_at: new Date().toISOString()
        })
        .select()
        .single();

      if (!error && newConv) {
        // 3. Send initial message
        await supabase.from('messages').insert({
          conversation_id: newConv.id,
          sender_id: userId,
          content: 'Bonjour, je suis intéressé par votre annonce.',
          is_read: false
        });

        window.location.hash = `#chat-${newConv.id}`;
        window.dispatchEvent(new HashChangeEvent('hashchange'));
        setSelectedDetail(null);
      }
    } catch (e) {
      console.error(e);
    }
    setChatStarting(false);
  };

  const handleShare = async (item: Listing) => {
    const url = `${window.location.origin}/solutions/zehouse/app?property=${item.id}`;
    const text = `${item.title} — ${item.price.toLocaleString()} CFA — ${item.address}`;
    if (navigator.share) {
      try { await navigator.share({ title: item.title, text, url }); } catch (_) {}
    } else {
      await navigator.clipboard.writeText(url);
      setSharingId(item.id);
      setTimeout(() => setSharingId(null), 2500);
    }
  };

  const handlePriceAlert = async (item: Listing) => {
    if (priceAlertSet.has(item.id)) {
      setPriceAlertSet(s => { const n = new Set(s); n.delete(item.id); return n; });
      setAlertToast('Alerte de prix désactivée.');
    } else {
      localStorage.setItem(`price_alert_${item.id}`, JSON.stringify({ price: item.price, title: item.title, userId }));
      setPriceAlertSet(s => new Set([...s, item.id]));
      setAlertToast(`Alerte activée ! Vous serez notifié si le prix de "${item.title}" baisse.`);
    }
    setTimeout(() => setAlertToast(''), 4000);
  };

  const calcMonthly = (price: number, years: number, rate: number) => {
    const r = rate / 100 / 12;
    const n = years * 12;
    if (r === 0) return price / n;
    return (price * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
  };

  const handlePrint = (item: Listing) => {
    const w = window.open('', '_blank');
    if (!w) return;
    const badgeColor = item.listing_type === 'sale' ? '#6366f1' : '#10b981';
    const badgeLabel = item.listing_type === 'sale' ? 'À Vendre' : 'À Louer';
    w.document.write(`<!DOCTYPE html><html><head><title>${item.title} — Fiche Zehouse</title>
      <style>body{font-family:system-ui,sans-serif;max-width:700px;margin:40px auto;color:#111;padding:0 20px}h1{font-size:22px;margin-bottom:4px}img{width:100%;height:280px;object-fit:cover;border-radius:12px;margin-bottom:20px}.info{display:flex;gap:24px;margin:16px 0;padding:16px 0;border-top:1px solid #eee;border-bottom:1px solid #eee}.info div{text-align:center;flex:1}.info span{display:block;font-size:11px;color:#888;text-transform:uppercase;margin-bottom:4px}.info strong{font-size:18px;font-weight:700}.badge{display:inline-block;padding:4px 12px;border-radius:99px;font-size:11px;font-weight:700;margin-bottom:8px;background:${badgeColor};color:#fff}.footer{margin-top:30px;text-align:center;font-size:11px;color:#aaa;padding-top:16px;border-top:1px solid #eee}</style>
      </head><body>
      <div class="badge">${item.property_type} · ${badgeLabel}</div>
      <h1>${item.title}</h1>
      <p style="color:#888;font-size:13px;margin-top:4px">${item.address}</p>
      <img src="${item.image_url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'}" alt="">
      <div class="info">
        <div><span>Prix</span><strong>${item.price.toLocaleString()} CFA</strong></div>
        <div><span>Surface</span><strong>${item.surface} m²</strong></div>
        <div><span>Pièces</span><strong>${item.rooms}p</strong></div>
      </div>
      <p style="font-size:13px;line-height:1.8;color:#555">${item.description || 'Aucune description fournie.'}</p>
      <div class="footer">Fiche générée par Zehouse · ${new Date().toLocaleDateString('fr-FR')} · Coordonnées GPS : ${item.lat.toFixed(5)}, ${item.lng.toFixed(5)}</div>
      </body></html>`);
    w.document.close();
    setTimeout(() => { w.print(); }, 500);
  };

  const PROP_TYPES = ['all','Appartement','Maison','Studio','Villa','Bureau','Terrain'];
  const filtered = listings.filter(l => {
    const q = search.toLowerCase();
    return (!q || l.title.toLowerCase().includes(q) || l.address.toLowerCase().includes(q))
      && (typeFilter === 'all' || l.listing_type === typeFilter)
      && (!maxPrice || l.price <= Number(maxPrice))
      && (!minSurface || l.surface >= Number(minSurface))
      && (propType === 'all' || l.property_type === propType);
  });

  return (
    <div>
      {/* Toast notification */}
      {alertToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] bg-emerald-600 text-white text-xs font-semibold px-5 py-3 rounded-2xl shadow-2xl animate-slideUp max-w-sm text-center">
          {alertToast}
        </div>
      )}

      {/* Credit calculator modal */}
      {showCreditModal && selectedDetail && (
        <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-sm flex items-end md:items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-3xl p-6 w-full max-w-sm shadow-2xl animate-slideUp">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-bold text-foreground">Simulateur de crédit</h3>
              <button onClick={() => setShowCreditModal(false)} className="w-8 h-8 rounded-full bg-bg border border-border flex items-center justify-center text-muted hover:text-foreground">{Icon.x}</button>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 mb-5 text-center">
              <p className="text-xs text-muted uppercase tracking-wider font-bold mb-1">Mensualité estimée</p>
              <p className="text-3xl font-black text-primary font-mono">{Math.round(calcMonthly(selectedDetail.price, creditYears, creditRate)).toLocaleString()}</p>
              <p className="text-xs text-muted mt-1">CFA / mois</p>
            </div>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider">Durée</label>
                  <span className="text-xs font-bold text-foreground">{creditYears} ans</span>
                </div>
                <input type="range" min={5} max={25} value={creditYears} onChange={e => setCreditYears(Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-primary" />
                <div className="flex justify-between text-[10px] text-muted mt-1"><span>5 ans</span><span>25 ans</span></div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-muted uppercase tracking-wider">Taux annuel</label>
                  <span className="text-xs font-bold text-foreground">{creditRate}%</span>
                </div>
                <input type="range" min={3} max={15} step={0.5} value={creditRate} onChange={e => setCreditRate(Number(e.target.value))}
                  className="w-full h-1.5 bg-border rounded-full appearance-none cursor-pointer accent-primary" />
                <div className="flex justify-between text-[10px] text-muted mt-1"><span>3%</span><span>15%</span></div>
              </div>
            </div>
            <div className="mt-4 bg-bg border border-border rounded-2xl p-3 text-xs text-muted">
              <p className="font-bold text-foreground mb-1">Récapitulatif</p>
              <p>Prix : <strong>{selectedDetail.price.toLocaleString()} CFA</strong></p>
              <p>Coût total : <strong>{Math.round(calcMonthly(selectedDetail.price, creditYears, creditRate) * creditYears * 12).toLocaleString()} CFA</strong></p>
              <p className="text-[10px] mt-1 italic">Simulation indicative. Contactez votre banque pour un devis officiel.</p>
            </div>
          </div>
        </div>
      )}

      {/* 3D Virtual Tour modal */}
      {showTourModal && selectedDetail && (
        <div className="fixed inset-0 z-[90] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-3xl p-6 w-full max-w-md shadow-2xl animate-scaleIn text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-500">{Icon.tour}</div>
            <h3 className="font-bold text-foreground mb-2">Visite virtuelle 3D</h3>
            <p className="text-xs text-muted mb-1">{selectedDetail.title}</p>
            <div className="bg-indigo-500/5 border border-indigo-500/20 rounded-2xl p-4 my-4">
              <p className="text-xs text-indigo-600 font-semibold">Fonctionnalité Premium Zehouse</p>
              <p className="text-xs text-muted mt-1 leading-relaxed">La visite virtuelle 3D immersive est disponible sur les biens certifiés Zehouse Premium. Le propriétaire doit activer cette option depuis son tableau de bord.</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => setShowTourModal(false)} className="flex-1 py-2.5 rounded-2xl border border-border text-sm font-bold text-foreground hover:border-primary transition-all">Fermer</button>
              <a href="/solutions/zehouse#tarifs" className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-primary to-gradient-end text-white text-xs font-bold flex items-center justify-center transition-all">Découvrir Premium</a>
            </div>
          </div>
        </div>
      )}
      {/* ── Type 1 : Leaderboard Web Header Ad (728x90) ── */}
      <div className="bg-surface border border-dashed border-border rounded-2xl p-4 mb-5 flex items-center justify-between overflow-hidden relative min-h-[90px] shadow-sm max-w-5xl mx-auto">
        <span className="absolute top-2 right-2 bg-foreground/10 text-muted text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
          Publicité Leaderboard
        </span>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
          </div>
          <div>
            <h4 className="font-bold text-foreground text-sm">Assurances Habitations Zehouse Protect</h4>
            <p className="text-xs text-muted">Protégez votre nouveau chez-vous à partir de 5000 CFA/mois. Devis gratuit instantané.</p>
          </div>
        </div>
        <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-primary text-white text-xs font-bold rounded-xl hover:opacity-90 transition-all uppercase tracking-wider">
          Obtenir mon devis
        </a>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-4 mb-5 space-y-3">
        <div className="relative">
          <span className="absolute inset-y-0 left-3.5 flex items-center text-muted">{Icon.search}</span>
          <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Ville, quartier, titre…"
            className="w-full pl-10 pr-4 py-2.5 bg-bg border border-border rounded-xl text-sm focus:outline-none focus:border-primary transition-colors" />
        </div>
        <div className="flex flex-wrap gap-2">
          {(['all','sale','rent'] as const).map(f => (
            <button key={f} onClick={() => setTypeFilter(f)}
              className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${typeFilter===f?'bg-primary text-white':'bg-bg border border-border text-muted hover:text-foreground'}`}>
              {f==='all'?'Tous':f==='sale'?'Vente':'Location'}
            </button>
          ))}
          <input type="number" value={maxPrice} onChange={e=>setMaxPrice(e.target.value)} placeholder="Prix max" className="w-28 px-3 py-1.5 bg-bg border border-border rounded-xl text-xs focus:outline-none focus:border-primary ml-auto" />
          <input type="number" value={minSurface} onChange={e=>setMinSurface(e.target.value)} placeholder="Surface min" className="w-28 px-3 py-1.5 bg-bg border border-border rounded-xl text-xs focus:outline-none focus:border-primary" />
        </div>
        <div className="flex flex-wrap gap-2">
          {PROP_TYPES.map(pt => (
            <button key={pt} onClick={() => setPropType(pt)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${propType===pt?'bg-foreground text-white':'bg-bg border border-border text-muted hover:text-foreground'}`}>
              {pt==='all'?'Tous types':pt}
            </button>
          ))}
        </div>
      </div>
      <p className="text-sm text-muted mb-4"><span className="font-bold text-foreground font-mono">{filtered.length}</span> bien{filtered.length>1?'s':''}</p>
      {loading ? <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"/></div>
        : (
          <div className="space-y-6">
            {/* Premium CTA banner inside search list */}
            <div className="bg-gradient-to-r from-primary/10 to-gradient-end/10 border border-primary/20 rounded-3xl p-5 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M5 3l14 9-14 9V3z"/></svg>
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">Boostez la visibilité de vos biens avec Zehouse Premium</h4>
                  <p className="text-xs text-muted">Photos HD, Badge Vérifié et Remontée automatique en tête de liste.</p>
                </div>
              </div>
              <Link href="/solutions/zehouse#tarifs" className="px-4 py-2 bg-gradient-to-r from-primary to-gradient-end text-white text-xs font-bold rounded-xl shadow-md hover:opacity-90 transition-all uppercase tracking-wider flex-shrink-0">
                Découvrir l&apos;offre
              </Link>
            </div>

            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map((item, idx) => (
                <React.Fragment key={item.id}>
                  {/* Type 2 : Inline Native Banner after 2nd property */}
                  {idx === 2 && (
                    <div className="col-span-full md:col-span-1 bg-surface border border-dashed border-border rounded-2xl p-5 flex flex-col justify-between h-44 relative overflow-hidden group">
                      <div className="absolute top-2 right-2 bg-foreground/10 text-muted text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                        Sponsorisé
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Publicité AdMob</span>
                        <h4 className="font-bold text-foreground text-sm mt-1 line-clamp-2">Besoin d&apos;un déménageur de confiance à Yaoundé ?</h4>
                        <p className="text-xs text-muted mt-1 leading-relaxed">Profitez de 15% de réduction avec le code ZEMOVE15 chez nos partenaires.</p>
                      </div>
                      <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="w-full text-center py-2.5 bg-bg border border-border text-foreground hover:border-primary hover:text-primary transition-all text-xs font-bold rounded-xl">
                        En savoir plus
                      </a>
                    </div>
                  )}
                  {/* Type 3 : Native Ad simulating a property card after 5th property */}
                  {idx === 5 && (
                    <div className="bg-surface border border-border rounded-2xl overflow-hidden group hover:shadow-xl transition-all flex flex-col justify-between">
                      <div className="h-44 relative overflow-hidden bg-muted/10">
                        <img src="https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg" alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
                        <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase text-white bg-indigo-600">Sponsorisé</span>
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-foreground text-sm mb-1 line-clamp-1">Canal+ : Le meilleur du football africain</h4>
                          <p className="text-xs text-muted mb-3 flex items-center gap-1">{Icon.pin} Abonnements disponibles partout</p>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-sm font-bold text-primary">À partir de 5000 CFA</span>
                          <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1 bg-primary text-white text-[10px] font-bold rounded-lg uppercase tracking-wider">
                            S&apos;abonner
                          </a>
                        </div>
                      </div>
                    </div>
                  )}
                  <ListingCard item={item} saved={saved.has(item.id)} onSave={handleSave} onUnsave={handleUnsave} onClick={(item) => setSelectedDetail(item)}/>
                </React.Fragment>
              ))}
            </div>
          </div>
        )}

      {/* ── DETAIL MODAL SHEET WITH REAL MESSAGING START OPTION ── */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface border border-border w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl animate-scaleIn">
            <div className="h-56 relative bg-muted/10">
              <img src={selectedDetail.image_url || 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'} alt={selectedDetail.title} className="w-full h-full object-cover"/>
              <button onClick={() => setSelectedDetail(null)} className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/50 text-white hover:bg-black/70 flex items-center justify-center backdrop-blur transition-all font-bold">✕</button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-primary">{selectedDetail.property_type} · {selectedDetail.listing_type === 'sale' ? 'A Vendre' : 'A Louer'}</span>
                <h3 className="text-xl font-bold text-foreground mt-1">{selectedDetail.title}</h3>
                <p className="text-xs text-muted flex items-center gap-1 mt-1.5">{Icon.pin} {selectedDetail.address}</p>
              </div>
              <div className="flex items-center gap-4 py-2 border-y border-border">
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Prix</p>
                  <p className="text-lg font-bold text-primary font-mono">{selectedDetail.price.toLocaleString()} CFA</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Surface</p>
                  <p className="text-sm font-bold text-foreground font-mono">{selectedDetail.surface} m²</p>
                </div>
                <div className="w-px h-8 bg-border" />
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Pièces</p>
                  <p className="text-sm font-bold text-foreground font-mono">{selectedDetail.rooms}p</p>
                </div>
              </div>
              <div>
                <p className="text-xs font-bold text-muted uppercase tracking-wider block mb-1">Description</p>
                <p className="text-xs text-muted leading-relaxed max-h-24 overflow-y-auto pr-2">{selectedDetail.description || 'Aucune description fournie.'}</p>
              </div>
              {selectedDetail.user_id !== userId ? (
                <div className="space-y-2">
                  <button onClick={() => startChatWithOwner(selectedDetail)} disabled={chatStarting}
                    className="w-full py-3 bg-gradient-to-r from-primary to-gradient-end text-white font-bold rounded-2xl text-xs uppercase tracking-wider hover:opacity-90 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                    {chatStarting ? (
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <span className="flex items-center gap-1.5">{Icon.chat} Contacter le propriétaire</span>
                    )}
                  </button>

                  {/* ── 5 Options d'interaction supplémentaires ── */}
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    <button onClick={() => handleShare(selectedDetail)}
                      className={`py-2.5 bg-bg border transition-all text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 ${sharingId === selectedDetail.id ? 'border-emerald-500 text-emerald-600' : 'border-border hover:border-primary text-foreground hover:text-primary'}`}>
                      {sharingId === selectedDetail.id ? Icon.check : Icon.share}
                      {sharingId === selectedDetail.id ? 'Lien copié !' : 'Partager'}
                    </button>
                    <button onClick={() => setShowTourModal(true)}
                      className="py-2.5 bg-bg border border-border hover:border-indigo-500 text-foreground hover:text-indigo-600 transition-all text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5">
                      {Icon.tour} Visite 3D
                    </button>
                    <button onClick={() => handlePriceAlert(selectedDetail)}
                      className={`py-2.5 bg-bg border transition-all text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5 ${priceAlertSet.has(selectedDetail.id) ? 'border-amber-500 text-amber-600 bg-amber-500/5' : 'border-border hover:border-amber-500 text-foreground hover:text-amber-600'}`}>
                      {Icon.alert} {priceAlertSet.has(selectedDetail.id) ? 'Alerte active' : 'Alerte Prix'}
                    </button>
                    <button onClick={() => setShowCreditModal(true)}
                      className="py-2.5 bg-bg border border-border hover:border-primary text-foreground hover:text-primary transition-all text-xs font-semibold rounded-xl flex items-center justify-center gap-1.5">
                      {Icon.chart} Simuler crédit
                    </button>
                  </div>
                  <button onClick={() => handlePrint(selectedDetail)}
                    className="w-full py-2.5 bg-bg border border-border hover:border-primary text-foreground hover:text-primary text-xs font-semibold rounded-xl transition-all flex items-center justify-center gap-1.5">
                    {Icon.pdf} Fiche PDF détaillée
                  </button>
                </div>
              ) : (
                <div className="space-y-2">
                  <p className="text-[11px] text-center text-slate-500 font-semibold italic">Cette annonce vous appartient.</p>
                  <button onClick={() => { if (onCenterOnMap) { onCenterOnMap(selectedDetail); setSelectedDetail(null); } }}
                    className="w-full py-2.5 bg-primary/5 text-primary border border-primary/20 hover:bg-primary/10 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5">
                    {Icon.center} Centrer sur la carte
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Mes Annonces ─────────────────────────────────────────────────────────────
function MesAnnoncesTab({ userId }: { userId: string }) {
  const [listings, setListings] = useState<Listing[]>([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    const { data } = await supabase.from('user_listings').select('*').eq('user_id', userId).order('created_at', { ascending: false });
    setListings(data||[]); setLoading(false);
  }, [userId]);
  useEffect(() => { load(); }, [load]);
  const handleToggle = async (id: string, cur: boolean) => {
    await supabase.from('user_listings').update({ is_active: !cur }).eq('id', id);
    setListings(l => l.map(x => x.id===id ? {...x, is_active: !cur} : x));
  };
  const handleDelete = async (id: string) => {
    await supabase.from('user_listings').delete().eq('id', id);
    setListings(l => l.filter(x => x.id!==id));
  };
  const active = listings.filter(l=>l.is_active), archived = listings.filter(l=>!l.is_active);
  if (loading) return <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"/></div>;
  if (!listings.length) return (
    <div className="text-center py-20 bg-surface border border-border rounded-2xl">
      <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
        {Icon.home}
      </div>
      <h3 className="font-bold text-foreground mb-2">Aucune annonce</h3>
      <p className="text-muted text-sm">Publiez votre premier bien via l&apos;onglet Publier.</p>
    </div>
  );
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        {[{label:'Total',val:listings.length,cls:'border-border'},{label:'Actives',val:active.length,cls:'border-emerald-500/20',num:'text-emerald-600'},{label:'Archivées',val:archived.length,cls:'border-amber-500/20',num:'text-amber-600'}].map(s=>(
          <div key={s.label} className={`bg-surface border rounded-2xl p-4 text-center ${s.cls}`}>
            <p className={`text-2xl font-bold font-mono ${(s as any).num||'text-foreground'}`}>{s.val}</p>
            <p className="text-xs text-muted">{s.label}</p>
          </div>
        ))}
      </div>
      {active.length>0 && <div><h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-full"/>Actives ({active.length})</h3><div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{active.map(i=><ListingCard key={i.id} item={i} showOwnerActions onToggle={handleToggle} onDelete={handleDelete}/>)}</div></div>}
      {archived.length>0 && <div><h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2"><span className="w-2 h-2 bg-amber-500 rounded-full"/>Archivées ({archived.length})</h3><div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">{archived.map(i=><ListingCard key={i.id} item={i} showOwnerActions onToggle={handleToggle} onDelete={handleDelete}/>)}</div></div>}
    </div>
  );
}

// ─── Publish Tab (3 steps — mirrors mobile PublishListingScreen) ──────────────
function PublierTab({ userId, onPublished }: { userId: string; onPublished: ()=>void }) {
  const [step, setStep] = useState<PublishStep>(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ title:'',description:'',listing_type:'sale',property_type:'Appartement',price:'',surface:'',rooms:'1',address:'',lat:'3.8480',lng:'11.5021',image_url:'' });
  const set = (k: string, v: string) => setForm(f=>({...f,[k]:v}));
  const PROP_TYPES = ['Appartement','Maison','Studio','Villa','Bureau','Terrain','Duplex','Villa standing'];
  const handleSubmit = async () => {
    setLoading(true); setError('');
    try {
      const {error:err} = await supabase.from('user_listings').insert({ user_id: userId, title: form.title, description: form.description, listing_type: form.listing_type, property_type: form.property_type, price: Number(form.price), surface: Number(form.surface), rooms: Number(form.rooms), address: form.address, lat: Number(form.lat), lng: Number(form.lng), image_url: form.image_url||'', is_active: true });
      if (err) throw err;
      setSuccess(true);
      setTimeout(() => { setSuccess(false); setStep(1); setForm({title:'',description:'',listing_type:'sale',property_type:'Appartement',price:'',surface:'',rooms:'1',address:'',lat:'3.8480',lng:'11.5021',image_url:''}); onPublished(); }, 2500);
    } catch(err:any) { setError(err.message); } finally { setLoading(false); }
  };
  if (success) return (
    <div className="flex flex-col items-center justify-center py-24">
      <div className="w-20 h-20 rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center mb-6 animate-bounce">
        <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/></svg>
      </div>
      <h3 className="text-xl font-bold text-foreground mb-2">Annonce publiée !</h3>
      <p className="text-muted text-sm text-center max-w-xs">Votre bien est maintenant visible sur la carte et dans la liste.</p>
    </div>
  );
  return (
    <div className="max-w-xl mx-auto">
      <div className="flex items-center mb-8">
        {([1,2,3] as PublishStep[]).map((s,i)=>(
          <React.Fragment key={s}>
            <div className="flex flex-col items-center gap-1">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all ${step===s?'bg-primary text-white border-primary shadow-lg shadow-primary/30':step>s?'bg-emerald-500 text-white border-emerald-500':'bg-surface text-muted border-border'}`}>{step>s?'✓':s}</div>
              <span className={`text-xs font-semibold ${step>=s?'text-foreground':'text-muted'}`}>{['Infos','Détails','Lieu'][i]}</span>
            </div>
            {i<2&&<div className={`flex-1 h-0.5 mx-3 mb-4 rounded-full transition-all ${step>s?'bg-emerald-500':'bg-border'}`}/>}
          </React.Fragment>
        ))}
      </div>
      <div className="bg-surface border border-border rounded-3xl p-7">
        {step===1&&(
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-foreground mb-5">Informations de base</h3>
            <div><label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">Titre *</label><input value={form.title} onChange={e=>set('title',e.target.value)} placeholder="Bel appartement lumineux…" className="w-full px-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary"/></div>
            <div><label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">Description *</label><textarea value={form.description} onChange={e=>set('description',e.target.value)} rows={4} placeholder="Décrivez votre bien…" className="w-full px-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary resize-none"/></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">Opération</label><select value={form.listing_type} onChange={e=>set('listing_type',e.target.value)} className="w-full px-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary"><option value="sale">Vente</option><option value="rent">Location</option></select></div>
              <div><label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">Type de bien</label><select value={form.property_type} onChange={e=>set('property_type',e.target.value)} className="w-full px-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary">{PROP_TYPES.map(t=><option key={t} value={t}>{t}</option>)}</select></div>
            </div>
            <button onClick={()=>form.title&&form.description?setStep(2):undefined} disabled={!form.title||!form.description} className="w-full bg-gradient-to-r from-primary to-gradient-end text-white py-3.5 rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-40">Suivant</button>
          </div>
        )}
        {step===2&&(
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-foreground mb-5">Détails du bien</h3>
            <div><label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">Prix (CFA) *</label><input type="number" value={form.price} onChange={e=>set('price',e.target.value)} placeholder="250000" className="w-full px-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary"/></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">Surface (m²) *</label><input type="number" value={form.surface} onChange={e=>set('surface',e.target.value)} placeholder="65" className="w-full px-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary"/></div>
              <div><label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">Pièces</label><select value={form.rooms} onChange={e=>set('rooms',e.target.value)} className="w-full px-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary">{[1,2,3,4,5,6,7,8,9,10].map(n=><option key={n} value={n}>{n}p</option>)}</select></div>
            </div>
            <div><label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">URL photo</label><input type="url" value={form.image_url} onChange={e=>set('image_url',e.target.value)} placeholder="https://…/photo.jpg" className="w-full px-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary"/></div>
            <div className="flex gap-3">
              <button onClick={()=>setStep(1)} className="flex-1 py-3.5 rounded-2xl font-bold text-sm border border-border text-foreground hover:border-primary transition-all">Retour</button>
              <button onClick={()=>form.price&&form.surface?setStep(3):undefined} disabled={!form.price||!form.surface} className="flex-1 bg-gradient-to-r from-primary to-gradient-end text-white py-3.5 rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-40">Suivant</button>
            </div>
          </div>
        )}
        {step===3&&(
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-foreground mb-5">Localisation</h3>
            <div><label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">Adresse *</label><input value={form.address} onChange={e=>set('address',e.target.value)} placeholder="Rue, quartier, ville…" className="w-full px-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary"/></div>
            <div className="grid grid-cols-2 gap-3">
              <div><label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">Latitude</label><input type="number" step="0.0001" value={form.lat} onChange={e=>set('lat',e.target.value)} className="w-full px-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary"/></div>
              <div><label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">Longitude</label><input type="number" step="0.0001" value={form.lng} onChange={e=>set('lng',e.target.value)} className="w-full px-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary"/></div>
            </div>
            <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 text-sm text-muted">
              <p className="font-bold text-foreground mb-0.5 text-xs uppercase tracking-wider">Récapitulatif</p>
              <p><strong>{form.title}</strong> · {form.property_type} · {form.listing_type==='sale'?'Vente':'Location'}</p>
              <p>{Number(form.price).toLocaleString()} CFA · {form.surface}m² · {form.rooms}p</p>
              <p className="text-xs mt-0.5">{form.address}</p>
            </div>
            {error&&<div className="bg-rose-500/10 border border-rose-500/20 text-rose-600 text-xs px-4 py-3 rounded-2xl">{error}</div>}
            <div className="flex gap-3">
              <button onClick={()=>setStep(2)} className="flex-1 py-3.5 rounded-2xl font-bold text-sm border border-border text-foreground hover:border-primary transition-all">Retour</button>
              <button onClick={handleSubmit} disabled={loading||!form.address} className="flex-1 bg-gradient-to-r from-primary to-gradient-end text-white py-3.5 rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-40">
                {loading?'Publication…':'Publier'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Favoris ──────────────────────────────────────────────────────────────────
function FavorisTab({ userId }: { userId: string }) {
  const [saved, setSaved] = useState<SavedProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    const { data } = await supabase.from('saved_properties').select('*').eq('user_id', userId);
    setSaved(data||[]); setLoading(false);
  }, [userId]);
  useEffect(() => { load(); }, [load]);
  const handleUnsave = async (id: string) => {
    await supabase.from('saved_properties').delete().eq('id', id);
    setSaved(s => s.filter(x=>x.id!==id));
  };
  if (loading) return <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"/></div>;
  if (!saved.length) return (
    <div className="text-center py-20 bg-surface border border-border rounded-2xl">
      <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mx-auto mb-4 text-rose-400">{Icon.heart}</div>
      <h3 className="font-bold text-foreground mb-2">Aucun favori</h3>
      <p className="text-muted text-sm">Cœurez un bien pour le retrouver ici.</p>
    </div>
  );
  return (
    <div>
      <p className="text-sm text-muted mb-4"><span className="font-bold text-foreground font-mono">{saved.length}</span> bien{saved.length>1?'s':''} sauvegardé{saved.length>1?'s':''}</p>
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
        {saved.map(item=>(
          <div key={item.id} className="bg-surface border border-border rounded-2xl overflow-hidden group hover:border-rose-500/30 hover:shadow-xl transition-all">
            <div className="h-44 relative overflow-hidden bg-muted/10">
              <img src={item.image_url||'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg'} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"/>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"/>
              <span className={`absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase text-white ${item.listing_type==='sale'?'bg-indigo-500':'bg-emerald-500'}`}>{item.listing_type==='sale'?'Vente':'Location'}</span>
              <button onClick={()=>handleUnsave(item.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-rose-500 text-white flex items-center justify-center hover:bg-rose-600 transition-colors">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"/></svg>
              </button>
            </div>
            <div className="p-4">
              <h4 className="font-bold text-foreground text-sm mb-1 line-clamp-1">{item.title}</h4>
              <p className="text-xs text-muted mb-3 flex items-center gap-1">{Icon.pin}{item.address}</p>
              <div className="flex items-center justify-between">
                <span className="text-base font-bold text-primary font-mono">{item.price.toLocaleString()} CFA</span>
                <span className="text-xs text-muted">{item.surface}m² · {item.rooms}p</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Messages Tab (Chat) ──────────────────────────────────────────────────────
interface Conversation {
  id: string; participant_one: string; participant_two: string;
  property_title: string; property_image_url: string; property_price: string;
  last_message: string; last_message_at: string;
  profile_one?: { full_name: string; avatar_url: string; role: string; is_online: boolean };
  profile_two?: { full_name: string; avatar_url: string; role: string; is_online: boolean };
}
interface Message {
  id: string; conversation_id: string; sender_id: string; content: string;
  is_read: boolean; created_at: string;
}

function MessagesTab({ userId }: { userId: string }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConv, setSelectedConv] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loadingConv, setLoadingConv] = useState(true);
  const [loadingMsgs, setLoadingMsgs] = useState(false);
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Load conversations
  const loadConversations = useCallback(async () => {
    const { data } = await supabase
      .from('conversations')
      .select(`
        *,
        profile_one:user_profiles!conversations_participant_one_fkey(full_name, avatar_url, role, is_online),
        profile_two:user_profiles!conversations_participant_two_fkey(full_name, avatar_url, role, is_online)
      `)
      .or(`participant_one.eq.${userId},participant_two.eq.${userId}`)
      .order('last_message_at', { ascending: false });

    setConversations(data || []);
    setLoadingConv(false);
  }, [userId]);

  useEffect(() => {
    loadConversations();

    // Subscribe to new messages / conversations realtime updates
    const channel = supabase
      .channel('realtime-chat-sync')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conversations' }, () => {
        loadConversations();
      })
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [loadConversations]);

  // Handle URL hash changes to auto-select conversation (e.g. from Detail Modal click redirect)
  useEffect(() => {
    const checkHash = () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#chat-') && conversations.length > 0) {
        const convId = hash.replace('#chat-', '');
        const target = conversations.find(c => c.id === convId);
        if (target) {
          setSelectedConv(target);
          // Clear hash to avoid looping
          window.history.replaceState(null, '', window.location.pathname + window.location.search);
        }
      }
    };
    checkHash();
    window.addEventListener('hashchange', checkHash);
    return () => window.removeEventListener('hashchange', checkHash);
  }, [conversations]);

  // Load messages for selected conversation
  useEffect(() => {
    if (!selectedConv) {
      setMessages([]);
      return;
    }
    setLoadingMsgs(true);
    supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', selectedConv.id)
      .order('created_at', { ascending: true })
      .then(({ data }) => {
        setMessages(data || []);
        setLoadingMsgs(false);
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      });

    // Mark as read
    supabase
      .from('messages')
      .update({ is_read: true })
      .eq('conversation_id', selectedConv.id)
      .neq('sender_id', userId);

    // Subscribe to realtime messages in this conversation
    const msgChannel = supabase
      .channel(`room-${selectedConv.id}`)
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages', filter: `conversation_id=eq.${selectedConv.id}` }, (payload) => {
        const newMsg = payload.new as Message;
        setMessages(prev => {
          if (prev.some(m => m.id === newMsg.id)) return prev;
          return [...prev, newMsg];
        });
        setTimeout(() => chatEndRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
      })
      .subscribe();

    return () => {
      supabase.removeChannel(msgChannel);
    };
  }, [selectedConv, userId]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim() || !selectedConv || sending) return;
    setSending(true);
    const textToSend = text.trim();
    setText('');

    // Insert message
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: selectedConv.id,
        sender_id: userId,
        content: textToSend,
        is_read: false
      })
      .select()
      .single();

    if (!error && data) {
      // Update conversations last message locally
      await supabase
        .from('conversations')
        .update({
          last_message: textToSend,
          last_message_at: new Date().toISOString()
        })
        .eq('id', selectedConv.id);
    }
    setSending(false);
  };

  const getContactInfo = (c: Conversation) => {
    const isOne = c.participant_one === userId;
    const profile = isOne ? c.profile_two : c.profile_one;
    return {
      name: profile?.full_name || 'Utilisateur Zehouse',
      avatar: profile?.avatar_url || '',
      role: profile?.role || 'Membre',
      isOnline: profile?.is_online || false
    };
  };

  if (loadingConv) return <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"/></div>;

  return (
    <div className="bg-surface border border-border rounded-3xl overflow-hidden grid grid-cols-1 md:grid-cols-3 h-[calc(100vh-200px)]">
      {/* Conversations List */}
      <div className={`border-r border-border flex flex-col h-full ${selectedConv ? 'hidden md:flex' : 'flex'}`}>
        <div className="p-4 border-b border-border">
          <h3 className="font-bold text-foreground">Discussions</h3>
        </div>
        <div className="flex-1 overflow-y-auto divide-y divide-border/40 scrollbar-hide">
          {conversations.length === 0 ? (
            <div className="p-8 text-center text-xs text-muted">Aucune discussion active. Contacter un propriétaire sur une fiche de bien pour démarrer un chat.</div>
          ) : (
            conversations.map(c => {
              const contact = getContactInfo(c);
              const isSelected = selectedConv?.id === c.id;
              return (
                <div key={c.id} onClick={() => setSelectedConv(c)}
                  className={`p-4 cursor-pointer hover:bg-primary/5 transition-all flex items-center gap-3 ${isSelected ? 'bg-primary/10 border-l-4 border-primary' : ''}`}>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-gradient-end flex items-center justify-center text-white font-bold relative flex-shrink-0">
                    {contact.avatar ? <img src={contact.avatar} alt="" className="w-full h-full object-cover rounded-full" /> : contact.name[0]?.toUpperCase()}
                    {contact.isOnline && <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border-2 border-surface rounded-full" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-foreground text-xs truncate">{contact.name}</h4>
                      <span className="text-[10px] text-muted font-mono">{c.last_message_at ? new Date(c.last_message_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</span>
                    </div>
                    <p className="text-[10px] text-primary font-bold mt-0.5 truncate">{c.property_title}</p>
                    <p className="text-xs text-muted truncate mt-1">{c.last_message || 'Pas encore de message'}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Chat Messages Frame */}
      <div className={`col-span-2 flex flex-col h-full bg-bg/25 ${!selectedConv ? 'hidden md:flex items-center justify-center text-muted text-sm' : 'flex'}`}>
        {!selectedConv ? (
          <div className="text-center p-8">
            <div className="w-16 h-16 rounded-3xl bg-primary/5 flex items-center justify-center mx-auto mb-4 text-primary text-2xl">💬</div>
            <p className="font-bold text-foreground">Sélectionnez une discussion</p>
            <p className="text-xs text-muted mt-1">Communiquez en temps réel avec les autres membres.</p>
          </div>
        ) : (
          <>
            {/* Header */}
            <div className="p-4 border-b border-border bg-surface flex items-center gap-3">
              <button onClick={() => setSelectedConv(null)} className="md:hidden p-1 text-muted hover:text-foreground">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-gradient-end flex items-center justify-center text-white font-bold text-sm">
                {getContactInfo(selectedConv).name[0]?.toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-foreground text-xs">{getContactInfo(selectedConv).name}</h4>
                <p className="text-[10px] text-primary font-medium">{selectedConv.property_title} · {selectedConv.property_price}</p>
              </div>
            </div>

            {/* Messages box */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3.5 scrollbar-hide">
              {loadingMsgs ? (
                <div className="flex justify-center py-8"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"/></div>
              ) : (
                messages.map(m => {
                  const isMe = m.sender_id === userId;
                  return (
                    <div key={m.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs md:max-w-md rounded-2xl px-4 py-2.5 text-xs shadow-sm ${isMe ? 'bg-primary text-white rounded-tr-none' : 'bg-surface border border-border text-foreground rounded-tl-none'}`}>
                        <p className="leading-relaxed">{m.content}</p>
                        <p className={`text-[8px] text-right mt-1 font-mono ${isMe ? 'text-white/60' : 'text-muted'}`}>{new Date(m.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Message input */}
            <form onSubmit={handleSend} className="p-3 bg-surface border-t border-border flex gap-2">
              <input type="text" value={text} onChange={e => setText(e.target.value)} placeholder="Écrire un message…"
                className="flex-1 px-4 py-2.5 bg-bg border border-border rounded-xl text-xs outline-none focus:border-primary focus:bg-surface transition-all" />
              <button type="submit" disabled={!text.trim() || sending}
                className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-gradient-end text-white flex items-center justify-center shadow-md shadow-primary/20 hover:opacity-90 transition-all disabled:opacity-40">
                {Icon.send}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

// ─── Profile Tab ──────────────────────────────────────────────────────────────
function ProfilTab({ userId, userEmail, onLogout }: { userId: string; userEmail: string; onLogout: () => void }) {
  const [profile, setProfile] = useState<UserProfile|null>(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState('');
  const [seeding, setSeeding] = useState(false);
  const [seedResult, setSeedResult] = useState('');

  const handleSeedDemo = async () => {
    setSeeding(true);
    setSeedResult('');
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) { setSeedResult('Erreur : non connecté'); setSeeding(false); return; }
      const res = await fetch('/api/zehouse/seed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, authToken: session.access_token }),
      });
      const json = await res.json();
      if (json.success) {
        setSeedResult(`${json.count} annonces de démo injectées ! Rechargez la carte.`);
        setToast(`${json.count} annonces de démo injectées !`);
        setTimeout(() => setToast(''), 5000);
      } else {
        setSeedResult(`Erreur : ${json.error}`);
      }
    } catch (e: any) {
      setSeedResult(`Erreur réseau : ${e.message}`);
    }
    setSeeding(false);
  };

  useEffect(() => {
    supabase.from('user_profiles').select('*').eq('id', userId).single().then(({data})=>{
      setProfile(data); setName(data?.full_name||''); setPhone(data?.phone||''); setLoading(false);
    });
  }, [userId]);

  const handleSave = async () => {
    setSaving(true);
    await supabase.from('user_profiles').update({ full_name: name, phone }).eq('id', userId);
    setProfile(p=>p?{...p, full_name: name, phone}:p);
    setEditing(false); setSaving(false);
    setToast('Profil mis à jour ✓'); setTimeout(()=>setToast(''),3000);
  };

  const handlePwdChange = async (e: React.FormEvent) => {
    e.preventDefault();
    const {error} = await supabase.auth.updateUser({ password: newPwd });
    setPwdMsg(error?error.message:'Mot de passe mis à jour ✓');
    setNewPwd(''); setTimeout(()=>setPwdMsg(''),4000);
  };

  const ROLE_LABELS: Record<string,string> = { particulier:'Particulier', professionnel:'Professionnel', agent:'Agent', proprietaire:'Propriétaire', admin:'Administrateur' };
  const ROLE_COLORS: Record<string,string> = { particulier:'bg-blue-500/10 text-blue-600 border-blue-500/20', professionnel:'bg-indigo-500/10 text-indigo-600 border-indigo-500/20', agent:'bg-violet-500/10 text-violet-600 border-violet-500/20', proprietaire:'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', admin:'bg-rose-500/10 text-rose-600 border-rose-500/20' };

  if (loading) return <div className="flex justify-center py-16"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"/></div>;

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {toast&&<div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-sm px-5 py-3 rounded-2xl text-center font-semibold">{toast}</div>}
      <div className="bg-surface border border-border rounded-3xl p-7 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-gradient-end flex items-center justify-center text-white text-3xl font-bold mb-4 shadow-xl shadow-primary/25">
          {(profile?.full_name||userEmail)[0]?.toUpperCase()}
        </div>
        <h2 className="text-xl font-bold text-foreground mb-1">{profile?.full_name||'Sans nom'}</h2>
        <p className="text-sm text-muted mb-3">{userEmail}</p>
        {profile?.profession&&<p className="text-xs text-muted mb-2 italic">{profile.profession}</p>}
        <div className="flex items-center justify-center gap-2">
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${ROLE_COLORS[profile?.role||'particulier']}`}>{ROLE_LABELS[profile?.role||'particulier']}</span>
          {profile?.is_verified&&<span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 border border-emerald-500/20 flex items-center gap-1">{Icon.shield} Vérifié</span>}
        </div>
      </div>
      <div className="bg-surface border border-border rounded-3xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold text-foreground">Modifier le profil</h3>
          <button onClick={()=>setEditing(!editing)} className="text-xs font-bold text-primary flex items-center gap-1">{Icon.edit}{editing?'Annuler':'Modifier'}</button>
        </div>
        <div className="space-y-4">
          {[{l:'Nom complet',v:name,s:setName},{l:'Téléphone',v:phone,s:setPhone}].map(f=>(
            <div key={f.l}><label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">{f.l}</label>
              <input value={f.v} onChange={e=>f.s(e.target.value)} disabled={!editing}
                className={`w-full px-4 py-3 border rounded-2xl text-sm focus:outline-none transition-colors ${editing?'bg-bg border-border focus:border-primary':'bg-surface border-transparent text-muted'}`}/></div>
          ))}
          <div><label className="text-xs font-bold text-muted uppercase tracking-wider block mb-1.5">Email</label><input value={userEmail} disabled className="w-full px-4 py-3 border border-transparent bg-surface rounded-2xl text-sm text-muted"/></div>
          {editing&&<button onClick={handleSave} disabled={saving} className="w-full bg-gradient-to-r from-primary to-gradient-end text-white py-3 rounded-2xl font-bold text-sm hover:opacity-90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50">{saving?'Sauvegarde…':'Sauvegarder'}</button>}
        </div>
      </div>
      <div className="bg-surface border border-border rounded-3xl p-6">
        <h3 className="font-bold text-foreground mb-4">Changer le mot de passe</h3>
        <form onSubmit={handlePwdChange} className="space-y-3">
          <input type="password" value={newPwd} onChange={e=>setNewPwd(e.target.value)} placeholder="Nouveau mot de passe" className="w-full px-4 py-3 bg-bg border border-border rounded-2xl text-sm focus:outline-none focus:border-primary"/>
          {pwdMsg&&<p className={`text-xs px-3 py-2 rounded-xl ${pwdMsg.includes('✓')?'bg-emerald-500/10 text-emerald-600':'bg-rose-500/10 text-rose-600'}`}>{pwdMsg}</p>}
          <button type="submit" disabled={!newPwd} className="w-full py-2.5 rounded-2xl border border-border text-sm font-bold text-foreground hover:border-primary hover:text-primary transition-all disabled:opacity-40">Mettre à jour le mot de passe</button>
        </form>
      </div>
      <div className="bg-surface border border-border rounded-3xl p-6">
        <h3 className="font-bold text-foreground mb-2">Zone Développeur / Démo</h3>
        <p className="text-xs text-muted mb-4">Injecter des annonces de démonstration pour tester l'interface. (Nécessite d'être connecté)</p>
        <button onClick={handleSeedDemo} disabled={seeding} className="w-full py-2.5 rounded-2xl bg-indigo-500/10 text-indigo-600 border border-indigo-500/20 font-bold text-sm hover:bg-indigo-500/20 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
          {seeding ? <div className="w-4 h-4 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin" /> : null}
          {seeding ? 'Injection en cours...' : 'Injecter 20 annonces de démo'}
        </button>
        {seedResult && <p className={`mt-3 text-xs px-3 py-2 rounded-xl ${seedResult.includes('Erreur') ? 'bg-rose-500/10 text-rose-600' : 'bg-emerald-500/10 text-emerald-600'}`}>{seedResult}</p>}
      </div>
      <div className="bg-surface border border-rose-500/20 rounded-3xl p-6">
        <button onClick={onLogout} className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-rose-500/10 text-rose-600 border border-rose-500/20 font-bold text-sm hover:bg-rose-500/20 transition-colors">
          {Icon.logout} Se déconnecter
        </button>
      </div>
    </div>
  );
}

// ─── App Shell ────────────────────────────────────────────────────────────────
function AppShell({ session }: { session: any }) {
  const [tab, setTab] = useState<AppTab>('map');
  const [mapFocusProperty, setMapFocusProperty] = useState<Listing | null>(null);
  const [showStickyAd, setShowStickyAd] = useState(true);
  const userId = session.user.id;
  const userEmail = session.user.email || '';
  const handleLogout = async () => { await supabase.auth.signOut(); window.location.reload(); };

  useEffect(() => {
    const handleHashRedirect = () => {
      if (window.location.hash.startsWith('#chat-')) {
        setTab('messages');
      }
    };
    handleHashRedirect();
    window.addEventListener('hashchange', handleHashRedirect);
    return () => window.removeEventListener('hashchange', handleHashRedirect);
  }, []);

  const TABS: { id: AppTab; label: string; icon: React.ReactNode }[] = [
    { id: 'map', label: 'Carte', icon: Icon.map },
    { id: 'explorer', label: 'Explorer', icon: Icon.home },
    { id: 'mes-annonces', label: 'Mes annonces', icon: Icon.list },
    { id: 'publier', label: 'Publier', icon: Icon.plus },
    { id: 'messages', label: 'Messages', icon: Icon.chat },
    { id: 'favoris', label: 'Favoris', icon: Icon.heart },
    { id: 'profil', label: 'Profil', icon: Icon.user },
  ];

  const isMapTab = tab === 'map';

  return (
    <div className="min-h-screen bg-bg flex">
      {/* Desktop sidebar */}
      <aside className="hidden md:flex fixed left-0 top-0 h-full w-64 bg-surface border-r border-border flex-col z-30">
        <div className="px-6 py-5 border-b border-border">
          <Link href="/solutions/zehouse" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-gradient-end flex items-center justify-center shadow-md shadow-primary/20 group-hover:scale-105 transition-transform">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            </div>
            <div><p className="font-bold text-sm text-foreground leading-none">ZEHOUSE</p><p className="text-[10px] text-muted font-mono tracking-wider">Portail utilisateur</p></div>
          </Link>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {TABS.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left ${tab===t.id?'bg-primary/10 text-primary border border-primary/20':'text-muted hover:bg-border/60 hover:text-foreground'}`}>
              <span className={tab===t.id?'text-primary':'text-muted'}>{t.icon}</span>
              {t.label}
              {t.id==='publier'&&<span className="ml-auto w-5 h-5 bg-gradient-to-br from-primary to-gradient-end text-white text-[10px] font-bold rounded-full flex items-center justify-center">+</span>}
            </button>
          ))}
        </nav>
        {/* ── Type 2 : Classic Web Sidebar Banner (300x250 equivalent size 210x180) ── */}
        <div className="mx-4 my-3 p-3 bg-bg border border-dashed border-border rounded-2xl flex flex-col justify-between min-h-[140px] relative overflow-hidden flex-shrink-0">
          <span className="absolute top-1 right-1 bg-foreground/10 text-muted text-[8px] font-bold px-1 py-0.5 rounded uppercase">Pub</span>
          <div>
            <span className="text-[9px] font-bold text-primary uppercase tracking-wider block">Partenaire Premium</span>
            <h5 className="font-bold text-foreground text-xs mt-1 leading-tight">Meubles & Déco Zehouse</h5>
            <p className="text-[10px] text-muted mt-0.5 leading-snug">Aménagez avec goût. -10% de réduction.</p>
          </div>
          <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="w-full text-center py-1.5 bg-surface text-foreground border border-border text-[10px] font-bold rounded-lg hover:border-primary hover:text-primary transition-all">
            Découvrir
          </a>
        </div>
        <div className="px-4 py-4 border-t border-border">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-gradient-end flex items-center justify-center text-xs font-bold text-white">{userEmail[0]?.toUpperCase()}</div>
            <div className="min-w-0"><p className="text-xs font-bold text-foreground truncate">{userEmail}</p><p className="text-[10px] text-muted">Connecté</p></div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-rose-500/10 text-rose-500 border border-rose-500/20 text-xs font-bold hover:bg-rose-500/20 transition-colors">{Icon.logout} Déconnexion</button>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 md:ml-64 flex flex-col min-h-screen">
        {/* Mobile top bar */}
        <header className="md:hidden sticky top-0 z-20 bg-surface/80 backdrop-blur border-b border-border px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-gradient-end flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/></svg>
            </div>
            <span className="font-bold text-foreground text-sm">ZEHOUSE</span>
          </div>
          <span className="text-xs text-muted">{TABS.find(t=>t.id===tab)?.label}</span>
        </header>

        {/* Content */}
        {isMapTab ? (
          <div className="relative flex-1 overflow-hidden">
            <MapTab userId={userId} focusProperty={mapFocusProperty} onFocusConsumed={() => setMapFocusProperty(null)} />
          </div>
        ) : (
          <main className="flex-1 px-6 md:px-8 py-8 pb-24 md:pb-8">
            <div className="max-w-6xl mx-auto">
              <div className="mb-7">
                <h1 className="text-2xl font-bold text-foreground">{TABS.find(t=>t.id===tab)?.label}</h1>
                <p className="text-sm text-muted mt-0.5">
                  {tab==='explorer'&&'Découvrez les biens disponibles'}
                  {tab==='mes-annonces'&&'Gérez vos annonces'}
                  {tab==='publier'&&'Publiez un bien en 3 étapes'}
                  {tab==='favoris'&&'Vos biens sauvegardés'}
                  {tab==='profil'&&'Vos informations personnelles'}
                </p>
              </div>
              {tab==='explorer'&&<ExplorerTab userId={userId} onCenterOnMap={(item) => { setMapFocusProperty(item); setTab('map'); }}/>}
              {tab==='mes-annonces'&&<MesAnnoncesTab userId={userId}/>}
              {tab==='publier'&&<PublierTab userId={userId} onPublished={()=>setTab('mes-annonces')}/>}
              {tab==='messages'&&<MessagesTab userId={userId}/>}
              {tab==='favoris'&&<FavorisTab userId={userId}/>}
              {tab==='profil'&&<ProfilTab userId={userId} userEmail={userEmail} onLogout={handleLogout}/>}
            </div>
          </main>
        )}

        {/* Mobile bottom nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur border-t border-border px-2 py-2 z-20">
          <div className="flex items-center justify-around">
            {TABS.map(t=>(
              <button key={t.id} onClick={()=>setTab(t.id)}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-all ${tab===t.id?'text-primary':'text-muted'}`}>
                {t.id==='publier'
                  ? <div className={`w-8 h-8 rounded-xl flex items-center justify-center shadow-md transition-all ${tab===t.id?'bg-primary shadow-primary/30':'bg-foreground/80'}`}><span className="text-white">{t.icon}</span></div>
                  : <span>{t.icon}</span>}
                <span className="text-[9px] font-semibold">{t.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* ── Type 4 : Sticky Bottom Anchor Ad (Bandeau publicitaire fixe) ── */}
        {showStickyAd && (
          <div className="fixed bottom-16 md:bottom-4 left-4 right-4 md:left-72 z-40 bg-surface/95 backdrop-blur-xl border border-border shadow-2xl rounded-2xl p-3 flex items-center justify-between gap-4 animate-slideUp">
            <div className="flex items-center gap-3">
              <span className="bg-primary/10 text-primary text-[9px] font-extrabold px-2 py-0.5 rounded uppercase flex-shrink-0">Sponsor</span>
              <p className="text-xs text-foreground font-medium line-clamp-1">
                Besoin d&apos;aide pour votre déménagement ? <strong className="text-primary">Zehouse Demeco</strong> s&apos;occupe de tout avec -15% de réduction immédiate !
              </p>
            </div>
            <div className="flex items-center gap-2 flex-shrink-0">
              <a href="https://google.com" target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 bg-primary text-white text-[10px] font-bold rounded-lg uppercase tracking-wider hover:opacity-90 transition-all">
                En profiter
              </a>
              <button onClick={() => setShowStickyAd(false)} className="w-7 h-7 rounded-lg bg-bg border border-border hover:border-primary text-muted hover:text-foreground flex items-center justify-center transition-all text-xs font-bold">
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── Global CSS for slideUp animation ─────────────────────────────────────────
const globalStyles = `
@keyframes slideUp { from { transform: translateY(100%); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
@keyframes scaleIn { from { transform: scale(0.7); opacity: 0; } to { transform: scale(1); opacity: 1; } }
.animate-slideUp { animation: slideUp 0.35s cubic-bezier(0.34,1.56,0.64,1) forwards; }
.scrollbar-hide::-webkit-scrollbar { display: none; }
.scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
`;

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ZehouseApp() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setLoading(false); });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => subscription.unsubscribe();
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: globalStyles }} />
      {loading
        ? <div className="min-h-screen bg-bg flex items-center justify-center"><div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"/></div>
        : !session
          ? <AuthScreen onAuth={() => supabase.auth.getSession().then(({data}) => setSession(data.session))} />
          : <AppShell session={session} />
      }
    </>
  );
}
