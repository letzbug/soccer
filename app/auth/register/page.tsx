'use client';

import { createClient } from '@/lib/supabase-browser';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  getStoredLanguage,
  getTranslations,
  type Language
} from '@/lib/i18n';

export default function Register() {
  const [language, setLanguage] = useState<Language>('de');
  const t = getTranslations(language).auth;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

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

  async function register() {
    setLoading(true);
    setMessage('');
    setErrorMsg('');

    if (password.length < 6) {
      setErrorMsg(t.passwordTooShort);
      setLoading(false);
      return;
    }

    const { error } = await createClient().auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    setLoading(false);

    if (error) {
      setErrorMsg(error.message);
      return;
    }

    setMessage(t.confirmEmail);
  }

  return (
    <main className="mx-auto max-w-md px-4 py-14">
      <div className="glass rounded-3xl p-6">
        <h1 className="gold-text text-3xl font-black">
          {t.registerTitle}
        </h1>

        {errorMsg && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
            {errorMsg}
          </div>
        )}

        {message && (
          <div className="mt-4 rounded-xl border border-emeraldx/30 bg-emeraldx/10 p-3 text-sm text-emeraldx">
            {message}
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

        <Button
          className="mt-5 w-full"
          onClick={register}
          disabled={loading}
        >
          {loading ? t.registerLoading : t.registerButton}
        </Button>
      </div>
    </main>
  );
}
