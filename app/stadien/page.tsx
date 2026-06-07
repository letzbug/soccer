'use client';

import { useEffect, useState } from 'react';
import { stadiums } from '@/data/stadiums';
import { StadiumCard } from '@/components/stadiums/stadium-card';
import {
  getStoredLanguage,
  getTranslations,
  type Language
} from '@/lib/i18n';

export default function Stadien() {
  const [language, setLanguage] = useState<Language>('de');
  const t = getTranslations(language).stadiumsPage;

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
    <main className="mx-auto max-w-7xl px-4 py-8">
      <h1 className="gold-text text-4xl font-black">
        {t.title}
      </h1>

      <p className="mt-2 text-white/60">
  {t.description}
</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {stadiums.map((s) => (
          <StadiumCard key={s.id} stadium={s} />
        ))}
      </div>
    </main>
  );
}
