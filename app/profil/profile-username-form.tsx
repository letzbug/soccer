'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { Button } from '@/components/ui/button';
import {
  getStoredLanguage,
  getTranslations,
  type Language
} from '@/lib/i18n';

export function ProfileUsernameForm({
  initialUsername
}: {
  initialUsername: string;
}) {
  const [language, setLanguage] = useState<Language>('de');
  const t = getTranslations(language).profilePage;

  const [username, setUsername] = useState(initialUsername);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

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

  async function saveUsername() {
    setMessage('');
    setError('');

    const clean = username.trim();

    if (clean.length < 3) {
      setError(t.usernameTooShort);
      return;
    }

    if (clean.length > 24) {
      setError(t.usernameTooLong);
      return;
    }

    setSaving(true);

    const supabase = createClient();

    const {
      data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
      setSaving(false);
      window.location.href = '/auth/login';
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update({
        username: clean
      })
      .eq('id', user.id);

    setSaving(false);

    if (error) {
      if (error.code === '23505') {
        setError(t.usernameTaken);
        return;
      }

      setError(t.usernameError);
      console.error(error);
      return;
    }

    setMessage(t.usernameSaved);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  }

  return (
    <div className="glass mt-4 rounded-3xl p-6">
      <div className="text-sm uppercase tracking-[0.25em] text-white/40">
        {t.username}
      </div>

      <p className="mt-2 text-sm text-white/60">
        {t.usernameDescription}
      </p>

      {message && (
        <div className="mt-4 rounded-2xl border border-emeraldx/30 bg-emeraldx/10 p-3 text-sm text-emeraldx">
          {message}
        </div>
      )}

      {error && (
        <div className="mt-4 rounded-2xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}

      <div className="mt-5 flex flex-col gap-3 sm:flex-row">
        <input
          className="input flex-1"
          value={username}
          placeholder={t.usernamePlaceholder}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button onClick={saveUsername} disabled={saving}>
          {saving ? t.saving : t.save}
        </Button>
      </div>
    </div>
  );
}
