'use client';

import { createClient } from '@/lib/supabase-browser';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  async function register() {
    setLoading(true);
    setMessage('');
    setErrorMsg('');

    if (password.length < 6) {
      setErrorMsg('Das Passwort muss mindestens 6 Zeichen haben.');
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

    setMessage('Account erstellt. Bitte bestätige deine E-Mail.');
  }

  return (
    <main className="mx-auto max-w-md px-4 py-14">
      <div className="glass rounded-3xl p-6">
        <h1 className="gold-text text-3xl font-black">Account erstellen</h1>

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
          placeholder="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="input mt-3 w-full"
          type="password"
          placeholder="Passwort"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button className="mt-5 w-full" onClick={register} disabled={loading}>
          {loading ? 'Erstelle Account...' : 'Registrieren'}
        </Button>
      </div>
    </main>
  );
}
