'use client';

import { createClient } from '@/lib/supabase-browser';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
        <h1 className="gold-text text-3xl font-black">Login</h1>

        {error && (
          <div className="mt-4 rounded-xl border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
            {error}
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

        <Button className="mt-5 w-full" onClick={login} disabled={loading}>
          {loading ? 'Einloggen...' : 'Einloggen'}
        </Button>

        <Button className="mt-3 w-full" variant="ghost" onClick={google}>
          Mit Google weiter
        </Button>
      </div>
    </main>
  );
}
