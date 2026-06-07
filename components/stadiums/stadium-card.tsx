'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Stadium } from '@/data/stadiums';
import { StadiumModal } from './stadium-modal';
import { getStoredLanguage, getTranslations, type Language } from '@/lib/i18n';

export function StadiumCard({ stadium }: { stadium: Stadium }) {
  const [language, setLanguage] = useState<Language>('de');
  const t = getTranslations(language).stadiumCard;

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
    <StadiumModal stadium={stadium}>
      <button className="glass card-hover group overflow-hidden rounded-3xl text-left">
        <div className="relative h-48">
          <Image src={stadium.image} alt={stadium.name} fill className="object-cover transition group-hover:scale-105" />
        </div>
        <div className="p-5">
          <p className="text-sm text-emeraldx">{stadium.city} · {stadium.country}</p>
          <h3 className="text-xl font-black">{stadium.name}</h3>
          <p className="mt-2 text-sm text-white/60">
            {stadium.capacity.toLocaleString('de-DE')} {t.seats}{' · '}{t.opened} {stadium.opened}
          </p>
        </div>
      </button>
    </StadiumModal>
  );
}
