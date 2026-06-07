import { createClient } from '@/lib/supabase-server';

export default async function MeineTipps() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-8">
        <h1 className="gold-text text-4xl font-black">Meine Tipps</h1>
        <div className="glass mt-6 rounded-3xl p-6">
          Bitte zuerst einloggen.
        </div>
      </main>
    );
  }

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

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="gold-text text-4xl font-black">Meine Tipps</h1>

      <div className="glass mt-6 overflow-hidden rounded-3xl">
        <table className="w-full">
          <thead className="bg-white/10">
            <tr>
              <th className="p-4 text-left">Spiel</th>
              <th className="text-left">Mein Tipp</th>
              <th className="text-left">Punkte</th>
            </tr>
          </thead>
          <tbody>
            {data?.map((tip, index) => (
              <tr key={index} className="border-t border-white/10">
                <td className="p-4">
                  {(tip.matches as any)?.home_team} vs {(tip.matches as any)?.away_team}
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
