import Link from 'next/link';
import { createClient } from '@/lib/supabase-server';

type PredictionRow = {
  points: number;
};

type LeaderboardRow = {
  user_id: string;
  username: string;
  total_points: number;
  total_predictions: number;
};

export default async function ProfilPage() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-10">
        <h1 className="gold-text text-4xl font-black">Profil</h1>

        <div className="glass mt-6 rounded-3xl p-6">
          <p className="text-white/70">Bitte zuerst einloggen.</p>

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

  const totalPoints = tips.reduce((sum, tip) => sum + (tip.points ?? 0), 0);
  const totalTips = tips.length;
  const rankIndex = rows.findIndex((row) => row.user_id === user.id);
  const rank = rankIndex >= 0 ? rankIndex + 1 : '-';

  const createdAt = user.created_at
    ? new Date(user.created_at).toLocaleDateString('de-DE')
    : '-';

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <h1 className="gold-text text-4xl font-black">Profil</h1>

      <p className="mt-3 text-white/60">
        Deine GlobeTip-Statistik und dein aktueller Stand im Tippspiel.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        <div className="glass rounded-3xl p-6">
          <div className="text-sm uppercase tracking-[0.25em] text-white/40">
            Account
          </div>

          <div className="mt-4 text-2xl font-black text-white">
            {user.email}
          </div>

          <div className="mt-2 text-sm text-white/50">
            Mitglied seit {createdAt}
          </div>
        </div>

        <div className="glass rounded-3xl p-6">
          <div className="text-sm uppercase tracking-[0.25em] text-white/40">
            Ranking
          </div>

          <div className="mt-4 text-5xl font-black text-goldx">
            #{rank}
          </div>

          <div className="mt-2 text-sm text-white/50">
            Aktuelle Position im Leaderboard
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-3">
        <div className="glass rounded-3xl p-6 text-center">
          <div className="text-4xl font-black text-emeraldx">
            {totalPoints}
          </div>
          <div className="mt-2 text-sm text-white/50">Punkte</div>
        </div>

        <div className="glass rounded-3xl p-6 text-center">
          <div className="text-4xl font-black text-goldx">
            {totalTips}
          </div>
          <div className="mt-2 text-sm text-white/50">Abgegebene Tipps</div>
        </div>

        <div className="glass rounded-3xl p-6 text-center">
          <div className="text-4xl font-black text-white">
            3
          </div>
          <div className="mt-2 text-sm text-white/50">Punkte bei Volltreffer</div>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/meine-tipps" className="btn-primary">
          Meine Tipps ansehen
        </Link>

        <Link href="/leaderboard" className="btn-ghost">
          Leaderboard öffnen
        </Link>
      </div>
    </main>
  );
}
