'use client';

import * as Dialog from '@radix-ui/react-dialog';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Stadium } from '@/data/stadiums';
import { X, Users, Calendar } from 'lucide-react';
import { getStoredLanguage, getTranslations, type Language } from '@/lib/i18n';

export function StadiumModal({ stadium, children }: { stadium: Stadium; children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('de');
  const t = getTranslations(language).stadiumModal;

  useEffect(() => {
    setLanguage(getStoredLanguage());
    function handleLanguageChange(event: Event) {
      const customEvent = event as CustomEvent<Language>;
      setLanguage(customEvent.detail);
    }
    window.addEventListener('globetip-language-change', handleLanguageChange);
    return () => window.removeEventListener('globetip-language-change', handleLanguageChange);
  }, []);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm" />
        <Dialog.Content className="glass fixed left-1/2 top-1/2 z-50 max-h-[88vh] w-[92vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-3xl shadow-glow">
          <div className="relative h-64 shrink-0">
            <Image src={stadium.image} alt={stadium.name} fill className="object-cover" />
            <Dialog.Close className="absolute right-4 top-4 rounded-full bg-black/50 p-2"><X /></Dialog.Close>
          </div>
          <div className="space-y-5 p-6">
            <div>
              <p className="text-sm uppercase tracking-[.3em] text-emeraldx">{stadium.city} · {stadium.country}</p>
              <Dialog.Title className="text-3xl font-black">{stadium.name}</Dialog.Title>
              <p className="text-goldx">{t.fifaName}: {stadium.tournamentName}</p>
            </div>
            <p className="text-white/75">{stadium.description[language]}</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="glass rounded-2xl p-4"><Calendar className="text-emeraldx" />{t.opened} <b>{stadium.opened}</b></div>
              <div className="glass rounded-2xl p-4"><Users className="text-goldx" />{t.capacity} <b>{stadium.capacity.toLocaleString('de-DE')}</b></div>
            </div>
            <div className="grid gap-2">
              {stadium.facts[language].map((f) => (
                <div key={f} className="rounded-xl border border-white/10 bg-white/5 p-3">⚽ {f}</div>
              ))}
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
