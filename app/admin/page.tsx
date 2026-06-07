'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { Button } from '@/components/ui/button';
import {
  getStoredLanguage,
  getTranslations,
  type Language
} from '@/lib/i18n';

const ADMIN_EMAIL = 'letzbug@gmail.com';

type MatchRow = {
  id: string;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  status: string;
};

export default function AdminPage() {
  const [language, setLanguage] = useState<Language>('de');
  const t = getTranslations(language).adminPage;

  const [allowed, setAllowed] = useState(false);
  const [checking, setChecking] = useState(true);
  const [matches, setMatches] = useState<MatchRow[]>([]);
  const [scores, setScores] = useState<Record<string, { home: string; away: string }>>({});
  const [message, setMessage] = useState('');

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

  async function checkAdmin() {
    const supabase = createClient();

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      window.location.href = '/auth/login';
      return;
    }

    if (user.email !== ADMIN_EMAIL) {
      setAllowed(false);
      setChecking(false);
      return;
    }

    setAllowed(true);
    setChecking(false);
    await loadMatches();
  }

  async function loadMatches() {
    const supabase = createClient();

    const { data, error } = await supabase
      .from('matches')
      .select('id, home_team, away_team, home_score, away_score, status')
      .order('match_date');

    if (error) {
      setMessage(t.loadError);
      return;
    }

    if (data) {
      setMatches(data);

      const initial: Record<string, { home: string; away: string }> = {};

      data.forEach((m) => {
        initial[m.id] = {
          home: m.home_score !== null ? String(m.home_score) : '',
          away: m.away_score !== null ? String(m.away_score) : ''
        };
      });

      setScores(initial);
    }
  }

  async function saveResult(matchId: string) {
    const supabase = createClient();
    const score = scores[matchId];

    if (!score || score.home === '' || score.away === '') {
      setMessage(t.enterBoth);
      return;
    }

    const home = parseInt(score.home, 10);
    const away = parseInt(score.away, 10);

    const { error } = await supabase
      .from('matches')
      .update({
        home_score: home,
        away_score: away,
        status: 'finished'
      })
      .eq('id', matchId);

    if (error) {
      setMessage(t.saveError);
      return;
    }

    await supabase.rpc('recalculate_match_points', {
      match_text_id: matchId
    });

    setMessage(t.success);
    await loadMatches();
  }

  useEffect(() => {
    checkAdmin();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (checking) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="glass rounded-3xl p-6 text-center">
          {t.checking}
        </div>
      </main>
    );
  }

  if (!allowed) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="glass rounded-3xl p-6 text-center">
          <h1 className="text-3xl font-black text-red-300">
            {t.noAccess}
          </h1>

          <p className="mt-3 text-white/60">
            {t.noAccessText}
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="gold-text text-4xl font-black">
        {t.title}
      </h1>

      <p className="mt-3 text-white/60">
        {t.description}
      </p>

      {message && (
        <div className="mt-6 rounded-2xl border border-emeraldx/30 bg-emeraldx/10 p-4 text-center text-emeraldx">
          {message}
        </div>
      )}

      <div className="mt-8 grid gap-4">
        {matches.map((match) => (
          <div key={match.id} className="glass rounded-3xl p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xl font-black">
                  {match.home_team} vs {match.away_team}
                </div>

                <div className="text-sm text-white/50">
                  {t.status}: {match.status}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <input
                  className="input w-20 text-center text-xl font-black"
                  type="tel"
                  inputMode="numeric"
                  value={scores[match.id]?.home ?? ''}
                  onChange={(e) =>
                    setScores((s) => ({
                      ...s,
                      [match.id]: {
                        home: e.target.value.replace(/\D/g, '').slice(0, 2),
                        away: s[match.id]?.away ?? ''
                      }
                    }))
                  }
                />

                <span className="text-2xl font-black text-goldx">:</span>

                <input
                  className="input w-20 text-center text-xl font-black"
                  type="tel"
                  inputMode="numeric"
                  value={scores[match.id]?.away ?? ''}
                  onChange={(e) =>
                    setScores((s) => ({
                      ...s,
                      [match.id]: {
                        home: s[match.id]?.home ?? '',
                        away: e.target.value.replace(/\D/g, '').slice(0, 2)
                      }
                    }))
                  }
                />

                <Button onClick={() => saveResult(match.id)}>
                  {t.save}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
