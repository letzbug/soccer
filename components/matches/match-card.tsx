'use client';

import { useEffect, useState } from 'react';
import { Match } from '@/data/matches';
import { stadiumById } from '@/data/stadiums';
import { TipModal } from './tip-modal';
import { StadiumModal } from '@/components/stadiums/stadium-modal';
import { Button } from '@/components/ui/button';
import { useTipStore } from '@/store/tip-store';
import {
  getStoredLanguage,
  getTranslations,
  type Language
} from '@/lib/i18n';

export function MatchCard({ match }: { match: Match }) {
  const [language, setLanguage] = useState<Language>('de');
  const t = getTranslations(language).matchCard;

  const stadium = stadiumById(match.stadiumId);
  const tip = useTipStore((s) => s.draft[match.id]);

  const matchDate = new Date(match.date);
  const now = new Date();
  const isClosed = now >= matchDate || match.status !== 'scheduled';
  const translatedStage =
  language === 'fr'
    ? match.stage
        .replace('Gruppenphase', 'Phase de groupes')
        .replace('Finale', 'Finale')
    : language === 'en'
      ? match.stage
          .replace('Gruppenphase', 'Group stage')
          .replace('Finale', 'Final')
      : match.stage;

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

  return (
    <article className="glass card-hover rounded-3xl p-5">
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-emeraldx/15 px-3 py-1 text-xs font-bold text-emeraldx">
          {translatedStage}
          {match.group ? ` · ${t.group} ${match.group}` : ''}
        </span>

        <time className="text-xs text-white/55">
          {matchDate.toLocaleString('de-DE', {
            dateStyle: 'medium',
            timeStyle: 'short'
          })}
        </time>
      </div>

      <div className="mt-5 grid grid-cols-[1fr_auto_1fr] items-center gap-2 text-center">
        <div className="text-4xl">
          {match.homeFlag}
          <p className="mt-2 text-base font-bold">{match.home}</p>
        </div>

        <div className="rounded-2xl bg-black/30 px-4 py-2 text-xl font-black text-goldx">
          {tip ? `${tip.home}:${tip.away}` : 'VS'}
        </div>

        <div className="text-4xl">
          {match.awayFlag}
          <p className="mt-2 text-base font-bold">{match.away}</p>
        </div>
      </div>

      {isClosed && (
        <div className="mt-4 rounded-2xl border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-200">
          {t.closed}
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-2">
        {isClosed ? (
          <Button disabled>{t.tipClosed}</Button>
        ) : (
          <TipModal match={match}>
            <Button>{t.tip}</Button>
          </TipModal>
        )}

        <StadiumModal stadium={stadium}>
          <Button variant="ghost">{t.stadium}</Button>
        </StadiumModal>
      </div>
    </article>
  );
}
