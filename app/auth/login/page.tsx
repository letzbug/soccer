'use client';

import { createClient } from '@/lib/supabase-browser';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  getStoredLanguage,
  getTranslations,
  type Language
} from '@/lib/i18n';

export default function Login() {
  const [language, setLanguage] = useState<Language>('de');
  const t = getTranslations(language).auth;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLanguage(getStoredLanguage());

    function handleLanguageChange(event: Event) {
      const customEvent = event as CustomEvent<Language>;
      setLanguage(customEvent.detail);
    }

    window.addEventListener('globetip-language-change', handleLanguageChange);

    return () => {
      window.removeEventListener('globetip-language-change', handleLanguageChange);
    };
  }, []);

  async function login() {
    setLoading(true);
    setError('');

    const { error } = await createClient().auth.signInWithPassword({
      email,
      password
    });

    setLoading(false);

    if (error) {
      setError(error.message);
      return;
    }

    window.location.href = '/dashboard';
  }

  async function google() {
    await createClient().auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/dashboard`
      }
    });
  }

  return (
    <main className="mx-auto max-w-md px-4 py-14">
      <div className="glass rounded-3xl p-6">
        <h1 className="gold-text text-3xl font-black">{t.loginTitle}</h1>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
          </div>
        )}

        <input
          className="input mt-6 w-full"
          placeholder={t.email}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input mt-3 w-full"
          type="password"
          placeholder={t.password}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="mt-5 w-full" onClick={login} disabled={loading}>
          {loading ? t.loginLoading : t.loginButton}
        </Button>

        <Button className="mt-3 w-full" variant="ghost" onClick={google}>
          {t.googleButton}
        </Button>
      </div>
    </main>
  );
}
