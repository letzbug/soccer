'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import {
  getStoredLanguage,
  getTranslations,
  type Language
} from '@/lib/i18n';

type LeaderboardRow = {
  user_id: string;
  username: string;
  total_points: number;
  total_predictions: number;
};

export default function Leaderboard() {
  const [language, setLanguage] = useState<Language>('de');
  const t = getTranslations(language).leaderboardPage;

  const [rows, setRows] = useState<LeaderboardRow[]>([]);
  const [error, setError] = useState(false);

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
    async function loadLeaderboard() {
      const supabase = createClient();

      const { data, error } = await supabase
        .from('leaderboard')
        .select(
          'user_id, username, total_points, total_predictions'
        );

      if (error) {
        setError(true);
        return;
      }

      setRows((data ?? []) as LeaderboardRow[]);
    }

    loadLeaderboard();
  }, []);

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="gold-text text-4xl font-black">
        {t.title}
      </h1>

      {error && (
        <div className="mt-6 rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-red-200">
          {t.loadError}
        </div>
      )}

      <div className="glass mt-6 overflow-hidden rounded-3xl">
        <table className="w-full">
          <thead className="bg-white/10 text-left text-sm uppercase tracking-widest text-white/50">
            <tr>
              <th className="p-4">{t.rank}</th>
              <th>{t.player}</th>
              <th>{t.points}</th>
              <th className="hidden sm:table-cell">{t.tips}</th>
            </tr>
          </thead>

          <tbody>
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-white/50">
                  {t.empty}
                </td>
              </tr>
            )}

            {rows.map((row, index) => (
              <tr
                key={row.user_id}
                className="border-t border-white/10"
              >
                <td className="p-4 font-black text-goldx">
                  #{index + 1}
                </td>

                <td>{row.username}</td>

                <td className="font-bold text-emeraldx">
                  {row.total_points}
                </td>

                <td className="hidden sm:table-cell text-white/60">
                  {row.total_predictions}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
