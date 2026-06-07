'use client';

import { useEffect, useMemo, useState } from 'react';
import { matches } from '@/data/matches';
import { MatchCard } from '@/components/matches/match-card';
import { useTipStore } from '@/store/tip-store';
import {
  getStoredLanguage,
  getTranslations,
  type Language
} from '@/lib/i18n';

export default function Spielplan() {
  const [language, setLanguage] = useState<Language>('de');
  const t = getTranslations(language).schedulePage;

  const [q, setQ] = useState('');
  const [stage, setStage] = useState('all');
  const loadTips = useTipStore((s) => s.loadTips);

  useEffect(() => {
    loadTips();
  }, [loadTips]);

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

  const stages = Array.from(new Set(matches.map((m) => m.stage)));

  const filtered = useMemo(
    () =>
      matches.filter(
        (m) =>
          (stage === 'all' || m.stage === stage) &&
          `${m.home} ${m.away} ${m.stage}`
            .toLowerCase()
            .includes(q.toLowerCase())
      ),
    [q, stage]
  );

  return (
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="gold-text text-4xl font-black">
        {t.title}
      </h1>

      <div className="my-6 flex flex-col gap-3 md:flex-row">
        <input
          className="input flex-1"
          placeholder={t.searchPlaceholder}
          value={q}
          onChange={(e) => setQ(e.target.value)}
        />

        <select
          className="input"
          value={stage}
          onChange={(e) => setStage(e.target.value)}
        >
          <option value="all">{t.all}</option>

          {stages.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        {filtered.map((m) => (
          <MatchCard key={m.id} match={m} />
        ))}
      </div>
    </main>
  );
}
