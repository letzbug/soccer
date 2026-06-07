import { de } from '@/translations/de';
import { fr } from '@/translations/fr';
import { en } from '@/translations/en';

export type Language = 'de' | 'fr' | 'en';

export const translations = {
  de,
  fr,
  en
};

export function getStoredLanguage(): Language {
  if (typeof window === 'undefined') return 'de';

  const stored = window.localStorage.getItem('globetip-language');

  if (stored === 'de' || stored === 'fr' || stored === 'en') {
    return stored;
  }

  return 'de';
}

export function setStoredLanguage(language: Language) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem('globetip-language', language);
}

export function getTranslations(language: Language) {
  return translations[language];
}
