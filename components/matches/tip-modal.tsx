'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState } from 'react';
import { Match } from '@/data/matches';
import { Button } from '@/components/ui/button';
import { useTipStore } from '@/store/tip-store';
import {
  getStoredLanguage,
  getTranslations,
  type Language
} from '@/lib/i18n';

export function TipModal({
  match,
  children
}: {
  match: Match;
  children: React.ReactNode;
}) {
  const setTip = useTipStore((s) => s.setTip);

  const [language, setLanguage] = useState<Language>('de');
  const t = getTranslations(language).tipModal;

  const [home, setHome] = useState('');
  const [away, setAway] = useState('');

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

  const cleanNumber = (value: string) => {
    return value.replace(/\D/g, '').slice(0, 2);
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />

        <Dialog.Content className="glass fixed left-1/2 top-1/2 z-50 w-[92vw] max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-3xl p-6 shadow-glow">
          <Dialog.Title className="gold-text text-center text-3xl font-black">
            {t.title}
          </Dialog.Title>

          <div className="mt-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="text-center text-5xl">
              {match.homeFlag}
              <p className="mt-2 text-base font-bold">{match.home}</p>
            </div>

            <div className="text-2xl font-black text-goldx">VS</div>

            <div className="text-center text-5xl">
              {match.awayFlag}
              <p className="mt-2 text-base font-bold">{match.away}</p>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-center gap-4">
            <input
              className="input w-20 text-center text-3xl font-black"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={home}
              placeholder="0"
              onFocus={(e) => e.currentTarget.select()}
              onChange={(e) => setHome(cleanNumber(e.target.value))}
            />

            <span className="text-3xl">:</span>

            <input
              className="input w-20 text-center text-3xl font-black"
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              value={away}
              placeholder="0"
              onFocus={(e) => e.currentTarget.select()}
              onChange={(e) => setAway(cleanNumber(e.target.value))}
            />
          </div>

          <div className="mt-8 flex justify-end gap-3">
            <Dialog.Close asChild>
              <Button variant="ghost">{t.cancel}</Button>
            </Dialog.Close>

            <Dialog.Close asChild>
              <Button
                onClick={() =>
                  setTip(
                    match.id,
                    home === '' ? 0 : Number(home),
                    away === '' ? 0 : Number(away)
                  )
                }
              >
                {t.save}
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
