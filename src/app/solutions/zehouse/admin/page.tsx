'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import {
  ResponsiveContainer, AreaChart, Area, BarChart, Bar,
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend,
} from 'recharts';

// ─── Types ────────────────────────────────────────────────────────────────────
type Tab = 'dashboard' | 'users' | 'listings' | 'reports' | 'subscriptions' | 'logs' | 'settings';

interface AdminLog {
  id: string;
  action: string;
  target: string;
  admin: string;
  time: string;
  type: 'success' | 'warning' | 'danger';
}

// ─── Mock data ──────────────────────────────────────────────────────────────
const areaData = [
  { name: 'Jan', users: 32, listings: 12, revenue: 4200 },
  { name: 'Fév', users: 58, listings: 21, revenue: 6800 },
  { name: 'Mar', users: 74, listings: 33, revenue: 9500 },
  { name: 'Avr', users: 103, listings: 47, revenue: 13200 },
  { name: 'Mai', users: 142, listings: 61, revenue: 18700 },
  { name: 'Jun', users: 197, listings: 88, revenue: 26400 },
  { name: 'Jul', users: 234, listings: 104, revenue: 31000 },
];

const barData = [
  { name: 'Studio', count: 38 },
  { name: 'Appart.', count: 72 },
  { name: 'Maison', count: 45 },
  { name: 'Villa', count: 19 },
  { name: 'Bureau', count: 12 },
];

const pieData = [
  { name: 'Particuliers', value: 58 },
  { name: 'Professionnels', value: 28 },
  { name: 'Agences', value: 14 },
];
const PIE_COLORS = ['#6366f1', '#8b5cf6', '#06b6d4'];

const mockLogs: AdminLog[] = [
  { id: '1', action: 'Annonce archivée', target: 'Villa moderne Yaoundé', admin: 'admin@wftech.com', time: 'il y a 2 min', type: 'warning' },
  { id: '2', action: 'Utilisateur vérifié', target: 'Jean-Marc Essama', admin: 'admin@wftech.com', time: 'il y a 8 min', type: 'success' },
  { id: '3', action: 'Annonce supprimée', target: 'Studio centre-ville', admin: 'admin@wftech.com', time: 'il y a 14 min', type: 'danger' },
  { id: '4', action: 'Rapport traité', target: 'Rapport #2847', admin: 'admin@wftech.com', time: 'il y a 27 min', type: 'success' },
  { id: '5', action: 'Utilisateur banni', target: 'user_4f8b2', admin: 'admin@wftech.com', time: 'il y a 1h', type: 'danger' },
  { id: '6', action: 'Plan Pro activé', target: 'Foncia Agence CM', admin: 'système', time: 'il y a 2h', type: 'success' },
];

const mockSubs = [
  { id: '1', user: 'Foncia Agence Yaoundé', plan: 'Agence Pro', status: 'active', renewal: '2026-08-15', amount: '45 000 CFA' },
  { id: '2', user: 'Marie Nguimbus', plan: 'Professionnel', status: 'active', renewal: '2026-08-22', amount: '15 000 CFA' },
  { id: '3', user: 'IMMOTECH SARL', plan: 'Agence Pro', status: 'expiring', renewal: '2026-07-28', amount: '45 000 CFA' },
  { id: '4', user: 'Thomas Biya', plan: 'Particulier', status: 'expired', renewal: '2026-07-10', amount: '5 000 CFA' },
  { id: '5', user: 'Century21 Douala', plan: 'Agence Pro', status: 'active', renewal: '2026-09-01', amount: '45 000 CFA' },
];

