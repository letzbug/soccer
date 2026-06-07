'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Trophy, Sparkles, Activity, Newspaper } from 'lucide-react';
import { matches } from '@/data/matches';
import { stadiumById } from '@/data/stadiums';
import {
  getStoredLanguage,
  getTranslations,
  type Language
} from '@/lib/i18n';

export default function Home() {
  const [language, setLanguage] = useState<Language>('de');

  useEffect(() => {
    setLanguage(getStoredLanguage());
  }, []);

  const t = getTranslations(language).home;

  const featuredMatch = matches[0];
  const stadium = stadiumById(featuredMatch.stadiumId);
  const hasResult = featuredMatch.score && featuredMatch.score.length === 2;

  return (
    <main className="mx-auto grid min-h-[calc(100vh-64px)] max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2">
      <section>
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-emeraldx/30 bg-emeraldx/10 px-4 py-2 text-sm text-emeraldx">
          <Sparkles size={16} />
          {t.badge}
        </div>

        <h1 className="gold-text text-5xl font-black tracking-tight sm:text-7xl">
          {t.title}
        </h1>

        <p className="mt-6 max-w-xl text-lg text-white/70">
          {t.description}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link className="btn-primary" href="/auth/register">
            {t.start}
          </Link>
          <Link className="btn-ghost" href="/dashboard">
            {t.dashboard}
          </Link>
        </div>

        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          <Feature icon={<Trophy />} title={t.matches} href="/spielplan" />
          <Feature icon={<Activity />} title={t.results} href="/live" />
          <Feature icon={<Newspaper />} title={t.news} href="/news" />
        </div>
      </section>

      <section className="glass relative overflow-hidden rounded-[2rem] p-6 shadow-glow">
        <div className="absolute -right-16 -top-16 h-60 w-60 rounded-full bg-emeraldx/20 blur-3xl" />

        <div className="rounded-[1.5rem] border border-white/10 bg-black/25 p-6">
          <div className="loader-ball mx-auto" />

          <h2 className="mt-6 text-center text-3xl font-black">
            {t.matchCenter}
          </h2>

          <p className="mt-3 text-center text-white/60">
            {t.centerDescription}
          </p>

          <div className="mt-8 rounded-3xl bg-gradient-to-br from-emeraldx/20 to-goldx/10 p-5">
            <div className="mb-4 flex items-center justify-between text-xs uppercase tracking-[0.25em] text-white/50">
              <span>{hasResult ? t.finalScore : t.nextMatch}</span>
              <span className="text-emeraldx">
                {new Date(featuredMatch.date).toLocaleDateString('de-DE')}
              </span>
            </div>

            <div className="grid grid-cols-3 items-center text-center">
              <span className="text-5xl">{featuredMatch.homeFlag}</span>
              <span className="text-2xl font-black text-goldx">
                {hasResult
                  ? `${featuredMatch.score?.[0]} : ${featuredMatch.score?.[1]}`
                  : 'VS'}
              </span>
              <span className="text-5xl">{featuredMatch.awayFlag}</span>
            </div>

            <div className="mt-4 text-center text-sm text-white/70">
              {featuredMatch.home} vs {featuredMatch.away}
            </div>

            <div className="mt-2 text-center text-xs text-white/45">
              {new Date(featuredMatch.date).toLocaleString('de-DE', {
                dateStyle: 'medium',
                timeStyle: 'short'
              })}{' '}
              · {stadium.name}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Feature({
  icon,
  title,
  href
}: {
  icon: React.ReactNode;
  title: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="glass rounded-2xl p-4 text-center text-sm font-bold text-white/80 transition hover:scale-[1.03] hover:bg-white/10"
    >
      <div className="mx-auto mb-2 w-fit text-goldx">{icon}</div>
      {title}
    </Link>
  );
}
