import Link from "next/link";

export default function NewsPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="gold-text text-5xl font-black">Latest News</h1>
      <p className="mt-4 text-white/70">
        Aktuelle Nachrichten rund um die FIFA World Cup 2026.
      </p>

      <div className="mt-8 grid gap-4">
        <a href="https://www.fifa.com/en/tournaments/mens/worldcup" target="_blank" rel="noopener noreferrer" className="glass block rounded-3xl p-6 hover:bg-white/10">
          📰 FIFA Official News
        </a>

        <a href="https://www.espn.com/soccer/" target="_blank" rel="noopener noreferrer" className="glass block rounded-3xl p-6 hover:bg-white/10">
          ⚽ ESPN Football News
        </a>

        <a href="https://www.reuters.com/world/sports/" target="_blank" rel="noopener noreferrer" className="glass block rounded-3xl p-6 hover:bg-white/10">
          🌍 Reuters Sports
        </a>
      </div>

      <div className="mt-10">
        <Link href="/" className="btn-ghost">Zurück</Link>
      </div>
    </main>
  );
}