// ─── Stat Card Component ───────────────────────────────────────────────────
function StatCard({ label, value, sub, color, icon }: { label: string; value: string | number; sub?: string; color: string; icon: React.ReactNode }) {
  return (
    <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 flex gap-4 items-start hover:border-indigo-500/30 transition-colors">
      <div className={`p-3 rounded-xl ${color} flex-shrink-0`}>{icon}</div>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-500 mb-1">{label}</p>
        <p className="text-2xl font-bold text-white font-mono">{value}</p>
        {sub && <p className="text-xs text-slate-500 mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────
export default function ZehouseAdmin() {
  const router = useRouter();
  const [authChecked, setAuthChecked] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [users, setUsers] = useState<any[]>([]);
  const [listings, setListings] = useState<any[]>([]);
  const [reports, setReports] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalListings: 0, activeListings: 0, verifiedPros: 0, activeReports: 0, totalUsers: 0, totalRevenue: '31 000' });
  const [userSearch, setUserSearch] = useState('');
  const [listingSearch, setListingSearch] = useState('');
  const [listingStatusFilter, setListingStatusFilter] = useState<'all' | 'active' | 'archived'>('all');
  const [maintenanceMode, setMaintenanceMode] = useState(false);
  const [notifEmail, setNotifEmail] = useState(true);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  // Promocodes states
  const [promoCodesList, setPromoCodesList] = useState<any[]>([]);
  const [newPromoCode, setNewPromoCode] = useState('');
  const [promoRole, setPromoRole] = useState('hotel'); // Default to hotel tier
  const [promoDurationDays, setPromoDurationDays] = useState('30');
  const [promoMaxUses, setPromoMaxUses] = useState('50');
  const [loadingPromo, setLoadingPromo] = useState(false);

  const showToast = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 3000);
  };

  // ── Auth guard (email whitelist + role DB check) ──────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.replace('/solutions/zehouse/admin/login');
        return;
      }
      const email = data.session.user.email || '';
      const ADMIN_EMAILS = ['webfasttechnologysarl@gmail.com', 'admin@zehouse.com'];
      if (!ADMIN_EMAILS.includes(email)) {
        const { data: profile } = await supabase
          .from('user_profiles').select('role').eq('id', data.session.user.id).single();
        if (!profile || profile.role !== 'admin') {
          await supabase.auth.signOut();
          router.replace('/solutions/zehouse/admin/login');
          return;
        }
      }
      setUserEmail(email);
      setAuthChecked(true);
    });
  }, [router]);

  // ── Data load ───────────────────────────────────────────────────────────
  const loadData = useCallback(async () => {
    try {
      const [{ data: listData }, { data: uData }, { data: repData }, { data: promoData }] = await Promise.all([
        supabase.from('user_listings').select('*').order('created_at', { ascending: false }),
        supabase.from('user_profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('listing_reports').select('*').order('created_at', { ascending: false }),
        supabase.from('promocodes').select('*').order('created_at', { ascending: false }),
      ]);
      const lists = listData || [];
      const profiles = uData || [];
      const reps = repData || [];
      setListings(lists);
      setUsers(profiles);
      setReports(reps);
      setPromoCodesList(promoData || []);
      setStats({
        totalListings: lists.length,
        activeListings: lists.filter((l: any) => l.is_active).length,
        verifiedPros: profiles.filter((u: any) => u.is_verified).length,
        activeReports: reps.filter((r: any) => r.status === 'pending').length,
        totalUsers: profiles.length,
        totalRevenue: '31 000',
      });
    } catch (err) {
      console.error('Admin data load error:', err);
    }
  }, []);

  useEffect(() => {
    if (authChecked) loadData();
  }, [authChecked, loadData]);

  // ── Actions ─────────────────────────────────────────────────────────────
  const handleVerify = async (userId: string, cur: boolean) => {
    const { error } = await supabase.from('user_profiles').update({ is_verified: !cur }).eq('id', userId);
    if (!error) {
      setUsers(u => u.map(x => x.id === userId ? { ...x, is_verified: !cur } : x));
      showToast(cur ? 'Vérification révoquée' : 'Utilisateur vérifié ✓');
    }
  };
  const handleBanUser = async (userId: string) => {
    const { error } = await supabase.from('user_profiles').update({ is_banned: true }).eq('id', userId);
    if (!error) {
      setUsers(u => u.filter(x => x.id !== userId));
      showToast('Utilisateur banni et retiré de la liste', 'err');
    }
  };
  const handleRoleChange = async (userId: string, newRole: string) => {
    const { error } = await supabase.from('user_profiles').update({ role: newRole }).eq('id', userId);
    if (!error) {
      setUsers(u => u.map(x => x.id === userId ? { ...x, role: newRole } : x));
      showToast(`Rôle mis à jour : ${newRole}`);
    }
  };
  const handleToggleListing = async (id: string, cur: boolean) => {
    const { error } = await supabase.from('user_listings').update({ is_active: !cur }).eq('id', id);
    if (!error) {
      setListings(l => l.map(x => x.id === id ? { ...x, is_active: !cur } : x));
      showToast(cur ? 'Annonce archivée' : 'Annonce activée ✓');
    }
  };
  const handleDeleteListing = async (id: string) => {
    const { error } = await supabase.from('user_listings').delete().eq('id', id);
    if (!error) {
      setListings(l => l.filter(x => x.id !== id));
      showToast('Annonce supprimée définitivement', 'err');
    }
  };
  const handleResolveReport = async (reportId: string, listingId: string, action: 'archive' | 'delete' | 'ignore') => {
    if (action === 'archive') await supabase.from('user_listings').update({ is_active: false }).eq('id', listingId);
    if (action === 'delete') await supabase.from('user_listings').delete().eq('id', listingId);
    await supabase.from('listing_reports').update({ status: 'resolved' }).eq('id', reportId);
    setReports(r => r.filter(x => x.id !== reportId));
    showToast(action === 'ignore' ? 'Rapport ignoré' : action === 'archive' ? 'Annonce archivée via rapport' : 'Annonce supprimée via rapport', action === 'delete' ? 'err' : 'ok');
  };

  const handleCreatePromoCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPromoCode.trim() || loadingPromo) return;
    setLoadingPromo(true);
    
    // Calculate expiration date
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + Number(promoDurationDays));

    const { data, error } = await supabase
      .from('promocodes')
      .insert({
        code: newPromoCode.trim().toUpperCase(),
        role_to_grant: promoRole,
        expires_at: expiresAt.toISOString(),
        max_uses: Number(promoMaxUses),
        uses_count: 0
      })
      .select()
      .single();

    if (!error && data) {
      setPromoCodesList(prev => [data, ...prev]);
      setNewPromoCode('');
      showToast('Code promo créé avec succès ✓');
    } else {
      showToast(error?.message || 'Erreur lors de la création du code', 'err');
    }
    setLoadingPromo(false);
  };

  const handleDeletePromoCode = async (id: string) => {
    const { error } = await supabase.from('promocodes').delete().eq('id', id);
    if (!error) {
      setPromoCodesList(prev => prev.filter(x => x.id !== id));
      showToast('Code promo supprimé ✓', 'err');
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.replace('/solutions/zehouse/admin/login');
  };

  // Filtered data
  const filteredUsers = users.filter(u =>
    (u.full_name || '').toLowerCase().includes(userSearch.toLowerCase()) ||
    (u.email || '').toLowerCase().includes(userSearch.toLowerCase())
  );
  const filteredListings = listings.filter(l => {
    const matchesSearch = (l.title || '').toLowerCase().includes(listingSearch.toLowerCase()) ||
      (l.address || '').toLowerCase().includes(listingSearch.toLowerCase());
    const matchesStatus = listingStatusFilter === 'all' ? true :
      listingStatusFilter === 'active' ? l.is_active : !l.is_active;
    return matchesSearch && matchesStatus;
  });

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-[#050810] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  const TAB_ICONS: Record<Tab, React.ReactNode> = {
    dashboard: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>,
    users: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
    listings: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>,
    reports: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>,
    subscriptions: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>,
    logs: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>,
    settings: <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
  };
  const TABS: { id: Tab; label: string }[] = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'users', label: 'Membres & Rôles' },
    { id: 'listings', label: 'Modération Biens' },
    { id: 'reports', label: 'Signalements' },
    { id: 'subscriptions', label: 'Abonnements' },
    { id: 'logs', label: "Journal d'activité" },
    { id: 'settings', label: 'Paramètres' },
  ];

  return (
    <div className="min-h-screen bg-[#050810] text-white">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-5 right-5 z-50 px-5 py-3 rounded-2xl text-sm font-semibold shadow-2xl flex items-center gap-2 transition-all
          ${toast.type === 'ok' ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-300' : 'bg-rose-500/20 border border-rose-500/40 text-rose-300'}`}>
          {toast.type === 'ok' ? '✓' : '⚠'} {toast.msg}
        </div>
      )}

      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-60 bg-[#0a0d14] border-r border-white/[0.06] flex flex-col z-40">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
            </div>
            <div>
              <p className="font-bold text-sm text-white leading-none">ZEHOUSE</p>
              <p className="text-[10px] text-indigo-400 font-mono tracking-wider">ADMIN CONSOLE</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {TABS.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left
                ${activeTab === tab.id
                  ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                  : 'text-slate-400 hover:bg-white/[0.04] hover:text-white'}`}
            >
              <span className={activeTab === tab.id ? 'text-indigo-400' : 'text-slate-500'}>
                {TAB_ICONS[tab.id]}
              </span>
              {tab.label}
              {tab.id === 'reports' && stats.activeReports > 0 && (
                <span className="ml-auto bg-rose-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {stats.activeReports}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* User info + Logout */}
        <div className="px-4 py-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-xs font-bold">
              {userEmail[0]?.toUpperCase() || 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-white truncate">{userEmail}</p>
              <p className="text-[10px] text-slate-500">Super Admin</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold hover:bg-rose-500/20 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Déconnexion
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="ml-60 min-h-screen">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#050810]/80 backdrop-blur border-b border-white/[0.06] px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-bold text-white">
              {TABS.find(t => t.id === activeTab)?.icon}{' '}
              {TABS.find(t => t.id === activeTab)?.label}
            </h1>
            <p className="text-xs text-slate-500">Console d&apos;administration Zehouse · Temps réel Supabase</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
              <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-[11px] text-emerald-400 font-semibold">Supabase Online</span>
            </div>
            <Link
              href="/solutions/zehouse"
              className="text-xs text-slate-400 hover:text-white transition-colors px-3 py-1.5 border border-white/[0.06] rounded-xl hover:border-white/20"
            >
              ← Vitrine
            </Link>
          </div>
        </header>

        <div className="px-8 py-8">

          {/* ── DASHBOARD ──────────────────────────────────────────────── */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              {/* KPI Cards */}
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                <StatCard label="Total Annonces" value={stats.totalListings} color="bg-indigo-500/10" icon={<svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>} />
                <StatCard label="Annonces Actives" value={stats.activeListings} color="bg-emerald-500/10" icon={<svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
                <StatCard label="Membres" value={stats.totalUsers} color="bg-blue-500/10" icon={<svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
                <StatCard label="Pros Vérifiés" value={stats.verifiedPros} color="bg-violet-500/10" icon={<svg className="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" /></svg>} />
                <StatCard label="Signalements" value={stats.activeReports} sub="En attente" color="bg-rose-500/10" icon={<svg className="w-5 h-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>} />
                <StatCard label="Revenus (CFA)" value={`${stats.totalRevenue}k`} sub="Ce mois" color="bg-cyan-500/10" icon={<svg className="w-5 h-5 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>} />
              </div>

              {/* Charts row */}
              <div className="grid lg:grid-cols-12 gap-6">
                <div className="lg:col-span-7 bg-[#0d1117] border border-white/[0.06] rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white mb-1">Croissance du réseau</h3>
                  <p className="text-xs text-slate-500 mb-6">Membres, annonces et revenus mensuels</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={areaData}>
                        <defs>
                          <linearGradient id="gUsers" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                          </linearGradient>
                          <linearGradient id="gListings" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#06b6d4" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="name" stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} />
                        <YAxis stroke="#334155" tick={{ fill: '#64748b', fontSize: 11 }} tickLine={false} />
                        <Tooltip contentStyle={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#fff' }} />
                        <Legend wrapperStyle={{ fontSize: '11px', color: '#94a3b8' }} />
                        <Area type="monotone" dataKey="users" name="Membres" stroke="#6366f1" strokeWidth={2} fillOpacity={1} fill="url(#gUsers)" />
                        <Area type="monotone" dataKey="listings" name="Annonces" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#gListings)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="lg:col-span-2 bg-[#0d1117] border border-white/[0.06] rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white mb-1">Types de biens</h3>
                  <p className="text-xs text-slate-500 mb-6">Distribution</p>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={barData} layout="vertical">
                        <XAxis type="number" stroke="#334155" tick={{ fill: '#64748b', fontSize: 10 }} tickLine={false} />
                        <YAxis dataKey="name" type="category" stroke="#334155" tick={{ fill: '#94a3b8', fontSize: 10 }} tickLine={false} width={50} />
                        <Tooltip contentStyle={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#fff' }} />
                        <Bar dataKey="count" fill="#6366f1" radius={[0, 6, 6, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="lg:col-span-3 bg-[#0d1117] border border-white/[0.06] rounded-2xl p-6">
                  <h3 className="text-sm font-bold text-white mb-1">Répartition membres</h3>
                  <p className="text-xs text-slate-500 mb-4">Par type de compte</p>
                  <div className="h-48">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={55} outerRadius={75} paddingAngle={4} dataKey="value">
                          {pieData.map((_, i) => <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />)}
                        </Pie>
                        <Tooltip contentStyle={{ background: '#0d1117', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', color: '#fff' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-2 mt-2">
                    {pieData.map((d, i) => (
                      <div key={i} className="flex items-center justify-between text-xs">
                        <span className="flex items-center gap-2 text-slate-400">
                          <span className="w-2 h-2 rounded-full" style={{ background: PIE_COLORS[i] }} />
                          {d.name}
                        </span>
                        <span className="font-mono font-bold text-white">{d.value}%</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── USERS ──────────────────────────────────────────────────── */}
          {activeTab === 'users' && (
            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="relative flex-1 max-w-sm">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Rechercher un membre…"
                    value={userSearch}
                    onChange={e => setUserSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0d1117] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                </div>
                <span className="text-xs text-slate-500 font-mono">{filteredUsers.length} membres</span>
              </div>
              <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">Membre</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">Rôle</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">Téléphone</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">Statut</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {filteredUsers.map(user => (
                      <tr key={user.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500/40 to-violet-500/40 flex items-center justify-center text-xs font-bold text-indigo-300">
                              {(user.full_name || 'U')[0].toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-white">{user.full_name || 'Utilisateur'}</p>
                              <p className="text-xs text-slate-500">{user.email || 'Non renseigné'}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4">
                          <select
                            value={user.role || 'particulier'}
                            onChange={e => handleRoleChange(user.id, e.target.value)}
                            className="bg-white/[0.06] border border-white/[0.1] text-xs font-mono text-slate-300 px-3 py-1.5 rounded-lg focus:outline-none focus:border-indigo-500/50 cursor-pointer transition-colors"
                          >
                            <option value="particulier">Particulier</option>
                            <option value="professionnel">Professionnel</option>
                            <option value="agence">Agence</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-400">{user.phone || '—'}</td>
                        <td className="px-5 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold
                            ${user.is_verified
                              ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                              : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${user.is_verified ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            {user.is_verified ? 'Vérifié' : 'En attente'}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleVerify(user.id, user.is_verified)}
                              className={`text-[11px] font-bold px-3 py-1.5 rounded-lg border transition-colors
                                ${user.is_verified
                                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'}`}
                            >
                              {user.is_verified ? 'Révoquer' : 'Vérifier'}
                            </button>
                            <button
                              onClick={() => handleBanUser(user.id)}
                              className="text-[11px] font-bold px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-colors"
                            >
                              Bannir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredUsers.length === 0 && (
                      <tr><td colSpan={5} className="px-5 py-16 text-center text-slate-500 text-sm">Aucun membre trouvé</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ── LISTINGS ───────────────────────────────────────────────── */}
          {activeTab === 'listings' && (
            <div className="space-y-5">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px]">
                  <span className="absolute inset-y-0 left-3 flex items-center text-slate-500">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Rechercher un bien…"
                    value={listingSearch}
                    onChange={e => setListingSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-[#0d1117] border border-white/[0.08] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                </div>
                <div className="flex items-center gap-2">
                  {(['all', 'active', 'archived'] as const).map(f => (
                    <button key={f}
                      onClick={() => setListingStatusFilter(f)}
                      className={`text-[11px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all
                        ${listingStatusFilter === f ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30' : 'bg-white/[0.04] text-slate-400 border border-white/[0.06] hover:text-white'}`}
                    >
                      {f === 'all' ? 'Tous' : f === 'active' ? 'Actifs' : 'Archivés'}
                    </button>
                  ))}
                </div>
                <span className="text-xs text-slate-500 font-mono">{filteredListings.length} biens</span>
              </div>

              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredListings.map(item => (
                  <div key={item.id} className="bg-[#0d1117] border border-white/[0.06] rounded-2xl overflow-hidden hover:border-indigo-500/20 transition-colors">
                    <div className="h-36 relative overflow-hidden bg-slate-800">
                      <img
                        src={item.image_url || 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg'}
                        alt={item.title}
                        className="w-full h-full object-cover opacity-70"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117] to-transparent" />
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase
                          ${item.listing_type === 'sale' ? 'bg-indigo-500 text-white' : 'bg-cyan-500 text-white'}`}>
                          {item.listing_type === 'sale' ? 'Vente' : 'Location'}
                        </span>
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase
                          ${item.is_active ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'}`}>
                          {item.is_active ? 'Actif' : 'Archivé'}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h4 className="font-bold text-white text-sm mb-1 truncate">{item.title}</h4>
                      <p className="text-xs text-slate-500 mb-3 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {item.address}
                      </p>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-indigo-400 font-mono font-bold text-sm">{(item.price || 0).toLocaleString()} CFA</span>
                        <span className="text-xs text-slate-500">{item.surface}m² · {item.rooms}p</span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleToggleListing(item.id, item.is_active)}
                          className={`flex-1 text-[11px] font-bold py-2 rounded-lg transition-colors border
                            ${item.is_active
                              ? 'bg-amber-500/10 text-amber-400 border-amber-500/20 hover:bg-amber-500/20'
                              : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/20'}`}
                        >
                          {item.is_active ? 'Archiver' : 'Activer'}
                        </button>
                        <button
                          onClick={() => handleDeleteListing(item.id)}
                          className="flex-1 text-[11px] font-bold py-2 rounded-lg bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
                {filteredListings.length === 0 && (
                  <div className="md:col-span-2 xl:col-span-3 py-16 text-center text-slate-500 text-sm">
                    Aucun bien correspondant
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ── REPORTS ────────────────────────────────────────────────── */}
          {activeTab === 'reports' && (
            <div className="space-y-4">
              {reports.length === 0 ? (
                <div className="py-20 text-center bg-[#0d1117] border border-white/[0.06] rounded-2xl">
                  <div className="text-4xl mb-3">✅</div>
                  <p className="text-slate-400 font-semibold">Aucun signalement en attente</p>
                  <p className="text-slate-500 text-sm mt-1">La plateforme est saine</p>
                </div>
              ) : (
                reports.map(report => (
                  <div key={report.id} className="bg-[#0d1117] border border-rose-500/20 rounded-2xl p-6">
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-rose-400 mb-1 block">🚨 Signalement Actif</span>
                        <h4 className="font-bold text-white text-base">{report.reason || 'Contenu inapproprié'}</h4>
                        <p className="text-sm text-slate-400 mt-1 max-w-2xl">{report.details || 'Aucun détail fourni par le signalant.'}</p>
                      </div>
                      <span className="text-xs text-slate-500 font-mono flex-shrink-0">
                        #{report.id?.slice(-6)}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2 pt-4 border-t border-white/[0.06]">
                      <button
                        onClick={() => handleResolveReport(report.id, report.listing_id, 'archive')}
                        className="text-xs font-bold px-4 py-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20 hover:bg-amber-500/20 transition-colors"
                      >
                        Archiver l&apos;annonce
                      </button>
                      <button
                        onClick={() => handleResolveReport(report.id, report.listing_id, 'delete')}
                        className="text-xs font-bold px-4 py-2 rounded-xl bg-rose-500/10 text-rose-400 border border-rose-500/20 hover:bg-rose-500/20 transition-colors"
                      >
                        Supprimer l&apos;annonce
                      </button>
                      <button
                        onClick={() => handleResolveReport(report.id, report.listing_id, 'ignore')}
                        className="text-xs font-bold px-4 py-2 rounded-xl bg-white/[0.04] text-slate-400 border border-white/[0.06] hover:text-white transition-colors"
                      >
                        Ignorer le rapport
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* ── SUBSCRIPTIONS ──────────────────────────────────────────── */}
          {activeTab === 'subscriptions' && (
            <div className="space-y-5">
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 text-center">
                  <p className="text-3xl font-bold text-white font-mono mb-1">3</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">Abonnements actifs</p>
                </div>
                <div className="bg-[#0d1117] border border-amber-500/20 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-bold text-amber-400 font-mono mb-1">1</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">Expirant bientôt</p>
                </div>
                <div className="bg-[#0d1117] border border-rose-500/20 rounded-2xl p-5 text-center">
                  <p className="text-3xl font-bold text-rose-400 font-mono mb-1">1</p>
                  <p className="text-xs text-slate-500 uppercase tracking-widest">Expirés</p>
                </div>
              </div>
              <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/[0.06] bg-white/[0.02]">
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">Client</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">Plan</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">Renouvellement</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">Montant</th>
                      <th className="px-5 py-3.5 text-left text-[11px] font-bold uppercase tracking-widest text-slate-500">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/[0.04]">
                    {mockSubs.map(sub => (
                      <tr key={sub.id} className="hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-4 text-sm font-semibold text-white">{sub.user}</td>
                        <td className="px-5 py-4">
                          <span className="text-xs font-mono bg-indigo-500/10 text-indigo-300 px-2.5 py-1 rounded-lg border border-indigo-500/20">
                            {sub.plan}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-sm text-slate-400 font-mono">{sub.renewal}</td>
                        <td className="px-5 py-4 text-sm font-bold text-white font-mono">{sub.amount}</td>
                        <td className="px-5 py-4">
                          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border
                            ${sub.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                              : sub.status === 'expiring' ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                              : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                            {sub.status === 'active' ? 'Actif' : sub.status === 'expiring' ? 'Expire bientôt' : 'Expiré'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* ── SECTION CODES INFLUENCEURS / PASS PREMIUM ── */}
              <div className="grid md:grid-cols-3 gap-6 pt-6">
                {/* Form to generate new promocode */}
                <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 md:col-span-1 space-y-4">
                  <h4 className="font-bold text-white text-sm">Générer un Pass Influenceur</h4>
                  <form onSubmit={handleCreatePromoCode} className="space-y-3">
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Code Promo</label>
                      <input type="text" placeholder="EX: INFLUENCE2026" value={newPromoCode} onChange={e => setNewPromoCode(e.target.value)} required
                        className="w-full px-3 py-2 bg-bg border border-white/[0.08] rounded-xl text-xs text-white outline-none focus:border-indigo-500" />
                    </div>
                    <div>
                      <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Plan à attribuer</label>
                      <select value={promoRole} onChange={e => setPromoRole(e.target.value)}
                        className="w-full px-3 py-2 bg-bg border border-white/[0.08] rounded-xl text-xs text-white outline-none focus:border-indigo-500">
                        <option value="hotel">Hôtel / Résidence Premium</option>
                        <option value="proprietaire">Propriétaire Privilège</option>
                        <option value="agent">Agent Pro</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Validité (Jours)</label>
                        <input type="number" value={promoDurationDays} onChange={e => setPromoDurationDays(e.target.value)} min="1" required
                          className="w-full px-3 py-2 bg-bg border border-white/[0.08] rounded-xl text-xs text-white outline-none focus:border-indigo-500" />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-slate-500 uppercase block mb-1">Utilisations max</label>
                        <input type="number" value={promoMaxUses} onChange={e => setPromoMaxUses(e.target.value)} min="1" required
                          className="w-full px-3 py-2 bg-bg border border-white/[0.08] rounded-xl text-xs text-white outline-none focus:border-indigo-500" />
                      </div>
                    </div>
                    <button type="submit" disabled={loadingPromo}
                      className="w-full py-2 bg-indigo-600 text-white rounded-xl text-xs font-bold hover:bg-indigo-500 transition-colors shadow-md disabled:opacity-50">
                      {loadingPromo ? 'Génération…' : 'Créer le code'}
                    </button>
                  </form>
                </div>

                {/* Promo codes table list */}
                <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-5 md:col-span-2 space-y-3">
                  <h4 className="font-bold text-white text-sm">Codes Actifs / Utilisés</h4>
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-white/[0.06] text-slate-500 text-left">
                          <th className="pb-2 font-semibold">Code</th>
                          <th className="pb-2 font-semibold">Attribution</th>
                          <th className="pb-2 font-semibold">Expire le</th>
                          <th className="pb-2 font-semibold">Usages</th>
                          <th className="pb-2 font-semibold text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/[0.04]">
                        {promoCodesList.map(code => (
                          <tr key={code.id} className="hover:bg-white/[0.01]">
                            <td className="py-2.5 font-bold font-mono text-indigo-400">{code.code}</td>
                            <td className="py-2.5 capitalize">{code.role_to_grant}</td>
                            <td className="py-2.5 text-slate-400 font-mono">{new Date(code.expires_at).toLocaleDateString()}</td>
                            <td className="py-2.5 text-slate-400 font-mono">{code.uses_count} / {code.max_uses}</td>
                            <td className="py-2.5 text-right">
                              <button onClick={() => handleDeletePromoCode(code.id)}
                                className="text-rose-400 hover:text-rose-300 font-semibold px-2 py-1 rounded">
                                Retirer
                              </button>
                            </td>
                          </tr>
                        ))}
                        {promoCodesList.length === 0 && (
                          <tr><td colSpan={5} className="py-6 text-center text-slate-500">Aucun pass promotionnel actif</td></tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── LOGS ───────────────────────────────────────────────────── */}
          {activeTab === 'logs' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between mb-5">
                <p className="text-sm text-slate-400">Historique des {mockLogs.length} dernières actions</p>
                <button className="text-xs font-bold text-slate-500 hover:text-white transition-colors px-3 py-1.5 border border-white/[0.06] rounded-lg">
                  Exporter CSV
                </button>
              </div>
              {mockLogs.map(log => (
                <div key={log.id} className={`bg-[#0d1117] border rounded-xl p-4 flex items-center gap-4
                  ${log.type === 'success' ? 'border-emerald-500/20' : log.type === 'warning' ? 'border-amber-500/20' : 'border-rose-500/20'}`}>
                  <span className={`w-8 h-8 rounded-lg flex items-center justify-center text-sm flex-shrink-0
                    ${log.type === 'success' ? 'bg-emerald-500/10 text-emerald-400' : log.type === 'warning' ? 'bg-amber-500/10 text-amber-400' : 'bg-rose-500/10 text-rose-400'}`}>
                    {log.type === 'success' ? '✓' : log.type === 'warning' ? '⚠' : '✕'}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-white">{log.action}</p>
                    <p className="text-xs text-slate-500 truncate">{log.target} · par {log.admin}</p>
                  </div>
                  <span className="text-xs text-slate-600 font-mono flex-shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          )}

          {/* ── SETTINGS ───────────────────────────────────────────────── */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <div className="bg-[#0d1117] border border-white/[0.06] rounded-2xl p-6 space-y-5">
                <h3 className="text-sm font-bold text-white border-b border-white/[0.06] pb-4">Configuration Plateforme</h3>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">Mode Maintenance</p>
                    <p className="text-xs text-slate-500">Désactive l&apos;accès public à la vitrine Zehouse</p>
                  </div>
                  <button
                    onClick={() => { setMaintenanceMode(!maintenanceMode); showToast(maintenanceMode ? 'Mode maintenance désactivé' : 'Mode maintenance activé'); }}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${maintenanceMode ? 'bg-rose-500' : 'bg-white/10'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full transition-transform duration-300 ${maintenanceMode ? 'translate-x-6' : ''}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-white">Notifications par Email</p>
                    <p className="text-xs text-slate-500">Alertes signalements et nouveaux membres</p>
                  </div>
                  <button
                    onClick={() => { setNotifEmail(!notifEmail); showToast(notifEmail ? 'Notifications désactivées' : 'Notifications activées'); }}
                    className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ${notifEmail ? 'bg-indigo-500' : 'bg-white/10'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full transition-transform duration-300 ${notifEmail ? 'translate-x-6' : ''}`} />
                  </button>
                </div>

                <div className="pt-4 border-t border-white/[0.06]">
                  <p className="text-sm font-semibold text-white mb-3">Email d&apos;alerte admin</p>
                  <div className="flex gap-3">
                    <input
                      type="email"
                      defaultValue="admin@wftechsarl.com"
                      className="flex-1 px-4 py-2.5 bg-white/[0.05] border border-white/[0.1] rounded-xl text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500/50"
                    />
                    <button
                      onClick={() => showToast('Email admin sauvegardé ✓')}
                      className="px-5 py-2.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded-xl text-sm font-semibold hover:bg-indigo-500/30 transition-colors"
                    >
                      Sauvegarder
                    </button>
                  </div>
                </div>
              </div>

              <div className="bg-[#0d1117] border border-rose-500/20 rounded-2xl p-6">
                <h3 className="text-sm font-bold text-rose-400 mb-4">Zone Dangereuse</h3>
                <div className="space-y-3">
                  <button className="w-full text-left px-4 py-3 rounded-xl bg-rose-500/5 border border-rose-500/20 text-rose-400 text-sm font-semibold hover:bg-rose-500/10 transition-colors">
                    🗑️ Purger toutes les annonces archivées
                  </button>
                  <button className="w-full text-left px-4 py-3 rounded-xl bg-rose-500/5 border border-rose-500/20 text-rose-400 text-sm font-semibold hover:bg-rose-500/10 transition-colors">
                    🚫 Réinitialiser tous les signalements résolus
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
