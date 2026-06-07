'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { Button } from '@/components/ui/button';

type MatchRow = {
  id: string;
  home_team: string;
  away_team: string;
  home_score: number | null;
  away_score: number | null;
  status: string;
};

export default function AdminPage() {
  const [matches, setMatches] = useState<MatchRow[]>([]);
  const [scores, setScores] = useState<Record<string, { home: string; away: string }>>({});
  const [message, setMessage] = useState('');

  async function loadMatches() {
    const supabase = createClient();

    const { data } = await supabase
      .from('matches')
      .select('id, home_team, away_team, home_score, away_score, status')
      .order('match_date');

    if (data) {
      setMatches(data);

      const initial: Record<string, { home: string; away: string }> = {};

      data.forEach((m) => {
        initial[m.id] = {
          home: m.home_score?.toString() ?? '',
          away: m.away_score?.toString() ?? ''
        };
      });

      setScores(initial);
    }
  }

  async function saveResult(matchId: string) {
    const supabase = createClient();
    const score = scores[matchId];

    const home = Number(score.home);
    const away = Number(score.away);

    const { error } = await supabase
      .from('matches')
      .update({
        home_score: home,
        away_score: away,
        status: 'finished'
      })
      .eq('id', matchId);

    if (error) {
      setMessage('Ergebnis konnte nicht gespeichert werden.');
      return;
    }

    await supabase.rpc('recalculate_match_points', {
      match_text_id: matchId
    });

    setMessage('Ergebnis gespeichert und Punkte berechnet.');
    loadMatches();
  }

  useEffect(() => {
    loadMatches();
  }, []);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="gold-text text-4xl font-black">Admin</h1>

      <p className="mt-3 text-white/60">
        Ergebnisse eintragen und Punkte automatisch berechnen.
      </p>

      <div className="mt-8 grid gap-4">
        {matches.map((match) => (
          <div key={match.id} className="glass rounded-3xl p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <div className="text-xl font-black">
                  {match.home_team} vs {match.away_team}
                </div>
                <div className="text-sm text-white/50">
                  Status: {match.status}
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
                        ...s[match.id],
                        home: e.target.value
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
                        ...s[match.id],
                        away: e.target.value
                      }
                    }))
                  }
                />

                <Button onClick={() => saveResult(match.id)}>
                  Speichern
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {message && (
        <div className="mt-6 text-center text-emerald-400">
          {message}
        </div>
      )}
    </main>
  );
}
