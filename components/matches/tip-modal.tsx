'use client';

import * as Dialog from '@radix-ui/react-dialog';
import { useState } from 'react';
import { Match } from '@/data/matches';
import { Button } from '@/components/ui/button';
import { useTipStore } from '@/store/tip-store';

export function TipModal({
  match,
  children
}: {
  match: Match;
  children: React.ReactNode;
}) {
  const setTip = useTipStore((s) => s.setTip);

  const [home, setHome] = useState('');
  const [away, setAway] = useState('');

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
            Dein Tipp
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
              <Button variant="ghost">Abbrechen</Button>
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
                Tipp speichern
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
