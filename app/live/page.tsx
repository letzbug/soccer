import Link from "next/link";

export default function LivePage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="gold-text text-5xl font-black">Live Scores</h1>
      <p className="mt-4 text-white/70">
        Verfolge aktuelle Ergebnisse und Live-Spielstände der FIFA World Cup 2026.
      </p>

      <div className="mt-8 grid gap-4">
        <a href="https://www.fifa.com/en/tournaments/mens/worldcup" target="_blank" rel="noopener noreferrer" className="glass block rounded-3xl p-6 hover:bg-white/10">
          ⚽ FIFA World Cup Live Center
        </a>

        <a href="https://www.flashscore.com/football/world/world-cup/" target="_blank" rel="noopener noreferrer" className="glass block rounded-3xl p-6 hover:bg-white/10">
          📊 Flashscore Live Scores
        </a>

        <a href="https://www.livescore.com/en/football/world-cup/" target="_blank" rel="noopener noreferrer" className="glass block rounded-3xl p-6 hover:bg-white/10">
          🏆 LiveScore World Cup
        </a>
      </div>

      <div className="mt-10">
        <Link href="/" className="btn-ghost">Zurück</Link>
      </div>
    </main>
  );
}
