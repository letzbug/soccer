'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { matches } from '@/data/matches';
import { MatchCard } from '@/components/matches/match-card';
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

export default function Dashboard() {
  const [language, setLanguage] = useState<Language>('de');
  const t = getTranslations(language).dashboardPage;

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [predictions, setPredictions] = useState<PredictionRow[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);

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
    async function loadDashboard() {
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

      const { data: predictionData } = await supabase
        .from('predictions')
        .select('points')
        .eq('user_id', user.id);

      const { data: leaderboardData } = await supabase
        .from('leaderboard')
        .select('user_id, username, total_points, total_predictions');

      setPredictions((predictionData ?? []) as PredictionRow[]);
      setLeaderboard((leaderboardData ?? []) as LeaderboardRow[]);
      setLoading(false);
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="glass rounded-3xl p-6 text-white/60">
          Loading...
        </div>
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="glass rounded-3xl p-6">
          <h1 className="gold-text text-4xl font-black">{t.title}</h1>

          <p className="mt-3 text-white/60">
            {t.loginRequired}
          </p>

          <Link href="/auth/login" className="btn-primary mt-5 inline-flex">
            {t.loginButton}
          </Link>
        </div>
      </main>
    );
  }

  const myPoints = predictions.reduce(
    (sum, tip) => sum + (tip.points ?? 0),
    0
  );

  const myTips = predictions.length;
  const openTips = Math.max(matches.length - myTips, 0);

  const rankIndex = leaderboard.findIndex((row) => {
    return predictions.length > 0 && row.total_predictions >= 0;
  });

  const myUserRow = leaderboard.find((row) => row.total_points === myPoints);
  const realRankIndex = myUserRow
    ? leaderboard.findIndex((row) => row.user_id === myUserRow.user_id)
    : -1;

  const rank = realRankIndex >= 0 ? `#${realRankIndex + 1}` : '-';

  const nextMatches = matches
    .filter((match) => new Date(match.date) > new Date())
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Stat label={t.myPoints} value={String(myPoints)} />
        <Stat label={t.globalRank} value={rank} />
        <Stat label={t.myTips} value={String(myTips)} />
        <Stat label={t.openTips} value={String(openTips)} />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section>
          <h1 className="gold-text mb-5 text-4xl font-black">
            {t.nextMatches}
          </h1>

          <div className="grid gap-4">
            {nextMatches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="gold-text mb-5 text-3xl font-black">
            {t.topRanking}
          </h2>

          <div className="glass overflow-hidden rounded-3xl">
            <table className="w-full">
              <thead className="bg-white/10 text-left text-xs uppercase tracking-widest text-white/50">
                <tr>
                  <th className="p-4">{t.rank}</th>
                  <th>{t.player}</th>
                  <th>{t.points}</th>
                </tr>
              </thead>

              <tbody>
                {leaderboard.slice(0, 5).map((row, index) => (
                  <tr key={row.user_id} className="border-t border-white/10">
                    <td className="p-4 font-black text-goldx">
                      #{index + 1}
                    </td>
                    <td>{row.username}</td>
                    <td className="font-bold text-emeraldx">
                      {row.total_points}
                    </td>
                  </tr>
                ))}

                {leaderboard.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-6 text-center text-white/50">
                      {t.noPoints}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Link href="/leaderboard" className="btn-ghost mt-5 inline-flex">
            {t.fullRanking}
          </Link>
        </section>
      </div>
    </main>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="glass rounded-3xl p-6">
      <p className="text-sm uppercase tracking-widest text-white/50">
        {label}
      </p>

      <p className="mt-2 text-4xl font-black text-goldx">
        {value}
      </p>
    </div>
  );
}
