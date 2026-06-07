'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import {
  getStoredLanguage,
  getTranslations,
  type Language
} from '@/lib/i18n';

type TipRow = {
  predicted_home: number;
  predicted_away: number;
  points: number;
  matches: {
    home_team: string;
    away_team: string;
  };
};

export default function MeineTipps() {
  const [language, setLanguage] = useState<Language>('de');
  const t = getTranslations(language).myTipsPage;

  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [tips, setTips] = useState<TipRow[]>([]);

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
    async function loadTips() {
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

      const { data } = await supabase
        .from('predictions')
        .select(`
          predicted_home,
          predicted_away,
          points,
          matches (
            home_team,
            away_team
          )
        `)
        .eq('user_id', user.id);

      setTips((data ?? []) as unknown as TipRow[]);
      setLoading(false);
    }

    loadTips();
  }, []);

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="glass rounded-3xl p-6 text-white/60">
          Loading...
        </div>
      </main>
    );
  }

  if (!loggedIn) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="gold-text text-4xl font-black">
          {t.title}
        </h1>

        <div className="glass mt-6 rounded-3xl p-6">
          {t.loginRequired}
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="gold-text text-4xl font-black">
        {t.title}
      </h1>

      <div className="glass mt-6 overflow-hidden rounded-3xl">
        <table className="w-full">
          <thead className="bg-white/10">
            <tr>
              <th className="p-4 text-left">{t.match}</th>
              <th className="text-left">{t.myTip}</th>
              <th className="text-left">{t.points}</th>
            </tr>
          </thead>

          <tbody>
            {tips.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="p-6 text-center text-white/50"
                >
                  {t.empty}
                </td>
              </tr>
            )}

            {tips.map((tip, index) => (
              <tr
                key={index}
                className="border-t border-white/10"
              >
                <td className="p-4">
                  {tip.matches?.home_team} vs {tip.matches?.away_team}
                </td>

                <td>
                  {tip.predicted_home}:{tip.predicted_away}
                </td>

                <td className="font-bold text-emeraldx">
                  {tip.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
