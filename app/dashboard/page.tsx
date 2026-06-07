import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';
import { matches } from '@/data/matches';
import { MatchCard } from '@/components/matches/match-card';

type PredictionRow = {
  points: number;
};

type LeaderboardRow = {
  user_id: string;
  username: string;
  total_points: number;
  total_predictions: number;
};

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-8">
        <div className="glass rounded-3xl p-6">
          <h1 className="gold-text text-4xl font-black">Dashboard</h1>
          <p className="mt-3 text-white/60">Bitte zuerst einloggen.</p>
          <Link href="/auth/login" className="btn-primary mt-5 inline-flex">
            Zum Login
          </Link>
        </div>
      </main>
    );
  }

  const { data: predictions } = await supabase
    .from('predictions')
    .select('points')
    .eq('user_id', user.id);

  const { data: leaderboard } = await supabase
    .from('leaderboard')
    .select('user_id, username, total_points, total_predictions');

  const tips = (predictions ?? []) as PredictionRow[];
  const rows = (leaderboard ?? []) as LeaderboardRow[];

  const myPoints = tips.reduce((sum, tip) => sum + (tip.points ?? 0), 0);
  const myTips = tips.length;
  const openTips = Math.max(matches.length - myTips, 0);
  const rankIndex = rows.findIndex((row) => row.user_id === user.id);
  const rank = rankIndex >= 0 ? `#${rankIndex + 1}` : '-';

  const nextMatches = matches
    .filter((match) => new Date(match.date) > new Date())
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <div className="mb-8 grid gap-4 md:grid-cols-4">
        <Stat label="Meine Punkte" value={String(myPoints)} />
        <Stat label="Rang global" value={rank} />
        <Stat label="Meine Tipps" value={String(myTips)} />
        <Stat label="Offene Tipps" value={String(openTips)} />
      </div>

      <div className="mb-8 grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <section>
          <h1 className="gold-text mb-5 text-4xl font-black">
            Nächste Spiele
          </h1>

          <div className="grid gap-4">
            {nextMatches.map((m) => (
              <MatchCard key={m.id} match={m} />
            ))}
          </div>
        </section>

        <section>
          <h2 className="gold-text mb-5 text-3xl font-black">
            Top 5 Ranking
          </h2>

          <div className="glass overflow-hidden rounded-3xl">
            <table className="w-full">
              <thead className="bg-white/10 text-left text-xs uppercase tracking-widest text-white/50">
                <tr>
                  <th className="p-4">#</th>
                  <th>Spieler</th>
                  <th>Punkte</th>
                </tr>
              </thead>

              <tbody>
                {rows.slice(0, 5).map((row, index) => (
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

                {rows.length === 0 && (
                  <tr>
                    <td colSpan={3} className="p-6 text-center text-white/50">
                      Noch keine Punkte vorhanden.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <Link href="/leaderboard" className="btn-ghost mt-5 inline-flex">
            Komplettes Ranking ansehen
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
