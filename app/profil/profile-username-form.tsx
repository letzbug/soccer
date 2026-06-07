'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase-browser';
import { Button } from '@/components/ui/button';

export function ProfileUsernameForm({
  initialUsername
}: {
  initialUsername: string;
}) {
  const [username, setUsername] = useState(initialUsername);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  async function saveUsername() {
    setMessage('');
    setError('');

    const clean = username.trim();

    if (clean.length < 3) {
      setError('Der Benutzername muss mindestens 3 Zeichen haben.');
      return;
    }

    if (clean.length > 24) {
      setError('Der Benutzername darf maximal 24 Zeichen haben.');
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
        setError('Dieser Benutzername ist bereits vergeben.');
        return;
      }

      setError('Benutzername konnte nicht gespeichert werden.');
      console.error(error);
      return;
    }

    setMessage('Benutzername gespeichert.');
    window.location.reload();
  }

  return (
    <div className="glass mt-4 rounded-3xl p-6">
      <div className="text-sm uppercase tracking-[0.25em] text-white/40">
        Benutzername
      </div>

      <p className="mt-2 text-sm text-white/60">
        Dieser Name erscheint im Ranking und auf deinem Profil.
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
          placeholder="z. B. Frank G"
          onChange={(e) => setUsername(e.target.value)}
        />

        <Button onClick={saveUsername} disabled={saving}>
          {saving ? 'Speichern...' : 'Speichern'}
        </Button>
      </div>
    </div>
  );
}
