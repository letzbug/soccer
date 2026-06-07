'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { ProfileUsernameForm } from './profile-username-form';
import {
  getStoredLanguage,
  getTranslations,
  type Language
} from '@/lib/i18n';

type PredictionRow = {
  points: number;
};

type LeaderboardRow = {
  user_id: string;
  username: string;
  total_points: number;
  total_predictions: number;
};

export default function ProfilPage() {
  const [language, setLanguage] = useState<Language>('de');
  const t = getTranslations(language).profilePage;

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState('');
  const [createdAt, setCreatedAt] = useState('-');
  const [username, setUsername] = useState('');
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalTips, setTotalTips] = useState(0);
  const [rank, setRank] = useState<string | number>('-');

  useEffect(() => {
    setLanguage(getStoredLanguage());

    function handleLanguageChange(event: Event) {
      const customEvent = event as CustomEvent<Language>;
      setLanguage(customEvent.detail);
    }

    window.addEventListener('globetip-language-change', handleLanguageChange);

    return () => {
      window.removeEventListener(
        'globetip-language-change',
        handleLanguageChange
      );
    };
  }, []);

  useEffect(() => {
    async function loadProfile() {
      const supabase = createClient();

      const {
        data: { user }
      } = await supabase.auth.getUser();

      if (!user) {
        setLoggedIn(false);
        setLoading(false);
        return;
      }

      setLoggedIn(true);
      setEmail(user.email ?? '');
      setCreatedAt(
        user.created_at
          ? new Date(user.created_at).toLocaleDateString('de-DE')
          : '-'
      );

      const { data: profile } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      const { data: predictions } = await supabase
        .from('predictions')
        .select('points')
        .eq('user_id', user.id);

      const { data: leaderboard } = await supabase
        .from('leaderboard')
        .select('user_id, username, total_points, total_predictions');

      const tips = (predictions ?? []) as PredictionRow[];
      const rows = (leaderboard ?? []) as LeaderboardRow[];

      setUsername(profile?.username ?? user.email?.split('@')[0] ?? 'Player');

      setTotalPoints(
        tips.reduce((sum, tip) => sum + (tip.points ?? 0), 0)
      );

      setTotalTips(tips.length);

      const rankIndex = rows.findIndex((row) => row.user_id === user.id);
      setRank(rankIndex >= 0 ? rankIndex + 1 : '-');

      setLoading(false);
    }

    loadProfile();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="glass rounded-3xl p-6 text-white/60">
          Loading...
        </div>
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="gold-text text-4xl font-black">{t.title}</h1>

        <div className="glass mt-6 rounded-3xl p-6">
          <p className="text-white/70">{t.loginRequired}</p>

          <Link href="/auth/login" className="btn-primary mt-5 inline-flex">
            {t.loginButton}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="gold-text text-4xl font-black">{t.title}</h1>

      <p className="mt-3 text-white/60">
        {t.description}
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <div className="text-sm uppercase tracking-[0.25em] text-white/40">
            {t.account}
          </div>

          <div className="mt-4 text-2xl font-black text-white">
            {username}
          </div>

          <div className="mt-2 text-sm text-white/50">
            {email}
          </div>

          <div className="mt-2 text-sm text-white/50">
            {t.memberSince} {createdAt}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="text-sm uppercase tracking-[0.25em] text-white/40">
            {t.ranking}
          </div>

          <div className="mt-4 text-5xl font-black text-goldx">
            #{rank}
          </div>

          <div className="mt-2 text-sm text-white/50">
            {t.currentPosition}
          </div>
        </div>
      </div>

      <ProfileUsernameForm initialUsername={username} />

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="glass rounded-3xl p-6 text-center">
          <div className="text-4xl font-black text-emeraldx">
            {totalPoints}
          </div>
          <div className="mt-2 text-sm text-white/50">{t.points}</div>
        </div>

        <div className="glass rounded-3xl p-6 text-center">
          <div className="text-4xl font-black text-goldx">
            {totalTips}
          </div>
          <div className="mt-2 text-sm text-white/50">
            {t.submittedTips}
          </div>
        </div>

        <div className="glass rounded-3xl p-6 text-center">
          <div className="text-4xl font-black text-white">
            3
          </div>
          <div className="mt-2 text-sm text-white/50">
            {t.perfectScore}
          </div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/meine-tipps" className="btn-primary">
          {t.viewMyTips}
        </Link>

        <Link href="/leaderboard" className="btn-ghost">
          {t.openLeaderboard}
        </Link>
      </div>
    </main>
  );
}
